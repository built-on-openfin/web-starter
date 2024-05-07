import type OpenFin from "@openfin/core";
import { connect, type ConnectConfig } from "@openfin/core-web";
import "./util/buffer";

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
 * Initializes (if required) and returns the fin and fdc3 API objects based on the options provided.
 * @param options - The options to use when initializing the API objects.
 * @returns A promise that resolves with the fin and fdc3 API objects.
 */
export async function init<FDC3 = typeof OpenFin.FDC3.v2_0>(
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
	if (options.connectOptions === undefined) {
		options.connectOptions = DEFAULT_CONNECT_OPTIONS;
	}
	if (options.api.fin) {
		if (typeof window !== "undefined" && typeof (window as unknown as { fin: _Fin }).fin === "object") {
			options.logger.info(
				"Fin API instance already exists. Using the reference that exists in the window object."
			);
			response.fin = (window as unknown as { fin: _Fin }).fin;
		} else {
			try {
				options.logger.info(
					`Creating Fin API instance through @openfin/core-web connect using the following options: ${JSON.stringify(options.connectOptions)}.`
				);
				const newFin = (await connect(options.connectOptions)) as unknown as _Fin;
				response.fin = newFin;
				finInitialized = true;
			} catch (err) {
				options.logger.error(
					`Error creating Fin API instance through @openfin/core-web connect using the following options: ${JSON.stringify(options.connectOptions)}.`,
					err as Error
				);
			}
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
