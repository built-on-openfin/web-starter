import { init as initBrokerConnection } from "@openfin/web-interop/iframe-broker";
import { getSettings } from "./settings";

/**
 * Initializes the OpenFin Web Broker connection.
 * @returns A promise that resolves when the connection is established.
 */
async function init(): Promise<void> {
	const settings = await getSettings();
	return initBrokerConnection({
		sharedWorkerUrl: settings.platform.sharedWorkerUrl
	});
}

init()
	.then(() => {
		console.log("Connected to the OpenFin IFrame Web Broker.");
		return true;
	})
	.catch((err) => console.error(err));
