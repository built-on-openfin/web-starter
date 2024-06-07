import type {
	AppIdentifier,
	AppMetadata,
	IntentResolution
} from "@finos/fdc3";
import type { OpenFin } from "@openfin/core";
import type { IntentRegistrationPayload } from "../shapes/interop-broker-shapes";
import {
	RESOLVE_ERROR as ResolveError
} from "./fdc3-errors";

/**
 * Get the override constructor for the interop broker (useful if you wish this implementation to be layered with other implementations and passed to the platform's initialization object as part of an array).
 * @returns The override constructor to be used in an array.
 */
async function constructorOverride(
): Promise<OpenFin.ConstructorOverride<OpenFin.InteropBroker>> {
	return (Base: OpenFin.Constructor<OpenFin.InteropBroker>) =>
		/**
		 * Extend the InteropBroker to handle intents.
		 */
		class InteropOverride extends Base {
			/**
			 * Create a new instance of InteropBroker.
			 */
			constructor() {
				super();
                console.log("Custom Broker Instantiated");
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
                console.log("Context being set by the following identity", clientIdentity);
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
                console.log("Context being invoked by the following identity", clientIdentity);
				return super.invokeContextHandler(clientIdentity, handlerId, context);
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
					apps: (AppMetadata)[];
				}[]
			> {
                console.log("Handle Info For Intents By Context", contextOptions, clientIdentity);
				throw new Error(ResolveError.NoAppsFound);
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
                console.log("Handle Info For Intents", intentOptions, clientIdentity);
				throw new Error(ResolveError.NoAppsFound);
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
                console.log("handleFiredIntentForContext fired.", contextForIntent, clientIdentity);
				throw new Error(ResolveError.NoAppsFound);
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
				console.log("handleFiredIntent: Received request for a raised intent", intent);
				throw new Error(ResolveError.TargetAppUnavailable);
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
                console.log("invokeIntentHandler fired.", clientIdentity, handlerId, intent);
				return super.invokeIntentHandler(clientIdentity, handlerId, {
					...intent
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
				fdc3OpenOptions: { app: AppIdentifier | string; context: OpenFin.Context },
				clientIdentity: OpenFin.ClientIdentity
			): Promise<AppIdentifier> {
                console.log("fdc3HandleOpen fired.", clientIdentity, fdc3OpenOptions);
				throw new Error(ResolveError.NoAppsFound);
			}

			/**
			 * The client has disconnected form the broker.
			 * @param clientIdentity The identity of the client that disconnected.
			 */
			public async clientDisconnected(clientIdentity: OpenFin.ClientIdentity): Promise<void> {
                console.log("Client disconnected.", clientIdentity);
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
                console.log("fdc3HandleFindInstances fired.", app, clientIdentity);
                return super.fdc3HandleFindInstances(app, clientIdentity) as Promise<AppIdentifier[]>;
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
				console.log("fdc3HandleGetAppMetadata call received.", app, clientIdentity);
				// this will only be called by FDC3 2.0+
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
				console.log("fdc3HandleGetInfo", payload, clientIdentity);
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
                console.log("intentHandlerRegistered", payload, clientIdentity);
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
                console.log("contextHandlerRegistered", payload, clientIdentity);
				super.contextHandlerRegistered(payload, clientIdentity);
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
