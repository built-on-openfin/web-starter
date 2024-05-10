import type { CloudInteropOverrideParams } from "@openfin/cloud-interop";
import type { WebLayoutSnapshot } from "@openfin/core-web";
/**
 * Settings for the client
 */
export interface Settings {
	/**
	 * Platform settings
	 */
	platform: {
		interop: {
			sharedWorkerUrl: string;
			brokerUrl: string;
			providerId: string;
			defaultContextGroup?: string;
		};
		layout: {
			panels?: {
				left?: {
					frameId: string;
					frameContainerId: string;
					url: string;
				};
			};
			layoutContainerId: string;
			defaultLayout: WebLayoutSnapshot | string;
		};
	};
	/**
	 *	Cloud settings
	 */
	cloud: {
		/**
		 * These settings may be subject to change as we get feedback from use cases. Please contact OpenFin for this information.
		 */
		connectParams: CloudInteropOverrideParams;
	};
}
