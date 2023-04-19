import{B as I,u as V,j as D,s as S,m as C,k as B,_ as A,g as h,o as f,c as b,a as t,e as r,l as p,C as v,h as m,w as F,G as u,v as y,A as M,F as U,r as _,t as n,d as $,p as E,q as P,b as c}from"./index.js";const N={setup(){I({title:"Magic"});const e=V();e.getAllSpellsV2();const l=D(),{spellsv2:a}=S(e);return{userinfo:l,spells:a,marked:C}},components:{modal:B},computed:{filteredSpells(){var e=this.spelltable.filterValue.split(" ");let l=this.spells.filter(a=>{let i=!0;return e.forEach(s=>{a.description.toLowerCase().includes(s.toLowerCase())||a.title.toLowerCase().includes(s.toLowerCase())||a.level.toLowerCase().includes(s.toLowerCase())||a.school.toLowerCase().includes(s.toLowerCase())||a.castingTime.toLowerCase().includes(s.toLowerCase())||a.tagsText.toLowerCase().includes(s.toLowerCase())||a.components.toLowerCase().includes(s.toLowerCase())||(i=!1)}),i});return l=l.filter(a=>a.title.toLowerCase().includes(this.spelltable.titleFilter.toLowerCase())||this.spelltable.titleFilter===""),l=l.filter(a=>a.tags.indexOf(this.spelltable.classFilter)!==-1||this.spelltable.classFilter==="all"),l=l.filter(a=>a.level===this.spelltable.levelFilter||this.spelltable.levelFilter==="all"),l=l.filter(a=>a.school.toLowerCase()===this.spelltable.schoolFilter||this.spelltable.schoolFilter==="all"),l=l.filter(a=>a.castingTime.toLowerCase().includes(this.spelltable.timeFilter)||this.spelltable.timeFilter==="all"),l=l.filter(a=>{let i=a.duration.toLowerCase().includes(this.spelltable.durationFilter)||this.spelltable.durationFilter==="all",s=!a.duration.toLowerCase().includes("concentration")||!this.spelltable.concFilter;return i&&s}),l=l.filter(a=>{let i=this.spelltable.tagsFilter.split(" "),s=!0;return i.forEach(g=>{a.tagsText.includes(g)||(s=!1)}),s}).sort((a,i)=>{let s=this.spelltable.sortBy;return a[s]>i[s]&!this.spelltable.sortDesc||a[s]<i[s]&this.spelltable.sortDesc?1:-1}),l}},data:function(){return{spellModalProps:{isActive:!1,title:""},spelltable:{fields:[{key:"title",label:"Title",sortable:!0},{key:"level",label:"Level",sortable:!0},{key:"school",label:"School",sortable:!0},{key:"castingTime",label:"Casting Time",sortable:!0},{key:"duration",label:"Duration",sortable:!0},{key:"tagsText",label:"Tags",sortable:!0}],classFilter:"all",levelFilter:"all",titleFilter:"",schoolFilter:"all",timeFilter:"all",durationFilter:"all",concFilter:!1,tagsFilter:"",filterValue:"",sortBy:"title",sortDesc:!1,modalInfo:{title:"",description:"",content:{title:"",level:"",school:"",duration:"",description:"",castingTime:"",tags:[],tagsText:""}}}}},methods:{info(e){this.spelltable.modalInfo.title=e.title,this.spelltable.modalInfo.content=e,this.spelltable.modalInfo.description=C.parse(this.spelltable.modalInfo.content.description),this.spellModalProps.isActive=!0,this.spellModalProps.title=e.title},resetSpellModal(){this.spelltable.modalInfo.title="",this.spelltable.modalInfo.content={title:"",level:"",school:"",duration:"",description:"",castingTime:"",tags:[],tagsText:""}}}};const d=e=>(E("data-v-58fe2724"),e=e(),P(),e),j=d(()=>t("h3",null,"Spells",-1)),R={class:"row"},z={class:"col-8"},H=c('<option value="all" data-v-58fe2724>All</option><option value="artificer" data-v-58fe2724>Artificer</option><option value="bard" data-v-58fe2724>Bard</option><option value="cleric" data-v-58fe2724>Cleric</option><option value="druid" data-v-58fe2724>Druid</option><option value="eldritchknight" data-v-58fe2724>Fighter (Eldritch Knight)</option><option value="paladin" data-v-58fe2724>Paladin</option><option value="ranger" data-v-58fe2724>Ranger</option><option value="arcanetrickster" data-v-58fe2724>Rogue (Arcane Trickster)</option><option value="sorcerer" data-v-58fe2724>Sorcerer</option><option value="warlock" data-v-58fe2724>Warlock</option><option value="wizard" data-v-58fe2724>Wizard</option>',12),W=[H],q={class:"col-4"},G=["disabled"],K={class:"table table-striped"},O=d(()=>t("th",null,"Tags",-1)),J=c('<option value="all" selected data-v-58fe2724>All</option><option value="cantrip" data-v-58fe2724>Cantrips</option><option value="1" data-v-58fe2724>1</option><option value="2" data-v-58fe2724>2</option><option value="3" data-v-58fe2724>3</option><option value="4" data-v-58fe2724>4</option><option value="5" data-v-58fe2724>5</option><option value="6" data-v-58fe2724>6</option><option value="7" data-v-58fe2724>7</option><option value="8" data-v-58fe2724>8</option><option value="9" data-v-58fe2724>9</option>',11),Q=[J],X=c('<option value="all" data-v-58fe2724>All</option><option value="abjuration" data-v-58fe2724>Abjuration</option><option value="conjuration" data-v-58fe2724>Conjuration</option><option value="divination" data-v-58fe2724>Divination</option><option value="enchantment" data-v-58fe2724>Enchantment</option><option value="evocation" data-v-58fe2724>Evocation</option><option value="illusion" data-v-58fe2724>Illusion</option><option value="necromancy" data-v-58fe2724>Necromancy</option><option value="transmutation" data-v-58fe2724>Transmutation</option>',9),Y=[X],Z=c('<option value="all" data-v-58fe2724>All</option><option value="1 action" data-v-58fe2724>1 action</option><option value="1 bonus action" data-v-58fe2724>1 bonus action</option><option value="1 reaction" data-v-58fe2724>1 reaction</option><option value="1 minute" data-v-58fe2724>1 minute</option><option value="10 minutes" data-v-58fe2724>10 minutes</option><option value="1 hour" data-v-58fe2724>1 hour</option><option value="8 hours" data-v-58fe2724>8 hours</option><option value="24 hours" data-v-58fe2724>24 hours</option>',9),x=[Z],ee=c('<option value="all" data-v-58fe2724>All</option><option value="instantaneous" data-v-58fe2724>Instantaneous</option><option value="1 round" data-v-58fe2724>1 round</option><option value="1 minute" data-v-58fe2724>1 minute</option><option value="10 minutes" data-v-58fe2724>10 minutes</option><option value="1 hour" data-v-58fe2724>1 hour</option><option value="6 hours" data-v-58fe2724>6 hours</option><option value="8 hours" data-v-58fe2724>8 hours</option><option value="24 hours" data-v-58fe2724>24 hours</option><option value="10 days" data-v-58fe2724>10 days</option><option value="until dispelled" data-v-58fe2724>until dispelled</option>',11),te=[ee],le={class:"spelltable"},oe=d(()=>t("tr",{style:{"margin-top":"100px"}},[t("td",{colspan:"6"})],-1)),ae=["onClick"],se={key:0},ne=d(()=>t("strong",null,"Casting Time: ",-1)),ie=d(()=>t("strong",null,"Range: ",-1)),re=d(()=>t("strong",null,"Components: ",-1)),pe=d(()=>t("strong",null,"Duration: ",-1)),de=d(()=>t("strong",null,"Tags: ",-1)),ue=["innerHTML"];function ve(e,l,a,i,s,g){const T=h("b-form-input"),k=h("b-input-group"),w=h("modal");return f(),b("div",null,[j,t("div",R,[t("div",z,[r(" Filter by Class "),p(t("select",{"onUpdate:modelValue":l[0]||(l[0]=o=>e.spelltable.classFilter=o),class:"form-control"},W,512),[[v,e.spelltable.classFilter]])]),t("div",q,[r(" Search "),m(k,null,{default:F(()=>[m(T,{modelValue:e.spelltable.filterValue,"onUpdate:modelValue":l[1]||(l[1]=o=>e.spelltable.filterValue=o),placeholder:"Type to Search"},null,8,["modelValue"]),t("button",{class:"btn btn-primary",disabled:!e.spelltable.filterValue,onClick:l[2]||(l[2]=o=>e.filter="")},"Clear",8,G)]),_:1})])]),t("table",K,[t("thead",null,[t("tr",null,[t("th",null,[t("a",{href:"#",onClick:l[3]||(l[3]=u(o=>{e.spelltable.sortBy="title",e.spelltable.sortDesc=!e.spelltable.sortDesc},["stop"]))},"Title")]),t("th",null,[t("a",{href:"#",onClick:l[4]||(l[4]=u(o=>{e.spelltable.sortBy="level",e.spelltable.sortDesc=!e.spelltable.sortDesc},["stop"]))},"Level")]),t("th",null,[t("a",{href:"#",onClick:l[5]||(l[5]=u(o=>{e.spelltable.sortBy="school",e.spelltable.sortDesc=!e.spelltable.sortDesc},["stop"]))},"School")]),t("th",null,[t("a",{href:"#",onClick:l[6]||(l[6]=u(o=>{e.spelltable.sortBy="castingTime",e.spelltable.sortDesc=!e.spelltable.sortDesc},["stop"]))},"Casting Time")]),t("th",null,[t("a",{href:"#",onClick:l[7]||(l[7]=u(o=>{e.spelltable.sortBy="duration",e.spelltable.sortDesc=!e.spelltable.sortDesc},["stop"]))},"Duration")]),O]),t("tr",null,[t("th",null,[p(t("input",{type:"text","onUpdate:modelValue":l[8]||(l[8]=o=>e.spelltable.titleFilter=o),class:"form-control"},null,512),[[y,e.spelltable.titleFilter]])]),t("th",null,[p(t("select",{"onUpdate:modelValue":l[9]||(l[9]=o=>e.spelltable.levelFilter=o),class:"form-control"},Q,512),[[v,e.spelltable.levelFilter]])]),t("th",null,[p(t("select",{"onUpdate:modelValue":l[10]||(l[10]=o=>e.spelltable.schoolFilter=o),class:"form-control"},Y,512),[[v,e.spelltable.schoolFilter]])]),t("th",null,[p(t("select",{"onUpdate:modelValue":l[11]||(l[11]=o=>e.spelltable.timeFilter=o),class:"form-control"},x,512),[[v,e.spelltable.timeFilter]])]),t("th",null,[p(t("input",{type:"checkbox","onUpdate:modelValue":l[12]||(l[12]=o=>e.spelltable.concFilter=o)},null,512),[[M,e.spelltable.concFilter]]),r(" Exclude Concentration "),p(t("select",{"onUpdate:modelValue":l[13]||(l[13]=o=>e.spelltable.durationFilter=o),class:"form-control"},te,512),[[v,e.spelltable.durationFilter]])]),t("th",null,[p(t("input",{type:"text","onUpdate:modelValue":l[14]||(l[14]=o=>e.spelltable.tagsFilter=o),class:"form-control"},null,512),[[y,e.spelltable.tagsFilter]])])])]),t("tbody",le,[oe,(f(!0),b(U,null,_(e.filteredSpells,o=>(f(),b("tr",{key:o.title},[t("td",null,[t("a",{href:"#",onClick:u(L=>e.info(o,0,L.target),["stop"])},n(o.title),9,ae)]),t("td",null,n(o.level),1),t("td",null,n(o.school),1),t("td",null,n(o.castingTime),1),t("td",null,n(o.duration),1),t("td",null,n(o.tagsText),1)]))),128))])]),m(w,{id:"spellmodal",modalProps:e.spellModalProps},{default:F(()=>[t("h4",null,[t("strong",null,n(e.spelltable.modalInfo.content.school)+" "+n(e.spelltable.modalInfo.content.level.replace("level","level ")),1),e.spelltable.modalInfo.content.ritual?(f(),b("span",se," Ritual")):$("",!0),r(" ("+n(e.spelltable.modalInfo.content.source)+") ",1)]),t("p",null,[ne,r(n(e.spelltable.modalInfo.content.castingTime),1)]),t("p",null,[ie,r(n(e.spelltable.modalInfo.content.range),1)]),t("p",null,[re,r(n(e.spelltable.modalInfo.content.components),1)]),t("p",null,[pe,r(n(e.spelltable.modalInfo.content.duration),1)]),t("p",null,[de,r(" "+n(e.spelltable.modalInfo.content.tagText),1)]),t("div",{innerHTML:e.marked.parse(e.spelltable.modalInfo.description)},null,8,ue)]),_:1},8,["modalProps"])])}const fe=A(N,[["render",ve],["__scopeId","data-v-58fe2724"]]);export{fe as default};
