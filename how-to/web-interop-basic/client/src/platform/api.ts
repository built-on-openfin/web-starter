import { connect } from "@openfin/web-interop";
import "../util/buffer";
import { getSettings } from "./settings";

/**
 * Initializes the OpenFin Web Broker connection.
 */
export async function init(): Promise<void> {
	// Set window.fin to the `fin` object.
	if (window.fin === undefined) {
		const settings = await getSettings();
		// Specify an interopConfig with a specific provider ID and a context group to initialize the `fin.me.interop` client on connection.
		window.fin = await connect({
			options: {
				brokerUrl: settings.platform.brokerUrl,
				interopConfig: {
					providerId: settings.platform.providerId,
					currentContextGroup: settings.platform.defaultContextGroup
				}
			}
		});
		console.log("Finished initializing the fin API.");
		// Create and dispatch the finReady event
		const event = new CustomEvent("finReady");
		window.dispatchEvent(event);
	}

	if (window.fdc3 === undefined && window?.fin?.me.interop?.getFDC3Sync !== undefined) {
		window.fdc3 = fin.me.interop.getFDC3Sync("2.0");
		console.log("Finished initializing the fdc3 API.");
		// Create and dispatch the FDC3Ready event
		const event = new CustomEvent("fdc3Ready");
		window.dispatchEvent(event);
	}
}
