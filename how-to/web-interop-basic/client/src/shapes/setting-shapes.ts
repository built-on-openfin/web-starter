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
}
