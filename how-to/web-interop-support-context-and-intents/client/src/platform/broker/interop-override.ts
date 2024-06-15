import type {
	AppIdentifier,
	AppMetadata,
	ContextMetadata,
	ImplementationMetadata,
	IntentResolution
} from "@finos/fdc3";
import type { OpenFin } from "@openfin/core";
import type {
	AppsForIntent,
	PlatformApp,
	PlatformAppIdentifier,
	PlatformAppIntents
} from "../../shapes/app-shapes";
import type {
	CaptureApiPayload,
	IntentRegistrationPayload,
	IntentResolverResponse,
	IntentTargetMetaData,
	OpenOptions
} from "../../shapes/interopbroker-shapes";
import { formatError, isEmpty, isString, isStringValue, randomUUID } from "../../utils";
import { bringAppToFront, getApp, getApps, launch } from "../apps";
import { AppIdHelper } from "./app-id-helper";
import { AppIntentHelper } from "./app-intent-helper";
import { getAppsMetaData, mapToAppMetaData } from "./app-meta-data-helper";
import { ClientRegistrationHelper } from "./client-registration-helper";
import { RESOLVE_ERROR as ResolveError, OPEN_ERROR as OpenError } from "./fdc3-errors";
import { IntentResolverHelper } from "./intent-resolver-helper";

/**
 * Get the override constructor for the interop broker (useful if you wish this implementation to be layered with other implementations and passed to the platform's initialization object as part of an array).
 * @returns The override constructor to be used in an array.
 */
async function constructorOverride(): Promise<OpenFin.ConstructorOverride<OpenFin.InteropBroker>> {
	const logger = console;
	return (Base: OpenFin.Constructor<OpenFin.InteropBroker>) =>
		/**
		 * Extend the InteropBroker to handle intents.
		 */
		class InteropOverride extends Base {
			private readonly _openOptions?: OpenOptions;

			private readonly _appIntentHelper: AppIntentHelper;

			private readonly _clientRegistrationHelper: ClientRegistrationHelper;

			private readonly _intentResolverHelper?: IntentResolverHelper;

			private readonly _metadataKey: Readonly<string>;

			private readonly _appIdHelper: AppIdHelper;

			/**
			 * Create a new instance of InteropBroker.
			 */
			constructor() {
				super();
				console.log("InteropOverride:Custom Broker Instantiated");
				logger.info("Interop Broker Constructor applying settings.");
				this._appIntentHelper = new AppIntentHelper(getApps, logger);
				this._metadataKey = `_metadata_${randomUUID()}`;
				this._intentResolverHelper = new IntentResolverHelper(
					{
						url: "http://localhost:6060/common/intents/instance-picker.html"
					},
					logger
				);

				this._openOptions = { connectionTimeout: 5000 };
				this._appIdHelper = new AppIdHelper(getApp, logger);
				this._clientRegistrationHelper = new ClientRegistrationHelper(
					async (clientIdentity: OpenFin.ClientIdentity) => this._appIdHelper.lookupAppId(clientIdentity),
					logger
				);
			}

			/**
			 * Is the connection authorized.
			 * @param id The id of the client identity to check.
			 * @param payload The payload to send with the authorization check.
			 * @returns True if the connection is authorized.
			 */
			public async isConnectionAuthorized(id: OpenFin.ClientIdentity, payload?: unknown): Promise<boolean> {
				console.log(
					"Interop connection being made by the following identity. About to verify connection",
					id
				);
				await this._clientRegistrationHelper.clientConnectionRegistered(id, payload as CaptureApiPayload);
				return super.isConnectionAuthorized(id, payload);
			}

			/**
			 * Sets a context for the context group of the incoming current entity.
			 * @param sentContext New context to set.
			 * @param sentContext.context The context to send.
			 * @param clientIdentity Identity of the client sender.
			 */
			public async setContext(
				sentContext: { context: OpenFin.Context },
				clientIdentity: OpenFin.ClientIdentity
			): Promise<void> {
				console.log("InteropOverride:Context being set by the following identity", clientIdentity);
				const contextMetadata = await this.getContextMetadata(clientIdentity);

				sentContext.context = {
					...sentContext.context,
					[this._metadataKey]: contextMetadata
				} as unknown as OpenFin.Context;
				super.setContext(sentContext, clientIdentity);
			}

			/**
			 * Invokes the context handler.
			 * @param clientIdentity The client identity.
			 * @param handlerId The handler ID.
			 * @param context The context to invoke.
			 * @returns A promise that resolves when the context handler is invoked.
			 */
			public async invokeContextHandler(
				clientIdentity: OpenFin.ClientIdentity,
				handlerId: string,
				context: OpenFin.Context
			): Promise<void> {
				const passedContext: { [key: string]: unknown } = { ...context };
				const contextMetadata = passedContext[this._metadataKey];
				if (!isEmpty(contextMetadata)) {
					delete passedContext[this._metadataKey];
				}
				return super.invokeContextHandler(clientIdentity, handlerId, {
					...passedContext,
					contextMetadata
				} as unknown as OpenFin.Context);
			}

			/**
			 * Handle the information for intents by context.
			 * @param contextOptions The context options.
			 * @param clientIdentity The client.
			 * @returns The intents mapped to app metadata.
			 */
			public async handleInfoForIntentsByContext(
				contextOptions: OpenFin.Context | OpenFin.FindIntentsByContextOptions,
				clientIdentity: OpenFin.ClientIdentity
			): Promise<
				{
					intent: { name: string; displayName?: string };
					apps: AppMetadata[];
				}[]
			> {
				console.log("InteropOverride:Handle Info For Intents By Context", contextOptions, clientIdentity);
				let requestedContextType: string;
				let requestedResultType: string | undefined;
				let request: { context: { type: string }; metadata: { resultType: string } };

				if ("type" in contextOptions) {
					requestedContextType = contextOptions.type;
				} else {
					request = contextOptions as { context: { type: string }; metadata: { resultType: string } };
					requestedContextType = request.context.type;
					requestedResultType = request.metadata.resultType;
				}
				const intents = await this._appIntentHelper.getIntentsByContext(
					requestedContextType,
					requestedResultType
				);

				if (intents.length === 0) {
					throw new Error(ResolveError.NoAppsFound);
				}

				const mappedIntents: {
					intent: { name: string; displayName?: string };
					apps: AppMetadata[];
				}[] = [];

				for (const entry of intents) {
					const appMetaData = await getAppsMetaData(entry.apps, async (appId: string) =>
						this._clientRegistrationHelper.findAppInstances({ appId }, clientIdentity, "intent")
					);
					mappedIntents.push({ intent: entry.intent, apps: appMetaData });
				}

				return mappedIntents;
			}

			/**
			 * Handle the information for and intent.
			 * @param intentOptions The intent options.
			 * @param clientIdentity The client.
			 * @returns The intents mapped to app metadata.
			 */
			public async handleInfoForIntent(
				intentOptions: OpenFin.InfoForIntentOptions,
				clientIdentity: OpenFin.ClientIdentity
			): Promise<{
				intent: { name: string; displayName?: string };
				apps: AppMetadata[];
			}> {
				console.log("InteropOverride:Handle Info For Intents", intentOptions, clientIdentity);
				let contextType: string | undefined;

				const optContextType = intentOptions?.context?.type;
				if (!isEmpty(optContextType) && optContextType !== "fdc3.nothing") {
					contextType = optContextType;
				}

				const result = await this._appIntentHelper.getIntent(
					intentOptions.name,
					contextType,
					intentOptions?.metadata?.resultType
				);
				if (isEmpty(result)) {
					throw new Error(ResolveError.NoAppsFound);
				}
				const response = {
					intent: result.intent,
					apps: await getAppsMetaData(result.apps, async (appId: string) =>
						this._clientRegistrationHelper.findAppInstances({ appId }, clientIdentity, "intent")
					)
				};

				return response;
			}

			/**
			 * Handle the fired intent for context.
			 * @param contextForIntent The context for the intent.
			 * @param contextForIntent.type The type of the intent.
			 * @param contextForIntent.metadata The metadata for the intent.
			 * @param clientIdentity The client identity.
			 * @returns The intent resolution.
			 */
			public async handleFiredIntentForContext(
				contextForIntent: { type: string; metadata?: OpenFin.IntentMetadata<AppIdentifier> },
				clientIdentity: OpenFin.ClientIdentity
			): Promise<Omit<IntentResolution, "getResult"> | { source: string; version?: string }> {
				console.log("InteropOverride:handleFiredIntentForContext fired.", contextForIntent, clientIdentity);
				const targetAppIdentifier = this.getApplicationIdentity(contextForIntent.metadata);
				const intent: Partial<OpenFin.Intent & { displayName?: string }> = {
					context: contextForIntent
				};

				const intentsForSelection: AppsForIntent[] = await this._appIntentHelper.getIntentsByContext(
					contextForIntent.type
				);

				// app specified flow
				if (!isEmpty(targetAppIdentifier)) {
					const targetApp = await getApp(targetAppIdentifier.appId);

					if (isEmpty(targetApp)) {
						throw new Error(ResolveError.TargetAppUnavailable);
					}
					if (
						!targetApp?.interop?.intents?.listensFor ||
						!Object.values(targetApp.interop.intents.listensFor).some((listenedForIntent) =>
							listenedForIntent.contexts.includes(contextForIntent.type)
						)
					) {
						throw new Error(ResolveError.NoAppsFound);
					}
					const intentResolver = await this.handleTargetedIntent(
						targetAppIdentifier,
						intent as OpenFin.Intent,
						true,
						clientIdentity
					);
					return intentResolver;
				}

				let userSelection: IntentResolverResponse | undefined;

				if (intentsForSelection.length === 1) {
					const intentForSelection = intentsForSelection[0];
					// only one intent matches the passed context
					intent.name = intentForSelection.intent.name;
					intent.displayName = intentForSelection.intent.displayName;

					if (intentForSelection.apps.length === 1) {
						const appInstances = await this._clientRegistrationHelper.findAppInstances(
							intentForSelection.apps[0],
							clientIdentity,
							"intent"
						);
						// if there are no instances launch a new one otherwise present the choice to the user
						// by falling through to the next code block
						if (appInstances.length === 0 || this.createNewInstance(intentForSelection.apps[0])) {
							const intentResolver = await this.launchAppWithIntent(
								intentForSelection.apps[0],
								intent as OpenFin.Intent,
								undefined,
								clientIdentity
							);
							if (isEmpty(intentResolver)) {
								throw new Error(ResolveError.NoAppsFound);
							}
							return intentResolver;
						}
					}
					userSelection = await this._intentResolverHelper?.launchIntentResolver(
						{
							apps: intentsForSelection[0].apps,
							intent
						},
						clientIdentity
					);
				} else {
					userSelection = await this._intentResolverHelper?.launchIntentResolver(
						{
							intent,
							intents: intentsForSelection
						},
						clientIdentity
					);
				}
				// update intent with user selection
				if (isEmpty(userSelection)) {
					throw new Error(ResolveError.ResolverUnavailable);
				}
				intent.displayName = userSelection.intent.displayName;
				intent.name = userSelection.intent.name;
				const intentResolver = await this.handleIntentPickerSelection(
					userSelection,
					intent as OpenFin.Intent,
					clientIdentity
				);
				return intentResolver;
			}

			/**
			 * Handle a fired intent.
			 * @param intent The intent to handle.
			 * @param clientIdentity The client identity.
			 * @returns The intent resolution.
			 */
			public async handleFiredIntent(
				intent: OpenFin.Intent<OpenFin.IntentMetadata<AppIdentifier>>,
				clientIdentity: OpenFin.ClientIdentity
			): Promise<Omit<IntentResolution, "getResult"> | { source: string; version?: string }> {
				console.log("InteropOverride:handleFiredIntent: Received request for a raised intent", intent);
				logger.info("Received request for a raised intent", intent);
				const targetAppIdentifier = this.getApplicationIdentity(intent.metadata);

				const matchedIntents = await this._appIntentHelper.getIntent(intent.name, intent?.context?.type);
				const intentApps: PlatformApp[] = [];

				if (!isEmpty(matchedIntents)) {
					intentApps.push(...matchedIntents.apps);
				}
				if (!isEmpty(targetAppIdentifier)) {
					const targetApp = await getApp(targetAppIdentifier.appId);
					if (isEmpty(targetApp)) {
						throw new Error(ResolveError.TargetAppUnavailable);
					}
					// ensure that the specified app is one of the intent apps
					if (!intentApps.some((app) => app.appId === targetAppIdentifier.appId)) {
						throw new Error(ResolveError.NoAppsFound);
					}
					const intentResolver = await this.handleTargetedIntent(
						targetAppIdentifier,
						intent,
						false,
						clientIdentity
					);
					return intentResolver;
				}

				if (intentApps.length === 0) {
					logger.info("No apps support this intent");
					throw new Error(ResolveError.NoAppsFound);
				}

				if (intentApps.length === 1) {
					// handle single entry
					const appInstances = await this._clientRegistrationHelper.findAppInstances(
						intentApps[0],
						clientIdentity,
						"intent"
					);
					// if there are no instances launch a new one otherwise present the choice to the user
					// by falling through to the next code block
					let appInstanceId: string | undefined;
					if (appInstances.length === 1) {
						appInstanceId = appInstances[0].instanceId;
					}
					if (appInstances.length === 0 || this.createNewInstance(intentApps[0])) {
						const intentResolver = await this.launchAppWithIntent(
							intentApps[0],
							intent,
							appInstanceId,
							clientIdentity
						);
						if (isEmpty(intentResolver)) {
							throw new Error(ResolveError.NoAppsFound);
						}
						return intentResolver;
					}
				}

				const userSelection = await this._intentResolverHelper?.launchIntentResolver(
					{
						apps: intentApps,
						intent
					},
					clientIdentity
				);

				if (isEmpty(userSelection)) {
					throw new Error(ResolveError.ResolverUnavailable);
				}

				const intentResolver = await this.handleIntentPickerSelection(userSelection, intent, clientIdentity);
				return intentResolver;
			}

			/**
			 * Invoke the intent handler.
			 * @param clientIdentity The client identity.
			 * @param handlerId The handler ID.
			 * @param intent The intent to invoke.
			 * @returns A promise that resolves when the intent handler is invoked.
			 */
			public async invokeIntentHandler(
				clientIdentity: OpenFin.ClientIdentity,
				handlerId: string,
				intent: OpenFin.Intent
			): Promise<void> {
				const { context } = intent;
				let contextMetadata: ContextMetadata | undefined;
				let passedContext: { [key: string]: unknown } | undefined;
				if (!isEmpty(context)) {
					passedContext = { ...context };
					contextMetadata = passedContext[this._metadataKey] as ContextMetadata;
					if (!isEmpty(contextMetadata)) {
						delete passedContext[this._metadataKey];
					}
				}
				return super.invokeIntentHandler(clientIdentity, handlerId, {
					...intent,
					context: {
						...passedContext,
						contextMetadata
					} as unknown as OpenFin.Context
				});
			}

			/**
			 * Handle the FDC3 open.
			 * @param fdc3OpenOptions The options for the open.
			 * @param fdc3OpenOptions.app The platform app or its id.
			 * @param fdc3OpenOptions.context The context being opened.
			 * @param clientIdentity The client identity.
			 * @returns The application identifier.
			 */
			public async fdc3HandleOpen(
				fdc3OpenOptions: { app: (PlatformApp & AppIdentifier) | string; context: OpenFin.Context },
				clientIdentity: OpenFin.ClientIdentity
			): Promise<AppIdentifier> {
				if (isEmpty(fdc3OpenOptions?.app)) {
					logger.error("A request to fdc3.open did not pass an fdc3OpenOptions object");
					throw new Error(ResolveError.NoAppsFound);
				}

				logger.info(
					`A request to Open has been sent to the platform by uuid: ${clientIdentity?.uuid}, name: ${clientIdentity?.name}, endpointId: ${clientIdentity.endpointId} with passed context:`,
					fdc3OpenOptions.context
				);
				try {
					let requestedId: string;
					let instanceId: string | undefined;
					let platformIdentities: PlatformAppIdentifier[] | undefined;
					let focusApp = false;
					let appId: string | undefined;

					if (isString(fdc3OpenOptions.app)) {
						requestedId = fdc3OpenOptions.app;
					} else {
						requestedId = fdc3OpenOptions.app.appId ?? fdc3OpenOptions.app.name;
						instanceId = fdc3OpenOptions.app.instanceId;
					}

					const requestedApp = await getApp(requestedId);
					if (isEmpty(requestedApp)) {
						throw new Error(OpenError.AppNotFound);
					}

					if (!isEmpty(instanceId)) {
						// an instance of an application was selected now look up the uuid and name
						const allConnectedClients = await this.getAllClientInfo();
						const clientInfo = allConnectedClients.find(
							(connectedClient) => connectedClient.endpointId === instanceId
						);
						if (!isEmpty(clientInfo)) {
							logger.info(`App Id: ${requestedId} and instance Id: ${instanceId} was provided and found.`);
							// the connected instance is available
							platformIdentities = [
								{
									uuid: clientInfo.uuid,
									name: clientInfo.name,
									appId: requestedId,
									instanceId
								}
							];
						} else {
							throw new Error(ResolveError.TargetInstanceUnavailable);
						}
					}

					if (isEmpty(platformIdentities)) {
						platformIdentities = await launch(requestedApp);
					} else {
						focusApp = true;
					}

					if (!isEmpty(platformIdentities) && platformIdentities?.length > 0) {
						appId = platformIdentities[0].appId;
						const openTimeout: number | undefined = this._openOptions?.connectionTimeout;
						// if we have a snapshot and multiple identities we will not wait as not all of them might not support intents.
						instanceId = await this._clientRegistrationHelper.onConnectionClientReady(
							platformIdentities[0],
							openTimeout
						);
						if (platformIdentities.length > 1) {
							logger.warn(
								"Open can only return one app and instance id and multiple instances were launched as a result. Returning the first instance. Returned instances: ",
								platformIdentities
							);
						}
						if (!isEmpty(fdc3OpenOptions?.context)) {
							const contextTimeout: number | undefined = 5000;
							const contextTypeName = fdc3OpenOptions.context.type;
							// if we have a snapshot and multiple identities we will not wait as not all of them might not support intents.
							const clientReadyInstanceId = await this._clientRegistrationHelper.onContextClientReady(
								platformIdentities[0],
								contextTypeName,
								contextTimeout
							);

							let trackedHandler = this._clientRegistrationHelper.getRegisteredContextHandler(
								contextTypeName,
								clientReadyInstanceId
							);

							if (isEmpty(trackedHandler)) {
								trackedHandler = this._clientRegistrationHelper.getRegisteredContextHandler(
									"*",
									clientReadyInstanceId
								);
							}

							if (!isEmpty(trackedHandler)) {
								const contextMetadata = await this.getContextMetadata(clientIdentity);
								const updatedContext: OpenFin.Context = {
									...fdc3OpenOptions.context,
									[this._metadataKey]: contextMetadata
								};
								await this.invokeContextHandler(
									trackedHandler.clientIdentity,
									trackedHandler.handlerId,
									updatedContext
								);
							} else {
								logger.warn(
									`Unable to send context of type ${contextTypeName} opened app ${appId} with instanceId of ${clientReadyInstanceId} as we cannot find a tracked context handler.`
								);
							}
						}
					}

					if (!isEmpty(appId)) {
						if (focusApp && !isEmpty(platformIdentities)) {
							await bringAppToFront(requestedApp, platformIdentities);
						}
						return { appId, instanceId };
					}

					// if no id returned then the likelihood is that there was a problem launching the application as a result of the open request.
					throw new Error(OpenError.ErrorOnLaunch);
				} catch (openError) {
					const error = formatError(openError);
					if (
						error === ResolveError.TargetInstanceUnavailable ||
						error === ResolveError.IntentDeliveryFailed ||
						error === ResolveError.TargetInstanceUnavailable ||
						error === OpenError.AppTimeout
					) {
						throw new Error(OpenError.AppTimeout);
					}
					throw openError;
				}
			}

			/**
			 * The client has disconnected form the broker.
			 * @param clientIdentity The identity of the client that disconnected.
			 */
			public async clientDisconnected(clientIdentity: OpenFin.ClientIdentity): Promise<void> {
				console.log("InteropOverride:Client disconnected.", clientIdentity);
				await this._clientRegistrationHelper.clientDisconnected(clientIdentity);
				await super.clientDisconnected(clientIdentity);
			}

			/**
			 * Handle FDC3 find instances.
			 * @param app The app identifier to find.
			 * @param clientIdentity The client identity.
			 * @returns The instance of the app.
			 */
			public async fdc3HandleFindInstances(
				app: AppIdentifier,
				clientIdentity: OpenFin.ClientIdentity
			): Promise<AppIdentifier[]> {
				console.log("InteropOverride:fdc3HandleFindInstances fired.", app, clientIdentity);
				return this._clientRegistrationHelper.findAppInstances(app, clientIdentity);
			}

			/**
			 * Handle request to get FDC3 app metadata.
			 * @param app The app to get the metadata for.
			 * @param clientIdentity The client identity.
			 * @returns The app metadata.
			 */
			public async fdc3HandleGetAppMetadata(
				app: AppIdentifier,
				clientIdentity: OpenFin.ClientIdentity
			): Promise<AppMetadata> {
				logger.info("fdc3HandleGetAppMetadata call received.", app, clientIdentity);
				// this will only be called by FDC3 2.0+
				const platformApp = await getApp(app.appId);
				if (!isEmpty(platformApp)) {
					const appMetaData: AppMetadata = mapToAppMetaData(platformApp);
					return appMetaData;
				}
				throw new Error("TargetAppUnavailable");
			}

			/**
			 * Handle the request to get FDC3 info.
			 * @param payload The payload.
			 * @param payload.fdc3Version The version info to get.
			 * @param clientIdentity The client identity.
			 * @returns The info.
			 */
			public async fdc3HandleGetInfo(
				payload: {
					fdc3Version: string;
				},
				clientIdentity: OpenFin.ClientIdentity
			): Promise<unknown> {
				console.log("InteropOverride:fdc3HandleGetInfo", payload, clientIdentity);
				logger.info("fdc3HandleGetInfo", payload, clientIdentity);
				if (payload?.fdc3Version === "2.0") {
					const response: ImplementationMetadata = (await super.fdc3HandleGetInfo(
						payload,
						clientIdentity
					)) as ImplementationMetadata;
					const appId = await this._appIdHelper.lookupAppId(clientIdentity);
					if (!isEmpty(appId)) {
						const updatedResponse = {
							...response,
							appMetadata: { appId, instanceId: clientIdentity.endpointId }
						};
						return updatedResponse;
					}
					return response;
				}
				return super.fdc3HandleGetInfo(payload, clientIdentity);
			}

			/**
			 * Handle an intent handler being registered.
			 * @param payload The payload.
			 * @param clientIdentity The client identity.
			 * @returns Nothing.
			 */
			public async intentHandlerRegistered(
				payload: IntentRegistrationPayload,
				clientIdentity: OpenFin.ClientIdentity
			): Promise<void> {
				console.log("InteropOverride:intentHandlerRegistered", payload, clientIdentity);
				await this._clientRegistrationHelper.intentHandlerRegistered(payload, clientIdentity);
				await super.intentHandlerRegistered(payload, clientIdentity);
			}

			/**
			 * A context handler has been registered against the broker.
			 * @param payload The payload from a context listener registration.
			 * @param payload.contextType The context type that the client is listening for.
			 * @param payload.handlerId The handler Id for this listener.
			 * @param clientIdentity The identity of the application that is adding the context handler.
			 */
			public async contextHandlerRegistered(
				payload: { contextType: string | undefined; handlerId: string },
				clientIdentity: OpenFin.ClientIdentity
			): Promise<void> {
				console.log("InteropOverride:contextHandlerRegistered", payload, clientIdentity);
				await this._clientRegistrationHelper.contextHandlerRegistered(payload, clientIdentity);
				super.contextHandlerRegistered(payload, clientIdentity);
			}

			/**
			 * Get an application identity.
			 * @param metadata The metadata for the app.
			 * @returns The app identifier.
			 */
			private getApplicationIdentity(
				metadata: OpenFin.IntentMetadata<IntentTargetMetaData> | undefined
			): AppIdentifier | undefined {
				const target = metadata?.target;
				if (isEmpty(target)) {
					return;
				}
				if (isString(target)) {
					if (target.trim().length === 0) {
						return undefined;
					}
					return { appId: target };
				}

				if (isEmpty(target.appId)) {
					return undefined;
				}

				return { appId: target.appId, instanceId: target.instanceId };
			}

			/**
			 * Does the app use application identity.
			 * @param clientIdentity The client app to check.
			 * @returns True if the app uses application identity.
			 */
			private usesApplicationIdentity(clientIdentity: OpenFin.ClientIdentity): boolean {
				const apiMetadata = this._clientRegistrationHelper.getApiVersion(clientIdentity);
				if (isEmpty(apiMetadata)) {
					return false;
				}
				return apiMetadata.type === "fdc3" && apiMetadata.version === "2.0";
			}

			/**
			 * Handle a targeted intent.
			 * @param targetAppIdentifier The identifier for the target app.
			 * @param intent The intent.
			 * @param targetByContext Perform the target by context.
			 * @param clientIdentity The client identity.
			 * @returns The intent resolution.
			 */
			private async handleTargetedIntent(
				targetAppIdentifier: AppIdentifier,
				intent: OpenFin.Intent,
				targetByContext: boolean,
				clientIdentity: OpenFin.ClientIdentity
			): Promise<Omit<IntentResolution, "getResult">> {
				// app specified flow
				const intentsForSelection: AppsForIntent[] = [];
				const targetApp = await getApp(targetAppIdentifier.appId);

				// if the specified app isn't available then let the caller know
				if (isEmpty(targetApp)) {
					throw new Error(ResolveError.TargetAppUnavailable);
				}
				// if an instanceId is specified then check to see if it is valid and if it isn't inform the caller
				if (!isEmpty(targetAppIdentifier.instanceId)) {
					const availableAppInstances = await this._clientRegistrationHelper.findAppInstances(
						targetAppIdentifier,
						clientIdentity,
						"intent"
					);
					if (
						availableAppInstances.length === 0 ||
						!availableAppInstances.some(
							(entry) =>
								// eslint-disable-next-line max-len
								entry.appId === targetAppIdentifier.appId &&
								entry.instanceId === targetAppIdentifier.instanceId
						)
					) {
						throw new Error(ResolveError.TargetInstanceUnavailable);
					}
				}

				if (
					isEmpty(targetApp.interop?.intents?.listensFor) ||
					Object.values(targetApp.interop.intents.listensFor).length === 0
				) {
					// an app was specified but it doesn't have any intents. Indicate that something is wrong
					throw new Error(ResolveError.TargetAppUnavailable);
				}

				const supportedIntents: PlatformAppIntents[] = [];
				const intentNames = Object.keys(targetApp.interop.intents.listensFor);
				for (const intentName of intentNames) {
					const intentEntry = targetApp.interop.intents.listensFor[intentName];
					let contextMatch: boolean = true;
					const contextType = intent.context?.type;
					let supportedIntent: PlatformAppIntents | undefined;
					if (!isEmpty(contextType)) {
						contextMatch = intentEntry.contexts?.includes(contextType);
						if (targetByContext) {
							supportedIntent = { ...intentEntry, name: intentName };
						}
					}
					if (isEmpty(supportedIntent) && intentName === intent.name && contextMatch) {
						supportedIntent = { ...intentEntry, name: intentName };
					}
					if (!isEmpty(supportedIntent)) {
						supportedIntents.push(supportedIntent);
					}
				}

				if (supportedIntents.length === 0) {
					// the specified app does have intent support but just none that support this context type
					throw new Error(ResolveError.TargetAppUnavailable);
				}

				if (supportedIntents.length === 1) {
					// a preferred name for an app was given with the context object
					// the app existed and it supported the context type and there was only one intent that supported
					// that context type. Launch the app with that intent otherwise present the user with a list of
					// everything that supports that context type
					intent.name = supportedIntents[0].name;
					// check for instances
					if (!isEmpty(targetAppIdentifier.instanceId)) {
						const intentResolver = await this.launchAppWithIntent(
							targetApp,
							intent,
							targetAppIdentifier.instanceId,
							clientIdentity
						);
						return intentResolver;
					}
					const specifiedAppInstances = await this._clientRegistrationHelper.findAppInstances(
						targetApp,
						clientIdentity,
						"intent"
					);

					if (specifiedAppInstances.length === 0 || this.createNewInstance(targetApp)) {
						const intentResolver = await this.launchAppWithIntent(
							targetApp,
							intent,
							undefined,
							clientIdentity
						);
						if (isEmpty(intentResolver)) {
							throw new Error(ResolveError.IntentDeliveryFailed);
						}
						return intentResolver;
					}
				}

				for (const supportedIntent of supportedIntents) {
					const appForIntent: AppsForIntent = {
						apps: [targetApp],
						intent: { name: supportedIntent.name, displayName: supportedIntent.displayName }
					};
					intentsForSelection.push(appForIntent);
				}
				let userSelection: IntentResolverResponse | undefined;
				if (intentsForSelection.length === 1) {
					if (
						!isStringValue(intent.name) &&
						!isEmpty(intentsForSelection[0]?.intent?.name) &&
						!isEmpty(intent?.context) &&
						!isEmpty(intent?.context?.type)
					) {
						logger.info(
							`A request to raise an intent was passed and the intent name was not passed but a context was ${intent?.context?.type} with 1 matching intent. Name: ${intentsForSelection[0]?.intent?.name},  Display Name: ${intentsForSelection[0]?.intent?.displayName}. Updating intent object.`
						);
						intent.name = intentsForSelection[0]?.intent?.name;
					}
					userSelection = await this._intentResolverHelper?.launchIntentResolver(
						{
							apps: intentsForSelection[0].apps,
							intent
						},
						clientIdentity
					);
				} else {
					userSelection = await this._intentResolverHelper?.launchIntentResolver(
						{
							intent,
							intents: intentsForSelection
						},
						clientIdentity
					);
					if (!isStringValue(intent.name) && !isEmpty(userSelection?.intent?.name)) {
						logger.info(
							`A request to raise an intent was passed and the following intent was selected (from a selection of ${intentsForSelection.length}). Name: ${userSelection?.intent?.name},  Display Name: ${userSelection?.intent?.displayName}. Updating intent object.`
						);
						intent.name = userSelection?.intent?.name ?? intent.name;
					}
				}
				if (isEmpty(userSelection)) {
					throw new Error(ResolveError.ResolverUnavailable);
				}

				return this.handleIntentPickerSelection(userSelection, intent, clientIdentity);
			}

			/**
			 * Launch an app with intent.
			 * @param app The application to launch.
			 * @param intent The intent to open it with.
			 * @param instanceId The instance of the app.
			 * @param clientIdentity The identity of the source of the request.
			 * @returns The intent resolution.
			 */
			private async launchAppWithIntent(
				app: PlatformApp,
				intent: OpenFin.Intent,
				instanceId?: string,
				clientIdentity?: OpenFin.ClientIdentity
			): Promise<Omit<IntentResolution, "getResult">> {
				logger.info("Launching app with intent");
				let platformIdentities: PlatformAppIdentifier[] | undefined = [];
				let existingInstance = true;

				if (!isEmpty(instanceId)) {
					// an instance of an application was selected
					const allConnectedClients = await this.getAllClientInfo();
					const clientInfo = allConnectedClients.find(
						(connectedClient) => connectedClient.endpointId === instanceId
					);
					if (!isEmpty(clientInfo)) {
						logger.info(`App Id: ${app.appId} and instance Id: ${instanceId} was provided and found.`);
						// the connected instance is available
						platformIdentities.push({
							uuid: clientInfo.uuid,
							name: clientInfo.name,
							appId: app.appId,
							instanceId: clientInfo.endpointId
						});
					} else {
						throw new Error(ResolveError.TargetInstanceUnavailable);
					}
				}

				if (platformIdentities.length === 0) {
					platformIdentities = await launch(app);
					existingInstance = false;
					if (!platformIdentities?.length) {
						throw new Error(ResolveError.IntentDeliveryFailed);
					}
					if (platformIdentities.length === 1) {
						const intentTimeout: number | undefined = 5000;
						// if we have a snapshot and multiple identities we will not wait as not all of them might not support intents.
						try {
							instanceId = await this._clientRegistrationHelper.onIntentClientReady(
								platformIdentities[0],
								intent.name,
								intentTimeout
							);
						} catch (intentReadyError) {
							logger.warn(
								"An error occurred while getting a instance to target an intent at.",
								intentReadyError
							);
							throw new Error(ResolveError.IntentDeliveryFailed);
						}
					}
				}

				for (const target of platformIdentities) {
					await super.setIntentTarget(intent, target);
					if (existingInstance) {
						try {
							if (bringAppToFront) {
								await bringAppToFront(app, [target]);
							}
						} catch (bringToFrontError) {
							logger.warn(
								`There was an error bringing app: ${target.appId}, and instance ${target.instanceId} with name: ${target.name} to front.`,
								bringToFrontError
							);
						}
					}
				}

				return {
					source: { appId: app.appId, instanceId },
					version: app.version,
					intent: intent.name
				};
			}

			/**
			 * Get the context metadata for a client identity.
			 * @param clientIdentity The client identity.
			 * @returns The context metadata.
			 */
			private async getContextMetadata(clientIdentity: OpenFin.ClientIdentity): Promise<ContextMetadata> {
				const appId = (await this._appIdHelper.lookupAppId(clientIdentity)) ?? "unknown";
				return {
					source: {
						appId,
						instanceId: clientIdentity.endpointId
					}
				};
			}

			/**
			 * Should we always use a new instance of the app.
			 * @param app The app to check.
			 * @returns True if we should always use a new instance.
			 */
			private createNewInstance(app: PlatformApp): boolean {
				const instanceMode = app.hostManifests?.OpenFin?.config?.instanceMode ?? "new";
				return instanceMode === "new";
			}

			/**
			 * Handle the intent picker selection.
			 * @param userSelection The user selection from the intent picker.
			 * @param intent The intent.
			 * @param clientIdentity The source of the request.
			 * @returns The intent resolution.
			 */
			private async handleIntentPickerSelection(
				userSelection: IntentResolverResponse,
				intent: OpenFin.Intent<OpenFin.IntentMetadata<IntentTargetMetaData>>,
				clientIdentity?: OpenFin.ClientIdentity
			): Promise<Omit<IntentResolution, "getResult">> {
				const selectedApp = await getApp(userSelection.appId);
				if (isEmpty(selectedApp)) {
					throw new Error(ResolveError.NoAppsFound);
				}
				const instanceId: string | undefined = userSelection.instanceId;
				const intentResolver = await this.launchAppWithIntent(
					selectedApp,
					intent,
					instanceId,
					clientIdentity
				);
				if (isEmpty(intentResolver)) {
					throw new Error(ResolveError.NoAppsFound);
				}
				return intentResolver;
			}
		};
}

/**
 * Get the override constructor for the interop broker (useful if you wish this implementation to be layered with other implementations and passed to the platform's initialization object as part of an array).
 * @returns The override constructor to be used in an array.
 */
export async function getConstructorOverride(): Promise<OpenFin.ConstructorOverride<OpenFin.InteropBroker>> {
	return constructorOverride();
}
