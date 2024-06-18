import { cloudInteropOverride } from "@openfin/cloud-interop";
import type { OpenFin } from "@openfin/core";
import { connect } from "@openfin/core-web";
import { AppResolverHelper } from "./platform/apps/app-resolver-helper";
import { getConstructorOverride } from "./platform/broker/interop-override";
import { makeOverride } from "./platform/layout/layout-override";
import { clearSettings, getDefaultLayout, getSettings, saveSettings } from "./platform/settings";
import type { PlatformLayoutSnapshot } from "./shapes/layout-shapes";
import type { Settings } from "./shapes/setting-shapes";
import { sanitizeString } from "./utils";

/**
 * Attach listeners to elements.
 * @param fin passing the fin api for use.
 */
async function attachListeners(fin: OpenFin.Fin<OpenFin.EntityType>): Promise<void> {
	// Get the required settings
	const settings = await getSettings();
	if (settings !== undefined) {
		const layoutSelectorId = `#${settings.platform.layout.layoutSelectorId}`;
		const deleteLayoutId = `#${settings.platform.layout.deleteLayoutId}`;
		const addLayoutId = `#${settings.platform.layout.addLayoutId}`;
		const addLayoutButton = document.querySelector<HTMLButtonElement>(addLayoutId);
		const deleteButton = document.querySelector<HTMLButtonElement>(deleteLayoutId);
		const settingsButton = document.querySelector<HTMLButtonElement>("#settings");
		const layoutSelector = document.querySelector<HTMLSelectElement>(layoutSelectorId);
		if (deleteButton !== null && layoutSelector !== null) {
			deleteButton?.addEventListener("click", async () => {
				await deleteCurrentLayout();
			});
			// Create a MutationObserver to watch for changes in the child list of the select element
			const observer = new MutationObserver(() => {
				// Update the enabled state of the trash button based on the number of options
				deleteButton.disabled = !(layoutSelector.options.length > 1);
			});

			// Start observing the select element with the configured parameters
			observer.observe(layoutSelector, { childList: true });
		}
		if (addLayoutButton !== null) {
			const addResolverHelper = new AppResolverHelper(settings.platform.app.appResolver, console);
			addLayoutButton?.addEventListener("click", async () => {
				await addResolverHelper.launchAppResolver();
			});
		}
		if (settingsButton !== null) {
			const dialogElement = document.createElement("dialog");
			dialogElement.id = "settings-dialog";
			dialogElement.style.height = `${settings?.platform?.ui?.settingsResolver?.height ?? 700}px`;
			dialogElement.style.width = `${settings?.platform?.ui?.settingsResolver?.width ?? 600}px`;
			dialogElement.style.padding = "0px";
			dialogElement.style.backgroundColor = "var(--brand-background)";
			// Create a new iframe element
			const settingsUI = document.createElement("iframe");

			// Set the source of the iframe
			settingsUI.src = settings.platform.ui.settingsResolver.url;
			settingsUI.style.height = "99%";
			settingsUI.style.width = "100%";

			// Append the iframe to the dialog
			dialogElement.append(settingsUI);

			// Append the dialog to the body
			document.body.append(dialogElement);
			settingsButton.addEventListener("click", async () => {
				dialogElement.showModal();
			});
			const platformDialogSettings = await fin.me.interop.joinSessionContextGroup("platform/settings/dialog");
			await platformDialogSettings.addContextHandler(async (context) => {
				if (context.type === "platform.settings.dialog.action" && context?.id?.action === "close") {
					dialogElement.close();
				}
				if (context.type === "platform.settings.dialog.action" && context?.id?.action === "save-reload") {
					const settingsToSave: Settings = (context as unknown as { settings: Settings }).settings;
					// get the current layout
					const currentLayout = fin.Platform.Layout.getCurrentLayoutManagerSync<PlatformLayoutSnapshot>();
					settingsToSave.platform.layout.defaultLayout = await currentLayout?.getLayoutSnapshot();
					await saveSettings(settingsToSave);
					location.reload();
				}
				if (context.type === "platform.settings.dialog.action" && context?.id?.action === "reset-reload") {
					await clearSettings();
					location.reload();
				}
			});
		}
	}
}

/**
 * Update the DOM with the settings.
 * @param settings passing the settings for use.
 */
function updateDOM(settings: Settings | undefined): void {
	const title = document.querySelector<HTMLHeadingElement>("#title");
	const subTitle = document.querySelector<HTMLHeadingElement>("#subTitle");
	const logo = document.querySelector<HTMLImageElement>("#logo");
	if (title === null || subTitle === null || logo === null || settings === undefined) {
		console.error(
			"Unable to use settings as there are missing input fields/buttons or settings have not been provided."
		);
		return;
	}
	const documentTitle = sanitizeString(settings?.platform?.ui?.title ?? "");
	title.textContent = documentTitle;
	document.title = documentTitle;
	subTitle.textContent = sanitizeString(settings?.platform?.ui?.subTitle ?? "");
	const documentIcon = sanitizeString(settings?.platform?.ui?.logo ?? "");
	logo.src = documentIcon;
	const fav = document.querySelector<HTMLLinkElement>("#favicon");
	if (fav !== null && documentIcon !== "") {
		fav.href = documentIcon;
	}
}

/**
 * Listen for config requests.
 * @param settings passing the settings for use.
 */
function listenForConfigRequests(settings: Settings): void {
	// This allows iframes that are not in the layout to request the connect details if they do not have them
	// available to them.
	window.addEventListener(
		"message",
		(event) => {
			// Check the origin of the message
			// this is where you could check to see if the request is coming from domains registered in your app directory
			// alternatively this logic could be done in the interop broker when the connection is attempted. These are
			// just example origins we have put
			if (
				event.origin !== "https://built-on-openfin.github.io" &&
				!event.origin.startsWith("http://localhost:")
			) {
				console.warn(`Incoming request came from an untrusted domain: ${event.origin}`);
				return;
			}

			// The data sent with postMessage is stored in event.data
			const request = event.data;
			console.log(
				`Incoming request coming from: ${event.origin}. Received request: ${JSON.stringify(request)}`
			);

			// this just our example namespace. You could create your own and decide what data to pass.
			const connectConfigContextType = "openfin.coreWeb.connectConfig";
			// ensure it is requesting connect details for core web
			if (request.type === connectConfigContextType) {
				// send back the connect details required by the client
				event.source?.postMessage(
					{
						type: connectConfigContextType,
						connectConfig: {
							options: {
								brokerUrl: settings.platform.interop.brokerUrl,
								interopConfig: {
									providerId: settings.platform.interop.providerId,
									currentContextGroup: settings.platform.interop.defaultContextGroup
								}
							}
						}
					},
					{ targetOrigin: event.origin }
				);
			}
		},
		false
	);
}

/**
 * Delete the current layout.
 */
async function deleteCurrentLayout(): Promise<void> {
	const currentLayout = window.fin?.Platform.Layout.getCurrentLayoutManagerSync();
	if (currentLayout) {
		const selectedLayout = currentLayout.resolveLayoutIdentity();
		if (selectedLayout) {
			await currentLayout.removeLayout(selectedLayout);
		}
	}
}

/**
 * Initializes the OpenFin Web Broker connection.
 */
async function init(): Promise<void> {
	// Get the required settings
	const settings = await getSettings();

	// apply any settings to the UI
	updateDOM(settings);

	// Get the default layout
	const layoutSnapshot = await getDefaultLayout();

	if (settings === undefined || layoutSnapshot === undefined) {
		console.error(
			"Unable to run the sample as we have been unable to load the web manifest and it's settings from the currently running html page. Please ensure that the web manifest is being served and that it contains the custom_settings section."
		);
		return;
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

	listenForConfigRequests(settings);

	if (fin) {
		// Store the fin object in the window object for easy access.
		window.fin = fin;
		const layoutManagerOverride = makeOverride(
			fin,
			settings.platform.layout.layoutContainerId,
			settings.platform.layout.layoutSelectorId
		);

		const interopOverride = await getConstructorOverride(settings.platform.interop.overrideOptions);
		const overrides = [interopOverride];

		if (settings?.platform?.cloudInterop?.connectParams?.url?.startsWith("http")) {
			const cloudOverride = (await cloudInteropOverride(
				settings.platform.cloudInterop.connectParams
			)) as unknown as OpenFin.ConstructorOverride<OpenFin.InteropBroker>;
			overrides.push(cloudOverride);
		}
		// You may now use the `fin` object to initialize the broker and the layout.
		await fin.Interop.init(settings.platform.interop.providerId, overrides);
		// Show the main container and hide the loading container
		// initialize the layout and pass it the dom element to bind to
		await fin.Platform.Layout.init({
			layoutManagerOverride,
			containerId: settings.platform.layout.layoutContainerId
		});
		// setup listeners now that everything has been initialized
		await attachListeners(fin);
	}
}

init()
	.then(() => {
		console.log("Connected to the OpenFin Web Broker.");
		return true;
	})
	.catch((err) => console.error(err));
