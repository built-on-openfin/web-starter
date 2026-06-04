import type { AppIdentifier, AppMetadata, ImplementationMetadata, IntentResolution } from "@finos/fdc3";
import type { OpenFin } from "@openfin/core";
import { AppIdHelper } from "./app-id-helper";
import { AppIntentHelper } from "./app-intent-helper";
import { mapToAppMetaData } from "./app-meta-data-helper";
import { ClientRegistrationHelper } from "./client-registration-helper";
import { RESOLVE_ERROR as ResolveError } from "./fdc3-errors";
import type { PlatformApp, PlatformAppIdentifier } from "../../shapes/app-shapes";
import type {
	IntentRegistrationPayload,
	PlatformInteropBrokerOptions
} from "../../shapes/interopbroker-shapes";
import { getApp, getApps, launch } from "../apps/apps";
import { isEmpty } from "../helpers/utils";

/**
 * Get the override constructor for the interop broker.
 * @param options The options for the platform interop broker.
 * @returns The override constructor to be used by OpenFin core-web.
 */
async function constructorOverride(
	options: PlatformInteropBrokerOptions
): Promise<OpenFin.ConstructorOverride<OpenFin.InteropBroker>> {
	const logger = console;

	return function override(Base: OpenFin.Constructor<OpenFin.InteropBroker>) {
		/**
		 * Custom interop broker override that adds intent handling, app resolution,
		 * and client registration capabilities.
		 */
		return class InteropOverride extends Base {
			private readonly _appIntentHelper: AppIntentHelper;

			private readonly _appIdHelper: AppIdHelper;

			private readonly _clientRegistrationHelper: ClientRegistrationHelper;

			/**
			 * Creates a new InteropOverride instance.
			 */
			constructor() {
				super();
				this._appIntentHelper = new AppIntentHelper(getApps, logger);
				this._appIdHelper = new AppIdHelper(getApp, logger);
				this._clientRegistrationHelper = new ClientRegistrationHelper(
					async (clientIdentity: OpenFin.ClientIdentity) => this._appIdHelper.lookupAppId(clientIdentity),
					logger
				);
			}

			/**
			 * Determines whether a client connection is authorized.
			 * @param id The identity of the connecting client.
			 * @param payload Optional authorization payload.
			 * @returns Whether the connection is authorized.
			 */
			public async isConnectionAuthorized(id: OpenFin.ClientIdentity, payload?: unknown): Promise<boolean> {
				await this._clientRegistrationHelper.clientConnectionRegistered(id);
				return super.isConnectionAuthorized(id, payload);
			}

			/**
			 * Handles a fired intent by resolving a target app and launching it.
			 * @param intent The intent that was raised.
			 * @param clientIdentity The identity of the client that raised the intent.
			 * @returns The intent resolution result.
			 */
			public async handleFiredIntent(
				intent: OpenFin.Intent,
				clientIdentity: OpenFin.ClientIdentity
			): Promise<Omit<IntentResolution, "getResult"> | { source: string; version?: string }> {
				logger.info("Received request for a raised intent", intent, clientIdentity);

				const targetApp = await this._appIntentHelper.findFirstAppForIntent(
					intent.name,
					intent.context?.type
				);

				if (isEmpty(targetApp)) {
					throw new Error(ResolveError.NoAppsFound);
				}

				return this.launchAppWithIntent(targetApp, intent);
			}

			/**
			 * Handles cleanup when a client disconnects.
			 * @param clientIdentity The identity of the disconnected client.
			 */
			public async clientDisconnected(clientIdentity: OpenFin.ClientIdentity): Promise<void> {
				await this._clientRegistrationHelper.clientDisconnected(clientIdentity);
				await super.clientDisconnected(clientIdentity);
			}

			/**
			 * Handles an FDC3 request to retrieve app metadata.
			 * @param app The app identifier to look up.
			 * @param clientIdentity The identity of the requesting client.
			 * @returns The app metadata.
			 */
			public async fdc3HandleGetAppMetadata(
				app: AppIdentifier,
				clientIdentity: OpenFin.ClientIdentity
			): Promise<AppMetadata> {
				logger.info("fdc3HandleGetAppMetadata call received.", app, clientIdentity);
				const platformApp = await getApp(app.appId);
				if (!isEmpty(platformApp)) {
					return mapToAppMetaData(platformApp);
				}
				throw new Error(ResolveError.TargetAppUnavailable);
			}

			/**
			 * Handles an FDC3 getInfo request, enriching the response with app metadata for FDC3 2.0.
			 * @param payload The payload containing the FDC3 version.
			 * @param payload.fdc3Version The FDC3 version string.
			 * @param clientIdentity The identity of the requesting client.
			 * @returns The implementation metadata.
			 */
			public async fdc3HandleGetInfo(
				payload: { fdc3Version: string },
				clientIdentity: OpenFin.ClientIdentity
			): Promise<unknown> {
				if (payload?.fdc3Version !== "2.0") {
					return super.fdc3HandleGetInfo(payload, clientIdentity);
				}

				const response = (await super.fdc3HandleGetInfo(payload, clientIdentity)) as ImplementationMetadata;
				const appId = await this._appIdHelper.lookupAppId(clientIdentity);
				if (isEmpty(appId)) {
					return response;
				}

				return {
					...response,
					appMetadata: { appId, instanceId: clientIdentity.endpointId }
				};
			}

			/**
			 * Handles registration of an intent handler by a client.
			 * @param payload The intent registration payload.
			 * @param clientIdentity The identity of the registering client.
			 */
			public async intentHandlerRegistered(
				payload: IntentRegistrationPayload,
				clientIdentity: OpenFin.ClientIdentity
			): Promise<void> {
				await this._clientRegistrationHelper.intentHandlerRegistered(payload, clientIdentity);
				await super.intentHandlerRegistered(payload, clientIdentity);
			}

			/**
			 * Launches an app to handle the specified intent and waits for the intent handler to be ready.
			 * @param app The platform app to launch.
			 * @param intent The intent to deliver.
			 * @returns The intent resolution result.
			 */
			private async launchAppWithIntent(
				app: PlatformApp,
				intent: OpenFin.Intent
			): Promise<Omit<IntentResolution, "getResult">> {
				const platformIdentities = await launch(app);

				if (isEmpty(platformIdentities) || platformIdentities.length === 0) {
					throw new Error(ResolveError.IntentDeliveryFailed);
				}

				const target = platformIdentities[0];
				let instanceId: string;

				try {
					instanceId = await this._clientRegistrationHelper.onIntentClientReady(
						target,
						intent.name,
						options.intentOptions?.intentTimeout ?? 15000
					);
				} catch (intentReadyError) {
					logger.warn("Unable to find a registered intent handler for the launched app.", {
						appId: app.appId,
						intentName: intent.name,
						error: intentReadyError
					});
					throw new Error(ResolveError.IntentDeliveryFailed);
				}

				const intentTarget: PlatformAppIdentifier = {
					...target,
					instanceId
				};
				await super.setIntentTarget(intent, intentTarget);

				return {
					source: { appId: app.appId, instanceId },
					version: app.version,
					intent: intent.name
				};
			}
		};
	};
}

/**
 * Get the override constructor for the interop broker.
 * @param options The options for the broker.
 * @returns The override constructor to be used by OpenFin core-web.
 */
export async function getInteropBrokerOverride(
	options?: PlatformInteropBrokerOptions
): Promise<OpenFin.ConstructorOverride<OpenFin.InteropBroker>> {
	return constructorOverride(options ?? {});
}
