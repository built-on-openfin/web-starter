import { connect } from "@openfin/core-web";
import { getDefaultLayout, getSettings } from "./platform/settings";
import type { Settings } from "./shapes/setting-shapes";

/**
 * Sets up panels if supported.
 * @param settings The settings to use.
 */
function setupPanels(settings: Settings): void {
	if (settings?.platform?.layout?.panels?.left) {
		const leftPanel = settings.platform.layout.panels.left;
		const leftPanelFrame = document.querySelector<HTMLIFrameElement>(`#${leftPanel.frameId}`);
		if (leftPanelFrame === null) {
			console.error(
				`Please ensure the document has an element with the following id #${leftPanel.frameContainerId} so that the web-layout can be applied.`
			);
			return;
		}
		leftPanelFrame.src = leftPanel.url;
		console.log(`Panel ${leftPanel.frameId} has been setup with the url ${leftPanel.url}`);
	} else {
		console.log("No panels require setup.");
	}
}

/**
 * Initializes the OpenFin Web Broker connection.
 */
async function init(): Promise<void> {
	// Get the required settings
	const settings = await getSettings();
	// Get the default layout
	const layoutSnapshot = await getDefaultLayout();

	if (settings === undefined || layoutSnapshot === undefined) {
		console.error(
			"Unable to run the sample as we have been unable to load the web manifest and it's settings from the currently running html page. Please ensure that the web manifest is being served and that it contains the custom_settings section."
		);
		return;
	}
	// Get the dom element that should host the layout
	const layoutContainer = document.querySelector<HTMLElement>(
		`#${settings.platform.layout.layoutContainerId}`
	);
	if (layoutContainer === null) {
		console.error(
			`Please ensure the document has an element with the following id #${settings.platform.layout.layoutContainerId} so that the web-layout can be applied.`
		);
		return;
	}
	// Connect to the OpenFin Web Broker and pass the default layout.
	// It is good practice to specify providerId even if content is explicitly specifying it for cases where
	// this provider uses our layout system and content uses inheritance. currentContextGroup
	// is useful for defaulting any client that uses inheritance through our layout system.
	const fin = await connect({
		options: {
			brokerUrl: settings.platform.interop.brokerUrl,
			interopConfig: {
				providerId: settings.platform.interop.providerId,
				currentContextGroup: settings.platform.interop.defaultContextGroup
			}
		},
		connectionInheritance: "enabled",
		platform: { layoutSnapshot }
	});

	// You may now use the `fin` object to initialize the broker and the layout.
	await fin.Interop.init(settings.platform.interop.providerId);

	// initialize the layout and pass it the dom element to bind to
	await fin.Platform.Layout.init({
		container: layoutContainer
	});
	// setup panels not that everything has been initialized
	setupPanels(settings);
}

init()
	.then(() => {
		console.log("Connected to the OpenFin Web Broker.");
		return true;
	})
	.catch((err) => console.error(err));
