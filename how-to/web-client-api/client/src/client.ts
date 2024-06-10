import type OpenFin from "@openfin/core";
import { connect, type ConnectConfig } from "@openfin/core-web";

/**
 * A fin api object that is a union of the different fin api objects
 */
type _Fin = OpenFin.Fin<"external connection">;

/**
 * What API objects to initialize and what version of the FDC3 API to use.
 */
interface APIOptions {
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
interface RequestConnectOptions {
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
 * Options for the client API.
 */
interface ClientOptions<T> {
	/**
	 * Which APIs to initialize and what version.
	 */
	api?: APIOptions;
	/**
	 * Should the APIs be assigned to a specific target object.
	 */
	target?: { fin?: _Fin; fdc3?: T };
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

const DEFAULT_LOGGER = {
	error: console.error,
	warn: console.warn,
	info: console.info
};

const DEFAULT_CONNECT_OPTIONS: ConnectConfig = {
	connectionInheritance: "enabled"
};

const DEFAULT_OPTIONS: APIOptions = {
	fin: true,
	fdc3: true,
	fdc3Version: "2.0"
};

/**
 * Requests the connection options from the parent window.
 * @param options - The options to use when requesting the connection options.
 * @returns A promise that resolves with the connection options.
 */
async function requestConnectOptions(options: RequestConnectOptions): Promise<ConnectConfig> {
	return new Promise((resolve, reject) => {
		const requestContext: ConnectOptionsRequestContext = {
			type: "openfin.coreWeb.connectConfig"
		};
		const timer = setTimeout(() => {
			reject(new Error("Timed out waiting for connection options."));
		}, options.timeout ?? 3000);
		/**
		 * Handles the message event and resolves the promise with the connection options.
		 * @param event - The message event.
		 */
		async function messageHandler(event: MessageEvent<ConnectOptionsRequestContext>): Promise<void> {
			if (Array.isArray(options.receivingOrigin) && !options.receivingOrigin.includes(event.origin)) {
				reject(new Error(`Received message from unexpected origin: ${event.origin}`));
			} else if (event.data && event.data.type === "openfin.coreWeb.connectConfig") {
				window.removeEventListener("message", messageHandler);
				const connectConfig = event.data.connectConfig;
				if (connectConfig === undefined) {
					reject(new Error("No connection options were provided."));
				} else {
					clearTimeout(timer);
					resolve(connectConfig);
				}
			}
		}
		window.addEventListener("message", messageHandler);
		let target = window.top ?? window.parent;
		if (options.target === "parent") {
			target = window.parent;
		}
		target.postMessage(requestContext, options.targetOrigin ?? "*");
	});
}

/**
 * Initializes (if required) and returns the fin and fdc3 API objects based on the options provided.
 * @param options - The options to use when initializing the API objects.
 * @returns A promise that resolves with the fin and fdc3 API objects.
 */
export async function getAPI<FDC3 = typeof OpenFin.FDC3.v2_0>(
	options: ClientOptions<FDC3>
): Promise<{ fin?: _Fin; fdc3?: FDC3 }> {
	const response: { fin?: _Fin; fdc3?: FDC3 } = {};
	let finInitialized = false;
	let fdc3Initialized = false;

	if (options.api === undefined) {
		options.api = DEFAULT_OPTIONS;
	}
	if (options.logger === undefined) {
		options.logger = DEFAULT_LOGGER;
	}
	if (options.api.fin) {
		if (typeof window !== "undefined" && typeof (window as unknown as { fin: _Fin }).fin === "object") {
			options.logger.info(
				"Fin API instance already exists. Using the reference that exists in the window object."
			);
			response.fin = (window as unknown as { fin: _Fin }).fin;
		} else {
			let newFin: _Fin | undefined;
			try {
				options.logger.info(
					`Creating Fin API instance through @openfin/core-web connect using the following options. 
					Connect Options: 
					${JSON.stringify(options.connectOptions)} 
					Request Connect Options:
					${JSON.stringify(options.requestConnectOptions)}`
				);
				if (options.connectOptions !== undefined) {
					newFin = (await connect(options.connectOptions)) as unknown as _Fin;
				} else if (
					options.requestConnectOptions !== undefined &&
					options.requestConnectOptions.strategy === "request"
				) {
					const connectConfig = await requestConnectOptions(options.requestConnectOptions);
					newFin = (await connect(connectConfig)) as unknown as _Fin;
				} else {
					newFin = (await connect(DEFAULT_CONNECT_OPTIONS)) as unknown as _Fin;
				}
			} catch (err) {
				if (
					err instanceof Error &&
					err.message.includes("Broker URL was not specified nor provided by a platform container") &&
					options.requestConnectOptions?.strategy === "request-on-failure"
				) {
					try {
						const requestedConnectConfig = await requestConnectOptions(options.requestConnectOptions);
						newFin = (await connect(requestedConnectConfig)) as unknown as _Fin;
					} catch (requestError) {
						options.logger.error(
							`Error creating Fin API instance through @openfin/core-web connect using the following options: 
							Connect Options: 
							${JSON.stringify(options.connectOptions)} 
							Request Connect Options:
							${JSON.stringify(options.requestConnectOptions)}`,
							requestError as Error
						);
					}
				} else {
					options.logger.error(
						`Error creating Fin API instance through @openfin/core-web connect using the following options: 
						Connect Options: 
						${JSON.stringify(options.connectOptions)} 
						Request Connect Options:
						${JSON.stringify(options.requestConnectOptions)}`,
						err as Error
					);
				}
			}
			if (newFin === undefined) {
				throw new Error("Failed to create a fin API instance.");
			}
			response.fin = newFin;
			finInitialized = true;
		}
	}

	if (options.api.fdc3) {
		if (typeof window !== "undefined" && typeof (window as unknown as { fdc3: FDC3 }).fdc3 === "object") {
			options.logger.info(
				"fdc3 API instance already exists. Using the reference that exists in the window object."
			);
			response.fdc3 = (window as unknown as { fdc3: FDC3 }).fdc3;
		} else if (response.fin?.me?.interop?.getFDC3 !== undefined) {
			const fdc3Version = options.api.fdc3Version ?? "2.0";
			try {
				options.logger.info(
					`Creating fdc3 API through the @openfin/core-web getFDC3 function specifying version ${fdc3Version}.`
				);
				response.fdc3 = (await response.fin.me.interop.getFDC3(fdc3Version)) as FDC3;
				fdc3Initialized = true;
			} catch (err) {
				options.logger.error(
					`Error creating fdc3 API through the @openfin/core-web getFDC3 function specifying version ${fdc3Version}.`,
					err as Error
				);
			}
		} else {
			options.logger.error(
				"Creating an fdc3 API through the @openfin/core-web getFDC3 function isn't possible without the @openfin/core-web fin api being available. If you are running inside of a container please enable FDC3 for your view/window."
			);
		}
	}

	if (options.target !== undefined) {
		const targetIsWindow = (options.target as unknown) === window;
		if (response.fin !== undefined) {
			options.target.fin = response.fin;

			if (targetIsWindow && finInitialized) {
				// Create and dispatch the finReady event
				const event = new CustomEvent("finReady");
				window.dispatchEvent(event);
			}
		}
		if (response.fdc3 !== undefined) {
			options.target.fdc3 = response.fdc3;
			if (targetIsWindow && fdc3Initialized) {
				// Create and dispatch the FDC3Ready event
				const event = new CustomEvent("fdc3Ready");
				window.dispatchEvent(event);
			}
		}
	}

	return response;
}
