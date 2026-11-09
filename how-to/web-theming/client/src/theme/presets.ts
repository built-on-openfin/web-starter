import type { CustomPaletteSet } from "@openfin/web-notifications";

/**
 * A concrete color scheme that a palette is designed for.
 */
export type ColorScheme = "light" | "dark";

/**
 * The scheme the user asked for. "system" follows the OS preference.
 */
export type SchemePreference = ColorScheme | "system";

/**
 * A named brand with a palette for each color scheme.
 */
export interface ThemePreset {
	/**
	 * Unique id of the preset.
	 */
	id: string;

	/**
	 * Name shown in the brand picker.
	 */
	label: string;

	/**
	 * The palette to use for each scheme.
	 */
	palettes: { [scheme in ColorScheme]: CustomPaletteSet };
}

/**
 * The theme currently in effect: the palette for the resolved scheme.
 */
export interface Theme {
	/**
	 * The preset the theme came from.
	 */
	presetId: string;

	/**
	 * The resolved scheme.
	 */
	scheme: ColorScheme;

	/**
	 * The preset's palette for the resolved scheme.
	 */
	palette: CustomPaletteSet;
}

/**
 * The HERE default dark palette, as used by the Notification Center when no palette is supplied.
 */
const HERE_DARK = {
	brandPrimary: "#504CFF",
	brandSecondary: "#383A40",
	backgroundPrimary: "#1E1F23",
	background1: "#111214",
	background2: "#1E1F23",
	background3: "#24262B",
	background4: "#2F3136",
	background5: "#383A40",
	background6: "#53565F",
	inputBackground: "#53565F",
	inputColor: "#FFFFFF",
	inputPlaceholder: "#C9CBD2",
	inputDisabled: "#7D808A",
	inputFocused: "#C9CBD2",
	inputBorder: "#7D808A",
	textDefault: "#FFFFFF",
	textHelp: "#C9CBD2",
	textInactive: "#7D808A",
	statusSuccess: "#35C759",
	statusWarning: "#F48F00",
	statusCritical: "#BE1D1F",
	statusActive: "#0498FB",
	linkDefault: "#6864FF",
	linkHover: "#5C5EFE"
} satisfies CustomPaletteSet;

/**
 * The HERE default light palette, as used by the Notification Center when no palette is supplied.
 */
const HERE_LIGHT = {
	brandPrimary: "#504CFF",
	brandSecondary: "#DDDFE4",
	backgroundPrimary: "#FAFBFE",
	background1: "#FFFFFF",
	background2: "#FAFBFE",
	background3: "#F3F5F8",
	background4: "#ECEEF1",
	background5: "#DDDFE4",
	background6: "#C9CBD2",
	inputBackground: "#ECEEF1",
	inputColor: "#1E1F23",
	inputPlaceholder: "#383A40",
	inputDisabled: "#7D808A",
	inputFocused: "#C9CBD2",
	inputBorder: "#7D808A",
	textDefault: "#1E1F23",
	textHelp: "#7D808A",
	textInactive: "#7D808A",
	statusSuccess: "#35C759",
	statusWarning: "#F48F00",
	statusCritical: "#BE1D1F",
	statusActive: "#0498FB",
	linkDefault: "#504CFF",
	linkHover: "#4642E0"
} satisfies CustomPaletteSet;

/**
 * Brands to choose from. Custom brands start from the HERE palettes and override the brand and
 * background colors, which is usually all a brand needs to change.
 */
export const THEME_PRESETS = [
	{
		id: "here",
		label: "HERE",
		palettes: { dark: HERE_DARK, light: HERE_LIGHT }
	},
	{
		id: "harbour",
		label: "Harbour",
		palettes: {
			dark: {
				...HERE_DARK,
				brandPrimary: "#14B8A6",
				brandSecondary: "#1E3A4C",
				backgroundPrimary: "#0F2433",
				background1: "#081621",
				background2: "#0F2433",
				background3: "#132C3E",
				background4: "#18354A",
				background5: "#1E3A4C",
				background6: "#2E5068",
				inputBackground: "#2E5068",
				linkDefault: "#5EEAD4",
				linkHover: "#2DD4BF"
			},
			light: {
				...HERE_LIGHT,
				brandPrimary: "#0F766E",
				brandSecondary: "#CFE3EA",
				backgroundPrimary: "#F3F8FA",
				background1: "#FFFFFF",
				background2: "#F3F8FA",
				background3: "#E8F1F5",
				background4: "#DCEAF0",
				background5: "#CFE3EA",
				background6: "#B3CFDA",
				inputBackground: "#E8F1F5",
				textDefault: "#0F2433",
				inputColor: "#0F2433",
				linkDefault: "#0F766E",
				linkHover: "#115E59"
			}
		}
	},
	{
		id: "ember",
		label: "Ember",
		palettes: {
			dark: {
				...HERE_DARK,
				brandPrimary: "#F97316",
				brandSecondary: "#44342C",
				backgroundPrimary: "#221A16",
				background1: "#15100D",
				background2: "#221A16",
				background3: "#2A211C",
				background4: "#342923",
				background5: "#44342C",
				background6: "#5E4A3F",
				inputBackground: "#5E4A3F",
				linkDefault: "#FDBA74",
				linkHover: "#FB923C"
			},
			light: {
				...HERE_LIGHT,
				brandPrimary: "#C2410C",
				brandSecondary: "#F1DED3",
				backgroundPrimary: "#FDF8F5",
				background1: "#FFFFFF",
				background2: "#FDF8F5",
				background3: "#FAEFE8",
				background4: "#F6E7DD",
				background5: "#F1DED3",
				background6: "#E2C6B6",
				inputBackground: "#FAEFE8",
				textDefault: "#2A1A12",
				inputColor: "#2A1A12",
				linkDefault: "#C2410C",
				linkHover: "#9A3412"
			}
		}
	}
] satisfies ThemePreset[];

/**
 * Resolves a preset and scheme preference to the theme that should be applied.
 * @param presetId The id of the preset to use. Falls back to the first preset when unknown.
 * @param preference The requested scheme.
 * @returns The theme to apply.
 */
export function resolveTheme(presetId: string, preference: SchemePreference): Theme {
	const preset = THEME_PRESETS.find((candidate) => candidate.id === presetId) ?? THEME_PRESETS[0];
	const scheme = preference === "system" ? getSystemScheme() : preference;
	return { presetId: preset.id, scheme, palette: preset.palettes[scheme] };
}

/**
 * Gets the scheme the operating system prefers.
 * @returns The system color scheme.
 */
export function getSystemScheme(): ColorScheme {
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
