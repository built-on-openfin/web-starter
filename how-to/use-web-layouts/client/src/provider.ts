import type OpenFin from "@openfin/core";
import { connect } from "@openfin/core-web";
import "./util/buffer";
import type { WebLayoutSnapshot } from "@openfin/core-web";
import { getDefaultLayout, getSettings } from "./platform/settings";
import type { Settings } from "./shapes/setting-shapes";
import type { LayoutManager, LayoutManagerConstructor, LayoutManagerItem } from "./shapes/shapes";


let PARENT_CONTAINER: HTMLElement | null;
const divMap = new Map();
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
 * Attach listeners to elements.
 */
async function attachListeners(): Promise<void> {
	const swapButton = document.querySelector<HTMLButtonElement>("#swap-layouts");
	swapButton?.addEventListener("click", async () => {
		console.log("Swapped Layout.");
		await swapLayout();
	});
}


/**
 * A Create function for layouts.
 * @param layoutName A string for the layout name.
 * @param layout LayoutOptions
 * @param multiInstanceViewBehavior Default.
 * @param display which position to display in
 */
async function createLayout(layoutName: string,
	layout: OpenFin.LayoutOptions,
	multiInstanceViewBehavior: OpenFin.MultiInstanceViewBehavior,
	display = 1): Promise<void> {
	const container = document.createElement("div");
	container.id = layoutName;
	container.style.width = "100%";
	container.style.height = "100%";
	container.style.padding = "2px";
	container.style.display = display === 0 ? "block" : "none";

	PARENT_CONTAINER?.append(container);
	divMap.set(layoutName, container);
	console.log(`[platform-window] calling Layout.create() for layout ${layoutName}`);
	await window.fin?.Platform.Layout.create({ layoutName, layout, container, multiInstanceViewBehavior });
}

/**
 * Function that returns a class for the Layout.init to invoke.
 * @param Base base constructor
 * @returns LayoutManager child class
 */
function layoutManagerOverride(Base: LayoutManagerConstructor): LayoutManagerConstructor {
	/**
	 * @class LayoutManagerBasic
	 * This implementation is the fundamental
	 */
	return class LayoutManagerBasic extends Base implements LayoutManager {
		public layoutMapArray: LayoutManagerItem[] = [];

		public layoutContainer: HTMLElement = document.querySelector("#layout_container") as HTMLElement;

		public secondContainer: HTMLElement = document.querySelector("#layout_two") as HTMLElement;

		// /**
		//  * @function applyLayoutSnapshot create a layout once per layout in a snapshot.
		//  * @param snapshot layout snapshot
		//  * @returns nothing
		//  */

		// public applyLayoutSnapshot = async ({ layouts }: WebLayoutSnapshot): Promise<void> => {
		// 	console.log("Applying Layout Snapshot", JSON.stringify(layouts, null, 4));
		// 	const secondLayout = await getSecondLayout();

		// 	console.log(`Here's the Second Layout ${JSON.stringify(secondLayout?.layouts)}`);
		// 	await window.fin?.Platform.Layout.create({
		// 		container: this.secondContainer,
		// 		layout: secondLayout?.layouts as WebLayoutOptions,
		// 		layoutName: "layout_two"
		// 	});
		// };

		/**
		 * Override for applying multiple snapshots.
		 * @param layouts something
		 */
		public async applyLayoutSnapshot(layouts: WebLayoutSnapshot): Promise<void> {
			await Promise.all(
				Object.entries(layouts).map(async ([layoutName, layout], i) =>
					createLayout(layoutName, layout, "default", i)
				)
			);

			console.log("Layouts loaded");
		}

		// public async removeLayout(layoutIdentity): Promise<void> {
		// 	console.log(`[platform-window] manager: removeLayout called for ${layoutIdentity.layoutName}`);
		// 	return destroy(layoutIdentity);
		// }
};
}

/**
 * Returns a layout from the settings with a provided name.
 * @returns The default layout from the settings.
 */
export async function swapLayout():
 Promise<void> {
	const newLayout = await fetch("../layouts/secondary.layout.fin.json");
	const layoutJson = (await newLayout.json());
	console.log(`Layout options JSON: ${JSON.stringify(layoutJson)}`);
	const currentLayout = await window.fin?.Platform.Layout.getCurrentLayoutManagerSync();

	await currentLayout?.applyLayoutSnapshot(layoutJson.layouts.default.content);
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
	PARENT_CONTAINER = document.querySelector<HTMLElement>(
		`#${settings.platform.layout.layoutContainerId}`
	);

	console.log(`----PARENT CONTAINER IS: ${PARENT_CONTAINER}----`);

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
		// @ts-expect-error connection inheritance is being set to true and that doesn't expect a platform config
		platform: { layoutSnapshot }
	});

	// You may now use the `fin` object to initialize the broker and the layout.
	await fin.Interop.init(settings.platform.interop.providerId);
	// Show the main container and hide the loading container
	// initialize the layout and pass it the dom element to bind to
	await fin.Platform.Layout.init({ layoutManagerOverride, container: PARENT_CONTAINER });
	// setup panels not that everything has been initialized
	await attachListeners();
	setupPanels(settings);
}

init()
	.then(() => {
		console.log("Connected to the OpenFin Web Broker.");
		return true;
	})
	.catch((err) => console.error(err));

