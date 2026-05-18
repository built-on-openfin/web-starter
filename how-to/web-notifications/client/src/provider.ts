import { connect } from "@openfin/core-web";
import { addVisibilityListener, initNotificationCenter, setTheme, show } from "@openfin/web-notifications";
import { getDefaultLayout, getSettings } from "./platform/settings";

/**
 * Applies notification center color scheme.
 * @param isDark Whether dark mode is active.
 */
async function applyScheme(isDark: boolean): Promise<void> {
	await setTheme({ scheme: isDark ? "dark" : "light" });
}

/**
 * Logs async failures from notification center UI actions.
 * @param error Failure reason.
 */
function reportAsyncFailure(error: unknown): void {
	console.error("Async notification center action failed.", error);
}

/**
 * Keep the notification center theme in sync with system light/dark preference.
 */
function bindThemeSync(): void {
	const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
	applyScheme(mediaQuery.matches).catch(reportAsyncFailure);
	mediaQuery.addEventListener("change", (event) => {
		applyScheme(event.matches).catch(reportAsyncFailure);
	});
}

/**
 * Initializes the OpenFin Web broker, layout, and notification center host.
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

	if (layoutContainer === null) {
		console.error("Missing required element #layout_container.");
		return;
	}
	if (notificationCenterContainer === null) {
		console.error("Missing required element #notification_center_container.");
		return;
	}
	if (notificationSidebar === null) {
		console.error("Missing required element #notification_sidebar.");
		return;
	}
	if (notificationToastContainer === null) {
		console.error("Missing required element #notification_toast_container.");
		return;
	}

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
	await fin.Platform.Layout.init({ container: layoutContainer });

	await initNotificationCenter({
		// @ts-expect-error In this npm workspace different versions of @openfin/core can be hoisted to the root causing typescript conflicts. You should not need this comment in your client project.
		finContext: fin,
		serviceId: settings.platform.notificationServiceId,
		container: notificationCenterContainer,
		toastContainer: notificationToastContainer,
		toastOptions: {
			position: "bottom-right",
			duration: 5000
		}
	});

	addVisibilityListener((visible) => {
		notificationSidebar.dataset.open = visible ? "true" : "false";
	});

	await show().catch(reportAsyncFailure);

	bindThemeSync();
}

init().catch((error) => {
	console.error("Provider initialization failed.", error);
});
