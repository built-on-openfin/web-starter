import type { Settings } from "../shapes/setting-shapes";

/**
 * Fetches the settings for the application.
 * @returns The settings for the application.
 */
export async function getSettings(): Promise<Settings> {
	return {
		platform: {
			sharedWorkerUrl: "http://localhost:6060/js/shared-worker.bundle.js",
			brokerUrl: "http://localhost:6060/platform/iframe-broker.html",
			providerId: "web-interop-basic",
			defaultContextGroup: "green"
		}
	};
}
