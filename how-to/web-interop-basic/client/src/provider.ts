import { connect } from "@openfin/core-web";
import { getSettings } from "./platform/settings";

/**
 * Initializes the OpenFin Web Broker connection.
 */
async function init(): Promise<void> {
	const settings = await getSettings();
	// Connect to the OpenFin Web Broker.
	// It is good practice to specify providerId even if content is explicitly specifying it for cases where
	// this provider may use our layout system and allow content to inherit these settings and currentContextGroup
	// which will default any client that uses inheritance through our layout system.
	const fin = await connect({
		options: {
			brokerUrl: settings.platform.brokerUrl,
			interopConfig: {
				providerId: settings.platform.providerId,
				currentContextGroup: settings.platform.defaultContextGroup
			}
		}
	});

	// You may now use the `fin` object.
	await fin.Interop.init(settings.platform.providerId);
}

init()
	.then(() => {
		console.log("Connected to the OpenFin Web Broker.");
		return true;
	})
	.catch((err) => console.error(err));
