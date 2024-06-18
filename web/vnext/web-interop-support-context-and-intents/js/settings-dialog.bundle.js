/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/src/platform/settings.ts":
/*!*****************************************!*\
  !*** ./client/src/platform/settings.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.saveSettings = exports.clearSettings = exports.getDefaultLayout = exports.getSettings = void 0;
/**
 * Fetches the settings for the application.
 * @returns The settings for the application.
 */
async function getSettings() {
    const savedSettings = await getSavedSettings();
    if (savedSettings) {
        return savedSettings;
    }
    const settings = await getManifestSettings();
    if (!Array.isArray(settings?.endpointProvider?.endpoints)) {
        console.error("Unable to run the example as settings are required and we fetch them from the link web manifest from the html page that is being served. It should exist in the customSettings section of the web manifest.");
        return;
    }
    const settingsEndpoint = settings.endpointProvider.endpoints.find((endpoint) => endpoint.id === "platform-settings");
    if (settingsEndpoint === undefined ||
        settingsEndpoint.type !== "fetch" ||
        settingsEndpoint.options.method !== "GET" ||
        settingsEndpoint.options.url === undefined) {
        console.error("Unable to run the example as settings are required and we fetch them from the endpoint defined with the id: 'platform-settings' in the manifest. It needs to be of type fetch, performing a GET and it must have a url defined.");
        return;
    }
    const platformSettings = await fetch(settingsEndpoint?.options.url);
    const settingsJson = (await platformSettings.json());
    return settingsJson;
}
exports.getSettings = getSettings;
/**
 * Returns a default layout from the settings if provided.
 * @returns The default layout from the settings.
 */
async function getDefaultLayout() {
    const settings = await getSettings();
    if (settings?.platform?.layout?.defaultLayout === undefined) {
        console.error("Unable to run the example as without a layout being defined. Please ensure that settings have been provided in the web manifest.");
        return;
    }
    if (typeof settings.platform.layout.defaultLayout === "string") {
        const layoutResponse = await fetch(settings.platform.layout.defaultLayout);
        const layoutJson = (await layoutResponse.json());
        return layoutJson;
    }
    return settings.platform.layout.defaultLayout;
}
exports.getDefaultLayout = getDefaultLayout;
/**
 * Returns the settings from the manifest file.
 * @returns customSettings for this example
 */
async function getManifestSettings() {
    // Get the manifest link
    const link = document.querySelector('link[rel="manifest"]');
    if (link !== null) {
        const manifestResponse = await fetch(link.href);
        const manifestJson = (await manifestResponse.json());
        return manifestJson.custom_settings;
    }
}
/**
 * Clears any saved settings.
 * @returns The saved settings.
 */
async function clearSettings() {
    const settingsId = getSavedSettingsId();
    localStorage.removeItem(settingsId);
}
exports.clearSettings = clearSettings;
/**
 * Saves the settings.
 * @param settings The settings to save.
 */
async function saveSettings(settings) {
    const settingsId = getSavedSettingsId();
    localStorage.setItem(settingsId, JSON.stringify(settings));
}
exports.saveSettings = saveSettings;
/**
 * Retrieves saved settings from local storage.
 * @returns The saved settings.
 */
async function getSavedSettings() {
    const settingsId = getSavedSettingsId();
    const settings = localStorage.getItem(settingsId);
    if (settings !== null) {
        return JSON.parse(settings);
    }
}
/**
 * Get the Id used for saving and fetching settings from storage.
 * @returns The settings id.
 */
function getSavedSettingsId() {
    const urlParams = new URLSearchParams(window.location.search);
    const env = urlParams.get("env");
    const settingsKey = env ? `${env}-settings` : "settings";
    return settingsKey;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
/*!***********************************************!*\
  !*** ./client/src/content/settings-dialog.ts ***!
  \***********************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const settings_1 = __webpack_require__(/*! ../platform/settings */ "./client/src/platform/settings.ts");
window.addEventListener("DOMContentLoaded", async () => {
    if (window.fdc3) {
        await init();
    }
    else {
        window.addEventListener("fdc3Ready", async () => {
            await init();
        });
    }
});
/**
 * Initialize the settings.
 */
async function init() {
    const settings = await (0, settings_1.getSettings)();
    if (settings === undefined) {
        console.error("Unable to run the example as we have been unable to load the web manifest and it's settings from the currently running html page. Please ensure that the web manifest is being served and that it contains the custom_settings section.");
        return;
    }
    // platform settings
    const title = document.querySelector("#title");
    const subTitle = document.querySelector("#subTitle");
    const logo = document.querySelector("#logo");
    // cloud settings
    const userId = document.querySelector("#userId");
    const password = document.querySelector("#password");
    const platformId = document.querySelector("#platformId");
    const cloudUrl = document.querySelector("#cloudUrl");
    const sourceId = document.querySelector("#sourceId");
    const sourceDisplayName = document.querySelector("#sourceDisplayName");
    const saveButton = document.querySelector("#save");
    const resetButton = document.querySelector("#reset");
    const cancelButton = document.querySelector("#cancel");
    // assign returned settings to the input fields
    if (title === null ||
        subTitle === null ||
        logo === null ||
        userId === null ||
        password === null ||
        platformId === null ||
        cloudUrl === null ||
        sourceId === null ||
        sourceDisplayName === null ||
        saveButton === null ||
        resetButton === null ||
        cancelButton === null) {
        console.error("Unable to use settings as there are missing input fields/buttons.");
        return;
    }
    title.value = settings?.platform?.ui?.title;
    subTitle.value = settings?.platform?.ui?.subTitle;
    logo.value = settings?.platform?.ui?.logo;
    userId.value = settings?.platform.cloudInterop?.connectParams?.userId;
    password.value = settings?.platform.cloudInterop?.connectParams?.password;
    platformId.value = settings?.platform.cloudInterop?.connectParams?.platformId;
    cloudUrl.value = settings?.platform.cloudInterop?.connectParams?.url;
    sourceId.value = settings?.platform.cloudInterop?.connectParams.sourceId ?? "";
    sourceDisplayName.value = settings?.platform.cloudInterop?.connectParams.sourceDisplayName ?? "";
    const channel = "platform/settings/dialog";
    const appChannel = await window.fdc3.getOrCreateChannel(channel);
    saveButton.addEventListener("click", async () => {
        settings.platform.ui.title = title.value;
        settings.platform.ui.subTitle = subTitle.value;
        settings.platform.ui.logo = logo.value;
        settings.platform.cloudInterop.connectParams.userId = userId.value;
        settings.platform.cloudInterop.connectParams.password = password.value;
        settings.platform.cloudInterop.connectParams.platformId = platformId.value;
        settings.platform.cloudInterop.connectParams.url = cloudUrl.value;
        settings.platform.cloudInterop.connectParams.sourceId = sourceId.value;
        settings.platform.cloudInterop.connectParams.sourceDisplayName = sourceDisplayName.value;
        // an example of using an app channel.
        await appChannel.broadcast({
            type: "platform.settings.dialog.action",
            id: { action: "save-reload" },
            settings
        });
    });
    resetButton.addEventListener("click", async () => {
        // an example of using an app channel.
        await appChannel.broadcast({ type: "platform.settings.dialog.action", id: { action: "reset-reload" } });
    });
    cancelButton.addEventListener("click", async () => {
        // an example of using an app channel.
        await appChannel.broadcast({ type: "platform.settings.dialog.action", id: { action: "close" } });
    });
}

})();

/******/ })()
;
//# sourceMappingURL=settings-dialog.bundle.js.map