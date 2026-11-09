import type OpenFin from "@openfin/core";
import type { Theme } from "../theme/presets";
import { THEME_CHANNEL_NAME, THEME_TOPICS } from "../theme/theme-channel";

/**
 * Connects to the provider's theme channel, calling back with the current theme and every change.
 * @param fin The view's fin connection.
 * @param onTheme Called with each theme.
 */
export async function subscribeToTheme(
	fin: OpenFin.Fin<"external connection">,
	onTheme: (theme: Theme) => void
): Promise<void> {
	const client = await fin.InterApplicationBus.Channel.connect(THEME_CHANNEL_NAME);
	client.register(THEME_TOPICS.themeChanged, (theme) => onTheme(theme as Theme));
	const currentTheme = (await client.dispatch(THEME_TOPICS.getTheme)) as Theme;
	onTheme(currentTheme);
}
