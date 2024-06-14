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

	private readonly _unregisteredApp: PlatformApp | undefined;

	private readonly _logger: Logger;

	private readonly _getApp: (appId: string) => Promise<PlatformApp | undefined>;

	private readonly _platformId: string;

	/**
	 * Provides helpful functions related to app ids.
	 * @param getApp The function to use to get an app for validation.
	 * @param platformId The platform id that represents the current platform.
	 * @param logger The logger to use
	 * @param unregisteredApp The app to use as a placeholder for unregistered apps.
	 */
	constructor(
		getApp: (appId: string) => Promise<PlatformApp | undefined>,
		platformId: string,
		logger: Logger,
		unregisteredApp?: PlatformApp
	) {
		this._unregisteredApp = unregisteredApp;
		this._logger = logger;
		this._getApp = getApp;
		this._platformId = platformId;
	}

	/**
	 * Lookup an application identity.
	 * @param clientIdentity The client identity to use.
	 * @returns The application identity.
	 */
	public async lookupAppId(clientIdentity: OpenFin.ClientIdentity): Promise<string | undefined> {
		const name: string = clientIdentity.name;
		let appIdOrUrl: string | undefined;
		if (name.startsWith("internal-generated-")) {
			try {
				const ofView = document.querySelector(`of-view[of-name="${clientIdentity.name}"]`);
				if (!isEmpty(ofView)) {
					const src = ofView.getAttribute("src");
					if (!isEmpty(src)) {
						appIdOrUrl = src;
					}
				}
			} catch {
				// dom element is likely not available yet return undefined
				this._logger.debug("Dom element not available yet for lookupAppId");
				return;
			}
		} else {
			const nameParts = name.split("/");
			if (nameParts.length === 1 || nameParts.length === 2) {
				appIdOrUrl = nameParts[0];
			} else {
				appIdOrUrl = `${nameParts[0]}/${nameParts[1]}`;
			}
		}

		if (!isEmpty(appIdOrUrl)) {
			const appId = await this.validateApp(appIdOrUrl);
			return appId;
		}
	}

	/**
	 * Validates the app id or url.
	 * @param appIdOrUrl The id of the app if it has been determined or the url of the app to be used as an alternative lookup.
	 * @returns The validated app id or undefined if there is no match.
	 */
	private async validateApp(appIdOrUrl: string): Promise<string | undefined> {
		if (this._validatedAppIds.includes(appIdOrUrl)) {
			return this._appMap.get(appIdOrUrl);
		}
		if (this._invalidAppIds.includes(appIdOrUrl)) {
			return;
		}
		// perform a lookup to validate the appId
		const app = await this._getApp(appIdOrUrl);

		if (!isEmpty(app)) {
			this._validatedAppIds.push(appIdOrUrl);
			this._appMap.set(appIdOrUrl, app.appId);
			return app.appId;
		} else if (!isEmpty(this._unregisteredApp)) {
			this._logger.debug(
				`Content that is not an app but runs within the platform is running and a placeholder app has been specified ${this._unregisteredApp?.appId}}.`,
				appIdOrUrl
			);
			this._validatedAppIds.push(appIdOrUrl);
			this._appMap.set(appIdOrUrl, this._unregisteredApp.appId);
			return this._unregisteredApp.appId;
		}
		this._invalidAppIds.push(appIdOrUrl);
		this._logger.warn(
			`AppId ${appIdOrUrl} does not exist in the directory and we do not have an unregistered app fallback. No app id will be returned as it is unconfirmed.`
		);
	}
}
