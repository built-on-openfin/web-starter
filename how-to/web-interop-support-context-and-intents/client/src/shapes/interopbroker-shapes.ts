import type { OpenFin } from "@openfin/core";

/**
 * API Metadata.
 */
export interface ApiMetadata {
	/**
	 * The type of the metadata.
	 */
	type: "fdc3" | "interop";

	/**
	 * The version.
	 */
	version?: "1.2" | "2.0" | string;
}

/** A simple AppIntent */
export interface AppIntent {
    /**
     * The name of the intent.
     */
    name: string;
	/**
	 * The display name of the intent.
	 */
    displayName: string;
    /** The Contexts the intent supports */
	contexts: string[];
}

/**
 * The payload for an intent registration.
 */
export interface IntentRegistrationPayload {
	/**
	 * The FDC3 version.
	 */
	fdc3Version: string;

	/**
	 * The id of the handler.
	 */
	handlerId: string;
}

/**
 * An entry in the intent registry.
 */
export interface IntentRegistrationEntry {
	/**
	 * The FDC3 version supported.
	 */
	fdc3Version: string;

	/**
	 * The identity of the client.
	 */
	clientIdentity: OpenFin.ClientIdentity;

	/**
	 * The identity of the application.
	 */
	appId?: string;
}

/**
 * An entry in the context registry.
 */
export interface ContextRegistrationEntry {
	/**
	 * The handlerId for the particular context listener registration.
	 */
	handlerId: string;

	/**
	 * The identity of the client.
	 */
	clientIdentity: OpenFin.ClientIdentity;

	/**
	 * The identity of the application.
	 */
	appId?: string;
}

/**
 * Intent target metadata.
 */
export type IntentTargetMetaData = string | { appId: string; instanceId?: string };

/**
 * The response from the intent resolver.
 */
export interface IntentResolverResponse {
	/**
	 * The appId that was selected.
	 */
	appId: string;

	/**
	 * The instance that was selected.
	 */
	instanceId?: string;

	/**
	 * The intent that was selected.
	 */
	intent: Partial<AppIntent>;
}

/**
 * API Metadata.
 */
export interface BrokerClientConnection {
	/**
	 * The client identity of the connection.
	 */
	clientIdentity: OpenFin.ClientIdentity;

	/**
	 * The api meta data if available.
	 */
	apiMetadata?: ApiMetadata;
}

/**
 * The payload to use for the capture API.
 */
export interface CaptureApiPayload {
	/**
	 * The api version.
	 */
	apiVersion?: ApiMetadata;
}

/**
 * Intent resolver options.
 */
export interface IntentResolverOptions {
	/**
	 * The url of the html page that has the intent picker
	 */
	url: string;

	/**
	 * the height you wish the window to be
	 */
	height?: number;

	/**
	 * the width you wish the window to be
	 */
	width?: number;

	/**
	 * the fdc3 api version this picker will support (default is v2)
	 */
	fdc3InteropApi?: string;

	/**
	 * A suggested title for the intent picker/resolver ui
	 */
	title?: string;
}

/** Options related to the fdc3 open api */
export interface OpenOptions {
	/**
	 * When fdc3.open is raised will it only apply to applications that support the intent "OpenApp" (context if passed is sent to the intent handler for OpenApp)
	 * or will it follow the fdc3 approach where all apps can be opened and the defaultContextListener will receive the context if passed.
	 * The default is fdc3. The previous behavior was "intent" and you can set this setting in order to have fdc3 open only apply to apps that say they support the
	 * intent "OpenApp". This setting is here to let you keep the previous behavior.
	 */
	openStrategy?: "intent" | "fdc3";

	/**
	 * How long should the broker wait after launching a view/window for it to register a context handler. The default
	 * is 15000 (15 seconds)
	 */
	contextTimeout?: number;

	/**
	 * How long should the broker wait after launching a view/window for it to connect to the broker. The default
	 * is 15000 (15 seconds).
	 */
	connectionTimeout?: number;
}
