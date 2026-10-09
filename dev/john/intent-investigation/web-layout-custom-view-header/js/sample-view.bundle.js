/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
let exports = __webpack_exports__;
/*!*******************************************!*\
  !*** ./client/src/content/sample-view.ts ***!
  \*******************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Names the page from the query string so each view in the layout is distinguishable.
 *
 * The layout tab picks the page title up through its own title handling, and the icon shown
 * next to that title is decided by the view's `icon` component state, not by this page.
 */
function init() {
    const name = new URLSearchParams(window.location.search).get("name");
    if (name === null) {
        return;
    }
    document.title = name;
    const heading = document.querySelector("#view-name");
    if (heading) {
        heading.textContent = name;
    }
}
init();

})();

/******/ })()
;
//# sourceMappingURL=sample-view.bundle.js.map