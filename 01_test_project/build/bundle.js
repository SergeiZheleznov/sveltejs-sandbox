var app=function(){"use strict";function t(){}function n(t){return t()}function e(){return Object.create(null)}function o(t){t.forEach(n)}function r(t){return"function"==typeof t}function c(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function u(t,n){t.appendChild(n)}function a(t,n,e){t.insertBefore(n,e||null)}function i(t){t.parentNode.removeChild(t)}function s(t){return document.createElement(t)}function f(t){return document.createTextNode(t)}function l(){return f(" ")}function d(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function p(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}let $;function h(t){$=t}const m=[],g=[],b=[],y=[],_=Promise.resolve();let x=!1;function v(t){b.push(t)}let k=!1;const w=new Set;function j(){if(!k){k=!0;do{for(let t=0;t<m.length;t+=1){const n=m[t];h(n),E(n.$$)}for(m.length=0;g.length;)g.pop()();for(let t=0;t<b.length;t+=1){const n=b[t];w.has(n)||(w.add(n),n())}b.length=0}while(m.length);for(;y.length;)y.pop()();x=!1,k=!1,w.clear()}}function E(t){if(null!==t.fragment){t.update(),o(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(v)}}const A=new Set;function S(t,n){t&&t.i&&(A.delete(t),t.i(n))}function N(t,e,c){const{fragment:u,on_mount:a,on_destroy:i,after_update:s}=t.$$;u&&u.m(e,c),v(()=>{const e=a.map(n).filter(r);i?i.push(...e):o(e),t.$$.on_mount=[]}),s.forEach(v)}function O(t,n){const e=t.$$;null!==e.fragment&&(o(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function T(t,n){-1===t.$$.dirty[0]&&(m.push(t),x||(x=!0,_.then(j)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function C(n,r,c,u,a,s,f=[-1]){const l=$;h(n);const d=r.props||{},p=n.$$={fragment:null,ctx:null,props:s,update:t,not_equal:a,bound:e(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(l?l.$$.context:[]),callbacks:e(),dirty:f,skip_bound:!1};let m=!1;if(p.ctx=c?c(n,d,(t,e,...o)=>{const r=o.length?o[0]:e;return p.ctx&&a(p.ctx[t],p.ctx[t]=r)&&(!p.skip_bound&&p.bound[t]&&p.bound[t](r),m&&T(n,t)),e}):[],p.update(),m=!0,o(p.before_update),p.fragment=!!u&&u(p.ctx),r.target){if(r.hydrate){const t=function(t){return Array.from(t.childNodes)}(r.target);p.fragment&&p.fragment.l(t),t.forEach(i)}else p.fragment&&p.fragment.c();r.intro&&S(n.$$.fragment),N(n,r.target,r.anchor),j()}h(l)}class H{$destroy(){O(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function M(n){let e,o;return{c(){e=s("p"),o=f(n[0]),d(e,"class","bg-gray-500 text-white")},m(t,n){a(t,e,n),u(e,o)},p(t,[n]){1&n&&p(o,t[0])},i:t,o:t,d(t){t&&i(e)}}}function q(t,n,e){let{name:o}=n;return t.$$set=t=>{"name"in t&&e(0,o=t.name)},[o]}class B extends H{constructor(t){super(),C(this,t,q,M,c,{name:0})}}function L(t){let n,e,o,r,c,$,h,m,g,b;return g=new B({props:{name:2}}),{c(){var u;n=s("main"),e=s("h1"),o=f("Hello "),r=f(t[0]),c=f("!"),$=l(),h=s("p"),h.innerHTML='Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.',m=l(),(u=g.$$.fragment)&&u.c(),d(e,"class","svelte-1tky8bj"),d(n,"class","svelte-1tky8bj")},m(t,i){a(t,n,i),u(n,e),u(e,o),u(e,r),u(e,c),u(n,$),u(n,h),u(n,m),N(g,n,null),b=!0},p(t,[n]){(!b||1&n)&&p(r,t[0])},i(t){b||(S(g.$$.fragment,t),b=!0)},o(t){!function(t,n,e,o){if(t&&t.o){if(A.has(t))return;A.add(t),(void 0).c.push(()=>{A.delete(t),o&&(e&&t.d(1),o())}),t.o(n)}}(g.$$.fragment,t),b=!1},d(t){t&&i(n),O(g)}}}function P(t,n,e){let{name:o}=n;return t.$$set=t=>{"name"in t&&e(0,o=t.name)},[o]}return new class extends H{constructor(t){super(),C(this,t,P,L,c,{name:0})}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map