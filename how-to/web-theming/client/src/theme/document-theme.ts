import type { Theme } from "./presets";

/**
 * Exposes a theme to a document's CSS using the same convention HERE Workspace uses for views on
 * the desktop: every palette entry becomes a `--theme-*` custom property (e.g. `brandPrimary` becomes
 * `--theme-brand-primary`) and the root element gets a `theme-light` or `theme-dark` class.
 * Stylesheets written against that convention (such as common.css) work unchanged in both environments.
 * @param theme The theme to apply.
 * @param root The element to apply it to.
 */
export function applyDocumentTheme(theme: Theme, root: HTMLElement = document.documentElement): void {
	for (const [key, value] of Object.entries(theme.palette)) {
		if (typeof value === "string") {
			root.style.setProperty(toThemeVariableName(key), value);
		}
	}
	root.classList.toggle("theme-light", theme.scheme === "light");
	root.classList.toggle("theme-dark", theme.scheme === "dark");
	root.style.colorScheme = theme.scheme;
}

/**
 * Converts a palette key to its CSS custom property name.
 * @param key The palette key, e.g. backgroundPrimary.
 * @returns The custom property name, e.g. --theme-background-primary.
 */
function toThemeVariableName(key: string): string {
	return `--theme-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`;
}
