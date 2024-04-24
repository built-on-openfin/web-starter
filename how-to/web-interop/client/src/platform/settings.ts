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
		},
		layout: {
			layoutContainerId: "layout-container",
			defaultLayout: {
				layouts: {
					tab1: {
						content: [
							{
								type: "row",
								content: [
									{
										title: "Bloomberg",
										type: "component",
										componentName: "view",
										componentState: {
											url: "http://bloomberg.com/"
										}
									},
									{
										title: "OpenFin",
										type: "component",
										componentName: "view",
										componentState: {
											url: "http://www.openfin.co/"
										}
									}
								]
							}
						]
					}
				}
			}
		}
	};
}
