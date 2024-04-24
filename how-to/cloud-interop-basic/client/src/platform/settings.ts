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
			providerId: "cloud-interop-basic",
			defaultContextGroup: "green"
		},
		cloud: {
			connectParams: {
				userId: "<PLEASE ASK OPENFIN FOR A USER ID>",
				password: "<PLEASE ASK OPENFIN FOR A PASSWORD>",
				platformId: "<PLEASE ASK OPENFIN FOR A PLATFORM ID>",
				url: "<PLEASE ASK OPENFIN FOR A URL>",
				sourceId: "cloud-interop-basic",
				sourceDisplayName: "Cloud Interop Basic Example"
			}
		}
	};
}
