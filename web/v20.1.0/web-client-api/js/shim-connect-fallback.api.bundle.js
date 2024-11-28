(()=>{"use strict";var e={554:(e,t)=>{async function o(e,t){try{console.log("Attempting to get the API with the following options:",t),await e.getAPI(t),console.log("OpenFin API shim applied")}catch(e){console.error("Failed to load the OpenFin API shim. Please note this is an example and you should implement your own approach for production.",e)}}Object.defineProperty(t,"__esModule",{value:!0}),t.init=async function(e){if(void 0===window.fin){console.log("Fin is not available. Importing the OpenFin API shim.");const t="https://built-on-openfin.github.io/web-starter/web/v20.0.0/web-client-api/js/web.client.api.bundle.js",n=await import(t);console.log("OpenFin API shim script imported."),console.log("Checking to see if the document is ready before requesting the API."),"loading"===document.readyState?(console.log("Document is still loading. Waiting for it to be ready using DOMContentLoaded."),document.addEventListener("DOMContentLoaded",(async()=>{await o(n,e)}))):(console.log("Document is available. Requesting API."),await o(n,e))}}}},t={};function o(n){var i=t[n];if(void 0!==i)return i.exports;var a=t[n]={exports:{}};return e[n](a,a.exports,o),a.exports}(()=>{const e=o(554);(async()=>{await(0,e.init)({target:window,requestConnectOptions:{strategy:"request-on-failure"}})})()})()})();
//# sourceMappingURL=shim-connect-fallback.api.bundle.js.map