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
	 * the height you wish the content container to be
	 */
	height?: number;

	/**
	 * the width you wish the content container to be
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

/**
 * Option for the intent.
 */
export interface IntentOptions {
	/**
	 * How long should the broker wait after launching a view/window for it to register an intent handler. The default
	 * is 15000 (15 seconds)
	 */
	intentTimeout?: number;
}

/**
 * Options for the platform interop broker.
 */
export interface PlatformInteropBrokerOptions {
	/**
	 * Intent Resolver configuration if you wish to support intents. It needs to support the functions required by the
	 * platform
	 */
	intentResolver?: IntentResolverOptions;

	/**
	 * Options related to the way this platform supports intents
	 */
	intentOptions?: IntentOptions;

	/**
	 * When fdc3.open is used what settings should be applied?
	 */
	openOptions?: OpenOptions;
}
