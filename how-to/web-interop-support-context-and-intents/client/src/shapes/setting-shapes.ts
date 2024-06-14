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
		app: {
			directory: string;
		};
	};
}
