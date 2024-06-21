import type OpenFin from "@openfin/core";
import type { PlatformApp, AppResolverResponse, AppResolverOptions } from "../../shapes/app-shapes";
import type { Logger } from "../../shapes/logger-shapes";
import { getApps } from "./apps";

/**
 * An App Resolver Used for resolving app selection.
 */
export class AppResolverHelper {
	private readonly _logger: Logger;

	private readonly _appResolverOptions?: AppResolverOptions;

	private readonly _defaultAppResolverHeight: number;

	private readonly _defaultAppResolverWidth: number;

	private readonly _dialogElement: HTMLDialogElement | null = null;

	private _dialogClient: OpenFin.ChannelClient | null = null;

	/**
	 * Create an instance of the Intent Resolver Helper.
	 * @param appResolverOptions options for the helper
	 * @param logger the logger to use.
	 */
	constructor(appResolverOptions: AppResolverOptions, logger: Logger) {
		this._defaultAppResolverHeight = 715;
		this._defaultAppResolverWidth = 665;
		this._appResolverOptions = {
			height: this._defaultAppResolverHeight,
			width: this._defaultAppResolverWidth,
			...appResolverOptions
		};
		this._logger = logger;
		this._dialogElement = document.createElement("dialog");
		this._dialogElement.id = "app-resolver-dialog";
		this._dialogElement.style.height = `${this._appResolverOptions.height}px`;
		this._dialogElement.style.width = `${this._appResolverOptions.width}px`;
		this._dialogElement.style.padding = "0px";
		this._dialogElement.style.backgroundColor = "var(--brand-background)";
		// Create a new iframe element
		const appPicker = document.createElement("iframe");

		// Set the source of the iframe
		appPicker.src = appResolverOptions.url;
		appPicker.style.height = "99%";
		appPicker.style.width = "100%";

		// Append the iframe to the dialog
		this._dialogElement.append(appPicker);

		// Append the dialog to the body
		document.body.append(this._dialogElement);
	}

	/**
	 * Launch the app resolver.
	 * @returns Nothing as it handles the display and hiding of the resolver.
	 */
	public async launchAppResolver(): Promise<void> {
		if (this._dialogElement) {
			this._dialogElement.showModal();
		}
		if (!this._dialogClient && this._dialogClient === null) {
			const appResolverChannel = "app-resolver";
			console.log("Connecting to picker", appResolverChannel);
			this._dialogClient = await fin.InterApplicationBus.Channel.connect(appResolverChannel);

			// eslint-disable-next-line @typescript-eslint/await-thenable
			await this._dialogClient.register("app-resolver-response", async (payload, sender) => {
				const response = payload as {
					appResolverResponse?: AppResolverResponse;
					errorMessage?: string;
				};
				this._logger.info("Received app resolver message", payload);
				if (response.errorMessage) {
					this._logger.error("There was an error with the loaded App Resolver", response.errorMessage);
				} else if (response.appResolverResponse === undefined) {
					this._logger.info("App Resolver response is undefined. No app was selected.");
				} else {
					this._logger.info("The following app was selected: ", response.appResolverResponse);
				}
				if (this._dialogElement) {
					this._dialogElement.close();
				}
			});
		}
		if (this._dialogElement && this._dialogClient) {
			const apps: PlatformApp[] = await getApps();
			await this._dialogClient.dispatch("resolve-app-request", {
				customData: {
					title: this._appResolverOptions?.title,
					apps
				}
			});
		}
	}
}
