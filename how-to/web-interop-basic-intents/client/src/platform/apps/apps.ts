import { APPS_URL } from "../../config";
import type { PlatformApp, PlatformAppIdentifier } from "../../shapes/app-shapes";
import { randomUUID } from "../helpers/utils";

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
 * Launch an application as a new tab in the current OpenFin layout.
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

		await fin.Platform.Layout.getCurrentSync().addView({
			name,
			url: appToLaunch.details.url,
			titlePriority: "options",
			title
		});

		return [{ name, uuid, appId }];
	} catch (error) {
		console.error("Error launching app", error);
		return undefined;
	}
}
