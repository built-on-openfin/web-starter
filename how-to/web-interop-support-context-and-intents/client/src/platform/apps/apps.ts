import type { PlatformApp, PlatformAppIdentifier } from "../../shapes/app-shapes";
import type { PlatformLayoutSnapshot } from "../../shapes/layout-shapes";
import { isEmpty, randomUUID } from "../../utils";
import { getSettings } from "../settings";

let cachedApps: PlatformApp[] | undefined;

/**
 * The the app by its id.
 * @param appId The id of the requested app.
 * @returns The app if it was found.
 */
export async function getApp(appId: string): Promise<PlatformApp | undefined> {
	const apps = await getApps();
	const foundApp = apps.find(
		(app) => app.appId === appId || (app.type === "web" && app.details.url === appId)
	);
	return foundApp;
}

/**
 * Get the list of applications and filter if requested.
 * @returns The list of application.
 */
export async function getApps(): Promise<PlatformApp[]> {
	if (cachedApps) {
		return cachedApps;
	}
	const settings = await getSettings();
	if (Array.isArray(settings?.platform?.app?.directory)) {
		// Fetch data from all URLs concurrently
		const responses = await Promise.all(settings.platform.app.directory.map(async (url) => fetch(url)));
		// Parse the JSON from all responses
		const appDirectories = await Promise.all(responses.map(async (response) => response.json()));
		// Combine all applications into a single array
		cachedApps = appDirectories.flatMap((appDirectory) => appDirectory.applications);
		return cachedApps;
	}
	cachedApps = [];
	return cachedApps;
}

/**
 * Launch an application in the way specified by its manifest type.
 * @param platformApp The application to launch or it's id.
 * @returns Identifiers specific to the type of application launched.
 */
export async function launch(
	platformApp: PlatformApp | string
): Promise<PlatformAppIdentifier[] | undefined> {
	// until we have an ability to addViews to a layout we will add a new layout for each app
	// we are currently using the dom to find the of-view to get the name of the view in order
	// to return the identity until the addView api is available
	const currentLayout = window.fin?.Platform.Layout.getCurrentLayoutManagerSync();
	const layoutId = `tab-${randomUUID()}`;
	let appToLaunch: PlatformApp | undefined;
	if (typeof platformApp === "string") {
		appToLaunch = await getApp(platformApp);
	} else {
		appToLaunch = platformApp;
	}
	if (!appToLaunch) {
		return undefined;
	}
	const appSnapshot = getAppLayout(appToLaunch, layoutId, `${appToLaunch.appId}/${randomUUID()}`);
	await currentLayout?.applyLayoutSnapshot(appSnapshot);
	const layoutElement = await getLayoutElement(layoutId);
	if (layoutElement !== null) {
		const ofViewElement = layoutElement.querySelector("of-view");
		if (ofViewElement !== null) {
			const name = ofViewElement.getAttribute("of-name");
			const uuid = ofViewElement.getAttribute("of-uuid");
			if (name !== null && uuid !== null) {
				return [{ name, uuid, appId: appToLaunch.appId }];
			}
		}
	}
	return undefined;
}

/**
 * Brings the targeted app to front.
 * @param platformApp The app to bring to front.
 * @param targets The list of apps to bring to front.
 */
export async function bringAppToFront(
	platformApp: PlatformApp,
	targets: PlatformAppIdentifier[]
): Promise<void> {
	const currentLayout = window.fin?.Platform.Layout.getCurrentLayoutManagerSync();
	if (!isEmpty(currentLayout)) {
		for (const target of targets) {
			const targetLayout = currentLayout.getLayoutIdentityForView(target);
			await currentLayout.showLayout(targetLayout);
		}
	}
}

/**
 * Get the layout for the application.
 * @param platformApp The application to get the layout for.
 * @param layoutId The id of the layout to create for the app.
 * @param viewName The name of the view to create.
 * @returns The layout options.
 */
function getAppLayout(platformApp: PlatformApp, layoutId: string, viewName: string): PlatformLayoutSnapshot {
	const appSnapshot: PlatformLayoutSnapshot = {
		layouts: {},
		layoutTitles: {}
	};
	appSnapshot.layouts[layoutId] = {
		content: [
			{
				type: "row",
				content: [
					{
						type: "column",
						width: 100,
						content: [
							{
								type: "stack",
								width: 50,
								height: 50,
								content: [
									{
										type: "component",
										componentName: "view",
										componentState: {
											url: platformApp.details.url,
											name: viewName
										},
										title: platformApp.title
									}
								]
							}
						]
					}
				]
			}
		]
	};
	appSnapshot.layoutTitles[layoutId] = platformApp.title ?? "App Layout";
	return appSnapshot;
}

/**
 * Wait for the layout and view to be ready.
 * @param layoutId The selector to wait for.
 * @returns The element when it is ready.
 */
async function getLayoutElement(layoutId: string): Promise<Element> {
	return new Promise((resolve, reject) => {
		const layoutIdSelector = `#${layoutId}`;
		const element = document.querySelector(layoutIdSelector);

		if (element) {
			resolve(element);
			return;
		}

		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				const nodes = Array.from(mutation.addedNodes);
				for (const node of nodes) {
					if (node instanceof Element && node.matches?.(layoutIdSelector)) {
						observer.disconnect();
						resolve(node);
						return;
					}
				}
			}
		});

		observer.observe(document.documentElement, { childList: true, subtree: true });
	});
}
