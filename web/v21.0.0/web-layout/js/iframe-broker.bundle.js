/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/src/platform/settings.ts":
/*!*****************************************!*\
  !*** ./client/src/platform/settings.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSettings = getSettings;
exports.getDefaultLayout = getDefaultLayout;
exports.getSecondLayout = getSecondLayout;
/**
 * Fetches the settings for the application.
 * @returns The settings for the application.
 */
async function getSettings() {
    const settings = await getManifestSettings();
    if (settings === undefined) {
        console.error("Unable to run the example as settings are required and we fetch them from the link web manifest from the html page that is being served. It should exist in the customSettings section of the web manifest.");
    }
    return settings;
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
 * Returns a default layout from the settings if provided.
 * @returns The default layout from the settings.
 */
async function getSecondLayout() {
    const settings = await getSettings();
    if (settings?.platform?.layout?.secondLayout === undefined) {
        console.error("Unable to run the example as without a layout being defined. Please ensure that settings have been provided in the web manifest.");
        return;
    }
    if (typeof settings.platform.layout.secondLayout === "string") {
        const layoutResponse = await fetch(settings.platform.layout.secondLayout);
        const layoutJson = (await layoutResponse.json());
        return layoutJson;
    }
    return settings.platform.layout.secondLayout;
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


/***/ }),

/***/ "./node_modules/@openfin/core-web/out/iframe-broker.cjs.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@openfin/core-web/out/iframe-broker.cjs.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

const e=(e,t)=>{try{return e.origin===t.origin}catch(e){return!1}},t="web-broker-ports-ready",r="worker-initialize-connection",i="create-fallback-connection",o="request-fallback-connection",n=e=>`ack-${e}`,s=new Map([["debug",0],["info",1],["warn",2],["error",3],["none",4]]);class a{static setGlobalLogLevel(e){a.LOG_LEVEL=e??"error"}constructor(...e){this.scopes=e}log(e,...t){const r=s.get(e)??3;var i;(s.get(a.LOG_LEVEL)??3)<=r&&console.log(`[${(new Date).toISOString()}]`,...(i=this.scopes,i.map((e=>`[${e}]`))),...t)}warn(...e){this.log("warn",...e)}error(...e){this.log("error",...e)}info(...e){this.log("info",...e)}debug(...e){this.log("debug",...e)}static getLogger(...e){return new a(...e)}getLogger(...e){return new a(...this.scopes,...e)}}a.LOG_LEVEL="error",a.getLogger("@openfin/core-web/client");const c="openfin/web-shared-worker",d=e=>window.top===e;class l{static get lockApi(){return navigator.locks}constructor(e){this.name=e,this.releaseCallback=null,l.pending.add(this),this.lockAcquiredPromise=new Promise(((e,t)=>{this.lockReleasedPromise=l.lockApi.request(this.name,(()=>(l.pending.delete(this),e(),new Promise((e=>{l.held.add(this),this.releaseCallback=e}))))).catch((e=>{throw t(e),e}))}))}async acquired(){await this.lockAcquiredPromise}async release(){if(!this.releaseCallback)throw new Error(`Lock ${this.name} not acquired.`);this.releaseCallback(),this.releaseCallback=null,await this.lockReleasedPromise,l.held.delete(this)}async onReleased(e){if(!this.lockReleasedPromise)throw new Error(`Lock ${this.name} not queued.`);return this.lockReleasedPromise.then(e)}autoRelease(){this.acquired().then((()=>this.release()))}static async releaseAll(){const e=Promise.all([...this.pending].map((async e=>{await e.acquired(),await e.release()})));await Promise.all([...this.held].map((async e=>{await e.release()}))),await e}}l.pending=new Set,l.held=new Set;class h{constructor(e=100,t=2){this.pingIntervalMs=e,this.allowedMissedPings=t,this.lockSelf=async e=>{const t=new l((e=>`__OPENFIN__${e.uuid}_${e.name}`)(e));return await t.acquired(),t}}async lockProxiedConnection(e,t){let r=0;t.addEventListener("message",(e=>{"pong"===e.data.topic&&r--}));const i=await this.lockSelf(e);let o=setInterval((()=>{r>=this.allowedMissedPings?(i.release(),clearInterval(o)):(r++,t.postMessage({topic:"ping"}))}),this.pingIntervalMs);t.start()}registerProxiedConnection(e){e.addEventListener("message",(t=>{"ping"===t.data.topic&&e.postMessage({topic:"pong"})})),e.start()}}class w{constructor(t,r,s){this.workerUrl=t,this.iframeWindow=r,this.forceWorker=s,this.identityDisconnectionController=new h,this.isSharedWorkerSupported=()=>!this.forceWorker&&!!window.SharedWorker,this.state="ready",this.establishWorkerConnectionViaWindow=async(t,r)=>{if(e(this.iframeWindow,t)){const e=new MessageChannel,s=new MessageChannel;return this.identityDisconnectionController.registerProxiedConnection(s.port1),new Promise(((a,c)=>{e.port1.addEventListener("message",(t=>{t.data.topic===n(i)&&(t.data.success?a(e.port1):c(t.data.reason))})),e.port1.start();const d={topic:o,payload:{identity:r}};t.postMessage(d,location.origin,[e.port2,s.port2])}))}throw new Error("Could not connect via top level browsing context as its origin does not much the web interop broker.")},this.listenForNestedConnections=t=>{"top-window"===this.state&&e(this.iframeWindow,this.iframeWindow.parent)&&this.iframeWindow.parent.addEventListener("message",(async e=>{const{data:r}=e;if(e.origin===location.origin&&r.topic===o){const[o,...n]=e.ports;if(n.length>0&&r.payload?.identity){const[e]=n;await this.identityDisconnectionController.lockProxiedConnection(r.payload.identity,e)}const s={topic:i};t.postMessage(s,[o])}}))},this.initialize=async t=>{if("ready"!==this.state)throw new Error("Worker connection already initialized");return(e=>{const t=r=>!(!(e=>{try{return!e.origin}catch(e){return!0}})(r)&&r.origin===e.origin)||!d(r)&&t(r.parent);return!d(e)&&t(e.parent)})(this.iframeWindow)&&e(this.iframeWindow,this.iframeWindow.top)?this.state="partitioned-frame":d(this.iframeWindow.parent)?this.state="top-window":this.state="frame",this.connect(t)}}async connect(e){if("ready"===this.state)throw new Error("Must call initialize before connect");switch(this.state){case"partitioned-frame":return this.establishWorkerConnectionViaWindow(this.iframeWindow.top,e);case"top-window":{let t;return t=this.isSharedWorkerSupported()?new SharedWorker(this.workerUrl,c).port:new Worker(this.workerUrl),await this.identityDisconnectionController.lockSelf(e),this.listenForNestedConnections(t),t}case"frame":{if(!this.isSharedWorkerSupported())try{return await this.establishWorkerConnectionViaWindow(this.iframeWindow.top,e)}catch(e){throw new Error(`SharedWorker is not supported and an unexpected error occured when trying to connect via fallback mechanism: ${e.message}`,{cause:e})}await this.identityDisconnectionController.lockSelf(e);const{port:t}=new SharedWorker(this.workerUrl,c);return t}default:throw this.state,new Error(`Invalid state: ${this.state}`)}}}const p=a.getLogger("@openfin/core-web/iframe-broker"),g=()=>{const e=((e,t)=>{const r=new RegExp(`^${t}<(?<meta>.*)>$`).exec(e)?.groups?.meta;if(r)try{return JSON.parse(atob(r))}catch(e){throw new Error(`Failed to decode JSON from ${r}.`)}})(window.name,"of-broker");if(!e)throw new Error("Invalid or missing identity string in iframe context. Ensure that this iframe is being renderered via the @openfin/core-web library.");return e};function u(e){const r={topic:n(t),success:!1,reason:e?.reason??"Connection Rejected"};window.parent.postMessage(r,"*")}exports.init=async e=>{try{a.setGlobalLogLevel(e.logLevel??"error");const{sharedWorkerUrl:i}=e;await("loading"===document.readyState?new Promise((e=>{const t=()=>{e(),window.removeEventListener("DOMContentLoaded",t)};window.addEventListener("DOMContentLoaded",t)})):Promise.resolve());const o=g(),s=new w(i,window,"same-site"!==e.experimental?.crossTab),c=await s.initialize(o);p.info(`Loading ${i} in ${s.state} mode...`);const d=await(async(e,i,o)=>{const s=new MessageChannel,a=new MessageChannel,c={topic:r,payload:{identity:o}};await new Promise(((e,t)=>{i.addEventListener("message",(i=>{i.data.topic===n(r)&&(i.data.success?e():t(new Error(i.data.reason)))})),i.start?.(),i.postMessage(c,[a.port2])}));const d={topic:n(t),success:!0,payload:{identity:o}};return e.postMessage(d,"*",[s.port2,a.port1]),s.port1})(window.parent,c,o);d.start(),c.start?.(),p.debug(`Port transfer complete in ${s.state} mode. Connection established with identity ${JSON.stringify(o)}. SharedWorker support=${s.isSharedWorkerSupported()}`)}catch(e){const t=new Error(`An unexpected error occured during initialization. ${e.message}`);u({reason:t.message}),console.error(t)}},exports.rejectConnections=u;


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
        sharedWorkerUrl: settings.platform.interop.sharedWorkerUrl,
        logLevel: "info"
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