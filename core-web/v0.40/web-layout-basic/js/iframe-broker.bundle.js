/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/@openfin/core-web/out/iframe-broker.cjs.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/@openfin/core-web/out/iframe-broker.cjs.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

const e="web-broker-ports-ready",t="worker-initialize-connection",r="create-fallback-connection",i="request-fallback-connection",o=e=>`ack-${e}`,n=new Map([["debug",0],["info",1],["warn",2],["error",3],["none",4]]);class s{static setGlobalLogLevel(e){s.LOG_LEVEL=e??"error"}constructor(...e){this.scopes=e}log(e,...t){const r=n.get(e)??3;var i;(n.get(s.LOG_LEVEL)??3)<=r&&console.log(`[${(new Date).toISOString()}]`,...(i=this.scopes,i.map((e=>`[${e}]`))),...t)}warn(...e){this.log("warn",...e)}error(...e){this.log("error",...e)}info(...e){this.log("info",...e)}debug(...e){this.log("debug",...e)}static getLogger(...e){return new s(...e)}getLogger(...e){return new s(...this.scopes,...e)}}s.LOG_LEVEL="error",s.getLogger("@openfin/core-web/client");const a=e=>window.top===e,c=(e,t)=>{try{return e.origin===t.origin}catch(e){return!1}},d="openfin/web-shared-worker";class l{static get lockApi(){return navigator.locks}constructor(e){this.name=e,this.releaseCallback=null,l.pending.add(this),this.lockAcquiredPromise=new Promise(((e,t)=>{this.lockReleasedPromise=l.lockApi.request(this.name,(()=>(l.pending.delete(this),e(),new Promise((e=>{l.held.add(this),this.releaseCallback=e}))))).catch((e=>{throw t(e),e}))}))}async acquired(){await this.lockAcquiredPromise}async release(){if(!this.releaseCallback)throw new Error(`Lock ${this.name} not acquired.`);this.releaseCallback(),this.releaseCallback=null,await this.lockReleasedPromise,l.held.delete(this)}async onReleased(e){if(!this.lockReleasedPromise)throw new Error(`Lock ${this.name} not queued.`);return this.lockReleasedPromise.then(e)}autoRelease(){this.acquired().then((()=>this.release()))}static async releaseAll(){const e=Promise.all([...this.pending].map((async e=>{await e.acquired(),await e.release()})));await Promise.all([...this.held].map((async e=>{await e.release()}))),await e}}l.pending=new Set,l.held=new Set;class h{constructor(e=100,t=2){this.pingIntervalMs=e,this.allowedMissedPings=t,this.lockSelf=async e=>{const t=new l((e=>`__OPENFIN__${e.uuid}_${e.name}`)(e));return await t.acquired(),t}}async lockProxiedConnection(e,t){let r=0;t.addEventListener("message",(e=>{"pong"===e.data.topic&&r--}));const i=await this.lockSelf(e);let o=setInterval((()=>{r>=this.allowedMissedPings?(i.release(),clearInterval(o)):(r++,t.postMessage({topic:"ping"}))}),this.pingIntervalMs);t.start()}registerProxiedConnection(e){e.addEventListener("message",(t=>{"ping"===t.data.topic&&e.postMessage({topic:"pong"})})),e.start()}}class w{constructor(e,t,n){this.workerUrl=e,this.iframeWindow=t,this.forceWorker=n,this.identityDisconnectionController=new h,this.isSharedWorkerSupported=()=>!this.forceWorker&&!!window.SharedWorker,this.state="ready",this.establishWorkerConnectionViaWindow=async(e,t)=>{if(c(this.iframeWindow,e)){const n=new MessageChannel,s=new MessageChannel;return this.identityDisconnectionController.registerProxiedConnection(s.port1),new Promise(((a,c)=>{n.port1.addEventListener("message",(e=>{e.data.topic===o(r)&&(e.data.success?a(n.port1):c(e.data.reason))})),n.port1.start();const d={topic:i,payload:{identity:t}};e.postMessage(d,location.origin,[n.port2,s.port2])}))}throw new Error("Could not connect via top level browsing context as its origin does not much the web interop broker.")},this.listenForNestedConnections=e=>{"top-window"===this.state&&c(this.iframeWindow,this.iframeWindow.parent)&&this.iframeWindow.parent.addEventListener("message",(async t=>{const{data:o}=t;if(t.origin===location.origin&&o.topic===i){const[i,...n]=t.ports;if(n.length>0&&o.payload?.identity){const[e]=n;await this.identityDisconnectionController.lockProxiedConnection(o.payload.identity,e)}const s={topic:r};e.postMessage(s,[i])}}))},this.initialize=async e=>{if("ready"!==this.state)throw new Error("Worker connection already initialized");return(e=>{const t=r=>!(!(e=>{try{return!e.origin}catch(e){return!0}})(r)&&r.origin===e.origin)||!a(r)&&t(r.parent);return!a(e)&&t(e.parent)})(this.iframeWindow)&&c(this.iframeWindow,this.iframeWindow.top)?this.state="partitioned-frame":a(this.iframeWindow.parent)?this.state="top-window":this.state="frame",this.connect(e)}}async connect(e){if("ready"===this.state)throw new Error("Must call initialize before connect");switch(this.state){case"partitioned-frame":return this.establishWorkerConnectionViaWindow(this.iframeWindow.top,e);case"top-window":{let t;return t=this.isSharedWorkerSupported()?new SharedWorker(this.workerUrl,d).port:new Worker(this.workerUrl),await this.identityDisconnectionController.lockSelf(e),this.listenForNestedConnections(t),t}case"frame":{if(!this.isSharedWorkerSupported())try{return await this.establishWorkerConnectionViaWindow(this.iframeWindow.top,e)}catch(e){throw new Error(`SharedWorker is not supported and an unexpected error occured when trying to connect via fallback mechanism: ${e.message}`,{cause:e})}await this.identityDisconnectionController.lockSelf(e);const{port:t}=new SharedWorker(this.workerUrl,d);return t}default:throw this.state,new Error(`Invalid state: ${this.state}`)}}}const p=s.getLogger("@openfin/core-web/iframe-broker"),g=()=>{const e=((e,t)=>{const r=new RegExp(`^${t}<(?<meta>.*)>$`).exec(e)?.groups?.meta;if(r)try{return JSON.parse(atob(r))}catch(e){throw new Error(`Failed to decode JSON from ${r}.`)}})(window.name,"of-broker");if(!e)throw new Error("Invalid or missing identity string in iframe context. Ensure that this iframe is being renderered via the @openfin/core-web library.");return e};function u(t){const r={topic:o(e),success:!1,reason:t?.reason??"Connection Rejected"};window.parent.postMessage(r,"*")}exports.init=async r=>{try{s.setGlobalLogLevel(r.logLevel??"error");const{sharedWorkerUrl:i}=r;await("loading"===document.readyState?new Promise((e=>{const t=()=>{e(),window.removeEventListener("DOMContentLoaded",t)};window.addEventListener("DOMContentLoaded",t)})):Promise.resolve());const n=g(),a=new w(i,window,"same-site"!==r.experimental?.crossTab),c=await a.initialize(n);p.info(`Loading ${i} in ${a.state} mode...`);const d=await(async(r,i,n)=>{const s=new MessageChannel,a=new MessageChannel,c={topic:t,payload:{identity:n}};await new Promise(((e,r)=>{i.addEventListener("message",(i=>{i.data.topic===o(t)&&(i.data.success?e():r(new Error(i.data.reason)))})),i.start?.(),i.postMessage(c,[a.port2])}));const d={topic:o(e),success:!0,payload:{identity:n}};return r.postMessage(d,"*",[s.port2,a.port1]),s.port1})(window.parent,c,n);d.start(),c.start?.(),p.debug(`Port transfer complete in ${a.state} mode. Connection established with identity ${JSON.stringify(n)}. SharedWorker support=${a.isSharedWorkerSupported()}`)}catch(e){const t=new Error(`An unexpected error occured during initialization. ${e.message}`);u({reason:t.message}),console.error(t)}},exports.rejectConnections=u;


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
const iframe_broker_1 = __webpack_require__(/*! @openfin/core-web/iframe-broker */ "../../node_modules/@openfin/core-web/out/iframe-broker.cjs.js");
/**
 * Initializes the OpenFin Web Broker connection.
 * @returns A promise that resolves when the connection is established.
 */
async function init() {
    return (0, iframe_broker_1.init)({
        sharedWorkerUrl: "https://built-on-openfin.github.io/web-starter/core-web/v0.40/web-layout-basic/js/shared-worker.bundle.js"
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