import type { Settings } from "../shapes/setting-shapes";

window.addEventListener("DOMContentLoaded", async () => {
	if (window.fdc3) {
		await init();
	} else {
		window.addEventListener("fdc3Ready", async () => {
			await init();
		});
	}
});

/**
 * Initialize the settings.
 */
async function init(): Promise<void> {
	// platform settings
	const title = document.querySelector<HTMLInputElement>("#title");
	const subTitle = document.querySelector<HTMLInputElement>("#subTitle");
	const logo = document.querySelector<HTMLInputElement>("#logo");

	// cloud settings
	const username = document.querySelector<HTMLInputElement>("#username");
	const password = document.querySelector<HTMLInputElement>("#password");
	const platformId = document.querySelector<HTMLInputElement>("#platformId");
	const cloudUrl = document.querySelector<HTMLInputElement>("#cloudUrl");
	const sourceId = document.querySelector<HTMLInputElement>("#sourceId");

	const saveButton = document.querySelector<HTMLButtonElement>("#save");
	const resetButton = document.querySelector<HTMLButtonElement>("#reset");
	const cancelButton = document.querySelector<HTMLButtonElement>("#cancel");

	// assign returned settings to the input fields
	if (
		title === null ||
		subTitle === null ||
		logo === null ||
		username === null ||
		password === null ||
		platformId === null ||
		cloudUrl === null ||
		sourceId === null ||
		saveButton === null ||
		resetButton === null ||
		cancelButton === null ||
		window.fin === undefined
	) {
		console.error("Unable to use settings as there are missing input fields/buttons.");
		return;
	}

	const settingsResolverChannel = "settings-resolver";
	console.log("Settings dialog initialized", settingsResolverChannel);

	const settingsResolverService =
		await window.fin.InterApplicationBus.Channel.create(settingsResolverChannel);

	let appliedSettings: Settings | undefined;

	console.log("Registering apply-settings handler...");
	settingsResolverService.register("apply-settings", async (data) => {
		const settings = (data as { customData: { settings: Settings } }).customData.settings;
		title.value = settings?.platform?.ui?.title;
		subTitle.value = settings?.platform?.ui?.subTitle;
		logo.value = settings?.platform?.ui?.logo;
		username.value = settings?.platform.cloudInterop?.connectParams?.basicAuthenticationParameters?.username ?? "";
		password.value = settings?.platform.cloudInterop?.connectParams?.basicAuthenticationParameters?.password ?? "";
		platformId.value = settings?.platform.cloudInterop?.connectParams?.platformId;
		cloudUrl.value = settings?.platform.cloudInterop?.connectParams?.url;
		sourceId.value = settings?.platform.cloudInterop?.connectParams.sourceId ?? "";
		appliedSettings = settings;
	});

	saveButton.addEventListener("click", async () => {
		console.log(`And appliedSettings is.... ${appliedSettings}`);
		if (appliedSettings === undefined) {
			console.error("Unable to save settings as they are not defined.");
			return;
		}
		appliedSettings.platform.ui.title = title.value;
		appliedSettings.platform.ui.subTitle = subTitle.value;
		appliedSettings.platform.ui.logo = logo.value;
		if (appliedSettings.platform?.cloudInterop?.connectParams?.basicAuthenticationParameters) {
			appliedSettings.platform.cloudInterop.connectParams.basicAuthenticationParameters.username = username.value;
			appliedSettings.platform.cloudInterop.connectParams.basicAuthenticationParameters.password = password.value;
		}
		appliedSettings.platform.cloudInterop.connectParams.platformId = platformId.value;
		appliedSettings.platform.cloudInterop.connectParams.url = cloudUrl.value;
		appliedSettings.platform.cloudInterop.connectParams.sourceId = sourceId.value;

		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		settingsResolverService.publish("settings-resolver-response", {
			settingsResolverResponse: {
				action: "save-reload",
				settings: appliedSettings
			}
		});
	});

	resetButton.addEventListener("click", async () => {
		// an example of using an app channel.
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		settingsResolverService.publish("settings-resolver-response", {
			settingsResolverResponse: {
				action: "reset-reload"
			}
		});
	});

	cancelButton.addEventListener("click", async () => {
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		settingsResolverService.publish("settings-resolver-response", {
			settingsResolverResponse: {
				action: "close"
			}
		});
	});
}
