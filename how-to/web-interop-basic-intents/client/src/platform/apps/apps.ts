import type { OpenFin } from "@openfin/core";

import { APPS_URL } from "../../config";
import type { PlatformApp, PlatformAppIdentifier } from "../../shapes/app-shapes";
import { randomUUID } from "../helpers/utils";

/**
 * Controls how new views are placed in the layout.
 * - "default": lets the layout decide placement (current behavior).
 * - "same-stack": adds the view as a tab alongside the first existing view.
 * - "split-right": splits the first existing view's stack to the right.
 * - "split-left": splits the first existing view's stack to the left.
 * - "split-top": splits the first existing view's stack to the top.
 * - "split-bottom": splits the first existing view's stack to the bottom.
 */
const VIEW_PLACEMENT: "default" | "same-stack" | "split-right" | "split-left" | "split-top" | "split-bottom" =
	"split-right";

let cachedApps: PlatformApp[] | undefined;

/**
 * Get an app by id or URL.
 * @param appId The requested app id.
 * @returns The app if found.
 */
export async function getApp(appId: string): Promise<PlatformApp | undefined> {
	const apps = await getApps();
	return apps.find((app) => app.appId === appId || app.details.url === appId);
}

/**
 * Get the configured applications.
 * @returns The list of applications from apps.json.
 */
export async function getApps(): Promise<PlatformApp[]> {
	if (cachedApps) {
		return cachedApps;
	}

	const response = await fetch(APPS_URL);
	const data = (await response.json()) as { applications: PlatformApp[] };
	cachedApps = data?.applications;
	return cachedApps ?? [];
}

/**
 * Launch an application in the current OpenFin layout.
 * Placement is controlled by the {@link VIEW_PLACEMENT} constant:
 * - "default": layout decides where to place the view.
 * - "same-stack": adds the view as a tab alongside the first existing view in the layout.
 * - "split-right" | "split-left" | "split-top" | "split-bottom": splits the first existing
 * view's stack and places the new view adjacent in the specified direction.
 * @param platformApp The application to launch.
 * @returns The launched app identity.
 */
export async function launch(
	platformApp: PlatformApp | string
): Promise<PlatformAppIdentifier[] | undefined> {
	try {
		const appToLaunch = typeof platformApp === "string" ? await getApp(platformApp) : platformApp;
		if (!appToLaunch) {
			return undefined;
		}

		const name = `${appToLaunch.appId}/${randomUUID()}`;
		const uuid = fin.me.identity.uuid;
		const appId = appToLaunch.appId;
		const title = appToLaunch.title;
		const layout = fin.Platform.Layout.getCurrentSync();

		const viewOptions = {
			name,
			url: appToLaunch.details.url,
			titlePriority: "options" as const,
			title
		};

		switch (VIEW_PLACEMENT) {
			case "same-stack": {
				// Add the view as a tab in the same stack as an existing view.
				// Uses TabStack.addView() directly since Layout.addView({ targetView })
				// is not supported in the core-web context.
				const targetView = await getFirstViewInLayout(layout);
				if (targetView) {
					const stack = await layout.getStackByViewIdentity(targetView);
					await stack.addView(viewOptions, { index: 1, displayState: "focused" });
				} else {
					// No existing views, fall back to default placement.
					await layout.addView(viewOptions);
				}
				break;
			}
			case "split-right":
			case "split-left":
			case "split-top":
			case "split-bottom": {
				// Split the existing view's stack and place the new view adjacent to it.
				const position = VIEW_PLACEMENT.replace("split-", "") as "right" | "left" | "top" | "bottom";
				const splitTarget = await getFirstViewInLayout(layout);
				if (splitTarget) {
					const stack = await layout.getStackByViewIdentity(splitTarget);
					await stack.createAdjacentStack([viewOptions], { position });
				} else {
					// No existing views, fall back to default placement.
					await layout.addView(viewOptions);
				}
				break;
			}
			default: {
				// Default: let the layout decide where to place the view.
				await layout.addView(viewOptions);
				break;
			}
		}

		return [{ name, uuid, appId }];
	} catch (error) {
		console.error("Error launching app", error);
		return undefined;
	}
}

/**
 * Gets the identity of the first view found in the current layout.
 * Used as a target reference for same-stack and split placement modes.
 * @param layout The current layout instance.
 * @returns The identity of the first view, or undefined if none exist.
 */
async function getFirstViewInLayout(layout: OpenFin.Layout): Promise<OpenFin.Identity | undefined> {
	try {
		const rootItem = await layout.getRootItem();
		if (rootItem.type === "stack") {
			const views = await rootItem.getViews();
			return views[0];
		}
		// Root is a ColumnOrRow, walk down to find the first stack.
		const content = await rootItem.getContent();
		for (const item of content) {
			if (item.type === "stack") {
				const views = await item.getViews();
				if (views.length > 0) {
					return views[0];
				}
			}
		}
		return undefined;
	} catch {
		return undefined;
	}
}
