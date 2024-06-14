import type { OpenFin } from "@openfin/core";
import { type WebLayoutSnapshot, connect } from "@openfin/core-web";
import { getConstructorOverride } from "./platform/broker/interop-override";
import { getDefaultLayout, getSettings } from "./platform/settings";
import type { LayoutManager, LayoutManagerConstructor, LayoutManagerItem } from "./shapes/layout-shapes";

let PARENT_CONTAINER: HTMLElement | null;

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
 * A Create function for layouts.
 * @param fin the fin object.
 * @param layoutName A string for the layout name.
 * @param layout LayoutOptions
 * @param order which position to display in
 */
async function createLayout(
	fin: OpenFin.Fin<OpenFin.EntityType>,
	layoutName: string,
	layout: OpenFin.LayoutOptions,
	order: number
): Promise<void> {
	// Create a new div container for the layout.
	const container = document.createElement("div");
	container.id = layoutName;
	container.className = "col fill";
	container.style.display = order === 0 ? "block" : "none";
	PARENT_CONTAINER?.append(container);

	// Normally you can use state here, but just tracking the order of layouts in localStorage.
	const currentOrder = window.localStorage.getItem("order");
	if (!currentOrder) {
		window.localStorage.setItem("order", "");
	}
	let newOrder = "";
	if (order === 0) {
		newOrder = layoutName;
	} else {
		newOrder = currentOrder ? currentOrder.concat(",", layoutName) : "";
	}
	window.localStorage.setItem("order", newOrder);
	// Finally, call the Layout.create() function to apply the snapshot layout to the div we just created.
	await fin.Platform.Layout.create({ layoutName, layout, container });
}

/**
 * MakeOverride assists in loading the Fin object before the applyLayoutSnapshot Manager call.
 * @param fin the fin object.
 * @param layoutContainerId the layout container id.
 * @returns a function call.
 */
function makeOverride(fin: OpenFin.Fin<OpenFin.EntityType>, layoutContainerId: string) {
	return function layoutManagerOverride(Base: LayoutManagerConstructor): LayoutManagerConstructor {
		/**
		 * @class LayoutManagerBasic
		 * This implementation is the fundamental override for Multiple Layouts in Web.
		 */
		return class LayoutManagerBasic extends Base implements LayoutManager {
			public layoutMapArray: LayoutManagerItem[] = [];

			public layoutContainer = document.querySelector<HTMLElement>(`#${layoutContainerId}`);

			/**
			 * Override for applying multiple snapshots.
			 * @param snapshot The layouts object containing the fixed set of available layouts.
			 */
			public async applyLayoutSnapshot(snapshot: WebLayoutSnapshot): Promise<void> {
				console.log(`Does this exist? ${Boolean(this.layoutContainer)}`);
				if (this.layoutContainer !== null && this.layoutContainer !== undefined) {
					setTimeout(
						() =>
							Object.entries(snapshot.layouts).map(async ([layoutName, layout], i) =>
								createLayout(fin, layoutName, layout, i)
							),
						1000
					);
					console.log("Layouts loaded");
				}
			}
		};
	};
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
	// Get the dom element that should host the layout - This will be the top element holding the children iframes.
	PARENT_CONTAINER = document.querySelector<HTMLElement>(`#${settings.platform.layout.layoutContainerId}`);

	if (PARENT_CONTAINER === null) {
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

	if (fin) {
		// Store the fin object in the window object for easy access.
		window.fin = fin;
		const layoutManagerOverride = makeOverride(fin, settings.platform.layout.layoutContainerId);
		const interopOverride = await getConstructorOverride();
		const overrides = [interopOverride];
		// You may now use the `fin` object to initialize the broker and the layout.
		await fin.Interop.init(settings.platform.interop.providerId, overrides);
		// Show the main container and hide the loading container
		// initialize the layout and pass it the dom element to bind to
		await fin.Platform.Layout.init({ layoutManagerOverride, container: PARENT_CONTAINER });
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
