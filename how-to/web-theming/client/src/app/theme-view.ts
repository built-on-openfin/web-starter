import { connect } from "@openfin/core-web";
import { register } from "@openfin/notifications";
import { getSettings } from "../settings";
import { applyDocumentTheme } from "../theme/document-theme";
import { THEME_PRESETS, type Theme } from "../theme/presets";
import {
	showButtonsNotification,
	showFormNotification,
	showIndicatorNotification
} from "./sample-notifications";
import { subscribeToTheme } from "./theme-subscriber";

/**
 * Shows the palette the view received, one swatch per entry.
 * @param theme The theme to show.
 */
function renderPalette(theme: Theme): void {
	const label = THEME_PRESETS.find((preset) => preset.id === theme.presetId)?.label ?? theme.presetId;
	const summary = document.querySelector<HTMLElement>("#themeSummary");
	if (summary !== null) {
		summary.textContent = `${label} · ${theme.scheme}`;
	}

	const list = document.querySelector<HTMLElement>("#paletteList");
	if (list === null) {
		return;
	}
	list.replaceChildren(
		...Object.entries(theme.palette).map(([key, value]) => {
			const item = document.createElement("li");
			const swatch = document.createElement("span");
			swatch.className = "swatch";
			swatch.style.backgroundColor = String(value);
			const name = document.createElement("span");
			name.textContent = key;
			const hex = document.createElement("span");
			hex.className = "swatch-value";
			hex.textContent = String(value);
			item.append(swatch, name, hex);
			return item;
		})
	);
}

/**
 * Wires the buttons that raise sample notifications.
 */
function bindNotificationButtons(): void {
	const buttons: [string, () => Promise<void>][] = [
		["#btnButtons", showButtonsNotification],
		["#btnForm", showFormNotification],
		["#btnIndicator", showIndicatorNotification]
	];
	for (const [selector, show] of buttons) {
		document.querySelector<HTMLButtonElement>(selector)?.addEventListener("click", () => {
			show().catch((error) => console.error("Unable to create notification.", error));
		});
	}
}

/**
 * Shows the view, which theme.html hides until the platform's theme has been applied.
 */
function revealView(): void {
	// Force a style recalculation so the themed colors are committed while transitions are still off;
	// otherwise revealing would animate every control from its default color.
	document.body.getBoundingClientRect();
	document.documentElement.classList.remove("theme-pending");
}

/**
 * Connects to the platform, follows its theme and registers as a notification producer.
 */
async function init(): Promise<void> {
	const settings = await getSettings();
	if (settings === undefined) {
		console.error("Unable to initialize because the web manifest custom_settings could not be loaded.");
		return;
	}

	const fin = await connect({
		options: {
			brokerUrl: settings.platform.interop.brokerUrl,
			interopConfig: {
				providerId: settings.platform.interop.providerId,
				currentContextGroup: settings.platform.interop.defaultContextGroup
			}
		}
	});

	await subscribeToTheme(fin, (theme) => {
		applyDocumentTheme(theme);
		renderPalette(theme);
		revealView();
	});

	await register({
		externalProviderConfig: {
			finContext: fin,
			serviceId: settings.platform.notificationServiceId,
			id: "web-theming-view",
			title: "Web Theming",
			icon: `${window.location.origin}/common/images/here.png`
		}
	});
	bindNotificationButtons();
}

window.addEventListener("DOMContentLoaded", async () => {
	try {
		await init();
	} catch (error) {
		console.error("View initialization failed.", error);
	} finally {
		revealView();
	}
});
