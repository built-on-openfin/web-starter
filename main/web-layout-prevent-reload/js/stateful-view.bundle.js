/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
/*!*********************************************!*\
  !*** ./client/src/content/stateful-view.ts ***!
  \*********************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const SECONDS_PER_MINUTE = 60;
const HUE_RANGE = 360;
const TICK_MS = 1000;
const MIN_HUE_OFFSET = 60;
const MAX_HUE_OFFSET = 300;
/**
 * Reads the view name from the page query string.
 * @returns The view name, or "unnamed" when the query param is absent.
 */
function getViewName() {
    const params = new URLSearchParams(window.location.search);
    return params.get("view") ?? "unnamed";
}
/**
 * Picks a background colour that is visibly different from any previous load.
 * If no previous colour is stored, picks a random hue; otherwise ensures the new
 * hue is at least 60° away from the last one.
 * @param viewName The name of the view, used to persist hue across reloads.
 * @returns The colour that was applied, in CSS hsl() form.
 */
function applyRandomBackground(viewName) {
    const storageKey = `stateful-view-hue-${viewName}`;
    const previousHueStr = window.sessionStorage.getItem(storageKey);
    const previousHue = previousHueStr === null ? Number.NaN : Number.parseInt(previousHueStr, 10);
    let hue;
    if (Number.isNaN(previousHue)) {
        // No previous hue or corrupt stored value; pick freely at random
        hue = Math.floor(Math.random() * HUE_RANGE);
    }
    else {
        // Pick a hue rotated by a random offset [MIN_HUE_OFFSET, MAX_HUE_OFFSET] from the previous one
        const offset = Math.floor(Math.random() * (MAX_HUE_OFFSET - MIN_HUE_OFFSET + 1)) + MIN_HUE_OFFSET;
        hue = (previousHue + offset) % HUE_RANGE;
    }
    window.sessionStorage.setItem(storageKey, String(hue));
    const colour = `hsl(${hue}, 65%, 45%)`;
    document.body.style.backgroundColor = colour;
    return colour;
}
/**
 * Increments and returns this view's page-load count for the session.
 * Survives reloads, so it ticks up only when the iframe genuinely reloads.
 * @param viewName The name of the view, used as the storage key.
 * @returns The load count including the current load.
 */
function recordLoad(viewName) {
    const key = `stateful-view-loads-${viewName}`;
    const previous = Number.parseInt(window.sessionStorage.getItem(key) ?? "0", 10);
    const loads = Number.isNaN(previous) ? 1 : previous + 1;
    window.sessionStorage.setItem(key, String(loads));
    return loads;
}
/**
 * Formats a duration as mm:ss.
 * @param totalSeconds The elapsed seconds to format.
 * @returns The duration rendered as a zero-padded mm:ss string.
 */
function formatUptime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / SECONDS_PER_MINUTE);
    const seconds = totalSeconds % SECONDS_PER_MINUTE;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
/**
 * Starts the uptime counter, which resets to zero whenever the page reloads.
 * @param element The element to render the running total into.
 */
function startUptime(element) {
    const startedAt = Date.now();
    window.setInterval(() => {
        const elapsed = Math.floor((Date.now() - startedAt) / TICK_MS);
        element.textContent = formatUptime(elapsed);
    }, TICK_MS);
}
/**
 * Renders the four reload tells: colour, uptime, load count and a text input.
 */
function init() {
    const viewName = getViewName();
    document.title = viewName;
    const colour = applyRandomBackground(viewName);
    const loads = recordLoad(viewName);
    const nameElement = document.querySelector("#view-name");
    const colourElement = document.querySelector("#view-colour");
    const loadsElement = document.querySelector("#view-loads");
    const uptimeElement = document.querySelector("#view-uptime");
    if (nameElement) {
        nameElement.textContent = viewName;
    }
    if (colourElement) {
        colourElement.textContent = colour;
    }
    if (loadsElement) {
        loadsElement.textContent = String(loads);
    }
    if (uptimeElement) {
        startUptime(uptimeElement);
    }
    console.log(`[stateful-view] ${viewName} loaded. Load #${loads}, colour ${colour}.`);
}
init();

})();

/******/ })()
;
//# sourceMappingURL=stateful-view.bundle.js.map