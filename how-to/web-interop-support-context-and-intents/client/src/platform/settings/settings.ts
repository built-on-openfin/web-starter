import type { OpenFin } from "@openfin/core";
import type { ManifestSettings, Settings } from "../../shapes/setting-shapes";

/**
 * Fetches the settings for the application.
 * @returns The settings for the application.
 */
export async function getSettings(): Promise<Settings | undefined> {
	const savedSettings = await getSavedSettings();
	if (savedSettings) {
		return savedSettings;
	}
	const settings = await getManifestSettings();
	if (!Array.isArray(settings?.endpointProvider?.endpoints)) {
		console.error(
			"Unable to run the example as settings are required and we fetch them from the link web manifest from the html page that is being served. It should exist in the customSettings section of the web manifest."
		);
		return;
	}
	const settingsEndpoint = settings.endpointProvider.endpoints.find(
		(endpoint) => endpoint.id === "platform-settings"
	);

	if (
		settingsEndpoint === undefined ||
		settingsEndpoint.type !== "fetch" ||
		settingsEndpoint.options.method !== "GET" ||
		settingsEndpoint.options.url === undefined
	) {
		console.error(
			"Unable to run the example as settings are required and we fetch them from the endpoint defined with the id: 'platform-settings' in the manifest. It needs to be of type fetch, performing a GET and it must have a url defined."
		);
		return;
	}
	const platformSettings = await fetch(settingsEndpoint?.options.url);
	const settingsJson = (await platformSettings.json()) as Settings;
	return settingsJson;
}

/**
 * Returns a default layout from the settings if provided.
 * @returns The default layout from the settings.
 */
export async function getDefaultLayout(): Promise<OpenFin.LayoutSnapshot | undefined> {
	const settings = await getSettings();
	if (settings?.platform?.layout?.defaultLayout === undefined) {
		console.error(
			"Unable to run the example as without a layout being defined. Please ensure that settings have been provided in the web manifest."
		);
		return;
	}
	if (typeof settings.platform.layout.defaultLayout === "string") {
		const layoutResponse = await fetch(settings.platform.layout.defaultLayout);
		const layoutJson = (await layoutResponse.json()) as OpenFin.LayoutSnapshot;
		return layoutJson;
	}
	return settings.platform.layout.defaultLayout;
}

/**
 * Returns the settings from the manifest file.
 * @returns customSettings for this example
 */
async function getManifestSettings(): Promise<ManifestSettings | undefined> {
	// Get the manifest link
	const link = document.querySelector<HTMLLinkElement>('link[rel="manifest"]');
	if (link !== null) {
		const manifestResponse = await fetch(link.href);
		const manifestJson = (await manifestResponse.json()) as { custom_settings: ManifestSettings };
		return manifestJson.custom_settings;
	}
}

/**
 * Clears any saved settings.
 * @returns The saved settings.
 */
export async function clearSettings(): Promise<void> {
	const settingsId = getSavedSettingsId();
	localStorage.removeItem(settingsId);
}

/**
 * Saves the settings.
 * @param settings The settings to save.
 */
export async function saveSettings(settings: Settings): Promise<void> {
	const settingsId = getSavedSettingsId();
	localStorage.setItem(settingsId, JSON.stringify(settings));
}

/**
 * Retrieves saved settings from local storage.
 * @returns The saved settings.
 */
async function getSavedSettings(): Promise<Settings | undefined> {
	const settingsId = getSavedSettingsId();
	const settings = localStorage.getItem(settingsId);
	if (settings !== null) {
		const resolvedSettings: Settings = JSON.parse(settings);
		if (!resolvedSettings?.platform?.cloudInterop?.connectParams?.authenticationType) {
			resolvedSettings.platform.cloudInterop.connectParams.authenticationType = "basic";
		}
		return resolvedSettings;
	}
}

/**
 * Get the Id used for saving and fetching settings from storage.
 * @returns The settings id.
 */
function getSavedSettingsId(): string {
	const urlParams = new URLSearchParams(window.location.search);
	const env = urlParams.get("env");

	const settingsKey = env ? `${env}-settings` : "settings";
	return settingsKey;
}
