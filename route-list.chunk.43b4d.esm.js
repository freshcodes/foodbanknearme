(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{VtUm:function(e,t,r){"use strict";var s=r("CfXt");t.a=({url:e})=>{if("undefined"==typeof window)return;const[t]=Object(s.b)({url:e});t&&t.meta&&(document.title=t.meta.find(e=>e.property&&"og:title"===e.property).content)}},mfKG:function(e,t,r){"use strict";r.r(t);var s=r("hosL"),p=r("VtUm");class a extends s.Component{render(e,t){const r=e.bank.properties;let p="";return r.address2&&(p=Object(s.h)("span",{itemprop:"postOfficeBoxNumber"}," ",r.address2," ")),Object(s.h)("div",{class:"bankDetails",itemscope:!0,itemtype:"http://schema.org/LocalBusiness"},Object(s.h)("strong",null,Object(s.h)("span",{itemprop:"name"},r.name)),Object(s.h)("div",{itemprop:"address",itemscope:!0,itemtype:"http://schema.org/PostalAddress"},Object(s.h)("span",{itemprop:"streetAddress"}," ",r.address," "),Object(s.h)("br",null),p,p?Object(s.h)("br",null):"",Object(s.h)("span",{itemprop:"addressLocality"}," ",r.city),",",Object(s.h)("span",{itemprop:"addressRegion"}," ",r.state," "),Object(s.h)("span",{itemprop:"postalCode"}," ",r.zip," ")),Object(s.h)("span",{itemprop:"telephone"},r.phone),Object(s.h)("br",null),Object(s.h)("a",{href:"http://"+r.url},Object(s.h)("span",{itemprop:"url"},r.url)))}}var n=r("3ZI4");t.default=e=>{return Object(s.h)("div",null,Object(s.h)(p.a,{url:e.url}),Object(s.h)("a",{href:"/",class:"backButton"},"« Back"),Object(s.h)("ul",null,(t=e.state,n.banks.features.filter(e=>e.properties.state.toLowerCase()===t)).map(e=>Object(s.h)("li",{key:`${e.properties.name}-${e.properties.zip}`},Object(s.h)(a,{bank:e})))));var t}}}]);
//# sourceMappingURL=route-list.chunk.43b4d.esm.js.map