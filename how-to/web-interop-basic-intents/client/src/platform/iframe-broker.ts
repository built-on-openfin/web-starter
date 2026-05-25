import { init as initBrokerConnection } from "@openfin/core-web/iframe-broker";
import { SHARED_WORKER_URL } from "../config";

/**
 * Initializes the OpenFin Web Broker connection.
 * @returns A promise that resolves when the connection is established.
 */
async function init(): Promise<void> {
	return initBrokerConnection({
		sharedWorkerUrl: SHARED_WORKER_URL
	});
}

init()
	.then(() => {
		console.log("Connected to the OpenFin IFrame Web Broker.");
		return true;
	})
	.catch((err) => console.error(err));
