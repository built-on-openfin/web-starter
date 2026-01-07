/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
        const resolvedSettings = JSON.parse(settings);
        if (!resolvedSettings?.platform?.cloudInterop?.connectParams?.authenticationType) {
            resolvedSettings.platform.cloudInterop.connectParams.authenticationType = "basic";
        }
        return resolvedSettings;
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


/***/ }),

/***/ "./node_modules/@openfin/core-web/out/iframe-broker.cjs.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@openfin/core-web/out/iframe-broker.cjs.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

const e=(e,t)=>{try{return e.origin===t.origin}catch(e){return!1}},t="web-broker-ports-ready",r="worker-initialize-connection",o="create-fallback-connection",i="request-fallback-connection",n=e=>`ack-${e}`,s=new Map([["debug",0],["info",1],["warn",2],["error",3],["none",4]]),a=e=>"string"==typeof e?e:e instanceof Error?e.stack||e.message:JSON.stringify(e);class c{static setGlobalLogLevel(e){c.LOG_LEVEL=e??"error"}static setCustomLogger(e){c.customLogger=e}constructor(...e){this.scopes=e}log(e,...t){const r=s.get(e)??3;if((s.get(c.LOG_LEVEL)??3)<=r){const i=[`[${(new Date).toISOString()}]`,...(o=this.scopes,o.map((e=>`[${e}]`))),...t];if(c.customLogger){const t=i.map(a).join(" ");c.customLogger[e](t)}else 1===r?console.log(...i):console[e](...i)}var o}warn(...e){this.log("warn",...e)}error(...e){this.log("error",...e)}info(...e){this.log("info",...e)}debug(...e){this.log("debug",...e)}static getLogger(...e){return new c(...e)}getLogger(...e){return new c(...this.scopes,...e)}}c.LOG_LEVEL="error",c.getLogger("@openfin/core-web/client");const l="openfin/web-shared-worker",d=e=>window.top===e;class h{static get lockApi(){return navigator.locks}constructor(e){this.name=e,this.releaseCallback=null,h.pending.add(this),this.lockAcquiredPromise=new Promise(((e,t)=>{this.lockReleasedPromise=h.lockApi.request(this.name,(()=>(h.pending.delete(this),e(),new Promise((e=>{h.held.add(this),this.releaseCallback=e}))))).catch((e=>{throw t(e),e}))}))}async acquired(){await this.lockAcquiredPromise}async release(){if(!this.releaseCallback)throw new Error(`Lock ${this.name} not acquired.`);this.releaseCallback(),this.releaseCallback=null,await this.lockReleasedPromise,h.held.delete(this)}async onReleased(e){if(!this.lockReleasedPromise)throw new Error(`Lock ${this.name} not queued.`);return this.lockReleasedPromise.then(e)}autoRelease(){this.acquired().then((()=>this.release()))}static async releaseAll(){const e=Promise.all([...this.pending].map((async e=>{await e.acquired(),await e.release()})));await Promise.all([...this.held].map((async e=>{await e.release()}))),await e}}h.pending=new Set,h.held=new Set;class w{constructor(e=100,t=2){this.pingIntervalMs=e,this.allowedMissedPings=t,this.lockSelf=async e=>{const t=new h((e=>`__OPENFIN__${e.uuid}_${e.name}`)(e));return await t.acquired(),t}}async lockProxiedConnection(e,t){let r=0;t.addEventListener("message",(e=>{"pong"===e.data.topic&&r--}));const o=await this.lockSelf(e);let i=setInterval((()=>{r>=this.allowedMissedPings?(o.release(),clearInterval(i)):(r++,t.postMessage({topic:"ping"}))}),this.pingIntervalMs);t.start()}registerProxiedConnection(e){e.addEventListener("message",(t=>{"ping"===t.data.topic&&e.postMessage({topic:"pong"})})),e.start()}}class p{constructor(t,r,s){this.workerUrl=t,this.iframeWindow=r,this.forceWorker=s,this.identityDisconnectionController=new w,this.isSharedWorkerSupported=()=>!this.forceWorker&&!!window.SharedWorker,this.state="ready",this.establishWorkerConnectionViaWindow=async(t,r)=>{if(e(this.iframeWindow,t)){const e=new MessageChannel,s=new MessageChannel;return this.identityDisconnectionController.registerProxiedConnection(s.port1),new Promise(((a,c)=>{e.port1.addEventListener("message",(t=>{t.data.topic===n(o)&&(t.data.success?a(e.port1):c(t.data.reason))})),e.port1.start();const l={topic:i,payload:{identity:r}};t.postMessage(l,location.origin,[e.port2,s.port2])}))}throw new Error("Could not connect via top level browsing context as its origin does not much the web interop broker.")},this.listenForNestedConnections=t=>{"top-window"===this.state&&e(this.iframeWindow,this.iframeWindow.parent)&&this.iframeWindow.parent.addEventListener("message",(async e=>{const{data:r}=e;if(e.origin===location.origin&&r.topic===i){const[i,...n]=e.ports;if(n.length>0&&r.payload?.identity){const[e]=n;await this.identityDisconnectionController.lockProxiedConnection(r.payload.identity,e)}const s={topic:o};t.postMessage(s,[i])}}))},this.initialize=async t=>{if("ready"!==this.state)throw new Error("Worker connection already initialized");return(e=>{const t=r=>!(!(e=>{try{return!e.origin}catch(e){return!0}})(r)&&r.origin===e.origin)||!d(r)&&t(r.parent);return!d(e)&&t(e.parent)})(this.iframeWindow)&&e(this.iframeWindow,this.iframeWindow.top)?this.state="partitioned-frame":d(this.iframeWindow.parent)?this.state="top-window":this.state="frame",this.connect(t)}}async connect(e){if("ready"===this.state)throw new Error("Must call initialize before connect");switch(this.state){case"partitioned-frame":return this.establishWorkerConnectionViaWindow(this.iframeWindow.top,e);case"top-window":{let t;return t=this.isSharedWorkerSupported()?new SharedWorker(this.workerUrl,l).port:new Worker(this.workerUrl),await this.identityDisconnectionController.lockSelf(e),this.listenForNestedConnections(t),t}case"frame":{if(!this.isSharedWorkerSupported())try{return await this.establishWorkerConnectionViaWindow(this.iframeWindow.top,e)}catch(e){throw new Error(`SharedWorker is not supported and an unexpected error occured when trying to connect via fallback mechanism: ${e.message}`,{cause:e})}await this.identityDisconnectionController.lockSelf(e);const{port:t}=new SharedWorker(this.workerUrl,l);return t}default:throw this.state,new Error(`Invalid state: ${this.state}`)}}}const g=c.getLogger("@openfin/core-web/iframe-broker"),u=()=>{const e=((e,t)=>{const r=new RegExp(`^${t}<(?<meta>.*)>$`).exec(e)?.groups?.meta;if(r)try{return JSON.parse(atob(r))}catch(e){throw new Error(`Failed to decode JSON from ${r}.`)}})(window.name,"of-broker");if(!e)throw new Error("Invalid or missing identity string in iframe context. Ensure that this iframe is being renderered via the @openfin/core-web library.");return e};function m(e){const r={topic:n(t),success:!1,reason:e?.reason??"Connection Rejected"};window.parent.postMessage(r,"*")}exports.init=async e=>{try{c.setGlobalLogLevel(e.logLevel??"error"),c.setCustomLogger(e.logger);const{sharedWorkerUrl:o}=e;await("loading"===document.readyState?new Promise((e=>{const t=()=>{e(),window.removeEventListener("DOMContentLoaded",t)};window.addEventListener("DOMContentLoaded",t)})):Promise.resolve());const i=u(),s=new p(o,window,"same-site"!==e.experimental?.crossTab),a=await s.initialize(i);g.info(`Loading ${o} in ${s.state} mode...`);const l=await(async(e,o,i)=>{const s=new MessageChannel,a=new MessageChannel,c={topic:r,payload:{identity:i}};await new Promise(((e,t)=>{o.addEventListener("message",(o=>{o.data.topic===n(r)&&(o.data.success?e():t(new Error(o.data.reason)))})),o.start?.(),o.postMessage(c,[a.port2])}));const l={topic:n(t),success:!0,payload:{identity:i}};return e.postMessage(l,"*",[s.port2,a.port1]),s.port1})(window.parent,a,i);l.start(),a.start?.(),g.debug(`Port transfer complete in ${s.state} mode. Connection established with identity ${JSON.stringify(i)}. SharedWorker support=${s.isSharedWorkerSupported()}`)}catch(e){const t=new Error(`An unexpected error occured during initialization. ${e.message}`);m({reason:t.message}),console.error(t)}},exports.rejectConnections=m;


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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************************************!*\
  !*** ./client/src/platform/iframe-broker.ts ***!
  \**********************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const iframe_broker_1 = __webpack_require__(/*! @openfin/core-web/iframe-broker */ "./node_modules/@openfin/core-web/out/iframe-broker.cjs.js");
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