import{u,_ as p,o as n,c as l,l as v,A as c,e as i,F as o,r as a,p as _,d as h,t as r}from"./index.js";var f={setup(){const e=u(),{divines:s}=e;return{divines:s}},data(){return{divineFilter:"",types:["Alien","Angel","Fey","Fiend"],filteredDivines:[]}},methods:{filterDivines:function(){this.filteredDivines=this.divines.filter(e=>(console.log(e.type),console.log(this.divineFilter),e.type===this.divineFilter))}},mounted(){this.statics.getAllDivines().then(()=>{this.filteredDivines=this.divines})}};const d=e=>(_("data-v-619259a8"),e=e(),h(),e),m=d(()=>i("h2",null,"Divines",-1)),y=d(()=>i("option",{value:"",selected:""},"Filter By Type",-1)),D=["value"],g=["innerHTML"];function F(e,s,S,A,k,B){return n(),l("div",null,[m,v(i("select",{"onUpdate:modelValue":s[0]||(s[0]=t=>e.divineFilter=t),class:"form-control",onChange:s[1]||(s[1]=(...t)=>e.filterDivines&&e.filterDivines(...t))},[y,(n(!0),l(o,null,a(e.types,t=>(n(),l("option",{value:t,key:t},r(t),9,D))),128))],544),[[c,e.divineFilter]]),(n(!0),l(o,null,a(e.filteredDivines,t=>(n(),l("div",{key:t.id},[i("h3",null,r(t.name),1),i("h4",null,"Alignment: "+r(t.alignment),1),i("h4",null,"Type: "+r(t.type),1),i("h4",null,"Planar Home: "+r(t.home),1),i("div",{innerHTML:t.descr},null,8,g)]))),128))])}var T=p(f,[["render",F],["__scopeId","data-v-619259a8"]]);export{T as default};
