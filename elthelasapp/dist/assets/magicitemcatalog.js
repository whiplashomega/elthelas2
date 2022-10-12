import{u as P,a as A,m as B,_ as T}from"./index.js";import{u as L,m as D,j as d,o as y,e as h,k as s,w as i,h as V,F as E,p as F,g as o,I as U,J as W,l as a,t as n,N as p}from"./vendor.js";var N={setup(){const e=P(),l=A(),{magicitems:c,magicscrolls:k,magicwands:C,magicweapons:b,magichomebrewweapons:r,magicarmor:I,magicother:v,magiccommons:_,magicrares:R,magicveryrares:M,magiclegendaries:w}=e;return L({title:"Magic Item Catalog"}),{userinfo:l,magicitems:c,magicscrolls:k,magicwands:C,magicweapons:b,magichomebrewweapons:r,magicarmor:I,magicother:v,magiccommons:_,magicrares:R,magicveryrares:M,magiclegendaries:w,marked:D}},components:{modal:B},computed:{filteredWands(){return this.magicwands.filter(this.magicitemfilter)},filteredScrolls(){return this.magicscrolls.filter(this.magicitemfilter)},filteredWeapons(){return this.magicweapons.filter(this.magicitemfilter)},filteredAdvWeapons(){return this.magichomebrewweapons.filter(this.magicitemfilter)},filteredArmor(){return this.magicarmor.filter(this.magicitemfilter)},filteredOther(){return this.magicother.filter(this.magicitemfilter)}},data:function(){return{magicitemtables:{fields:[{key:"print",label:"Print",sortable:!1},{key:"Item",label:"Item",sortable:!0},{key:"Attunement",label:"Attunement",sortable:!0},{key:"Rarity",label:"Rarity",sortable:!0},{key:"Cost (gp)",label:"Cost (gp)",sortable:!0},{key:"instock",label:"In Stock",sortable:!0}],filter:"",filterBy:["Item","Type","Attunement","Rarity","Cost (gp)","Effect"],filterRarity:["Common","Uncommon","Rare","Very Rare","Legendary"],filterCost:"",sortBy:null,sortDesc:!1},modalProps:{isActive:!1,title:""},magicItemModal:{Item:"",Rarity:"",instock:"",Effect:"","Cost (gp)":"",Attunement:""},instockonly:!0,toPrint:[],printMode:!1}},methods:{selectForPrint(e){e.print=!e.print,e.print?e._rowVariant="success":e._rowVariant=void 0},printSelected(){this.toPrint=this.magicitems.reduce((e,l)=>(l.print&&e.push(l),e),[]),this.printMode=!0},magicItemInfo(e,l,c){this.magicItemModal=e,this.modalProps.isActive=!0,this.modalProps.title=e.Item},resetMagicItemModal(){this.magicItemModal={Item:"",Rarity:"",instock:"",Effect:"","Cost (gp)":"",Attunement:""}},instockfilter(e){return!(this.instockonly&&e.instock!=="In Stock")},magicitemfilter(e){var l=this.magicitemtables.filterBy,c=this.magicitemtables.filter;if(this.instockfilter(e)){var k=l.some(C=>{for(var b in e)if(C===b&&e[b].toString().toLowerCase().includes(c.toLowerCase())&&(!this.magicitemtables.filterCost||Number(this.magicitemtables.filterCost)>=e["Cost (gp)"])&&this.magicitemtables.filterRarity.includes(e.Rarity))return!0});return!!(!c&&(!this.magicitemtables.filterCost||Number(this.magicitemtables.filterCost))>=e["Cost (gp)"]&&this.magicitemtables.filterRarity.includes(e.Rarity)||k)}return!1}}};const g=e=>(U("data-v-04b72772"),e=e(),W(),e),$={class:"col-sm-12"},O={key:0},H=g(()=>o("h1",null,"Margo's Mystics Magic Item Catalog",-1)),z=g(()=>o("p",{class:"alert alert-warning"}," Note: The In Stock column is only relevant on game day, and reflects the items that Margo has in stock at her store during game. ",-1)),j={class:"col-4"},J=["disabled"],q=g(()=>o("strong",null,"Type: ",-1)),G=g(()=>o("strong",null,"Cost (gp): ",-1)),K=g(()=>o("strong",null,"Attunement: ",-1)),Q=g(()=>o("strong",null,"Rarity: ",-1)),X=["innerHTML"],Y=["onClick"],Z=["onClick"],x=["onClick"],ee=["onClick"],te=["onClick"],se=["onClick"],ie={key:1,class:"col-sm-12"},oe={style:{"font-size":"3em"}},le=["innerHTML"];function ae(e,l,c,k,C,b){const r=d("b-form-checkbox"),I=d("b-form-checkbox-group"),v=d("b-form-input"),_=d("b-col"),R=d("b-input-group"),M=d("b-row"),w=d("modal"),u=d("b-table"),f=d("b-tab"),S=d("b-tabs");return y(),h("div",$,[e.printMode?V("",!0):(y(),h("div",O,[H,z,s(M,null,{default:i(()=>[s(_,{md:"8"},{default:i(()=>[s(r,{label:"In Stock Only",modelValue:e.instockonly,"onUpdate:modelValue":l[0]||(l[0]=t=>e.instockonly=t)},{default:i(()=>[a("Display In Stock Items Only")]),_:1},8,["modelValue"]),s(I,{modelValue:e.magicitemtables.filterBy,"onUpdate:modelValue":l[1]||(l[1]=t=>e.magicitemtables.filterBy=t)},{default:i(()=>[s(r,{value:"Item"},{default:i(()=>[a("Item")]),_:1}),s(r,{value:"Type"},{default:i(()=>[a("Type")]),_:1}),s(r,{value:"Cost (gp)"},{default:i(()=>[a("Cost (gp)")]),_:1}),s(r,{value:"Attunement"},{default:i(()=>[a("Attunement")]),_:1}),s(r,{value:"Effect"},{default:i(()=>[a("Effect")]),_:1}),s(r,{value:"Rarity"},{default:i(()=>[a("Rarity")]),_:1})]),_:1},8,["modelValue"]),s(I,{modelValue:e.magicitemtables.filterRarity,"onUpdate:modelValue":l[2]||(l[2]=t=>e.magicitemtables.filterRarity=t)},{default:i(()=>[s(r,{value:"Common"},{default:i(()=>[a("Common")]),_:1}),s(r,{value:"Uncommon"},{default:i(()=>[a("Uncommon")]),_:1}),s(r,{value:"Rare"},{default:i(()=>[a("Rare")]),_:1}),s(r,{value:"Very Rare"},{default:i(()=>[a("Very Rare")]),_:1}),s(r,{value:"Legendary"},{default:i(()=>[a("Legendary")]),_:1})]),_:1},8,["modelValue"]),o("label",j,[a("Maximum Cost "),s(v,{label:"Maximum Cost",type:"number",modelValue:e.magicitemtables.filterCost,"onUpdate:modelValue":l[3]||(l[3]=t=>e.magicitemtables.filterCost=t)},null,8,["modelValue"])]),o("button",{class:"btn btn-primary col-2",onClick:l[4]||(l[4]=t=>e.printSelected()),style:{"margin-top":"-5px"}},"Print Selected")]),_:1}),s(_,{md:"4",class:"my-1"},{default:i(()=>[s(R,null,{default:i(()=>[s(v,{modelValue:e.magicitemtables.filter,"onUpdate:modelValue":l[5]||(l[5]=t=>e.magicitemtables.filter=t),placeholder:"Type to Search"},null,8,["modelValue"]),o("button",{class:"btn btn-primary",disabled:!e.magicitemtables.filter,onClick:l[6]||(l[6]=t=>e.magicitemtables.filter="")},"Clear",8,J)]),_:1})]),_:1})]),_:1}),s(w,{id:"magicitemmodal",modalProps:e.modalProps},{default:i(()=>[o("p",null,[q,a(n(e.magicItemModal.Type),1)]),o("p",null,[G,a(n(e.magicItemModal["Cost (gp)"]),1)]),o("p",null,[K,a(n(e.magicItemModal.Attunement),1)]),o("p",null,[Q,a(n(e.magicItemModal.Rarity),1)]),o("p",null,[o("strong",null,n(e.magicItemModal.instock),1)]),o("div",{innerHTML:e.marked.parse(e.magicItemModal.Effect)},null,8,X)]),_:1},8,["modalProps"]),s(S,{id:"magicitemcatalog"},{default:i(()=>[s(f,{title:"Scrolls"},{default:i(()=>[s(u,{"show-empty":"",onRowClicked:e.selectForPrint,striped:!0,bordered:!1,responsive:!0,stacked:"sm",items:e.filteredScrolls,fields:e.magicitemtables.fields,"sort-by":e.magicitemtables.sortBy,"sort-desc":e.magicitemtables.sortDesc},{"cell(Item)":i(t=>[o("a",{href:"#",onClick:p(m=>e.magicItemInfo(t.item,t.index,m.target),["stop"])},n(t.value),9,Y)]),_:1},8,["onRowClicked","items","fields","sort-by","sort-desc"])]),_:1}),s(f,{title:"Wands"},{default:i(()=>[s(u,{"show-empty":"",onRowClicked:e.selectForPrint,striped:!0,bordered:!1,responsive:!0,stacked:"sm",items:e.filteredWands,fields:e.magicitemtables.fields,"sort-by":e.magicitemtables.sortBy,"sort-desc":e.magicitemtables.sortDesc},{"cell(Item)":i(t=>[o("a",{href:"#",onClick:p(m=>e.magicItemInfo(t.item,t.index,m.target),["stop"])},n(t.value),9,Z)]),_:1},8,["onRowClicked","items","fields","sort-by","sort-desc"])]),_:1}),s(f,{title:"Weapons"},{default:i(()=>[s(u,{"show-empty":"",onRowClicked:e.selectForPrint,striped:!0,bordered:!1,responsive:!0,stacked:"sm",items:e.filteredWeapons,fields:e.magicitemtables.fields,"sort-by":e.magicitemtables.sortBy,"sort-desc":e.magicitemtables.sortDesc},{"cell(Item)":i(t=>[o("a",{href:"#",onClick:p(m=>e.magicItemInfo(t.item,t.index,m.target),["stop"])},n(t.value),9,x)]),_:1},8,["onRowClicked","items","fields","sort-by","sort-desc"])]),_:1}),s(f,{title:"Adv. Weapons"},{default:i(()=>[s(u,{"show-empty":"",onRowClicked:e.selectForPrint,striped:!0,bordered:!1,responsive:!0,stacked:"sm",items:e.filteredAdvWeapons,fields:e.magicitemtables.fields,"sort-by":e.magicitemtables.sortBy,"sort-desc":e.magicitemtables.sortDesc},{"cell(Item)":i(t=>[o("a",{href:"#",onClick:p(m=>e.magicItemInfo(t.item,t.index,m.target),["stop"])},n(t.value),9,ee)]),_:1},8,["onRowClicked","items","fields","sort-by","sort-desc"])]),_:1}),s(f,{title:"Armor"},{default:i(()=>[s(u,{"show-empty":"",onRowClicked:e.selectForPrint,striped:!0,bordered:!1,responsive:!0,stacked:"sm",items:e.filteredArmor,fields:e.magicitemtables.fields,"sort-by":e.magicitemtables.sortBy,"sort-desc":e.magicitemtables.sortDesc},{"cell(Item)":i(t=>[o("a",{href:"#",onClick:p(m=>e.magicItemInfo(t.item,t.index,m.target),["stop"])},n(t.value),9,te)]),_:1},8,["onRowClicked","items","fields","sort-by","sort-desc"])]),_:1}),s(f,{title:"Other"},{default:i(()=>[s(u,{"show-empty":"",onRowClicked:e.selectForPrint,striped:!0,bordered:!1,responsive:!0,stacked:"sm",items:e.filteredOther,fields:e.magicitemtables.fields,"sort-by":e.magicitemtables.sortBy,"sort-desc":e.magicitemtables.sortDesc},{"cell(Item)":i(t=>[o("a",{href:"#",onClick:p(m=>e.magicItemInfo(t.item,t.index,m.target),["stop"])},n(t.value),9,se)]),_:1},8,["onRowClicked","items","fields","sort-by","sort-desc"])]),_:1})]),_:1})])),e.printMode?(y(),h("div",ie,[(y(!0),h(E,null,F(e.toPrint,t=>(y(),h("div",{key:t.Item,style:{"margin-bottom":"50px","page-break-inside":"avoid"}},[o("h4",oe,n(t.Item)+" ("+n(t.Type)+", "+n(t.Rarity)+")",1),o("div",{innerHTML:e.marked.parse(t.Effect),style:{"font-size":"1.5em"}},null,8,le)]))),128)),o("button",{class:"btn btn-success print-hide",onClick:l[7]||(l[7]=t=>{e.toPrint=[],e.printMode=!1})},"Exit")])):V("",!0)])}var me=T(N,[["render",ae],["__scopeId","data-v-04b72772"]]);export{me as default};
