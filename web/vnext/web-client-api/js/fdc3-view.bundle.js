(()=>{"use strict";(()=>{function t(t){const n=document.querySelector("#contextType"),e=document.querySelector("#contextName"),o=document.querySelector("#contextBody");null!==n&&null!==e&&null!==o&&(n.textContent=t.type,e.textContent=t.name??"No name provided.",o.textContent=JSON.stringify(t,null,2))}window.addEventListener("DOMContentLoaded",(async()=>{await async function(){const n=document.querySelector("#broadcast");null!==n&&n.addEventListener("click",(async()=>{await async function(){const t="fdc3.instrument",n="Apple",e={type:t,name:n,id:{ticker:"AAPL"}};window.fdc3?(await window.fdc3.broadcast(e),console.log(`Broadcasted context: ${t} - ${n}`)):window.addEventListener("fdc3Ready",(async()=>{await window.fdc3.broadcast(e),console.log(`Broadcasted context: ${t} - ${n}`)}))}()})),await async function(){window.fdc3?await window.fdc3.addContextListener(null,(n=>{t(n)})):window.addEventListener("fdc3Ready",(async()=>{await window.fdc3.addContextListener(null,(n=>{t(n)}))}))}()}()}))})()})();
//# sourceMappingURL=fdc3-view.bundle.js.map