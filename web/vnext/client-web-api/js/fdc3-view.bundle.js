/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
/*!*****************************************!*\
  !*** ./client/src/content/fdc3-view.ts ***!
  \*****************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
window.addEventListener("DOMContentLoaded", async () => {
    await initializeDOM();
});
/**
 * Broadcasts a context using FDC3.
 */
async function broadcastContext() {
    const contextType = "fdc3.instrument";
    const contextName = "Apple";
    const idData = {
        ticker: "AAPL"
    };
    const context = {
        type: contextType,
        name: contextName,
        id: idData
    };
    if (window.fdc3) {
        await window.fdc3.broadcast(context);
        console.log(`Broadcasted context: ${contextType} - ${contextName}`);
    }
    else {
        window.addEventListener("fdc3Ready", async () => {
            await window.fdc3.broadcast(context);
            console.log(`Broadcasted context: ${contextType} - ${contextName}`);
        });
    }
}
/**
 * Adds an FDC3 context listener to the window.
 */
async function addFDC3Listener() {
    if (window.fdc3) {
        await window.fdc3.addContextListener(null, (context) => {
            updateDOMElements(context);
        });
    }
    else {
        window.addEventListener("fdc3Ready", async () => {
            await window.fdc3.addContextListener(null, (context) => {
                updateDOMElements(context);
            });
        });
    }
}
/**
 * Updates the DOM elements with the provided context.
 * @param context The context to update the DOM elements with.
 */
function updateDOMElements(context) {
    const contextTypeSpan = document.querySelector("#contextType");
    const contextNameSpan = document.querySelector("#contextName");
    const contextBodyPre = document.querySelector("#contextBody");
    if (contextTypeSpan !== null && contextNameSpan !== null && contextBodyPre !== null) {
        contextTypeSpan.textContent = context.type;
        contextNameSpan.textContent = context.name ?? "No name provided.";
        contextBodyPre.textContent = JSON.stringify(context, null, 2);
    }
}
/**
 * Initialize the DOM elements.
 */
async function initializeDOM() {
    const broadcastButton = document.querySelector("#broadcast");
    if (broadcastButton !== null) {
        broadcastButton.addEventListener("click", async () => {
            await broadcastContext();
        });
    }
    await addFDC3Listener();
}

})();

/******/ })()
;
//# sourceMappingURL=fdc3-view.bundle.js.map