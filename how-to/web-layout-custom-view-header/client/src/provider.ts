import type OpenFin from "@openfin/core";
import {
	type WebCreateLayoutOptions,
	type WebLayoutOptions,
	type WebLayoutSnapshot,
	connect
} from "@openfin/core-web";
import type {
	LayoutManager,
	LayoutManagerConstructor,
	WebLayoutManagerConstructor
} from "./shapes/layout-shapes";

const PROVIDER_ID = "web-layout-custom-view-header";
const BROKER_URL = "http://localhost:6060/platform/iframe-broker.html";
const SNAPSHOT_URL = "http://localhost:6060/layouts/default.layout.fin.json";

let PARENT_CONTAINER: HTMLElement | null = null;

/**
 * Gets the default layout snapshot for this app.
 * @returns The snapshot containing the tabbed layout.
 */
async function getDefaultLayout(): Promise<WebLayoutSnapshot> {
	const layoutResponse = await fetch(SNAPSHOT_URL);
	return (await layoutResponse.json()) as WebLayoutSnapshot;
}

/**
 * Announces the result of a tab control action.
 * @param message The message to display.
 */
function showStatus(message: string): void {
	const status = document.querySelector<HTMLElement>("#status");
	if (status) {
		status.textContent = message;
	}
}

/**
 * Creates a tab control button.
 *
 * The `lm_tab_custom_control` class is what enrolls the button in the layout's tab chrome:
 * keyboard navigation, pointer isolation so a click doesn't activate or close the tab, and
 * the default control sizing.
 * @param label The accessible label and tooltip.
 * @param text The visible control glyph.
 * @returns The control button.
 */
function createControl(label: string, text: string): HTMLButtonElement {
	const button = document.createElement("button");
	button.type = "button";
	button.className = "lm_tab_custom_control custom-tab-control";
	button.ariaLabel = label;
	button.title = label;
	button.textContent = text;
	return button;
}

/**
 * Injects the example controls into a view tab.
 *
 * Core Web calls this once per tab after it has finished building the tab DOM, and it only
 * calls it when the layout sets `tabOverflowBehavior: "scroll"`. The controls are inserted
 * relative to the anchors on the context so that they remain direct children of the tab.
 * @param tabElement The `.lm_tab` element for the view tab.
 * @param context The DOM anchors and view identity for the tab.
 * @returns The cleanup function called when the tab is destroyed.
 */
function renderCustomTabControls(
	tabElement: HTMLElement,
	context: OpenFin.CustomTabControlsContext
): () => void {
	const bookmarkButton = createControl("Bookmark view", "★");
	const detailsButton = createControl("Show view identity", "ⓘ");

	let bookmarked = false;

	/**
	 * Toggles the example's local bookmarked state.
	 */
	function onBookmark(): void {
		bookmarked = !bookmarked;
		bookmarkButton.ariaPressed = String(bookmarked);
		showStatus(`${context.viewIdentity.name} is ${bookmarked ? "bookmarked" : "not bookmarked"}.`);
	}

	/**
	 * Displays the identity supplied by the tab callback context.
	 */
	function onDetails(): void {
		showStatus(`Selected view: ${context.viewIdentity.uuid}/${context.viewIdentity.name}`);
	}

	bookmarkButton.addEventListener("click", onBookmark);
	detailsButton.addEventListener("click", onDetails);

	if (context.faviconElement) {
		context.faviconElement.after(bookmarkButton);
	} else {
		context.titleElement.before(bookmarkButton);
	}

	if (context.closeElement) {
		context.closeElement.before(detailsButton);
	} else {
		context.titleElement.after(detailsButton);
	}

	return function cleanup(): void {
		bookmarkButton.removeEventListener("click", onBookmark);
		detailsButton.removeEventListener("click", onDetails);
		bookmarkButton.remove();
		detailsButton.remove();
	};
}

/**
 * Creates a layout bound to the host container, passing the tab control renderer.
 *
 * The renderer can only be supplied through `Layout.create`, which is why this example applies
 * its snapshot through a layout manager override instead of letting the default manager do it.
 * @param fin The fin object.
 * @param layoutName The name of the layout to create.
 * @param layout The layout options to apply.
 * @param container The element the layout is bound to.
 */
async function createLayout(
	fin: OpenFin.Fin<OpenFin.EntityType>,
	layoutName: string,
	layout: WebLayoutOptions,
	container: HTMLElement
): Promise<void> {
	const createOptions: WebCreateLayoutOptions = {
		container,
		layoutName,
		layout,
		renderCustomTabControls
	};
	await fin.Platform.Layout.create(createOptions);
}

/**
 * Builds the layout manager override that applies the snapshot with custom tab controls.
 * @param fin The fin object.
 * @param container The element the layouts are bound to.
 * @returns The override function passed to Layout.init.
 */
function makeOverride(
	fin: OpenFin.Fin<OpenFin.EntityType>,
	container: HTMLElement
): (Base: LayoutManagerConstructor) => WebLayoutManagerConstructor {
	return function layoutManagerOverride(Base: LayoutManagerConstructor): WebLayoutManagerConstructor {
		/**
		 * Applies every layout in the snapshot with the tab control renderer attached.
		 */
		return class CustomTabHeaderLayoutManager extends Base implements LayoutManager {
			/**
			 * Creates each layout in the snapshot.
			 * @param snapshot The snapshot containing the layouts to apply.
			 */
			public async applyLayoutSnapshot(snapshot: WebLayoutSnapshot): Promise<void> {
				for (const [layoutName, layout] of Object.entries(snapshot.layouts)) {
					await createLayout(fin, layoutName, layout, container);
				}
			}

			/**
			 * Returns the current layout snapshot. `Base` is typed against core's
			 * `LayoutSnapshot`, but at runtime core-web's implementation always returns a
			 * `WebLayoutSnapshot`, so the result is narrowed to match.
			 * @returns The current snapshot.
			 */
			public async getLayoutSnapshot(): Promise<WebLayoutSnapshot> {
				return (await super.getLayoutSnapshot()) as WebLayoutSnapshot;
			}
		};
	};
}

/**
 * Initializes the OpenFin Web Broker connection and the layout.
 */
async function init(): Promise<void> {
	// Get the default layout
	const layoutSnapshot = await getDefaultLayout();

	// Get the dom element that should host the layout
	PARENT_CONTAINER = document.querySelector<HTMLElement>("#layout_container");
	if (PARENT_CONTAINER === null) {
		console.error(
			"Please ensure the document has an element with the following id #layout_container so that the web-layout can be applied."
		);
		return;
	}

	// Connect to the OpenFin Web Broker and pass the default layout.
	const fin = await connect({
		connectionInheritance: "enabled",
		options: {
			brokerUrl: BROKER_URL,
			interopConfig: {
				providerId: PROVIDER_ID,
				currentContextGroup: "green"
			}
		},
		platform: { layoutSnapshot }
	});
	window.fin = fin;

	// You may now use the `fin` object to initialize the broker and the layout.
	await fin.Interop.init(PROVIDER_ID);

	// The override is where this example differs from web-layout-basic. Layout.init applies the
	// snapshot, but only Layout.create takes renderCustomTabControls, so the override applies the
	// snapshot itself in order to pass the callback.
	await fin.Platform.Layout.init({
		container: PARENT_CONTAINER,
		layoutManagerOverride: makeOverride(fin, PARENT_CONTAINER)
	});

	const tabCount = PARENT_CONTAINER.querySelectorAll(".lm_tab").length;
	const controlCount = PARENT_CONTAINER.querySelectorAll(".lm_tab_custom_control").length;
	showStatus(`Ready: ${tabCount} tabs and ${controlCount} custom controls.`);
}

init()
	.then(() => {
		console.log("Created the OpenFin Web Layout with custom view tab headers.");
		return true;
	})
	.catch((err) => console.error(err));
