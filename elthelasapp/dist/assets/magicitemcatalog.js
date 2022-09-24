import{u as P,a as A,m as B,_ as T}from"./index.js";import{m as L,i as m,o as b,e as y,j as s,w as i,h as V,F as E,k as U,g as l,E as D,G as F,l as a,t as n,L as h}from"./vendor.js";var N={setup(){const e=P(),o=A(),{magicitems:c,magicscrolls:_,magicwands:k,magicweapons:f,magicarmor:r,magicother:C,magiccommons:I,magicrares:v,magicveryrares:R,magiclegendaries:M}=e;return{userinfo:o,magicitems:c,magicscrolls:_,magicwands:k,magicweapons:f,magicarmor:r,magicother:C,magiccommons:I,magicrares:v,magicveryrares:R,magiclegendaries:M,marked:L}},components:{modal:B},computed:{filteredWands(){return this.magicwands.filter(this.magicitemfilter)},filteredScrolls(){return this.magicscrolls.filter(this.magicitemfilter)},filteredWeapons(){return this.magicweapons.filter(this.magicitemfilter)},filteredArmor(){return this.magicarmor.filter(this.magicitemfilter)},filteredOther(){return this.magicother.filter(this.magicitemfilter)}},data:function(){return{magicitemtables:{fields:[{key:"print",label:"Print",sortable:!1},{key:"Item",label:"Item",sortable:!0},{key:"Attunement",label:"Attunement",sortable:!0},{key:"Rarity",label:"Rarity",sortable:!0},{key:"Cost (gp)",label:"Cost (gp)",sortable:!0},{key:"instock",label:"In Stock",sortable:!0}],filter:"",filterBy:["Item","Type","Attunement","Rarity","Cost (gp)","Effect"],filterRarity:["Common","Uncommon","Rare","Very Rare","Legendary"],filterCost:"",sortBy:null,sortDesc:!1},modalProps:{isActive:!1,title:""},magicItemModal:{Item:"",Rarity:"",instock:"",Effect:"","Cost (gp)":"",Attunement:""},instockonly:!0,toPrint:[],printMode:!1}},methods:{selectForPrint(e){e.print=!e.print,e.print?e._rowVariant="success":e._rowVariant=void 0},printSelected(){this.toPrint=this.magicitems.reduce((e,o)=>(o.print&&e.push(o),e),[]),this.printMode=!0},magicItemInfo(e,o,c){this.magicItemModal=e,this.modalProps.isActive=!0,this.modalProps.title=e.Item},resetMagicItemModal(){this.magicItemModal={Item:"",Rarity:"",instock:"",Effect:"","Cost (gp)":"",Attunement:""}},instockfilter(e){return!(this.instockonly&&e.instock!=="In Stock")},magicitemfilter(e){var o=this.magicitemtables.filterBy,c=this.magicitemtables.filter;if(this.instockfilter(e)){var _=o.some(k=>{for(var f in e)if(k===f&&e[f].toString().toLowerCase().includes(c.toLowerCase())&&(!this.magicitemtables.filterCost||Number(this.magicitemtables.filterCost)>=e["Cost (gp)"])&&this.magicitemtables.filterRarity.includes(e.Rarity))return!0});return!!(!c&&(!this.magicitemtables.filterCost||Number(this.magicitemtables.filterCost))>=e["Cost (gp)"]&&this.magicitemtables.filterRarity.includes(e.Rarity)||_)}return!1}}};const u=e=>(D("data-v-48a09e03"),e=e(),F(),e),$={class:"col-sm-12"},W={key:0},O=u(()=>l("h1",null,"Margo's Mystics Magic Item Catalog",-1)),H=u(()=>l("p",{class:"alert alert-warning"}," Note: The In Stock column is only relevant on game day, and reflects the items that Margo has in stock at her store during game. ",-1)),z=a("Display In Stock Items Only"),j=a("Item"),G=a("Type"),q=a("Cost (gp)"),J=a("Attunement"),K=a("Effect"),Q=a("Rarity"),X=a("Common"),Y=a("Uncommon"),Z=a("Rare"),x=a("Very Rare"),ee=a("Legendary"),te={class:"col-4"},se=a("Maximum Cost "),ie=["disabled"],oe=u(()=>l("strong",null,"Type: ",-1)),le=u(()=>l("strong",null,"Cost (gp): ",-1)),ae=u(()=>l("strong",null,"Attunement: ",-1)),re=u(()=>l("strong",null,"Rarity: ",-1)),ne=["innerHTML"],me=["onClick"],de=["onClick"],ce=["onClick"],ue=["onClick"],fe=["onClick"],pe={key:1,class:"col-sm-12"},ge={style:{"font-size":"3em"}},be=["innerHTML"];function ye(e,o,c,_,k,f){const r=m("b-form-checkbox"),C=m("b-form-checkbox-group"),I=m("b-form-input"),v=m("b-col"),R=m("b-input-group"),M=m("b-row"),w=m("modal"),p=m("b-table"),g=m("b-tab"),S=m("b-tabs");return b(),y("div",$,[e.printMode?V("",!0):(b(),y("div",W,[O,H,s(M,null,{default:i(()=>[s(v,{md:"8"},{default:i(()=>[s(r,{label:"In Stock Only",modelValue:e.instockonly,"onUpdate:modelValue":o[0]||(o[0]=t=>e.instockonly=t)},{default:i(()=>[z]),_:1},8,["modelValue"]),s(C,{modelValue:e.magicitemtables.filterBy,"onUpdate:modelValue":o[1]||(o[1]=t=>e.magicitemtables.filterBy=t)},{default:i(()=>[s(r,{value:"Item"},{default:i(()=>[j]),_:1}),s(r,{value:"Type"},{default:i(()=>[G]),_:1}),s(r,{value:"Cost (gp)"},{default:i(()=>[q]),_:1}),s(r,{value:"Attunement"},{default:i(()=>[J]),_:1}),s(r,{value:"Effect"},{default:i(()=>[K]),_:1}),s(r,{value:"Rarity"},{default:i(()=>[Q]),_:1})]),_:1},8,["modelValue"]),s(C,{modelValue:e.magicitemtables.filterRarity,"onUpdate:modelValue":o[2]||(o[2]=t=>e.magicitemtables.filterRarity=t)},{default:i(()=>[s(r,{value:"Common"},{default:i(()=>[X]),_:1}),s(r,{value:"Uncommon"},{default:i(()=>[Y]),_:1}),s(r,{value:"Rare"},{default:i(()=>[Z]),_:1}),s(r,{value:"Very Rare"},{default:i(()=>[x]),_:1}),s(r,{value:"Legendary"},{default:i(()=>[ee]),_:1})]),_:1},8,["modelValue"]),l("label",te,[se,s(I,{label:"Maximum Cost",type:"number",modelValue:e.magicitemtables.filterCost,"onUpdate:modelValue":o[3]||(o[3]=t=>e.magicitemtables.filterCost=t)},null,8,["modelValue"])]),l("button",{class:"btn btn-primary col-2",onClick:o[4]||(o[4]=t=>e.printSelected()),style:{"margin-top":"-5px"}},"Print Selected")]),_:1}),s(v,{md:"4",class:"my-1"},{default:i(()=>[s(R,null,{default:i(()=>[s(I,{modelValue:e.magicitemtables.filter,"onUpdate:modelValue":o[5]||(o[5]=t=>e.magicitemtables.filter=t),placeholder:"Type to Search"},null,8,["modelValue"]),l("button",{class:"btn btn-primary",disabled:!e.magicitemtables.filter,onClick:o[6]||(o[6]=t=>e.magicitemtables.filter="")},"Clear",8,ie)]),_:1})]),_:1})]),_:1}),s(w,{id:"magicitemmodal",modalProps:e.modalProps},{default:i(()=>[l("p",null,[oe,a(n(e.magicItemModal.Type),1)]),l("p",null,[le,a(n(e.magicItemModal["Cost (gp)"]),1)]),l("p",null,[ae,a(n(e.magicItemModal.Attunement),1)]),l("p",null,[re,a(n(e.magicItemModal.Rarity),1)]),l("p",null,[l("strong",null,n(e.magicItemModal.instock),1)]),l("div",{innerHTML:e.marked.parse(e.magicItemModal.Effect)},null,8,ne)]),_:1},8,["modalProps"]),s(S,{id:"magicitemcatalog"},{default:i(()=>[s(g,{title:"Scrolls"},{default:i(()=>[s(p,{"show-empty":"",onRowClicked:e.selectForPrint,striped:!0,bordered:!1,responsive:!0,stacked:"sm",items:e.filteredScrolls,fields:e.magicitemtables.fields,"sort-by":e.magicitemtables.sortBy,"sort-desc":e.magicitemtables.sortDesc},{"cell(Item)":i(t=>[l("a",{href:"#",onClick:h(d=>e.magicItemInfo(t.item,t.index,d.target),["stop"])},n(t.value),9,me)]),_:1},8,["onRowClicked","items","fields","sort-by","sort-desc"])]),_:1}),s(g,{title:"Wands"},{default:i(()=>[s(p,{"show-empty":"",onRowClicked:e.selectForPrint,striped:!0,bordered:!1,responsive:!0,stacked:"sm",items:e.filteredWands,fields:e.magicitemtables.fields,"sort-by":e.magicitemtables.sortBy,"sort-desc":e.magicitemtables.sortDesc},{"cell(Item)":i(t=>[l("a",{href:"#",onClick:h(d=>e.magicItemInfo(t.item,t.index,d.target),["stop"])},n(t.value),9,de)]),_:1},8,["onRowClicked","items","fields","sort-by","sort-desc"])]),_:1}),s(g,{title:"Weapons"},{default:i(()=>[s(p,{"show-empty":"",onRowClicked:e.selectForPrint,striped:!0,bordered:!1,responsive:!0,stacked:"sm",items:e.filteredWeapons,fields:e.magicitemtables.fields,"sort-by":e.magicitemtables.sortBy,"sort-desc":e.magicitemtables.sortDesc},{"cell(Item)":i(t=>[l("a",{href:"#",onClick:h(d=>e.magicItemInfo(t.item,t.index,d.target),["stop"])},n(t.value),9,ce)]),_:1},8,["onRowClicked","items","fields","sort-by","sort-desc"])]),_:1}),s(g,{title:"Armor"},{default:i(()=>[s(p,{"show-empty":"",onRowClicked:e.selectForPrint,striped:!0,bordered:!1,responsive:!0,stacked:"sm",items:e.filteredArmor,fields:e.magicitemtables.fields,"sort-by":e.magicitemtables.sortBy,"sort-desc":e.magicitemtables.sortDesc},{"cell(Item)":i(t=>[l("a",{href:"#",onClick:h(d=>e.magicItemInfo(t.item,t.index,d.target),["stop"])},n(t.value),9,ue)]),_:1},8,["onRowClicked","items","fields","sort-by","sort-desc"])]),_:1}),s(g,{title:"Other"},{default:i(()=>[s(p,{"show-empty":"",onRowClicked:e.selectForPrint,striped:!0,bordered:!1,responsive:!0,stacked:"sm",items:e.filteredOther,fields:e.magicitemtables.fields,"sort-by":e.magicitemtables.sortBy,"sort-desc":e.magicitemtables.sortDesc},{"cell(Item)":i(t=>[l("a",{href:"#",onClick:h(d=>e.magicItemInfo(t.item,t.index,d.target),["stop"])},n(t.value),9,fe)]),_:1},8,["onRowClicked","items","fields","sort-by","sort-desc"])]),_:1})]),_:1})])),e.printMode?(b(),y("div",pe,[(b(!0),y(E,null,U(e.toPrint,t=>(b(),y("div",{key:t.Item,style:{"margin-bottom":"50px","page-break-inside":"avoid"}},[l("h4",ge,n(t.Item)+" ("+n(t.Type)+", "+n(t.Rarity)+")",1),l("div",{innerHTML:e.marked.parse(t.Effect),style:{"font-size":"1.5em"}},null,8,be)]))),128)),l("button",{class:"btn btn-success print-hide",onClick:o[7]||(o[7]=t=>{e.toPrint=[],e.printMode=!1})},"Exit")])):V("",!0)])}var ke=T(N,[["render",ye],["__scopeId","data-v-48a09e03"]]);export{ke as default};
