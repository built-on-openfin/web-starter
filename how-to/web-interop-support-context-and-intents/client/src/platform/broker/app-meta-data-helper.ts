import type { AppIdentifier, AppMetadata } from "@finos/fdc3";
import type { PlatformApp } from "../../shapes/app-shapes";

/**
 * Gets app meta data in the right format based on the version.
 * @param apps the apps to get the meta data for.
 * @param findInstances the function to find the instances of an app so you can add them to the meta data.
 * @returns the app meta data.
 */
export async function getAppsMetaData(
	apps: PlatformApp[],
	findInstances: (appId: string) => Promise<AppIdentifier[]>
): Promise<AppMetadata[]> {
	const appsMetaData: AppMetadata[] = [];

	for (const app of apps) {
		const appData = mapToAppMetaData(app);
		const instances = await findInstances(app.appId);
		appsMetaData.push(appData);
		for (const instance of instances) {
			const instanceAppEntry = { ...appData, instanceId: instance.instanceId };
			appsMetaData.push(instanceAppEntry);
		}
	}
	return appsMetaData;
}

/**
 * Map the platform app to app metadata.
 * @param app The application to map.
 * @param resultType The result type to include in the data.
 * @returns The app metadata.
 */
export function mapToAppMetaData(app: PlatformApp, resultType?: string): AppMetadata {
	const appMetaData: AppMetadata = {
		appId: app.appId,
		description: app.description,
		icons: app.icons,
		name: app.name,
		screenshots: app.screenshots,
		title: app.title,
		tooltip: app.tooltip,
		version: app.version,
		resultType
	};
	return appMetaData;
}
