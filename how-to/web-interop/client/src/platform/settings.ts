import type { WebLayoutSnapshot } from "@openfin/core-web";
import type { Settings } from "../shapes/setting-shapes";

/**
 * Fetches the settings for the application.
 * @returns The settings for the application.
 */
export async function getSettings(): Promise<Settings | undefined> {
	const settings = await getManifestSettings();
	if (settings === undefined) {
		console.error(
			"Unable to run the example as settings are required and we fetch them from the link web manifest from the html page that is being served. It should exist in the customSettings section of the web manifest."
		);
	}
	return settings;
}

/**
 * Returns a default layout from the settings if provided.
 * @returns The default layout from the settings.
 */
export async function getDefaultLayout(): Promise<WebLayoutSnapshot | undefined> {
	const settings = await getSettings();
	if (settings?.platform?.layout?.defaultLayout === undefined) {
		console.error(
			"Unable to run the example as without a layout being defined. Please ensure that settings have been provided in the web manifest."
		);
		return;
	}
	if (typeof settings.platform.layout.defaultLayout === "string") {
		const layoutResponse = await fetch(settings.platform.layout.defaultLayout);
		const layoutJson = (await layoutResponse.json()) as WebLayoutSnapshot;
		return layoutJson;
	}
	return settings.platform.layout.defaultLayout;
}

/**
 * Returns the settings from the manifest file.
 * @returns customSettings for this example
 */
async function getManifestSettings(): Promise<Settings | undefined> {
	// Get the manifest link
	const link = document.querySelector<HTMLLinkElement>('link[rel="manifest"]');
	if (link !== null) {
		const manifestResponse = await fetch(link.href);
		const manifestJson = (await manifestResponse.json()) as { custom_settings: Settings };
		return manifestJson.custom_settings;
	}
}
