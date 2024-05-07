/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
/*!****************************!*\
  !*** ./client/src/shim.ts ***!
  \****************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
/* eslint-disable wrap-iife */
// eslint-disable-next-line no-void, @typescript-eslint/no-floating-promises
(async function ensureFin() {
    if (window.fin === undefined) {
        try {
            const url = "https://built-on-openfin.github.io/web-starter/web/vnext/client-web-api/js/client.web.api.bundle.js";
            const module = await import(/* webpackIgnore: true */ url);
            await module.init({ target: window });
        }
        catch (error) {
            console.error("Failed to load the OpenFin API shim. Please note this is an example and you should implement your own approach for production.", error);
        }
    }
})();

})();

/******/ })()
;
//# sourceMappingURL=shim.api.bundle.js.map