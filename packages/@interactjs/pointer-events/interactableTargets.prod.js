import{Interactable as t}from"../core/Interactable.prod.js";import e from"../utils/extend.prod.js";function n(t){return e(this.events.options,t),this}const o={id:"pointer-events/interactableTargets",install(t){const{Interactable:e}=t;e.prototype.pointerEvents=n;const o=e.prototype._backCompatOption;e.prototype._backCompatOption=function(t,e){const n=o.call(this,t,e);return n===this&&(this.events.options[t]=e),n}},listeners:{"pointerEvents:collect-targets"({targets:t,node:e,type:n,eventTarget:o},s){s.interactables.forEachMatch(e,(s=>{const r=s.events,a=r.options;r.types[n]&&r.types[n].length&&s.testIgnoreAllow(a,e,o)&&t.push({node:e,eventable:r,props:{interactable:s}})}))},"interactable:new"({interactable:t}){t.events.getRect=e=>t.getRect(e)},"interactable:set"({interactable:t,options:n},o){e(t.events.options,o.pointerEvents.defaults),e(t.events.options,n.pointerEvents||{})}}};export default o;
//# sourceMappingURL=interactableTargets.prod.js.map