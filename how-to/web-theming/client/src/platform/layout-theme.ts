import type { CustomPaletteSet } from "@openfin/web-notifications";
import type { Theme } from "../theme/presets";

/**
 * Maps a palette onto the custom properties that core-web's layout stylesheet (core-web-styles.css)
 * reads. Only the main colors are set: the remaining layout colors default to these in the stylesheet.
 * @param palette The palette to map.
 * @returns Custom property names and values.
 */
function toLayoutVariables(palette: CustomPaletteSet): { [name: string]: string | undefined } {
	return {
		"--main-background-color": palette.backgroundPrimary,
		// The tab strip, frame and splitters sit a shade off the view background so the layout's edges
		// are visible; the active tab matches the view so it reads as attached to it.
		"--secondary-background-color": palette.background4,
		"--tab-background-color": palette.background5,
		"--tab-background-active-color": palette.backgroundPrimary,
		"--tab-font-color": palette.textDefault,
		"--tab-button-hover-color": palette.background6,
		"--tab-button-active-color": palette.textInactive,
		"--tab-border-top-color": palette.background6,
		"--tab-border-top-highlight-color": palette.textInactive,
		"--focused-tab-border-top-color": palette.brandPrimary,
		"--focused-tab-border-top-highlight-color": palette.linkHover,
		"--drop-target-border-color": palette.brandPrimary,
		"--drop-target-background-color": `color-mix(in srgb, ${palette.brandPrimary} 15%, transparent)`
	};
}

/**
 * Applies a theme to the web layout. core-web has no theme API for layouts; its stylesheet exposes
 * custom properties for colors and a `light-theme` class on the root element for light-scheme
 * adjustments (e.g. icon tints), so both are driven from the palette here.
 * @param theme The theme to apply.
 */
export function applyLayoutTheme(theme: Theme): void {
	const root = document.documentElement;
	for (const [name, value] of Object.entries(toLayoutVariables(theme.palette))) {
		if (value === undefined) {
			root.style.removeProperty(name);
		} else {
			root.style.setProperty(name, value);
		}
	}
	root.classList.toggle("light-theme", theme.scheme === "light");
}
