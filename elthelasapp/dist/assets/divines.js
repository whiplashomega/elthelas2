import{h as u,u as p,o as n,c as o,p as c,M as v,f as s,F as r,l as a,J as h,K as f,t as l}from"./vendor.js";import{a as m,_}from"./index.js";var y={setup(){const e=m(),{divines:i}=u(e);return p({title:"Divines"}),{statics:e,divines:i}},data(){return{divineFilter:"",types:["Alien","Angel","Fey","Fiend"],filteredDivines:[]}},methods:{filterDivines:function(){this.filteredDivines=this.divines.filter(e=>(console.log(e.type),console.log(this.divineFilter),e.type===this.divineFilter))}},mounted(){this.statics.getAllDivines().then(()=>{this.filteredDivines=this.divines})}};const d=e=>(h("data-v-7c292518"),e=e(),f(),e),g=d(()=>s("p",null,'"Divine" beings are incredibly powerful immortal beings that do not rise to the level of Gods. They are lieutenants of Gods, Fey creatures, demonic lords, ancient urges from beyond the planes and many more.',-1)),D=d(()=>s("option",{value:"",selected:""},"Filter By Type",-1)),F=["value"],S=["innerHTML"];function T(e,i,M,b,k,A){return n(),o("div",null,[g,c(s("select",{"onUpdate:modelValue":i[0]||(i[0]=t=>e.divineFilter=t),class:"form-control",onChange:i[1]||(i[1]=(...t)=>e.filterDivines&&e.filterDivines(...t))},[D,(n(!0),o(r,null,a(e.types,t=>(n(),o("option",{value:t,key:t},l(t),9,F))),128))],544),[[v,e.divineFilter]]),(n(!0),o(r,null,a(e.filteredDivines,t=>(n(),o("div",{key:t.id},[s("h3",null,l(t.name),1),s("h4",null,"Alignment: "+l(t.alignment),1),s("h4",null,"Type: "+l(t.type),1),s("h4",null,"Planar Home: "+l(t.home),1),s("div",{innerHTML:t.descr},null,8,S)]))),128))])}var $=_(y,[["render",T],["__scopeId","data-v-7c292518"]]);export{$ as default};
