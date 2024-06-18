import { getSettings } from "../platform/settings";

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
	const settings = await getSettings();
	if (settings === undefined) {
		console.error(
			"Unable to run the example as we have been unable to load the web manifest and it's settings from the currently running html page. Please ensure that the web manifest is being served and that it contains the custom_settings section."
		);
		return;
	}

	// platform settings
	const title = document.querySelector<HTMLInputElement>("#title");
	const subTitle = document.querySelector<HTMLInputElement>("#subTitle");
	const logo = document.querySelector<HTMLInputElement>("#logo");

	// cloud settings
	const userId = document.querySelector<HTMLInputElement>("#userId");
	const password = document.querySelector<HTMLInputElement>("#password");
	const platformId = document.querySelector<HTMLInputElement>("#platformId");
	const cloudUrl = document.querySelector<HTMLInputElement>("#cloudUrl");
	const sourceId = document.querySelector<HTMLInputElement>("#sourceId");
	const sourceDisplayName = document.querySelector<HTMLInputElement>("#sourceDisplayName");

	const saveButton = document.querySelector<HTMLButtonElement>("#save");
	const resetButton = document.querySelector<HTMLButtonElement>("#reset");
	const cancelButton = document.querySelector<HTMLButtonElement>("#cancel");

	// assign returned settings to the input fields
	if (
		title === null ||
		subTitle === null ||
		logo === null ||
		userId === null ||
		password === null ||
		platformId === null ||
		cloudUrl === null ||
		sourceId === null ||
		sourceDisplayName === null ||
		saveButton === null ||
		resetButton === null ||
		cancelButton === null
	) {
		console.error("Unable to use settings as there are missing input fields/buttons.");
		return;
	}

	title.value = settings?.platform?.ui?.title;
	subTitle.value = settings?.platform?.ui?.subTitle;
	logo.value = settings?.platform?.ui?.logo;
	userId.value = settings?.platform.cloudInterop?.connectParams?.userId;
	password.value = settings?.platform.cloudInterop?.connectParams?.password;
	platformId.value = settings?.platform.cloudInterop?.connectParams?.platformId;
	cloudUrl.value = settings?.platform.cloudInterop?.connectParams?.url;
	sourceId.value = settings?.platform.cloudInterop?.connectParams.sourceId ?? "";
	sourceDisplayName.value = settings?.platform.cloudInterop?.connectParams.sourceDisplayName ?? "";

	const channel = "platform/settings/dialog";
	const appChannel = await window.fdc3.getOrCreateChannel(channel);

	saveButton.addEventListener("click", async () => {
		settings.platform.ui.title = title.value;
		settings.platform.ui.subTitle = subTitle.value;
		settings.platform.ui.logo = logo.value;
		settings.platform.cloudInterop.connectParams.userId = userId.value;
		settings.platform.cloudInterop.connectParams.password = password.value;
		settings.platform.cloudInterop.connectParams.platformId = platformId.value;
		settings.platform.cloudInterop.connectParams.url = cloudUrl.value;
		settings.platform.cloudInterop.connectParams.sourceId = sourceId.value;
		settings.platform.cloudInterop.connectParams.sourceDisplayName = sourceDisplayName.value;

		// an example of using an app channel.
		await appChannel.broadcast({
			type: "platform.settings.dialog.action",
			id: { action: "save-reload" },
			settings
		});
	});

	resetButton.addEventListener("click", async () => {
		// an example of using an app channel.
		await appChannel.broadcast({ type: "platform.settings.dialog.action", id: { action: "reset-reload" } });
	});

	cancelButton.addEventListener("click", async () => {
		// an example of using an app channel.
		await appChannel.broadcast({ type: "platform.settings.dialog.action", id: { action: "close" } });
	});
}
