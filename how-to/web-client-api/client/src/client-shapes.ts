import type { OpenFin } from "@openfin/core";
import type { ConnectConfig } from "@openfin/core-web";

/**
 * A fin api object that is a union of the different fin api objects
 */
type _Fin = OpenFin.Fin<"external connection">;
/**
 * What API objects to initialize and what version of the FDC3 API to use.
 */
export interface APIOptions {
	/**
	 * Do you wish to initialize the fin API if it isn't available.
	 */
	fin: boolean;
	/**
	 * Do you wish to initialize the fdc3 API if it isn't available.
	 */
	fdc3: boolean;
	/**
	 * What version of the FDC3 API do you wish to use (default is 2.0 and that is the default type if not specified).
	 */
	fdc3Version?: "1.2" | "2.0";
}

/**
 * When requesting connection options from a parent window this message will be sent with no connectOptions but will be passed
 * back with the connection options filled in.
 */
export interface ConnectOptionsRequestContext {
	/**
	 * The type of context.
	 */
	type: "openfin.coreWeb.connectConfig";
	/**
	 * Connect Config to be returned to the requestor
	 */
	connectConfig?: ConnectConfig;
}

/**
 * If you do not know the connect options and you know that inheritance is not available or you want to try
 * and request the connect options if inheritance fails then this setting can do this by sending a JSON object
 * via postMessage upwards:
 * {
 * type: "openfin.coreWeb.connectConfig"
 * }.
 * The host should return that message back with the connection options:
 * {
 * type: "openfin.coreWeb.connectConfig",
 * connectConfig: // this is the ConnectConfig type from @openfin/core-web
 * }
 */
export interface RequestConnectOptions {
	/**
	 * The target window to send the postMessage to. The default is top to cover child iframes as well.
	 */
	target?: "parent" | "top";
	/**
	 * The origin you are going to request connection details from. The default is * to cover all origins.
	 * Generally for security you should specify the origin of the parent window you are targeting. If your
	 * content can be hosted in multiple origins (dev, uat, prod or even different domains) then you should
	 * restrict where your content can be loaded from using X-Frame-Options: ALLOW-FROM or
	 * Content-Security-Policy: frame-ancestors.
	 */
	targetOrigin?: string;
	/**
	 * The origin you are going to receive connection details from. The default is * to cover all origins.
	 * Generally for security you should specify the origin you expect to receive connection details from.
	 * If your content can be hosted in multiple origins (dev, uat, prod or even different domains) then
	 * you should restrict where your content can be loaded from using X-Frame-Options: ALLOW-FROM or
	 * Content-Security-Policy: frame-ancestors.
	 */
	receivingOrigin?: string[];

	/**
	 * Do you just want to request if no connection details are passed or request if connection inheritance is not available or fails.
	 */
	strategy: "request" | "request-on-failure";

	/**
	 * The timeout in milliseconds to wait for a response. The default is 3000 milliseconds.
	 */
	timeout?: number;
}

/**
 * The default FDC3 type to use if not specified.
 */
export type DefaultFDC3Type = typeof OpenFin.FDC3.v2_0;

/**
 * The default Fin type to use if not specified.
 */
export type DefaultFinType = _Fin;

/**
 * The default target type to use if not specified.
 */
export interface DefaultAPIContainerShape<T = DefaultFDC3Type> {
	/**
	 * The type of Fin API to assign to the target object.
	 */
	fin?: DefaultFinType;
	/**
	 * The type of FDC3 API to assign to the target object.
	 */
	fdc3?: T;
}

/**
 * Options for the client API.
 */
export interface ClientOptions<T = DefaultFDC3Type> {
	/**
	 * Which APIs to initialize and what version.
	 */
	api?: APIOptions;
	/**
	 * Should the APIs be assigned to a specific target object.
	 */
	target?: DefaultAPIContainerShape<T>;
	/**
	 * Do you wish to provide your own logger or use the console.
	 */
	logger?: {
		error: (message: string, error?: Error) => void;
		warn: (message: string) => void;
		info: (message: string) => void;
	};
	/**
	 * Do you want to specify specific connection options for the case of initializing the fin API outside
	 * of an OpenFin container? The default is to enable connection inheritance for content loaded within
	 * an OpenFin Web Layout.
	 */
	connectOptions?: ConnectConfig;

	/**
	 * If you do not know the connect options and you know that inheritance is not available or you want to try
	 * and request the connect options if inheritance fails then this setting can do this by sending a JSON object
	 * via postMessage upwards:
	 * {
	 * type: "openfin.coreWeb.connectConfig"
	 * }.
	 * The host should return that message back with the connection options:
	 * {
	 * type: "openfin.coreWeb.connectConfig",
	 * connectConfig: // this is the ConnectConfig type from @openfin/core-web
	 * }
	 */
	requestConnectOptions?: RequestConnectOptions;
}
