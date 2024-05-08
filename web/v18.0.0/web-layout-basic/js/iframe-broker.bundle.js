/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/@openfin/core-web/out/iframe-broker.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/@openfin/core-web/out/iframe-broker.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

const e="web-broker-ports-ready",t="worker-initialize-connection",r="create-fallback-connection",i="request-fallback-connection",o=e=>`ack-${e}`,n=(...e)=>({log:(...t)=>console.log(`[${(new Date).toISOString()}]`,...(e=>e.map((e=>`[${e}]`)))(e),...t),getLogger:(...t)=>n(...e,...t)});class s{static get lockApi(){return navigator.locks}constructor(e){this.name=e,this.releaseCallback=null,s.pending.add(this),this.lockAcquiredPromise=new Promise(((e,t)=>{this.lockReleasedPromise=s.lockApi.request(this.name,(()=>(s.pending.delete(this),e(),new Promise((e=>{s.held.add(this),this.releaseCallback=e}))))).catch((e=>{throw t(e),e}))}))}async acquired(){await this.lockAcquiredPromise}async release(){if(!this.releaseCallback)throw new Error(`Lock ${this.name} not acquired.`);this.releaseCallback(),this.releaseCallback=null,await this.lockReleasedPromise,s.held.delete(this)}async onReleased(e){if(!this.lockReleasedPromise)throw new Error(`Lock ${this.name} not queued.`);return this.lockReleasedPromise.then(e)}autoRelease(){this.acquired().then((()=>this.release()))}static async releaseAll(){const e=Promise.all([...this.pending].map((async e=>{await e.acquired(),await e.release()})));await Promise.all([...this.held].map((async e=>{await e.release()}))),await e}}s.pending=new Set,s.held=new Set;const a=e=>window.top===e,c=(e,t)=>{try{return e.origin===t.origin}catch(e){return!1}},d="openfin/web-shared-worker";class h{constructor(e,t,n){this.workerUrl=e,this.iframeWindow=t,this.forceWorker=n,this.isSharedWorkerSupported=()=>!this.forceWorker&&!!window.SharedWorker,this.state="ready",this.establishWorkerConnectionViaWindow=async e=>{if(c(this.iframeWindow,e)){const t=new MessageChannel;return new Promise(((n,s)=>{t.port1.addEventListener("message",(e=>{e.data.topic===o(r)&&(e.data.success?n(t.port1):s(e.data.reason))})),t.port1.start();const a={topic:i};e.postMessage(a,location.origin,[t.port2])}))}throw new Error("Could not connect via top level browsing context as its origin does not much the web interop broker.")},this.listenForNestedConnections=e=>{"top-window"===this.state&&c(this.iframeWindow,this.iframeWindow.parent)&&this.iframeWindow.parent.addEventListener("message",(t=>{if(t.origin===location.origin&&t.data.topic===i){const[i]=t.ports,o={topic:r};e.postMessage(o,[i])}}))},this.initialize=async()=>{if("ready"!==this.state)throw new Error("Worker connection already initialized");if((e=>{const t=r=>!(!(e=>{try{return!e.origin}catch(e){return!0}})(r)&&r.origin===e.origin)||!a(r)&&t(r.parent);return!a(e)&&t(e.parent)})(this.iframeWindow)&&c(this.iframeWindow,this.iframeWindow.top))return this.state="partitioned-frame",this.establishWorkerConnectionViaWindow(this.iframeWindow.top);if(a(this.iframeWindow.parent)){let e;return this.state="top-window",e=this.isSharedWorkerSupported()?new SharedWorker(this.workerUrl,d).port:new Worker(this.workerUrl),this.listenForNestedConnections(e),e}{if(this.state="frame",!this.isSharedWorkerSupported())try{return await this.establishWorkerConnectionViaWindow(this.iframeWindow.top)}catch(e){throw new Error(`SharedWorker is not supported and an unexpected error occured when trying to connect via fallback mechanism: ${e.message}`)}const{port:e}=new SharedWorker(this.workerUrl,d);return e}}}}const l=n("@openfin/core-web/iframe-broker"),w=()=>{const e=((e,t)=>{const r=new RegExp(`^${t}<(?<meta>.*)>$`).exec(e)?.groups?.meta;if(r)try{return JSON.parse(atob(r))}catch(e){throw new Error(`Failed to decode JSON from ${r}.`)}})(window.name,"of-broker");if(!e)throw new Error("Invalid or missing identity string in iframe context. Ensure that this iframe is being renderered via the @openfin/core-web library.");return e};function p(t){const r={topic:o(e),success:!1,reason:t?.reason??"Connection Rejected"};window.parent.postMessage(r,"*")}exports.init=async r=>{try{const{sharedWorkerUrl:i}=r;await("loading"===document.readyState?new Promise((e=>{const t=()=>{e(),window.removeEventListener("DOMContentLoaded",t)};window.addEventListener("DOMContentLoaded",t)})):Promise.resolve());const n=w(),a=new h(i,window,"same-site"!==r.experimental?.crossTab),c=await a.initialize();l.log(`Loading ${i} in ${a.state} mode...`);const d=await(async(r,i,n)=>{const a=new MessageChannel,c=new MessageChannel,d={topic:t,payload:{identity:n}},h=new s((e=>`__OPENFIN__${e.uuid}_${e.name}`)(n));await h.acquired(),await new Promise(((e,r)=>{i.addEventListener("message",(i=>{i.data.topic===o(t)&&(i.data.success?e():r(new Error(i.data.reason)))})),i.start?.(),i.postMessage(d,[c.port2])}));const l={topic:o(e),success:!0,payload:{identity:n}};return r.postMessage(l,"*",[a.port2,c.port1]),a.port1})(window.parent,c,n);d.start(),c.start?.(),l.log(`Port transfer complete in ${a.state} mode. Connection established with identity ${JSON.stringify(n)}. SharedWorker support=${a.isSharedWorkerSupported()}`)}catch(e){const t=new Error(`An unexpected error occured during initialization. ${e.message}`);p({reason:t.message}),console.error(t)}},exports.rejectConnections=p;


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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************************************!*\
  !*** ./client/src/platform/iframe-broker.ts ***!
  \**********************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const iframe_broker_1 = __webpack_require__(/*! @openfin/core-web/iframe-broker */ "../../node_modules/@openfin/core-web/out/iframe-broker.js");
/**
 * Initializes the OpenFin Web Broker connection.
 * @returns A promise that resolves when the connection is established.
 */
async function init() {
    return (0, iframe_broker_1.init)({
        sharedWorkerUrl: "https://built-on-openfin.github.io/web-starter/web/v18.0.0/web-layout-basic/js/shared-worker.bundle.js"
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