import type OpenFin from "@openfin/core";
import { RESOLVE_ERROR as ResolveError } from "./fdc3-errors";
import type {
	BrokerClientConnection,
	IntentRegistrationEntry,
	IntentRegistrationPayload
} from "../../shapes/interopbroker-shapes";
import type { Logger } from "../../shapes/logger-shapes";
import { isEmpty } from "../helpers/utils";

/**
 * Tracks clients that connect to the broker and register intent listeners.
 */
export class ClientRegistrationHelper {
	private readonly _logger: Logger;

	private readonly _lookupAppId: (clientIdentity: OpenFin.ClientIdentity) => Promise<string | undefined>;

	private readonly _clientReadyRequests: { [key: string]: (instanceId: string) => void };

	private readonly _trackedClientConnections: { [key: string]: BrokerClientConnection };

	private readonly _trackedIntentHandlers: { [key: string]: IntentRegistrationEntry[] };

	/**
	 * Creates a new ClientRegistrationHelper.
	 * @param lookupAppId The function used to resolve an app id from a client identity.
	 * @param logger The logger instance.
	 */
	constructor(
		lookupAppId: (clientIdentity: OpenFin.ClientIdentity) => Promise<string | undefined>,
		logger: Logger
	) {
		this._logger = logger;
		this._lookupAppId = lookupAppId;
		this._clientReadyRequests = {};
		this._trackedClientConnections = {};
		this._trackedIntentHandlers = {};
	}

	/**
	 * Handles cleanup when a client disconnects, removing tracked handlers and connections.
	 * @param clientIdentity The identity of the disconnected client.
	 */
	public async clientDisconnected(clientIdentity: OpenFin.ClientIdentity): Promise<void> {
		this._logger.info("Client disconnected.", clientIdentity);

		for (const [intentName, handlers] of Object.entries(this._trackedIntentHandlers)) {
			this._trackedIntentHandlers[intentName] = handlers.filter(
				(entry) => entry.clientIdentity.endpointId !== clientIdentity.endpointId
			);
		}

		const key = this.getClientKey(clientIdentity);
		delete this._trackedClientConnections[key];
	}

	/**
	 * Records that a client has registered an intent handler.
	 * @param payload The intent registration payload.
	 * @param clientIdentity The identity of the registering client.
	 */
	public async intentHandlerRegistered(
		payload: IntentRegistrationPayload,
		clientIdentity: OpenFin.ClientIdentity
	): Promise<void> {
		if (isEmpty(payload)) {
			return;
		}

		const intentName = payload.handlerId.replace("intent-handler-", "");
		const appId = await this._lookupAppId(clientIdentity);
		if (isEmpty(appId)) {
			this._logger.warn("Unable to determine app id. This intent handler registration will not be tracked.");
			return;
		}

		const trackedHandlers = this._trackedIntentHandlers[intentName] ?? [];
		this._trackedIntentHandlers[intentName] = trackedHandlers;

		const alreadyTracked = trackedHandlers.some(
			(entry) => entry.clientIdentity.endpointId === clientIdentity.endpointId
		);
		if (!alreadyTracked) {
			trackedHandlers.push({
				fdc3Version: payload.fdc3Version,
				clientIdentity,
				appId
			});
		}

		const clientReadyKey = this.getClientReadyKey(clientIdentity, "intent", intentName);
		this._clientReadyRequests[clientReadyKey]?.(clientIdentity.endpointId);
	}

	/**
	 * Records a new client connection if not already tracked.
	 * @param clientIdentity The identity of the connecting client.
	 */
	public async clientConnectionRegistered(clientIdentity: OpenFin.ClientIdentity): Promise<void> {
		const key = this.getClientKey(clientIdentity);
		if (!isEmpty(this._trackedClientConnections[key])) {
			return;
		}

		this._trackedClientConnections[key] = {
			clientIdentity
		};
	}

	/**
	 * Waits for an intent handler to become ready on the target identity, or times out.
	 * @param identity The identity of the launched app.
	 * @param intentName The name of the intent to wait for.
	 * @param timeout The maximum time in milliseconds to wait.
	 * @returns The endpoint id (instance id) of the ready handler.
	 */
	public async onIntentClientReady(
		identity: OpenFin.Identity,
		intentName: string,
		timeout: number = 15000
	): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			const registeredHandlers = this._trackedIntentHandlers[intentName];
			const existingHandler = registeredHandlers?.find(
				(handler) =>
					handler.clientIdentity.uuid === identity.uuid && handler.clientIdentity.name === identity.name
			);

			if (!isEmpty(existingHandler)) {
				resolve(existingHandler.clientIdentity.endpointId);
				return;
			}

			const key = this.getClientReadyKey(identity, "intent", intentName);
			const timerId = setTimeout(() => {
				if (!isEmpty(this._clientReadyRequests[key])) {
					delete this._clientReadyRequests[key];
					reject(new Error(ResolveError.IntentDeliveryFailed));
				}
			}, timeout);

			this._clientReadyRequests[key] = (instanceId: string): void => {
				clearTimeout(timerId);
				delete this._clientReadyRequests[key];
				resolve(instanceId);
			};
		});
	}

	/**
	 * Builds a unique key for a client connection.
	 * @param identity The client identity.
	 * @returns The connection key string.
	 */
	private getClientKey(identity: OpenFin.Identity): string {
		return `${identity.uuid}-${identity.name}`;
	}

	/**
	 * Builds a unique key for tracking a client-ready request.
	 * @param identity The client identity.
	 * @param type The handler type.
	 * @param name The intent or handler name.
	 * @returns The client-ready key string.
	 */
	private getClientReadyKey(identity: OpenFin.Identity, type: "intent", name: string): string {
		return `${identity.uuid}/${identity.name}/${type}/${name}`;
	}
}
