import { connect } from "@openfin/core-web";
import "./util/buffer";
import { getSettings } from "./platform/settings";

/**
 * Initializes the OpenFin Web Broker connection.
 */
async function init(): Promise<void> {
	const settings = await getSettings();
	// Connect to the OpenFin Web Broker.
	const fin = await connect({ options: { brokerUrl: settings.platform.brokerUrl } });

	// You may now use the `fin` object.
	await fin.Interop.init(settings.platform.providerId);
}

init()
	.then(() => {
		console.log("Connected to the OpenFin Web Broker.");
		return true;
	})
	.catch((err) => console.error(err));
