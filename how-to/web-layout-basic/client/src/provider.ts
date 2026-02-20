import { type WebLayoutSnapshot, connect } from "@openfin/core-web";

const LAYOUT_NAME = "default";

/** Track whether tab headers are currently visible; getLayoutSnapshot() may not return hasHeaders reliably. */
let tabHeadersVisible = true;

/** Layout snapshot with optional settings (e.g. hasHeaders) on the default layout. */
type LayoutSnapshotWithSettings = WebLayoutSnapshot & {
	layouts?: { [name: string]: { settings?: { hasHeaders?: boolean }; content: unknown[] } };
};

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
 * Toggle tab headers by destroying and recreating the layout with hasHeaders flipped.
 * Core-web does not support changing layout settings at runtime; recreation is required.
 */
async function toggleTabHeaders(): Promise<void> {
	const fin = window.fin;
	const container = document.querySelector<HTMLElement>("#layout_container");
	if (!fin || !container) {
		return;
	}
	const lm = fin.Platform.Layout.getCurrentLayoutManagerSync();
	if (!lm) {
		return;
	}
	const snapshot = (await lm.getLayoutSnapshot()) as LayoutSnapshotWithSettings;
	const defaultLayout = snapshot?.layouts?.[LAYOUT_NAME];
	if (!defaultLayout) {
		return;
	}
	tabHeadersVisible = !tabHeadersVisible;
	const modified: LayoutSnapshotWithSettings = JSON.parse(JSON.stringify(snapshot));
	if (!modified.layouts) {
		return;
	}
	modified.layouts[LAYOUT_NAME] = {
		...modified.layouts[LAYOUT_NAME],
		settings: { ...modified.layouts[LAYOUT_NAME].settings, hasHeaders: tabHeadersVisible }
	};
	const newLayout = modified.layouts[LAYOUT_NAME];
	await fin.Platform.Layout.destroy({
		layoutName: LAYOUT_NAME,
		uuid: fin.me.uuid,
		name: fin.me.name
	});
	await fin.Platform.Layout.create({
		layoutName: LAYOUT_NAME,
		layout: newLayout as Parameters<typeof fin.Platform.Layout.create>[0]["layout"],
		container
	});
}

/**
 * Initializes the OpenFin Web Broker connection.
 */
async function init(): Promise<void> {
	// Get the default layout
	const layoutSnapshot = await getDefaultLayout();

	if (layoutSnapshot === undefined) {
		console.error("Unable to run the sample as we have been unable to load the default snapshot.");
		return;
	}
	// Get the dom element that should host the layout
	const layoutContainer = document.querySelector<HTMLElement>("#layout_container");
	if (layoutContainer === null) {
		console.error(
			"Please ensure the document has an element with the following id #layout_container so that the web-layout can be applied."
		);
		return;
	}
	// Connect to the OpenFin Web Broker and pass the default layout.
	// It is good practice to specify providerId even if content is explicitly specifying it for cases where
	// this provider uses our layout system and content uses inheritance. currentContextGroup
	// is useful for defaulting any client that uses inheritance through our layout system.
	const fin = await connect({
		connectionInheritance: "enabled",
		options: {
			brokerUrl: "http://localhost:6060/platform/iframe-broker.html",
			interopConfig: {
				providerId: "web-layout-basic",
				currentContextGroup: "green"
			}
		},
		platform: { layoutSnapshot }
	});

	// You may now use the `fin` object to initialize the broker and the layout.
	await fin.Interop.init("web-layout-basic");
	// initialize the layout and pass it the dom element to bind to
	await fin.Platform.Layout.init({
		container: layoutContainer
	});

	window.fin = fin;
	const toggleBtn = document.querySelector<HTMLButtonElement>("#toggle_tab_headers");
	toggleBtn?.addEventListener("click", () => {
		toggleTabHeaders().catch((err) => console.error("Toggle tab headers failed:", err));
	});
}

init()
	.then(() => {
		console.log("Created the OpenFin Web Layout.");
		return true;
	})
	.catch((err) => console.error(err));
