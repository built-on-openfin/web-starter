/**
 * The channel the provider uses to share the current theme with views.
 */
export const THEME_CHANNEL_NAME = "web-theming-theme";

/**
 * Channel topics. Views dispatch `get-theme` once on connect, then receive `theme-changed` pushes.
 */
export const THEME_TOPICS = {
	getTheme: "get-theme",
	themeChanged: "theme-changed"
} as const;
