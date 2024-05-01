import { connect } from "@openfin/core-web";
import "./util/buffer";
import { getDefaultLayout, getSettings } from "./platform/settings";

/**
 * Initializes the OpenFin Web Broker connection.
 */
async function init(): Promise<void> {
	const settings = await getSettings();
	const layoutSnapshot = await getDefaultLayout();
	if(settings === undefined || layoutSnapshot === undefined) {
		console.error("Unable to run the sample as we have been unable to load the web manifest and it's settings from the currently running html page. Please ensure that the web manifest is being served and that it contains the custom_settings section.");
		return;
	}
	const layoutContainer = document.querySelector<HTMLElement>(`#${settings.platform.layout.layoutContainerId}`);
	if(layoutContainer === null) {
		console.error(`Please ensure the document has an element with the following id #${settings.platform.layout.layoutContainerId} so that the web-layout can be applied.`);
		return;
	}
	// Connect to the OpenFin Web Broker.
	const fin = await connect({ options: { brokerUrl: settings.platform.interop.brokerUrl },
		platform: { layoutSnapshot } });

	// You may now use the `fin` object.
	await fin.Interop.init(settings.platform.interop.providerId);
	// initialize the layout and pass it the dom element to bind to
	await fin.Platform.Layout.init({
		container: layoutContainer
	});
}

init()
	.then(() => {
		console.log("Connected to the OpenFin Web Broker.");
		return true;
	})
	.catch((err) => console.error(err));
