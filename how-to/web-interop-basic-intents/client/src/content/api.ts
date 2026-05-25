import { connect, type BaseConnectionOptions } from "@openfin/core-web";
import { BROKER_URL, PROVIDER_ID } from "../config";

/**
 * Initializes the OpenFin Web Broker connection.
 * @param inherit Should we inherit settings from the host (available in the OpenFin layout system) or use settings? Default is true.
 */
export async function init(inherit: boolean = true): Promise<void> {
	// Set window.fin to the `fin` object.
	let options: BaseConnectionOptions | undefined;
	if (window.fin === undefined) {
		if (!inherit) {
			options = {
				brokerUrl: BROKER_URL,
				interopConfig: {
					providerId: PROVIDER_ID,
					currentContextGroup: "green"
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

/**
 * Waits for the fdc3 API to become available on the window.
 * @returns A promise that resolves when fdc3 is ready.
 */
export async function waitForFdc3Ready(): Promise<void> {
	if (window.fdc3) {
		return;
	}
	return new Promise<void>((resolve) => {
		window.addEventListener("fdc3Ready", () => resolve(), { once: true });
	});
}
