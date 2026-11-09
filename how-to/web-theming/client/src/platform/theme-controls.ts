import { resolveTheme, THEME_PRESETS, type SchemePreference, type Theme } from "../theme/presets";

/**
 * Fills the brand picker in the header and returns the theme for the current selection.
 * @returns The selected theme.
 */
export function initThemeControls(): Theme {
	const presetSelect = document.querySelector<HTMLSelectElement>("#themePreset");
	if (presetSelect !== null) {
		for (const preset of THEME_PRESETS) {
			presetSelect.add(new Option(preset.label, preset.id));
		}
	}
	return readThemeSelection();
}

/**
 * Calls back with the newly selected theme when the brand or scheme changes, including OS scheme
 * changes while "system" is selected.
 * @param onChange Called with the resolved theme.
 */
export function onThemeSelectionChange(onChange: (theme: Theme) => void): void {
	/**
	 * Calls back with the current selection.
	 */
	function notify(): void {
		onChange(readThemeSelection());
	}

	document.querySelector<HTMLSelectElement>("#themePreset")?.addEventListener("change", notify);
	for (const input of document.querySelectorAll<HTMLInputElement>('input[name="scheme"]')) {
		input.addEventListener("change", notify);
	}
	window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
		if (readSchemePreference() === "system") {
			notify();
		}
	});
}

/**
 * Resolves the header selection to a theme.
 * @returns The selected theme.
 */
function readThemeSelection(): Theme {
	const presetId = document.querySelector<HTMLSelectElement>("#themePreset")?.value ?? THEME_PRESETS[0].id;
	return resolveTheme(presetId, readSchemePreference());
}

/**
 * Reads the selected scheme option.
 * @returns The scheme preference.
 */
function readSchemePreference(): SchemePreference {
	const checked = document.querySelector<HTMLInputElement>('input[name="scheme"]:checked');
	return (checked?.value ?? "system") as SchemePreference;
}
