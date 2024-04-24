import type { ConnectParams } from "@openfin/cloud-interop/dist/interfaces";
/**
 * Settings for the client
 */
export interface Settings {
	/**
	 * Platform settings
	 */
	platform: {
		sharedWorkerUrl: string;
		brokerUrl: string;
		providerId: string;
		defaultContextGroup?: string;
	};

	/**
	 *	Cloud settings
	 */
	cloud: {
		/**
		 * These settings may be subject to change as we get feedback from use cases. Please contact OpenFin for this information.
		 */
		connectParams: ConnectParams;
	};
}
