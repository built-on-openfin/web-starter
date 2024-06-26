import type OpenFin from "@openfin/core";
import type { PlatformLayoutSnapshot } from "../../shapes/layout-shapes";
import type { Logger } from "../../shapes/logger-shapes";
import type {
	Settings,
	SettingsResolverOptions,
	SettingsResolverResponse
} from "../../shapes/setting-shapes";
import { objectClone } from "../../utils";
import { clearSettings, getSettings, saveSettings } from "./settings";

/**
 * An helper for updating and resolving settings.
 */
export class SettingsResolverHelper {
	private readonly _logger: Logger;

	private readonly _settingsResolverOptions?: SettingsResolverOptions;

	private readonly _defaultSettingsResolverHeight: number;

	private readonly _defaultSettingsResolverWidth: number;

	private readonly _dialogElement: HTMLDialogElement | null = null;

	private _dialogClient: OpenFin.ChannelClient | null = null;

	/**
	 * Create an instance of the Settings Resolver Helper.
	 * @param settingsResolverOptions options for the helper
	 * @param logger the logger to use.
	 */
	constructor(settingsResolverOptions: SettingsResolverOptions, logger: Logger) {
		this._defaultSettingsResolverHeight = 715;
		this._defaultSettingsResolverWidth = 665;
		this._settingsResolverOptions = {
			height: this._defaultSettingsResolverHeight,
			width: this._defaultSettingsResolverWidth,
			...settingsResolverOptions
		};
		this._logger = logger;
		this._dialogElement = document.createElement("dialog");
		this._dialogElement.id = "settings-resolver-dialog";
		this._dialogElement.style.height = `${this._settingsResolverOptions.height}px`;
		this._dialogElement.style.width = `${this._settingsResolverOptions.width}px`;
		this._dialogElement.style.padding = "0px";
		this._dialogElement.style.backgroundColor = "var(--brand-background)";
		// Create a new iframe element
		const settingsResolver = document.createElement("iframe");

		// Set the source of the iframe
		settingsResolver.src = settingsResolverOptions.url;
		settingsResolver.style.height = "99%";
		settingsResolver.style.width = "100%";

		// Append the iframe to the dialog
		this._dialogElement.append(settingsResolver);

		// Append the dialog to the body
		document.body.append(this._dialogElement);
	}

	/**
	 * Launch the settings resolver.
	 * @returns nothing.
	 */
	public async showSettings(): Promise<void> {
		if (this._dialogElement) {
			this._dialogElement.showModal();
		}
		if (!this._dialogClient && this._dialogClient === null) {
			const settingsResolverChannel = "settings-resolver";
			console.log("Connecting to settings resolver", settingsResolverChannel);
			this._dialogClient = await fin.InterApplicationBus.Channel.connect(settingsResolverChannel);

			// eslint-disable-next-line @typescript-eslint/await-thenable
			await this._dialogClient.register("settings-resolver-response", async (payload, sender) => {
				const response = payload as {
					settingsResolverResponse?: SettingsResolverResponse;
					errorMessage?: string;
				};
				if (response.settingsResolverResponse) {
					if (
						response.settingsResolverResponse.action === "save-reload" &&
						response.settingsResolverResponse.settings
					) {
						const settingsToSave = objectClone<Settings>(response.settingsResolverResponse.settings);
						const layoutManager = fin.Platform.Layout.getCurrentLayoutManagerSync<PlatformLayoutSnapshot>();
						settingsToSave.platform.layout.defaultLayout = await layoutManager.getLayoutSnapshot();
						await saveSettings(settingsToSave);
						location.reload();
					} else if (response.settingsResolverResponse.action === "reset-reload") {
						await clearSettings();
						location.reload();
					}
				} else if (response.errorMessage) {
					this._logger.error(response.errorMessage);
				}
				if (this._dialogElement) {
					this._dialogElement.close();
				}
			});
		}
		if (this._dialogElement && this._dialogClient) {
			const settings = await getSettings();
			await this._dialogClient.dispatch("apply-settings", {
				customData: {
					settings
				}
			});
		}
	}
}
