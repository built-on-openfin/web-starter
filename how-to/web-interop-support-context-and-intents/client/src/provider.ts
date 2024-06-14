import { connect } from "@openfin/core-web";
import { getConstructorOverride } from "./platform/broker/interop-override";
import { makeOverride } from "./platform/layout/layout-override";
import { getDefaultLayout, getSettings } from "./platform/settings";

/**
 * Attach listeners to elements.
 */
async function attachListeners(): Promise<void> {
	const swapButton = document.querySelector<HTMLButtonElement>("#swap-layouts");
	swapButton?.addEventListener("click", async () => {
		await swapLayout();
	});
}

/**
 * Returns a layout from the settings with a provided name.
 * @returns The default layout from the settings.
 */
export async function swapLayout(): Promise<void> {
	// Get that order of created div ids from storage, or state, or wherever you want to save them.
	const currentOrder = window.localStorage.getItem("order");
	const layouts = currentOrder?.split(",");
	// This is a simple swap between two, but you can do this anyway you like.
	const firstLayout = document.querySelector<HTMLElement>(`#${layouts ? layouts[0] : null}`);
	const secondLayout = document.querySelector<HTMLElement>(`#${layouts ? layouts[1] : null}`);
	if (firstLayout && secondLayout) {
		if (secondLayout.style.display === "block") {
			firstLayout.style.display = "block";
			secondLayout.style.display = "none";
		} else {
			firstLayout.style.display = "none";
			secondLayout.style.display = "block";
		}
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

	window.addEventListener(
		"message",
		(event) => {
		  // Check the origin of the message
		  // this is where you could check to see if the request is coming from domains registered in your app directory
		  // alternatively this logic could be done in the interop broker when the connection is attempted. These are
		  // just example origins we have put
		  if (
			event.origin !== "https://built-on-openfin.github.io" &&
			!event.origin.startsWith("http://localhost:")
		  ) {
			console.warn(`Incoming request came from an untrusted domain: ${event.origin}`);
			return;
		  }

		  // The data sent with postMessage is stored in event.data
		  const request = event.data;
		  console.log(
			`Incoming request coming from: ${event.origin}. Received request: ${JSON.stringify(request)}`
		  );

		  // this just our example namespace. You could create your own and decide what data to pass.
		  const connectConfigContextType = "openfin.coreWeb.connectConfig";
		  // ensure it is requesting connect details for core web
		  if (request.type === connectConfigContextType) {
			// send back the connect details required by the client
			event.source?.postMessage(
			  {
				type: connectConfigContextType,
				connectConfig: {
				  options: {
					brokerUrl: settings.platform.interop.brokerUrl,
					interopConfig: {
					  providerId: settings.platform.interop.providerId,
					  currentContextGroup: settings.platform.interop.defaultContextGroup
					}
				  }
				}
			  },
			  { targetOrigin: event.origin }
			);
		  }
		},
		false
	  );

	if (fin) {
		// Store the fin object in the window object for easy access.
		window.fin = fin;
		const layoutManagerOverride = makeOverride(
			fin,
			settings.platform.layout.layoutContainerId,
			settings.platform.layout.layoutSelectorId
		);
		const interopOverride = await getConstructorOverride();
		const overrides = [interopOverride];
		// You may now use the `fin` object to initialize the broker and the layout.
		await fin.Interop.init(settings.platform.interop.providerId, overrides);
		// Show the main container and hide the loading container
		// initialize the layout and pass it the dom element to bind to
		await fin.Platform.Layout.init({
			layoutManagerOverride,
			containerId: settings.platform.layout.layoutContainerId
		});
		// setup panels not that everything has been initialized
		await attachListeners();
	}
}

init()
	.then(() => {
		console.log("Connected to the OpenFin Web Broker.");
		return true;
	})
	.catch((err) => console.error(err));
