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
	const addLayoutBtn = document.querySelector<HTMLButtonElement>("#add-layout");
	addLayoutBtn?.addEventListener("click", async () => {
		await addLayout();
	});
}

/**
 * Attaches Listeners to Tab Click Events.
 * @param tabName the name of the tab to add the event to.
 */
async function attachTabListener(tabName: string): Promise<void> {
	const tabBtn = document.querySelector<HTMLDivElement>(`#${tabName}`);
	tabBtn?.addEventListener("click", async () => {
		await selectTab(tabName);
	});
}

/**
 * Creates a new tab in the tab row given a specific tab/layout name.
 */
async function createTabBtn(tabName: string): Promise<void> {
	const tabRow = document.querySelector<HTMLDivElement>("#tabs");
	const newTab = document.createElement("div");
	newTab.id = `tab-${tabName}`;
	newTab.className = "tab";
	newTab.style.display = "block";
	newTab.append(document.createTextNode(`${tabName}`));
	const closeBtn = document.createElement("span");
	closeBtn.className = "close-btn";
	closeBtn.innerHTML = "X";
	closeBtn.addEventListener("click", async (e) => {
		await removeTab(tabName);
		e.stopPropagation();
	});
	newTab.append(closeBtn);
	if (tabRow) {
		tabRow.append(newTab);
		if (document.querySelector<HTMLDivElement>(`#tab-${tabName}`)) {
			await attachTabListener(newTab.id);
			await selectTab(tabName);
		}
	}
}

/**
 * Makes a layout and tab active.
 */
async function selectTab(tabName: string, removedTabName?: string): Promise<void> {
	console.log(`Tab ${tabName} selected`);
	let actualName = tabName;
	if (tabName.includes("tab")) {
		const split = tabName.split("-");
		actualName = split[1];
	}
	const currentOrder = window.localStorage.getItem("order");
	if (currentOrder !== "") {
		const layoutsArr = currentOrder?.split(",");
		if (layoutsArr) {
			for (const tab of layoutsArr) {
				if (actualName !== removedTabName) {
					if (tab === actualName) {
						await showTab(tab);
					} else {
						await hideTab(tab);
					}
				}
			}
		}
	}
}

/**
 * Makes a layout and tab hidden.
 */
async function showTab(tabName: string): Promise<void> {
	console.log(`Tab ${tabName} showing...`);
	const currentTab = document.querySelector<HTMLDivElement>(`#${tabName}`);
	if (currentTab) {
		currentTab.style.display = "block";
	}
}

/**
 * Makes a layout and tab hidden.
 */
async function hideTab(tabName: string): Promise<void> {
	console.log(`Tab ${tabName} hiding...`);
	const currentTab = document.querySelector<HTMLDivElement>(`#${tabName}`);
	if (currentTab) {
		currentTab.style.display = "none";
	}
}

/**
 * Removes a layout & tab from the page.
 */
async function removeTab(tabName: string): Promise<void> {
	console.log(`Removing Tab & Layout ${tabName}`);
	const lm = window.fin?.Platform.Layout.getCurrentLayoutManagerSync();
	await lm?.removeLayout({ layoutName: tabName } as OpenFin.LayoutIdentity);
	const tabToRemove = document.querySelector<HTMLDivElement>(`#tab-${tabName}`);
	tabToRemove?.remove();

	const currentOrder = window.localStorage.getItem("order");
	if (currentOrder !== "") {
		const layouts = currentOrder?.split(",");
		const newOrder = layouts?.filter((e) => e !== tabName);
		if (newOrder && newOrder.length > 0) {
			window.localStorage.setItem("order", newOrder.toString());
		} else {
			window.localStorage.setItem("order", "");
		}

		if (newOrder) {
			if (newOrder.length > 0) {
				await selectTab(newOrder[0], tabName);
			} else {
				console.log("There are no layouts loaded.");
				// eslint-disable-next-line no-alert
				alert("There are no layouts loaded.  Please add one.");
			}
		}
	}
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
	container.className = "col layout-container";
	container.style.display = order === 0 ? "block" : "none";
	PARENT_CONTAINER?.append(container);

	// Normally you can use state here, but just tracking the order of layouts in localStorage.
	const currentOrder = window.localStorage.getItem("order");
	let newOrder = "";
	if (!currentOrder || currentOrder === "") {
		newOrder = layoutName;
	} else {
		newOrder = currentOrder?.concat(",", layoutName);
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
							Object.entries(snapshot.layouts).map(async ([layoutName, layout], i) => {
								await createLayout(fin, layoutName, layout, i);
								await createTabBtn(layoutName);
							}),
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
 * Saves the list of layout items to Local Storage.
 * @param updatedLayoutContents List of Layouts to save.
 */
export async function saveLayout(updatedLayoutContents: LayoutManagerItem[]): Promise<void> {
	window.localStorage.setItem("currentLayout", JSON.stringify(updatedLayoutContents));
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
	const addBtn = document.querySelector<HTMLElement>("#add-layout");
	if (addBtn) {
		addBtn.setAttribute("disabled", "disabled");
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
		await fin.Platform.Layout.destroy({ layoutName, uuid: fin.me.uuid, name: fin.me.name });
		if (layoutName === "new") {
			const addBtn = document.querySelector<HTMLElement>("#add-layout");
			if (addBtn) {
				addBtn.removeAttribute("disabled");
			}
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
