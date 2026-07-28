import type OpenFin from "@openfin/core";
import { type WebLayoutInitOptions, type WebLayoutSnapshot, connect } from "@openfin/core-web";
import type {
	LayoutManager,
	LayoutManagerConstructor,
	WebLayoutManagerConstructor
} from "./shapes/layout-shapes";

const PROVIDER_ID = "web-layout-prevent-reload";
const BROKER_URL = "http://localhost:6060/platform/iframe-broker.html";
const SNAPSHOT_URL = "http://localhost:6060/layouts/default.layout.fin.json";

let PARENT_CONTAINER: HTMLElement | null = null;

/**
 * Gets the default layout snapshot for this app.
 * @returns The snapshot containing the left and right layouts.
 */
async function getDefaultLayout(): Promise<WebLayoutSnapshot> {
	const layoutResponse = await fetch(SNAPSHOT_URL);
	return (await layoutResponse.json()) as WebLayoutSnapshot;
}

/**
 * Writes a message into the header status area.
 * @param message The message to display.
 */
function setStatus(message: string): void {
	const status = document.querySelector<HTMLElement>("#toolbar-status");
	if (status) {
		status.textContent = message;
	}
}

/**
 * Reads whether the shared view container should be supplied to Layout.init.
 * The ?shared=off query param disables it, which restores the legacy
 * reloading behaviour so the two can be compared side by side.
 * @returns True when the shared container should be used.
 */
function isSharedContainerEnabled(): boolean {
	const params = new URLSearchParams(window.location.search);
	return params.get("shared") !== "off";
}

/**
 * Binds the toggle that reloads the host page with the feature on or off.
 */
function wireSharedToggle(): void {
	const toggle = document.querySelector<HTMLButtonElement>("#toolbar-shared");
	if (toggle === null) {
		return;
	}
	const enabled = isSharedContainerEnabled();
	toggle.textContent = `sharedViewContainer: ${enabled ? "ON" : "OFF"}`;
	toggle.classList.toggle("secondary", !enabled);
	toggle.addEventListener("click", () => {
		const url = new URL(window.location.href);
		if (enabled) {
			url.searchParams.set("shared", "off");
		} else {
			url.searchParams.delete("shared");
		}
		window.location.href = url.toString();
	});
}

const MOVED_VIEW = "alpha";
let currentHomeLayout = "left";

/**
 * Walks a layout tree depth-first looking for the first tab stack.
 * TabStack carries a literal `type` of "stack", which is how it is told
 * apart from a ColumnOrRow.
 * @param node The column, row or stack to search.
 * @returns The first stack found, or undefined when this branch has none.
 */
async function findStackIn(
	node: OpenFin.ColumnOrRow | OpenFin.TabStack
): Promise<OpenFin.TabStack | undefined> {
	if (node.type === "stack") {
		return node;
	}
	const content = await node.getContent();
	for (const child of content) {
		const stack = await findStackIn(child);
		if (stack !== undefined) {
			return stack;
		}
	}
	return undefined;
}

/**
 * Finds the first stack in a layout, which is where a moved view is dropped.
 * @param fin The fin object.
 * @param layoutName The name of the layout to search.
 * @returns The first stack found, or undefined when the layout has none.
 */
async function findFirstStack(
	fin: OpenFin.Fin<OpenFin.EntityType>,
	layoutName: string
): Promise<OpenFin.TabStack | undefined> {
	const layout = await fin.Platform.Layout.wrap({
		uuid: fin.me.uuid,
		name: fin.me.name,
		layoutName
	});
	const root = await layout.getRootItem();
	return findStackIn(root);
}

/**
 * Moves a view into another layout.
 *
 * Passing an existing view's identity — rather than creation options — is what
 * makes core-web treat this as a move. It closes the view in whichever layout
 * currently owns it, then rebinds it here. With a sharedViewContainer in play
 * the underlying iframe is reused, so the page never reloads.
 * @param fin The fin object.
 * @param viewName The name of the view to move.
 * @param targetLayoutName The layout to move it into.
 * @returns True when the view was moved, false when no stack was found.
 */
async function moveView(
	fin: OpenFin.Fin<OpenFin.EntityType>,
	viewName: string,
	targetLayoutName: string
): Promise<boolean> {
	const stack = await findFirstStack(fin, targetLayoutName);
	if (stack === undefined) {
		setStatus(`No stack found in "${targetLayoutName}"`);
		return false;
	}
	await stack.addView({ uuid: fin.me.uuid, name: viewName });
	setStatus(`Moved ${viewName} to ${targetLayoutName}`);
	return true;
}

/**
 * Binds the move button, flipping direction on each press so the demo
 * can be run repeatedly without reloading the host page.
 * @param fin The fin object.
 */
function wireMoveButton(fin: OpenFin.Fin<OpenFin.EntityType>): void {
	const button = document.querySelector<HTMLButtonElement>("#toolbar-move");
	if (button === null) {
		return;
	}
	button.disabled = false;
	button.addEventListener("click", async () => {
		const currentLayout = currentHomeLayout;
		const target = currentLayout === "left" ? "right" : "left";
		button.disabled = true;
		try {
			const moved = await moveView(fin, MOVED_VIEW, target);
			if (moved) {
				currentHomeLayout = target;
				button.textContent = `Move ${MOVED_VIEW} → ${currentLayout}`;
			}
		} catch (err) {
			console.error(err);
			setStatus("Move failed — see console");
		} finally {
			button.disabled = false;
		}
	});
}

/**
 * Creates a visible pane for a layout and binds a layout to it.
 * Unlike the tabbed web-layout example every pane stays visible, because
 * cross-layout reparenting can only be observed with both layouts on screen.
 * @param fin The fin object.
 * @param layoutName The name of the layout to create.
 * @param layout The layout options to apply.
 * @returns Nothing.
 */
async function createLayout(
	fin: OpenFin.Fin<OpenFin.EntityType>,
	layoutName: string,
	layout: OpenFin.LayoutOptions
): Promise<void> {
	const container = document.createElement("div");
	container.id = `layout-pane-${layoutName}`;
	container.className = "layout-pane";
	container.dataset.layoutName = layoutName;
	PARENT_CONTAINER?.append(container);

	await fin.Platform.Layout.create({ layoutName, layout, container });
}

/**
 * Builds the layout manager override that creates every snapshot layout side by side.
 * @param fin The fin object.
 * @returns The override function passed to Layout.init.
 */
function makeOverride(
	fin: OpenFin.Fin<OpenFin.EntityType>
): (Base: LayoutManagerConstructor) => WebLayoutManagerConstructor {
	return function layoutManagerOverride(Base: LayoutManagerConstructor): WebLayoutManagerConstructor {
		/**
		 * Creates every layout in the snapshot as a visible sibling pane.
		 */
		return class SideBySideLayoutManager extends Base implements LayoutManager {
			/**
			 * Creates one pane per layout in the snapshot.
			 * @param snapshot The snapshot containing the layouts to apply.
			 * @returns Nothing.
			 */
			public async applyLayoutSnapshot(snapshot: WebLayoutSnapshot): Promise<void> {
				for (const [layoutName, layout] of Object.entries(snapshot.layouts)) {
					await createLayout(fin, layoutName, layout);
				}
				setStatus("Ready");
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
 * Initializes the OpenFin Web Broker connection and both layouts.
 * @returns Nothing.
 */
async function init(): Promise<void> {
	const layoutSnapshot = await getDefaultLayout();

	PARENT_CONTAINER = document.querySelector<HTMLElement>("#layout_container");
	if (PARENT_CONTAINER === null) {
		console.error("Please ensure the document has an element with the id #layout_container.");
		return;
	}

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

	// Interop is initialized here only for parity with the base web-layout example.
	// It is not required by the sharedViewContainer feature this example demonstrates.
	await fin.Interop.init(PROVIDER_ID);

	const useSharedContainer = isSharedContainerEnabled();
	const sharedViewContainer = useSharedContainer
		? document.querySelector<HTMLElement>("#shared_view_container") ?? undefined
		: undefined;

	// This single option is the whole feature. When supplied, every view iframe
	// lives in this element for its entire lifetime, so moving a view between
	// layouts re-binds the existing iframe instead of building a new one.
	// The container element must be anchored to the viewport origin (position: fixed)
	// because core-web positions hosted views using viewport-relative coordinates.
	// `Layout.init` is typed against core's `InitLayoutOptions`, which doesn't declare
	// `sharedViewContainer`; core-web widens it via `WebLayoutInitOptions`, used here instead.
	const layoutInitOptions: WebLayoutInitOptions = {
		container: PARENT_CONTAINER,
		layoutManagerOverride: makeOverride(fin),
		sharedViewContainer
	};
	await fin.Platform.Layout.init(layoutInitOptions);

	wireSharedToggle();
	wireMoveButton(fin);
	console.log(`[provider] sharedViewContainer is ${useSharedContainer ? "enabled" : "disabled"}.`);
}

init()
	.then(() => {
		console.log("Created the OpenFin Web Layouts.");
		return true;
	})
	.catch((err) => console.error(err));
