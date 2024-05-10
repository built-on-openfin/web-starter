import { type CloudInteropOverrideParams, cloudInteropOverride } from "@openfin/cloud-interop";
import type OpenFin from "@openfin/core";
import { connect } from "@openfin/core-web";
import { getDefaultLayout, getSettings } from "./platform/settings";
import type { Settings } from "./shapes/setting-shapes";

/**
 * Sets up panels if supported.
 * @param settings The settings to use.
 */
function setupPanels(settings: Settings): void {
	if (settings?.platform?.layout?.panels?.left) {
		const leftPanel = settings.platform.layout.panels.left;
		const leftPanelFrame = document.querySelector<HTMLIFrameElement>(`#${leftPanel.frameId}`);
		if (leftPanelFrame === null) {
			console.error(
				`Please ensure the document has an element with the following id #${leftPanel.frameContainerId} so that the web-layout can be applied.`
			);
			return;
		}
		leftPanelFrame.src = leftPanel.url;
		console.log(`Panel ${leftPanel.frameId} has been setup with the url ${leftPanel.url}`);
	} else {
		console.log("No panels require setup.");
	}
}

/**
 * Gets the required cloud settings.
 * @param settings The default settings.
 * @returns The cloud settings.
 */
async function getCloudSettings(settings: Settings): Promise<CloudInteropOverrideParams | undefined> {
	if (settings?.cloud?.connectParams?.url?.startsWith("http")) {
		return settings.cloud.connectParams;
	}
	const mainPage = document.querySelector<HTMLElement>("#main-page");
	const cloudDetails = document.querySelector<HTMLElement>("#cloud-details");
	const btnSubmit = document.querySelector<HTMLButtonElement>("#btnSubmit");
	const btnContinue = document.querySelector<HTMLButtonElement>("#btnContinue");
	mainPage?.classList.add("hidden");
	cloudDetails?.classList.remove("hidden");

	return new Promise((resolve, reject) => {
		btnContinue?.addEventListener("click", async () => {
			cloudDetails?.classList.add("hidden");
			mainPage?.classList.remove("hidden");
			reject(new Error("Running in local only mode as cloud interop settings have not been provided."));
		});
		btnSubmit?.addEventListener("click", async () => {
			const userId = document.querySelector<HTMLInputElement>("#userId")?.value;
			const password = document.querySelector<HTMLInputElement>("#password")?.value;
			const platformId = document.querySelector<HTMLInputElement>("#platformId")?.value;
			const url = document.querySelector<HTMLInputElement>("#url")?.value;
			const sourceId = document.querySelector<HTMLInputElement>("#sourceId")?.value;
			const sourceDisplayName = document.querySelector<HTMLInputElement>("#sourceDisplayName")?.value;
			// Check if the inputs are valid
			if (
				userId === null ||
				password === null ||
				platformId === null ||
				url === null ||
				userId?.trim() === "" ||
				password?.trim() === "" ||
				platformId?.trim() === "" ||
				url?.trim() === ""
			) {
				reject(
					new Error(
						"Required cloud connect parameters are missing or invalid. Please check the settings. You will need configuration provided by OpenFin to connect to the cloud. Running in local only mode."
					)
				);
			}
			const options = {
				userId: userId ?? "",
				password: password ?? "",
				platformId: platformId ?? "",
				url: url ?? "",
				sourceId: sourceId ?? "cloud-interop",
				sourceDisplayName: sourceDisplayName ?? "Cloud Interop Example"
			};
			cloudDetails?.classList.add("hidden");
			mainPage?.classList.remove("hidden");
			resolve(options);
		});
	});
}

/**
 * Initializes the OpenFin Web Broker and Cloud connection.
 */
async function init(): Promise<void> {
	// Get the required settings
	const settings = await getSettings();
	// Get the default layout
	const layoutSnapshot = await getDefaultLayout();

	if (settings === undefined || layoutSnapshot === undefined) {
		console.error(
			"Unable to run the sample as we have been unable to load the web manifest and it's settings from the currently running html page. Please ensure that the web manifest is being served and that it contains the custom_settings section."
		);
		return;
	}
	// Get the dom element that should host the layout
	const layoutContainer = document.querySelector<HTMLElement>(
		`#${settings.platform.layout.layoutContainerId}`
	);
	if (layoutContainer === null) {
		console.error(
			`Please ensure the document has an element with the following id #${settings.platform.layout.layoutContainerId} so that the web-layout can be applied.`
		);
		return;
	}
	let cloudSettings: CloudInteropOverrideParams | undefined;
	try {
		cloudSettings = await getCloudSettings(settings);
		if (cloudSettings !== undefined) {
			settings.cloud.connectParams = cloudSettings;
		}
	} catch (err) {
		// Get the element for displaying error messages
		const error = document.querySelector<HTMLElement>("#error");
		console.error(err);
		if (error !== null) {
			error.textContent = (err as Error).message;
		}
	}
	// Connect to the OpenFin Web Broker and pass the default layout.
	// It is good practice to specify providerId even if content is explicitly specifying it for cases where
	// this provider uses our layout system and content uses inheritance. currentContextGroup
	// is useful for defaulting any client that uses inheritance through our layout system.
	const fin = await connect({
		options: {
			brokerUrl: settings.platform.interop.brokerUrl,
			interopConfig: {
				providerId: settings.platform.interop.providerId,
				currentContextGroup: settings.platform.interop.defaultContextGroup
			}
		},
		connectionInheritance: "enabled",
		platform: { layoutSnapshot }
	});

	// assign the fin api to the window object to make it globally available for consistency with container/workspace code.
	window.fin = fin;
	if (cloudSettings === undefined) {
		// You may now use the `fin` object and initialize the Broker.
		await fin.Interop.init(settings.platform.interop.providerId);
	} else {
		// You may now use the `fin` object and initialize the Broker with support for cloud interop.
		const cloudOverride = (await cloudInteropOverride(
			cloudSettings
		)) as unknown as OpenFin.ConstructorOverride<OpenFin.InteropBroker>;
		await fin.Interop.init(settings.platform.interop.providerId, [cloudOverride]);
	}

	// initialize the layout and pass it the dom element to bind to
	await fin.Platform.Layout.init({
		container: layoutContainer
	});
	// setup panels not that everything has been initialized
	setupPanels(settings);
}

init()
	.then(() => {
		console.log("Connected to the OpenFin Web Broker.");
		return true;
	})
	.catch((err) => console.error(err));
