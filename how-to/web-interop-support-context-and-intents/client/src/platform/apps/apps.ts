import type { PlatformApp, PlatformAppIdentifier } from "../../shapes/app-shapes";
import type { PlatformLayoutSnapshot } from "../../shapes/layout-shapes";
import { isEmpty, randomUUID } from "../../utils";
import { getSettings } from "../settings/settings";

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
 * Formats the app title and adds a count suffix to disambiguate the tabs.
 * @param app The app for which to format the title
 * @returns The formatted title, with a count suffix if multiple instances exist
 */
async function formatAppTitleWithSuffix(app: PlatformApp): Promise<string | undefined> {
	const layout = fin.Platform.Layout.getCurrentSync();
	const views = await layout.getCurrentViews();
	const existingInstances = views.filter((view) => view.identity.name.split("/")[0] === app.appId);
	return existingInstances && existingInstances.length > 0
		? `${app.title} (${existingInstances.length})`
		: app.title;
}

/**
 * Launch an application in the way specified by its manifest type.
 * @param platformApp The application to launch or it's id.
 * @param target The target layout to launch the app in.
 * @param target.layout target the current layout
 * @returns Identifiers specific to the type of application launched.
 */
export async function launch(
	platformApp: PlatformApp | string,
	target?: { layout: boolean }
): Promise<PlatformAppIdentifier[] | undefined> {
	try {
		let appToLaunch: PlatformApp | undefined;
		if (typeof platformApp === "string") {
			appToLaunch = await getApp(platformApp);
		} else {
			appToLaunch = platformApp;
		}
		if (!appToLaunch) {
			return undefined;
		}

		const name = `${appToLaunch.appId}/${randomUUID()}`;
		const uuid = fin.me.identity.uuid;
		const appId = appToLaunch.appId;
		const title = await formatAppTitleWithSuffix(appToLaunch);

		if (target?.layout) {
			await window?.fin?.Platform.Layout.getCurrentSync().addView({
				name,
				url: appToLaunch.details.url,
				titlePriority: "options",
				title
			});
		} else {
			const currentLayout = window.fin?.Platform.Layout.getCurrentLayoutManagerSync();
			const layoutId = `tab-${randomUUID()}`;
			const appSnapshot = getAppLayout(appToLaunch, layoutId, name, title);
			await currentLayout?.applyLayoutSnapshot(appSnapshot);
		}
		return [{ name, uuid, appId }];
	} catch (error) {
		console.error("Error launching app", error);
		return undefined;
	}
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
			if (targetLayout === undefined) {
				console.error("Target layout for view not found");
			} else {
				await currentLayout.showLayout(targetLayout);
			}
		}
	}
}

/**
 * Get the layout for the application.
 * @param platformApp The application to get the layout for.
 * @param layoutId The id of the layout to create for the app.
 * @param viewName The name of the view to create.
 * @param title Preferred title for the new tab, or otherwise will use document.title
 * @returns The layout options.
 */
function getAppLayout(
	platformApp: PlatformApp,
	layoutId: string,
	viewName: string,
	title: string | undefined
): PlatformLayoutSnapshot {
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
											name: viewName,
											titlePriority: "options"
										},
										title
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
