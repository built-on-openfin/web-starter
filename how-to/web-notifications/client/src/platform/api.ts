import { connect, type BaseConnectionOptions } from "@openfin/core-web";
import { getSettings } from "./settings";

/**
 * Initializes the OpenFin Web Broker connection.
 * @param inherit Should we inherit settings from the host (available in the OpenFin layout system) or use settings? Default is true.
 */
export async function init(inherit: boolean = true): Promise<void> {
	// Set window.fin to the `fin` object.
	let options: BaseConnectionOptions | undefined;
	if (window.fin === undefined) {
		if (!inherit) {
			const settings = await getSettings();
			if (settings === undefined) {
				console.error(
					"Unable to run the sample as we have been unable to load the web manifest and it's settings from the currently running html page. Please ensure that the web manifest is being served and that it contains the custom_settings section."
				);
				return;
			}
			debugger;

			options = {
				brokerUrl: settings.platform.interop.brokerUrl,
				interopConfig: {
					providerId: settings.platform.interop.providerId,
					currentContextGroup: settings.platform.interop.defaultContextGroup
				}
			};
		}
		// Specify an interopConfig with a specific provider ID and a context group to initialize the `fin.me.interop` client on connection.
		if (options) {
			window.fin = await connect({
				options
			});
		} else {
			window.fin = await connect({
				connectionInheritance: "enabled"
			});
		}
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
