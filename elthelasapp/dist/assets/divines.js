import{I as u,o as n,e as l,p,K as v,g as s,F as o,k as a,E as c,G as _,t as r}from"./vendor.js";import{u as h,_ as f}from"./index.js";var m={setup(){const e=h(),{divines:i}=u(e);return{statics:e,divines:i}},data(){return{divineFilter:"",types:["Alien","Angel","Fey","Fiend"],filteredDivines:[]}},methods:{filterDivines:function(){this.filteredDivines=this.divines.filter(e=>(console.log(e.type),console.log(this.divineFilter),e.type===this.divineFilter))}},mounted(){this.statics.getAllDivines().then(()=>{this.filteredDivines=this.divines})}};const d=e=>(c("data-v-619259a8"),e=e(),_(),e),y=d(()=>s("h2",null,"Divines",-1)),g=d(()=>s("option",{value:"",selected:""},"Filter By Type",-1)),D=["value"],F=["innerHTML"];function S(e,i,k,I,T,A){return n(),l("div",null,[y,p(s("select",{"onUpdate:modelValue":i[0]||(i[0]=t=>e.divineFilter=t),class:"form-control",onChange:i[1]||(i[1]=(...t)=>e.filterDivines&&e.filterDivines(...t))},[g,(n(!0),l(o,null,a(e.types,t=>(n(),l("option",{value:t,key:t},r(t),9,D))),128))],544),[[v,e.divineFilter]]),(n(!0),l(o,null,a(e.filteredDivines,t=>(n(),l("div",{key:t.id},[s("h3",null,r(t.name),1),s("h4",null,"Alignment: "+r(t.alignment),1),s("h4",null,"Type: "+r(t.type),1),s("h4",null,"Planar Home: "+r(t.home),1),s("div",{innerHTML:t.descr},null,8,F)]))),128))])}var H=f(m,[["render",S],["__scopeId","data-v-619259a8"]]);export{H as default};
