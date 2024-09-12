import type OpenFin from "@openfin/core";
import type { PlatformApp } from "../../shapes/app-shapes";
import type { Logger } from "../../shapes/logger-shapes";
import { isEmpty } from "../../utils";

/**
 * The AppIdHelper class provides helpful functions related to app ids.
 */
export class AppIdHelper {
	private readonly _validatedAppIds: string[] = [];

	private readonly _invalidAppIds: string[] = [];

	private readonly _appMap = new Map<string, string>();

	private readonly _logger: Logger;

	private readonly _getApp: (appId: string) => Promise<PlatformApp | undefined>;

	/**
	 * Provides helpful functions related to app ids.
	 * @param getApp The function to use to get an app for validation.
	 * @param logger The logger to use
	 */
	constructor(getApp: (appId: string) => Promise<PlatformApp | undefined>, logger: Logger) {
		this._logger = logger;
		this._getApp = getApp;
	}

	/**
	 * Lookup an application identity.
	 * @param clientIdentity The client identity to use.
	 * @returns The application identity.
	 */
	public async lookupAppId(clientIdentity: OpenFin.ClientIdentity): Promise<string | undefined> {
		const name: string = clientIdentity.name;
		let appId: string | undefined;
		if (name.startsWith("internal-generated-")) {
			return;
		}
		const nameParts = name.split("/");
		if (nameParts.length === 1 || nameParts.length === 2) {
			appId = nameParts[0];
		} else {
			appId = `${nameParts[0]}/${nameParts[1]}`;
		}

		if (!isEmpty(appId)) {
			appId = await this.validateApp(appId);
		}
		return appId;
	}

	/**
	 * Validates the app id or url.
	 * @param appId The id of the app if it has been determined.
	 * @returns The validated app id or undefined if there is no match.
	 */
	private async validateApp(appId: string): Promise<string | undefined> {
		if (this._validatedAppIds.includes(appId)) {
			return this._appMap.get(appId);
		}
		if (this._invalidAppIds.includes(appId)) {
			return;
		}
		// perform a lookup to validate the appId
		const app = await this._getApp(appId);

		if (!isEmpty(app)) {
			this._validatedAppIds.push(appId);
			this._appMap.set(appId, app.appId);
			return app.appId;
		}
		this._invalidAppIds.push(appId);
		this._logger.warn(
			`AppId ${appId} does not exist in the directory and we do not have an unregistered app fallback. No app id will be returned as it is unconfirmed.`
		);
	}
}
