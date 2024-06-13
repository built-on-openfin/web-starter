/* eslint-disable jsdoc/require-param */
import type OpenFin from "@openfin/core";
import { type WebLayoutSnapshot, connect } from "@openfin/core-web";
import { getDefaultLayout, getSecondLayout, getSettings } from "./platform/settings";
import type { LayoutManager, LayoutManagerConstructor, LayoutManagerItem } from "./shapes/layout-shapes";
import type { Settings } from "./shapes/setting-shapes";

let PARENT_CONTAINER: HTMLElement | null;

/**
 * Sets up panels if supported.
 * @param settings The settings to use.
 */
function setupPanels(settings: Settings): void {
	if (settings?.platform?.layout?.panels?.left) {
		const leftPanel = settings.platform.layout.panels.left;
		const leftPanelFrameContainer = document.querySelector<HTMLElement>(`#${leftPanel.frameContainerId}`);
		const leftPanelFrame = document.querySelector<HTMLIFrameElement>(`#${leftPanel.frameId}`);
		if (leftPanelFrameContainer === null) {
			console.error(
				`Please ensure the document has an element with the following id #${leftPanel.frameContainerId} containing an iframe with an id of #${leftPanel.frameId} so that the layout can be applied.`
			);
			return;
		}
		if (leftPanelFrame === null) {
			console.error(
				`Please ensure the document has an iframe with the following id #${leftPanel.frameId} so that the layout can be applied.`
			);
			return;
		}
		leftPanelFrameContainer.classList.remove("hidden");
		leftPanelFrame.src = leftPanel.url;
		console.log(`Panel ${leftPanel.frameId} has been setup with the url ${leftPanel.url}`);
	} else {
		console.log("No panels require setup.");
	}
}

/**
 * Attach listeners to elements.
 */
async function attachListeners(): Promise<void> {
	const swapButton = document.querySelector<HTMLButtonElement>("#swap-layouts");
	swapButton?.addEventListener("click", async () => {
		await swapLayout();
	});

	const removeLayoutBtn = document.querySelector<HTMLButtonElement>("#remove-layout");
	removeLayoutBtn?.addEventListener("click", async () => {
		const currentLayout = window.fin?.Platform.Layout.getCurrentLayoutManagerSync();
		await currentLayout?.removeLayout({ layoutName: "secondary" } as OpenFin.LayoutIdentity);
	});

	const addLayoutBtn = document.querySelector<HTMLButtonElement>("#add-layout");
	addLayoutBtn?.addEventListener("click", async () => {
		await addLayout();
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
				console.log(`[Apply Layout] Does this exist? ${Boolean(this.layoutContainer)}`);
				if (this.layoutContainer !== null && this.layoutContainer !== undefined) {
					for (const [key, value] of Object.entries(snapshot.layouts)) {
						this.layoutMapArray.push({ layoutName: key, layout: value, container: this.layoutContainer });
					}
					setTimeout(
						() =>
							Object.entries(snapshot.layouts).map(async ([layoutName, layout], i) =>
								createLayout(fin, layoutName, layout, i)
							),
						1000
					);
					console.log("[Apply Layout] Layouts loaded");
					console.log(`[Apply Layout] Layouts are: ${JSON.stringify(this.layoutMapArray)}`);
					window.localStorage.setItem("currentLayout", JSON.stringify(this.layoutMapArray));
				}
			}

			/**
			 * Remove Layout - You guessed it, it removes a layout from the existing array of layouts.
			 * @param id The name of the layout you want removed.
			 */
			public async removeLayout(id: OpenFin.LayoutIdentity): Promise<void> {
				const index = this.layoutMapArray.findIndex((x) => x.layoutName === id.layoutName);
				console.log(`[LM Override] Removing Layout ${id.layoutName}`);
				console.log(`[LM Override] Found layout at index ${index}`);
				await removeThisLayout(id.layoutName);
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
 * Saves the list of layout items to Local Storage.
 * @param updatedLayoutContents List of Layouts to save.
 */
export async function saveLayout(updatedLayoutContents: LayoutManagerItem[]): Promise<void> {
	window.localStorage.setItem("[Save Layout] currentLayoutContents:", JSON.stringify(updatedLayoutContents));

	// const layoutsObj: {
	// 	[key: string]: WebLayoutOptions;
	// } = {};

	// for (const content of updatedLayoutContents) {
	// 	layoutsObj[content.layoutName] = content.layout;
	// }

	// const newSnap: WebLayoutSnapshot = {
	// 	layouts: {}
	// };
	// // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
	// newSnap.layouts = layoutsObj as Record<string, WebLayoutOptions>;
	// const lm = window.fin?.Platform.Layout.getCurrentLayoutManagerSync();
	// await lm?.applyLayoutSnapshot(newSnap);
}

/**
 *	Reads a list of layouts from Local Storage.
 *	@returns List of Layouts.
 */
export function readLayouts(): LayoutManagerItem[] {
	const currentLayouts = window.localStorage.getItem("currentLayout");
	if (currentLayouts) {
		return JSON.parse(currentLayouts) as LayoutManagerItem[];
	}

	return [];
}

/**
 * Adds another layout.
 */
export async function addLayout(): Promise<void> {
	const secondLayoutToAdd = await getSecondLayout();
	console.log("[Add Layout] Grabbing Secondary layout file...");
	if (secondLayoutToAdd !== undefined) {
		const lm = window.fin?.Platform.Layout.getCurrentLayoutManagerSync();
		console.log("[Add Layout] Adding layout");
		await lm?.applyLayoutSnapshot(secondLayoutToAdd);
	} else {
		console.log("[Add Layout] Error adding Layout.  No Secondary Layout exists.");
	}
}

/**
 * Click function to remove a layout by name.
 * @param layoutName the name of a layout.
 */
export async function removeThisLayout(layoutName: string): Promise<void> {
	// remove layout from state.
	const layoutsBefore = readLayouts();
	let layoutsRemoved: LayoutManagerItem[] = [];
	const layoutNameElement = document.querySelector<HTMLElement>(`#${layoutName}`);
	if (layoutsBefore.length > 0 && layoutNameElement !== null) {
		const idx = layoutsBefore.findIndex((x) => x.layoutName === layoutName);
		layoutsRemoved = layoutsBefore.splice(idx, 1);
		console.log(`[Remove Layout] Removed this layout: ${JSON.stringify(layoutsRemoved)}`);
		await saveLayout(layoutsBefore);
		console.log(`[Remove Layout] Layouts After Removal: ${JSON.stringify(layoutsBefore)}`);
		layoutNameElement.remove();
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
	window.fin = fin;
	if (fin) {
		const layoutManagerOverride = makeOverride(fin, settings.platform.layout.layoutContainerId);
		// You may now use the `fin` object to initialize the broker and the layout.
		await fin.Interop.init(settings.platform.interop.providerId);
		// Show the main container and hide the loading container
		// initialize the layout and pass it the dom element to bind to
		await fin.Platform.Layout.init({ layoutManagerOverride, container: PARENT_CONTAINER });
		// setup panels not that everything has been initialized
		await attachListeners();
		setupPanels(settings);
	}
}

init()
	.then(() => {
		console.log("Connected to the OpenFin Web Broker and layout has been applied.");
		return true;
	})
	.catch((err) => console.error(err));
