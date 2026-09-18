import type OpenFin from "@openfin/core";
import type { WebLayoutSnapshot } from "@openfin/core-web";

/**
 * Type of the `Base` parameter passed into the layoutManagerOverride function.
 * `Layout.init`'s override callback always hands back a constructor typed
 * against core's `OpenFin.LayoutSnapshot`, regardless of which snapshot type
 * the override itself produces.
 */
export type LayoutManagerConstructor = OpenFin.LayoutManagerConstructor<OpenFin.LayoutSnapshot>;

/**
 * Type of the constructor returned by the layoutManagerOverride function,
 * typed against core-web's `WebLayoutSnapshot`.
 */
export type WebLayoutManagerConstructor = OpenFin.LayoutManagerConstructor<WebLayoutSnapshot>;

/**
 * Type of the LayoutManager instance created by the override.
 */
export type LayoutManager = OpenFin.LayoutManager<WebLayoutSnapshot>;
