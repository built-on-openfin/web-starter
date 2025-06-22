import { type WebLayoutSnapshot, connect } from "@openfin/core-web";
import { initNotificationCenter } from "@openfin/web-notifications";
import { getSettings } from "./platform/settings";

/**
 * Gets the default layout for this app.
 * @returns The default layout for this app.
 */
async function getDefaultLayout(): Promise<WebLayoutSnapshot> {
	const layoutResponse = await fetch("http://localhost:6060/layouts/default.layout.fin.json");
	const layoutJson = (await layoutResponse.json()) as WebLayoutSnapshot;
	return layoutJson;
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

	if (layoutSnapshot === undefined) {
		console.error("Unable to run the sample as we have been unable to load the default snapshot.");
		return;
	}

	// Get the dom element to host the layout
	const layoutContainer = document.querySelector<HTMLElement>("#layout_container");
	if (layoutContainer === null) {
		console.error(
			"Please ensure the document has an element with the following id #layout_container so that the web-layout can be applied."
		);
		return;
	}

	// Get the dom element to host the notification center
	const notificationCenterContainer = document.querySelector<HTMLElement>("#notification_center_container");
	if (notificationCenterContainer === null) {
		console.error(
			"Please ensure the document has an element with the following id #notification_center_container for the notification center"
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
		platform: { layoutSnapshot },
		logLevel: "info"
	});

	// You may now use the `fin` object to initialize the broker and the layout.
	await fin.Interop.init(settings.platform.interop.providerId);
	// initialize the layout and pass it the dom element to bind to
	await fin.Platform.Layout.init({
		container: layoutContainer
	});

	await initNotificationCenter({
		finContext: fin,
		serviceId: settings.platform.notificationServiceId,
		container: notificationCenterContainer
	});
}

init()
	.then(() => {
		console.log("Connected to the OpenFin Web Broker and layout has been applied.");
		return true;
	})
	.catch((err) => console.error(err));
