import type OpenFin from "@openfin/core";
import { setTheme } from "@openfin/web-notifications";
import { applyDocumentTheme } from "../theme/document-theme";
import type { Theme } from "../theme/presets";
import { THEME_CHANNEL_NAME, THEME_TOPICS } from "../theme/theme-channel";
import { applyLayoutTheme } from "./layout-theme";

/**
 * Applies a theme everywhere the platform renders UI.
 */
export type ApplyPlatformTheme = (theme: Theme) => Promise<void>;

/**
 * Applies the startup theme to the provider page and web layout. Call before the layout renders so
 * there is no flash of the default colors.
 * @param theme The startup theme.
 */
export function applyInitialTheme(theme: Theme): void {
	applyDocumentTheme(theme);
	applyLayoutTheme(theme);
}

/**
 * Starts the theme channel and returns a function that applies a theme to the provider page,
 * the web layout, the Notification Center and every connected view.
 * @param fin The provider's fin connection.
 * @param initialTheme The theme already applied at startup, served to views as they connect.
 * @returns A function that applies a new theme.
 */
export async function createPlatformTheme(
	fin: OpenFin.Fin<"external connection">,
	initialTheme: Theme
): Promise<ApplyPlatformTheme> {
	let currentTheme = initialTheme;
	const channel = await fin.InterApplicationBus.Channel.create(THEME_CHANNEL_NAME);
	channel.register(THEME_TOPICS.getTheme, () => currentTheme);

	return async (theme) => {
		currentTheme = theme;
		applyDocumentTheme(theme);
		applyLayoutTheme(theme);
		await Promise.all([
			// The Notification Center applies one palette whichever scheme is set, so pass the palette
			// for the resolved scheme every time the scheme changes.
			setTheme({ palette: theme.palette, scheme: theme.scheme }),
			...channel.publish(THEME_TOPICS.themeChanged, theme)
		]);
	};
}
