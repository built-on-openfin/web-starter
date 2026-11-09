import { connect } from "@openfin/core-web";
import {
	addNotificationCountListener,
	addVisibilityListener,
	hide,
	initNotificationCenter,
	show
} from "@openfin/web-notifications";
import { getDefaultLayout, getSettings } from "../settings";
import { applyInitialTheme, createPlatformTheme } from "./platform-theme";
import { initThemeControls, onThemeSelectionChange } from "./theme-controls";

/**
 * Logs async failures from provider UI actions.
 * @param error Failure reason.
 */
function reportAsyncFailure(error: unknown): void {
	console.error("Async provider action failed.", error);
}

/**
 * Wires the header button that opens and closes the Notification Center.
 * @param notificationSidebar The element hosting the Notification Center.
 */
function bindNotificationCenterToggle(notificationSidebar: HTMLElement): void {
	const toggleButton = document.querySelector<HTMLButtonElement>("#btnToggleCenter");
	const countBadge = document.querySelector<HTMLElement>("#notificationCount");
	let centerVisible = false;

	addVisibilityListener((visible) => {
		centerVisible = visible;
		notificationSidebar.dataset.open = visible ? "true" : "false";
		toggleButton?.setAttribute("aria-pressed", String(visible));
	});

	addNotificationCountListener((count) => {
		if (countBadge !== null) {
			countBadge.textContent = String(count);
			countBadge.hidden = count === 0;
		}
	});

	toggleButton?.addEventListener("click", () => {
		const action = centerVisible ? hide() : show();
		action.catch(reportAsyncFailure);
	});
}

/**
 * Initializes the OpenFin Web broker, layout, Notification Center and theming.
 */
async function init(): Promise<void> {
	const settings = await getSettings();
	const layoutSnapshot = await getDefaultLayout();
	if (settings === undefined || layoutSnapshot === undefined) {
		console.error(
			"Unable to initialize provider. Ensure the manifest custom_settings and layout are available."
		);
		return;
	}

	const layoutContainer = document.querySelector<HTMLElement>("#layout_container");
	const notificationSidebar = document.querySelector<HTMLElement>("#notification_sidebar");
	const notificationCenterContainer = document.querySelector<HTMLElement>("#notification_center_container");
	const notificationToastContainer = document.querySelector<HTMLElement>("#notification_toast_container");
	if (
		layoutContainer === null ||
		notificationSidebar === null ||
		notificationCenterContainer === null ||
		notificationToastContainer === null
	) {
		console.error("Missing a required container element in provider.html.");
		return;
	}

	const initialTheme = initThemeControls();
	applyInitialTheme(initialTheme);

	const fin = await connect({
		options: {
			brokerUrl: settings.platform.interop.brokerUrl,
			interopConfig: {
				providerId: settings.platform.interop.providerId,
				currentContextGroup: settings.platform.interop.defaultContextGroup
			}
		},
		connectionInheritance: "enabled",
		platform: { layoutSnapshot },
		logLevel: "info"
	});

	await fin.Interop.init(settings.platform.interop.providerId);
	const applyTheme = await createPlatformTheme(fin, initialTheme);
	await fin.Platform.Layout.init({ container: layoutContainer });

	await initNotificationCenter({
		finContext: fin,
		serviceId: settings.platform.notificationServiceId,
		container: notificationCenterContainer,
		toastContainer: notificationToastContainer,
		toastOptions: {
			position: "bottom-right",
			duration: 5000
		},
		theme: { palette: initialTheme.palette, scheme: initialTheme.scheme }
	});

	bindNotificationCenterToggle(notificationSidebar);
	onThemeSelectionChange((theme) => {
		applyTheme(theme).catch(reportAsyncFailure);
	});
}

init().catch((error) => {
	console.error("Provider initialization failed.", error);
});
