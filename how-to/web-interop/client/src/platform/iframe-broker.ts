import { init as initBrokerConnection } from "@openfin/core-web/iframe-broker";
import { getSettings } from "./settings";

/**
 * Initializes the OpenFin Web Broker connection.
 * @returns A promise that resolves when the connection is established.
 */
async function init(): Promise<void> {
	const settings = await getSettings();
	if(settings === undefined) {
		console.error("Unable to run the sample as we have been unable to load the web manifest and it's settings from the currently running html page. Please ensure that the web manifest is being served and that it contains the custom_settings section.");
		return;
	}
	return initBrokerConnection({
		sharedWorkerUrl: settings.platform.interop.sharedWorkerUrl
	});
}

init()
	.then(() => {
		console.log("Connected to the OpenFin IFrame Web Broker.");
		return true;
	})
	.catch((err) => console.error(err));
