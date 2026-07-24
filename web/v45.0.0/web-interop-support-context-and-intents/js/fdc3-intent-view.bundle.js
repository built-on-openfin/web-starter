/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/@openfin/core-web/out/api-client.cjs.js"
/*!******************************************************************!*\
  !*** ../../node_modules/@openfin/core-web/out/api-client.cjs.js ***!
  \******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var e=__webpack_require__(/*! ./main-0c3a88c6.js */ "../../node_modules/@openfin/core-web/out/main-0c3a88c6.js");__webpack_require__(/*! uuid */ "../../node_modules/uuid/dist/cjs-browser/index.js"),__webpack_require__(/*! events */ "../../node_modules/events/events.js"),__webpack_require__(/*! es-toolkit */ "../../node_modules/es-toolkit/dist/index.js"),exports.connect=e.connect;


/***/ },

/***/ "../../node_modules/@openfin/core-web/out/main-0896ef54.js"
/*!*****************************************************************!*\
  !*** ../../node_modules/@openfin/core-web/out/main-0896ef54.js ***!
  \*****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var t=__webpack_require__(/*! ./main-0c3a88c6.js */ "../../node_modules/@openfin/core-web/out/main-0c3a88c6.js"),e=__webpack_require__(/*! events */ "../../node_modules/events/events.js"),i=__webpack_require__(/*! he */ "../../node_modules/he/he.js"),n=__webpack_require__(/*! uuid */ "../../node_modules/uuid/dist/cjs-browser/index.js");function o(t){var e=Object.create(null);return t&&Object.keys(t).forEach(function(i){if("default"!==i){var n=Object.getOwnPropertyDescriptor(t,i);Object.defineProperty(e,i,n.get?n:{enumerable:!0,get:function(){return t[i]}})}}),e.default=t,Object.freeze(e)}__webpack_require__(/*! es-toolkit */ "../../node_modules/es-toolkit/dist/index.js");var s=o(i);const r=Symbol("exposedProperties"),a=t=>(e,i,n)=>{e[r]=e[r]||[],e[r].push({key:i,descriptor:n,options:t})};class l{constructor(t){this.strategy=t,this.exposeInstance=async(t,e)=>{const i=(n=t,n?.[r]||n?.prototype?.[r]||[]);var n;const o=await Promise.all(i.map(async({key:i,options:n})=>({key:i,options:await this.strategy.exposeFunction(t[i].bind(t),{key:i,options:n,meta:e})})));await this.strategy.exposeMeta(e,o)}}}class h{constructor(t){this.channelProviderOrClient=t,this.exposeFunction=async(t,e)=>{const{key:i,options:n,meta:o}=e,{id:s}=o,r=`${s}.${n?.action||i}`;return await this.channelProviderOrClient.register(r,async({args:e})=>t(...e)),{action:r}},this.exposeMeta=async({id:t},e)=>{const i=`api-meta:${t}`;await this.channelProviderOrClient.register(i,()=>({props:e}))}}}const d=(t,[e,i])=>({...t,[e]:i});async function c(t,e){let i;return i=e instanceof Map?[...e.entries()]:Object.entries(e),async function(t,e){return(await Promise.all(e.map(async([e,i])=>[e,await t(i,e)]))).reduce(d,{})}(t,i)}function u(t,e,i){if("openfin"===t.environment.type){const{uuid:n,name:o}=t.environment.getCurrentEntityIdentity(),s=`window/${e}/${n}-${o}`,r={layoutIdentity:{layoutName:i,uuid:n,name:o},topic:"window"};t.environment.raiseEvent(s,r)}}function m(t,e){return(t=>"type"in t&&"component"===t.type)(e)?t(e):{...e,content:e.content?.map(e=>m(t,e))}}class p extends Error{constructor(t){super(`Layout snapshot for ${t} could not be generated, layout ${t} is not ready or may be destroyed`),this.type=p.type}static isLayoutNotReadyError(t){return"object"==typeof t&&"type"in t&&t.type===p.type}}p.type="LayoutSnapshotError";var f,g,v,y,_=function(t,e,i,n,o){if("m"===n)throw new TypeError("Private method is not writable");if("a"===n&&!o)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!o:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===n?o.call(t,i):o?o.value=i:e.set(t,i),i},w=function(t,e,i,n){if("a"===i&&!n)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!n:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===i?n:"a"===i?n.call(t):n?n.value:e.get(t)};class C{constructor(t){g.set(this,void 0),v.set(this,new Map),_(this,g,t,"f")}size(){return w(this,v,"f").size}async applyLayoutSnapshot({layouts:t}){if(Object.keys(t).length>1)throw new Error("[LayoutManager] Tried to call applyLayoutSnapshot with more than 1 layout. When implementing multiple layouts via overridden LayoutManager class, you must override and fully implement the applyLayoutSnapshot method without calling super.applyLayoutSnapshot().");const[[e,i]]=Object.entries(t);await C.createLayout(this,{layoutName:e,layout:i}),u(w(this,g,"f").getWire(),"layout-snapshot-applied",e)}async showLayout({layoutName:t}){}async getLayoutSnapshot(){return{layouts:(await Promise.all(Array.from(w(this,v,"f").entries()).map(async([t,e])=>{try{return{layoutName:t,snapshot:await e.getFrameSnapshot()}}catch(e){if(p.isLayoutNotReadyError(e))return void console.info(`Layout ${t} ommited from snapshot`,e.message);throw e}}))).reduce((t,e)=>e?{...t,[e.layoutName]:e.snapshot}:t,{})}}async removeLayout({layoutName:t}){}getLayoutIdentityForView(t){const e=[...w(this,v,"f").values()].find(e=>e.getCurrentViews().some(e=>e.name===t.name&&e.uuid===t.uuid));return e?.identity??void 0}isLayoutVisible({layoutName:t}){return w(C,f,"m",y).call(C,this,t).isVisible()}resolveLayoutIdentity(t){if(t&&"layoutName"in t)return t;const e=[...w(this,v,"f").values()];if(1===e.length)return e[0].identity;const i=e.find(t=>t.isVisible());return i?.identity??void 0}static async resolveLayout(t,e){const i=t.resolveLayoutIdentity(e);if(void 0===i||!("layoutName"in i))throw new Error("[layout-manager] resolveLayout: Could not resolve the layout identity. Make sure you include 'layoutName' in the identity object.");return w(C,f,"m",y).call(C,t,i.layoutName)}static async handleSharedView(t,e,i){await c(async t=>{if(t.identity.layoutName!==e.layoutName){const e=t.getCurrentViews().find(t=>t.name===i.name);e&&await t.onViewDetached({viewIdentity:e,target:null}).catch(console.error)}},w(t,v,"f"))}static async handleLastViewRemoved(t,e){await t.removeLayout(e),await w(t,g,"f").handleLastViewRemoved(t)}static async destroyLayout(t,{layoutName:e}){await w(C,f,"m",y).call(C,t,e).destroy(),w(t,v,"f").delete(e),u(w(t,g,"f").getWire(),"layout-destroyed",e)}static async createLayout(t,e){const{layoutName:i}=e;if(w(t,v,"f").has(i))throw new Error(`Layout name ${i} already exists`);const n=await w(t,g,"f").createLayout(e,t);return u(w(t,g,"f").getWire(),"layout-created",i),n}static registerLayout(t,e,i){w(t,v,"f").set(e,i)}static getAllLayouts(t){return[...w(t,v,"f").values()]}static setInitialSnapshot(t,e){w(t,g,"f").setInitialSnapshot(e)}static createClosedConstructor(...t){return class extends C{constructor(){super(...t)}}}}f=C,g=new WeakMap,v=new WeakMap,y=function(t,e){const i=w(t,v,"f").get(e);if(!i)throw new Error(`[layout-manager] getLayoutByName: Could not locate layout with name '${e}'`);return i};class b{constructor(){this.valueToKey=new Map,this.keyToValue=new Map,this.setUnique=(t,e)=>{if(this.hasKey(t)||this.hasValue(e))throw new Error("Key or value already in the map.");this.keyToValue.set(t,e),this.valueToKey.set(e,t)},this.getKey=t=>{const e=this.valueToKey.get(t);if(!e)throw new Error("Value not found in the map.");return e},this.deleteKey=t=>{const e=this.getValue(t);return this.keyToValue.delete(t),this.valueToKey.delete(e),e},this.deleteValue=t=>{const e=this.getKey(t);return this.keyToValue.delete(e),this.valueToKey.delete(t),e},this.hasKey=t=>this.keyToValue.has(t),this.hasValue=t=>this.valueToKey.has(t)}getValue(t){const e=this.keyToValue.get(t);if(!e)throw new Error("Key not found in the map.");return e}}class I{constructor(){this.contentItemCache=new b,this.contentItemCacheId=0,this.createCacheKey=()=>{const t=`entity-${this.contentItemCacheId.toString()}`;return this.contentItemCacheId+=1,t},this.hasKey=t=>this.contentItemCache.hasKey(t),this.getItemOrUndefined=t=>{try{return this.getContentItemOrThrow(t)}catch(t){return}},this.getContentItemOrThrow=(t,e)=>{if(!this.contentItemCache.hasKey(t))throw new Error("Layout component has been destroyed or detached from the current layout.");const i=this.contentItemCache.getValue(t);if(e&&!e.includes(i.type))throw new Error(`Layout item is not the expected type. Expected ${e.join(", ")}, got ${i.type}.`);return i},this.getOrCreateEntityId=t=>{if(this.contentItemCache.hasValue(t))return this.contentItemCache.getKey(t);t.onDestroyed(()=>{this.contentItemCache.deleteValue(t)});const e=this.createCacheKey();return this.contentItemCache.setUnique(e,t),e}}static getSingleInstance(){return I.singleton.getValue()}}I.singleton=new t.Lazy(()=>new I);const E=(t,e)=>{const{parent:i}=t;if(t.isRoot()||!i)return;const n=["top","bottom"].includes(e)?"column":"row",o=["top","left"].includes(e)?-1:1;if(i.type===n){const e=i.contentItems.indexOf(t)+o;if(e>=0&&e<i.contentItems.length)return i.contentItems[e]}return E(i,e)};var S,T,x=function(t,e,i,n){var o,s=arguments.length,r=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(s<3?o(r):s>3?o(e,i,r):o(e,i))||r);return s>3&&r&&Object.defineProperty(e,i,r),r};class A{constructor(t,e,i){this.wire=t,this.layoutManager=e,this.layoutContentCache=i,this.analytics=t=>{this.wire.sendAction(`layout-controller-${t}`).catch(()=>{})},this.getLayoutIdentityForViewOrThrow=async t=>{const e=this.layoutManager.getLayoutIdentityForView(t);if(!e)throw new Error(`View identity ${t.name} is not attached to any layouts.`);return e},this.getRoot=async t=>{this.analytics("get-root");const e=(await this.getLayout(t)).getRoot();return{type:e.type,entityId:this.layoutContentCache.getOrCreateEntityId(e)}},this.getStackByView=async t=>{this.analytics("get-stack-by-view");const e=await this.getLayoutIdentityForViewOrThrow(t),i=(await this.getLayout(e)).getStackByView(t);if("stack"===i?.type)return{entityId:this.layoutContentCache.getOrCreateEntityId(i),type:"stack"}},this.getStackViews=t=>{this.analytics("get-stack-views");return this.layoutContentCache.getContentItemOrThrow(t,["stack"]).contentItems.map(t=>({name:t.viewName,uuid:this.wire.me.uuid}))},this.isRoot=t=>{this.analytics("is-root");return this.layoutContentCache.getContentItemOrThrow(t).isRoot()},this.exists=t=>(this.analytics("exists"),this.layoutContentCache.hasKey(t)),this.addViewToStack=async(t,e,{index:i,displayState:n}={index:0,displayState:"focused"})=>{this.analytics("add-view-to-stack");const o=this.layoutContentCache.getContentItemOrThrow(t);if(i&&i>o.contentItems.length+1)throw new Error(`Index '${i}' out of range, please exclude the index or specify a number between 0 and ${o.contentItems.length}`);const s={id:t,index:i,displayState:n},{identity:r}=await o.layout.platformCreateView(e,{location:s});return r},this.findViewInStack=(t,e)=>t.contentItems.find(t=>t.viewName===e.name),this.removeViewFromStack=async(t,e)=>{this.analytics("remove-view-from-stack");const i=this.layoutContentCache.getContentItemOrThrow(t,["stack"]),n=this.findViewInStack(i,e);if(!n)throw new Error(`Tried to remove a view ('${e.name}') which does not belong to the stack.`);await n.layout.platformCloseView(e)},this.createAdjacentStack=async(t,e,{position:i="right"}={})=>{if(this.analytics("create-adjacent-stack"),!Array.isArray(e)||0===e.length)throw new Error('The parameter "views" must be an array with at least 1 element.');if(!["top","bottom","left","right"].includes(i))throw new Error(`Invalid position '${i}' specified.`);const n=this.layoutContentCache.getContentItemOrThrow(t).createAdjacentStack({position:i}),o=this.layoutContentCache.getOrCreateEntityId(n);return await Promise.all(e.reverse().map(t=>this.addViewToStack(o,t))),o},this.getAdjacentStacks=async({targetId:t,edge:e})=>{this.analytics("get-adjacent-stacks");return((t,e)=>{const i=["top","bottom"].includes(e)?"row":"column",n=o=>"stack"===o.type?((t,e,i)=>{const n=t.getBounds(),o=e.getBounds();return!(!n||!o)&&(["top","bottom"].includes(i)?!(n.right<o.left||n.left>o.right):!(n.bottom<o.top||n.top>o.bottom))})(t,o,e)?[o]:[]:"root"===o.type||"ground"===o.type?[]:o.type===i?o.contentItems.map(t=>n(t)).flat():o.type!==i?["top","right"].includes(e)?n(o.contentItems[o.contentItems.length-1]):n(o.contentItems[0]):[],o=E(t,e);return o?n(o):[]})(this.layoutContentCache.getContentItemOrThrow(t),e).map(t=>({entityId:this.layoutContentCache.getOrCreateEntityId(t)}))},this.setStackActiveView=async(t,e)=>{this.analytics("set-stack-active-view");const i=this.layoutContentCache.getContentItemOrThrow(t,["stack"]),n=this.findViewInStack(i,e);if(!n)throw new Error(`Tried to set a view ('${e.name}') as active when it does not belong to the stack.`);i.setActiveContentItem(n,!0)}}async getLayout(t){const e=await C.resolveLayout(this.layoutManager,t);if(!e)throw new Error(`Could not resolve target layout identity ${JSON.stringify(t)}`);return e}getContent(t){this.analytics("get-content");return this.layoutContentCache.getContentItemOrThrow(t,["column","row"]).contentItems.map(t=>({type:t.type,entityId:this.layoutContentCache.getOrCreateEntityId(t)}))}getParent(t){this.analytics("get-parent");const e=this.layoutContentCache.getContentItemOrThrow(t);if(!e.isRoot())return e.parent?.contentItems.includes(e)?{type:e.parent.type,entityId:this.layoutContentCache.getOrCreateEntityId(e.parent)}:void 0}}async function L(e,i){const n=e.getFin(),o=await n.Platform.getCurrentSync().getClient(),s=new h(o);await new l(s).exposeInstance(new A(e,i,I.getSingleInstance()),{id:t.LAYOUT_CONTROLLER_ID}),await async function(t,e){const i=t=>async i=>{const n=await C.resolveLayout(e,i.target);if(!n)throw new Error(`Could not resolve the layout target from payload ${JSON.stringify(i)}`);return t(n,i)},n=(e,n)=>{t.register(e,i(n))},o=(t,e)=>{n(t,e)};n("replace-view",(t,e)=>t.replaceView(e)),n("replace-layout",(t,{layout:e})=>t.replaceLayout(e)),n("add-view",(t,e)=>t.insertView(e)),o("layout-add-view",(t,{viewOptions:e,location:i,targetView:n})=>t.platformCreateView(e,{location:i,targetView:n})),n("close-view",(t,e)=>t.cleanupView(e.viewIdentity)),o("layout-close-view",(t,e)=>t.platformCloseView(e.viewIdentity)),n("apply-preset-layout",(t,e)=>t.applyPreset(e)),n("get-layout-views",t=>t.getCurrentViews()),n("get-frame-snapshot",t=>t.getFrameSnapshot()),n("is-visible",t=>t.isVisible()),n("destroy",t=>t.destroy()),t.register("get-layout-snapshot",()=>e.getLayoutSnapshot())}(o,i)}x([a()],A.prototype,"getLayoutIdentityForViewOrThrow",void 0),x([a()],A.prototype,"getRoot",void 0),x([a()],A.prototype,"getStackByView",void 0),x([a()],A.prototype,"getStackViews",void 0),x([a()],A.prototype,"getContent",null),x([a()],A.prototype,"getParent",null),x([a()],A.prototype,"isRoot",void 0),x([a()],A.prototype,"exists",void 0),x([a()],A.prototype,"addViewToStack",void 0),x([a()],A.prototype,"removeViewFromStack",void 0),x([a()],A.prototype,"createAdjacentStack",void 0),x([a()],A.prototype,"getAdjacentStacks",void 0),x([a()],A.prototype,"setStackActiveView",void 0);class z{constructor(t){this.container=t,S.set(this,new Map)}get element(){return this.container}register(e,i){t.__classPrivateFieldGet(this,S,"f").set(e,i)}unregister(e){t.__classPrivateFieldGet(this,S,"f").delete(e)}get(e){return t.__classPrivateFieldGet(this,S,"f").get(e)}has(e){return t.__classPrivateFieldGet(this,S,"f").has(e)}destroy(){t.__classPrivateFieldGet(this,S,"f").forEach(t=>t.destroy()),t.__classPrivateFieldGet(this,S,"f").clear()}}S=new WeakMap;class M{}class k{constructor(t){this.container=t}dispatchLocalEvent(t,e){const i={...e,type:t,tabSelector:`tab-${e.name}`,containerSelector:`container-${e.name}`,topic:"openfin-DOM-event"};this.container.dispatchEvent(new CustomEvent(t,{detail:i}))}}class P extends Error{constructor(t,e){super(e),this.type=t}}class D extends P{constructor(t,e){super("Configuration",t),this.node=e}}class O extends P{constructor(t){super("PopoutBlocked",t)}}class R extends P{constructor(t){super("API",t)}}class B extends P{constructor(t){super("Bind",t)}}class V extends Error{constructor(t,e,i){super(`${t}: ${e}${void 0===i?"":": "+i}`)}}class F extends V{constructor(t,e){super("Assert",t,e)}}class U extends V{constructor(t,e,i){super("UnreachableCase",t,`${e}${void 0===i?"":": "+i}`)}}class H extends V{constructor(t,e){super("UnexpectedNull",t,e)}}class W extends V{constructor(t,e){super("UnexpectedUndefined",t,e)}}!function(t){let e=!1;const i={PopoutCannotBeCreatedWithGroundItemConfig:{id:0,default:"Popout cannot be created with ground ItemConfig"},PleaseRegisterAConstructorFunction:{id:1,default:"Please register a constructor function"},ComponentTypeNotRegisteredAndBindComponentEventHandlerNotAssigned:{id:2,default:"Component type not registered and BindComponentEvent handler not assigned"},ComponentIsAlreadyRegistered:{id:3,default:"Component is already registered"},ComponentIsNotVirtuable:{id:4,default:"Component is not virtuable. Requires rootHtmlElement field/getter"},VirtualComponentDoesNotHaveRootHtmlElement:{id:5,default:'Virtual component does not have getter "rootHtmlElement"'},ItemConfigIsNotTypeComponent:{id:6,default:"ItemConfig is not of type component"},InvalidNumberPartInSizeString:{id:7,default:"Invalid number part in size string"},UnknownUnitInSizeString:{id:8,default:"Unknown unit in size string"},UnsupportedUnitInSizeString:{id:9,default:"Unsupported unit in size string"}};t.idCount=Object.keys(i).length;const n=Object.values(i);t.checkInitialise=function(){if(!e)for(let e=0;e<t.idCount;e++){const t=n[e];if(t.id!==e)throw new F("INSI00110",`${e}: ${t.id}`);N[e]=t.default}e=!0}}(T||(T={}));const N=new Array(T.idCount);var q,G,$,j;!function(t){t.defaultComponentBaseZIndex="auto",t.defaultComponentDragZIndex="32",t.defaultComponentStackMaximisedZIndex="41"}(q||(q={})),function(t){t.width="width",t.height="height"}(G||(G={})),function(t){t.top="top",t.left="left",t.right="right",t.bottom="bottom"}($||($={})),function(t){t.base="base",t.drag="drag",t.stackMaximised="stackMaximised"}(j||(j={}));const Z={base:q.defaultComponentBaseZIndex,drag:q.defaultComponentDragZIndex,stackMaximised:q.defaultComponentStackMaximisedZIndex};var K,X,Y,J,Q,tt,et,it,nt,ot,st,rt,at,lt,ht,dt,ct,ut,mt,pt,ft,gt;function vt(t){return t.toString(10)+"px"}function yt(t){const e=t.replace("px","");return parseFloat(e)}function _t(t){return t>="0"&&t<="9"}function wt(t,e){const i=vt(e);t.style.width=i}function Ct(t,e){const i=vt(e);t.style.height=i}function bt(t){return{width:t.offsetWidth,height:t.offsetHeight}}function It(t,e){t.style.display=e?"":"none"}function Et(t,e){if(void 0!==e)for(const i in e)if(e.hasOwnProperty(i)){const n=e[i],o=t[i];t[i]=St(o,n)}return t}function St(t,e){if("object"!=typeof e)return e;if(Array.isArray(e)){const t=e.length,i=new Array(t);for(let n=0;n<t;n++){const t=e[n];i[n]=St({},t)}return i}if(null===e)return null;{const i=e;if(void 0===t)return Et({},i);if("object"!=typeof t)return Et({},i);if(Array.isArray(t))return Et({},i);if(null===t)return Et({},i);return Et(t,i)}}function Tt(){return(1e15*Math.random()).toString(36).replace(".","")}function xt(t,e){const{numericPart:i,firstNonNumericCharPart:n}=function(t){const e=(t=t.trimStart()).length;if(0===e)return{numericPart:"",firstNonNumericCharPart:""};{let i=e,n=!1;for(let o=0;o<e;o++){const e=t[o];if(!_t(e)){if("."!==e){i=o;break}if(n){i=o;break}n=!0}}return{numericPart:t.substring(0,i),firstNonNumericCharPart:t.substring(i).trim()}}}(t),o=Number.parseInt(i,10);if(isNaN(o))throw new D(`${N[7]}: ${t}`);{const i=J.tryParse(n);if(void 0===i)throw new D(`${N[8]}: ${t}`);if(e.includes(i))return{size:o,sizeUnit:i};throw new D(`${N[9]}: ${t}`)}}function At(t,e){return t.toString(10)+J.format(e)}function Lt(t,e){return void 0===t?void 0:t.toString(10)+J.format(e)}!function(t){function e(t){return!Array.isArray(t)&&null!==t&&"object"==typeof t}t.isJson=function(t){return e(t)},t.isJsonObject=e}(K||(K={})),function(t){t.ground="ground",t.row="row",t.column="column",t.stack="stack",t.component="component"}(X||(X={})),function(t){t.none="none",t.always="always",t.onload="onload"}(Y||(Y={})),function(t){t.Pixel="px",t.Percent="%",t.Fractional="fr",t.Em="em"}(J||(J={})),function(t){t.tryParse=function(e){switch(e){case t.Pixel:return t.Pixel;case t.Percent:return t.Percent;case t.Fractional:return t.Fractional;case t.Em:return t.Em;default:return}},t.format=function(e){switch(e){case t.Pixel:return t.Pixel;case t.Percent:return t.Percent;case t.Fractional:return t.Fractional;case t.Em:return t.Em;default:throw new U("SUEF44998",e)}}}(J||(J={})),function(t){const e=["settings","hasHeaders","constrainDragToContainer","selectionEnabled","dimensions","borderWidth","minItemHeight","minItemWidth","headerHeight","dragProxyWidth","dragProxyHeight","labels","close","maximise","minimise","popout","content","componentType","componentState","id","width","type","height","isClosable","title","popoutWholeStack","openPopouts","parentId","activeItemIndex","reorderEnabled","borderGrabWidth","icon"],i=[!0,!1,"row","column","stack","component","close","maximise","minimise","open in new window"];function n(t,e){const i={};for(const n in t)if(t.hasOwnProperty(n)){let a;a=e?s(n):r(n);const l=t[n];i[a]=o(l,e)}return i}function o(t,e){return"object"==typeof t?null===t?null:Array.isArray(t)?function(t,e){const i=t.length,n=new Array(i);for(let s=0;s<i;s++){const i=t[s];n[s]=o(i,e)}return n}(t,e):n(t,e):e?function(t){if("string"==typeof t&&1===t.length)return"___"+t;const e=function(t){for(let e=0;e<i.length;e++)if(i[e]===t)return e;return-1}(t);return-1===e?t:e.toString(36)}(t):function(t){if("string"==typeof t&&1===t.length)return i[parseInt(t,36)];if("string"==typeof t&&"___"===t.substr(0,3))return t[3];return t}(t)}function s(t){if("string"==typeof t&&1===t.length)return"___"+t;const i=function(t){for(let i=0;i<e.length;i++)if(e[i]===t)return i;return-1}(t);return-1===i?t:i.toString(36)}function r(t){return 1===t.length?e[parseInt(t,36)]:"___"===t.substr(0,3)?t[3]:t}t.checkInitialise=function(){if(e.length>36)throw new Error("Too many keys in config minifier map")},t.translateObject=n}(Q||(Q={})),function(t){t.defaults={type:X.ground,content:[],size:1,sizeUnit:J.Fractional,minSize:void 0,minSizeUnit:J.Pixel,id:"",isClosable:!0},t.createCopy=function(t,e){switch(t.type){case X.ground:case X.row:case X.column:return ot.createCopy(t,e);case X.stack:return it.createCopy(t,e);case X.component:return nt.createCopy(t);default:throw new U("CICC91354",t.type,"Invalid Config Item type specified")}},t.createDefault=function(t){switch(t){case X.ground:throw new F("CICCDR91562");case X.row:case X.column:return ot.createDefault(t);case X.stack:return it.createDefault();case X.component:return nt.createDefault();default:throw new U("CICCDD91563",t,"Invalid Config Item type specified")}},t.isComponentItem=function(t){return t.type===X.component},t.isStackItem=function(t){return t.type===X.stack},t.isGroundItem=function(t){return t.type===X.ground}}(tt||(tt={})),function(t){t.defaultMaximised=!1,function(t){t.createCopy=function(t,e){return void 0===t?void 0:{show:null!=e?e:t.show,popout:t.popout,close:t.close,maximise:t.maximise,minimise:t.minimise,tabDropdown:t.tabDropdown}}}(t.Header||(t.Header={}))}(et||(et={})),function(t){function e(t){const e=t.length,i=new Array(e);for(let n=0;n<e;n++)i[n]=tt.createCopy(t[n]);return i}t.defaultActiveItemIndex=0,t.createCopy=function(t,i){return{type:t.type,content:e(void 0!==i?i:t.content),size:t.size,sizeUnit:t.sizeUnit,minSize:t.minSize,minSizeUnit:t.minSizeUnit,id:t.id,maximised:t.maximised,isClosable:t.isClosable,activeItemIndex:t.activeItemIndex,header:et.Header.createCopy(t.header)}},t.copyContent=e,t.createDefault=function(){return{type:X.stack,content:[],size:tt.defaults.size,sizeUnit:tt.defaults.sizeUnit,minSize:tt.defaults.minSize,minSizeUnit:tt.defaults.minSizeUnit,id:tt.defaults.id,maximised:et.defaultMaximised,isClosable:tt.defaults.isClosable,activeItemIndex:t.defaultActiveItemIndex,header:void 0}}}(it||(it={})),function(t){t.defaultReorderEnabled=!0,t.resolveComponentTypeName=function(t){const e=t.componentType;return"string"==typeof e?e:void 0},t.createCopy=function(t){return{type:t.type,content:[],size:t.size,sizeUnit:t.sizeUnit,minSize:t.minSize,minSizeUnit:t.minSizeUnit,id:t.id,maximised:t.maximised,isClosable:t.isClosable,reorderEnabled:t.reorderEnabled,title:t.title,header:et.Header.createCopy(t.header),componentType:t.componentType,componentState:St(void 0,t.componentState),icon:t.icon}},t.createDefault=function(e="",i,n=""){return{type:X.component,content:[],size:tt.defaults.size,sizeUnit:tt.defaults.sizeUnit,minSize:tt.defaults.minSize,minSizeUnit:tt.defaults.minSizeUnit,id:tt.defaults.id,maximised:et.defaultMaximised,isClosable:tt.defaults.isClosable,reorderEnabled:t.defaultReorderEnabled,title:n,header:void 0,componentType:e,componentState:i}},t.copyComponentType=function(t){return St({},t)}}(nt||(nt={})),function(t){function e(t){const e=t.length,i=new Array(e);for(let n=0;n<e;n++)i[n]=tt.createCopy(t[n]);return i}t.isChildItemConfig=function(t){switch(t.type){case X.row:case X.column:case X.stack:case X.component:return!0;case X.ground:return!1;default:throw new U("CROCOSPCICIC13687",t.type)}},t.createCopy=function(t,i){return{type:t.type,content:e(void 0!==i?i:t.content),size:t.size,sizeUnit:t.sizeUnit,minSize:t.minSize,minSizeUnit:t.minSizeUnit,id:t.id,isClosable:t.isClosable}},t.copyContent=e,t.createDefault=function(t){return{type:t,content:[],size:tt.defaults.size,sizeUnit:tt.defaults.sizeUnit,minSize:tt.defaults.minSize,minSizeUnit:tt.defaults.minSizeUnit,id:tt.defaults.id,isClosable:tt.defaults.isClosable}}}(ot||(ot={})),function(t){t.createCopy=function(t){return tt.createCopy(t)},t.isRootItemConfig=function(t){switch(t.type){case X.row:case X.column:case X.stack:case X.component:return!0;case X.ground:return!1;default:throw new U("CROCOSPCICIC13687",t.type)}}}(st||(st={})),function(t){t.create=function(t){const e=void 0===t?[]:[t];return{type:X.ground,content:e,size:100,sizeUnit:J.Percent,minSize:0,minSizeUnit:J.Pixel,id:"",isClosable:!1,title:"",reorderEnabled:!1}}}(rt||(rt={})),function(t){var e,i;function n(t){return"parentId"in t}(e=t.Settings||(t.Settings={})).defaults={constrainDragToContainer:!0,reorderEnabled:!0,popoutWholeStack:!1,blockedPopoutsThrowError:!0,closePopoutsOnUnload:!0,responsiveMode:Y.none,tabOverlapAllowance:0,reorderOnTabMenuClick:!0,tabControlOffset:10,popInOnClose:!1,disableTabOverflowDropdown:!1,tabOverflowBehavior:"dropdown"},e.createCopy=function(t){return{constrainDragToContainer:t.constrainDragToContainer,reorderEnabled:t.reorderEnabled,popoutWholeStack:t.popoutWholeStack,blockedPopoutsThrowError:t.blockedPopoutsThrowError,closePopoutsOnUnload:t.closePopoutsOnUnload,responsiveMode:t.responsiveMode,tabOverlapAllowance:t.tabOverlapAllowance,reorderOnTabMenuClick:t.reorderOnTabMenuClick,tabControlOffset:t.tabControlOffset,popInOnClose:t.popInOnClose,disableTabOverflowDropdown:t.disableTabOverflowDropdown,tabOverflowBehavior:t.tabOverflowBehavior}},(i=t.Dimensions||(t.Dimensions={})).createCopy=function(t){return{borderWidth:t.borderWidth,borderGrabWidth:t.borderGrabWidth,defaultMinItemHeight:t.defaultMinItemHeight,defaultMinItemHeightUnit:t.defaultMinItemHeightUnit,defaultMinItemWidth:t.defaultMinItemWidth,defaultMinItemWidthUnit:t.defaultMinItemWidthUnit,headerHeight:t.headerHeight,dragProxyWidth:t.dragProxyWidth,dragProxyHeight:t.dragProxyHeight}},i.defaults={borderWidth:5,borderGrabWidth:5,defaultMinItemHeight:0,defaultMinItemHeightUnit:J.Pixel,defaultMinItemWidth:10,defaultMinItemWidthUnit:J.Pixel,headerHeight:20,dragProxyWidth:300,dragProxyHeight:200},function(t){t.createCopy=function(t){return{show:t.show,popout:t.popout,dock:t.dock,close:t.close,maximise:t.maximise,minimise:t.minimise,tabDropdown:t.tabDropdown}},t.defaults={show:$.top,popout:"open in new window",dock:"dock",maximise:"maximise",minimise:"minimise",close:"close",tabDropdown:"additional tabs"}}(t.Header||(t.Header={})),t.isPopout=n,t.createDefault=function(){return{root:void 0,openPopouts:[],dimensions:t.Dimensions.defaults,settings:t.Settings.defaults,header:t.Header.defaults,resolved:!0}},t.createCopy=function(e){return n(e)?lt.createCopy(e):{root:void 0===e.root?void 0:st.createCopy(e.root),openPopouts:t.copyOpenPopouts(e.openPopouts),settings:t.Settings.createCopy(e.settings),dimensions:t.Dimensions.createCopy(e.dimensions),header:t.Header.createCopy(e.header),resolved:e.resolved}},t.copyOpenPopouts=function(t){const e=t.length,i=new Array(e);for(let n=0;n<e;n++)i[n]=lt.createCopy(t[n]);return i},t.minifyConfig=function(t){return Q.translateObject(t,!0)},t.unminifyConfig=function(t){return Q.translateObject(t,!1)}}(at||(at={})),function(t){var e;(e=t.Window||(t.Window={})).createCopy=function(t){return{width:t.width,height:t.height,left:t.left,top:t.top}},e.defaults={width:null,height:null,left:null,top:null},t.createCopy=function(e){return{root:void 0===e.root?void 0:st.createCopy(e.root),openPopouts:at.copyOpenPopouts(e.openPopouts),settings:at.Settings.createCopy(e.settings),dimensions:at.Dimensions.createCopy(e.dimensions),header:at.Header.createCopy(e.header),parentId:e.parentId,indexInParent:e.indexInParent,window:t.Window.createCopy(e.window),resolved:e.resolved}}}(lt||(lt={})),function(t){t.resolve=function(t,e){switch(t.type){case X.ground:throw new D("ItemConfig cannot specify type ground",JSON.stringify(t));case X.row:case X.column:return mt.resolve(t,e);case X.stack:return ct.resolve(t,e);case X.component:return ut.resolve(t,e);default:throw new U("UCUICR55499",t.type)}},t.resolveContent=function(e){if(void 0===e)return[];{const i=e.length,n=new Array(i);for(let o=0;o<i;o++)n[o]=t.resolve(e[o],!1);return n}},t.resolveId=function(t){return void 0===t?tt.defaults.id:Array.isArray(t)?0===t.length?tt.defaults.id:t[0]:t},t.resolveSize=function(t,e,i,n){if(void 0!==t)return xt(t,[J.Percent,J.Fractional]);if(void 0!==e||void 0!==i){if(void 0!==e)return{size:e,sizeUnit:J.Percent};if(void 0!==i)return{size:i,sizeUnit:J.Percent};throw new W("CRS33390")}return n?{size:50,sizeUnit:J.Percent}:{size:tt.defaults.size,sizeUnit:tt.defaults.sizeUnit}},t.resolveMinSize=function(t,e,i){if(void 0!==t)return xt(t,[J.Pixel]);{const t=void 0!==e;return t||void 0!==i?t?{size:e,sizeUnit:J.Pixel}:{size:i,sizeUnit:J.Pixel}:{size:tt.defaults.minSize,sizeUnit:tt.defaults.minSizeUnit}}},t.calculateSizeWidthHeightSpecificationType=function(t){return void 0!==t.size?1:void 0!==t.width||void 0!==t.height?2:0},t.isGround=function(t){return t.type===X.ground},t.isRow=function(t){return t.type===X.row},t.isColumn=function(t){return t.type===X.column},t.isStack=function(t){return t.type===X.stack},t.isComponent=function(t){return t.type===X.component}}(ht||(ht={})),function(t){!function(t){t.resolve=function(t,e){var i;if(void 0!==t||void 0!==e){return{show:null!==(i=null==t?void 0:t.show)&&void 0!==i?i:void 0===e?void 0:!!e&&at.Header.defaults.show,popout:null==t?void 0:t.popout,maximise:null==t?void 0:t.maximise,close:null==t?void 0:t.close,minimise:null==t?void 0:t.minimise,tabDropdown:null==t?void 0:t.tabDropdown}}}}(t.Header||(t.Header={})),t.resolveIdAndMaximised=function(t){let e,i,n=t.id,o=!1;if(void 0===n)e=tt.defaults.id;else if(Array.isArray(n)){const t=n.findIndex(t=>"__glMaximised"===t);t>0&&(o=!0,n=n.splice(t,1)),e=n.length>0?n[0]:tt.defaults.id}else e=n;return i=void 0!==t.maximised?t.maximised:o,{id:e,maximised:i}}}(dt||(dt={})),function(t){function e(t){if(void 0===t)return[];{const e=t.length,i=new Array(e);for(let n=0;n<e;n++){const e=t[n],o=ht.resolve(e,!1);if(!tt.isComponentItem(o))throw new F("UCUSICRC91114",JSON.stringify(o));i[n]=o}return i}}function i(t){const e=t.length,i=new Array(e);for(let n=0;n<e;n++){const e=t[n];i[n]=ut.fromResolved(e)}return i}t.resolve=function(t,i){var n,o;const{id:s,maximised:r}=dt.resolveIdAndMaximised(t),{size:a,sizeUnit:l}=ht.resolveSize(t.size,t.width,t.height,i),{size:h,sizeUnit:d}=ht.resolveMinSize(t.minSize,t.minWidth,t.minHeight);return{type:X.stack,content:e(t.content),size:a,sizeUnit:l,minSize:h,minSizeUnit:d,id:s,maximised:r,isClosable:null!==(n=t.isClosable)&&void 0!==n?n:tt.defaults.isClosable,activeItemIndex:null!==(o=t.activeItemIndex)&&void 0!==o?o:it.defaultActiveItemIndex,header:dt.Header.resolve(t.header,t.hasHeaders)}},t.fromResolved=function(t){return{type:X.stack,content:i(t.content),size:At(t.size,t.sizeUnit),minSize:Lt(t.minSize,t.minSizeUnit),id:t.id,maximised:t.maximised,isClosable:t.isClosable,activeItemIndex:t.activeItemIndex,header:et.Header.createCopy(t.header)}}}(ct||(ct={})),function(t){t.resolve=function(e,i){var n,o,s;let r=e.componentType;if(void 0===r&&(r=e.componentName),void 0===r)throw new Error("ComponentItemConfig.componentType is undefined");{const{id:a,maximised:l}=dt.resolveIdAndMaximised(e);let h;h=void 0===e.title||""===e.title?t.componentTypeToTitle(r):e.title;const{size:d,sizeUnit:c}=ht.resolveSize(e.size,e.width,e.height,i),{size:u,sizeUnit:m}=ht.resolveMinSize(e.minSize,e.minWidth,e.minHeight);return{type:e.type,content:[],size:d,sizeUnit:c,minSize:u,minSizeUnit:m,id:a,maximised:l,isClosable:null!==(n=e.isClosable)&&void 0!==n?n:tt.defaults.isClosable,reorderEnabled:null!==(o=e.reorderEnabled)&&void 0!==o?o:nt.defaultReorderEnabled,title:h,header:dt.Header.resolve(e.header,e.hasHeaders),componentType:r,componentState:null!==(s=e.componentState)&&void 0!==s?s:{},icon:e.icon}}},t.fromResolved=function(t){const e={type:X.component,size:At(t.size,t.sizeUnit),minSize:Lt(t.minSize,t.minSizeUnit),id:t.id,maximised:t.maximised,isClosable:t.isClosable,reorderEnabled:t.reorderEnabled,title:t.title,header:et.Header.createCopy(t.header),componentType:t.componentType,componentState:St(void 0,t.componentState)};return void 0!==t.icon&&(e.icon=t.icon),e},t.componentTypeToTitle=function(t){switch(typeof t){case"string":return t;case"number":case"boolean":return t.toString();default:return""}}}(ut||(ut={})),function(t){function e(e){const i=e.length,n=new Array(i);for(let o=0;o<i;o++){const i=e[o],s=i.type;let r;switch(s){case X.row:case X.column:r=t.fromResolved(i);break;case X.stack:r=ct.fromResolved(i);break;case X.component:r=ut.fromResolved(i);break;default:throw new U("ROCICFRC44797",s)}n[o]=r}return n}t.isChildItemConfig=function(t){switch(t.type){case X.row:case X.column:case X.stack:case X.component:return!0;case X.ground:return!1;default:throw new U("UROCOSPCICIC13687",t.type)}},t.resolve=function(e,i){var n;const{size:o,sizeUnit:s}=ht.resolveSize(e.size,e.width,e.height,i),{size:r,sizeUnit:a}=ht.resolveMinSize(e.minSize,e.minWidth,e.minHeight);return{type:e.type,content:t.resolveContent(e.content),size:o,sizeUnit:s,minSize:r,minSizeUnit:a,id:ht.resolveId(e.id),isClosable:null!==(n=e.isClosable)&&void 0!==n?n:tt.defaults.isClosable}},t.fromResolved=function(t){return{type:t.type,content:e(t.content),size:At(t.size,t.sizeUnit),minSize:Lt(t.minSize,t.minSizeUnit),id:t.id,isClosable:t.isClosable}},t.resolveContent=function(e){if(void 0===e)return[];{const i=e.length,n=new Array(i);let o,s=!1,r=!1;for(let o=0;o<i;o++){const i=e[o];if(!t.isChildItemConfig(i))throw new D("ItemConfig is not Row, Column or Stack",i);if(!r){const t=ht.calculateSizeWidthHeightSpecificationType(i);switch(t){case 0:break;case 2:s=!0;break;case 1:r=!0;break;default:throw new U("ROCICRC87556",t)}}n[o]=i}o=!r&&!!s;const a=new Array(i);for(let t=0;t<i;t++){const e=n[t],i=ht.resolve(e,o);if(!ot.isChildItemConfig(i))throw new F("UROCOSPIC99512",JSON.stringify(i));a[t]=i}return a}}}(mt||(mt={})),function(t){t.isRootItemConfig=function(t){switch(t.type){case X.row:case X.column:case X.stack:case X.component:return!0;case X.ground:return!1;default:throw new U("URICIR23687",t.type)}},t.resolve=function(t){if(void 0!==t){const e=ht.resolve(t,!1);if(st.isRootItemConfig(e))return e;throw new D("ItemConfig is not Row, Column or Stack",JSON.stringify(t))}},t.fromResolvedOrUndefined=function(t){if(void 0!==t){const e=t.type;switch(e){case X.row:case X.column:return mt.fromResolved(t);case X.stack:return ct.fromResolved(t);case X.component:return ut.fromResolved(t);default:throw new U("RICFROU89921",e)}}}}(pt||(pt={})),function(t){var e;function i(t){return"parentId"in t||"indexInParent"in t||"window"in t}(t.Settings||(t.Settings={})).resolve=function(t){var e,i,n,o,s,r,a,l,h,d,c,u;return{constrainDragToContainer:null!==(e=null==t?void 0:t.constrainDragToContainer)&&void 0!==e?e:at.Settings.defaults.constrainDragToContainer,reorderEnabled:null!==(i=null==t?void 0:t.reorderEnabled)&&void 0!==i?i:at.Settings.defaults.reorderEnabled,popoutWholeStack:null!==(n=null==t?void 0:t.popoutWholeStack)&&void 0!==n?n:at.Settings.defaults.popoutWholeStack,blockedPopoutsThrowError:null!==(o=null==t?void 0:t.blockedPopoutsThrowError)&&void 0!==o?o:at.Settings.defaults.blockedPopoutsThrowError,closePopoutsOnUnload:null!==(s=null==t?void 0:t.closePopoutsOnUnload)&&void 0!==s?s:at.Settings.defaults.closePopoutsOnUnload,responsiveMode:null!==(r=null==t?void 0:t.responsiveMode)&&void 0!==r?r:at.Settings.defaults.responsiveMode,tabOverlapAllowance:null!==(a=null==t?void 0:t.tabOverlapAllowance)&&void 0!==a?a:at.Settings.defaults.tabOverlapAllowance,reorderOnTabMenuClick:null!==(l=null==t?void 0:t.reorderOnTabMenuClick)&&void 0!==l?l:at.Settings.defaults.reorderOnTabMenuClick,tabControlOffset:null!==(h=null==t?void 0:t.tabControlOffset)&&void 0!==h?h:at.Settings.defaults.tabControlOffset,popInOnClose:null!==(d=null==t?void 0:t.popInOnClose)&&void 0!==d?d:at.Settings.defaults.popInOnClose,disableTabOverflowDropdown:null!==(c=null==t?void 0:t.disableTabOverflowDropdown)&&void 0!==c?c:at.Settings.defaults.disableTabOverflowDropdown,tabOverflowBehavior:null!==(u=null==t?void 0:t.tabOverflowBehavior)&&void 0!==u?u:at.Settings.defaults.tabOverflowBehavior}},(e=t.Dimensions||(t.Dimensions={})).resolve=function(t){var i,n,o,s,r;const{size:a,sizeUnit:l}=e.resolveDefaultMinItemHeight(t),{size:h,sizeUnit:d}=e.resolveDefaultMinItemWidth(t);return{borderWidth:null!==(i=null==t?void 0:t.borderWidth)&&void 0!==i?i:at.Dimensions.defaults.borderWidth,borderGrabWidth:null!==(n=null==t?void 0:t.borderGrabWidth)&&void 0!==n?n:at.Dimensions.defaults.borderGrabWidth,defaultMinItemHeight:a,defaultMinItemHeightUnit:l,defaultMinItemWidth:h,defaultMinItemWidthUnit:d,headerHeight:null!==(o=null==t?void 0:t.headerHeight)&&void 0!==o?o:at.Dimensions.defaults.headerHeight,dragProxyWidth:null!==(s=null==t?void 0:t.dragProxyWidth)&&void 0!==s?s:at.Dimensions.defaults.dragProxyWidth,dragProxyHeight:null!==(r=null==t?void 0:t.dragProxyHeight)&&void 0!==r?r:at.Dimensions.defaults.dragProxyHeight}},e.fromResolved=function(t){return{borderWidth:t.borderWidth,borderGrabWidth:t.borderGrabWidth,defaultMinItemHeight:At(t.defaultMinItemHeight,t.defaultMinItemHeightUnit),defaultMinItemWidth:At(t.defaultMinItemWidth,t.defaultMinItemWidthUnit),headerHeight:t.headerHeight,dragProxyWidth:t.dragProxyWidth,dragProxyHeight:t.dragProxyHeight}},e.resolveDefaultMinItemHeight=function(t){const e=null==t?void 0:t.defaultMinItemHeight;return void 0===e?{size:at.Dimensions.defaults.defaultMinItemHeight,sizeUnit:at.Dimensions.defaults.defaultMinItemHeightUnit}:xt(e,[J.Pixel])},e.resolveDefaultMinItemWidth=function(t){const e=null==t?void 0:t.defaultMinItemWidth;return void 0===e?{size:at.Dimensions.defaults.defaultMinItemWidth,sizeUnit:at.Dimensions.defaults.defaultMinItemWidthUnit}:xt(e,[J.Pixel])},function(t){t.resolve=function(t,e,i){var n,o,s,r,a,l,h,d,c,u,m,p;let f;return f=void 0!==(null==t?void 0:t.show)?t.show:void 0!==e&&void 0!==e.hasHeaders?!!e.hasHeaders&&at.Header.defaults.show:at.Header.defaults.show,{show:f,popout:null!==(o=null!==(n=null==t?void 0:t.popout)&&void 0!==n?n:null==i?void 0:i.popout)&&void 0!==o?o:!1!==(null==e?void 0:e.showPopoutIcon)&&at.Header.defaults.popout,dock:null!==(r=null!==(s=null==t?void 0:t.popin)&&void 0!==s?s:null==i?void 0:i.popin)&&void 0!==r?r:at.Header.defaults.dock,maximise:null!==(l=null!==(a=null==t?void 0:t.maximise)&&void 0!==a?a:null==i?void 0:i.maximise)&&void 0!==l?l:!1!==(null==e?void 0:e.showMaximiseIcon)&&at.Header.defaults.maximise,close:null!==(d=null!==(h=null==t?void 0:t.close)&&void 0!==h?h:null==i?void 0:i.close)&&void 0!==d?d:!1!==(null==e?void 0:e.showCloseIcon)&&at.Header.defaults.close,minimise:null!==(u=null!==(c=null==t?void 0:t.minimise)&&void 0!==c?c:null==i?void 0:i.minimise)&&void 0!==u?u:at.Header.defaults.minimise,tabDropdown:null!==(p=null!==(m=null==t?void 0:t.tabDropdown)&&void 0!==m?m:null==i?void 0:i.tabDropdown)&&void 0!==p?p:at.Header.defaults.tabDropdown}}}(t.Header||(t.Header={})),t.isPopout=i,t.resolve=function(e){if(i(e))return gt.resolve(e);{let i;i=void 0!==e.root?e.root:void 0!==e.content&&e.content.length>0?e.content[0]:void 0;return{resolved:!0,root:pt.resolve(i),openPopouts:t.resolveOpenPopouts(e.openPopouts),dimensions:t.Dimensions.resolve(e.dimensions),settings:t.Settings.resolve(e.settings),header:t.Header.resolve(e.header,e.settings,e.labels)}}},t.fromResolved=function(e){return{root:pt.fromResolvedOrUndefined(e.root),openPopouts:gt.fromResolvedArray(e.openPopouts),settings:at.Settings.createCopy(e.settings),dimensions:t.Dimensions.fromResolved(e.dimensions),header:at.Header.createCopy(e.header)}},t.isResolved=function(t){const e=t;return void 0!==e.resolved&&!0===e.resolved},t.resolveOpenPopouts=function(t){if(void 0===t)return[];{const e=t.length,i=new Array(e);for(let n=0;n<e;n++)i[n]=gt.resolve(t[n]);return i}}}(ft||(ft={})),function(t){var e;function i(e){const i=e.length,n=new Array(i);for(let o=0;o<i;o++){const i=e[o];n[o]=t.fromResolved(i)}return n}(e=t.Window||(t.Window={})).resolve=function(t,e){var i,n,o,s,r,a,l,h;let d;const c=lt.Window.defaults;return d=void 0!==t?{width:null!==(i=t.width)&&void 0!==i?i:c.width,height:null!==(n=t.height)&&void 0!==n?n:c.height,left:null!==(o=t.left)&&void 0!==o?o:c.left,top:null!==(s=t.top)&&void 0!==s?s:c.top}:{width:null!==(r=null==e?void 0:e.width)&&void 0!==r?r:c.width,height:null!==(a=null==e?void 0:e.height)&&void 0!==a?a:c.height,left:null!==(l=null==e?void 0:e.left)&&void 0!==l?l:c.left,top:null!==(h=null==e?void 0:e.top)&&void 0!==h?h:c.top},d},e.fromResolved=function(t){return{width:null===t.width?void 0:t.width,height:null===t.height?void 0:t.height,left:null===t.left?void 0:t.left,top:null===t.top?void 0:t.top}},t.resolve=function(e){var i,n;let o;return o=void 0!==e.root?e.root:void 0!==e.content&&e.content.length>0?e.content[0]:void 0,{root:pt.resolve(o),openPopouts:ft.resolveOpenPopouts(e.openPopouts),dimensions:ft.Dimensions.resolve(e.dimensions),settings:ft.Settings.resolve(e.settings),header:ft.Header.resolve(e.header,e.settings,e.labels),parentId:null!==(i=e.parentId)&&void 0!==i?i:null,indexInParent:null!==(n=e.indexInParent)&&void 0!==n?n:null,window:t.Window.resolve(e.window,e.dimensions),resolved:!0}},t.fromResolved=function(e){return{root:pt.fromResolvedOrUndefined(e.root),openPopouts:i(e.openPopouts),dimensions:ft.Dimensions.fromResolved(e.dimensions),settings:at.Settings.createCopy(e.settings),header:at.Header.createCopy(e.header),parentId:e.parentId,indexInParent:e.indexInParent,window:t.Window.fromResolved(e.window)}},t.fromResolvedArray=i}(gt||(gt={}));class zt{constructor(){this._allEventSubscriptions=[],this._subscriptionsMap=new Map,this.unbind=this.removeEventListener,this.trigger=this.emit}tryBubbleEvent(t,e){}emit(t,...e){let i=this._subscriptionsMap.get(t);if(void 0!==i){i=i.slice();for(let t=0;t<i.length;t++){(0,i[t])(...e)}}this.emitAllEvent(t,e),this.tryBubbleEvent(t,e)}emitUnknown(t,...e){let i=this._subscriptionsMap.get(t);if(void 0!==i){i=i.slice();for(let t=0;t<i.length;t++)i[t](...e)}this.emitAllEvent(t,e),this.tryBubbleEvent(t,e)}emitBaseBubblingEvent(t){const e=new zt.BubblingEvent(t,this);this.emitUnknown(t,e)}emitUnknownBubblingEvent(t){const e=new zt.BubblingEvent(t,this);this.emitUnknown(t,e)}removeEventListener(t,e){const i=e;this.removeUnknownEventListener(t,i)}off(t,e){this.removeEventListener(t,e)}addEventListener(t,e){const i=e;this.addUnknownEventListener(t,i)}on(t,e){this.addEventListener(t,e)}addUnknownEventListener(t,e){if(t===zt.ALL_EVENT)this._allEventSubscriptions.push(e);else{let i=this._subscriptionsMap.get(t);void 0!==i?i.push(e):(i=[e],this._subscriptionsMap.set(t,i))}}removeUnknownEventListener(t,e){if(t===zt.ALL_EVENT)this.removeSubscription(t,this._allEventSubscriptions,e);else{const i=this._subscriptionsMap.get(t);if(void 0===i)throw new Error("No subscribtions to unsubscribe for event "+t);this.removeSubscription(t,i,e)}}removeSubscription(t,e,i){const n=e.indexOf(i);if(n<0)throw new Error("Nothing to unbind for "+t);e.splice(n,1)}emitAllEvent(t,e){const i=this._allEventSubscriptions.length;if(i>0){const n=e.slice();n.unshift(t);const o=this._allEventSubscriptions.slice();for(let t=0;t<i;t++)o[t](...n)}}}!function(t){t.ALL_EVENT="__all",t.headerClickEventName="stackHeaderClick",t.headerTouchStartEventName="stackHeaderTouchStart";class e{get name(){return this._name}get target(){return this._target}get origin(){return this._target}get isPropagationStopped(){return this._isPropagationStopped}constructor(t,e){this._name=t,this._target=e,this._isPropagationStopped=!1}stopPropagation(){this._isPropagationStopped=!0}}t.BubblingEvent=e;t.ClickBubblingEvent=class extends e{get mouseEvent(){return this._mouseEvent}constructor(t,e,i){super(t,e),this._mouseEvent=i}};t.TouchStartBubblingEvent=class extends e{get touchEvent(){return this._touchEvent}constructor(t,e,i){super(t,e),this._touchEvent=i}}}(zt||(zt={}));class Mt extends zt{get width(){return this._width}get height(){return this._height}get parent(){return this._parent}get componentName(){return this._componentType}get componentType(){return this._componentType}get virtual(){return this._boundComponent.virtual}get component(){return this._boundComponent.component}get tab(){return this._tab}get title(){return this._parent.title}get layoutManager(){return this._layoutManager}get isHidden(){return!this._visible}get visible(){return this._visible}get state(){return this._state}get initialState(){return this._initialState}get element(){return this._element}constructor(t,e,i,n,o,s,r,a,l){super(),this._config=t,this._parent=e,this._layoutManager=i,this._element=n,this._updateItemConfigEvent=o,this._showEvent=s,this._hideEvent=r,this._focusEvent=a,this._blurEvent=l,this._stackMaximised=!1,this._width=0,this._height=0,this._visible=!0,this._isShownWithZeroDimensions=!0,this._componentType=t.componentType,this._isClosable=t.isClosable,this._initialState=t.componentState,this._state=this._initialState,this._boundComponent=this.layoutManager.bindComponent(this,t),this.updateElementPositionPropertyFromBoundComponent()}destroy(){this.releaseComponent(),this.stateRequestEvent=void 0,this.emit("destroy")}getElement(){return this._element}hide(){this._hideEvent()}show(){this._showEvent()}focus(t=!1){this._focusEvent(t)}blur(t=!1){this._blurEvent(t)}setSize(t,e){let i=this._parent;if(i.isColumn||i.isRow||null===i.parent)throw new F("ICSSPRC","ComponentContainer cannot have RowColumn Parent");{let n;do{n=i,i=i.parent}while(null!==i&&!i.isColumn&&!i.isRow);if(null===i)return!1;{const o=i.isColumn?"height":"width",s=this[o];if(null===s)throw new H("ICSSCS11194");{const r=("height"===o?e:t)/(s*(1/(n.size/100)))*100,a=(n.size-r)/(i.contentItems.length-1);for(let t=0;t<i.contentItems.length;t++){const e=i.contentItems[t];e===n?e.size=r:e.size+=a}return i.updateSize(!1),!0}}}}close(){this._isClosable&&(this.emit("close"),this._parent.close())}replaceComponent(t){if(this.releaseComponent(),!ht.isComponent(t))throw new Error("ReplaceComponent not passed a component ItemConfig");{const e=ut.resolve(t,!1);if(this._initialState=e.componentState,this._state=this._initialState,this._componentType=e.componentType,this._updateItemConfigEvent(e),this._boundComponent=this.layoutManager.bindComponent(this,e),this.updateElementPositionPropertyFromBoundComponent(),this._boundComponent.virtual){if(void 0!==this.virtualVisibilityChangeRequiredEvent&&this.virtualVisibilityChangeRequiredEvent(this,this._visible),void 0!==this.virtualRectingRequiredEvent){this._layoutManager.fireBeforeVirtualRectingEvent(1);try{this.virtualRectingRequiredEvent(this,this._width,this._height)}finally{this._layoutManager.fireAfterVirtualRectingEvent()}}this.setBaseLogicalZIndex()}this.emit("stateChanged")}}getState(){return this._state}extendState(t){const e=Et(this._state,t);this.setState(e)}setState(t){this._state=t,this._parent.emitBaseBubblingEvent("stateChanged")}setTitle(t){this._parent.setTitle(t)}setTab(t){this._tab=t,this.emit("tab",t)}setVisibility(t){this._boundComponent.virtual&&void 0!==this.virtualVisibilityChangeRequiredEvent&&this.virtualVisibilityChangeRequiredEvent(this,t),t?this._visible?!this._isShownWithZeroDimensions||0===this._height&&0===this._width||(this._isShownWithZeroDimensions=!1,this.setSizeToNodeSize(this._width,this._height,!0),this.emitShow()):(this._visible=!0,0===this._height&&0===this._width?this._isShownWithZeroDimensions=!0:(this._isShownWithZeroDimensions=!1,this.setSizeToNodeSize(this._width,this._height,!0),this.emitShow())):this._visible&&(this._visible=!1,this._isShownWithZeroDimensions=!1,this.emitHide())}setBaseLogicalZIndex(){this.setLogicalZIndex(j.base)}setLogicalZIndex(t){t!==this._logicalZIndex&&(this._logicalZIndex=t,this.notifyVirtualZIndexChangeRequired())}enterDragMode(t,e){this._width=t,this._height=e,wt(this._element,t),Ct(this._element,e),this.setLogicalZIndex(j.drag),this.drag()}exitDragMode(){this.setBaseLogicalZIndex()}enterStackMaximised(){this._stackMaximised=!0,this.setLogicalZIndex(j.stackMaximised)}exitStackMaximised(){this.setBaseLogicalZIndex(),this._stackMaximised=!1}drag(){if(this._boundComponent.virtual&&void 0!==this.virtualRectingRequiredEvent){this._layoutManager.fireBeforeVirtualRectingEvent(1);try{this.virtualRectingRequiredEvent(this,this._width,this._height)}finally{this._layoutManager.fireAfterVirtualRectingEvent()}}}setSizeToNodeSize(t,e,i){(t!==this._width||e!==this._height||i)&&(this._width=t,this._height=e,wt(this._element,t),Ct(this._element,e),this._boundComponent.virtual?this.addVirtualSizedContainerToLayoutManager():(this.emit("resize"),this.checkShownFromZeroDimensions()))}notifyVirtualRectingRequired(){void 0!==this.virtualRectingRequiredEvent&&(this.virtualRectingRequiredEvent(this,this._width,this._height),this.emit("resize"),this.checkShownFromZeroDimensions())}notifyVirtualZIndexChangeRequired(){if(void 0!==this.virtualZIndexChangeRequiredEvent){const t=this._logicalZIndex,e=Z[t];this.virtualZIndexChangeRequiredEvent(this,t,e)}}updateElementPositionPropertyFromBoundComponent(){this._boundComponent.virtual?this._element.style.position="static":this._element.style.position=""}addVirtualSizedContainerToLayoutManager(){this._layoutManager.beginVirtualSizedContainerAdding();try{this._layoutManager.addVirtualSizedContainer(this)}finally{this._layoutManager.endVirtualSizedContainerAdding()}}checkShownFromZeroDimensions(){!this._isShownWithZeroDimensions||0===this._height&&0===this._width||(this._isShownWithZeroDimensions=!1,this.emitShow())}emitShow(){this.emit("shown"),this.emit("show")}emitHide(){this.emit("hide")}releaseComponent(){this._stackMaximised&&this.exitStackMaximised(),this.emit("beforeComponentRelease",this._boundComponent.component),this.layoutManager.unbindComponent(this,this._boundComponent.virtual,this._boundComponent.component)}}class kt extends zt{constructor(t,e,i){super(),this._config=t,this._initialWindowSize=e,this._layoutManager=i,this._isInitialised=!1,this._popoutWindow=null,this.createWindow()}toConfig(){var t,e;if(!1===this._isInitialised)throw new Error("Can't create config, layout not yet initialised");const i=this.getGlInstance().saveLayout();let n,o;null===this._popoutWindow?(n=null,o=null):(n=null!==(t=this._popoutWindow.screenX)&&void 0!==t?t:this._popoutWindow.screenLeft,o=null!==(e=this._popoutWindow.screenY)&&void 0!==e?e:this._popoutWindow.screenTop);const s={width:this.getGlInstance().width,height:this.getGlInstance().height,left:n,top:o};return{root:i.root,openPopouts:i.openPopouts,settings:i.settings,dimensions:i.dimensions,header:i.header,window:s,parentId:this._config.parentId,indexInParent:this._config.indexInParent,resolved:!0}}getGlInstance(){if(null===this._popoutWindow)throw new H("BPGGI24693");return this._popoutWindow.__glInstance}getWindow(){if(null===this._popoutWindow)throw new H("BPGW087215");return this._popoutWindow}close(){if(this.getGlInstance())this.getGlInstance().closeWindow();else try{this.getWindow().close()}catch(t){}}popIn(){let t,e=this._config.indexInParent;if(!this._config.parentId)return;const i=Et({},this.getGlInstance().saveLayout()).root;if(void 0===i)throw new W("BPPIR19998");const n=this._layoutManager.groundItem;if(void 0===n)throw new W("BPPIG34972");t=n.getItemsByPopInParentId(this._config.parentId)[0],t||(t=n.contentItems.length>0?n.contentItems[0]:n,e=0);const o=this._layoutManager.createAndInitContentItem(i,t);t.addChild(o,e),this._layoutManager.layoutConfig.settings.popInOnClose?this._onClose():this.close()}createWindow(){const t=this.createUrl(),e=Math.floor(1e6*Math.random()).toString(36),i=this.serializeWindowFeatures({width:this._initialWindowSize.width,height:this._initialWindowSize.height,innerWidth:this._initialWindowSize.width,innerHeight:this._initialWindowSize.height,menubar:"no",toolbar:"no",location:"no",personalbar:"no",resizable:"yes",scrollbars:"no",status:"no"});if(this._popoutWindow=globalThis.open(t,e,i),this._popoutWindow)this._popoutWindow.addEventListener("load",()=>this.positionWindow(),{passive:!0}),this._popoutWindow.addEventListener("beforeunload",()=>{this._layoutManager.layoutConfig.settings.popInOnClose?this.popIn():this._onClose()},{passive:!0}),this._checkReadyInterval=setInterval(()=>this.checkReady(),10);else if(!0===this._layoutManager.layoutConfig.settings.blockedPopoutsThrowError){throw new O("Popout blocked")}}checkReady(){if(null===this._popoutWindow)throw new H("BPCR01844");this._popoutWindow.__glInstance&&this._popoutWindow.__glInstance.isInitialised&&(this.onInitialised(),void 0!==this._checkReadyInterval&&(clearInterval(this._checkReadyInterval),this._checkReadyInterval=void 0))}serializeWindowFeatures(t){const e=[];for(const i in t)e.push(i+"="+t[i].toString());return e.join(",")}createUrl(){const t="gl-window-config-"+Tt(),e=at.minifyConfig(this._config);try{localStorage.setItem(t,JSON.stringify(e))}catch(t){throw new Error("Error while writing to localStorage "+function(t){return t instanceof Error?t.message:"string"==typeof t?t:"Unknown Error"}(t))}const i=new URL(location.href);return i.searchParams.set("gl-window",t),i.toString()}positionWindow(){if(null===this._popoutWindow)throw new Error("BrowserPopout.positionWindow: null popoutWindow");this._popoutWindow.moveTo(this._initialWindowSize.left,this._initialWindowSize.top),this._popoutWindow.focus()}onInitialised(){this._isInitialised=!0,this.getGlInstance().on("popIn",()=>this.popIn()),this.emit("initialised")}_onClose(){setTimeout(()=>this.emit("closed"),50)}}class Pt extends zt{get type(){return this._type}get id(){return this._id}set id(t){this._id=t}get popInParentIds(){return this._popInParentIds}get parent(){return this._parent}get contentItems(){return this._contentItems}get isClosable(){return this._isClosable}get element(){return this._element}get isInitialised(){return this._isInitialised}static isStack(t){return t.isStack}static isComponentItem(t){return t.isComponent}static isComponentParentableItem(t){return t.isStack||t.isGround}constructor(t,e,i,n){super(),this.layoutManager=t,this._parent=i,this._element=n,this._popInParentIds=[],this._type=e.type,this._id=e.id,this._isInitialised=!1,this.isGround=!1,this.isRow=!1,this.isColumn=!1,this.isStack=!1,this.isComponent=!1,this.size=e.size,this.sizeUnit=e.sizeUnit,this.minSize=e.minSize,this.minSizeUnit=e.minSizeUnit,this._isClosable=e.isClosable,this._pendingEventPropagations={},this._throttledEvents=["stateChanged"],this._contentItems=this.createContentItems(e.content)}removeChild(t,e=!1){const i=this._contentItems.indexOf(t);if(-1===i)throw new Error("Can't remove child item. Unknown content item");if(e||this._contentItems[i].destroy(),this._contentItems.splice(i,1),this._contentItems.length>0)this.updateSize(!1);else if(!this.isGround&&!0===this._isClosable){if(null===this._parent)throw new H("CIUC00874");this._parent.removeChild(this)}}addChild(t,e,i){return null!=e||(e=this._contentItems.length),this._contentItems.splice(e,0,t),t.setParent(this),!0===this._isInitialised&&!1===t._isInitialised&&t.init(),e}replaceChild(t,e,i=!1){const n=this._contentItems.indexOf(t),o=t._element.parentNode;if(-1===n)throw new F("CIRCI23232","Can't replace child. oldChild is not child of this");if(null===o)throw new H("CIRCP23232");if(o.replaceChild(e._element,t._element),!0===i&&(t._parent=null,t.destroy()),this._contentItems[n]=e,e.setParent(this),e.size=t.size,e.sizeUnit=t.sizeUnit,e.minSize=t.minSize,e.minSizeUnit=t.minSizeUnit,null===e._parent)throw new H("CIRCNC45699");!0===e._parent._isInitialised&&!1===e._isInitialised&&e.init(),this.updateSize(!1)}remove(){if(null===this._parent)throw new H("CIR11110");this._parent.removeChild(this)}popout(){const t=Tt(),e=this.layoutManager.createPopoutFromContentItem(this,void 0,t,void 0);return this.emitBaseBubblingEvent("stateChanged"),e}calculateConfigContent(){const t=this._contentItems,e=t.length,i=new Array(e);for(let n=0;n<e;n++){const e=t[n];i[n]=e.toConfig()}return i}highlightDropZone(t,e,i){const n=this.layoutManager.dropTargetIndicator;if(null===n)throw new H("ACIHDZ5593");n.highlightArea(i,1)}onDrop(t,e){this.addChild(t)}show(){this.layoutManager.beginSizeInvalidation();try{It(this._element,!0);for(let t=0;t<this._contentItems.length;t++)this._contentItems[t].show()}finally{this.layoutManager.endSizeInvalidation()}}destroy(){for(let t=0;t<this._contentItems.length;t++)this._contentItems[t].destroy();this._contentItems=[],this.emitBaseBubblingEvent("beforeItemDestroyed"),this._element.remove(),this.emitBaseBubblingEvent("itemDestroyed")}getElementArea(t){const e=(t=null!=t?t:this._element).getBoundingClientRect(),i=e.top+document.body.scrollTop,n=e.left+document.body.scrollLeft,o=e.width,s=e.height;return{x1:n,y1:i,x2:n+o,y2:i+s,surface:o*s,contentItem:this}}init(){this._isInitialised=!0,this.emitBaseBubblingEvent("itemCreated"),this.emitUnknownBubblingEvent(this.type+"Created")}setParent(t){this._parent=t}addPopInParentId(t){this.popInParentIds.includes(t)||this.popInParentIds.push(t)}initContentItems(){for(let t=0;t<this._contentItems.length;t++)this._contentItems[t].init()}hide(){this.layoutManager.beginSizeInvalidation();try{It(this._element,!1)}finally{this.layoutManager.endSizeInvalidation()}}updateContentItemsSize(t){for(let e=0;e<this._contentItems.length;e++)this._contentItems[e].updateSize(t)}createContentItems(t){const e=t.length,i=new Array(e);for(let e=0;e<t.length;e++)i[e]=this.layoutManager.createContentItem(t[e],this);return i}propagateEvent(t,e){if(1===e.length){const i=e[0];i instanceof zt.BubblingEvent&&!1===i.isPropagationStopped&&!0===this._isInitialised&&(!1===this.isGround&&this._parent?this._parent.emitUnknown(t,i):this.scheduleEventPropagationToLayoutManager(t,i))}}tryBubbleEvent(t,e){if(1===e.length){const i=e[0];i instanceof zt.BubblingEvent&&!1===i.isPropagationStopped&&!0===this._isInitialised&&(!1===this.isGround&&this._parent?this._parent.emitUnknown(t,i):this.scheduleEventPropagationToLayoutManager(t,i))}}scheduleEventPropagationToLayoutManager(t,e){-1===this._throttledEvents.indexOf(t)?this.layoutManager.emitUnknown(t,e):!0!==this._pendingEventPropagations[t]&&(this._pendingEventPropagations[t]=!0,globalThis.requestAnimationFrame(()=>this.propagateEventToLayoutManager(t,e)))}propagateEventToLayoutManager(t,e){this._pendingEventPropagations[t]=!1,this.layoutManager.emitUnknown(t,e)}}class Dt extends Pt{get componentName(){return this._container.componentType}get componentType(){return this._container.componentType}get reorderEnabled(){return this._reorderEnabled}set reorderEnabled(t){this._reorderEnabled=t,this._tabReady&&(this._tab.reorderEnabled=t)}get initialWantMaximise(){return this._initialWantMaximise}get component(){return this._container.component}get container(){return this._container}get parentItem(){return this._parentItem}get headerConfig(){return this._headerConfig}get title(){return this._title}get tab(){return this._tab}get focused(){return this._focused}constructor(t,e,i){super(t,e,i,document.createElement("div")),this._parentItem=i,this._tabReady=!1,this._focused=!1,this.isComponent=!0,this._reorderEnabled=e.reorderEnabled,this.applyUpdatableConfig(e),this._initialWantMaximise=e.maximised;const n=document.createElement("div");n.classList.add("lm_content"),this.element.appendChild(n),this._container=new Mt(e,this,t,n,t=>this.handleUpdateItemConfigEvent(t),()=>this.show(),()=>this.hide(),t=>this.focus(t),t=>this.blur(t))}destroy(){this._container.destroy(),super.destroy()}applyUpdatableConfig(t){var e;this.setTitle(t.title),this._headerConfig=t.header,this._icon=t.icon,this._tabReady&&this._tab.setIcon(null!==(e=this._icon)&&void 0!==e?e:null)}toConfig(){const t=this._container.stateRequestEvent,e=void 0===t?this._container.state:t();return Object.assign({type:X.component,content:[],size:this.size,sizeUnit:this.sizeUnit,minSize:this.minSize,minSizeUnit:this.minSizeUnit,id:this.id,maximised:!1,isClosable:this.isClosable,reorderEnabled:this._reorderEnabled,title:this._title,header:et.Header.createCopy(this._headerConfig),componentType:nt.copyComponentType(this.componentType),componentState:e},void 0!==this._icon?{icon:this._icon}:{})}close(){if(null===this.parent)throw new H("CIC68883");this.parent.removeChild(this,!1)}enterDragMode(t,e){wt(this.element,t),Ct(this.element,e),this._container.enterDragMode(t,e)}exitDragMode(){this._container.exitDragMode()}enterStackMaximised(){this._container.enterStackMaximised()}exitStackMaximised(){this._container.exitStackMaximised()}drag(){this._container.drag()}updateSize(t){this.updateNodeSize(t)}init(){this.updateNodeSize(!1),super.init(),this._container.emit("open"),this.initContentItems()}setTitle(t){this._title=t,this.emit("titleChanged",t),this.emit("stateChanged")}setTab(t){var e;this._tab=t,this._tabReady=!0,this.emit("tab",t),this._container.setTab(t),this._tab.setIcon(null!==(e=this._icon)&&void 0!==e?e:null)}hide(){super.hide(),this._container.setVisibility(!1)}show(){super.show(),this._container.setVisibility(!0)}focus(t=!1){this.parentItem.setActiveComponentItem(this,!0,t)}setFocused(t){this._focused=!0,this.tab.setFocused(),t||this.emitBaseBubblingEvent("focus")}blur(t=!1){this._focused&&this.layoutManager.setFocusedComponentItem(void 0,t)}setBlurred(t){this._focused=!1,this.tab.setBlurred(),t||this.emitBaseBubblingEvent("blur")}setParent(t){this._parentItem=t,super.setParent(t)}handleUpdateItemConfigEvent(t){this.applyUpdatableConfig(t)}updateNodeSize(t){if("none"!==this.element.style.display){const{width:e,height:i}=bt(this.element);this._container.setSizeToNodeSize(e,i,t)}}}class Ot extends Pt{constructor(){super(...arguments),this._focused=!1}get focused(){return this._focused}setFocusedValue(t){this._focused=t}}class Rt extends zt{constructor(t,e){super(),this._eElement=t,this._pointerTracking=!1,this._pointerDownEventListener=t=>this.onPointerDown(t),this._pointerMoveEventListener=t=>this.onPointerMove(t),this._pointerUpEventListener=t=>this.onPointerUp(t),this._timeout=void 0,this._allowableTargets=[t,...e],this._oDocument=document,this._eBody=document.body,this._nDelay=1800,this._nDistance=1,this._nX=0,this._nY=0,this._nOriginalX=0,this._nOriginalY=0,this._dragging=!1,this._eElement.addEventListener("pointerdown",this._pointerDownEventListener,{passive:!0})}destroy(){this.checkRemovePointerTrackingEventListeners(),this._eElement.removeEventListener("pointerdown",this._pointerDownEventListener)}cancelDrag(){this.processDragStop(void 0)}onPointerDown(t){if(this._allowableTargets.includes(t.target)&&t.isPrimary){const e=this.getPointerCoordinates(t);this.processPointerDown(e)}}processPointerDown(t){this._nOriginalX=t.x,this._nOriginalY=t.y,this._oDocument.addEventListener("pointermove",this._pointerMoveEventListener),this._oDocument.addEventListener("pointerup",this._pointerUpEventListener,{passive:!0}),this._pointerTracking=!0,this._timeout=setTimeout(()=>{try{this.startDrag()}catch(t){throw console.error(t),t}},this._nDelay)}onPointerMove(t){this._pointerTracking&&(this.processDragMove(t),t.preventDefault())}processDragMove(t){this._nX=t.pageX-this._nOriginalX,this._nY=t.pageY-this._nOriginalY,this._lastPointerEvent=t,!1===this._dragging&&(Math.abs(this._nX)>this._nDistance||Math.abs(this._nY)>this._nDistance)&&this.startDrag(),this._dragging&&this.emit("drag",this._nX,this._nY,t)}onPointerUp(t){this.processDragStop(t)}processDragStop(t){var e;void 0!==this._timeout&&(clearTimeout(this._timeout),this._timeout=void 0),void 0!==this._dragEmitInterval&&(clearInterval(this._dragEmitInterval),this._dragEmitInterval=void 0),this.checkRemovePointerTrackingEventListeners(),!0===this._dragging&&(this._eBody.classList.remove("lm_dragging"),this._eElement.classList.remove("lm_dragging"),null===(e=this._oDocument.querySelector("iframe"))||void 0===e||e.style.setProperty("pointer-events",""),this._dragging=!1,this.emit("dragStop",t))}checkRemovePointerTrackingEventListeners(){this._pointerTracking&&(this._oDocument.removeEventListener("pointermove",this._pointerMoveEventListener),this._oDocument.removeEventListener("pointerup",this._pointerUpEventListener),this._pointerTracking=!1)}startDrag(){var t;void 0!==this._timeout&&(clearTimeout(this._timeout),this._timeout=void 0),this._dragging=!0,this._eBody.classList.add("lm_dragging"),this._eElement.classList.add("lm_dragging"),null===(t=this._oDocument.querySelector("iframe"))||void 0===t||t.style.setProperty("pointer-events","none"),this.emit("dragStart",this._nOriginalX,this._nOriginalY),this._dragEmitInterval=setInterval(()=>{this._dragging&&this._lastPointerEvent&&this.emit("drag",this._nX,this._nY,this._lastPointerEvent)},16)}getPointerCoordinates(t){return{x:t.pageX,y:t.pageY}}}class Bt{get element(){return this._element}constructor(t,e,i){this._isVertical=t,this._size=e,this._grabSize=i<this._size?this._size:i,this._element=document.createElement("div"),this._element.classList.add("lm_splitter");const n=document.createElement("div");n.classList.add("lm_drag_handle");const o=this._grabSize-this._size,s=o/2;this._isVertical?(n.style.top=vt(-s),n.style.height=vt(this._size+o),this._element.classList.add("lm_vertical"),this._element.style.height=vt(this._size)):(n.style.left=vt(-s),n.style.width=vt(this._size+o),this._element.classList.add("lm_horizontal"),this._element.style.width=vt(this._size)),this._element.appendChild(n),this._dragListener=new Rt(this._element,[n])}destroy(){this._element.remove()}on(t,e){this._dragListener.on(t,e)}}class Vt extends Pt{constructor(t,e,i,n){switch(super(e,i,n,Vt.createElement(document,t)),this._rowOrColumnParent=n,this._splitter=[],this.isRow=!t,this.isColumn=t,this._childElementContainer=this.element,this._splitterSize=e.layoutConfig.dimensions.borderWidth,this._splitterGrabSize=e.layoutConfig.dimensions.borderGrabWidth,this._isColumn=t,this._dimension=t?"height":"width",this._splitterPosition=null,this._splitterMinPosition=null,this._splitterMaxPosition=null,i.type){case X.row:case X.column:this._configType=i.type;break;default:throw new F("ROCCCT00925")}}newComponent(t,e,i,n){const o={type:"component",componentType:t,componentState:e,title:i};return this.newItem(o,n)}addComponent(t,e,i,n){const o={type:"component",componentType:t,componentState:e,title:i};return this.addItem(o,n)}newItem(t,e){e=this.addItem(t,e);const i=this.contentItems[e];return Pt.isStack(i)&&ht.isComponent(t)?i.contentItems[0]:i}addItem(t,e){this.layoutManager.checkMinimiseMaximisedStack();const i=ht.resolve(t,!1),n=this.layoutManager.createAndInitContentItem(i,this);return this.addChild(n,e,!1)}addChild(t,e,i){if(void 0===e&&(e=this.contentItems.length),this.contentItems.length>0){const i=this.createSplitter(Math.max(0,e-1)).element;e>0?(this.contentItems[e-1].element.insertAdjacentElement("afterend",i),i.insertAdjacentElement("afterend",t.element)):(this.contentItems[0].element.insertAdjacentElement("beforebegin",i),i.insertAdjacentElement("beforebegin",t.element))}else this._childElementContainer.appendChild(t.element);super.addChild(t,e);const n=1/this.contentItems.length*100;if(!0===i)return this.emitBaseBubblingEvent("stateChanged"),e;for(let e=0;e<this.contentItems.length;e++){const i=this.contentItems[e];if(i===t)t.size=n;else{const t=i.size*=(100-n)/100;i.size=t}}return this.updateSize(!1),this.emitBaseBubblingEvent("stateChanged"),e}removeChild(t,e){const i=this.contentItems.indexOf(t),n=Math.max(i-1,0);if(-1===i)throw new Error("Can't remove child. ContentItem is not child of this Row or Column");if(this._splitter[n]&&(this._splitter[n].destroy(),this._splitter.splice(n,1)),super.removeChild(t,e),1===this.contentItems.length&&!0===this.isClosable){const t=this.contentItems[0];this.contentItems.length=0,this._rowOrColumnParent.replaceChild(this,t,!0)}else this.updateSize(!1),this.emitBaseBubblingEvent("stateChanged")}replaceChild(t,e){const i=t.size;super.replaceChild(t,e),e.size=i,this.updateSize(!1),this.emitBaseBubblingEvent("stateChanged")}updateSize(t){this.layoutManager.beginVirtualSizedContainerAdding();try{this.updateNodeSize(),this.updateContentItemsSize(t)}finally{this.layoutManager.endVirtualSizedContainerAdding()}}init(){if(!0!==this.isInitialised){this.updateNodeSize();for(let t=0;t<this.contentItems.length;t++)this._childElementContainer.appendChild(this.contentItems[t].element);super.init();for(let t=0;t<this.contentItems.length-1;t++)this.contentItems[t].element.insertAdjacentElement("afterend",this.createSplitter(t).element);this.initContentItems()}}toConfig(){return{type:this.type,content:this.calculateConfigContent(),size:this.size,sizeUnit:this.sizeUnit,minSize:this.minSize,minSizeUnit:this.minSizeUnit,id:this.id,isClosable:this.isClosable}}setParent(t){this._rowOrColumnParent=t,super.setParent(t)}updateNodeSize(){this.contentItems.length>0&&(this.calculateRelativeSizes(),this.setAbsoluteSizes()),this.emitBaseBubblingEvent("stateChanged"),this.emit("resize")}setAbsoluteSizes(){const t=this.calculateAbsoluteSizes();for(let e=0;e<this.contentItems.length;e++)t.additionalPixel-e>0&&t.itemSizes[e]++,this._isColumn?(wt(this.contentItems[e].element,t.crossAxisSize),Ct(this.contentItems[e].element,t.itemSizes[e])):(wt(this.contentItems[e].element,t.itemSizes[e]),Ct(this.contentItems[e].element,t.crossAxisSize))}calculateAbsoluteSizes(){const t=(this.contentItems.length-1)*this._splitterSize,{width:e,height:i}=bt(this.element);let n,o;this._isColumn?(n=i-t,o=e):(n=e-t,o=i);let s=0;const r=[];for(let t=0;t<this.contentItems.length;t++){const e=this.contentItems[t];let i;if(e.sizeUnit!==J.Percent)throw new F("ROCCAS6692");i=Math.floor(n*(e.size/100)),s+=i,r.push(i)}return{itemSizes:r,additionalPixel:Math.floor(n-s),totalSize:n,crossAxisSize:o}}calculateRelativeSizes(){let t=0;const e=[];let i=0;for(let n=0;n<this.contentItems.length;n++){const o=this.contentItems[n];switch(o.sizeUnit){case J.Percent:t+=o.size;break;case J.Fractional:e.push(o),i+=o.size;break;default:throw new F("ROCCRS49110",JSON.stringify(o))}}if(100!==Math.round(t)){if(Math.round(t)<100&&e.length>0){const n=100-t;for(let t=0;t<e.length;t++){const o=e[t];o.size=n*(o.size/i),o.sizeUnit=J.Percent}return void this.respectMinItemSize()}if(Math.round(t)>100&&e.length>0){for(let t=0;t<e.length;t++){const n=e[t];n.size=n.size/i*50,n.sizeUnit=J.Percent}t+=50}for(let e=0;e<this.contentItems.length;e++){const i=this.contentItems[e];i.size=i.size/t*100}this.respectMinItemSize()}else this.respectMinItemSize()}respectMinItemSize(){const t=this.calculateContentItemMinSize(this);if(!(t<=0||this.contentItems.length<=1)){let e=0,i=0;const n=[],o=[],s=this.calculateAbsoluteSizes();for(let r=0;r<s.itemSizes.length;r++){const a=s.itemSizes[r];let l;a<t?(i+=t-a,l={size:t}):(e+=a-t,l={size:a},n.push(l)),o.push(l)}if(0===i||i>e)return;{const r=i/e;let a=i;for(let e=0;e<n.length;e++){const i=n[e],o=Math.round((i.size-t)*r);a-=o,i.size-=o}0!==a&&(o[o.length-1].size-=a);for(let t=0;t<this.contentItems.length;t++){this.contentItems[t].size=o[t].size/s.totalSize*100}}}}createSplitter(t){const e=new Bt(this._isColumn,this._splitterSize,this._splitterGrabSize);return e.on("drag",(t,i)=>this.onSplitterDrag(e,t,i)),e.on("dragStop",()=>this.onSplitterDragStop(e)),e.on("dragStart",()=>this.onSplitterDragStart(e)),this._splitter.splice(t,0,e),e}getSplitItems(t){const e=this._splitter.indexOf(t);return{before:this.contentItems[e],after:this.contentItems[e+1]}}calculateContentItemMinSize(t){const e=t.minSize;if(void 0!==e){if(t.minSizeUnit===J.Pixel)return e;throw new F("ROCGMD98831",JSON.stringify(t))}{const t=this.layoutManager.layoutConfig.dimensions;return this._isColumn?t.defaultMinItemHeight:t.defaultMinItemWidth}}calculateContentItemsTotalMinSize(t){let e=0;for(const i of t)e+=this.calculateContentItemMinSize(i);return e}onSplitterDragStart(t){const e=this.getSplitItems(t),i=yt(e.before.element.style[this._dimension]),n=yt(e.after.element.style[this._dimension]),o=this.calculateContentItemsTotalMinSize(e.before.contentItems),s=this.calculateContentItemsTotalMinSize(e.after.contentItems);this._splitterPosition=0,this._splitterMinPosition=-1*(i-o),this._splitterMaxPosition=n-s}onSplitterDrag(t,e,i){let n=this._isColumn?i:e;if(null===this._splitterMinPosition||null===this._splitterMaxPosition)throw new H("ROCOSD59226");n=Math.max(n,this._splitterMinPosition),n=Math.min(n,this._splitterMaxPosition),this._splitterPosition=n;const o=vt(n);this._isColumn?t.element.style.top=o:t.element.style.left=o}onSplitterDragStop(t){if(null===this._splitterPosition)throw new H("ROCOSDS66932");{const e=this.getSplitItems(t),i=yt(e.before.element.style[this._dimension]),n=yt(e.after.element.style[this._dimension]),o=(this._splitterPosition+i)/(i+n),s=e.before.size+e.after.size;e.before.size=o*s,e.after.size=(1-o)*s,t.element.style.top=vt(0),t.element.style.left=vt(0),globalThis.requestAnimationFrame(()=>this.updateSize(!1))}}}!function(t){t.getElementDimensionSize=function(t,e){return"width"===e?function(t){return t.offsetWidth}(t):function(t){return t.offsetHeight}(t)},t.setElementDimensionSize=function(t,e,i){return"width"===e?wt(t,i):Ct(t,i)},t.createElement=function(t,e){const i=t.createElement("div");return i.classList.add("lm_item"),e?i.classList.add("lm_column"):i.classList.add("lm_row"),i}}(Vt||(Vt={}));class Ft extends Ot{constructor(t,e,i){super(t,rt.create(e),null,Ft.createElement(document)),this.isGround=!0,this._childElementContainer=this.element,this._containerElement=i;let n=null;for(;;){const t=n?n.previousSibling:this._containerElement.lastChild;if(!(t instanceof Element&&t.classList.contains("lm_content")))break;n=t}this._containerElement.insertBefore(this.element,n)}init(){if(!0!==this.isInitialised){this.updateNodeSize();for(let t=0;t<this.contentItems.length;t++)this._childElementContainer.appendChild(this.contentItems[t].element);super.init(),this.initContentItems()}}loadRoot(t){if(this.clearRoot(),void 0!==t){const e=this.layoutManager.createAndInitContentItem(t,this);this.addChild(e,0)}}clearRoot(){const t=this.contentItems;switch(t.length){case 0:return;case 1:return void t[0].remove();default:throw new F("GILR07721")}}addItem(t,e){this.layoutManager.checkMinimiseMaximisedStack();const i=ht.resolve(t,!1);let n;if(n=this.contentItems.length>0?this.contentItems[0]:this,n.isComponent)throw new Error("Cannot add item as child to ComponentItem");{const t=this.layoutManager.createAndInitContentItem(i,n);return e=n.addChild(t,e),n===this?-1:e}}loadComponentAsRoot(t){this.clearRoot();const e=ht.resolve(t,!1);if(e.maximised)throw new Error("Root Component cannot be maximised");{const t=new Dt(this.layoutManager,e,this);t.init(),this.addChild(t,0)}}addChild(t,e){if(this.contentItems.length>0)throw new Error("Ground node can only have a single child");return this._childElementContainer.appendChild(t.element),e=super.addChild(t,e),this.updateSize(!1),this.emitBaseBubblingEvent("stateChanged"),e}calculateConfigContent(){const t=this.contentItems,e=t.length,i=new Array(e);for(let n=0;n<e;n++){const e=t[n].toConfig();if(!st.isRootItemConfig(e))throw new F("RCCC66832");i[n]=e}return i}setSize(t,e){void 0===t||void 0===e?this.updateSize(!1):(wt(this.element,t),Ct(this.element,e),this.contentItems.length>0&&(wt(this.contentItems[0].element,t),Ct(this.contentItems[0].element,e)),this.updateContentItemsSize(!1))}updateSize(t){this.layoutManager.beginVirtualSizedContainerAdding();try{this.updateNodeSize(),this.updateContentItemsSize(t)}finally{this.layoutManager.endVirtualSizedContainerAdding()}}createSideAreas(){const t=Ft.Area.oppositeSides,e=new Array(Object.keys(t).length);let i=0;for(const n in t){const o=n,s=this.getElementArea();if(null===s)throw new H("RCSA77553");s.side=o,"2"===t[o][1]?s[o]=s[t[o]]-50:s[o]=s[t[o]]+50,s.surface=(s.x2-s.x1)*(s.y2-s.y1),e[i++]=s}return e}highlightDropZone(t,e,i){this.layoutManager.tabDropPlaceholder.remove(),super.highlightDropZone(t,e,i)}onDrop(t,e){if(t.isComponent){const e=it.createDefault(),i=t;e.header=et.Header.createCopy(i.headerConfig);const n=this.layoutManager.createAndInitContentItem(e,this);n.addChild(t),t=n}if(0===this.contentItems.length)this.addChild(t);else{if(t.type===X.row||t.type===X.column){const e=it.createDefault(),i=this.layoutManager.createContentItem(e,this);i.addChild(t),t=i}const i="x"==e.side[0]?X.row:X.column,n="2"==e.side[1],o=this.contentItems[0];if(o instanceof Vt&&o.type===i){const e=o.contentItems[n?0:o.contentItems.length-1];o.addChild(t,n?0:void 0,!0),e.size*=.5,t.size=e.size,t.sizeUnit=J.Percent,o.updateSize(!1)}else{const e=tt.createDefault(i),s=this.layoutManager.createContentItem(e,this);this.replaceChild(o,s),s.addChild(t,n?0:void 0,!0),s.addChild(o,n?void 0:0,!0),o.size=50,t.size=50,t.sizeUnit=J.Percent,s.updateSize(!1)}}}dock(){throw new F("GID87731")}validateDocking(){throw new F("GIVD87732")}getAllContentItems(){const t=[this];return this.deepGetAllContentItems(this.contentItems,t),t}getConfigMaximisedItems(){const t=[];return this.deepFilterContentItems(this.contentItems,t,t=>!(!Pt.isStack(t)||!t.initialWantMaximise)||!(!Pt.isComponentItem(t)||!t.initialWantMaximise)),t}getItemsByPopInParentId(t){const e=[];return this.deepFilterContentItems(this.contentItems,e,e=>e.popInParentIds.includes(t)),e}toConfig(){throw new Error("Cannot generate GroundItem config")}setActiveComponentItem(t,e,i){}updateNodeSize(){const{width:t,height:e}=bt(this._containerElement);wt(this.element,t),Ct(this.element,e),this.contentItems.length>0&&(wt(this.contentItems[0].element,t),Ct(this.contentItems[0].element,e))}deepGetAllContentItems(t,e){for(let i=0;i<t.length;i++){const n=t[i];e.push(n),this.deepGetAllContentItems(n.contentItems,e)}}deepFilterContentItems(t,e,i){for(let n=0;n<t.length;n++){const o=t[n];i(o)&&e.push(o),this.deepFilterContentItems(o.contentItems,e,i)}}}!function(t){(t.Area||(t.Area={})).oppositeSides={y2:"y1",x2:"x1",y1:"y2",x1:"x2"},t.createElement=function(t){const e=t.createElement("div");return e.classList.add("lm_goldenlayout"),e.classList.add("lm_item"),e.classList.add("lm_root"),e}}(Ft||(Ft={}));class Ut{get element(){return this._element}constructor(t,e,i,n){this._header=t,this._pushEvent=n,this._clickEventListener=t=>this.onClick(t),this._touchStartEventListener=t=>this.onTouchStart(t),this._element=document.createElement("div"),this._element.classList.add(i),this._element.title=e,this._header.on("destroy",()=>this.destroy()),this._element.addEventListener("click",this._clickEventListener,{passive:!0}),this._element.addEventListener("touchstart",this._touchStartEventListener,{passive:!0}),this._header.controlsContainerElement.appendChild(this._element)}destroy(){var t;this._element.removeEventListener("click",this._clickEventListener),this._element.removeEventListener("touchstart",this._touchStartEventListener),null===(t=this._element.parentNode)||void 0===t||t.removeChild(this._element)}onClick(t){this._pushEvent(t)}onTouchStart(t){this._pushEvent(t)}}class Ht{get isActive(){return this._isActive}get componentItem(){return this._componentItem}get contentItem(){return this._componentItem}get element(){return this._element}get titleElement(){return this._titleElement}get closeElement(){return this._closeElement}get reorderEnabled(){return void 0!==this._dragListener}set reorderEnabled(t){t!==this.reorderEnabled&&(t?this.enableReorder():this.disableReorder())}constructor(t,e,i,n,o){var s;this._layoutManager=t,this._componentItem=e,this._closeEvent=i,this._focusEvent=n,this._dragStartEvent=o,this._isActive=!1,this._tabClickListener=t=>this.onTabClickDown(t),this._tabTouchStartListener=t=>this.onTabTouchStart(t),this._closeClickListener=()=>this.onCloseClick(),this._closeTouchStartListener=()=>this.onCloseTouchStart(),this._dragStartListener=(t,e)=>this.onDragStart(t,e),this._contentItemDestroyListener=()=>this.onContentItemDestroy(),this._tabTitleChangedListener=t=>this.setTitle(t),this._element=document.createElement("div"),this._element.classList.add("lm_tab"),this._titleElement=document.createElement("span"),this._titleElement.classList.add("lm_title"),this._closeElement=document.createElement("div"),this._closeElement.classList.add("lm_close_tab"),this._element.appendChild(this._titleElement),this._element.appendChild(this._closeElement),e.isClosable?this._closeElement.style.display="":this._closeElement.style.display="none",this.setTitle(e.title),this._componentItem.on("titleChanged",this._tabTitleChangedListener);(null!==(s=e.reorderEnabled)&&void 0!==s?s:this._layoutManager.layoutConfig.settings.reorderEnabled)&&this.enableReorder(),this._element.addEventListener("click",this._tabClickListener,{passive:!0}),this._element.addEventListener("touchstart",this._tabTouchStartListener,{passive:!0}),this._componentItem.isClosable?(this._closeElement.addEventListener("click",this._closeClickListener,{passive:!0}),this._closeElement.addEventListener("touchstart",this._closeTouchStartListener,{passive:!0})):(this._closeElement.remove(),this._closeElement=void 0),this._componentItem.setTab(this),this._layoutManager.emit("tabCreated",this)}setTitle(t){this._titleElement.innerText=t,this._element.title=t}setIcon(t,e){if(null===t||""===t)return void(this._iconElement&&(this._iconElement.style.display="none"));if(!this._iconElement){const t=document.createElement("img");t.classList.add("lm_tab_icon"),t.alt="",t.setAttribute("aria-hidden","true"),t.draggable=!1,t.style.pointerEvents="none",this._iconElement=t,this._element.insertBefore(t,this._titleElement)}const i=this._iconElement;this.attachIconErrorHandler(i,null!=e?e:null),i.src=t,i.style.display=""}attachIconErrorHandler(t,e=null){t.onerror=()=>{e?(t.src=e,t.onerror=()=>{t.src="",t.onerror=null}):(t.src="",t.onerror=null)}}setActive(t){t!==this._isActive&&(this._isActive=t,t?(this._element.classList.add("lm_active"),this._element.scrollIntoView({behavior:"smooth"})):this._element.classList.remove("lm_active"))}destroy(){var t,e;this._closeEvent=void 0,this._focusEvent=void 0,this._dragStartEvent=void 0,this._element.removeEventListener("click",this._tabClickListener),this._element.removeEventListener("touchstart",this._tabTouchStartListener),null===(t=this._closeElement)||void 0===t||t.removeEventListener("click",this._closeClickListener),null===(e=this._closeElement)||void 0===e||e.removeEventListener("touchstart",this._closeTouchStartListener),this._componentItem.off("titleChanged",this._tabTitleChangedListener),this.reorderEnabled&&this.disableReorder(),this._element.remove()}setBlurred(){this._element.classList.remove("lm_focused"),this._titleElement.classList.remove("lm_focused")}setFocused(){this._element.classList.add("lm_focused"),this._titleElement.classList.add("lm_focused")}onDragStart(t,e){if(void 0===this._dragListener)throw new W("TODSDLU10093");if(void 0===this._dragStartEvent)throw new W("TODS23309");this._dragStartEvent(t,e,this._dragListener,this.componentItem)}onContentItemDestroy(){void 0!==this._dragListener&&(this._dragListener.destroy(),this._dragListener=void 0)}onTabClickDown(t){const e=t.target;e!==this._element&&e!==this._titleElement&&e!==this._iconElement||(0===t.button?this.notifyFocus():1===t.button&&this._componentItem.isClosable&&this.notifyClose())}onTabTouchStart(t){t.target===this._element&&this.notifyFocus()}onCloseClick(){this.notifyClose()}onCloseTouchStart(){this.notifyClose()}notifyClose(){if(void 0===this._closeEvent)throw new W("TNC15007");this._closeEvent(this._componentItem)}notifyFocus(){if(void 0===this._focusEvent)throw new W("TNA15007");this._focusEvent(this._componentItem)}enableReorder(){this._dragListener=new Rt(this._element,[this._titleElement]),this._dragListener.on("dragStart",this._dragStartListener),this._componentItem.on("destroy",this._contentItemDestroyListener)}disableReorder(){if(void 0===this._dragListener)throw new W("TDR87745");this._componentItem.off("destroy",this._contentItemDestroyListener),this._dragListener.off("dragStart",this._dragStartListener),this._dragListener=void 0}}class Wt{get tabs(){return this._tabs}get tabCount(){return this._tabs.length}get lastVisibleTabIndex(){return this._lastVisibleTabIndex}get element(){return this._element}get dropdownElement(){return this._dropdownElement}get dropdownActive(){return this._dropdownActive}constructor(t,e,i,n,o){this._layoutManager=t,this._componentRemoveEvent=e,this._componentFocusEvent=i,this._componentDragStartEvent=n,this._dropdownActiveChangedEvent=o,this._tabs=[],this._lastVisibleTabIndex=-1,this._dropdownActive=!1,this._element=document.createElement("section"),this._element.classList.add("lm_tabs"),"scroll"===this._layoutManager.layoutConfig.settings.tabOverflowBehavior&&this.element.addEventListener("wheel",t=>{const{deltaX:e,deltaY:i}=t;Math.abs(i)>Math.abs(e)&&(this._element.scrollLeft+=i-e)},{passive:!0}),this._dropdownElement=document.createElement("section"),this._dropdownElement.classList.add("lm_tabdropdown_list"),this._dropdownElement.style.display="none"}destroy(){for(let t=0;t<this._tabs.length;t++)this._tabs[t].destroy()}createTab(t,e){for(let e=0;e<this._tabs.length;e++)if(this._tabs[e].componentItem===t)return;const i=new Ht(this._layoutManager,t,t=>this.handleTabCloseEvent(t),t=>this.handleTabFocusEvent(t),(t,e,i,n)=>this.handleTabDragStartEvent(t,e,i,n));void 0===e&&(e=this._tabs.length),this._tabs.splice(e,0,i),e<this._element.childNodes.length?this._element.insertBefore(i.element,this._element.childNodes[e]):this._element.appendChild(i.element)}removeTab(t){for(let e=0;e<this._tabs.length;e++)if(this._tabs[e].componentItem===t){return this._tabs[e].destroy(),this._tabs.splice(e,1),void("scroll"===this._layoutManager.layoutConfig.settings.tabOverflowBehavior&&this._kickScrollWrapperAnimation())}throw new Error("contentItem is not controlled by this header")}processActiveComponentChanged(t){let e=-1;for(let i=0;i<this._tabs.length;i++){const n=this._tabs[i].componentItem===t;this._tabs[i].setActive(n),n&&(e=i)}if(e<0)throw new F("HSACI56632");if(this._layoutManager.layoutConfig.settings.reorderOnTabMenuClick&&-1!==this._lastVisibleTabIndex&&e>this._lastVisibleTabIndex){const t=this._tabs[e];for(let t=e;t>0;t--)this._tabs[t]=this._tabs[t-1];this._tabs[0]=t}}updateTabSizes(t,e){let i=!1;this.tryUpdateTabSizes(i,t,e)||(i=!0,this.tryUpdateTabSizes(i,t,e)),i!==this._dropdownActive&&(this._dropdownActive=i,this._dropdownActiveChangedEvent())}tryUpdateTabSizes(t,e,i){if(this._tabs.length>0){if(void 0===i)throw new Error("non-empty tabs must have active component item");let n=0,o=!1;const s=this._layoutManager.layoutConfig.settings.tabOverlapAllowance,r=this._tabs.indexOf(i.tab),a=this._tabs[r];this._lastVisibleTabIndex=-1;for(let i=0;i<this._tabs.length;i++){const l=this._tabs[i].element;l.parentElement!==this._element&&this._element.appendChild(l);const h=yt(getComputedStyle(a.element).marginRight);n+=l.offsetWidth+h;let d=0;if(r<=i)d=n;else{const t=yt(getComputedStyle(a.element).marginRight);d=n+a.element.offsetWidth+t}if(d>e&&!this._layoutManager.layoutConfig.settings.disableTabOverflowDropdown){if(o)i===r&&(l.style.zIndex="auto",l.style.marginLeft="",l.parentElement!==this._element&&this._element.appendChild(l));else{let t;if(t=r>0&&r<=i?(d-e)/(i-1):(d-e)/i,t<s){for(let e=0;e<=i;e++){const n=e!==r&&0!==e?"-"+vt(t):"";this._tabs[e].element.style.zIndex=vt(i-e),this._tabs[e].element.style.marginLeft=n}this._lastVisibleTabIndex=i,l.parentElement!==this._element&&this._element.appendChild(l)}else o=!0}if(o&&i!==r){if(!t)return!1;l.style.zIndex="auto",l.style.marginLeft="",l.parentElement!==this._dropdownElement&&this._dropdownElement.appendChild(l)}}else this._lastVisibleTabIndex=i,l.style.zIndex="auto",l.style.marginLeft="",l.parentElement!==this._element&&this._element.appendChild(l)}}return!0}showAdditionalTabsDropdown(){this._dropdownElement.style.display=""}hideAdditionalTabsDropdown(){this._dropdownElement.style.display="none"}handleTabCloseEvent(t){this._componentRemoveEvent(t)}handleTabFocusEvent(t){this._componentFocusEvent(t)}handleTabDragStartEvent(t,e,i,n){this._componentDragStartEvent(t,e,i,n)}_kickScrollWrapperAnimation(){const t=this._element;t.style.animationPlayState="paused",t.offsetWidth,t.style.removeProperty("animation-play-state")}}class Nt extends zt{get show(){return this._show}get side(){return this._side}get leftRightSided(){return this._leftRightSided}get layoutManager(){return this._layoutManager}get parent(){return this._parent}get tabs(){return this._tabsContainer.tabs}get lastVisibleTabIndex(){return this._tabsContainer.lastVisibleTabIndex}get element(){return this._element}get tabsContainerElement(){return this._tabsContainer.element}get controlsContainerElement(){return this._controlsContainerElement}constructor(t,e,i,n,o,s,r,a,l,h,d,c,u){if(super(),this._layoutManager=t,this._parent=e,this._configClosable=n,this._getActiveComponentItemEvent=o,this._popoutEvent=r,this._maximiseToggleEvent=a,this._clickEvent=l,this._touchStartEvent=h,this._componentRemoveEvent=d,this._componentFocusEvent=c,this._componentDragStartEvent=u,this._clickListener=t=>this.onClick(t),this._touchStartListener=t=>this.onTouchStart(t),this._rowColumnClosable=!0,this._closeButton=null,this._popoutButton=null,this._tabsContainer=new Wt(this._layoutManager,t=>this.handleTabInitiatedComponentRemoveEvent(t),t=>this.handleTabInitiatedComponentFocusEvent(t),(t,e,i,n)=>this.handleTabInitiatedDragStartEvent(t,e,i,n),()=>this.processTabDropdownActiveChanged()),this._show=i.show,this._popoutEnabled=i.popoutEnabled,this._popoutLabel=i.popoutLabel,this._maximiseEnabled=i.maximiseEnabled,this._maximiseLabel=i.maximiseLabel,this._minimiseEnabled=i.minimiseEnabled,this._minimiseLabel=i.minimiseLabel,this._closeEnabled=i.closeEnabled,this._closeLabel=i.closeLabel,this._tabDropdownEnabled=i.tabDropdownEnabled,this._tabDropdownLabel=i.tabDropdownLabel,this.setSide(i.side),this._canRemoveComponent=this._configClosable,this._element=document.createElement("section"),this._element.classList.add("lm_header"),this._controlsContainerElement=document.createElement("section"),this._controlsContainerElement.classList.add("lm_controls"),"scroll"===this._layoutManager.layoutConfig.settings.tabOverflowBehavior){const t=document.createElement("div");t.classList.add("lm_tabs_scroll_shadow"),t.appendChild(this._tabsContainer.element),this._element.appendChild(t)}else this._element.appendChild(this._tabsContainer.element);this._element.appendChild(this._controlsContainerElement),this._element.appendChild(this._tabsContainer.dropdownElement),this._element.addEventListener("click",this._clickListener,{passive:!0}),this._element.addEventListener("touchstart",this._touchStartListener,{passive:!0}),this._documentMouseUpListener=()=>this._tabsContainer.hideAdditionalTabsDropdown(),globalThis.document.addEventListener("mouseup",this._documentMouseUpListener,{passive:!0}),this._tabControlOffset=this._layoutManager.layoutConfig.settings.tabControlOffset,this._tabDropdownEnabled&&(this._tabDropdownButton=new Ut(this,this._tabDropdownLabel,"lm_tabdropdown",()=>this._tabsContainer.showAdditionalTabsDropdown())),this._popoutEnabled&&(this._popoutButton=new Ut(this,this._popoutLabel,"lm_popout",()=>this.handleButtonPopoutEvent())),this._maximiseEnabled&&(this._maximiseButton=new Ut(this,this._maximiseLabel,"lm_maximise",t=>this.handleButtonMaximiseToggleEvent(t))),this._configClosable&&(this._closeButton=new Ut(this,this._closeLabel,"lm_close",()=>s())),this.processTabDropdownActiveChanged()}destroy(){this.emit("destroy"),this._popoutEvent=void 0,this._maximiseToggleEvent=void 0,this._clickEvent=void 0,this._touchStartEvent=void 0,this._componentRemoveEvent=void 0,this._componentFocusEvent=void 0,this._componentDragStartEvent=void 0,this._tabsContainer.destroy(),globalThis.document.removeEventListener("mouseup",this._documentMouseUpListener),this._element.remove()}createTab(t,e){this._tabsContainer.createTab(t,e)}removeTab(t){this._tabsContainer.removeTab(t)}processActiveComponentChanged(t){this._tabsContainer.processActiveComponentChanged(t),this.updateTabSizes()}setSide(t){this._side=t,this._leftRightSided=[$.right,$.left].includes(this._side)}setRowColumnClosable(t){this._rowColumnClosable=t,this.updateClosability()}updateClosability(){let t;if(this._configClosable)if(this._rowColumnClosable){t=!0;const e=this.tabs.length;for(let i=0;i<e;i++){if(!this._tabsContainer.tabs[i].componentItem.isClosable){t=!1;break}}}else t=!1;else t=!1;null!==this._closeButton&&It(this._closeButton.element,t),null!==this._popoutButton&&It(this._popoutButton.element,t),this._canRemoveComponent=t||this._tabsContainer.tabCount>1}applyFocusedValue(t){t?this._element.classList.add("lm_focused"):this._element.classList.remove("lm_focused")}processMaximised(){if(void 0===this._maximiseButton)throw new W("HPMAX16997");this._maximiseButton.element.setAttribute("title",this._minimiseLabel)}processMinimised(){if(void 0===this._maximiseButton)throw new W("HPMIN16997");this._maximiseButton.element.setAttribute("title",this._maximiseLabel)}updateTabSizes(){if(this._tabsContainer.tabCount>0){const t=this._show?this._layoutManager.layoutConfig.dimensions.headerHeight:0;let e;this._leftRightSided?(this._element.style.height="",this._element.style.width=vt(t)):(this._element.style.width="",this._element.style.height=vt(t)),e=this._leftRightSided?this._element.offsetHeight-this._controlsContainerElement.offsetHeight-this._tabControlOffset:this._element.offsetWidth-this._controlsContainerElement.offsetWidth-this._tabControlOffset,this._tabsContainer.updateTabSizes(e,this._getActiveComponentItemEvent())}}handleTabInitiatedComponentRemoveEvent(t){if(this._canRemoveComponent){if(void 0===this._componentRemoveEvent)throw new W("HHTCE22294");this._componentRemoveEvent(t)}}handleTabInitiatedComponentFocusEvent(t){if(void 0===this._componentFocusEvent)throw new W("HHTAE22294");this._componentFocusEvent(t)}handleTabInitiatedDragStartEvent(t,e,i,n){if(this._canRemoveComponent){if(void 0===this._componentDragStartEvent)throw new W("HHTDSE22294");this._componentDragStartEvent(t,e,i,n)}else i.cancelDrag()}processTabDropdownActiveChanged(){void 0!==this._tabDropdownButton&&It(this._tabDropdownButton.element,this._tabsContainer.dropdownActive)}handleButtonPopoutEvent(){if(this._layoutManager.layoutConfig.settings.popoutWholeStack){if(void 0===this._popoutEvent)throw new W("HHBPOE17834");this._popoutEvent()}else{const t=this._getActiveComponentItemEvent();t&&t.popout()}}handleButtonMaximiseToggleEvent(t){if(void 0===this._maximiseToggleEvent)throw new W("HHBMTE16834");this._maximiseToggleEvent()}onClick(t){t.target===this._element&&this.notifyClick(t)}onTouchStart(t){t.target===this._element&&this.notifyTouchStart(t)}notifyClick(t){if(void 0===this._clickEvent)throw new W("HNHC46834");this._clickEvent(t)}notifyTouchStart(t){if(void 0===this._touchStartEvent)throw new W("HNHTS46834");this._touchStartEvent(t)}}class qt extends Ot{get childElementContainer(){return this._childElementContainer}get header(){return this._header}get headerShow(){return this._header.show}get headerSide(){return this._header.side}get headerLeftRightSided(){return this._header.leftRightSided}get contentAreaDimensions(){return this._contentAreaDimensions}get initialWantMaximise(){return this._initialWantMaximise}get isMaximised(){return this===this.layoutManager.maximisedStack}get stackParent(){if(!this.parent)throw new Error("Stack should always have a parent");return this.parent}constructor(t,e,i){var n,o,s,r,a,l,h,d,c,u,m,p,f,g,v,y,_,w,C;super(t,e,i,qt.createElement(document)),this._headerSideChanged=!1,this._resizeListener=()=>this.handleResize(),this._maximisedListener=()=>this.handleMaximised(),this._minimisedListener=()=>this.handleMinimised(),this._headerConfig=e.header;const b=t.layoutConfig.header,I=e.content;let E;if(1!==I.length)E=void 0;else{E=I[0].header}this._initialWantMaximise=e.maximised,this._initialActiveItemIndex=null!==(n=e.activeItemIndex)&&void 0!==n?n:0;const S=null!==(r=null!==(s=null===(o=this._headerConfig)||void 0===o?void 0:o.show)&&void 0!==s?s:null==E?void 0:E.show)&&void 0!==r?r:b.show,T=null!==(h=null!==(l=null===(a=this._headerConfig)||void 0===a?void 0:a.popout)&&void 0!==l?l:null==E?void 0:E.popout)&&void 0!==h?h:b.popout,x=null!==(u=null!==(c=null===(d=this._headerConfig)||void 0===d?void 0:d.maximise)&&void 0!==c?c:null==E?void 0:E.maximise)&&void 0!==u?u:b.maximise,A=null!==(f=null!==(p=null===(m=this._headerConfig)||void 0===m?void 0:m.close)&&void 0!==p?p:null==E?void 0:E.close)&&void 0!==f?f:b.close,L=null!==(y=null!==(v=null===(g=this._headerConfig)||void 0===g?void 0:g.minimise)&&void 0!==v?v:null==E?void 0:E.minimise)&&void 0!==y?y:b.minimise,z=null!==(C=null!==(w=null===(_=this._headerConfig)||void 0===_?void 0:_.tabDropdown)&&void 0!==w?w:null==E?void 0:E.tabDropdown)&&void 0!==C?C:b.tabDropdown;this._maximisedEnabled=!1!==x;const M={show:!1!==S,side:!1===S?$.top:S,popoutEnabled:!1!==T,popoutLabel:!1===T?"":T,maximiseEnabled:this._maximisedEnabled,maximiseLabel:!1===x?"":x,closeEnabled:!1!==A,closeLabel:!1===A?"":A,minimiseEnabled:!0,minimiseLabel:L,tabDropdownEnabled:!1!==z,tabDropdownLabel:!1===z?"":z};this._header=new Nt(t,this,M,e.isClosable&&!1!==A,()=>this.getActiveComponentItem(),()=>this.remove(),()=>this.handlePopoutEvent(),()=>this.toggleMaximise(),t=>this.handleHeaderClickEvent(t),t=>this.handleHeaderTouchStartEvent(t),t=>this.handleHeaderComponentRemoveEvent(t),t=>this.handleHeaderComponentFocusEvent(t),(t,e,i,n)=>this.handleHeaderComponentStartDragEvent(t,e,i,n)),this.isStack=!0,this._childElementContainer=document.createElement("section"),this._childElementContainer.classList.add("lm_items"),this.on("resize",this._resizeListener),this._maximisedEnabled&&(this.on("maximised",this._maximisedListener),this.on("minimised",this._minimisedListener)),this.element.appendChild(this._header.element),this.element.appendChild(this._childElementContainer),this.setupHeaderPosition(),this._header.updateClosability()}updateSize(t){this.layoutManager.beginVirtualSizedContainerAdding();try{this.updateNodeSize(),this.updateContentItemsSize(t)}finally{this.layoutManager.endVirtualSizedContainerAdding()}}init(){if(!0===this.isInitialised)return;this.updateNodeSize();for(let t=0;t<this.contentItems.length;t++)this._childElementContainer.appendChild(this.contentItems[t].element);super.init();const t=this.contentItems,e=t.length;if(e>0){if(this._initialActiveItemIndex<0||this._initialActiveItemIndex>=e)throw new Error(`ActiveItemIndex out of range: ${this._initialActiveItemIndex} id: ${this.id}`);for(let i=0;i<e;i++){const e=t[i];if(!(e instanceof Dt))throw new Error(`Stack Content Item is not of type ComponentItem: ${i} id: ${this.id}`);this._header.createTab(e,i),e.hide(),e.container.setBaseLogicalZIndex()}this.setActiveComponentItem(t[this._initialActiveItemIndex],!1),this._header.updateTabSizes()}this._header.updateClosability(),this.initContentItems()}setActiveContentItem(t){if(!Pt.isComponentItem(t))throw new Error("Stack.setActiveContentItem: item is not a ComponentItem");this.setActiveComponentItem(t,!1)}setActiveComponentItem(t,e,i=!1){if(this._activeComponentItem!==t){if(-1===this.contentItems.indexOf(t))throw new Error("componentItem is not a child of this stack");this.layoutManager.beginSizeInvalidation();try{void 0!==this._activeComponentItem&&this._activeComponentItem.hide(),this._activeComponentItem=t,this._header.processActiveComponentChanged(t),t.show()}finally{this.layoutManager.endSizeInvalidation()}this.emit("activeContentItemChanged",t),this.layoutManager.emit("activeContentItemChanged",t),this.emitStateChangedEvent()}(this.focused||e)&&this.layoutManager.setFocusedComponentItem(t,i)}getActiveContentItem(){var t;return null!==(t=this.getActiveComponentItem())&&void 0!==t?t:null}getActiveComponentItem(){return this._activeComponentItem}focusActiveContentItem(){var t;null===(t=this._activeComponentItem)||void 0===t||t.focus()}setFocusedValue(t){this._header.applyFocusedValue(t),super.setFocusedValue(t)}setRowColumnClosable(t){this._header.setRowColumnClosable(t)}newComponent(t,e,i,n){const o={type:"component",componentType:t,componentState:e,title:i};return this.newItem(o,n)}addComponent(t,e,i,n){const o={type:"component",componentType:t,componentState:e,title:i};return this.addItem(o,n)}newItem(t,e){return e=this.addItem(t,e),this.contentItems[e]}addItem(t,e){this.layoutManager.checkMinimiseMaximisedStack();const i=ht.resolve(t,!1),n=this.layoutManager.createAndInitContentItem(i,this);return this.addChild(n,e)}addChild(t,e,i=!1){if(void 0!==e&&e>this.contentItems.length)throw e-=1,new F("SAC99728");if(t instanceof Dt)return e=super.addChild(t,e),this._childElementContainer.appendChild(t.element),this._header.createTab(t,e),this.setActiveComponentItem(t,i),this._header.updateTabSizes(),this.updateSize(!1),t.container.setBaseLogicalZIndex(),this._header.updateClosability(),this.emitStateChangedEvent(),e;throw new F("SACC88532")}removeChild(t,e){const i=t,n=this.contentItems.indexOf(i),o=1===this.contentItems.length;if(this._activeComponentItem===i&&(i.focused&&i.blur(),!o)){const t=0===n?1:n-1;this.setActiveComponentItem(this.contentItems[t],!1)}this._header.removeTab(i),super.removeChild(i,e),o||this._header.updateClosability(),this.emitStateChangedEvent()}toggleMaximise(){this.isMaximised?this.minimise():this.maximise()}maximise(){if(!this.isMaximised){this.layoutManager.setMaximisedStack(this);const t=this.contentItems,e=t.length;for(let i=0;i<e;i++){const e=t[i];if(!(e instanceof Dt))throw new F("SMAXI87773");e.enterStackMaximised()}this.emitStateChangedEvent()}}minimise(){if(this.isMaximised){this.layoutManager.setMaximisedStack(void 0);const t=this.contentItems,e=t.length;for(let i=0;i<e;i++){const e=t[i];if(!(e instanceof Dt))throw new F("SMINI87773");e.exitStackMaximised()}this.emitStateChangedEvent()}}destroy(){var t;(null===(t=this._activeComponentItem)||void 0===t?void 0:t.focused)&&this._activeComponentItem.blur(),super.destroy(),this.off("resize",this._resizeListener),this._maximisedEnabled&&(this.off("maximised",this._maximisedListener),this.off("minimised",this._minimisedListener)),this._header.destroy()}toConfig(){let t;if(this._activeComponentItem&&(t=this.contentItems.indexOf(this._activeComponentItem),t<0))throw new Error("active component item not found in stack");if(this.contentItems.length>0&&void 0===t)throw new Error("expected non-empty stack to have an active component item");return{type:"stack",content:this.calculateConfigContent(),size:this.size,sizeUnit:this.sizeUnit,minSize:this.minSize,minSizeUnit:this.minSizeUnit,id:this.id,isClosable:this.isClosable,maximised:this.isMaximised,header:this.createHeaderConfig(),activeItemIndex:t}}onDrop(t,e){if("header"===this._dropSegment){if(this.resetHeaderDropZone(),void 0===this._dropIndex)throw new W("SODDI68990");return void this.addChild(t,this._dropIndex)}if("body"===this._dropSegment)return void this.addChild(t,0,!0);const i="top"===this._dropSegment||"bottom"===this._dropSegment,n="left"===this._dropSegment||"right"===this._dropSegment,o="top"===this._dropSegment||"left"===this._dropSegment,s=i&&this.stackParent.isColumn||n&&this.stackParent.isRow;if(t.isComponent){const e=it.createDefault();e.header=this.createHeaderConfig();const i=this.layoutManager.createAndInitContentItem(e,this);i.addChild(t),t=i}if(t.type===X.row||t.type===X.column){const e=it.createDefault();e.header=this.createHeaderConfig();const i=this.layoutManager.createContentItem(e,this);i.addChild(t),t=i}if(s){const e=this.stackParent.contentItems.indexOf(this);this.stackParent.addChild(t,o?e:e+1,!0),this.size*=.5,t.size=this.size,t.sizeUnit=this.sizeUnit,this.stackParent.updateSize(!1)}else{const e=i?X.column:X.row,n=tt.createDefault(e),s=this.layoutManager.createContentItem(n,this);this.stackParent.replaceChild(this,s),s.addChild(t,o?0:void 0,!0),s.addChild(this,o?void 0:0,!0),this.size=50,t.size=50,t.sizeUnit=J.Percent,s.updateSize(!1)}}highlightDropZone(t,e){for(const i in this._contentAreaDimensions){const n=i,o=this._contentAreaDimensions[n].hoverArea;if(o.x1<t&&o.x2>t&&o.y1<e&&o.y2>e)return void("header"===n?(this._dropSegment="header",this.highlightHeaderDropZone(this._header.leftRightSided?e:t)):(this.resetHeaderDropZone(),this.highlightBodyDropZone(n)))}}getArea(){if("none"===this.element.style.display)return null;const t=super.getElementArea(this._header.element),e=super.getElementArea(this._childElementContainer);if(null===t||null===e)throw new H("SGAHC13086");const i=e.x2-e.x1,n=e.y2-e.y1;return this._contentAreaDimensions={header:{hoverArea:{x1:t.x1,y1:t.y1,x2:t.x2,y2:t.y2},highlightArea:{x1:t.x1,y1:t.y1,x2:t.x2,y2:t.y2}}},0===this.contentItems.length?(this._contentAreaDimensions.body={hoverArea:{x1:e.x1,y1:e.y1,x2:e.x2,y2:e.y2},highlightArea:{x1:e.x1,y1:e.y1,x2:e.x2,y2:e.y2}},super.getElementArea(this.element)):(this._contentAreaDimensions.left={hoverArea:{x1:e.x1,y1:e.y1,x2:e.x1+.25*i,y2:e.y2},highlightArea:{x1:e.x1,y1:e.y1,x2:e.x1+.5*i,y2:e.y2}},this._contentAreaDimensions.top={hoverArea:{x1:e.x1+.25*i,y1:e.y1,x2:e.x1+.75*i,y2:e.y1+.5*n},highlightArea:{x1:e.x1,y1:e.y1,x2:e.x2,y2:e.y1+.5*n}},this._contentAreaDimensions.right={hoverArea:{x1:e.x1+.75*i,y1:e.y1,x2:e.x2,y2:e.y2},highlightArea:{x1:e.x1+.5*i,y1:e.y1,x2:e.x2,y2:e.y2}},this._contentAreaDimensions.bottom={hoverArea:{x1:e.x1+.25*i,y1:e.y1+.5*n,x2:e.x1+.75*i,y2:e.y2},highlightArea:{x1:e.x1,y1:e.y1+.5*n,x2:e.x2,y2:e.y2}},super.getElementArea(this.element))}positionHeader(t){this._header.side!==t&&(this._header.setSide(t),this._headerSideChanged=!0,this.setupHeaderPosition())}updateNodeSize(){if("none"!==this.element.style.display){const t=bt(this.element);if(this._header.show){t[this._header.leftRightSided?G.width:G.height]-=this.layoutManager.layoutConfig.dimensions.headerHeight}this._childElementContainer.style.width=vt(t.width),this._childElementContainer.style.height=vt(t.height);for(let e=0;e<this.contentItems.length;e++)this.contentItems[e].element.style.width=vt(t.width),this.contentItems[e].element.style.height=vt(t.height);this.emit("resize"),this.emitStateChangedEvent()}}highlightHeaderDropZone(t){var e;const i=this._header.lastVisibleTabIndex+1,n=this._header.tabsContainerElement.childNodes,o=new Array(i);let s=0,r=0;for(;r<i;){const t=n[s++];t!==this.layoutManager.tabDropPlaceholder&&(o[r++]=t)}if(null===this.layoutManager.dropTargetIndicator)throw new H("SHHDZDTI97110");if(0===i){const t=this._header.element.getBoundingClientRect();t.top,document.body.scrollTop,t.left,document.body.scrollLeft;t.height,t.height,this._dropIndex=0}else{if("scroll"===this.layoutManager.layoutConfig.settings.tabOverflowBehavior){const e=12,i=this._header.tabsContainerElement,n=i.getBoundingClientRect();t-n.left<e?i.scrollBy({left:-1}):n.right-t<e&&i.scrollBy({left:1})}let n,s,r,a=0,l=!1;do{r=o[a];const e=r.getBoundingClientRect(),i=e.top+document.body.scrollTop,h=e.left+document.body.scrollLeft;this._header.leftRightSided?(n=i,s=e.height):(n=h,s=e.width),t>=n&&t<n+s?l=!0:a++}while(a<i&&!l);if(!1===l&&t<n)return;t<n+s/2?(this._dropIndex=a,r.insertAdjacentElement("beforebegin",this.layoutManager.tabDropPlaceholder)):(this._dropIndex=Math.min(a+1,i),r.insertAdjacentElement("afterend",this.layoutManager.tabDropPlaceholder)),null===(e=this.layoutManager.dropTargetIndicator)||void 0===e||e.highlightElement(this.layoutManager.tabDropPlaceholder,0)}}resetHeaderDropZone(){this.layoutManager.tabDropPlaceholder.remove()}setupHeaderPosition(){It(this._header.element,this._header.show),this.element.classList.remove("lm_left","lm_right","lm_bottom"),this._header.leftRightSided&&this.element.classList.add("lm_"+this._header.side),this.updateSize(!1)}highlightBodyDropZone(t){if(void 0===this._contentAreaDimensions)throw new W("SHBDZC82265");{const e=this._contentAreaDimensions[t].highlightArea,i=this.layoutManager.dropTargetIndicator;if(null===i)throw new H("SHBDZD96110");i.highlightArea(e,1),this._dropSegment=t}}handleResize(){
//! this._header.updateTabSizes()
"block"===getComputedStyle(this.layoutManager.container).display&&this._header.updateTabSizes()}handleMaximised(){this._header.processMaximised()}handleMinimised(){this._header.processMinimised()}handlePopoutEvent(){this.popout()}handleHeaderClickEvent(t){const e=zt.headerClickEventName,i=new zt.ClickBubblingEvent(e,this,t);this.emit(e,i)}handleHeaderTouchStartEvent(t){const e=zt.headerTouchStartEventName,i=new zt.TouchStartBubblingEvent(e,this,t);this.emit(e,i)}handleHeaderComponentRemoveEvent(t){this.removeChild(t,!1)}handleHeaderComponentFocusEvent(t){this.setActiveComponentItem(t,!0)}handleHeaderComponentStartDragEvent(t,e,i,n){!0===this.isMaximised&&this.toggleMaximise(),this.layoutManager.startComponentDrag(t,e,i,n,this)}createHeaderConfig(){if(this._headerSideChanged){const t=!!this._header.show&&this._header.side;let e=et.Header.createCopy(this._headerConfig,t);return void 0===e&&(e={show:t,popout:void 0,maximise:void 0,close:void 0,minimise:void 0,tabDropdown:void 0}),e}return et.Header.createCopy(this._headerConfig)}emitStateChangedEvent(){this.emitBaseBubblingEvent("stateChanged")}}!function(t){t.createElement=function(t){const e=t.createElement("div");return e.classList.add("lm_item"),e.classList.add("lm_stack"),e}}(qt||(qt={}));class Gt extends zt{get element(){return this._element}constructor(t,e,i,n,o,s){if(super(),this._dragListener=i,this._layoutManager=n,this._componentItem=o,this._originalParent=s,this._area=null,this._lastValidArea=null,this._dragListener.on("drag",(t,e,i)=>this.onDrag(t,e,i)),this._dragListener.on("dragStop",()=>this.onDrop()),this.createDragProxyElements(t,e),null===this._componentItem.parent)throw new H("DPC10097");this._componentItemFocused=this._componentItem.focused,this._componentItemFocused&&this._componentItem.blur(),this._componentItem.parent.removeChild(this._componentItem,!0),this.setDimensions(),document.body.appendChild(this._element),this.determineMinMaxXY(),this._layoutManager.calculateItemAreas(),this.setDropPosition(t,e)}createDragProxyElements(t,e){this._element=document.createElement("div"),this._element.classList.add("lm_dragProxy");const i=document.createElement("div");i.classList.add("lm_header");const n=document.createElement("div");n.classList.add("lm_tabs");const o=document.createElement("div");o.classList.add("lm_tab");const s=document.createElement("span");s.classList.add("lm_title"),o.appendChild(s),n.appendChild(o),i.appendChild(n),this._proxyContainerElement=document.createElement("div"),this._proxyContainerElement.classList.add("lm_content"),this._element.appendChild(i),this._element.appendChild(this._proxyContainerElement),this._originalParent instanceof qt&&this._originalParent.headerShow&&(this._sided=this._originalParent.headerLeftRightSided,this._element.classList.add("lm_"+this._originalParent.headerSide),[$.right,$.bottom].indexOf(this._originalParent.headerSide)>=0&&this._proxyContainerElement.insertAdjacentElement("afterend",i)),this._element.style.left=vt(t),this._element.style.top=vt(e),o.setAttribute("title",this._componentItem.title),s.insertAdjacentText("afterbegin",this._componentItem.title),this._proxyContainerElement.appendChild(this._componentItem.element)}determineMinMaxXY(){const t=this._layoutManager.groundItem;if(void 0===t)throw new W("DPDMMXY73109");{const e=t.element.getBoundingClientRect();this._minX=e.left+document.body.scrollLeft,this._minY=e.top+document.body.scrollTop,this._maxX=this._minX+e.width,this._maxY=this._minY+e.height}}onDrag(t,e,i){const n=i.pageX,o=i.pageY;this.setDropPosition(n,o),this._componentItem.drag()}setDropPosition(t,e){this._layoutManager.layoutConfig.settings.constrainDragToContainer&&(t<=this._minX?t=Math.ceil(this._minX):t>=this._maxX&&(t=Math.floor(this._maxX)),e<=this._minY?e=Math.ceil(this._minY):e>=this._maxY&&(e=Math.floor(this._maxY))),this._element.style.left=vt(t),this._element.style.top=vt(e),this._area=this._layoutManager.getArea(t,e),null!==this._area&&(this._lastValidArea=this._area,this._area.contentItem.highlightDropZone(t,e,this._area))}onDrop(){const t=this._layoutManager.dropTargetIndicator;if(null===t)throw new H("DPOD30011");let e;if(t.hide(),this._componentItem.exitDragMode(),null!==this._area)e=this._componentItem,this._area.contentItem.onDrop(e,this._area);else if(null!==this._lastValidArea){e=this._componentItem;this._lastValidArea.contentItem.onDrop(e,this._lastValidArea)}else this._originalParent?(e=this._componentItem,this._originalParent.addChild(e)):this._componentItem.destroy();this._element.remove(),this._layoutManager.emit("itemDropped",this._componentItem),this._componentItemFocused&&void 0!==e&&e.focus()}setDimensions(){const t=this._layoutManager.layoutConfig.dimensions;if(void 0===t)throw new Error("DragProxy.setDimensions: dimensions undefined");let e=t.dragProxyWidth,i=t.dragProxyHeight;if(void 0===e||void 0===i)throw new Error("DragProxy.setDimensions: width and/or height undefined");const n=!1===this._layoutManager.layoutConfig.header.show?0:t.headerHeight;this._element.style.width=vt(e),this._element.style.height=vt(i),e-=this._sided?n:0,i-=this._sided?0:n,this._proxyContainerElement.style.width=vt(e),this._proxyContainerElement.style.height=vt(i),this._componentItem.enterDragMode(e,i),this._componentItem.show()}}class $t{constructor(t,e,i,n,o,s,r){this._layoutManager=t,this._element=e,this._extraAllowableChildTargets=i,this._componentTypeOrFtn=n,this._componentState=o,this._title=s,this._id=r,this._dragListener=null,this._dummyGroundContainer=document.createElement("div");const a=ot.createDefault("row");this._dummyGroundContentItem=new Ft(this._layoutManager,a,this._dummyGroundContainer),this.createDragListener()}destroy(){this.removeDragListener()}createDragListener(){this.removeDragListener(),this._dragListener=new Rt(this._element,this._extraAllowableChildTargets),this._dragListener.on("dragStart",(t,e)=>this.onDragStart(t,e)),this._dragListener.on("dragStop",()=>this.onDragStop())}onDragStart(t,e){var i;const n="component";let o;if("function"==typeof this._componentTypeOrFtn){const t=this._componentTypeOrFtn();o=$t.isDragSourceComponentItemConfig(t)?{type:n,componentState:t.state,componentType:t.type,title:null!==(i=t.title)&&void 0!==i?i:this._title}:t}else o={type:n,componentState:this._componentState,componentType:this._componentTypeOrFtn,title:this._title,id:this._id};const s=ut.resolve(o,!1),r=new Dt(this._layoutManager,s,this._dummyGroundContentItem);if(this._dummyGroundContentItem.contentItems.push(r),null===this._dragListener)throw new H("DSODSD66746");{const i=new Gt(t,e,this._dragListener,this._layoutManager,r,this._dummyGroundContentItem),n=this._layoutManager.transitionIndicator;if(null===n)throw new H("DSODST66746");n.transitionElements(this._element,i.element)}}onDragStop(){this.createDragListener()}removeDragListener(){null!==this._dragListener&&(this._dragListener.destroy(),this._dragListener=null)}}!function(t){t.isDragSourceComponentItemConfig=function(t){return!("componentType"in t)}}($t||($t={}));class jt{constructor(){this.targetElement=null,this.observeInterval=null,this._element=document.createElement("div"),this._element.classList.add("lm_dropTargetIndicator");const t=document.createElement("div");t.classList.add("lm_inner"),this._element.appendChild(t),document.body.appendChild(this._element)}destroy(){this.clearHighlightedElement(),this._element.remove()}highlightArea(t,e){this.clearHighlightedElement(),this.highlightAreaInternal(t,e)}highlightAreaInternal(t,e){this._element.style.left=vt(t.x1+e),this._element.style.top=vt(t.y1+e),this._element.style.width=vt(t.x2-t.x1-e),this._element.style.height=vt(t.y2-t.y1-e),this._element.style.display="block"}highlightElement(t,e){if(this.targetElement===t)return;this.clearHighlightedElement(),this.targetElement=t;const i=t.getBoundingClientRect(),n={x1:i.left,y1:i.top,x2:i.right,y2:i.bottom};this.highlightAreaInternal(n,e),this.observeInterval=setInterval(()=>{const i=t.getBoundingClientRect(),n={x1:i.left,y1:i.top,x2:i.right,y2:i.bottom};this.highlightAreaInternal(n,e)},16)}clearHighlightedElement(){this.observeInterval&&(clearInterval(this.observeInterval),this.observeInterval=null),this.targetElement=null}hide(){It(this._element,!1),this.clearHighlightedElement()}}class Zt{constructor(){this._element=document.createElement("div"),this._element.classList.add("lm_transition_indicator"),document.body.appendChild(this._element),this._toElement=null,this._fromDimensions=null,this._totalAnimationDuration=200,this._animationStartTime=null}destroy(){this._element.remove()}transitionElements(t,e){}nextAnimationFrame(){}measure(t){const e=t.getBoundingClientRect();return{left:e.left,top:e.top,width:t.offsetWidth,height:t.offsetHeight}}}class Kt extends zt{constructor(t){super(),this._layoutManager=t,this._childEventListener=t=>this.onEventFromChild(t),globalThis.addEventListener(Kt.ChildEventName,this._childEventListener,{passive:!0})}emit(t,...e){"userBroadcast"===t?this.emitUserBroadcast(...e):super.emit(t,...e)}emitUserBroadcast(...t){this.handleUserBroadcastEvent("userBroadcast",t)}destroy(){globalThis.removeEventListener(Kt.ChildEventName,this._childEventListener)}handleUserBroadcastEvent(t,e){this._layoutManager.isSubWindow?this.propagateToParent(t,e):this.propagateToThisAndSubtree(t,e)}onEventFromChild(t){const e=t.detail;this.handleUserBroadcastEvent(e.eventName,e.args)}propagateToParent(t,e){const i={bubbles:!0,cancelable:!0,detail:{layoutManager:this._layoutManager,eventName:t,args:e}},n=new CustomEvent(Kt.ChildEventName,i),o=globalThis.opener;if(null===o)throw new H("EHPTP15778");o.dispatchEvent(n)}propagateToThisAndSubtree(t,e){this.emitUnknown(t,...e);for(let i=0;i<this._layoutManager.openPopouts.length;i++){const n=this._layoutManager.openPopouts[i].getGlInstance();n&&n.eventHub.propagateToThisAndSubtree(t,e)}}}!function(t){t.ChildEventName="gl_child_event"}(Kt||(Kt={}));class Xt extends zt{get container(){return this._containerElement}get isInitialised(){return this._isInitialised}get groundItem(){return this._groundItem}get root(){return this._groundItem}get openPopouts(){return this._openPopouts}get dropTargetIndicator(){return this._dropTargetIndicator}get transitionIndicator(){return this._transitionIndicator}get width(){return this._width}get height(){return this._height}get eventHub(){return this._eventHub}get rootItem(){if(void 0===this._groundItem)throw new Error("Cannot access rootItem before init");return 0===this._groundItem.contentItems.length?void 0:this._groundItem.contentItems[0]}get focusedComponentItem(){return this._focusedComponentItem}get tabDropPlaceholder(){return this._tabDropPlaceholder}get maximisedStack(){return this._maximisedStack}get deprecatedConstructor(){return!this.isSubWindow&&void 0!==this._constructorOrSubWindowLayoutConfig}constructor(t){super(),this.resizeWithContainerAutomatically=!1,this.resizeDebounceInterval=100,this.resizeDebounceExtendedWhenPossible=!0,this._isInitialised=!1,this._groundItem=void 0,this._openPopouts=[],this._dropTargetIndicator=null,this._transitionIndicator=null,this._itemAreas=[],this._maximisePlaceholder=Xt.createMaximisePlaceElement(document),this._tabDropPlaceholder=Xt.createTabDropPlaceholderElement(document),this._dragSources=[],this._updatingColumnsResponsive=!1,this._firstLoad=!0,this._eventHub=new Kt(this),this._width=null,this._height=null,this._virtualSizedContainers=[],this._virtualSizedContainerAddingBeginCount=0,this._sizeInvalidationBeginCount=0,this._resizeObserver=new ResizeObserver(()=>this.handleContainerResize()),this._windowBeforeUnloadListener=()=>this.onBeforeUnload(),this._windowBeforeUnloadListening=!1,this._maximisedStackBeforeDestroyedListener=t=>this.cleanupBeforeMaximisedStackDestroyed(t),this.isSubWindow=t.isSubWindow,this._constructorOrSubWindowLayoutConfig=t.constructorOrSubWindowLayoutConfig,T.checkInitialise(),Q.checkInitialise(),void 0!==t.containerElement&&(this._containerElement=t.containerElement)}destroy(){if(this._isInitialised){this._windowBeforeUnloadListening&&(globalThis.removeEventListener("beforeunload",this._windowBeforeUnloadListener),this._windowBeforeUnloadListening=!1),!0===this.layoutConfig.settings.closePopoutsOnUnload&&this.closeAllOpenPopouts(),this._resizeObserver.disconnect(),this.checkClearResizeTimeout(),void 0!==this._groundItem&&this._groundItem.destroy(),this._tabDropPlaceholder.remove(),null!==this._dropTargetIndicator&&this._dropTargetIndicator.destroy(),null!==this._transitionIndicator&&this._transitionIndicator.destroy(),this._eventHub.destroy();for(const t of this._dragSources)t.destroy();this._dragSources=[],this._isInitialised=!1}}minifyConfig(t){return at.minifyConfig(t)}unminifyConfig(t){return at.unminifyConfig(t)}init(){let t;if(this.setContainer(),this._dropTargetIndicator=new jt,this._transitionIndicator=new Zt,this.updateSizeFromContainer(),this.isSubWindow){if(void 0===this._constructorOrSubWindowLayoutConfig)throw new W("LMIU07155");{const e=this._constructorOrSubWindowLayoutConfig.root;if(void 0===e)throw new F("LMIC07156");if(!ht.isComponent(e))throw new F("LMIC07157");t=e;const i=ft.resolve(this._constructorOrSubWindowLayoutConfig);this.layoutConfig=Object.assign(Object.assign({},i),{root:void 0})}}else void 0===this._constructorOrSubWindowLayoutConfig?this.layoutConfig=at.createDefault():this.layoutConfig=ft.resolve(this._constructorOrSubWindowLayoutConfig);const e=this.layoutConfig;this._groundItem=new Ft(this,e.root,this._containerElement),this._groundItem.init(),this.checkLoadedLayoutMaximiseItem(),this._resizeObserver.observe(this._containerElement),this._isInitialised=!0,this.adjustColumnsResponsive(),this.emit("initialised"),void 0!==t&&this.loadComponentAsRoot(t)}loadLayout(t){if(!this.isInitialised)throw new Error("GoldenLayout: Need to call init() if LayoutConfig with defined root passed to constructor");if(void 0===this._groundItem)throw new W("LMLL11119");this.createSubWindows(),this.layoutConfig=ft.resolve(t),this._groundItem.loadRoot(this.layoutConfig.root),this.checkLoadedLayoutMaximiseItem(),this.adjustColumnsResponsive()}saveLayout(){if(!1===this._isInitialised)throw new Error("Can't create config, layout not yet initialised");if(void 0===this._groundItem)throw new W("LMTC18244");{const t=this._groundItem.calculateConfigContent();let e;e=1!==t.length?void 0:t[0],this.reconcilePopoutWindows();const i=[];for(let t=0;t<this._openPopouts.length;t++)i.push(this._openPopouts[t].toConfig());return{root:e,openPopouts:i,settings:at.Settings.createCopy(this.layoutConfig.settings),dimensions:at.Dimensions.createCopy(this.layoutConfig.dimensions),header:at.Header.createCopy(this.layoutConfig.header),resolved:!0}}}clear(){if(void 0===this._groundItem)throw new W("LMCL11129");this._groundItem.clearRoot()}toConfig(){return this.saveLayout()}newComponent(t,e,i){const n=this.newComponentAtLocation(t,e,i);if(void 0===n)throw new F("LMNC65588");return n}newComponentAtLocation(t,e,i,n){if(void 0===this._groundItem)throw new Error("Cannot add component before init");{const o=this.addComponentAtLocation(t,e,i,n);if(void 0===o)return;{const t=o.parentItem.contentItems[o.index];if(Pt.isComponentItem(t))return t;throw new F("LMNC992877533")}}}addComponent(t,e,i){const n=this.addComponentAtLocation(t,e,i);if(void 0===n)throw new F("LMAC99943");return n}addComponentAtLocation(t,e,i,n){const o={type:"component",componentType:t,componentState:e,title:i};return this.addItemAtLocation(o,n)}newItem(t){const e=this.newItemAtLocation(t);if(void 0===e)throw new F("LMNC65588");return e}newItemAtLocation(t,e){if(void 0===this._groundItem)throw new Error("Cannot add component before init");{const i=this.addItemAtLocation(t,e);if(void 0===i)return;return i.parentItem.contentItems[i.index]}}addItem(t){const e=this.addItemAtLocation(t);if(void 0===e)throw new F("LMAI99943");return e}addItemAtLocation(t,e){if(void 0===this._groundItem)throw new Error("Cannot add component before init");{void 0===e&&(e="component"===t.type?Xt.defaultLocationSelectors:Xt.defaultNonComponentSelectors);const i=this.findFirstLocation(e);if(void 0===i)return;{let e,n=i.parentItem;switch(n.type){case X.ground:e=n.addItem(t,i.index),e>=0?n=this._groundItem.contentItems[0]:e=0;break;case X.row:case X.column:e=n.addItem(t,i.index);break;case X.stack:if(ht.isComponent(t)){e=n.addItem(t,i.index);break}throw Error(N[6]);case X.component:throw new F("LMAIALC87444602");default:throw new U("LMAIALU98881733",n.type)}if(ht.isComponent(t)){const t=n.contentItems[e];Pt.isStack(t)&&(n=t,e=0)}return i.parentItem=n,i.index=e,i}}}loadComponentAsRoot(t){if(void 0===this._groundItem)throw new Error("Cannot add item before init");this._groundItem.loadComponentAsRoot(t)}updateSize(t,e){this.setSize(t,e)}setSize(t,e){if(this._width=t,this._height=e,!0===this._isInitialised){if(void 0===this._groundItem)throw new W("LMUS18881");if(this._groundItem.setSize(this._width,this._height),this._maximisedStack){const{width:t,height:e}=bt(this._containerElement);wt(this._maximisedStack.element,t),Ct(this._maximisedStack.element,e),this._maximisedStack.updateSize(!1)}this.adjustColumnsResponsive()}}beginSizeInvalidation(){this._sizeInvalidationBeginCount++}endSizeInvalidation(){0===--this._sizeInvalidationBeginCount&&this.updateSizeFromContainer()}updateSizeFromContainer(){const{width:t,height:e}=bt(this._containerElement);this.setSize(t,e)}updateRootSize(t=!1){if(void 0===this._groundItem)throw new W("LMURS28881");this._groundItem.updateSize(t)}createAndInitContentItem(t,e){const i=this.createContentItem(t,e);return i.init(),i}createContentItem(t,e){if("string"!=typeof t.type)throw new D("Missing parameter 'type'",JSON.stringify(t));if(tt.isComponentItem(t)&&!(e instanceof qt)&&e&&!(!0===this.isSubWindow&&e instanceof Ft)){t={type:X.stack,content:[t],size:t.size,sizeUnit:t.sizeUnit,minSize:t.minSize,minSizeUnit:t.minSizeUnit,id:t.id,maximised:t.maximised,isClosable:t.isClosable,activeItemIndex:0,header:void 0}}return this.createContentItemFromConfig(t,e)}findFirstComponentItemById(t){if(void 0===this._groundItem)throw new W("LMFFCIBI82446");return this.findFirstContentItemTypeByIdRecursive(X.component,t,this._groundItem)}createPopout(t,e,i,n){return t instanceof Pt?this.createPopoutFromContentItem(t,e,i,n):this.createPopoutFromItemConfig(t,e,i,n)}createPopoutFromContentItem(t,e,i,n){let o=t.parent,s=t;for(;null!==o&&1===o.contentItems.length&&!o.isGround;)s=o,o=o.parent;if(null===o)throw new H("LMCPFCI00834");{if(void 0===n&&(n=o.contentItems.indexOf(s)),null!==i&&o.addPopInParentId(i),void 0===e){const i=globalThis.screenX||globalThis.screenLeft,n=globalThis.screenY||globalThis.screenTop,o=t.element.offsetLeft,s=t.element.offsetTop,{width:r,height:a}=bt(t.element);e={left:i+o,top:n+s,width:r,height:a}}const r=t.toConfig();if(t.remove(),st.isRootItemConfig(r))return this.createPopoutFromItemConfig(r,e,i,n);throw new Error(`${N[0]}`)}}beginVirtualSizedContainerAdding(){0===++this._virtualSizedContainerAddingBeginCount&&(this._virtualSizedContainers.length=0)}addVirtualSizedContainer(t){this._virtualSizedContainers.push(t)}endVirtualSizedContainerAdding(){if(0===--this._virtualSizedContainerAddingBeginCount){const t=this._virtualSizedContainers.length;if(t>0){this.fireBeforeVirtualRectingEvent(t);for(let e=0;e<t;e++){this._virtualSizedContainers[e].notifyVirtualRectingRequired()}this.fireAfterVirtualRectingEvent(),this._virtualSizedContainers.length=0}}}fireBeforeVirtualRectingEvent(t){void 0!==this.beforeVirtualRectingEvent&&this.beforeVirtualRectingEvent(t)}fireAfterVirtualRectingEvent(){void 0!==this.afterVirtualRectingEvent&&this.afterVirtualRectingEvent()}createPopoutFromItemConfig(t,e,i,n){const o=this.toConfig(),s={root:t,openPopouts:[],settings:o.settings,dimensions:o.dimensions,header:o.header,window:e,parentId:i,indexInParent:n,resolved:!0};return this.createPopoutFromPopoutLayoutConfig(s)}createPopoutFromPopoutLayoutConfig(t){var e,i,n,o;const s=t.window,r={left:null!==(e=s.left)&&void 0!==e?e:globalThis.screenX||globalThis.screenLeft+20,top:null!==(i=s.top)&&void 0!==i?i:globalThis.screenY||globalThis.screenTop+20,width:null!==(n=s.width)&&void 0!==n?n:500,height:null!==(o=s.height)&&void 0!==o?o:309},a=new kt(t,r,this);return a.on("initialised",()=>this.emit("windowOpened",a)),a.on("closed",()=>this.reconcilePopoutWindows()),this._openPopouts.push(a),this.layoutConfig.settings.closePopoutsOnUnload&&!this._windowBeforeUnloadListening&&(globalThis.addEventListener("beforeunload",this._windowBeforeUnloadListener,{passive:!0}),this._windowBeforeUnloadListening=!0),a}closeAllOpenPopouts(){for(let t=0;t<this._openPopouts.length;t++)this._openPopouts[t].close();this._openPopouts.length=0,this._windowBeforeUnloadListening&&(globalThis.removeEventListener("beforeunload",this._windowBeforeUnloadListener),this._windowBeforeUnloadListening=!1)}newDragSource(t,e,i,n,o){const s=new $t(this,t,[],e,i,n,o);return this._dragSources.push(s),s}removeDragSource(t){!function(t,e){const i=e.indexOf(t);if(-1===i)throw new Error("Can't remove item from array. Item is not in the array");e.splice(i,1)}(t,this._dragSources),t.destroy()}startComponentDrag(t,e,i,n,o){new Gt(t,e,i,this,n,o)}focusComponent(t,e=!1){t.focus(e)}clearComponentFocus(t=!1){this.setFocusedComponentItem(void 0,t)}setFocusedComponentItem(t,e=!1){if(t!==this._focusedComponentItem){let i;if(void 0===t||(i=t.parentItem),void 0!==this._focusedComponentItem){const t=this._focusedComponentItem;this._focusedComponentItem=void 0,t.setBlurred(e);const n=t.parentItem;i===n?i=void 0:n.setFocusedValue(!1)}void 0!==t&&(this._focusedComponentItem=t,t.setFocused(e),void 0!==i&&i.setFocusedValue(!0))}}createContentItemFromConfig(t,e){switch(t.type){case X.ground:throw new F("LMCCIFC68871");case X.row:return new Vt(!1,this,t,e);case X.column:return new Vt(!0,this,t,e);case X.stack:return new qt(this,t,e);case X.component:return new Dt(this,t,e);default:throw new U("CCC913564",t.type,"Invalid Config Item type specified")}}setMaximisedStack(t){void 0===t?void 0!==this._maximisedStack&&this.processMinimiseMaximisedStack():t!==this._maximisedStack&&(void 0!==this._maximisedStack&&this.processMinimiseMaximisedStack(),this.processMaximiseStack(t))}checkMinimiseMaximisedStack(){void 0!==this._maximisedStack&&this._maximisedStack.minimise()}cleanupBeforeMaximisedStackDestroyed(t){null!==this._maximisedStack&&this._maximisedStack===t.target&&(this._maximisedStack.off("beforeItemDestroyed",this._maximisedStackBeforeDestroyedListener),this._maximisedStack=void 0)}closeWindow(){globalThis.setTimeout(()=>globalThis.close(),1)}getArea(t,e){let i=null,n=1/0;for(let o=0;o<this._itemAreas.length;o++){const s=this._itemAreas[o];t>=s.x1&&t<s.x2&&e>=s.y1&&e<s.y2&&n>s.surface&&(n=s.surface,i=s)}return i}calculateItemAreas(){const t=this.getAllContentItems(),e=this._groundItem;if(void 0===e)throw new W("LMCIAR44365");if(1===t.length){const t=e.getElementArea();if(null===t)throw new H("LMCIARA44365");return void(this._itemAreas=[t])}e.contentItems[0].isStack?this._itemAreas=[]:this._itemAreas=e.createSideAreas();for(let e=0;e<t.length;e++){const i=t[e];if(Pt.isStack(i)){const t=i.getArea();if(null===t)continue;{this._itemAreas.push(t);const e=i.contentAreaDimensions;if(void 0===e)throw new W("LMCIASC45599");{const t=e.header.highlightArea,n=(t.x2-t.x1)*(t.y2-t.y1),o={x1:t.x1,x2:t.x2,y1:t.y1,y2:t.y2,contentItem:i,surface:n};this._itemAreas.push(o)}}}}}checkLoadedLayoutMaximiseItem(){if(void 0===this._groundItem)throw new W("LMCLLMI43432");{const t=this._groundItem.getConfigMaximisedItems();if(t.length>0){let e=t[0];if(Pt.isComponentItem(e)){const t=e.parent;if(null===t)throw new H("LMXLLMI69999");e=t}if(!Pt.isStack(e))throw new F("LMCLLMI19993");e.maximise()}}}processMaximiseStack(t){if(this._maximisedStack=t,t.on("beforeItemDestroyed",this._maximisedStackBeforeDestroyedListener),t.element.classList.add("lm_maximised"),t.element.insertAdjacentElement("afterend",this._maximisePlaceholder),void 0===this._groundItem)throw new W("LMMXI19993");{this._groundItem.element.prepend(t.element);const{width:e,height:i}=bt(this._containerElement);wt(t.element,e),Ct(t.element,i),t.updateSize(!0),t.focusActiveContentItem(),this._maximisedStack.emit("maximised"),this.emit("stateChanged")}}processMinimiseMaximisedStack(){if(void 0===this._maximisedStack)throw new F("LMMMS74422");{const t=this._maximisedStack;if(null===t.parent)throw new H("LMMI13668");t.element.classList.remove("lm_maximised"),this._maximisePlaceholder.insertAdjacentElement("afterend",t.element),this._maximisePlaceholder.remove(),this.updateRootSize(!0),this._maximisedStack=void 0,t.off("beforeItemDestroyed",this._maximisedStackBeforeDestroyedListener),t.emit("minimised"),this.emit("stateChanged")}}reconcilePopoutWindows(){const t=[];for(let e=0;e<this._openPopouts.length;e++)!1===this._openPopouts[e].getWindow().closed?t.push(this._openPopouts[e]):this.emit("windowClosed",this._openPopouts[e]);this._openPopouts.length!==t.length&&(this._openPopouts=t,this.emit("stateChanged"))}getAllContentItems(){if(void 0===this._groundItem)throw new W("LMGACI13130");return this._groundItem.getAllContentItems()}createSubWindows(){for(let t=0;t<this.layoutConfig.openPopouts.length;t++){const e=this.layoutConfig.openPopouts[t];this.createPopoutFromPopoutLayoutConfig(e)}}handleContainerResize(){this.resizeWithContainerAutomatically&&this.processResizeWithDebounce()}processResizeWithDebounce(){this.resizeDebounceExtendedWhenPossible&&this.checkClearResizeTimeout(),void 0===this._resizeTimeoutId&&(this._resizeTimeoutId=setTimeout(()=>{this._resizeTimeoutId=void 0,this.beginSizeInvalidation(),this.endSizeInvalidation()},this.resizeDebounceInterval))}checkClearResizeTimeout(){void 0!==this._resizeTimeoutId&&(clearTimeout(this._resizeTimeoutId),this._resizeTimeoutId=void 0)}setContainer(){var t;const e=document.body,i=null!==(t=this._containerElement)&&void 0!==t?t:e;if(i===e){this.resizeWithContainerAutomatically=!0;const t=document.documentElement;t.style.height="100%",t.style.margin="0",t.style.padding="0",t.style.overflow="clip",e.style.height="100%",e.style.margin="0",e.style.padding="0",e.style.overflow="clip"}this._containerElement=i}onBeforeUnload(){this.destroy()}adjustColumnsResponsive(){if(void 0===this._groundItem)throw new W("LMACR20883");if(this._firstLoad=!1,this.useResponsiveLayout()&&!this._updatingColumnsResponsive&&this._groundItem.contentItems.length>0&&this._groundItem.contentItems[0].isRow){if(void 0===this._groundItem||null===this._width)throw new W("LMACR77412");{const t=this._groundItem.contentItems[0].contentItems.length;if(t<=1)return;{const e=this.layoutConfig.dimensions.defaultMinItemWidth;if(t*e<=this._width)return;{this._updatingColumnsResponsive=!0;const i=t-Math.max(Math.floor(this._width/e),1),n=this._groundItem.contentItems[0],o=this.getAllStacks();if(0===o.length)throw new F("LMACRS77413");{const t=o[0];for(let e=0;e<i;e++){const e=n.contentItems[n.contentItems.length-1];this.addChildContentItemsToContainer(t,e)}this._updatingColumnsResponsive=!1}}}}}}useResponsiveLayout(){const t=this.layoutConfig.settings,e=t.responsiveMode===Y.always,i=t.responsiveMode===Y.onload&&this._firstLoad;return e||i}addChildContentItemsToContainer(t,e){const i=e.contentItems;if(e instanceof qt)for(let n=0;n<i.length;n++){const o=i[n];e.removeChild(o,!0),t.addChild(o)}else for(let e=0;e<i.length;e++){const n=i[e];this.addChildContentItemsToContainer(t,n)}}getAllStacks(){if(void 0===this._groundItem)throw new W("LMFASC52778");{const t=[];return this.findAllStacksRecursive(t,this._groundItem),t}}findFirstContentItemType(t){if(void 0===this._groundItem)throw new W("LMFFCIT82446");return this.findFirstContentItemTypeRecursive(t,this._groundItem)}findFirstContentItemTypeRecursive(t,e){const i=e.contentItems,n=i.length;if(0!==n){for(let e=0;e<n;e++){const n=i[e];if(n.type===t)return n}for(let e=0;e<n;e++){const n=i[e],o=this.findFirstContentItemTypeRecursive(t,n);if(void 0!==o)return o}}}findFirstContentItemTypeByIdRecursive(t,e,i){const n=i.contentItems,o=n.length;if(0!==o){for(let i=0;i<o;i++){const o=n[i];if(o.type===t&&o.id===e)return o}for(let i=0;i<o;i++){const o=n[i],s=this.findFirstContentItemTypeByIdRecursive(t,e,o);if(void 0!==s)return s}}}findAllStacksRecursive(t,e){const i=e.contentItems;for(let e=0;e<i.length;e++){const n=i[e];n instanceof qt?t.push(n):n.isComponent||this.findAllStacksRecursive(t,n)}}findFirstLocation(t){const e=t.length;for(let i=0;i<e;i++){const e=t[i],n=this.findLocation(e);if(void 0!==n)return n}}findLocation(t){const e=t.index;switch(t.typeId){case 0:if(void 0===this._focusedComponentItem)return;{const t=this._focusedComponentItem.parentItem,i=t.contentItems,n=i.length;if(void 0===e)return{parentItem:t,index:n};{const o=i.indexOf(this._focusedComponentItem)+e;return o<0||o>n?void 0:{parentItem:t,index:o}}}case 1:if(void 0===this._focusedComponentItem)return;{const t=this._focusedComponentItem.parentItem;return this.tryCreateLocationFromParentItem(t,e)}case 2:{const t=this.findFirstContentItemType(X.stack);return void 0===t?void 0:this.tryCreateLocationFromParentItem(t,e)}case 3:{let t=this.findFirstContentItemType(X.row);return void 0!==t?this.tryCreateLocationFromParentItem(t,e):(t=this.findFirstContentItemType(X.column),void 0!==t?this.tryCreateLocationFromParentItem(t,e):void 0)}case 4:{const t=this.findFirstContentItemType(X.row);return void 0===t?void 0:this.tryCreateLocationFromParentItem(t,e)}case 5:{const t=this.findFirstContentItemType(X.column);return void 0===t?void 0:this.tryCreateLocationFromParentItem(t,e)}case 6:if(void 0===this._groundItem)throw new W("LMFLRIF18244");return void 0!==this.rootItem?void 0:void 0===e||0===e?{parentItem:this._groundItem,index:0}:void 0;case 7:if(void 0===this._groundItem)throw new W("LMFLF18244");{const t=this._groundItem.contentItems;if(0===t.length)return void 0===e||0===e?{parentItem:this._groundItem,index:0}:void 0;{const i=t[0];return this.tryCreateLocationFromParentItem(i,e)}}}}tryCreateLocationFromParentItem(t,e){const i=t.contentItems.length;return void 0===e?{parentItem:t,index:i}:e<0||e>i?void 0:{parentItem:t,index:e}}}!function(t){t.createMaximisePlaceElement=function(t){const e=t.createElement("div");return e.classList.add("lm_maximise_place"),e},t.createTabDropPlaceholderElement=function(t){const e=t.createElement("div");return e.classList.add("lm_drop_tab_placeholder"),e},t.defaultNonComponentSelectors=[{typeId:3,index:void 0},{typeId:7,index:void 0}],t.defaultLocationSelectors=[{typeId:1,index:void 0},{typeId:2,index:void 0},...t.defaultNonComponentSelectors],t.afterFocusedItemIfPossibleLocationSelectors=[{typeId:0,index:1},{typeId:2,index:void 0},{typeId:3,index:void 0},{typeId:7,index:void 0}]}(Xt||(Xt={}));class Yt extends Xt{constructor(t,e,i,n){if(super(Yt.createLayoutManagerConstructorParameters(t,e)),this._bindComponentEventHanlderPassedInConstructor=!1,this._creationTimeoutPassed=!1,void 0!==e&&"function"==typeof e&&(this.bindComponentEvent=e,this._bindComponentEventHanlderPassedInConstructor=!0,void 0!==i&&(this.unbindComponentEvent=i)),!this._bindComponentEventHanlderPassedInConstructor&&this.isSubWindow){if(void 0===this._constructorOrSubWindowLayoutConfig)throw new W("VLC98823");{const t=ft.resolve(this._constructorOrSubWindowLayoutConfig);this.layoutConfig=Object.assign(Object.assign({},t),{root:void 0})}}!0!==n&&(this.deprecatedConstructor||this.init())}destroy(){this.bindComponentEvent=void 0,this.unbindComponentEvent=void 0,super.destroy()}init(){if(this._bindComponentEventHanlderPassedInConstructor||"loading"!==document.readyState&&null!==document.body){if(!this._bindComponentEventHanlderPassedInConstructor&&!0===this.isSubWindow&&!this._creationTimeoutPassed)return setTimeout(()=>this.init(),7),void(this._creationTimeoutPassed=!0);!0===this.isSubWindow&&(this._bindComponentEventHanlderPassedInConstructor||this.clearHtmlAndAdjustStylesForSubWindow(),window.__glInstance=this),super.init()}else document.addEventListener("DOMContentLoaded",()=>this.init(),{passive:!0})}clearHtmlAndAdjustStylesForSubWindow(){const t=document.head,e=new Array(4);e[0]=document.querySelectorAll("body link"),e[1]=document.querySelectorAll("body style"),e[2]=document.querySelectorAll("template"),e[3]=document.querySelectorAll(".gl_keep");for(let i=0;i<e.length;i++){const n=e[i];for(let e=0;e<n.length;e++){const i=n[e];t.appendChild(i)}}const i=document.body;i.innerHTML="",i.style.visibility="visible",this.checkAddDefaultPopinButton(),document.body.offsetHeight}checkAddDefaultPopinButton(){if(this.layoutConfig.settings.popInOnClose)return!1;{const t=document.createElement("div");t.classList.add("lm_popin"),t.setAttribute("title",this.layoutConfig.header.dock);const e=document.createElement("div");e.classList.add("lm_icon");const i=document.createElement("div");return i.classList.add("lm_bg"),t.appendChild(e),t.appendChild(i),t.addEventListener("click",()=>this.emit("popIn")),document.body.appendChild(t),!0}}bindComponent(t,e){if(void 0!==this.bindComponentEvent){return this.bindComponentEvent(t,e)}if(void 0!==this.getComponentEvent)return{virtual:!1,component:this.getComponentEvent(t,e)};{const t=`${N[2]}: ${JSON.stringify(e)}`;throw new B(t)}}unbindComponent(t,e,i){if(void 0!==this.unbindComponentEvent)this.unbindComponentEvent(t);else if(!e&&void 0!==this.releaseComponentEvent){if(void 0===i)throw new W("VCUCRCU333998");this.releaseComponentEvent(t,i)}}}!function(t){let e=!1;t.createLayoutManagerConstructorParameters=function(t,i){const n=e?null:new URL(document.location.href).searchParams.get("gl-window");e=!0;const o=null!==n;let s,r;if(null!==n){const e=localStorage.getItem(n);if(null===e)throw new Error("Null gl-window Config");localStorage.removeItem(n);const i=JSON.parse(e),o=at.unminifyConfig(i);r=ft.fromResolved(o),t instanceof HTMLElement&&(s=t)}else void 0===t?r=void 0:t instanceof HTMLElement?(r=void 0,s=t):r=t,void 0===s&&i instanceof HTMLElement&&(s=i);return{constructorOrSubWindowLayoutConfig:r,isSubWindow:o,containerElement:s}}}(Yt||(Yt={}));class Jt extends Yt{constructor(t,e,i){super(t,e,i,!0),this._componentTypesMap=new Map,this._registeredComponentMap=new Map,this._virtuableComponentMap=new Map,this._containerVirtualRectingRequiredEventListener=(t,e,i)=>this.handleContainerVirtualRectingRequiredEvent(t,e,i),this._containerVirtualVisibilityChangeRequiredEventListener=(t,e)=>this.handleContainerVirtualVisibilityChangeRequiredEvent(t,e),this._containerVirtualZIndexChangeRequiredEventListener=(t,e,i)=>this.handleContainerVirtualZIndexChangeRequiredEvent(t,e,i),this.deprecatedConstructor||this.init()}registerComponent(t,e,i=!1){if("function"!=typeof e)throw new R("registerComponent() componentConstructorOrFactoryFtn parameter is not a function");if(e.hasOwnProperty("prototype")){const n=e;this.registerComponentConstructor(t,n,i)}else{const n=e;this.registerComponentFactoryFunction(t,n,i)}}registerComponentConstructor(t,e,i=!1){if("function"!=typeof e)throw new Error(N[1]);if(void 0!==this._componentTypesMap.get(t))throw new B(`${N[3]}: ${t}`);this._componentTypesMap.set(t,{constructor:e,factoryFunction:void 0,virtual:i})}registerComponentFactoryFunction(t,e,i=!1){if("function"!=typeof e)throw new B("Please register a constructor function");if(void 0!==this._componentTypesMap.get(t))throw new B(`${N[3]}: ${t}`);this._componentTypesMap.set(t,{constructor:void 0,factoryFunction:e,virtual:i})}registerComponentFunction(t){this.registerGetComponentConstructorCallback(t)}registerGetComponentConstructorCallback(t){if("function"!=typeof t)throw new Error("Please register a callback function");void 0!==this._getComponentConstructorFtn&&console.warn("Multiple component functions are being registered.  Only the final registered function will be used."),this._getComponentConstructorFtn=t}getRegisteredComponentTypeNames(){const t=this._componentTypesMap.keys();return Array.from(t)}getComponentInstantiator(t){let e;const i=nt.resolveComponentTypeName(t);return void 0!==i&&(e=this._componentTypesMap.get(i)),void 0===e&&void 0!==this._getComponentConstructorFtn&&(e={constructor:this._getComponentConstructorFtn(t),factoryFunction:void 0,virtual:!1}),e}bindComponent(t,e){let i;const n=nt.resolveComponentTypeName(e);let o;if(void 0!==n&&(i=this._componentTypesMap.get(n)),void 0===i&&void 0!==this._getComponentConstructorFtn&&(i={constructor:this._getComponentConstructorFtn(e),factoryFunction:void 0,virtual:!1}),void 0!==i){const s=i.virtual;let r,a;r=void 0===e.componentState?void 0:St({},e.componentState);const l=i.constructor;if(void 0!==l)a=new l(t,r,s);else{const e=i.factoryFunction;if(void 0===e)throw new F("LMBCFFU10008");a=e(t,r,s)}if(s){if(void 0===a)throw new W("GLBCVCU988774");{const e=a,i=e.rootHtmlElement;if(void 0===i)throw new B(`${N[5]}: ${n}`);!function(t){const e="absolute";t.style.position!==e&&(t.style.position=e)}(i),this.container.appendChild(i),this._virtuableComponentMap.set(t,e),t.virtualRectingRequiredEvent=this._containerVirtualRectingRequiredEventListener,t.virtualVisibilityChangeRequiredEvent=this._containerVirtualVisibilityChangeRequiredEventListener,t.virtualZIndexChangeRequiredEvent=this._containerVirtualZIndexChangeRequiredEventListener}}this._registeredComponentMap.set(t,a),o={virtual:i.virtual,component:a}}else o=super.bindComponent(t,e);return o}unbindComponent(t,e,i){if(void 0===this._registeredComponentMap.get(t))super.unbindComponent(t,e,i);else{const e=this._virtuableComponentMap.get(t);if(void 0!==e){const i=e.rootHtmlElement;if(void 0===i)throw new F("GLUC77743",t.title);this.container.removeChild(i),this._virtuableComponentMap.delete(t)}}}fireBeforeVirtualRectingEvent(t){this._goldenLayoutBoundingClientRect=this.container.getBoundingClientRect(),super.fireBeforeVirtualRectingEvent(t)}handleContainerVirtualRectingRequiredEvent(t,e,i){const n=this._virtuableComponentMap.get(t);if(void 0===n)throw new W("GLHCSCE55933");{const o=n.rootHtmlElement;if(void 0===o)throw new B(N[4]+" "+t.title);{const n=t.element.getBoundingClientRect(),s=n.left-this._goldenLayoutBoundingClientRect.left;o.style.left=vt(s);const r=n.top-this._goldenLayoutBoundingClientRect.top;o.style.top=vt(r),wt(o,e),Ct(o,i)}}}handleContainerVirtualVisibilityChangeRequiredEvent(t,e){const i=this._virtuableComponentMap.get(t);if(void 0===i)throw new W("GLHCVVCRE55934");{const n=i.rootHtmlElement;if(void 0===n)throw new B(N[4]+" "+t.title);It(n,e)}}handleContainerVirtualZIndexChangeRequiredEvent(t,e,i){const n=this._virtuableComponentMap.get(t);if(void 0===n)throw new W("GLHCVZICRE55935");{const e=n.rootHtmlElement;if(void 0===e)throw new B(N[4]+" "+t.title);e.style.zIndex=i}}}const Qt="initial_",te={show:"top",popout:!1,close:"close-tab-unused"},ee={headerHeight:31},ie={hasHeaders:!0,reorderEnabled:!0,showMaximiseIcon:!1},ne={popoutWholeStack:!1,constrainDragToContainer:!1,constrainDragToHeaders:!1,preventDragout:!1,showPopoutIcon:!1,showCloseIcon:!1,blockedPopoutsThrowError:!0,closePopoutsOnUnload:!0,selectionEnabled:!1};var oe,se,re,ae;class le{constructor(e){oe.set(this,void 0),se.set(this,void 0),re.set(this,void 0),ae.set(this,void 0),this.handleResize=t=>{t.forEach(t=>this.resizeElement(t.target))},this.handleMutation=()=>{t.__classPrivateFieldGet(this,ae,"f").layoutViewsByContainerElement.forEach(t=>{this.resizeElement(t.container.element)})},this.handleIntersection=t=>{t.forEach(t=>{t.isIntersecting&&this.handleMutation()})},t.__classPrivateFieldSet(this,ae,e,"f"),t.__classPrivateFieldSet(this,oe,new ResizeObserver(this.handleResize),"f"),t.__classPrivateFieldSet(this,se,new MutationObserver(this.handleMutation),"f"),t.__classPrivateFieldSet(this,re,new IntersectionObserver(this.handleIntersection,{root:null,rootMargin:"0px",threshold:Array.from({length:1001},(t,e)=>e/1e3)}),"f")}observeMutations(e){t.__classPrivateFieldGet(this,se,"f")?.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["class"]})}destroy(){t.__classPrivateFieldGet(this,oe,"f").disconnect(),t.__classPrivateFieldGet(this,se,"f").disconnect(),t.__classPrivateFieldGet(this,re,"f").disconnect()}observeContainer(e){t.__classPrivateFieldGet(this,oe,"f").observe(e)}unobserveContainer(e){t.__classPrivateFieldGet(this,oe,"f").unobserve(e)}observeIntersection(e){t.__classPrivateFieldGet(this,re,"f").observe(e)}unobserveIntersection(e){t.__classPrivateFieldGet(this,re,"f").unobserve(e)}resizeElement(e){const i=t.__classPrivateFieldGet(this,ae,"f").layoutViewsByContainerElement.get(e);i&&i.resize()}}oe=new WeakMap,se=new WeakMap,re=new WeakMap,ae=new WeakMap;class he{constructor(t,e,i){this._item=t,this._layout=e,this._wrap=i}get raw(){return this._item}get layout(){return this._layout}get type(){return this._item.type}get contentItems(){return(this._item.contentItems??[]).map(t=>this._wrap(t))}get parent(){const t=this._item.parent;return t?this._wrap(t):null}setActiveContentItem(t,e){if("stack"!==this.type)throw new Error(`Cannot call setActiveContentItem from a non-stack item: ${this.type}`);this._item.setActiveContentItem(t.raw,e)}static wrapInternal(t,e,i){const n=he.wrapCache.get(e);if(n)return n;const o=new t(e,i,e=>he.wrapInternal(t,e,i));return he.wrapCache.set(e,o),o}}he.wrapCache=new WeakMap;const de=t=>!!t&&"contentItems"in t&&(t.isRow||t.isColumn);class ce extends he{isRoot(){return!!this._item.parent?.isGround}getBounds(){return this._item.element.getBoundingClientRect()}get viewName(){if(this._item.isComponent){const{component:t}=this._item;return t.identity.name}throw new Error("View name not found")}onDestroyed(t){const e=({target:i})=>{i===this._item&&(t(),this._item.off("itemDestroyed",e))};this._item.on("itemDestroyed",e)}createAdjacentStack({position:t="right"}={}){const e=this.raw;if(e.parent){const i=["top","bottom"].includes(t)?"column":"row",n=["left","top"].includes(t)?1:0,o=de(e.parent)?e.parent:e.layoutManager,s=o,r=e.parent.contentItems.indexOf(e);e.parent.isGround&&e.parent.removeChild(e,!0);const a=o.newItem({type:i,content:[{type:"stack",content:[]}]},r);if(!a)throw new Error("createAdjacentStack: Failed to create new container");const l=a.contentItems[0];return a.addChild(this.raw,n),de(s)&&s.removeChild(e,!0),this._wrap(l)}throw new Error("Cannot create adjacent stack if no parent exists.")}setActiveContentItem(t,e=!0){if(!qt.isStack(this._item))throw new Error(`Cannot call setActiveContentItem from a non-stack item: ${this.type}`);this._item.setActiveComponentItem(t.raw,!e)}static wrap(t,e){return he.wrapInternal(ce,t,e)}}const ue=t.makeKeyChecker()(["newTabButtonUrl","preventSplitterResize","constrainDragToHeaders","preventDragIn","preventDragOut","disableTabOverflowDropdown","defaultFaviconUrl","showFavicons"]);function me(t=[],e){for(const i of t)"component"===i.type?Object.keys(e).forEach(t=>{t in i&&(i.componentState={[`${Qt}${t}`]:i[t],...i.componentState}),i[t]=e[t]}):me(i.content,e)}function pe(t=[],e,i){for(const n of t)if("component"===n.type)Object.keys(e).forEach(t=>{if(`${Qt}${t}`in n.componentState)return n[t]=n.componentState[`${Qt}${t}`],void delete n.componentState[`${Qt}${t}`];n[t]=e[t]});else{if(n.size&&("row"===i||"column"===i)){n["row"===i?"width":"height"]=n.size?.includes(".")?parseFloat(n.size):parseInt(n.size)}pe(n.content,e,n.type)}}function fe(t,e){if(t.root){t.root.content&&pe([t.root],{componentName:"view",isClosable:!0});const e=t.root;t.content=[e],delete t.root}return e.settings&&ue.forEach(i=>{i in e.settings&&!(i in t.settings)&&(t.settings[i]=e.settings[i])}),t}function ge(t){return t&&"string"==typeof t?function(t){let e=t,i="",n=0;for(;e!==i&&n<10;)i=e,e=s.decode(e),n++;return n>=10?"Unknown Title":e}(t):t}const ve=t=>{for(const e of t){if("component"===e.type&&"componentState"in e){const{componentState:t,...i}=e;"object"==typeof e.componentState&&(e.componentState={...e.componentState,...i})}if("stack"===e.type&&e.content&&"activeItemIndex"in e){const t=e.content.length-1;e.activeItemIndex>t&&(e.activeItemIndex=t>=0?t:0)}"content"in e&&ve(e.content)}},ye=e=>class extends e{constructor(){super(...arguments),this.#t=null,this.#e=null,this.#i=!1,this.favicon=null}#t;#e;#i;#n(t){this.favicon=t,this.dispatchEvent(new CustomEvent("page-favicon-updated",{detail:{favicon:t}}))}#o(){const e=this.iframe;if(e&&e.contentDocument?.head&&e.contentWindow&&window.top&&t.isSameOrigin(e.contentWindow.window,window.top)&&(this.#t=t.getTitleObserver(e.contentDocument.head,t=>this.dispatchEvent(new CustomEvent("page-title-updated",{detail:{title:t}}))),this.dispatchEvent(new CustomEvent("page-title-updated",{detail:{title:e.contentDocument.title}})),this.showFavicon)){this.#e=t.getFaviconObserver(e.contentDocument.head,t=>this.#n(t));const i=e.contentDocument.querySelector('link[rel~="icon"]')?.href;i&&this.#n(i)}}#s(){this.#t&&(this.#t.disconnect(),this.#t=null),this.#e&&(this.#e.disconnect(),this.#e=null)}get lastKnownUrl(){return this.iframe?.contentDocument?.location.href}getOrDiscoverFavicon(){if(!this.#i)return Promise.resolve(null);const e=this.iframe;if(!e)return Promise.resolve(null);return!!(e.contentDocument?.head&&e.contentWindow&&window.top&&t.isSameOrigin(e.contentWindow,window.top))&&e.contentDocument?(this.#e||(this.#e=t.getFaviconObserver(e.contentDocument.head,t=>this.#n(t))),Promise.resolve(e.contentDocument.querySelector('link[rel~="icon"]')?.href??null)):Promise.resolve(null)}connectedCallback(){if(!this.name||!this.uuid)throw new Error("<of-view> Name or uuid attribute missing");if(!this.src)throw new Error("<of-view> missing 'src' attribute.");if(!this.iframe){const e=document.createElement("iframe");e.addEventListener("load",()=>{this.#i=!0,this.#o()}),e.addEventListener("unload",()=>{this.#s()}),e.src=this.src,this.allow&&(e.allow=this.allow),e.style.height="100%",e.style.width="100%",e.style.border="none",this.forceFrameName?e.setAttribute("name",this.forceFrameName):e.setAttribute("name",t.encodeOptions({brokerUrl:this.brokerUrl,name:this.name,uuid:this.uuid,providerId:this.providerId,contextGroup:this.contextGroup},"of-frame")),e.setAttribute("id",this.name),this.appendChild(e)}}get iframe(){return this.querySelector(`iframe[id="${this.name}"]`)}get title(){return this.getAttribute("title")??this.iframe?.title??""}set title(t){this.setAttribute("title",t),this.iframe&&(this.iframe.title=t)}get brokerUrl(){return this.getAttribute("of-broker")}set brokerUrl(t){t&&this.setAttribute("of-broker",t)}get name(){return this.getAttribute("of-name")}set name(t){t&&this.setAttribute("of-name",t)}get forceFrameName(){return this.getAttribute("forceFrameName")}set forceFrameName(t){t&&this.setAttribute("forceFrameName",t)}get uuid(){return this.getAttribute("of-uuid")}set uuid(t){t&&this.setAttribute("of-uuid",t)}get src(){return this.getAttribute("src")}set src(t){t&&this.setAttribute("src",t)}get providerId(){return this.getAttribute("of-provider-id")}set providerId(t){t&&this.setAttribute("of-provider-id",t)}get contextGroup(){return this.getAttribute("of-context-group")}set contextGroup(t){t&&this.setAttribute("of-context-group",t)}get allow(){return this.getAttribute("allow")}set allow(t){t&&this.setAttribute("allow",t)}get showFavicon(){return this.hasAttribute("of-show-favicon")}set showFavicon(t){t?this.setAttribute("of-show-favicon",""):this.removeAttribute("of-show-favicon")}static get observedAttributes(){return["name"]}};class _e{static create(t){const e=document.createElement("of-view");return Object.entries(t).forEach(([t,i])=>{e.setAttribute(t,i)}),e}}customElements.define("of-view",ye(HTMLElement));const we=t.clientLogger.getLogger("of-view");class Ce{constructor(t,e,i,o){const{url:s,web:r,interop:a,name:l}=t;if(this.identity={uuid:e,name:l??`internal-generated-view-${n.v4()}`},this.componentState=t,this.state={...t},void 0===s)return void(this.ofViewElement=null);this.state.url=s;const h={"of-broker":i.brokerUrl,"of-uuid":e,"of-name":this.identity.name,src:s};r?.frameName&&(h.forceFrameName=r.frameName);const d=a?.currentContextGroup??i.interopConfig?.currentContextGroup;d&&(h["of-context-group"]=d),i.interopConfig?.providerId&&(h["of-provider-id"]=i.interopConfig.providerId),t.permissions?.webAPIs&&(h.allow=t.permissions.webAPIs.reduce((t,e)=>{const i=(t=>{switch(t){case"clipboard-read":return"clipboard-read";case"clipboard-sanitized-write":return"clipboard-write";default:return""}})(e);return i?`${t} ${i} *;`.trim():t},""),we.debug(`Applying webAPIs: ${h.allow}`)),this.ofViewElement=_e.create(h),this.ofViewElement.style.position="absolute",o.appendChild(this.ofViewElement)}hide(){this.ofViewElement&&(this.ofViewElement.style.display="none")}show(){this.ofViewElement&&(this.ofViewElement.style.display="block")}setTitle(t){this.ofViewElement&&(this.ofViewElement.title=t)}get lastKnownUrl(){return this.ofViewElement?.lastKnownUrl}get favicon(){return this.ofViewElement?.favicon??null}destroy(){this.ofViewElement?.remove()}}var be,Ie,Ee,Se;const Te=t.clientLogger.getLogger("view-component");class xe{constructor(e,i,n){if(this.container=e,this.ofView=i,be.set(this,!1),Ie.set(this,null),Ee.set(this,null),Se.set(this,void 0),e.element.setAttribute("of-name",i.identity.name),e.element.id=`container-${i.identity.name}`,e.parent.id=i.identity.name,t.__classPrivateFieldSet(this,Se,n?.defaultFaviconUrl??null,"f"),"view"!==e.parent.title&&(i.state.title=e.parent.title),i.ofViewElement){this.setTitle(i.state.title),t.__classPrivateFieldSet(this,Ie,t=>{const{detail:e}=t,n="options"===i.state.titlePriority?i.state.title:e.title;this.setTitle(n)},"f"),i.ofViewElement.addEventListener("page-title-updated",t.__classPrivateFieldGet(this,Ie,"f"));const e=!1!==n?.showFavicons;i.ofViewElement.showFavicon=e,e&&(t.__classPrivateFieldSet(this,Ee,t=>{const e=t.detail?.favicon;this.setFavicon(e)},"f"),i.ofViewElement.addEventListener("page-favicon-updated",t.__classPrivateFieldGet(this,Ee,"f"))),i.show()}else this.handleUrlMissing()}get identity(){return this.ofView.identity}get componentState(){return this.ofView.componentState}handleUrlMissing(){const t=document.createElement("div");t.setAttribute("style","padding: 20px"),t.innerText="No URL provided",this.container.element.appendChild(t)}setFavicon(e){e&&this.ofView.ofViewElement&&(this.ofView.ofViewElement.favicon=e),this.container.tab&&(this.ofView.componentState?.icon?this.container.tab.setIcon(this.ofView.componentState?.icon,t.__classPrivateFieldGet(this,Se,"f")):e?this.container.tab.setIcon(e,t.__classPrivateFieldGet(this,Se,"f")):this.container.tab.setIcon(t.__classPrivateFieldGet(this,Se,"f")))}setTitle(t){const e=ge("options"===this.ofView.state.titlePriority?this.ofView.state.title||this.ofView.identity.name:t||this.ofView.state.title||this.ofView.lastKnownUrl||this.ofView.state.url);e&&(Te.debug(`${this.ofView.identity.name} setting title to ${e}`),this.container.parent.setTitle(e),this.ofView.setTitle(e))}isActive(){return this.container.tab?.element.className.includes("lm_active")??!1}isDragging(){return this.container.tab?.element.className.includes("lm_dragging")??!1}setIsMinimised(e){t.__classPrivateFieldSet(this,be,e,"f")}focusContent(){const t=this.ofView.ofViewElement?.iframe;t?.contentWindow?t.contentWindow.focus():t?t.focus():this.ofView.ofViewElement?.focus()}toggleZIndex(t){this.ofView.ofViewElement&&(this.ofView.ofViewElement.style.zIndex=t?"99":"")}resize(){const e=this.ofView.ofViewElement;if(!e)return;if(this.isDragging()||t.__classPrivateFieldGet(this,be,"f"))return void(e.style.display="none");const i=this.container.element.getBoundingClientRect();e.style.position="absolute",e.style.height=`${i.height}px`,e.style.width=`${i.width}px`,e.style.inset=`${i.top}px ${i.right}px ${i.bottom}px ${i.left}px`,e.style.display="block"}closeView(){this.container.close()}destroy(){const e=this.ofView.ofViewElement;e&&(t.__classPrivateFieldGet(this,Ie,"f")&&(e.removeEventListener("page-title-updated",t.__classPrivateFieldGet(this,Ie,"f")),t.__classPrivateFieldSet(this,Ie,null,"f")),t.__classPrivateFieldGet(this,Ee,"f")&&(e.removeEventListener("page-favicon-updated",t.__classPrivateFieldGet(this,Ee,"f")),t.__classPrivateFieldSet(this,Ee,null,"f"))),this.ofView.hide()}}be=new WeakMap,Ie=new WeakMap,Ee=new WeakMap,Se=new WeakMap;const Ae=["active-tab","add-tab-button"],Le=["inactive-tab","active-tab","active-tab-close-button","inactive-tab-close-button","add-tab-button"],ze={tabNavigation:Ae,arrowNavigation:Le,enableDeleteKeyClose:!1,enableHomeEndNavigation:!1,announceTabChanges:!0,focusOnCloseStrategy:"next",ariaLabels:void 0},Me="lm_tab",ke="lm_active",Pe={TABS_CONTAINER:`.${"lm_tabs"}`,TAB:`.${Me}`,ACTIVE_TAB:`.${Me}.${ke}`,CLOSE_BUTTON:`.${"lm_close_tab"}`,ADD_TAB_BUTTON:".newTabButton, .addTabButton",TAB_TITLE:`.${"lm_title"}`,VIEW_CONTAINER:`.${"lm_content"}`,HEADER:`.${"lm_header"}`};var De,Oe,Re,Be,Ve,Fe,Ue,He,We,Ne,qe=function(t,e,i,n,o){if("m"===n)throw new TypeError("Private method is not writable");if("a"===n&&!o)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!o:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===n?o.call(t,i):o?o.value=i:e.set(t,i),i},Ge=function(t,e,i,n){if("a"===i&&!n)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!n:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===i?n:"a"===i?n.call(t):n?n.value:e.get(t)};class $e{constructor(t,e){De.add(this),Oe.set(this,void 0),Re.set(this,void 0),Be.set(this,null),qe(this,Oe,t,"f"),qe(this,Re,e,"f"),Ge(this,Re,"f").announceTabChanges&&Ge(this,De,"m",Ne).call(this)}updateOptions(t){qe(this,Re,t,"f"),Ge(this,Re,"f").announceTabChanges?Ge(this,De,"m",Ne).call(this):Ge(this,Be,"f")&&(Ge(this,Be,"f").remove(),qe(this,Be,null,"f"))}announce(t){Ge(this,Re,"f").announceTabChanges&&Ge(this,Be,"f")&&(Ge(this,Be,"f").textContent="",requestAnimationFrame(()=>{Ge(this,Be,"f")&&(Ge(this,Be,"f").textContent=t)}))}destroy(){Ge(this,Be,"f")?.remove(),qe(this,Be,null,"f")}initializeTabGroup(t){t.setAttribute("role","tablist")}initializeTab(t,e,i,n,o){const s=`tab-${e}`,r=`container-${e}`;t.id||(t.id=s),t.setAttribute("role","tab"),t.setAttribute("aria-controls",r),t.setAttribute("aria-selected",String(i));const a=Ge(this,De,"m",Ve).call(this,t),l=Ge(this,De,"m",Ue).call(this,a,i,n,o);t.setAttribute("aria-label",l);const h=t.querySelector(Pe.CLOSE_BUTTON);h&&this.initializeCloseButton(h,a,i)}initializeCloseButton(t,e,i){t.setAttribute("role","button");const n=Ge(this,De,"m",He).call(this,e,i);t.setAttribute("aria-label",n)}initializeAddTabButton(t,e){t.setAttribute("role","button");const i=Ge(this,De,"m",We).call(this,e);t.setAttribute("aria-label",i)}initializeViewContainer(t,e){const i=`container-${e}`,n=`tab-${e}`,o=t.matches(Pe.VIEW_CONTAINER)?t:t.querySelector(Pe.VIEW_CONTAINER),s=Ge(this,Oe,"f").querySelector(`.lm_content[of-name="${e}"]`)??o;s&&(document.querySelectorAll(`[id="${i}"]`).forEach(t=>{t!==s&&t.removeAttribute("id")}),s.id=i,s.setAttribute("role","tabpanel"),s.setAttribute("aria-labelledby",n),s.setAttribute("tabindex","-1"))}updateTabSelection(t,e,i){const n=i??t.querySelectorAll(Pe.TAB),o=n.length;let s="";n.forEach((t,i)=>{const n=t,r=n===e;n.setAttribute("aria-selected",String(r));const a=Ge(this,De,"m",Ve).call(this,n);r&&(s=a);const l=Ge(this,De,"m",Ue).call(this,a,r,i,o);n.setAttribute("aria-label",l)}),s&&this.announce(`Selected: ${s}`)}refreshAllLabels(){Ge(this,Oe,"f").querySelectorAll(Pe.TABS_CONTAINER).forEach(t=>{const e=t.querySelectorAll(Pe.TAB),i=e.length;e.forEach((t,e)=>{const n=t,o=n.classList.contains(ke),s=Ge(this,De,"m",Ve).call(this,n),r=Ge(this,De,"m",Ue).call(this,s,o,e,i);n.setAttribute("aria-label",r);const a=n.querySelector(Pe.CLOSE_BUTTON);if(a){const t=Ge(this,De,"m",He).call(this,s,o);a.setAttribute("aria-label",t)}});const n=t.closest(Pe.HEADER),o=n?.querySelector(Pe.ADD_TAB_BUTTON)||t.querySelector(Pe.ADD_TAB_BUTTON)||t.closest(".lm_stack")?.querySelector(Pe.ADD_TAB_BUTTON);if(o){const t=Ge(this,De,"m",We).call(this,i);o.setAttribute("aria-label",t)}})}}Oe=new WeakMap,Re=new WeakMap,Be=new WeakMap,De=new WeakSet,Ve=function(t){const e=t.querySelector(Pe.TAB_TITLE);return e?.textContent?.trim()||""},Fe=function(){return{arrowNavigationEnabled:(Ge(this,Re,"f").arrowNavigation?.length??0)>0,deleteKeyCloseEnabled:Ge(this,Re,"f").enableDeleteKeyClose??!1,homeEndNavigationEnabled:Ge(this,Re,"f").enableHomeEndNavigation??!1}},Ue=function(t,e,i,n){const o={...Ge(this,De,"m",Fe).call(this),title:t,isActive:e,tabIndex:i,tabCount:n},{ariaLabels:s}=Ge(this,Re,"f"),r=e?s?.activeTab:s?.inactiveTab;return"function"==typeof r?r(o):"string"==typeof r?r:e?(t=>{const e=[t.title];if(t.arrowNavigationEnabled&&e.push("use arrow keys to navigate"),t.deleteKeyCloseEnabled){const t="undefined"!=typeof navigator?navigator:void 0,i="macOS"===t?.userAgentData?.platform||t?.platform?.startsWith("Mac");e.push(i?"press Backspace to close":"press Delete to close")}return e.join(", ")})(o):(t=>t.title)(o)},He=function(t,e){const i={...Ge(this,De,"m",Fe).call(this),title:t,isActive:e},n=Ge(this,Re,"f").ariaLabels?.closeButton;return"function"==typeof n?n(i):"string"==typeof n?n:(t=>`Close ${t.title}`)(i)},We=function(t){const e={...Ge(this,De,"m",Fe).call(this),tabCount:t},i=Ge(this,Re,"f").ariaLabels?.addTabButton;return"function"==typeof i?i(e):"string"==typeof i?i:"Add new tab"},Ne=function(){Ge(this,Be,"f")||(qe(this,Be,document.createElement("span"),"f"),Ge(this,Be,"f").setAttribute("role","status"),Ge(this,Be,"f").setAttribute("aria-live","polite"),Ge(this,Be,"f").setAttribute("aria-atomic","true"),Object.assign(Ge(this,Be,"f").style,{position:"absolute",width:"1px",height:"1px",padding:"0",margin:"-1px",overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",border:"0"}),Ge(this,Oe,"f").appendChild(Ge(this,Be,"f")))};var je,Ze,Ke,Xe,Ye,Je,Qe,ti,ei,ii,ni,oi,si,ri,ai,li,hi,di,ci,ui,mi,pi=function(t,e,i,n,o){if("m"===n)throw new TypeError("Private method is not writable");if("a"===n&&!o)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!o:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===n?o.call(t,i):o?o.value=i:e.set(t,i),i},fi=function(t,e,i,n){if("a"===i&&!n)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!n:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===i?n:"a"===i?n.call(t):n?n.value:e.get(t)};class gi{constructor(t,e,i){je.add(this),Ze.set(this,void 0),Ke.set(this,void 0),Xe.set(this,void 0),Ye.set(this,void 0),Je.set(this,void 0),Qe.set(this,void 0),pi(this,Ze,t,"f"),pi(this,Ke,e,"f"),pi(this,Xe,i.onTabClose,"f"),pi(this,Ye,i.onTabActivate,"f"),pi(this,Je,i.onAddTab,"f"),pi(this,Qe,fi(this,je,"m",ti).bind(this),"f"),fi(this,Ze,"f").addEventListener("keydown",fi(this,Qe,"f"))}updateOptions(t){pi(this,Ke,t,"f"),fi(this,je,"m",ui).call(this)}destroy(){fi(this,Ze,"f").removeEventListener("keydown",fi(this,Qe,"f"))}initializeTabGroup(t){fi(this,je,"m",mi).call(this,t)}updateActiveTab(t,e,i){const n=fi(this,Ke,"f").tabNavigation??Ae;(i??t.querySelectorAll(Pe.TAB)).forEach(t=>{t.setAttribute("tabindex","-1")}),n.includes("active-tab")&&e.setAttribute("tabindex","0");t.querySelectorAll(Pe.CLOSE_BUTTON).forEach(t=>{t.setAttribute("tabindex","-1")});const o=fi(this,je,"m",di).call(this,t);if(o){const t=n.includes("add-tab-button");o.setAttribute("tabindex",t?"0":"-1")}}}Ze=new WeakMap,Ke=new WeakMap,Xe=new WeakMap,Ye=new WeakMap,Je=new WeakMap,Qe=new WeakMap,je=new WeakSet,ti=function(t){const e=t.target,i=e.matches(Pe.TAB),n=e.matches(Pe.CLOSE_BUTTON),o=e.matches(Pe.ADD_TAB_BUTTON);if(i||n||o)switch(t.key){case"ArrowLeft":case"ArrowRight":fi(this,je,"m",ei).call(this,t,e);break;case"Enter":case" ":if(t.ctrlKey||t.metaKey||t.altKey||t.shiftKey)break;fi(this,je,"m",ii).call(this,t,e);break;case"Delete":case"Backspace":fi(this,je,"m",ni).call(this,t,e);break;case"Home":case"End":fi(this,je,"m",oi).call(this,t,e)}},ei=function(t,e){const i=fi(this,Ke,"f").arrowNavigation??Le;if(0===i.length)return;const n=fi(this,je,"m",hi).call(this,e);if(!n)return;const o=fi(this,je,"m",ri).call(this,n,i);if(0===o.length)return;const s=o.indexOf(e);if(-1===s)return;t.preventDefault();o[(s+("ArrowRight"===t.key?1:-1)+o.length)%o.length].focus()},ii=function(t,e){if(t.preventDefault(),e.matches(Pe.TAB))fi(this,Ye,"f").call(this,e);else if(e.matches(Pe.CLOSE_BUTTON)){if(!fi(this,je,"m",li).call(this,e))return;const t=e.closest(Pe.TAB);if(t){const e=fi(this,je,"m",ci).call(this,t);e&&fi(this,Xe,"f").call(this,e)}}else e.matches(Pe.ADD_TAB_BUTTON)&&fi(this,Je,"f").call(this,e)},ni=function(t,e){if(!fi(this,Ke,"f").enableDeleteKeyClose)return;if(!e.matches(Pe.TAB))return;t.preventDefault();const i=fi(this,je,"m",ci).call(this,e);i&&(fi(this,je,"m",si).call(this,e),fi(this,Xe,"f").call(this,i))},oi=function(t,e){if(!fi(this,Ke,"f").enableHomeEndNavigation)return;const i=fi(this,Ke,"f").arrowNavigation??Le;if(0===i.length)return;const n=fi(this,je,"m",hi).call(this,e);if(!n)return;const o=fi(this,je,"m",ri).call(this,n,i);if(0===o.length)return;t.preventDefault();("Home"===t.key?o[0]:o[o.length-1]).focus()},si=function(t){const e=fi(this,je,"m",hi).call(this,t);if(!e)return;const i=Array.from(e.querySelectorAll(Pe.TAB)),n=i.indexOf(t);if(-1===n)return;if(i.length<=1)return;let o=null;const s=fi(this,Ke,"f").focusOnCloseStrategy??"next",r=i[(n+1)%i.length],a=i[(n-1+i.length)%i.length];switch(s){case"next":o=r;break;case"previous":o=a;break;case"active":o=e.querySelector(Pe.ACTIVE_TAB),o===t&&(o=r)}o&&requestAnimationFrame(()=>o?.focus())},ri=function(t,e){const i=[],n=Array.from(t.querySelectorAll(Pe.TAB)),o=t.querySelector(Pe.ACTIVE_TAB);if(n.forEach(t=>{const n=t===o;(n&&e.includes("active-tab")||!n&&e.includes("inactive-tab"))&&i.push(t);const s=t.querySelector(Pe.CLOSE_BUTTON);s&&fi(this,je,"m",ai).call(this,t,s)&&(n&&e.includes("active-tab-close-button")||!n&&e.includes("inactive-tab-close-button"))&&i.push(s)}),e.includes("add-tab-button")){const e=fi(this,je,"m",di).call(this,t);e&&fi(this,je,"m",li).call(this,e)&&i.push(e)}return i},ai=function(t,e){return"false"!==t.getAttribute("data-is-closable")&&fi(this,je,"m",li).call(this,e)},li=function(t){if("true"===t.getAttribute("aria-hidden"))return!1;const e=window.getComputedStyle(t);return"none"!==e.display&&"hidden"!==e.visibility&&t.getClientRects().length>0},hi=function(t){const e=t.closest(Pe.TAB);if(e)return e.closest(Pe.TABS_CONTAINER);if(t.matches(Pe.ADD_TAB_BUTTON)){const e=t.closest(Pe.HEADER);if(e)return e.querySelector(Pe.TABS_CONTAINER);const i=t.closest(".lm_stack");return i?.querySelector(Pe.TABS_CONTAINER)}return t.closest(Pe.TABS_CONTAINER)},di=function(t){const e=t.querySelector(Pe.ADD_TAB_BUTTON);if(e)return e;const i=t.closest(Pe.HEADER),n=i?.querySelector(Pe.ADD_TAB_BUTTON);if(n)return n;const o=t.closest(".lm_stack");return o?.querySelector(Pe.ADD_TAB_BUTTON)},ci=function(t){const e=t.getAttribute("data-view-name");if(e)return e;const{id:i}=t;return i?.startsWith("tab-")?i.substring(4):null},ui=function(){fi(this,Ze,"f").querySelectorAll(Pe.TABS_CONTAINER).forEach(t=>{fi(this,je,"m",mi).call(this,t)})},mi=function(t){const e=fi(this,Ke,"f").tabNavigation??Ae,i=t.querySelectorAll(Pe.TAB),n=t.querySelector(Pe.ACTIVE_TAB);i.forEach(t=>{const i=t,o=i===n;o&&e.includes("active-tab")||!o&&e.includes("inactive-tab")?i.setAttribute("tabindex","0"):i.setAttribute("tabindex","-1");const s=i.querySelector(Pe.CLOSE_BUTTON);s&&s.setAttribute("tabindex","-1")});const o=fi(this,je,"m",di).call(this,t);if(o){const t=e.includes("add-tab-button");o.setAttribute("tabindex",t?"0":"-1")}};var vi,yi,_i,wi,Ci,bi,Ii,Ei,Si,Ti=function(t,e,i,n,o){if("m"===n)throw new TypeError("Private method is not writable");if("a"===n&&!o)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!o:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===n?o.call(t,i):o?o.value=i:e.set(t,i),i},xi=function(t,e,i,n){if("a"===i&&!n)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!n:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===i?n:"a"===i?n.call(t):n?n.value:e.get(t)};class Ai{constructor(t,e,i){vi.add(this),yi.set(this,void 0),_i.set(this,void 0),wi.set(this,void 0),Ci.set(this,void 0),bi.set(this,void 0),Ti(this,yi,t,"f"),Ti(this,_i,e??{},"f"),Ti(this,wi,xi(this,vi,"m",Ii).call(this,xi(this,_i,"f").viewTabOptions),"f"),Ti(this,Ci,new $e(t,xi(this,wi,"f")),"f"),Ti(this,bi,new gi(t,xi(this,wi,"f"),i),"f")}updateAccessibilityOptions(t){Ti(this,_i,{...xi(this,_i,"f"),...t,viewTabOptions:{...xi(this,_i,"f").viewTabOptions,...t.viewTabOptions}},"f"),Ti(this,wi,xi(this,vi,"m",Ii).call(this,xi(this,_i,"f").viewTabOptions),"f"),xi(this,Ci,"f").updateOptions(xi(this,wi,"f")),xi(this,bi,"f").updateOptions(xi(this,wi,"f")),xi(this,Ci,"f").refreshAllLabels()}initializeStack(t){const e=t.querySelector(Pe.TABS_CONTAINER);if(!e)return;xi(this,Ci,"f").initializeTabGroup(e),xi(this,bi,"f").initializeTabGroup(e);const i=e.querySelector(Pe.ADD_TAB_BUTTON)??e.closest(Pe.HEADER)?.querySelector(Pe.ADD_TAB_BUTTON)??t.querySelector(Pe.ADD_TAB_BUTTON);if(i){const t=e.querySelectorAll(Pe.TAB).length;xi(this,Ci,"f").initializeAddTabButton(i,t)}}initializeTab(t,e){const i=t.closest(Pe.TABS_CONTAINER);if(!i)return;const n=i.querySelectorAll(Pe.TAB),o=Array.from(n).indexOf(t),s=n.length,r=t.classList.contains(ke);xi(this,Ci,"f").initializeTab(t,e,r,o,s),r&&xi(this,bi,"f").updateActiveTab(i,t)}initializeViewContainer(t,e){xi(this,Ci,"f").initializeViewContainer(t,e)}handleTabSelectionChange(t,e){const i=t.querySelectorAll(Pe.TAB);xi(this,Ci,"f").updateTabSelection(t,e,i),xi(this,bi,"f").updateActiveTab(t,e,i)}initializeAddButton(t,e){xi(this,Ci,"f").initializeAddTabButton(t,e)}destroy(){xi(this,Ci,"f").destroy(),xi(this,bi,"f").destroy()}getSyncApi(){return{updateAccessibilityOptions:this.updateAccessibilityOptions.bind(this)}}}yi=new WeakMap,_i=new WeakMap,wi=new WeakMap,Ci=new WeakMap,bi=new WeakMap,vi=new WeakSet,Ii=function(t){return t?{tabNavigation:t.tabNavigation??ze.tabNavigation,arrowNavigation:t.arrowNavigation??ze.arrowNavigation,enableDeleteKeyClose:t.enableDeleteKeyClose??ze.enableDeleteKeyClose,enableHomeEndNavigation:t.enableHomeEndNavigation??ze.enableHomeEndNavigation,announceTabChanges:t.announceTabChanges??ze.announceTabChanges,focusOnCloseStrategy:t.focusOnCloseStrategy??ze.focusOnCloseStrategy,ariaLabels:t.ariaLabels}:{...ze}};const Li="newTabButton";class zi extends M{createTabButton(t){const e=document.createElement("div");return e.title="New Tab",e.className=Li,e.classList.add("addTabButton"),e.setAttribute("data-testid","add-new-tab"),e.addEventListener("click",()=>{const e=this.layoutContentCache.getOrCreateEntityId(ce.wrap(t,this)),i=t.contentItems.length;this.platformCreateView({url:this.config.settings?.newTabButtonUrl},{location:{id:e,index:i}})}),e}ensurePlusButtonLast(t,e){let i=t.querySelector(`.${Li}`);i||(i=this.getNewTabButton(t,e)),i!==t.lastElementChild&&t.appendChild(i)}focusTabContentFromHeaderTarget(e){const i=e.classList.contains("lm_tab")?e:e.closest(".lm_tab")??e.closest(".lm_header")?.querySelector(".lm_tab.lm_active")??this.container.querySelector(".lm_tab.lm_active")??void 0,n=i?.getAttribute("data-view-name")??i?.id?.replace("tab-","");if(!n)return!1;const o=t.__classPrivateFieldGet(this,Ei,"m",Si).call(this,n),s=this.layout.findFirstComponentItemById(n)??o?.container.parent;return!!(s&&s.parent?.isStack&&o)&&(s.parent.setActiveComponentItem(s,!0),o.focusContent(),requestAnimationFrame(()=>o.focusContent()),!0)}resolveStackFromAddButtonTarget(t){if(!t.matches(".newTabButton, .addTabButton"))return;const e=i=>{if(i){if(qt.isStack(i)&&i.header?.element.contains(t))return i;if(i.contentItems)for(const t of i.contentItems){const i=e(t);if(i)return i}}};return e(this.layout.rootItem??void 0)}static overrideConfig(t){const e={...ie,...t.settings,...ne};return t.content&&ve(t.content),e.reorderEnabled?me(t.content,{isClosable:!0}):me(t.content,{reorderEnabled:!1}),"scroll"===e?.tabOverflowBehavior&&(e.disableTabOverflowDropdown=!0),{dimensions:ee,...t,settings:e,header:{...te,show:!1!==t.settings?.hasHeaders&&te.show}}}constructor(t,i,n,{options:o},s,r,a=null,l){if(super(),this.identity=t,this.container=i,this.initialConfig=n,this.layoutManager=s,this.platformProvider=r,this.viewHost=a,Ei.add(this),this.layoutViewsByContainerElement=new Map,this.events=new e,this.shadowContainer=null,this.layoutContentCache=I.getSingleInstance(),this.reparentingViews=new Set,this.stolenViews=new Set,this.goldenLayoutDestroyed=!1,this.tabsObservers=new WeakMap,this.accessibilityController=null,this.focusContentHotkey={enabled:!0,key:"enter",requireCtrl:!1,requireMeta:!1,requireAlt:!1,requireShift:!1,requireCtrlOrMeta:!0},this.normalizeHotkeyKey=t=>t.trim().toLowerCase(),this.resolveFocusContentHotkey=t=>{if(!1===t)return void(this.focusContentHotkey={enabled:!1,key:"enter",requireCtrl:!1,requireMeta:!1,requireAlt:!1,requireShift:!1,requireCtrlOrMeta:!1});const e=(t??"Mod+Enter").split("+").map(t=>t.trim().toLowerCase()).filter(Boolean),i=e.find(t=>!["ctrl","control","meta","cmd","command","alt","shift","mod","cmdorctrl","ctrlormeta"].includes(t));this.focusContentHotkey={enabled:!0,key:this.normalizeHotkeyKey(i??"enter"),requireCtrl:e.includes("ctrl")||e.includes("control"),requireMeta:e.includes("meta")||e.includes("cmd")||e.includes("command"),requireAlt:e.includes("alt"),requireShift:e.includes("shift"),requireCtrlOrMeta:e.includes("mod")||e.includes("cmdorctrl")||e.includes("ctrlormeta")}},this.matchesFocusContentHotkey=t=>{if(!this.focusContentHotkey.enabled)return!1;if(this.normalizeHotkeyKey(t.key)!==this.focusContentHotkey.key)return!1;const{requireCtrl:e,requireMeta:i,requireAlt:n,requireShift:o,requireCtrlOrMeta:s}=this.focusContentHotkey;if(s&&!t.ctrlKey&&!t.metaKey)return!1;if(e&&!t.ctrlKey)return!1;if(i&&!t.metaKey)return!1;if(n&&!t.altKey)return!1;if(o&&!t.shiftKey)return!1;const r=i||s;return!(!e&&!s&&t.ctrlKey)&&(!(!r&&t.metaKey)&&(!(!n&&t.altKey)&&!(!o&&t.shiftKey)))},this.getNewTabButton=(t,e)=>{let i=t.querySelector(`.${Li}`);return i||(i=this.createTabButton(e)),i},this.ensureNewTabButton=t=>{if(!this.config?.settings?.newTabButtonUrl||!this.config?.settings.hasHeaders)return;const e=t.header?.element.querySelector(".lm_tabs");if(e){if("scroll"===this.config.settings?.tabOverflowBehavior){let i=t.header?.element.querySelector(`.${Li}`);if(i)return void(this.accessibilityController&&this.accessibilityController.initializeStack(t.element));const n=this.createTabButton(t);return e.parentElement?.insertAdjacentElement("afterend",n),void(this.accessibilityController&&this.accessibilityController.initializeStack(t.element))}if(this.ensurePlusButtonLast(e,t),this.accessibilityController&&this.accessibilityController.initializeStack(t.element),!this.tabsObservers.has(e)){const i=new MutationObserver(()=>this.ensurePlusButtonLast(e,t));i.observe(e,{childList:!0}),this.tabsObservers.set(e,i),t.on("destroy",()=>{i.disconnect(),this.tabsObservers.delete(e)})}}},this.addNewTabButtons=()=>{const t=e=>{e&&(qt.isStack(e)&&this.ensureNewTabButton(e),e.contentItems&&e.contentItems.forEach(t))};t(this.layout.rootItem)},this.onHeaderKeyDown=t=>{const e=t.target;if(!e)return;if(this.matchesFocusContentHotkey(t)){t.preventDefault();return void(this.focusTabContentFromHeaderTarget(e)&&t.stopPropagation())}if(this.accessibilityController)return;if(!("Enter"===t.key||" "===t.key))return;(e.classList.contains("lm_tab")||e.classList.contains("lm_close_tab")||e.classList.contains("newTabButton")||e.classList.contains("addTabButton"))&&(t.preventDefault(),e.click())},this.createViewComponent=(t,e)=>{const i=e,n=e.name??i.name;if(n)for(const t of C.getAllLayouts(this.layoutManager))if(t.identity.layoutName!==this.identity.layoutName){const e=t.getCurrentViews().find(t=>t.name===n);e&&(t.stolenViews.add(e.name),t.platformCloseView(e).catch(console.error))}let o;n&&this.viewHost?.has(n)?o=this.viewHost.get(n):n&&zi.reparentedViews.has(n)?(o=zi.reparentedViews.get(n),zi.reparentedViews.delete(n),o.ofViewElement&&this.iframeContainer.appendChild(o.ofViewElement)):(o=new Ce(i,this.identity.uuid,this.options,this.iframeContainer),this.viewHost?.register(o.identity.name,o));const s=new xe(t,o,this.initialConfig.settings);return this.layoutViewsByContainerElement.set(t.element,s),this.resizeController.observeContainer(t.element),s},this.domEmitter=new k(i),this.viewHost)this.iframeContainer=this.viewHost.element;else{const t=document.createElement("div");t.id=`openfin-layout-iframe-container-${this.identity.layoutName}`,this.iframeContainer=t}this.layout=new Jt(this.container),this.layout.resizeWithContainerAutomatically=!0,this.options=o,this.layout.registerComponent("view",this.createViewComponent),this.setupListeners(),r.registerEmitter(t.layoutName,this.events),this.container.addEventListener("keydown",this.onHeaderKeyDown),this.initializeAccessibility(l),this.resolveFocusContentHotkey(l?.focusContentHotkey),this.resizeController=new le(this);const h=zi.overrideConfig(n);this.config=h,this.layout.loadLayout(h),this.viewHost||(this.shadowContainer=document.createElement("div"),this.shadowContainer.id=`openfin-layout-shadow-container-${this.identity.layoutName}`,this.shadowContainer.attachShadow({mode:"open",delegatesFocus:!1}).appendChild(this.iframeContainer),this.container.appendChild(this.shadowContainer)),this.resizeController.observeMutations(this.container),this.resizeController.observeIntersection(this.container),this.setupStyles(),this.addNewTabButtons()}getStackByView({name:t}){const e=this.layout.findFirstComponentItemById(t);if(e?.parent&&e?.parent?.isStack)return ce.wrap(e.parent,this)}getRoot(){return ce.wrap(this.layout.rootItem,this)}async platformCloseView(e){const i=t.__classPrivateFieldGet(this,Ei,"m",Si).call(this,e.name);if(!i)throw new Error(`View with name: ${e.name} not found in layout.`);i.closeView()}async platformCreateView(t,{location:e,targetView:i}={}){if(i)throw new Error("TargetView not supported in web");const n={options:this.platformProvider.normalizeOptions(t),target:this.identity,location:e};return this.insertView(n)}setupStyles(){this.container.setAttribute("data-openfin-layout-name",this.identity.layoutName);const t=this.container.querySelector(".lm_goldenlayout");t?(t.setAttribute("data-layout-name",this.identity.layoutName),this.config.settings?.hasHeaders?t.setAttribute("data-settings-has-headers","true"):t.removeAttribute("data-settings-has-headers"),this.initialConfig.settings?.preventSplitterResize?t.setAttribute("data-settings-prevent-splitter-resize","true"):t.removeAttribute("data-settings-prevent-splitter-resize"),"scroll"===this.initialConfig.settings?.tabOverflowBehavior?t.setAttribute("data-settings-tab-overflow","scroll"):t.removeAttribute("data-settings-tab-overflow")):console.warn("Layout div not found cannot apply settings")}async insertView({options:t,location:e,targetView:i}){if(t?.name){const e=t.uuid;await C.handleSharedView(this.layoutManager,this.identity,{name:t.name,uuid:"string"==typeof e?e:this.identity.uuid})}const n=e?this.layoutContentCache.getItemOrUndefined(e.id):void 0,o=i?this.layoutContentCache.getItemOrUndefined(i.name):void 0,s=this.layout.rootItem,r=s?ce.wrap(s,this):void 0,a=n??o??r;let l;if(void 0===a)l=this.layout.newItem({type:"stack",content:[]});else if(qt.isStack(a.raw))l=a.raw;else{if(!de(a.raw))throw new Error("Cannot add a view at the requested location");l=a.raw.newItem({type:"stack",content:[]})}const h=Math.min(l.contentItems.length,e?.index??l.contentItems.length);let d=this.layout.findFirstComponentItemById(t.name),c=l.getActiveComponentItem(),u=c?.focused;if(d)d.parent&&d.parent.removeChild(d,!0),l.addChild(d,h);else{const e=zi.reparentedViews.get(t.name)?.state.title??this.viewHost?.get(t.name)?.state.title;d=l.newComponent("view",t,t.title??e??t.url??"Default Title",h)}d.reorderEnabled=this.layout.layoutConfig.settings.reorderEnabled;"background"===(e?.displayState??"focused")&&c&&l.setActiveComponentItem(c,!!u),this.ensureNewTabButton(l);const m=d.component.identity;return Promise.resolve({identity:m})}async replaceView({viewToReplace:t,newView:e}){const i=this.getStackByView(t);if(!i)throw new Error(`View with name: ${t.name} not found in layout.`);const n=i.contentItems.findIndex(e=>e.viewName===t.name);if(-1===n)throw new Error(`View with name: ${t.name} not found in layout.`);if(t.name!==e.name){const o=this.layoutContentCache.getOrCreateEntityId(i),{identity:s}=await this.platformCreateView(e,{location:{id:o,index:n}});return await this.platformCloseView(t),{identity:s}}throw new Error("Cannot replace a view with itself")}replaceLayout(t){throw new Error("Method not implemented.")}async cleanupView(t){}applyPreset(t){throw new Error("Method not implemented.")}getCurrentViews(){return[...this.layoutViewsByContainerElement.values()].map(t=>t.identity)}async getFrameSnapshot(){if(this.goldenLayoutDestroyed)throw new p(this.identity.layoutName);return fe(ft.fromResolved(this.layout.toConfig()),this.config)}isVisible(){return(0!==(t=this.container).offsetWidth||0!==t.offsetHeight)&&"hidden"!==window.getComputedStyle(t).visibility&&t.offsetTop>=0&&t.offsetLeft>=0&&t.offsetTop<=window.innerHeight&&t.offsetLeft<=window.innerWidth;// removed by dead control flow
 var t; }get showFavIcons(){return!1!==this.config.settings?.showFavicons}async onViewDetached({viewIdentity:t}){this.reparentingViews.add(t.name),await this.platformCloseView(t)}initializeAccessibility(e){this.resolveFocusContentHotkey(e?.focusContentHotkey),this.accessibilityController=new Ai(this.container,e,{onTabClose:t=>{this.platformCloseView({uuid:this.identity.uuid,name:t})},onTabActivate:e=>{const i=e.getAttribute("data-view-name")||e.id?.replace("tab-","");if(i){const e=t.__classPrivateFieldGet(this,Ei,"m",Si).call(this,i),n=this.layout.findFirstComponentItemById(i)??e?.container.parent;n&&n.parent?.isStack&&n.parent.setActiveComponentItem(n,!0)}},onAddTab:t=>{if(this.config.settings?.newTabButtonUrl){const e=this.resolveStackFromAddButtonTarget(t);if(e){const t=this.layoutContentCache.getOrCreateEntityId(ce.wrap(e,this));return void this.platformCreateView({url:this.config.settings.newTabButtonUrl},{location:{id:t,index:e.contentItems.length}})}this.platformCreateView({url:this.config.settings.newTabButtonUrl})}}});const i=this.accessibilityController.getSyncApi();return{updateAccessibilityOptions:t=>{this.resolveFocusContentHotkey(t.focusContentHotkey),i.updateAccessibilityOptions(t)}}}getSyncApi(){if(this.accessibilityController){const t=this.accessibilityController.getSyncApi();return{updateAccessibilityOptions:e=>{this.resolveFocusContentHotkey(e.focusContentHotkey),t.updateAccessibilityOptions(e)}}}return{updateAccessibilityOptions:t=>{this.resolveFocusContentHotkey(t.focusContentHotkey)}}}async destroy(){this.accessibilityController?.destroy(),this.platformProvider.unregisterEmitter(this.identity.layoutName),this.container.removeEventListener("keydown",this.onHeaderKeyDown),this.goldenLayoutDestroyed||(this.goldenLayoutDestroyed=!0,this.layout.destroy()),this.viewHost||this.iframeContainer.remove(),this.resizeController.destroy(),this.layoutViewsByContainerElement.clear()}setupListeners(){this.container.addEventListener("pointerdown",t=>{if(t.target instanceof HTMLElement){const e=t.target.classList;["lm_tab","lm_title","lm_splitter","lm_drag_handle"].some(t=>e.contains(t))&&(this.handleDragStart(),2===t.button&&t.stopPropagation())}},!0),document.addEventListener("pointerup",()=>this.handleDragEnd(),!0),this.layout.on("tabCreated",t=>{const e=t.componentItem.component;!1===e.componentState[`${Qt}isClosable`]&&t.element.setAttribute("data-is-closable","false"),t.element.setAttribute("data-view-name",e.identity.name),t.element.id=`tab-${e.identity.name}`;const i=this.showFavIcons,n=e.componentState?.icon??t.componentItem.toConfig().icon,o=i?e.ofView.favicon:null,s=i?this.config.settings?.defaultFaviconUrl??null:null,r=n??o??s??null;if(t.setIcon(r),i&&!o){const t=e.ofView.ofViewElement;t&&t.getOrDiscoverFavicon().then(t=>{t&&e.setFavicon(t)})}this.domEmitter.dispatchLocalEvent("tab-created",e.identity),this.accessibilityController&&this.accessibilityController.initializeTab(t.element,e.identity.name)}),this.layout.on("itemCreated",({target:t})=>{const e=t;if(Pt.isComponentItem(e)){const t=e.component;this.domEmitter.dispatchLocalEvent("container-created",t.identity),this.accessibilityController&&this.accessibilityController.initializeViewContainer(e.element,t.identity.name)}qt.isStack(e)&&(e.toggleMaximise=()=>this.toggleMaximise(e),this.ensureNewTabButton(e),this.accessibilityController&&(this.accessibilityController.initializeStack(e.element),e.on("activeContentItemChanged",()=>{if(this.accessibilityController){const t=e.getActiveComponentItem();if(t){const i=e.header?.element.querySelector(".lm_tabs"),n=t.tab?.element;i&&n&&this.accessibilityController.handleTabSelectionChange(i,n)}}})))}),this.layout.on("itemDestroyed",t=>{const e=t.target;if(Pt.isComponentItem(e)){const t=e.component;this.removeViewComponent(t)}}),this.layout.on("itemDropped",()=>{this.handleDragEnd()}),this.events.on("page-title-updated",({data:{identity:e,title:i}})=>{this.identity.uuid===e.uuid&&t.__classPrivateFieldGet(this,Ei,"m",Si).call(this,e.name)?.setTitle(i)}),!1!==this.initialConfig.settings?.showFavicons&&this.events.on("page-favicon-updated",({data:e})=>{if(!e?.identity||"string"!=typeof e.favicon)return;const{identity:i,favicon:n}=e;if(this.identity.uuid!==i.uuid)return;const o=t.__classPrivateFieldGet(this,Ei,"m",Si).call(this,i.name);o&&o.identity.name===i.name&&o.setFavicon(n)})}handleDragStart(){this.iframeContainer.style.pointerEvents="none"}handleDragEnd(){this.iframeContainer.style.pointerEvents=""}toggleMaximise(t){const e=(t,e)=>{const i=this.layout.findFirstComponentItemById(t.identity.name);return i&&i.parent&&i.parent.isStack&&i.parent.element===e},i=[...this.layoutViewsByContainerElement.values()].filter(i=>!e(i,t.element)),n=[...this.layoutViewsByContainerElement.values()].find(i=>i.isActive()&&e(i,t.element)),o=(t,e)=>{t?.toggleZIndex(e)},s=t=>{i.forEach(e=>e.setIsMinimised(t))};t.isMaximised?(t.minimise(),o(n,!1),s(!1)):(s(!0),t.maximise(),o(n,!0))}removeViewComponent(t){return this.layoutViewsByContainerElement.delete(t.container.element),this.resizeController.unobserveContainer(t.container.element),this.stolenViews.has(t.identity.name)?(this.stolenViews.delete(t.identity.name),t.destroy(),t.ofView.destroy(),this.viewHost?.unregister(t.identity.name),void(0!==this.getCurrentViews().length||this.goldenLayoutDestroyed||(this.goldenLayoutDestroyed=!0,C.handleLastViewRemoved(this.layoutManager,this.identity)))):this.reparentingViews.has(t.identity.name)?(this.reparentingViews.delete(t.identity.name),t.ofView.state.title=t.container.parent.title,this.viewHost||zi.reparentedViews.set(t.identity.name,t.ofView),void t.destroy()):(t.destroy(),t.ofView.destroy(),this.viewHost?.unregister(t.identity.name),this.platformProvider.closeView(t.identity.name),void(0!==this.getCurrentViews().length||this.goldenLayoutDestroyed||(this.goldenLayoutDestroyed=!0,C.handleLastViewRemoved(this.layoutManager,this.identity))))}}Ei=new WeakSet,Si=function(t){return[...this.layoutViewsByContainerElement.values()].find(e=>e.identity.name===t)},zi.reparentedViews=new Map;class Mi{constructor(e,i,n,o,s){this.wire=e,this.connectConfig=i,this.provider=n,this.fallbackContainer=o,this.viewHost=null,t.Logger.setGlobalLogLevel(i.logLevel),s&&(this.viewHost=new z(s))}async createLayout(t,e){if(!("container"in t)&&!this.fallbackContainer)throw new Error("Container property is not optional in web");const{layoutName:i}=t,n=t,o=this.provider.initLayoutViews(n),s=n.container??this.fallbackContainer,r={...this.wire.me,layoutName:i},a=n.accessibilityOptions??this.connectConfig.platform.accessibilityOptions,l=new zi(r,s,o,this.connectConfig,e,this.provider,this.viewHost,a);return C.registerLayout(e,i,l),this.fallbackContainer=null,l.getSyncApi()}async getLayoutSnapshot(t){return t.getLayoutSnapshot()}async handleLastViewRemoved(t){}getWire(){return this.wire}}class ki{static async init(e){const i=e.getFin().InterApplicationBus.Channel,n=await i.create(`custom-frame-${e.me.uuid}`);n.setDefaultAction(async(t,{target:e,opts:i},o)=>{const s=n.connections.find(t=>t.name===e.name);if(s)return n.dispatch(s,t,{...i,target:e});throw new Error(`Client with name ${e.name} not found`)}),await t.relayChannelClientApi(n,"layout-relay");const o=await i.create(t.getDataChannelName(e));return new ki(e,o)}constructor(t,e){this.wire=t,this.dataChannelProvider=e,this.emitters=new Map,this.viewNames=new Set,e.register("page-title-updated",t=>{[...this.emitters.values()].forEach(e=>{e.emit("page-title-updated",t)})}),e.register("page-favicon-updated",t=>{[...this.emitters.values()].forEach(e=>{e.emit("page-favicon-updated",t)})})}registerEmitter(t,e){this.emitters.set(t,e)}unregisterEmitter(t){this.emitters.delete(t)}normalizeOptions(t,e="default"){const i=this.wire.me.uuid;let{name:o=`internal-generated-view-${n.v4()}`}=t;return o.match(/^internal-generated-view-/)&&this.viewNames.has(o)&&"duplicate"===e&&(o=`internal-generated-view-${n.v4()}`),this.viewNames.add(o),{...t,name:o,uuid:i}}closeView(t){this.viewNames.delete(t)}initLayoutViews({layout:t,multiInstanceViewBehavior:e}){return m(t=>{if("component"===t.type&&t.componentState){const i=this.normalizeOptions(t.componentState,e);return{...t,componentState:i}}return t},t)}}var Pi;const Di=t=>t;Pi=new WeakMap,exports.WebLayoutEntryPoint=class{constructor(e){Pi.set(this,void 0),this.initLayoutManager=async(e,i,{container:n,layoutManagerOverride:o,sharedViewContainer:s})=>{const r=await ki.init(i),a=o??Di,l=new Mi(i,t.__classPrivateFieldGet(this,Pi,"f"),r,n,s),h=new(a(C.createClosedConstructor(l)));return await L(i,h),h},this.applyLayoutSnapshot=async(e,i,n)=>{await i.applyLayoutSnapshot(t.__classPrivateFieldGet(this,Pi,"f").platform.layoutSnapshot)},this.createLayout=async(t,e)=>C.createLayout(t,e),this.destroyLayout=async(t,e)=>C.destroyLayout(t,e),t.__classPrivateFieldSet(this,Pi,e,"f")}};


/***/ },

/***/ "../../node_modules/@openfin/core-web/out/main-0c3a88c6.js"
/*!*****************************************************************!*\
  !*** ../../node_modules/@openfin/core-web/out/main-0c3a88c6.js ***!
  \*****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var t=__webpack_require__(/*! events */ "../../node_modules/events/events.js"),e=__webpack_require__(/*! es-toolkit */ "../../node_modules/es-toolkit/dist/index.js"),n=__webpack_require__(/*! uuid */ "../../node_modules/uuid/dist/cjs-browser/index.js");const i=(t,e)=>`${e}<${btoa(JSON.stringify(t))}>`,r=(t,e)=>{try{return t.origin===e.origin}catch(t){return!1}},s=(t,e)=>{const n=new MutationObserver(n=>{let i=!1;n.forEach(t=>{"TITLE"!==t.target.parentNode?.nodeName&&"TITLE"!==t.target.nodeName?(t.removedNodes.forEach(t=>{"TITLE"!==t.nodeName&&"TITLE"!==t.parentNode?.nodeName||(i=!0)}),t.addedNodes.forEach(t=>{"TITLE"!==t.nodeName&&"TITLE"!==t.parentNode?.nodeName||(i=!0)})):i=!0});const r=t.querySelector("title")?.textContent??"";i&&e(r)});return n.observe(t,{childList:!0,subtree:!0,characterData:!0}),n},o=(t,e)=>{let n;const i=new MutationObserver(()=>{(()=>{const i=t.querySelector('link[rel~="icon"]')?.href;i&&i!==n&&(n=i,e(i))})()});return i.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel"]}),i};var a,c,d=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n},h=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)};class l{constructor(t){this.isNodeEnvironment=()=>"node"===this.wire.environment.type,this.isOpenFinEnvironment=()=>"openfin"===this.wire.environment.type,this.isBrowserEnvironment=()=>"other"===this.wire.environment.type,this.wire=t}get fin(){return this.wire.getFin()}get me(){return this.wire.me}}class p extends l{constructor(t,e,...n){super(t),this.topic=e,a.set(this,void 0),c.set(this,void 0),this.eventNames=()=>this.hasEmitter()?this.getOrCreateEmitter().eventNames():[],this.emit=(t,e,...n)=>!!this.hasEmitter()&&this.getOrCreateEmitter().emit(t,e,...n),this.hasEmitter=()=>this.wire.eventAggregator.has(h(this,a,"f")),this.getOrCreateEmitter=()=>this.wire.eventAggregator.getOrCreate(h(this,a,"f")),this.listeners=t=>this.hasEmitter()?this.getOrCreateEmitter().listeners(t):[],this.listenerCount=t=>this.hasEmitter()?this.getOrCreateEmitter().listenerCount(t):0,this.registerEventListener=async(t,e={},n,i)=>{const r={...this.identity,timestamp:e.timestamp||Date.now(),topic:this.topic,type:t},s=this.getOrCreateEmitter();n(s);try{await this.wire.sendAction("subscribe-to-desktop-event",r)}catch(t){throw i(s),this.deleteEmitterIfNothingRegistered(s),t}},this.deregisterEventListener=async(t,e={})=>{if(this.hasEmitter()){const n={...this.identity,timestamp:e.timestamp||Date.now(),topic:this.topic,type:t};return await this.wire.sendAction("unsubscribe-to-desktop-event",n).catch(()=>null),this.getOrCreateEmitter()}return Promise.resolve()},d(this,a,[e,...n],"f"),d(this,c,new WeakMap,"f")}async on(t,e,n){return await this.registerEventListener(t,n,n=>{n.on(t,e)},n=>{n.removeListener(t,e)}),this}async addListener(t,e,n){return this.on(t,e,n)}async once(t,e,n){const i=()=>this.deregisterEventListener(t);return h(this,c,"f").set(e,i),await this.registerEventListener(t,n,n=>{n.once(t,i),n.once(t,e)},n=>{n.removeListener(t,i),n.removeListener(t,e)}),this}async prependListener(t,e,n){return await this.registerEventListener(t,n,n=>{n.prependListener(t,e)},n=>{n.removeListener(t,e)}),this}async prependOnceListener(t,e,n){const i=()=>this.deregisterEventListener(t);return h(this,c,"f").set(e,i),await this.registerEventListener(t,n,n=>{n.prependOnceListener(t,e),n.once(t,i)},n=>{n.removeListener(t,e),n.removeListener(t,i)}),this}async removeListener(t,e,n){const i=await this.deregisterEventListener(t,n);if(i){i.removeListener(t,e);const n=h(this,c,"f").get(e);n&&i.removeListener(t,n),this.deleteEmitterIfNothingRegistered(i)}return this}async deregisterAllListeners(t){const e={...this.identity,type:t,topic:this.topic};if(this.hasEmitter()){const t=this.getOrCreateEmitter(),n=t.listenerCount(e.type),i=[];for(let t=0;t<n;t++)i.push(this.wire.sendAction("unsubscribe-to-desktop-event",e).catch(()=>null));return await Promise.all(i),t}}async removeAllListeners(t){const e=async t=>{const e=await this.deregisterAllListeners(t);e&&(e.removeAllListeners(t),this.deleteEmitterIfNothingRegistered(e))};if(t)await e(t);else if(this.hasEmitter()){const t=this.getOrCreateEmitter().eventNames();await Promise.all(t.map(e))}return this}deleteEmitterIfNothingRegistered(t){0===t.eventNames().length&&this.wire.eventAggregator.delete(h(this,a,"f"))}}a=new WeakMap,c=new WeakMap;class u extends Error{}class w extends Error{}class y extends Error{}class f extends Error{}class g extends Error{constructor(t){const{message:e,name:n,stack:i,...r}=t;super(e),"cause"in t&&t.cause&&(this.cause=new g(t.cause)),this.name=n||"Error",this.stack=i??this.toString(),Object.keys(r).filter(t=>"cause"!==t).forEach(t=>{this[t]=r[t]})}}class m extends Error{static trimEndCallSites(t,e){const n=Error.stackTraceLimit,i=Error.prepareStackTrace;Error.prepareStackTrace=(t,e)=>e;const r="string"==typeof t.stack,s=(r?t.stack?.split("\n"):t.stack)??[];if(Error.prepareStackTrace=i,Error.stackTraceLimit=n,s.length){const n=[];for(const t of r?s:s.slice(1))if(n.push(t),e.test(t.toString()))break;t.stack=r?n.join("\n"):m.prepareStackTrace(t,n)}}static getCallSite(t=0){const e=Error.stackTraceLimit,n=t+1;Error.stackTraceLimit=e+n;const i=Error.prepareStackTrace;Error.prepareStackTrace=(t,e)=>e;const r=(new Error).stack?.slice(n)??[];return Error.prepareStackTrace=i,Error.stackTraceLimit=e,r}static prepareStackTrace(t,e){if("function"==typeof Error.prepareStackTrace)return Error.prepareStackTrace(t,e);let n=`${t.name||"Error"}: ${t.message||""}\n`;return n+=e.map(t=>`    at ${t}`).join("\n"),n}constructor(t,e){const{reason:n,error:i}=t;super(n),this.name=this.constructor.name,i?.stack&&(this.cause=new g(i)),e&&(this.stack=m.prepareStackTrace(this,e))}}function v(t){let e;return"object"==typeof t&&"string"==typeof t.uuid||(e="Not a valid identity object"),e}const C=t=>{(t.contentNavigation?.whitelist||t.contentNavigation?.blacklist||t.contentRedirect?.whitelist||t.contentRedirect?.blacklist)&&console.warn("The properties 'whitelist' and 'blacklist' have been marked as deprecated and will be removed in a future version. Please use 'allowlist' and 'denylist'.")};class I extends l{async create(t){const{uuid:e}=this.wire.me;if(!t.name||"string"!=typeof t.name)throw new Error("Please provide a name property as a string in order to create a View.");return C(t),this.wire.environment.childViews?await this.wire.environment.createChildContent({entityType:"view",options:{...t,uuid:e}}):await this.wire.sendAction("create-view",{...t,uuid:e}),this.wrapSync({uuid:e,name:t.name})}async wrap(t){this.wire.recordAnalytic("view-wrap");const e=v(t);if(e)throw new Error(e);return new P(this.wire,t)}wrapSync(t){this.wire.recordAnalytic("view-wrap-sync");const e=v(t);if(e)throw new Error(e);return new P(this.wire,t)}getCurrent(){if(this.wire.recordAnalytic("view-get-current"),!this.wire.me.isView)throw new Error("You are not in a View context");const{uuid:t,name:e}=this.wire.me;return this.wrap({uuid:t,name:e})}getCurrentSync(){if(this.wire.recordAnalytic("view-get-current-sync"),!this.wire.me.isView)throw new Error("You are not in a View context");const{uuid:t,name:e}=this.wire.me;return this.wrapSync({uuid:t,name:e})}}class x{constructor(t){this.producerFn=t}getValue(){return this.value||(this.value=this.producerFn()),this.value}}class b{constructor(t){this.producerFn=t}async getValue(){return this.promise||(this.promise=this.producerFn().catch(t=>{throw delete this.promise,t})),this.promise}}class A extends p{constructor(t,e,n){super(t,n,e.uuid,e.name),this.identity=e,this.entityType=n}capturePage(t){return this.wire.sendAction("capture-page",{options:t,...this.identity}).then(({payload:t})=>t.data)}executeJavaScript(t){return this.wire.sendAction("execute-javascript-in-window",{...this.identity,code:t}).then(({payload:t})=>t.data)}getZoomLevel(){return this.wire.sendAction("get-zoom-level",this.identity).then(({payload:t})=>t.data)}setZoomLevel(t){return this.wire.sendAction("set-zoom-level",{...this.identity,level:t}).then(()=>{})}navigate(t){return this.wire.sendAction("navigate-window",{...this.identity,url:t}).then(()=>{})}navigateBack(){return this.wire.sendAction("navigate-window-back",{...this.identity}).then(()=>{})}async navigateForward(){await this.wire.sendAction("navigate-window-forward",{...this.identity})}stopNavigation(){return this.wire.sendAction("stop-window-navigation",{...this.identity}).then(()=>{})}reload(t=!1){return this.wire.sendAction("reload-window",{ignoreCache:t,...this.identity}).then(()=>{})}print(t={}){return this.wire.sendAction("print",{...this.identity,options:t}).then(()=>{})}findInPage(t,e){return this.wire.sendAction("find-in-page",{...this.identity,searchTerm:t,options:e}).then(({payload:t})=>t.data)}stopFindInPage(t){return this.wire.sendAction("stop-find-in-page",{...this.identity,action:t}).then(()=>{})}getPrinters(){return this.wire.sendAction("get-printers",{...this.identity}).then(({payload:t})=>t.data)}async focus({emitSynthFocused:t}={emitSynthFocused:!0}){await this.wire.sendAction("focus-window",{emitSynthFocused:t,...this.identity})}async showDeveloperTools(){await this.wire.sendAction("show-developer-tools",this.identity)}async getProcessInfo(){const{payload:{data:t}}=await this.wire.sendAction("get-process-info",this.identity);return t}async getSharedWorkers(){return this.wire.sendAction("get-shared-workers",this.identity).then(({payload:t})=>t.data)}async inspectSharedWorker(){await this.wire.sendAction("inspect-shared-worker",{...this.identity})}async inspectSharedWorkerById(t){await this.wire.sendAction("inspect-shared-worker-by-id",{...this.identity,workerId:t})}async inspectServiceWorker(){await this.wire.sendAction("inspect-service-worker",{...this.identity})}async showPopupWindow(t){if(this.wire.recordAnalytic(`${this.entityType}-show-popup-window`),t?.onPopupReady){const e=async({popupName:e})=>{try{const n=this.fin.Window.wrapSync({uuid:this.fin.me.uuid,name:e});await t.onPopupReady(n)}catch(t){throw new Error(`Something went wrong during onPopupReady execution: ${t}`)}};await this.once("popup-ready",e)}const{payload:e}=await this.wire.sendAction("try-create-popup-window",{options:{...t,hasResultCallback:!!t?.onPopupResult,hasReadyCallback:!!t?.onPopupReady},...this.identity}),{data:{willOpen:n,options:i}}=e;n&&await this.fin.Window.create(i.initialOptions);if(t?.onPopupResult){const e=async e=>{await t.onPopupResult((t=>{const{name:e,uuid:n,result:i,data:r}=t,s={identity:{name:e,uuid:n},result:i};return r&&(s.data=r),s})(e))},n=async()=>{await this.removeListener("popup-result",e)};await this.on("popup-result",e),await this.once("popup-teardown",n)}const{payload:r}=await this.wire.sendAction("show-popup-window",{options:i,...this.identity});return r.data}async getScreenCapturePermission(){return(await this.wire.sendAction("get-screen-capture-permissions",this.identity)).payload.data}}var E;class P extends A{constructor(t,e){super(t,e,"view"),this.identity=e,E.set(this,new x(()=>this.fin.Platform.wrapSync(this.identity).getClient())),this.attach=async t=>{await this.wire.sendAction("attach-view",{target:t,...this.identity})},this.destroy=async()=>{await this.wire.sendAction("destroy-view",{...this.identity})},this.show=async()=>{await this.wire.sendAction("show-view",{...this.identity})},this.showAt=async(t,e={})=>{await this.wire.sendAction("show-view-at",{bounds:t,...this.identity,options:e})},this.bringToFront=async()=>{await this.wire.sendAction("bring-view-to-front",{...this.identity})},this.hide=async()=>{await this.wire.sendAction("hide-view",{...this.identity})},this.setBounds=async t=>{await this.wire.sendAction("set-view-bounds",{bounds:t,...this.identity})},this.getBounds=async()=>(await this.wire.sendAction("get-view-bounds",{...this.identity})).payload.data,this.getInfo=async()=>(await this.wire.sendAction("get-view-info",{...this.identity})).payload.data,this.getParentLayout=async()=>(this.wire.recordAnalytic("view-get-parent-layout"),this.fin.Platform.Layout.getLayoutByViewIdentity(this.identity)),this.getOptions=async()=>this.wire.sendAction("get-view-options",{...this.identity}).then(({payload:t})=>t.data),this.updateOptions=async t=>this.wire.sendAction("update-view-options",{options:t,...this.identity}).then(()=>{}),this.getCurrentWindow=async()=>{const{payload:{data:t}}=await this.wire.sendAction("get-view-window",{...this.identity});return new k(this.wire,t)},this.getCurrentStack=async()=>{this.wire.recordAnalytic("view-get-current-stack");try{return(await this.getParentLayout()).getStackByViewIdentity(this.identity)}catch(t){throw new m({reason:"This view does not belong to a stack.",error:t})}},this.triggerBeforeUnload=async()=>(await this.wire.sendAction("trigger-before-unload",{...this.identity})).payload.data,this.bindToElement=async t=>{if(!t)throw new Error("Element not found.");return this.wire.environment.observeBounds(t,async t=>this.setBounds(t))}}async focus({emitSynthFocused:t}={emitSynthFocused:!0}){const e=await this.getCurrentWindow();await e.focusedWebViewWasChanged(),await super.focus({emitSynthFocused:t})}}E=new WeakMap;class M extends p{constructor(t,e){super(t,"application",e.uuid),this.identity=e,this.window=new k(this.wire,{uuid:this.identity.uuid,name:this.identity.uuid})}windowListFromIdentityList(t){const e=[];return t.forEach(t=>{e.push(new k(this.wire,{uuid:t.uuid,name:t.name}))}),e}isRunning(){return this.wire.sendAction("is-application-running",this.identity).then(({payload:t})=>t.data)}async quit(t=!1){try{await this._close(t),await this.wire.sendAction("destroy-application",{force:t,...this.identity})}catch(t){if(!["Remote connection has closed","Could not locate the requested application"].some(e=>t.message.includes(e)))throw t}}async _close(t=!1){try{await this.wire.sendAction("close-application",{force:t,...this.identity})}catch(t){if(!t.message.includes("Remote connection has closed"))throw t}}close(t=!1){return console.warn("Deprecation Warning: Application.close is deprecated Please use Application.quit"),this.wire.recordAnalytic("application-close"),this._close(t)}getChildWindows(){return this.wire.sendAction("get-child-windows",this.identity).then(({payload:t})=>{const e=[];return t.data.forEach(t=>{e.push({uuid:this.identity.uuid,name:t})}),this.windowListFromIdentityList(e)})}getManifest(){return this.wire.sendAction("get-application-manifest",this.identity).then(({payload:t})=>t.data)}getParentUuid(){return this.wire.sendAction("get-parent-application",this.identity).then(({payload:t})=>t.data)}getShortcuts(){return this.wire.sendAction("get-shortcuts",this.identity).then(({payload:t})=>t.data)}async getViews(){const{payload:t}=await this.wire.sendAction("application-get-views",this.identity);return t.data.map(t=>new P(this.wire,t))}getZoomLevel(){return this.wire.sendAction("get-application-zoom-level",this.identity).then(({payload:t})=>t.data)}getWindow(){return this.wire.recordAnalytic("application-get-window"),Promise.resolve(this.window)}registerUser(t,e){return this.wire.sendAction("register-user",{userName:t,appName:e,...this.identity}).then(()=>{})}removeTrayIcon(){return this.wire.sendAction("remove-tray-icon",this.identity).then(()=>{})}restart(){return this.wire.sendAction("restart-application",this.identity).then(()=>{})}run(){return console.warn("Deprecation Warning: Application.run is deprecated Please use fin.Application.start"),this.wire.recordAnalytic("application-run"),this._run()}_run(t={}){return this.wire.sendAction("run-application",{manifestUrl:this._manifestUrl,opts:t,...this.identity}).then(()=>{})}scheduleRestart(){return this.wire.sendAction("relaunch-on-close",this.identity).then(()=>{})}async sendApplicationLog(){const{payload:t}=await this.wire.sendAction("send-application-log",this.identity);return t.data}async setJumpList(t){await this.wire.sendAction("set-jump-list",{config:t,...this.identity})}setTrayIcon(t){return this.wire.sendAction("set-tray-icon",{enabledIcon:t,...this.identity}).then(()=>{})}async setTrayIconToolTip(t){await this.wire.sendAction("set-tray-icon-tooltip",{...this.identity,toolTip:t})}setShortcuts(t){return this.wire.sendAction("set-shortcuts",{data:t,...this.identity}).then(()=>{})}async setShortcutQueryParams(t){await this.wire.sendAction("set-shortcut-query-args",{data:t,...this.identity})}setZoomLevel(t){return this.wire.sendAction("set-application-zoom-level",{level:t,...this.identity}).then(()=>{})}async setAppLogUsername(t){await this.wire.sendAction("set-app-log-username",{data:t,...this.identity})}getTrayIconInfo(){return this.wire.sendAction("get-tray-icon-info",this.identity).then(({payload:t})=>t.data)}hasTrayIcon(){return this.wire.sendAction("has-tray-icon",this.identity).then(({payload:t})=>t.data)}terminate(){return this.wire.sendAction("terminate-application",this.identity).then(()=>{})}wait(){return this.wire.sendAction("wait-for-hung-application",this.identity).then(()=>{})}getInfo(){return this.wire.sendAction("get-info",this.identity).then(({payload:t})=>t.data)}async getProcessInfo(){const{payload:{data:t}}=await this.wire.sendAction("application-get-process-info",this.identity);return t}async setFileDownloadLocation(t){const{name:e}=this.wire.me,n={uuid:this.identity.uuid,name:e};await this.wire.sendAction("set-file-download-location",{...n,downloadLocation:t})}async getFileDownloadLocation(){const{payload:{data:t}}=await this.wire.sendAction("get-file-download-location",this.identity);return t}async showTrayIconPopupMenu(t){const{name:e}=this.wire.me,n={uuid:this.identity.uuid,name:e},{payload:i}=await this.wire.sendAction("show-tray-icon-popup-menu",{...n,options:t});return i.data}async closeTrayIconPopupMenu(){const{name:t}=this.wire.me,e={uuid:this.identity.uuid,name:t};await this.wire.sendAction("close-tray-icon-popup-menu",{...e})}}class S extends l{async wrap(t){this.wire.recordAnalytic("wrap-application");const e=v(t);if(e)throw new Error(e);return new M(this.wire,t)}wrapSync(t){this.wire.recordAnalytic("wrap-application-sync");const e=v(t);if(e)throw new Error(e);return new M(this.wire,t)}async _create(t){return void 0===t.waitForPageLoad&&(t.waitForPageLoad=!1),void 0===t.autoShow&&void 0===t.isPlatformController&&(t.autoShow=!0),await this.wire.sendAction("create-application",t),this.wrap({uuid:t.uuid})}create(t){return console.warn("Deprecation Warning: fin.Application.create is deprecated. Please use fin.Application.start"),this.wire.recordAnalytic("application-create"),this._create(t)}async start(t){this.wire.recordAnalytic("start-application");const e=await this._create(t);return await this.wire.sendAction("run-application",{uuid:t.uuid}),e}async startManyManifests(t,e){return this.wire.sendAction("run-applications",{applications:t,opts:e}).then(()=>{})}getCurrent(){return this.wire.recordAnalytic("get-current-application"),this.wrap({uuid:this.wire.me.uuid})}getCurrentSync(){return this.wire.recordAnalytic("get-current-application-sync"),this.wrapSync({uuid:this.wire.me.uuid})}async startFromManifest(t,e){this.wire.recordAnalytic("application-start-from-manifest");const n=await this._createFromManifest(t);return await n._run(e),n}createFromManifest(t){return console.warn("Deprecation Warning: fin.Application.createFromManifest is deprecated. Please use fin.Application.startFromManifest"),this.wire.recordAnalytic("application-create-from-manifest"),this._createFromManifest(t)}_createFromManifest(t){return this.wire.sendAction("get-application-manifest",{manifestUrl:t}).then(({payload:t})=>{const e=t.data.platform?t.data.platform.uuid:t.data.startup_app.uuid;return this.wrap({uuid:e})}).then(e=>(e._manifestUrl=t,e))}}class k extends A{constructor(t,e){super(t,e,"window")}async createWindow(t){this.wire.recordAnalytic("window-create-window");const e=await(async(t,e,n=()=>!0,i)=>{let r,s,o;const a=new Promise((t,e)=>{r=t,s=e}),c=t=>{n(t)&&(clearTimeout(o),r(t))};return await t.on(e,c),i&&(o=setTimeout(()=>s(new Error("event timed out")),i)),a.finally(()=>{t.removeListener(e,c).catch(()=>null)}),{getValue:()=>a}})(this,"fire-constructor-callback");void 0===t.waitForPageLoad&&(t.waitForPageLoad=!1),void 0===t.autoShow&&(t.autoShow=!0),C(t);const n=this.wire.environment.createChildContent({entityType:"window",options:t}),[i]=await Promise.all([e.getValue(),n]);let r;const{success:s}=i,o=i.data,{message:a}=o;r=s?{httpResponseCode:o.httpResponseCode,apiInjected:o.apiInjected}:{message:o.message,networkErrorCode:o.networkErrorCode,stack:o.stack};const c={message:a,cbPayload:r,success:s};try{this.getWebWindow().fin.__internal_.openerSuccessCBCalled()}catch(t){}return c.success?this:Promise.reject(c)}getAllFrames(){return this.wire.sendAction("get-all-frames",this.identity).then(({payload:t})=>t.data)}activateAndFocus(t){return this.wire.sendAction("activate-window-and-focus",{winIdentity:this.identity,focusIdentity:t}).then(({payload:t})=>t.data)}getBounds(t){return this.wire.sendAction("get-window-bounds",{...this.identity,options:t}).then(({payload:t})=>t.data)}center(){return this.wire.sendAction("center-window",this.identity).then(()=>{})}blur(){return this.wire.sendAction("blur-window",this.identity).then(()=>{})}bringToFront(){return this.wire.sendAction("bring-window-to-front",this.identity).then(()=>{})}animate(t,e){return this.wire.sendAction("animate-window",{transitions:t,options:e,...this.identity}).then(()=>{})}hide(){return this.wire.sendAction("hide-window",this.identity).then(()=>{})}close(t=!1){return this.wire.sendAction("close-window",{force:t,...this.identity}).then(()=>{Object.setPrototypeOf(this,null)})}focusedWebViewWasChanged(){return this.wire.sendAction("focused-webview-changed",this.identity).then(()=>{})}getNativeId(){return this.wire.sendAction("get-window-native-id",this.identity).then(({payload:t})=>t.data)}async getCurrentViews(){const{payload:t}=await this.wire.sendAction("window-get-views",this.identity);return t.data.map(t=>new P(this.wire,t))}disableFrame(){return console.warn("Function is deprecated; use disableUserMovement instead."),this.wire.sendAction("disable-window-frame",this.identity).then(()=>{})}disableUserMovement(){return this.wire.sendAction("disable-window-frame",this.identity).then(()=>{})}enableFrame(){return console.warn("Function is deprecated; use enableUserMovement instead."),this.wire.sendAction("enable-window-frame",this.identity).then(()=>{})}enableUserMovement(){return this.wire.sendAction("enable-window-frame",this.identity).then(()=>{})}flash(){return this.wire.sendAction("flash-window",this.identity).then(()=>{})}stopFlashing(){return this.wire.sendAction("stop-flash-window",this.identity).then(()=>{})}getInfo(){return this.wire.sendAction("get-window-info",this.identity).then(({payload:t})=>t.data)}async getLayout(t){this.wire.recordAnalytic("window-get-layout");const e=await this.getOptions();if(!e.layout&&!e.layoutSnapshot)throw new Error("Window does not have a Layout");return this.fin.Platform.Layout.wrap(t??this.identity)}getOptions(){return this.wire.sendAction("get-window-options",this.identity).then(({payload:t})=>t.data)}getParentApplication(){return this.wire.recordAnalytic("window-get-parent-application"),Promise.resolve(new M(this.wire,this.identity))}getParentWindow(){return this.wire.recordAnalytic("window-get-parent-window"),Promise.resolve(new M(this.wire,this.identity)).then(t=>t.getWindow())}async getSnapshot(t){const e={area:t,...this.identity};console.warn("Window.getSnapshot has been deprecated, please use Window.capturePage");return(await this.wire.sendAction("get-window-snapshot",e)).payload.data}getState(){return this.wire.sendAction("get-window-state",this.identity).then(({payload:t})=>t.data)}getWebWindow(){return this.wire.recordAnalytic("window-get-web-window"),this.wire.environment.getWebWindow(this.identity)}isMainWindow(){return this.wire.recordAnalytic("window-is-main-window"),this.me.uuid===this.me.name}isShowing(){return this.wire.sendAction("is-window-showing",this.identity).then(({payload:t})=>t.data)}maximize(){return this.wire.sendAction("maximize-window",this.identity).then(()=>{})}minimize(){return this.wire.sendAction("minimize-window",this.identity).then(()=>{})}moveBy(t,e,n){return this.wire.sendAction("move-window-by",{deltaLeft:t,deltaTop:e,positioningOptions:n,...this.identity}).then(()=>{})}moveTo(t,e,n){return this.wire.sendAction("move-window",{left:t,top:e,positioningOptions:n,...this.identity}).then(()=>{})}resizeBy(t,e,n,i){return this.wire.sendAction("resize-window-by",{deltaWidth:Math.floor(t),deltaHeight:Math.floor(e),anchor:n,positioningOptions:i,...this.identity}).then(()=>{})}resizeTo(t,e,n,i){return this.wire.sendAction("resize-window",{width:Math.floor(t),height:Math.floor(e),anchor:n,positioningOptions:i,...this.identity}).then(()=>{})}restore(){return this.wire.sendAction("restore-window",this.identity).then(()=>{})}setAsForeground(){return this.wire.sendAction("set-foreground-window",this.identity).then(()=>{})}setBounds(t,e){return this.wire.sendAction("set-window-bounds",{...t,...this.identity,positioningOptions:e}).then(()=>{})}show(t=!1){return this.wire.sendAction("show-window",{force:t,...this.identity}).then(()=>{})}showAt(t,e,n=!1){return this.wire.sendAction("show-at-window",{force:n,left:Math.floor(t),top:Math.floor(e),...this.identity}).then(()=>{})}updateOptions(t){return"frame"in t&&console.warn("Deprecation Warning: Starting with version 45 it will not be possible to change the frame value after window has been created."),this.wire.sendAction("update-window-options",{options:t,...this.identity}).then(()=>{})}authenticate(t,e){return this.wire.sendAction("window-authenticate",{userName:t,password:e,...this.identity}).then(()=>{})}async showPopupMenu(t){const{payload:e}=await this.wire.sendAction("show-popup-menu",{options:t,...this.identity});return e.data}async closePopupMenu(){return this.wire.sendAction("close-popup-menu",{...this.identity}).then(()=>{})}async dispatchPopupResult(t){this.wire.recordAnalytic("window-dispatch-popup-result"),await this.wire.sendAction("dispatch-popup-result",{data:t,...this.identity})}async print(t={content:"self"}){switch(t.content){case void 0:case"self":return super.print(t);case"screenshot":return this.wire.sendAction("print-screenshot",this.identity).then(()=>{});case"views":return this.wire.sendAction("print-views",{...this.identity,options:t}).then(()=>{});default:return}}async showDownloadBubble(t){return this.wire.sendAction("show-download-bubble",{...this.identity,anchor:t}).then(()=>{})}async updateDownloadBubbleAnchor(t){return this.wire.sendAction("update-download-bubble-anchor",{...this.identity,anchor:t}).then(()=>{})}}class L extends l{async wrap(t){this.wire.recordAnalytic("window-wrap");const e=v(t);if(e)throw new Error(e);return new k(this.wire,t)}wrapSync(t){this.wire.recordAnalytic("window-wrap-sync");const e=v(t);if(e)throw new Error(e);return new k(this.wire,t)}create(t){this.wire.recordAnalytic("create-window");return new k(this.wire,{uuid:this.me.uuid,name:t.name}).createWindow(t)}getCurrent(){if(this.wire.recordAnalytic("get-current-window"),!this.wire.me.isWindow)throw new Error("You are not in a Window context");const{uuid:t,name:e}=this.wire.me;return this.wrap({uuid:t,name:e})}getCurrentSync(){if(this.wire.recordAnalytic("get-current-window-sync"),!this.wire.me.isWindow)throw new Error("You are not in a Window context");const{uuid:t,name:e}=this.wire.me;return this.wrapSync({uuid:t,name:e})}}class T extends l{async getCategories(){const{payload:t}=await this.wire.sendAction("content-tracing-get-categories");return t.data}async startRecording(t){await this.wire.sendAction("content-tracing-start-recording",{options:t})}async stopRecording(){const{payload:t}=await this.wire.sendAction("content-tracing-stop-recording");return t.data}async getTraceBufferUsage(){const{payload:t}=await this.wire.sendAction("content-tracing-get-trace-buffer-usage");return t.data}}class $ extends p{constructor(t){super(t,"system"),this.ContentTracing=new T(t)}sendExternalProcessRequest(t,e){return new Promise((n,i)=>{const r="external-process-exited";let s,o,a,c;"function"==typeof e.listener&&(a=t=>{const n=t||{};o={topic:"exited",uuid:n.processUuid||"",exitCode:n.exitCode||0},s===t.processUuid&&(e.listener(o),c.removeListener(r,a))},this.wire.me.name||(this.wire.me.name=this.wire.me.uuid),c=new k(this.wire,this.wire.me),c.on(r,a)),this.wire.sendAction(t,e).then(({payload:t})=>{s=t.data.uuid,n(t.data),o&&s===o.uuid&&(e.listener(o),c.removeListener(r,a))}).catch(t=>{c&&c.removeListener(r,a),i(t)})})}getVersion(){return this.wire.sendAction("get-version").then(({payload:t})=>t.data)}clearCache(t){return this.wire.sendAction("clear-cache",t).then(()=>{})}clearHTTPCache(){return this.wire.sendAction("clear-http-cache").then(()=>{})}clearCacheData(t){return this.wire.sendAction("clear-cache-data",t||{}).then(()=>{})}deleteCacheOnExit(){return this.wire.sendAction("delete-cache-request").then(()=>{})}exit(){return this.wire.sendAction("exit-desktop").then(()=>{})}async fetchManifest(t){const{payload:{data:e}}=await this.wire.sendAction("fetch-manifest",{manifestUrl:t});return e}flushCookieStore(){return this.wire.sendAction("flush-cookie-store").then(()=>{})}getAllWindows(){return this.wire.sendAction("get-all-windows").then(({payload:t})=>t.data)}getAllApplications(){return this.wire.sendAction("get-all-applications").then(({payload:t})=>t.data)}getCommandLineArguments(){return this.wire.sendAction("get-command-line-arguments").then(({payload:t})=>t.data)}async getCrashReporterState(){const{payload:{data:{diagnosticMode:t,isRunning:e}}}=await this.wire.sendAction("get-crash-reporter-state");return console.warn("diagnosticMode property is deprecated. It will be removed in a future version"),{diagnosticMode:t,diagnosticsMode:t,isRunning:e}}async startCrashReporter(t){const e=t,n={...e,diagnosticMode:e.diagnosticsMode||e.diagnosticMode},{payload:{data:{diagnosticMode:i,isRunning:r}}}=await this.wire.sendAction("start-crash-reporter",n);return{diagnosticMode:i,diagnosticsMode:i,isRunning:r}}getUniqueUserId(){return this.wire.sendAction("get-unique-user-id").then(({payload:t})=>t.data)}getEntityInfo(t,e){return this.wire.sendAction("get-entity-info",{uuid:t,name:e}).then(({payload:t})=>t.data)}getEnvironmentVariable(t){return this.wire.sendAction("get-environment-variable",{environmentVariables:t}).then(({payload:t})=>t.data)}getFocusedWindow(){return this.wire.sendAction("get-focused-window").then(({payload:t})=>t.data)}getFocusedContent(){return this.wire.sendAction("get-focused-content").then(({payload:t})=>t.data)}async isAppCertified(t){const{payload:{data:{certifiedInfo:e}}}=await this.wire.sendAction("is-app-certified",{manifestUrl:t});return e}getInstalledRuntimes(){return this.wire.sendAction("get-installed-runtimes").then(({payload:t})=>t.data.runtimes)}async getInstalledApps(){const{payload:{data:{installedApps:t}}}=await this.wire.sendAction("get-installed-apps");return t}getLog(t){return this.wire.sendAction("view-log",t).then(({payload:t})=>t.data)}getMachineId(){return this.wire.sendAction("get-machine-id").then(({payload:t})=>t.data)}getMinLogLevel(){return this.wire.sendAction("get-min-log-level").then(({payload:t})=>t.data)}getLogList(){return this.wire.sendAction("list-logs").then(({payload:t})=>t.data)}getMonitorInfo(){return this.wire.sendAction("get-monitor-info").then(({payload:t})=>t.data)}getMousePosition(){return this.wire.sendAction("get-mouse-position").then(({payload:t})=>t.data)}getProcessList(){return console.warn("System.getProcessList has been deprecated. Please consider using our new process APIs: Window.getProcessInfo, View.getProcessInfo, Application.getProcessInfo, System.getAllProcessInfo"),this.wire.sendAction("process-snapshot").then(({payload:t})=>t.data)}async getAllProcessInfo(){const{payload:{data:t}}=await this.wire.sendAction("get-all-process-info",this.identity);return t}getProxySettings(){return this.wire.sendAction("get-proxy-settings").then(({payload:t})=>t.data)}getRuntimeInfo(){return this.wire.sendAction("get-runtime-info").then(({payload:t})=>t.data)}getRvmInfo(){return this.wire.sendAction("get-rvm-info").then(({payload:t})=>t.data)}getHostSpecs(){return this.wire.sendAction("get-host-specs").then(({payload:t})=>t.data)}getOSInfo(){return this.wire.sendAction("get-os-info").then(({payload:t})=>t.data)}launchExternalProcess(t){return this.sendExternalProcessRequest("launch-external-process",t)}monitorExternalProcess(t){return this.sendExternalProcessRequest("monitor-external-process",t)}log(t,e,n){return this.wire.sendAction("write-to-log",{level:t,message:e,target:n??{}}).then(()=>{})}openUrlWithBrowser(t){return this.wire.sendAction("open-url-with-browser",{url:t}).then(()=>{})}async registerCustomProtocol(t){if("object"!=typeof t)throw new Error("Must provide an object with a `protocolName` property having a string value.");await this.wire.sendAction("register-custom-protocol",t)}async unregisterCustomProtocol(t){await this.wire.sendAction("unregister-custom-protocol",{protocolName:t})}async getCustomProtocolState(t){return this.wire.sendAction("get-custom-protocol-state",{protocolName:t}).then(({payload:t})=>t.data)}releaseExternalProcess(t){return this.wire.sendAction("release-external-process",{uuid:t}).then(()=>{})}showDeveloperTools(t){return this.wire.sendAction("show-developer-tools",t).then(()=>{})}terminateExternalProcess(t){return this.wire.sendAction("terminate-external-process",t).then(()=>{})}updateProxySettings(t){return this.wire.sendAction("update-proxy",t).then(()=>{})}async downloadAsset(t,e){const n=()=>{};let i=n,r=n;const s=new Promise((t,e)=>{i=t,r=e});if("openfin"!==this.wire.environment.type)throw new f("downloadAsset only supported in an OpenFin Render process");const o=m.getCallSite(),a=this.wire.environment.getNextMessageId().toString(),c=`asset-download-progress-${a}`,d=`asset-download-error-${a}`,h=`asset-download-complete-${a}`,l=t=>{const n={downloadedBytes:t.downloadedBytes,totalBytes:t.totalBytes};e(n)},p=()=>{this.removeListener(c,l)};await Promise.all([this.on(c,l),this.once(d,t=>{p();const{reason:e,err:n}=t;r(new m({reason:e,error:n},o))}),this.once(h,()=>{p(),i()})]);const u=Object.assign(t,{downloadId:a});return await this.wire.sendAction("download-asset",u).catch(t=>{throw p(),t}),s}downloadRuntime(t,e){const n=m.getCallSite();return new Promise((i,r)=>{if("openfin"!==this.wire.environment.type)return void r(new f("downloadRuntime only supported in an OpenFin Render process"));const s=this.wire.environment.getNextMessageId().toString(),o=`runtime-download-progress-${s}`,a=`runtime-download-error-${s}`,c=`runtime-download-complete-${s}`,d=t=>{const n={downloadedBytes:t.downloadedBytes,totalBytes:t.totalBytes};e(n)},h=()=>{this.removeListener(o,d)};this.on(o,d),this.once(a,t=>{h();const{reason:e,err:i}=t;r(new m({reason:e,error:i},n))}),this.once(c,()=>{h(),i()});const l=Object.assign(t,{downloadId:s});this.wire.sendAction("download-runtime",l).catch(t=>{h(),r(t)})})}downloadPreloadScripts(t){return this.wire.sendAction("download-preload-scripts",{scripts:t}).then(({payload:t})=>t.data)}getAllExternalApplications(){return this.wire.sendAction("get-all-external-applications").then(({payload:t})=>t.data)}getAppAssetInfo(t){return this.wire.sendAction("get-app-asset-info",t).then(({payload:t})=>t.data)}getCookies(t){const e=this.wire.environment.getUrl(),n=Object.assign(t,{url:e});return this.wire.sendAction("get-cookies",n).then(({payload:t})=>t.data)}setMinLogLevel(t){return this.wire.sendAction("set-min-log-level",{level:t}).then(()=>{})}resolveUuid(t){return this.wire.sendAction("resolve-uuid",{entityKey:t}).then(({payload:t})=>t.data)}executeOnRemote(t,e){return e.requestingIdentity=t,this.wire.ferryAction(e)}readRegistryValue(t,e,n){return this.wire.sendAction("read-registry-value",{rootKey:t,subkey:e,value:n}).then(({payload:t})=>t.data)}registerExternalConnection(t){return this.wire.sendAction("register-external-connection",{uuid:t}).then(({payload:t})=>t.data)}async getServiceConfiguration(t){if("string"!=typeof t.name)throw new Error("Must provide an object with a `name` property having a string value");const{name:e}=t;return this.wire.sendAction("get-service-configuration",{name:e}).then(({payload:t})=>t.data)}async getSystemAppConfig(t){if("string"!=typeof t)throw new Error("Must provide a string value for name of system app");return this.wire.sendAction("get-system-app-configuration",{name:t}).then(({payload:t})=>t.data)}async registerShutdownHandler(t){this.wire.recordAnalytic("system-register-shutdown-handler");const{uuid:e,name:n}=this.wire.me;this.on("system-shutdown",i=>{t({proceed:()=>{this.wire.environment.raiseEvent("application/system-shutdown-handled",{uuid:e,name:n,topic:"application"})}})})}runRvmHealthCheck(){return this.wire.sendAction("run-rvm-health-check").then(({payload:t})=>t.data)}async launchManifest(e,n={}){const{subscribe:i,...r}=n,s=r;if(i){const e=new t.EventEmitter;i(e);const n="app-version-progress",r="runtime-status",o="app-version-complete",a="app-version-error",c=this.wire.environment.getNextMessageId().toString();s.appVersionId=c;const d=[o,n,r,a],h=t=>{const{appVersionId:e,topic:n,type:i,...r}=t;return{...r,type:d.find(t=>i.includes(t))}},l=t=>{const n=h(t);e.emit(n.type,n)},p=()=>{this.removeListener(`${n}.${c}`,l),this.removeListener(`${r}.${c}`,l),this.removeListener(`${o}.${c}`,l),this.removeListener(`${a}.${c}`,l),this.removeListener(`${o}.${c}`,p),this.removeListener(`${a}.${c}`,p)};await Promise.all([this.on(`${n}.${c}`,l),this.on(`${r}.${c}`,l),this.once(`${o}.${c}`,l),this.once(`${a}.${c}`,l),this.once(`${o}.${c}`,p),this.once(`${a}.${c}`,p)])}return(await this.wire.sendAction("launch-manifest",{manifestUrl:e,opts:s})).payload.data.manifest}async queryPermissionForCurrentContext(t){const e={uuid:this.wire.me.uuid,name:this.wire.me.name};return(await this.wire.sendAction("query-permission-for-current-context",{apiName:t,identity:e})).payload.data}async enableNativeWindowIntegrationProvider(t){const{payload:e}=await this.wire.sendAction("enable-native-window-integration-provider",{permissions:t});return e.data}async registerUsage({data:t,type:e}){await this.wire.sendAction("register-usage",{data:t,type:e})}async getPrinters(){const{payload:t}=await this.wire.sendAction("system-get-printers");return t.data}async updateProcessLoggingOptions(t){await this.wire.sendAction("system-update-process-logging-options",{options:t})}async getDomainSettings(){const{payload:{data:t}}=await this.wire.sendAction("get-domain-settings");return t}async setDomainSettings(t){await this.wire.sendAction("set-domain-settings",{domainSettings:t})}async getCurrentDomainSettings(t){return(await this.wire.sendAction("get-current-domain-settings",{identity:t})).payload.data}async resolveDomainSettings(t){return(await this.wire.sendAction("resolve-domain-settings",{url:t})).payload.data}async refreshExtensions(){const{payload:t}=await this.wire.sendAction("refresh-extensions");return t.data}async getInstalledExtensions(){const{payload:t}=await this.wire.sendAction("get-installed-extensions");return t.data}async serveAsset(t){return(await this.wire.sendAction("serve-asset",{options:t})).payload.data}async getThemePreferences(){return(await this.wire.sendAction("get-theme-preferences")).payload.data}async setThemePreferences(t){return(await this.wire.sendAction("set-theme-preferences",{preferences:t})).payload.data}async launchLogUploader(t){return(await this.wire.sendAction("launch-log-uploader",{options:t})).payload.data}async setThemePalette(t){return(await this.wire.sendAction("set-theme-palette",{themePalette:t})).payload.data}async getThemePalette(){const{payload:t}=await this.wire.sendAction("get-theme-palette");return t.data}}class F{constructor(){this.topicRefMap=new Map}incRefCount(t){const e=this.topicRefMap.get(t);let n;if(e){const i=e+1;n=i,this.topicRefMap.set(t,i)}else this.topicRefMap.set(t,1),n=1;return n}decRefCount(t){const e=this.topicRefMap.get(t);let n;if(e){const i=e-1;this.topicRefMap.set(t,i),n=i}else n=-1;return n}actOnFirst(t,e,n){return 1===this.incRefCount(t)?e():n()}actOnLast(t,e,n){return 0===this.decRefCount(t)?e():n()}}const R=t=>async(e,n,i)=>{const r=await t(e,n,i);return void 0===r?n:r};class G{constructor(t,e){this.providerIdentity=t,this.close=e}}class O{static defaultAction(t){throw new Error(`No action registered at target for ${t}`)}constructor(){this.subscriptions=new Map}async processAction(t,e,n){try{const i=this.subscriptions.get(t),r=i??((e,n)=>(this.defaultAction??O.defaultAction)(t,e,n)),s=this.preAction?await this.preAction(t,e,n):e,o=await r(s,n);return this.postAction?await this.postAction(t,o,n):o}catch(e){if(m.trimEndCallSites(e,/Channel.*processAction/),this.errorMiddleware)return this.errorMiddleware(t,e,n);throw e}}beforeAction(t){if(this.preAction)throw new Error("Already registered beforeAction middleware");this.preAction=R(t)}onError(t){if(this.errorMiddleware)throw new Error("Already registered error middleware");this.errorMiddleware=t}afterAction(t){if(this.postAction)throw new Error("Already registered afterAction middleware");this.postAction=R(t)}remove(t){this.subscriptions.delete(t)}setDefaultAction(t){if(this.defaultAction)throw new Error("default action can only be set once");this.defaultAction=t}register(t,e){if(this.subscriptions.has(t))throw new Error(`Subscription already registered for action: ${t}. Unsubscribe before adding new subscription`);return this.subscriptions.set(t,e),!0}}let W=class extends Error{constructor(t,e,n,i){super(t.message),this.action=e,this.dispatchPayload=n,this.name=this.constructor.name,"cause"in t&&t.cause instanceof Error&&(this.cause=t.cause),this.stack=m.prepareStackTrace(this,i)}};var j,H,N,B=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)},D=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n};const V=new Map;class U extends O{static closeChannelByEndpointId(t){const e=V.get(t);e&&B(e,N,"f").call(e)}static handleProviderDisconnect(t){for(const e of V.values())e.providerIdentity.channelId===t.channelId&&(e.disconnectListener(t),B(e,N,"f").call(e))}constructor(t,e,n){super(),j.set(this,void 0),H.set(this,void 0),this.processAction=(t,e,n)=>super.processAction(t,e,n),N.set(this,()=>{V.delete(this.endpointId),B(this,H,"f").close()}),D(this,j,new G(t,e),"f"),this.disconnectListener=()=>{},this.endpointId=t.endpointId,D(this,H,n,"f"),V.set(this.endpointId,this),n.receive(this.processAction)}get providerIdentity(){return B(this,j,"f").providerIdentity}async dispatch(t,e){if(B(this,H,"f").isEndpointConnected(this.providerIdentity.channelId)){const n=m.getCallSite();return B(this,H,"f").send(this.providerIdentity.channelId,t,e).catch(i=>{throw new W(i,t,e,n)})}throw new Error("The client you are trying to dispatch from is disconnected from the target provider.")}onDisconnection(t){this.disconnectListener=e=>{try{t(e)}catch(t){throw new Error(`Error while calling the onDisconnection callback: ${t.message}`)}finally{this.disconnectListener=()=>{}}}}async disconnect(){await this.sendDisconnectAction(),B(this,N,"f").call(this)}async sendDisconnectAction(){const t=B(this,j,"f");await t.close()}static async wireClose(t,e,n){const{channelName:i,uuid:r,name:s}=e;await t.sendAction("disconnect-from-channel",{channelName:i,uuid:r,name:s,endpointId:n})}}function _(t,e){throw new Error(`Unsupported value: ${t}${e?`\n Supported values are: ${e.join("")}`:""}`)}j=new WeakMap,H=new WeakMap,N=new WeakMap;var q,z,J,Y=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n},K=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)};class Z{constructor(t,e,n,i){this.messageReceiver=e,this.endpointId=n,this.providerIdentity=i,q.set(this,void 0),z.set(this,new Map),J.set(this,new Map),this.send=async(t,e,n)=>{const i=K(this,z,"f").get(t);if(!i)throw new Error(`Could not locate routing info for endpoint ${t}`);const r={...i};r.isLocalEndpointId&&delete r.endpointId,delete r.isLocalEndpointId;const s=K(this,q,"f").sendAction("send-channel-message",{...r,providerIdentity:this.providerIdentity,action:e,payload:n});K(this,J,"f").get(t)?.add(s);return(await s.catch(t=>{if("cause"in t)throw t;throw new Error(t.message)}).finally(()=>{K(this,J,"f").get(t)?.delete(s)})).payload.data.result},this.close=async()=>{this.messageReceiver.removeEndpoint(this.providerIdentity.channelId,this.endpointId),[...K(this,z,"f").keys()].forEach(t=>this.closeEndpoint(t)),Y(this,z,new Map,"f")},Y(this,q,t,"f")}onEndpointDisconnect(t,e){}receive(t){this.messageReceiver.addEndpoint(t,this.providerIdentity.channelId,this.endpointId)}async closeEndpoint(t){const e=K(this,z,"f").get(t);K(this,z,"f").delete(t);const n=K(this,J,"f").get(t);n?.forEach(n=>{const i=`Channel connection with identity uuid: ${e?.uuid} / name: ${e?.name} / endpointId: ${t} no longer connected.`;n.cancel(new Error(i))})}isEndpointConnected(t){return K(this,z,"f").has(t)}addEndpoint(t,e){K(this,z,"f").set(t,e.endpointIdentity),K(this,J,"f").set(t,new Set)}isValidEndpointPayload(t){return"string"==typeof t?.endpointIdentity?.endpointId||"string"==typeof t?.endpointIdentity?.channelId}}q=new WeakMap,z=new WeakMap,J=new WeakMap;const Q={version:5,minimumVersion:0,type:"classic"};function X(t){const e={stack:t.stack,name:t.name,message:t.message,toString:()=>t.stack||t.toString()};return"cause"in t&&(e.cause=X(t.cause)),e}var tt,et,nt=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)},it=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n};class rt{static isValidEndpointPayload(t){const e=t=>"object"==typeof t&&null!==t;return e(t)&&e(t.endpointIdentity)&&e(t.rtc)&&"string"==typeof t.endpointIdentity.endpointId}constructor({rtc:t,endpointIdentity:e}){this.responseMap=new Map,tt.set(this,null),et.set(this,void 0),this.connectionStateChangeHandler=t=>{"connected"!==this.rtc.rtcClient.connectionState&&(this.rtc.rtcClient.removeEventListener("connectionstatechange",this.connectionStateChangeHandler),this.close(),nt(this,et,"f")&&nt(this,et,"f").call(this))},this.send=async(t,e)=>{const n=`message-${Math.random()}`,i=new Promise((t,e)=>{this.responseMap.set(n,{resolve:t,reject:e})});return this.rtc.channels.request.send(JSON.stringify({action:t,payload:e,messageId:n})),i},this.close=()=>{this.responseMap.forEach(t=>t.reject("Connection has closed.")),this.responseMap=new Map,this.rtc.channels.request.close(),this.rtc.channels.response.close(),this.rtc.rtcClient.close()},this.rtc=t,this.endpointIdentity=e,this.rtc.channels.response.addEventListener("message",t=>{let{data:e}=t;t.data instanceof ArrayBuffer&&(e=(new TextDecoder).decode(t.data));const{messageId:n,payload:i,success:r,error:s}=JSON.parse(e),{resolve:o,reject:a}=this.responseMap.get(n)??{};o&&a?(this.responseMap.delete(n),r?o(i):a(s)):(console.log("Could not find id in responseMap."),console.log(t))}),this.rtc.channels.request.addEventListener("message",async t=>{let{data:n}=t;t.data instanceof ArrayBuffer&&(n=(new TextDecoder).decode(t.data));const{messageId:i,action:r,payload:s}=JSON.parse(n);if(nt(this,tt,"f"))try{const t=await nt(this,tt,"f").call(this,r,s,e);this.rtc.channels.response.send(JSON.stringify({messageId:i,payload:t,success:!0}))}catch(t){"open"===this.rtc.channels.response.readyState&&this.rtc.channels.response.send(JSON.stringify({messageId:i,error:X(t),success:!1}))}else"open"===this.rtc.channels.response.readyState&&this.rtc.channels.response.send(JSON.stringify({messageId:i,success:!1,error:"Connection not ready."}))}),this.rtc.rtcClient.addEventListener("connectionstatechange",this.connectionStateChangeHandler),Object.values(this.rtc.channels).forEach(t=>{t.onclose=t=>{[...this.responseMap.values()].forEach(t=>t.reject(new Error("RTCDataChannel closed unexpectedly, this is most commonly caused by message size. Note: RTC Channels have a message size limit of ~255kB."))),this.close(),nt(this,et,"f")&&nt(this,et,"f").call(this)}})}onDisconnect(t){if(nt(this,et,"f"))throw new Error("RTCEndpoint disconnectListener cannot be set twice.");it(this,et,t,"f")}receive(t){if(nt(this,tt,"f"))throw new Error("You have already set a listener for this RTC Endpoint.");it(this,tt,t,"f")}get connected(){return"connected"===this.rtc.rtcClient.connectionState}}tt=new WeakMap,et=new WeakMap;var st,ot,at,ct=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)},dt=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n};class ht{constructor(t,e,n){this.EndpointType=t,this.StrategyName=n,st.set(this,null),ot.set(this,new Map),at.set(this,!0),this.send=async(t,e,n)=>this.getEndpointById(t).send(e,n),this.close=async()=>{ct(this,at,"f")&&(ct(this,ot,"f").forEach(t=>t.close()),dt(this,ot,new Map,"f")),dt(this,at,!1,"f")},this.isValidEndpointPayload=e}onEndpointDisconnect(t,e){this.getEndpointById(t).onDisconnect(e)}receive(t){if(ct(this,st,"f"))throw new Error(`You have already set a listener for this ${this.StrategyName} Strategy`);dt(this,st,t,"f"),ct(this,ot,"f").forEach(t=>t.receive(ct(this,st,"f")))}getEndpointById(t){const e=ct(this,ot,"f").get(t);if(!e)throw new Error(`Client with endpoint id ${t} is not connected`);return e}get connected(){return ct(this,at,"f")}isEndpointConnected(t){return ct(this,ot,"f").has(t)}addEndpoint(t,e){if(!ct(this,at,"f"))return void console.warn(`Adding endpoint to disconnected ${this.StrategyName} Strategy`);const n=new this.EndpointType(e);ct(this,st,"f")&&n.receive(ct(this,st,"f")),ct(this,ot,"f").set(t,n)}async closeEndpoint(t){ct(this,ot,"f").delete(t)}}st=new WeakMap,ot=new WeakMap,at=new WeakMap;class lt extends ht{constructor(){super(rt,rt.isValidEndpointPayload,"RTC")}}const pt={version:2,minimumVersion:0,type:"rtc"};class ut extends p{constructor(t){super(t,"channel"),this.ensureChannelOpened=t=>new Promise((e,n)=>{if("open"===t.readyState)e();else if("connecting"===t.readyState){const n=()=>{t.removeEventListener("open",n),e()};t.addEventListener("open",n)}else n(new Error("This Channel has already closed"))})}static createDataChannelPromise(t,e){let n;const i=new Promise(t=>{n=t}),r=i=>{const s=()=>{i.channel.removeEventListener("open",s),n(i.channel)};i.channel.label===t&&(i.channel.addEventListener("open",s),e.removeEventListener("datachannel",r))};return e.addEventListener("datachannel",r),i}async listenForProviderIce(t,e){await this.on(this.createProviderEventName(t),e,{timestamp:Date.now()})}async raiseProviderIce(t,e){await this.wire.environment.raiseEvent(this.createRouteString(this.createProviderEventName(t)),e)}async listenForClientIce(t,e){await this.on(this.createClientEventName(t),e,{timestamp:Date.now()})}async raiseClientIce(t,e){await this.wire.environment.raiseEvent(this.createRouteString(this.createClientEventName(t)),e)}cleanupIceListeners(t){this.removeAllListeners(this.createClientEventName(t)),this.removeAllListeners(this.createProviderEventName(t))}createClientEventName(t){return`ice-client-${t}`}createProviderEventName(t){return`ice-provider-${t}`}createRouteString(t){return`channel/${t}`}createRtcPeer(){return this.wire.environment.getRtcPeer()}async startClientOffer(){const t=Math.random().toString(),e=this.createRtcPeer();e.addEventListener("icecandidate",async e=>{e.candidate&&await this.raiseClientIce(t,{candidate:e.candidate?.toJSON()})}),await this.listenForProviderIce(t,async t=>{await e.addIceCandidate(t.candidate)});const n={request:e.createDataChannel("request"),response:e.createDataChannel("response")},i=await e.createOffer();await e.setLocalDescription(i);const r=Promise.all([n.request,n.response].map(this.ensureChannelOpened)).then(()=>{});return{rtcClient:e,channels:n,offer:i,rtcConnectionId:t,channelsOpened:r}}async finishClientOffer(t,e,n){return await t.setRemoteDescription(e),await n,!0}async createProviderAnswer(t,e){const n=this.createRtcPeer(),i=ut.createDataChannelPromise("request",n),r=ut.createDataChannelPromise("response",n);n.addEventListener("icecandidate",async e=>{e.candidate&&await this.raiseProviderIce(t,{candidate:e.candidate?.toJSON()})}),await this.listenForClientIce(t,async t=>{await n.addIceCandidate(t.candidate)}),await n.setRemoteDescription(e);const s=await n.createAnswer();await n.setLocalDescription(s);const o=Promise.all([i,r]).then(([e,n])=>(this.cleanupIceListeners(t),{request:e,response:n}));return{rtcClient:n,answer:s,channels:o}}}function wt(t){return[...t.split(".").reverse().entries()].reduce((t,[e,n])=>t+ +n*1e4**e,0)}function yt(t,e){const n=function(t){return t.split("/")[0]}(t);return function(t,e){return wt(t)>=wt(e)}(n,e)}var ft,gt,mt,vt,Ct,It=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)},xt=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n};class bt extends O{get connections(){return[...It(this,ft,"f")]}static handleClientDisconnection(t,e){if(e?.endpointId){const{uuid:n,name:i,endpointId:r,isLocalEndpointId:s}=e;It(t,vt,"f").call(t,{uuid:n,name:i,endpointId:r,isLocalEndpointId:s})}else{t.connections.filter(t=>t.uuid===e.uuid&&t.name===e.name).forEach(It(t,vt,"f"))}t.disconnectListener(e)}static setProviderRemoval(t,e){bt.removalMap.set(t,e)}constructor(t,e,n){super(),ft.set(this,void 0),gt.set(this,void 0),mt.set(this,void 0),vt.set(this,t=>{const e=this.connections.filter(e=>e.endpointId!==t.endpointId);It(this,mt,"f").closeEndpoint(t.endpointId),xt(this,ft,e,"f")}),this.processAction=async(t,e,n)=>(bt.clientIsMultiRuntime(n)&&!yt(n.runtimeUuid,"18.87.56.0")?this.handleMultiRuntimeLegacyClient(n):this.checkForClientConnection(n),super.processAction(t,e,n)),Ct.set(this,()=>{It(this,mt,"f").close();const t=bt.removalMap.get(this);t&&t()}),xt(this,gt,new G(t,e),"f"),this.connectListener=()=>{},this.disconnectListener=()=>{},xt(this,ft,[],"f"),xt(this,mt,n,"f"),n.receive(this.processAction)}dispatch(t,e,n){const i=t.endpointId??this.getEndpointIdForOpenFinId(t,e);if(i&&It(this,mt,"f").isEndpointConnected(i)){const t=m.getCallSite();return It(this,mt,"f").send(i,e,n).catch(i=>{throw new W(i,e,n,t)})}return Promise.reject(new Error(`Client connection with identity uuid: ${t.uuid} / name: ${t.name} / endpointId: ${i} no longer connected.`))}async processConnection(t,e){return It(this,ft,"f").push(t),this.connectListener(t,e)}publish(t,e){return this.connections.map(n=>It(this,mt,"f").send(n.endpointId,t,e))}onConnection(t){this.connectListener=t}onDisconnection(t){this.disconnectListener=t}async destroy(){const t=It(this,gt,"f");t.providerIdentity,xt(this,ft,[],"f"),await t.close(),It(this,Ct,"f").call(this)}async getAllClientInfo(){return this.connections.map(t=>{const{uuid:e,name:n,endpointId:i,entityType:r,connectionUrl:s}=t;return{uuid:e,name:n,endpointId:i,entityType:r,connectionUrl:s}})}checkForClientConnection(t){if(!this.isClientConnected(t))throw new Error(`This action was sent from a client that is not connected to the provider.\n                    Client Identity: {uuid: ${t.uuid}, name: ${t.name}, endpointId: ${t.endpointId}}`)}isClientConnected(t){return bt.clientIdentityIncludesEndpointId(t)?this.connections.some(e=>e.endpointId===t.endpointId&&e.uuid===t.uuid&&e.name===t.name):this.isLegacyClientConnected(t)}isLegacyClientConnected(t){return this.connections.some(e=>e.uuid===t.uuid&&e.name===t.name)}handleMultiRuntimeLegacyClient(t){if(!this.isLegacyClientConnected(t))throw new Error(`This action was sent from a client that is not connected to the provider. Client Identity:\n                    {uuid: ${t.uuid}, name: ${t.name}, endpointId: ${t.endpointId}}`)}getEndpointIdForOpenFinId(t,e){const n=this.connections.filter(e=>e.name===t.name&&e.uuid===t.uuid);if(n.length>=2){const n=It(this,gt,"f"),{uuid:i,name:r}=t,s=n?.providerIdentity.uuid,o=n?.providerIdentity.name;console.warn(`WARNING: Dispatch call may have unintended results. The "to" argument of your dispatch call is missing the\n                "endpointId" parameter. The identity you are dispatching to ({uuid: ${i}, name: ${r}})\n                has multiple channelClients for this channel. Your dispatched action: (${e}) from the provider:\n                ({uuid: ${s}, name: ${o}}) will only be processed by the most recently-created client.`)}return n.pop()?.endpointId}static clientIdentityIncludesEndpointId(t){return void 0!==t.endpointId}static clientIsMultiRuntime(t){return void 0!==t.runtimeUuid}static async wireClose(t,e){await t.sendAction("destroy-channel",{channelName:e})}}ft=new WeakMap,gt=new WeakMap,mt=new WeakMap,vt=new WeakMap,Ct=new WeakMap,bt.removalMap=new WeakMap;class At extends l{constructor(t){super(t),this.onmessage=t=>"process-channel-message"===t.action&&(this.processChannelMessage(t),!0),this.endpointMap=new Map,this.latestEndpointIdByChannelId=new Map,t.registerMessageHandler(this.onmessage.bind(this))}async processChannelMessage(t){const{senderIdentity:e,providerIdentity:n,action:i,ackToSender:r,payload:s,intendedTargetIdentity:o}=t.payload,a=o.channelId??o.endpointId??this.latestEndpointIdByChannelId.get(n.channelId),c=this.endpointMap.get(a);if(!c)return r.payload.success=!1,r.payload.reason=`Client connection with identity uuid: ${this.wire.me.uuid} / name: ${this.wire.me.name} / endpointId: ${a} no longer connected.`,r.payload.error=X(new Error(r.payload.reason)),this.wire.sendRaw(r);try{const t=await c(i,s,e);return r.payload.payload=r.payload.payload||{},r.payload.payload.result=t,this.wire.sendRaw(r)}catch(t){return r.payload.success=!1,r.payload.reason=t.message,r.payload.error=X(t),this.wire.sendRaw(r)}}addEndpoint(t,e,n){this.endpointMap.set(n,t),e!==n&&this.latestEndpointIdByChannelId.set(e,n)}removeEndpoint(t,e){this.endpointMap.delete(e),this.latestEndpointIdByChannelId.get(t)===e&&this.latestEndpointIdByChannelId.delete(t)}checkForPreviousClientConnection(t){const e=this.latestEndpointIdByChannelId.get(t);e&&(U.closeChannelByEndpointId(e),console.warn("You have created a second connection to an older provider. First connection has been removed from the clientMap"),console.warn("If the provider calls publish(), you may receive multiple messages."))}}class Et{constructor(t){this.ProtocolsInPreferenceOrder=t,this.DefaultClientProtocols=["classic"],this.DefaultProviderProtocols=["classic"],this.getClientProtocols=t=>{const e=t?this.ProtocolsInPreferenceOrder.filter(e=>t.includes(e)):this.DefaultClientProtocols;if(!e.length)throw new Error(`No valid protocols were passed in. Accepted values are: ${this.ProtocolsInPreferenceOrder.join(", ")}.`);return e},this.getProviderProtocols=t=>{const e=t?this.ProtocolsInPreferenceOrder.filter(e=>t.includes(e)):this.DefaultProviderProtocols;if(!e.length)throw new Error(`No valid protocols were passed in. Accepted values are: ${this.ProtocolsInPreferenceOrder.join(", ")}.`);return e},this.getCompatibleProtocols=(t,e)=>e.supportedProtocols.filter(e=>t.some(t=>t.type===e.type&&e.version>=t.minimumVersion&&t.version>=(e.minimumVersion??0))).slice(0,e.maxProtocols)}}class Pt{static combine(t,e){return new Pt(t,e)}constructor(t,e){this.primary=t,this.secondary=e}onEndpointDisconnect(t,e){this.primary.onEndpointDisconnect(t,()=>{this.secondary.isEndpointConnected(t)||e()}),this.secondary.onEndpointDisconnect(t,()=>{this.primary.isEndpointConnected(t)||e()})}isValidEndpointPayload(t){return this.primary.isValidEndpointPayload(t)||this.secondary.isValidEndpointPayload(t)}async closeEndpoint(t){await this.primary.closeEndpoint(t),await this.secondary.closeEndpoint(t)}isEndpointConnected(t){return this.primary.isEndpointConnected(t)||this.secondary.isEndpointConnected(t)}async addEndpoint(t,e){this.primary.isValidEndpointPayload(e)&&await this.primary.addEndpoint(t,e),this.secondary.isValidEndpointPayload(e)&&await this.secondary.addEndpoint(t,e)}receive(t){this.primary.receive(t),this.secondary.receive(t)}send(t,e,n){return this.primary.isEndpointConnected(t)?this.primary.send(t,e,n):this.secondary.send(t,e,n)}async close(){await Promise.all([this.primary.close(),this.secondary.close()])}}var Mt,St,kt=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n},Lt=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)};class Tt extends l{static getProtocolOptionsFromStrings(t){return t.map(t=>{switch(t){case"rtc":return pt;case"classic":return Q;default:return _(t,["rtc","classic"])}})}constructor(t){super(t),Mt.set(this,void 0),St.set(this,void 0),this.removeChannelFromProviderMap=t=>{this.providerMap.delete(t)},this.onmessage=t=>"process-channel-connection"===t.action&&(this.processChannelConnection(t),!0),this.providerMap=new Map,this.protocolManager=new Et("node"===this.wire.environment.type?["classic"]:["rtc","classic"]),kt(this,Mt,new At(t),"f"),kt(this,St,new ut(t),"f"),t.registerMessageHandler(this.onmessage.bind(this))}createProvider(t,e){const n=Object.assign(this.wire.environment.getDefaultChannelOptions().create,t||{}),i=this.protocolManager.getProviderProtocols(n?.protocols),r=i.map(t=>{switch(t){case"rtc":return new lt;case"classic":return new Z(this.wire,Lt(this,Mt,"f"),e.channelId,e);default:return _(t,["rtc","classic"])}});let s;if(2===r.length){const[t,e]=r;s=Pt.combine(t,e)}else{if(1!==r.length)throw new Error("failed to combine strategies");[s]=r}const o=new bt(e,()=>bt.wireClose(this.wire,e.channelName),s),a=e.channelId;return this.providerMap.set(a,{provider:o,strategy:s,supportedProtocols:Tt.getProtocolOptionsFromStrings(i)}),bt.setProviderRemoval(o,this.removeChannelFromProviderMap.bind(this)),o}async createClientOffer(t){const e=this.protocolManager.getClientProtocols(t?.protocols);let n;return{offer:{supportedProtocols:await Promise.all(e.map(async t=>{switch(t){case"rtc":{const{rtcClient:t,channels:e,offer:i,rtcConnectionId:r,channelsOpened:s}=await Lt(this,St,"f").startClientOffer();return n={rtcClient:t,channels:e,channelsOpened:s},{type:"rtc",version:pt.version,payload:{offer:i,rtcConnectionId:r}}}case"classic":return{type:"classic",version:Q.version};default:return _(t,["rtc","classic"])}})),maxProtocols:2},rtc:n}}async createClientStrategy(t,e){e.endpointId||(e.endpointId=this.wire.environment.getNextMessageId(),Lt(this,Mt,"f").checkForPreviousClientConnection(e.channelId));const n=e.answer??{supportedProtocols:[{type:"classic",version:1}]},i=(await Promise.all(n.supportedProtocols.map(async n=>"rtc"===n.type&&t?(await Lt(this,St,"f").finishClientOffer(t.rtcClient,n.payload.answer,t.channelsOpened),new lt):"classic"===n.type?new Z(this.wire,Lt(this,Mt,"f"),e.endpointId,e):null))).filter(t=>null!==t);let r;if(t&&!i.some(t=>t instanceof lt)&&t&&t.rtcClient.close(),i.length>=2)r=Pt.combine(i[0],i[1]);else{if(!i.length)throw new Error("No compatible protocols");[r]=i}const s={endpointIdentity:e,rtc:t};return r.addEndpoint(e.channelId,s),r}async processChannelConnection(t){const{clientIdentity:e,providerIdentity:n,ackToSender:i,payload:r,offer:s}=t.payload;e.endpointId?e.isLocalEndpointId=!1:(e.endpointId=this.wire.environment.getNextMessageId(),e.isLocalEndpointId=!0);const o=n.channelId,a=this.providerMap.get(o);if(!a)return i.payload.success=!1,i.payload.reason=`Channel "${n.channelName}" has been destroyed.`,this.wire.sendRaw(i);const{provider:c,strategy:d,supportedProtocols:h}=a;try{if(!(c instanceof bt))throw Error("Cannot connect to a channel client");const t=s??{supportedProtocols:[{type:"classic",version:1}],maxProtocols:1},n=this.protocolManager.getCompatibleProtocols(h,t);if(!n.length)throw new Error("This provider does not support any of the offered protocols.");const o=await c.processConnection(e,r);i.payload.payload=i.payload.payload||{};let a={supportedProtocols:[],endpointPayloadPromise:Promise.resolve({endpointIdentity:e})};return a=await n.reduce(async(t,e)=>{const n=await t;if("rtc"===e.type){const{answer:t,rtcClient:i,channels:r}=await Lt(this,St,"f").createProviderAnswer(e.payload.rtcConnectionId,e.payload.offer);n.supportedProtocols.push({type:"rtc",version:pt.version,payload:{answer:t}}),n.endpointPayloadPromise=n.endpointPayloadPromise.then(t=>r.then(e=>({...t,rtc:{rtcClient:i,channels:e}})))}else n.supportedProtocols.push({type:"classic",version:Q.version});return n},Promise.resolve(a)),a.endpointPayloadPromise.then(t=>d.addEndpoint(e.endpointId,t)),i.payload.payload.result=o,i.payload.payload.answer=a,this.wire.sendRaw(i)}catch(t){return i.payload.success=!1,i.payload.reason=t.message,this.wire.sendRaw(i)}}}Mt=new WeakMap,St=new WeakMap;var $t,Ft,Rt,Gt=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n},Ot=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)};function Wt(t){const e=Math.floor(t/10),n=Math.min(3e4,500*2**e);return new Promise(t=>{setTimeout(()=>{t(!1)},n)})}class jt extends p{constructor(e){super(e,"channel"),$t.set(this,void 0),Ft.set(this,new t.EventEmitter),Rt.set(this,new b(async()=>{await Promise.all([this.on("disconnected",t=>{U.handleProviderDisconnect(t)}),this.on("connected",(...t)=>{Ot(this,Ft,"f").emit("connected",...t)})]).catch(()=>new Error("error setting up channel connection listeners"))})),Gt(this,$t,new Tt(e),"f")}async getAllChannels(){return this.wire.sendAction("get-all-channels").then(({payload:t})=>t.data)}async onChannelConnect(t){await this.on("connected",t)}async onChannelDisconnect(t){await this.on("disconnected",t)}async safeConnect(t,e,n){const i={count:0};do{let r=()=>{};const s=new Promise(e=>{r=n=>{t===n.channelName&&e(!0)},Ot(this,Ft,"f").on("connected",r)});try{if(i.count>0){i.gotConnectedEvent=await Promise.race([Wt(i.count),s]);const e=await this.wire.sendAction("connect-to-channel",{...n,retryInfo:i});return console.log(`Successfully connected to channelName: ${t}`),e.payload.data}const e=this.wire.sendAction("connect-to-channel",n);i.originalMessageId=e.messageId;return(await e).payload.data}catch(n){if(!n.message.includes("internal-nack"))throw n;e&&0===i.count&&console.warn(`No channel found for channelName: ${t}. Waiting for connection...`)}finally{i.count+=1,Ot(this,Ft,"f").removeListener("connected",r)}}while(e);throw new Error(`No channel found for channelName: ${t}.`)}async connect(t,e={}){if(await Ot(this,Rt,"f").getValue(),!t||"string"!=typeof t)throw new Error("Please provide a channelName string to connect to a channel.");const n={wait:!0,...this.wire.environment.getDefaultChannelOptions().connect,...e},{offer:i,rtc:r}=await Ot(this,$t,"f").createClientOffer(n);let s;(this.fin.me.isFrame||this.fin.me.isView||this.fin.me.isWindow)&&(s=(await this.fin.me.getInfo()).url);const o={channelName:t,...n,offer:i,connectionUrl:s},a=await this.safeConnect(t,n.wait,o),c=await Ot(this,$t,"f").createClientStrategy(r,a),d=new U(a,()=>U.wireClose(this.wire,a,a.endpointId),c);return c.onEndpointDisconnect(a.channelId,async()=>{try{await d.sendDisconnectAction()}catch(t){console.warn(`Something went wrong during disconnect for client with uuid: ${a.uuid} / name: ${a.name} / endpointId: ${a.endpointId}.`)}finally{U.handleProviderDisconnect(a)}}),d}async create(t,e){if(!t)throw new Error("Please provide a channelName to create a channel");const{payload:{data:n}}=await this.wire.sendAction("create-channel",{channelName:t}),i=Ot(this,$t,"f").createProvider(e,n);return this.on("client-disconnected",e=>{e.channelName===t&&bt.handleClientDisconnection(i,e)}),i}}$t=new WeakMap,Ft=new WeakMap,Rt=new WeakMap;class Ht extends l{constructor(e){super(e),this.events={subscriberAdded:"subscriber-added",subscriberRemoved:"subscriber-removed"},this.refCounter=new F,this.Channel=new jt(e),this.emitter=new t.EventEmitter,e.registerMessageHandler(this.onmessage.bind(this)),this.on=this.emitter.on.bind(this.emitter),this.removeAllListeners=this.emitter.removeAllListeners.bind(this.emitter)}async publish(t,e){await this.wire.sendAction("publish-message",{topic:t,message:e,sourceWindowName:this.me.name})}async send(t,e,n){const i=v(t);if(i)throw new Error(i);await this.wire.sendAction("send-message",{destinationUuid:t.uuid,destinationWindowName:t.name,topic:e,message:n,sourceWindowName:this.me.name})}subscribe(t,e,n){const i=this.createSubscriptionKey(t.uuid,t.name||"*",e);return this.emitter.on(i,n),this.refCounter.actOnFirst(i,async()=>{await this.wire.sendAction("subscribe",{sourceUuid:t.uuid,sourceWindowName:t.name||"*",topic:e,destinationWindowName:this.me.name})},()=>Promise.resolve())}unsubscribe(t,e,n){const i=t.name||"*",r=this.createSubscriptionKey(t.uuid,i,e);return this.emitter.removeListener(r,n),this.refCounter.actOnLast(r,async()=>{await this.wire.sendAction("unsubscribe",{sourceUuid:t.uuid,sourceWindowName:i,topic:e,destinationWindowName:this.me.name})},()=>new Promise(t=>t).then(()=>{}))}processMessage(t){const{payload:{message:e,sourceWindowName:n,sourceUuid:i,topic:r}}=t,s=[this.createSubscriptionKey(i,n,r),this.createSubscriptionKey(i,"*",r),this.createSubscriptionKey("*","*",r)],o={uuid:i,name:n};s.forEach(t=>{this.emitter.emit(t,e,o)})}emitSubscriverEvent(t,e){const{payload:{targetName:n,uuid:i,topic:r}}=e,s={name:n,uuid:i,topic:r};this.emitter.emit(t,s)}createSubscriptionKey(t,e,n){const i=e||"*";if(!(t&&i&&n))throw new Error("Missing uuid, name, or topic string");return function(...t){return t.map(t=>btoa(t)).join("/")}(t,i,n)}onmessage(t){const{action:e}=t;switch(e){case"process-message":this.processMessage(t);break;case this.events.subscriberAdded:this.emitSubscriverEvent(this.events.subscriberAdded,t);break;case this.events.subscriberRemoved:this.emitSubscriverEvent(this.events.subscriberRemoved,t)}return!0}}class Nt extends l{async writeText(t){await this.wire.sendAction("clipboard-write-text",t)}async readText(t){const{payload:e}=await this.wire.sendAction("clipboard-read-text",{type:t});return e.data}async writeImage(t){await this.wire.sendAction("clipboard-write-image",t)}async readImage(t={format:"dataURL"}){const{payload:e}=await this.wire.sendAction("clipboard-read-image",t);return e.data}async writeHtml(t){await this.wire.sendAction("clipboard-write-html",t)}async readHtml(t){const{payload:e}=await this.wire.sendAction("clipboard-read-html",{type:t});return e.data}async writeRtf(t){await this.wire.sendAction("clipboard-write-rtf",t)}async readRtf(t){const{payload:e}=await this.wire.sendAction("clipboard-read-rtf",{type:t});return e.data}async write(t){await this.wire.sendAction("clipboard-write",t)}async getAvailableFormats(t){const{payload:e}=await this.wire.sendAction("clipboard-read-formats",{type:t});return e.data}}class Bt extends p{constructor(t,e){super(t,"external-application",e.uuid),this.identity=e}getInfo(){return this.wire.sendAction("get-external-application-info",this.identity).then(({payload:t})=>t.data)}}class Dt extends l{wrap(t){return this.wire.recordAnalytic("external-application-wrap"),Promise.resolve(new Bt(this.wire,{uuid:t}))}wrapSync(t){return this.wire.recordAnalytic("external-application-wrap-sync"),new Bt(this.wire,{uuid:t})}}class Vt extends p{constructor(t,e){super(t,"frame",e.uuid,e.name),this.identity=e}getInfo(){return this.wire.sendAction("get-frame-info",this.identity).then(({payload:t})=>t.data)}getParentWindow(){return this.wire.sendAction("get-parent-window",this.identity).then(({payload:t})=>t.data)}}class Ut extends l{async wrap(t){this.wire.recordAnalytic("frame-wrap");const e=v(t);if(e)throw new Error(e);return new Vt(this.wire,t)}wrapSync(t){this.wire.recordAnalytic("frame-wrap-sync");const e=v(t);if(e)throw new Error(e);return new Vt(this.wire,t)}getCurrent(){return this.wire.recordAnalytic("frame-get-current"),Promise.resolve(new Vt(this.wire,this.wire.environment.getCurrentEntityIdentity()))}getCurrentSync(){return this.wire.recordAnalytic("frame-get-current-sync"),new Vt(this.wire,this.wire.environment.getCurrentEntityIdentity())}}class _t extends p{constructor(t){super(t,"global-hotkey")}async register(t,e){await this.on(t,e),await this.wire.sendAction("global-hotkey-register",{hotkey:t})}async unregister(t){await this.removeAllListeners(t),await this.wire.sendAction("global-hotkey-unregister",{hotkey:t})}async unregisterAll(){await Promise.all(this.eventNames().filter(t=>!("registered"===t||"unregistered"===t)).map(t=>this.removeAllListeners(t))),await this.wire.sendAction("global-hotkey-unregister-all",{})}async isRegistered(t){const{payload:{data:e}}=await this.wire.sendAction("global-hotkey-is-registered",{hotkey:t});return e}}var qt,zt,Jt=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n},Yt=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)};class Kt extends p{constructor(t,e,n=`custom-frame-${e.uuid}`){super(t,"application",e.uuid),qt.set(this,void 0),this.getClient=(t=this.identity)=>{if(t.uuid!==this.identity.uuid)return new Kt(this.wire,t).getClient();if(this.wire.sendAction("platform-get-client",this.identity).catch(t=>{}),!Kt.clientMap.has(Yt(this,qt,"f"))){const t=Yt(this,zt,"f").call(this);Kt.clientMap.set(Yt(this,qt,"f"),t)}return Kt.clientMap.get(Yt(this,qt,"f"))},zt.set(this,async()=>{try{const t=await this._channel.connect(Yt(this,qt,"f"),{wait:!1});return t.onDisconnection(()=>{Kt.clientMap.delete(Yt(this,qt,"f"))}),t}catch(t){throw Kt.clientMap.delete(Yt(this,qt,"f")),new Error("The targeted Platform is not currently running. Listen for application-started event for the given Uuid.")}}),this.launchLegacyManifest=this.launchContentManifest;const i=v(e);if(i)throw new Error(i);Jt(this,qt,n,"f"),this._channel=this.fin.InterApplicationBus.Channel,this.identity={uuid:e.uuid},this.Layout=this.fin.Platform.Layout,this.Application=this.fin.Application.wrapSync(this.identity)}async createView(t,e,n){this.wire.sendAction("platform-create-view",this.identity).catch(t=>{});const i=await this.getClient(),r=await i.dispatch("create-view",{target:e,opts:t,targetView:n});if(!r||v(r.identity))throw new Error(`When overwriting the createView call, please return an object that has a valid 'identity' property: ${JSON.stringify(r)}`);return this.fin.View.wrapSync(r.identity)}async createWindow(t){this.wire.sendAction("platform-create-window",this.identity).catch(t=>{});const e=await this.getClient();t.reason||(t.reason="api-call");const n=await e.dispatch("create-view-container",t);if(!n||v(n.identity))throw new Error(`When overwriting the createWindow call, please return an object that has a valid 'identity' property: ${JSON.stringify(n)}`);const{identity:i}=n,r=this.fin.Window.wrapSync(i);return r.name=i.name,r.uuid=i.uuid,r}async quit(){this.wire.sendAction("platform-quit",this.identity).catch(t=>{});return(await this.getClient()).dispatch("quit")}async closeView(t){this.wire.sendAction("platform-close-view",this.identity).catch(t=>{});const e=await this.getClient();await e.dispatch("close-view",{view:t})}async reparentView(t,e){console.warn("Platform.reparentView has been deprecated, please use Platform.createView"),this.wire.sendAction("platform-reparent-view",this.identity).catch(t=>{});const n={...t,uuid:t.uuid??this.identity.uuid},i=await this.fin.View.wrap(n),r=await i.getOptions();return this.createView(r,e)}async getSnapshot(){this.wire.sendAction("platform-get-snapshot",this.identity).catch(t=>{});return(await this.getClient()).dispatch("get-snapshot")}async getViewSnapshot(t){return(await this.getClient()).dispatch("get-view-snapshot",{viewIdentity:t})}async applySnapshot(t,e){this.wire.sendAction("platform-apply-snapshot",this.identity).catch(t=>{});const n="Requested snapshot must be a valid Snapshot object, or a url or filepath to such an object.";let i;if("string"==typeof t)try{i=(await this._channel.wire.sendAction("get-application-manifest",{manifestUrl:t})).payload.data}catch(t){throw new Error(`${n}: ${t}`)}else i=t;if(!i.windows)throw new Error(n);const r=await this.getClient();return await r.dispatch("apply-snapshot",{snapshot:i,options:e}),this}async fetchManifest(t){return(await this.getClient()).dispatch("platform-fetch-manifest",{manifestUrl:t})}async launchContentManifest(t){this.wire.sendAction("platform-launch-content-manifest",this.identity).catch(()=>{});const e=await this.getClient(),n=await this.fetchManifest(t);return e.dispatch("launch-into-platform",{manifest:n,manifestUrl:t}),this}async setWindowContext(t={},e){if(this.wire.sendAction("platform-set-window-context",this.identity).catch(t=>{}),!t)throw new Error("Please provide a serializable object or string to set the context.");const n=await this.getClient(),{entityType:i}=e?await this.fin.System.getEntityInfo(e.uuid,e.name):this.fin.me;await n.dispatch("set-window-context",{context:t,entityType:i,target:e||{uuid:this.fin.me.uuid,name:this.fin.me.name}})}async getWindowContext(t){this.wire.sendAction("platform-get-window-context",this.identity).catch(t=>{});const e=await this.getClient(),{entityType:n}=t?await this.fin.System.getEntityInfo(t.uuid,t.name):this.fin.me;return e.dispatch("get-window-context",{target:t||{uuid:this.fin.me.uuid,name:this.fin.me.name},entityType:n})}async closeWindow(t,e={skipBeforeUnload:!1}){this.wire.sendAction("platform-close-window",this.identity).catch(t=>{});return(await this.getClient()).dispatch("close-window",{windowId:t,options:e})}}qt=new WeakMap,zt=new WeakMap,Kt.clientMap=new Map;class Zt{constructor(t){this.strategy=t,this.consume=async t=>(await this.strategy.getExposedFunctions(t)).reduce((e,n)=>({...e,[n.key]:this.strategy.createFunction(n,t)}),{})}}class Qt{constructor(t){this.channel=t,this.getExposedFunctions=async t=>{const{id:e}=t,{props:n}=await this.channel.dispatch(`api-meta:${e}`);return n},this.createFunction=t=>(...e)=>{const{action:n}=t.options;return this.channel.dispatch(n,{args:e})}}}const Xt=["no longer connected","RTCDataChannel closed unexpectedly","The client you are trying to dispatch from is disconnected from the target provider"],te=(t,e,n,i)=>async(r,s)=>{try{return await t.dispatch(`relay:${n}`,{action:r,payload:s,target:e})}catch(t){if(o=t.message,Xt.some(t=>o.includes(t))&&i)throw new Error(i);throw t}// removed by dead control flow
 var o; };var ee,ne,ie,re=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n},se=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)};class oe{constructor(t,e){ee.set(this,void 0),this.isRoot=()=>se(this,ee,"f").isRoot(this.entityId),this.exists=()=>se(this,ee,"f").exists(this.entityId),this.getParent=async()=>{const t=await se(this,ee,"f").getParent(this.entityId);if(t)return oe.getEntity(t,se(this,ee,"f"))},this.createAdjacentStack=async(t,e)=>{const n=await se(this,ee,"f").createAdjacentStack(this.entityId,t,e);return oe.getEntity({entityId:n,type:"stack"},se(this,ee,"f"))},this.getAdjacentStacks=async t=>(await se(this,ee,"f").getAdjacentStacks({targetId:this.entityId,edge:t})).map(t=>oe.getEntity({type:"stack",entityId:t.entityId},se(this,ee,"f"))),re(this,ee,t,"f"),this.entityId=e}}ee=new WeakMap,oe.newLayoutEntitiesClient=async(t,e,n)=>{const i=te(t,n,"layout-relay","You are trying to interact with a layout component on a window that does not exist or has been destroyed.");return new Zt(new Qt({dispatch:i})).consume({id:e})},oe.getEntity=(t,e)=>{const{entityId:n,type:i}=t;switch(i){case"column":case"row":return new ce(e,n,i);case"stack":return new ae(e,n);default:throw new Error(`Unrecognised Layout Entity encountered ('${JSON.stringify(t)})`)}};class ae extends oe{constructor(t,e){super(t,e),ne.set(this,void 0),this.type="stack",this.getViews=()=>se(this,ne,"f").getStackViews(this.entityId),this.addView=async(t,e={index:0})=>se(this,ne,"f").addViewToStack(this.entityId,t,e),this.removeView=async t=>{await se(this,ne,"f").removeViewFromStack(this.entityId,t)},this.setActiveView=async t=>{await se(this,ne,"f").setStackActiveView(this.entityId,t)},re(this,ne,t,"f")}}ne=new WeakMap;class ce extends oe{constructor(t,e,n){super(t,e),ie.set(this,void 0),this.getContent=async()=>(await se(this,ie,"f").getContent(this.entityId)).map(t=>oe.getEntity(t,se(this,ie,"f"))),re(this,ie,t,"f"),this.type=n}}ie=new WeakMap;const de="layout-entities";var he,le,pe,ue=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)};class we extends l{static getClient(t){return ue(t,le,"f").getValue()}constructor(t,e){super(e),he.add(this),le.set(this,new x(async()=>oe.newLayoutEntitiesClient(await this.platform.getClient(),de,this.identity))),this.replace=async t=>{this.wire.sendAction("layout-replace").catch(t=>{});const e=await this.platform.getClient();await e.dispatch("replace-layout",{target:this.identity,opts:{layout:t}})},this.replaceView=async(t,e)=>{this.wire.sendAction("layout-replace-view").catch(t=>{});const n=await this.platform.getClient();await n.dispatch("replace-view",{target:this.identity,opts:{viewToReplace:t,newView:e}})},this.applyPreset=async t=>{this.wire.sendAction("layout-apply-preset").catch(t=>{});const e=await this.platform.getClient(),{presetType:n}=t;if(!n||!function(t){switch(t){case"columns":case"grid":case"rows":case"tabs":return!0;default:return!1}}(n))throw new Error("Cannot apply preset layout, please include an applicable presetType property in the PresetLayoutOptions.");await e.dispatch("apply-preset-layout",{target:this.identity,opts:{presetType:n}})};const n=v(t);if(n)throw new Error(n);this.identity=t,this.platform=this.fin.Platform.wrapSync({uuid:t.uuid}),t.uuid===this.fin.me.uuid&&t.name===this.fin.me.name&&(this.init=this.fin.Platform.Layout.init)}async getConfig(){this.wire.sendAction("layout-get-config").catch(t=>{});return(await this.platform.getClient()).dispatch("get-frame-snapshot",{target:this.identity})}async getCurrentViews(){this.wire.sendAction("layout-get-views").catch(t=>{});const t=await this.platform.getClient();return(await t.dispatch("get-layout-views",{target:this.identity})).map(t=>this.fin.View.wrapSync(t))}async getRootItem(){this.wire.sendAction("layout-get-root-item").catch(()=>{});const t=await ue(this,le,"f").getValue(),e=await t.getRoot("layoutName"in this.identity?this.identity:void 0);return oe.getEntity(e,t)}async getStackByViewIdentity(t){this.wire.sendAction("layout-get-stack-by-view").catch(()=>{});const e=await ue(this,le,"f").getValue(),n=await e.getStackByView(t);if(!n)throw new Error(`No stack found for view: ${t.uuid}/${t.name}`);return oe.getEntity(n,e)}async addView(t,{location:e,targetView:n}={}){this.wire.sendAction("layout-add-view").catch(t=>{});const{identity:i}=await ue(this,he,"m",pe).call(this,"layout-add-view",{viewOptions:t,location:e,targetView:n});return{identity:i}}async closeView(t){this.wire.sendAction("layout-close-view").catch(t=>{}),await ue(this,he,"m",pe).call(this,"layout-close-view",{viewIdentity:t})}}le=new WeakMap,he=new WeakSet,pe=async function(t,e){return(await this.platform.getClient()).dispatch(t,{target:this.identity,opts:e})};var ye,fe,ge,me,ve,Ce=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)},Ie=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n};class xe extends l{constructor(){super(...arguments),ye.add(this),fe.set(this,!1),ge.set(this,null),this.init=async(t={})=>{if(this.wire.recordAnalytic("layout-init"),!this.wire.environment.layoutAllowedInContext(this.fin))throw new Error("Layout.init can only be called from a Window context.");if(Ce(this,fe,"f"))throw new Error("Layout.init was already called, please use Layout.create to add additional layouts.");"openfin"===this.wire.environment.type&&await this.fin.Platform.getCurrentSync().getClient(),Ie(this,fe,!0,"f"),Ie(this,ge,await this.wire.environment.initLayoutManager(this.fin,this.wire,t),"f"),await this.wire.environment.applyLayoutSnapshot(this.fin,Ce(this,ge,"f"),t);const e={name:this.fin.me.name,uuid:this.fin.me.uuid};if(!t.layoutManagerOverride){const t={layoutName:"__default__",...e};return Ce(this,me,"f").call(this,t)}return this.wrapSync(e)},me.set(this,t=>{const e="[Layout] You are using a deprecated property `layoutManager` - it will throw if you access it starting in v37.",n=new Proxy({},{get(t,n){throw console.warn(`[Layout-mgr-proxy] accessing ${n.toString()}`),new Error(e)}}),i=Object.assign(this.wrapSync(t),{layoutManager:n});return new Proxy(i,{get(t,n){if("layoutManager"===n)throw console.warn(`[Layout-proxy] accessing ${n.toString()}`),new Error(e);return t[n]}})}),this.getCurrentLayoutManagerSync=()=>Ce(this,ye,"m",ve).call(this,"fin.Platform.Layout.getCurrentLayoutManagerSync()"),this.create=async t=>this.wire.environment.createLayout(Ce(this,ye,"m",ve).call(this,"fin.Platform.Layout.create()"),t),this.destroy=async t=>this.wire.environment.destroyLayout(Ce(this,ye,"m",ve).call(this,"fin.Platform.Layout.destroy()"),t)}async wrap(t){return this.wire.recordAnalytic("layout-wrap"),new we(t,this.wire)}wrapSync(t){return this.wire.recordAnalytic("layout-wrap-sync"),new we(t,this.wire)}async getCurrent(){if(this.wire.recordAnalytic("layout-get-current"),"openfin"===this.wire.environment.type&&!this.fin.me.isWindow)throw new Error("You are not in a Window context.  Only Windows can have a Layout.");const{uuid:t,name:e}=this.fin.me;return this.wrap({uuid:t,name:e})}getCurrentSync(){if(this.wire.recordAnalytic("layout-get-current-sync"),"openfin"===this.wire.environment.type&&!this.fin.me.isWindow)throw new Error("You are not in a Window context.  Only Windows can have a Layout.");const{uuid:t,name:e}=this.fin.me;return this.wrapSync({uuid:t,name:e})}async getLayoutByViewIdentity(t){this.wire.recordAnalytic("layout-get-by-view-identity");let e=await this.wire.environment.getViewWindowIdentity(this.fin,t);e.identity&&(e=e.identity);try{const n=this.wrapSync(e),i=await we.getClient(n),r=await i.getLayoutIdentityForViewOrThrow(t);return this.wrapSync(r)}catch(n){if(!["No action registered at target for","getLayoutIdentityForViewOrThrow is not a function"].some(t=>n.message.includes(t)))throw n;if(e.uuid===e.name)throw new Error(`View identity ${JSON.stringify(t)} is not attached to any layout in provider window ${JSON.stringify(e)}.`);return this.wrapSync(e)}}}fe=new WeakMap,ge=new WeakMap,me=new WeakMap,ye=new WeakSet,ve=function(t){if(!Ce(this,ge,"f"))throw new Error(`You must call init before using the API ${t}`);return Ce(this,ge,"f")};class be extends l{constructor(t,e){super(t),this._channel=e,this.Layout=new xe(this.wire)}async init(t){if(!fin.__internal_.isPlatform||fin.me.name!==fin.me.uuid)throw new Error("fin.Platform.init should only be called from a custom platform provider running in the main window of the application.");return this.wire.environment.initPlatform(this.fin,t)}async wrap(t){return this.wire.recordAnalytic("platform-wrap"),new Kt(this.wire,{uuid:t.uuid})}wrapSync(t){return this.wire.recordAnalytic("platform-wrap-sync"),new Kt(this.wire,{uuid:t.uuid})}async getCurrent(){return this.wire.recordAnalytic("platform-get-current"),this.wrap({uuid:this.wire.me.uuid})}getCurrentSync(){return this.wire.recordAnalytic("platform-get-current-sync"),this.wrapSync({uuid:this.wire.me.uuid})}start(t){return this.wire.recordAnalytic("platform-start"),new Promise(async(e,n)=>{try{const{uuid:n}=t,i=await this.fin.Application._create({...t,isPlatformController:!0});i.once("platform-api-ready",()=>e(this.wrapSync({uuid:n}))),i._run({uuid:n})}catch(t){n(t)}})}startFromManifest(t,e){return this.wire.recordAnalytic("platform-start-from-manifest"),new Promise(async(n,i)=>{try{const i=await this.fin.Application._createFromManifest(t);i.once("platform-api-ready",()=>n(this.wrapSync({uuid:i.identity.uuid}))),i._run(e)}catch(t){i(t)}})}}const Ae="You are not running in OpenFin.";function Ee(t,e,n){return{...{isView:"view"===t,isWindow:"window"===t,isFrame:"iframe"===t,isExternal:"external connection"===t},uuid:e,name:n,entityType:t}}const Pe=()=>`${Math.random()}${Date.now()}`,Me=(t,e)=>(...n)=>{try{return t(...n)}catch(t){throw new Error((e||"")+t)}},Se=(t,e)=>async n=>{try{await t(n)}catch(t){throw console.error(`Error thrown by handler ${e} for context type ${n.type}: ${t}`),t}},ke=(t,e)=>`You have tried to to use ${t} but ${e} has not been overridden in the Interop Broker. Please override this function. Refer to our documentation for more info.`,Le=(t,e,n,i)=>{const{uuid:r,name:s}=n;return i?`Entity with identity: ${r}/${s} has called ${i} or ${t} but ${e} has not been overridden.`:`Entity with identity: ${r}/${s} has called ${t} but ${e} has not been overridden.`},Te={fireIntent:ke("fireIntent","handleFiredIntent"),fireIntentForContext:ke("fireIntentForContext","handleFiredIntentForContext"),getInfoForIntent:ke("getInfoForIntent","handleInfoForIntent"),getInfoForIntentsByContext:ke("getInfoForIntentsByContext","handleInfoForIntentsByContext"),joinSessionContextGroupWithJoinContextGroup:"The Context Group you have tried to join is a Session Context Group. Custom Context Groups can only be defined by the Interop Broker through code or manifest configuration. Please use joinSessionContextGroup.",fdc3Open:ke("fdc3.open","fdc3HandleOpen"),fdc3FindInstances:ke("fdc3.findInstances","fdc3HandleFindInstances"),fdc3GetAppMetadata:ke("fdc3.getAppMetadata","fdc3HandleGetAppMetadata"),fdc3GetInfo:ke("fdc3.getInfo","fdc3HandleGetInfo")},$e=t=>t?"object"!=typeof t?{isValid:!1,reason:"Context must be an Object"}:t.type?{isValid:!0}:{isValid:!1,reason:"Context must have a type property"}:{isValid:!1,reason:"No context supplied"};class Fe{constructor(t,e){this.provider=t,this.id=e,this.lastContext=void 0,this.contextGroupMap=new Map,this.clients=new Map,this.registerListeners()}registerListeners(){this.provider.register(`sessionContextGroup:getContext-${this.id}`,this.getCurrentContext.bind(this)),this.provider.register(`sessionContextGroup:setContext-${this.id}`,this.setContext.bind(this)),this.provider.register(`sessionContextGroup:handlerAdded-${this.id}`,this.handlerAdded.bind(this)),this.provider.register(`sessionContextGroup:handlerRemoved-${this.id}`,this.handlerRemoved.bind(this))}getCurrentContext(t){return t.type?this.contextGroupMap.get(t.type):this.lastContext}setContext(t,e){const{context:n}=t,i=$e(n);if(!1===i.isValid)throw new Error(`Failed to set Context - bad Context. Reason: ${i.reason}. Context: ${JSON.stringify(n)}`);if(!this.getClientState(e))throw new Error(`Client with Identity: ${e.uuid} ${e.name} not in Session Client State Map`);this.contextGroupMap.set(n.type,n),this.lastContext=n;Array.from(this.clients.values()).forEach(t=>{t.contextHandlers.get(n.type)?.forEach(e=>{this.provider.dispatch(t.clientIdentity,e,n)}),t.globalHandler&&this.provider.dispatch(t.clientIdentity,t.globalHandler,n)})}getClientState(t){return this.clients.get(t.endpointId)}async handlerAdded(t,e){const{handlerId:n,contextType:i}=t,r=this.getClientState(e);if(!r)throw new Error(`Client with Identity: ${e.uuid} ${e.name} not in Client State Map`);if(i){const t=r.contextHandlers.get(i)||[];r.contextHandlers.set(i,[...t,n]);const s=this.contextGroupMap.get(i);s&&await this.provider.dispatch(e,n,s)}else{r.globalHandler=n;const t=[...this.contextGroupMap.keys()].map(async t=>{const i=this.contextGroupMap.get(t);i&&await this.provider.dispatch(e,n,i)});await Promise.all(t)}}handlerRemoved(t,e){const{handlerId:n}=t,i=this.clients.get(e.endpointId);i?(Array.from(i.contextHandlers).forEach(([,t])=>{const e=t.indexOf(n);e>-1&&t.splice(e,1)}),i.globalHandler===n&&(i.globalHandler=void 0)):console.warn(`Trying to remove a handler from a client that isn't mapped. handlerId: ${n}. clientIdentity: ${e}`)}registerNewClient(t){if(!this.clients.has(t.endpointId)){const e={contextHandlers:new Map,clientIdentity:t,globalHandler:void 0};this.clients.set(t.endpointId,e)}}onDisconnection(t){this.clients.delete(t.endpointId)}}class Re{constructor(t,e,n){this.provider=t,this.id=e,this.clients=new Map,this.registerListeners(),this.contextByContextType=new Map,this.lastContext=void 0,this.provider.onConnection(t=>this.registerNewClient(t)),this.removePrivateChannelProvider=n,this.provider.onDisconnection(async t=>{const{endpointId:e}=t;this.clients.has(e)&&await this.handleClientDisconnecting(t),0===(await this.provider.getAllClientInfo()).length&&(this.provider.destroy(),this.removePrivateChannelProvider(this.id))})}getClientState(t){return this.clients.get(t.endpointId)}registerListeners(){this.provider.register("broadcast",this.broadcast.bind(this)),this.provider.register("getCurrentContext",this.getCurrentContext.bind(this)),this.provider.register("contextHandlerAdded",this.contextHandlerAdded.bind(this)),this.provider.register("contextHandlerRemoved",this.contextHandlerRemoved.bind(this)),this.provider.register("nonStandardHandlerRemoved",this.nonStandardHandlerRemoved.bind(this)),this.provider.register("onAddContextHandlerAdded",this.onAddContextHandlerAdded.bind(this)),this.provider.register("onDisconnectHandlerAdded",this.onDisconnectHandlerAdded.bind(this)),this.provider.register("onUnsubscribeHandlerAdded",this.onUnsubscribeHandlerAdded.bind(this)),this.provider.register("clientDisconnecting",(t,e)=>{this.handleClientDisconnecting(e)})}broadcast(t,e){const{context:n}=t;if(!this.getClientState(e))throw new Error(`Client with Identity: ${e.uuid} ${e.name}, tried to call broadcast, is not connected to this Private Channel`);const i=$e(n);if(!1===i.isValid)throw new Error(`Failed to broadcast - bad Context. Reason: ${i.reason}. Context: ${JSON.stringify(n)}`);this.contextByContextType.set(n.type,n),this.lastContext=n,Array.from(this.clients.values()).forEach(t=>{const e=t.handlerIdsByContextTypes.get(n.type);e&&e.forEach(e=>{this.provider.dispatch(t.clientIdentity,e,n)}),t.globalHandler&&this.provider.dispatch(t.clientIdentity,t.globalHandler,n)})}getCurrentContext(t,e){const{contextType:n}=t;if(!this.getClientState(e))throw new Error(`Client with Identity: ${e.uuid} ${e.name}, tried to call getCurrentContext, is not connected to this Private Channel`);if(void 0!==n){const t=this.contextByContextType.get(n);return t||null}return this.lastContext?this.lastContext:null}contextHandlerAdded(t,e){const{handlerId:n,contextType:i}=t,r=this.getClientState(e);if(!r)throw new Error(`Client with Identity: ${e.uuid} ${e.name}, tried to call addContextListener, is not connected to this Private Channel`);if(i){const t=r.handlerIdsByContextTypes.get(i)||[];r.handlerIdsByContextTypes.set(i,[...t,n])}else r.globalHandler=n;Array.from(this.clients.values()).forEach(t=>{t.clientIdentity.endpointId!==e.endpointId&&t.onAddContextListenerHandlerId&&this.provider.dispatch(t.clientIdentity,t.onAddContextListenerHandlerId,i)})}async contextHandlerRemoved(t,e){const{handlerId:n}=t,i=this.getClientState(e);if(i){let t;if(i.globalHandler===n)i.globalHandler=void 0;else for(const[e,r]of i.handlerIdsByContextTypes){const i=r.indexOf(n);i>-1&&(r.splice(i,1),t=e)}const r=(await this.getConnectedClients()).map(async n=>{const{clientIdentity:i,clientIdentity:{endpointId:r},onUnsubscribeHandlerId:s}=n;r!==e.endpointId&&s&&await this.provider.dispatch(i,s,t)});try{await Promise.all(r)}catch(t){throw console.error(`Problem when attempting to dispatch to onUnsubscribeHandlers. Error: ${t} Removing Client: ${n}. uuid: ${e.uuid}. name: ${e.name}. endpointId: ${e.endpointId}`),new Error(t)}}else console.warn(`Trying to remove a handler from a client that isn't mapped. handlerId: ${n}. uuid: ${e.uuid}. name: ${e.name}. endpointId: ${e.endpointId}.`)}nonStandardHandlerRemoved(t,e){const{handlerId:n}=t,i=this.getClientState(e);i?i.onDisconnectHandlerId===n?i.onDisconnectHandlerId=void 0:i.onAddContextListenerHandlerId===n?i.onAddContextListenerHandlerId=void 0:i.onUnsubscribeHandlerId===n&&(i.onUnsubscribeHandlerId=void 0):console.warn(`Trying to remove a handler from a client that isn't mapped. handlerId: ${n}. clientIdentity: ${e}`)}onAddContextHandlerAdded(t,e){const n=this.getClientState(e),{handlerId:i}=t;if(!n)throw new Error(`Client with Identity: ${e.uuid} ${e.name}, tried to call onAddContextListener, is not connected to this Private Channel`);n.onAddContextListenerHandlerId=i,Array.from(this.clients.values()).forEach(t=>{t.clientIdentity.endpointId!==e.endpointId&&Array.from(t.handlerIdsByContextTypes.keys()).forEach(t=>{this.provider.dispatch(e,i,t)})})}onDisconnectHandlerAdded(t,e){const n=this.getClientState(e),{handlerId:i}=t;if(!n)throw new Error(`Client with Identity: ${e.uuid} ${e.name}, tried to call onDisconnect, is not connected to this Private Channel`);n.onDisconnectHandlerId=i}onUnsubscribeHandlerAdded(t,e){const n=this.getClientState(e),{handlerId:i}=t;if(!n)throw new Error(`Client with Identity: ${e.uuid} ${e.name}, tried to call onUnsubscribe, is not connected to this Private Channel`);n.onUnsubscribeHandlerId=i}removeClient(t){const e=this.getClientState(t);if(!e)throw new Error(`Client with Identity: ${t.uuid} ${t.name}, tried to call disconnect, is not connected to this Private Channel`);e.handlerIdsByContextTypes.clear(),this.clients.delete(t.endpointId)}async fireOnDisconnectForOtherClients(t){const{endpointId:e}=t,n=(await this.getConnectedClients()).map(async t=>{const{clientIdentity:{endpointId:n},onDisconnectHandlerId:i}=t;n!==e&&i&&await this.provider.dispatch(t.clientIdentity,i)});try{await Promise.all(n)}catch(e){throw console.error(`Problem when attempting to dispatch to onDisconnectHandlers. Error: ${e} Disconnecting Client: uuid: ${t.uuid}. name: ${t.name}. endpointId: ${t.endpointId}`),new Error(e)}}async unsubscribeAll(t){const{endpointId:e}=t,n=this.clients.get(e);if(n){const e=Array.from(n.handlerIdsByContextTypes.values()).flat(),i=n.globalHandler;if(e.length>0){const n=e.map(async e=>this.contextHandlerRemoved({handlerId:e},t));try{await Promise.all(n)}catch(t){console.error(t.message)}}if(i)try{await this.contextHandlerRemoved({handlerId:i},t)}catch(t){console.error(t.message)}}}async handleClientDisconnecting(t){await this.unsubscribeAll(t),this.removeClient(t),await this.fireOnDisconnectForOtherClients(t)}registerNewClient(t){if(!this.clients.has(t.endpointId)){const e={clientIdentity:t,handlerIdsByContextTypes:new Map,globalHandler:void 0,onAddContextListenerHandlerId:void 0,onUnsubscribeHandlerId:void 0,onDisconnectHandlerId:void 0};this.clients.set(t.endpointId,e)}}async getConnectedClients(){const t=await this.provider.getAllClientInfo();return Array.from(this.clients.values()).filter(e=>{const{uuid:n,name:i}=e.clientIdentity;return t.some(t=>i===t.name&&n===t.uuid)})}static init(t,e,n){return new Re(t,e,n)}}var Ge,Oe,We,je=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n},He=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)};const Ne=[{id:"green",displayMetadata:{color:"#00CC88",name:"green"}},{id:"purple",displayMetadata:{color:"#8C61FF",name:"purple"}},{id:"orange",displayMetadata:{color:"#FF8C4C",name:"orange"}},{id:"red",displayMetadata:{color:"#FF5E60",name:"red"}},{id:"pink",displayMetadata:{color:"#FF8FB8",name:"pink"}},{id:"yellow",displayMetadata:{color:"#E9FF8F",name:"yellow"}}];class Be extends l{constructor(t,e,n){super(t),Ge.set(this,void 0),Oe.set(this,void 0),We.set(this,void 0),this.getProvider=()=>He(this,We,"f").getValue(),this.interopClients=new Map,this.contextGroupsById=new Map,je(this,Oe,n.contextGroups??[...Ne],"f"),je(this,Ge,n.fdc3Info,"f"),n?.logging&&(this.logging=n.logging),this.intentClientMap=new Map,this.lastContextMap=new Map,this.sessionContextGroupMap=new Map,this.privateChannelProviderMap=new Map,je(this,We,new x(e),"f"),this.setContextGroupMap(),this.setupChannelProvider()}static createClosedConstructor(...t){return class extends Be{constructor(...n){if(n.length){const[i,r,s]=n;if(s&&"object"==typeof s&&!e.isEqual(s,t[2]))return console.warn("You have modified the parameters of the InteropOverride constructor. This behavior is deprecated and will be removed in a future version. You can modify these options in your manifest. Please consult our Interop docs for guidance on migrating to the new override scheme."),void super(t[0],t[1],s);console.warn("You are attempting to pass arguments to the InteropOverride constructor. This is not necessary, and these passed arguments will be ignored. You are likely using an older InteropBroker override scheme. Please consult our Interop docs for guidance on migrating to the new override scheme.")}super(...t)}}}setContext({context:t},e){this.wire.sendAction("interop-broker-set-context").catch(t=>{});const n=this.getClientState(e);if(!n||!n.contextGroupId)throw n?new Error("You must join a context group before you can set context."):new Error(`Client with Identity: ${e.uuid} ${e.name} not in Client State Map`);{const{contextGroupId:e}=n;this.setContextForGroup({context:t},e)}}setContextForGroup({context:t},e){this.wire.sendAction("interop-broker-set-context-for-group").catch(t=>{});const n=this.contextGroupsById.get(e);if(!n)throw new Error(`Unable to set context for context group that isn't in the context group mapping: ${e}.`);const i=Be.checkContextIntegrity(t);if(!1===i.isValid)throw new Error(`Failed to set Context - bad Context. Reason: ${i.reason}. Context: ${JSON.stringify(t)}`);const r=t.type;n.set(r,t),this.lastContextMap.set(e,r);Array.from(this.interopClients.values()).filter(t=>t.contextGroupId===e).forEach(e=>{for(const[,n]of e.contextHandlers)Be.isContextTypeCompatible(r,n.contextType)&&this.invokeContextHandler(e.clientIdentity,n.handlerId,t)})}getCurrentContext(t,e){this.wire.sendAction("interop-broker-get-current-context").catch(t=>{});const n=this.getClientState(e);if(!n?.contextGroupId)throw new Error("You must be a member of a context group to call getCurrentContext");const{contextGroupId:i}=n,r=this.contextGroupsById.get(i),s=this.lastContextMap.get(i),o=t?.contextType??s;return r&&o?r.get(o):void 0}async joinContextGroup({contextGroupId:t,target:e},n){if(this.wire.sendAction("interop-broker-join-context-group").catch(t=>{}),this.sessionContextGroupMap.has(t))throw new Error(Te.joinSessionContextGroupWithJoinContextGroup);if(e){Be.hasEndpointId(e)&&await this.addClientToContextGroup({contextGroupId:t},e);try{const n=this.channel.connections.filter(t=>t.uuid===e.uuid&&t.name===e.name);if(!n.length)throw new Error(`Given Identity ${e.uuid} ${e.name} is not connected to the Interop Broker.`);n.length>1&&console.warn(`More than one connection found for identity ${e.uuid} ${e.name}`);const i=[];for(const e of n)i.push(this.addClientToContextGroup({contextGroupId:t},e));await Promise.all(i)}catch(t){throw new Error(t)}}else await this.addClientToContextGroup({contextGroupId:t},n)}async addClientToContextGroup({contextGroupId:t},e){this.wire.sendAction("interop-broker-add-client-to-context-group").catch(t=>{});const n=this.getClientState(e);if(!n)throw new Error(`Client with Identity: ${e.uuid} ${e.name} not in Client State Map`);if(!this.getContextGroups().find(e=>e.id===t))throw new Error(`Attempting to join a context group that does not exist: ${t}. You may only join existing context groups.`);const i=n.contextGroupId;if(i!==t){n.contextGroupId=t,await this.setCurrentContextGroupInClientOptions(e,t);const r=this.contextGroupsById.get(t);for(const[,t]of n.contextHandlers){const{contextType:n,handlerId:i}=t;if(void 0===n)r.forEach((t,n)=>{this.invokeContextHandler(e,i,t)});else if(r.has(n)){const t=r.get(n);t&&this.invokeContextHandler(e,i,t)}}Promise.allSettled(this.channel.publish("client-changed-context-group",{identity:e,contextGroupId:t,previousContextGroupId:i||null}))}}async removeFromContextGroup({target:t},e){if(this.wire.sendAction("interop-broker-remove-from-context-group").catch(t=>{}),t){Be.hasEndpointId(t)&&await this.removeClientFromContextGroup(t);try{const e=this.channel.connections.filter(e=>e.uuid===t.uuid&&e.name===t.name);if(!e.length)throw new Error(`No connection found for given Identity ${t.uuid} ${t.name}`);e.length>1&&console.warn(`More than one connection found for identity ${t.uuid} ${t.name}`);const n=[];for(const t of e)n.push(this.removeClientFromContextGroup(t));await Promise.all(n)}catch(t){throw new Error(t)}}else await this.removeClientFromContextGroup(e)}async removeClientFromContextGroup(t){this.wire.sendAction("interop-broker-remove-client-from-context-group").catch(t=>{});const e=this.getClientState(t),n=e?.contextGroupId;e&&(e.contextGroupId=void 0),await this.setCurrentContextGroupInClientOptions(t,null),Promise.allSettled(this.channel.publish("client-changed-context-group",{identity:t,contextGroupId:null,previousContextGroupId:n||null}))}getContextGroups(){return this.wire.sendAction("interop-broker-get-context-groups").catch(t=>{}),He(this,Oe,"f").map(t=>({...t}))}getInfoForContextGroup({contextGroupId:t}){return this.wire.sendAction("interop-broker-get-info-for-context-group").catch(t=>{}),this.getContextGroups().find(e=>e.id===t)}getAllClientsInContextGroup({contextGroupId:t}){this.wire.sendAction("interop-broker-get-all-clients-in-context-group").catch(t=>{});return Array.from(this.interopClients.values()).filter(e=>e.contextGroupId===t).map(t=>t.clientIdentity)}async handleFiredIntent(t,e){const n=Le("fdc3.raiseIntent","InteropBroker.handleFiredIntent",e,"interopClient.fireIntent");throw console.warn(n),new Error(Te.fireIntent)}async setIntentTarget(t,e){this.wire.sendAction("interop-broker-set-intent-target").catch(t=>{});const n=this.intentClientMap.get(e.name),i=`intent-handler-${t.name}`;if(n){const e=n.get(i);if(e){if(e.pendingIntents.push(t),e.clientIdentity&&e.isReady){const{clientIdentity:t,pendingIntents:n}=e;try{const r=n[n.length-1];await this.invokeIntentHandler(t,i,r),e.pendingIntents=[]}catch(n){console.error(`Error invoking intent handler for client ${t.uuid}/${t.name}/${t.endpointId}`),e.isReady=!1}}}else n.set(i,{isReady:!1,pendingIntents:[t]})}else{this.intentClientMap.set(e.name,new Map);const n=this.intentClientMap.get(e.name);n&&n.set(i,{isReady:!1,pendingIntents:[t]})}}async handleInfoForIntent(t,e){const n=Le("fdc3.findIntent","InteropBroker.handleInfoForIntent",e,"interopClient.getInfoForIntent");throw console.warn(n),new Error(Te.getInfoForIntent)}async handleInfoForIntentsByContext(t,e){const n=Le("fdc3.findIntentsByContext","InteropBroker.handleInfoForIntentsByContext",e,"interopClient.getInfoForIntentsByContext");throw console.warn(n),new Error(Te.getInfoForIntentsByContext)}async handleFiredIntentForContext(t,e){const n=Le("fdc3.raiseIntentForContext","InteropBroker.handleFiredIntentForContext",e,"interopClient.fireIntentForContext");throw console.warn(n),new Error(Te.fireIntentForContext)}async clientDisconnected(t){}async fdc3HandleOpen({app:t,context:e},n){const i=Le("fdc3.open","InteropBroker.fdc3HandleOpen",n);throw console.warn(i),new Error(Te.fdc3Open)}async fdc3HandleFindInstances(t,e){const n=Le("fdc3.open","InteropBroker.fdc3HandleFindInstances",e);throw console.warn(n),new Error(Te.fdc3FindInstances)}async fdc3HandleGetAppMetadata(t,e){const n=Le("fdc3.getAppMetadata","InteropBroker.fdc3HandleGetAppMetadata",e);throw console.warn(n),new Error(Te.fdc3GetAppMetadata)}async invokeContextHandler(t,e,n){const i=await this.getProvider();try{await i.dispatch(t,e,n)}catch(i){console.error(`Error invoking context handler ${e} for context type ${n.type} in client ${t.uuid}/${t.name}/${t.endpointId}`,i)}}async invokeIntentHandler(t,e,n){const i=await this.getProvider();await i.dispatch(t,e,n)}async fdc3HandleGetInfo(t,e){const{fdc3Version:n}=t;return{fdc3Version:n,...He(this,Ge,"f"),optionalFeatures:{OriginatingAppMetadata:!1,UserChannelMembershipAPIs:!0},appMetadata:{appId:"",instanceId:""}}}async getAllClientInfo(){return(await this.getProvider()).getAllClientInfo()}decorateSnapshot(t){return{...t,interopSnapshotDetails:{contextGroupStates:this.getContextGroupStates()}}}applySnapshot(t,e){const n=t?.interopSnapshotDetails?.contextGroupStates;n&&(e?.closeExistingWindows||this.updateExistingClients(n),this.rehydrateContextGroupStates(n))}updateExistingClients(t){this.interopClients.forEach(e=>{const{clientIdentity:n,contextGroupId:i,contextHandlers:r}=e;if(i){const e=t[i];for(const[,t]of Object.entries(e))r.forEach(e=>{const{handlerId:i,contextType:r}=e;Be.isContextTypeCompatible(t.type,r)&&this.invokeContextHandler(n,i,t)})}})}getContextGroupStates(){return Be.toObject(this.contextGroupsById)}rehydrateContextGroupStates(t){const e=Object.entries(t);for(const[t,n]of e){const e=Object.entries(n);for(const[n,i]of e)if(this.contextGroupsById.has(t)){this.contextGroupsById.get(t).set(n,i)}else console.warn(`Attempting to set a context group that isn't in the context group mapping. Skipping context group rehydration for: ${t}`)}}contextHandlerRegistered({contextType:t,handlerId:e},n){const i={contextType:t,handlerId:e},r=this.getClientState(n);if(r?.contextHandlers.set(e,i),r&&r.contextGroupId){const{contextGroupId:i}=r,s=this.contextGroupsById.get(i);if(void 0===t)s.forEach((t,i)=>{this.invokeContextHandler(n,e,t)});else if(s.has(t)){const i=s.get(t);i&&this.invokeContextHandler(n,e,i)}}}async intentHandlerRegistered(t,e){const{handlerId:n}=t,i=this.intentClientMap.get(e.name),r=i?.get(n);if(i)if(r){const{pendingIntents:t}=r;r.clientIdentity=e,r.isReady=!0;try{if(t.length>0){const i=t[t.length-1];await this.invokeIntentHandler(e,n,i),r.pendingIntents=[]}}catch(t){console.error(`Error invoking intent handler: ${n} for client ${e.uuid}/${e.name}/${e.endpointId}`)}}else i.set(n,{isReady:!0,pendingIntents:[],clientIdentity:e});else{this.intentClientMap.set(e.name,new Map);const t=this.intentClientMap.get(e.name);t&&t.set(n,{isReady:!0,pendingIntents:[],clientIdentity:e})}}removeContextHandler({handlerId:t},e){const n=this.getClientState(e);n&&n.contextHandlers.delete(t)}handleJoinSessionContextGroup({sessionContextGroupId:t},e){try{if(!t)throw new Error("Failed to join session context group: must specify group id.");const n=this.sessionContextGroupMap.get(t);if(n)n.registerNewClient(e);else{const n=new Fe(this.channel,t);n.registerNewClient(e),this.sessionContextGroupMap.set(t,n)}return{hasConflict:this.contextGroupsById.has(t)}}catch(t){throw new Error(t)}}getClientState(t){return this.interopClients.get(t.endpointId)}static toObject(t){const e=Object.fromEntries(t),n={};return Object.entries(e).forEach(([t,e])=>{const i=Object.fromEntries(e);n[t]=i}),n}static hasEndpointId(t){return void 0!==t.endpointId}static isContextTypeCompatible(t,e){return void 0===e||t===e}setContextGroupMap(){for(const t of this.getContextGroups())this.contextGroupsById.set(t.id,new Map)}async setCurrentContextGroupInClientOptions(t,e){try{const n=await this.fin.System.getEntityInfo(t.uuid,t.name);let i;"view"===n.entityType?i=await this.fin.View.wrap(t):"window"===n.entityType&&(i=await this.fin.Window.wrap(t)),i&&await i.updateOptions({interop:{currentContextGroup:e}})}catch(t){}}async setupChannelProvider(){try{const t=await this.getProvider();this.channel=t,this.wireChannel(t)}catch(t){throw new Error(`Error setting up Interop Broker Channel Provider: ${t}`)}}wireChannel(t){t.onConnection(async(t,e)=>{if(!await this.isConnectionAuthorized(t,e))throw new Error(`Connection not authorized for ${t.uuid}, ${t.name}`);if(!t.endpointId)throw new Error("Version too old to be compatible with Interop. Please upgrade your runtime to a more recent version.");const n={contextGroupId:void 0,contextHandlers:new Map,clientIdentity:t};e?.currentContextGroup&&this.contextGroupsById.has(e.currentContextGroup)&&(n.contextGroupId=e?.currentContextGroup),this.interopClients.set(t.endpointId,n)}),t.onDisconnection(t=>{this.interopClients.delete(t.endpointId);const e=this.intentClientMap.get(t.name);e&&t.uuid===this.fin.me.uuid&&e.forEach(t=>{t.isReady=!1}),this.sessionContextGroupMap.forEach(e=>{e.onDisconnection(t)}),this.clientDisconnected(t)}),t.beforeAction(async(t,e,n)=>{if(!await this.isActionAuthorized(t,e,n))throw new Error(`Action (${t}) not authorized for ${n.uuid}, ${n.name}`);this.logging?.beforeAction?.enabled&&console.log(t,e,n)}),t.afterAction((t,e,n)=>{if(this.logging?.afterAction?.enabled){const i=e?[t,e,n]:[t,n];console.log(...i)}}),t.register("setContext",this.setContext.bind(this)),t.register("fireIntent",this.handleFiredIntent.bind(this)),t.register("getCurrentContext",this.getCurrentContext.bind(this)),t.register("getInfoForIntent",this.handleInfoForIntent.bind(this)),t.register("getInfoForIntentsByContext",this.handleInfoForIntentsByContext.bind(this)),t.register("fireIntentForContext",this.handleFiredIntentForContext.bind(this)),t.register("getContextGroups",this.getContextGroups.bind(this)),t.register("joinContextGroup",this.joinContextGroup.bind(this)),t.register("removeFromContextGroup",this.removeFromContextGroup.bind(this)),t.register("getAllClientsInContextGroup",this.getAllClientsInContextGroup.bind(this)),t.register("getInfoForContextGroup",this.getInfoForContextGroup.bind(this)),t.register("contextHandlerRegistered",this.contextHandlerRegistered.bind(this)),t.register("intentHandlerRegistered",this.intentHandlerRegistered.bind(this)),t.register("removeContextHandler",this.removeContextHandler.bind(this)),t.register("sessionContextGroup:createIfNeeded",this.handleJoinSessionContextGroup.bind(this)),t.register("fdc3Open",this.fdc3HandleOpen.bind(this)),t.register("fdc3v2FindIntentsByContext",this.handleInfoForIntentsByContext.bind(this)),t.register("fdc3FindInstances",this.fdc3HandleFindInstances.bind(this)),t.register("fdc3GetAppMetadata",this.fdc3HandleGetAppMetadata.bind(this)),t.register("fdc3v2GetInfo",async(t,e)=>this.fdc3HandleGetInfo.bind(this)(t,e)),t.register("createPrivateChannelProvider",async t=>{const{channelId:e}=t,n=await this.fin.InterApplicationBus.Channel.create(e),i=Re.init(n,e,t=>{this.privateChannelProviderMap.delete(t)});this.privateChannelProviderMap.set(e,i)}),t.register("isIdUsedByPrivateChannel",async t=>{const{channelId:e}=t;return this.privateChannelProviderMap.has(e)})}isConnectionAuthorized(t,e){return this.wire.sendAction("interop-broker-is-connection-authorized").catch(t=>{}),Promise.resolve(!0)}isActionAuthorized(t,e,n){return this.wire.sendAction("interop-broker-is-action-authorized").catch(t=>{}),Promise.resolve(!0)}}Ge=new WeakMap,Oe=new WeakMap,We=new WeakMap,Be.checkContextIntegrity=$e;var De,Ve=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n},Ue=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)};class _e extends l{constructor(t,e,n){super(t),De.set(this,void 0),this.id=n,Ve(this,De,e,"f")}async setContext(t){this.wire.sendAction("interop-session-context-group-set-context").catch(t=>{});return(await Ue(this,De,"f")).dispatch(`sessionContextGroup:setContext-${this.id}`,{sessionContextGroupId:this.id,context:t})}async getCurrentContext(t){this.wire.sendAction("interop-session-context-group-get-context").catch(t=>{});return(await Ue(this,De,"f")).dispatch(`sessionContextGroup:getContext-${this.id}`,{sessionContextGroupId:this.id,type:t})}async addContextHandler(t,e){if(this.wire.sendAction("interop-session-context-group-add-handler").catch(t=>{}),"function"!=typeof t)throw new Error("Non-function argument passed to the first parameter 'handler'. Be aware that the argument order does not match the FDC3 standard.");const n=await Ue(this,De,"f");let i;return i=e?`sessionContextHandler:invoke-${this.id}-${e}-${Pe()}`:`sessionContextHandler:invoke-${this.id}`,n.register(i,Se(t,i)),await n.dispatch(`sessionContextGroup:handlerAdded-${this.id}`,{handlerId:i,contextType:e}),{unsubscribe:await this.createUnsubscribeCb(i)}}async createUnsubscribeCb(t){const e=await Ue(this,De,"f");return async()=>{e.remove(t),await e.dispatch(`sessionContextGroup:handlerRemoved-${this.id}`,{handlerId:t})}}getUserInstance(){return{id:this.id,setContext:Me(this.setContext.bind(this),"Failed to set context: "),getCurrentContext:Me(this.getCurrentContext.bind(this),"Failed to get context: "),addContextHandler:Me(this.addContextHandler.bind(this),"Failed to add context handler: ")}}}De=new WeakMap;var qe,ze,Je,Ye,Ke,Ze,Qe,Xe,tn=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n},en=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)};class nn{constructor(t){ze.set(this,void 0),Je.set(this,!1),Ke.set(this,async()=>{const t=await en(this,ze,"f");let e=en(nn,qe,"f",Ye).get(t);return e||(e={},en(nn,qe,"f",Ye).set(t,e)),e}),Ze.set(this,t=>{const e=[];let n;const i=t=>{e.forEach(e=>e(t))};return{callbacks:e,dispose:async n=>{const i=e.indexOf(n);if(i>=0&&(e.splice(i,1),0===e.length)){(await en(this,ze,"f")).remove(t)}},waitForRegistration:async()=>{n||(n=(async()=>{const e=await en(this,ze,"f");await e.register(t,i)})()),await n}}}),Qe.set(this,async t=>(await en(this,Ke,"f").call(this))[t]),Xe.set(this,async t=>{const e=await en(this,Ke,"f").call(this);return await en(this,Qe,"f").call(this,t)||(e[t]=en(this,Ze,"f").call(this,t)),e[t]}),this.addListener=async(t,e)=>{const n=await en(this,Xe,"f").call(this,t);n.callbacks.push(e),await n.waitForRegistration()},this.removeListener=async(t,e)=>{if(!en(this,Je,"f"))return;if(await en(this,Qe,"f").call(this,t)){const n=await en(this,Xe,"f").call(this,t);await n.dispose(e)}},tn(this,ze,t,"f"),Promise.resolve(t).then(()=>{tn(this,Je,!0,"f")}).catch(()=>{console.warn("Channel Connection error occurred in channel client. Channel-events registrations will fail.")})}}qe=nn,ze=new WeakMap,Je=new WeakMap,Ke=new WeakMap,Ze=new WeakMap,Qe=new WeakMap,Xe=new WeakMap,Ye={value:new WeakMap};var rn,sn,on,an,cn=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n},dn=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)};class hn extends l{constructor(t,e,n){super(t),rn.set(this,void 0),sn.set(this,void 0),on.set(this,void 0),an.set(this,void 0),this.addListener=async(t,e)=>{try{await dn(this,an,"f").addListener(t,e)}catch(e){throw new Error(`An unexpected error occurred when adding a listener to the event ${t}. \n${e.stack}.`)}},this.removeListener=async(t,e)=>{try{await dn(this,an,"f").removeListener(t,e)}catch(e){throw new Error(`An unexpected error occurred when removing a listener for the event ${t}. \n${e.stack}.`)}},cn(this,sn,new Map,"f"),cn(this,rn,e,"f"),cn(this,on,n,"f"),cn(this,an,new nn(e),"f")}async setContext(t){this.wire.sendAction("interop-client-set-context").catch(t=>{});return(await dn(this,rn,"f")).dispatch("setContext",{context:t})}async addContextHandler(t,e){if(this.wire.sendAction("interop-client-add-context-handler").catch(t=>{}),"function"!=typeof t)throw new Error("Non-function argument passed to the first parameter 'handler'. Be aware that the argument order does not match the FDC3 standard.");const n=await dn(this,rn,"f");let i;i=e?`invokeContextHandler-${e}-${Pe()}`:"invokeContextHandler";const r=Se(t,i);return n.register(i,r),await n.dispatch("contextHandlerRegistered",{handlerId:i,contextType:e}),{unsubscribe:async()=>{n.remove(i),await n.dispatch("removeContextHandler",{handlerId:i})}}}async getContextGroups(){this.wire.sendAction("interop-client-get-context-groups").catch(t=>{});return(await dn(this,rn,"f")).dispatch("getContextGroups")}async joinContextGroup(t,e){this.wire.sendAction("interop-client-join-context-group").catch(t=>{});const n=await dn(this,rn,"f");if(!t)throw new Error("No contextGroupId specified for joinContextGroup.");return n.dispatch("joinContextGroup",{contextGroupId:t,target:e})}async removeFromContextGroup(t){this.wire.sendAction("interop-client-remove-from-context-group").catch(t=>{});return(await dn(this,rn,"f")).dispatch("removeFromContextGroup",{target:t})}async getAllClientsInContextGroup(t){this.wire.sendAction("interop-client-get-all-clients-in-context-group").catch(t=>{});const e=await dn(this,rn,"f");if(!t)throw new Error("No contextGroupId specified for getAllClientsInContextGroup.");return e.dispatch("getAllClientsInContextGroup",{contextGroupId:t})}async getInfoForContextGroup(t){this.wire.sendAction("interop-client-get-info-for-context-group").catch(t=>{});const e=await dn(this,rn,"f");if(!t)throw new Error("No contextGroupId specified for getInfoForContextGroup.");return e.dispatch("getInfoForContextGroup",{contextGroupId:t})}async fireIntent(t){this.wire.sendAction("interop-client-fire-intent").catch(t=>{});return(await dn(this,rn,"f")).dispatch("fireIntent",t)}async registerIntentHandler(t,e,n){this.wire.sendAction("interop-client-register-intent-handler").catch(t=>{});const i=await dn(this,rn,"f"),r=`intent-handler-${e}`,s=((t,e)=>async n=>{try{return t(n)}catch(t){throw console.error(`Error thrown by handler ${e}: ${t}`),t}})(t,r);try{await i.register(r,s),await i.dispatch("intentHandlerRegistered",{handlerId:r,...n})}catch(t){throw new Error("Unable to register intent handler")}return{unsubscribe:async()=>{i.remove(r)}}}async getCurrentContext(t){this.wire.sendAction("interop-client-get-current-context").catch(t=>{});return(await dn(this,rn,"f")).dispatch("getCurrentContext",{contextType:t})}async getInfoForIntent(t){this.wire.sendAction("interop-client-get-info-for-intent").catch(t=>{});return(await dn(this,rn,"f")).dispatch("getInfoForIntent",t)}async getInfoForIntentsByContext(t){this.wire.sendAction("interop-client-get-info-for-intents-by-context").catch(t=>{});return(await dn(this,rn,"f")).dispatch("getInfoForIntentsByContext",t)}async fireIntentForContext(t){this.wire.sendAction("interop-client-fire-intent-for-context").catch(t=>{});return(await dn(this,rn,"f")).dispatch("fireIntentForContext",t)}async joinSessionContextGroup(t){try{const e=dn(this,sn,"f").get(t);if(e)return e.getUserInstance();const n=await dn(this,rn,"f"),{hasConflict:i}=await n.dispatch("sessionContextGroup:createIfNeeded",{sessionContextGroupId:t});i&&console.warn(`A (non-session) context group with the name "${t}" already exists. If you are trying to join a Context Group, call joinContextGroup instead.`);const r=new _e(this.wire,dn(this,rn,"f"),t);return dn(this,sn,"f").set(t,r),r.getUserInstance()}catch(e){throw console.error(`Error thrown trying to create Session Context Group with id "${t}": ${e}`),e}}async onDisconnection(t){this.wire.sendAction("interop-client-add-ondisconnection-listener").catch(t=>{});return(await dn(this,rn,"f")).onDisconnection(e=>{const{uuid:n}=e;t({type:"interop-broker",topic:"disconnected",brokerName:n})})}getFDC3Sync(t){return dn(this,on,"f").call(this,t,this,this.wire)}async getFDC3(t){return this.getFDC3Sync(t)}static async ferryFdc3Call(t,e,n){return(await dn(t,rn,"f")).dispatch(e,n||null)}}function ln(t,e){if(e&&"2.0"===e){const e=function(t){return["fdc3HandleFindInstances","handleInfoForIntent","handleInfoForIntentsByContext","fdc3HandleGetAppMetadata","fdc3HandleGetInfo","fdc3HandleOpen","handleFiredIntent","handleFiredIntentForContext"].filter(e=>t[e]===Be.prototype[e])}(t);e.length>0&&console.warn(`WARNING: FDC3 2.0 has been set as a default option for Views in this Platform, but the required InteropBroker APIs for FDC3 2.0 compliance have not all been overridden.\nThe following APIs need to be overridden:\n${e.join("\n")}`)}}rn=new WeakMap,sn=new WeakMap,on=new WeakMap,an=new WeakMap;class pn{constructor(t,e){this.id=e,this.client=t,this.listeners=new Map}async broadcast(t){return this.client.dispatch("broadcast",{context:t})}async getCurrentContext(t){return this.client.dispatch("getCurrentContext",{contextType:t})}async addContextListener(t,e){if("function"!=typeof e)throw new Error("Non-function argument passed to the second parameter 'handler'. Be aware that the argument order does not match the FDC3 standard.");let n;n=t?`contextHandler:invoke-${this.id}-${t}-${Pe()}`:`contextHandler:invoke-${this.id}-${Pe()}`,this.client.register(n,Se(e,n));const i={unsubscribe:await this.createContextUnsubscribeCb(n)};return this.listeners.set(n,i),await this.client.dispatch("contextHandlerAdded",{handlerId:n,contextType:t}),i}createNonStandardUnsubscribeCb(t){return async()=>{this.client.remove(t),this.listeners.delete(t),await this.client.dispatch("nonStandardHandlerRemoved",{handlerId:t})}}createContextUnsubscribeCb(t){return async()=>{this.client.remove(t),this.listeners.delete(t),await this.client.dispatch("contextHandlerRemoved",{handlerId:t})}}onAddContextListener(t){const e=`onContextHandlerAdded:invoke-${this.id}-${Pe()}`;this.client.register(e,t);const n={unsubscribe:this.createNonStandardUnsubscribeCb(e)};return this.listeners.set(e,n),this.client.dispatch("onAddContextHandlerAdded",{handlerId:e}),n}onDisconnect(t){const e=`onDisconnect:invoke-${this.id}-${Pe()}`;this.client.register(e,t);const n={unsubscribe:this.createNonStandardUnsubscribeCb(e)};return this.listeners.set(e,n),this.client.dispatch("onDisconnectHandlerAdded",{handlerId:e}),n}onUnsubscribe(t){const e=`onUnsubscribe:invoke-${this.id}-${Pe()}`;this.client.register(e,t);const n={unsubscribe:this.createNonStandardUnsubscribeCb(e)};return this.listeners.set(e,n),this.client.dispatch("onUnsubscribeHandlerAdded",{handlerId:e}),n}async cleanUpAllSubs(){Array.from(this.listeners.keys()).forEach(t=>{this.client.remove(t),this.listeners.delete(t)})}async disconnect(){try{await this.client.dispatch("clientDisconnecting"),await this.cleanUpAllSubs(),await this.client.disconnect()}catch(t){throw new Error(t.message)}}}const un=t=>({id:t.id,type:"app",broadcast:t.setContext,getCurrentContext:async e=>{const n=await t.getCurrentContext(e);return void 0===n?null:n},addContextListener:(n,i)=>{let r,s;"function"==typeof n?(console.warn("addContextListener(handler) has been deprecated. Please use addContextListener(null, handler)"),r=n):(r=i,"string"==typeof n&&(s=n));const o=(async()=>{let n=!0;const i=await t.getCurrentContext(s);return t.addContextHandler((t,s)=>{if(!n||(n=!1,!e.isEqual(i,t)))return r(t,s)},s)})();return{...o,unsubscribe:()=>o.then(t=>t.unsubscribe())}}}),wn=t=>{const e=un(t);return{...e,addContextListener:async(...t)=>e.addContextListener(...t)}},yn=t=>({addContextListener:()=>{throw new fn("Channel.addContextListener",t)},broadcast:()=>{throw new fn("Channel.broadcast",t)},getCurrentContext:()=>{throw new fn("Channel.getCurrentContext",t)}});class fn extends Error{constructor(t,e="System"){super(t),this.message=`Calling ${t} on an instance of a ${e} Channel returned by fdc3.get${e}Channels is not supported. If you would like to use a ${e} Channel, please use fdc3.joinChannel, fdc3.addContextListener, and fdc3.broadcast instead.`}}var gn,mn;!function(t){t.NoResultReturned="NoResultReturned",t.IntentHandlerRejected="IntentHandlerRejected"}(gn||(gn={})),function(t){t.NoChannelFound="NoChannelFound",t.AccessDenied="AccessDenied",t.CreationFailed="CreationFailed"}(mn||(mn={}));const vn=t=>{let e=!1;const n=()=>{if(e)throw new Error("Private Channel Client has been disconnected from the Private Channel")};return{id:t.id,type:"private",broadcast:async e=>(n(),t.broadcast(e)),getCurrentContext:async e=>(n(),t.getCurrentContext(e)),addContextListener:async(e,i)=>{n();let r=i,s=e;"function"==typeof e&&(console.warn("addContextListener(handler) has been deprecated. Please use addContextListener(null, handler)"),r=e,s=null);return t.addContextListener(s,r)},onAddContextListener:e=>(n(),t.onAddContextListener(e)),disconnect:async()=>(n(),e=!0,t.disconnect()),onDisconnect:e=>(n(),t.onDisconnect(e)),onUnsubscribe:e=>(n(),t.onUnsubscribe(e))}},Cn=async(t,e,n,i)=>{const r=Pe(),s=n?{target:n,intentResolutionResultId:r}:{intentResolutionResultId:r},o=i?{name:i,context:e,metadata:s}:{...e,metadata:s},a=new Promise((e,n)=>{fin.InterApplicationBus.subscribe({uuid:"*"},r,t=>{e(t)}).catch(()=>{"other"===t.wire.environment.type&&e(void 0),n(new Error("getResult is not supported in this environment"))})}),c=async()=>{let e=await a;if(null==e)return;if("object"!=typeof e)throw new Error(gn.NoResultReturned);const{error:n}=e;if(n)throw new Error(gn.IntentHandlerRejected);if((t=>{if(t&&"object"==typeof t&&"type"in t&&"id"in t){const{type:e,id:n}=t;return"string"==typeof e&&"string"==typeof n&&("app"===e||"private"===e)}return!1})(e)){const{id:n,type:i}=e;switch(i){case"private":e=await(async t=>{try{const e=await fin.InterApplicationBus.Channel.connect(t),n=new pn(e,t);return vn(n)}catch(e){throw new Error(`Private Channel with id: ${t} doesn't exist`)}})(n);break;case"app":{const i=await t.joinSessionContextGroup(n);e=wn(i);break}}}else if(!(t=>{if(t&&"object"==typeof t&&"type"in t){const{type:e}=t;return"string"==typeof e}return!1})(e))throw new Error(gn.NoResultReturned);return e},d=i?await t.fireIntent(o):await t.fireIntentForContext(o);return"object"!=typeof d?{source:{appId:"",instanceId:""},intent:"",version:"2.0",getResult:c}:{...d,getResult:c}};var In,xn=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)},bn=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n};class An{get client(){return xn(this,In,"f").call(this)}get fin(){return this.wire.getFin()}constructor(t,e){this.wire=e,In.set(this,void 0),bn(this,In,t,"f")}async broadcast(t){return this.wire.recordAnalytic("fdc3-broadcast"),this.client.setContext(t)}async _open(t,e){this.wire.recordAnalytic("fdc3-open");try{return await hn.ferryFdc3Call(this.client,"fdc3Open",{app:t,context:e})}catch(t){const e=t.message===Te.fdc3Open?"ResolverUnavailable":t.message;throw new Error(e)}}async _getChannels(){return(await this.client.getContextGroups()).map(t=>({...t,type:"system",...yn()}))}async getOrCreateChannel(t,e){this.wire.recordAnalytic("fdc3-get-or-create-channel");if(await hn.ferryFdc3Call(this.client,"isIdUsedByPrivateChannel",{channelId:t}))throw new Error(mn.AccessDenied);const n=(await this._getChannels()).find(e=>e.id===t);if(n)return{...n,type:"system",...yn()};try{return e(await this.client.joinSessionContextGroup(t))}catch(t){throw console.error(t.message),new Error(mn.CreationFailed)}}async getSystemChannels(){return this.wire.recordAnalytic("fdc3-get-system-channels"),this._getChannels()}async joinChannel(t){this.wire.recordAnalytic("fdc3-join-channel");try{return await this.client.joinContextGroup(t)}catch(t){if(t.message===Te.joinSessionContextGroupWithJoinContextGroup?console.error("The Channel you have tried to join is an App Channel. Custom Channels can only be defined by the Interop Broker through code or manifest configuration. Please use getOrCreateChannel."):console.error(t.message),t.message.startsWith("Attempting to join a context group that does not exist"))throw new Error(mn.NoChannelFound);throw new Error(mn.AccessDenied)}}async getCurrentChannel(){this.wire.recordAnalytic("fdc3-get-current-channel");const t=await this.getCurrentContextGroupInfo();return t?this.buildChannelObject(t):null}async leaveCurrentChannel(){return this.wire.recordAnalytic("fdc3-leave-current-channel"),this.client.removeFromContextGroup()}async getCurrentContextGroupInfo(){const t=await this.client.getContextGroups(),e=t.map(async t=>this.client.getAllClientsInContextGroup(t.id)),n=(await Promise.all(e)).findIndex(t=>t.some(t=>{const{uuid:e,name:n}=t;return this.wire.me.uuid===e&&this.wire.me.name===n}));return t[n]}async buildChannelObject(t){return{...t,type:"system",addContextListener:(...[t,n])=>{let i,r;"function"==typeof t?(console.warn("addContextListener(handler) has been deprecated. Please use addContextListener(null, handler)"),i=t):(i=n,"string"==typeof t&&(r=t));const s=(async()=>{let t=!0;const n=await this.client.getCurrentContext(r);return this.client.addContextHandler((r,s)=>{if(!t||(t=!1,!e.isEqual(n,r)))return i(r,s)},r)})();return{...s,unsubscribe:()=>s.then(t=>t.unsubscribe())}},broadcast:this.broadcast.bind(this),getCurrentContext:async t=>{const e=await this.client.getCurrentContext(t);return void 0===e?null:e}}}}In=new WeakMap;class En extends An{async open(t,e){await super._open(t,e)}addContextListener(t,e){let n;return this.wire.recordAnalytic("fdc3-add-context-listener"),"function"==typeof t?(console.warn("addContextListener(handler) has been deprecated. Please use addContextListener(null, handler)"),n=this.client.addContextHandler(t)):n=this.client.addContextHandler(e,null===t?void 0:t),{...n,unsubscribe:()=>n.then(t=>t.unsubscribe())}}addIntentListener(t,e){this.wire.recordAnalytic("fdc3-add-intent-listener");const n=this.client.registerIntentHandler(t=>{const{context:n,metadata:i}=t,{metadata:r}=n,s=i?.intentResolutionResultId||r?.intentResolutionResultId;s&&this.fin.InterApplicationBus.publish(s,null).catch(()=>null),e(t.context)},t,{fdc3Version:"1.2"});return{...n,unsubscribe:()=>n.then(t=>t.unsubscribe())}}async raiseIntent(t,e,n){this.wire.recordAnalytic("fdc3-raise-intent");const i=n?{name:t,context:e,metadata:{target:n}}:{name:t,context:e};try{return await this.client.fireIntent(i)}catch(t){const e=t.message===Te.fireIntent?"ResolverUnavailable":t.message;throw new Error(e)}}async findIntent(t,e){this.wire.recordAnalytic("fdc3-find-intent");try{return await this.client.getInfoForIntent({name:t,context:e})}catch(t){const e=t.message===Te.getInfoForIntent?"ResolverUnavailable":t.message;throw new Error(e)}}async findIntentsByContext(t){this.wire.recordAnalytic("fdc3-find-intents-by-context");try{return await this.client.getInfoForIntentsByContext(t)}catch(t){const e=t.message===Te.getInfoForIntentsByContext?"ResolverUnavailable":t.message;throw new Error(e)}}async raiseIntentForContext(t,e){this.wire.recordAnalytic("fdc3-raise-intent-for-context");try{return await this.client.fireIntentForContext({...t,metadata:{target:e}})}catch(t){const e=t.message===Te.fireIntentForContext?"ResolverUnavailable":t.message;throw new Error(e)}}async getOrCreateChannel(t){return super.getOrCreateChannel(t,un)}getInfo(){this.wire.recordAnalytic("fdc3-get-info");return{providerVersion:this.wire.environment.getAdapterVersionSync(),provider:`openfin-${this.wire.me.uuid}`,fdc3Version:"1.2"}}}class Pn extends An{async open(t,e){return"string"==typeof t&&console.warn("Passing a string as the app parameter is deprecated, please use an AppIdentifier ({ appId: string; instanceId?: string })."),super._open(t,e)}async findInstances(t){this.wire.recordAnalytic("fdc3-find-instances");try{return await hn.ferryFdc3Call(this.client,"fdc3FindInstances",t)}catch(t){const e=t.message===Te.fdc3FindInstances?"ResolverUnavailable":t.message;throw new Error(e)}}async getAppMetadata(t){this.wire.recordAnalytic("fdc3-get-app-metadata");try{return await hn.ferryFdc3Call(this.client,"fdc3GetAppMetadata",t)}catch(t){const e=t.message===Te.fdc3GetAppMetadata?"ResolverUnavailable":t.message;throw new Error(e)}}async addContextListener(t,e){this.wire.recordAnalytic("fdc3-add-context-listener");const n=t=>e=>{const{contextMetadata:n,...i}=e,r=n?[{...i},n]:[e,null];t(...r)};let i=e,r=n(i);return"function"==typeof t?(console.warn("addContextListener(handler) has been deprecated. Please use addContextListener(null, handler)"),i=t,r=n(i),this.client.addContextHandler(r)):this.client.addContextHandler(r,null===t?void 0:t)}async findIntent(t,e,n){this.wire.recordAnalytic("fdc3-find-intent");try{return await this.client.getInfoForIntent({name:t,context:e,metadata:{resultType:n}})}catch(t){const e=t.message===Te.getInfoForIntent?"ResolverUnavailable":t.message;throw new Error(e)}}async findIntentsByContext(t,e){this.wire.recordAnalytic("fdc3-find-intents-by-context");const n=e?{context:t,metadata:{resultType:e}}:t;try{return await hn.ferryFdc3Call(this.client,"fdc3v2FindIntentsByContext",n)}catch(t){const e=t.message===Te.getInfoForIntentsByContext?"ResolverUnavailable":t.message;throw new Error(e)}}async raiseIntent(t,e,n){this.wire.recordAnalytic("fdc3-raise-intent");try{return"string"==typeof n&&console.warn("Passing a string as the app parameter is deprecated, please use an AppIdentifier ({ appId: string; instanceId?: string })."),Cn(this.client,e,n,t)}catch(t){const e=t.message===Te.fireIntent?"ResolverUnavailable":t.message;throw new Error(e)}}async raiseIntentForContext(t,e){this.wire.recordAnalytic("fdc3-raise-intent-for-context");try{return"string"==typeof e&&console.warn("Passing a string as the app parameter is deprecated, please use an AppIdentifier ({ appId: string; instanceId?: string })."),Cn(this.client,t,e)}catch(t){const e=t.message===Te.fireIntent?"ResolverUnavailable":t.message;throw new Error(e)}}async addIntentListener(t,e){if(this.wire.recordAnalytic("fdc3-add-intent-listener"),"string"!=typeof t)throw new Error("First argument must be an Intent name");return this.client.registerIntentHandler(async t=>{let n,i;const{context:r,metadata:s}=t,{contextMetadata:o,metadata:a,...c}=r,d=s?.intentResolutionResultId||a?.intentResolutionResultId;try{const t=a?{metadata:a,...c}:{...c};n=await e(t,o),i=n}catch(t){n=t,i={error:!0}}if(d&&this.fin.InterApplicationBus.publish(d,i).catch(()=>null),n instanceof Error)throw new Error(n.message);return n},t,{fdc3Version:"2.0"})}async getOrCreateChannel(t){return super.getOrCreateChannel(t,wn)}async createPrivateChannel(){const t=Pe();await hn.ferryFdc3Call(this.client,"createPrivateChannelProvider",{channelId:t});const e=await this.fin.InterApplicationBus.Channel.connect(t),n=new pn(e,t);return vn(n)}async getUserChannels(){return(await this.client.getContextGroups()).map(t=>({...t,type:"user",...yn("User")}))}async getSystemChannels(){return console.warn("This API has been deprecated. Please use fdc3.getUserChannels instead."),super.getSystemChannels()}async joinUserChannel(t){return super.joinChannel(t)}async joinChannel(t){return console.warn("This API has been deprecated. Please use fdc3.joinUserChannel instead."),super.joinChannel(t)}async getCurrentChannel(){const t=await super.getCurrentChannel();return t?{...t,type:"user",broadcast:this.broadcast.bind(this)}:null}async getInfo(){return hn.ferryFdc3Call(this.client,"fdc3v2GetInfo",{fdc3Version:"2.0"})}}const Mn=(t,e,n)=>{switch(t){case"1.2":return new En(()=>e,n);case"2.0":return new Pn(()=>e,n);default:throw new Error(`Invalid FDC3 version provided: ${t}. Must be '1.2' or '2.0'`)}},Sn=t=>new t,kn="You have attempted to use or modify InteropBroker parameters, which is not allowed. You are likely using an older InteropBroker override scheme. Please consult our Interop docs for guidance on migrating to the new override scheme.";class Ln extends l{async init(t,e=Sn){this.wire.recordAnalytic("interop-init");const n=await this.wire.environment.getInteropInfo(this.wire.getFin()),i=function(t){const e=()=>{throw new Error(t)};return new Proxy({},{apply:e,construct:e,defineProperty:e,deleteProperty:e,get:e,getOwnPropertyDescriptor:e,getPrototypeOf:e,has:e,isExtensible:e,ownKeys:e,preventExtensions:e,set:e,setPrototypeOf:e})}(kn),r=(s=kn,o=structuredClone(n),new Proxy(o,{get:(...t)=>(console.warn(s),Reflect.get(...t)),set:(...t)=>(console.warn(s),Reflect.set(...t)),getOwnPropertyDescriptor:(...t)=>(console.warn(s),Reflect.getOwnPropertyDescriptor(...t)),ownKeys:(...t)=>(console.warn(s),Reflect.ownKeys(...t))}));var s,o;const a=async()=>{throw new Error(kn)},c=Be.createClosedConstructor(this.wire,()=>this.fin.InterApplicationBus.Channel.create(`interop-broker-${t}`),n);let d;if(Array.isArray(e)){d=new(function(...t){return e=>t.reduceRight((t,e)=>n=>e(t(n)),t=>t)(e)}(...e)(c))(i,a,r)}else d=await e(c,i,a,r);return ln(d,n.fdc3Version),d}connectSync(t,e){return this.wire.recordAnalytic("interop-connect-sync"),new hn(this.wire,this.wire.environment.whenReady().then(()=>this.fin.InterApplicationBus.Channel.connect(`interop-broker-${t}`,{payload:e})),Mn)}}const Tn=t=>`snapshot-source-provider-${t.uuid}`;var $n,Fn,Rn,Gn,On,Wn=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n},jn=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)};const Hn=new Map;class Nn extends l{constructor(t,e){super(t),$n.set(this,void 0),Fn.set(this,()=>(Hn.has(this.identity.uuid)||Hn.set(this.identity.uuid,{eventFired:null,clientPromise:null}),Hn.get(this.identity.uuid))),Rn.set(this,()=>(jn(this,Fn,"f").call(this).clientPromise||(jn(this,Fn,"f").call(this).clientPromise=jn(this,Gn,"f").call(this)),jn(this,Fn,"f").call(this).clientPromise)),Gn.set(this,async()=>{const t=Tn(this.identity);try{jn(this,Fn,"f").call(this).eventFired||await jn(this,On,"f").call(this);const e=await this.fin.InterApplicationBus.Channel.connect(t,{wait:!1});return e.onDisconnection(()=>{jn(this,Fn,"f").call(this).clientPromise=null,jn(this,Fn,"f").call(this).eventFired=null}),e}catch(t){throw jn(this,Fn,"f").call(this).clientPromise=null,new Error("The targeted SnapshotSource is not currently initialized. Await this object's ready() method.")}}),On.set(this,async()=>{const t=Tn(this.identity);let e,n;const i=new Promise((t,i)=>{e=t,n=i});jn(this,Fn,"f").call(this).eventFired=i;const r=async i=>{try{i.channelName===t&&(e(),await this.fin.InterApplicationBus.Channel.removeListener("connected",r))}catch(t){n(t)}};await this.fin.InterApplicationBus.Channel.on("connected",r)}),Wn(this,$n,e,"f")}get identity(){return jn(this,$n,"f")}async ready(){this.wire.recordAnalytic("snapshot-source-ready");try{await jn(this,Rn,"f").call(this)}catch(t){await jn(this,Fn,"f").call(this).eventFired}}async getSnapshot(){this.wire.recordAnalytic("snapshot-source-get-snapshot");const t=await jn(this,Rn,"f").call(this),e=await t.dispatch("get-snapshot");return(await e).snapshot}async applySnapshot(t){this.wire.recordAnalytic("snapshot-source-apply-snapshot");return(await jn(this,Rn,"f").call(this)).dispatch("apply-snapshot",{snapshot:t})}}$n=new WeakMap,Fn=new WeakMap,Rn=new WeakMap,Gn=new WeakMap,On=new WeakMap;class Bn extends l{async init(t){if(this.wire.recordAnalytic("snapshot-source-init"),"object"!=typeof t||"function"!=typeof t.getSnapshot||"function"!=typeof t.applySnapshot)throw new Error("you must pass in a valid SnapshotProvider");const e=await this.fin.InterApplicationBus.Channel.create(Tn(this.fin.me));e.register("get-snapshot",async()=>({snapshot:await t.getSnapshot()})),e.register("apply-snapshot",({snapshot:e})=>t.applySnapshot(e))}wrapSync(t){return this.wire.recordAnalytic("snapshot-source-wrap-sync"),new Nn(this.wire,t)}async wrap(t){return this.wire.recordAnalytic("snapshot-source-wrap"),this.wrapSync(t)}}var Dn,Vn,Un,_n,qn=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n},zn=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)};class Jn{constructor(t,e){Dn.set(this,void 0),Vn.set(this,void 0),Un.set(this,void 0),_n.set(this,new x(async()=>(await zn(this,Dn,"f").registerMessageHandler(t=>{if("notification-created"===t.action&&t.payload.managerId===zn(this,Un,"f")){const{notificationId:e,properties:n,documentUrl:i,notificationIcon:r,badge:s,image:o}=t.payload;try{zn(this,Vn,"f")?.call(this,{properties:n,images:{image:o,icon:r,badge:s},url:i,notificationId:e})}catch(t){console.error("Failed to handle notification",t)}return!0}return!1}),!0))),this.setNotificationHandler=async t=>{await zn(this,_n,"f").getValue(),qn(this,Vn,t,"f")},this.destroy=async()=>{await zn(this,Dn,"f").sendAction("destroy-notification-manager",{managerId:zn(this,Un,"f")})},this.dispatch=async t=>{const{notificationId:e,type:n}=t;await zn(this,Dn,"f").sendAction("dispatch-notification-event",{notificationId:e,type:n})},qn(this,Dn,t,"f"),qn(this,Un,e,"f")}}Dn=new WeakMap,Vn=new WeakMap,Un=new WeakMap,_n=new WeakMap;class Yn extends l{constructor(){super(...arguments),this.init=async()=>{const{payload:{data:{managerId:t}}}=await this.wire.sendAction("init-notification-manager");return new Jn(this.wire,t)}}}class Kn extends t.EventEmitter{constructor(t){super(),this.wire=t,this.System=new $(t),this.Window=new L(t),this.Application=new S(t),this.InterApplicationBus=new Ht(t),this.Clipboard=new Nt(t),this.ExternalApplication=new Dt(t),this.Frame=new Ut(t),this.GlobalHotkey=new _t(t),this.Platform=new be(t,this.InterApplicationBus.Channel),this.View=new I(t),this.Interop=new Ln(t),this.SnapshotSource=new Bn(t),this.NotificationManager=new Yn(t),t.registerFin(this),this.me=function(t){const{uuid:e,name:n,entityType:i}=t.me,r={setContext(){throw new Error(Ae)},addContextHandler(){throw new Error(Ae)},getContextGroups(){throw new Error(Ae)},joinContextGroup(){throw new Error(Ae)},removeFromContextGroup(){throw new Error(Ae)},getAllClientsInContextGroup(){throw new Error(Ae)},getInfoForContextGroup(){throw new Error(Ae)}},s="Interop API has not been instantiated. Either connection has failed or you have not declared interop in your config.",o={setContext(){throw new Error(s)},addContextHandler(){throw new Error(s)},getContextGroups(){throw new Error(s)},joinContextGroup(){throw new Error(s)},removeFromContextGroup(){throw new Error(s)},getAllClientsInContextGroup(){throw new Error(s)},getInfoForContextGroup(){throw new Error(s)}},a={eventNames:()=>{throw new Error(Ae)},emit:()=>{throw new Error(Ae)},listeners:()=>{throw new Error(Ae)},listenerCount:()=>{throw new Error(Ae)},on:()=>{throw new Error(Ae)},addListener:()=>{throw new Error(Ae)},once:()=>{throw new Error(Ae)},prependListener:()=>{throw new Error(Ae)},prependOnceListener:()=>{throw new Error(Ae)},removeListener:()=>{throw new Error(Ae)},removeAllListeners:()=>{throw new Error(Ae)}};switch(i){case"view":return Object.assign(new P(t,{uuid:e,name:n}),Ee(i,e,n),{interop:o,isOpenFin:!0});case"window":return Object.assign(new k(t,{uuid:e,name:n}),Ee(i,e,n),{interop:o,isOpenFin:!0});case"iframe":return Object.assign(new Vt(t,{uuid:e,name:n}),Ee(i,e,n),{interop:o,isOpenFin:!0});case"external connection":return Object.assign(new Bt(t,{uuid:e}),Ee(i,e,n),{interop:o,isOpenFin:!1});default:return{...Ee(i,e,n),...a,interop:r,isOpenFin:!1}}}(t),t.on("disconnected",()=>{this.emit("disconnected")})}}function Zn(t){return Xn(t)&&"string"==typeof t.address}function Qn(t){return Zn(t)&&"string"==typeof t.token}function Xn(t){return"string"==typeof t.uuid}class ti{constructor(){this.storage=new Map}hashKeys(t){return t.map(ei).join("/")}getOrCreate(e){const n=this.hashKeys(e);return this.storage.has(n)||this.storage.set(n,new t.EventEmitter),this.storage.get(n)}has(t){return this.storage.has(this.hashKeys(t))}delete(t){const e=this.hashKeys(t);return this.storage.delete(e)}}function ei(t){return btoa(t)}class ni extends ti{constructor(){super(...arguments),this.dispatchEvent=t=>{if(function(t){return"process-desktop-event"===t.action}(t)){const{payload:e}=t,n=function(t){const{topic:e}=t;if("frame"===e||"window"===e||"view"===e){const{uuid:n,name:i}=t;return[e,n,i]}if("application"===e){const{uuid:n}=t;return[e,n]}return[e]}(e);if(this.has(n))return this.getOrCreate(n).emit(e.type,e),!0}return!1}}}var ii,ri,si,oi,ai,ci,di,hi=function(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n},li=function(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)};class pi extends t.EventEmitter{constructor(t,e,n){super(),ii.add(this),this.wireListeners=new Map,this.topicRefMap=new Map,this.eventAggregator=new ni,this.messageHandlers=[this.eventAggregator.dispatchEvent],ri.set(this,void 0),si.set(this,!0),oi.set(this,new Map),ai.set(this,void 0),ci.set(this,void 0),this.connectSync=()=>{li(this,ri,"f").connectSync()},this.getPort=()=>li(this,ri,"f").getPort(),hi(this,ri,t(this.onmessage.bind(this)),"f"),this.environment=e,hi(this,si,!1!==n.apiDiagnostics,"f"),this.sendRaw=li(this,ri,"f").send.bind(li(this,ri,"f")),this.registerMessageHandler(this.handleMessage.bind(this)),li(this,ri,"f").on("disconnected",()=>{for(const[,{handleNack:t}]of this.wireListeners)t({reason:"Remote connection has closed"});this.wireListeners.clear(),clearTimeout(li(this,ai,"f")),hi(this,ai,void 0,"f"),li(this,oi,"f").clear(),this.emit("disconnected")});const{uuid:i,name:r}=n,s=this.environment.getCurrentEntityType();this.me=Ee(s,i,r)}getFin(){if(!li(this,ci,"f"))throw new Error("No Fin object registered for this transport");return li(this,ci,"f")}registerFin(t){if(li(this,ci,"f"))throw new Error("Fin object has already been registered for this transport");hi(this,ci,t,"f")}recordAnalytic(t){if(li(this,si,"f")&&(li(this,oi,"f").set(t,(li(this,oi,"f").get(t)??0)+1),void 0===li(this,ai,"f"))){const t=setTimeout(()=>li(this,ii,"m",di).call(this),3e4);"object"==typeof t&&null!==t&&t.unref?.(),hi(this,ai,t,"f")}}shutdown(){return li(this,ri,"f").shutdown()}async connect(t){if(function(t){return"object"==typeof t.receiver&&Qn({...t,address:""})}(t))return await li(this,ri,"f").connect(t.receiver),this.authorize(t);if(Qn(t))return this.connectRemote(t);if(Zn(t))return this.connectByPort(t);if(function(t){return Xn(t)&&function(t){return t.runtime&&"string"==typeof t.runtime.version}(t)}(t)){const e=await this.environment.retrievePort(t);return this.connectByPort({...t,address:`ws://localhost:${e}`})}}async connectRemote(t){return await li(this,ri,"f").connect(new(this.environment.getWsConstructor())(t.address)),this.authorize(t)}async connectByPort(t){const{address:e,uuid:n}=t,i={...t,type:"file-token"},r=li(this,ri,"f");await r.connect(new(this.environment.getWsConstructor())(t.address));const s=await this.sendAction("request-external-authorization",{uuid:n,type:"file-token"},!0);if("external-authorization-response"!==s.action)throw new u(s.action);return await this.environment.writeToken(s.payload.file,s.payload.token),this.authorize(i)}async authorize(t){const e=await this.sendAction("request-authorization",t,!0);if("authorization-response"!==e.action)throw new u(e.action);if(!0!==e.payload.success)throw new m(e.payload)}sendAction(t,e={},n=!1){let i=()=>{};const r=m.getCallSite(1),s=this.environment.getNextMessageId(),o=new Promise((o,a)=>{i=a;const c={action:t,payload:e,messageId:s},d=li(this,ri,"f");return this.addWireListener(s,o,t=>this.nackHandler(t,a,r),n),d.send(c).catch(a)});return Object.assign(o,{cancel:i,messageId:s})}nackHandler(t,e,n){e("string"==typeof t?t:new m(t,n))}ferryAction(t){return new Promise((e,n)=>{const i=this.environment.getNextMessageId();t.messageId=i;const r=t=>{e(t.payload)};return li(this,ri,"f").send(t).then(()=>this.addWireListener(i,r,t=>this.nackHandler(t,n),!1)).catch(n)})}registerMessageHandler(t){this.messageHandlers.push(t)}addWireListener(t,e,n,i){i?this.uncorrelatedListener=e:this.wireListeners.has(t)?n({reason:"Duplicate handler id",error:X(new w(String(t)))}):this.wireListeners.set(t,{resolve:e,handleNack:n})}onmessage(t){for(const e of this.messageHandlers)e.call(null,t)}handleMessage(t){const e=t.correlationId||NaN;if("correlationId"in t){if(!this.wireListeners.has(e))return!1;{const{resolve:n,handleNack:i}=this.wireListeners.get(e);"ack"!==t.action?i({reason:"Did not receive ack action",error:X(new y(t.action))}):"payload"in t?t.payload.success?n.call(null,t):i(t.payload):"string"==typeof t.reason?i(t):(console.warn("Received invalid response from core",t),i({reason:"invalid response shape",error:X(new Error("Invalid response shape"))})),this.wireListeners.delete(e)}}else this.uncorrelatedListener&&this.uncorrelatedListener.call(null,t),this.uncorrelatedListener=()=>{};return!0}}ri=new WeakMap,si=new WeakMap,oi=new WeakMap,ai=new WeakMap,ci=new WeakMap,ii=new WeakSet,di=function(){if(hi(this,ai,void 0,"f"),0===li(this,oi,"f").size)return;const t=Object.fromEntries(li(this,oi,"f"));li(this,oi,"f").clear(),this.sendAction("send-analytics-batch",{counts:t}).catch(()=>{})};const ui=new Map([["debug",0],["info",1],["warn",2],["error",3],["none",4]]),wi=t=>"string"==typeof t?t:t instanceof Error?t.stack||t.message:JSON.stringify(t);class yi{static setGlobalLogLevel(t){yi.LOG_LEVEL=t??"error"}static setCustomLogger(t){yi.customLogger=t}constructor(...t){this.scopes=t}log(t,...e){const n=ui.get(t)??3;if((ui.get(yi.LOG_LEVEL)??3)<=n){const r=[`[${(new Date).toISOString()}]`,...(i=this.scopes,i.map(t=>`[${t}]`)),...e];if(yi.customLogger){const e=r.map(wi).join(" ");yi.customLogger[t](e)}else 1===n?console.log(...r):console[t](...r)}var i}warn(...t){this.log("warn",...t)}error(...t){this.log("error",...t)}info(...t){this.log("info",...t)}debug(...t){this.log("debug",...t)}static getLogger(...t){return new yi(...t)}getLogger(...t){return new yi(...this.scopes,...t)}}yi.LOG_LEVEL="error";const fi=yi.getLogger("@openfin/core-web/client"),gi=fi.getLogger("data-channel"),mi=t=>`data-channel-${t.me.uuid}`,vi=async(t,e)=>{const n=async n=>t.dispatch("page-title-updated",{data:{identity:e,title:n}}).catch(t=>{gi.warn("Failed to dispatch title change",t)});document.title&&await n(document.title),s(document.head,n);const i=async n=>t.dispatch("page-favicon-updated",{data:{identity:e,favicon:n}}).catch(t=>{gi.warn("Failed to dispatch favicon change",t)}),r=document.querySelector('link[rel~="icon"]')?.href;r&&await i(r),o(document.head,t=>{i(t)})};function Ci(t,e){if(!function(t){return"string"==typeof t}(t))throw new Error(`Property ${e} has invalid type. Expected string, got ${typeof t}.`)}const Ii="web-broker-ports-ready",xi=fi.getLogger("get-web-interop-ports");function bi(t,e,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(t):i?i.value:e.get(t)}function Ai(t,e,n,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(t,n):r?r.value=n:e.set(t,n),n}var Ei,Pi,Mi;"function"==typeof SuppressedError&&SuppressedError;class Si extends t.EventEmitter{constructor(t,e){super(),Ei.set(this,void 0),Pi.set(this,void 0),Mi.set(this,!1),this.connectSync=()=>{bi(this,Mi,"f")||(bi(this,Pi,"f").addEventListener("message",t=>{t.data?.topic?.startsWith("wire-message")&&t.data.message&&bi(this,Ei,"f").call(this,{...JSON.parse(t.data.message),ports:t.ports})}),bi(this,Pi,"f").start())},this.connect=async()=>{this.connectSync()},this.send=t=>(bi(this,Pi,"f").postMessage({topic:"wire-message",message:JSON.stringify(t)}),Promise.resolve()),this.shutdown=async()=>{bi(this,Pi,"f").close()},Ai(this,Ei,t,"f"),Ai(this,Pi,e,"f")}getPort(){return bi(this,Pi,"f")}}Ei=new WeakMap,Pi=new WeakMap,Mi=new WeakMap;class ki{async getViewWindowIdentity(t,e){const{identity:n}=await t.View.wrapSync(e).getCurrentWindow();return n}async getInteropInfo(t){const e=await t.Application.getCurrentSync().getInfo().catch(()=>null),n=e?.initialOptions?.interopBrokerConfiguration??{};return{fdc3Version:e?function({manifest:t,initialOptions:e}){const n=t?.platform?.defaultViewOptions?.fdc3InteropApi??e.defaultViewOptions?.fdc3InteropApi;return["1.2","2.0"].includes(n??"")?n:void 0}(e):void 0,...n,fdc3Info:{providerVersion:await t.System.getVersion(),provider:"OpenFin"}}}}class Li extends ki{constructor(){super(...arguments),this.type="other",this.getRandomId=()=>{const t=new Uint32Array(1);return window.crypto.getRandomValues(t)[0].toString(32)}}getAdapterVersionSync(){return""}observeBounds(t,e){throw new Error("Method not implemented.")}layoutAllowedInContext(t){return!1}initLayoutManager(t,e,n){throw new Error("Method not implemented.")}applyLayoutSnapshot(t,e,n){throw new Error("Method not implemented.")}createLayout(t,e){throw new Error("Method not implemented.")}destroyLayout(t,e){throw new Error("Method not implemented.")}resolveLayout(t,e){throw new Error("Method not implemented.")}initPlatform(...t){throw new Error("Method not implemented.")}writeToken(t,e){return Promise.resolve("")}retrievePort(t){throw new Error("Method not implemented.")}getNextMessageId(){return this.getRandomId()}createChildContent(t){throw new Error("Method not implemented.")}getWebWindow(t){throw new Error("Method not implemented.")}getCurrentEntityIdentity(){throw new Error("Method not implemented.")}getCurrentEntityType(){return"external connection"}raiseEvent(t,e){throw new Error("Method not implemented.")}getUrl(){return location.href}getDefaultChannelOptions(){return{create:{},connect:{}}}getRtcPeer(){return new RTCPeerConnection}getWsConstructor(){return WebSocket}whenReady(){return Promise.resolve()}}const Ti=t=>"platform"in t&&void 0!==t.platform;var $i,Fi;class Ri extends Li{constructor(t){super(),this.connectConfig=t,$i.set(this,void 0),Fi.set(this,new x(async()=>Promise.resolve().then(function(){return __webpack_require__(/*! ./main-0896ef54.js */ "../../node_modules/@openfin/core-web/out/main-0896ef54.js")}))),Ti(t)&&this.validatePlatformOptions(t)}getAdapterVersionSync(){return"0.44.112"}validatePlatformOptions({platform:t}){if(!("layoutSnapshot"in t))throw new Error("Platform options are missing layoutSnapshot. Please provide a layoutSnapshot in the platform options.");if("windows"in t||"windows"in t.layoutSnapshot)throw new Error("It appears you tried to call connect() with a snapshot object from an OpenFin desktop environment. Note that connect() expects to be called with a platform property with this structure: { platform: { layoutSnapshot } }. To get a layoutSnapshot of the expected structure, use fin.Platform.Layout.getCurrentLayoutManagerSync().getLayoutSnapshot() in v34+ in your desktop environment.");const{layouts:e}=t.layoutSnapshot;Object.entries(e).map(([t,e])=>{if("object"!=typeof e||null===e)throw new Error(`Invalid layout detected: layoutSnapshot.layouts.${t} must be an object.`);if(!("content"in e))throw new Error(`Invalid layout detected: layoutSnapshot.layouts.${t} must contain a 'content' property.`)})}async getInteropInfo(t){return{...{contextGroups:void 0,logging:{beforeAction:{enabled:!1},afterAction:{enabled:!1}}},fdc3Version:void 0,fdc3Info:{providerVersion:"0.44.112",provider:"OpenFin Web"}}}layoutAllowedInContext(t){return!0}async initLayoutManager(t,e,n){if(bi(this,$i,"f"))throw new Error("Layout already initialized.");if(!Ti(this.connectConfig))throw new Error("Platform options are missing from connection config.");const{WebLayoutEntryPoint:i}=await bi(this,Fi,"f").getValue();return Ai(this,$i,new i(this.connectConfig),"f"),await bi(this,$i,"f").initLayoutManager(t,e,n)}async applyLayoutSnapshot(t,e,n){bi(this,$i,"f")?.applyLayoutSnapshot(t,e,n)}async createLayout(t,e){return bi(this,$i,"f")?.createLayout(t,e)}async destroyLayout(t,e){return bi(this,$i,"f")?.destroyLayout(t,e)}async getViewWindowIdentity(t,e){return Promise.resolve({uuid:e.uuid,name:e.uuid})}}$i=new WeakMap,Fi=new WeakMap;const Gi=()=>{const t=((t,e)=>{const n=new RegExp(`^${e}<(?<meta>.*)>$`).exec(t)?.groups?.meta;if(n)try{return JSON.parse(atob(n))}catch(t){throw new Error(`Failed to decode JSON from ${n}.`)}})(window.name,"of-frame");if(t)try{const{name:e,uuid:n,brokerUrl:i,providerId:r,contextGroup:s}=t;return Ci(i,"brokerUrl"),Ci(n,"uuid"),Ci(e,"name"),{identity:{name:e,uuid:n},brokerUrl:i,interopConfig:{providerId:r,currentContextGroup:s},isOfView:!0}}catch(t){throw new Error(`Unexpected error occurred when inferring platform information: ${t.stack}`)}},Oi=()=>{const t=n.v4();return{uuid:t,name:t}},Wi=async t=>{if("enabled"===t.connectionInheritance){const e=await(async t=>{const e=Gi();if(e){const{validateOptions:n=()=>!0}=t,{identity:i,...r}=e;if(!await n(r))throw new Error("Parent options were rejected by validateOptions.");return e}})(t);if(e)return e}if(!t.options){const e="enabled"===t.connectionInheritance?"Broker URL was not specified nor provided by a platform container.":"Connection inheritance is disabled but no options were provided.";throw new Error(e)}return{...t.options,identity:Oi(),isOfView:!1}};exports.LAYOUT_CONTROLLER_ID=de,exports.Lazy=x,exports.Logger=yi,exports.__classPrivateFieldGet=bi,exports.__classPrivateFieldSet=Ai,exports.clientLogger=fi,exports.connect=async t=>{try{yi.setGlobalLogLevel(t.logLevel),yi.setCustomLogger(t.logger),fi.info("Establishing connection",t);const{brokerUrl:e,identity:n,timeout:s,interopConfig:o,isOfView:a}=await Wi(t),{workerPort:c,iframeBrokerPort:d}=await(async(t,e,n)=>{const{origin:r}=new URL(t),s=document.createElement("IFRAME");let o;s.style.display="none";try{return await new Promise((a,c)=>{const d=t=>{if(t.source===s.contentWindow&&t.data?.topic===`ack-${Ii}`){if(t.origin!==r)c(new Error(`Broker redirected to unexpected origin ${t.origin}, expected ${r}.`));else if(t.data.success){const[e,n]=t.ports;a({iframeBrokerPort:e,workerPort:n})}else c(new m(t.data));window.removeEventListener("message",d),clearTimeout(o)}};window.addEventListener("message",d),xi.info(`Connecting to broker ${t}`),s.setAttribute("src",t),s.setAttribute("name",i(e,"of-broker")),document.body.appendChild(s),xi.info("Iframe loaded, awaiting init message from iframe"),n&&(o=setTimeout(()=>{window.removeEventListener("message",d),document.body.removeChild(s),c(new Error("Worker did not initialize in time"))},n))})}catch(t){throw new Error(`Failed to initialise Fin Web Client. ${t.message}`,{cause:t})}})(e,n,s);fi.info("Successfully established connection to shared worker");const h={entityType:"external connection",...n};c.start(),d.start();const l=((t,e,n)=>{const i=new Ri(t),r=new pi(t=>new Si(t,e),i,n);return r.connectSync(),new Kn(r)})(t,c,h);return a&&window.top&&!r(window,window.top)&&(t=>{const e={uuid:t.me.uuid,name:t.me.name};gi.debug("Data channel connecting..."),t.InterApplicationBus.Channel.connect(mi(t)).then(async t=>{gi.debug("Data channel connected"),await vi(t,e)}).catch(t=>{gi.warn("Failed to connect to data channel, some features may not work like title updates",t)})})(l),o?.providerId&&(l.me.interop=l.Interop.connectSync(o.providerId),o?.currentContextGroup&&l.me.interop.joinContextGroup(o.currentContextGroup).catch(t=>{fi.warn(`Error joining specified context group: ${o?.currentContextGroup}, continuing`,t)})),{...l,me:{...l.me,identity:{uuid:l.me.uuid,name:l.me.name}}}}catch(t){throw new Error(`An error occured during web-interop connection: ${t.message}`)}},exports.encodeOptions=i,exports.getDataChannelName=mi,exports.getFaviconObserver=o,exports.getTitleObserver=s,exports.isSameOrigin=r,exports.makeKeyChecker=()=>t=>t,exports.relayChannelClientApi=async(t,e)=>{t.register(`relay:${e}`,({action:e,target:n,payload:i})=>t.dispatch(n,e,i)),await Promise.resolve()};


/***/ },

/***/ "../../node_modules/es-toolkit/dist/_internal/DOMException.js"
/*!********************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/_internal/DOMException.js ***!
  \********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_globalThis = __webpack_require__(/*! ./globalThis.js */ "../../node_modules/es-toolkit/dist/_internal/globalThis.js");
//#region src/_internal/DOMException.ts
const DOMException = typeof require_globalThis.globalThis_.DOMException !== "undefined" ? require_globalThis.globalThis_.DOMException : Error;
//#endregion
exports.DOMException = DOMException;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/_internal/compareValues.js"
/*!*********************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/_internal/compareValues.js ***!
  \*********************************************************************/
(__unused_webpack_module, exports) {

//#region src/_internal/compareValues.ts
function nullishRank(value) {
	if (value === null) return 1;
	if (value === void 0) return 2;
	return 0;
}
function compareAscending(a, b) {
	const aRank = nullishRank(a);
	const bRank = nullishRank(b);
	if (aRank < bRank) return -1;
	if (aRank > bRank) return 1;
	if (aRank !== 0) return 0;
	if (a < b) return -1;
	if (a > b) return 1;
	return 0;
}
function compareValues(a, b, order) {
	return order === "asc" ? compareAscending(a, b) : compareAscending(b, a);
}
//#endregion
exports.compareValues = compareValues;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/_internal/globalThis.js"
/*!******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/_internal/globalThis.js ***!
  \******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

//#region src/_internal/globalThis.ts
const globalThis_ = typeof globalThis === "object" && globalThis || typeof window === "object" && window || typeof self === "object" && self || typeof __webpack_require__.g === "object" && __webpack_require__.g || (function() {
	return this;
})();
//#endregion
exports.globalThis_ = globalThis_;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/_internal/isEqualsSameValueZero.js"
/*!*****************************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/_internal/isEqualsSameValueZero.js ***!
  \*****************************************************************************/
(__unused_webpack_module, exports) {

//#region src/_internal/isEqualsSameValueZero.ts
/**
* Performs a `SameValueZero` comparison between two values to determine if they are equivalent.
*
* @param {any} value - The value to compare.
* @param {any} other - The other value to compare.
* @returns {boolean} Returns `true` if the values are equivalent, else `false`.
*
* @example
* eq(1, 1); // true
* eq(0, -0); // true
* eq(NaN, NaN); // true
* eq('a', Object('a')); // false
*/
function isEqualsSameValueZero(value, other) {
	return value === other || Number.isNaN(value) && Number.isNaN(other);
}
//#endregion
exports.isEqualsSameValueZero = isEqualsSameValueZero;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/_internal/isUnsafeProperty.js"
/*!************************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/_internal/isUnsafeProperty.js ***!
  \************************************************************************/
(__unused_webpack_module, exports) {

//#region src/_internal/isUnsafeProperty.ts
/**
* Checks if a property key is unsafe to modify directly.
*
* This function is used in functions like `merge` to prevent prototype pollution attacks
* by identifying property keys that could modify the object's prototype chain or constructor.
*
* @param key - The property key to check
* @returns `true` if the property is unsafe to modify directly, `false` otherwise
* @internal
*/
function isUnsafeProperty(key) {
	return key === "__proto__";
}
//#endregion
exports.isUnsafeProperty = isUnsafeProperty;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/at.js"
/*!******************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/at.js ***!
  \******************************************************/
(__unused_webpack_module, exports) {

//#region src/array/at.ts
/**
* Retrieves elements from an array at the specified indices.
*
* This function supports negative indices, which count from the end of the array.
*
* @template T
* @param arr - The array to retrieve elements from.
* @param indices - An array of indices specifying the positions of elements to retrieve.
* @returns A new array containing the elements at the specified indices.
*
* @example
* const numbers = [10, 20, 30, 40, 50];
* const result = at(numbers, [1, 3, 4]);
* console.log(result); // [20, 40, 50]
*/
function at(arr, indices) {
	const result = new Array(indices.length);
	const length = arr.length;
	for (let i = 0; i < indices.length; i++) {
		let index = indices[i];
		index = Number.isInteger(index) ? index : Math.trunc(index) || 0;
		if (index < 0) index += length;
		result[i] = arr[index];
	}
	return result;
}
//#endregion
exports.at = at;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/cartesianProduct.js"
/*!********************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/cartesianProduct.js ***!
  \********************************************************************/
(__unused_webpack_module, exports) {

//#region src/array/cartesianProduct.ts
function cartesianProduct(...arrs) {
	if (arrs.length === 0) return [[]];
	let total = 1;
	for (let i = 0; i < arrs.length; i++) total *= arrs[i].length;
	if (total === 0) return [];
	const n = arrs.length;
	const result = Array(total);
	for (let i = 0; i < total; i++) {
		const tuple = Array(n);
		let idx = i;
		for (let j = n - 1; j >= 0; j--) {
			const arr = arrs[j];
			const len = arr.length;
			tuple[j] = arr[idx % len];
			idx = Math.floor(idx / len);
		}
		result[i] = tuple;
	}
	return result;
}
//#endregion
exports.cartesianProduct = cartesianProduct;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/chunk.js"
/*!*********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/chunk.js ***!
  \*********************************************************/
(__unused_webpack_module, exports) {

//#region src/array/chunk.ts
/**
* Splits an array into smaller arrays of a specified length.
*
* This function takes an input array and divides it into multiple smaller arrays,
* each of a specified length. If the input array cannot be evenly divided,
* the final sub-array will contain the remaining elements.
*
* @template T The type of elements in the array.
* @param arr - The array to be chunked into smaller arrays.
* @param size - The size of each smaller array. Must be a positive integer.
* @returns A two-dimensional array where each sub-array has a maximum length of `size`.
* @throws {Error} Throws an error if `size` is not a positive integer.
*
* @example
* // Splits an array of numbers into sub-arrays of length 2
* chunk([1, 2, 3, 4, 5], 2);
* // Returns: [[1, 2], [3, 4], [5]]
*
* @example
* // Splits an array of strings into sub-arrays of length 3
* chunk(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 3);
* // Returns: [['a', 'b', 'c'], ['d', 'e', 'f'], ['g']]
*/
function chunk(arr, size) {
	if (!Number.isInteger(size) || size <= 0) throw new Error("Size must be an integer greater than zero.");
	const chunkLength = Math.ceil(arr.length / size);
	const result = Array(chunkLength);
	for (let index = 0; index < chunkLength; index++) {
		const start = index * size;
		const end = start + size;
		result[index] = arr.slice(start, end);
	}
	return result;
}
//#endregion
exports.chunk = chunk;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/combinations.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/combinations.js ***!
  \****************************************************************/
(__unused_webpack_module, exports) {

//#region src/array/combinations.ts
/**
* Returns all `r`-length combinations of elements from the input array.
*
* Combinations are emitted in lexicographic order based on the position of elements in the input array.
* Elements are treated as unique by position, not by value, so duplicates in the input may produce
* combinations that look identical.
*
* The number of combinations is `n! / r! / (n - r)!` when `0 <= r <= n`, and zero when `r > n`.
*
* @template T
* @param arr - The input array.
* @param r - The length of each combination. Must be a non-negative integer.
* @returns An array of `r`-length combinations.
* @throws {Error} If `r` is not a non-negative integer.
*
* @example
* combinations(['A', 'B', 'C', 'D'], 2);
* // => [['A','B'], ['A','C'], ['A','D'], ['B','C'], ['B','D'], ['C','D']]
*
* @example
* combinations([1, 2, 3, 4], 3);
* // => [[1,2,3], [1,2,4], [1,3,4], [2,3,4]]
*
* @example
* combinations([1, 2, 3], 0);
* // => [[]]
*
* @example
* combinations([1, 2], 5);
* // => []
*/
function combinations(arr, r) {
	if (!Number.isInteger(r) || r < 0) throw new Error("r must be a non-negative integer.");
	const n = arr.length;
	if (r > n) return [];
	if (r === 0) return [[]];
	const indices = Array(r);
	for (let i = 0; i < r; i++) indices[i] = i;
	const result = [];
	while (true) {
		const tuple = Array(r);
		for (let i = 0; i < r; i++) tuple[i] = arr[indices[i]];
		result.push(tuple);
		let i = r - 1;
		while (i >= 0 && indices[i] === i + n - r) i--;
		if (i < 0) return result;
		indices[i]++;
		for (let j = i + 1; j < r; j++) indices[j] = indices[j - 1] + 1;
	}
}
//#endregion
exports.combinations = combinations;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/compact.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/compact.js ***!
  \***********************************************************/
(__unused_webpack_module, exports) {

//#region src/array/compact.ts
/**
* Removes falsey values (false, null, 0, -0, 0n, '', undefined, NaN) from an array.
*
* @template T - The type of elements in the array.
* @param arr - The input array to remove falsey values.
* @returns A new array with all falsey values removed.
*
* @example
* compact([0, -0, 0n, 1, false, 2, '', 3, null, undefined, 4, NaN, 5]);
* Returns: [1, 2, 3, 4, 5]
*/
function compact(arr) {
	const result = [];
	for (let i = 0; i < arr.length; i++) {
		const item = arr[i];
		if (item) result.push(item);
	}
	return result;
}
//#endregion
exports.compact = compact;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/countBy.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/countBy.js ***!
  \***********************************************************/
(__unused_webpack_module, exports) {

//#region src/array/countBy.ts
/**
* Count the occurrences of each item in an array
* based on a transformation function.
*
* This function takes an array and a transformation function
* that converts each item in the array to a key. It then
* counts the occurrences of each transformed item and returns
* an object with the transformed items as keys and the counts
* as values.
*
* @template T - The type of the items in the input array.
* @template K - The type of keys.
* @param arr - The input array to count occurrences.
* @param mapper - The transformation function that maps each item, its index, and the array to a key.
* @returns An object containing the transformed items as keys and the
* counts as values.
*
* @example
* const array = ['a', 'b', 'c', 'a', 'b', 'a'];
* const result = countBy(array, x => x);
* // result will be { a: 3, b: 2, c: 1 }
*
* @example
* const array = [1, 2, 3, 4, 5];
* const result = countBy(array, item => item % 2 === 0 ? 'even' : 'odd');
* // result will be { odd: 3, even: 2 }
*
* @example
* // Using index parameter
* const array = ['a', 'b', 'c', 'd'];
* const result = countBy(array, (item, index) => index < 2 ? 'first' : 'rest');
* // result will be { first: 2, rest: 2 }
*/
function countBy(arr, mapper) {
	const result = {};
	for (let i = 0; i < arr.length; i++) {
		const item = arr[i];
		const key = mapper(item, i, arr);
		result[key] = (result[key] ?? 0) + 1;
	}
	return result;
}
//#endregion
exports.countBy = countBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/difference.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/difference.js ***!
  \**************************************************************/
(__unused_webpack_module, exports) {

//#region src/array/difference.ts
/**
* Computes the difference between two arrays.
*
* This function takes two arrays and returns a new array containing the elements
* that are present in the first array but not in the second array. It effectively
* filters out any elements from the first array that also appear in the second array.
*
* @template T
* @param firstArr - The array from which to derive the difference. This is the primary array
* from which elements will be compared and filtered.
* @param secondArr - The array containing elements to be excluded from the first array.
* Each element in this array will be checked against the first array, and if a match is found,
* that element will be excluded from the result.
* @returns A new array containing the elements that are present in the first array but not
* in the second array.
*
* @example
* const array1 = [1, 2, 3, 4, 5];
* const array2 = [2, 4];
* const result = difference(array1, array2);
* // result will be [1, 3, 5] since 2 and 4 are in both arrays and are excluded from the result.
*/
function difference(firstArr, secondArr) {
	const secondSet = new Set(secondArr);
	return firstArr.filter((item) => !secondSet.has(item));
}
//#endregion
exports.difference = difference;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/differenceBy.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/differenceBy.js ***!
  \****************************************************************/
(__unused_webpack_module, exports) {

//#region src/array/differenceBy.ts
/**
* Computes the difference between two arrays after mapping their elements through a provided function.
*
* This function takes two arrays and a mapper function. It returns a new array containing the elements
* that are present in the first array but not in the second array, based on the identity calculated
* by the mapper function.
*
* Essentially, it filters out any elements from the first array that, when
* mapped, match an element in the mapped version of the second array.
*
* @template T, U
* @param firstArr - The primary array from which to derive the difference.
* @param secondArr - The array containing elements to be excluded from the first array.
* @param mapper - The function to map the elements of both arrays. This function
* is applied to each element in both arrays, and the comparison is made based on the mapped values.
* @returns A new array containing the elements from the first array that do not have a corresponding
* mapped identity in the second array.
*
* @example
* const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
* const array2 = [{ id: 2 }, { id: 4 }];
* const mapper = item => item.id;
* const result = differenceBy(array1, array2, mapper);
* // result will be [{ id: 1 }, { id: 3 }] since the elements with id 2 are in both arrays and are excluded from the result.
*
* @example
* const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
* const array2 = [2, 4];
* const mapper = item => (typeof item === 'object' ? item.id : item);
* const result = differenceBy(array1, array2, mapper);
* // result will be [{ id: 1 }, { id: 3 }] since 2 is present in both arrays after mapping, and is excluded from the result.
*/
function differenceBy(firstArr, secondArr, mapper) {
	const mappedSecondSet = new Set(secondArr.map((item) => mapper(item)));
	return firstArr.filter((item) => {
		return !mappedSecondSet.has(mapper(item));
	});
}
//#endregion
exports.differenceBy = differenceBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/differenceWith.js"
/*!******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/differenceWith.js ***!
  \******************************************************************/
(__unused_webpack_module, exports) {

//#region src/array/differenceWith.ts
/**
* Computes the difference between two arrays based on a custom equality function.
*
* This function takes two arrays and a custom comparison function. It returns a new array containing
* the elements that are present in the first array but not in the second array. The comparison to determine
* if elements are equal is made using the provided custom function.
*
* @template T, U
* @param firstArr - The array from which to get the difference.
* @param secondArr - The array containing elements to exclude from the first array.
* @param areItemsEqual - A function to determine if two items are equal.
* @returns A new array containing the elements from the first array that do not match any elements in the second array
* according to the custom equality function.
*
* @example
* const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
* const array2 = [{ id: 2 }, { id: 4 }];
* const areItemsEqual = (a, b) => a.id === b.id;
* const result = differenceWith(array1, array2, areItemsEqual);
* // result will be [{ id: 1 }, { id: 3 }] since the elements with id 2 are considered equal and are excluded from the result.
*
* @example
* const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
* const array2 = [2, 4];
* const areItemsEqual = (a, b) => a.id === b;
* const result = differenceWith(array1, array2, areItemsEqual);
* // result will be [{ id: 1 }, { id: 3 }] since the element with id 2 is considered equal to the second array's element and is excluded from the result.
*/
function differenceWith(firstArr, secondArr, areItemsEqual) {
	return firstArr.filter((firstItem) => {
		return secondArr.every((secondItem) => {
			return !areItemsEqual(firstItem, secondItem);
		});
	});
}
//#endregion
exports.differenceWith = differenceWith;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/drop.js"
/*!********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/drop.js ***!
  \********************************************************/
(__unused_webpack_module, exports) {

//#region src/array/drop.ts
/**
* Removes a specified number of elements from the beginning of an array and returns the rest.
*
* This function takes an array and a number, and returns a new array with the specified number
* of elements removed from the start.
*
* @template T - The type of elements in the array.
* @param arr - The array from which to drop elements.
* @param itemsCount - The number of elements to drop from the beginning of the array.
* @returns A new array with the specified number of elements removed from the start.
*
* @example
* const array = [1, 2, 3, 4, 5];
* const result = drop(array, 2);
* // result will be [3, 4, 5] since the first two elements are dropped.
*/
function drop(arr, itemsCount) {
	itemsCount = Math.max(itemsCount, 0);
	return arr.slice(itemsCount);
}
//#endregion
exports.drop = drop;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/dropRight.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/dropRight.js ***!
  \*************************************************************/
(__unused_webpack_module, exports) {

//#region src/array/dropRight.ts
/**
* Removes a specified number of elements from the end of an array and returns the rest.
*
* This function takes an array and a number, and returns a new array with the specified number
* of elements removed from the end.
*
* @template T - The type of elements in the array.
* @param arr - The array from which to drop elements.
* @param itemsCount - The number of elements to drop from the end of the array.
* @returns A new array with the specified number of elements removed from the end.
*
* @example
* const array = [1, 2, 3, 4, 5];
* const result = dropRight(array, 2);
* // result will be [1, 2, 3] since the last two elements are dropped.
*/
function dropRight(arr, itemsCount) {
	itemsCount = Math.min(-itemsCount, 0);
	if (itemsCount === 0) return arr.slice();
	return arr.slice(0, itemsCount);
}
//#endregion
exports.dropRight = dropRight;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/dropRightWhile.js"
/*!******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/dropRightWhile.js ***!
  \******************************************************************/
(__unused_webpack_module, exports) {

//#region src/array/dropRightWhile.ts
/**
* Removes elements from the end of an array until the predicate returns false.
*
* This function iterates over an array from the end and drops elements until the provided
* predicate function returns false. It then returns a new array with the remaining elements.
*
* @template T - The type of elements in the array.
* @param arr - The array from which to drop elements.
* @param canContinueDropping - A predicate function that determines
* whether to continue dropping elements. The function is called with each element from the end,
* and dropping continues as long as it returns true.
* @returns A new array with the elements remaining after the predicate returns false.
*
* @example
* const array = [1, 2, 3, 4, 5];
* const result = dropRightWhile(array, x => x > 3);
* // result will be [1, 2, 3] since elements greater than 3 are dropped from the end.
*/
function dropRightWhile(arr, canContinueDropping) {
	for (let i = arr.length - 1; i >= 0; i--) if (!canContinueDropping(arr[i], i, arr)) return arr.slice(0, i + 1);
	return [];
}
//#endregion
exports.dropRightWhile = dropRightWhile;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/dropWhile.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/dropWhile.js ***!
  \*************************************************************/
(__unused_webpack_module, exports) {

//#region src/array/dropWhile.ts
/**
* Removes elements from the beginning of an array until the predicate returns false.
*
* This function iterates over an array and drops elements from the start until the provided
* predicate function returns false. It then returns a new array with the remaining elements.
*
* @template T - The type of elements in the array.
* @param arr - The array from which to drop elements.
* @param canContinueDropping - A predicate function that determines
* whether to continue dropping elements. The function is called with each element, and dropping
* continues as long as it returns true.
* @returns A new array with the elements remaining after the predicate returns false.
*
* @example
* const array = [1, 2, 3, 4, 5];
* const result = dropWhile(array, x => x < 3);
* // result will be [3, 4, 5] since elements less than 3 are dropped.
*/
function dropWhile(arr, canContinueDropping) {
	const dropEndIndex = arr.findIndex((item, index, arr) => !canContinueDropping(item, index, arr));
	if (dropEndIndex === -1) return [];
	return arr.slice(dropEndIndex);
}
//#endregion
exports.dropWhile = dropWhile;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/fill.js"
/*!********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/fill.js ***!
  \********************************************************/
(__unused_webpack_module, exports) {

//#region src/array/fill.ts
/**
* Fills elements of an array with a specified value from the start position up to, but not including, the end position.
*
* This function mutates the original array and replaces its elements with the provided value, starting from the specified
* start index up to the end index (non-inclusive). If the start or end indices are not provided, it defaults to filling the
* entire array.
*
* @template T - The type of elements in the original array.
* @template U - The type of the value to fill the array with.
* @param array - The array to fill.
* @param value - The value to fill the array with.
* @param [start=0] - The start position. Defaults to 0.
* @param [end=arr.length] - The end position. Defaults to the array's length.
* @returns The array with the filled values.
*
* @example
* fill([1, 2, 3], 'a');
* // => ['a', 'a', 'a']
*
* fill(Array(3), 2);
* // => [2, 2, 2]
*
* fill([4, 6, 8, 10], '*', 1, 3);
* // => [4, '*', '*', 10]
*
* fill([1, 2, 3], '*', -2, -1);
* // => [1, '*', 3]
*/
function fill(array, value, start = 0, end = array.length) {
	const length = array.length;
	const finalStart = Math.max(start >= 0 ? start : length + start, 0);
	const finalEnd = Math.min(end >= 0 ? end : length + end, length);
	for (let i = finalStart; i < finalEnd; i++) array[i] = value;
	return array;
}
//#endregion
exports.fill = fill;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/filterAsync.js"
/*!***************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/filterAsync.js ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_limitAsync = __webpack_require__(/*! ./limitAsync.js */ "../../node_modules/es-toolkit/dist/array/limitAsync.js");
//#region src/array/filterAsync.ts
/**
* Filters an array asynchronously using an async predicate function.
*
* Returns a promise that resolves to a new array containing only the elements
* for which the predicate function returns a truthy value.
*
* @template T - The type of elements in the array.
* @param array The array to filter.
* @param predicate An async function that tests each element.
* @param [options] Optional configuration object.
* @param [options.concurrency] Maximum number of concurrent async operations. If not specified, all operations run concurrently.
* @returns A promise that resolves to the filtered array.
* @example
* const users = [{ id: 1, active: true }, { id: 2, active: false }, { id: 3, active: true }];
* const activeUsers = await filterAsync(users, async (user) => {
*   return await checkUserStatus(user.id);
* });
* // Returns: [{ id: 1, active: true }, { id: 3, active: true }]
*
* @example
* // With concurrency limit
* const numbers = [1, 2, 3, 4, 5];
* const evenNumbers = await filterAsync(
*   numbers,
*   async (n) => await isEvenAsync(n),
*   { concurrency: 2 }
* );
* // Processes at most 2 operations concurrently
*/
async function filterAsync(array, predicate, options) {
	if (options?.concurrency != null) predicate = require_limitAsync.limitAsync(predicate, options.concurrency);
	const results = await Promise.all(array.map(predicate));
	return array.filter((_, index) => results[index]);
}
//#endregion
exports.filterAsync = filterAsync;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/flatMap.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/flatMap.js ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_flatten = __webpack_require__(/*! ./flatten.js */ "../../node_modules/es-toolkit/dist/array/flatten.js");
//#region src/array/flatMap.ts
/**
* Maps each element in the array using the iteratee function and flattens the result up to the specified depth.
*
* @template T - The type of elements within the array.
* @template U - The type of elements within the returned array from the iteratee function.
* @template D - The depth to which the array should be flattened.
* @param arr - The array to flatten.
* @param iteratee - The function that produces the new array elements. It receives the element, its index, and the array.
* @param depth - The depth level specifying how deep a nested array structure should be flattened. Defaults to 1.
* @returns The new array with the mapped and flattened elements.
*
* @example
* const arr = [1, 2, 3];
*
* flatMap(arr, (item: number) => [item, item]);
* // [1, 1, 2, 2, 3, 3]
*
* flatMap(arr, (item: number) => [[item, item]], 2);
* // [1, 1, 2, 2, 3, 3]
*/
function flatMap(arr, iteratee, depth = 1) {
	return require_flatten.flatten(arr.map((item, index) => iteratee(item, index, arr)), depth);
}
//#endregion
exports.flatMap = flatMap;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/flatMapAsync.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/flatMapAsync.js ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_limitAsync = __webpack_require__(/*! ./limitAsync.js */ "../../node_modules/es-toolkit/dist/array/limitAsync.js");
const require_flatten = __webpack_require__(/*! ./flatten.js */ "../../node_modules/es-toolkit/dist/array/flatten.js");
//#region src/array/flatMapAsync.ts
/**
* Maps each element in an array using an async callback function and flattens the result by one level.
*
* This is equivalent to calling `mapAsync` followed by `flat(1)`, but more efficient.
* Each callback should return an array, and all returned arrays are concatenated into
* a single output array.
*
* @template T - The type of elements in the input array.
* @template R - The type of elements in the arrays returned by the callback.
* @param array The array to transform.
* @param callback An async function that transforms each element into an array.
* @param [options] Optional configuration object.
* @param [options.concurrency] Maximum number of concurrent async operations. If not specified, all operations run concurrently.
* @returns A promise that resolves to a flattened array of transformed values.
* @example
* const users = [{ id: 1 }, { id: 2 }];
* const allPosts = await flatMapAsync(users, async (user) => {
*   return await fetchUserPosts(user.id);
* });
* // Returns: [post1, post2, post3, ...] (all posts from all users)
*
* @example
* // With concurrency limit
* const numbers = [1, 2, 3];
* const results = await flatMapAsync(
*   numbers,
*   async (n) => await fetchRelatedItems(n),
*   { concurrency: 2 }
* );
* // Processes at most 2 operations concurrently
*/
async function flatMapAsync(array, callback, options) {
	if (options?.concurrency != null) callback = require_limitAsync.limitAsync(callback, options.concurrency);
	const results = await Promise.all(array.map(callback));
	return require_flatten.flatten(results);
}
//#endregion
exports.flatMapAsync = flatMapAsync;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/flatMapDeep.js"
/*!***************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/flatMapDeep.js ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_flattenDeep = __webpack_require__(/*! ./flattenDeep.js */ "../../node_modules/es-toolkit/dist/array/flattenDeep.js");
//#region src/array/flatMapDeep.ts
/**
* Recursively maps each element in an array using a provided iteratee function and then deeply flattens the resulting array.
*
* @template T - The type of elements within the array.
* @template U - The type of elements within the returned array from the iteratee function.
* @param arr - The array to flatten.
* @param iteratee - The function that produces the new array elements. It receives the element, its index, and the array.
* @returns A new array that has been flattened.
*
* @example
* const result = flatMapDeep([1, 2, 3], n => [[n, n]]);
* // [1, 1, 2, 2, 3, 3]
*/
function flatMapDeep(arr, iteratee) {
	return require_flattenDeep.flattenDeep(arr.map((item, index) => iteratee(item, index, arr)));
}
//#endregion
exports.flatMapDeep = flatMapDeep;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/flatten.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/flatten.js ***!
  \***********************************************************/
(__unused_webpack_module, exports) {

//#region src/array/flatten.ts
/**
* Flattens an array up to the specified depth.
*
* @template T - The type of elements within the array.
* @template D - The depth to which the array should be flattened.
* @param arr - The array to flatten.
* @param depth - The depth level specifying how deep a nested array structure should be flattened. Defaults to 1.
* @returns A new array that has been flattened.
*
* @example
* const arr = flatten([1, [2, 3], [4, [5, 6]]], 1);
* // Returns: [1, 2, 3, 4, [5, 6]]
*
* const arr = flatten([1, [2, 3], [4, [5, 6]]], 2);
* // Returns: [1, 2, 3, 4, 5, 6]
*/
function flatten(arr, depth = 1) {
	const result = [];
	const flooredDepth = Math.floor(depth);
	const recursive = (arr, currentDepth) => {
		for (let i = 0; i < arr.length; i++) {
			const item = arr[i];
			if (Array.isArray(item) && currentDepth < flooredDepth) recursive(item, currentDepth + 1);
			else result.push(item);
		}
	};
	recursive(arr, 0);
	return result;
}
//#endregion
exports.flatten = flatten;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/flattenDeep.js"
/*!***************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/flattenDeep.js ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_flatten = __webpack_require__(/*! ./flatten.js */ "../../node_modules/es-toolkit/dist/array/flatten.js");
//#region src/array/flattenDeep.ts
/**
* Flattens all depths of a nested array.
*
* @template T - The type of elements within the array.
* @param arr - The array to flatten.
* @returns A new array that has been flattened.
*
* @example
* const arr = flattenDeep([1, [2, [3]], [4, [5, 6]]]);
* // Returns: [1, 2, 3, 4, 5, 6]
*/
function flattenDeep(arr) {
	return require_flatten.flatten(arr, Infinity);
}
//#endregion
exports.flattenDeep = flattenDeep;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/forEachAsync.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/forEachAsync.js ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_limitAsync = __webpack_require__(/*! ./limitAsync.js */ "../../node_modules/es-toolkit/dist/array/limitAsync.js");
//#region src/array/forEachAsync.ts
/**
* Executes an async callback function for each element in an array.
*
* Unlike the native `forEach`, this function returns a promise that resolves
* when all async operations complete. It supports optional concurrency limiting.
*
* @template T - The type of elements in the array.
* @param array The array to iterate over.
* @param callback An async function to execute for each element.
* @param [options] Optional configuration object.
* @param [options.concurrency] Maximum number of concurrent async operations. If not specified, all operations run concurrently.
* @returns A promise that resolves when all operations complete.
* @example
* const users = [{ id: 1 }, { id: 2 }, { id: 3 }];
* await forEachAsync(users, async (user) => {
*   await updateUser(user.id);
* });
* // All users have been updated
*
* @example
* // With concurrency limit
* const items = [1, 2, 3, 4, 5];
* await forEachAsync(
*   items,
*   async (item) => await processItem(item),
*   { concurrency: 2 }
* );
* // Processes at most 2 items concurrently
*/
async function forEachAsync(array, callback, options) {
	if (options?.concurrency != null) callback = require_limitAsync.limitAsync(callback, options.concurrency);
	await Promise.all(array.map(callback));
}
//#endregion
exports.forEachAsync = forEachAsync;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/forEachRight.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/forEachRight.js ***!
  \****************************************************************/
(__unused_webpack_module, exports) {

//#region src/array/forEachRight.ts
/**
* Iterates over elements of 'arr' from right to left and invokes 'callback' for each element.
*
* @template T - The type of elements in the array.
* @param arr - The array to iterate over.
* @param callback - The function invoked per iteration.
* The callback function receives three arguments:
*  - 'value': The current element being processed in the array.
*  - 'index': The index of the current element being processed in the array.
*  - 'arr': The array 'forEachRight' was called upon.
*
* @example
* const array = [1, 2, 3];
* const result: number[] = [];
*
* // Use the forEachRight function to iterate through the array and add each element to the result array.
* forEachRight(array, (value) => {
*  result.push(value);
* })
*
* console.log(result) // Output: [3, 2, 1]
*/
function forEachRight(arr, callback) {
	for (let i = arr.length - 1; i >= 0; i--) {
		const element = arr[i];
		callback(element, i, arr);
	}
}
//#endregion
exports.forEachRight = forEachRight;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/groupBy.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/groupBy.js ***!
  \***********************************************************/
(__unused_webpack_module, exports) {

//#region src/array/groupBy.ts
/**
* Groups the elements of an array based on a provided key-generating function.
*
* This function takes an array and a function that generates a key from each element. It returns
* an object where the keys are the generated keys and the values are arrays of elements that share
* the same key.
*
* @template T - The type of elements in the array.
* @template K - The type of keys.
* @param arr - The array to group.
* @param getKeyFromItem - A function that generates a key from an element, its index, and the array.
* @returns An object where each key is associated with an array of elements that
* share that key.
*
* @example
* const array = [
*   { category: 'fruit', name: 'apple' },
*   { category: 'fruit', name: 'banana' },
*   { category: 'vegetable', name: 'carrot' }
* ];
* const result = groupBy(array, item => item.category);
* // result will be:
* // {
* //   fruit: [
* //     { category: 'fruit', name: 'apple' },
* //     { category: 'fruit', name: 'banana' }
* //   ],
* //   vegetable: [
* //     { category: 'vegetable', name: 'carrot' }
* //   ]
* // }
*
* @example
* // Using index parameter
* const items = ['a', 'b', 'c', 'd'];
* const result = groupBy(items, (item, index) => index % 2 === 0 ? 'even' : 'odd');
* // result will be: { even: ['a', 'c'], odd: ['b', 'd'] }
*/
function groupBy(arr, getKeyFromItem) {
	const result = {};
	for (let i = 0; i < arr.length; i++) {
		const item = arr[i];
		const key = getKeyFromItem(item, i, arr);
		if (!Object.hasOwn(result, key)) result[key] = [];
		result[key].push(item);
	}
	return result;
}
//#endregion
exports.groupBy = groupBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/head.js"
/*!********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/head.js ***!
  \********************************************************/
(__unused_webpack_module, exports) {

//#region src/array/head.ts
/**
* Returns the first element of an array or `undefined` if the array is empty.
*
* This function takes an array and returns the first element of the array.
* If the array is empty, the function returns `undefined`.
*
* @template T - The type of elements in the array.
* @param arr - The array from which to get the first element.
* @returns The first element of the array, or `undefined` if the array is empty.
*
* @example
* const emptyArr: number[] = [];
* const noElement = head(emptyArr);
* // noElement will be undefined
*/
function head(arr) {
	return arr[0];
}
//#endregion
exports.head = head;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/index.js"
/*!*********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/index.js ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_at = __webpack_require__(/*! ./at.js */ "../../node_modules/es-toolkit/dist/array/at.js");
const require_cartesianProduct = __webpack_require__(/*! ./cartesianProduct.js */ "../../node_modules/es-toolkit/dist/array/cartesianProduct.js");
const require_chunk = __webpack_require__(/*! ./chunk.js */ "../../node_modules/es-toolkit/dist/array/chunk.js");
const require_combinations = __webpack_require__(/*! ./combinations.js */ "../../node_modules/es-toolkit/dist/array/combinations.js");
const require_compact = __webpack_require__(/*! ./compact.js */ "../../node_modules/es-toolkit/dist/array/compact.js");
const require_countBy = __webpack_require__(/*! ./countBy.js */ "../../node_modules/es-toolkit/dist/array/countBy.js");
const require_difference = __webpack_require__(/*! ./difference.js */ "../../node_modules/es-toolkit/dist/array/difference.js");
const require_differenceBy = __webpack_require__(/*! ./differenceBy.js */ "../../node_modules/es-toolkit/dist/array/differenceBy.js");
const require_differenceWith = __webpack_require__(/*! ./differenceWith.js */ "../../node_modules/es-toolkit/dist/array/differenceWith.js");
const require_drop = __webpack_require__(/*! ./drop.js */ "../../node_modules/es-toolkit/dist/array/drop.js");
const require_dropRight = __webpack_require__(/*! ./dropRight.js */ "../../node_modules/es-toolkit/dist/array/dropRight.js");
const require_dropRightWhile = __webpack_require__(/*! ./dropRightWhile.js */ "../../node_modules/es-toolkit/dist/array/dropRightWhile.js");
const require_dropWhile = __webpack_require__(/*! ./dropWhile.js */ "../../node_modules/es-toolkit/dist/array/dropWhile.js");
const require_fill = __webpack_require__(/*! ./fill.js */ "../../node_modules/es-toolkit/dist/array/fill.js");
const require_limitAsync = __webpack_require__(/*! ./limitAsync.js */ "../../node_modules/es-toolkit/dist/array/limitAsync.js");
const require_filterAsync = __webpack_require__(/*! ./filterAsync.js */ "../../node_modules/es-toolkit/dist/array/filterAsync.js");
const require_flatten = __webpack_require__(/*! ./flatten.js */ "../../node_modules/es-toolkit/dist/array/flatten.js");
const require_flatMap = __webpack_require__(/*! ./flatMap.js */ "../../node_modules/es-toolkit/dist/array/flatMap.js");
const require_flatMapAsync = __webpack_require__(/*! ./flatMapAsync.js */ "../../node_modules/es-toolkit/dist/array/flatMapAsync.js");
const require_flattenDeep = __webpack_require__(/*! ./flattenDeep.js */ "../../node_modules/es-toolkit/dist/array/flattenDeep.js");
const require_flatMapDeep = __webpack_require__(/*! ./flatMapDeep.js */ "../../node_modules/es-toolkit/dist/array/flatMapDeep.js");
const require_forEachAsync = __webpack_require__(/*! ./forEachAsync.js */ "../../node_modules/es-toolkit/dist/array/forEachAsync.js");
const require_forEachRight = __webpack_require__(/*! ./forEachRight.js */ "../../node_modules/es-toolkit/dist/array/forEachRight.js");
const require_groupBy = __webpack_require__(/*! ./groupBy.js */ "../../node_modules/es-toolkit/dist/array/groupBy.js");
const require_head = __webpack_require__(/*! ./head.js */ "../../node_modules/es-toolkit/dist/array/head.js");
const require_initial = __webpack_require__(/*! ./initial.js */ "../../node_modules/es-toolkit/dist/array/initial.js");
const require_intersection = __webpack_require__(/*! ./intersection.js */ "../../node_modules/es-toolkit/dist/array/intersection.js");
const require_intersectionBy = __webpack_require__(/*! ./intersectionBy.js */ "../../node_modules/es-toolkit/dist/array/intersectionBy.js");
const require_intersectionWith = __webpack_require__(/*! ./intersectionWith.js */ "../../node_modules/es-toolkit/dist/array/intersectionWith.js");
const require_isSubset = __webpack_require__(/*! ./isSubset.js */ "../../node_modules/es-toolkit/dist/array/isSubset.js");
const require_isSubsetWith = __webpack_require__(/*! ./isSubsetWith.js */ "../../node_modules/es-toolkit/dist/array/isSubsetWith.js");
const require_keyBy = __webpack_require__(/*! ./keyBy.js */ "../../node_modules/es-toolkit/dist/array/keyBy.js");
const require_last = __webpack_require__(/*! ./last.js */ "../../node_modules/es-toolkit/dist/array/last.js");
const require_mapAsync = __webpack_require__(/*! ./mapAsync.js */ "../../node_modules/es-toolkit/dist/array/mapAsync.js");
const require_maxBy = __webpack_require__(/*! ./maxBy.js */ "../../node_modules/es-toolkit/dist/array/maxBy.js");
const require_minBy = __webpack_require__(/*! ./minBy.js */ "../../node_modules/es-toolkit/dist/array/minBy.js");
const require_orderBy = __webpack_require__(/*! ./orderBy.js */ "../../node_modules/es-toolkit/dist/array/orderBy.js");
const require_partition = __webpack_require__(/*! ./partition.js */ "../../node_modules/es-toolkit/dist/array/partition.js");
const require_pull = __webpack_require__(/*! ./pull.js */ "../../node_modules/es-toolkit/dist/array/pull.js");
const require_pullAt = __webpack_require__(/*! ./pullAt.js */ "../../node_modules/es-toolkit/dist/array/pullAt.js");
const require_reduceAsync = __webpack_require__(/*! ./reduceAsync.js */ "../../node_modules/es-toolkit/dist/array/reduceAsync.js");
const require_remove = __webpack_require__(/*! ./remove.js */ "../../node_modules/es-toolkit/dist/array/remove.js");
const require_sample = __webpack_require__(/*! ./sample.js */ "../../node_modules/es-toolkit/dist/array/sample.js");
const require_sampleSize = __webpack_require__(/*! ./sampleSize.js */ "../../node_modules/es-toolkit/dist/array/sampleSize.js");
const require_shuffle = __webpack_require__(/*! ./shuffle.js */ "../../node_modules/es-toolkit/dist/array/shuffle.js");
const require_sortBy = __webpack_require__(/*! ./sortBy.js */ "../../node_modules/es-toolkit/dist/array/sortBy.js");
const require_tail = __webpack_require__(/*! ./tail.js */ "../../node_modules/es-toolkit/dist/array/tail.js");
const require_take = __webpack_require__(/*! ./take.js */ "../../node_modules/es-toolkit/dist/array/take.js");
const require_takeRight = __webpack_require__(/*! ./takeRight.js */ "../../node_modules/es-toolkit/dist/array/takeRight.js");
const require_takeRightWhile = __webpack_require__(/*! ./takeRightWhile.js */ "../../node_modules/es-toolkit/dist/array/takeRightWhile.js");
const require_takeWhile = __webpack_require__(/*! ./takeWhile.js */ "../../node_modules/es-toolkit/dist/array/takeWhile.js");
const require_toFilled = __webpack_require__(/*! ./toFilled.js */ "../../node_modules/es-toolkit/dist/array/toFilled.js");
const require_uniq = __webpack_require__(/*! ./uniq.js */ "../../node_modules/es-toolkit/dist/array/uniq.js");
const require_union = __webpack_require__(/*! ./union.js */ "../../node_modules/es-toolkit/dist/array/union.js");
const require_uniqBy = __webpack_require__(/*! ./uniqBy.js */ "../../node_modules/es-toolkit/dist/array/uniqBy.js");
const require_unionBy = __webpack_require__(/*! ./unionBy.js */ "../../node_modules/es-toolkit/dist/array/unionBy.js");
const require_uniqWith = __webpack_require__(/*! ./uniqWith.js */ "../../node_modules/es-toolkit/dist/array/uniqWith.js");
const require_unionWith = __webpack_require__(/*! ./unionWith.js */ "../../node_modules/es-toolkit/dist/array/unionWith.js");
const require_unzip = __webpack_require__(/*! ./unzip.js */ "../../node_modules/es-toolkit/dist/array/unzip.js");
const require_unzipWith = __webpack_require__(/*! ./unzipWith.js */ "../../node_modules/es-toolkit/dist/array/unzipWith.js");
const require_windowed = __webpack_require__(/*! ./windowed.js */ "../../node_modules/es-toolkit/dist/array/windowed.js");
const require_without = __webpack_require__(/*! ./without.js */ "../../node_modules/es-toolkit/dist/array/without.js");
const require_xor = __webpack_require__(/*! ./xor.js */ "../../node_modules/es-toolkit/dist/array/xor.js");
const require_xorBy = __webpack_require__(/*! ./xorBy.js */ "../../node_modules/es-toolkit/dist/array/xorBy.js");
const require_xorWith = __webpack_require__(/*! ./xorWith.js */ "../../node_modules/es-toolkit/dist/array/xorWith.js");
const require_zip = __webpack_require__(/*! ./zip.js */ "../../node_modules/es-toolkit/dist/array/zip.js");
const require_zipObject = __webpack_require__(/*! ./zipObject.js */ "../../node_modules/es-toolkit/dist/array/zipObject.js");
const require_zipWith = __webpack_require__(/*! ./zipWith.js */ "../../node_modules/es-toolkit/dist/array/zipWith.js");
exports.at = require_at.at;
exports.cartesianProduct = require_cartesianProduct.cartesianProduct;
exports.chunk = require_chunk.chunk;
exports.combinations = require_combinations.combinations;
exports.compact = require_compact.compact;
exports.countBy = require_countBy.countBy;
exports.difference = require_difference.difference;
exports.differenceBy = require_differenceBy.differenceBy;
exports.differenceWith = require_differenceWith.differenceWith;
exports.drop = require_drop.drop;
exports.dropRight = require_dropRight.dropRight;
exports.dropRightWhile = require_dropRightWhile.dropRightWhile;
exports.dropWhile = require_dropWhile.dropWhile;
exports.fill = require_fill.fill;
exports.filterAsync = require_filterAsync.filterAsync;
exports.flatMap = require_flatMap.flatMap;
exports.flatMapAsync = require_flatMapAsync.flatMapAsync;
exports.flatMapDeep = require_flatMapDeep.flatMapDeep;
exports.flatten = require_flatten.flatten;
exports.flattenDeep = require_flattenDeep.flattenDeep;
exports.forEachAsync = require_forEachAsync.forEachAsync;
exports.forEachRight = require_forEachRight.forEachRight;
exports.groupBy = require_groupBy.groupBy;
exports.head = require_head.head;
exports.initial = require_initial.initial;
exports.intersection = require_intersection.intersection;
exports.intersectionBy = require_intersectionBy.intersectionBy;
exports.intersectionWith = require_intersectionWith.intersectionWith;
exports.isSubset = require_isSubset.isSubset;
exports.isSubsetWith = require_isSubsetWith.isSubsetWith;
exports.keyBy = require_keyBy.keyBy;
exports.last = require_last.last;
exports.limitAsync = require_limitAsync.limitAsync;
exports.mapAsync = require_mapAsync.mapAsync;
exports.maxBy = require_maxBy.maxBy;
exports.minBy = require_minBy.minBy;
exports.orderBy = require_orderBy.orderBy;
exports.partition = require_partition.partition;
exports.pull = require_pull.pull;
exports.pullAt = require_pullAt.pullAt;
exports.reduceAsync = require_reduceAsync.reduceAsync;
exports.remove = require_remove.remove;
exports.sample = require_sample.sample;
exports.sampleSize = require_sampleSize.sampleSize;
exports.shuffle = require_shuffle.shuffle;
exports.sortBy = require_sortBy.sortBy;
exports.tail = require_tail.tail;
exports.take = require_take.take;
exports.takeRight = require_takeRight.takeRight;
exports.takeRightWhile = require_takeRightWhile.takeRightWhile;
exports.takeWhile = require_takeWhile.takeWhile;
exports.toFilled = require_toFilled.toFilled;
exports.union = require_union.union;
exports.unionBy = require_unionBy.unionBy;
exports.unionWith = require_unionWith.unionWith;
exports.uniq = require_uniq.uniq;
exports.uniqBy = require_uniqBy.uniqBy;
exports.uniqWith = require_uniqWith.uniqWith;
exports.unzip = require_unzip.unzip;
exports.unzipWith = require_unzipWith.unzipWith;
exports.windowed = require_windowed.windowed;
exports.without = require_without.without;
exports.xor = require_xor.xor;
exports.xorBy = require_xorBy.xorBy;
exports.xorWith = require_xorWith.xorWith;
exports.zip = require_zip.zip;
exports.zipObject = require_zipObject.zipObject;
exports.zipWith = require_zipWith.zipWith;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/initial.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/initial.js ***!
  \***********************************************************/
(__unused_webpack_module, exports) {

//#region src/array/initial.ts
/**
* Returns a new array containing all elements except the last one from the input array.
* If the input array is empty or has only one element, the function returns an empty array.
*
* @template T The type of elements in the array.
* @param arr - The input array.
* @returns A new array containing all but the last element of the input array.
*
* @example
* const arr = [1, 2, 3, 4];
* const result = initial(arr);
* // result will be [1, 2, 3]
*/
function initial(arr) {
	return arr.slice(0, -1);
}
//#endregion
exports.initial = initial;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/intersection.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/intersection.js ***!
  \****************************************************************/
(__unused_webpack_module, exports) {

//#region src/array/intersection.ts
/**
* Returns the intersection of two arrays.
*
* This function takes two arrays and returns a new array containing the elements that are
* present in both arrays. It effectively filters out any elements from the first array that
* are not found in the second array.
*
* @template T - The type of elements in the array.
* @param firstArr - The first array to compare.
* @param secondArr - The second array to compare.
* @returns A new array containing the elements that are present in both arrays.
*
* @example
* const array1 = [1, 2, 3, 4, 5];
* const array2 = [3, 4, 5, 6, 7];
* const result = intersection(array1, array2);
* // result will be [3, 4, 5] since these elements are in both arrays.
*/
function intersection(firstArr, secondArr) {
	const secondSet = new Set(secondArr);
	return firstArr.filter((item) => secondSet.has(item));
}
//#endregion
exports.intersection = intersection;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/intersectionBy.js"
/*!******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/intersectionBy.js ***!
  \******************************************************************/
(__unused_webpack_module, exports) {

//#region src/array/intersectionBy.ts
/**
* Returns the intersection of two arrays based on a mapping function.
*
* This function takes two arrays and a mapping function. It returns a new array containing
* the elements from the first array that, when mapped using the provided function, have matching
* mapped elements in the second array. It effectively filters out any elements from the first array
* that do not have corresponding mapped values in the second array.
*
* @template T - The type of elements in the first array.
* @template U - The type of elements in the second array.
* @param firstArr - The first array to compare.
* @param secondArr - The second array to compare.
* @param mapper - A function to map the elements of both arrays for comparison.
* @returns A new array containing the elements from the first array that have corresponding mapped values in the second array.
*
* @example
* const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
* const array2 = [{ id: 2 }, { id: 4 }];
* const mapper = item => item.id;
* const result = intersectionBy(array1, array2, mapper);
* // result will be [{ id: 2 }] since only this element has a matching id in both arrays.
*
* @example
* const array1 = [
*   { id: 1, name: 'jane' },
*   { id: 2, name: 'amy' },
*   { id: 3, name: 'michael' },
* ];
* const array2 = [2, 4];
* const mapper = item => (typeof item === 'object' ? item.id : item);
* const result = intersectionBy(array1, array2, mapper);
* // result will be [{ id: 2, name: 'amy' }] since only this element has a matching id that is equal to seconds array's element.
*/
function intersectionBy(firstArr, secondArr, mapper) {
	const result = [];
	const mappedSecondSet = new Set(secondArr.map(mapper));
	for (let i = 0; i < firstArr.length; i++) {
		const item = firstArr[i];
		const mappedItem = mapper(item);
		if (mappedSecondSet.has(mappedItem)) {
			result.push(item);
			mappedSecondSet.delete(mappedItem);
		}
	}
	return result;
}
//#endregion
exports.intersectionBy = intersectionBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/intersectionWith.js"
/*!********************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/intersectionWith.js ***!
  \********************************************************************/
(__unused_webpack_module, exports) {

//#region src/array/intersectionWith.ts
/**
* Returns the intersection of two arrays based on a custom equality function.
*
* This function takes two arrays and a custom equality function. It returns a new array containing
* the elements from the first array that have matching elements in the second array, as determined
* by the custom equality function. It effectively filters out any elements from the first array that
* do not have corresponding matches in the second array according to the equality function.
*
* @template T - The type of elements in the first array.
* @template U - The type of elements in the second array.
* @param firstArr - The first array to compare.
* @param secondArr - The second array to compare.
* @param areItemsEqual - A custom function to determine if two elements are equal.
* This function takes two arguments, one from each array, and returns `true` if the elements are considered equal, and `false` otherwise.
* @returns A new array containing the elements from the first array that have corresponding matches in the second array according to the custom equality function.
*
* @example
* const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
* const array2 = [{ id: 2 }, { id: 4 }];
* const areItemsEqual = (a, b) => a.id === b.id;
* const result = intersectionWith(array1, array2, areItemsEqual);
* // result will be [{ id: 2 }] since this element has a matching id in both arrays.
*
* @example
* const array1 = [
*   { id: 1, name: 'jane' },
*   { id: 2, name: 'amy' },
*   { id: 3, name: 'michael' },
* ];
* const array2 = [2, 4];
* const areItemsEqual = (a, b) => a.id === b;
* const result = intersectionWith(array1, array2, areItemsEqual);
* // result will be [{ id: 2, name: 'amy' }] since this element has a matching id that is equal to seconds array's element.
*/
function intersectionWith(firstArr, secondArr, areItemsEqual) {
	return firstArr.filter((firstItem) => {
		return secondArr.some((secondItem) => {
			return areItemsEqual(firstItem, secondItem);
		});
	});
}
//#endregion
exports.intersectionWith = intersectionWith;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/isSubset.js"
/*!************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/isSubset.js ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_difference = __webpack_require__(/*! ./difference.js */ "../../node_modules/es-toolkit/dist/array/difference.js");
//#region src/array/isSubset.ts
/**
* Checks if the `subset` array is entirely contained within the `superset` array.
*
*
* @template T - The type of elements contained in the arrays.
* @param superset - The array that may contain all elements of the subset.
* @param subset - The array to check against the superset.
* @returns Returns `true` if all elements of the `subset` are present in the `superset`, otherwise returns `false`.
*
* @example
* ```typescript
* const superset = [1, 2, 3, 4, 5];
* const subset = [2, 3, 4];
* isSubset(superset, subset); // true
* ```
*
* @example
* ```typescript
* const superset = ['a', 'b', 'c'];
* const subset = ['a', 'd'];
* isSubset(superset, subset); // false
* ```
*/
function isSubset(superset, subset) {
	return require_difference.difference(subset, superset).length === 0;
}
//#endregion
exports.isSubset = isSubset;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/isSubsetWith.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/isSubsetWith.js ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_differenceWith = __webpack_require__(/*! ./differenceWith.js */ "../../node_modules/es-toolkit/dist/array/differenceWith.js");
//#region src/array/isSubsetWith.ts
/**
* Checks if the `subset` array is entirely contained within the `superset` array based on a custom equality function.
*
* This function takes two arrays and a custom comparison function. It returns a boolean indicating
* whether all elements in the subset array are present in the superset array, as determined by the provided
* custom equality function.
*
* @template T - The type of elements contained in the arrays.
* @param superset - The array that may contain all elements of the subset.
* @param subset - The array to check against the superset.
* @param areItemsEqual - A function to determine if two items are equal.
* @returns Returns `true` if all elements of the subset are present in the superset
* according to the custom equality function, otherwise returns `false`.
*
* @example
* ```typescript
* const superset = [{ id: 1 }, { id: 2 }, { id: 3 }];
* const subset = [{ id: 2 }, { id: 1 }];
* const areItemsEqual = (a, b) => a.id === b.id;
* isSubsetWith(superset, subset, areItemsEqual); // true
* ```
*
* @example
* ```typescript
* const superset = [{ id: 1 }, { id: 2 }, { id: 3 }];
* const subset = [{ id: 4 }];
* const areItemsEqual = (a, b) => a.id === b.id;
* isSubsetWith(superset, subset, areItemsEqual); // false
* ```
*/
function isSubsetWith(superset, subset, areItemsEqual) {
	return require_differenceWith.differenceWith(subset, superset, areItemsEqual).length === 0;
}
//#endregion
exports.isSubsetWith = isSubsetWith;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/keyBy.js"
/*!*********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/keyBy.js ***!
  \*********************************************************/
(__unused_webpack_module, exports) {

//#region src/array/keyBy.ts
/**
* Maps each element of an array based on a provided key-generating function.
*
* This function takes an array and a function that generates a key from each element. It returns
* an object where the keys are the generated keys and the values are the corresponding elements.
* If there are multiple elements generating the same key, the last element among them is used
* as the value.
*
* @template T - The type of elements in the array.
* @template K - The type of keys.
* @param arr - The array of elements to be mapped.
* @param getKeyFromItem - A function that generates a key from an element, its index, and the array.
* @returns An object where keys are mapped to each element of an array.
*
* @example
* const array = [
*   { category: 'fruit', name: 'apple' },
*   { category: 'fruit', name: 'banana' },
*   { category: 'vegetable', name: 'carrot' }
* ];
* const result = keyBy(array, item => item.category);
* // result will be:
* // {
* //   fruit: { category: 'fruit', name: 'banana' },
* //   vegetable: { category: 'vegetable', name: 'carrot' }
* // }
*
* @example
* // Using index parameter
* const items = ['a', 'b', 'c'];
* const result = keyBy(items, (item, index) => index);
* // result will be: { 0: 'a', 1: 'b', 2: 'c' }
*/
function keyBy(arr, getKeyFromItem) {
	const result = {};
	for (let i = 0; i < arr.length; i++) {
		const item = arr[i];
		const key = getKeyFromItem(item, i, arr);
		result[key] = item;
	}
	return result;
}
//#endregion
exports.keyBy = keyBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/last.js"
/*!********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/last.js ***!
  \********************************************************/
(__unused_webpack_module, exports) {

//#region src/array/last.ts
/**
* Returns the last element of an array.
*
* This function takes an array and returns the last element of the array.
* If the array is empty, the function returns `undefined`.
*
* Unlike some implementations, this function is optimized for performance
* by directly accessing the last index of the array.
*
* @template T - The type of elements in the array.
* @param arr - The array from which to get the last element.
* @returns The last element of the array, or `undefined` if the array is empty.
*
* @example
* const arr = [1, 2, 3];
* const lastElement = last(arr);
* // lastElement will be 3
*
* const emptyArr: number[] = [];
* const noElement = last(emptyArr);
* // noElement will be undefined
*/
function last(arr) {
	return arr[arr.length - 1];
}
//#endregion
exports.last = last;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/limitAsync.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/limitAsync.js ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_semaphore = __webpack_require__(/*! ../promise/semaphore.js */ "../../node_modules/es-toolkit/dist/promise/semaphore.js");
//#region src/array/limitAsync.ts
/**
* Wraps an async function to limit the number of concurrent executions.
*
* This function creates a wrapper around an async callback that ensures at most
* `concurrency` number of executions can run simultaneously. Additional calls will
* wait until a slot becomes available.
*
* @template F - The type of the async function to wrap.
* @param callback The async function to wrap with concurrency control.
* @param concurrency Maximum number of concurrent executions allowed.
* @returns A wrapped version of the callback with concurrency limiting.
* @example
* const limitedFetch = limitAsync(async (url) => {
*   return await fetch(url);
* }, 3);
*
* // Only 3 fetches will run concurrently
* const urls = ['url1', 'url2', 'url3', 'url4', 'url5'];
* await Promise.all(urls.map(url => limitedFetch(url)));
*
* @example
* const processItem = async (item) => {
*   // Expensive async operation
*   return await heavyComputation(item);
* };
*
* const limitedProcess = limitAsync(processItem, 2);
* const items = [1, 2, 3, 4, 5];
* // At most 2 items will be processed concurrently
* await Promise.all(items.map(item => limitedProcess(item)));
*/
function limitAsync(callback, concurrency) {
	const semaphore = new require_semaphore.Semaphore(concurrency);
	return async function(...args) {
		try {
			await semaphore.acquire();
			return await callback.apply(this, args);
		} finally {
			semaphore.release();
		}
	};
}
//#endregion
exports.limitAsync = limitAsync;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/mapAsync.js"
/*!************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/mapAsync.js ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_limitAsync = __webpack_require__(/*! ./limitAsync.js */ "../../node_modules/es-toolkit/dist/array/limitAsync.js");
//#region src/array/mapAsync.ts
/**
* Transforms each element in an array using an async callback function and returns
* a promise that resolves to an array of transformed values.
*
* @template T - The type of elements in the input array.
* @template R - The type of elements in the output array.
* @param array The array to transform.
* @param callback An async function that transforms each element.
* @param [options] Optional configuration object.
* @param [options.concurrency] Maximum number of concurrent async operations. If not specified, all operations run concurrently.
* @returns A promise that resolves to an array of transformed values.
* @example
* const users = [{ id: 1 }, { id: 2 }, { id: 3 }];
* const userDetails = await mapAsync(users, async (user) => {
*   return await fetchUserDetails(user.id);
* });
* // Returns: [{ id: 1, name: '...' }, { id: 2, name: '...' }, { id: 3, name: '...' }]
*
* @example
* // With concurrency limit
* const numbers = [1, 2, 3, 4, 5];
* const results = await mapAsync(
*   numbers,
*   async (n) => await slowOperation(n),
*   { concurrency: 2 }
* );
* // Processes at most 2 operations concurrently
*/
function mapAsync(array, callback, options) {
	if (options?.concurrency != null) callback = require_limitAsync.limitAsync(callback, options.concurrency);
	return Promise.all(array.map(callback));
}
//#endregion
exports.mapAsync = mapAsync;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/maxBy.js"
/*!*********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/maxBy.js ***!
  \*********************************************************/
(__unused_webpack_module, exports) {

//#region src/array/maxBy.ts
/**
* Finds the element in an array that has the maximum value when applying
* the `getValue` function to each element.
*
* @template T - The type of elements in the array.
* @param items The array of elements to search.
* @param getValue A function that selects a numeric value from each element.
* @returns The element with the maximum value as determined by the `getValue` function,
* or `undefined` if the array is empty.
* @example
* maxBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // Returns: { a: 3 }
* maxBy([], x => x.a); // Returns: undefined
* maxBy([3, NaN, 1], x => x); // Returns: NaN (NaN propagates, matching Math.max)
* maxBy(
*   [
*     { name: 'john', age: 30 },
*     { name: 'jane', age: 28 },
*     { name: 'joe', age: 26 },
*   ],
*   x => x.age
* ); // Returns: { name: 'john', age: 30 }
*/
function maxBy(items, getValue) {
	if (items.length === 0) return;
	let maxElement = items[0];
	let max = -Infinity;
	for (let i = 0; i < items.length; i++) {
		const element = items[i];
		const value = getValue(element, i, items);
		if (Number.isNaN(value)) return element;
		if (value > max) {
			max = value;
			maxElement = element;
		}
	}
	return maxElement;
}
//#endregion
exports.maxBy = maxBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/minBy.js"
/*!*********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/minBy.js ***!
  \*********************************************************/
(__unused_webpack_module, exports) {

//#region src/array/minBy.ts
/**
* Finds the element in an array that has the minimum value when applying
* the `getValue` function to each element.
*
* @template T - The type of elements in the array.
* @param items The array of elements to search.
* @param getValue A function that selects a numeric value from each element.
* @returns The element with the minimum value as determined by the `getValue` function,
* or `undefined` if the array is empty.
* @example
* minBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // Returns: { a: 1 }
* minBy([], x => x.a); // Returns: undefined
* minBy([3, NaN, 1], x => x); // Returns: NaN (NaN propagates, matching Math.min)
* minBy(
*   [
*     { name: 'john', age: 30 },
*     { name: 'jane', age: 28 },
*     { name: 'joe', age: 26 },
*   ],
*   x => x.age
* ); // Returns: { name: 'joe', age: 26 }
*/
function minBy(items, getValue) {
	if (items.length === 0) return;
	let minElement = items[0];
	let min = Infinity;
	for (let i = 0; i < items.length; i++) {
		const element = items[i];
		const value = getValue(element, i, items);
		if (Number.isNaN(value)) return element;
		if (value < min) {
			min = value;
			minElement = element;
		}
	}
	return minElement;
}
//#endregion
exports.minBy = minBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/orderBy.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/orderBy.js ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_compareValues = __webpack_require__(/*! ../_internal/compareValues.js */ "../../node_modules/es-toolkit/dist/_internal/compareValues.js");
//#region src/array/orderBy.ts
/**
* Sorts an array of objects based on the given `criteria` and their corresponding order directions.
*
* - If you provide keys, it sorts the objects by the values of those keys.
* - If you provide functions, it sorts based on the values returned by those functions.
*
* The function returns the array of objects sorted in corresponding order directions.
* If two objects have the same value for the current criterion, it uses the next criterion to determine their order.
* If the number of orders is less than the number of criteria, it uses the last order for the rest of the criteria.
*
* @template T - The type of elements in the array.
* @param arr - The array of objects to be sorted.
* @param criteria  - The criteria for sorting. This can be an array of object keys or functions that return values used for sorting.
* @param orders - An array of order directions ('asc' for ascending or 'desc' for descending).
* @returns The sorted array.
*
* @example
* // Sort an array of objects by 'user' in ascending order and 'age' in descending order.
* const users = [
*   { user: 'fred', age: 48 },
*   { user: 'barney', age: 34 },
*   { user: 'fred', age: 40 },
*   { user: 'barney', age: 36 },
* ];
*
* const result = orderBy(users, [obj => obj.user, 'age'], ['asc', 'desc']);
* // result will be:
* // [
* //   { user: 'barney', age: 36 },
* //   { user: 'barney', age: 34 },
* //   { user: 'fred', age: 48 },
* //   { user: 'fred', age: 40 },
* // ]
*/
function orderBy(arr, criteria, orders) {
	return arr.slice().sort((a, b) => {
		const ordersLength = orders.length;
		for (let i = 0; i < criteria.length; i++) {
			const order = ordersLength > i ? orders[i] : orders[ordersLength - 1];
			const criterion = criteria[i];
			const criterionIsFunction = typeof criterion === "function";
			const valueA = criterionIsFunction ? criterion(a) : a[criterion];
			const valueB = criterionIsFunction ? criterion(b) : b[criterion];
			const result = require_compareValues.compareValues(valueA, valueB, order);
			if (result !== 0) return result;
		}
		return 0;
	});
}
//#endregion
exports.orderBy = orderBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/partition.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/partition.js ***!
  \*************************************************************/
(__unused_webpack_module, exports) {

//#region src/array/partition.ts
function partition(arr, isInTruthy) {
	const truthy = [];
	const falsy = [];
	for (let i = 0; i < arr.length; i++) {
		const item = arr[i];
		if (isInTruthy(item, i, arr)) truthy.push(item);
		else falsy.push(item);
	}
	return [truthy, falsy];
}
//#endregion
exports.partition = partition;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/pull.js"
/*!********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/pull.js ***!
  \********************************************************/
(__unused_webpack_module, exports) {

//#region src/array/pull.ts
/**
* Removes all specified values from an array.
*
* This function changes `arr` in place.
* If you want to remove values without modifying the original array, use `difference`.
*
* @template T
* @param arr - The array to modify.
* @param valuesToRemove - The values to remove from the array.
* @returns The modified array with the specified values removed.
*
* @example
* const numbers = [1, 2, 3, 4, 5, 2, 4];
* pull(numbers, [2, 4]);
* console.log(numbers); // [1, 3, 5]
*/
function pull(arr, valuesToRemove) {
	const valuesSet = new Set(valuesToRemove);
	let resultIndex = 0;
	for (let i = 0; i < arr.length; i++) {
		if (valuesSet.has(arr[i])) continue;
		if (!Object.hasOwn(arr, i)) {
			delete arr[resultIndex++];
			continue;
		}
		arr[resultIndex++] = arr[i];
	}
	arr.length = resultIndex;
	return arr;
}
//#endregion
exports.pull = pull;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/pullAt.js"
/*!**********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/pullAt.js ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_at = __webpack_require__(/*! ./at.js */ "../../node_modules/es-toolkit/dist/array/at.js");
//#region src/array/pullAt.ts
/**
* Removes elements from an array at specified indices and returns the removed elements.
*
* This function supports negative indices, which count from the end of the array.
*
* @template T
* @param arr - The array from which elements will be removed.
* @param indicesToRemove - An array of indices specifying the positions of elements to remove.
* @returns An array containing the elements that were removed from the original array.
*
* @example
* const numbers = [10, 20, 30, 40, 50];
* const removed = pullAt(numbers, [1, 3, 4]);
* console.log(removed); // [20, 40, 50]
* console.log(numbers); // [10, 30]
*/
function pullAt(arr, indicesToRemove) {
	const removed = require_at.at(arr, indicesToRemove);
	const indices = new Set(indicesToRemove.slice().sort((x, y) => y - x));
	for (const index of indices) arr.splice(index, 1);
	return removed;
}
//#endregion
exports.pullAt = pullAt;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/reduceAsync.js"
/*!***************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/reduceAsync.js ***!
  \***************************************************************/
(__unused_webpack_module, exports) {

//#region src/array/reduceAsync.ts
async function reduceAsync(array, reducer, initialValue) {
	let startIndex = 0;
	if (initialValue == null) {
		initialValue = array[0];
		startIndex = 1;
	}
	let accumulator = initialValue;
	for (let i = startIndex; i < array.length; i++) accumulator = await reducer(accumulator, array[i], i, array);
	return accumulator;
}
//#endregion
exports.reduceAsync = reduceAsync;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/remove.js"
/*!**********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/remove.js ***!
  \**********************************************************/
(__unused_webpack_module, exports) {

//#region src/array/remove.ts
/**
* Removes elements from an array based on a predicate function.
*
* This function changes `arr` in place.
* If you want to remove elements without modifying the original array, use `filter`.
*
* @template T
* @param arr - The array to modify.
* @param shouldRemoveElement - The function invoked per iteration to determine if an element should be removed.
* @returns The modified array with the specified elements removed.
*
* @example
* const numbers = [1, 2, 3, 4, 5];
* remove(numbers, (value) => value % 2 === 0);
* console.log(numbers); // [1, 3, 5]
*/
function remove(arr, shouldRemoveElement) {
	const originalArr = arr.slice();
	const removed = [];
	let resultIndex = 0;
	for (let i = 0; i < arr.length; i++) {
		if (shouldRemoveElement(arr[i], i, originalArr)) {
			removed.push(arr[i]);
			continue;
		}
		if (!Object.hasOwn(arr, i)) {
			delete arr[resultIndex++];
			continue;
		}
		arr[resultIndex++] = arr[i];
	}
	arr.length = resultIndex;
	return removed;
}
//#endregion
exports.remove = remove;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/sample.js"
/*!**********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/sample.js ***!
  \**********************************************************/
(__unused_webpack_module, exports) {

//#region src/array/sample.ts
/**
* Returns a random element from an array.
*
* This function takes an array and returns a single element selected randomly from the array.
*
* @template T - The type of elements in the array.
* @param arr - The array to sample from.
* @returns A random element from the array.
*
* @example
* const array = [1, 2, 3, 4, 5];
* const randomElement = sample(array);
* // randomElement will be one of the elements from the array, selected randomly.
*/
function sample(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}
//#endregion
exports.sample = sample;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/sampleSize.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/sampleSize.js ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_randomInt = __webpack_require__(/*! ../math/randomInt.js */ "../../node_modules/es-toolkit/dist/math/randomInt.js");
//#region src/array/sampleSize.ts
/**
* Returns a sample element array of a specified `size`.
*
* This function takes an array and a number, and returns an array containing the sampled elements using Floyd's algorithm.
*
* {@link https://www.nowherenearithaca.com/2013/05/robert-floyds-tiny-and-beautiful.html Floyd's algorithm}
*
* @template T - The type of elements in the array.
* @param array - The array to sample from.
* @param size - The size of sample.
* @returns A new array with sample size applied.
* @throws {Error} Throws an error if `size` is greater than the length of `array`.
*
* @example
* const result = sampleSize([1, 2, 3], 2)
* // result will be an array containing two of the elements from the array.
* // [1, 2] or [1, 3] or [2, 3]
*/
function sampleSize(array, size) {
	if (size > array.length) throw new Error("Size must be less than or equal to the length of array.");
	const result = new Array(size);
	const selected = /* @__PURE__ */ new Set();
	for (let step = array.length - size, resultIndex = 0; step < array.length; step++, resultIndex++) {
		let index = require_randomInt.randomInt(0, step + 1);
		if (selected.has(index)) index = step;
		selected.add(index);
		result[resultIndex] = array[index];
	}
	return result;
}
//#endregion
exports.sampleSize = sampleSize;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/shuffle.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/shuffle.js ***!
  \***********************************************************/
(__unused_webpack_module, exports) {

//#region src/array/shuffle.ts
/**
* Randomizes the order of elements in an array using the Fisher-Yates algorithm.
*
* This function takes an array and returns a new array with its elements shuffled in a random order.
*
* @template T - The type of elements in the array.
* @param arr - The array to shuffle.
* @returns A new array with its elements shuffled in random order.
*
* @example
* const array = [1, 2, 3, 4, 5];
* const shuffledArray = shuffle(array);
* // shuffledArray will be a new array with elements of array in random order, e.g., [3, 1, 4, 5, 2]
*/
function shuffle(arr) {
	const result = arr.slice();
	/**
	* https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
	*/
	for (let i = result.length - 1; i >= 1; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
}
//#endregion
exports.shuffle = shuffle;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/sortBy.js"
/*!**********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/sortBy.js ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_orderBy = __webpack_require__(/*! ./orderBy.js */ "../../node_modules/es-toolkit/dist/array/orderBy.js");
//#region src/array/sortBy.ts
/**
* Sorts an array of objects based on the given `criteria`.
*
* - If you provide keys, it sorts the objects by the values of those keys.
* - If you provide functions, it sorts based on the values returned by those functions.
*
* The function returns the array of objects sorted in ascending order.
* If two objects have the same value for the current criterion, it uses the next criterion to determine their order.
*
* @template T - The type of the objects in the array.
* @param arr - The array of objects to be sorted.
* @param criteria - The criteria for sorting. This can be an array of object keys or functions that return values used for sorting.
* @returns The sorted array.
*
* @example
* const users = [
*  { user: 'foo', age: 24 },
*  { user: 'bar', age: 7 },
*  { user: 'foo', age: 8 },
*  { user: 'bar', age: 29 },
* ];
*
* sortBy(users, ['user', 'age']);
* sortBy(users, [obj => obj.user, 'age']);
* // results will be:
* // [
* //   { user : 'bar', age: 7 },
* //   { user : 'bar', age: 29 },
* //   { user : 'foo', age: 8 },
* //   { user : 'foo', age: 24 },
* // ]
*/
function sortBy(arr, criteria) {
	return require_orderBy.orderBy(arr, criteria, ["asc"]);
}
//#endregion
exports.sortBy = sortBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/tail.js"
/*!********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/tail.js ***!
  \********************************************************/
(__unused_webpack_module, exports) {

//#region src/array/tail.ts
/**
* Returns a new array with all elements except for the first.
*
* This function takes an array and returns a new array containing all the elements
* except for the first one. If the input array is empty or has only one element,
* an empty array is returned.
*
* @template T - The type of elements in the array.
* @param arr - The array to get the tail of.
* @returns A new array containing all elements of the input array except for the first one.
*
* @example
* const arr1 = [1, 2, 3];
* const result = tail(arr1);
* // result will be [2, 3]
*
* const arr2 = [1];
* const result2 = tail(arr2);
* // result2 will be []
*
* const arr3 = [];
* const result3 = tail(arr3);
* // result3 will be []
*/
function tail(arr) {
	return arr.slice(1);
}
//#endregion
exports.tail = tail;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/take.js"
/*!********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/take.js ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_toInteger = __webpack_require__(/*! ../compat/util/toInteger.js */ "../../node_modules/es-toolkit/dist/compat/util/toInteger.js");
//#region src/array/take.ts
/**
* Returns a new array containing the first `count` elements from the input array `arr`.
* If `count` is greater than the length of `arr`, the entire array is returned.
*
* @template T - Type of elements in the input array.
*
* @param arr - The array to take elements from.
* @param count - The number of elements to take.
* @param guard - If truthy, ignores `count` and defaults to 1.
* @returns A new array containing the first `count` elements from `arr`.
*
* @example
* // Returns [1, 2, 3]
* take([1, 2, 3, 4, 5], 3);
*
* @example
* // Returns ['a', 'b']
* take(['a', 'b', 'c'], 2);
*
* @example
* // Returns [1, 2, 3]
* take([1, 2, 3], 5);
*
* @example
* // Returns [[1], [1], [1]]
* const arr = [1, 2, 3];
* const result = arr.map((v, i, array) => take(array, i, true));
*/
function take(arr, count, guard) {
	count = guard || count === void 0 ? 1 : require_toInteger.toInteger(count);
	return arr.slice(0, count);
}
//#endregion
exports.take = take;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/takeRight.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/takeRight.js ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_toInteger = __webpack_require__(/*! ../compat/util/toInteger.js */ "../../node_modules/es-toolkit/dist/compat/util/toInteger.js");
//#region src/array/takeRight.ts
/**
* Returns a new array containing the last `count` elements from the input array `arr`.
* If `count` is greater than the length of `arr`, the entire array is returned.
*
* @template T - The type of elements in the array.
* @param arr - The array to take elements from.
* @param [count=1] - The number of elements to take.
* @returns A new array containing the last `count` elements from `arr`.
*
* @example
* // Returns [4, 5]
* takeRight([1, 2, 3, 4, 5], 2);
*
* @example
* // Returns ['b', 'c']
* takeRight(['a', 'b', 'c'], 2);
*
* @example
* // Returns [1, 2, 3]
* takeRight([1, 2, 3], 5);
*/
function takeRight(arr, count, guard) {
	count = guard || count === void 0 ? 1 : require_toInteger.toInteger(count);
	if (count <= 0 || arr.length === 0) return [];
	return arr.slice(-count);
}
//#endregion
exports.takeRight = takeRight;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/takeRightWhile.js"
/*!******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/takeRightWhile.js ***!
  \******************************************************************/
(__unused_webpack_module, exports) {

//#region src/array/takeRightWhile.ts
/**
* Takes elements from the end of the array while the predicate function returns `true`.
*
* @template T - Type of elements in the input array.
*
* @param arr - The array to take elements from.
* @param shouldContinueTaking - The function invoked per element with the item, its index, and the array.
* @returns A new array containing the elements taken from the end while the predicate returns `true`.
*
* @example
* // Returns [3, 2, 1]
* takeRightWhile([5, 4, 3, 2, 1], n => n < 4);
*
* @example
* // Returns []
* takeRightWhile([1, 2, 3], n => n > 3);
*
* @example
* // Using index parameter
* takeRightWhile([10, 20, 30, 40], (x, index) => index > 1);
* // Returns: [30, 40]
*/
function takeRightWhile(arr, shouldContinueTaking) {
	for (let i = arr.length - 1; i >= 0; i--) if (!shouldContinueTaking(arr[i], i, arr)) return arr.slice(i + 1);
	return arr.slice();
}
//#endregion
exports.takeRightWhile = takeRightWhile;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/takeWhile.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/takeWhile.js ***!
  \*************************************************************/
(__unused_webpack_module, exports) {

//#region src/array/takeWhile.ts
/**
* Returns a new array containing the leading elements of the provided array
* that satisfy the provided predicate function. It stops taking elements as soon
* as an element does not satisfy the predicate.
*
* @template T - The type of elements in the array.
* @param arr - The array to process.
* @param shouldContinueTaking - The predicate function that is called with each element, its index, and the array. Elements are included in the result as long as this function returns true.
* @returns A new array containing the leading elements that satisfy the predicate.
*
* @example
* // Returns [1, 2]
* takeWhile([1, 2, 3, 4], x => x < 3);
*
* @example
* // Returns []
* takeWhile([1, 2, 3, 4], x => x > 3);
*
* @example
* // Using index parameter
* takeWhile([10, 20, 30, 40], (x, index) => index < 2);
* // Returns: [10, 20]
*/
function takeWhile(arr, shouldContinueTaking) {
	const result = [];
	for (let i = 0; i < arr.length; i++) {
		const item = arr[i];
		if (!shouldContinueTaking(item, i, arr)) break;
		result.push(item);
	}
	return result;
}
//#endregion
exports.takeWhile = takeWhile;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/toFilled.js"
/*!************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/toFilled.js ***!
  \************************************************************/
(__unused_webpack_module, exports) {

//#region src/array/toFilled.ts
/**
* Creates a new array filled with the specified value from the start position up to, but not including, the end position.
* This function does not mutate the original array.
*
* @template T - The type of elements in the original array.
* @template U - The type of the value to fill the new array with.
* @param arr - The array to base the new array on.
* @param value - The value to fill the new array with.
* @param [start=0] - The start position. Defaults to 0.
* @param [end=arr.length] - The end position. Defaults to the array's length.
* @returns The new array with the filled values.
*/
function toFilled(arr, value, start = 0, end = arr.length) {
	const length = arr.length;
	const finalStart = Math.max(start >= 0 ? start : length + start, 0);
	const finalEnd = Math.min(end >= 0 ? end : length + end, length);
	const newArr = arr.slice();
	for (let i = finalStart; i < finalEnd; i++) newArr[i] = value;
	return newArr;
}
//#endregion
exports.toFilled = toFilled;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/union.js"
/*!*********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/union.js ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_uniq = __webpack_require__(/*! ./uniq.js */ "../../node_modules/es-toolkit/dist/array/uniq.js");
//#region src/array/union.ts
/**
* Creates an array of unique values from all given arrays.
*
* This function takes two arrays, merges them into a single array, and returns a new array
* containing only the unique values from the merged array.
*
* @template T - The type of elements in the array.
* @param arr1 - The first array to merge and filter for unique values.
* @param arr2 - The second array to merge and filter for unique values.
* @returns A new array of unique values.
*
* @example
* const array1 = [1, 2, 3];
* const array2 = [3, 4, 5];
* const result = union(array1, array2);
* // result will be [1, 2, 3, 4, 5]
*/
function union(arr1, arr2) {
	return require_uniq.uniq(arr1.concat(arr2));
}
//#endregion
exports.union = union;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/unionBy.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/unionBy.js ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_uniqBy = __webpack_require__(/*! ./uniqBy.js */ "../../node_modules/es-toolkit/dist/array/uniqBy.js");
//#region src/array/unionBy.ts
/**
* Creates an array of unique values, in order, from all given arrays using a provided mapping function to determine equality.
*
* @template T - The type of elements in the array.
* @template U - The type of mapped elements.
* @param arr1 - The first array.
* @param arr2 - The second array.
* @param mapper - The function to map array elements to comparison values.
* @returns A new array containing the union of unique elements from `arr1` and `arr2`, based on the values returned by the mapping function.
*
* @example
* // Custom mapping function for numbers (modulo comparison)
* const moduloMapper = (x) => x % 3;
* unionBy([1, 2, 3], [4, 5, 6], moduloMapper);
* // Returns [1, 2, 3]
*
* @example
* // Custom mapping function for objects with an 'id' property
* const idMapper = (obj) => obj.id;
* unionBy([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], idMapper);
* // Returns [{ id: 1 }, { id: 2 }, { id: 3 }]
*/
function unionBy(arr1, arr2, mapper) {
	return require_uniqBy.uniqBy(arr1.concat(arr2), mapper);
}
//#endregion
exports.unionBy = unionBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/unionWith.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/unionWith.js ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_uniqWith = __webpack_require__(/*! ./uniqWith.js */ "../../node_modules/es-toolkit/dist/array/uniqWith.js");
//#region src/array/unionWith.ts
/**
* Creates an array of unique values from two given arrays based on a custom equality function.
*
* This function takes two arrays and a custom equality function, merges the arrays, and returns
* a new array containing only the unique values as determined by the custom equality function.
*
* @template T - The type of elements in the array.
* @param arr1 - The first array to merge and filter for unique values.
* @param arr2 - The second array to merge and filter for unique values.
* @param areItemsEqual - A custom function to determine if two elements are equal.
* It takes two arguments and returns `true` if the elements are considered equal, and `false` otherwise.
* @returns A new array of unique values based on the custom equality function.
*
* @example
* const array1 = [{ id: 1 }, { id: 2 }];
* const array2 = [{ id: 2 }, { id: 3 }];
* const areItemsEqual = (a, b) => a.id === b.id;
* const result = unionWith(array1, array2, areItemsEqual);
* // result will be [{ id: 1 }, { id: 2 }, { id: 3 }] since { id: 2 } is considered equal in both arrays
*/
function unionWith(arr1, arr2, areItemsEqual) {
	return require_uniqWith.uniqWith(arr1.concat(arr2), areItemsEqual);
}
//#endregion
exports.unionWith = unionWith;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/uniq.js"
/*!********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/uniq.js ***!
  \********************************************************/
(__unused_webpack_module, exports) {

//#region src/array/uniq.ts
/**
* Creates a duplicate-free version of an array.
*
* This function takes an array and returns a new array containing only the unique values
* from the original array, preserving the order of first occurrence.
*
* @template T - The type of elements in the array.
* @param arr - The array to process.
* @returns A new array with only unique values from the original array.
*
* @example
* const array = [1, 2, 2, 3, 4, 4, 5];
* const result = uniq(array);
* // result will be [1, 2, 3, 4, 5]
*/
function uniq(arr) {
	return [...new Set(arr)];
}
//#endregion
exports.uniq = uniq;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/uniqBy.js"
/*!**********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/uniqBy.js ***!
  \**********************************************************/
(__unused_webpack_module, exports) {

//#region src/array/uniqBy.ts
/**
* Returns a new array containing only the unique elements from the original array,
* based on the values returned by the mapper function.
*
* When duplicates are found, the first occurrence is kept and the rest are discarded.
*
* @template T - The type of elements in the array.
* @template U - The type of mapped elements.
* @param arr - The array to process.
* @param mapper - The function used to convert the array elements.
* @returns A new array containing only the unique elements from the original array, based on the values returned by the mapper function.
*
* @example
* ```ts
* uniqBy([1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19], Math.floor);
* // [1.2, 2.1, 3.2, 5.7, 7.19]
* ```
*
* @example
* const array = [
*   { category: 'fruit', name: 'apple' },
*   { category: 'fruit', name: 'banana' },
*   { category: 'vegetable', name: 'carrot' },
* ];
* uniqBy(array, item => item.category).length
* // 2
* ```
*/
function uniqBy(arr, mapper) {
	const map = /* @__PURE__ */ new Map();
	for (let i = 0; i < arr.length; i++) {
		const item = arr[i];
		const key = mapper(item, i, arr);
		if (!map.has(key)) map.set(key, item);
	}
	return Array.from(map.values());
}
//#endregion
exports.uniqBy = uniqBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/uniqWith.js"
/*!************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/uniqWith.js ***!
  \************************************************************/
(__unused_webpack_module, exports) {

//#region src/array/uniqWith.ts
/**
* Returns a new array containing only the unique elements from the original array,
* based on the values returned by the comparator function.
*
* @template T - The type of elements in the array.
* @param arr - The array to process.
* @param areItemsEqual - The function used to compare the array elements.
* @returns A new array containing only the unique elements from the original array, based on the values returned by the comparator function.
*
* @example
* ```ts
* uniqWith([1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19], (a, b) => Math.abs(a - b) < 1);
* // [1.2, 3.2, 5.7, 7.19]
* ```
*/
function uniqWith(arr, areItemsEqual) {
	const result = [];
	for (let i = 0; i < arr.length; i++) {
		const item = arr[i];
		if (result.every((v) => !areItemsEqual(v, item))) result.push(item);
	}
	return result;
}
//#endregion
exports.uniqWith = uniqWith;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/unzip.js"
/*!*********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/unzip.js ***!
  \*********************************************************/
(__unused_webpack_module, exports) {

//#region src/array/unzip.ts
/**
* Gathers elements in the same position in an internal array
* from a grouped array of elements and returns them as a new array.
*
* @template T - The type of elements in the nested array.
* @param zipped - The nested array to unzip.
* @returns A new array of unzipped elements.
*
* @example
* const zipped = [['a', true, 1],['b', false, 2]];
* const result = unzip(zipped);
* // result will be [['a', 'b'], [true, false], [1, 2]]
*/
function unzip(zipped) {
	let maxLen = 0;
	for (let i = 0; i < zipped.length; i++) if (zipped[i].length > maxLen) maxLen = zipped[i].length;
	const result = new Array(maxLen);
	for (let i = 0; i < maxLen; i++) {
		result[i] = new Array(zipped.length);
		for (let j = 0; j < zipped.length; j++) result[i][j] = zipped[j][i];
	}
	return result;
}
//#endregion
exports.unzip = unzip;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/unzipWith.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/unzipWith.js ***!
  \*************************************************************/
(__unused_webpack_module, exports) {

//#region src/array/unzipWith.ts
/**
* Unzips an array of arrays, applying an `iteratee` function to regrouped elements.
*
* @template T, R
* @param target - The nested array to unzip. This is an array of arrays,
* where each inner array contains elements to be unzipped.
* @param iteratee - A function to transform the unzipped elements.
* @returns A new array of unzipped and transformed elements.
*
* @example
* const nestedArray = [[1, 2], [3, 4], [5, 6]];
* const result = unzipWith(nestedArray, (item, item2, item3) => item + item2 + item3);
* // result will be [9, 12]
*/
function unzipWith(target, iteratee) {
	const maxLength = Math.max(...target.map((innerArray) => innerArray.length));
	const result = new Array(maxLength);
	for (let i = 0; i < maxLength; i++) {
		const group = new Array(target.length);
		for (let j = 0; j < target.length; j++) group[j] = target[j][i];
		result[i] = iteratee(...group);
	}
	return result;
}
//#endregion
exports.unzipWith = unzipWith;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/windowed.js"
/*!************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/windowed.js ***!
  \************************************************************/
(__unused_webpack_module, exports) {

//#region src/array/windowed.ts
/**
* Creates an array of sub-arrays (windows) from the input array, each of the specified size.
* The windows can overlap depending on the step size provided.
*
* By default, only full windows are included in the result, and any leftover elements that can't form a full window are ignored.
*
* If the `partialWindows` option is set to true in the options object, the function will also include partial windows at the end of the result.
* Partial windows are smaller sub-arrays created when there aren't enough elements left in the input array to form a full window.
*
* @template T
* @param arr - The input array to create windows from.
* @param size - The size of each window. Must be a positive integer.
* @param [step=1] - The step size between the start of each window. Must be a positive integer.
* @param [options={}] - Options object to configure the behavior of the function.
* @param [options.partialWindows=false] - Whether to include partial windows at the end of the array.
* @returns An array of windows (sub-arrays) created from the input array.
* @throws {Error} If the size or step is not a positive integer.
*
* @example
* windowed([1, 2, 3, 4], 2);
* // => [[1, 2], [2, 3], [3, 4]]
*
* @example
* windowed([1, 2, 3, 4, 5, 6], 3, 2);
* // => [[1, 2, 3], [3, 4, 5]]
*
* @example
* windowed([1, 2, 3, 4, 5, 6], 3, 2, { partialWindows: true });
* // => [[1, 2, 3], [3, 4, 5], [5, 6]]
*/
function windowed(arr, size, step = 1, { partialWindows = false } = {}) {
	if (size <= 0 || !Number.isInteger(size)) throw new Error("Size must be a positive integer.");
	if (step <= 0 || !Number.isInteger(step)) throw new Error("Step must be a positive integer.");
	const result = [];
	const end = partialWindows ? arr.length : arr.length - size + 1;
	for (let i = 0; i < end; i += step) result.push(arr.slice(i, i + size));
	return result;
}
//#endregion
exports.windowed = windowed;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/without.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/without.js ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_difference = __webpack_require__(/*! ./difference.js */ "../../node_modules/es-toolkit/dist/array/difference.js");
//#region src/array/without.ts
/**
* Creates an array that excludes all specified values.
*
* It correctly excludes `NaN`, as it compares values using [SameValueZero](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-samevaluezero).
*
* @template T The type of elements in the array.
* @param array - The array to filter.
* @param values - The values to exclude.
* @returns A new array without the specified values.
*
* @example
* // Removes the specified values from the array
* without([1, 2, 3, 4, 5], 2, 4);
* // Returns: [1, 3, 5]
*
* @example
* // Removes specified string values from the array
* without(['a', 'b', 'c', 'a'], 'a');
* // Returns: ['b', 'c']
*/
function without(array, ...values) {
	return require_difference.difference(array, values);
}
//#endregion
exports.without = without;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/xor.js"
/*!*******************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/xor.js ***!
  \*******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_difference = __webpack_require__(/*! ./difference.js */ "../../node_modules/es-toolkit/dist/array/difference.js");
const require_intersection = __webpack_require__(/*! ./intersection.js */ "../../node_modules/es-toolkit/dist/array/intersection.js");
const require_union = __webpack_require__(/*! ./union.js */ "../../node_modules/es-toolkit/dist/array/union.js");
//#region src/array/xor.ts
/**
* Computes the symmetric difference between two arrays. The symmetric difference is the set of elements
* which are in either of the arrays, but not in their intersection.
*
* @template T - The type of elements in the array.
* @param arr1 - The first array.
* @param arr2 - The second array.
* @returns An array containing the elements that are present in either `arr1` or `arr2` but not in both.
*
* @example
* // Returns [1, 2, 5, 6]
* xor([1, 2, 3, 4], [3, 4, 5, 6]);
*
* @example
* // Returns ['a', 'c']
* xor(['a', 'b'], ['b', 'c']);
*/
function xor(arr1, arr2) {
	return require_difference.difference(require_union.union(arr1, arr2), require_intersection.intersection(arr1, arr2));
}
//#endregion
exports.xor = xor;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/xorBy.js"
/*!*********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/xorBy.js ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_differenceBy = __webpack_require__(/*! ./differenceBy.js */ "../../node_modules/es-toolkit/dist/array/differenceBy.js");
const require_intersectionBy = __webpack_require__(/*! ./intersectionBy.js */ "../../node_modules/es-toolkit/dist/array/intersectionBy.js");
const require_unionBy = __webpack_require__(/*! ./unionBy.js */ "../../node_modules/es-toolkit/dist/array/unionBy.js");
//#region src/array/xorBy.ts
/**
* Computes the symmetric difference between two arrays using a custom mapping function.
* The symmetric difference is the set of elements which are in either of the arrays,
* but not in their intersection, determined by the result of the mapping function.
*
* @template T - Type of elements in the input arrays.
* @template U - Type of the values returned by the mapping function.
*
* @param arr1 - The first array.
* @param arr2 - The second array.
* @param mapper - The function to map array elements to comparison values.
* @returns An array containing the elements that are present in either `arr1` or `arr2` but not in both, based on the values returned by the mapping function.
*
* @example
* // Custom mapping function for objects with an 'id' property
* const idMapper = obj => obj.id;
* xorBy([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], idMapper);
* // Returns [{ id: 1 }, { id: 3 }]
*/
function xorBy(arr1, arr2, mapper) {
	const union = require_unionBy.unionBy(arr1, arr2, mapper);
	const intersection = require_intersectionBy.intersectionBy(arr1, arr2, mapper);
	return require_differenceBy.differenceBy(union, intersection, mapper);
}
//#endregion
exports.xorBy = xorBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/xorWith.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/xorWith.js ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_differenceWith = __webpack_require__(/*! ./differenceWith.js */ "../../node_modules/es-toolkit/dist/array/differenceWith.js");
const require_intersectionWith = __webpack_require__(/*! ./intersectionWith.js */ "../../node_modules/es-toolkit/dist/array/intersectionWith.js");
const require_unionWith = __webpack_require__(/*! ./unionWith.js */ "../../node_modules/es-toolkit/dist/array/unionWith.js");
//#region src/array/xorWith.ts
/**
* Computes the symmetric difference between two arrays using a custom equality function.
* The symmetric difference is the set of elements which are in either of the arrays,
* but not in their intersection.
*
* @template T - Type of elements in the input arrays.
*
* @param arr1 - The first array.
* @param arr2 - The second array.
* @param areElementsEqual - The custom equality function to compare elements.
* @returns An array containing the elements that are present in either `arr1` or `arr2` but not in both, based on the custom equality function.
*
* @example
* // Custom equality function for objects with an 'id' property
* const areObjectsEqual = (a, b) => a.id === b.id;
* xorWith([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], areObjectsEqual);
* // Returns [{ id: 1 }, { id: 3 }]
*/
function xorWith(arr1, arr2, areElementsEqual) {
	const union = require_unionWith.unionWith(arr1, arr2, areElementsEqual);
	const intersection = require_intersectionWith.intersectionWith(arr1, arr2, areElementsEqual);
	return require_differenceWith.differenceWith(union, intersection, areElementsEqual);
}
//#endregion
exports.xorWith = xorWith;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/zip.js"
/*!*******************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/zip.js ***!
  \*******************************************************/
(__unused_webpack_module, exports) {

//#region src/array/zip.ts
/**
* Combines multiple arrays into a single array of tuples.
*
* This function takes multiple arrays and returns a new array where each element is a tuple
* containing the corresponding elements from the input arrays. If the input arrays are of
* different lengths, the resulting array will have the length of the longest input array,
* with undefined values for missing elements.
*
* @template T
* @param arrs - The arrays to zip together.
* @returns A new array of tuples containing the corresponding elements from the input arrays.
*
* @example
* const arr1 = [1, 2, 3];
* const arr2 = ['a', 'b', 'c'];
* const arr3 = [true, false];
* const result = zip(arr1, arr2, arr3);
* // result will be [[1, 'a', true], [2, 'b', false], [3, 'c', undefined]]
*/
function zip(...arrs) {
	let rowCount = 0;
	for (let i = 0; i < arrs.length; i++) if (arrs[i].length > rowCount) rowCount = arrs[i].length;
	const columnCount = arrs.length;
	const result = Array(rowCount);
	for (let i = 0; i < rowCount; ++i) {
		const row = Array(columnCount);
		for (let j = 0; j < columnCount; ++j) row[j] = arrs[j][i];
		result[i] = row;
	}
	return result;
}
//#endregion
exports.zip = zip;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/zipObject.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/zipObject.js ***!
  \*************************************************************/
(__unused_webpack_module, exports) {

//#region src/array/zipObject.ts
/**
* Combines two arrays, one of property names and one of corresponding values, into a single object.
*
* This function takes two arrays: one containing property names and another containing corresponding values.
* It returns a new object where the property names from the first array are keys, and the corresponding elements
* from the second array are values. If the `keys` array is longer than the `values` array, the remaining keys will
* have `undefined` as their values.
*
* @template P - The type of elements in the array.
* @template V - The type of elements in the array.
* @param keys - An array of property names.
* @param values - An array of values corresponding to the property names.
* @returns A new object composed of the given property names and values.
*
* @example
* const keys = ['a', 'b', 'c'];
* const values = [1, 2, 3];
* const result = zipObject(keys, values);
* // result will be { a: 1, b: 2, c: 3 }
*
* const keys2 = ['a', 'b', 'c'];
* const values2 = [1, 2];
* const result2 = zipObject(keys2, values2);
* // result2 will be { a: 1, b: 2, c: undefined }
*
* const keys2 = ['a', 'b'];
* const values2 = [1, 2, 3];
* const result2 = zipObject(keys2, values2);
* // result2 will be { a: 1, b: 2 }
*/
function zipObject(keys, values) {
	const result = {};
	for (let i = 0; i < keys.length; i++) result[keys[i]] = values[i];
	return result;
}
//#endregion
exports.zipObject = zipObject;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/array/zipWith.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/array/zipWith.js ***!
  \***********************************************************/
(__unused_webpack_module, exports) {

//#region src/array/zipWith.ts
/**
* Combines multiple arrays into a single array using a custom combiner function.
*
* This function takes one array and a variable number of additional arrays,
* applying the provided combiner function to the corresponding elements of each array.
* If the input arrays are of different lengths, the resulting array will have the length
* of the longest input array, with undefined values for missing elements.
*
* @template T - The type of elements in the input arrays.
* @template R - The type of elements in the resulting array.
* @param arr1 - The first array to zip.
* @param rest - The additional arrays to zip together, followed by the combiner function.
* @param combine - The combiner function that takes corresponding elements from each array, followed by their index, and returns a single value.
* @returns A new array where each element is the result of applying the combiner function to the corresponding elements of the input arrays.
*
* @example
* const arr1 = [1, 2, 3];
* const arr2 = ['a', 'b', 'c'];
* const result = zipWith(arr1, arr2, (num, char) => `${num}${char}`);
* // result will be ['1a', '2b', '3c']
*/
function zipWith(arr1, ...rest) {
	const arrs = [arr1, ...rest.slice(0, -1)];
	const combine = rest[rest.length - 1];
	const maxIndex = Math.max(...arrs.map((arr) => arr.length));
	const result = Array(maxIndex);
	for (let i = 0; i < maxIndex; i++) result[i] = combine(...arrs.map((arr) => arr[i]), i);
	return result;
}
//#endregion
exports.zipWith = zipWith;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/compat/_internal/getSymbols.js"
/*!*************************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/compat/_internal/getSymbols.js ***!
  \*************************************************************************/
(__unused_webpack_module, exports) {

//#region src/compat/_internal/getSymbols.ts
function getSymbols(object) {
	return Object.getOwnPropertySymbols(object).filter((symbol) => Object.prototype.propertyIsEnumerable.call(object, symbol));
}
//#endregion
exports.getSymbols = getSymbols;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/compat/_internal/getTag.js"
/*!*********************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/compat/_internal/getTag.js ***!
  \*********************************************************************/
(__unused_webpack_module, exports) {

//#region src/compat/_internal/getTag.ts
/**
* Gets the `toStringTag` of `value`.
*
* @private
* @param {T} value The value to query.
* @returns {string} Returns the `Object.prototype.toString.call` result.
*/
function getTag(value) {
	if (value == null) return value === void 0 ? "[object Undefined]" : "[object Null]";
	return Object.prototype.toString.call(value);
}
//#endregion
exports.getTag = getTag;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/compat/_internal/tags.js"
/*!*******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/compat/_internal/tags.js ***!
  \*******************************************************************/
(__unused_webpack_module, exports) {

//#region src/compat/_internal/tags.ts
const regexpTag = "[object RegExp]";
const stringTag = "[object String]";
const numberTag = "[object Number]";
const booleanTag = "[object Boolean]";
const argumentsTag = "[object Arguments]";
const symbolTag = "[object Symbol]";
const dateTag = "[object Date]";
const mapTag = "[object Map]";
const setTag = "[object Set]";
const arrayTag = "[object Array]";
const functionTag = "[object Function]";
const arrayBufferTag = "[object ArrayBuffer]";
const objectTag = "[object Object]";
const errorTag = "[object Error]";
const dataViewTag = "[object DataView]";
const uint8ArrayTag = "[object Uint8Array]";
const uint8ClampedArrayTag = "[object Uint8ClampedArray]";
const uint16ArrayTag = "[object Uint16Array]";
const uint32ArrayTag = "[object Uint32Array]";
const bigUint64ArrayTag = "[object BigUint64Array]";
const int8ArrayTag = "[object Int8Array]";
const int16ArrayTag = "[object Int16Array]";
const int32ArrayTag = "[object Int32Array]";
const bigInt64ArrayTag = "[object BigInt64Array]";
const float32ArrayTag = "[object Float32Array]";
const float64ArrayTag = "[object Float64Array]";
//#endregion
exports.argumentsTag = argumentsTag;
exports.arrayBufferTag = arrayBufferTag;
exports.arrayTag = arrayTag;
exports.bigInt64ArrayTag = bigInt64ArrayTag;
exports.bigUint64ArrayTag = bigUint64ArrayTag;
exports.booleanTag = booleanTag;
exports.dataViewTag = dataViewTag;
exports.dateTag = dateTag;
exports.errorTag = errorTag;
exports.float32ArrayTag = float32ArrayTag;
exports.float64ArrayTag = float64ArrayTag;
exports.functionTag = functionTag;
exports.int16ArrayTag = int16ArrayTag;
exports.int32ArrayTag = int32ArrayTag;
exports.int8ArrayTag = int8ArrayTag;
exports.mapTag = mapTag;
exports.numberTag = numberTag;
exports.objectTag = objectTag;
exports.regexpTag = regexpTag;
exports.setTag = setTag;
exports.stringTag = stringTag;
exports.symbolTag = symbolTag;
exports.uint16ArrayTag = uint16ArrayTag;
exports.uint32ArrayTag = uint32ArrayTag;
exports.uint8ArrayTag = uint8ArrayTag;
exports.uint8ClampedArrayTag = uint8ClampedArrayTag;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/compat/predicate/isArray.js"
/*!**********************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/compat/predicate/isArray.js ***!
  \**********************************************************************/
(__unused_webpack_module, exports) {

//#region src/compat/predicate/isArray.ts
/**
* Checks if the given value is an array.
*
* This function tests whether the provided value is an array or not.
* It returns `true` if the value is an array, and `false` otherwise.
*
* This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to an array.
*
* @param value - The value to test if it is an array.
* @returns `true` if the value is an array, `false` otherwise.
*
* @example
* const value1 = [1, 2, 3];
* const value2 = 'abc';
* const value3 = () => {};
*
* console.log(isArray(value1)); // true
* console.log(isArray(value2)); // false
* console.log(isArray(value3)); // false
*/
function isArray(value) {
	return Array.isArray(value);
}
//#endregion
exports.isArray = isArray;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/compat/predicate/isPlainObject.js"
/*!****************************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/compat/predicate/isPlainObject.js ***!
  \****************************************************************************/
(__unused_webpack_module, exports) {

//#region src/compat/predicate/isPlainObject.ts
/**
* Checks if a given value is a plain object.
*
* A plain object is an object created by the `{}` literal, `new Object()`, or
* `Object.create(null)`.
*
* This function also handles objects with custom
* `Symbol.toStringTag` properties.
*
* `Symbol.toStringTag` is a built-in symbol that a constructor can use to customize the
* default string description of objects.
*
* @param [object] - The value to check.
* @returns True if the value is a plain object, otherwise false.
*
* @example
* console.log(isPlainObject({})); // true
* console.log(isPlainObject([])); // false
* console.log(isPlainObject(null)); // false
* console.log(isPlainObject(Object.create(null))); // true
* console.log(isPlainObject(new Map())); // false
*/
function isPlainObject(object) {
	if (typeof object !== "object") return false;
	if (object == null) return false;
	if (Object.getPrototypeOf(object) === null) return true;
	if (Object.prototype.toString.call(object) !== "[object Object]") {
		const tag = object[Symbol.toStringTag];
		if (tag == null) return false;
		if (!Object.getOwnPropertyDescriptor(object, Symbol.toStringTag)?.writable) return false;
		return object.toString() === `[object ${tag}]`;
	}
	let proto = object;
	while (Object.getPrototypeOf(proto) !== null) proto = Object.getPrototypeOf(proto);
	return Object.getPrototypeOf(object) === proto;
}
//#endregion
exports.isPlainObject = isPlainObject;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/compat/predicate/isSymbol.js"
/*!***********************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/compat/predicate/isSymbol.js ***!
  \***********************************************************************/
(__unused_webpack_module, exports) {

//#region src/compat/predicate/isSymbol.ts
/**
* Check whether a value is a symbol.
*
* This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `symbol`.
*
* @param value The value to check.
* @returns Returns `true` if `value` is a symbol, else `false`.
* @example
* isSymbol(Symbol.iterator);
* // => true
*
* isSymbol('abc');
* // => false
*/
function isSymbol(value) {
	return typeof value === "symbol" || value instanceof Symbol;
}
//#endregion
exports.isSymbol = isSymbol;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/compat/util/eq.js"
/*!************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/compat/util/eq.js ***!
  \************************************************************/
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(/*! ../../_internal/isEqualsSameValueZero.js */ "../../node_modules/es-toolkit/dist/_internal/isEqualsSameValueZero.js");


/***/ },

/***/ "../../node_modules/es-toolkit/dist/compat/util/toFinite.js"
/*!******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/compat/util/toFinite.js ***!
  \******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_toNumber = __webpack_require__(/*! ./toNumber.js */ "../../node_modules/es-toolkit/dist/compat/util/toNumber.js");
//#region src/compat/util/toFinite.ts
/**
* Converts `value` to a finite number.
*
* @param value - The value to convert.
* @returns Returns the number.
*
* @example
* toFinite(3.2); // => 3.2
* toFinite(Number.MIN_VALUE); // => 5e-324
* toFinite(Infinity); // => 1.7976931348623157e+308
* toFinite('3.2'); // => 3.2
* toFinite(Symbol.iterator); // => 0
* toFinite(NaN); // => 0
*/
function toFinite(value) {
	if (!value) return value === 0 ? value : 0;
	value = require_toNumber.toNumber(value);
	if (value === Infinity || value === -Infinity) return (value < 0 ? -1 : 1) * Number.MAX_VALUE;
	return value === value ? value : 0;
}
//#endregion
exports.toFinite = toFinite;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/compat/util/toInteger.js"
/*!*******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/compat/util/toInteger.js ***!
  \*******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_toFinite = __webpack_require__(/*! ./toFinite.js */ "../../node_modules/es-toolkit/dist/compat/util/toFinite.js");
//#region src/compat/util/toInteger.ts
/**
* Converts `value` to an integer.
*
* This function first converts `value` to a finite number. If the result has any decimal places,
* they are removed by rounding down to the nearest whole number.
*
* @param value - The value to convert.
* @returns Returns the number.
*
* @example
* toInteger(3.2); // => 3
* toInteger(Number.MIN_VALUE); // => 0
* toInteger(Infinity); // => 1.7976931348623157e+308
* toInteger('3.2'); // => 3
* toInteger(Symbol.iterator); // => 0
* toInteger(NaN); // => 0
*/
function toInteger(value) {
	const finite = require_toFinite.toFinite(value);
	const remainder = finite % 1;
	return remainder ? finite - remainder : finite;
}
//#endregion
exports.toInteger = toInteger;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/compat/util/toNumber.js"
/*!******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/compat/util/toNumber.js ***!
  \******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_isSymbol = __webpack_require__(/*! ../predicate/isSymbol.js */ "../../node_modules/es-toolkit/dist/compat/predicate/isSymbol.js");
//#region src/compat/util/toNumber.ts
/**
* Converts `value` to a number.
*
* Unlike `Number()`, this function returns `NaN` for symbols.
*
* @param value - The value to convert.
* @returns Returns the number.
*
* @example
* toNumber(3.2); // => 3.2
* toNumber(Number.MIN_VALUE); // => 5e-324
* toNumber(Infinity); // => Infinity
* toNumber('3.2'); // => 3.2
* toNumber(Symbol.iterator); // => NaN
* toNumber(NaN); // => NaN
*/
function toNumber(value) {
	if (require_isSymbol.isSymbol(value)) return NaN;
	return Number(value);
}
//#endregion
exports.toNumber = toNumber;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/error/AbortError.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/error/AbortError.js ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_DOMException = __webpack_require__(/*! ../_internal/DOMException.js */ "../../node_modules/es-toolkit/dist/_internal/DOMException.js");
//#region src/error/AbortError.ts
/**
* An error class representing an aborted operation.
* @augments DOMException
*/
var AbortError = class extends require_DOMException.DOMException {
	constructor(message = "The operation was aborted") {
		super(message);
	}
};
//#endregion
exports.AbortError = AbortError;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/error/TimeoutError.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/error/TimeoutError.js ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_DOMException = __webpack_require__(/*! ../_internal/DOMException.js */ "../../node_modules/es-toolkit/dist/_internal/DOMException.js");
//#region src/error/TimeoutError.ts
/**
* An error class representing a timeout operation.
* @augments DOMException
*/
var TimeoutError = class extends require_DOMException.DOMException {
	constructor(message = "The operation was timed out") {
		super(message);
	}
};
//#endregion
exports.TimeoutError = TimeoutError;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/error/index.js"
/*!*********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/error/index.js ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_AbortError = __webpack_require__(/*! ./AbortError.js */ "../../node_modules/es-toolkit/dist/error/AbortError.js");
const require_TimeoutError = __webpack_require__(/*! ./TimeoutError.js */ "../../node_modules/es-toolkit/dist/error/TimeoutError.js");
exports.AbortError = require_AbortError.AbortError;
exports.TimeoutError = require_TimeoutError.TimeoutError;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/after.js"
/*!************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/after.js ***!
  \************************************************************/
(__unused_webpack_module, exports) {

//#region src/function/after.ts
/**
* Creates a function that only executes starting from the `n`-th call.
* The provided function will be invoked starting from the `n`-th call.
*
* This is particularly useful for scenarios involving events or asynchronous operations
* where an action should occur only after a certain number of invocations.
*
* @template F - The type of the function to be invoked.
* @param n - The number of calls required for `func` to execute.
* @param func - The function to be invoked.
* @returns A new function that:
* - Tracks the number of calls.
* - Invokes `func` starting from the `n`-th call.
* - Returns `undefined` if fewer than `n` calls have been made.
* @throws {Error} - Throws an error if `n` is negative.
* @example
*
* const afterFn = after(3, () => {
*  console.log("called")
* });
*
* // Will not log anything.
* afterFn()
* // Will not log anything.
* afterFn()
* // Will log 'called'.
* afterFn()
*/
function after(n, func) {
	if (!Number.isInteger(n) || n < 0) throw new Error(`n must be a non-negative integer.`);
	let counter = 0;
	return (...args) => {
		if (++counter >= n) return func(...args);
	};
}
//#endregion
exports.after = after;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/ary.js"
/*!**********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/ary.js ***!
  \**********************************************************/
(__unused_webpack_module, exports) {

//#region src/function/ary.ts
/**
* Creates a function that invokes func, with up to n arguments, ignoring any additional arguments.
*
* @template F - The type of the function.
* @param func - The function to cap arguments for.
* @param n - The arity cap.
* @returns Returns the new capped function.
*
* @example
* function fn(a: number, b: number, c: number) {
*   return Array.from(arguments);
* }
*
* ary(fn, 0)(1, 2, 3) // []
* ary(fn, 1)(1, 2, 3) // [1]
* ary(fn, 2)(1, 2, 3) // [1, 2]
* ary(fn, 3)(1, 2, 3) // [1, 2, 3]
*/
function ary(func, n) {
	return function(...args) {
		return func.apply(this, args.slice(0, n));
	};
}
//#endregion
exports.ary = ary;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/asyncNoop.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/asyncNoop.js ***!
  \****************************************************************/
(__unused_webpack_module, exports) {

//#region src/function/asyncNoop.ts
/**
* An asynchronous no-operation function that does nothing.
* This can be used as a placeholder or default function.
*
* @example
* asyncNoop(); // Does nothing
*
* @returns This function returns a Promise that resolves to undefined.
*/
async function asyncNoop() {}
//#endregion
exports.asyncNoop = asyncNoop;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/before.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/before.js ***!
  \*************************************************************/
(__unused_webpack_module, exports) {

//#region src/function/before.ts
/**
* Creates a function that limits the number of times the given function (`func`) can be called.
*
* @template F - The type of the function to be invoked.
* @param n - The number of times the returned function is allowed to call `func` before stopping.
* - If `n` is 0, `func` will never be called.
* - If `n` is a positive integer, `func` will be called up to `n-1` times.
* @param func - The function to be called with the limit applied.
* @returns A new function that:
* - Tracks the number of calls.
* - Invokes `func` until the `n-1`-th call.
* - Returns `undefined` if the number of calls reaches or exceeds `n`, stopping further calls.
* @throws {Error} - Throw an error if `n` is negative.
* @example
*
* const beforeFn = before(3, () => {
*  console.log("called");
* })
*
* // Will log 'called'.
* beforeFn();
*
* // Will log 'called'.
* beforeFn();
*
* // Will not log anything.
* beforeFn();
*/
function before(n, func) {
	if (!Number.isInteger(n) || n < 0) throw new Error("n must be a non-negative integer.");
	let counter = 0;
	return (...args) => {
		if (++counter < n) return func(...args);
	};
}
//#endregion
exports.before = before;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/curry.js"
/*!************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/curry.js ***!
  \************************************************************/
(__unused_webpack_module, exports) {

//#region src/function/curry.ts
/**
* Curries a function, allowing it to be called with a single argument at a time and returning a new function that takes the next argument.
* This process continues until all arguments have been provided, at which point the original function is called with all accumulated arguments.
*
* @param func - The function to curry.
* @returns A curried function that can be called with a single argument at a time.
*
* @example
* function sum(a: number, b: number, c: number) {
*   return a + b + c;
* }
*
* const curriedSum = curry(sum);
*
* // The parameter `a` should be given the value `10`.
* const add10 = curriedSum(10);
*
* // The parameter `b` should be given the value `15`.
* const add25 = add10(15);
*
* // The parameter `c` should be given the value `5`. The function 'sum' has received all its arguments and will now return a value.
* const result = add25(5);
*/
function curry(func) {
	if (func.length === 0 || func.length === 1) return func;
	return function(arg) {
		return makeCurry(func, func.length, [arg]);
	};
}
function makeCurry(origin, argsLength, args) {
	if (args.length === argsLength) return origin(...args);
	else {
		const next = function(arg) {
			return makeCurry(origin, argsLength, [...args, arg]);
		};
		return next;
	}
}
//#endregion
exports.curry = curry;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/curryRight.js"
/*!*****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/curryRight.js ***!
  \*****************************************************************/
(__unused_webpack_module, exports) {

//#region src/function/curryRight.ts
/**
* Curries a function, allowing it to be called with a single argument at a time and returning a new function that takes the next argument.
* This process continues until all arguments have been provided, at which point the original function is called with all accumulated arguments.
*
* Unlike `curry`, this function curries the function from right to left.
*
* @param func - The function to curry.
* @returns A curried function.
*
* @example
* function sum(a: number, b: number, c: number) {
*   return a + b + c;
* }
*
* const curriedSum = curryRight(sum);
*
* // The parameter `c` should be given the value `10`.
* const add10 = curriedSum(10);
*
* // The parameter `b` should be given the value `15`.
* const add25 = add10(15);
*
* // The parameter `a` should be given the value `5`. The function 'sum' has received all its arguments and will now return a value.
* const result = add25(5); // 30
*/
function curryRight(func) {
	if (func.length === 0 || func.length === 1) return func;
	return function(arg) {
		return makeCurryRight(func, func.length, [arg]);
	};
}
function makeCurryRight(origin, argsLength, args) {
	if (args.length === argsLength) return origin(...args);
	else {
		const next = function(arg) {
			return makeCurryRight(origin, argsLength, [arg, ...args]);
		};
		return next;
	}
}
//#endregion
exports.curryRight = curryRight;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/debounce.js"
/*!***************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/debounce.js ***!
  \***************************************************************/
(__unused_webpack_module, exports) {

//#region src/function/debounce.ts
/**
* Creates a debounced function that delays invoking the provided function until after `debounceMs` milliseconds
* have elapsed since the last time the debounced function was invoked. The debounced function also has a `cancel`
* method to cancel any pending execution.
*
* @template F - The type of function.
* @param func - The function to debounce.
* @param debounceMs - The number of milliseconds to delay.
* @param options - The options object
* @param options.signal - An optional AbortSignal to cancel the debounced function.
* @param options.edges - An optional array specifying whether the function should be invoked on the leading edge, trailing edge, or both.
* @returns A new debounced function with a `cancel` method.
*
* @example
* const debouncedFunction = debounce(() => {
*   console.log('Function executed');
* }, 1000);
*
* // Will log 'Function executed' after 1 second if not called again in that time
* debouncedFunction();
*
* // Will not log anything as the previous call is canceled
* debouncedFunction.cancel();
*
* // With AbortSignal
* const controller = new AbortController();
* const signal = controller.signal;
* const debouncedWithSignal = debounce(() => {
*  console.log('Function executed');
* }, 1000, { signal });
*
* debouncedWithSignal();
*
* // Will cancel the debounced function call
* controller.abort();
*/
function debounce(func, debounceMs, { signal, edges } = {}) {
	let pendingThis = void 0;
	let pendingArgs = null;
	const leading = edges != null && edges.includes("leading");
	const trailing = edges == null || edges.includes("trailing");
	const invoke = () => {
		if (pendingArgs !== null) {
			func.apply(pendingThis, pendingArgs);
			pendingThis = void 0;
			pendingArgs = null;
		}
	};
	const onTimerEnd = () => {
		if (trailing) invoke();
		cancel();
	};
	let timeoutId = null;
	const schedule = () => {
		if (timeoutId != null) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			timeoutId = null;
			onTimerEnd();
		}, debounceMs);
	};
	const cancelTimer = () => {
		if (timeoutId !== null) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}
	};
	const cancel = () => {
		cancelTimer();
		pendingThis = void 0;
		pendingArgs = null;
	};
	const flush = () => {
		invoke();
	};
	const debounced = function(...args) {
		if (signal?.aborted) return;
		pendingThis = this;
		pendingArgs = args;
		const isFirstCall = timeoutId == null;
		schedule();
		if (leading && isFirstCall) invoke();
	};
	debounced.schedule = schedule;
	debounced.cancel = cancel;
	debounced.flush = flush;
	signal?.addEventListener("abort", cancel, { once: true });
	return debounced;
}
//#endregion
exports.debounce = debounce;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/flow.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/flow.js ***!
  \***********************************************************/
(__unused_webpack_module, exports) {

//#region src/function/flow.ts
/**
* Creates a new function that executes the given functions in sequence. The return value of the previous function is passed as an argument to the next function.
*
* The `this` context of the returned function is also passed to the functions provided as parameters.
*
* @param funcs The functions to invoke.
* @returns Returns the new composite function.
*
* @example
* const add = (x: number, y: number) => x + y;
* const square = (n: number) => n * n;
*
* const combined = flow(add, square);
* console.log(combined(1, 2)); // 9
*/
function flow(...funcs) {
	return function(...args) {
		let result = funcs.length ? funcs[0].apply(this, args) : args[0];
		for (let i = 1; i < funcs.length; i++) result = funcs[i].call(this, result);
		return result;
	};
}
//#endregion
exports.flow = flow;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/flowRight.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/flowRight.js ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_flow = __webpack_require__(/*! ./flow.js */ "../../node_modules/es-toolkit/dist/function/flow.js");
//#region src/function/flowRight.ts
/**
* Creates a new function that executes the given functions in sequence from right to left. The return value of the previous function is passed as an argument to the next function.
*
* The `this` context of the returned function is also passed to the functions provided as parameters.
*
* This method is like `flow` except that it creates a function that invokes the given functions from right to left.
*
* @param funcs The functions to invoke.
* @returns Returns the new composite function.
*
* @example
* const add = (x: number, y: number) => x + y;
* const square = (n: number) => n * n;
*
* const combined = flowRight(square, add);
* console.log(combined(1, 2)); // 9
*/
function flowRight(...funcs) {
	return require_flow.flow(...funcs.reverse());
}
//#endregion
exports.flowRight = flowRight;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/identity.js"
/*!***************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/identity.js ***!
  \***************************************************************/
(__unused_webpack_module, exports) {

//#region src/function/identity.ts
/**
* Returns the input value unchanged.
*
* @template T - The type of the input value.
* @param x - The value to be returned.
* @returns The input value.
*
* @example
* // Returns 5
* identity(5);
*
* @example
* // Returns 'hello'
* identity('hello');
*
* @example
* // Returns { key: 'value' }
* identity({ key: 'value' });
*/
function identity(x) {
	return x;
}
//#endregion
exports.identity = identity;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/index.js"
/*!************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/index.js ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_after = __webpack_require__(/*! ./after.js */ "../../node_modules/es-toolkit/dist/function/after.js");
const require_ary = __webpack_require__(/*! ./ary.js */ "../../node_modules/es-toolkit/dist/function/ary.js");
const require_asyncNoop = __webpack_require__(/*! ./asyncNoop.js */ "../../node_modules/es-toolkit/dist/function/asyncNoop.js");
const require_before = __webpack_require__(/*! ./before.js */ "../../node_modules/es-toolkit/dist/function/before.js");
const require_curry = __webpack_require__(/*! ./curry.js */ "../../node_modules/es-toolkit/dist/function/curry.js");
const require_curryRight = __webpack_require__(/*! ./curryRight.js */ "../../node_modules/es-toolkit/dist/function/curryRight.js");
const require_debounce = __webpack_require__(/*! ./debounce.js */ "../../node_modules/es-toolkit/dist/function/debounce.js");
const require_flow = __webpack_require__(/*! ./flow.js */ "../../node_modules/es-toolkit/dist/function/flow.js");
const require_flowRight = __webpack_require__(/*! ./flowRight.js */ "../../node_modules/es-toolkit/dist/function/flowRight.js");
const require_identity = __webpack_require__(/*! ./identity.js */ "../../node_modules/es-toolkit/dist/function/identity.js");
const require_memoize = __webpack_require__(/*! ./memoize.js */ "../../node_modules/es-toolkit/dist/function/memoize.js");
const require_negate = __webpack_require__(/*! ./negate.js */ "../../node_modules/es-toolkit/dist/function/negate.js");
const require_noop = __webpack_require__(/*! ./noop.js */ "../../node_modules/es-toolkit/dist/function/noop.js");
const require_once = __webpack_require__(/*! ./once.js */ "../../node_modules/es-toolkit/dist/function/once.js");
const require_partial = __webpack_require__(/*! ./partial.js */ "../../node_modules/es-toolkit/dist/function/partial.js");
const require_partialRight = __webpack_require__(/*! ./partialRight.js */ "../../node_modules/es-toolkit/dist/function/partialRight.js");
const require_rest = __webpack_require__(/*! ./rest.js */ "../../node_modules/es-toolkit/dist/function/rest.js");
const require_retry = __webpack_require__(/*! ./retry.js */ "../../node_modules/es-toolkit/dist/function/retry.js");
const require_spread = __webpack_require__(/*! ./spread.js */ "../../node_modules/es-toolkit/dist/function/spread.js");
const require_throttle = __webpack_require__(/*! ./throttle.js */ "../../node_modules/es-toolkit/dist/function/throttle.js");
const require_unary = __webpack_require__(/*! ./unary.js */ "../../node_modules/es-toolkit/dist/function/unary.js");
exports.after = require_after.after;
exports.ary = require_ary.ary;
exports.asyncNoop = require_asyncNoop.asyncNoop;
exports.before = require_before.before;
exports.curry = require_curry.curry;
exports.curryRight = require_curryRight.curryRight;
exports.debounce = require_debounce.debounce;
exports.flow = require_flow.flow;
exports.flowRight = require_flowRight.flowRight;
exports.identity = require_identity.identity;
exports.memoize = require_memoize.memoize;
exports.negate = require_negate.negate;
exports.noop = require_noop.noop;
exports.once = require_once.once;
exports.partial = require_partial.partial;
exports.partialRight = require_partialRight.partialRight;
exports.rest = require_rest.rest;
exports.retry = require_retry.retry;
exports.spread = require_spread.spread;
exports.throttle = require_throttle.throttle;
exports.unary = require_unary.unary;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/memoize.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/memoize.js ***!
  \**************************************************************/
(__unused_webpack_module, exports) {

//#region src/function/memoize.ts
/**
* Creates a memoized version of the provided function. The memoized function caches
* results based on the argument it receives, so if the same argument is passed again,
* it returns the cached result instead of recomputing it.
*
* This function works with functions that take zero or just one argument. If your function
* originally takes multiple arguments, you should refactor it to take a single object or array
* that combines those arguments.
*
* If the argument is not primitive (e.g., arrays or objects), provide a
* `getCacheKey` function to generate a unique cache key for proper caching.
*
* @template F - The type of the function to be memoized.
* @param fn - The function to be memoized. It should accept a single argument and return a value.
* @param [options={}] - Optional configuration for the memoization.
* @param [options.cache] - The cache object used to store results. Defaults to a new `Map`.
* @param [options.getCacheKey] - An optional function to generate a unique cache key for each argument.
*
* @returns The memoized function with an additional `cache` property that exposes the internal cache.
*
* @example
* // Example using the default cache
* const add = (x: number) => x + 10;
* const memoizedAdd = memoize(add);
*
* console.log(memoizedAdd(5)); // 15
* console.log(memoizedAdd(5)); // 15 (cached result)
* console.log(memoizedAdd.cache.size); // 1
*
* @example
* // Example using a custom resolver
* const sum = (arr: number[]) => arr.reduce((x, y) => x + y, 0);
* const memoizedSum = memoize(sum, { getCacheKey: (arr: number[]) => arr.join(',') });
* console.log(memoizedSum([1, 2])); // 3
* console.log(memoizedSum([1, 2])); // 3 (cached result)
* console.log(memoizedSum.cache.size); // 1
*
* @example
* // Example using a custom cache implementation
* class CustomCache<K, T> implements MemoizeCache<K, T> {
*   private cache = new Map<K, T>();
*
*   set(key: K, value: T): void {
*     this.cache.set(key, value);
*   }
*
*   get(key: K): T | undefined {
*     return this.cache.get(key);
*   }
*
*   has(key: K): boolean {
*     return this.cache.has(key);
*   }
*
*   delete(key: K): boolean {
*     return this.cache.delete(key);
*   }
*
*   clear(): void {
*     this.cache.clear();
*   }
*
*   get size(): number {
*     return this.cache.size;
*   }
* }
* const customCache = new CustomCache<string, number>();
* const memoizedSumWithCustomCache = memoize(sum, { cache: customCache });
* console.log(memoizedSumWithCustomCache([1, 2])); // 3
* console.log(memoizedSumWithCustomCache([1, 2])); // 3 (cached result)
* console.log(memoizedSumWithCustomCache.cache.size); // 1
*/
function memoize(fn, options = {}) {
	const { cache = /* @__PURE__ */ new Map(), getCacheKey } = options;
	const memoizedFn = function(arg) {
		const key = getCacheKey ? getCacheKey(arg) : arg;
		if (cache.has(key)) return cache.get(key);
		const result = fn.call(this, arg);
		cache.set(key, result);
		return result;
	};
	memoizedFn.cache = cache;
	return memoizedFn;
}
//#endregion
exports.memoize = memoize;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/negate.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/negate.js ***!
  \*************************************************************/
(__unused_webpack_module, exports) {

//#region src/function/negate.ts
/**
* Creates a function that negates the result of the predicate function.
*
* @template F - The type of the function to negate.
* @param func - The function to negate.
* @returns The new negated function, which negates the boolean result of `func`.
*
* @example
* const array = [1, 2, 3, 4, 5, 6];
* const isEven = (n: number) => n % 2 === 0;
* const result = array.filter(negate(isEven));
* // result will be [1, 3, 5]
*/
function negate(func) {
	return ((...args) => !func(...args));
}
//#endregion
exports.negate = negate;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/noop.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/noop.js ***!
  \***********************************************************/
(__unused_webpack_module, exports) {

//#region src/function/noop.ts
/**
* A no-operation function that does nothing.
* This can be used as a placeholder or default function.
*
* @example
* noop(); // Does nothing
*
* @returns This function does not return anything.
*/
function noop() {}
//#endregion
exports.noop = noop;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/once.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/once.js ***!
  \***********************************************************/
(__unused_webpack_module, exports) {

//#region src/function/once.ts
/**
* Creates a function that is restricted to invoking the provided function `func` once.
* Repeated calls to the function will return the value from the first invocation.
*
* @template F - The type of function.
* @param func - The function to restrict.
* @returns A new function that invokes `func` once and caches the result.
*
* @example
* const initialize = once(() => {
*   console.log('Initialized!');
*   return true;
* });
*
* initialize(); // Logs: 'Initialized!' and returns true
* initialize(); // Returns true without logging
*/
function once(func) {
	let called = false;
	let cache;
	return function(...args) {
		if (!called) {
			called = true;
			cache = func(...args);
		}
		return cache;
	};
}
//#endregion
exports.once = once;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/partial.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/partial.js ***!
  \**************************************************************/
(__unused_webpack_module, exports) {

//#region src/function/partial.ts
/**
* Creates a function that invokes `func` with `partialArgs` prepended to the arguments it receives. This method is like `bind` except it does not alter the `this` binding.
*
* The partial.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
*
* Note: This method doesn't set the `length` property of partially applied functions.
*
* @template F The type of the function to partially apply.
* @param func The function to partially apply arguments to.
* @param partialArgs The arguments to be partially applied.
* @returns Returns the new partially applied function.
*
* @example
* function greet(greeting, name) {
*   return greeting + ' ' + name;
* }
*
* const sayHelloTo = partial(greet, 'hello');
* sayHelloTo('fred');
* // => 'hello fred'
*
* // Partially applied with placeholders.
* const greetFred = partial(greet, partial.placeholder, 'fred');
* greetFred('hi');
* // => 'hi fred'
*/
function partial(func, ...partialArgs) {
	return partialImpl(func, placeholderSymbol, ...partialArgs);
}
function partialImpl(func, placeholder, ...partialArgs) {
	const partialed = function(...providedArgs) {
		let providedArgsIndex = 0;
		const substitutedArgs = partialArgs.slice().map((arg) => arg === placeholder ? providedArgs[providedArgsIndex++] : arg);
		const remainingArgs = providedArgs.slice(providedArgsIndex);
		return func.apply(this, substitutedArgs.concat(remainingArgs));
	};
	if (func.prototype) partialed.prototype = Object.create(func.prototype);
	return partialed;
}
const placeholderSymbol = Symbol("partial.placeholder");
partial.placeholder = placeholderSymbol;
//#endregion
exports.partial = partial;
exports.partialImpl = partialImpl;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/partialRight.js"
/*!*******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/partialRight.js ***!
  \*******************************************************************/
(__unused_webpack_module, exports) {

//#region src/function/partialRight.ts
/**
* This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
*
* The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
*
* Note: This method doesn't set the `length` property of partially applied functions.
*
* @template F The type of the function to partially apply.
* @param func The function to partially apply arguments to.
* @param partialArgs The arguments to be partially applied.
* @returns Returns the new partially applied function.
*
* @example
* function greet(greeting, name) {
*   return greeting + ' ' + name;
* }
*
* const greetFred = partialRight(greet, 'fred');
* greetFred('hi');
* // => 'hi fred'
*
* // Partially applied with placeholders.
* const sayHelloTo = partialRight(greet, 'hello', partialRight.placeholder);
* sayHelloTo('fred');
* // => 'hello fred'
*/
function partialRight(func, ...partialArgs) {
	return partialRightImpl(func, placeholderSymbol, ...partialArgs);
}
function partialRightImpl(func, placeholder, ...partialArgs) {
	const partialedRight = function(...providedArgs) {
		const placeholderLength = partialArgs.filter((arg) => arg === placeholder).length;
		const rangeLength = Math.max(providedArgs.length - placeholderLength, 0);
		const remainingArgs = providedArgs.slice(0, rangeLength);
		let providedArgsIndex = rangeLength;
		const substitutedArgs = partialArgs.slice().map((arg) => arg === placeholder ? providedArgs[providedArgsIndex++] : arg);
		return func.apply(this, remainingArgs.concat(substitutedArgs));
	};
	if (func.prototype) partialedRight.prototype = Object.create(func.prototype);
	return partialedRight;
}
const placeholderSymbol = Symbol("partialRight.placeholder");
partialRight.placeholder = placeholderSymbol;
//#endregion
exports.partialRight = partialRight;
exports.partialRightImpl = partialRightImpl;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/rest.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/rest.js ***!
  \***********************************************************/
(__unused_webpack_module, exports) {

//#region src/function/rest.ts
/**
* Creates a function that transforms the arguments of the provided function `func`.
* The transformed arguments are passed to `func` such that the arguments starting from a specified index
* are grouped into an array, while the previous arguments are passed as individual elements.
*
* @template F - The type of the function being transformed.
* @param func - The function whose arguments are to be transformed.
* @param [startIndex=func.length - 1] - The index from which to start grouping the remaining arguments into an array.
*                                            Defaults to `func.length - 1`, grouping all arguments after the last parameter.
* @returns A new function that, when called, returns the result of calling `func` with the transformed arguments.
*
* The transformed arguments are:
* - The first `start` arguments as individual elements.
* - The remaining arguments from index `start` onward grouped into an array.
* @example
* function fn(a, b, c) {
*   return [a, b, c];
* }
*
* // Using default start index (func.length - 1, which is 2 in this case)
* const transformedFn = rest(fn);
* console.log(transformedFn(1, 2, 3, 4)); // [1, 2, [3, 4]]
*
* // Using start index 1
* const transformedFnWithStart = rest(fn, 1);
* console.log(transformedFnWithStart(1, 2, 3, 4)); // [1, [2, 3, 4]]
*
* // With fewer arguments than the start index
* console.log(transformedFn(1)); // [1, undefined, []]
*/
function rest(func, startIndex = func.length - 1) {
	return function(...args) {
		const rest = args.slice(startIndex);
		const params = args.slice(0, startIndex);
		while (params.length < startIndex) params.push(void 0);
		return func.apply(this, [...params, rest]);
	};
}
//#endregion
exports.rest = rest;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/retry.js"
/*!************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/retry.js ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_delay = __webpack_require__(/*! ../promise/delay.js */ "../../node_modules/es-toolkit/dist/promise/delay.js");
//#region src/function/retry.ts
const DEFAULT_DELAY = 0;
const DEFAULT_RETRIES = Number.POSITIVE_INFINITY;
const DEFAULT_SHOULD_RETRY = () => true;
/**
* Retries a function that returns a promise with specified options.
*
* @template T
* @param func - The function to retry. It should return a promise.
* @param [_options] - Either the number of retries or an options object.
* @returns A promise that resolves with the value of the successful function call.
*/
async function retry(func, _options) {
	let delay$1;
	let retries;
	let signal;
	let shouldRetry;
	if (typeof _options === "number") {
		delay$1 = DEFAULT_DELAY;
		retries = _options;
		signal = void 0;
		shouldRetry = DEFAULT_SHOULD_RETRY;
	} else {
		delay$1 = _options?.delay ?? DEFAULT_DELAY;
		retries = _options?.retries ?? DEFAULT_RETRIES;
		signal = _options?.signal;
		shouldRetry = _options?.shouldRetry ?? DEFAULT_SHOULD_RETRY;
	}
	let error;
	for (let attempts = 0; attempts <= retries; attempts++) {
		if (signal?.aborted) throw error ?? /* @__PURE__ */ new Error(`The retry operation was aborted due to an abort signal.`);
		try {
			return await func();
		} catch (err) {
			error = err;
			if (!shouldRetry(err, attempts)) throw err;
			const currentDelay = typeof delay$1 === "function" ? delay$1(attempts) : delay$1;
			await require_delay.delay(currentDelay);
		}
	}
	throw error;
}
//#endregion
exports.retry = retry;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/spread.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/spread.js ***!
  \*************************************************************/
(__unused_webpack_module, exports) {

//#region src/function/spread.ts
/**
* Creates a new function that spreads elements of an array argument into individual arguments
* for the original function.
*
* @template F - A function type with any number of parameters and any return type.
* @param func - The function to be transformed. It can be any function with any number of arguments.
* @returns A new function that takes an array of arguments and returns the result of calling the original function with those arguments.
*
* @example
* function add(a, b) {
*   return a + b;
* }
*
* const spreadAdd = spread(add);
* console.log(spreadAdd([1, 2])); // Output: 3
*/
function spread(func) {
	return function(argsArr) {
		return func.apply(this, argsArr);
	};
}
//#endregion
exports.spread = spread;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/throttle.js"
/*!***************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/throttle.js ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_debounce = __webpack_require__(/*! ./debounce.js */ "../../node_modules/es-toolkit/dist/function/debounce.js");
//#region src/function/throttle.ts
/**
* Creates a throttled function that only invokes the provided function at most once
* per every `throttleMs` milliseconds. Subsequent calls to the throttled function
* within the wait time will not trigger the execution of the original function.
*
* @template F - The type of function.
* @param func - The function to throttle.
* @param throttleMs - The number of milliseconds to throttle executions to.
* @returns A new throttled function that accepts the same parameters as the original function.
*
* @example
* const throttledFunction = throttle(() => {
*   console.log('Function executed');
* }, 1000);
*
* // Will log 'Function executed' immediately
* throttledFunction();
*
* // Will not log anything as it is within the throttle time
* throttledFunction();
*
* // After 1 second
* setTimeout(() => {
*   throttledFunction(); // Will log 'Function executed'
* }, 1000);
*/
function throttle(func, throttleMs, { signal, edges = ["leading", "trailing"] } = {}) {
	let pendingAt = null;
	const debounced = require_debounce.debounce(function(...args) {
		pendingAt = Date.now();
		func.apply(this, args);
	}, throttleMs, {
		signal,
		edges
	});
	const throttled = function(...args) {
		if (pendingAt == null) pendingAt = Date.now();
		if (Date.now() - pendingAt >= throttleMs) {
			pendingAt = Date.now();
			func.apply(this, args);
			debounced.cancel();
			debounced.schedule();
			return;
		}
		debounced.apply(this, args);
	};
	throttled.cancel = debounced.cancel;
	throttled.flush = debounced.flush;
	return throttled;
}
//#endregion
exports.throttle = throttle;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/function/unary.js"
/*!************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/function/unary.js ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_ary = __webpack_require__(/*! ./ary.js */ "../../node_modules/es-toolkit/dist/function/ary.js");
//#region src/function/unary.ts
/**
* Creates a function that accepts up to one argument, ignoring any additional arguments.
*
* @template F - The type of the function.
* @param func - The function to cap arguments for.
* @returns Returns the new capped function.
*
* @example
* function fn(a, b, c) {
*   console.log(arguments);
* }
*
* unary(fn)(1, 2, 3); // [Arguments] { '0': 1 }
*/
function unary(func) {
	return require_ary.ary(func, 1);
}
//#endregion
exports.unary = unary;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/index.js"
/*!***************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/index.js ***!
  \***************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_at = __webpack_require__(/*! ./array/at.js */ "../../node_modules/es-toolkit/dist/array/at.js");
const require_cartesianProduct = __webpack_require__(/*! ./array/cartesianProduct.js */ "../../node_modules/es-toolkit/dist/array/cartesianProduct.js");
const require_chunk = __webpack_require__(/*! ./array/chunk.js */ "../../node_modules/es-toolkit/dist/array/chunk.js");
const require_combinations = __webpack_require__(/*! ./array/combinations.js */ "../../node_modules/es-toolkit/dist/array/combinations.js");
const require_compact = __webpack_require__(/*! ./array/compact.js */ "../../node_modules/es-toolkit/dist/array/compact.js");
const require_countBy = __webpack_require__(/*! ./array/countBy.js */ "../../node_modules/es-toolkit/dist/array/countBy.js");
const require_difference = __webpack_require__(/*! ./array/difference.js */ "../../node_modules/es-toolkit/dist/array/difference.js");
const require_differenceBy = __webpack_require__(/*! ./array/differenceBy.js */ "../../node_modules/es-toolkit/dist/array/differenceBy.js");
const require_differenceWith = __webpack_require__(/*! ./array/differenceWith.js */ "../../node_modules/es-toolkit/dist/array/differenceWith.js");
const require_drop = __webpack_require__(/*! ./array/drop.js */ "../../node_modules/es-toolkit/dist/array/drop.js");
const require_dropRight = __webpack_require__(/*! ./array/dropRight.js */ "../../node_modules/es-toolkit/dist/array/dropRight.js");
const require_dropRightWhile = __webpack_require__(/*! ./array/dropRightWhile.js */ "../../node_modules/es-toolkit/dist/array/dropRightWhile.js");
const require_dropWhile = __webpack_require__(/*! ./array/dropWhile.js */ "../../node_modules/es-toolkit/dist/array/dropWhile.js");
const require_fill = __webpack_require__(/*! ./array/fill.js */ "../../node_modules/es-toolkit/dist/array/fill.js");
const require_semaphore = __webpack_require__(/*! ./promise/semaphore.js */ "../../node_modules/es-toolkit/dist/promise/semaphore.js");
const require_limitAsync = __webpack_require__(/*! ./array/limitAsync.js */ "../../node_modules/es-toolkit/dist/array/limitAsync.js");
const require_filterAsync = __webpack_require__(/*! ./array/filterAsync.js */ "../../node_modules/es-toolkit/dist/array/filterAsync.js");
const require_flatten = __webpack_require__(/*! ./array/flatten.js */ "../../node_modules/es-toolkit/dist/array/flatten.js");
const require_flatMap = __webpack_require__(/*! ./array/flatMap.js */ "../../node_modules/es-toolkit/dist/array/flatMap.js");
const require_flatMapAsync = __webpack_require__(/*! ./array/flatMapAsync.js */ "../../node_modules/es-toolkit/dist/array/flatMapAsync.js");
const require_flattenDeep = __webpack_require__(/*! ./array/flattenDeep.js */ "../../node_modules/es-toolkit/dist/array/flattenDeep.js");
const require_flatMapDeep = __webpack_require__(/*! ./array/flatMapDeep.js */ "../../node_modules/es-toolkit/dist/array/flatMapDeep.js");
const require_forEachAsync = __webpack_require__(/*! ./array/forEachAsync.js */ "../../node_modules/es-toolkit/dist/array/forEachAsync.js");
const require_forEachRight = __webpack_require__(/*! ./array/forEachRight.js */ "../../node_modules/es-toolkit/dist/array/forEachRight.js");
const require_groupBy = __webpack_require__(/*! ./array/groupBy.js */ "../../node_modules/es-toolkit/dist/array/groupBy.js");
const require_head = __webpack_require__(/*! ./array/head.js */ "../../node_modules/es-toolkit/dist/array/head.js");
const require_initial = __webpack_require__(/*! ./array/initial.js */ "../../node_modules/es-toolkit/dist/array/initial.js");
const require_intersection = __webpack_require__(/*! ./array/intersection.js */ "../../node_modules/es-toolkit/dist/array/intersection.js");
const require_intersectionBy = __webpack_require__(/*! ./array/intersectionBy.js */ "../../node_modules/es-toolkit/dist/array/intersectionBy.js");
const require_intersectionWith = __webpack_require__(/*! ./array/intersectionWith.js */ "../../node_modules/es-toolkit/dist/array/intersectionWith.js");
const require_isSubset = __webpack_require__(/*! ./array/isSubset.js */ "../../node_modules/es-toolkit/dist/array/isSubset.js");
const require_isSubsetWith = __webpack_require__(/*! ./array/isSubsetWith.js */ "../../node_modules/es-toolkit/dist/array/isSubsetWith.js");
const require_keyBy = __webpack_require__(/*! ./array/keyBy.js */ "../../node_modules/es-toolkit/dist/array/keyBy.js");
const require_last = __webpack_require__(/*! ./array/last.js */ "../../node_modules/es-toolkit/dist/array/last.js");
const require_mapAsync = __webpack_require__(/*! ./array/mapAsync.js */ "../../node_modules/es-toolkit/dist/array/mapAsync.js");
const require_maxBy = __webpack_require__(/*! ./array/maxBy.js */ "../../node_modules/es-toolkit/dist/array/maxBy.js");
const require_minBy = __webpack_require__(/*! ./array/minBy.js */ "../../node_modules/es-toolkit/dist/array/minBy.js");
const require_orderBy = __webpack_require__(/*! ./array/orderBy.js */ "../../node_modules/es-toolkit/dist/array/orderBy.js");
const require_partition = __webpack_require__(/*! ./array/partition.js */ "../../node_modules/es-toolkit/dist/array/partition.js");
const require_pull = __webpack_require__(/*! ./array/pull.js */ "../../node_modules/es-toolkit/dist/array/pull.js");
const require_pullAt = __webpack_require__(/*! ./array/pullAt.js */ "../../node_modules/es-toolkit/dist/array/pullAt.js");
const require_reduceAsync = __webpack_require__(/*! ./array/reduceAsync.js */ "../../node_modules/es-toolkit/dist/array/reduceAsync.js");
const require_remove = __webpack_require__(/*! ./array/remove.js */ "../../node_modules/es-toolkit/dist/array/remove.js");
const require_sample = __webpack_require__(/*! ./array/sample.js */ "../../node_modules/es-toolkit/dist/array/sample.js");
const require_random = __webpack_require__(/*! ./math/random.js */ "../../node_modules/es-toolkit/dist/math/random.js");
const require_randomInt = __webpack_require__(/*! ./math/randomInt.js */ "../../node_modules/es-toolkit/dist/math/randomInt.js");
const require_sampleSize = __webpack_require__(/*! ./array/sampleSize.js */ "../../node_modules/es-toolkit/dist/array/sampleSize.js");
const require_shuffle = __webpack_require__(/*! ./array/shuffle.js */ "../../node_modules/es-toolkit/dist/array/shuffle.js");
const require_sortBy = __webpack_require__(/*! ./array/sortBy.js */ "../../node_modules/es-toolkit/dist/array/sortBy.js");
const require_tail = __webpack_require__(/*! ./array/tail.js */ "../../node_modules/es-toolkit/dist/array/tail.js");
const require_take = __webpack_require__(/*! ./array/take.js */ "../../node_modules/es-toolkit/dist/array/take.js");
const require_takeRight = __webpack_require__(/*! ./array/takeRight.js */ "../../node_modules/es-toolkit/dist/array/takeRight.js");
const require_takeRightWhile = __webpack_require__(/*! ./array/takeRightWhile.js */ "../../node_modules/es-toolkit/dist/array/takeRightWhile.js");
const require_takeWhile = __webpack_require__(/*! ./array/takeWhile.js */ "../../node_modules/es-toolkit/dist/array/takeWhile.js");
const require_toFilled = __webpack_require__(/*! ./array/toFilled.js */ "../../node_modules/es-toolkit/dist/array/toFilled.js");
const require_uniq = __webpack_require__(/*! ./array/uniq.js */ "../../node_modules/es-toolkit/dist/array/uniq.js");
const require_union = __webpack_require__(/*! ./array/union.js */ "../../node_modules/es-toolkit/dist/array/union.js");
const require_uniqBy = __webpack_require__(/*! ./array/uniqBy.js */ "../../node_modules/es-toolkit/dist/array/uniqBy.js");
const require_unionBy = __webpack_require__(/*! ./array/unionBy.js */ "../../node_modules/es-toolkit/dist/array/unionBy.js");
const require_uniqWith = __webpack_require__(/*! ./array/uniqWith.js */ "../../node_modules/es-toolkit/dist/array/uniqWith.js");
const require_unionWith = __webpack_require__(/*! ./array/unionWith.js */ "../../node_modules/es-toolkit/dist/array/unionWith.js");
const require_unzip = __webpack_require__(/*! ./array/unzip.js */ "../../node_modules/es-toolkit/dist/array/unzip.js");
const require_unzipWith = __webpack_require__(/*! ./array/unzipWith.js */ "../../node_modules/es-toolkit/dist/array/unzipWith.js");
const require_windowed = __webpack_require__(/*! ./array/windowed.js */ "../../node_modules/es-toolkit/dist/array/windowed.js");
const require_without = __webpack_require__(/*! ./array/without.js */ "../../node_modules/es-toolkit/dist/array/without.js");
const require_xor = __webpack_require__(/*! ./array/xor.js */ "../../node_modules/es-toolkit/dist/array/xor.js");
const require_xorBy = __webpack_require__(/*! ./array/xorBy.js */ "../../node_modules/es-toolkit/dist/array/xorBy.js");
const require_xorWith = __webpack_require__(/*! ./array/xorWith.js */ "../../node_modules/es-toolkit/dist/array/xorWith.js");
const require_zip = __webpack_require__(/*! ./array/zip.js */ "../../node_modules/es-toolkit/dist/array/zip.js");
const require_zipObject = __webpack_require__(/*! ./array/zipObject.js */ "../../node_modules/es-toolkit/dist/array/zipObject.js");
const require_zipWith = __webpack_require__(/*! ./array/zipWith.js */ "../../node_modules/es-toolkit/dist/array/zipWith.js");
__webpack_require__(/*! ./array/index.js */ "../../node_modules/es-toolkit/dist/array/index.js");
const require_AbortError = __webpack_require__(/*! ./error/AbortError.js */ "../../node_modules/es-toolkit/dist/error/AbortError.js");
const require_TimeoutError = __webpack_require__(/*! ./error/TimeoutError.js */ "../../node_modules/es-toolkit/dist/error/TimeoutError.js");
__webpack_require__(/*! ./error/index.js */ "../../node_modules/es-toolkit/dist/error/index.js");
const require_after = __webpack_require__(/*! ./function/after.js */ "../../node_modules/es-toolkit/dist/function/after.js");
const require_ary = __webpack_require__(/*! ./function/ary.js */ "../../node_modules/es-toolkit/dist/function/ary.js");
const require_asyncNoop = __webpack_require__(/*! ./function/asyncNoop.js */ "../../node_modules/es-toolkit/dist/function/asyncNoop.js");
const require_before = __webpack_require__(/*! ./function/before.js */ "../../node_modules/es-toolkit/dist/function/before.js");
const require_curry = __webpack_require__(/*! ./function/curry.js */ "../../node_modules/es-toolkit/dist/function/curry.js");
const require_curryRight = __webpack_require__(/*! ./function/curryRight.js */ "../../node_modules/es-toolkit/dist/function/curryRight.js");
const require_debounce = __webpack_require__(/*! ./function/debounce.js */ "../../node_modules/es-toolkit/dist/function/debounce.js");
const require_flow = __webpack_require__(/*! ./function/flow.js */ "../../node_modules/es-toolkit/dist/function/flow.js");
const require_flowRight = __webpack_require__(/*! ./function/flowRight.js */ "../../node_modules/es-toolkit/dist/function/flowRight.js");
const require_identity = __webpack_require__(/*! ./function/identity.js */ "../../node_modules/es-toolkit/dist/function/identity.js");
const require_memoize = __webpack_require__(/*! ./function/memoize.js */ "../../node_modules/es-toolkit/dist/function/memoize.js");
const require_negate = __webpack_require__(/*! ./function/negate.js */ "../../node_modules/es-toolkit/dist/function/negate.js");
const require_noop = __webpack_require__(/*! ./function/noop.js */ "../../node_modules/es-toolkit/dist/function/noop.js");
const require_once = __webpack_require__(/*! ./function/once.js */ "../../node_modules/es-toolkit/dist/function/once.js");
const require_partial = __webpack_require__(/*! ./function/partial.js */ "../../node_modules/es-toolkit/dist/function/partial.js");
const require_partialRight = __webpack_require__(/*! ./function/partialRight.js */ "../../node_modules/es-toolkit/dist/function/partialRight.js");
const require_rest = __webpack_require__(/*! ./function/rest.js */ "../../node_modules/es-toolkit/dist/function/rest.js");
const require_delay = __webpack_require__(/*! ./promise/delay.js */ "../../node_modules/es-toolkit/dist/promise/delay.js");
const require_retry = __webpack_require__(/*! ./function/retry.js */ "../../node_modules/es-toolkit/dist/function/retry.js");
const require_spread = __webpack_require__(/*! ./function/spread.js */ "../../node_modules/es-toolkit/dist/function/spread.js");
const require_throttle = __webpack_require__(/*! ./function/throttle.js */ "../../node_modules/es-toolkit/dist/function/throttle.js");
const require_unary = __webpack_require__(/*! ./function/unary.js */ "../../node_modules/es-toolkit/dist/function/unary.js");
__webpack_require__(/*! ./function/index.js */ "../../node_modules/es-toolkit/dist/function/index.js");
const require_clamp = __webpack_require__(/*! ./math/clamp.js */ "../../node_modules/es-toolkit/dist/math/clamp.js");
const require_inRange = __webpack_require__(/*! ./math/inRange.js */ "../../node_modules/es-toolkit/dist/math/inRange.js");
const require_sum = __webpack_require__(/*! ./math/sum.js */ "../../node_modules/es-toolkit/dist/math/sum.js");
const require_mean = __webpack_require__(/*! ./math/mean.js */ "../../node_modules/es-toolkit/dist/math/mean.js");
const require_sumBy = __webpack_require__(/*! ./math/sumBy.js */ "../../node_modules/es-toolkit/dist/math/sumBy.js");
const require_meanBy = __webpack_require__(/*! ./math/meanBy.js */ "../../node_modules/es-toolkit/dist/math/meanBy.js");
const require_median = __webpack_require__(/*! ./math/median.js */ "../../node_modules/es-toolkit/dist/math/median.js");
const require_medianBy = __webpack_require__(/*! ./math/medianBy.js */ "../../node_modules/es-toolkit/dist/math/medianBy.js");
const require_percentile = __webpack_require__(/*! ./math/percentile.js */ "../../node_modules/es-toolkit/dist/math/percentile.js");
const require_range = __webpack_require__(/*! ./math/range.js */ "../../node_modules/es-toolkit/dist/math/range.js");
const require_rangeRight = __webpack_require__(/*! ./math/rangeRight.js */ "../../node_modules/es-toolkit/dist/math/rangeRight.js");
const require_round = __webpack_require__(/*! ./math/round.js */ "../../node_modules/es-toolkit/dist/math/round.js");
__webpack_require__(/*! ./math/index.js */ "../../node_modules/es-toolkit/dist/math/index.js");
const require_isPrimitive = __webpack_require__(/*! ./predicate/isPrimitive.js */ "../../node_modules/es-toolkit/dist/predicate/isPrimitive.js");
const require_isTypedArray = __webpack_require__(/*! ./predicate/isTypedArray.js */ "../../node_modules/es-toolkit/dist/predicate/isTypedArray.js");
const require_clone = __webpack_require__(/*! ./object/clone.js */ "../../node_modules/es-toolkit/dist/object/clone.js");
const require_isBuffer = __webpack_require__(/*! ./predicate/isBuffer.js */ "../../node_modules/es-toolkit/dist/predicate/isBuffer.js");
const require_cloneDeepWith = __webpack_require__(/*! ./object/cloneDeepWith.js */ "../../node_modules/es-toolkit/dist/object/cloneDeepWith.js");
const require_cloneDeep = __webpack_require__(/*! ./object/cloneDeep.js */ "../../node_modules/es-toolkit/dist/object/cloneDeep.js");
const require_findKey = __webpack_require__(/*! ./object/findKey.js */ "../../node_modules/es-toolkit/dist/object/findKey.js");
const require_isPlainObject = __webpack_require__(/*! ./predicate/isPlainObject.js */ "../../node_modules/es-toolkit/dist/predicate/isPlainObject.js");
const require_flattenObject = __webpack_require__(/*! ./object/flattenObject.js */ "../../node_modules/es-toolkit/dist/object/flattenObject.js");
const require_invert = __webpack_require__(/*! ./object/invert.js */ "../../node_modules/es-toolkit/dist/object/invert.js");
const require_mapKeys = __webpack_require__(/*! ./object/mapKeys.js */ "../../node_modules/es-toolkit/dist/object/mapKeys.js");
const require_mapValues = __webpack_require__(/*! ./object/mapValues.js */ "../../node_modules/es-toolkit/dist/object/mapValues.js");
const require_merge = __webpack_require__(/*! ./object/merge.js */ "../../node_modules/es-toolkit/dist/object/merge.js");
const require_mergeWith = __webpack_require__(/*! ./object/mergeWith.js */ "../../node_modules/es-toolkit/dist/object/mergeWith.js");
const require_omit = __webpack_require__(/*! ./object/omit.js */ "../../node_modules/es-toolkit/dist/object/omit.js");
const require_omitBy = __webpack_require__(/*! ./object/omitBy.js */ "../../node_modules/es-toolkit/dist/object/omitBy.js");
const require_pick = __webpack_require__(/*! ./object/pick.js */ "../../node_modules/es-toolkit/dist/object/pick.js");
const require_pickBy = __webpack_require__(/*! ./object/pickBy.js */ "../../node_modules/es-toolkit/dist/object/pickBy.js");
const require_sortKeys = __webpack_require__(/*! ./object/sortKeys.js */ "../../node_modules/es-toolkit/dist/object/sortKeys.js");
const require_capitalize = __webpack_require__(/*! ./string/capitalize.js */ "../../node_modules/es-toolkit/dist/string/capitalize.js");
const require_words = __webpack_require__(/*! ./string/words.js */ "../../node_modules/es-toolkit/dist/string/words.js");
const require_camelCase = __webpack_require__(/*! ./string/camelCase.js */ "../../node_modules/es-toolkit/dist/string/camelCase.js");
const require_toCamelCaseKeys = __webpack_require__(/*! ./object/toCamelCaseKeys.js */ "../../node_modules/es-toolkit/dist/object/toCamelCaseKeys.js");
const require_toMerged = __webpack_require__(/*! ./object/toMerged.js */ "../../node_modules/es-toolkit/dist/object/toMerged.js");
const require_snakeCase = __webpack_require__(/*! ./string/snakeCase.js */ "../../node_modules/es-toolkit/dist/string/snakeCase.js");
const require_toSnakeCaseKeys = __webpack_require__(/*! ./object/toSnakeCaseKeys.js */ "../../node_modules/es-toolkit/dist/object/toSnakeCaseKeys.js");
__webpack_require__(/*! ./object/index.js */ "../../node_modules/es-toolkit/dist/object/index.js");
const require_isArrayBuffer = __webpack_require__(/*! ./predicate/isArrayBuffer.js */ "../../node_modules/es-toolkit/dist/predicate/isArrayBuffer.js");
const require_isBlob = __webpack_require__(/*! ./predicate/isBlob.js */ "../../node_modules/es-toolkit/dist/predicate/isBlob.js");
const require_isBoolean = __webpack_require__(/*! ./predicate/isBoolean.js */ "../../node_modules/es-toolkit/dist/predicate/isBoolean.js");
const require_isBrowser = __webpack_require__(/*! ./predicate/isBrowser.js */ "../../node_modules/es-toolkit/dist/predicate/isBrowser.js");
const require_isDate = __webpack_require__(/*! ./predicate/isDate.js */ "../../node_modules/es-toolkit/dist/predicate/isDate.js");
const require_isEmptyObject = __webpack_require__(/*! ./predicate/isEmptyObject.js */ "../../node_modules/es-toolkit/dist/predicate/isEmptyObject.js");
const require_isEqualWith = __webpack_require__(/*! ./predicate/isEqualWith.js */ "../../node_modules/es-toolkit/dist/predicate/isEqualWith.js");
const require_isEqual = __webpack_require__(/*! ./predicate/isEqual.js */ "../../node_modules/es-toolkit/dist/predicate/isEqual.js");
const require_isError = __webpack_require__(/*! ./predicate/isError.js */ "../../node_modules/es-toolkit/dist/predicate/isError.js");
const require_isFile = __webpack_require__(/*! ./predicate/isFile.js */ "../../node_modules/es-toolkit/dist/predicate/isFile.js");
const require_isFunction = __webpack_require__(/*! ./predicate/isFunction.js */ "../../node_modules/es-toolkit/dist/predicate/isFunction.js");
const require_isJSON = __webpack_require__(/*! ./predicate/isJSON.js */ "../../node_modules/es-toolkit/dist/predicate/isJSON.js");
const require_isJSONValue = __webpack_require__(/*! ./predicate/isJSONValue.js */ "../../node_modules/es-toolkit/dist/predicate/isJSONValue.js");
const require_isLength = __webpack_require__(/*! ./predicate/isLength.js */ "../../node_modules/es-toolkit/dist/predicate/isLength.js");
const require_isMap = __webpack_require__(/*! ./predicate/isMap.js */ "../../node_modules/es-toolkit/dist/predicate/isMap.js");
const require_isNil = __webpack_require__(/*! ./predicate/isNil.js */ "../../node_modules/es-toolkit/dist/predicate/isNil.js");
const require_isNode = __webpack_require__(/*! ./predicate/isNode.js */ "../../node_modules/es-toolkit/dist/predicate/isNode.js");
const require_isNotNil = __webpack_require__(/*! ./predicate/isNotNil.js */ "../../node_modules/es-toolkit/dist/predicate/isNotNil.js");
const require_isNull = __webpack_require__(/*! ./predicate/isNull.js */ "../../node_modules/es-toolkit/dist/predicate/isNull.js");
const require_isNumber = __webpack_require__(/*! ./predicate/isNumber.js */ "../../node_modules/es-toolkit/dist/predicate/isNumber.js");
const require_isPromise = __webpack_require__(/*! ./predicate/isPromise.js */ "../../node_modules/es-toolkit/dist/predicate/isPromise.js");
const require_isRegExp = __webpack_require__(/*! ./predicate/isRegExp.js */ "../../node_modules/es-toolkit/dist/predicate/isRegExp.js");
const require_isSet = __webpack_require__(/*! ./predicate/isSet.js */ "../../node_modules/es-toolkit/dist/predicate/isSet.js");
const require_isString = __webpack_require__(/*! ./predicate/isString.js */ "../../node_modules/es-toolkit/dist/predicate/isString.js");
const require_isSymbol = __webpack_require__(/*! ./predicate/isSymbol.js */ "../../node_modules/es-toolkit/dist/predicate/isSymbol.js");
const require_isUndefined = __webpack_require__(/*! ./predicate/isUndefined.js */ "../../node_modules/es-toolkit/dist/predicate/isUndefined.js");
const require_isWeakMap = __webpack_require__(/*! ./predicate/isWeakMap.js */ "../../node_modules/es-toolkit/dist/predicate/isWeakMap.js");
const require_isWeakSet = __webpack_require__(/*! ./predicate/isWeakSet.js */ "../../node_modules/es-toolkit/dist/predicate/isWeakSet.js");
__webpack_require__(/*! ./predicate/index.js */ "../../node_modules/es-toolkit/dist/predicate/index.js");
const require_allKeyed = __webpack_require__(/*! ./promise/allKeyed.js */ "../../node_modules/es-toolkit/dist/promise/allKeyed.js");
const require_mutex = __webpack_require__(/*! ./promise/mutex.js */ "../../node_modules/es-toolkit/dist/promise/mutex.js");
const require_timeout = __webpack_require__(/*! ./promise/timeout.js */ "../../node_modules/es-toolkit/dist/promise/timeout.js");
const require_withTimeout = __webpack_require__(/*! ./promise/withTimeout.js */ "../../node_modules/es-toolkit/dist/promise/withTimeout.js");
__webpack_require__(/*! ./promise/index.js */ "../../node_modules/es-toolkit/dist/promise/index.js");
const require_constantCase = __webpack_require__(/*! ./string/constantCase.js */ "../../node_modules/es-toolkit/dist/string/constantCase.js");
const require_deburr = __webpack_require__(/*! ./string/deburr.js */ "../../node_modules/es-toolkit/dist/string/deburr.js");
const require_escape = __webpack_require__(/*! ./string/escape.js */ "../../node_modules/es-toolkit/dist/string/escape.js");
const require_escapeRegExp = __webpack_require__(/*! ./string/escapeRegExp.js */ "../../node_modules/es-toolkit/dist/string/escapeRegExp.js");
const require_kebabCase = __webpack_require__(/*! ./string/kebabCase.js */ "../../node_modules/es-toolkit/dist/string/kebabCase.js");
const require_lowerCase = __webpack_require__(/*! ./string/lowerCase.js */ "../../node_modules/es-toolkit/dist/string/lowerCase.js");
const require_lowerFirst = __webpack_require__(/*! ./string/lowerFirst.js */ "../../node_modules/es-toolkit/dist/string/lowerFirst.js");
const require_pad = __webpack_require__(/*! ./string/pad.js */ "../../node_modules/es-toolkit/dist/string/pad.js");
const require_pascalCase = __webpack_require__(/*! ./string/pascalCase.js */ "../../node_modules/es-toolkit/dist/string/pascalCase.js");
const require_reverseString = __webpack_require__(/*! ./string/reverseString.js */ "../../node_modules/es-toolkit/dist/string/reverseString.js");
const require_startCase = __webpack_require__(/*! ./string/startCase.js */ "../../node_modules/es-toolkit/dist/string/startCase.js");
const require_trimEnd = __webpack_require__(/*! ./string/trimEnd.js */ "../../node_modules/es-toolkit/dist/string/trimEnd.js");
const require_trimStart = __webpack_require__(/*! ./string/trimStart.js */ "../../node_modules/es-toolkit/dist/string/trimStart.js");
const require_trim = __webpack_require__(/*! ./string/trim.js */ "../../node_modules/es-toolkit/dist/string/trim.js");
const require_unescape = __webpack_require__(/*! ./string/unescape.js */ "../../node_modules/es-toolkit/dist/string/unescape.js");
const require_upperCase = __webpack_require__(/*! ./string/upperCase.js */ "../../node_modules/es-toolkit/dist/string/upperCase.js");
const require_upperFirst = __webpack_require__(/*! ./string/upperFirst.js */ "../../node_modules/es-toolkit/dist/string/upperFirst.js");
__webpack_require__(/*! ./string/index.js */ "../../node_modules/es-toolkit/dist/string/index.js");
const require_attempt = __webpack_require__(/*! ./util/attempt.js */ "../../node_modules/es-toolkit/dist/util/attempt.js");
const require_attemptAsync = __webpack_require__(/*! ./util/attemptAsync.js */ "../../node_modules/es-toolkit/dist/util/attemptAsync.js");
const require_invariant = __webpack_require__(/*! ./util/invariant.js */ "../../node_modules/es-toolkit/dist/util/invariant.js");
__webpack_require__(/*! ./util/index.js */ "../../node_modules/es-toolkit/dist/util/index.js");
exports.AbortError = require_AbortError.AbortError;
exports.Mutex = require_mutex.Mutex;
exports.Semaphore = require_semaphore.Semaphore;
exports.TimeoutError = require_TimeoutError.TimeoutError;
exports.after = require_after.after;
exports.allKeyed = require_allKeyed.allKeyed;
exports.ary = require_ary.ary;
exports.assert = require_invariant.invariant;
exports.asyncNoop = require_asyncNoop.asyncNoop;
exports.at = require_at.at;
exports.attempt = require_attempt.attempt;
exports.attemptAsync = require_attemptAsync.attemptAsync;
exports.before = require_before.before;
exports.camelCase = require_camelCase.camelCase;
exports.capitalize = require_capitalize.capitalize;
exports.cartesianProduct = require_cartesianProduct.cartesianProduct;
exports.chunk = require_chunk.chunk;
exports.clamp = require_clamp.clamp;
exports.clone = require_clone.clone;
exports.cloneDeep = require_cloneDeep.cloneDeep;
exports.cloneDeepWith = require_cloneDeepWith.cloneDeepWith;
exports.combinations = require_combinations.combinations;
exports.compact = require_compact.compact;
exports.constantCase = require_constantCase.constantCase;
exports.countBy = require_countBy.countBy;
exports.curry = require_curry.curry;
exports.curryRight = require_curryRight.curryRight;
exports.debounce = require_debounce.debounce;
exports.deburr = require_deburr.deburr;
exports.delay = require_delay.delay;
exports.difference = require_difference.difference;
exports.differenceBy = require_differenceBy.differenceBy;
exports.differenceWith = require_differenceWith.differenceWith;
exports.drop = require_drop.drop;
exports.dropRight = require_dropRight.dropRight;
exports.dropRightWhile = require_dropRightWhile.dropRightWhile;
exports.dropWhile = require_dropWhile.dropWhile;
exports.escape = require_escape.escape;
exports.escapeRegExp = require_escapeRegExp.escapeRegExp;
exports.fill = require_fill.fill;
exports.filterAsync = require_filterAsync.filterAsync;
exports.findKey = require_findKey.findKey;
exports.flatMap = require_flatMap.flatMap;
exports.flatMapAsync = require_flatMapAsync.flatMapAsync;
exports.flatMapDeep = require_flatMapDeep.flatMapDeep;
exports.flatten = require_flatten.flatten;
exports.flattenDeep = require_flattenDeep.flattenDeep;
exports.flattenObject = require_flattenObject.flattenObject;
exports.flow = require_flow.flow;
exports.flowRight = require_flowRight.flowRight;
exports.forEachAsync = require_forEachAsync.forEachAsync;
exports.forEachRight = require_forEachRight.forEachRight;
exports.groupBy = require_groupBy.groupBy;
exports.head = require_head.head;
exports.identity = require_identity.identity;
exports.inRange = require_inRange.inRange;
exports.initial = require_initial.initial;
exports.intersection = require_intersection.intersection;
exports.intersectionBy = require_intersectionBy.intersectionBy;
exports.intersectionWith = require_intersectionWith.intersectionWith;
exports.invariant = require_invariant.invariant;
exports.invert = require_invert.invert;
exports.isArrayBuffer = require_isArrayBuffer.isArrayBuffer;
exports.isBlob = require_isBlob.isBlob;
exports.isBoolean = require_isBoolean.isBoolean;
exports.isBrowser = require_isBrowser.isBrowser;
exports.isBuffer = require_isBuffer.isBuffer;
exports.isDate = require_isDate.isDate;
exports.isEmptyObject = require_isEmptyObject.isEmptyObject;
exports.isEqual = require_isEqual.isEqual;
exports.isEqualWith = require_isEqualWith.isEqualWith;
exports.isError = require_isError.isError;
exports.isFile = require_isFile.isFile;
exports.isFunction = require_isFunction.isFunction;
exports.isJSON = require_isJSON.isJSON;
exports.isJSONArray = require_isJSONValue.isJSONArray;
exports.isJSONObject = require_isJSONValue.isJSONObject;
exports.isJSONValue = require_isJSONValue.isJSONValue;
exports.isLength = require_isLength.isLength;
exports.isMap = require_isMap.isMap;
exports.isNil = require_isNil.isNil;
exports.isNode = require_isNode.isNode;
exports.isNotNil = require_isNotNil.isNotNil;
exports.isNull = require_isNull.isNull;
exports.isNumber = require_isNumber.isNumber;
exports.isPlainObject = require_isPlainObject.isPlainObject;
exports.isPrimitive = require_isPrimitive.isPrimitive;
exports.isPromise = require_isPromise.isPromise;
exports.isRegExp = require_isRegExp.isRegExp;
exports.isSet = require_isSet.isSet;
exports.isString = require_isString.isString;
exports.isSubset = require_isSubset.isSubset;
exports.isSubsetWith = require_isSubsetWith.isSubsetWith;
exports.isSymbol = require_isSymbol.isSymbol;
exports.isTypedArray = require_isTypedArray.isTypedArray;
exports.isUndefined = require_isUndefined.isUndefined;
exports.isWeakMap = require_isWeakMap.isWeakMap;
exports.isWeakSet = require_isWeakSet.isWeakSet;
exports.kebabCase = require_kebabCase.kebabCase;
exports.keyBy = require_keyBy.keyBy;
exports.last = require_last.last;
exports.limitAsync = require_limitAsync.limitAsync;
exports.lowerCase = require_lowerCase.lowerCase;
exports.lowerFirst = require_lowerFirst.lowerFirst;
exports.mapAsync = require_mapAsync.mapAsync;
exports.mapKeys = require_mapKeys.mapKeys;
exports.mapValues = require_mapValues.mapValues;
exports.maxBy = require_maxBy.maxBy;
exports.mean = require_mean.mean;
exports.meanBy = require_meanBy.meanBy;
exports.median = require_median.median;
exports.medianBy = require_medianBy.medianBy;
exports.memoize = require_memoize.memoize;
exports.merge = require_merge.merge;
exports.mergeWith = require_mergeWith.mergeWith;
exports.minBy = require_minBy.minBy;
exports.negate = require_negate.negate;
exports.noop = require_noop.noop;
exports.omit = require_omit.omit;
exports.omitBy = require_omitBy.omitBy;
exports.once = require_once.once;
exports.orderBy = require_orderBy.orderBy;
exports.pad = require_pad.pad;
exports.partial = require_partial.partial;
exports.partialRight = require_partialRight.partialRight;
exports.partition = require_partition.partition;
exports.pascalCase = require_pascalCase.pascalCase;
exports.percentile = require_percentile.percentile;
exports.pick = require_pick.pick;
exports.pickBy = require_pickBy.pickBy;
exports.pull = require_pull.pull;
exports.pullAt = require_pullAt.pullAt;
exports.random = require_random.random;
exports.randomInt = require_randomInt.randomInt;
exports.range = require_range.range;
exports.rangeRight = require_rangeRight.rangeRight;
exports.reduceAsync = require_reduceAsync.reduceAsync;
exports.remove = require_remove.remove;
exports.rest = require_rest.rest;
exports.retry = require_retry.retry;
exports.reverseString = require_reverseString.reverseString;
exports.round = require_round.round;
exports.sample = require_sample.sample;
exports.sampleSize = require_sampleSize.sampleSize;
exports.shuffle = require_shuffle.shuffle;
exports.snakeCase = require_snakeCase.snakeCase;
exports.sortBy = require_sortBy.sortBy;
exports.sortKeys = require_sortKeys.sortKeys;
exports.spread = require_spread.spread;
exports.startCase = require_startCase.startCase;
exports.sum = require_sum.sum;
exports.sumBy = require_sumBy.sumBy;
exports.tail = require_tail.tail;
exports.take = require_take.take;
exports.takeRight = require_takeRight.takeRight;
exports.takeRightWhile = require_takeRightWhile.takeRightWhile;
exports.takeWhile = require_takeWhile.takeWhile;
exports.throttle = require_throttle.throttle;
exports.timeout = require_timeout.timeout;
exports.toCamelCaseKeys = require_toCamelCaseKeys.toCamelCaseKeys;
exports.toFilled = require_toFilled.toFilled;
exports.toMerged = require_toMerged.toMerged;
exports.toSnakeCaseKeys = require_toSnakeCaseKeys.toSnakeCaseKeys;
exports.trim = require_trim.trim;
exports.trimEnd = require_trimEnd.trimEnd;
exports.trimStart = require_trimStart.trimStart;
exports.unary = require_unary.unary;
exports.unescape = require_unescape.unescape;
exports.union = require_union.union;
exports.unionBy = require_unionBy.unionBy;
exports.unionWith = require_unionWith.unionWith;
exports.uniq = require_uniq.uniq;
exports.uniqBy = require_uniqBy.uniqBy;
exports.uniqWith = require_uniqWith.uniqWith;
exports.unzip = require_unzip.unzip;
exports.unzipWith = require_unzipWith.unzipWith;
exports.upperCase = require_upperCase.upperCase;
exports.upperFirst = require_upperFirst.upperFirst;
exports.windowed = require_windowed.windowed;
exports.withTimeout = require_withTimeout.withTimeout;
exports.without = require_without.without;
exports.words = require_words.words;
exports.xor = require_xor.xor;
exports.xorBy = require_xorBy.xorBy;
exports.xorWith = require_xorWith.xorWith;
exports.zip = require_zip.zip;
exports.zipObject = require_zipObject.zipObject;
exports.zipWith = require_zipWith.zipWith;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/math/clamp.js"
/*!********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/math/clamp.js ***!
  \********************************************************/
(__unused_webpack_module, exports) {

//#region src/math/clamp.ts
/**
* Clamps a number within the specified bounds.
*
* This function takes a number and one or two bounds, and returns the number clamped within the specified bounds.
* If only one bound is provided, it returns the minimum of the value and the bound.
*
* @param value - The number to clamp.
* @param bound1 - The minimum bound to clamp the number, or the maximum bound if bound2 is not provided.
* @param [bound2] - The maximum bound to clamp the number. If not provided, the function will only consider bound1 as the upper limit.
* @returns The clamped number within the specified bounds.
*
* @example
* const result1 = clamp(10, 5); // result1 will be 5, as 10 is clamped to the bound 5
* const result2 = clamp(10, 5, 15); // result2 will be 10, as it is within the bounds 5 and 15
* const result3 = clamp(2, 5, 15); // result3 will be 5, as 2 is clamped to the lower bound 5
* const result4 = clamp(20, 5, 15); // result4 will be 15, as 20 is clamped to the upper bound 15
*/
function clamp(value, bound1, bound2) {
	if (bound2 == null) return Math.min(value, bound1);
	return Math.min(Math.max(value, bound1), bound2);
}
//#endregion
exports.clamp = clamp;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/math/inRange.js"
/*!**********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/math/inRange.js ***!
  \**********************************************************/
(__unused_webpack_module, exports) {

//#region src/math/inRange.ts
/**
* Checks if the value is within a specified range.
*
* @param value The value to check.
* @param minimum The lower bound of the range (inclusive).
* @param maximum The upper bound of the range (exclusive).
* @returns `true` if the value is within the specified range, otherwise `false`.
* @throws {Error} Throws an error if the `minimum` is greater or equal than the `maximum`.
*
* @example
* const result1 = inRange(3, 5); // result1 will be true.
* const result2 = inRange(1, 2, 5); // result2 will be false.
* const result3 = inRange(1, 5, 2); // If the minimum is greater or equal than the maximum, an error is thrown.
*/
function inRange(value, minimum, maximum) {
	if (maximum == null) {
		maximum = minimum;
		minimum = 0;
	}
	if (minimum >= maximum) throw new Error("The maximum value must be greater than the minimum value.");
	return minimum <= value && value < maximum;
}
//#endregion
exports.inRange = inRange;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/math/index.js"
/*!********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/math/index.js ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_random = __webpack_require__(/*! ./random.js */ "../../node_modules/es-toolkit/dist/math/random.js");
const require_randomInt = __webpack_require__(/*! ./randomInt.js */ "../../node_modules/es-toolkit/dist/math/randomInt.js");
const require_clamp = __webpack_require__(/*! ./clamp.js */ "../../node_modules/es-toolkit/dist/math/clamp.js");
const require_inRange = __webpack_require__(/*! ./inRange.js */ "../../node_modules/es-toolkit/dist/math/inRange.js");
const require_sum = __webpack_require__(/*! ./sum.js */ "../../node_modules/es-toolkit/dist/math/sum.js");
const require_mean = __webpack_require__(/*! ./mean.js */ "../../node_modules/es-toolkit/dist/math/mean.js");
const require_sumBy = __webpack_require__(/*! ./sumBy.js */ "../../node_modules/es-toolkit/dist/math/sumBy.js");
const require_meanBy = __webpack_require__(/*! ./meanBy.js */ "../../node_modules/es-toolkit/dist/math/meanBy.js");
const require_median = __webpack_require__(/*! ./median.js */ "../../node_modules/es-toolkit/dist/math/median.js");
const require_medianBy = __webpack_require__(/*! ./medianBy.js */ "../../node_modules/es-toolkit/dist/math/medianBy.js");
const require_percentile = __webpack_require__(/*! ./percentile.js */ "../../node_modules/es-toolkit/dist/math/percentile.js");
const require_range = __webpack_require__(/*! ./range.js */ "../../node_modules/es-toolkit/dist/math/range.js");
const require_rangeRight = __webpack_require__(/*! ./rangeRight.js */ "../../node_modules/es-toolkit/dist/math/rangeRight.js");
const require_round = __webpack_require__(/*! ./round.js */ "../../node_modules/es-toolkit/dist/math/round.js");
exports.clamp = require_clamp.clamp;
exports.inRange = require_inRange.inRange;
exports.mean = require_mean.mean;
exports.meanBy = require_meanBy.meanBy;
exports.median = require_median.median;
exports.medianBy = require_medianBy.medianBy;
exports.percentile = require_percentile.percentile;
exports.random = require_random.random;
exports.randomInt = require_randomInt.randomInt;
exports.range = require_range.range;
exports.rangeRight = require_rangeRight.rangeRight;
exports.round = require_round.round;
exports.sum = require_sum.sum;
exports.sumBy = require_sumBy.sumBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/math/mean.js"
/*!*******************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/math/mean.js ***!
  \*******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_sum = __webpack_require__(/*! ./sum.js */ "../../node_modules/es-toolkit/dist/math/sum.js");
//#region src/math/mean.ts
/**
* Calculates the average of an array of numbers.
*
* If the array is empty, this function returns `NaN`.
*
* @param nums - An array of numbers to calculate the average.
* @returns The average of all the numbers in the array.
*
* @example
* const numbers = [1, 2, 3, 4, 5];
* const result = mean(numbers);
* // result will be 3
*/
function mean(nums) {
	return require_sum.sum(nums) / nums.length;
}
//#endregion
exports.mean = mean;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/math/meanBy.js"
/*!*********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/math/meanBy.js ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_sumBy = __webpack_require__(/*! ./sumBy.js */ "../../node_modules/es-toolkit/dist/math/sumBy.js");
//#region src/math/meanBy.ts
/**
* Calculates the average of an array of numbers when applying
* the `getValue` function to each element.
*
* If the array is empty, this function returns `NaN`.
*
* @template T - The type of elements in the array.
* @param items An array to calculate the average.
* @param getValue A function that selects a numeric value from each element.
* @returns The average of all the numbers as determined by the `getValue` function.
*
* @example
* meanBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // Returns: 2
* meanBy([], x => x.a); // Returns: NaN
*/
function meanBy(items, getValue) {
	return require_sumBy.sumBy(items, (item) => getValue(item)) / items.length;
}
//#endregion
exports.meanBy = meanBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/math/median.js"
/*!*********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/math/median.js ***!
  \*********************************************************/
(__unused_webpack_module, exports) {

//#region src/math/median.ts
/**
* Calculates the median of an array of numbers.
*
* The median is the middle value of a sorted array.
* If the array has an odd number of elements, the median is the middle value.
* If the array has an even number of elements, it returns the average of the two middle values.
*
* If the array is empty, this function returns `NaN`.
*
* @param nums - An array of numbers to calculate the median.
* @returns The median of all the numbers in the array.
*
* @example
* const arrayWithOddNumberOfElements = [1, 2, 3, 4, 5];
* const result = median(arrayWithOddNumberOfElements);
* // result will be 3
*
* @example
* const arrayWithEvenNumberOfElements = [1, 2, 3, 4];
* const result = median(arrayWithEvenNumberOfElements);
* // result will be 2.5
*/
function median(nums) {
	if (nums.length === 0) return NaN;
	const sorted = nums.slice().sort((a, b) => a - b);
	const middleIndex = Math.floor(sorted.length / 2);
	if (sorted.length % 2 === 0) return (sorted[middleIndex - 1] + sorted[middleIndex]) / 2;
	else return sorted[middleIndex];
}
//#endregion
exports.median = median;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/math/medianBy.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/math/medianBy.js ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_median = __webpack_require__(/*! ./median.js */ "../../node_modules/es-toolkit/dist/math/median.js");
//#region src/math/medianBy.ts
/**
* Calculates the median of an array of elements when applying
* the `getValue` function to each element.
*
* The median is the middle value of a sorted array.
* If the array has an odd number of elements, the median is the middle value.
* If the array has an even number of elements, it returns the average of the two middle values.
*
* If the array is empty, this function returns `NaN`.
*
* @template T - The type of elements in the array.
* @param items An array to calculate the median.
* @param getValue A function that selects a numeric value from each element.
* @returns The median of all the numbers as determined by the `getValue` function.
*
* @example
* medianBy([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }], x => x.a); // Returns: 3
* medianBy([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }], x => x.a); // Returns: 2.5
* medianBy([], x => x.a); // Returns: NaN
*/
function medianBy(items, getValue) {
	const nums = items.map((x) => getValue(x));
	return require_median.median(nums);
}
//#endregion
exports.medianBy = medianBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/math/percentile.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/math/percentile.js ***!
  \*************************************************************/
(__unused_webpack_module, exports) {

//#region src/math/percentile.ts
/**
* Calculates the value at the given percentile of an array of numbers.
*
* Sorts the array in ascending order and returns the element at the nearest rank.
* See {@link https://en.wikipedia.org/wiki/Percentile#The_nearest-rank_method | Nearest rank method}.
*
* `NaN` values are sorted as the smallest values. Returns `NaN` if the array is empty.
*
* @param arr - An array of numbers to calculate the percentile.
* @param percentile - The percentile to compute, in the range `[0, 100]`.
* @returns The value at the given percentile.
* @throws {Error} Throws an error if `percentile` is not a number, less than `0`, or greater than `100`.
*
* @example
* percentile([1, 2, 3, 4, 5], 50);
* // Returns 3
*
* @example
* percentile([1, 2, 3, 4, 5], 75);
* // Returns 4
*
* @example
* percentile([5, 1, 4, 2, 3], 0);
* // Returns 1
*/
function percentile(arr, percentile) {
	if (Number.isNaN(Number(percentile))) throw new Error(`Expected percentile to be a number but got "${percentile}".`);
	if (percentile < 0) throw new Error(`Expected percentile to be >= 0 but got "${percentile}".`);
	if (percentile > 100) throw new Error(`Expected percentile to be <= 100 but got "${percentile}".`);
	if (arr.length === 0) return NaN;
	const sorted = arr.slice().sort((a, b) => {
		return (Number.isNaN(a) ? Number.NEGATIVE_INFINITY : a) - (Number.isNaN(b) ? Number.NEGATIVE_INFINITY : b);
	});
	if (percentile === 0) return sorted[0];
	return sorted[Math.ceil(sorted.length * (percentile / 100)) - 1];
}
//#endregion
exports.percentile = percentile;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/math/random.js"
/*!*********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/math/random.js ***!
  \*********************************************************/
(__unused_webpack_module, exports) {

//#region src/math/random.ts
/**
* Generate a random number within the given range.
*
* @param minimum - The lower bound (inclusive).
* @param maximum - The upper bound (exclusive).
* @returns A random number between minimum (inclusive) and maximum (exclusive). The number can be an integer or a decimal.
* @throws {Error} Throws an error if `maximum` is not greater than `minimum`.
*
* @example
* const result1 = random(0, 5); // Returns a random number between 0 and 5.
* const result2 = random(5, 0); // If the minimum is greater than the maximum, an error is thrown.
* const result3 = random(5, 5); // If the minimum is equal to the maximum, an error is thrown.
*/
function random(minimum, maximum) {
	if (maximum == null) {
		maximum = minimum;
		minimum = 0;
	}
	if (minimum >= maximum) throw new Error("Invalid input: The maximum value must be greater than the minimum value.");
	return Math.random() * (maximum - minimum) + minimum;
}
//#endregion
exports.random = random;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/math/randomInt.js"
/*!************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/math/randomInt.js ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_random = __webpack_require__(/*! ./random.js */ "../../node_modules/es-toolkit/dist/math/random.js");
//#region src/math/randomInt.ts
/**
* Generates a random integer between minimum (inclusive) and maximum (exclusive).
*
* If only one argument is provided, a number between `0` and the given number is returned.
*
* @param minimum - The lower bound (inclusive).
* @param maximum - The upper bound (exclusive).
* @returns A random integer between minimum (inclusive) and maximum (exclusive).
* @throws {Error} Throws an error if `maximum` is not greater than `minimum`.
*
* @example
* const result = randomInt(0, 5); // result will be a random integer between 0 (inclusive) and 5 (exclusive)
* const result2 = randomInt(5, 0); // This will throw an error
*/
function randomInt(minimum, maximum) {
	return Math.floor(require_random.random(minimum, maximum));
}
//#endregion
exports.randomInt = randomInt;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/math/range.js"
/*!********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/math/range.js ***!
  \********************************************************/
(__unused_webpack_module, exports) {

//#region src/math/range.ts
/**
* Returns an array of numbers from `start` (inclusive) to `end` (exclusive), incrementing by `step`.
*
* @param start - The starting number of the range (inclusive).
* @param end - The end number of the range (exclusive).
* @param step - The step value for the range.
* @returns An array of numbers from `start` (inclusive) to `end` (exclusive) with the specified `step`.
* @throws {Error} Throws an error if the step value is not a non-zero integer.
*
* @example
* // Returns [0, 1, 2, 3]
* range(4);
*
* @example
* // Returns [0, -1, -2, -3]
* range(0, -4, -1);
*/
function range(start, end, step = 1) {
	if (end == null) {
		end = start;
		start = 0;
	}
	if (!Number.isInteger(step) || step === 0) throw new Error(`The step value must be a non-zero integer.`);
	const length = Math.max(Math.ceil((end - start) / step), 0);
	const result = new Array(length);
	for (let i = 0; i < length; i++) result[i] = start + i * step;
	return result;
}
//#endregion
exports.range = range;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/math/rangeRight.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/math/rangeRight.js ***!
  \*************************************************************/
(__unused_webpack_module, exports) {

//#region src/math/rangeRight.ts
/**
* Returns an array of numbers from `end` (exclusive) to `start` (inclusive), decrementing by `step`.
*
* @param start - The starting number of the range (inclusive).
* @param end - The end number of the range (exclusive).
* @param step - The step value for the range.
* @returns An array of numbers from `end` (exclusive) to `start` (inclusive) with the specified `step`.
* @throws {Error} Throws an error if the step value is not a non-zero integer.
*
* @example
* // Returns [3, 2, 1, 0]
* rangeRight(4);
*
* @example
* // Returns [-3, -2, -1, 0]
* rangeRight(0, -4, -1);
*/
function rangeRight(start, end, step = 1) {
	if (end == null) {
		end = start;
		start = 0;
	}
	if (!Number.isInteger(step) || step === 0) throw new Error(`The step value must be a non-zero integer.`);
	const length = Math.max(Math.ceil((end - start) / step), 0);
	const result = new Array(length);
	for (let i = 0; i < length; i++) result[i] = start + (length - i - 1) * step;
	return result;
}
//#endregion
exports.rangeRight = rangeRight;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/math/round.js"
/*!********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/math/round.js ***!
  \********************************************************/
(__unused_webpack_module, exports) {

//#region src/math/round.ts
/**
* Rounds a number to a specified precision.
*
* This function takes a number and an optional precision value, and returns the number rounded
* to the specified number of decimal places.
*
* @param value - The number to round.
* @param [precision=0] - The number of decimal places to round to. Defaults to 0.
* @returns The rounded number.
* @throws {Error} Throws an error if `Precision` is not integer.
*
* @example
* const result1 = round(1.2345); // result1 will be 1
* const result2 = round(1.2345, 2); // result2 will be 1.23
* const result3 = round(1.2345, 3); // result3 will be 1.235
* const result4 = round(1.2345, 3.1); // This will throw an error
*/
function round(value, precision = 0) {
	if (!Number.isInteger(precision)) throw new Error("Precision must be an integer.");
	const multiplier = Math.pow(10, precision);
	return Math.round(value * multiplier) / multiplier;
}
//#endregion
exports.round = round;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/math/sum.js"
/*!******************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/math/sum.js ***!
  \******************************************************/
(__unused_webpack_module, exports) {

//#region src/math/sum.ts
/**
* Calculates the sum of an array of numbers.
*
* This function takes an array of numbers and returns the sum of all the elements in the array.
*
* @param nums - An array of numbers to be summed.
* @returns The sum of all the numbers in the array.
*
* @example
* const numbers = [1, 2, 3, 4, 5];
* const result = sum(numbers);
* // result will be 15
*/
function sum(nums) {
	let result = 0;
	for (let i = 0; i < nums.length; i++) result += nums[i];
	return result;
}
//#endregion
exports.sum = sum;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/math/sumBy.js"
/*!********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/math/sumBy.js ***!
  \********************************************************/
(__unused_webpack_module, exports) {

//#region src/math/sumBy.ts
/**
* Calculates the sum of an array of numbers when applying
* the `getValue` function to each element.
*
* If the array is empty, this function returns `0`.
*
* @template T - The type of elements in the array.
* @param items - An array to calculate the sum.
* @param getValue - A function that selects a numeric value from each element.
*   It receives the element and its zero‑based index in the array.
* @returns The sum of all the numbers as determined by the `getValue` function.
*
* @example
* sumBy([{ a: 1 }, { a: 2 }, { a: 3 }], (x, i) => x.a * i); // Returns: 8
* sumBy([], () => 1); // Returns: 0
*/
function sumBy(items, getValue) {
	let result = 0;
	for (let i = 0; i < items.length; i++) result += getValue(items[i], i);
	return result;
}
//#endregion
exports.sumBy = sumBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/clone.js"
/*!**********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/clone.js ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_isPrimitive = __webpack_require__(/*! ../predicate/isPrimitive.js */ "../../node_modules/es-toolkit/dist/predicate/isPrimitive.js");
const require_isTypedArray = __webpack_require__(/*! ../predicate/isTypedArray.js */ "../../node_modules/es-toolkit/dist/predicate/isTypedArray.js");
//#region src/object/clone.ts
/**
* Creates a shallow clone of the given object.
*
* @template T - The type of the object.
* @param obj - The object to clone.
* @returns A shallow clone of the given object.
*
* @example
* // Clone a primitive value
* const num = 29;
* const clonedNum = clone(num);
* console.log(clonedNum); // 29
* console.log(clonedNum === num); // true
*
* @example
* // Clone an array
* const arr = [1, 2, 3];
* const clonedArr = clone(arr);
* console.log(clonedArr); // [1, 2, 3]
* console.log(clonedArr === arr); // false
*
* @example
* // Clone an object
* const obj = { a: 1, b: 'es-toolkit', c: [1, 2, 3] };
* const clonedObj = clone(obj);
* console.log(clonedObj); // { a: 1, b: 'es-toolkit', c: [1, 2, 3] }
* console.log(clonedObj === obj); // false
*/
function clone(obj) {
	if (require_isPrimitive.isPrimitive(obj)) return obj;
	if (Array.isArray(obj) || require_isTypedArray.isTypedArray(obj) || obj instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && obj instanceof SharedArrayBuffer) return obj.slice(0);
	const prototype = Object.getPrototypeOf(obj);
	if (prototype == null) return Object.assign(Object.create(prototype), obj);
	const Constructor = prototype.constructor;
	if (obj instanceof Date || obj instanceof Map || obj instanceof Set) return new Constructor(obj);
	if (obj instanceof RegExp) {
		const newRegExp = new Constructor(obj);
		newRegExp.lastIndex = obj.lastIndex;
		return newRegExp;
	}
	if (obj instanceof DataView) return new Constructor(obj.buffer.slice(0));
	if (obj instanceof Error) {
		let newError;
		if (obj instanceof AggregateError) newError = new Constructor(obj.errors, obj.message, { cause: obj.cause });
		else newError = new Constructor(obj.message, { cause: obj.cause });
		newError.stack = obj.stack;
		Object.assign(newError, obj);
		return newError;
	}
	if (typeof File !== "undefined" && obj instanceof File) return new Constructor([obj], obj.name, {
		type: obj.type,
		lastModified: obj.lastModified
	});
	if (typeof obj === "object") return Object.assign(Object.create(prototype), obj);
	return obj;
}
//#endregion
exports.clone = clone;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/cloneDeep.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/cloneDeep.js ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_cloneDeepWith = __webpack_require__(/*! ./cloneDeepWith.js */ "../../node_modules/es-toolkit/dist/object/cloneDeepWith.js");
//#region src/object/cloneDeep.ts
/**
* Creates a deep clone of the given object.
*
* @template T - The type of the object.
* @param obj - The object to clone.
* @returns A deep clone of the given object.
*
* @example
* // Clone a primitive value
* const num = 29;
* const clonedNum = cloneDeep(num);
* console.log(clonedNum); // 29
* console.log(clonedNum === num); // true
*
* @example
* // Clone an array
* const arr = [1, 2, 3];
* const clonedArr = cloneDeep(arr);
* console.log(clonedArr); // [1, 2, 3]
* console.log(clonedArr === arr); // false
*
* @example
* // Clone an array with nested objects
* const arr = [1, { a: 1 }, [1, 2, 3]];
* const clonedArr = cloneDeep(arr);
* arr[1].a = 2;
* console.log(arr); // [1, { a: 2 }, [1, 2, 3]]
* console.log(clonedArr); // [1, { a: 1 }, [1, 2, 3]]
* console.log(clonedArr === arr); // false
*
* @example
* // Clone an object
* const obj = { a: 1, b: 'es-toolkit', c: [1, 2, 3] };
* const clonedObj = cloneDeep(obj);
* console.log(clonedObj); // { a: 1, b: 'es-toolkit', c: [1, 2, 3] }
* console.log(clonedObj === obj); // false
*
* @example
* // Clone an object with nested objects
* const obj = { a: 1, b: { c: 1 } };
* const clonedObj = cloneDeep(obj);
* obj.b.c = 2;
* console.log(obj); // { a: 1, b: { c: 2 } }
* console.log(clonedObj); // { a: 1, b: { c: 1 } }
* console.log(clonedObj === obj); // false
*/
function cloneDeep(obj) {
	return require_cloneDeepWith.cloneDeepWithImpl(obj, void 0, obj, /* @__PURE__ */ new Map(), void 0);
}
//#endregion
exports.cloneDeep = cloneDeep;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/cloneDeepWith.js"
/*!******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/cloneDeepWith.js ***!
  \******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_isPrimitive = __webpack_require__(/*! ../predicate/isPrimitive.js */ "../../node_modules/es-toolkit/dist/predicate/isPrimitive.js");
const require_isTypedArray = __webpack_require__(/*! ../predicate/isTypedArray.js */ "../../node_modules/es-toolkit/dist/predicate/isTypedArray.js");
const require_getSymbols = __webpack_require__(/*! ../compat/_internal/getSymbols.js */ "../../node_modules/es-toolkit/dist/compat/_internal/getSymbols.js");
const require_getTag = __webpack_require__(/*! ../compat/_internal/getTag.js */ "../../node_modules/es-toolkit/dist/compat/_internal/getTag.js");
const require_tags = __webpack_require__(/*! ../compat/_internal/tags.js */ "../../node_modules/es-toolkit/dist/compat/_internal/tags.js");
const require_isBuffer = __webpack_require__(/*! ../predicate/isBuffer.js */ "../../node_modules/es-toolkit/dist/predicate/isBuffer.js");
//#region src/object/cloneDeepWith.ts
/**
* Deeply clones the given object.
*
* You can customize the deep cloning process using the `cloneValue` function.
* The function takes the current value `value`, the property name `key`, and the entire object `obj` as arguments.
* If the function returns a value, that value is used;
* if it returns `undefined`, the default cloning method is used.
*
* @template T - The type of the object.
* @param obj - The object to clone.
* @param [cloneValue] - A function to customize the cloning process.
* @returns A deep clone of the given object.
*
* @example
* // Clone a primitive value
* const num = 29;
* const clonedNum = cloneDeepWith(num);
* console.log(clonedNum); // 29
* console.log(clonedNum === num); // true
*
* @example
* // Clone an object with a customizer
* const obj = { a: 1, b: 2 };
* const clonedObj = cloneDeepWith(obj, (value) => {
*   if (typeof value === 'number') {
*     return value * 2; // Double the number
*   }
* });
* console.log(clonedObj); // { a: 2, b: 4 }
* console.log(clonedObj === obj); // false
*
* @example
* // Clone an array with a customizer
* const arr = [1, 2, 3];
* const clonedArr = cloneDeepWith(arr, (value) => {
*   return value + 1; // Increment each value
* });
* console.log(clonedArr); // [2, 3, 4]
* console.log(clonedArr === arr); // false
*/
function cloneDeepWith(obj, cloneValue) {
	return cloneDeepWithImpl(obj, void 0, obj, /* @__PURE__ */ new Map(), cloneValue);
}
function cloneDeepWithImpl(valueToClone, keyToClone, objectToClone, stack = /* @__PURE__ */ new Map(), cloneValue = void 0) {
	const cloned = cloneValue?.(valueToClone, keyToClone, objectToClone, stack);
	if (cloned !== void 0) return cloned;
	if (require_isPrimitive.isPrimitive(valueToClone)) return valueToClone;
	if (stack.has(valueToClone)) return stack.get(valueToClone);
	if (Array.isArray(valueToClone)) {
		const result = new Array(valueToClone.length);
		stack.set(valueToClone, result);
		for (let i = 0; i < valueToClone.length; i++) result[i] = cloneDeepWithImpl(valueToClone[i], i, objectToClone, stack, cloneValue);
		if (Object.hasOwn(valueToClone, "index")) result.index = valueToClone.index;
		if (Object.hasOwn(valueToClone, "input")) result.input = valueToClone.input;
		return result;
	}
	if (valueToClone instanceof Date) return new Date(valueToClone.getTime());
	if (valueToClone instanceof RegExp) {
		const result = new RegExp(valueToClone.source, valueToClone.flags);
		result.lastIndex = valueToClone.lastIndex;
		return result;
	}
	if (valueToClone instanceof Map) {
		const result = /* @__PURE__ */ new Map();
		stack.set(valueToClone, result);
		for (const [key, value] of valueToClone) result.set(key, cloneDeepWithImpl(value, key, objectToClone, stack, cloneValue));
		return result;
	}
	if (valueToClone instanceof Set) {
		const result = /* @__PURE__ */ new Set();
		stack.set(valueToClone, result);
		for (const value of valueToClone) result.add(cloneDeepWithImpl(value, void 0, objectToClone, stack, cloneValue));
		return result;
	}
	if (require_isBuffer.isBuffer(valueToClone)) return valueToClone.subarray();
	if (require_isTypedArray.isTypedArray(valueToClone)) {
		const result = new (Object.getPrototypeOf(valueToClone)).constructor(valueToClone.length);
		stack.set(valueToClone, result);
		for (let i = 0; i < valueToClone.length; i++) result[i] = cloneDeepWithImpl(valueToClone[i], i, objectToClone, stack, cloneValue);
		return result;
	}
	if (valueToClone instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && valueToClone instanceof SharedArrayBuffer) return valueToClone.slice(0);
	if (valueToClone instanceof DataView) {
		const result = new DataView(valueToClone.buffer.slice(0), valueToClone.byteOffset, valueToClone.byteLength);
		stack.set(valueToClone, result);
		copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
		return result;
	}
	if (typeof File !== "undefined" && valueToClone instanceof File) {
		const result = new File([valueToClone], valueToClone.name, { type: valueToClone.type });
		stack.set(valueToClone, result);
		copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
		return result;
	}
	if (typeof Blob !== "undefined" && valueToClone instanceof Blob) {
		const result = new Blob([valueToClone], { type: valueToClone.type });
		stack.set(valueToClone, result);
		copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
		return result;
	}
	if (valueToClone instanceof Error) {
		const result = structuredClone(valueToClone);
		stack.set(valueToClone, result);
		result.message = valueToClone.message;
		result.name = valueToClone.name;
		result.stack = valueToClone.stack;
		result.cause = valueToClone.cause;
		result.constructor = valueToClone.constructor;
		copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
		return result;
	}
	if (valueToClone instanceof Boolean) {
		const result = new Boolean(valueToClone.valueOf());
		stack.set(valueToClone, result);
		copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
		return result;
	}
	if (valueToClone instanceof Number) {
		const result = new Number(valueToClone.valueOf());
		stack.set(valueToClone, result);
		copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
		return result;
	}
	if (valueToClone instanceof String) {
		const result = new String(valueToClone.valueOf());
		stack.set(valueToClone, result);
		copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
		return result;
	}
	if (typeof valueToClone === "object" && isCloneableObject(valueToClone)) {
		const result = Object.create(Object.getPrototypeOf(valueToClone));
		stack.set(valueToClone, result);
		copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
		return result;
	}
	return valueToClone;
}
function copyProperties(target, source, objectToClone = target, stack, cloneValue) {
	const keys = [...Object.keys(source), ...require_getSymbols.getSymbols(source)];
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		const descriptor = Object.getOwnPropertyDescriptor(target, key);
		if (descriptor == null || descriptor.writable) target[key] = cloneDeepWithImpl(source[key], key, objectToClone, stack, cloneValue);
	}
}
function isCloneableObject(object) {
	switch (require_getTag.getTag(object)) {
		case require_tags.argumentsTag:
		case require_tags.arrayTag:
		case require_tags.arrayBufferTag:
		case require_tags.dataViewTag:
		case require_tags.booleanTag:
		case require_tags.dateTag:
		case require_tags.float32ArrayTag:
		case require_tags.float64ArrayTag:
		case require_tags.int8ArrayTag:
		case require_tags.int16ArrayTag:
		case require_tags.int32ArrayTag:
		case require_tags.mapTag:
		case require_tags.numberTag:
		case require_tags.objectTag:
		case require_tags.regexpTag:
		case require_tags.setTag:
		case require_tags.stringTag:
		case require_tags.symbolTag:
		case require_tags.uint8ArrayTag:
		case require_tags.uint8ClampedArrayTag:
		case require_tags.uint16ArrayTag:
		case require_tags.uint32ArrayTag: return true;
		default: return false;
	}
}
//#endregion
exports.cloneDeepWith = cloneDeepWith;
exports.cloneDeepWithImpl = cloneDeepWithImpl;
exports.copyProperties = copyProperties;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/findKey.js"
/*!************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/findKey.js ***!
  \************************************************************/
(__unused_webpack_module, exports) {

//#region src/object/findKey.ts
/**
* Finds the key of the first element in the object that satisfies the provided testing function.
*
* @param obj - The object to search.
* @param predicate - The function to execute on each value in the object. It takes three arguments:
*   - value: The current value being processed in the object.
*   - key: The key of the current value being processed in the object.
*   - obj: The object that findKey was called upon.
* @returns The key of the first element in the object that passes the test, or undefined if no element passes.
*
* @example
* const users = {
*   'barney':  { 'age': 36, 'active': true },
*   'fred':    { 'age': 40, 'active': false },
*   'pebbles': { 'age': 1,  'active': true }
* };
* findKey(users, function(o) { return o.age < 40; }); => 'barney'
*/
function findKey(obj, predicate) {
	return Object.keys(obj).find((key) => predicate(obj[key], key, obj));
}
//#endregion
exports.findKey = findKey;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/flattenObject.js"
/*!******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/flattenObject.js ***!
  \******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_isPlainObject = __webpack_require__(/*! ../predicate/isPlainObject.js */ "../../node_modules/es-toolkit/dist/predicate/isPlainObject.js");
//#region src/object/flattenObject.ts
/**
* Flattens a nested object into a single level object with delimiter-separated keys.
*
* @param object - The object to flatten.
* @param [options.delimiter='.'] - The delimiter to use between nested keys.
* @returns The flattened object.
*
* @example
* const nestedObject = {
*   a: {
*     b: {
*       c: 1
*     }
*   },
*   d: [2, 3]
* };
*
* const flattened = flattenObject(nestedObject);
* console.log(flattened);
* // Output:
* // {
* //   'a.b.c': 1,
* //   'd.0': 2,
* //   'd.1': 3
* // }
*/
function flattenObject(object, { delimiter = "." } = {}) {
	return flattenObjectImpl(object, "", delimiter);
}
function flattenObjectImpl(object, prefix, delimiter) {
	const result = {};
	const keys = Object.keys(object);
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		const value = object[key];
		const prefixedKey = prefix ? `${prefix}${delimiter}${key}` : key;
		if (require_isPlainObject.isPlainObject(value) && Object.keys(value).length > 0) {
			Object.assign(result, flattenObjectImpl(value, prefixedKey, delimiter));
			continue;
		}
		if (Array.isArray(value) && value.length > 0) {
			Object.assign(result, flattenObjectImpl(value, prefixedKey, delimiter));
			continue;
		}
		result[prefixedKey] = value;
	}
	return result;
}
//#endregion
exports.flattenObject = flattenObject;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/index.js"
/*!**********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/index.js ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_clone = __webpack_require__(/*! ./clone.js */ "../../node_modules/es-toolkit/dist/object/clone.js");
const require_cloneDeepWith = __webpack_require__(/*! ./cloneDeepWith.js */ "../../node_modules/es-toolkit/dist/object/cloneDeepWith.js");
const require_cloneDeep = __webpack_require__(/*! ./cloneDeep.js */ "../../node_modules/es-toolkit/dist/object/cloneDeep.js");
const require_findKey = __webpack_require__(/*! ./findKey.js */ "../../node_modules/es-toolkit/dist/object/findKey.js");
const require_flattenObject = __webpack_require__(/*! ./flattenObject.js */ "../../node_modules/es-toolkit/dist/object/flattenObject.js");
const require_invert = __webpack_require__(/*! ./invert.js */ "../../node_modules/es-toolkit/dist/object/invert.js");
const require_mapKeys = __webpack_require__(/*! ./mapKeys.js */ "../../node_modules/es-toolkit/dist/object/mapKeys.js");
const require_mapValues = __webpack_require__(/*! ./mapValues.js */ "../../node_modules/es-toolkit/dist/object/mapValues.js");
const require_merge = __webpack_require__(/*! ./merge.js */ "../../node_modules/es-toolkit/dist/object/merge.js");
const require_mergeWith = __webpack_require__(/*! ./mergeWith.js */ "../../node_modules/es-toolkit/dist/object/mergeWith.js");
const require_omit = __webpack_require__(/*! ./omit.js */ "../../node_modules/es-toolkit/dist/object/omit.js");
const require_omitBy = __webpack_require__(/*! ./omitBy.js */ "../../node_modules/es-toolkit/dist/object/omitBy.js");
const require_pick = __webpack_require__(/*! ./pick.js */ "../../node_modules/es-toolkit/dist/object/pick.js");
const require_pickBy = __webpack_require__(/*! ./pickBy.js */ "../../node_modules/es-toolkit/dist/object/pickBy.js");
const require_sortKeys = __webpack_require__(/*! ./sortKeys.js */ "../../node_modules/es-toolkit/dist/object/sortKeys.js");
const require_toCamelCaseKeys = __webpack_require__(/*! ./toCamelCaseKeys.js */ "../../node_modules/es-toolkit/dist/object/toCamelCaseKeys.js");
const require_toMerged = __webpack_require__(/*! ./toMerged.js */ "../../node_modules/es-toolkit/dist/object/toMerged.js");
const require_toSnakeCaseKeys = __webpack_require__(/*! ./toSnakeCaseKeys.js */ "../../node_modules/es-toolkit/dist/object/toSnakeCaseKeys.js");
exports.clone = require_clone.clone;
exports.cloneDeep = require_cloneDeep.cloneDeep;
exports.cloneDeepWith = require_cloneDeepWith.cloneDeepWith;
exports.findKey = require_findKey.findKey;
exports.flattenObject = require_flattenObject.flattenObject;
exports.invert = require_invert.invert;
exports.mapKeys = require_mapKeys.mapKeys;
exports.mapValues = require_mapValues.mapValues;
exports.merge = require_merge.merge;
exports.mergeWith = require_mergeWith.mergeWith;
exports.omit = require_omit.omit;
exports.omitBy = require_omitBy.omitBy;
exports.pick = require_pick.pick;
exports.pickBy = require_pickBy.pickBy;
exports.sortKeys = require_sortKeys.sortKeys;
exports.toCamelCaseKeys = require_toCamelCaseKeys.toCamelCaseKeys;
exports.toMerged = require_toMerged.toMerged;
exports.toSnakeCaseKeys = require_toSnakeCaseKeys.toSnakeCaseKeys;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/invert.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/invert.js ***!
  \***********************************************************/
(__unused_webpack_module, exports) {

//#region src/object/invert.ts
/**
* Inverts the keys and values of an object. The keys of the input object become the values of the output object and vice versa.
*
* This function takes an object and creates a new object by inverting its keys and values. If the input object has duplicate values,
* the key of the last occurrence will be used as the value for the new key in the output object. It effectively creates a reverse mapping
* of the input object's key-value pairs.
*
* @template K - Type of the keys in the input object (string, number, symbol)
* @template V - Type of the values in the input object (string, number, symbol)
* @param obj - The input object whose keys and values are to be inverted
* @returns A new object with keys and values inverted
*
* @example
* invert({ a: 1, b: 2, c: 3 }); // { 1: 'a', 2: 'b', 3: 'c' }
* invert({ 1: 'a', 2: 'b', 3: 'c' }); // { a: '1', b: '2', c: '3' }
* invert({ a: 1, 2: 'b', c: 3, 4: 'd' }); // { 1: 'a', b: '2', 3: 'c', d: '4' }
* invert({ a: Symbol('sym1'), b: Symbol('sym2') }); // { [Symbol('sym1')]: 'a', [Symbol('sym2')]: 'b' }
*/
function invert(obj) {
	const result = {};
	const keys = Object.keys(obj);
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		const value = obj[key];
		result[value] = key;
	}
	return result;
}
//#endregion
exports.invert = invert;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/mapKeys.js"
/*!************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/mapKeys.js ***!
  \************************************************************/
(__unused_webpack_module, exports) {

//#region src/object/mapKeys.ts
/**
* Creates a new object with the same values as the given object, but with keys generated
* by running each own enumerable property of the object through the iteratee function.
*
* @template T - The type of the object.
* @template K - The type of the new keys generated by the iteratee function.
*
* @param object - The object to iterate over.
* @param getNewKey - The function invoked per own enumerable property.
* @returns Returns the new mapped object.
*
* @example
* // Example usage:
* const obj = { a: 1, b: 2 };
* const result = mapKeys(obj, (value, key) => key + value);
* console.log(result); // { a1: 1, b2: 2 }
*/
function mapKeys(object, getNewKey) {
	const result = {};
	const keys = Object.keys(object);
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		const value = object[key];
		result[getNewKey(value, key, object)] = value;
	}
	return result;
}
//#endregion
exports.mapKeys = mapKeys;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/mapValues.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/mapValues.js ***!
  \**************************************************************/
(__unused_webpack_module, exports) {

//#region src/object/mapValues.ts
/**
* Creates a new object with the same keys as the given object, but with values generated
* by running each own enumerable property of the object through the iteratee function.
*
* @template T - The type of the object.
* @template K - The type of the keys in the object.
* @template V - The type of the new values generated by the iteratee function.
*
* @param object - The object to iterate over.
* @param getNewValue - The function invoked per own enumerable property.
* @returns Returns the new mapped object.
*
* @example
* // Example usage:
* const obj = { a: 1, b: 2 };
* const result = mapValues(obj, (value) => value * 2);
* console.log(result); // { a: 2, b: 4 }
*/
function mapValues(object, getNewValue) {
	const result = {};
	const keys = Object.keys(object);
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		const value = object[key];
		result[key] = getNewValue(value, key, object);
	}
	return result;
}
//#endregion
exports.mapValues = mapValues;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/merge.js"
/*!**********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/merge.js ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_isPlainObject = __webpack_require__(/*! ../predicate/isPlainObject.js */ "../../node_modules/es-toolkit/dist/predicate/isPlainObject.js");
const require_isUnsafeProperty = __webpack_require__(/*! ../_internal/isUnsafeProperty.js */ "../../node_modules/es-toolkit/dist/_internal/isUnsafeProperty.js");
//#region src/object/merge.ts
/**
* Merges the properties of the source object into the target object.
*
* This function performs a deep merge, meaning nested objects and arrays are merged recursively.
* If a property in the source object is an array or an object and the corresponding property in the target object is also an array or object, they will be merged.
* If a property in the source object is undefined, it will not overwrite a defined property in the target object.
*
* Note that this function mutates the target object.
*
* @param target - The target object into which the source object properties will be merged. This object is modified in place.
* @param source - The source object whose properties will be merged into the target object.
* @returns The updated target object with properties from the source object merged in.
*
* @template T - Type of the target object.
* @template S - Type of the source object.
*
* @example
* const target = { a: 1, b: { x: 1, y: 2 } };
* const source = { b: { y: 3, z: 4 }, c: 5 };
*
* const result = merge(target, source);
* console.log(result);
* // Output: { a: 1, b: { x: 1, y: 3, z: 4 }, c: 5 }
*
* @example
* const target = { a: [1, 2], b: { x: 1 } };
* const source = { a: [3], b: { y: 2 } };
*
* const result = merge(target, source);
* console.log(result);
* // Output: { a: [3, 2], b: { x: 1, y: 2 } }
*
* @example
* const target = { a: null };
* const source = { a: [1, 2, 3] };
*
* const result = merge(target, source);
* console.log(result);
* // Output: { a: [1, 2, 3] }
*/
function merge(target, source) {
	const sourceKeys = Object.keys(source);
	for (let i = 0; i < sourceKeys.length; i++) {
		const key = sourceKeys[i];
		if (require_isUnsafeProperty.isUnsafeProperty(key)) continue;
		const sourceValue = source[key];
		const targetValue = target[key];
		if (isMergeableValue(sourceValue) && isMergeableValue(targetValue)) target[key] = merge(targetValue, sourceValue);
		else if (Array.isArray(sourceValue)) target[key] = merge([], sourceValue);
		else if (require_isPlainObject.isPlainObject(sourceValue)) target[key] = merge({}, sourceValue);
		else if (targetValue === void 0 || sourceValue !== void 0) target[key] = sourceValue;
	}
	return target;
}
function isMergeableValue(value) {
	return require_isPlainObject.isPlainObject(value) || Array.isArray(value);
}
//#endregion
exports.merge = merge;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/mergeWith.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/mergeWith.js ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_isPlainObject = __webpack_require__(/*! ../predicate/isPlainObject.js */ "../../node_modules/es-toolkit/dist/predicate/isPlainObject.js");
const require_isUnsafeProperty = __webpack_require__(/*! ../_internal/isUnsafeProperty.js */ "../../node_modules/es-toolkit/dist/_internal/isUnsafeProperty.js");
//#region src/object/mergeWith.ts
/**
* Merges the properties of the source object into the target object.
*
* You can provide a custom `merge` function to control how properties are merged. It should return the value to be set in the target object.
*
* If it returns `undefined`, a default deep merge will be applied for arrays and objects:
*
* - If a property in the source object is an array or an object and the corresponding property in the target object is also an array or object, they will be merged.
* - If a property in the source object is undefined, it will not overwrite a defined property in the target object.
*
* Note that this function mutates the target object.
*
* @param target - The target object into which the source object properties will be merged. This object is modified in place.
* @param source - The source object whose properties will be merged into the target object.
* @param merge - A custom merge function that defines how properties should be combined. It receives the following arguments:
*   - `targetValue`: The current value of the property in the target object.
*   - `sourceValue`: The value of the property in the source object.
*   - `key`: The key of the property being merged.
*   - `target`: The target object.
*   - `source`: The source object.
*
* @returns The updated target object with properties from the source object merged in.
*
* @template T - Type of the target object.
* @template S - Type of the source object.
*
* @example
* const target = { a: 1, b: 2 };
* const source = { b: 3, c: 4 };
*
* mergeWith(target, source, (targetValue, sourceValue) => {
*   if (typeof targetValue === 'number' && typeof sourceValue === 'number') {
*     return targetValue + sourceValue;
*   }
* });
* // Returns { a: 1, b: 5, c: 4 }
* @example
* const target = { a: [1], b: [2] };
* const source = { a: [3], b: [4] };
*
* const result = mergeWith(target, source, (objValue, srcValue) => {
*   if (Array.isArray(objValue)) {
*     return objValue.concat(srcValue);
*   }
* });
*
* expect(result).toEqual({ a: [1, 3], b: [2, 4] });
*/
function mergeWith(target, source, merge) {
	const sourceKeys = Object.keys(source);
	for (let i = 0; i < sourceKeys.length; i++) {
		const key = sourceKeys[i];
		if (require_isUnsafeProperty.isUnsafeProperty(key)) continue;
		const sourceValue = source[key];
		const targetValue = target[key];
		const merged = merge(targetValue, sourceValue, key, target, source);
		if (merged !== void 0) target[key] = merged;
		else if (Array.isArray(sourceValue)) if (Array.isArray(targetValue)) target[key] = mergeWith(targetValue, sourceValue, merge);
		else target[key] = mergeWith([], sourceValue, merge);
		else if (require_isPlainObject.isPlainObject(sourceValue)) if (require_isPlainObject.isPlainObject(targetValue)) target[key] = mergeWith(targetValue, sourceValue, merge);
		else target[key] = mergeWith({}, sourceValue, merge);
		else if (targetValue === void 0 || sourceValue !== void 0) target[key] = sourceValue;
	}
	return target;
}
//#endregion
exports.mergeWith = mergeWith;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/omit.js"
/*!*********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/omit.js ***!
  \*********************************************************/
(__unused_webpack_module, exports) {

//#region src/object/omit.ts
/**
* Creates a new object with specified keys omitted.
*
* This function takes an object and an array of keys, and returns a new object that
* excludes the properties corresponding to the specified keys.
*
* @template T - The type of object.
* @template K - The type of keys in object.
* @param obj - The object to omit keys from.
* @param keys - An array of keys to be omitted from the object.
* @returns A new object with the specified keys omitted.
*
* @example
* const obj = { a: 1, b: 2, c: 3 };
* const result = omit(obj, ['b', 'c']);
* // result will be { a: 1 }
*/
function omit(obj, keys) {
	const result = { ...obj };
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		delete result[key];
	}
	return result;
}
//#endregion
exports.omit = omit;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/omitBy.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/omitBy.js ***!
  \***********************************************************/
(__unused_webpack_module, exports) {

//#region src/object/omitBy.ts
/**
* Creates a new object composed of the properties that do not satisfy the predicate function.
*
* This function takes an object and a predicate function, and returns a new object that
* includes only the properties for which the predicate function returns false.
*
* @template T - The type of object.
* @param obj - The object to omit properties from.
* @param shouldOmit - A predicate function that determines
* whether a property should be omitted. It takes the property's key and value as arguments and returns `true`
* if the property should be omitted, and `false` otherwise.
* @returns A new object with the properties that do not satisfy the predicate function.
*
* @example
* const obj = { a: 1, b: 'omit', c: 3 };
* const shouldOmit = (value) => typeof value === 'string';
* const result = omitBy(obj, shouldOmit);
* // result will be { a: 1, c: 3 }
*/
function omitBy(obj, shouldOmit) {
	const result = {};
	const keys = Object.keys(obj);
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		const value = obj[key];
		if (!shouldOmit(value, key)) result[key] = value;
	}
	return result;
}
//#endregion
exports.omitBy = omitBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/pick.js"
/*!*********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/pick.js ***!
  \*********************************************************/
(__unused_webpack_module, exports) {

//#region src/object/pick.ts
/**
* Creates a new object composed of the picked object properties.
*
* This function takes an object and an array of keys, and returns a new object that
* includes only the properties corresponding to the specified keys.
*
* @template T - The type of object.
* @template K - The type of keys in object.
* @param obj - The object to pick keys from.
* @param keys - An array of keys to be picked from the object.
* @returns A new object with the specified keys picked.
*
* @example
* const obj = { a: 1, b: 2, c: 3 };
* const result = pick(obj, ['a', 'c']);
* // result will be { a: 1, c: 3 }
*/
function pick(obj, keys) {
	const result = {};
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		if (Object.hasOwn(obj, key)) result[key] = obj[key];
	}
	return result;
}
//#endregion
exports.pick = pick;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/pickBy.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/pickBy.js ***!
  \***********************************************************/
(__unused_webpack_module, exports) {

//#region src/object/pickBy.ts
/**
* Creates a new object composed of the properties that satisfy the predicate function.
*
* This function takes an object and a predicate function, and returns a new object that
* includes only the properties for which the predicate function returns true.
*
* @template T - The type of object.
* @param obj - The object to pick properties from.
* @param shouldPick - A predicate function that determines
* whether a property should be picked. It takes the property's key and value as arguments and returns `true`
* if the property should be picked, and `false` otherwise.
* @returns A new object with the properties that satisfy the predicate function.
*
* @example
* const obj = { a: 1, b: 'pick', c: 3 };
* const shouldPick = (value) => typeof value === 'string';
* const result = pickBy(obj, shouldPick);
* // result will be { b: 'pick' }
*/
function pickBy(obj, shouldPick) {
	const result = {};
	const keys = Object.keys(obj);
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		const value = obj[key];
		if (shouldPick(value, key)) result[key] = value;
	}
	return result;
}
//#endregion
exports.pickBy = pickBy;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/sortKeys.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/sortKeys.js ***!
  \*************************************************************/
(__unused_webpack_module, exports) {

//#region src/object/sortKeys.ts
/**
* Creates a new object with the keys sorted.
*
* The keys are sorted alphabetically by default, but a custom compare function can be provided.
*
* @template T - The type of the object.
* @param object - The object to sort keys from.
* @param [compareKeys] - A custom compare function for sorting keys.
* @returns A new object with the keys sorted.
*
* @example
* sortKeys({ b: 2, a: 1, c: 3 });
* // => { a: 1, b: 2, c: 3 }
*
* @example
* sortKeys({ b: 2, a: 1, c: 3 }, (a, b) => b.localeCompare(a));
* // => { c: 3, b: 2, a: 1 }
*/
function sortKeys(object, compareKeys) {
	const sortedKeys = Object.keys(object).sort(compareKeys);
	const result = {};
	for (let i = 0; i < sortedKeys.length; i++) {
		const key = sortedKeys[i];
		result[key] = object[key];
	}
	return result;
}
//#endregion
exports.sortKeys = sortKeys;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/toCamelCaseKeys.js"
/*!********************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/toCamelCaseKeys.js ***!
  \********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_isPlainObject = __webpack_require__(/*! ../predicate/isPlainObject.js */ "../../node_modules/es-toolkit/dist/predicate/isPlainObject.js");
const require_isArray = __webpack_require__(/*! ../compat/predicate/isArray.js */ "../../node_modules/es-toolkit/dist/compat/predicate/isArray.js");
const require_camelCase = __webpack_require__(/*! ../string/camelCase.js */ "../../node_modules/es-toolkit/dist/string/camelCase.js");
//#region src/object/toCamelCaseKeys.ts
/**
* Creates a new object composed of the properties with keys converted to camelCase.
*
* This function takes an object and returns a new object that includes the same properties,
* but with all keys converted to camelCase format.
*
* @template T - The type of object.
* @param obj - The object to convert keys from.
* @returns A new object with all keys converted to camelCase.
*
* @example
* // Example with objects
* const obj = { user_id: 1, first_name: 'John' };
* const result = toCamelCaseKeys(obj);
* // result will be { userId: 1, firstName: 'John' }
*
* // Example with arrays of objects
* const arr = [
*   { user_id: 1, first_name: 'John' },
*   { user_id: 2, first_name: 'Jane' }
* ];
* const arrResult = toCamelCaseKeys(arr);
* // arrResult will be [{ userId: 1, firstName: 'John' }, { userId: 2, firstName: 'Jane' }]
*
* // Example with nested objects
* const nested = {
*   user_data: {
*     user_id: 1,
*     user_address: {
*       street_name: 'Main St',
*       zip_code: '12345'
*     }
*   }
* };
* const nestedResult = toCamelCaseKeys(nested);
* // nestedResult will be:
* // {
* //   userData: {
* //     userId: 1,
* //     userAddress: {
* //       streetName: 'Main St',
* //       zipCode: '12345'
* //     }
* //   }
* // }
*/
function toCamelCaseKeys(obj) {
	if (require_isArray.isArray(obj)) return obj.map((item) => toCamelCaseKeys(item));
	if (require_isPlainObject.isPlainObject(obj)) {
		const result = {};
		const keys = Object.keys(obj);
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			const camelKey = require_camelCase.camelCase(key);
			result[camelKey] = toCamelCaseKeys(obj[key]);
		}
		return result;
	}
	return obj;
}
//#endregion
exports.toCamelCaseKeys = toCamelCaseKeys;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/toMerged.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/toMerged.js ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_clone = __webpack_require__(/*! ./clone.js */ "../../node_modules/es-toolkit/dist/object/clone.js");
const require_cloneDeep = __webpack_require__(/*! ./cloneDeep.js */ "../../node_modules/es-toolkit/dist/object/cloneDeep.js");
const require_isPlainObject = __webpack_require__(/*! ../predicate/isPlainObject.js */ "../../node_modules/es-toolkit/dist/predicate/isPlainObject.js");
const require_mergeWith = __webpack_require__(/*! ./mergeWith.js */ "../../node_modules/es-toolkit/dist/object/mergeWith.js");
//#region src/object/toMerged.ts
/**
* Merges the properties of the source object into a deep clone of the target object.
* Unlike `merge`, This function does not modify the original target object.
*
* This function performs a deep merge, meaning nested objects and arrays are merged recursively.
*
* - If a property in the source object is an array or object and the corresponding property in the target object is also an array or object, they will be merged.
* - If a property in the source object is undefined, it will not overwrite a defined property in the target object.
*
* Note that this function does not mutate the target object.
*
* @param target - The target object to be cloned and merged into. This object is not modified directly.
* @param source - The source object whose properties will be merged into the cloned target object.
* @returns A new object with properties from the source object merged into a deep clone of the target object.
*
* @template T - Type of the target object.
* @template S - Type of the source object.
*
* @example
* const target = { a: 1, b: { x: 1, y: 2 } };
* const source = { b: { y: 3, z: 4 }, c: 5 };
*
* const result = toMerged(target, source);
* console.log(result);
* // Output: { a: 1, b: { x: 1, y: 3, z: 4 }, c: 5 }
*
* @example
* const target = { a: [1, 2], b: { x: 1 } };
* const source = { a: [3], b: { y: 2 } };
*
* const result = toMerged(target, source);
* console.log(result);
* // Output: { a: [3, 2], b: { x: 1, y: 2 } }
*
* @example
* const target = { a: null };
* const source = { a: [1, 2, 3] };
*
* const result = toMerged(target, source);
* console.log(result);
* // Output: { a: [1, 2, 3] }
*/
function toMerged(target, source) {
	return require_mergeWith.mergeWith(require_cloneDeep.cloneDeep(target), source, function mergeRecursively(targetValue, sourceValue) {
		if (Array.isArray(sourceValue)) if (Array.isArray(targetValue)) return require_mergeWith.mergeWith(require_clone.clone(targetValue), sourceValue, mergeRecursively);
		else return require_mergeWith.mergeWith([], sourceValue, mergeRecursively);
		else if (require_isPlainObject.isPlainObject(sourceValue)) if (require_isPlainObject.isPlainObject(targetValue)) return require_mergeWith.mergeWith(require_clone.clone(targetValue), sourceValue, mergeRecursively);
		else return require_mergeWith.mergeWith({}, sourceValue, mergeRecursively);
	});
}
//#endregion
exports.toMerged = toMerged;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/object/toSnakeCaseKeys.js"
/*!********************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/object/toSnakeCaseKeys.js ***!
  \********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_isArray = __webpack_require__(/*! ../compat/predicate/isArray.js */ "../../node_modules/es-toolkit/dist/compat/predicate/isArray.js");
const require_isPlainObject = __webpack_require__(/*! ../compat/predicate/isPlainObject.js */ "../../node_modules/es-toolkit/dist/compat/predicate/isPlainObject.js");
const require_snakeCase = __webpack_require__(/*! ../string/snakeCase.js */ "../../node_modules/es-toolkit/dist/string/snakeCase.js");
//#region src/object/toSnakeCaseKeys.ts
/**
* Creates a new object composed of the properties with keys converted to snake_case.
*
* This function takes an object and returns a new object that includes the same properties,
* but with all keys converted to snake_case format.
*
* @template T - The type of object.
* @param obj - The object to convert keys from.
* @returns A new object with all keys converted to snake_case.
*
* @example
* // Example with objects
* const obj = { userId: 1, firstName: 'John' };
* const result = toSnakeCaseKeys(obj);
* // result will be { user_id: 1, first_name: 'John' }
*
* // Example with arrays of objects
* const arr = [
*   { userId: 1, firstName: 'John' },
*   { userId: 2, firstName: 'Jane' }
* ];
* const arrResult = toSnakeCaseKeys(arr);
* // arrResult will be [{ user_id: 1, first_name: 'John' }, { user_id: 2, first_name: 'Jane' }]
*
* // Example with nested objects
* const nested = {
*   userData: {
*     userId: 1,
*     userAddress: {
*       streetName: 'Main St',
*       zipCode: '12345'
*     }
*   }
* };
* const nestedResult = toSnakeCaseKeys(nested);
* // nestedResult will be:
* // {
* //   user_data: {
* //     user_id: 1,
* //     user_address: {
* //       street_name: 'Main St',
* //       zip_code: '12345'
* //     }
* //   }
* // }
*/
function toSnakeCaseKeys(obj) {
	if (require_isArray.isArray(obj)) return obj.map((item) => toSnakeCaseKeys(item));
	if (require_isPlainObject.isPlainObject(obj)) {
		const result = {};
		const keys = Object.keys(obj);
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			const snakeKey = require_snakeCase.snakeCase(key);
			result[snakeKey] = toSnakeCaseKeys(obj[key]);
		}
		return result;
	}
	return obj;
}
//#endregion
exports.toSnakeCaseKeys = toSnakeCaseKeys;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/index.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/index.js ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_isPrimitive = __webpack_require__(/*! ./isPrimitive.js */ "../../node_modules/es-toolkit/dist/predicate/isPrimitive.js");
const require_isTypedArray = __webpack_require__(/*! ./isTypedArray.js */ "../../node_modules/es-toolkit/dist/predicate/isTypedArray.js");
const require_isBuffer = __webpack_require__(/*! ./isBuffer.js */ "../../node_modules/es-toolkit/dist/predicate/isBuffer.js");
const require_isPlainObject = __webpack_require__(/*! ./isPlainObject.js */ "../../node_modules/es-toolkit/dist/predicate/isPlainObject.js");
const require_isArrayBuffer = __webpack_require__(/*! ./isArrayBuffer.js */ "../../node_modules/es-toolkit/dist/predicate/isArrayBuffer.js");
const require_isBlob = __webpack_require__(/*! ./isBlob.js */ "../../node_modules/es-toolkit/dist/predicate/isBlob.js");
const require_isBoolean = __webpack_require__(/*! ./isBoolean.js */ "../../node_modules/es-toolkit/dist/predicate/isBoolean.js");
const require_isBrowser = __webpack_require__(/*! ./isBrowser.js */ "../../node_modules/es-toolkit/dist/predicate/isBrowser.js");
const require_isDate = __webpack_require__(/*! ./isDate.js */ "../../node_modules/es-toolkit/dist/predicate/isDate.js");
const require_isEmptyObject = __webpack_require__(/*! ./isEmptyObject.js */ "../../node_modules/es-toolkit/dist/predicate/isEmptyObject.js");
const require_isEqualWith = __webpack_require__(/*! ./isEqualWith.js */ "../../node_modules/es-toolkit/dist/predicate/isEqualWith.js");
const require_isEqual = __webpack_require__(/*! ./isEqual.js */ "../../node_modules/es-toolkit/dist/predicate/isEqual.js");
const require_isError = __webpack_require__(/*! ./isError.js */ "../../node_modules/es-toolkit/dist/predicate/isError.js");
const require_isFile = __webpack_require__(/*! ./isFile.js */ "../../node_modules/es-toolkit/dist/predicate/isFile.js");
const require_isFunction = __webpack_require__(/*! ./isFunction.js */ "../../node_modules/es-toolkit/dist/predicate/isFunction.js");
const require_isJSON = __webpack_require__(/*! ./isJSON.js */ "../../node_modules/es-toolkit/dist/predicate/isJSON.js");
const require_isJSONValue = __webpack_require__(/*! ./isJSONValue.js */ "../../node_modules/es-toolkit/dist/predicate/isJSONValue.js");
const require_isLength = __webpack_require__(/*! ./isLength.js */ "../../node_modules/es-toolkit/dist/predicate/isLength.js");
const require_isMap = __webpack_require__(/*! ./isMap.js */ "../../node_modules/es-toolkit/dist/predicate/isMap.js");
const require_isNil = __webpack_require__(/*! ./isNil.js */ "../../node_modules/es-toolkit/dist/predicate/isNil.js");
const require_isNode = __webpack_require__(/*! ./isNode.js */ "../../node_modules/es-toolkit/dist/predicate/isNode.js");
const require_isNotNil = __webpack_require__(/*! ./isNotNil.js */ "../../node_modules/es-toolkit/dist/predicate/isNotNil.js");
const require_isNull = __webpack_require__(/*! ./isNull.js */ "../../node_modules/es-toolkit/dist/predicate/isNull.js");
const require_isNumber = __webpack_require__(/*! ./isNumber.js */ "../../node_modules/es-toolkit/dist/predicate/isNumber.js");
const require_isPromise = __webpack_require__(/*! ./isPromise.js */ "../../node_modules/es-toolkit/dist/predicate/isPromise.js");
const require_isRegExp = __webpack_require__(/*! ./isRegExp.js */ "../../node_modules/es-toolkit/dist/predicate/isRegExp.js");
const require_isSet = __webpack_require__(/*! ./isSet.js */ "../../node_modules/es-toolkit/dist/predicate/isSet.js");
const require_isString = __webpack_require__(/*! ./isString.js */ "../../node_modules/es-toolkit/dist/predicate/isString.js");
const require_isSymbol = __webpack_require__(/*! ./isSymbol.js */ "../../node_modules/es-toolkit/dist/predicate/isSymbol.js");
const require_isUndefined = __webpack_require__(/*! ./isUndefined.js */ "../../node_modules/es-toolkit/dist/predicate/isUndefined.js");
const require_isWeakMap = __webpack_require__(/*! ./isWeakMap.js */ "../../node_modules/es-toolkit/dist/predicate/isWeakMap.js");
const require_isWeakSet = __webpack_require__(/*! ./isWeakSet.js */ "../../node_modules/es-toolkit/dist/predicate/isWeakSet.js");
exports.isArrayBuffer = require_isArrayBuffer.isArrayBuffer;
exports.isBlob = require_isBlob.isBlob;
exports.isBoolean = require_isBoolean.isBoolean;
exports.isBrowser = require_isBrowser.isBrowser;
exports.isBuffer = require_isBuffer.isBuffer;
exports.isDate = require_isDate.isDate;
exports.isEmptyObject = require_isEmptyObject.isEmptyObject;
exports.isEqual = require_isEqual.isEqual;
exports.isEqualWith = require_isEqualWith.isEqualWith;
exports.isError = require_isError.isError;
exports.isFile = require_isFile.isFile;
exports.isFunction = require_isFunction.isFunction;
exports.isJSON = require_isJSON.isJSON;
exports.isJSONArray = require_isJSONValue.isJSONArray;
exports.isJSONObject = require_isJSONValue.isJSONObject;
exports.isJSONValue = require_isJSONValue.isJSONValue;
exports.isLength = require_isLength.isLength;
exports.isMap = require_isMap.isMap;
exports.isNil = require_isNil.isNil;
exports.isNode = require_isNode.isNode;
exports.isNotNil = require_isNotNil.isNotNil;
exports.isNull = require_isNull.isNull;
exports.isNumber = require_isNumber.isNumber;
exports.isPlainObject = require_isPlainObject.isPlainObject;
exports.isPrimitive = require_isPrimitive.isPrimitive;
exports.isPromise = require_isPromise.isPromise;
exports.isRegExp = require_isRegExp.isRegExp;
exports.isSet = require_isSet.isSet;
exports.isString = require_isString.isString;
exports.isSymbol = require_isSymbol.isSymbol;
exports.isTypedArray = require_isTypedArray.isTypedArray;
exports.isUndefined = require_isUndefined.isUndefined;
exports.isWeakMap = require_isWeakMap.isWeakMap;
exports.isWeakSet = require_isWeakSet.isWeakSet;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isArrayBuffer.js"
/*!*********************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isArrayBuffer.js ***!
  \*********************************************************************/
(__unused_webpack_module, exports) {

//#region src/predicate/isArrayBuffer.ts
/**
* Checks if a given value is `ArrayBuffer`.
*
* This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `ArrayBuffer`.
*
* @param value The value to check if it is a `ArrayBuffer`.
* @returns Returns `true` if `value` is a `ArrayBuffer`, else `false`.
*
* @example
* const value1 = new ArrayBuffer();
* const value2 = new Array();
* const value3 = new Map();
*
* console.log(isArrayBuffer(value1)); // true
* console.log(isArrayBuffer(value2)); // false
* console.log(isArrayBuffer(value3)); // false
*/
function isArrayBuffer(value) {
	return value instanceof ArrayBuffer;
}
//#endregion
exports.isArrayBuffer = isArrayBuffer;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isBlob.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isBlob.js ***!
  \**************************************************************/
(__unused_webpack_module, exports) {

//#region src/predicate/isBlob.ts
/**
* Checks if the given value is a Blob.
*
* This function tests whether the provided value is an instance of `Blob`.
* It returns `true` if the value is an instance of `Blob`, and `false` otherwise.
*
* @param x - The value to test if it is a Blob.
* @returns True if the value is a Blob, false otherwise.
*
* @example
* const value1 = new Blob();
* const value2 = {};
*
* console.log(isBlob(value1)); // true
* console.log(isBlob(value2)); // false
*/
function isBlob(x) {
	if (typeof Blob === "undefined") return false;
	return x instanceof Blob;
}
//#endregion
exports.isBlob = isBlob;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isBoolean.js"
/*!*****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isBoolean.js ***!
  \*****************************************************************/
(__unused_webpack_module, exports) {

//#region src/predicate/isBoolean.ts
/**
* Checks if the given value is boolean.
*
* This function tests whether the provided value is strictly `boolean`.
* It returns `true` if the value is `boolean`, and `false` otherwise.
*
* This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `boolean`.
*
* @param x - The Value to test if it is boolean.
* @returns True if the value is boolean, false otherwise.
*
* @example
*
* const value1 = true;
* const value2 = 0;
* const value3 = 'abc';
*
* console.log(isBoolean(value1)); // true
* console.log(isBoolean(value2)); // false
* console.log(isBoolean(value3)); // false
*
*/
function isBoolean(x) {
	return typeof x === "boolean";
}
//#endregion
exports.isBoolean = isBoolean;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isBrowser.js"
/*!*****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isBrowser.js ***!
  \*****************************************************************/
(__unused_webpack_module, exports) {

//#region src/predicate/isBrowser.ts
/**
* Checks if the current environment is a browser.
*
* This function checks for the existence of the `window.document` property,
* which only exists in browser environments.
*
* @returns `true` if the current environment is a browser, otherwise `false`.
*
* @example
* if (isBrowser()) {
*   console.log("This is running in a browser");
*   document.getElementById('app').innerHTML = 'Hello World';
* }
*/
function isBrowser() {
	return typeof window !== "undefined" && window?.document != null;
}
//#endregion
exports.isBrowser = isBrowser;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isBuffer.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isBuffer.js ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_globalThis = __webpack_require__(/*! ../_internal/globalThis.js */ "../../node_modules/es-toolkit/dist/_internal/globalThis.js");
//#region src/predicate/isBuffer.ts
/**
* Checks if the given value is a Buffer instance.
*
* This function tests whether the provided value is an instance of Buffer.
* It returns `true` if the value is a Buffer, and `false` otherwise.
*
* This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `Buffer`.
*
* @param x - The value to check if it is a Buffer.
* @returns Returns `true` if `x` is a Buffer, else `false`.
*
* @example
* const buffer = Buffer.from("test");
* console.log(isBuffer(buffer)); // true
*
* const notBuffer = "not a buffer";
* console.log(isBuffer(notBuffer)); // false
*/
function isBuffer(x) {
	return typeof require_globalThis.globalThis_.Buffer !== "undefined" && require_globalThis.globalThis_.Buffer.isBuffer(x);
}
//#endregion
exports.isBuffer = isBuffer;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isDate.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isDate.js ***!
  \**************************************************************/
(__unused_webpack_module, exports) {

//#region src/predicate/isDate.ts
/**
* Checks if `value` is a Date object.
*
* @param value The value to check.
* @returns Returns `true` if `value` is a Date object, `false` otherwise.
*
* @example
* const value1 = new Date();
* const value2 = '2024-01-01';
*
* console.log(isDate(value1)); // true
* console.log(isDate(value2)); // false
*/
function isDate(value) {
	return value instanceof Date;
}
//#endregion
exports.isDate = isDate;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isEmptyObject.js"
/*!*********************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isEmptyObject.js ***!
  \*********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_isPlainObject = __webpack_require__(/*! ./isPlainObject.js */ "../../node_modules/es-toolkit/dist/predicate/isPlainObject.js");
//#region src/predicate/isEmptyObject.ts
/**
* Checks if a value is an empty plain object.
*
* @param value - The value to check.
* @returns True if the value is an empty plain object, otherwise false.
*
* @example
* isEmptyObject({}); // true
* isEmptyObject({ a: 1 }); // false
* isEmptyObject([]); // false
* isEmptyObject(null); // false
*/
function isEmptyObject(value) {
	return require_isPlainObject.isPlainObject(value) && Object.keys(value).length === 0;
}
//#endregion
exports.isEmptyObject = isEmptyObject;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isEqual.js"
/*!***************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isEqual.js ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_noop = __webpack_require__(/*! ../function/noop.js */ "../../node_modules/es-toolkit/dist/function/noop.js");
const require_isEqualWith = __webpack_require__(/*! ./isEqualWith.js */ "../../node_modules/es-toolkit/dist/predicate/isEqualWith.js");
//#region src/predicate/isEqual.ts
/**
* Checks if two values are equal, including support for `Date`, `RegExp`, and deep object comparison.
*
* @param a - The first value to compare.
* @param b - The second value to compare.
* @returns `true` if the values are equal, otherwise `false`.
*
* @example
* isEqual(1, 1); // true
* isEqual({ a: 1 }, { a: 1 }); // true
* isEqual(/abc/g, /abc/g); // true
* isEqual(new Date('2020-01-01'), new Date('2020-01-01')); // true
* isEqual([1, 2, 3], [1, 2, 3]); // true
*/
function isEqual(a, b) {
	return require_isEqualWith.isEqualWith(a, b, require_noop.noop);
}
//#endregion
exports.isEqual = isEqual;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isEqualWith.js"
/*!*******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isEqualWith.js ***!
  \*******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_getSymbols = __webpack_require__(/*! ../compat/_internal/getSymbols.js */ "../../node_modules/es-toolkit/dist/compat/_internal/getSymbols.js");
const require_getTag = __webpack_require__(/*! ../compat/_internal/getTag.js */ "../../node_modules/es-toolkit/dist/compat/_internal/getTag.js");
const require_tags = __webpack_require__(/*! ../compat/_internal/tags.js */ "../../node_modules/es-toolkit/dist/compat/_internal/tags.js");
const require_isBuffer = __webpack_require__(/*! ./isBuffer.js */ "../../node_modules/es-toolkit/dist/predicate/isBuffer.js");
const require_isPlainObject = __webpack_require__(/*! ./isPlainObject.js */ "../../node_modules/es-toolkit/dist/predicate/isPlainObject.js");
const require_isEqualsSameValueZero = __webpack_require__(/*! ../_internal/isEqualsSameValueZero.js */ "../../node_modules/es-toolkit/dist/_internal/isEqualsSameValueZero.js");
__webpack_require__(/*! ../compat/util/eq.js */ "../../node_modules/es-toolkit/dist/compat/util/eq.js");
//#region src/predicate/isEqualWith.ts
/**
* Compares two values for equality using a custom comparison function.
*
* The custom function allows for fine-tuned control over the comparison process. If it returns a boolean, that result determines the equality. If it returns undefined, the function falls back to the default equality comparison.
*
* This function also uses the custom equality function to compare values inside objects,
* arrays, maps, sets, and other complex structures, ensuring a deep comparison.
*
* This approach provides flexibility in handling complex comparisons while maintaining efficient default behavior for simpler cases.
*
* The custom comparison function can take up to six parameters:
* - `x`: The value from the first object `a`.
* - `y`: The value from the second object `b`.
* - `property`: The property key used to get `x` and `y`.
* - `xParent`: The parent of the first value `x`.
* - `yParent`: The parent of the second value `y`.
* - `stack`: An internal stack (Map) to handle circular references.
*
* @param a - The first value to compare.
* @param b - The second value to compare.
* @param areValuesEqual - A function to customize the comparison.
*   If it returns a boolean, that result will be used. If it returns undefined,
*   the default equality comparison will be used.
* @returns `true` if the values are equal according to the customizer, otherwise `false`.
*
* @example
* const customizer = (a, b) => {
*   if (typeof a === 'string' && typeof b === 'string') {
*     return a.toLowerCase() === b.toLowerCase();
*   }
* };
* isEqualWith('Hello', 'hello', customizer); // true
* isEqualWith({ a: 'Hello' }, { a: 'hello' }, customizer); // true
* isEqualWith([1, 2, 3], [1, 2, 3], customizer); // true
*/
function isEqualWith(a, b, areValuesEqual) {
	return isEqualWithImpl(a, b, void 0, void 0, void 0, void 0, areValuesEqual);
}
function isEqualWithImpl(a, b, property, aParent, bParent, stack, areValuesEqual) {
	const result = areValuesEqual(a, b, property, aParent, bParent, stack);
	if (result !== void 0) return result;
	if (typeof a === typeof b) switch (typeof a) {
		case "bigint":
		case "string":
		case "boolean":
		case "symbol":
		case "undefined": return a === b;
		case "number": return a === b || Object.is(a, b);
		case "function": return a === b;
		case "object": return areObjectsEqual(a, b, stack, areValuesEqual);
	}
	return areObjectsEqual(a, b, stack, areValuesEqual);
}
function areObjectsEqual(a, b, stack, areValuesEqual) {
	if (Object.is(a, b)) return true;
	let aTag = require_getTag.getTag(a);
	let bTag = require_getTag.getTag(b);
	if (aTag === "[object Arguments]") aTag = require_tags.objectTag;
	if (bTag === "[object Arguments]") bTag = require_tags.objectTag;
	if (aTag !== bTag) return false;
	switch (aTag) {
		case require_tags.stringTag: return a.toString() === b.toString();
		case require_tags.numberTag: {
			const x = a.valueOf();
			const y = b.valueOf();
			return require_isEqualsSameValueZero.isEqualsSameValueZero(x, y);
		}
		case require_tags.booleanTag:
		case require_tags.dateTag:
		case require_tags.symbolTag: return Object.is(a.valueOf(), b.valueOf());
		case require_tags.regexpTag: return a.source === b.source && a.flags === b.flags;
		case require_tags.functionTag: return a === b;
	}
	stack = stack ?? /* @__PURE__ */ new Map();
	const aStack = stack.get(a);
	const bStack = stack.get(b);
	if (aStack != null && bStack != null) return aStack === b;
	stack.set(a, b);
	stack.set(b, a);
	try {
		switch (aTag) {
			case require_tags.mapTag:
				if (a.size !== b.size) return false;
				for (const [key, value] of a.entries()) if (!b.has(key) || !isEqualWithImpl(value, b.get(key), key, a, b, stack, areValuesEqual)) return false;
				return true;
			case require_tags.setTag: {
				if (a.size !== b.size) return false;
				const aValues = Array.from(a.values());
				const bValues = Array.from(b.values());
				for (let i = 0; i < aValues.length; i++) {
					const aValue = aValues[i];
					const index = bValues.findIndex((bValue) => {
						return isEqualWithImpl(aValue, bValue, void 0, a, b, stack, areValuesEqual);
					});
					if (index === -1) return false;
					bValues.splice(index, 1);
				}
				return true;
			}
			case require_tags.arrayTag:
			case require_tags.uint8ArrayTag:
			case require_tags.uint8ClampedArrayTag:
			case require_tags.uint16ArrayTag:
			case require_tags.uint32ArrayTag:
			case require_tags.bigUint64ArrayTag:
			case require_tags.int8ArrayTag:
			case require_tags.int16ArrayTag:
			case require_tags.int32ArrayTag:
			case require_tags.bigInt64ArrayTag:
			case require_tags.float32ArrayTag:
			case require_tags.float64ArrayTag:
				if (require_isBuffer.isBuffer(a) !== require_isBuffer.isBuffer(b)) return false;
				if (a.length !== b.length) return false;
				for (let i = 0; i < a.length; i++) if (!isEqualWithImpl(a[i], b[i], i, a, b, stack, areValuesEqual)) return false;
				return true;
			case require_tags.arrayBufferTag:
				if (a.byteLength !== b.byteLength) return false;
				return areObjectsEqual(new Uint8Array(a), new Uint8Array(b), stack, areValuesEqual);
			case require_tags.dataViewTag:
				if (a.byteLength !== b.byteLength || a.byteOffset !== b.byteOffset) return false;
				return areObjectsEqual(new Uint8Array(a), new Uint8Array(b), stack, areValuesEqual);
			case require_tags.errorTag: return a.name === b.name && a.message === b.message;
			case require_tags.objectTag: {
				if (!(areObjectsEqual(a.constructor, b.constructor, stack, areValuesEqual) || require_isPlainObject.isPlainObject(a) && require_isPlainObject.isPlainObject(b))) return false;
				const aKeys = [...Object.keys(a), ...require_getSymbols.getSymbols(a)];
				const bKeys = [...Object.keys(b), ...require_getSymbols.getSymbols(b)];
				if (aKeys.length !== bKeys.length) return false;
				for (let i = 0; i < aKeys.length; i++) {
					const propKey = aKeys[i];
					const aProp = a[propKey];
					if (!Object.hasOwn(b, propKey)) return false;
					const bProp = b[propKey];
					if (!isEqualWithImpl(aProp, bProp, propKey, a, b, stack, areValuesEqual)) return false;
				}
				return true;
			}
			default: return false;
		}
	} finally {
		stack.delete(a);
		stack.delete(b);
	}
}
//#endregion
exports.isEqualWith = isEqualWith;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isError.js"
/*!***************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isError.js ***!
  \***************************************************************/
(__unused_webpack_module, exports) {

//#region src/predicate/isError.ts
/**
* Checks if `value` is an Error object.
*
* @param value The value to check.
* @returns Returns `true` if `value` is an Error object, `false` otherwise.
*
* @example
* ```typescript
* console.log(isError(new Error())); // true
* console.log(isError('Error')); // false
* console.log(isError({ name: 'Error', message: '' })); // false
* ```
*/
function isError(value) {
	return value instanceof Error;
}
//#endregion
exports.isError = isError;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isFile.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isFile.js ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_isBlob = __webpack_require__(/*! ./isBlob.js */ "../../node_modules/es-toolkit/dist/predicate/isBlob.js");
//#region src/predicate/isFile.ts
/**
* Checks if the given value is a File.
*
* This function tests whether the provided value is an instance of `File`.
* It returns `true` if the value is an instance of `File`, and `false` otherwise.
*
* @param x - The value to test if it is a File.
* @returns True if the value is a File, false otherwise.
*
* @example
* const value1 = new File(["content"], "example.txt");
* const value2 = {};
* const value3 = new Blob(["content"], { type: "text/plain" });
*
* console.log(isFile(value1)); // true
* console.log(isFile(value2)); // false
* console.log(isFile(value3)); // false
*/
function isFile(x) {
	if (typeof File === "undefined") return false;
	return require_isBlob.isBlob(x) && x instanceof File;
}
//#endregion
exports.isFile = isFile;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isFunction.js"
/*!******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isFunction.js ***!
  \******************************************************************/
(__unused_webpack_module, exports) {

//#region src/predicate/isFunction.ts
/**
* Checks if `value` is a function.
*
* @param value The value to check.
* @returns Returns `true` if `value` is a function, else `false`.
*
* @example
* isFunction(Array.prototype.slice); // true
* isFunction(async function () {}); // true
* isFunction(function* () {}); // true
* isFunction(Proxy); // true
* isFunction(Int8Array); // true
*/
function isFunction(value) {
	return typeof value === "function";
}
//#endregion
exports.isFunction = isFunction;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isJSON.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isJSON.js ***!
  \**************************************************************/
(__unused_webpack_module, exports) {

//#region src/predicate/isJSON.ts
/**
* Checks if a given value is a valid JSON string.
*
* A valid JSON string is one that can be successfully parsed using `JSON.parse()`. According to JSON
* specifications, valid JSON can represent:
* - Objects (with string keys and valid JSON values)
* - Arrays (containing valid JSON values)
* - Strings
* - Numbers
* - Booleans
* - null
*
* String values like `"null"`, `"true"`, `"false"`, and numeric strings (e.g., `"42"`) are considered
* valid JSON and will return true.
*
* This function serves as a type guard in TypeScript, narrowing the type of the argument to `string`.
*
* @param value The value to check.
* @returns Returns `true` if `value` is a valid JSON string, else `false`.
*
* @example
* isJSON('{"name":"John","age":30}'); // true
* isJSON('[1,2,3]'); // true
* isJSON('true'); // true
* isJSON('invalid json'); // false
* isJSON({ name: 'John' }); // false (not a string)
* isJSON(null); // false (not a string)
*/
function isJSON(value) {
	if (typeof value !== "string") return false;
	try {
		JSON.parse(value);
		return true;
	} catch {
		return false;
	}
}
//#endregion
exports.isJSON = isJSON;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isJSONValue.js"
/*!*******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isJSONValue.js ***!
  \*******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_isPlainObject = __webpack_require__(/*! ./isPlainObject.js */ "../../node_modules/es-toolkit/dist/predicate/isPlainObject.js");
//#region src/predicate/isJSONValue.ts
/**
* The functions isJSONValue, isJSONArray, and isJSONObject are grouped in this file
* to prevent any circular dependency issues.
*/
/**
* Checks if a given value is a valid JSON value.
*
* A valid JSON value can be:
* - null
* - a JSON object (an object with string keys and valid JSON values)
* - a JSON array (an array of valid JSON values)
* - a string
* - a number
* - a boolean
*
* @param value - The value to check.
* @returns True if the value is a valid JSON value, otherwise false.
*
* @example
* console.log(isJSONValue(null)); // true
* console.log(isJSONValue({ key: "value" })); // true
* console.log(isJSONValue([1, 2, 3])); // true
* console.log(isJSONValue("Hello")); // true
* console.log(isJSONValue(42)); // true
* console.log(isJSONValue(true)); // true
* console.log(isJSONValue(undefined)); // false
* console.log(isJSONValue(() => {})); // false
*/
function isJSONValue(value) {
	switch (typeof value) {
		case "object": return value === null || isJSONArray(value) || isJSONObject(value);
		case "string":
		case "number":
		case "boolean": return true;
		default: return false;
	}
}
/**
* Checks if a given value is a valid JSON array.
*
* A valid JSON array is defined as an array where all items are valid JSON values.
*
* @param value - The value to check.
* @returns True if the value is a valid JSON array, otherwise false.
*
* @example
* console.log(isJSONArray([1, 2, 3])); // true
* console.log(isJSONArray(["string", null, true])); // true
* console.log(isJSONArray([1, 2, () => {}])); // false
* console.log(isJSONArray("not an array")); // false
*/
function isJSONArray(value) {
	if (!Array.isArray(value)) return false;
	return value.every((item) => isJSONValue(item));
}
/**
* Checks if a value is a JSON object.
*
* A valid JSON object is defined as an object with string keys and valid JSON values.
*
* @param obj The value to check.
* @returns True if `obj` is a JSON object, false otherwise.
*
* @example
* isJSONObject({ nested: { boolean: true, array: [1, 2, 3], string: 'test', null: null } }); // true
* isJSONObject({ regexp: /test/ }); // false
* isJSONObject(123); // false
*/
function isJSONObject(obj) {
	if (!require_isPlainObject.isPlainObject(obj)) return false;
	const keys = Reflect.ownKeys(obj);
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		const value = obj[key];
		if (typeof key !== "string") return false;
		if (!isJSONValue(value)) return false;
	}
	return true;
}
//#endregion
exports.isJSONArray = isJSONArray;
exports.isJSONObject = isJSONObject;
exports.isJSONValue = isJSONValue;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isLength.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isLength.js ***!
  \****************************************************************/
(__unused_webpack_module, exports) {

//#region src/predicate/isLength.ts
/**
* Checks if a given value is a valid length.
*
* A valid length is of type `number`, is a non-negative integer, and is less than or equal to
* JavaScript's maximum safe integer (`Number.MAX_SAFE_INTEGER`).
* It returns `true` if the value is a valid length, and `false` otherwise.
*
* This function can also serve as a type predicate in TypeScript, narrowing the type of the
* argument to a valid length (`number`).
*
* @param value The value to check.
* @returns Returns `true` if `value` is a valid length, else `false`.
*
* @example
* isLength(0); // true
* isLength(42); // true
* isLength(-1); // false
* isLength(1.5); // false
* isLength(Number.MAX_SAFE_INTEGER); // true
* isLength(Number.MAX_SAFE_INTEGER + 1); // false
*/
function isLength(value) {
	return Number.isSafeInteger(value) && value >= 0;
}
//#endregion
exports.isLength = isLength;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isMap.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isMap.js ***!
  \*************************************************************/
(__unused_webpack_module, exports) {

//#region src/predicate/isMap.ts
/**
* Checks if a given value is `Map`.
*
* This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `Map`.
*
* @param value The value to check if it is a `Map`.
* @returns Returns `true` if `value` is a `Map`, else `false`.
*
* @example
* const value1 = new Map();
* const value2 = new Set();
* const value3 = new WeakMap();
*
* console.log(isMap(value1)); // true
* console.log(isMap(value2)); // false
* console.log(isMap(value3)); // false
*/
function isMap(value) {
	return value instanceof Map;
}
//#endregion
exports.isMap = isMap;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isNil.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isNil.js ***!
  \*************************************************************/
(__unused_webpack_module, exports) {

//#region src/predicate/isNil.ts
/**
* Checks if a given value is null or undefined.
*
* This function tests whether the provided value is either `null` or `undefined`.
* It returns `true` if the value is `null` or `undefined`, and `false` otherwise.
*
* This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `null` or `undefined`.
*
* @param x - The value to test for null or undefined.
* @returns `true` if the value is null or undefined, `false` otherwise.
*
* @example
* const value1 = null;
* const value2 = undefined;
* const value3 = 42;
* const result1 = isNil(value1); // true
* const result2 = isNil(value2); // true
* const result3 = isNil(value3); // false
*/
function isNil(x) {
	return x == null;
}
//#endregion
exports.isNil = isNil;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isNode.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isNode.js ***!
  \**************************************************************/
(__unused_webpack_module, exports) {

//#region src/predicate/isNode.ts
/**
* Checks if the current environment is Node.js.
*
* This function checks for the existence of the `process.versions.node` property,
* which only exists in Node.js environments.
*
* @returns `true` if the current environment is Node.js, otherwise `false`.
*
* @example
* if (isNode()) {
*   console.log('This is running in Node.js');
*   const fs = import('node:fs');
* }
*/
function isNode() {
	return typeof process !== "undefined" && process?.versions?.node != null;
}
//#endregion
exports.isNode = isNode;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isNotNil.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isNotNil.js ***!
  \****************************************************************/
(__unused_webpack_module, exports) {

//#region src/predicate/isNotNil.ts
/**
* Checks if the given value is not null nor undefined.
*
* The main use of this function is to be used with TypeScript as a type predicate.
*
* @template T - The type of value.
* @param x - The value to test if it is not null nor undefined.
* @returns True if the value is not null nor undefined, false otherwise.
*
* @example
* // Here the type of `arr` is (number | undefined)[]
* const arr = [1, undefined, 3];
* // Here the type of `result` is number[]
* const result = arr.filter(isNotNil);
* // result will be [1, 3]
*/
function isNotNil(x) {
	return x != null;
}
//#endregion
exports.isNotNil = isNotNil;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isNull.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isNull.js ***!
  \**************************************************************/
(__unused_webpack_module, exports) {

//#region src/predicate/isNull.ts
/**
* Checks if the given value is null.
*
* This function tests whether the provided value is strictly equal to `null`.
* It returns `true` if the value is `null`, and `false` otherwise.
*
* This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `null`.
*
* @param x - The value to test if it is null.
* @returns True if the value is null, false otherwise.
*
* @example
* const value1 = null;
* const value2 = undefined;
* const value3 = 42;
*
* console.log(isNull(value1)); // true
* console.log(isNull(value2)); // false
* console.log(isNull(value3)); // false
*/
function isNull(x) {
	return x === null;
}
//#endregion
exports.isNull = isNull;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isNumber.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isNumber.js ***!
  \****************************************************************/
(__unused_webpack_module, exports) {

//#region src/predicate/isNumber.ts
/**
* Checks if the given value is a number.
*
* This function tests whether the provided value is strictly a `number`.
* It returns `true` if the value is a `number`, and `false` otherwise.
*
* This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `number`.
*
* @param x - The value to test if it is a number.
* @returns True if the value is a number, false otherwise.
*
* @example
*
* const value1 = 123;
* const value2 = 'abc';
* const value3 = true;
* const value4 = new Number(42);
*
* console.log(isNumber(value1)); // true
* console.log(isNumber(value2)); // false
* console.log(isNumber(value3)); // false
* console.log(isNumber(value4)); // false
*
*/
function isNumber(x) {
	return typeof x === "number";
}
//#endregion
exports.isNumber = isNumber;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isPlainObject.js"
/*!*********************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isPlainObject.js ***!
  \*********************************************************************/
(__unused_webpack_module, exports) {

//#region src/predicate/isPlainObject.ts
/**
* Checks if a given value is a plain object.
*
* @param value - The value to check.
* @returns True if the value is a plain object, otherwise false.
*
* @example
* ```typescript
* // ✅👇 True
*
* isPlainObject({ });                       // ✅
* isPlainObject({ key: 'value' });          // ✅
* isPlainObject({ key: new Date() });       // ✅
* isPlainObject(new Object());              // ✅
* isPlainObject(Object.create(null));       // ✅
* isPlainObject({ nested: { key: true} });  // ✅
* isPlainObject(new Proxy({}, {}));         // ✅
* isPlainObject({ [Symbol('tag')]: 'A' });  // ✅
*
* // ✅👇 (cross-realms, node context, workers, ...)
* const runInNewContext = await import('node:vm').then(
*     (mod) => mod.runInNewContext
* );
* isPlainObject(runInNewContext('({})'));   // ✅
*
* // ❌👇 False
*
* class Test { };
* isPlainObject(new Test())           // ❌
* isPlainObject(10);                  // ❌
* isPlainObject(null);                // ❌
* isPlainObject('hello');             // ❌
* isPlainObject([]);                  // ❌
* isPlainObject(new Date());          // ❌
* isPlainObject(new Uint8Array([1])); // ❌
* isPlainObject(Buffer.from('ABC'));  // ❌
* isPlainObject(Promise.resolve({})); // ❌
* isPlainObject(Object.create({}));   // ❌
* isPlainObject(new (class Cls {}));  // ❌
* isPlainObject(globalThis);          // ❌,
* ```
*/
function isPlainObject(value) {
	if (!value || typeof value !== "object") return false;
	const proto = Object.getPrototypeOf(value);
	if (!(proto === null || proto === Object.prototype || Object.getPrototypeOf(proto) === null)) return false;
	return Object.prototype.toString.call(value) === "[object Object]";
}
//#endregion
exports.isPlainObject = isPlainObject;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isPrimitive.js"
/*!*******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isPrimitive.js ***!
  \*******************************************************************/
(__unused_webpack_module, exports) {

//#region src/predicate/isPrimitive.ts
/**
* Checks whether a value is a JavaScript primitive.
* JavaScript primitives include null, undefined, strings, numbers, booleans, symbols, and bigints.
*
* @param value The value to check.
* @returns Returns true if `value` is a primitive, false otherwise.
*
* @example
* isPrimitive(null); // true
* isPrimitive(undefined); // true
* isPrimitive('123'); // true
* isPrimitive(false); // true
* isPrimitive(true); // true
* isPrimitive(Symbol('a')); // true
* isPrimitive(123n); // true
* isPrimitive({}); // false
* isPrimitive(new Date()); // false
* isPrimitive(new Map()); // false
* isPrimitive(new Set()); // false
* isPrimitive([1, 2, 3]); // false
*/
function isPrimitive(value) {
	return value == null || typeof value !== "object" && typeof value !== "function";
}
//#endregion
exports.isPrimitive = isPrimitive;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isPromise.js"
/*!*****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isPromise.js ***!
  \*****************************************************************/
(__unused_webpack_module, exports) {

//#region src/predicate/isPromise.ts
/**
* Checks if a given value is `Promise`.
*
* This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `Promise`.
*
* @param value The value to check if it is a `Promise`.
* @returns Returns `true` if `value` is a `Promise`, else `false`.
*
* @example
* const value1 = new Promise((resolve) => resolve());
* const value2 = {};
* const value3 = 123;
*
* console.log(isPromise(value1)); // true
* console.log(isPromise(value2)); // false
* console.log(isPromise(value3)); // false
*/
function isPromise(value) {
	return value instanceof Promise;
}
//#endregion
exports.isPromise = isPromise;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isRegExp.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isRegExp.js ***!
  \****************************************************************/
(__unused_webpack_module, exports) {

//#region src/predicate/isRegExp.ts
/**
* Checks if `value` is a RegExp.
*
* @param value The value to check.
* @returns Returns `true` if `value` is a RegExp, `false` otherwise.
*
* @example
* const value1 = /abc/;
* const value2 = '/abc/';
*
* console.log(isRegExp(value1)); // true
* console.log(isRegExp(value2)); // false
*/
function isRegExp(value) {
	return value instanceof RegExp;
}
//#endregion
exports.isRegExp = isRegExp;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isSet.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isSet.js ***!
  \*************************************************************/
(__unused_webpack_module, exports) {

//#region src/predicate/isSet.ts
/**
* Checks if a given value is `Set`.
*
* This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `Set`.
*
* @param value The value to check if it is a `Set`.
* @returns Returns `true` if `value` is a `Set`, else `false`.
*
* @example
* const value1 = new Set();
* const value2 = new Map();
* const value3 = new WeakSet();
*
* console.log(isSet(value1)); // true
* console.log(isSet(value2)); // false
* console.log(isSet(value3)); // false
*/
function isSet(value) {
	return value instanceof Set;
}
//#endregion
exports.isSet = isSet;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isString.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isString.js ***!
  \****************************************************************/
(__unused_webpack_module, exports) {

//#region src/predicate/isString.ts
/**
* Checks if a given value is string.
*
* This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `string`.
*
* @param value The value to check if it is string.
* @returns Returns `true` if `value` is a string, else `false`.
*
* @example
* const value1 = 'abc';
* const value2 = 123;
* const value3 = true;
*
* console.log(isString(value1)); // true
* console.log(isString(value2)); // false
* console.log(isString(value3)); // false
*/
function isString(value) {
	return typeof value === "string";
}
//#endregion
exports.isString = isString;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isSymbol.js"
/*!****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isSymbol.js ***!
  \****************************************************************/
(__unused_webpack_module, exports) {

//#region src/predicate/isSymbol.ts
/**
* Check whether a value is a symbol.
*
* This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `symbol`.
*
* @param value The value to check.
* @returns Returns `true` if `value` is a symbol, else `false`.
*
* @example
* import { isSymbol } from 'es-toolkit/predicate';
*
* isSymbol(Symbol('a')); // true
* isSymbol(Symbol.for('a')); // true
* isSymbol(Symbol.iterator); // true
*
* isSymbol(null); // false
* isSymbol(undefined); // false
* isSymbol('123'); // false
* isSymbol(false); // false
* isSymbol(123n); // false
* isSymbol({}); // false
* isSymbol([1, 2, 3]); // false
*/
function isSymbol(value) {
	return typeof value === "symbol";
}
//#endregion
exports.isSymbol = isSymbol;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isTypedArray.js"
/*!********************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isTypedArray.js ***!
  \********************************************************************/
(__unused_webpack_module, exports) {

//#region src/predicate/isTypedArray.ts
/**
* Checks if a value is a TypedArray.
* @param x The value to check.
* @returns Returns true if `x` is a TypedArray, false otherwise.
*
* @example
* const arr = new Uint8Array([1, 2, 3]);
* isTypedArray(arr); // true
*
* const regularArray = [1, 2, 3];
* isTypedArray(regularArray); // false
*
* const buffer = new ArrayBuffer(16);
* isTypedArray(buffer); // false
*/
function isTypedArray(x) {
	return ArrayBuffer.isView(x) && !(x instanceof DataView);
}
//#endregion
exports.isTypedArray = isTypedArray;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isUndefined.js"
/*!*******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isUndefined.js ***!
  \*******************************************************************/
(__unused_webpack_module, exports) {

//#region src/predicate/isUndefined.ts
/**
* Checks if the given value is undefined.
*
* This function tests whether the provided value is strictly equal to `undefined`.
* It returns `true` if the value is `undefined`, and `false` otherwise.
*
* This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `undefined`.
*
* @param x - The value to test if it is undefined.
* @returns true if the value is undefined, false otherwise.
*
* @example
* const value1 = undefined;
* const value2 = null;
* const value3 = 42;
*
* console.log(isUndefined(value1)); // true
* console.log(isUndefined(value2)); // false
* console.log(isUndefined(value3)); // false
*/
function isUndefined(x) {
	return x === void 0;
}
//#endregion
exports.isUndefined = isUndefined;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isWeakMap.js"
/*!*****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isWeakMap.js ***!
  \*****************************************************************/
(__unused_webpack_module, exports) {

//#region src/predicate/isWeakMap.ts
/**
* Checks if the given value is a `WeakMap`.
*
* This function tests whether the provided value is an instance of `WeakMap`.
* It returns `true` if the value is a `WeakMap`, and `false` otherwise.
*
* This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `WeakMap`.
*
* @param value - The value to test if it is a `WeakMap`.
* @returns true if the value is a `WeakMap`, false otherwise.
*
* @example
* const value1 = new WeakMap();
* const value2 = new Map();
* const value3 = new Set();
*
* console.log(isWeakMap(value1)); // true
* console.log(isWeakMap(value2)); // false
* console.log(isWeakMap(value3)); // false
*/
function isWeakMap(value) {
	return value instanceof WeakMap;
}
//#endregion
exports.isWeakMap = isWeakMap;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/predicate/isWeakSet.js"
/*!*****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/predicate/isWeakSet.js ***!
  \*****************************************************************/
(__unused_webpack_module, exports) {

//#region src/predicate/isWeakSet.ts
/**
* Checks if the given value is a `WeakSet`.
*
* This function tests whether the provided value is an instance of `WeakSet`.
* It returns `true` if the value is a `WeakSet`, and `false` otherwise.
*
* This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `WeakSet`.
*
* @param value - The value to test if it is a `WeakSet`.
* @returns true if the value is a `WeakSet`, false otherwise.
*
* @example
* const value1 = new WeakSet();
* const value2 = new Map();
* const value3 = new Set();
*
* console.log(isWeakSet(value1)); // true
* console.log(isWeakSet(value2)); // false
* console.log(isWeakSet(value3)); // false
*/
function isWeakSet(value) {
	return value instanceof WeakSet;
}
//#endregion
exports.isWeakSet = isWeakSet;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/promise/allKeyed.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/promise/allKeyed.js ***!
  \**************************************************************/
(__unused_webpack_module, exports) {

//#region src/promise/allKeyed.ts
/**
* Resolves an object of promises concurrently, returning an object with the same keys and resolved values.
*
* Similar to `Promise.all`, but accepts an object of promises instead of an array,
* preserving the keys in the result. This makes it easy to destructure the resolved values
* by name instead of relying on positional indices.
*
* Based on the [TC39 `Promise.allKeyed` proposal](https://github.com/tc39/proposal-await-dictionary).
*
* @template T - A record type where each value is a promise or a value.
* @param tasks - An object whose values are promises (or plain values) to resolve concurrently.
* @returns>} A promise that resolves to an object with the same keys and resolved values.
*
* @example
* const { user, posts } = await allKeyed({
*   user: fetchUser(),
*   posts: fetchPosts(),
* });
*
* @example
* // Plain values are also supported
* const result = await allKeyed({
*   a: Promise.resolve(1),
*   b: 2,
* });
* // { a: 1, b: 2 }
*/
async function allKeyed(tasks) {
	const keys = Object.keys(tasks);
	const values = await Promise.all(keys.map((key) => tasks[key]));
	const result = {};
	for (let i = 0; i < keys.length; i++) result[keys[i]] = values[i];
	return result;
}
//#endregion
exports.allKeyed = allKeyed;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/promise/delay.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/promise/delay.js ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_AbortError = __webpack_require__(/*! ../error/AbortError.js */ "../../node_modules/es-toolkit/dist/error/AbortError.js");
//#region src/promise/delay.ts
/**
* Delays the execution of code for a specified number of milliseconds.
*
* This function returns a Promise that resolves after the specified delay, allowing you to use it
* with async/await to pause execution.
*
* @param ms - The number of milliseconds to delay.
* @param options - The options object.
* @param options.signal - An optional AbortSignal to cancel the delay.
* @returns A Promise that resolves after the specified delay.
*
* @example
* async function foo() {
*   console.log('Start');
*   await delay(1000); // Delays execution for 1 second
*   console.log('End');
* }
*
* foo();
*
* // With AbortSignal
* const controller = new AbortController();
* const { signal } = controller;
*
* setTimeout(() => controller.abort(), 50); // Will cancel the delay after 50ms
* try {
*   await delay(100, { signal });
*  } catch (error) {
*   console.error(error); // Will log 'AbortError'
*  }
* }
*/
function delay(ms, { signal } = {}) {
	return new Promise((resolve, reject) => {
		const abortError = () => {
			reject(new require_AbortError.AbortError());
		};
		const abortHandler = () => {
			clearTimeout(timeoutId);
			abortError();
		};
		if (signal?.aborted) return abortError();
		const timeoutId = setTimeout(() => {
			signal?.removeEventListener("abort", abortHandler);
			resolve();
		}, ms);
		signal?.addEventListener("abort", abortHandler, { once: true });
	});
}
//#endregion
exports.delay = delay;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/promise/index.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/promise/index.js ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_semaphore = __webpack_require__(/*! ./semaphore.js */ "../../node_modules/es-toolkit/dist/promise/semaphore.js");
const require_delay = __webpack_require__(/*! ./delay.js */ "../../node_modules/es-toolkit/dist/promise/delay.js");
const require_allKeyed = __webpack_require__(/*! ./allKeyed.js */ "../../node_modules/es-toolkit/dist/promise/allKeyed.js");
const require_mutex = __webpack_require__(/*! ./mutex.js */ "../../node_modules/es-toolkit/dist/promise/mutex.js");
const require_timeout = __webpack_require__(/*! ./timeout.js */ "../../node_modules/es-toolkit/dist/promise/timeout.js");
const require_withTimeout = __webpack_require__(/*! ./withTimeout.js */ "../../node_modules/es-toolkit/dist/promise/withTimeout.js");
exports.Mutex = require_mutex.Mutex;
exports.Semaphore = require_semaphore.Semaphore;
exports.allKeyed = require_allKeyed.allKeyed;
exports.delay = require_delay.delay;
exports.timeout = require_timeout.timeout;
exports.withTimeout = require_withTimeout.withTimeout;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/promise/mutex.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/promise/mutex.js ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_semaphore = __webpack_require__(/*! ./semaphore.js */ "../../node_modules/es-toolkit/dist/promise/semaphore.js");
//#region src/promise/mutex.ts
/**
* A Mutex (mutual exclusion lock) for async functions.
* It allows only one async task to access a critical section at a time.
*
* @example
* const mutex = new Mutex();
*
* async function criticalSection() {
*   await mutex.acquire();
*   try {
*     // This code section cannot be executed simultaneously
*   } finally {
*     mutex.release();
*   }
* }
*
* criticalSection();
* criticalSection(); // This call will wait until the first call releases the mutex.
*/
var Mutex = class {
	semaphore = new require_semaphore.Semaphore(1);
	/**
	* Checks if the mutex is currently locked.
	* @returns True if the mutex is locked, false otherwise.
	*
	* @example
	* const mutex = new Mutex();
	* console.log(mutex.isLocked); // false
	* await mutex.acquire();
	* console.log(mutex.isLocked); // true
	* mutex.release();
	* console.log(mutex.isLocked); // false
	*/
	get isLocked() {
		return this.semaphore.available === 0;
	}
	/**
	* Acquires the mutex, blocking if necessary until it is available.
	* @returns A promise that resolves when the mutex is acquired.
	*
	* @example
	* const mutex = new Mutex();
	* await mutex.acquire();
	* try {
	*   // This code section cannot be executed simultaneously
	* } finally {
	*   mutex.release();
	* }
	*/
	async acquire() {
		return this.semaphore.acquire();
	}
	/**
	* Releases the mutex, allowing another waiting task to proceed.
	*
	* @example
	* const mutex = new Mutex();
	* await mutex.acquire();
	* try {
	*   // This code section cannot be executed simultaneously
	* } finally {
	*   mutex.release(); // Allows another waiting task to proceed.
	* }
	*/
	release() {
		this.semaphore.release();
	}
};
//#endregion
exports.Mutex = Mutex;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/promise/semaphore.js"
/*!***************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/promise/semaphore.js ***!
  \***************************************************************/
(__unused_webpack_module, exports) {

//#region src/promise/semaphore.ts
/**
* A counting semaphore for async functions that manages available permits.
* Semaphores are mainly used to limit the number of concurrent async tasks.
*
* Each `acquire` operation takes a permit or waits until one is available.
* Each `release` operation adds a permit, potentially allowing a waiting task to proceed.
*
* The semaphore ensures fairness by maintaining a FIFO (First In, First Out) order for acquirers.
*
* @example
* const sema = new Semaphore(2);
*
* async function task() {
*   await sema.acquire();
*   try {
*     // This code can only be executed by two tasks at the same time
*   } finally {
*     sema.release();
*   }
* }
*
* task();
* task();
* task(); // This task will wait until one of the previous tasks releases the semaphore.
*/
var Semaphore = class {
	/**
	* The maximum number of concurrent operations allowed.
	* @type {number}
	*/
	capacity;
	/**
	* The number of available permits.
	* @type {number}
	*/
	available;
	deferredTasks = [];
	/**
	* Creates an instance of Semaphore.
	* @param capacity - The maximum number of concurrent operations allowed.
	*
	* @example
	* const sema = new Semaphore(3); // Allows up to 3 concurrent operations.
	*/
	constructor(capacity) {
		this.capacity = capacity;
		this.available = capacity;
	}
	/**
	* Acquires a semaphore, blocking if necessary until one is available.
	* @returns A promise that resolves when the semaphore is acquired.
	*
	* @example
	* const sema = new Semaphore(1);
	*
	* async function criticalSection() {
	*   await sema.acquire();
	*   try {
	*     // This code section cannot be executed simultaneously
	*   } finally {
	*     sema.release();
	*   }
	* }
	*/
	async acquire() {
		if (this.available > 0) {
			this.available--;
			return;
		}
		return new Promise((resolve) => {
			this.deferredTasks.push(resolve);
		});
	}
	/**
	* Releases a semaphore, allowing one more operation to proceed.
	*
	* @example
	* const sema = new Semaphore(1);
	*
	* async function task() {
	*   await sema.acquire();
	*   try {
	*     // This code can only be executed by two tasks at the same time
	*   } finally {
	*     sema.release(); // Allows another waiting task to proceed.
	*   }
	* }
	*/
	release() {
		const deferredTask = this.deferredTasks.shift();
		if (deferredTask != null) {
			deferredTask();
			return;
		}
		if (this.available < this.capacity) this.available++;
	}
};
//#endregion
exports.Semaphore = Semaphore;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/promise/timeout.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/promise/timeout.js ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_TimeoutError = __webpack_require__(/*! ../error/TimeoutError.js */ "../../node_modules/es-toolkit/dist/error/TimeoutError.js");
//#region src/promise/timeout.ts
/**
* Returns a promise that rejects with a `TimeoutError` after a specified delay.
*
* You can pass an `AbortSignal` to cancel the timeout. Unlike most `AbortSignal`-aware
* APIs, aborting does **not** reject the promise. A `timeout` only exists to lose a
* `Promise.race`, so cancelling it leaves the promise pending forever, allowing the
* operation it guards to settle on its own. The underlying timer and abort listener
* are cleared on abort, so nothing is leaked.
*
* @param ms - The delay duration in milliseconds.
* @param options - The options object.
* @param options.signal - An optional AbortSignal to cancel the timeout. When aborted, the returned promise never settles.
* @returns A promise that rejects with a `TimeoutError` after the specified delay, or never settles if aborted.
* @throws {TimeoutError} Throws a `TimeoutError` after the specified delay.
*
* @example
* try {
*   await timeout(1000); // Timeout exception after 1 second
* } catch (error) {
*   console.error(error); // Will log 'The operation was timed out'
* }
*
* @example
* // Cancelling the timeout lifts the time limit instead of throwing.
* const controller = new AbortController();
* setTimeout(() => controller.abort(), 50);
*
* const result = await Promise.race([
*   doWork(),
*   timeout(1000, { signal: controller.signal }), // never rejects once aborted
* ]);
*/
function timeout(ms, { signal } = {}) {
	return new Promise((_resolve, reject) => {
		const abortHandler = () => {
			clearTimeout(timeoutId);
		};
		if (signal?.aborted) return;
		const timeoutId = setTimeout(() => {
			signal?.removeEventListener("abort", abortHandler);
			reject(new require_TimeoutError.TimeoutError());
		}, ms);
		signal?.addEventListener("abort", abortHandler, { once: true });
	});
}
//#endregion
exports.timeout = timeout;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/promise/withTimeout.js"
/*!*****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/promise/withTimeout.js ***!
  \*****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_timeout = __webpack_require__(/*! ./timeout.js */ "../../node_modules/es-toolkit/dist/promise/timeout.js");
//#region src/promise/withTimeout.ts
/**
* Executes an async function and enforces a timeout.
*
* If the promise does not resolve within the specified time,
* the timeout will trigger and the returned promise will be rejected.
*
* You can pass an `AbortSignal` to cancel the timeout. Aborting the signal lifts the
* time limit: the timeout stops counting and `run`'s promise is awaited without a
* deadline. It does not reject the returned promise or abort `run` itself — pass the
* same signal into `run` if you also want to cancel the underlying work.
*
* @template T
* @param run - A function that returns a promise to be executed.
* @param ms - The timeout duration in milliseconds.
* @param options - The options object.
* @param options.signal - An optional AbortSignal to cancel the timeout. When aborted, the time limit is lifted.
* @returns A promise that resolves with the result of the `run` function or rejects if the timeout is reached.
*
* @example
* async function fetchData() {
*   const response = await fetch('https://example.com/data');
*   return response.json();
* }
*
* try {
*   const data = await withTimeout(fetchData, 1000);
*   console.log(data); // Logs the fetched data if `fetchData` is resolved within 1 second.
* } catch (error) {
*   console.error(error); // Will log 'TimeoutError' if `fetchData` is not resolved within 1 second.
* }
*
* @example
* // Lift the time limit when the user opts to keep waiting.
* const controller = new AbortController();
* keepWaitingButton.onclick = () => controller.abort();
*
* const data = await withTimeout(fetchData, 1000, { signal: controller.signal });
*/
async function withTimeout(run, ms, { signal } = {}) {
	return Promise.race([run(), require_timeout.timeout(ms, { signal })]);
}
//#endregion
exports.withTimeout = withTimeout;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/camelCase.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/camelCase.js ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_capitalize = __webpack_require__(/*! ./capitalize.js */ "../../node_modules/es-toolkit/dist/string/capitalize.js");
const require_words = __webpack_require__(/*! ./words.js */ "../../node_modules/es-toolkit/dist/string/words.js");
//#region src/string/camelCase.ts
/**
* Converts a string to camel case.
*
* Camel case is the naming convention in which the first word is written in lowercase and
* each subsequent word begins with a capital letter, concatenated without any separator characters.
*
* @param str - The string that is to be changed to camel case.
* @returns The converted string to camel case.
*
* @example
* const convertedStr1 = camelCase('camelCase') // returns 'camelCase'
* const convertedStr2 = camelCase('some whitespace') // returns 'someWhitespace'
* const convertedStr3 = camelCase('hyphen-text') // returns 'hyphenText'
* const convertedStr4 = camelCase('HTTPRequest') // returns 'httpRequest'
* const convertedStr5 = camelCase('Keep unicode 😅') // returns 'keepUnicode😅'
*/
function camelCase(str) {
	const words$1 = require_words.words(str);
	if (words$1.length === 0) return "";
	const [first, ...rest] = words$1;
	return `${first.toLowerCase()}${rest.map((word) => require_capitalize.capitalize(word)).join("")}`;
}
//#endregion
exports.camelCase = camelCase;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/capitalize.js"
/*!***************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/capitalize.js ***!
  \***************************************************************/
(__unused_webpack_module, exports) {

//#region src/string/capitalize.ts
/**
* Converts the first character of string to upper case and the remaining to lower case.
*
* @template T - Literal type of the string.
* @param str - The string to be converted to uppercase.
* @returns The capitalized string.
*
* @example
* const result = capitalize('fred') // returns 'Fred'
* const result2 = capitalize('FRED') // returns 'Fred'
*/
function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
//#endregion
exports.capitalize = capitalize;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/constantCase.js"
/*!*****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/constantCase.js ***!
  \*****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_words = __webpack_require__(/*! ./words.js */ "../../node_modules/es-toolkit/dist/string/words.js");
//#region src/string/constantCase.ts
/**
* Converts a string to constant case.
*
* Constant case is a naming convention where each word is written in uppercase letters and separated by an underscore (`_`). For example, `CONSTANT_CASE`.
*
* @param str - The string that is to be changed to constant case.
* @returns The converted string to constant case.
*
* @example
* const convertedStr1 = constantCase('camelCase') // returns 'CAMEL_CASE'
* const convertedStr2 = constantCase('some whitespace') // returns 'SOME_WHITESPACE'
* const convertedStr3 = constantCase('hyphen-text') // returns 'HYPHEN_TEXT'
* const convertedStr4 = constantCase('HTTPRequest') // returns 'HTTP_REQUEST'
*/
function constantCase(str) {
	return require_words.words(str).map((word) => word.toUpperCase()).join("_");
}
//#endregion
exports.constantCase = constantCase;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/deburr.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/deburr.js ***!
  \***********************************************************/
(__unused_webpack_module, exports) {

//#region src/string/deburr.ts
const deburrMap = new Map([
	["Æ", "Ae"],
	["Ð", "D"],
	["Ø", "O"],
	["Þ", "Th"],
	["ß", "ss"],
	["æ", "ae"],
	["ð", "d"],
	["ø", "o"],
	["þ", "th"],
	["Đ", "D"],
	["đ", "d"],
	["Ħ", "H"],
	["ħ", "h"],
	["ı", "i"],
	["Ĳ", "IJ"],
	["ĳ", "ij"],
	["ĸ", "k"],
	["Ŀ", "L"],
	["ŀ", "l"],
	["Ł", "L"],
	["ł", "l"],
	["ŉ", "'n"],
	["Ŋ", "N"],
	["ŋ", "n"],
	["Œ", "Oe"],
	["œ", "oe"],
	["Ŧ", "T"],
	["ŧ", "t"],
	["ſ", "s"]
]);
/**
* Converts a string by replacing special characters and diacritical marks with their ASCII equivalents.
* For example, "Crème brûlée" becomes "Creme brulee".
*
* @param str - The input string to be deburred.
* @returns The deburred string with special characters replaced by their ASCII equivalents.
*
* @example
* // Basic usage:
* deburr('Æthelred') // returns 'Aethelred'
*
* @example
* // Handling diacritical marks:
* deburr('München') // returns 'Munchen'
*
* @example
* // Special characters:
* deburr('Crème brûlée') // returns 'Creme brulee'
*/
function deburr(str) {
	str = str.normalize("NFD");
	let result = "";
	for (let i = 0; i < str.length; i++) {
		const char = str[i];
		if (char >= "̀" && char <= "ͯ" || char >= "︠" && char <= "︣") continue;
		result += deburrMap.get(char) ?? char;
	}
	return result;
}
//#endregion
exports.deburr = deburr;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/escape.js"
/*!***********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/escape.js ***!
  \***********************************************************/
(__unused_webpack_module, exports) {

//#region src/string/escape.ts
const htmlEscapes = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
};
/**
* Converts the characters "&", "<", ">", '"', and "'" in `str` to their corresponding HTML entities.
* For example, "<" becomes "&lt;".
*
* @param str  The string to escape.
* @returns Returns the escaped string.
*
* @example
* escape('This is a <div> element.'); // returns 'This is a &lt;div&gt; element.'
* escape('This is a "quote"'); // returns 'This is a &quot;quote&quot;'
* escape("This is a 'quote'"); // returns 'This is a &#39;quote&#39;'
* escape('This is a & symbol'); // returns 'This is a &amp; symbol'
*/
function escape(str) {
	return str.replace(/[&<>"']/g, (match) => htmlEscapes[match]);
}
//#endregion
exports.escape = escape;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/escapeRegExp.js"
/*!*****************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/escapeRegExp.js ***!
  \*****************************************************************/
(__unused_webpack_module, exports) {

//#region src/string/escapeRegExp.ts
/**
* Escapes the RegExp special characters "^", "$", "\\", ".", "*", "+", "?", "(", ")", "[", "]", "{", "}", and "|" in `str`.
*
* @param str The string to escape.
* @returns Returns the escaped string.
*
* @example
* import { escapeRegExp } from 'es-toolkit/string';
*
* escapeRegExp('[es-toolkit](https://es-toolkit.dev/)'); // returns '\[es-toolkit\]\(https://es-toolkit\.dev/\)'
*/
function escapeRegExp(str) {
	return str.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
}
//#endregion
exports.escapeRegExp = escapeRegExp;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/index.js"
/*!**********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/index.js ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_capitalize = __webpack_require__(/*! ./capitalize.js */ "../../node_modules/es-toolkit/dist/string/capitalize.js");
const require_words = __webpack_require__(/*! ./words.js */ "../../node_modules/es-toolkit/dist/string/words.js");
const require_camelCase = __webpack_require__(/*! ./camelCase.js */ "../../node_modules/es-toolkit/dist/string/camelCase.js");
const require_snakeCase = __webpack_require__(/*! ./snakeCase.js */ "../../node_modules/es-toolkit/dist/string/snakeCase.js");
const require_constantCase = __webpack_require__(/*! ./constantCase.js */ "../../node_modules/es-toolkit/dist/string/constantCase.js");
const require_deburr = __webpack_require__(/*! ./deburr.js */ "../../node_modules/es-toolkit/dist/string/deburr.js");
const require_escape = __webpack_require__(/*! ./escape.js */ "../../node_modules/es-toolkit/dist/string/escape.js");
const require_escapeRegExp = __webpack_require__(/*! ./escapeRegExp.js */ "../../node_modules/es-toolkit/dist/string/escapeRegExp.js");
const require_kebabCase = __webpack_require__(/*! ./kebabCase.js */ "../../node_modules/es-toolkit/dist/string/kebabCase.js");
const require_lowerCase = __webpack_require__(/*! ./lowerCase.js */ "../../node_modules/es-toolkit/dist/string/lowerCase.js");
const require_lowerFirst = __webpack_require__(/*! ./lowerFirst.js */ "../../node_modules/es-toolkit/dist/string/lowerFirst.js");
const require_pad = __webpack_require__(/*! ./pad.js */ "../../node_modules/es-toolkit/dist/string/pad.js");
const require_pascalCase = __webpack_require__(/*! ./pascalCase.js */ "../../node_modules/es-toolkit/dist/string/pascalCase.js");
const require_reverseString = __webpack_require__(/*! ./reverseString.js */ "../../node_modules/es-toolkit/dist/string/reverseString.js");
const require_startCase = __webpack_require__(/*! ./startCase.js */ "../../node_modules/es-toolkit/dist/string/startCase.js");
const require_trimEnd = __webpack_require__(/*! ./trimEnd.js */ "../../node_modules/es-toolkit/dist/string/trimEnd.js");
const require_trimStart = __webpack_require__(/*! ./trimStart.js */ "../../node_modules/es-toolkit/dist/string/trimStart.js");
const require_trim = __webpack_require__(/*! ./trim.js */ "../../node_modules/es-toolkit/dist/string/trim.js");
const require_unescape = __webpack_require__(/*! ./unescape.js */ "../../node_modules/es-toolkit/dist/string/unescape.js");
const require_upperCase = __webpack_require__(/*! ./upperCase.js */ "../../node_modules/es-toolkit/dist/string/upperCase.js");
const require_upperFirst = __webpack_require__(/*! ./upperFirst.js */ "../../node_modules/es-toolkit/dist/string/upperFirst.js");
exports.camelCase = require_camelCase.camelCase;
exports.capitalize = require_capitalize.capitalize;
exports.constantCase = require_constantCase.constantCase;
exports.deburr = require_deburr.deburr;
exports.escape = require_escape.escape;
exports.escapeRegExp = require_escapeRegExp.escapeRegExp;
exports.kebabCase = require_kebabCase.kebabCase;
exports.lowerCase = require_lowerCase.lowerCase;
exports.lowerFirst = require_lowerFirst.lowerFirst;
exports.pad = require_pad.pad;
exports.pascalCase = require_pascalCase.pascalCase;
exports.reverseString = require_reverseString.reverseString;
exports.snakeCase = require_snakeCase.snakeCase;
exports.startCase = require_startCase.startCase;
exports.trim = require_trim.trim;
exports.trimEnd = require_trimEnd.trimEnd;
exports.trimStart = require_trimStart.trimStart;
exports.unescape = require_unescape.unescape;
exports.upperCase = require_upperCase.upperCase;
exports.upperFirst = require_upperFirst.upperFirst;
exports.words = require_words.words;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/kebabCase.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/kebabCase.js ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_words = __webpack_require__(/*! ./words.js */ "../../node_modules/es-toolkit/dist/string/words.js");
//#region src/string/kebabCase.ts
/**
* Converts a string to kebab case.
*
* Kebab case is the naming convention in which each word is written in lowercase and separated by a dash (-) character.
*
* @param str - The string that is to be changed to kebab case.
* @returns The converted string to kebab case.
*
* @example
* const convertedStr1 = kebabCase('camelCase') // returns 'camel-case'
* const convertedStr2 = kebabCase('some whitespace') // returns 'some-whitespace'
* const convertedStr3 = kebabCase('hyphen-text') // returns 'hyphen-text'
* const convertedStr4 = kebabCase('HTTPRequest') // returns 'http-request'
*/
function kebabCase(str) {
	return require_words.words(str).map((word) => word.toLowerCase()).join("-");
}
//#endregion
exports.kebabCase = kebabCase;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/lowerCase.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/lowerCase.js ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_words = __webpack_require__(/*! ./words.js */ "../../node_modules/es-toolkit/dist/string/words.js");
//#region src/string/lowerCase.ts
/**
* Converts a string to lower case.
*
* Lower case is the naming convention in which each word is written in lowercase and separated by an space ( ) character.
*
* @param str - The string that is to be changed to lower case.
* @returns The converted string to lower case.
*
* @example
* const convertedStr1 = lowerCase('camelCase') // returns 'camel case'
* const convertedStr2 = lowerCase('some whitespace') // returns 'some whitespace'
* const convertedStr3 = lowerCase('hyphen-text') // returns 'hyphen text'
* const convertedStr4 = lowerCase('HTTPRequest') // returns 'http request'
*/
function lowerCase(str) {
	return require_words.words(str).map((word) => word.toLowerCase()).join(" ");
}
//#endregion
exports.lowerCase = lowerCase;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/lowerFirst.js"
/*!***************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/lowerFirst.js ***!
  \***************************************************************/
(__unused_webpack_module, exports) {

//#region src/string/lowerFirst.ts
/**
* Converts the first character of string to lower case.
*
* @param str - The string that is to be changed
* @returns The converted string.
*
* @example
* const convertedStr1 = lowerCase('fred') // returns 'fred'
* const convertedStr2 = lowerCase('Fred') // returns 'fred'
* const convertedStr3 = lowerCase('FRED') // returns 'fRED'
*/
function lowerFirst(str) {
	return str.substring(0, 1).toLowerCase() + str.substring(1);
}
//#endregion
exports.lowerFirst = lowerFirst;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/pad.js"
/*!********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/pad.js ***!
  \********************************************************/
(__unused_webpack_module, exports) {

//#region src/string/pad.ts
/**
* Pads string on the left and right sides if it's shorter than length. Padding characters are truncated if they can't be evenly divided by length.
* If the length is less than or equal to the original string's length, or if the padding character is an empty string, the original string is returned unchanged.
*
* @param str - The string to pad.
* @param [length] - The length of the resulting string once padded.
* @param [chars] - The character(s) to use for padding.
* @returns The padded string, or the original string if padding is not required.
*
* @example
* const result1 = pad('abc', 8);         // result will be '  abc   '
* const result2 = pad('abc', 8, '_-');   // result will be '_-abc_-_'
* const result3 = pad('abc', 3);         // result will be 'abc'
* const result4 = pad('abc', 2);         // result will be 'abc'
*
*/
function pad(str, length, chars = " ") {
	return str.padStart(Math.floor((length - str.length) / 2) + str.length, chars).padEnd(length, chars);
}
//#endregion
exports.pad = pad;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/pascalCase.js"
/*!***************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/pascalCase.js ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_capitalize = __webpack_require__(/*! ./capitalize.js */ "../../node_modules/es-toolkit/dist/string/capitalize.js");
const require_words = __webpack_require__(/*! ./words.js */ "../../node_modules/es-toolkit/dist/string/words.js");
//#region src/string/pascalCase.ts
/**
* Converts a string to Pascal case.
*
* Pascal case is the naming convention in which each word is capitalized and concatenated without any separator characters.
*
* @param str - The string that is to be changed to pascal case.
* @returns The converted string to Pascal case.
*
* @example
* const convertedStr1 = pascalCase('pascalCase') // returns 'PascalCase'
* const convertedStr2 = pascalCase('some whitespace') // returns 'SomeWhitespace'
* const convertedStr3 = pascalCase('hyphen-text') // returns 'HyphenText'
* const convertedStr4 = pascalCase('HTTPRequest') // returns 'HttpRequest'
*/
function pascalCase(str) {
	return require_words.words(str).map((word) => require_capitalize.capitalize(word)).join("");
}
//#endregion
exports.pascalCase = pascalCase;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/reverseString.js"
/*!******************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/reverseString.js ***!
  \******************************************************************/
(__unused_webpack_module, exports) {

//#region src/string/reverseString.ts
/**
* Reverses a given string.
*
* This function takes a string as input and returns a new string that is the reverse of the input.
*
* @param value - The string that is to be reversed.
* @returns The reversed string.
*
* @example
* const reversedStr1 = reverseString('hello') // returns 'olleh'
* const reversedStr2 = reverseString('PascalCase') // returns 'esaClacsaP'
* const reversedStr3 = reverseString('foo 😄 bar') // returns 'rab 😄 oof'
*/
function reverseString(value) {
	return [...value].reverse().join("");
}
//#endregion
exports.reverseString = reverseString;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/snakeCase.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/snakeCase.js ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_words = __webpack_require__(/*! ./words.js */ "../../node_modules/es-toolkit/dist/string/words.js");
//#region src/string/snakeCase.ts
/**
* Converts a string to snake case.
*
* Snake case is the naming convention in which each word is written in lowercase and separated by an underscore (_) character.
*
* @param str - The string that is to be changed to snake case.
* @returns The converted string to snake case.
*
* @example
* const convertedStr1 = snakeCase('camelCase') // returns 'camel_case'
* const convertedStr2 = snakeCase('some whitespace') // returns 'some_whitespace'
* const convertedStr3 = snakeCase('hyphen-text') // returns 'hyphen_text'
* const convertedStr4 = snakeCase('HTTPRequest') // returns 'http_request'
*/
function snakeCase(str) {
	return require_words.words(str).map((word) => word.toLowerCase()).join("_");
}
//#endregion
exports.snakeCase = snakeCase;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/startCase.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/startCase.js ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_words = __webpack_require__(/*! ./words.js */ "../../node_modules/es-toolkit/dist/string/words.js");
//#region src/string/startCase.ts
/**
* Converts the first character of each word in a string to uppercase and the remaining characters to lowercase.
*
* Start case is the naming convention in which each word is written with an initial capital letter.
* @param str - The string to convert.
* @returns The converted string.
*
* @example
* const result1 = startCase('hello world');  // result will be 'Hello World'
* const result2 = startCase('HELLO WORLD');  // result will be 'Hello World'
* const result3 = startCase('hello-world');  // result will be 'Hello World'
* const result4 = startCase('hello_world');  // result will be 'Hello World'
*/
function startCase(str) {
	const words$1 = require_words.words(str.trim());
	let result = "";
	for (let i = 0; i < words$1.length; i++) {
		const word = words$1[i];
		if (result) result += " ";
		result += word[0].toUpperCase() + word.slice(1).toLowerCase();
	}
	return result;
}
//#endregion
exports.startCase = startCase;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/trim.js"
/*!*********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/trim.js ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_trimEnd = __webpack_require__(/*! ./trimEnd.js */ "../../node_modules/es-toolkit/dist/string/trimEnd.js");
const require_trimStart = __webpack_require__(/*! ./trimStart.js */ "../../node_modules/es-toolkit/dist/string/trimStart.js");
//#region src/string/trim.ts
/**
* Removes leading and trailing whitespace or specified characters from a string.
*
* @param str - The string from which characters will be trimmed.
* @param chars - The character(s) to remove from the string. Can be a single character or an array of characters.
* @returns The resulting string after the specified characters have been removed.
*
* @example
* trim("  hello  "); // "hello"
* trim("--hello--", "-"); // "hello"
* trim("##hello##", ["#", "o"]); // "hell"
*/
function trim(str, chars) {
	if (chars === void 0) return str.trim();
	return require_trimStart.trimStart(require_trimEnd.trimEnd(str, chars), chars);
}
//#endregion
exports.trim = trim;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/trimEnd.js"
/*!************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/trimEnd.js ***!
  \************************************************************/
(__unused_webpack_module, exports) {

//#region src/string/trimEnd.ts
/**
* Removes trailing whitespace or specified characters from a string.
*
* If `chars` is a string, it should be a single character. To trim a string with multiple characters,
* provide an array instead.
*
* @param str - The string from which trailing characters will be trimmed.
* @param chars - The character(s) to remove from the end of the string.
* @returns The resulting string after the specified trailing character has been removed.
*
* @example
* const trimmedStr1 = trimEnd('hello---', '-') // returns 'hello'
* const trimmedStr2 = trimEnd('123000', '0') // returns '123'
* const trimmedStr3 = trimEnd('abcabcabc', 'c') // returns 'abcabcab'
* const trimmedStr4 = trimEnd('trimmedxxx', 'x') // returns 'trimmed'
*/
function trimEnd(str, chars) {
	if (chars === void 0) return str.trimEnd();
	let endIndex = str.length;
	switch (typeof chars) {
		case "string":
			if (chars.length !== 1) throw new Error(`The 'chars' parameter should be a single character string.`);
			while (endIndex > 0 && str[endIndex - 1] === chars) endIndex--;
			break;
		case "object": while (endIndex > 0 && chars.includes(str[endIndex - 1])) endIndex--;
	}
	return str.substring(0, endIndex);
}
//#endregion
exports.trimEnd = trimEnd;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/trimStart.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/trimStart.js ***!
  \**************************************************************/
(__unused_webpack_module, exports) {

//#region src/string/trimStart.ts
/**
* Removes leading whitespace or specified characters from a string.
*
* If `chars` is a string, it should be a single character. To trim a string with multiple characters,
* provide an array instead.
*
* @param str - The string from which leading characters will be trimmed.
* @param chars - The character(s) to remove from the start of the string.
* @returns The resulting string after the specified leading character has been removed.
*
* @example
* const trimmedStr1 = trimStart('---hello', '-') // returns 'hello'
* const trimmedStr2 = trimStart('000123', '0') // returns '123'
* const trimmedStr3 = trimStart('abcabcabc', 'a') // returns 'bcabcabc'
* const trimmedStr4 = trimStart('xxxtrimmed', 'x') // returns 'trimmed'
*/
function trimStart(str, chars) {
	if (chars === void 0) return str.trimStart();
	let startIndex = 0;
	switch (typeof chars) {
		case "string":
			while (startIndex < str.length && str[startIndex] === chars) startIndex++;
			break;
		case "object": while (startIndex < str.length && chars.includes(str[startIndex])) startIndex++;
	}
	return str.substring(startIndex);
}
//#endregion
exports.trimStart = trimStart;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/unescape.js"
/*!*************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/unescape.js ***!
  \*************************************************************/
(__unused_webpack_module, exports) {

//#region src/string/unescape.ts
const htmlUnescapes = {
	"&amp;": "&",
	"&lt;": "<",
	"&gt;": ">",
	"&quot;": "\"",
	"&#39;": "'"
};
/**
* Converts the HTML entities `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `str` to their corresponding characters.
* It is the inverse of `escape`.
*
* @param str The string to unescape.
* @returns Returns the unescaped string.
*
* @example
* unescape('This is a &lt;div&gt; element.'); // returns 'This is a <div> element.'
* unescape('This is a &quot;quote&quot;'); // returns 'This is a "quote"'
* unescape('This is a &#39;quote&#39;'); // returns 'This is a 'quote''
* unescape('This is a &amp; symbol'); // returns 'This is a & symbol'
*/
function unescape(str) {
	return str.replace(/&(?:amp|lt|gt|quot|#(0+)?39);/g, (match) => htmlUnescapes[match] || "'");
}
//#endregion
exports.unescape = unescape;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/upperCase.js"
/*!**************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/upperCase.js ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

const require_words = __webpack_require__(/*! ./words.js */ "../../node_modules/es-toolkit/dist/string/words.js");
//#region src/string/upperCase.ts
/**
* Converts a string to upper case.
*
* Upper case is the naming convention in which each word is written in uppercase and separated by an space ( ) character.
*
* @param str - The string that is to be changed to upper case.
* @returns The converted string to upper case.
*
* @example
* const convertedStr1 = upperCase('camelCase') // returns 'CAMEL CASE'
* const convertedStr2 = upperCase('some whitespace') // returns 'SOME WHITESPACE'
* const convertedStr3 = upperCase('hyphen-text') // returns 'HYPHEN TEXT'
* const convertedStr4 = upperCase('HTTPRequest') // returns 'HTTP REQUEST'
*/
function upperCase(str) {
	const words$1 = require_words.words(str);
	let result = "";
	for (let i = 0; i < words$1.length; i++) {
		result += words$1[i].toUpperCase();
		if (i < words$1.length - 1) result += " ";
	}
	return result;
}
//#endregion
exports.upperCase = upperCase;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/upperFirst.js"
/*!***************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/upperFirst.js ***!
  \***************************************************************/
(__unused_webpack_module, exports) {

//#region src/string/upperFirst.ts
/**
* Converts the first character of string to upper case.
*
* @param str - The string that is to be changed
* @returns The converted string.
*
* @example
* const convertedStr1 = upperFirst('fred') // returns 'Fred'
* const convertedStr2 = upperFirst('Fred') // returns 'Fred'
* const convertedStr3 = upperFirst('FRED') // returns 'FRED'
*/
function upperFirst(str) {
	return str.substring(0, 1).toUpperCase() + str.substring(1);
}
//#endregion
exports.upperFirst = upperFirst;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/string/words.js"
/*!**********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/string/words.js ***!
  \**********************************************************/
(__unused_webpack_module, exports) {

//#region src/string/words.ts
/**
* Regular expression pattern to split strings into words for various case conversions
*
* This pattern matches sequences of characters in a string, considering the following cases:
* - Sequences of two or more uppercase letters followed by an uppercase letter and lowercase letters or digits (for acronyms)
* - Sequences of one uppercase letter optionally followed by lowercase letters and digits
* - Single uppercase letters
* - Sequences of digits
* - Emojis and other Unicode characters
*
* The resulting match can be used to convert camelCase, snake_case, kebab-case, and other mixed formats into
* a consistent format like snake case. It also supports emojis and other Unicode characters.
*
* @example
* const matches = 'camelCaseHTTPRequest🚀'.match(CASE_SPLIT_PATTERN);
* // matches: ['camel', 'Case', 'HTTP', 'Request', '🚀']
*/
const CASE_SPLIT_PATTERN = /\p{Lu}?\p{Ll}+|[0-9]+|\p{Lu}+(?!\p{Ll})|\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{L}+/gu;
/**
* Splits `string` into an array of its words, treating spaces and punctuation marks as separators.
*
* @param str The string to inspect.
* @param [pattern] The pattern to match words.
* @returns Returns the words of `string`.
*
* @example
* words('fred, barney, & pebbles');
* // => ['fred', 'barney', 'pebbles']
*
* words('camelCaseHTTPRequest🚀');
* // => ['camel', 'Case', 'HTTP', 'Request', '🚀']
*
* words('Lunedì 18 Set')
* // => ['Lunedì', '18', 'Set']
*/
function words(str) {
	return Array.from(str.match(CASE_SPLIT_PATTERN) ?? []);
}
//#endregion
exports.words = words;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/util/attempt.js"
/*!**********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/util/attempt.js ***!
  \**********************************************************/
(__unused_webpack_module, exports) {

//#region src/util/attempt.ts
/**
* Attempt to execute a function and return the result or error.
* Returns a tuple where:
* - On success: [null, Result] - First element is null, second is the result
* - On error: [Error, null] - First element is the caught error, second is null
*
* @template {unknown} T - The type of the result of the function.
* @template {unknown} E - The type of the error that can be thrown by the function.
* @param func - The function to execute.
* @returns A tuple containing either [null, result] or [error, null].
*
* @example
* // Successful execution
* const [error, result] = attempt(() => 42);
* // [null, 42]
*
* // Failed execution
* const [error, result] = attempt(() => {
*   throw new Error('Something went wrong');
* });
* // [Error, null]
*
* // With type parameter
* const [error, names] = attempt<string[]>(() => ['Alice', 'Bob']);
* // [null, ['Alice', 'Bob']]
*
* @note
* Important: This function is not suitable for async functions (functions that return a `Promise`).
* When passing an async function, it will return `[null, Promise<Result>]`, but won't catch any
* errors if the Promise is rejected later.
*
* For handling async functions, use the `attemptAsync` function instead:
* ```
* const [error, data] = await attemptAsync(async () => {
*   const response = await fetch('https://api.example.com/data');
*   return response.json();
* });
* ```
*/
function attempt(func) {
	try {
		return [null, func()];
	} catch (error) {
		return [error, null];
	}
}
//#endregion
exports.attempt = attempt;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/util/attemptAsync.js"
/*!***************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/util/attemptAsync.js ***!
  \***************************************************************/
(__unused_webpack_module, exports) {

//#region src/util/attemptAsync.ts
/**
* Attempt to execute an async function and return the result or error.
* Returns a Promise that resolves to a tuple where:
* - On success: [null, Result] - First element is null, second is the result
* - On error: [Error, null] - First element is the caught error, second is null
*
* @template {unknown} T - The type of the result of the async function.
* @template {unknown} E - The type of the error that can be thrown by the async function.
* @param func - The async function to execute.
* @returns A Promise that resolves to a tuple containing either [null, result] or [error, null].
*
* @example
* // Successful execution
* const [error, data] = await attemptAsync(async () => {
*   const response = await fetch('https://api.example.com/data');
*   return response.json();
* });
* // If successful: [null, { ... data ... }]
*
* // Failed execution
* const [error, data] = await attemptAsync(async () => {
*   throw new Error('Network error');
* });
* // [Error, null]
*
* // With type parameter
* const [error, users] = await attemptAsync<User[]>(async () => {
*   const response = await fetch('https://api.example.com/users');
*   return response.json();
* });
* // users is typed as User[]
*/
async function attemptAsync(func) {
	try {
		return [null, await func()];
	} catch (error) {
		return [error, null];
	}
}
//#endregion
exports.attemptAsync = attemptAsync;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/util/index.js"
/*!********************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/util/index.js ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_attempt = __webpack_require__(/*! ./attempt.js */ "../../node_modules/es-toolkit/dist/util/attempt.js");
const require_attemptAsync = __webpack_require__(/*! ./attemptAsync.js */ "../../node_modules/es-toolkit/dist/util/attemptAsync.js");
const require_invariant = __webpack_require__(/*! ./invariant.js */ "../../node_modules/es-toolkit/dist/util/invariant.js");
exports.assert = require_invariant.invariant;
exports.attempt = require_attempt.attempt;
exports.attemptAsync = require_attemptAsync.attemptAsync;
exports.invariant = require_invariant.invariant;


/***/ },

/***/ "../../node_modules/es-toolkit/dist/util/invariant.js"
/*!************************************************************!*\
  !*** ../../node_modules/es-toolkit/dist/util/invariant.js ***!
  \************************************************************/
(__unused_webpack_module, exports) {

//#region src/util/invariant.ts
/**
* Asserts that a given condition is true. If the condition is false, an error is thrown with the provided message.
*
* @param condition - The condition to evaluate.
* @param [message] - The error message to throw if the condition is false.
* @returns Returns void if the condition is true.
* @throws {Error} Throws an error if the condition is false.
*
* @example
* // This call will succeed without any errors
* invariant(true, 'This should not throw');
*
* // This call will fail and throw an error with the message 'This should throw'
* invariant(false, 'This should throw');
*
* // Example of using invariant with a condition
* invariant(condition, 'Expected condition is false');
*
* // Ensure that the value is neither null nor undefined
* invariant(value !== null && value !== undefined, 'Value should not be null or undefined');
*
* // Example of using invariant to check if a number is positive
* invariant(number > 0, 'Number must be positive');
*/
function invariant(condition, message) {
	if (condition) return;
	if (typeof message === "string") throw new Error(message);
	throw message;
}
//#endregion
exports.invariant = invariant;


/***/ },

/***/ "../../node_modules/events/events.js"
/*!*******************************************!*\
  !*** ../../node_modules/events/events.js ***!
  \*******************************************/
(module) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ },

/***/ "../../node_modules/he/he.js"
/*!***********************************!*\
  !*** ../../node_modules/he/he.js ***!
  \***********************************/
(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/he v1.2.0 by @mathias | MIT license */
;(function(root) {

	// Detect free variables `exports`.
	var freeExports =  true && exports;

	// Detect free variable `module`.
	var freeModule =  true && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`.
	var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	// All astral symbols.
	var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
	// All ASCII symbols (not just printable ASCII) except those listed in the
	// first column of the overrides table.
	// https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides
	var regexAsciiWhitelist = /[\x01-\x7F]/g;
	// All BMP symbols that are not ASCII newlines, printable ASCII symbols, or
	// code points listed in the first column of the overrides table on
	// https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides.
	var regexBmpWhitelist = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;

	var regexEncodeNonAscii = /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g;
	var encodeMap = {'\xAD':'shy','\u200C':'zwnj','\u200D':'zwj','\u200E':'lrm','\u2063':'ic','\u2062':'it','\u2061':'af','\u200F':'rlm','\u200B':'ZeroWidthSpace','\u2060':'NoBreak','\u0311':'DownBreve','\u20DB':'tdot','\u20DC':'DotDot','\t':'Tab','\n':'NewLine','\u2008':'puncsp','\u205F':'MediumSpace','\u2009':'thinsp','\u200A':'hairsp','\u2004':'emsp13','\u2002':'ensp','\u2005':'emsp14','\u2003':'emsp','\u2007':'numsp','\xA0':'nbsp','\u205F\u200A':'ThickSpace','\u203E':'oline','_':'lowbar','\u2010':'dash','\u2013':'ndash','\u2014':'mdash','\u2015':'horbar',',':'comma',';':'semi','\u204F':'bsemi',':':'colon','\u2A74':'Colone','!':'excl','\xA1':'iexcl','?':'quest','\xBF':'iquest','.':'period','\u2025':'nldr','\u2026':'mldr','\xB7':'middot','\'':'apos','\u2018':'lsquo','\u2019':'rsquo','\u201A':'sbquo','\u2039':'lsaquo','\u203A':'rsaquo','"':'quot','\u201C':'ldquo','\u201D':'rdquo','\u201E':'bdquo','\xAB':'laquo','\xBB':'raquo','(':'lpar',')':'rpar','[':'lsqb',']':'rsqb','{':'lcub','}':'rcub','\u2308':'lceil','\u2309':'rceil','\u230A':'lfloor','\u230B':'rfloor','\u2985':'lopar','\u2986':'ropar','\u298B':'lbrke','\u298C':'rbrke','\u298D':'lbrkslu','\u298E':'rbrksld','\u298F':'lbrksld','\u2990':'rbrkslu','\u2991':'langd','\u2992':'rangd','\u2993':'lparlt','\u2994':'rpargt','\u2995':'gtlPar','\u2996':'ltrPar','\u27E6':'lobrk','\u27E7':'robrk','\u27E8':'lang','\u27E9':'rang','\u27EA':'Lang','\u27EB':'Rang','\u27EC':'loang','\u27ED':'roang','\u2772':'lbbrk','\u2773':'rbbrk','\u2016':'Vert','\xA7':'sect','\xB6':'para','@':'commat','*':'ast','/':'sol','undefined':null,'&':'amp','#':'num','%':'percnt','\u2030':'permil','\u2031':'pertenk','\u2020':'dagger','\u2021':'Dagger','\u2022':'bull','\u2043':'hybull','\u2032':'prime','\u2033':'Prime','\u2034':'tprime','\u2057':'qprime','\u2035':'bprime','\u2041':'caret','`':'grave','\xB4':'acute','\u02DC':'tilde','^':'Hat','\xAF':'macr','\u02D8':'breve','\u02D9':'dot','\xA8':'die','\u02DA':'ring','\u02DD':'dblac','\xB8':'cedil','\u02DB':'ogon','\u02C6':'circ','\u02C7':'caron','\xB0':'deg','\xA9':'copy','\xAE':'reg','\u2117':'copysr','\u2118':'wp','\u211E':'rx','\u2127':'mho','\u2129':'iiota','\u2190':'larr','\u219A':'nlarr','\u2192':'rarr','\u219B':'nrarr','\u2191':'uarr','\u2193':'darr','\u2194':'harr','\u21AE':'nharr','\u2195':'varr','\u2196':'nwarr','\u2197':'nearr','\u2198':'searr','\u2199':'swarr','\u219D':'rarrw','\u219D\u0338':'nrarrw','\u219E':'Larr','\u219F':'Uarr','\u21A0':'Rarr','\u21A1':'Darr','\u21A2':'larrtl','\u21A3':'rarrtl','\u21A4':'mapstoleft','\u21A5':'mapstoup','\u21A6':'map','\u21A7':'mapstodown','\u21A9':'larrhk','\u21AA':'rarrhk','\u21AB':'larrlp','\u21AC':'rarrlp','\u21AD':'harrw','\u21B0':'lsh','\u21B1':'rsh','\u21B2':'ldsh','\u21B3':'rdsh','\u21B5':'crarr','\u21B6':'cularr','\u21B7':'curarr','\u21BA':'olarr','\u21BB':'orarr','\u21BC':'lharu','\u21BD':'lhard','\u21BE':'uharr','\u21BF':'uharl','\u21C0':'rharu','\u21C1':'rhard','\u21C2':'dharr','\u21C3':'dharl','\u21C4':'rlarr','\u21C5':'udarr','\u21C6':'lrarr','\u21C7':'llarr','\u21C8':'uuarr','\u21C9':'rrarr','\u21CA':'ddarr','\u21CB':'lrhar','\u21CC':'rlhar','\u21D0':'lArr','\u21CD':'nlArr','\u21D1':'uArr','\u21D2':'rArr','\u21CF':'nrArr','\u21D3':'dArr','\u21D4':'iff','\u21CE':'nhArr','\u21D5':'vArr','\u21D6':'nwArr','\u21D7':'neArr','\u21D8':'seArr','\u21D9':'swArr','\u21DA':'lAarr','\u21DB':'rAarr','\u21DD':'zigrarr','\u21E4':'larrb','\u21E5':'rarrb','\u21F5':'duarr','\u21FD':'loarr','\u21FE':'roarr','\u21FF':'hoarr','\u2200':'forall','\u2201':'comp','\u2202':'part','\u2202\u0338':'npart','\u2203':'exist','\u2204':'nexist','\u2205':'empty','\u2207':'Del','\u2208':'in','\u2209':'notin','\u220B':'ni','\u220C':'notni','\u03F6':'bepsi','\u220F':'prod','\u2210':'coprod','\u2211':'sum','+':'plus','\xB1':'pm','\xF7':'div','\xD7':'times','<':'lt','\u226E':'nlt','<\u20D2':'nvlt','=':'equals','\u2260':'ne','=\u20E5':'bne','\u2A75':'Equal','>':'gt','\u226F':'ngt','>\u20D2':'nvgt','\xAC':'not','|':'vert','\xA6':'brvbar','\u2212':'minus','\u2213':'mp','\u2214':'plusdo','\u2044':'frasl','\u2216':'setmn','\u2217':'lowast','\u2218':'compfn','\u221A':'Sqrt','\u221D':'prop','\u221E':'infin','\u221F':'angrt','\u2220':'ang','\u2220\u20D2':'nang','\u2221':'angmsd','\u2222':'angsph','\u2223':'mid','\u2224':'nmid','\u2225':'par','\u2226':'npar','\u2227':'and','\u2228':'or','\u2229':'cap','\u2229\uFE00':'caps','\u222A':'cup','\u222A\uFE00':'cups','\u222B':'int','\u222C':'Int','\u222D':'tint','\u2A0C':'qint','\u222E':'oint','\u222F':'Conint','\u2230':'Cconint','\u2231':'cwint','\u2232':'cwconint','\u2233':'awconint','\u2234':'there4','\u2235':'becaus','\u2236':'ratio','\u2237':'Colon','\u2238':'minusd','\u223A':'mDDot','\u223B':'homtht','\u223C':'sim','\u2241':'nsim','\u223C\u20D2':'nvsim','\u223D':'bsim','\u223D\u0331':'race','\u223E':'ac','\u223E\u0333':'acE','\u223F':'acd','\u2240':'wr','\u2242':'esim','\u2242\u0338':'nesim','\u2243':'sime','\u2244':'nsime','\u2245':'cong','\u2247':'ncong','\u2246':'simne','\u2248':'ap','\u2249':'nap','\u224A':'ape','\u224B':'apid','\u224B\u0338':'napid','\u224C':'bcong','\u224D':'CupCap','\u226D':'NotCupCap','\u224D\u20D2':'nvap','\u224E':'bump','\u224E\u0338':'nbump','\u224F':'bumpe','\u224F\u0338':'nbumpe','\u2250':'doteq','\u2250\u0338':'nedot','\u2251':'eDot','\u2252':'efDot','\u2253':'erDot','\u2254':'colone','\u2255':'ecolon','\u2256':'ecir','\u2257':'cire','\u2259':'wedgeq','\u225A':'veeeq','\u225C':'trie','\u225F':'equest','\u2261':'equiv','\u2262':'nequiv','\u2261\u20E5':'bnequiv','\u2264':'le','\u2270':'nle','\u2264\u20D2':'nvle','\u2265':'ge','\u2271':'nge','\u2265\u20D2':'nvge','\u2266':'lE','\u2266\u0338':'nlE','\u2267':'gE','\u2267\u0338':'ngE','\u2268\uFE00':'lvnE','\u2268':'lnE','\u2269':'gnE','\u2269\uFE00':'gvnE','\u226A':'ll','\u226A\u0338':'nLtv','\u226A\u20D2':'nLt','\u226B':'gg','\u226B\u0338':'nGtv','\u226B\u20D2':'nGt','\u226C':'twixt','\u2272':'lsim','\u2274':'nlsim','\u2273':'gsim','\u2275':'ngsim','\u2276':'lg','\u2278':'ntlg','\u2277':'gl','\u2279':'ntgl','\u227A':'pr','\u2280':'npr','\u227B':'sc','\u2281':'nsc','\u227C':'prcue','\u22E0':'nprcue','\u227D':'sccue','\u22E1':'nsccue','\u227E':'prsim','\u227F':'scsim','\u227F\u0338':'NotSucceedsTilde','\u2282':'sub','\u2284':'nsub','\u2282\u20D2':'vnsub','\u2283':'sup','\u2285':'nsup','\u2283\u20D2':'vnsup','\u2286':'sube','\u2288':'nsube','\u2287':'supe','\u2289':'nsupe','\u228A\uFE00':'vsubne','\u228A':'subne','\u228B\uFE00':'vsupne','\u228B':'supne','\u228D':'cupdot','\u228E':'uplus','\u228F':'sqsub','\u228F\u0338':'NotSquareSubset','\u2290':'sqsup','\u2290\u0338':'NotSquareSuperset','\u2291':'sqsube','\u22E2':'nsqsube','\u2292':'sqsupe','\u22E3':'nsqsupe','\u2293':'sqcap','\u2293\uFE00':'sqcaps','\u2294':'sqcup','\u2294\uFE00':'sqcups','\u2295':'oplus','\u2296':'ominus','\u2297':'otimes','\u2298':'osol','\u2299':'odot','\u229A':'ocir','\u229B':'oast','\u229D':'odash','\u229E':'plusb','\u229F':'minusb','\u22A0':'timesb','\u22A1':'sdotb','\u22A2':'vdash','\u22AC':'nvdash','\u22A3':'dashv','\u22A4':'top','\u22A5':'bot','\u22A7':'models','\u22A8':'vDash','\u22AD':'nvDash','\u22A9':'Vdash','\u22AE':'nVdash','\u22AA':'Vvdash','\u22AB':'VDash','\u22AF':'nVDash','\u22B0':'prurel','\u22B2':'vltri','\u22EA':'nltri','\u22B3':'vrtri','\u22EB':'nrtri','\u22B4':'ltrie','\u22EC':'nltrie','\u22B4\u20D2':'nvltrie','\u22B5':'rtrie','\u22ED':'nrtrie','\u22B5\u20D2':'nvrtrie','\u22B6':'origof','\u22B7':'imof','\u22B8':'mumap','\u22B9':'hercon','\u22BA':'intcal','\u22BB':'veebar','\u22BD':'barvee','\u22BE':'angrtvb','\u22BF':'lrtri','\u22C0':'Wedge','\u22C1':'Vee','\u22C2':'xcap','\u22C3':'xcup','\u22C4':'diam','\u22C5':'sdot','\u22C6':'Star','\u22C7':'divonx','\u22C8':'bowtie','\u22C9':'ltimes','\u22CA':'rtimes','\u22CB':'lthree','\u22CC':'rthree','\u22CD':'bsime','\u22CE':'cuvee','\u22CF':'cuwed','\u22D0':'Sub','\u22D1':'Sup','\u22D2':'Cap','\u22D3':'Cup','\u22D4':'fork','\u22D5':'epar','\u22D6':'ltdot','\u22D7':'gtdot','\u22D8':'Ll','\u22D8\u0338':'nLl','\u22D9':'Gg','\u22D9\u0338':'nGg','\u22DA\uFE00':'lesg','\u22DA':'leg','\u22DB':'gel','\u22DB\uFE00':'gesl','\u22DE':'cuepr','\u22DF':'cuesc','\u22E6':'lnsim','\u22E7':'gnsim','\u22E8':'prnsim','\u22E9':'scnsim','\u22EE':'vellip','\u22EF':'ctdot','\u22F0':'utdot','\u22F1':'dtdot','\u22F2':'disin','\u22F3':'isinsv','\u22F4':'isins','\u22F5':'isindot','\u22F5\u0338':'notindot','\u22F6':'notinvc','\u22F7':'notinvb','\u22F9':'isinE','\u22F9\u0338':'notinE','\u22FA':'nisd','\u22FB':'xnis','\u22FC':'nis','\u22FD':'notnivc','\u22FE':'notnivb','\u2305':'barwed','\u2306':'Barwed','\u230C':'drcrop','\u230D':'dlcrop','\u230E':'urcrop','\u230F':'ulcrop','\u2310':'bnot','\u2312':'profline','\u2313':'profsurf','\u2315':'telrec','\u2316':'target','\u231C':'ulcorn','\u231D':'urcorn','\u231E':'dlcorn','\u231F':'drcorn','\u2322':'frown','\u2323':'smile','\u232D':'cylcty','\u232E':'profalar','\u2336':'topbot','\u233D':'ovbar','\u233F':'solbar','\u237C':'angzarr','\u23B0':'lmoust','\u23B1':'rmoust','\u23B4':'tbrk','\u23B5':'bbrk','\u23B6':'bbrktbrk','\u23DC':'OverParenthesis','\u23DD':'UnderParenthesis','\u23DE':'OverBrace','\u23DF':'UnderBrace','\u23E2':'trpezium','\u23E7':'elinters','\u2423':'blank','\u2500':'boxh','\u2502':'boxv','\u250C':'boxdr','\u2510':'boxdl','\u2514':'boxur','\u2518':'boxul','\u251C':'boxvr','\u2524':'boxvl','\u252C':'boxhd','\u2534':'boxhu','\u253C':'boxvh','\u2550':'boxH','\u2551':'boxV','\u2552':'boxdR','\u2553':'boxDr','\u2554':'boxDR','\u2555':'boxdL','\u2556':'boxDl','\u2557':'boxDL','\u2558':'boxuR','\u2559':'boxUr','\u255A':'boxUR','\u255B':'boxuL','\u255C':'boxUl','\u255D':'boxUL','\u255E':'boxvR','\u255F':'boxVr','\u2560':'boxVR','\u2561':'boxvL','\u2562':'boxVl','\u2563':'boxVL','\u2564':'boxHd','\u2565':'boxhD','\u2566':'boxHD','\u2567':'boxHu','\u2568':'boxhU','\u2569':'boxHU','\u256A':'boxvH','\u256B':'boxVh','\u256C':'boxVH','\u2580':'uhblk','\u2584':'lhblk','\u2588':'block','\u2591':'blk14','\u2592':'blk12','\u2593':'blk34','\u25A1':'squ','\u25AA':'squf','\u25AB':'EmptyVerySmallSquare','\u25AD':'rect','\u25AE':'marker','\u25B1':'fltns','\u25B3':'xutri','\u25B4':'utrif','\u25B5':'utri','\u25B8':'rtrif','\u25B9':'rtri','\u25BD':'xdtri','\u25BE':'dtrif','\u25BF':'dtri','\u25C2':'ltrif','\u25C3':'ltri','\u25CA':'loz','\u25CB':'cir','\u25EC':'tridot','\u25EF':'xcirc','\u25F8':'ultri','\u25F9':'urtri','\u25FA':'lltri','\u25FB':'EmptySmallSquare','\u25FC':'FilledSmallSquare','\u2605':'starf','\u2606':'star','\u260E':'phone','\u2640':'female','\u2642':'male','\u2660':'spades','\u2663':'clubs','\u2665':'hearts','\u2666':'diams','\u266A':'sung','\u2713':'check','\u2717':'cross','\u2720':'malt','\u2736':'sext','\u2758':'VerticalSeparator','\u27C8':'bsolhsub','\u27C9':'suphsol','\u27F5':'xlarr','\u27F6':'xrarr','\u27F7':'xharr','\u27F8':'xlArr','\u27F9':'xrArr','\u27FA':'xhArr','\u27FC':'xmap','\u27FF':'dzigrarr','\u2902':'nvlArr','\u2903':'nvrArr','\u2904':'nvHarr','\u2905':'Map','\u290C':'lbarr','\u290D':'rbarr','\u290E':'lBarr','\u290F':'rBarr','\u2910':'RBarr','\u2911':'DDotrahd','\u2912':'UpArrowBar','\u2913':'DownArrowBar','\u2916':'Rarrtl','\u2919':'latail','\u291A':'ratail','\u291B':'lAtail','\u291C':'rAtail','\u291D':'larrfs','\u291E':'rarrfs','\u291F':'larrbfs','\u2920':'rarrbfs','\u2923':'nwarhk','\u2924':'nearhk','\u2925':'searhk','\u2926':'swarhk','\u2927':'nwnear','\u2928':'toea','\u2929':'tosa','\u292A':'swnwar','\u2933':'rarrc','\u2933\u0338':'nrarrc','\u2935':'cudarrr','\u2936':'ldca','\u2937':'rdca','\u2938':'cudarrl','\u2939':'larrpl','\u293C':'curarrm','\u293D':'cularrp','\u2945':'rarrpl','\u2948':'harrcir','\u2949':'Uarrocir','\u294A':'lurdshar','\u294B':'ldrushar','\u294E':'LeftRightVector','\u294F':'RightUpDownVector','\u2950':'DownLeftRightVector','\u2951':'LeftUpDownVector','\u2952':'LeftVectorBar','\u2953':'RightVectorBar','\u2954':'RightUpVectorBar','\u2955':'RightDownVectorBar','\u2956':'DownLeftVectorBar','\u2957':'DownRightVectorBar','\u2958':'LeftUpVectorBar','\u2959':'LeftDownVectorBar','\u295A':'LeftTeeVector','\u295B':'RightTeeVector','\u295C':'RightUpTeeVector','\u295D':'RightDownTeeVector','\u295E':'DownLeftTeeVector','\u295F':'DownRightTeeVector','\u2960':'LeftUpTeeVector','\u2961':'LeftDownTeeVector','\u2962':'lHar','\u2963':'uHar','\u2964':'rHar','\u2965':'dHar','\u2966':'luruhar','\u2967':'ldrdhar','\u2968':'ruluhar','\u2969':'rdldhar','\u296A':'lharul','\u296B':'llhard','\u296C':'rharul','\u296D':'lrhard','\u296E':'udhar','\u296F':'duhar','\u2970':'RoundImplies','\u2971':'erarr','\u2972':'simrarr','\u2973':'larrsim','\u2974':'rarrsim','\u2975':'rarrap','\u2976':'ltlarr','\u2978':'gtrarr','\u2979':'subrarr','\u297B':'suplarr','\u297C':'lfisht','\u297D':'rfisht','\u297E':'ufisht','\u297F':'dfisht','\u299A':'vzigzag','\u299C':'vangrt','\u299D':'angrtvbd','\u29A4':'ange','\u29A5':'range','\u29A6':'dwangle','\u29A7':'uwangle','\u29A8':'angmsdaa','\u29A9':'angmsdab','\u29AA':'angmsdac','\u29AB':'angmsdad','\u29AC':'angmsdae','\u29AD':'angmsdaf','\u29AE':'angmsdag','\u29AF':'angmsdah','\u29B0':'bemptyv','\u29B1':'demptyv','\u29B2':'cemptyv','\u29B3':'raemptyv','\u29B4':'laemptyv','\u29B5':'ohbar','\u29B6':'omid','\u29B7':'opar','\u29B9':'operp','\u29BB':'olcross','\u29BC':'odsold','\u29BE':'olcir','\u29BF':'ofcir','\u29C0':'olt','\u29C1':'ogt','\u29C2':'cirscir','\u29C3':'cirE','\u29C4':'solb','\u29C5':'bsolb','\u29C9':'boxbox','\u29CD':'trisb','\u29CE':'rtriltri','\u29CF':'LeftTriangleBar','\u29CF\u0338':'NotLeftTriangleBar','\u29D0':'RightTriangleBar','\u29D0\u0338':'NotRightTriangleBar','\u29DC':'iinfin','\u29DD':'infintie','\u29DE':'nvinfin','\u29E3':'eparsl','\u29E4':'smeparsl','\u29E5':'eqvparsl','\u29EB':'lozf','\u29F4':'RuleDelayed','\u29F6':'dsol','\u2A00':'xodot','\u2A01':'xoplus','\u2A02':'xotime','\u2A04':'xuplus','\u2A06':'xsqcup','\u2A0D':'fpartint','\u2A10':'cirfnint','\u2A11':'awint','\u2A12':'rppolint','\u2A13':'scpolint','\u2A14':'npolint','\u2A15':'pointint','\u2A16':'quatint','\u2A17':'intlarhk','\u2A22':'pluscir','\u2A23':'plusacir','\u2A24':'simplus','\u2A25':'plusdu','\u2A26':'plussim','\u2A27':'plustwo','\u2A29':'mcomma','\u2A2A':'minusdu','\u2A2D':'loplus','\u2A2E':'roplus','\u2A2F':'Cross','\u2A30':'timesd','\u2A31':'timesbar','\u2A33':'smashp','\u2A34':'lotimes','\u2A35':'rotimes','\u2A36':'otimesas','\u2A37':'Otimes','\u2A38':'odiv','\u2A39':'triplus','\u2A3A':'triminus','\u2A3B':'tritime','\u2A3C':'iprod','\u2A3F':'amalg','\u2A40':'capdot','\u2A42':'ncup','\u2A43':'ncap','\u2A44':'capand','\u2A45':'cupor','\u2A46':'cupcap','\u2A47':'capcup','\u2A48':'cupbrcap','\u2A49':'capbrcup','\u2A4A':'cupcup','\u2A4B':'capcap','\u2A4C':'ccups','\u2A4D':'ccaps','\u2A50':'ccupssm','\u2A53':'And','\u2A54':'Or','\u2A55':'andand','\u2A56':'oror','\u2A57':'orslope','\u2A58':'andslope','\u2A5A':'andv','\u2A5B':'orv','\u2A5C':'andd','\u2A5D':'ord','\u2A5F':'wedbar','\u2A66':'sdote','\u2A6A':'simdot','\u2A6D':'congdot','\u2A6D\u0338':'ncongdot','\u2A6E':'easter','\u2A6F':'apacir','\u2A70':'apE','\u2A70\u0338':'napE','\u2A71':'eplus','\u2A72':'pluse','\u2A73':'Esim','\u2A77':'eDDot','\u2A78':'equivDD','\u2A79':'ltcir','\u2A7A':'gtcir','\u2A7B':'ltquest','\u2A7C':'gtquest','\u2A7D':'les','\u2A7D\u0338':'nles','\u2A7E':'ges','\u2A7E\u0338':'nges','\u2A7F':'lesdot','\u2A80':'gesdot','\u2A81':'lesdoto','\u2A82':'gesdoto','\u2A83':'lesdotor','\u2A84':'gesdotol','\u2A85':'lap','\u2A86':'gap','\u2A87':'lne','\u2A88':'gne','\u2A89':'lnap','\u2A8A':'gnap','\u2A8B':'lEg','\u2A8C':'gEl','\u2A8D':'lsime','\u2A8E':'gsime','\u2A8F':'lsimg','\u2A90':'gsiml','\u2A91':'lgE','\u2A92':'glE','\u2A93':'lesges','\u2A94':'gesles','\u2A95':'els','\u2A96':'egs','\u2A97':'elsdot','\u2A98':'egsdot','\u2A99':'el','\u2A9A':'eg','\u2A9D':'siml','\u2A9E':'simg','\u2A9F':'simlE','\u2AA0':'simgE','\u2AA1':'LessLess','\u2AA1\u0338':'NotNestedLessLess','\u2AA2':'GreaterGreater','\u2AA2\u0338':'NotNestedGreaterGreater','\u2AA4':'glj','\u2AA5':'gla','\u2AA6':'ltcc','\u2AA7':'gtcc','\u2AA8':'lescc','\u2AA9':'gescc','\u2AAA':'smt','\u2AAB':'lat','\u2AAC':'smte','\u2AAC\uFE00':'smtes','\u2AAD':'late','\u2AAD\uFE00':'lates','\u2AAE':'bumpE','\u2AAF':'pre','\u2AAF\u0338':'npre','\u2AB0':'sce','\u2AB0\u0338':'nsce','\u2AB3':'prE','\u2AB4':'scE','\u2AB5':'prnE','\u2AB6':'scnE','\u2AB7':'prap','\u2AB8':'scap','\u2AB9':'prnap','\u2ABA':'scnap','\u2ABB':'Pr','\u2ABC':'Sc','\u2ABD':'subdot','\u2ABE':'supdot','\u2ABF':'subplus','\u2AC0':'supplus','\u2AC1':'submult','\u2AC2':'supmult','\u2AC3':'subedot','\u2AC4':'supedot','\u2AC5':'subE','\u2AC5\u0338':'nsubE','\u2AC6':'supE','\u2AC6\u0338':'nsupE','\u2AC7':'subsim','\u2AC8':'supsim','\u2ACB\uFE00':'vsubnE','\u2ACB':'subnE','\u2ACC\uFE00':'vsupnE','\u2ACC':'supnE','\u2ACF':'csub','\u2AD0':'csup','\u2AD1':'csube','\u2AD2':'csupe','\u2AD3':'subsup','\u2AD4':'supsub','\u2AD5':'subsub','\u2AD6':'supsup','\u2AD7':'suphsub','\u2AD8':'supdsub','\u2AD9':'forkv','\u2ADA':'topfork','\u2ADB':'mlcp','\u2AE4':'Dashv','\u2AE6':'Vdashl','\u2AE7':'Barv','\u2AE8':'vBar','\u2AE9':'vBarv','\u2AEB':'Vbar','\u2AEC':'Not','\u2AED':'bNot','\u2AEE':'rnmid','\u2AEF':'cirmid','\u2AF0':'midcir','\u2AF1':'topcir','\u2AF2':'nhpar','\u2AF3':'parsim','\u2AFD':'parsl','\u2AFD\u20E5':'nparsl','\u266D':'flat','\u266E':'natur','\u266F':'sharp','\xA4':'curren','\xA2':'cent','$':'dollar','\xA3':'pound','\xA5':'yen','\u20AC':'euro','\xB9':'sup1','\xBD':'half','\u2153':'frac13','\xBC':'frac14','\u2155':'frac15','\u2159':'frac16','\u215B':'frac18','\xB2':'sup2','\u2154':'frac23','\u2156':'frac25','\xB3':'sup3','\xBE':'frac34','\u2157':'frac35','\u215C':'frac38','\u2158':'frac45','\u215A':'frac56','\u215D':'frac58','\u215E':'frac78','\uD835\uDCB6':'ascr','\uD835\uDD52':'aopf','\uD835\uDD1E':'afr','\uD835\uDD38':'Aopf','\uD835\uDD04':'Afr','\uD835\uDC9C':'Ascr','\xAA':'ordf','\xE1':'aacute','\xC1':'Aacute','\xE0':'agrave','\xC0':'Agrave','\u0103':'abreve','\u0102':'Abreve','\xE2':'acirc','\xC2':'Acirc','\xE5':'aring','\xC5':'angst','\xE4':'auml','\xC4':'Auml','\xE3':'atilde','\xC3':'Atilde','\u0105':'aogon','\u0104':'Aogon','\u0101':'amacr','\u0100':'Amacr','\xE6':'aelig','\xC6':'AElig','\uD835\uDCB7':'bscr','\uD835\uDD53':'bopf','\uD835\uDD1F':'bfr','\uD835\uDD39':'Bopf','\u212C':'Bscr','\uD835\uDD05':'Bfr','\uD835\uDD20':'cfr','\uD835\uDCB8':'cscr','\uD835\uDD54':'copf','\u212D':'Cfr','\uD835\uDC9E':'Cscr','\u2102':'Copf','\u0107':'cacute','\u0106':'Cacute','\u0109':'ccirc','\u0108':'Ccirc','\u010D':'ccaron','\u010C':'Ccaron','\u010B':'cdot','\u010A':'Cdot','\xE7':'ccedil','\xC7':'Ccedil','\u2105':'incare','\uD835\uDD21':'dfr','\u2146':'dd','\uD835\uDD55':'dopf','\uD835\uDCB9':'dscr','\uD835\uDC9F':'Dscr','\uD835\uDD07':'Dfr','\u2145':'DD','\uD835\uDD3B':'Dopf','\u010F':'dcaron','\u010E':'Dcaron','\u0111':'dstrok','\u0110':'Dstrok','\xF0':'eth','\xD0':'ETH','\u2147':'ee','\u212F':'escr','\uD835\uDD22':'efr','\uD835\uDD56':'eopf','\u2130':'Escr','\uD835\uDD08':'Efr','\uD835\uDD3C':'Eopf','\xE9':'eacute','\xC9':'Eacute','\xE8':'egrave','\xC8':'Egrave','\xEA':'ecirc','\xCA':'Ecirc','\u011B':'ecaron','\u011A':'Ecaron','\xEB':'euml','\xCB':'Euml','\u0117':'edot','\u0116':'Edot','\u0119':'eogon','\u0118':'Eogon','\u0113':'emacr','\u0112':'Emacr','\uD835\uDD23':'ffr','\uD835\uDD57':'fopf','\uD835\uDCBB':'fscr','\uD835\uDD09':'Ffr','\uD835\uDD3D':'Fopf','\u2131':'Fscr','\uFB00':'fflig','\uFB03':'ffilig','\uFB04':'ffllig','\uFB01':'filig','fj':'fjlig','\uFB02':'fllig','\u0192':'fnof','\u210A':'gscr','\uD835\uDD58':'gopf','\uD835\uDD24':'gfr','\uD835\uDCA2':'Gscr','\uD835\uDD3E':'Gopf','\uD835\uDD0A':'Gfr','\u01F5':'gacute','\u011F':'gbreve','\u011E':'Gbreve','\u011D':'gcirc','\u011C':'Gcirc','\u0121':'gdot','\u0120':'Gdot','\u0122':'Gcedil','\uD835\uDD25':'hfr','\u210E':'planckh','\uD835\uDCBD':'hscr','\uD835\uDD59':'hopf','\u210B':'Hscr','\u210C':'Hfr','\u210D':'Hopf','\u0125':'hcirc','\u0124':'Hcirc','\u210F':'hbar','\u0127':'hstrok','\u0126':'Hstrok','\uD835\uDD5A':'iopf','\uD835\uDD26':'ifr','\uD835\uDCBE':'iscr','\u2148':'ii','\uD835\uDD40':'Iopf','\u2110':'Iscr','\u2111':'Im','\xED':'iacute','\xCD':'Iacute','\xEC':'igrave','\xCC':'Igrave','\xEE':'icirc','\xCE':'Icirc','\xEF':'iuml','\xCF':'Iuml','\u0129':'itilde','\u0128':'Itilde','\u0130':'Idot','\u012F':'iogon','\u012E':'Iogon','\u012B':'imacr','\u012A':'Imacr','\u0133':'ijlig','\u0132':'IJlig','\u0131':'imath','\uD835\uDCBF':'jscr','\uD835\uDD5B':'jopf','\uD835\uDD27':'jfr','\uD835\uDCA5':'Jscr','\uD835\uDD0D':'Jfr','\uD835\uDD41':'Jopf','\u0135':'jcirc','\u0134':'Jcirc','\u0237':'jmath','\uD835\uDD5C':'kopf','\uD835\uDCC0':'kscr','\uD835\uDD28':'kfr','\uD835\uDCA6':'Kscr','\uD835\uDD42':'Kopf','\uD835\uDD0E':'Kfr','\u0137':'kcedil','\u0136':'Kcedil','\uD835\uDD29':'lfr','\uD835\uDCC1':'lscr','\u2113':'ell','\uD835\uDD5D':'lopf','\u2112':'Lscr','\uD835\uDD0F':'Lfr','\uD835\uDD43':'Lopf','\u013A':'lacute','\u0139':'Lacute','\u013E':'lcaron','\u013D':'Lcaron','\u013C':'lcedil','\u013B':'Lcedil','\u0142':'lstrok','\u0141':'Lstrok','\u0140':'lmidot','\u013F':'Lmidot','\uD835\uDD2A':'mfr','\uD835\uDD5E':'mopf','\uD835\uDCC2':'mscr','\uD835\uDD10':'Mfr','\uD835\uDD44':'Mopf','\u2133':'Mscr','\uD835\uDD2B':'nfr','\uD835\uDD5F':'nopf','\uD835\uDCC3':'nscr','\u2115':'Nopf','\uD835\uDCA9':'Nscr','\uD835\uDD11':'Nfr','\u0144':'nacute','\u0143':'Nacute','\u0148':'ncaron','\u0147':'Ncaron','\xF1':'ntilde','\xD1':'Ntilde','\u0146':'ncedil','\u0145':'Ncedil','\u2116':'numero','\u014B':'eng','\u014A':'ENG','\uD835\uDD60':'oopf','\uD835\uDD2C':'ofr','\u2134':'oscr','\uD835\uDCAA':'Oscr','\uD835\uDD12':'Ofr','\uD835\uDD46':'Oopf','\xBA':'ordm','\xF3':'oacute','\xD3':'Oacute','\xF2':'ograve','\xD2':'Ograve','\xF4':'ocirc','\xD4':'Ocirc','\xF6':'ouml','\xD6':'Ouml','\u0151':'odblac','\u0150':'Odblac','\xF5':'otilde','\xD5':'Otilde','\xF8':'oslash','\xD8':'Oslash','\u014D':'omacr','\u014C':'Omacr','\u0153':'oelig','\u0152':'OElig','\uD835\uDD2D':'pfr','\uD835\uDCC5':'pscr','\uD835\uDD61':'popf','\u2119':'Popf','\uD835\uDD13':'Pfr','\uD835\uDCAB':'Pscr','\uD835\uDD62':'qopf','\uD835\uDD2E':'qfr','\uD835\uDCC6':'qscr','\uD835\uDCAC':'Qscr','\uD835\uDD14':'Qfr','\u211A':'Qopf','\u0138':'kgreen','\uD835\uDD2F':'rfr','\uD835\uDD63':'ropf','\uD835\uDCC7':'rscr','\u211B':'Rscr','\u211C':'Re','\u211D':'Ropf','\u0155':'racute','\u0154':'Racute','\u0159':'rcaron','\u0158':'Rcaron','\u0157':'rcedil','\u0156':'Rcedil','\uD835\uDD64':'sopf','\uD835\uDCC8':'sscr','\uD835\uDD30':'sfr','\uD835\uDD4A':'Sopf','\uD835\uDD16':'Sfr','\uD835\uDCAE':'Sscr','\u24C8':'oS','\u015B':'sacute','\u015A':'Sacute','\u015D':'scirc','\u015C':'Scirc','\u0161':'scaron','\u0160':'Scaron','\u015F':'scedil','\u015E':'Scedil','\xDF':'szlig','\uD835\uDD31':'tfr','\uD835\uDCC9':'tscr','\uD835\uDD65':'topf','\uD835\uDCAF':'Tscr','\uD835\uDD17':'Tfr','\uD835\uDD4B':'Topf','\u0165':'tcaron','\u0164':'Tcaron','\u0163':'tcedil','\u0162':'Tcedil','\u2122':'trade','\u0167':'tstrok','\u0166':'Tstrok','\uD835\uDCCA':'uscr','\uD835\uDD66':'uopf','\uD835\uDD32':'ufr','\uD835\uDD4C':'Uopf','\uD835\uDD18':'Ufr','\uD835\uDCB0':'Uscr','\xFA':'uacute','\xDA':'Uacute','\xF9':'ugrave','\xD9':'Ugrave','\u016D':'ubreve','\u016C':'Ubreve','\xFB':'ucirc','\xDB':'Ucirc','\u016F':'uring','\u016E':'Uring','\xFC':'uuml','\xDC':'Uuml','\u0171':'udblac','\u0170':'Udblac','\u0169':'utilde','\u0168':'Utilde','\u0173':'uogon','\u0172':'Uogon','\u016B':'umacr','\u016A':'Umacr','\uD835\uDD33':'vfr','\uD835\uDD67':'vopf','\uD835\uDCCB':'vscr','\uD835\uDD19':'Vfr','\uD835\uDD4D':'Vopf','\uD835\uDCB1':'Vscr','\uD835\uDD68':'wopf','\uD835\uDCCC':'wscr','\uD835\uDD34':'wfr','\uD835\uDCB2':'Wscr','\uD835\uDD4E':'Wopf','\uD835\uDD1A':'Wfr','\u0175':'wcirc','\u0174':'Wcirc','\uD835\uDD35':'xfr','\uD835\uDCCD':'xscr','\uD835\uDD69':'xopf','\uD835\uDD4F':'Xopf','\uD835\uDD1B':'Xfr','\uD835\uDCB3':'Xscr','\uD835\uDD36':'yfr','\uD835\uDCCE':'yscr','\uD835\uDD6A':'yopf','\uD835\uDCB4':'Yscr','\uD835\uDD1C':'Yfr','\uD835\uDD50':'Yopf','\xFD':'yacute','\xDD':'Yacute','\u0177':'ycirc','\u0176':'Ycirc','\xFF':'yuml','\u0178':'Yuml','\uD835\uDCCF':'zscr','\uD835\uDD37':'zfr','\uD835\uDD6B':'zopf','\u2128':'Zfr','\u2124':'Zopf','\uD835\uDCB5':'Zscr','\u017A':'zacute','\u0179':'Zacute','\u017E':'zcaron','\u017D':'Zcaron','\u017C':'zdot','\u017B':'Zdot','\u01B5':'imped','\xFE':'thorn','\xDE':'THORN','\u0149':'napos','\u03B1':'alpha','\u0391':'Alpha','\u03B2':'beta','\u0392':'Beta','\u03B3':'gamma','\u0393':'Gamma','\u03B4':'delta','\u0394':'Delta','\u03B5':'epsi','\u03F5':'epsiv','\u0395':'Epsilon','\u03DD':'gammad','\u03DC':'Gammad','\u03B6':'zeta','\u0396':'Zeta','\u03B7':'eta','\u0397':'Eta','\u03B8':'theta','\u03D1':'thetav','\u0398':'Theta','\u03B9':'iota','\u0399':'Iota','\u03BA':'kappa','\u03F0':'kappav','\u039A':'Kappa','\u03BB':'lambda','\u039B':'Lambda','\u03BC':'mu','\xB5':'micro','\u039C':'Mu','\u03BD':'nu','\u039D':'Nu','\u03BE':'xi','\u039E':'Xi','\u03BF':'omicron','\u039F':'Omicron','\u03C0':'pi','\u03D6':'piv','\u03A0':'Pi','\u03C1':'rho','\u03F1':'rhov','\u03A1':'Rho','\u03C3':'sigma','\u03A3':'Sigma','\u03C2':'sigmaf','\u03C4':'tau','\u03A4':'Tau','\u03C5':'upsi','\u03A5':'Upsilon','\u03D2':'Upsi','\u03C6':'phi','\u03D5':'phiv','\u03A6':'Phi','\u03C7':'chi','\u03A7':'Chi','\u03C8':'psi','\u03A8':'Psi','\u03C9':'omega','\u03A9':'ohm','\u0430':'acy','\u0410':'Acy','\u0431':'bcy','\u0411':'Bcy','\u0432':'vcy','\u0412':'Vcy','\u0433':'gcy','\u0413':'Gcy','\u0453':'gjcy','\u0403':'GJcy','\u0434':'dcy','\u0414':'Dcy','\u0452':'djcy','\u0402':'DJcy','\u0435':'iecy','\u0415':'IEcy','\u0451':'iocy','\u0401':'IOcy','\u0454':'jukcy','\u0404':'Jukcy','\u0436':'zhcy','\u0416':'ZHcy','\u0437':'zcy','\u0417':'Zcy','\u0455':'dscy','\u0405':'DScy','\u0438':'icy','\u0418':'Icy','\u0456':'iukcy','\u0406':'Iukcy','\u0457':'yicy','\u0407':'YIcy','\u0439':'jcy','\u0419':'Jcy','\u0458':'jsercy','\u0408':'Jsercy','\u043A':'kcy','\u041A':'Kcy','\u045C':'kjcy','\u040C':'KJcy','\u043B':'lcy','\u041B':'Lcy','\u0459':'ljcy','\u0409':'LJcy','\u043C':'mcy','\u041C':'Mcy','\u043D':'ncy','\u041D':'Ncy','\u045A':'njcy','\u040A':'NJcy','\u043E':'ocy','\u041E':'Ocy','\u043F':'pcy','\u041F':'Pcy','\u0440':'rcy','\u0420':'Rcy','\u0441':'scy','\u0421':'Scy','\u0442':'tcy','\u0422':'Tcy','\u045B':'tshcy','\u040B':'TSHcy','\u0443':'ucy','\u0423':'Ucy','\u045E':'ubrcy','\u040E':'Ubrcy','\u0444':'fcy','\u0424':'Fcy','\u0445':'khcy','\u0425':'KHcy','\u0446':'tscy','\u0426':'TScy','\u0447':'chcy','\u0427':'CHcy','\u045F':'dzcy','\u040F':'DZcy','\u0448':'shcy','\u0428':'SHcy','\u0449':'shchcy','\u0429':'SHCHcy','\u044A':'hardcy','\u042A':'HARDcy','\u044B':'ycy','\u042B':'Ycy','\u044C':'softcy','\u042C':'SOFTcy','\u044D':'ecy','\u042D':'Ecy','\u044E':'yucy','\u042E':'YUcy','\u044F':'yacy','\u042F':'YAcy','\u2135':'aleph','\u2136':'beth','\u2137':'gimel','\u2138':'daleth'};

	var regexEscape = /["&'<>`]/g;
	var escapeMap = {
		'"': '&quot;',
		'&': '&amp;',
		'\'': '&#x27;',
		'<': '&lt;',
		// See https://mathiasbynens.be/notes/ambiguous-ampersands: in HTML, the
		// following is not strictly necessary unless it’s part of a tag or an
		// unquoted attribute value. We’re only escaping it to support those
		// situations, and for XML support.
		'>': '&gt;',
		// In Internet Explorer ≤ 8, the backtick character can be used
		// to break out of (un)quoted attribute values or HTML comments.
		// See http://html5sec.org/#102, http://html5sec.org/#108, and
		// http://html5sec.org/#133.
		'`': '&#x60;'
	};

	var regexInvalidEntity = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/;
	var regexInvalidRawCodePoint = /[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
	var regexDecode = /&(CounterClockwiseContourIntegral|DoubleLongLeftRightArrow|ClockwiseContourIntegral|NotNestedGreaterGreater|NotSquareSupersetEqual|DiacriticalDoubleAcute|NotRightTriangleEqual|NotSucceedsSlantEqual|NotPrecedesSlantEqual|CloseCurlyDoubleQuote|NegativeVeryThinSpace|DoubleContourIntegral|FilledVerySmallSquare|CapitalDifferentialD|OpenCurlyDoubleQuote|EmptyVerySmallSquare|NestedGreaterGreater|DoubleLongRightArrow|NotLeftTriangleEqual|NotGreaterSlantEqual|ReverseUpEquilibrium|DoubleLeftRightArrow|NotSquareSubsetEqual|NotDoubleVerticalBar|RightArrowLeftArrow|NotGreaterFullEqual|NotRightTriangleBar|SquareSupersetEqual|DownLeftRightVector|DoubleLongLeftArrow|leftrightsquigarrow|LeftArrowRightArrow|NegativeMediumSpace|blacktriangleright|RightDownVectorBar|PrecedesSlantEqual|RightDoubleBracket|SucceedsSlantEqual|NotLeftTriangleBar|RightTriangleEqual|SquareIntersection|RightDownTeeVector|ReverseEquilibrium|NegativeThickSpace|longleftrightarrow|Longleftrightarrow|LongLeftRightArrow|DownRightTeeVector|DownRightVectorBar|GreaterSlantEqual|SquareSubsetEqual|LeftDownVectorBar|LeftDoubleBracket|VerticalSeparator|rightleftharpoons|NotGreaterGreater|NotSquareSuperset|blacktriangleleft|blacktriangledown|NegativeThinSpace|LeftDownTeeVector|NotLessSlantEqual|leftrightharpoons|DoubleUpDownArrow|DoubleVerticalBar|LeftTriangleEqual|FilledSmallSquare|twoheadrightarrow|NotNestedLessLess|DownLeftTeeVector|DownLeftVectorBar|RightAngleBracket|NotTildeFullEqual|NotReverseElement|RightUpDownVector|DiacriticalTilde|NotSucceedsTilde|circlearrowright|NotPrecedesEqual|rightharpoondown|DoubleRightArrow|NotSucceedsEqual|NonBreakingSpace|NotRightTriangle|LessEqualGreater|RightUpTeeVector|LeftAngleBracket|GreaterFullEqual|DownArrowUpArrow|RightUpVectorBar|twoheadleftarrow|GreaterEqualLess|downharpoonright|RightTriangleBar|ntrianglerighteq|NotSupersetEqual|LeftUpDownVector|DiacriticalAcute|rightrightarrows|vartriangleright|UpArrowDownArrow|DiacriticalGrave|UnderParenthesis|EmptySmallSquare|LeftUpVectorBar|leftrightarrows|DownRightVector|downharpoonleft|trianglerighteq|ShortRightArrow|OverParenthesis|DoubleLeftArrow|DoubleDownArrow|NotSquareSubset|bigtriangledown|ntrianglelefteq|UpperRightArrow|curvearrowright|vartriangleleft|NotLeftTriangle|nleftrightarrow|LowerRightArrow|NotHumpDownHump|NotGreaterTilde|rightthreetimes|LeftUpTeeVector|NotGreaterEqual|straightepsilon|LeftTriangleBar|rightsquigarrow|ContourIntegral|rightleftarrows|CloseCurlyQuote|RightDownVector|LeftRightVector|nLeftrightarrow|leftharpoondown|circlearrowleft|SquareSuperset|OpenCurlyQuote|hookrightarrow|HorizontalLine|DiacriticalDot|NotLessGreater|ntriangleright|DoubleRightTee|InvisibleComma|InvisibleTimes|LowerLeftArrow|DownLeftVector|NotSubsetEqual|curvearrowleft|trianglelefteq|NotVerticalBar|TildeFullEqual|downdownarrows|NotGreaterLess|RightTeeVector|ZeroWidthSpace|looparrowright|LongRightArrow|doublebarwedge|ShortLeftArrow|ShortDownArrow|RightVectorBar|GreaterGreater|ReverseElement|rightharpoonup|LessSlantEqual|leftthreetimes|upharpoonright|rightarrowtail|LeftDownVector|Longrightarrow|NestedLessLess|UpperLeftArrow|nshortparallel|leftleftarrows|leftrightarrow|Leftrightarrow|LeftRightArrow|longrightarrow|upharpoonleft|RightArrowBar|ApplyFunction|LeftTeeVector|leftarrowtail|NotEqualTilde|varsubsetneqq|varsupsetneqq|RightTeeArrow|SucceedsEqual|SucceedsTilde|LeftVectorBar|SupersetEqual|hookleftarrow|DifferentialD|VerticalTilde|VeryThinSpace|blacktriangle|bigtriangleup|LessFullEqual|divideontimes|leftharpoonup|UpEquilibrium|ntriangleleft|RightTriangle|measuredangle|shortparallel|longleftarrow|Longleftarrow|LongLeftArrow|DoubleLeftTee|Poincareplane|PrecedesEqual|triangleright|DoubleUpArrow|RightUpVector|fallingdotseq|looparrowleft|PrecedesTilde|NotTildeEqual|NotTildeTilde|smallsetminus|Proportional|triangleleft|triangledown|UnderBracket|NotHumpEqual|exponentiale|ExponentialE|NotLessTilde|HilbertSpace|RightCeiling|blacklozenge|varsupsetneq|HumpDownHump|GreaterEqual|VerticalLine|LeftTeeArrow|NotLessEqual|DownTeeArrow|LeftTriangle|varsubsetneq|Intersection|NotCongruent|DownArrowBar|LeftUpVector|LeftArrowBar|risingdotseq|GreaterTilde|RoundImplies|SquareSubset|ShortUpArrow|NotSuperset|quaternions|precnapprox|backepsilon|preccurlyeq|OverBracket|blacksquare|MediumSpace|VerticalBar|circledcirc|circleddash|CircleMinus|CircleTimes|LessGreater|curlyeqprec|curlyeqsucc|diamondsuit|UpDownArrow|Updownarrow|RuleDelayed|Rrightarrow|updownarrow|RightVector|nRightarrow|nrightarrow|eqslantless|LeftCeiling|Equilibrium|SmallCircle|expectation|NotSucceeds|thickapprox|GreaterLess|SquareUnion|NotPrecedes|NotLessLess|straightphi|succnapprox|succcurlyeq|SubsetEqual|sqsupseteq|Proportion|Laplacetrf|ImaginaryI|supsetneqq|NotGreater|gtreqqless|NotElement|ThickSpace|TildeEqual|TildeTilde|Fouriertrf|rmoustache|EqualTilde|eqslantgtr|UnderBrace|LeftVector|UpArrowBar|nLeftarrow|nsubseteqq|subsetneqq|nsupseteqq|nleftarrow|succapprox|lessapprox|UpTeeArrow|upuparrows|curlywedge|lesseqqgtr|varepsilon|varnothing|RightFloor|complement|CirclePlus|sqsubseteq|Lleftarrow|circledast|RightArrow|Rightarrow|rightarrow|lmoustache|Bernoullis|precapprox|mapstoleft|mapstodown|longmapsto|dotsquare|downarrow|DoubleDot|nsubseteq|supsetneq|leftarrow|nsupseteq|subsetneq|ThinSpace|ngeqslant|subseteqq|HumpEqual|NotSubset|triangleq|NotCupCap|lesseqgtr|heartsuit|TripleDot|Leftarrow|Coproduct|Congruent|varpropto|complexes|gvertneqq|LeftArrow|LessTilde|supseteqq|MinusPlus|CircleDot|nleqslant|NotExists|gtreqless|nparallel|UnionPlus|LeftFloor|checkmark|CenterDot|centerdot|Mellintrf|gtrapprox|bigotimes|OverBrace|spadesuit|therefore|pitchfork|rationals|PlusMinus|Backslash|Therefore|DownBreve|backsimeq|backprime|DownArrow|nshortmid|Downarrow|lvertneqq|eqvparsl|imagline|imagpart|infintie|integers|Integral|intercal|LessLess|Uarrocir|intlarhk|sqsupset|angmsdaf|sqsubset|llcorner|vartheta|cupbrcap|lnapprox|Superset|SuchThat|succnsim|succneqq|angmsdag|biguplus|curlyvee|trpezium|Succeeds|NotTilde|bigwedge|angmsdah|angrtvbd|triminus|cwconint|fpartint|lrcorner|smeparsl|subseteq|urcorner|lurdshar|laemptyv|DDotrahd|approxeq|ldrushar|awconint|mapstoup|backcong|shortmid|triangle|geqslant|gesdotol|timesbar|circledR|circledS|setminus|multimap|naturals|scpolint|ncongdot|RightTee|boxminus|gnapprox|boxtimes|andslope|thicksim|angmsdaa|varsigma|cirfnint|rtriltri|angmsdab|rppolint|angmsdac|barwedge|drbkarow|clubsuit|thetasym|bsolhsub|capbrcup|dzigrarr|doteqdot|DotEqual|dotminus|UnderBar|NotEqual|realpart|otimesas|ulcorner|hksearow|hkswarow|parallel|PartialD|elinters|emptyset|plusacir|bbrktbrk|angmsdad|pointint|bigoplus|angmsdae|Precedes|bigsqcup|varkappa|notindot|supseteq|precneqq|precnsim|profalar|profline|profsurf|leqslant|lesdotor|raemptyv|subplus|notnivb|notnivc|subrarr|zigrarr|vzigzag|submult|subedot|Element|between|cirscir|larrbfs|larrsim|lotimes|lbrksld|lbrkslu|lozenge|ldrdhar|dbkarow|bigcirc|epsilon|simrarr|simplus|ltquest|Epsilon|luruhar|gtquest|maltese|npolint|eqcolon|npreceq|bigodot|ddagger|gtrless|bnequiv|harrcir|ddotseq|equivDD|backsim|demptyv|nsqsube|nsqsupe|Upsilon|nsubset|upsilon|minusdu|nsucceq|swarrow|nsupset|coloneq|searrow|boxplus|napprox|natural|asympeq|alefsym|congdot|nearrow|bigstar|diamond|supplus|tritime|LeftTee|nvinfin|triplus|NewLine|nvltrie|nvrtrie|nwarrow|nexists|Diamond|ruluhar|Implies|supmult|angzarr|suplarr|suphsub|questeq|because|digamma|Because|olcross|bemptyv|omicron|Omicron|rotimes|NoBreak|intprod|angrtvb|orderof|uwangle|suphsol|lesdoto|orslope|DownTee|realine|cudarrl|rdldhar|OverBar|supedot|lessdot|supdsub|topfork|succsim|rbrkslu|rbrksld|pertenk|cudarrr|isindot|planckh|lessgtr|pluscir|gesdoto|plussim|plustwo|lesssim|cularrp|rarrsim|Cayleys|notinva|notinvb|notinvc|UpArrow|Uparrow|uparrow|NotLess|dwangle|precsim|Product|curarrm|Cconint|dotplus|rarrbfs|ccupssm|Cedilla|cemptyv|notniva|quatint|frac35|frac38|frac45|frac56|frac58|frac78|tridot|xoplus|gacute|gammad|Gammad|lfisht|lfloor|bigcup|sqsupe|gbreve|Gbreve|lharul|sqsube|sqcups|Gcedil|apacir|llhard|lmidot|Lmidot|lmoust|andand|sqcaps|approx|Abreve|spades|circeq|tprime|divide|topcir|Assign|topbot|gesdot|divonx|xuplus|timesd|gesles|atilde|solbar|SOFTcy|loplus|timesb|lowast|lowbar|dlcorn|dlcrop|softcy|dollar|lparlt|thksim|lrhard|Atilde|lsaquo|smashp|bigvee|thinsp|wreath|bkarow|lsquor|lstrok|Lstrok|lthree|ltimes|ltlarr|DotDot|simdot|ltrPar|weierp|xsqcup|angmsd|sigmav|sigmaf|zeetrf|Zcaron|zcaron|mapsto|vsupne|thetav|cirmid|marker|mcomma|Zacute|vsubnE|there4|gtlPar|vsubne|bottom|gtrarr|SHCHcy|shchcy|midast|midcir|middot|minusb|minusd|gtrdot|bowtie|sfrown|mnplus|models|colone|seswar|Colone|mstpos|searhk|gtrsim|nacute|Nacute|boxbox|telrec|hairsp|Tcedil|nbumpe|scnsim|ncaron|Ncaron|ncedil|Ncedil|hamilt|Scedil|nearhk|hardcy|HARDcy|tcedil|Tcaron|commat|nequiv|nesear|tcaron|target|hearts|nexist|varrho|scedil|Scaron|scaron|hellip|Sacute|sacute|hercon|swnwar|compfn|rtimes|rthree|rsquor|rsaquo|zacute|wedgeq|homtht|barvee|barwed|Barwed|rpargt|horbar|conint|swarhk|roplus|nltrie|hslash|hstrok|Hstrok|rmoust|Conint|bprime|hybull|hyphen|iacute|Iacute|supsup|supsub|supsim|varphi|coprod|brvbar|agrave|Supset|supset|igrave|Igrave|notinE|Agrave|iiiint|iinfin|copysr|wedbar|Verbar|vangrt|becaus|incare|verbar|inodot|bullet|drcorn|intcal|drcrop|cularr|vellip|Utilde|bumpeq|cupcap|dstrok|Dstrok|CupCap|cupcup|cupdot|eacute|Eacute|supdot|iquest|easter|ecaron|Ecaron|ecolon|isinsv|utilde|itilde|Itilde|curarr|succeq|Bumpeq|cacute|ulcrop|nparsl|Cacute|nprcue|egrave|Egrave|nrarrc|nrarrw|subsup|subsub|nrtrie|jsercy|nsccue|Jsercy|kappav|kcedil|Kcedil|subsim|ulcorn|nsimeq|egsdot|veebar|kgreen|capand|elsdot|Subset|subset|curren|aacute|lacute|Lacute|emptyv|ntilde|Ntilde|lagran|lambda|Lambda|capcap|Ugrave|langle|subdot|emsp13|numero|emsp14|nvdash|nvDash|nVdash|nVDash|ugrave|ufisht|nvHarr|larrfs|nvlArr|larrhk|larrlp|larrpl|nvrArr|Udblac|nwarhk|larrtl|nwnear|oacute|Oacute|latail|lAtail|sstarf|lbrace|odblac|Odblac|lbrack|udblac|odsold|eparsl|lcaron|Lcaron|ograve|Ograve|lcedil|Lcedil|Aacute|ssmile|ssetmn|squarf|ldquor|capcup|ominus|cylcty|rharul|eqcirc|dagger|rfloor|rfisht|Dagger|daleth|equals|origof|capdot|equest|dcaron|Dcaron|rdquor|oslash|Oslash|otilde|Otilde|otimes|Otimes|urcrop|Ubreve|ubreve|Yacute|Uacute|uacute|Rcedil|rcedil|urcorn|parsim|Rcaron|Vdashl|rcaron|Tstrok|percnt|period|permil|Exists|yacute|rbrack|rbrace|phmmat|ccaron|Ccaron|planck|ccedil|plankv|tstrok|female|plusdo|plusdu|ffilig|plusmn|ffllig|Ccedil|rAtail|dfisht|bernou|ratail|Rarrtl|rarrtl|angsph|rarrpl|rarrlp|rarrhk|xwedge|xotime|forall|ForAll|Vvdash|vsupnE|preceq|bigcap|frac12|frac13|frac14|primes|rarrfs|prnsim|frac15|Square|frac16|square|lesdot|frac18|frac23|propto|prurel|rarrap|rangle|puncsp|frac25|Racute|qprime|racute|lesges|frac34|abreve|AElig|eqsim|utdot|setmn|urtri|Equal|Uring|seArr|uring|searr|dashv|Dashv|mumap|nabla|iogon|Iogon|sdote|sdotb|scsim|napid|napos|equiv|natur|Acirc|dblac|erarr|nbump|iprod|erDot|ucirc|awint|esdot|angrt|ncong|isinE|scnap|Scirc|scirc|ndash|isins|Ubrcy|nearr|neArr|isinv|nedot|ubrcy|acute|Ycirc|iukcy|Iukcy|xutri|nesim|caret|jcirc|Jcirc|caron|twixt|ddarr|sccue|exist|jmath|sbquo|ngeqq|angst|ccaps|lceil|ngsim|UpTee|delta|Delta|rtrif|nharr|nhArr|nhpar|rtrie|jukcy|Jukcy|kappa|rsquo|Kappa|nlarr|nlArr|TSHcy|rrarr|aogon|Aogon|fflig|xrarr|tshcy|ccirc|nleqq|filig|upsih|nless|dharl|nlsim|fjlig|ropar|nltri|dharr|robrk|roarr|fllig|fltns|roang|rnmid|subnE|subne|lAarr|trisb|Ccirc|acirc|ccups|blank|VDash|forkv|Vdash|langd|cedil|blk12|blk14|laquo|strns|diams|notin|vDash|larrb|blk34|block|disin|uplus|vdash|vBarv|aelig|starf|Wedge|check|xrArr|lates|lbarr|lBarr|notni|lbbrk|bcong|frasl|lbrke|frown|vrtri|vprop|vnsup|gamma|Gamma|wedge|xodot|bdquo|srarr|doteq|ldquo|boxdl|boxdL|gcirc|Gcirc|boxDl|boxDL|boxdr|boxdR|boxDr|TRADE|trade|rlhar|boxDR|vnsub|npart|vltri|rlarr|boxhd|boxhD|nprec|gescc|nrarr|nrArr|boxHd|boxHD|boxhu|boxhU|nrtri|boxHu|clubs|boxHU|times|colon|Colon|gimel|xlArr|Tilde|nsime|tilde|nsmid|nspar|THORN|thorn|xlarr|nsube|nsubE|thkap|xhArr|comma|nsucc|boxul|boxuL|nsupe|nsupE|gneqq|gnsim|boxUl|boxUL|grave|boxur|boxuR|boxUr|boxUR|lescc|angle|bepsi|boxvh|varpi|boxvH|numsp|Theta|gsime|gsiml|theta|boxVh|boxVH|boxvl|gtcir|gtdot|boxvL|boxVl|boxVL|crarr|cross|Cross|nvsim|boxvr|nwarr|nwArr|sqsup|dtdot|Uogon|lhard|lharu|dtrif|ocirc|Ocirc|lhblk|duarr|odash|sqsub|Hacek|sqcup|llarr|duhar|oelig|OElig|ofcir|boxvR|uogon|lltri|boxVr|csube|uuarr|ohbar|csupe|ctdot|olarr|olcir|harrw|oline|sqcap|omacr|Omacr|omega|Omega|boxVR|aleph|lneqq|lnsim|loang|loarr|rharu|lobrk|hcirc|operp|oplus|rhard|Hcirc|orarr|Union|order|ecirc|Ecirc|cuepr|szlig|cuesc|breve|reals|eDDot|Breve|hoarr|lopar|utrif|rdquo|Umacr|umacr|efDot|swArr|ultri|alpha|rceil|ovbar|swarr|Wcirc|wcirc|smtes|smile|bsemi|lrarr|aring|parsl|lrhar|bsime|uhblk|lrtri|cupor|Aring|uharr|uharl|slarr|rbrke|bsolb|lsime|rbbrk|RBarr|lsimg|phone|rBarr|rbarr|icirc|lsquo|Icirc|emacr|Emacr|ratio|simne|plusb|simlE|simgE|simeq|pluse|ltcir|ltdot|empty|xharr|xdtri|iexcl|Alpha|ltrie|rarrw|pound|ltrif|xcirc|bumpe|prcue|bumpE|asymp|amacr|cuvee|Sigma|sigma|iiint|udhar|iiota|ijlig|IJlig|supnE|imacr|Imacr|prime|Prime|image|prnap|eogon|Eogon|rarrc|mdash|mDDot|cuwed|imath|supne|imped|Amacr|udarr|prsim|micro|rarrb|cwint|raquo|infin|eplus|range|rangd|Ucirc|radic|minus|amalg|veeeq|rAarr|epsiv|ycirc|quest|sharp|quot|zwnj|Qscr|race|qscr|Qopf|qopf|qint|rang|Rang|Zscr|zscr|Zopf|zopf|rarr|rArr|Rarr|Pscr|pscr|prop|prod|prnE|prec|ZHcy|zhcy|prap|Zeta|zeta|Popf|popf|Zdot|plus|zdot|Yuml|yuml|phiv|YUcy|yucy|Yscr|yscr|perp|Yopf|yopf|part|para|YIcy|Ouml|rcub|yicy|YAcy|rdca|ouml|osol|Oscr|rdsh|yacy|real|oscr|xvee|andd|rect|andv|Xscr|oror|ordm|ordf|xscr|ange|aopf|Aopf|rHar|Xopf|opar|Oopf|xopf|xnis|rhov|oopf|omid|xmap|oint|apid|apos|ogon|ascr|Ascr|odot|odiv|xcup|xcap|ocir|oast|nvlt|nvle|nvgt|nvge|nvap|Wscr|wscr|auml|ntlg|ntgl|nsup|nsub|nsim|Nscr|nscr|nsce|Wopf|ring|npre|wopf|npar|Auml|Barv|bbrk|Nopf|nopf|nmid|nLtv|beta|ropf|Ropf|Beta|beth|nles|rpar|nleq|bnot|bNot|nldr|NJcy|rscr|Rscr|Vscr|vscr|rsqb|njcy|bopf|nisd|Bopf|rtri|Vopf|nGtv|ngtr|vopf|boxh|boxH|boxv|nges|ngeq|boxV|bscr|scap|Bscr|bsim|Vert|vert|bsol|bull|bump|caps|cdot|ncup|scnE|ncap|nbsp|napE|Cdot|cent|sdot|Vbar|nang|vBar|chcy|Mscr|mscr|sect|semi|CHcy|Mopf|mopf|sext|circ|cire|mldr|mlcp|cirE|comp|shcy|SHcy|vArr|varr|cong|copf|Copf|copy|COPY|malt|male|macr|lvnE|cscr|ltri|sime|ltcc|simg|Cscr|siml|csub|Uuml|lsqb|lsim|uuml|csup|Lscr|lscr|utri|smid|lpar|cups|smte|lozf|darr|Lopf|Uscr|solb|lopf|sopf|Sopf|lneq|uscr|spar|dArr|lnap|Darr|dash|Sqrt|LJcy|ljcy|lHar|dHar|Upsi|upsi|diam|lesg|djcy|DJcy|leqq|dopf|Dopf|dscr|Dscr|dscy|ldsh|ldca|squf|DScy|sscr|Sscr|dsol|lcub|late|star|Star|Uopf|Larr|lArr|larr|uopf|dtri|dzcy|sube|subE|Lang|lang|Kscr|kscr|Kopf|kopf|KJcy|kjcy|KHcy|khcy|DZcy|ecir|edot|eDot|Jscr|jscr|succ|Jopf|jopf|Edot|uHar|emsp|ensp|Iuml|iuml|eopf|isin|Iscr|iscr|Eopf|epar|sung|epsi|escr|sup1|sup2|sup3|Iota|iota|supe|supE|Iopf|iopf|IOcy|iocy|Escr|esim|Esim|imof|Uarr|QUOT|uArr|uarr|euml|IEcy|iecy|Idot|Euml|euro|excl|Hscr|hscr|Hopf|hopf|TScy|tscy|Tscr|hbar|tscr|flat|tbrk|fnof|hArr|harr|half|fopf|Fopf|tdot|gvnE|fork|trie|gtcc|fscr|Fscr|gdot|gsim|Gscr|gscr|Gopf|gopf|gneq|Gdot|tosa|gnap|Topf|topf|geqq|toea|GJcy|gjcy|tint|gesl|mid|Sfr|ggg|top|ges|gla|glE|glj|geq|gne|gEl|gel|gnE|Gcy|gcy|gap|Tfr|tfr|Tcy|tcy|Hat|Tau|Ffr|tau|Tab|hfr|Hfr|ffr|Fcy|fcy|icy|Icy|iff|ETH|eth|ifr|Ifr|Eta|eta|int|Int|Sup|sup|ucy|Ucy|Sum|sum|jcy|ENG|ufr|Ufr|eng|Jcy|jfr|els|ell|egs|Efr|efr|Jfr|uml|kcy|Kcy|Ecy|ecy|kfr|Kfr|lap|Sub|sub|lat|lcy|Lcy|leg|Dot|dot|lEg|leq|les|squ|div|die|lfr|Lfr|lgE|Dfr|dfr|Del|deg|Dcy|dcy|lne|lnE|sol|loz|smt|Cup|lrm|cup|lsh|Lsh|sim|shy|map|Map|mcy|Mcy|mfr|Mfr|mho|gfr|Gfr|sfr|cir|Chi|chi|nap|Cfr|vcy|Vcy|cfr|Scy|scy|ncy|Ncy|vee|Vee|Cap|cap|nfr|scE|sce|Nfr|nge|ngE|nGg|vfr|Vfr|ngt|bot|nGt|nis|niv|Rsh|rsh|nle|nlE|bne|Bfr|bfr|nLl|nlt|nLt|Bcy|bcy|not|Not|rlm|wfr|Wfr|npr|nsc|num|ocy|ast|Ocy|ofr|xfr|Xfr|Ofr|ogt|ohm|apE|olt|Rho|ape|rho|Rfr|rfr|ord|REG|ang|reg|orv|And|and|AMP|Rcy|amp|Afr|ycy|Ycy|yen|yfr|Yfr|rcy|par|pcy|Pcy|pfr|Pfr|phi|Phi|afr|Acy|acy|zcy|Zcy|piv|acE|acd|zfr|Zfr|pre|prE|psi|Psi|qfr|Qfr|zwj|Or|ge|Gg|gt|gg|el|oS|lt|Lt|LT|Re|lg|gl|eg|ne|Im|it|le|DD|wp|wr|nu|Nu|dd|lE|Sc|sc|pi|Pi|ee|af|ll|Ll|rx|gE|xi|pm|Xi|ic|pr|Pr|in|ni|mp|mu|ac|Mu|or|ap|Gt|GT|ii);|&(Aacute|Agrave|Atilde|Ccedil|Eacute|Egrave|Iacute|Igrave|Ntilde|Oacute|Ograve|Oslash|Otilde|Uacute|Ugrave|Yacute|aacute|agrave|atilde|brvbar|ccedil|curren|divide|eacute|egrave|frac12|frac14|frac34|iacute|igrave|iquest|middot|ntilde|oacute|ograve|oslash|otilde|plusmn|uacute|ugrave|yacute|AElig|Acirc|Aring|Ecirc|Icirc|Ocirc|THORN|Ucirc|acirc|acute|aelig|aring|cedil|ecirc|icirc|iexcl|laquo|micro|ocirc|pound|raquo|szlig|thorn|times|ucirc|Auml|COPY|Euml|Iuml|Ouml|QUOT|Uuml|auml|cent|copy|euml|iuml|macr|nbsp|ordf|ordm|ouml|para|quot|sect|sup1|sup2|sup3|uuml|yuml|AMP|ETH|REG|amp|deg|eth|not|reg|shy|uml|yen|GT|LT|gt|lt)(?!;)([=a-zA-Z0-9]?)|&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+)/g;
	var decodeMap = {'aacute':'\xE1','Aacute':'\xC1','abreve':'\u0103','Abreve':'\u0102','ac':'\u223E','acd':'\u223F','acE':'\u223E\u0333','acirc':'\xE2','Acirc':'\xC2','acute':'\xB4','acy':'\u0430','Acy':'\u0410','aelig':'\xE6','AElig':'\xC6','af':'\u2061','afr':'\uD835\uDD1E','Afr':'\uD835\uDD04','agrave':'\xE0','Agrave':'\xC0','alefsym':'\u2135','aleph':'\u2135','alpha':'\u03B1','Alpha':'\u0391','amacr':'\u0101','Amacr':'\u0100','amalg':'\u2A3F','amp':'&','AMP':'&','and':'\u2227','And':'\u2A53','andand':'\u2A55','andd':'\u2A5C','andslope':'\u2A58','andv':'\u2A5A','ang':'\u2220','ange':'\u29A4','angle':'\u2220','angmsd':'\u2221','angmsdaa':'\u29A8','angmsdab':'\u29A9','angmsdac':'\u29AA','angmsdad':'\u29AB','angmsdae':'\u29AC','angmsdaf':'\u29AD','angmsdag':'\u29AE','angmsdah':'\u29AF','angrt':'\u221F','angrtvb':'\u22BE','angrtvbd':'\u299D','angsph':'\u2222','angst':'\xC5','angzarr':'\u237C','aogon':'\u0105','Aogon':'\u0104','aopf':'\uD835\uDD52','Aopf':'\uD835\uDD38','ap':'\u2248','apacir':'\u2A6F','ape':'\u224A','apE':'\u2A70','apid':'\u224B','apos':'\'','ApplyFunction':'\u2061','approx':'\u2248','approxeq':'\u224A','aring':'\xE5','Aring':'\xC5','ascr':'\uD835\uDCB6','Ascr':'\uD835\uDC9C','Assign':'\u2254','ast':'*','asymp':'\u2248','asympeq':'\u224D','atilde':'\xE3','Atilde':'\xC3','auml':'\xE4','Auml':'\xC4','awconint':'\u2233','awint':'\u2A11','backcong':'\u224C','backepsilon':'\u03F6','backprime':'\u2035','backsim':'\u223D','backsimeq':'\u22CD','Backslash':'\u2216','Barv':'\u2AE7','barvee':'\u22BD','barwed':'\u2305','Barwed':'\u2306','barwedge':'\u2305','bbrk':'\u23B5','bbrktbrk':'\u23B6','bcong':'\u224C','bcy':'\u0431','Bcy':'\u0411','bdquo':'\u201E','becaus':'\u2235','because':'\u2235','Because':'\u2235','bemptyv':'\u29B0','bepsi':'\u03F6','bernou':'\u212C','Bernoullis':'\u212C','beta':'\u03B2','Beta':'\u0392','beth':'\u2136','between':'\u226C','bfr':'\uD835\uDD1F','Bfr':'\uD835\uDD05','bigcap':'\u22C2','bigcirc':'\u25EF','bigcup':'\u22C3','bigodot':'\u2A00','bigoplus':'\u2A01','bigotimes':'\u2A02','bigsqcup':'\u2A06','bigstar':'\u2605','bigtriangledown':'\u25BD','bigtriangleup':'\u25B3','biguplus':'\u2A04','bigvee':'\u22C1','bigwedge':'\u22C0','bkarow':'\u290D','blacklozenge':'\u29EB','blacksquare':'\u25AA','blacktriangle':'\u25B4','blacktriangledown':'\u25BE','blacktriangleleft':'\u25C2','blacktriangleright':'\u25B8','blank':'\u2423','blk12':'\u2592','blk14':'\u2591','blk34':'\u2593','block':'\u2588','bne':'=\u20E5','bnequiv':'\u2261\u20E5','bnot':'\u2310','bNot':'\u2AED','bopf':'\uD835\uDD53','Bopf':'\uD835\uDD39','bot':'\u22A5','bottom':'\u22A5','bowtie':'\u22C8','boxbox':'\u29C9','boxdl':'\u2510','boxdL':'\u2555','boxDl':'\u2556','boxDL':'\u2557','boxdr':'\u250C','boxdR':'\u2552','boxDr':'\u2553','boxDR':'\u2554','boxh':'\u2500','boxH':'\u2550','boxhd':'\u252C','boxhD':'\u2565','boxHd':'\u2564','boxHD':'\u2566','boxhu':'\u2534','boxhU':'\u2568','boxHu':'\u2567','boxHU':'\u2569','boxminus':'\u229F','boxplus':'\u229E','boxtimes':'\u22A0','boxul':'\u2518','boxuL':'\u255B','boxUl':'\u255C','boxUL':'\u255D','boxur':'\u2514','boxuR':'\u2558','boxUr':'\u2559','boxUR':'\u255A','boxv':'\u2502','boxV':'\u2551','boxvh':'\u253C','boxvH':'\u256A','boxVh':'\u256B','boxVH':'\u256C','boxvl':'\u2524','boxvL':'\u2561','boxVl':'\u2562','boxVL':'\u2563','boxvr':'\u251C','boxvR':'\u255E','boxVr':'\u255F','boxVR':'\u2560','bprime':'\u2035','breve':'\u02D8','Breve':'\u02D8','brvbar':'\xA6','bscr':'\uD835\uDCB7','Bscr':'\u212C','bsemi':'\u204F','bsim':'\u223D','bsime':'\u22CD','bsol':'\\','bsolb':'\u29C5','bsolhsub':'\u27C8','bull':'\u2022','bullet':'\u2022','bump':'\u224E','bumpe':'\u224F','bumpE':'\u2AAE','bumpeq':'\u224F','Bumpeq':'\u224E','cacute':'\u0107','Cacute':'\u0106','cap':'\u2229','Cap':'\u22D2','capand':'\u2A44','capbrcup':'\u2A49','capcap':'\u2A4B','capcup':'\u2A47','capdot':'\u2A40','CapitalDifferentialD':'\u2145','caps':'\u2229\uFE00','caret':'\u2041','caron':'\u02C7','Cayleys':'\u212D','ccaps':'\u2A4D','ccaron':'\u010D','Ccaron':'\u010C','ccedil':'\xE7','Ccedil':'\xC7','ccirc':'\u0109','Ccirc':'\u0108','Cconint':'\u2230','ccups':'\u2A4C','ccupssm':'\u2A50','cdot':'\u010B','Cdot':'\u010A','cedil':'\xB8','Cedilla':'\xB8','cemptyv':'\u29B2','cent':'\xA2','centerdot':'\xB7','CenterDot':'\xB7','cfr':'\uD835\uDD20','Cfr':'\u212D','chcy':'\u0447','CHcy':'\u0427','check':'\u2713','checkmark':'\u2713','chi':'\u03C7','Chi':'\u03A7','cir':'\u25CB','circ':'\u02C6','circeq':'\u2257','circlearrowleft':'\u21BA','circlearrowright':'\u21BB','circledast':'\u229B','circledcirc':'\u229A','circleddash':'\u229D','CircleDot':'\u2299','circledR':'\xAE','circledS':'\u24C8','CircleMinus':'\u2296','CirclePlus':'\u2295','CircleTimes':'\u2297','cire':'\u2257','cirE':'\u29C3','cirfnint':'\u2A10','cirmid':'\u2AEF','cirscir':'\u29C2','ClockwiseContourIntegral':'\u2232','CloseCurlyDoubleQuote':'\u201D','CloseCurlyQuote':'\u2019','clubs':'\u2663','clubsuit':'\u2663','colon':':','Colon':'\u2237','colone':'\u2254','Colone':'\u2A74','coloneq':'\u2254','comma':',','commat':'@','comp':'\u2201','compfn':'\u2218','complement':'\u2201','complexes':'\u2102','cong':'\u2245','congdot':'\u2A6D','Congruent':'\u2261','conint':'\u222E','Conint':'\u222F','ContourIntegral':'\u222E','copf':'\uD835\uDD54','Copf':'\u2102','coprod':'\u2210','Coproduct':'\u2210','copy':'\xA9','COPY':'\xA9','copysr':'\u2117','CounterClockwiseContourIntegral':'\u2233','crarr':'\u21B5','cross':'\u2717','Cross':'\u2A2F','cscr':'\uD835\uDCB8','Cscr':'\uD835\uDC9E','csub':'\u2ACF','csube':'\u2AD1','csup':'\u2AD0','csupe':'\u2AD2','ctdot':'\u22EF','cudarrl':'\u2938','cudarrr':'\u2935','cuepr':'\u22DE','cuesc':'\u22DF','cularr':'\u21B6','cularrp':'\u293D','cup':'\u222A','Cup':'\u22D3','cupbrcap':'\u2A48','cupcap':'\u2A46','CupCap':'\u224D','cupcup':'\u2A4A','cupdot':'\u228D','cupor':'\u2A45','cups':'\u222A\uFE00','curarr':'\u21B7','curarrm':'\u293C','curlyeqprec':'\u22DE','curlyeqsucc':'\u22DF','curlyvee':'\u22CE','curlywedge':'\u22CF','curren':'\xA4','curvearrowleft':'\u21B6','curvearrowright':'\u21B7','cuvee':'\u22CE','cuwed':'\u22CF','cwconint':'\u2232','cwint':'\u2231','cylcty':'\u232D','dagger':'\u2020','Dagger':'\u2021','daleth':'\u2138','darr':'\u2193','dArr':'\u21D3','Darr':'\u21A1','dash':'\u2010','dashv':'\u22A3','Dashv':'\u2AE4','dbkarow':'\u290F','dblac':'\u02DD','dcaron':'\u010F','Dcaron':'\u010E','dcy':'\u0434','Dcy':'\u0414','dd':'\u2146','DD':'\u2145','ddagger':'\u2021','ddarr':'\u21CA','DDotrahd':'\u2911','ddotseq':'\u2A77','deg':'\xB0','Del':'\u2207','delta':'\u03B4','Delta':'\u0394','demptyv':'\u29B1','dfisht':'\u297F','dfr':'\uD835\uDD21','Dfr':'\uD835\uDD07','dHar':'\u2965','dharl':'\u21C3','dharr':'\u21C2','DiacriticalAcute':'\xB4','DiacriticalDot':'\u02D9','DiacriticalDoubleAcute':'\u02DD','DiacriticalGrave':'`','DiacriticalTilde':'\u02DC','diam':'\u22C4','diamond':'\u22C4','Diamond':'\u22C4','diamondsuit':'\u2666','diams':'\u2666','die':'\xA8','DifferentialD':'\u2146','digamma':'\u03DD','disin':'\u22F2','div':'\xF7','divide':'\xF7','divideontimes':'\u22C7','divonx':'\u22C7','djcy':'\u0452','DJcy':'\u0402','dlcorn':'\u231E','dlcrop':'\u230D','dollar':'$','dopf':'\uD835\uDD55','Dopf':'\uD835\uDD3B','dot':'\u02D9','Dot':'\xA8','DotDot':'\u20DC','doteq':'\u2250','doteqdot':'\u2251','DotEqual':'\u2250','dotminus':'\u2238','dotplus':'\u2214','dotsquare':'\u22A1','doublebarwedge':'\u2306','DoubleContourIntegral':'\u222F','DoubleDot':'\xA8','DoubleDownArrow':'\u21D3','DoubleLeftArrow':'\u21D0','DoubleLeftRightArrow':'\u21D4','DoubleLeftTee':'\u2AE4','DoubleLongLeftArrow':'\u27F8','DoubleLongLeftRightArrow':'\u27FA','DoubleLongRightArrow':'\u27F9','DoubleRightArrow':'\u21D2','DoubleRightTee':'\u22A8','DoubleUpArrow':'\u21D1','DoubleUpDownArrow':'\u21D5','DoubleVerticalBar':'\u2225','downarrow':'\u2193','Downarrow':'\u21D3','DownArrow':'\u2193','DownArrowBar':'\u2913','DownArrowUpArrow':'\u21F5','DownBreve':'\u0311','downdownarrows':'\u21CA','downharpoonleft':'\u21C3','downharpoonright':'\u21C2','DownLeftRightVector':'\u2950','DownLeftTeeVector':'\u295E','DownLeftVector':'\u21BD','DownLeftVectorBar':'\u2956','DownRightTeeVector':'\u295F','DownRightVector':'\u21C1','DownRightVectorBar':'\u2957','DownTee':'\u22A4','DownTeeArrow':'\u21A7','drbkarow':'\u2910','drcorn':'\u231F','drcrop':'\u230C','dscr':'\uD835\uDCB9','Dscr':'\uD835\uDC9F','dscy':'\u0455','DScy':'\u0405','dsol':'\u29F6','dstrok':'\u0111','Dstrok':'\u0110','dtdot':'\u22F1','dtri':'\u25BF','dtrif':'\u25BE','duarr':'\u21F5','duhar':'\u296F','dwangle':'\u29A6','dzcy':'\u045F','DZcy':'\u040F','dzigrarr':'\u27FF','eacute':'\xE9','Eacute':'\xC9','easter':'\u2A6E','ecaron':'\u011B','Ecaron':'\u011A','ecir':'\u2256','ecirc':'\xEA','Ecirc':'\xCA','ecolon':'\u2255','ecy':'\u044D','Ecy':'\u042D','eDDot':'\u2A77','edot':'\u0117','eDot':'\u2251','Edot':'\u0116','ee':'\u2147','efDot':'\u2252','efr':'\uD835\uDD22','Efr':'\uD835\uDD08','eg':'\u2A9A','egrave':'\xE8','Egrave':'\xC8','egs':'\u2A96','egsdot':'\u2A98','el':'\u2A99','Element':'\u2208','elinters':'\u23E7','ell':'\u2113','els':'\u2A95','elsdot':'\u2A97','emacr':'\u0113','Emacr':'\u0112','empty':'\u2205','emptyset':'\u2205','EmptySmallSquare':'\u25FB','emptyv':'\u2205','EmptyVerySmallSquare':'\u25AB','emsp':'\u2003','emsp13':'\u2004','emsp14':'\u2005','eng':'\u014B','ENG':'\u014A','ensp':'\u2002','eogon':'\u0119','Eogon':'\u0118','eopf':'\uD835\uDD56','Eopf':'\uD835\uDD3C','epar':'\u22D5','eparsl':'\u29E3','eplus':'\u2A71','epsi':'\u03B5','epsilon':'\u03B5','Epsilon':'\u0395','epsiv':'\u03F5','eqcirc':'\u2256','eqcolon':'\u2255','eqsim':'\u2242','eqslantgtr':'\u2A96','eqslantless':'\u2A95','Equal':'\u2A75','equals':'=','EqualTilde':'\u2242','equest':'\u225F','Equilibrium':'\u21CC','equiv':'\u2261','equivDD':'\u2A78','eqvparsl':'\u29E5','erarr':'\u2971','erDot':'\u2253','escr':'\u212F','Escr':'\u2130','esdot':'\u2250','esim':'\u2242','Esim':'\u2A73','eta':'\u03B7','Eta':'\u0397','eth':'\xF0','ETH':'\xD0','euml':'\xEB','Euml':'\xCB','euro':'\u20AC','excl':'!','exist':'\u2203','Exists':'\u2203','expectation':'\u2130','exponentiale':'\u2147','ExponentialE':'\u2147','fallingdotseq':'\u2252','fcy':'\u0444','Fcy':'\u0424','female':'\u2640','ffilig':'\uFB03','fflig':'\uFB00','ffllig':'\uFB04','ffr':'\uD835\uDD23','Ffr':'\uD835\uDD09','filig':'\uFB01','FilledSmallSquare':'\u25FC','FilledVerySmallSquare':'\u25AA','fjlig':'fj','flat':'\u266D','fllig':'\uFB02','fltns':'\u25B1','fnof':'\u0192','fopf':'\uD835\uDD57','Fopf':'\uD835\uDD3D','forall':'\u2200','ForAll':'\u2200','fork':'\u22D4','forkv':'\u2AD9','Fouriertrf':'\u2131','fpartint':'\u2A0D','frac12':'\xBD','frac13':'\u2153','frac14':'\xBC','frac15':'\u2155','frac16':'\u2159','frac18':'\u215B','frac23':'\u2154','frac25':'\u2156','frac34':'\xBE','frac35':'\u2157','frac38':'\u215C','frac45':'\u2158','frac56':'\u215A','frac58':'\u215D','frac78':'\u215E','frasl':'\u2044','frown':'\u2322','fscr':'\uD835\uDCBB','Fscr':'\u2131','gacute':'\u01F5','gamma':'\u03B3','Gamma':'\u0393','gammad':'\u03DD','Gammad':'\u03DC','gap':'\u2A86','gbreve':'\u011F','Gbreve':'\u011E','Gcedil':'\u0122','gcirc':'\u011D','Gcirc':'\u011C','gcy':'\u0433','Gcy':'\u0413','gdot':'\u0121','Gdot':'\u0120','ge':'\u2265','gE':'\u2267','gel':'\u22DB','gEl':'\u2A8C','geq':'\u2265','geqq':'\u2267','geqslant':'\u2A7E','ges':'\u2A7E','gescc':'\u2AA9','gesdot':'\u2A80','gesdoto':'\u2A82','gesdotol':'\u2A84','gesl':'\u22DB\uFE00','gesles':'\u2A94','gfr':'\uD835\uDD24','Gfr':'\uD835\uDD0A','gg':'\u226B','Gg':'\u22D9','ggg':'\u22D9','gimel':'\u2137','gjcy':'\u0453','GJcy':'\u0403','gl':'\u2277','gla':'\u2AA5','glE':'\u2A92','glj':'\u2AA4','gnap':'\u2A8A','gnapprox':'\u2A8A','gne':'\u2A88','gnE':'\u2269','gneq':'\u2A88','gneqq':'\u2269','gnsim':'\u22E7','gopf':'\uD835\uDD58','Gopf':'\uD835\uDD3E','grave':'`','GreaterEqual':'\u2265','GreaterEqualLess':'\u22DB','GreaterFullEqual':'\u2267','GreaterGreater':'\u2AA2','GreaterLess':'\u2277','GreaterSlantEqual':'\u2A7E','GreaterTilde':'\u2273','gscr':'\u210A','Gscr':'\uD835\uDCA2','gsim':'\u2273','gsime':'\u2A8E','gsiml':'\u2A90','gt':'>','Gt':'\u226B','GT':'>','gtcc':'\u2AA7','gtcir':'\u2A7A','gtdot':'\u22D7','gtlPar':'\u2995','gtquest':'\u2A7C','gtrapprox':'\u2A86','gtrarr':'\u2978','gtrdot':'\u22D7','gtreqless':'\u22DB','gtreqqless':'\u2A8C','gtrless':'\u2277','gtrsim':'\u2273','gvertneqq':'\u2269\uFE00','gvnE':'\u2269\uFE00','Hacek':'\u02C7','hairsp':'\u200A','half':'\xBD','hamilt':'\u210B','hardcy':'\u044A','HARDcy':'\u042A','harr':'\u2194','hArr':'\u21D4','harrcir':'\u2948','harrw':'\u21AD','Hat':'^','hbar':'\u210F','hcirc':'\u0125','Hcirc':'\u0124','hearts':'\u2665','heartsuit':'\u2665','hellip':'\u2026','hercon':'\u22B9','hfr':'\uD835\uDD25','Hfr':'\u210C','HilbertSpace':'\u210B','hksearow':'\u2925','hkswarow':'\u2926','hoarr':'\u21FF','homtht':'\u223B','hookleftarrow':'\u21A9','hookrightarrow':'\u21AA','hopf':'\uD835\uDD59','Hopf':'\u210D','horbar':'\u2015','HorizontalLine':'\u2500','hscr':'\uD835\uDCBD','Hscr':'\u210B','hslash':'\u210F','hstrok':'\u0127','Hstrok':'\u0126','HumpDownHump':'\u224E','HumpEqual':'\u224F','hybull':'\u2043','hyphen':'\u2010','iacute':'\xED','Iacute':'\xCD','ic':'\u2063','icirc':'\xEE','Icirc':'\xCE','icy':'\u0438','Icy':'\u0418','Idot':'\u0130','iecy':'\u0435','IEcy':'\u0415','iexcl':'\xA1','iff':'\u21D4','ifr':'\uD835\uDD26','Ifr':'\u2111','igrave':'\xEC','Igrave':'\xCC','ii':'\u2148','iiiint':'\u2A0C','iiint':'\u222D','iinfin':'\u29DC','iiota':'\u2129','ijlig':'\u0133','IJlig':'\u0132','Im':'\u2111','imacr':'\u012B','Imacr':'\u012A','image':'\u2111','ImaginaryI':'\u2148','imagline':'\u2110','imagpart':'\u2111','imath':'\u0131','imof':'\u22B7','imped':'\u01B5','Implies':'\u21D2','in':'\u2208','incare':'\u2105','infin':'\u221E','infintie':'\u29DD','inodot':'\u0131','int':'\u222B','Int':'\u222C','intcal':'\u22BA','integers':'\u2124','Integral':'\u222B','intercal':'\u22BA','Intersection':'\u22C2','intlarhk':'\u2A17','intprod':'\u2A3C','InvisibleComma':'\u2063','InvisibleTimes':'\u2062','iocy':'\u0451','IOcy':'\u0401','iogon':'\u012F','Iogon':'\u012E','iopf':'\uD835\uDD5A','Iopf':'\uD835\uDD40','iota':'\u03B9','Iota':'\u0399','iprod':'\u2A3C','iquest':'\xBF','iscr':'\uD835\uDCBE','Iscr':'\u2110','isin':'\u2208','isindot':'\u22F5','isinE':'\u22F9','isins':'\u22F4','isinsv':'\u22F3','isinv':'\u2208','it':'\u2062','itilde':'\u0129','Itilde':'\u0128','iukcy':'\u0456','Iukcy':'\u0406','iuml':'\xEF','Iuml':'\xCF','jcirc':'\u0135','Jcirc':'\u0134','jcy':'\u0439','Jcy':'\u0419','jfr':'\uD835\uDD27','Jfr':'\uD835\uDD0D','jmath':'\u0237','jopf':'\uD835\uDD5B','Jopf':'\uD835\uDD41','jscr':'\uD835\uDCBF','Jscr':'\uD835\uDCA5','jsercy':'\u0458','Jsercy':'\u0408','jukcy':'\u0454','Jukcy':'\u0404','kappa':'\u03BA','Kappa':'\u039A','kappav':'\u03F0','kcedil':'\u0137','Kcedil':'\u0136','kcy':'\u043A','Kcy':'\u041A','kfr':'\uD835\uDD28','Kfr':'\uD835\uDD0E','kgreen':'\u0138','khcy':'\u0445','KHcy':'\u0425','kjcy':'\u045C','KJcy':'\u040C','kopf':'\uD835\uDD5C','Kopf':'\uD835\uDD42','kscr':'\uD835\uDCC0','Kscr':'\uD835\uDCA6','lAarr':'\u21DA','lacute':'\u013A','Lacute':'\u0139','laemptyv':'\u29B4','lagran':'\u2112','lambda':'\u03BB','Lambda':'\u039B','lang':'\u27E8','Lang':'\u27EA','langd':'\u2991','langle':'\u27E8','lap':'\u2A85','Laplacetrf':'\u2112','laquo':'\xAB','larr':'\u2190','lArr':'\u21D0','Larr':'\u219E','larrb':'\u21E4','larrbfs':'\u291F','larrfs':'\u291D','larrhk':'\u21A9','larrlp':'\u21AB','larrpl':'\u2939','larrsim':'\u2973','larrtl':'\u21A2','lat':'\u2AAB','latail':'\u2919','lAtail':'\u291B','late':'\u2AAD','lates':'\u2AAD\uFE00','lbarr':'\u290C','lBarr':'\u290E','lbbrk':'\u2772','lbrace':'{','lbrack':'[','lbrke':'\u298B','lbrksld':'\u298F','lbrkslu':'\u298D','lcaron':'\u013E','Lcaron':'\u013D','lcedil':'\u013C','Lcedil':'\u013B','lceil':'\u2308','lcub':'{','lcy':'\u043B','Lcy':'\u041B','ldca':'\u2936','ldquo':'\u201C','ldquor':'\u201E','ldrdhar':'\u2967','ldrushar':'\u294B','ldsh':'\u21B2','le':'\u2264','lE':'\u2266','LeftAngleBracket':'\u27E8','leftarrow':'\u2190','Leftarrow':'\u21D0','LeftArrow':'\u2190','LeftArrowBar':'\u21E4','LeftArrowRightArrow':'\u21C6','leftarrowtail':'\u21A2','LeftCeiling':'\u2308','LeftDoubleBracket':'\u27E6','LeftDownTeeVector':'\u2961','LeftDownVector':'\u21C3','LeftDownVectorBar':'\u2959','LeftFloor':'\u230A','leftharpoondown':'\u21BD','leftharpoonup':'\u21BC','leftleftarrows':'\u21C7','leftrightarrow':'\u2194','Leftrightarrow':'\u21D4','LeftRightArrow':'\u2194','leftrightarrows':'\u21C6','leftrightharpoons':'\u21CB','leftrightsquigarrow':'\u21AD','LeftRightVector':'\u294E','LeftTee':'\u22A3','LeftTeeArrow':'\u21A4','LeftTeeVector':'\u295A','leftthreetimes':'\u22CB','LeftTriangle':'\u22B2','LeftTriangleBar':'\u29CF','LeftTriangleEqual':'\u22B4','LeftUpDownVector':'\u2951','LeftUpTeeVector':'\u2960','LeftUpVector':'\u21BF','LeftUpVectorBar':'\u2958','LeftVector':'\u21BC','LeftVectorBar':'\u2952','leg':'\u22DA','lEg':'\u2A8B','leq':'\u2264','leqq':'\u2266','leqslant':'\u2A7D','les':'\u2A7D','lescc':'\u2AA8','lesdot':'\u2A7F','lesdoto':'\u2A81','lesdotor':'\u2A83','lesg':'\u22DA\uFE00','lesges':'\u2A93','lessapprox':'\u2A85','lessdot':'\u22D6','lesseqgtr':'\u22DA','lesseqqgtr':'\u2A8B','LessEqualGreater':'\u22DA','LessFullEqual':'\u2266','LessGreater':'\u2276','lessgtr':'\u2276','LessLess':'\u2AA1','lesssim':'\u2272','LessSlantEqual':'\u2A7D','LessTilde':'\u2272','lfisht':'\u297C','lfloor':'\u230A','lfr':'\uD835\uDD29','Lfr':'\uD835\uDD0F','lg':'\u2276','lgE':'\u2A91','lHar':'\u2962','lhard':'\u21BD','lharu':'\u21BC','lharul':'\u296A','lhblk':'\u2584','ljcy':'\u0459','LJcy':'\u0409','ll':'\u226A','Ll':'\u22D8','llarr':'\u21C7','llcorner':'\u231E','Lleftarrow':'\u21DA','llhard':'\u296B','lltri':'\u25FA','lmidot':'\u0140','Lmidot':'\u013F','lmoust':'\u23B0','lmoustache':'\u23B0','lnap':'\u2A89','lnapprox':'\u2A89','lne':'\u2A87','lnE':'\u2268','lneq':'\u2A87','lneqq':'\u2268','lnsim':'\u22E6','loang':'\u27EC','loarr':'\u21FD','lobrk':'\u27E6','longleftarrow':'\u27F5','Longleftarrow':'\u27F8','LongLeftArrow':'\u27F5','longleftrightarrow':'\u27F7','Longleftrightarrow':'\u27FA','LongLeftRightArrow':'\u27F7','longmapsto':'\u27FC','longrightarrow':'\u27F6','Longrightarrow':'\u27F9','LongRightArrow':'\u27F6','looparrowleft':'\u21AB','looparrowright':'\u21AC','lopar':'\u2985','lopf':'\uD835\uDD5D','Lopf':'\uD835\uDD43','loplus':'\u2A2D','lotimes':'\u2A34','lowast':'\u2217','lowbar':'_','LowerLeftArrow':'\u2199','LowerRightArrow':'\u2198','loz':'\u25CA','lozenge':'\u25CA','lozf':'\u29EB','lpar':'(','lparlt':'\u2993','lrarr':'\u21C6','lrcorner':'\u231F','lrhar':'\u21CB','lrhard':'\u296D','lrm':'\u200E','lrtri':'\u22BF','lsaquo':'\u2039','lscr':'\uD835\uDCC1','Lscr':'\u2112','lsh':'\u21B0','Lsh':'\u21B0','lsim':'\u2272','lsime':'\u2A8D','lsimg':'\u2A8F','lsqb':'[','lsquo':'\u2018','lsquor':'\u201A','lstrok':'\u0142','Lstrok':'\u0141','lt':'<','Lt':'\u226A','LT':'<','ltcc':'\u2AA6','ltcir':'\u2A79','ltdot':'\u22D6','lthree':'\u22CB','ltimes':'\u22C9','ltlarr':'\u2976','ltquest':'\u2A7B','ltri':'\u25C3','ltrie':'\u22B4','ltrif':'\u25C2','ltrPar':'\u2996','lurdshar':'\u294A','luruhar':'\u2966','lvertneqq':'\u2268\uFE00','lvnE':'\u2268\uFE00','macr':'\xAF','male':'\u2642','malt':'\u2720','maltese':'\u2720','map':'\u21A6','Map':'\u2905','mapsto':'\u21A6','mapstodown':'\u21A7','mapstoleft':'\u21A4','mapstoup':'\u21A5','marker':'\u25AE','mcomma':'\u2A29','mcy':'\u043C','Mcy':'\u041C','mdash':'\u2014','mDDot':'\u223A','measuredangle':'\u2221','MediumSpace':'\u205F','Mellintrf':'\u2133','mfr':'\uD835\uDD2A','Mfr':'\uD835\uDD10','mho':'\u2127','micro':'\xB5','mid':'\u2223','midast':'*','midcir':'\u2AF0','middot':'\xB7','minus':'\u2212','minusb':'\u229F','minusd':'\u2238','minusdu':'\u2A2A','MinusPlus':'\u2213','mlcp':'\u2ADB','mldr':'\u2026','mnplus':'\u2213','models':'\u22A7','mopf':'\uD835\uDD5E','Mopf':'\uD835\uDD44','mp':'\u2213','mscr':'\uD835\uDCC2','Mscr':'\u2133','mstpos':'\u223E','mu':'\u03BC','Mu':'\u039C','multimap':'\u22B8','mumap':'\u22B8','nabla':'\u2207','nacute':'\u0144','Nacute':'\u0143','nang':'\u2220\u20D2','nap':'\u2249','napE':'\u2A70\u0338','napid':'\u224B\u0338','napos':'\u0149','napprox':'\u2249','natur':'\u266E','natural':'\u266E','naturals':'\u2115','nbsp':'\xA0','nbump':'\u224E\u0338','nbumpe':'\u224F\u0338','ncap':'\u2A43','ncaron':'\u0148','Ncaron':'\u0147','ncedil':'\u0146','Ncedil':'\u0145','ncong':'\u2247','ncongdot':'\u2A6D\u0338','ncup':'\u2A42','ncy':'\u043D','Ncy':'\u041D','ndash':'\u2013','ne':'\u2260','nearhk':'\u2924','nearr':'\u2197','neArr':'\u21D7','nearrow':'\u2197','nedot':'\u2250\u0338','NegativeMediumSpace':'\u200B','NegativeThickSpace':'\u200B','NegativeThinSpace':'\u200B','NegativeVeryThinSpace':'\u200B','nequiv':'\u2262','nesear':'\u2928','nesim':'\u2242\u0338','NestedGreaterGreater':'\u226B','NestedLessLess':'\u226A','NewLine':'\n','nexist':'\u2204','nexists':'\u2204','nfr':'\uD835\uDD2B','Nfr':'\uD835\uDD11','nge':'\u2271','ngE':'\u2267\u0338','ngeq':'\u2271','ngeqq':'\u2267\u0338','ngeqslant':'\u2A7E\u0338','nges':'\u2A7E\u0338','nGg':'\u22D9\u0338','ngsim':'\u2275','ngt':'\u226F','nGt':'\u226B\u20D2','ngtr':'\u226F','nGtv':'\u226B\u0338','nharr':'\u21AE','nhArr':'\u21CE','nhpar':'\u2AF2','ni':'\u220B','nis':'\u22FC','nisd':'\u22FA','niv':'\u220B','njcy':'\u045A','NJcy':'\u040A','nlarr':'\u219A','nlArr':'\u21CD','nldr':'\u2025','nle':'\u2270','nlE':'\u2266\u0338','nleftarrow':'\u219A','nLeftarrow':'\u21CD','nleftrightarrow':'\u21AE','nLeftrightarrow':'\u21CE','nleq':'\u2270','nleqq':'\u2266\u0338','nleqslant':'\u2A7D\u0338','nles':'\u2A7D\u0338','nless':'\u226E','nLl':'\u22D8\u0338','nlsim':'\u2274','nlt':'\u226E','nLt':'\u226A\u20D2','nltri':'\u22EA','nltrie':'\u22EC','nLtv':'\u226A\u0338','nmid':'\u2224','NoBreak':'\u2060','NonBreakingSpace':'\xA0','nopf':'\uD835\uDD5F','Nopf':'\u2115','not':'\xAC','Not':'\u2AEC','NotCongruent':'\u2262','NotCupCap':'\u226D','NotDoubleVerticalBar':'\u2226','NotElement':'\u2209','NotEqual':'\u2260','NotEqualTilde':'\u2242\u0338','NotExists':'\u2204','NotGreater':'\u226F','NotGreaterEqual':'\u2271','NotGreaterFullEqual':'\u2267\u0338','NotGreaterGreater':'\u226B\u0338','NotGreaterLess':'\u2279','NotGreaterSlantEqual':'\u2A7E\u0338','NotGreaterTilde':'\u2275','NotHumpDownHump':'\u224E\u0338','NotHumpEqual':'\u224F\u0338','notin':'\u2209','notindot':'\u22F5\u0338','notinE':'\u22F9\u0338','notinva':'\u2209','notinvb':'\u22F7','notinvc':'\u22F6','NotLeftTriangle':'\u22EA','NotLeftTriangleBar':'\u29CF\u0338','NotLeftTriangleEqual':'\u22EC','NotLess':'\u226E','NotLessEqual':'\u2270','NotLessGreater':'\u2278','NotLessLess':'\u226A\u0338','NotLessSlantEqual':'\u2A7D\u0338','NotLessTilde':'\u2274','NotNestedGreaterGreater':'\u2AA2\u0338','NotNestedLessLess':'\u2AA1\u0338','notni':'\u220C','notniva':'\u220C','notnivb':'\u22FE','notnivc':'\u22FD','NotPrecedes':'\u2280','NotPrecedesEqual':'\u2AAF\u0338','NotPrecedesSlantEqual':'\u22E0','NotReverseElement':'\u220C','NotRightTriangle':'\u22EB','NotRightTriangleBar':'\u29D0\u0338','NotRightTriangleEqual':'\u22ED','NotSquareSubset':'\u228F\u0338','NotSquareSubsetEqual':'\u22E2','NotSquareSuperset':'\u2290\u0338','NotSquareSupersetEqual':'\u22E3','NotSubset':'\u2282\u20D2','NotSubsetEqual':'\u2288','NotSucceeds':'\u2281','NotSucceedsEqual':'\u2AB0\u0338','NotSucceedsSlantEqual':'\u22E1','NotSucceedsTilde':'\u227F\u0338','NotSuperset':'\u2283\u20D2','NotSupersetEqual':'\u2289','NotTilde':'\u2241','NotTildeEqual':'\u2244','NotTildeFullEqual':'\u2247','NotTildeTilde':'\u2249','NotVerticalBar':'\u2224','npar':'\u2226','nparallel':'\u2226','nparsl':'\u2AFD\u20E5','npart':'\u2202\u0338','npolint':'\u2A14','npr':'\u2280','nprcue':'\u22E0','npre':'\u2AAF\u0338','nprec':'\u2280','npreceq':'\u2AAF\u0338','nrarr':'\u219B','nrArr':'\u21CF','nrarrc':'\u2933\u0338','nrarrw':'\u219D\u0338','nrightarrow':'\u219B','nRightarrow':'\u21CF','nrtri':'\u22EB','nrtrie':'\u22ED','nsc':'\u2281','nsccue':'\u22E1','nsce':'\u2AB0\u0338','nscr':'\uD835\uDCC3','Nscr':'\uD835\uDCA9','nshortmid':'\u2224','nshortparallel':'\u2226','nsim':'\u2241','nsime':'\u2244','nsimeq':'\u2244','nsmid':'\u2224','nspar':'\u2226','nsqsube':'\u22E2','nsqsupe':'\u22E3','nsub':'\u2284','nsube':'\u2288','nsubE':'\u2AC5\u0338','nsubset':'\u2282\u20D2','nsubseteq':'\u2288','nsubseteqq':'\u2AC5\u0338','nsucc':'\u2281','nsucceq':'\u2AB0\u0338','nsup':'\u2285','nsupe':'\u2289','nsupE':'\u2AC6\u0338','nsupset':'\u2283\u20D2','nsupseteq':'\u2289','nsupseteqq':'\u2AC6\u0338','ntgl':'\u2279','ntilde':'\xF1','Ntilde':'\xD1','ntlg':'\u2278','ntriangleleft':'\u22EA','ntrianglelefteq':'\u22EC','ntriangleright':'\u22EB','ntrianglerighteq':'\u22ED','nu':'\u03BD','Nu':'\u039D','num':'#','numero':'\u2116','numsp':'\u2007','nvap':'\u224D\u20D2','nvdash':'\u22AC','nvDash':'\u22AD','nVdash':'\u22AE','nVDash':'\u22AF','nvge':'\u2265\u20D2','nvgt':'>\u20D2','nvHarr':'\u2904','nvinfin':'\u29DE','nvlArr':'\u2902','nvle':'\u2264\u20D2','nvlt':'<\u20D2','nvltrie':'\u22B4\u20D2','nvrArr':'\u2903','nvrtrie':'\u22B5\u20D2','nvsim':'\u223C\u20D2','nwarhk':'\u2923','nwarr':'\u2196','nwArr':'\u21D6','nwarrow':'\u2196','nwnear':'\u2927','oacute':'\xF3','Oacute':'\xD3','oast':'\u229B','ocir':'\u229A','ocirc':'\xF4','Ocirc':'\xD4','ocy':'\u043E','Ocy':'\u041E','odash':'\u229D','odblac':'\u0151','Odblac':'\u0150','odiv':'\u2A38','odot':'\u2299','odsold':'\u29BC','oelig':'\u0153','OElig':'\u0152','ofcir':'\u29BF','ofr':'\uD835\uDD2C','Ofr':'\uD835\uDD12','ogon':'\u02DB','ograve':'\xF2','Ograve':'\xD2','ogt':'\u29C1','ohbar':'\u29B5','ohm':'\u03A9','oint':'\u222E','olarr':'\u21BA','olcir':'\u29BE','olcross':'\u29BB','oline':'\u203E','olt':'\u29C0','omacr':'\u014D','Omacr':'\u014C','omega':'\u03C9','Omega':'\u03A9','omicron':'\u03BF','Omicron':'\u039F','omid':'\u29B6','ominus':'\u2296','oopf':'\uD835\uDD60','Oopf':'\uD835\uDD46','opar':'\u29B7','OpenCurlyDoubleQuote':'\u201C','OpenCurlyQuote':'\u2018','operp':'\u29B9','oplus':'\u2295','or':'\u2228','Or':'\u2A54','orarr':'\u21BB','ord':'\u2A5D','order':'\u2134','orderof':'\u2134','ordf':'\xAA','ordm':'\xBA','origof':'\u22B6','oror':'\u2A56','orslope':'\u2A57','orv':'\u2A5B','oS':'\u24C8','oscr':'\u2134','Oscr':'\uD835\uDCAA','oslash':'\xF8','Oslash':'\xD8','osol':'\u2298','otilde':'\xF5','Otilde':'\xD5','otimes':'\u2297','Otimes':'\u2A37','otimesas':'\u2A36','ouml':'\xF6','Ouml':'\xD6','ovbar':'\u233D','OverBar':'\u203E','OverBrace':'\u23DE','OverBracket':'\u23B4','OverParenthesis':'\u23DC','par':'\u2225','para':'\xB6','parallel':'\u2225','parsim':'\u2AF3','parsl':'\u2AFD','part':'\u2202','PartialD':'\u2202','pcy':'\u043F','Pcy':'\u041F','percnt':'%','period':'.','permil':'\u2030','perp':'\u22A5','pertenk':'\u2031','pfr':'\uD835\uDD2D','Pfr':'\uD835\uDD13','phi':'\u03C6','Phi':'\u03A6','phiv':'\u03D5','phmmat':'\u2133','phone':'\u260E','pi':'\u03C0','Pi':'\u03A0','pitchfork':'\u22D4','piv':'\u03D6','planck':'\u210F','planckh':'\u210E','plankv':'\u210F','plus':'+','plusacir':'\u2A23','plusb':'\u229E','pluscir':'\u2A22','plusdo':'\u2214','plusdu':'\u2A25','pluse':'\u2A72','PlusMinus':'\xB1','plusmn':'\xB1','plussim':'\u2A26','plustwo':'\u2A27','pm':'\xB1','Poincareplane':'\u210C','pointint':'\u2A15','popf':'\uD835\uDD61','Popf':'\u2119','pound':'\xA3','pr':'\u227A','Pr':'\u2ABB','prap':'\u2AB7','prcue':'\u227C','pre':'\u2AAF','prE':'\u2AB3','prec':'\u227A','precapprox':'\u2AB7','preccurlyeq':'\u227C','Precedes':'\u227A','PrecedesEqual':'\u2AAF','PrecedesSlantEqual':'\u227C','PrecedesTilde':'\u227E','preceq':'\u2AAF','precnapprox':'\u2AB9','precneqq':'\u2AB5','precnsim':'\u22E8','precsim':'\u227E','prime':'\u2032','Prime':'\u2033','primes':'\u2119','prnap':'\u2AB9','prnE':'\u2AB5','prnsim':'\u22E8','prod':'\u220F','Product':'\u220F','profalar':'\u232E','profline':'\u2312','profsurf':'\u2313','prop':'\u221D','Proportion':'\u2237','Proportional':'\u221D','propto':'\u221D','prsim':'\u227E','prurel':'\u22B0','pscr':'\uD835\uDCC5','Pscr':'\uD835\uDCAB','psi':'\u03C8','Psi':'\u03A8','puncsp':'\u2008','qfr':'\uD835\uDD2E','Qfr':'\uD835\uDD14','qint':'\u2A0C','qopf':'\uD835\uDD62','Qopf':'\u211A','qprime':'\u2057','qscr':'\uD835\uDCC6','Qscr':'\uD835\uDCAC','quaternions':'\u210D','quatint':'\u2A16','quest':'?','questeq':'\u225F','quot':'"','QUOT':'"','rAarr':'\u21DB','race':'\u223D\u0331','racute':'\u0155','Racute':'\u0154','radic':'\u221A','raemptyv':'\u29B3','rang':'\u27E9','Rang':'\u27EB','rangd':'\u2992','range':'\u29A5','rangle':'\u27E9','raquo':'\xBB','rarr':'\u2192','rArr':'\u21D2','Rarr':'\u21A0','rarrap':'\u2975','rarrb':'\u21E5','rarrbfs':'\u2920','rarrc':'\u2933','rarrfs':'\u291E','rarrhk':'\u21AA','rarrlp':'\u21AC','rarrpl':'\u2945','rarrsim':'\u2974','rarrtl':'\u21A3','Rarrtl':'\u2916','rarrw':'\u219D','ratail':'\u291A','rAtail':'\u291C','ratio':'\u2236','rationals':'\u211A','rbarr':'\u290D','rBarr':'\u290F','RBarr':'\u2910','rbbrk':'\u2773','rbrace':'}','rbrack':']','rbrke':'\u298C','rbrksld':'\u298E','rbrkslu':'\u2990','rcaron':'\u0159','Rcaron':'\u0158','rcedil':'\u0157','Rcedil':'\u0156','rceil':'\u2309','rcub':'}','rcy':'\u0440','Rcy':'\u0420','rdca':'\u2937','rdldhar':'\u2969','rdquo':'\u201D','rdquor':'\u201D','rdsh':'\u21B3','Re':'\u211C','real':'\u211C','realine':'\u211B','realpart':'\u211C','reals':'\u211D','rect':'\u25AD','reg':'\xAE','REG':'\xAE','ReverseElement':'\u220B','ReverseEquilibrium':'\u21CB','ReverseUpEquilibrium':'\u296F','rfisht':'\u297D','rfloor':'\u230B','rfr':'\uD835\uDD2F','Rfr':'\u211C','rHar':'\u2964','rhard':'\u21C1','rharu':'\u21C0','rharul':'\u296C','rho':'\u03C1','Rho':'\u03A1','rhov':'\u03F1','RightAngleBracket':'\u27E9','rightarrow':'\u2192','Rightarrow':'\u21D2','RightArrow':'\u2192','RightArrowBar':'\u21E5','RightArrowLeftArrow':'\u21C4','rightarrowtail':'\u21A3','RightCeiling':'\u2309','RightDoubleBracket':'\u27E7','RightDownTeeVector':'\u295D','RightDownVector':'\u21C2','RightDownVectorBar':'\u2955','RightFloor':'\u230B','rightharpoondown':'\u21C1','rightharpoonup':'\u21C0','rightleftarrows':'\u21C4','rightleftharpoons':'\u21CC','rightrightarrows':'\u21C9','rightsquigarrow':'\u219D','RightTee':'\u22A2','RightTeeArrow':'\u21A6','RightTeeVector':'\u295B','rightthreetimes':'\u22CC','RightTriangle':'\u22B3','RightTriangleBar':'\u29D0','RightTriangleEqual':'\u22B5','RightUpDownVector':'\u294F','RightUpTeeVector':'\u295C','RightUpVector':'\u21BE','RightUpVectorBar':'\u2954','RightVector':'\u21C0','RightVectorBar':'\u2953','ring':'\u02DA','risingdotseq':'\u2253','rlarr':'\u21C4','rlhar':'\u21CC','rlm':'\u200F','rmoust':'\u23B1','rmoustache':'\u23B1','rnmid':'\u2AEE','roang':'\u27ED','roarr':'\u21FE','robrk':'\u27E7','ropar':'\u2986','ropf':'\uD835\uDD63','Ropf':'\u211D','roplus':'\u2A2E','rotimes':'\u2A35','RoundImplies':'\u2970','rpar':')','rpargt':'\u2994','rppolint':'\u2A12','rrarr':'\u21C9','Rrightarrow':'\u21DB','rsaquo':'\u203A','rscr':'\uD835\uDCC7','Rscr':'\u211B','rsh':'\u21B1','Rsh':'\u21B1','rsqb':']','rsquo':'\u2019','rsquor':'\u2019','rthree':'\u22CC','rtimes':'\u22CA','rtri':'\u25B9','rtrie':'\u22B5','rtrif':'\u25B8','rtriltri':'\u29CE','RuleDelayed':'\u29F4','ruluhar':'\u2968','rx':'\u211E','sacute':'\u015B','Sacute':'\u015A','sbquo':'\u201A','sc':'\u227B','Sc':'\u2ABC','scap':'\u2AB8','scaron':'\u0161','Scaron':'\u0160','sccue':'\u227D','sce':'\u2AB0','scE':'\u2AB4','scedil':'\u015F','Scedil':'\u015E','scirc':'\u015D','Scirc':'\u015C','scnap':'\u2ABA','scnE':'\u2AB6','scnsim':'\u22E9','scpolint':'\u2A13','scsim':'\u227F','scy':'\u0441','Scy':'\u0421','sdot':'\u22C5','sdotb':'\u22A1','sdote':'\u2A66','searhk':'\u2925','searr':'\u2198','seArr':'\u21D8','searrow':'\u2198','sect':'\xA7','semi':';','seswar':'\u2929','setminus':'\u2216','setmn':'\u2216','sext':'\u2736','sfr':'\uD835\uDD30','Sfr':'\uD835\uDD16','sfrown':'\u2322','sharp':'\u266F','shchcy':'\u0449','SHCHcy':'\u0429','shcy':'\u0448','SHcy':'\u0428','ShortDownArrow':'\u2193','ShortLeftArrow':'\u2190','shortmid':'\u2223','shortparallel':'\u2225','ShortRightArrow':'\u2192','ShortUpArrow':'\u2191','shy':'\xAD','sigma':'\u03C3','Sigma':'\u03A3','sigmaf':'\u03C2','sigmav':'\u03C2','sim':'\u223C','simdot':'\u2A6A','sime':'\u2243','simeq':'\u2243','simg':'\u2A9E','simgE':'\u2AA0','siml':'\u2A9D','simlE':'\u2A9F','simne':'\u2246','simplus':'\u2A24','simrarr':'\u2972','slarr':'\u2190','SmallCircle':'\u2218','smallsetminus':'\u2216','smashp':'\u2A33','smeparsl':'\u29E4','smid':'\u2223','smile':'\u2323','smt':'\u2AAA','smte':'\u2AAC','smtes':'\u2AAC\uFE00','softcy':'\u044C','SOFTcy':'\u042C','sol':'/','solb':'\u29C4','solbar':'\u233F','sopf':'\uD835\uDD64','Sopf':'\uD835\uDD4A','spades':'\u2660','spadesuit':'\u2660','spar':'\u2225','sqcap':'\u2293','sqcaps':'\u2293\uFE00','sqcup':'\u2294','sqcups':'\u2294\uFE00','Sqrt':'\u221A','sqsub':'\u228F','sqsube':'\u2291','sqsubset':'\u228F','sqsubseteq':'\u2291','sqsup':'\u2290','sqsupe':'\u2292','sqsupset':'\u2290','sqsupseteq':'\u2292','squ':'\u25A1','square':'\u25A1','Square':'\u25A1','SquareIntersection':'\u2293','SquareSubset':'\u228F','SquareSubsetEqual':'\u2291','SquareSuperset':'\u2290','SquareSupersetEqual':'\u2292','SquareUnion':'\u2294','squarf':'\u25AA','squf':'\u25AA','srarr':'\u2192','sscr':'\uD835\uDCC8','Sscr':'\uD835\uDCAE','ssetmn':'\u2216','ssmile':'\u2323','sstarf':'\u22C6','star':'\u2606','Star':'\u22C6','starf':'\u2605','straightepsilon':'\u03F5','straightphi':'\u03D5','strns':'\xAF','sub':'\u2282','Sub':'\u22D0','subdot':'\u2ABD','sube':'\u2286','subE':'\u2AC5','subedot':'\u2AC3','submult':'\u2AC1','subne':'\u228A','subnE':'\u2ACB','subplus':'\u2ABF','subrarr':'\u2979','subset':'\u2282','Subset':'\u22D0','subseteq':'\u2286','subseteqq':'\u2AC5','SubsetEqual':'\u2286','subsetneq':'\u228A','subsetneqq':'\u2ACB','subsim':'\u2AC7','subsub':'\u2AD5','subsup':'\u2AD3','succ':'\u227B','succapprox':'\u2AB8','succcurlyeq':'\u227D','Succeeds':'\u227B','SucceedsEqual':'\u2AB0','SucceedsSlantEqual':'\u227D','SucceedsTilde':'\u227F','succeq':'\u2AB0','succnapprox':'\u2ABA','succneqq':'\u2AB6','succnsim':'\u22E9','succsim':'\u227F','SuchThat':'\u220B','sum':'\u2211','Sum':'\u2211','sung':'\u266A','sup':'\u2283','Sup':'\u22D1','sup1':'\xB9','sup2':'\xB2','sup3':'\xB3','supdot':'\u2ABE','supdsub':'\u2AD8','supe':'\u2287','supE':'\u2AC6','supedot':'\u2AC4','Superset':'\u2283','SupersetEqual':'\u2287','suphsol':'\u27C9','suphsub':'\u2AD7','suplarr':'\u297B','supmult':'\u2AC2','supne':'\u228B','supnE':'\u2ACC','supplus':'\u2AC0','supset':'\u2283','Supset':'\u22D1','supseteq':'\u2287','supseteqq':'\u2AC6','supsetneq':'\u228B','supsetneqq':'\u2ACC','supsim':'\u2AC8','supsub':'\u2AD4','supsup':'\u2AD6','swarhk':'\u2926','swarr':'\u2199','swArr':'\u21D9','swarrow':'\u2199','swnwar':'\u292A','szlig':'\xDF','Tab':'\t','target':'\u2316','tau':'\u03C4','Tau':'\u03A4','tbrk':'\u23B4','tcaron':'\u0165','Tcaron':'\u0164','tcedil':'\u0163','Tcedil':'\u0162','tcy':'\u0442','Tcy':'\u0422','tdot':'\u20DB','telrec':'\u2315','tfr':'\uD835\uDD31','Tfr':'\uD835\uDD17','there4':'\u2234','therefore':'\u2234','Therefore':'\u2234','theta':'\u03B8','Theta':'\u0398','thetasym':'\u03D1','thetav':'\u03D1','thickapprox':'\u2248','thicksim':'\u223C','ThickSpace':'\u205F\u200A','thinsp':'\u2009','ThinSpace':'\u2009','thkap':'\u2248','thksim':'\u223C','thorn':'\xFE','THORN':'\xDE','tilde':'\u02DC','Tilde':'\u223C','TildeEqual':'\u2243','TildeFullEqual':'\u2245','TildeTilde':'\u2248','times':'\xD7','timesb':'\u22A0','timesbar':'\u2A31','timesd':'\u2A30','tint':'\u222D','toea':'\u2928','top':'\u22A4','topbot':'\u2336','topcir':'\u2AF1','topf':'\uD835\uDD65','Topf':'\uD835\uDD4B','topfork':'\u2ADA','tosa':'\u2929','tprime':'\u2034','trade':'\u2122','TRADE':'\u2122','triangle':'\u25B5','triangledown':'\u25BF','triangleleft':'\u25C3','trianglelefteq':'\u22B4','triangleq':'\u225C','triangleright':'\u25B9','trianglerighteq':'\u22B5','tridot':'\u25EC','trie':'\u225C','triminus':'\u2A3A','TripleDot':'\u20DB','triplus':'\u2A39','trisb':'\u29CD','tritime':'\u2A3B','trpezium':'\u23E2','tscr':'\uD835\uDCC9','Tscr':'\uD835\uDCAF','tscy':'\u0446','TScy':'\u0426','tshcy':'\u045B','TSHcy':'\u040B','tstrok':'\u0167','Tstrok':'\u0166','twixt':'\u226C','twoheadleftarrow':'\u219E','twoheadrightarrow':'\u21A0','uacute':'\xFA','Uacute':'\xDA','uarr':'\u2191','uArr':'\u21D1','Uarr':'\u219F','Uarrocir':'\u2949','ubrcy':'\u045E','Ubrcy':'\u040E','ubreve':'\u016D','Ubreve':'\u016C','ucirc':'\xFB','Ucirc':'\xDB','ucy':'\u0443','Ucy':'\u0423','udarr':'\u21C5','udblac':'\u0171','Udblac':'\u0170','udhar':'\u296E','ufisht':'\u297E','ufr':'\uD835\uDD32','Ufr':'\uD835\uDD18','ugrave':'\xF9','Ugrave':'\xD9','uHar':'\u2963','uharl':'\u21BF','uharr':'\u21BE','uhblk':'\u2580','ulcorn':'\u231C','ulcorner':'\u231C','ulcrop':'\u230F','ultri':'\u25F8','umacr':'\u016B','Umacr':'\u016A','uml':'\xA8','UnderBar':'_','UnderBrace':'\u23DF','UnderBracket':'\u23B5','UnderParenthesis':'\u23DD','Union':'\u22C3','UnionPlus':'\u228E','uogon':'\u0173','Uogon':'\u0172','uopf':'\uD835\uDD66','Uopf':'\uD835\uDD4C','uparrow':'\u2191','Uparrow':'\u21D1','UpArrow':'\u2191','UpArrowBar':'\u2912','UpArrowDownArrow':'\u21C5','updownarrow':'\u2195','Updownarrow':'\u21D5','UpDownArrow':'\u2195','UpEquilibrium':'\u296E','upharpoonleft':'\u21BF','upharpoonright':'\u21BE','uplus':'\u228E','UpperLeftArrow':'\u2196','UpperRightArrow':'\u2197','upsi':'\u03C5','Upsi':'\u03D2','upsih':'\u03D2','upsilon':'\u03C5','Upsilon':'\u03A5','UpTee':'\u22A5','UpTeeArrow':'\u21A5','upuparrows':'\u21C8','urcorn':'\u231D','urcorner':'\u231D','urcrop':'\u230E','uring':'\u016F','Uring':'\u016E','urtri':'\u25F9','uscr':'\uD835\uDCCA','Uscr':'\uD835\uDCB0','utdot':'\u22F0','utilde':'\u0169','Utilde':'\u0168','utri':'\u25B5','utrif':'\u25B4','uuarr':'\u21C8','uuml':'\xFC','Uuml':'\xDC','uwangle':'\u29A7','vangrt':'\u299C','varepsilon':'\u03F5','varkappa':'\u03F0','varnothing':'\u2205','varphi':'\u03D5','varpi':'\u03D6','varpropto':'\u221D','varr':'\u2195','vArr':'\u21D5','varrho':'\u03F1','varsigma':'\u03C2','varsubsetneq':'\u228A\uFE00','varsubsetneqq':'\u2ACB\uFE00','varsupsetneq':'\u228B\uFE00','varsupsetneqq':'\u2ACC\uFE00','vartheta':'\u03D1','vartriangleleft':'\u22B2','vartriangleright':'\u22B3','vBar':'\u2AE8','Vbar':'\u2AEB','vBarv':'\u2AE9','vcy':'\u0432','Vcy':'\u0412','vdash':'\u22A2','vDash':'\u22A8','Vdash':'\u22A9','VDash':'\u22AB','Vdashl':'\u2AE6','vee':'\u2228','Vee':'\u22C1','veebar':'\u22BB','veeeq':'\u225A','vellip':'\u22EE','verbar':'|','Verbar':'\u2016','vert':'|','Vert':'\u2016','VerticalBar':'\u2223','VerticalLine':'|','VerticalSeparator':'\u2758','VerticalTilde':'\u2240','VeryThinSpace':'\u200A','vfr':'\uD835\uDD33','Vfr':'\uD835\uDD19','vltri':'\u22B2','vnsub':'\u2282\u20D2','vnsup':'\u2283\u20D2','vopf':'\uD835\uDD67','Vopf':'\uD835\uDD4D','vprop':'\u221D','vrtri':'\u22B3','vscr':'\uD835\uDCCB','Vscr':'\uD835\uDCB1','vsubne':'\u228A\uFE00','vsubnE':'\u2ACB\uFE00','vsupne':'\u228B\uFE00','vsupnE':'\u2ACC\uFE00','Vvdash':'\u22AA','vzigzag':'\u299A','wcirc':'\u0175','Wcirc':'\u0174','wedbar':'\u2A5F','wedge':'\u2227','Wedge':'\u22C0','wedgeq':'\u2259','weierp':'\u2118','wfr':'\uD835\uDD34','Wfr':'\uD835\uDD1A','wopf':'\uD835\uDD68','Wopf':'\uD835\uDD4E','wp':'\u2118','wr':'\u2240','wreath':'\u2240','wscr':'\uD835\uDCCC','Wscr':'\uD835\uDCB2','xcap':'\u22C2','xcirc':'\u25EF','xcup':'\u22C3','xdtri':'\u25BD','xfr':'\uD835\uDD35','Xfr':'\uD835\uDD1B','xharr':'\u27F7','xhArr':'\u27FA','xi':'\u03BE','Xi':'\u039E','xlarr':'\u27F5','xlArr':'\u27F8','xmap':'\u27FC','xnis':'\u22FB','xodot':'\u2A00','xopf':'\uD835\uDD69','Xopf':'\uD835\uDD4F','xoplus':'\u2A01','xotime':'\u2A02','xrarr':'\u27F6','xrArr':'\u27F9','xscr':'\uD835\uDCCD','Xscr':'\uD835\uDCB3','xsqcup':'\u2A06','xuplus':'\u2A04','xutri':'\u25B3','xvee':'\u22C1','xwedge':'\u22C0','yacute':'\xFD','Yacute':'\xDD','yacy':'\u044F','YAcy':'\u042F','ycirc':'\u0177','Ycirc':'\u0176','ycy':'\u044B','Ycy':'\u042B','yen':'\xA5','yfr':'\uD835\uDD36','Yfr':'\uD835\uDD1C','yicy':'\u0457','YIcy':'\u0407','yopf':'\uD835\uDD6A','Yopf':'\uD835\uDD50','yscr':'\uD835\uDCCE','Yscr':'\uD835\uDCB4','yucy':'\u044E','YUcy':'\u042E','yuml':'\xFF','Yuml':'\u0178','zacute':'\u017A','Zacute':'\u0179','zcaron':'\u017E','Zcaron':'\u017D','zcy':'\u0437','Zcy':'\u0417','zdot':'\u017C','Zdot':'\u017B','zeetrf':'\u2128','ZeroWidthSpace':'\u200B','zeta':'\u03B6','Zeta':'\u0396','zfr':'\uD835\uDD37','Zfr':'\u2128','zhcy':'\u0436','ZHcy':'\u0416','zigrarr':'\u21DD','zopf':'\uD835\uDD6B','Zopf':'\u2124','zscr':'\uD835\uDCCF','Zscr':'\uD835\uDCB5','zwj':'\u200D','zwnj':'\u200C'};
	var decodeMapLegacy = {'aacute':'\xE1','Aacute':'\xC1','acirc':'\xE2','Acirc':'\xC2','acute':'\xB4','aelig':'\xE6','AElig':'\xC6','agrave':'\xE0','Agrave':'\xC0','amp':'&','AMP':'&','aring':'\xE5','Aring':'\xC5','atilde':'\xE3','Atilde':'\xC3','auml':'\xE4','Auml':'\xC4','brvbar':'\xA6','ccedil':'\xE7','Ccedil':'\xC7','cedil':'\xB8','cent':'\xA2','copy':'\xA9','COPY':'\xA9','curren':'\xA4','deg':'\xB0','divide':'\xF7','eacute':'\xE9','Eacute':'\xC9','ecirc':'\xEA','Ecirc':'\xCA','egrave':'\xE8','Egrave':'\xC8','eth':'\xF0','ETH':'\xD0','euml':'\xEB','Euml':'\xCB','frac12':'\xBD','frac14':'\xBC','frac34':'\xBE','gt':'>','GT':'>','iacute':'\xED','Iacute':'\xCD','icirc':'\xEE','Icirc':'\xCE','iexcl':'\xA1','igrave':'\xEC','Igrave':'\xCC','iquest':'\xBF','iuml':'\xEF','Iuml':'\xCF','laquo':'\xAB','lt':'<','LT':'<','macr':'\xAF','micro':'\xB5','middot':'\xB7','nbsp':'\xA0','not':'\xAC','ntilde':'\xF1','Ntilde':'\xD1','oacute':'\xF3','Oacute':'\xD3','ocirc':'\xF4','Ocirc':'\xD4','ograve':'\xF2','Ograve':'\xD2','ordf':'\xAA','ordm':'\xBA','oslash':'\xF8','Oslash':'\xD8','otilde':'\xF5','Otilde':'\xD5','ouml':'\xF6','Ouml':'\xD6','para':'\xB6','plusmn':'\xB1','pound':'\xA3','quot':'"','QUOT':'"','raquo':'\xBB','reg':'\xAE','REG':'\xAE','sect':'\xA7','shy':'\xAD','sup1':'\xB9','sup2':'\xB2','sup3':'\xB3','szlig':'\xDF','thorn':'\xFE','THORN':'\xDE','times':'\xD7','uacute':'\xFA','Uacute':'\xDA','ucirc':'\xFB','Ucirc':'\xDB','ugrave':'\xF9','Ugrave':'\xD9','uml':'\xA8','uuml':'\xFC','Uuml':'\xDC','yacute':'\xFD','Yacute':'\xDD','yen':'\xA5','yuml':'\xFF'};
	var decodeMapNumeric = {'0':'\uFFFD','128':'\u20AC','130':'\u201A','131':'\u0192','132':'\u201E','133':'\u2026','134':'\u2020','135':'\u2021','136':'\u02C6','137':'\u2030','138':'\u0160','139':'\u2039','140':'\u0152','142':'\u017D','145':'\u2018','146':'\u2019','147':'\u201C','148':'\u201D','149':'\u2022','150':'\u2013','151':'\u2014','152':'\u02DC','153':'\u2122','154':'\u0161','155':'\u203A','156':'\u0153','158':'\u017E','159':'\u0178'};
	var invalidReferenceCodePoints = [1,2,3,4,5,6,7,8,11,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,64976,64977,64978,64979,64980,64981,64982,64983,64984,64985,64986,64987,64988,64989,64990,64991,64992,64993,64994,64995,64996,64997,64998,64999,65000,65001,65002,65003,65004,65005,65006,65007,65534,65535,131070,131071,196606,196607,262142,262143,327678,327679,393214,393215,458750,458751,524286,524287,589822,589823,655358,655359,720894,720895,786430,786431,851966,851967,917502,917503,983038,983039,1048574,1048575,1114110,1114111];

	/*--------------------------------------------------------------------------*/

	var stringFromCharCode = String.fromCharCode;

	var object = {};
	var hasOwnProperty = object.hasOwnProperty;
	var has = function(object, propertyName) {
		return hasOwnProperty.call(object, propertyName);
	};

	var contains = function(array, value) {
		var index = -1;
		var length = array.length;
		while (++index < length) {
			if (array[index] == value) {
				return true;
			}
		}
		return false;
	};

	var merge = function(options, defaults) {
		if (!options) {
			return defaults;
		}
		var result = {};
		var key;
		for (key in defaults) {
			// A `hasOwnProperty` check is not needed here, since only recognized
			// option names are used anyway. Any others are ignored.
			result[key] = has(options, key) ? options[key] : defaults[key];
		}
		return result;
	};

	// Modified version of `ucs2encode`; see https://mths.be/punycode.
	var codePointToSymbol = function(codePoint, strict) {
		var output = '';
		if ((codePoint >= 0xD800 && codePoint <= 0xDFFF) || codePoint > 0x10FFFF) {
			// See issue #4:
			// “Otherwise, if the number is in the range 0xD800 to 0xDFFF or is
			// greater than 0x10FFFF, then this is a parse error. Return a U+FFFD
			// REPLACEMENT CHARACTER.”
			if (strict) {
				parseError('character reference outside the permissible Unicode range');
			}
			return '\uFFFD';
		}
		if (has(decodeMapNumeric, codePoint)) {
			if (strict) {
				parseError('disallowed character reference');
			}
			return decodeMapNumeric[codePoint];
		}
		if (strict && contains(invalidReferenceCodePoints, codePoint)) {
			parseError('disallowed character reference');
		}
		if (codePoint > 0xFFFF) {
			codePoint -= 0x10000;
			output += stringFromCharCode(codePoint >>> 10 & 0x3FF | 0xD800);
			codePoint = 0xDC00 | codePoint & 0x3FF;
		}
		output += stringFromCharCode(codePoint);
		return output;
	};

	var hexEscape = function(codePoint) {
		return '&#x' + codePoint.toString(16).toUpperCase() + ';';
	};

	var decEscape = function(codePoint) {
		return '&#' + codePoint + ';';
	};

	var parseError = function(message) {
		throw Error('Parse error: ' + message);
	};

	/*--------------------------------------------------------------------------*/

	var encode = function(string, options) {
		options = merge(options, encode.options);
		var strict = options.strict;
		if (strict && regexInvalidRawCodePoint.test(string)) {
			parseError('forbidden code point');
		}
		var encodeEverything = options.encodeEverything;
		var useNamedReferences = options.useNamedReferences;
		var allowUnsafeSymbols = options.allowUnsafeSymbols;
		var escapeCodePoint = options.decimal ? decEscape : hexEscape;

		var escapeBmpSymbol = function(symbol) {
			return escapeCodePoint(symbol.charCodeAt(0));
		};

		if (encodeEverything) {
			// Encode ASCII symbols.
			string = string.replace(regexAsciiWhitelist, function(symbol) {
				// Use named references if requested & possible.
				if (useNamedReferences && has(encodeMap, symbol)) {
					return '&' + encodeMap[symbol] + ';';
				}
				return escapeBmpSymbol(symbol);
			});
			// Shorten a few escapes that represent two symbols, of which at least one
			// is within the ASCII range.
			if (useNamedReferences) {
				string = string
					.replace(/&gt;\u20D2/g, '&nvgt;')
					.replace(/&lt;\u20D2/g, '&nvlt;')
					.replace(/&#x66;&#x6A;/g, '&fjlig;');
			}
			// Encode non-ASCII symbols.
			if (useNamedReferences) {
				// Encode non-ASCII symbols that can be replaced with a named reference.
				string = string.replace(regexEncodeNonAscii, function(string) {
					// Note: there is no need to check `has(encodeMap, string)` here.
					return '&' + encodeMap[string] + ';';
				});
			}
			// Note: any remaining non-ASCII symbols are handled outside of the `if`.
		} else if (useNamedReferences) {
			// Apply named character references.
			// Encode `<>"'&` using named character references.
			if (!allowUnsafeSymbols) {
				string = string.replace(regexEscape, function(string) {
					return '&' + encodeMap[string] + ';'; // no need to check `has()` here
				});
			}
			// Shorten escapes that represent two symbols, of which at least one is
			// `<>"'&`.
			string = string
				.replace(/&gt;\u20D2/g, '&nvgt;')
				.replace(/&lt;\u20D2/g, '&nvlt;');
			// Encode non-ASCII symbols that can be replaced with a named reference.
			string = string.replace(regexEncodeNonAscii, function(string) {
				// Note: there is no need to check `has(encodeMap, string)` here.
				return '&' + encodeMap[string] + ';';
			});
		} else if (!allowUnsafeSymbols) {
			// Encode `<>"'&` using hexadecimal escapes, now that they’re not handled
			// using named character references.
			string = string.replace(regexEscape, escapeBmpSymbol);
		}
		return string
			// Encode astral symbols.
			.replace(regexAstralSymbols, function($0) {
				// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
				var high = $0.charCodeAt(0);
				var low = $0.charCodeAt(1);
				var codePoint = (high - 0xD800) * 0x400 + low - 0xDC00 + 0x10000;
				return escapeCodePoint(codePoint);
			})
			// Encode any remaining BMP symbols that are not printable ASCII symbols
			// using a hexadecimal escape.
			.replace(regexBmpWhitelist, escapeBmpSymbol);
	};
	// Expose default options (so they can be overridden globally).
	encode.options = {
		'allowUnsafeSymbols': false,
		'encodeEverything': false,
		'strict': false,
		'useNamedReferences': false,
		'decimal' : false
	};

	var decode = function(html, options) {
		options = merge(options, decode.options);
		var strict = options.strict;
		if (strict && regexInvalidEntity.test(html)) {
			parseError('malformed character reference');
		}
		return html.replace(regexDecode, function($0, $1, $2, $3, $4, $5, $6, $7, $8) {
			var codePoint;
			var semicolon;
			var decDigits;
			var hexDigits;
			var reference;
			var next;

			if ($1) {
				reference = $1;
				// Note: there is no need to check `has(decodeMap, reference)`.
				return decodeMap[reference];
			}

			if ($2) {
				// Decode named character references without trailing `;`, e.g. `&amp`.
				// This is only a parse error if it gets converted to `&`, or if it is
				// followed by `=` in an attribute context.
				reference = $2;
				next = $3;
				if (next && options.isAttributeValue) {
					if (strict && next == '=') {
						parseError('`&` did not start a character reference');
					}
					return $0;
				} else {
					if (strict) {
						parseError(
							'named character reference was not terminated by a semicolon'
						);
					}
					// Note: there is no need to check `has(decodeMapLegacy, reference)`.
					return decodeMapLegacy[reference] + (next || '');
				}
			}

			if ($4) {
				// Decode decimal escapes, e.g. `&#119558;`.
				decDigits = $4;
				semicolon = $5;
				if (strict && !semicolon) {
					parseError('character reference was not terminated by a semicolon');
				}
				codePoint = parseInt(decDigits, 10);
				return codePointToSymbol(codePoint, strict);
			}

			if ($6) {
				// Decode hexadecimal escapes, e.g. `&#x1D306;`.
				hexDigits = $6;
				semicolon = $7;
				if (strict && !semicolon) {
					parseError('character reference was not terminated by a semicolon');
				}
				codePoint = parseInt(hexDigits, 16);
				return codePointToSymbol(codePoint, strict);
			}

			// If we’re still here, `if ($7)` is implied; it’s an ambiguous
			// ampersand for sure. https://mths.be/notes/ambiguous-ampersands
			if (strict) {
				parseError(
					'named character reference was not terminated by a semicolon'
				);
			}
			return $0;
		});
	};
	// Expose default options (so they can be overridden globally).
	decode.options = {
		'isAttributeValue': false,
		'strict': false
	};

	var escape = function(string) {
		return string.replace(regexEscape, function($0) {
			// Note: there is no need to check `has(escapeMap, $0)` here.
			return escapeMap[$0];
		});
	};

	/*--------------------------------------------------------------------------*/

	var he = {
		'version': '1.2.0',
		'encode': encode,
		'decode': decode,
		'escape': escape,
		'unescape': decode
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return he;
		}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}	else // removed by dead control flow
{ var key; }

}(this));


/***/ },

/***/ "./client/src/content/api.ts"
/*!***********************************!*\
  !*** ./client/src/content/api.ts ***!
  \***********************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.init = init;
const core_web_1 = __webpack_require__(/*! @openfin/core-web */ "../../node_modules/@openfin/core-web/out/api-client.cjs.js");
const settings_1 = __webpack_require__(/*! ../platform/settings/settings */ "./client/src/platform/settings/settings.ts");
/**
 * Initializes the OpenFin Web Broker connection.
 * @param inherit Should we inherit settings from the host (available in the OpenFin layout system) or use settings? Default is true.
 */
async function init(inherit = true) {
    // Set window.fin to the `fin` object.
    let options;
    if (window.fin === undefined) {
        if (!inherit) {
            const settings = await (0, settings_1.getSettings)();
            if (settings === undefined) {
                console.error("Unable to run the sample as we have been unable to load the web manifest and it's settings from the currently running html page. Please ensure that the web manifest is being served and that it contains the custom_settings section.");
                return;
            }
            options = {
                brokerUrl: settings.platform.interop.brokerUrl,
                interopConfig: {
                    providerId: settings.platform.interop.providerId,
                    currentContextGroup: settings.platform.interop.defaultContextGroup
                }
            };
        }
        // Specify an interopConfig with a specific provider ID and a context group to initialize the `fin.me.interop` client on connection.
        if (options) {
            window.fin = await (0, core_web_1.connect)({
                options
            });
        }
        else {
            window.fin = await (0, core_web_1.connect)({
                connectionInheritance: "enabled"
            });
        }
        console.log("Finished initializing the fin API.");
        // Create and dispatch the finReady event
        const event = new CustomEvent("finReady");
        window.dispatchEvent(event);
    }
    if (window.fdc3 === undefined && window?.fin?.me.interop?.getFDC3Sync !== undefined) {
        window.fdc3 = fin.me.interop.getFDC3Sync("2.0");
        console.log("Finished initializing the fdc3 API.");
        // Create and dispatch the FDC3Ready event
        const event = new CustomEvent("fdc3Ready");
        window.dispatchEvent(event);
    }
}


/***/ },

/***/ "./client/src/platform/settings/settings.ts"
/*!**************************************************!*\
  !*** ./client/src/platform/settings/settings.ts ***!
  \**************************************************/
(__unused_webpack_module, exports) {

"use strict";

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


/***/ },

/***/ "../../node_modules/uuid/dist/cjs-browser/index.js"
/*!*********************************************************!*\
  !*** ../../node_modules/uuid/dist/cjs-browser/index.js ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.version = exports.validate = exports.v7 = exports.v6ToV1 = exports.v6 = exports.v5 = exports.v4 = exports.v3 = exports.v1ToV6 = exports.v1 = exports.stringify = exports.parse = exports.NIL = exports.MAX = void 0;
var max_js_1 = __webpack_require__(/*! ./max.js */ "../../node_modules/uuid/dist/cjs-browser/max.js");
Object.defineProperty(exports, "MAX", ({ enumerable: true, get: function () { return max_js_1.default; } }));
var nil_js_1 = __webpack_require__(/*! ./nil.js */ "../../node_modules/uuid/dist/cjs-browser/nil.js");
Object.defineProperty(exports, "NIL", ({ enumerable: true, get: function () { return nil_js_1.default; } }));
var parse_js_1 = __webpack_require__(/*! ./parse.js */ "../../node_modules/uuid/dist/cjs-browser/parse.js");
Object.defineProperty(exports, "parse", ({ enumerable: true, get: function () { return parse_js_1.default; } }));
var stringify_js_1 = __webpack_require__(/*! ./stringify.js */ "../../node_modules/uuid/dist/cjs-browser/stringify.js");
Object.defineProperty(exports, "stringify", ({ enumerable: true, get: function () { return stringify_js_1.default; } }));
var v1_js_1 = __webpack_require__(/*! ./v1.js */ "../../node_modules/uuid/dist/cjs-browser/v1.js");
Object.defineProperty(exports, "v1", ({ enumerable: true, get: function () { return v1_js_1.default; } }));
var v1ToV6_js_1 = __webpack_require__(/*! ./v1ToV6.js */ "../../node_modules/uuid/dist/cjs-browser/v1ToV6.js");
Object.defineProperty(exports, "v1ToV6", ({ enumerable: true, get: function () { return v1ToV6_js_1.default; } }));
var v3_js_1 = __webpack_require__(/*! ./v3.js */ "../../node_modules/uuid/dist/cjs-browser/v3.js");
Object.defineProperty(exports, "v3", ({ enumerable: true, get: function () { return v3_js_1.default; } }));
var v4_js_1 = __webpack_require__(/*! ./v4.js */ "../../node_modules/uuid/dist/cjs-browser/v4.js");
Object.defineProperty(exports, "v4", ({ enumerable: true, get: function () { return v4_js_1.default; } }));
var v5_js_1 = __webpack_require__(/*! ./v5.js */ "../../node_modules/uuid/dist/cjs-browser/v5.js");
Object.defineProperty(exports, "v5", ({ enumerable: true, get: function () { return v5_js_1.default; } }));
var v6_js_1 = __webpack_require__(/*! ./v6.js */ "../../node_modules/uuid/dist/cjs-browser/v6.js");
Object.defineProperty(exports, "v6", ({ enumerable: true, get: function () { return v6_js_1.default; } }));
var v6ToV1_js_1 = __webpack_require__(/*! ./v6ToV1.js */ "../../node_modules/uuid/dist/cjs-browser/v6ToV1.js");
Object.defineProperty(exports, "v6ToV1", ({ enumerable: true, get: function () { return v6ToV1_js_1.default; } }));
var v7_js_1 = __webpack_require__(/*! ./v7.js */ "../../node_modules/uuid/dist/cjs-browser/v7.js");
Object.defineProperty(exports, "v7", ({ enumerable: true, get: function () { return v7_js_1.default; } }));
var validate_js_1 = __webpack_require__(/*! ./validate.js */ "../../node_modules/uuid/dist/cjs-browser/validate.js");
Object.defineProperty(exports, "validate", ({ enumerable: true, get: function () { return validate_js_1.default; } }));
var version_js_1 = __webpack_require__(/*! ./version.js */ "../../node_modules/uuid/dist/cjs-browser/version.js");
Object.defineProperty(exports, "version", ({ enumerable: true, get: function () { return version_js_1.default; } }));


/***/ },

/***/ "../../node_modules/uuid/dist/cjs-browser/max.js"
/*!*******************************************************!*\
  !*** ../../node_modules/uuid/dist/cjs-browser/max.js ***!
  \*******************************************************/
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = 'ffffffff-ffff-ffff-ffff-ffffffffffff';


/***/ },

/***/ "../../node_modules/uuid/dist/cjs-browser/md5.js"
/*!*******************************************************!*\
  !*** ../../node_modules/uuid/dist/cjs-browser/md5.js ***!
  \*******************************************************/
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function md5(bytes) {
    const words = uint8ToUint32(bytes);
    const md5Bytes = wordsToMd5(words, bytes.length * 8);
    return uint32ToUint8(md5Bytes);
}
function uint32ToUint8(input) {
    const bytes = new Uint8Array(input.length * 4);
    for (let i = 0; i < input.length * 4; i++) {
        bytes[i] = (input[i >> 2] >>> ((i % 4) * 8)) & 0xff;
    }
    return bytes;
}
function getOutputLength(inputLength8) {
    return (((inputLength8 + 64) >>> 9) << 4) + 14 + 1;
}
function wordsToMd5(x, len) {
    const xpad = new Uint32Array(getOutputLength(len)).fill(0);
    xpad.set(x);
    xpad[len >> 5] |= 0x80 << len % 32;
    xpad[xpad.length - 1] = len;
    x = xpad;
    let a = 1732584193;
    let b = -271733879;
    let c = -1732584194;
    let d = 271733878;
    for (let i = 0; i < x.length; i += 16) {
        const olda = a;
        const oldb = b;
        const oldc = c;
        const oldd = d;
        a = md5ff(a, b, c, d, x[i], 7, -680876936);
        d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5gg(b, c, d, a, x[i], 20, -373897302);
        a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5hh(d, a, b, c, x[i], 11, -358537222);
        c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5ii(a, b, c, d, x[i], 6, -198630844);
        d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = safeAdd(a, olda);
        b = safeAdd(b, oldb);
        c = safeAdd(c, oldc);
        d = safeAdd(d, oldd);
    }
    return Uint32Array.of(a, b, c, d);
}
function uint8ToUint32(input) {
    if (input.length === 0) {
        return new Uint32Array();
    }
    const output = new Uint32Array(getOutputLength(input.length * 8)).fill(0);
    for (let i = 0; i < input.length; i++) {
        output[i >> 2] |= (input[i] & 0xff) << ((i % 4) * 8);
    }
    return output;
}
function safeAdd(x, y) {
    const lsw = (x & 0xffff) + (y & 0xffff);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
}
function bitRotateLeft(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}
function md5cmn(q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c, d, x, s, t) {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t);
}
function md5gg(a, b, c, d, x, s, t) {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
}
function md5hh(a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}
exports["default"] = md5;


/***/ },

/***/ "../../node_modules/uuid/dist/cjs-browser/native.js"
/*!**********************************************************!*\
  !*** ../../node_modules/uuid/dist/cjs-browser/native.js ***!
  \**********************************************************/
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
exports["default"] = { randomUUID };


/***/ },

/***/ "../../node_modules/uuid/dist/cjs-browser/nil.js"
/*!*******************************************************!*\
  !*** ../../node_modules/uuid/dist/cjs-browser/nil.js ***!
  \*******************************************************/
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = '00000000-0000-0000-0000-000000000000';


/***/ },

/***/ "../../node_modules/uuid/dist/cjs-browser/parse.js"
/*!*********************************************************!*\
  !*** ../../node_modules/uuid/dist/cjs-browser/parse.js ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const validate_js_1 = __webpack_require__(/*! ./validate.js */ "../../node_modules/uuid/dist/cjs-browser/validate.js");
function parse(uuid) {
    if (!(0, validate_js_1.default)(uuid)) {
        throw TypeError('Invalid UUID');
    }
    let v;
    return Uint8Array.of((v = parseInt(uuid.slice(0, 8), 16)) >>> 24, (v >>> 16) & 0xff, (v >>> 8) & 0xff, v & 0xff, (v = parseInt(uuid.slice(9, 13), 16)) >>> 8, v & 0xff, (v = parseInt(uuid.slice(14, 18), 16)) >>> 8, v & 0xff, (v = parseInt(uuid.slice(19, 23), 16)) >>> 8, v & 0xff, ((v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000) & 0xff, (v / 0x100000000) & 0xff, (v >>> 24) & 0xff, (v >>> 16) & 0xff, (v >>> 8) & 0xff, v & 0xff);
}
exports["default"] = parse;


/***/ },

/***/ "../../node_modules/uuid/dist/cjs-browser/regex.js"
/*!*********************************************************!*\
  !*** ../../node_modules/uuid/dist/cjs-browser/regex.js ***!
  \*********************************************************/
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;


/***/ },

/***/ "../../node_modules/uuid/dist/cjs-browser/rng.js"
/*!*******************************************************!*\
  !*** ../../node_modules/uuid/dist/cjs-browser/rng.js ***!
  \*******************************************************/
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
    if (!getRandomValues) {
        if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
            throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
        }
        getRandomValues = crypto.getRandomValues.bind(crypto);
    }
    return getRandomValues(rnds8);
}
exports["default"] = rng;


/***/ },

/***/ "../../node_modules/uuid/dist/cjs-browser/sha1.js"
/*!********************************************************!*\
  !*** ../../node_modules/uuid/dist/cjs-browser/sha1.js ***!
  \********************************************************/
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function f(s, x, y, z) {
    switch (s) {
        case 0:
            return (x & y) ^ (~x & z);
        case 1:
            return x ^ y ^ z;
        case 2:
            return (x & y) ^ (x & z) ^ (y & z);
        case 3:
            return x ^ y ^ z;
    }
}
function ROTL(x, n) {
    return (x << n) | (x >>> (32 - n));
}
function sha1(bytes) {
    const K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
    const H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];
    const newBytes = new Uint8Array(bytes.length + 1);
    newBytes.set(bytes);
    newBytes[bytes.length] = 0x80;
    bytes = newBytes;
    const l = bytes.length / 4 + 2;
    const N = Math.ceil(l / 16);
    const M = new Array(N);
    for (let i = 0; i < N; ++i) {
        const arr = new Uint32Array(16);
        for (let j = 0; j < 16; ++j) {
            arr[j] =
                (bytes[i * 64 + j * 4] << 24) |
                    (bytes[i * 64 + j * 4 + 1] << 16) |
                    (bytes[i * 64 + j * 4 + 2] << 8) |
                    bytes[i * 64 + j * 4 + 3];
        }
        M[i] = arr;
    }
    M[N - 1][14] = ((bytes.length - 1) * 8) / Math.pow(2, 32);
    M[N - 1][14] = Math.floor(M[N - 1][14]);
    M[N - 1][15] = ((bytes.length - 1) * 8) & 0xffffffff;
    for (let i = 0; i < N; ++i) {
        const W = new Uint32Array(80);
        for (let t = 0; t < 16; ++t) {
            W[t] = M[i][t];
        }
        for (let t = 16; t < 80; ++t) {
            W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
        }
        let a = H[0];
        let b = H[1];
        let c = H[2];
        let d = H[3];
        let e = H[4];
        for (let t = 0; t < 80; ++t) {
            const s = Math.floor(t / 20);
            const T = (ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t]) >>> 0;
            e = d;
            d = c;
            c = ROTL(b, 30) >>> 0;
            b = a;
            a = T;
        }
        H[0] = (H[0] + a) >>> 0;
        H[1] = (H[1] + b) >>> 0;
        H[2] = (H[2] + c) >>> 0;
        H[3] = (H[3] + d) >>> 0;
        H[4] = (H[4] + e) >>> 0;
    }
    return Uint8Array.of(H[0] >> 24, H[0] >> 16, H[0] >> 8, H[0], H[1] >> 24, H[1] >> 16, H[1] >> 8, H[1], H[2] >> 24, H[2] >> 16, H[2] >> 8, H[2], H[3] >> 24, H[3] >> 16, H[3] >> 8, H[3], H[4] >> 24, H[4] >> 16, H[4] >> 8, H[4]);
}
exports["default"] = sha1;


/***/ },

/***/ "../../node_modules/uuid/dist/cjs-browser/stringify.js"
/*!*************************************************************!*\
  !*** ../../node_modules/uuid/dist/cjs-browser/stringify.js ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.unsafeStringify = void 0;
const validate_js_1 = __webpack_require__(/*! ./validate.js */ "../../node_modules/uuid/dist/cjs-browser/validate.js");
const byteToHex = [];
for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
    return (byteToHex[arr[offset + 0]] +
        byteToHex[arr[offset + 1]] +
        byteToHex[arr[offset + 2]] +
        byteToHex[arr[offset + 3]] +
        '-' +
        byteToHex[arr[offset + 4]] +
        byteToHex[arr[offset + 5]] +
        '-' +
        byteToHex[arr[offset + 6]] +
        byteToHex[arr[offset + 7]] +
        '-' +
        byteToHex[arr[offset + 8]] +
        byteToHex[arr[offset + 9]] +
        '-' +
        byteToHex[arr[offset + 10]] +
        byteToHex[arr[offset + 11]] +
        byteToHex[arr[offset + 12]] +
        byteToHex[arr[offset + 13]] +
        byteToHex[arr[offset + 14]] +
        byteToHex[arr[offset + 15]]).toLowerCase();
}
exports.unsafeStringify = unsafeStringify;
function stringify(arr, offset = 0) {
    const uuid = unsafeStringify(arr, offset);
    if (!(0, validate_js_1.default)(uuid)) {
        throw TypeError('Stringified UUID is invalid');
    }
    return uuid;
}
exports["default"] = stringify;


/***/ },

/***/ "../../node_modules/uuid/dist/cjs-browser/v1.js"
/*!******************************************************!*\
  !*** ../../node_modules/uuid/dist/cjs-browser/v1.js ***!
  \******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateV1State = void 0;
const rng_js_1 = __webpack_require__(/*! ./rng.js */ "../../node_modules/uuid/dist/cjs-browser/rng.js");
const stringify_js_1 = __webpack_require__(/*! ./stringify.js */ "../../node_modules/uuid/dist/cjs-browser/stringify.js");
const _state = {};
function v1(options, buf, offset) {
    let bytes;
    const isV6 = options?._v6 ?? false;
    if (options) {
        const optionsKeys = Object.keys(options);
        if (optionsKeys.length === 1 && optionsKeys[0] === '_v6') {
            options = undefined;
        }
    }
    if (options) {
        bytes = v1Bytes(options.random ?? options.rng?.() ?? (0, rng_js_1.default)(), options.msecs, options.nsecs, options.clockseq, options.node, buf, offset);
    }
    else {
        const now = Date.now();
        const rnds = (0, rng_js_1.default)();
        updateV1State(_state, now, rnds);
        bytes = v1Bytes(rnds, _state.msecs, _state.nsecs, isV6 ? undefined : _state.clockseq, isV6 ? undefined : _state.node, buf, offset);
    }
    return buf ?? (0, stringify_js_1.unsafeStringify)(bytes);
}
function updateV1State(state, now, rnds) {
    state.msecs ??= -Infinity;
    state.nsecs ??= 0;
    if (now === state.msecs) {
        state.nsecs++;
        if (state.nsecs >= 10000) {
            state.node = undefined;
            state.nsecs = 0;
        }
    }
    else if (now > state.msecs) {
        state.nsecs = 0;
    }
    else if (now < state.msecs) {
        state.node = undefined;
    }
    if (!state.node) {
        state.node = rnds.slice(10, 16);
        state.node[0] |= 0x01;
        state.clockseq = ((rnds[8] << 8) | rnds[9]) & 0x3fff;
    }
    state.msecs = now;
    return state;
}
exports.updateV1State = updateV1State;
function v1Bytes(rnds, msecs, nsecs, clockseq, node, buf, offset = 0) {
    if (rnds.length < 16) {
        throw new Error('Random bytes length must be >= 16');
    }
    if (!buf) {
        buf = new Uint8Array(16);
        offset = 0;
    }
    else {
        if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
        }
    }
    msecs ??= Date.now();
    nsecs ??= 0;
    clockseq ??= ((rnds[8] << 8) | rnds[9]) & 0x3fff;
    node ??= rnds.slice(10, 16);
    msecs += 12219292800000;
    const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    buf[offset++] = (tl >>> 24) & 0xff;
    buf[offset++] = (tl >>> 16) & 0xff;
    buf[offset++] = (tl >>> 8) & 0xff;
    buf[offset++] = tl & 0xff;
    const tmh = ((msecs / 0x100000000) * 10000) & 0xfffffff;
    buf[offset++] = (tmh >>> 8) & 0xff;
    buf[offset++] = tmh & 0xff;
    buf[offset++] = ((tmh >>> 24) & 0xf) | 0x10;
    buf[offset++] = (tmh >>> 16) & 0xff;
    buf[offset++] = (clockseq >>> 8) | 0x80;
    buf[offset++] = clockseq & 0xff;
    for (let n = 0; n < 6; ++n) {
        buf[offset++] = node[n];
    }
    return buf;
}
exports["default"] = v1;


/***/ },

/***/ "../../node_modules/uuid/dist/cjs-browser/v1ToV6.js"
/*!**********************************************************!*\
  !*** ../../node_modules/uuid/dist/cjs-browser/v1ToV6.js ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const parse_js_1 = __webpack_require__(/*! ./parse.js */ "../../node_modules/uuid/dist/cjs-browser/parse.js");
const stringify_js_1 = __webpack_require__(/*! ./stringify.js */ "../../node_modules/uuid/dist/cjs-browser/stringify.js");
function v1ToV6(uuid) {
    const v1Bytes = typeof uuid === 'string' ? (0, parse_js_1.default)(uuid) : uuid;
    const v6Bytes = _v1ToV6(v1Bytes);
    return typeof uuid === 'string' ? (0, stringify_js_1.unsafeStringify)(v6Bytes) : v6Bytes;
}
exports["default"] = v1ToV6;
function _v1ToV6(v1Bytes) {
    return Uint8Array.of(((v1Bytes[6] & 0x0f) << 4) | ((v1Bytes[7] >> 4) & 0x0f), ((v1Bytes[7] & 0x0f) << 4) | ((v1Bytes[4] & 0xf0) >> 4), ((v1Bytes[4] & 0x0f) << 4) | ((v1Bytes[5] & 0xf0) >> 4), ((v1Bytes[5] & 0x0f) << 4) | ((v1Bytes[0] & 0xf0) >> 4), ((v1Bytes[0] & 0x0f) << 4) | ((v1Bytes[1] & 0xf0) >> 4), ((v1Bytes[1] & 0x0f) << 4) | ((v1Bytes[2] & 0xf0) >> 4), 0x60 | (v1Bytes[2] & 0x0f), v1Bytes[3], v1Bytes[8], v1Bytes[9], v1Bytes[10], v1Bytes[11], v1Bytes[12], v1Bytes[13], v1Bytes[14], v1Bytes[15]);
}


/***/ },

/***/ "../../node_modules/uuid/dist/cjs-browser/v3.js"
/*!******************************************************!*\
  !*** ../../node_modules/uuid/dist/cjs-browser/v3.js ***!
  \******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.URL = exports.DNS = void 0;
const md5_js_1 = __webpack_require__(/*! ./md5.js */ "../../node_modules/uuid/dist/cjs-browser/md5.js");
const v35_js_1 = __webpack_require__(/*! ./v35.js */ "../../node_modules/uuid/dist/cjs-browser/v35.js");
var v35_js_2 = __webpack_require__(/*! ./v35.js */ "../../node_modules/uuid/dist/cjs-browser/v35.js");
Object.defineProperty(exports, "DNS", ({ enumerable: true, get: function () { return v35_js_2.DNS; } }));
Object.defineProperty(exports, "URL", ({ enumerable: true, get: function () { return v35_js_2.URL; } }));
function v3(value, namespace, buf, offset) {
    return (0, v35_js_1.default)(0x30, md5_js_1.default, value, namespace, buf, offset);
}
v3.DNS = v35_js_1.DNS;
v3.URL = v35_js_1.URL;
exports["default"] = v3;


/***/ },

/***/ "../../node_modules/uuid/dist/cjs-browser/v35.js"
/*!*******************************************************!*\
  !*** ../../node_modules/uuid/dist/cjs-browser/v35.js ***!
  \*******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.URL = exports.DNS = exports.stringToBytes = void 0;
const parse_js_1 = __webpack_require__(/*! ./parse.js */ "../../node_modules/uuid/dist/cjs-browser/parse.js");
const stringify_js_1 = __webpack_require__(/*! ./stringify.js */ "../../node_modules/uuid/dist/cjs-browser/stringify.js");
function stringToBytes(str) {
    str = unescape(encodeURIComponent(str));
    const bytes = new Uint8Array(str.length);
    for (let i = 0; i < str.length; ++i) {
        bytes[i] = str.charCodeAt(i);
    }
    return bytes;
}
exports.stringToBytes = stringToBytes;
exports.DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
exports.URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
function v35(version, hash, value, namespace, buf, offset) {
    const valueBytes = typeof value === 'string' ? stringToBytes(value) : value;
    const namespaceBytes = typeof namespace === 'string' ? (0, parse_js_1.default)(namespace) : namespace;
    if (typeof namespace === 'string') {
        namespace = (0, parse_js_1.default)(namespace);
    }
    if (namespace?.length !== 16) {
        throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    }
    let bytes = new Uint8Array(16 + valueBytes.length);
    bytes.set(namespaceBytes);
    bytes.set(valueBytes, namespaceBytes.length);
    bytes = hash(bytes);
    bytes[6] = (bytes[6] & 0x0f) | version;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    if (buf) {
        offset = offset || 0;
        if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
        }
        for (let i = 0; i < 16; ++i) {
            buf[offset + i] = bytes[i];
        }
        return buf;
    }
    return (0, stringify_js_1.unsafeStringify)(bytes);
}
exports["default"] = v35;


/***/ },

/***/ "../../node_modules/uuid/dist/cjs-browser/v4.js"
/*!******************************************************!*\
  !*** ../../node_modules/uuid/dist/cjs-browser/v4.js ***!
  \******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const native_js_1 = __webpack_require__(/*! ./native.js */ "../../node_modules/uuid/dist/cjs-browser/native.js");
const rng_js_1 = __webpack_require__(/*! ./rng.js */ "../../node_modules/uuid/dist/cjs-browser/rng.js");
const stringify_js_1 = __webpack_require__(/*! ./stringify.js */ "../../node_modules/uuid/dist/cjs-browser/stringify.js");
function v4(options, buf, offset) {
    if (native_js_1.default.randomUUID && !buf && !options) {
        return native_js_1.default.randomUUID();
    }
    options = options || {};
    const rnds = options.random ?? options.rng?.() ?? (0, rng_js_1.default)();
    if (rnds.length < 16) {
        throw new Error('Random bytes length must be >= 16');
    }
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;
    if (buf) {
        offset = offset || 0;
        if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
        }
        for (let i = 0; i < 16; ++i) {
            buf[offset + i] = rnds[i];
        }
        return buf;
    }
    return (0, stringify_js_1.unsafeStringify)(rnds);
}
exports["default"] = v4;


/***/ },

/***/ "../../node_modules/uuid/dist/cjs-browser/v5.js"
/*!******************************************************!*\
  !*** ../../node_modules/uuid/dist/cjs-browser/v5.js ***!
  \******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.URL = exports.DNS = void 0;
const sha1_js_1 = __webpack_require__(/*! ./sha1.js */ "../../node_modules/uuid/dist/cjs-browser/sha1.js");
const v35_js_1 = __webpack_require__(/*! ./v35.js */ "../../node_modules/uuid/dist/cjs-browser/v35.js");
var v35_js_2 = __webpack_require__(/*! ./v35.js */ "../../node_modules/uuid/dist/cjs-browser/v35.js");
Object.defineProperty(exports, "DNS", ({ enumerable: true, get: function () { return v35_js_2.DNS; } }));
Object.defineProperty(exports, "URL", ({ enumerable: true, get: function () { return v35_js_2.URL; } }));
function v5(value, namespace, buf, offset) {
    return (0, v35_js_1.default)(0x50, sha1_js_1.default, value, namespace, buf, offset);
}
v5.DNS = v35_js_1.DNS;
v5.URL = v35_js_1.URL;
exports["default"] = v5;


/***/ },

/***/ "../../node_modules/uuid/dist/cjs-browser/v6.js"
/*!******************************************************!*\
  !*** ../../node_modules/uuid/dist/cjs-browser/v6.js ***!
  \******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const stringify_js_1 = __webpack_require__(/*! ./stringify.js */ "../../node_modules/uuid/dist/cjs-browser/stringify.js");
const v1_js_1 = __webpack_require__(/*! ./v1.js */ "../../node_modules/uuid/dist/cjs-browser/v1.js");
const v1ToV6_js_1 = __webpack_require__(/*! ./v1ToV6.js */ "../../node_modules/uuid/dist/cjs-browser/v1ToV6.js");
function v6(options, buf, offset) {
    options ??= {};
    offset ??= 0;
    let bytes = (0, v1_js_1.default)({ ...options, _v6: true }, new Uint8Array(16));
    bytes = (0, v1ToV6_js_1.default)(bytes);
    if (buf) {
        if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
        }
        for (let i = 0; i < 16; i++) {
            buf[offset + i] = bytes[i];
        }
        return buf;
    }
    return (0, stringify_js_1.unsafeStringify)(bytes);
}
exports["default"] = v6;


/***/ },

/***/ "../../node_modules/uuid/dist/cjs-browser/v6ToV1.js"
/*!**********************************************************!*\
  !*** ../../node_modules/uuid/dist/cjs-browser/v6ToV1.js ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const parse_js_1 = __webpack_require__(/*! ./parse.js */ "../../node_modules/uuid/dist/cjs-browser/parse.js");
const stringify_js_1 = __webpack_require__(/*! ./stringify.js */ "../../node_modules/uuid/dist/cjs-browser/stringify.js");
function v6ToV1(uuid) {
    const v6Bytes = typeof uuid === 'string' ? (0, parse_js_1.default)(uuid) : uuid;
    const v1Bytes = _v6ToV1(v6Bytes);
    return typeof uuid === 'string' ? (0, stringify_js_1.unsafeStringify)(v1Bytes) : v1Bytes;
}
exports["default"] = v6ToV1;
function _v6ToV1(v6Bytes) {
    return Uint8Array.of(((v6Bytes[3] & 0x0f) << 4) | ((v6Bytes[4] >> 4) & 0x0f), ((v6Bytes[4] & 0x0f) << 4) | ((v6Bytes[5] & 0xf0) >> 4), ((v6Bytes[5] & 0x0f) << 4) | (v6Bytes[6] & 0x0f), v6Bytes[7], ((v6Bytes[1] & 0x0f) << 4) | ((v6Bytes[2] & 0xf0) >> 4), ((v6Bytes[2] & 0x0f) << 4) | ((v6Bytes[3] & 0xf0) >> 4), 0x10 | ((v6Bytes[0] & 0xf0) >> 4), ((v6Bytes[0] & 0x0f) << 4) | ((v6Bytes[1] & 0xf0) >> 4), v6Bytes[8], v6Bytes[9], v6Bytes[10], v6Bytes[11], v6Bytes[12], v6Bytes[13], v6Bytes[14], v6Bytes[15]);
}


/***/ },

/***/ "../../node_modules/uuid/dist/cjs-browser/v7.js"
/*!******************************************************!*\
  !*** ../../node_modules/uuid/dist/cjs-browser/v7.js ***!
  \******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateV7State = void 0;
const rng_js_1 = __webpack_require__(/*! ./rng.js */ "../../node_modules/uuid/dist/cjs-browser/rng.js");
const stringify_js_1 = __webpack_require__(/*! ./stringify.js */ "../../node_modules/uuid/dist/cjs-browser/stringify.js");
const _state = {};
function v7(options, buf, offset) {
    let bytes;
    if (options) {
        bytes = v7Bytes(options.random ?? options.rng?.() ?? (0, rng_js_1.default)(), options.msecs, options.seq, buf, offset);
    }
    else {
        const now = Date.now();
        const rnds = (0, rng_js_1.default)();
        updateV7State(_state, now, rnds);
        bytes = v7Bytes(rnds, _state.msecs, _state.seq, buf, offset);
    }
    return buf ?? (0, stringify_js_1.unsafeStringify)(bytes);
}
function updateV7State(state, now, rnds) {
    state.msecs ??= -Infinity;
    state.seq ??= 0;
    if (now > state.msecs) {
        state.seq = (rnds[6] << 23) | (rnds[7] << 16) | (rnds[8] << 8) | rnds[9];
        state.msecs = now;
    }
    else {
        state.seq = (state.seq + 1) | 0;
        if (state.seq === 0) {
            state.msecs++;
        }
    }
    return state;
}
exports.updateV7State = updateV7State;
function v7Bytes(rnds, msecs, seq, buf, offset = 0) {
    if (rnds.length < 16) {
        throw new Error('Random bytes length must be >= 16');
    }
    if (!buf) {
        buf = new Uint8Array(16);
        offset = 0;
    }
    else {
        if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
        }
    }
    msecs ??= Date.now();
    seq ??= ((rnds[6] * 0x7f) << 24) | (rnds[7] << 16) | (rnds[8] << 8) | rnds[9];
    buf[offset++] = (msecs / 0x10000000000) & 0xff;
    buf[offset++] = (msecs / 0x100000000) & 0xff;
    buf[offset++] = (msecs / 0x1000000) & 0xff;
    buf[offset++] = (msecs / 0x10000) & 0xff;
    buf[offset++] = (msecs / 0x100) & 0xff;
    buf[offset++] = msecs & 0xff;
    buf[offset++] = 0x70 | ((seq >>> 28) & 0x0f);
    buf[offset++] = (seq >>> 20) & 0xff;
    buf[offset++] = 0x80 | ((seq >>> 14) & 0x3f);
    buf[offset++] = (seq >>> 6) & 0xff;
    buf[offset++] = ((seq << 2) & 0xff) | (rnds[10] & 0x03);
    buf[offset++] = rnds[11];
    buf[offset++] = rnds[12];
    buf[offset++] = rnds[13];
    buf[offset++] = rnds[14];
    buf[offset++] = rnds[15];
    return buf;
}
exports["default"] = v7;


/***/ },

/***/ "../../node_modules/uuid/dist/cjs-browser/validate.js"
/*!************************************************************!*\
  !*** ../../node_modules/uuid/dist/cjs-browser/validate.js ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const regex_js_1 = __webpack_require__(/*! ./regex.js */ "../../node_modules/uuid/dist/cjs-browser/regex.js");
function validate(uuid) {
    return typeof uuid === 'string' && regex_js_1.default.test(uuid);
}
exports["default"] = validate;


/***/ },

/***/ "../../node_modules/uuid/dist/cjs-browser/version.js"
/*!***********************************************************!*\
  !*** ../../node_modules/uuid/dist/cjs-browser/version.js ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const validate_js_1 = __webpack_require__(/*! ./validate.js */ "../../node_modules/uuid/dist/cjs-browser/validate.js");
function version(uuid) {
    if (!(0, validate_js_1.default)(uuid)) {
        throw TypeError('Invalid UUID');
    }
    return parseInt(uuid.slice(14, 15), 16);
}
exports["default"] = version;


/***/ }

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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
/*!************************************************!*\
  !*** ./client/src/content/fdc3-intent-view.ts ***!
  \************************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const api_1 = __webpack_require__(/*! ./api */ "./client/src/content/api.ts");
window.addEventListener("DOMContentLoaded", async () => {
    await (0, api_1.init)(true);
    await initializeDOM();
});
/**
 * Raise an intent using the fdc3 API.
 */
async function raiseIntent() {
    if (window.fin !== undefined) {
        const context = {
            type: "fdc3.contact",
            name: "Andy Young",
            id: {
                email: "andy.young@example.com"
            }
        };
        const intent = "ViewContact";
        const intentResolver = await window.fdc3.raiseIntent(intent, context);
        if (intentResolver !== undefined) {
            console.log("Intent resolver received:", intentResolver);
        }
    }
}
/**
 * Adds an fdc3 intent listener to the window.
 */
async function addIntentListener() {
    const intent = "ViewContact";
    if (window.fdc3) {
        await window.fdc3.addIntentListener(intent, (ctx, metadata) => {
            console.log(`Received Context For Intent: ${intent}`, ctx);
            console.log(`Received Metadata With Intent: ${intent}`, metadata);
            updateDOMElements(ctx);
        });
    }
    else {
        window.addEventListener("fdc3Ready", async () => {
            if (window.fdc3) {
                await window.fdc3.addIntentListener(intent, (ctx, metadata) => {
                    console.log(`Received Context For Intent: ${intent}`, ctx);
                    console.log(`Received Metadata With Intent: ${intent}`, metadata);
                    updateDOMElements(ctx);
                });
            }
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
    const raiseIntentButton = document.querySelector("#raiseIntent");
    if (raiseIntentButton !== null) {
        raiseIntentButton.addEventListener("click", async () => {
            await raiseIntent();
        });
    }
    await addIntentListener();
}

})();

/******/ })()
;
//# sourceMappingURL=fdc3-intent-view.bundle.js.map