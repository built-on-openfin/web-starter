import type { WebLayoutSnapshot } from "@openfin/core-web";

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
	 * Layout settings
	 */
	layout: {
		layoutContainerId: string;
		defaultLayout: WebLayoutSnapshot;
	};
}
