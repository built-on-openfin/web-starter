import type { ClientOptions, DefaultAPIContainerShape } from "./client-shapes";

/**
 * This function is used to load the OpenFin API shim if the OpenFin API is not available.
 * Takes a set of options to pass to the shim.
 * @param options The options to pass to the shim.
 */
export async function init(options: ClientOptions): Promise<void> {
	if (window.fin === undefined) {
		console.log("Fin is not available. Importing the OpenFin API shim.");
		const url =
			"https://built-on-openfin.github.io/web-starter/web/v19.1.0/web-client-api/js/web.client.api.bundle.js";
		const webClient = await import(/* webpackIgnore: true */ url);
		console.log("OpenFin API shim script imported.");
		console.log("Checking to see if the document is ready before requesting the API.");
		if (document.readyState === "loading") {
			console.log("Document is still loading. Waiting for it to be ready using DOMContentLoaded.");
			document.addEventListener("DOMContentLoaded", async () => {
				await initWhenReady(webClient, options);
			});
		} else {
			console.log("Document is available. Requesting API.");
			await initWhenReady(webClient, options);
		}
	}
}

/**
 * This function is used to load the OpenFin API shim if the OpenFin API is not available.
 * It will be called when we know the document is ready as the core-web requires DOM access
 * and this is a shim that can be loaded by script and reliant on developers to do it when the
 * document is ready (either through defer or script placement/listeners).
 * @param webClient The web client fetched via import.
 * @param webClient.getAPI The function to get the API.
 * @param options The options to pass to the shim.
 */
async function initWhenReady(
	webClient: { getAPI: (options: ClientOptions) => Promise<DefaultAPIContainerShape> },
	options: ClientOptions
): Promise<void> {
	try {
		console.log("Attempting to get the API with the following options:", options);
		await webClient.getAPI(options);
		console.log("OpenFin API shim applied");
	} catch (error) {
		console.error(
			"Failed to load the OpenFin API shim. Please note this is an example and you should implement your own approach for production.",
			error
		);
	}
}
