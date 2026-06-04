import type { AppMetadata } from "@finos/fdc3";
import type { PlatformApp } from "../../shapes/app-shapes";

/**
 * Map the platform app to app metadata.
 * @param app The application to map.
 * @param resultType The result type to include in the data.
 * @returns The app metadata.
 */
export function mapToAppMetaData(app: PlatformApp, resultType?: string): AppMetadata {
	return {
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
}
