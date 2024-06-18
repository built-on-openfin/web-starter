import type OpenFin from "@openfin/core";
import type { WebLayoutSnapshot } from "@openfin/core-web";

/**
 * Type of the parameter passed into the layoutManagerOverride function.
 * Extended by implementor's class.
 */
export type LayoutManagerConstructor = OpenFin.LayoutManagerConstructor<OpenFin.LayoutSnapshot>;

/**
 * Adds support for adding titles to go alongside the layouts
 */
export type PlatformLayoutSnapshot = WebLayoutSnapshot & {
	layoutTitles: { [key: string]: string };
	layoutSelected?: string;
};

/**
 * Type of the LayoutManager instance created by the override.
 */
export type LayoutManager = OpenFin.LayoutManager<OpenFin.LayoutSnapshot>;

/**
 * Layout Shape that is used to index one or more layouts used in a platform window.
 */
export interface LayoutManagerItem {
	/**
	 * Name of layout item.
	 */
	layoutName: string;
	/**
	 * Layout Title.
	 */
	layoutTitle?: string;
	/**
	 * Layout settings, and content options.
	 */
	layout: OpenFin.LayoutOptions;
	/**
	 * Layout element to bind the layout creation to.
	 */
	container?: HTMLElement;
}
