(()=>{"use strict";function e(e){const{directives:t,element:n,context:o}=e,{model:s,ref:i}=t;if(s){const[e,t]=s.get();n.value=e(),n.addEventListener("input",(e=>{t(e.target.value),o.detectChanges()}))}i&&i.set(n)}let t;function n(e){for(const[t,n]of Object.entries(e))this.props[t]=n;this.hooks.run(t.onPropsChange,[this.props]),this.isConnected&&this.detectChanges()}var o;(o=t||(t={})).afterInit="afterInit",o.onDestroy="onDestroy",o.onViewChange="onViewChange",o.onChangeDetection="onChangeDetection",o.onPropsChange="onPropsChange";class s{hooks={afterInit:[],onDestroy:[],onViewChange:[],onChangeDetection:[],onPropsChange:[]};set(e,t){this.hooks[e].push(t)}run(e,t=[]){this.hooks[e]=this.hooks[e].filter((e=>e.isActive())),this.hooks[e].forEach((e=>e.hook(...t)))}clear(e){this.hooks[e]=[]}}function i(){if(this.isChangeDetectionRunning)return;this.isChangeDetectionRunning=!0;let e=function(e){let t=!1;return[...e.conditionWatchers,...e.watchers].forEach((e=>{e.isUpdated()&&e.isConnected()&&(t=!0,e.update(e.currentValue))})),e.conditionWatchers=e.conditionWatchers.filter((e=>e.isConnected())),e.watchers=e.watchers.filter((e=>e.isConnected())),t}(this);this.hooks.run(t.onChangeDetection),e&&this.hooks.run(t.onViewChange),this.isChangeDetectionRunning=!1}function r(e){customElements.define(e.selector,e)}const c=function(o,c){const h=o.superClass||HTMLElement;return class extends h{static selector=c;fnComponent=o;state={};stateIndex=0;directives={view:e,...o.directives};pipes=o.pipes||{};hooks=new s;props={};setProps=n.bind(this);isChangeDetectionRunning=!1;detectChanges=i.bind(this);watchers=[];conditionWatchers=[];connectedCallback(){this.fnComponent.childrenDefined||(this.fnComponent.children||[]).forEach((e=>r(e))),this.fnComponent.childrenDefined=!0;const e=this.fnComponent(this.props,this);if(this.appendChild(e),this.fnComponent.styles){const e=this.fnComponent.styles;this.fnComponent.styles=null;const t=document.createElement("style");t.textContent=e,document.getElementsByTagName("head")[0].appendChild(t)}Object.keys(this.props).length>0&&this.hooks.run(t.onPropsChange,[this.props]),this.hooks.run(t.afterInit),this.hooks.clear(t.afterInit)}disconnectedCallback(){this.hooks.run(t.onDestroy)}}};function h(e,t={},n=[]){const o=document.createElement(e);for(const[e,n]of Object.entries(t))o.setAttribute(e,n);return o.append(...n),o}function a(e){return document.createTextNode(e)}function u(e,t,n){const o={currentValue:{},isConnected:()=>t.isConnected,isUpdated:()=>{let e=!1;for(const[t,s]of Object.entries(n)){const n=s();o.currentValue[t]!==n&&(e=!0),o.currentValue[t]=n}return e},update:e=>{for(const[n,o]of Object.entries(e))t.setAttribute(n,o)}};for(const[e,s]of Object.entries(n)){const n=s();o.currentValue[e]=n,t.setAttribute(e,n)}return e.watchers.push(o),t}function d(e,t,n,o,s){const i=customElements.get(e);if(!i)return void console.error(`The component ${e} is not defined.`);const r=new i;if(Object.keys(s).length>0){const e={currentValue:{},isConnected:()=>r.isConnected,isUpdated:()=>{let t=!1;for(const[n,o]of Object.entries(s)){const s=o();e.currentValue[n]!==s&&(t=!0),e.currentValue[n]=s}return t},update:e=>{r.setProps(e)}};e.isUpdated(),e.update(e.currentValue),o.watchers&&Array.isArray(o.watchers)&&o.watchers.push(e)}for(const[e,n]of Object.entries(t))r.setAttribute(e,n);return r.append(...n),r}class l{constructor(){if(l.instance)return l.instance;window.__REDUX_DEVTOOLS_EXTENSION__&&(this.devTool=window.__REDUX_DEVTOOLS_EXTENSION__.connect()),l.instance=this}subscribe(e){this.devTool&&this.devTool.subscribe(e)}init(e){this.devTool&&this.devTool.init(e)}send(e,t){this.devTool&&this.devTool.send(e,t)}}let p={},f=[];const C=new l;function g(e,t){return e.selector=t,e}C.subscribe((e=>{if("DISPATCH"===e.type&&e.state){const t=JSON.parse(e.state);for(const e in t)p[e]=t[e];f=f.filter((e=>e.isConnected())),f.forEach((e=>e.changeDetection()))}})),C.init(p),g((function(e){return e.toLowerCase()}),"lowercase"),g((function(e,t){return e.toUpperCase()}),"uppercase"),r(c((function(){return h("h1",{"mn-el-1":""},[a("Child")])}),"app-child")),r(c((function(){return h("div",{"mn-el-2":""},[a("\n        "),u(this,h("h1",{"mn-el-2":""},[a("Hello World!")]),{id:()=>100}),a("\n        "),d("app-child",{"mn-el-2":""},[],this,{}),a("\n    ")])}),"app-root"))})();
//# sourceMappingURL=index.js.map