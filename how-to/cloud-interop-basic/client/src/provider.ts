import { cloudInteropOverride } from "@openfin/cloud-interop";
import { connect } from "@openfin/web-interop";
import "./util/buffer";
import { getSettings } from "./platform/settings";

/**
 * Initializes the OpenFin Web Broker connection.
 */
async function init(): Promise<void> {
	const error = document.querySelector<HTMLElement>("#error");
	const settings = await getSettings();
	// Connect to the OpenFin Web Broker.
	const fin = await connect({ options: { brokerUrl: settings.platform.brokerUrl } });
	// assign the fin api to the window object to make it globally available for consistency with container/workspace code.
	window.fin = fin;
	if (!settings.cloud?.connectParams?.url?.startsWith("http")) {
		const errorMessage =
			"Required cloud connect parameters are missing or invalid. Please check the settings. You will need configuration provided by OpenFin to connect to the cloud. Running in local only mode.";
		console.error(errorMessage);
		if (error !== null) {
			error.textContent = errorMessage;
		}
		// You may now use the `fin` object and initialize the Broker.
		await fin.Interop.init(settings.platform.providerId);
	} else {
		// You may now use the `fin` object and initialize the Broker with support for cloud interop.
		const cloudOverride = await cloudInteropOverride(settings.cloud?.connectParams);
		await fin.Interop.init(settings.platform.providerId, [cloudOverride]);
	}
}

init()
	.then(() => {
		console.log("Connected to the OpenFin Web Broker.");
		return true;
	})
	.catch((err) => console.error(err));
