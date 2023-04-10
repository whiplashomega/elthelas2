import{B as V,u as D,j as S,m as _,_ as B,g as c,o as m,c as f,h as u,w as v,a as e,G as b,l as p,v as y,C as h,A as M,e as d,F as A,r as U,t as i,d as $,p as E,q as P,b as g}from"./index.js";const N={setup(){V({title:"Magic"});const t=D(),l=S(),{spellsv2:a}=t;return{userinfo:l,spells:a,marked:_}},computed:{filteredSpells(){var t=this.spelltable.filterValue.split(" ");let l=this.spells.filter(a=>{let r=!0;return t.forEach(n=>{a.description.toLowerCase().includes(n.toLowerCase())||a.title.toLowerCase().includes(n.toLowerCase())||a.level.toLowerCase().includes(n.toLowerCase())||a.school.toLowerCase().includes(n.toLowerCase())||a.castingTime.toLowerCase().includes(n.toLowerCase())||a.tagsText.toLowerCase().includes(n.toLowerCase())||a.components.toLowerCase().includes(n.toLowerCase())||(r=!1)}),r});return l=l.filter(a=>a.title.toLowerCase().includes(this.spelltable.titleFilter.toLowerCase())||this.spelltable.titleFilter===""),l=l.filter(a=>a.tags.indexOf(this.spelltable.classFilter)!==-1||this.spelltable.classFilter==="all"),l=l.filter(a=>a.level===this.spelltable.levelFilter||this.spelltable.levelFilter==="all"),l=l.filter(a=>a.school.toLowerCase()===this.spelltable.schoolFilter||this.spelltable.schoolFilter==="all"),l=l.filter(a=>a.castingTime.toLowerCase().includes(this.spelltable.timeFilter)||this.spelltable.timeFilter==="all"),l=l.filter(a=>{let r=a.duration.toLowerCase().includes(this.spelltable.durationFilter)||this.spelltable.durationFilter==="all",n=!a.duration.toLowerCase().includes("concentration")||!this.spelltable.concFilter;return r&&n}),l=l.filter(a=>{let r=this.spelltable.tagsFilter.split(" "),n=!0;return r.forEach(C=>{a.tagsText.includes(C)||(n=!1)}),n}).sort((a,r)=>{let n=this.spelltable.sortBy;return a[n]>r[n]&!this.spelltable.sortDesc||a[n]<r[n]&this.spelltable.sortDesc?1:-1}),l}},data:function(){return{spellModalProps:{isActive:!1,title:""},spelltable:{fields:[{key:"title",label:"Title",sortable:!0},{key:"level",label:"Level",sortable:!0},{key:"school",label:"School",sortable:!0},{key:"castingTime",label:"Casting Time",sortable:!0},{key:"duration",label:"Duration",sortable:!0},{key:"tagsText",label:"Tags",sortable:!0}],classFilter:"all",levelFilter:"all",titleFilter:"",schoolFilter:"all",timeFilter:"all",durationFilter:"all",concFilter:!1,tagsFilter:"",filterValue:"",sortBy:"title",sortDesc:!1,modalInfo:{title:"",description:"",content:{title:"",level:"",school:"",duration:"",description:"",castingTime:"",tags:[],tagsText:""}}}}},methods:{info(t){this.spelltable.modalInfo.title=t.title,this.spelltable.modalInfo.content=t,this.spelltable.modalInfo.description=_.parse(this.spelltable.modalInfo.content.description),this.spellModalProps.isActive=!0,this.spellModalProps.title=t.title},resetSpellModal(){this.spelltable.modalInfo.title="",this.spelltable.modalInfo.content={title:"",level:"",school:"",duration:"",description:"",castingTime:"",tags:[],tagsText:""}}}};const s=t=>(E("data-v-0deb81aa"),t=t(),P(),t),j=s(()=>e("h3",null,"Spells",-1)),R=s(()=>e("option",{value:"all"},"All",-1)),z=s(()=>e("option",{value:"archivist"},"Archivist",-1)),H=s(()=>e("option",{value:"artificer"},"Artificer",-1)),W=s(()=>e("option",{value:"bard"},"Bard",-1)),q=s(()=>e("option",{value:"cleric"},"Cleric",-1)),G=s(()=>e("option",{value:"druid"},"Druid",-1)),K=s(()=>e("option",{value:"eldritchknight"},"Fighter (Eldritch Knight)",-1)),O=s(()=>e("option",{value:"paladin"},"Paladin",-1)),J=s(()=>e("option",{value:"ranger"},"Ranger",-1)),Q=s(()=>e("option",{value:"sorcerer"},"Sorcerer",-1)),X=s(()=>e("option",{value:"warlock"},"Warlock",-1)),Y=s(()=>e("option",{value:"wizard"},"Wizard",-1)),Z=[R,z,H,W,q,G,K,O,J,Q,X,Y],x=["disabled"],ee={class:"table table-striped"},te=s(()=>e("th",null,"Tags",-1)),le=g('<option value="all" selected data-v-0deb81aa>All</option><option value="cantrip" data-v-0deb81aa>Cantrips</option><option value="1" data-v-0deb81aa>1</option><option value="2" data-v-0deb81aa>2</option><option value="3" data-v-0deb81aa>3</option><option value="4" data-v-0deb81aa>4</option><option value="5" data-v-0deb81aa>5</option><option value="6" data-v-0deb81aa>6</option><option value="7" data-v-0deb81aa>7</option><option value="8" data-v-0deb81aa>8</option><option value="9" data-v-0deb81aa>9</option>',11),oe=[le],ae=g('<option value="all" data-v-0deb81aa>All</option><option value="abjuration" data-v-0deb81aa>Abjuration</option><option value="conjuration" data-v-0deb81aa>Conjuration</option><option value="divination" data-v-0deb81aa>Divination</option><option value="enchantment" data-v-0deb81aa>Enchantment</option><option value="evocation" data-v-0deb81aa>Evocation</option><option value="illusion" data-v-0deb81aa>Illusion</option><option value="necromancy" data-v-0deb81aa>Necromancy</option><option value="transmutation" data-v-0deb81aa>Transmutation</option>',9),se=[ae],ne=g('<option value="all" data-v-0deb81aa>All</option><option value="1 action" data-v-0deb81aa>1 action</option><option value="1 bonus action" data-v-0deb81aa>1 bonus action</option><option value="1 reaction" data-v-0deb81aa>1 reaction</option><option value="1 minute" data-v-0deb81aa>1 minute</option><option value="10 minutes" data-v-0deb81aa>10 minutes</option><option value="1 hour" data-v-0deb81aa>1 hour</option><option value="8 hours" data-v-0deb81aa>8 hours</option><option value="24 hours" data-v-0deb81aa>24 hours</option>',9),ie=[ne],re=g('<option value="all" data-v-0deb81aa>All</option><option value="instantaneous" data-v-0deb81aa>Instantaneous</option><option value="1 round" data-v-0deb81aa>1 round</option><option value="1 minute" data-v-0deb81aa>1 minute</option><option value="10 minutes" data-v-0deb81aa>10 minutes</option><option value="1 hour" data-v-0deb81aa>1 hour</option><option value="6 hours" data-v-0deb81aa>6 hours</option><option value="8 hours" data-v-0deb81aa>8 hours</option><option value="24 hours" data-v-0deb81aa>24 hours</option><option value="10 days" data-v-0deb81aa>10 days</option><option value="until dispelled" data-v-0deb81aa>until dispelled</option>',11),de=[re],pe={class:"spelltable"},ue=s(()=>e("tr",{style:{"margin-top":"100px"}},[e("td",{colspan:"6"})],-1)),be=["onClick"],ce={key:0},ve=s(()=>e("strong",null,"Casting Time: ",-1)),he=s(()=>e("strong",null,"Range: ",-1)),me=s(()=>e("strong",null,"Components: ",-1)),fe=s(()=>e("strong",null,"Duration: ",-1)),ge=s(()=>e("strong",null,"Tags: ",-1)),Ce=["innerHTML"];function Fe(t,l,a,r,n,C){const F=c("b-col"),w=c("b-form-input"),T=c("b-input-group"),k=c("b-row"),L=c("modal");return m(),f("div",null,[j,u(k,null,{default:v(()=>[u(F,{md:"8"},{default:v(()=>[d(" Filter by Class "),p(e("select",{"onUpdate:modelValue":l[0]||(l[0]=o=>t.spelltable.classFilter=o),class:"form-control"},Z,512),[[h,t.spelltable.classFilter]])]),_:1}),u(F,{md:"4",class:"my-1"},{default:v(()=>[d(" Search "),u(T,null,{default:v(()=>[u(w,{modelValue:t.spelltable.filterValue,"onUpdate:modelValue":l[1]||(l[1]=o=>t.spelltable.filterValue=o),placeholder:"Type to Search"},null,8,["modelValue"]),e("button",{class:"btn btn-primary",disabled:!t.spelltable.filterValue,onClick:l[2]||(l[2]=o=>t.filter="")},"Clear",8,x)]),_:1})]),_:1})]),_:1}),e("table",ee,[e("thead",null,[e("tr",null,[e("th",null,[e("a",{href:"#",onClick:l[3]||(l[3]=b(o=>{t.spelltable.sortBy="title",t.spelltable.sortDesc=!t.spelltable.sortDesc},["stop"]))},"Title")]),e("th",null,[e("a",{href:"#",onClick:l[4]||(l[4]=b(o=>{t.spelltable.sortBy="level",t.spelltable.sortDesc=!t.spelltable.sortDesc},["stop"]))},"Level")]),e("th",null,[e("a",{href:"#",onClick:l[5]||(l[5]=b(o=>{t.spelltable.sortBy="school",t.spelltable.sortDesc=!t.spelltable.sortDesc},["stop"]))},"School")]),e("th",null,[e("a",{href:"#",onClick:l[6]||(l[6]=b(o=>{t.spelltable.sortBy="castingTime",t.spelltable.sortDesc=!t.spelltable.sortDesc},["stop"]))},"Casting Time")]),e("th",null,[e("a",{href:"#",onClick:l[7]||(l[7]=b(o=>{t.spelltable.sortBy="duration",t.spelltable.sortDesc=!t.spelltable.sortDesc},["stop"]))},"Duration")]),te]),e("tr",null,[e("th",null,[p(e("input",{type:"text","onUpdate:modelValue":l[8]||(l[8]=o=>t.spelltable.titleFilter=o),class:"form-control"},null,512),[[y,t.spelltable.titleFilter]])]),e("th",null,[p(e("select",{"onUpdate:modelValue":l[9]||(l[9]=o=>t.spelltable.levelFilter=o),class:"form-control"},oe,512),[[h,t.spelltable.levelFilter]])]),e("th",null,[p(e("select",{"onUpdate:modelValue":l[10]||(l[10]=o=>t.spelltable.schoolFilter=o),class:"form-control"},se,512),[[h,t.spelltable.schoolFilter]])]),e("th",null,[p(e("select",{"onUpdate:modelValue":l[11]||(l[11]=o=>t.spelltable.timeFilter=o),class:"form-control"},ie,512),[[h,t.spelltable.timeFilter]])]),e("th",null,[p(e("input",{type:"checkbox","onUpdate:modelValue":l[12]||(l[12]=o=>t.spelltable.concFilter=o)},null,512),[[M,t.spelltable.concFilter]]),d(" Exclude Concentration "),p(e("select",{"onUpdate:modelValue":l[13]||(l[13]=o=>t.spelltable.durationFilter=o),class:"form-control"},de,512),[[h,t.spelltable.durationFilter]])]),e("th",null,[p(e("input",{type:"text","onUpdate:modelValue":l[14]||(l[14]=o=>t.spelltable.tagsFilter=o),class:"form-control"},null,512),[[y,t.spelltable.tagsFilter]])])])]),e("tbody",pe,[ue,(m(!0),f(A,null,U(t.filteredSpells,o=>(m(),f("tr",{key:o.title},[e("td",null,[e("a",{href:"#",onClick:b(I=>t.info(o,0,I.target),["stop"])},i(o.title),9,be)]),e("td",null,i(o.level),1),e("td",null,i(o.school),1),e("td",null,i(o.castingTime),1),e("td",null,i(o.duration),1),e("td",null,i(o.tagsText),1)]))),128))])]),u(L,{id:"spellmodal",modalProps:t.spellModalProps},{default:v(()=>[e("h4",null,[e("strong",null,i(t.spelltable.modalInfo.content.school)+" "+i(t.spelltable.modalInfo.content.level.replace("level","level ")),1),t.spelltable.modalInfo.content.ritual?(m(),f("span",ce," Ritual")):$("",!0),d(" ("+i(t.spelltable.modalInfo.content.source)+") ",1)]),e("p",null,[ve,d(i(t.spelltable.modalInfo.content.castingTime),1)]),e("p",null,[he,d(i(t.spelltable.modalInfo.content.range),1)]),e("p",null,[me,d(i(t.spelltable.modalInfo.content.components),1)]),e("p",null,[fe,d(i(t.spelltable.modalInfo.content.duration),1)]),e("p",null,[ge,d(" "+i(t.spelltable.modalInfo.content.tagText),1)]),e("div",{innerHTML:t.marked.parse(t.spelltable.modalInfo.description)},null,8,Ce)]),_:1},8,["modalProps"])])}const ye=B(N,[["render",Fe],["__scopeId","data-v-0deb81aa"]]);export{ye as default};
