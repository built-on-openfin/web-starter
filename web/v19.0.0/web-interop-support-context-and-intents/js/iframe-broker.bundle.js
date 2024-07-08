/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/@openfin/core-web/out/iframe-broker.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/@openfin/core-web/out/iframe-broker.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

const e="web-broker-ports-ready",t="worker-initialize-connection",i="create-fallback-connection",r="request-fallback-connection",n=e=>`ack-${e}`,o=(...e)=>({log:(...t)=>console.log(`[${(new Date).toISOString()}]`,...(e=>e.map((e=>`[${e}]`)))(e),...t),getLogger:(...t)=>o(...e,...t)}),s=e=>window.top===e,a=(e,t)=>{try{return e.origin===t.origin}catch(e){return!1}},c="openfin/web-shared-worker";class d{static get lockApi(){return navigator.locks}constructor(e){this.name=e,this.releaseCallback=null,d.pending.add(this),this.lockAcquiredPromise=new Promise(((e,t)=>{this.lockReleasedPromise=d.lockApi.request(this.name,(()=>(d.pending.delete(this),e(),new Promise((e=>{d.held.add(this),this.releaseCallback=e}))))).catch((e=>{throw t(e),e}))}))}async acquired(){await this.lockAcquiredPromise}async release(){if(!this.releaseCallback)throw new Error(`Lock ${this.name} not acquired.`);this.releaseCallback(),this.releaseCallback=null,await this.lockReleasedPromise,d.held.delete(this)}async onReleased(e){if(!this.lockReleasedPromise)throw new Error(`Lock ${this.name} not queued.`);return this.lockReleasedPromise.then(e)}autoRelease(){this.acquired().then((()=>this.release()))}static async releaseAll(){const e=Promise.all([...this.pending].map((async e=>{await e.acquired(),await e.release()})));await Promise.all([...this.held].map((async e=>{await e.release()}))),await e}}d.pending=new Set,d.held=new Set;class l{constructor(e=100,t=2){this.pingIntervalMs=e,this.allowedMissedPings=t,this.lockSelf=async e=>{const t=new d((e=>`__OPENFIN__${e.uuid}_${e.name}`)(e));return await t.acquired(),t}}async lockProxiedConnection(e,t){let i=0;t.addEventListener("message",(e=>{"pong"===e.data.topic&&i--}));const r=await this.lockSelf(e);let n=setInterval((()=>{i>=this.allowedMissedPings?(r.release(),clearInterval(n)):(i++,t.postMessage({topic:"ping"}))}),this.pingIntervalMs);t.start()}registerProxiedConnection(e){e.addEventListener("message",(t=>{"ping"===t.data.topic&&e.postMessage({topic:"pong"})})),e.start()}}class h{constructor(e,t,o){this.workerUrl=e,this.iframeWindow=t,this.forceWorker=o,this.identityDisconnectionController=new l,this.isSharedWorkerSupported=()=>!this.forceWorker&&!!window.SharedWorker,this.state="ready",this.establishWorkerConnectionViaWindow=async(e,t)=>{if(a(this.iframeWindow,e)){const o=new MessageChannel,s=new MessageChannel;return this.identityDisconnectionController.registerProxiedConnection(s.port1),new Promise(((a,c)=>{o.port1.addEventListener("message",(e=>{e.data.topic===n(i)&&(e.data.success?a(o.port1):c(e.data.reason))})),o.port1.start();const d={topic:r,payload:{identity:t}};e.postMessage(d,location.origin,[o.port2,s.port2])}))}throw new Error("Could not connect via top level browsing context as its origin does not much the web interop broker.")},this.listenForNestedConnections=e=>{"top-window"===this.state&&a(this.iframeWindow,this.iframeWindow.parent)&&this.iframeWindow.parent.addEventListener("message",(async t=>{const{data:n}=t;if(t.origin===location.origin&&n.topic===r){const[r,...o]=t.ports;if(o.length>0&&n.payload?.identity){const[e]=o;await this.identityDisconnectionController.lockProxiedConnection(n.payload.identity,e)}const s={topic:i};e.postMessage(s,[r])}}))},this.initialize=async e=>{if("ready"!==this.state)throw new Error("Worker connection already initialized");return(e=>{const t=i=>!(!(e=>{try{return!e.origin}catch(e){return!0}})(i)&&i.origin===e.origin)||!s(i)&&t(i.parent);return!s(e)&&t(e.parent)})(this.iframeWindow)&&a(this.iframeWindow,this.iframeWindow.top)?this.state="partitioned-frame":s(this.iframeWindow.parent)?this.state="top-window":this.state="frame",this.connect(e)}}async connect(e){if("ready"===this.state)throw new Error("Must call initialize before connect");switch(this.state){case"partitioned-frame":return this.establishWorkerConnectionViaWindow(this.iframeWindow.top,e);case"top-window":{let t;return t=this.isSharedWorkerSupported()?new SharedWorker(this.workerUrl,c).port:new Worker(this.workerUrl),await this.identityDisconnectionController.lockSelf(e),this.listenForNestedConnections(t),t}case"frame":{if(!this.isSharedWorkerSupported())try{return await this.establishWorkerConnectionViaWindow(this.iframeWindow.top,e)}catch(e){throw new Error(`SharedWorker is not supported and an unexpected error occured when trying to connect via fallback mechanism: ${e.message}`,{cause:e})}await this.identityDisconnectionController.lockSelf(e);const{port:t}=new SharedWorker(this.workerUrl,c);return t}default:throw this.state,new Error(`Invalid state: ${this.state}`)}}}const w=o("@openfin/core-web/iframe-broker"),p=()=>{const e=((e,t)=>{const i=new RegExp(`^${t}<(?<meta>.*)>$`).exec(e)?.groups?.meta;if(i)try{return JSON.parse(atob(i))}catch(e){throw new Error(`Failed to decode JSON from ${i}.`)}})(window.name,"of-broker");if(!e)throw new Error("Invalid or missing identity string in iframe context. Ensure that this iframe is being renderered via the @openfin/core-web library.");return e};function g(t){const i={topic:n(e),success:!1,reason:t?.reason??"Connection Rejected"};window.parent.postMessage(i,"*")}exports.init=async i=>{try{const{sharedWorkerUrl:r}=i;await("loading"===document.readyState?new Promise((e=>{const t=()=>{e(),window.removeEventListener("DOMContentLoaded",t)};window.addEventListener("DOMContentLoaded",t)})):Promise.resolve());const o=p(),s=new h(r,window,"same-site"!==i.experimental?.crossTab),a=await s.initialize(o);w.log(`Loading ${r} in ${s.state} mode...`);const c=await(async(i,r,o)=>{const s=new MessageChannel,a=new MessageChannel,c={topic:t,payload:{identity:o}};await new Promise(((e,i)=>{r.addEventListener("message",(r=>{r.data.topic===n(t)&&(r.data.success?e():i(new Error(r.data.reason)))})),r.start?.(),r.postMessage(c,[a.port2])}));const d={topic:n(e),success:!0,payload:{identity:o}};return i.postMessage(d,"*",[s.port2,a.port1]),s.port1})(window.parent,a,o);c.start(),a.start?.(),w.log(`Port transfer complete in ${s.state} mode. Connection established with identity ${JSON.stringify(o)}. SharedWorker support=${s.isSharedWorkerSupported()}`)}catch(e){const t=new Error(`An unexpected error occured during initialization. ${e.message}`);g({reason:t.message}),console.error(t)}},exports.rejectConnections=g;


/***/ }),

/***/ "./client/src/platform/settings/settings.ts":
/*!**************************************************!*\
  !*** ./client/src/platform/settings/settings.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSettings = getSettings;
exports.getDefaultLayout = getDefaultLayout;
exports.clearSettings = clearSettings;
exports.saveSettings = saveSettings;
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
/**
 * Saves the settings.
 * @param settings The settings to save.
 */
async function saveSettings(settings) {
    const settingsId = getSavedSettingsId();
    localStorage.setItem(settingsId, JSON.stringify(settings));
}
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
const settings_1 = __webpack_require__(/*! ./settings/settings */ "./client/src/platform/settings/settings.ts");
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