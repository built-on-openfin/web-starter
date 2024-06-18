/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/@openfin/core-web/out/iframe-broker.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/@openfin/core-web/out/iframe-broker.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

const e="web-broker-ports-ready",t="worker-initialize-connection",r="create-fallback-connection",i="request-fallback-connection",o=e=>`ack-${e}`,n=(...e)=>({log:(...t)=>console.log(`[${(new Date).toISOString()}]`,...(e=>e.map((e=>`[${e}]`)))(e),...t),getLogger:(...t)=>n(...e,...t)});class s{static get lockApi(){return navigator.locks}constructor(e){this.name=e,this.releaseCallback=null,s.pending.add(this),this.lockAcquiredPromise=new Promise(((e,t)=>{this.lockReleasedPromise=s.lockApi.request(this.name,(()=>(s.pending.delete(this),e(),new Promise((e=>{s.held.add(this),this.releaseCallback=e}))))).catch((e=>{throw t(e),e}))}))}async acquired(){await this.lockAcquiredPromise}async release(){if(!this.releaseCallback)throw new Error(`Lock ${this.name} not acquired.`);this.releaseCallback(),this.releaseCallback=null,await this.lockReleasedPromise,s.held.delete(this)}async onReleased(e){if(!this.lockReleasedPromise)throw new Error(`Lock ${this.name} not queued.`);return this.lockReleasedPromise.then(e)}autoRelease(){this.acquired().then((()=>this.release()))}static async releaseAll(){const e=Promise.all([...this.pending].map((async e=>{await e.acquired(),await e.release()})));await Promise.all([...this.held].map((async e=>{await e.release()}))),await e}}s.pending=new Set,s.held=new Set;const a=e=>window.top===e,c=(e,t)=>{try{return e.origin===t.origin}catch(e){return!1}},d="openfin/web-shared-worker";class h{constructor(e,t,n){this.workerUrl=e,this.iframeWindow=t,this.forceWorker=n,this.isSharedWorkerSupported=()=>!this.forceWorker&&!!window.SharedWorker,this.state="ready",this.establishWorkerConnectionViaWindow=async e=>{if(c(this.iframeWindow,e)){const t=new MessageChannel;return new Promise(((n,s)=>{t.port1.addEventListener("message",(e=>{e.data.topic===o(r)&&(e.data.success?n(t.port1):s(e.data.reason))})),t.port1.start();const a={topic:i};e.postMessage(a,location.origin,[t.port2])}))}throw new Error("Could not connect via top level browsing context as its origin does not much the web interop broker.")},this.listenForNestedConnections=e=>{"top-window"===this.state&&c(this.iframeWindow,this.iframeWindow.parent)&&this.iframeWindow.parent.addEventListener("message",(t=>{if(t.origin===location.origin&&t.data.topic===i){const[i]=t.ports,o={topic:r};e.postMessage(o,[i])}}))},this.initialize=async()=>{if("ready"!==this.state)throw new Error("Worker connection already initialized");if((e=>{const t=r=>!(!(e=>{try{return!e.origin}catch(e){return!0}})(r)&&r.origin===e.origin)||!a(r)&&t(r.parent);return!a(e)&&t(e.parent)})(this.iframeWindow)&&c(this.iframeWindow,this.iframeWindow.top))return this.state="partitioned-frame",this.establishWorkerConnectionViaWindow(this.iframeWindow.top);if(a(this.iframeWindow.parent)){let e;return this.state="top-window",e=this.isSharedWorkerSupported()?new SharedWorker(this.workerUrl,d).port:new Worker(this.workerUrl),this.listenForNestedConnections(e),e}{if(this.state="frame",!this.isSharedWorkerSupported())try{return await this.establishWorkerConnectionViaWindow(this.iframeWindow.top)}catch(e){throw new Error(`SharedWorker is not supported and an unexpected error occured when trying to connect via fallback mechanism: ${e.message}`)}const{port:e}=new SharedWorker(this.workerUrl,d);return e}}}}const l=n("@openfin/core-web/iframe-broker"),w=()=>{const e=((e,t)=>{const r=new RegExp(`^${t}<(?<meta>.*)>$`).exec(e)?.groups?.meta;if(r)try{return JSON.parse(atob(r))}catch(e){throw new Error(`Failed to decode JSON from ${r}.`)}})(window.name,"of-broker");if(!e)throw new Error("Invalid or missing identity string in iframe context. Ensure that this iframe is being renderered via the @openfin/core-web library.");return e};function p(t){const r={topic:o(e),success:!1,reason:t?.reason??"Connection Rejected"};window.parent.postMessage(r,"*")}exports.init=async r=>{try{const{sharedWorkerUrl:i}=r;await("loading"===document.readyState?new Promise((e=>{const t=()=>{e(),window.removeEventListener("DOMContentLoaded",t)};window.addEventListener("DOMContentLoaded",t)})):Promise.resolve());const n=w(),a=new h(i,window,"same-site"!==r.experimental?.crossTab),c=await a.initialize();l.log(`Loading ${i} in ${a.state} mode...`);const d=await(async(r,i,n)=>{const a=new MessageChannel,c=new MessageChannel,d={topic:t,payload:{identity:n}},h=new s((e=>`__OPENFIN__${e.uuid}_${e.name}`)(n));await h.acquired(),await new Promise(((e,r)=>{i.addEventListener("message",(i=>{i.data.topic===o(t)&&(i.data.success?e():r(new Error(i.data.reason)))})),i.start?.(),i.postMessage(d,[c.port2])}));const l={topic:o(e),success:!0,payload:{identity:n}};return r.postMessage(l,"*",[a.port2,c.port1]),a.port1})(window.parent,c,n);d.start(),c.start?.(),l.log(`Port transfer complete in ${a.state} mode. Connection established with identity ${JSON.stringify(n)}. SharedWorker support=${a.isSharedWorkerSupported()}`)}catch(e){const t=new Error(`An unexpected error occured during initialization. ${e.message}`);p({reason:t.message}),console.error(t)}},exports.rejectConnections=p;


/***/ }),

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
/*!**********************************************!*\
  !*** ./client/src/platform/iframe-broker.ts ***!
  \**********************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const iframe_broker_1 = __webpack_require__(/*! @openfin/core-web/iframe-broker */ "../../node_modules/@openfin/core-web/out/iframe-broker.js");
const settings_1 = __webpack_require__(/*! ./settings */ "./client/src/platform/settings.ts");
/**
 * Initializes the OpenFin Web Broker connection.
 * @returns A promise that resolves when the connection is established.
 */
async function init() {
    const settings = await (0, settings_1.getSettings)();
    if (settings === undefined) {
        console.error("Unable to run the sample as we have been unable to load the web manifest and it's settings from the currently running html page. Please ensure that the web manifest is being served and that it contains the custom_settings section.");
        return;
    }
    return (0, iframe_broker_1.init)({
        sharedWorkerUrl: settings.platform.interop.sharedWorkerUrl
    });
}
init()
    .then(() => {
    console.log("Connected to the OpenFin IFrame Web Broker.");
    return true;
})
    .catch((err) => console.error(err));

})();

/******/ })()
;
//# sourceMappingURL=iframe-broker.bundle.js.map