import { connect, type ConnectConfig } from "@openfin/core-web";
import type {
	APIOptions,
	ClientOptions,
	ConnectOptionsRequestContext,
	DefaultAPIContainerShape,
	DefaultFDC3Type,
	DefaultFinType,
	RequestConnectOptions
} from "./client-shapes";

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
export async function getAPI<FDC3 = DefaultFDC3Type>(
	options: ClientOptions<FDC3>
): Promise<DefaultAPIContainerShape<FDC3>> {
	const response: DefaultAPIContainerShape<FDC3> = {};
	let finInitialized = false;
	let fdc3Initialized = false;

	if (options.api === undefined) {
		options.api = DEFAULT_OPTIONS;
	}
	if (options.logger === undefined) {
		options.logger = DEFAULT_LOGGER;
	}
	if (options.api.fin) {
		if (
			typeof window !== "undefined" &&
			typeof (window as unknown as { fin: DefaultFinType }).fin === "object"
		) {
			options.logger.info(
				"Fin API instance already exists. Using the reference that exists in the window object."
			);
			response.fin = (window as unknown as { fin: DefaultFinType }).fin;
		} else {
			let newFin: DefaultFinType | undefined;
			try {
				options.logger.info(
					`Creating Fin API instance through @openfin/core-web connect using the following options. 
					Connect Options: 
					${JSON.stringify(options.connectOptions)} 
					Request Connect Options:
					${JSON.stringify(options.requestConnectOptions)}`
				);
				if (options.connectOptions !== undefined) {
					options.logger.info("Creating Fin API instance using the connect options provided.");
					newFin = (await connect(options.connectOptions)) as unknown as DefaultFinType;
				} else if (
					options.requestConnectOptions !== undefined &&
					options.requestConnectOptions.strategy === "request"
				) {
					const connectConfig = await requestConnectOptions(options.requestConnectOptions);
					options.logger.info("Creating Fin API instance using the request connect options provided.");
					newFin = (await connect(connectConfig)) as unknown as DefaultFinType;
				} else {
					options.logger.info("Creating Fin API instance using the default connect options.");
					newFin = (await connect(DEFAULT_CONNECT_OPTIONS)) as unknown as DefaultFinType;
				}
			} catch (err) {
				if (
					err instanceof Error &&
					err.message.includes("Broker URL was not specified nor provided by a platform container") &&
					options.requestConnectOptions?.strategy === "request-on-failure"
				) {
					try {
						const requestedConnectConfig = await requestConnectOptions(options.requestConnectOptions);
						options.logger.info(
							"As the broker url was not specified nor provided by a platform provider and request-on-failure was specified as the requestConnectOptions strategy we will try to connect again using this strategy to see if it is supported by the platform."
						);
						newFin = (await connect(requestedConnectConfig)) as unknown as DefaultFinType;
					} catch (requestError) {
						options.logger.error(
							`Error creating Fin API instance through @openfin/core-web connect using the following using the request-on-failure strategy and the following options: 
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
