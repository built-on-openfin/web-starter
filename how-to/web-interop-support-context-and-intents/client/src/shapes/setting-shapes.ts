import type { PlatformLayoutSnapshot } from "./layout-shapes";

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
			layoutSelectorId: string;
			defaultLayout: PlatformLayoutSnapshot | string;
		};
		app: {
			directory: string;
		};
	};
}
