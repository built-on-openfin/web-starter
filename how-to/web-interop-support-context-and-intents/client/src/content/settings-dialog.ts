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
 * Show the title of the selected side panel app as the default in the title placeholder.
 * @param panelApp The app select element.
 * @param panelTitle The title input element.
 * @param apps The apps that can be selected.
 */
function updatePanelTitlePlaceholder(
	panelApp: HTMLSelectElement,
	panelTitle: HTMLInputElement,
	apps: { appId: string; title: string }[]
): void {
	const selectedApp = apps.find((app) => app.appId === panelApp.value);
	panelTitle.placeholder = selectedApp
		? `Defaults to the app title: ${selectedApp.title}`
		: "Defaults to the app title";
}

/**
 * Initialize the settings.
 */
async function init(): Promise<void> {
	// platform settings
	const title = document.querySelector<HTMLInputElement>("#title");
	const subTitle = document.querySelector<HTMLInputElement>("#subTitle");
	const logo = document.querySelector<HTMLInputElement>("#logo");

	// side panel settings
	const panelEnabled = document.querySelector<HTMLInputElement>("#panelEnabled");
	const panelApp = document.querySelector<HTMLSelectElement>("#panelApp");
	const panelTitle = document.querySelector<HTMLInputElement>("#panelTitle");

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
		panelEnabled === null ||
		panelApp === null ||
		panelTitle === null ||
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
	let panelApps: { appId: string; title: string }[] = [];

	panelApp.addEventListener("change", () => updatePanelTitlePlaceholder(panelApp, panelTitle, panelApps));

	console.log("Registering apply-settings handler...");
	settingsResolverService.register("apply-settings", async (data) => {
		const { settings, apps } = (
			data as { customData: { settings: Settings; apps?: { appId: string; title: string }[] } }
		).customData;
		title.value = settings?.platform?.ui?.title;
		subTitle.value = settings?.platform?.ui?.subTitle;
		logo.value = settings?.platform?.ui?.logo;

		const experimentalPanel = settings?.platform?.ui?.experimentalPanel;
		panelApps = [...(apps ?? [])];
		if (experimentalPanel?.appId && !panelApps.some((app) => app.appId === experimentalPanel.appId)) {
			panelApps.unshift({ appId: experimentalPanel.appId, title: experimentalPanel.appId });
		}
		panelApp.replaceChildren(
			...panelApps.map((app) => {
				const option = document.createElement("option");
				option.value = app.appId;
				option.textContent = `${app.title} (${app.appId})`;
				return option;
			})
		);
		panelEnabled.checked = experimentalPanel?.enabled ?? false;
		if (experimentalPanel?.appId) {
			panelApp.value = experimentalPanel.appId;
		}
		panelTitle.value = experimentalPanel?.title ?? "";
		updatePanelTitlePlaceholder(panelApp, panelTitle, panelApps);

		username.value =
			settings?.platform.cloudInterop?.connectParams?.basicAuthenticationParameters?.username ?? "";
		password.value =
			settings?.platform.cloudInterop?.connectParams?.basicAuthenticationParameters?.password ?? "";
		platformId.value = settings?.platform.cloudInterop?.connectParams?.platformId;
		cloudUrl.value = settings?.platform.cloudInterop?.connectParams?.url;
		sourceId.value = settings?.platform.cloudInterop?.connectParams.sourceId ?? "";
		appliedSettings = settings;
	});

	saveButton.addEventListener("click", async () => {
		console.log(`And appliedSettings is.... ${JSON.stringify(appliedSettings)}`);
		if (appliedSettings === undefined) {
			console.error("Unable to save settings as they are not defined.");
			return;
		}
		appliedSettings.platform.ui.title = title.value;
		appliedSettings.platform.ui.subTitle = subTitle.value;
		appliedSettings.platform.ui.logo = logo.value;
		appliedSettings.platform.ui.experimentalPanel = {
			...appliedSettings.platform.ui.experimentalPanel,
			enabled: panelEnabled.checked,
			appId: panelApp.value,
			title: panelTitle.value.trim() || undefined
		};
		if (appliedSettings.platform?.cloudInterop?.connectParams?.basicAuthenticationParameters) {
			appliedSettings.platform.cloudInterop.connectParams.basicAuthenticationParameters.username =
				username.value;
			appliedSettings.platform.cloudInterop.connectParams.basicAuthenticationParameters.password =
				password.value;
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
