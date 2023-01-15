import{d as A,k as M,u as S,m as w,l as U,_ as T,h as p,o as m,c as u,a as t,i as a,w as r,f as d,e as $,F as h,r as y,t as l,G as o,p as L,g as P}from"./index.js";var E={setup(){const i=A(),s=M(),{magicitems:c,magicscrolls:b,magicwands:v,magicweapons:g,magichomebrewweapons:n,magicarmor:I,magicother:D,magiccommons:R,magicrares:V,magicveryrares:f,magiclegendaries:B}=i;return S({title:"Magic Item Catalog"}),{userinfo:s,magicitems:c,magicscrolls:b,magicwands:v,magicweapons:g,magichomebrewweapons:n,magicarmor:I,magicother:D,magiccommons:R,magicrares:V,magicveryrares:f,magiclegendaries:B,marked:w}},components:{modal:U},computed:{filteredWands(){return this.magicwands.filter(this.magicitemfilter).sort(this.sorter)},filteredScrolls(){return this.magicscrolls.filter(this.magicitemfilter).sort(this.sorter)},filteredWeapons(){return this.magicweapons.filter(this.magicitemfilter).sort(this.sorter)},filteredAdvWeapons(){return this.magichomebrewweapons.filter(this.magicitemfilter).sort(this.sorter)},filteredArmor(){return this.magicarmor.filter(this.magicitemfilter).sort(this.sorter)},filteredOther(){return this.magicother.filter(this.magicitemfilter).sort(this.sorter)}},data:function(){return{magicitemtables:{fields:[{key:"Item",label:"Item",sortable:!0},{key:"Attunement",label:"Attunement",sortable:!0},{key:"Rarity",label:"Rarity",sortable:!0},{key:"Cost (gp)",label:"Cost (gp)",sortable:!0},{key:"instock",label:"In Stock",sortable:!0}],filter:"",filterBy:{Item:!0,Type:!0,Attunement:!0,Rarity:!0,"Cost (gp)":!0,Effect:!0},filterRarity:{Common:!0,Uncommon:!0,Rare:!0,"Very Rare":!0,Legendary:!0},filterCost:"",sortBy:"Item",sortDesc:!1},modalProps:{isActive:!1,title:""},magicItemModal:{Item:"",Rarity:"",instock:"",Effect:"","Cost (gp)":"",Attunement:""},instockonly:!0,toPrint:[],printMode:!1}},methods:{selectForPrint(i){i.print=!i.print,i.print?i._rowVariant="success":i._rowVariant=void 0},printSelected(){this.toPrint=this.magicitems.reduce((i,s)=>(s.print&&i.push(s),i),[]),this.printMode=!0},magicItemInfo(i){this.magicItemModal=i,this.modalProps.isActive=!0,this.modalProps.title=i.Item},resetMagicItemModal(){this.magicItemModal={Item:"",Rarity:"",instock:"",Effect:"","Cost (gp)":"",Attunement:""}},instockfilter(i){return!(this.instockonly&&i.instock!=="In Stock")},magicitemfilter(i){var s=[];for(let g in this.magicitemtables.filterBy)this.magicitemtables.filterBy[g]&&s.push(g);var c=[];for(let g in this.magicitemtables.filterRarity)this.magicitemtables.filterRarity[g]&&c.push(g);var b=this.magicitemtables.filter;if(this.instockfilter(i)){var v=s.some(g=>{for(var n in i)if(g===n&&i[n].toString().toLowerCase().includes(b.toLowerCase())&&(!this.magicitemtables.filterCost||Number(this.magicitemtables.filterCost)>=i["Cost (gp)"])&&c.includes(i.Rarity))return!0});return!!(!b&&(!this.magicitemtables.filterCost||Number(this.magicitemtables.filterCost))>=i["Cost (gp)"]&&c.includes(i.Rarity)||v)}return!1},sorter(i,s){let c=this.magicitemtables.sortBy,b=this.magicitemtables.sortDesc;return i[c]>s[c]&!b||i[c]<s[c]&b?1:-1}}};const k=i=>(L("data-v-00987a11"),i=i(),P(),i),W={class:"col-sm-12"},N={key:0},O=k(()=>t("h1",null,"Margo's Mystics Magic Item Catalog",-1)),H=k(()=>t("p",{class:"alert alert-warning"}," Note: The In Stock column is only relevant on game day, and reflects the items that Margo has in stock at her store during game. ",-1)),_={class:"row"},F={class:"col-md-8"},z={class:"checkbox-group row"},G={class:"col-2"},j={class:"col-2"},q={class:"col-2"},J={class:"col-2"},K={class:"col-2"},Q={class:"col-2"},X={class:"checkbox-group row"},Y={class:"col-2"},Z={class:"col-2"},x={class:"col-2"},tt={class:"col-2"},et={class:"col-2"},st={class:"col-4"},it=["disabled"],lt=k(()=>t("strong",null,"Type: ",-1)),ot=k(()=>t("strong",null,"Cost (gp): ",-1)),at=k(()=>t("strong",null,"Attunement: ",-1)),rt=k(()=>t("strong",null,"Rarity: ",-1)),nt=["innerHTML"],mt={class:"table table-striped table-responsive"},ut=["onClick"],dt={class:"table table-striped table-responsive"},ct=["onClick"],gt={class:"table table-striped table-responsive"},bt=["onClick"],ft={class:"table table-striped table-responsive"},pt=["onClick"],ht={class:"table table-striped table-responsive"},yt=["onClick"],kt={class:"table table-striped table-responsive"},Ct=["onClick"],vt={key:1,class:"col-sm-12"},It={style:{"font-size":"3em"}},Dt=["innerHTML"];function Rt(i,s,c,b,v,g){const n=p("b-form-checkbox"),I=p("b-form-input"),D=p("b-input-group"),R=p("b-col"),V=p("modal"),f=p("b-tab"),B=p("b-tabs");return m(),u("div",W,[i.printMode?$("",!0):(m(),u("div",N,[O,H,t("div",_,[t("div",F,[a(n,{label:"In Stock Only",modelValue:i.instockonly,"onUpdate:modelValue":s[0]||(s[0]=e=>i.instockonly=e)},{default:r(()=>[d("Display In Stock Items Only")]),_:1},8,["modelValue"]),t("div",z,[t("div",G,[a(n,{modelValue:i.magicitemtables.filterBy.Item,"onUpdate:modelValue":s[1]||(s[1]=e=>i.magicitemtables.filterBy.Item=e)},{default:r(()=>[d(" Item ")]),_:1},8,["modelValue"])]),t("div",j,[a(n,{modelValue:i.magicitemtables.filterBy.Type,"onUpdate:modelValue":s[2]||(s[2]=e=>i.magicitemtables.filterBy.Type=e)},{default:r(()=>[d(" Type ")]),_:1},8,["modelValue"])]),t("div",q,[a(n,{modelValue:i.magicitemtables.filterBy["Cost (gp)"],"onUpdate:modelValue":s[3]||(s[3]=e=>i.magicitemtables.filterBy["Cost (gp)"]=e)},{default:r(()=>[d(" Cost (gp) ")]),_:1},8,["modelValue"])]),t("div",J,[a(n,{modelValue:i.magicitemtables.filterBy.Attunement,"onUpdate:modelValue":s[4]||(s[4]=e=>i.magicitemtables.filterBy.Attunement=e)},{default:r(()=>[d(" Attunement ")]),_:1},8,["modelValue"])]),t("div",K,[a(n,{modelValue:i.magicitemtables.filterBy.Effect,"onUpdate:modelValue":s[5]||(s[5]=e=>i.magicitemtables.filterBy.Effect=e)},{default:r(()=>[d(" Effect ")]),_:1},8,["modelValue"])]),t("div",Q,[a(n,{modelValue:i.magicitemtables.filterBy.Rarity,"onUpdate:modelValue":s[6]||(s[6]=e=>i.magicitemtables.filterBy.Rarity=e)},{default:r(()=>[d(" Rarity ")]),_:1},8,["modelValue"])])]),t("div",X,[t("div",Y,[a(n,{modelValue:i.magicitemtables.filterRarity.Common,"onUpdate:modelValue":s[7]||(s[7]=e=>i.magicitemtables.filterRarity.Common=e)},{default:r(()=>[d(" Common ")]),_:1},8,["modelValue"])]),t("div",Z,[a(n,{modelValue:i.magicitemtables.filterRarity.Uncommon,"onUpdate:modelValue":s[8]||(s[8]=e=>i.magicitemtables.filterRarity.Uncommon=e)},{default:r(()=>[d(" Uncommon ")]),_:1},8,["modelValue"])]),t("div",x,[a(n,{modelValue:i.magicitemtables.filterRarity.Rare,"onUpdate:modelValue":s[9]||(s[9]=e=>i.magicitemtables.filterRarity.Rare=e)},{default:r(()=>[d(" Rare ")]),_:1},8,["modelValue"])]),t("div",tt,[a(n,{modelValue:i.magicitemtables.filterRarity["Very Rare"],"onUpdate:modelValue":s[10]||(s[10]=e=>i.magicitemtables.filterRarity["Very Rare"]=e)},{default:r(()=>[d(" Very Rare ")]),_:1},8,["modelValue"])]),t("div",et,[a(n,{modelValue:i.magicitemtables.filterRarity.Legendary,"onUpdate:modelValue":s[11]||(s[11]=e=>i.magicitemtables.filterRarity.Legendary=e)},{default:r(()=>[d(" Legendary ")]),_:1},8,["modelValue"])])]),t("label",st,[d(" Maximum Cost "),a(I,{label:"Maximum Cost",type:"number",modelValue:i.magicitemtables.filterCost,"onUpdate:modelValue":s[12]||(s[12]=e=>i.magicitemtables.filterCost=e)},null,8,["modelValue"])])]),a(R,{md:"4",class:"my-1"},{default:r(()=>[a(D,null,{default:r(()=>[a(I,{modelValue:i.magicitemtables.filter,"onUpdate:modelValue":s[13]||(s[13]=e=>i.magicitemtables.filter=e),placeholder:"Type to Search"},null,8,["modelValue"]),t("button",{class:"btn btn-primary",disabled:!i.magicitemtables.filter,onClick:s[14]||(s[14]=e=>i.magicitemtables.filter="")}," Clear ",8,it)]),_:1})]),_:1})]),a(V,{id:"magicitemmodal",modalProps:i.modalProps},{default:r(()=>[t("p",null,[lt,d(l(i.magicItemModal.Type),1)]),t("p",null,[ot,d(l(i.magicItemModal["Cost (gp)"]),1)]),t("p",null,[at,d(l(i.magicItemModal.Attunement),1)]),t("p",null,[rt,d(l(i.magicItemModal.Rarity),1)]),t("p",null,[t("strong",null,l(i.magicItemModal.instock),1)]),t("div",{innerHTML:i.marked.parse(i.magicItemModal.Effect)},null,8,nt)]),_:1},8,["modalProps"]),a(B,{id:"magicitemcatalog"},{default:r(()=>[a(f,{title:"Scrolls"},{default:r(()=>[t("table",mt,[t("thead",null,[t("tr",null,[t("th",null,[t("a",{href:"#",onClick:s[15]||(s[15]=o(e=>{this.magicitemtables.sortBy="Item",this.magicitemtables.sortDesc=!this.magicitemtables.sortDesc},["stop"]))}," Item ")]),t("th",null,[t("a",{href:"#",onClick:s[16]||(s[16]=o(e=>{this.magicitemtables.sortBy="Attunement",this.magicitemtables.sortDesc=!this.magicitemtables.sortDesc},["stop"]))}," Attunement ")]),t("th",null,[t("a",{href:"#",onClick:s[17]||(s[17]=o(e=>{this.magicitemtables.sortBy="Rarity",this.magicitemtables.sortDesc=!this.magicitemtables.sortDesc},["stop"]))}," Rarity ")]),t("th",null,[t("a",{href:"#",onClick:s[18]||(s[18]=o(e=>{this.magicitemtables.sortBy="Cost (gp)",this.magicitemtables.sortDesc=!this.magicitemtables.sortDesc},["stop"]))}," Cost (gp) ")]),t("th",null,[t("a",{href:"#",onClick:s[19]||(s[19]=o(e=>{this.magicitemtables.sortBy="instock",this.magicitemtables.sortDesc=!this.magicitemtables.sortDesc},["stop"]))}," In Stock ")])])]),t("tbody",null,[(m(!0),u(h,null,y(i.filteredScrolls,e=>(m(),u("tr",{key:e.Item},[t("td",null,[t("a",{href:"#",onClick:o(C=>i.magicItemInfo(e),["stop"])},l(e.Item),9,ut)]),t("td",null,l(e.Attunement),1),t("td",null,l(e.Rarity),1),t("td",null,l(e["Cost (gp)"]),1),t("td",null,l(e.instock),1)]))),128))])])]),_:1}),a(f,{title:"Wands"},{default:r(()=>[t("table",dt,[t("thead",null,[t("tr",null,[t("th",null,[t("a",{href:"#",onClick:s[20]||(s[20]=o(e=>{this.magicitemtables.sortBy="Item",this.magicitemtables.sortDesc=!this.magicitemtables.sortDesc},["stop"]))}," Item ")]),t("th",null,[t("a",{href:"#",onClick:s[21]||(s[21]=o(e=>{this.magicitemtables.sortBy="Attunement",this.magicitemtables.sortDesc=!this.magicitemtables.sortDesc},["stop"]))}," Attunement ")]),t("th",null,[t("a",{href:"#",onClick:s[22]||(s[22]=o(e=>{this.magicitemtables.sortBy="Rarity",this.magicitemtables.sortDesc=!this.magicitemtables.sortDesc},["stop"]))}," Rarity ")]),t("th",null,[t("a",{href:"#",onClick:s[23]||(s[23]=o(e=>{this.magicitemtables.sortBy="Cost (gp)",this.magicitemtables.sortDesc=!this.magicitemtables.sortDesc},["stop"]))}," Cost (gp) ")]),t("th",null,[t("a",{href:"#",onClick:s[24]||(s[24]=o(e=>{this.magicitemtables.sortBy="instock",this.magicitemtables.sortDesc=!this.magicitemtables.sortDesc},["stop"]))}," In Stock ")])])]),t("tbody",null,[(m(!0),u(h,null,y(i.filteredWands,e=>(m(),u("tr",{key:e.Item},[t("td",null,[t("a",{href:"#",onClick:o(C=>i.magicItemInfo(e),["stop"])},l(e.Item),9,ct)]),t("td",null,l(e.Attunement),1),t("td",null,l(e.Rarity),1),t("td",null,l(e["Cost (gp)"]),1),t("td",null,l(e.instock),1)]))),128))])])]),_:1}),a(f,{title:"Weapons"},{default:r(()=>[t("table",gt,[t("thead",null,[t("tr",null,[t("th",null,[t("a",{href:"#",onClick:s[25]||(s[25]=o(e=>{this.magicitemtables.sortBy="Item",this.magicitemtables.sortDesc=!this.magicitemtables.sortDesc},["stop"]))}," Item ")]),t("th",null,[t("a",{href:"#",onClick:s[26]||(s[26]=o(e=>{this.magicitemtables.sortBy="Attunement",this.magicitemtables.sortDesc=!this.magicitemtables.sortDesc},["stop"]))}," Attunement ")]),t("th",null,[t("a",{href:"#",onClick:s[27]||(s[27]=o(e=>{this.magicitemtables.sortBy="Rarity",this.magicitemtables.sortDesc=!this.magicitemtables.sortDesc},["stop"]))}," Rarity ")]),t("th",null,[t("a",{href:"#",onClick:s[28]||(s[28]=o(e=>{this.magicitemtables.sortBy="Cost (gp)",this.magicitemtables.sortDesc=!this.magicitemtables.sortDesc},["stop"]))}," Cost (gp) ")]),t("th",null,[t("a",{href:"#",onClick:s[29]||(s[29]=o(e=>{this.magicitemtables.sortBy="instock",this.magicitemtables.sortDesc=!this.magicitemtables.sortDesc},["stop"]))}," In Stock ")])])]),t("tbody",null,[(m(!0),u(h,null,y(i.filteredWeapons,e=>(m(),u("tr",{key:e.Item},[t("td",null,[t("a",{href:"#",onClick:o(C=>i.magicItemInfo(e),["stop"])},l(e.Item),9,bt)]),t("td",null,l(e.Attunement),1),t("td",null,l(e.Rarity),1),t("td",null,l(e["Cost (gp)"]),1),t("td",null,l(e.instock),1)]))),128))])])]),_:1}),a(f,{title:"Adv. Weapons"},{default:r(()=>[t("table",ft,[t("thead",null,[t("tr",null,[t("th",null,[t("a",{href:"#",onClick:s[30]||(s[30]=o(e=>{this.magicitemtables.sortBy="Item",this.magicitemtables.sortDesc=!this.magicitemtables.sortDesc},["stop"]))}," Item ")]),t("th",null,[t("a",{href:"#",onClick:s[31]||(s[31]=o(e=>{this.magicitemtables.sortBy="Attunement",this.magicitemtables.sortDesc=!this.magicitemtables.sortDesc},["stop"]))}," Attunement ")]),t("th",null,[t("a",{href:"#",onClick:s[32]||(s[32]=o(e=>{this.magicitemtables.sortBy="Rarity",this.magicitemtables.sortDesc=!this.magicitemtables.sortDesc},["stop"]))}," Rarity ")]),t("th",null,[t("a",{href:"#",onClick:s[33]||(s[33]=o(e=>{this.magicitemtables.sortBy="Cost (gp)",this.magicitemtables.sortDesc=!this.magicitemtables.sortDesc},["stop"]))}," Cost (gp) ")]),t("th",null,[t("a",{href:"#",onClick:s[34]||(s[34]=o(e=>{this.magicitemtables.sortBy="instock",this.magicitemtables.sortDesc=!this.magicitemtables.sortDesc},["stop"]))}," In Stock ")])])]),t("tbody",null,[(m(!0),u(h,null,y(i.filteredAdvWeapons,e=>(m(),u("tr",{key:e.Item},[t("td",null,[t("a",{href:"#",onClick:o(C=>i.magicItemInfo(e),["stop"])},l(e.Item),9,pt)]),t("td",null,l(e.Attunement),1),t("td",null,l(e.Rarity),1),t("td",null,l(e["Cost (gp)"]),1),t("td",null,l(e.instock),1)]))),128))])])]),_:1}),a(f,{title:"Armor"},{default:r(()=>[t("table",ht,[t("thead",null,[t("tr",null,[t("th",null,[t("a",{href:"#",onClick:s[35]||(s[35]=o(e=>{this.magicitemtables.sortBy="Item",this.magicitemtables.sortDesc=!this.magicitemtables.sortDesc},["stop"]))}," Item ")]),t("th",null,[t("a",{href:"#",onClick:s[36]||(s[36]=o(e=>{this.magicitemtables.sortBy="Attunement",this.magicitemtables.sortDesc=!this.magicitemtables.sortDesc},["stop"]))}," Attunement ")]),t("th",null,[t("a",{href:"#",onClick:s[37]||(s[37]=o(e=>{this.magicitemtables.sortBy="Rarity",this.magicitemtables.sortDesc=!this.magicitemtables.sortDesc},["stop"]))}," Rarity ")]),t("th",null,[t("a",{href:"#",onClick:s[38]||(s[38]=o(e=>{this.magicitemtables.sortBy="Cost (gp)",this.magicitemtables.sortDesc=!this.magicitemtables.sortDesc},["stop"]))}," Cost (gp) ")]),t("th",null,[t("a",{href:"#",onClick:s[39]||(s[39]=o(e=>{this.magicitemtables.sortBy="instock",this.magicitemtables.sortDesc=!this.magicitemtables.sortDesc},["stop"]))}," In Stock ")])])]),t("tbody",null,[(m(!0),u(h,null,y(i.filteredArmor,e=>(m(),u("tr",{key:e.Item},[t("td",null,[t("a",{href:"#",onClick:o(C=>i.magicItemInfo(e),["stop"])},l(e.Item),9,yt)]),t("td",null,l(e.Attunement),1),t("td",null,l(e.Rarity),1),t("td",null,l(e["Cost (gp)"]),1),t("td",null,l(e.instock),1)]))),128))])])]),_:1}),a(f,{title:"Other"},{default:r(()=>[t("table",kt,[t("thead",null,[t("tr",null,[t("th",null,[t("a",{href:"#",onClick:s[40]||(s[40]=o(e=>{this.magicitemtables.sortBy="Item",this.magicitemtables.sortDesc=!this.magicitemtables.sortDesc},["stop"]))}," Item ")]),t("th",null,[t("a",{href:"#",onClick:s[41]||(s[41]=o(e=>{this.magicitemtables.sortBy="Attunement",this.magicitemtables.sortDesc=!this.magicitemtables.sortDesc},["stop"]))}," Attunement ")]),t("th",null,[t("a",{href:"#",onClick:s[42]||(s[42]=o(e=>{this.magicitemtables.sortBy="Rarity",this.magicitemtables.sortDesc=!this.magicitemtables.sortDesc},["stop"]))}," Rarity ")]),t("th",null,[t("a",{href:"#",onClick:s[43]||(s[43]=o(e=>{this.magicitemtables.sortBy="Cost (gp)",this.magicitemtables.sortDesc=!this.magicitemtables.sortDesc},["stop"]))}," Cost (gp) ")]),t("th",null,[t("a",{href:"#",onClick:s[44]||(s[44]=o(e=>{this.magicitemtables.sortBy="instock",this.magicitemtables.sortDesc=!this.magicitemtables.sortDesc},["stop"]))}," In Stock ")])])]),t("tbody",null,[(m(!0),u(h,null,y(i.filteredOther,e=>(m(),u("tr",{key:e.Item},[t("td",null,[t("a",{href:"#",onClick:o(C=>i.magicItemInfo(e),["stop"])},l(e.Item),9,Ct)]),t("td",null,l(e.Attunement),1),t("td",null,l(e.Rarity),1),t("td",null,l(e["Cost (gp)"]),1),t("td",null,l(e.instock),1)]))),128))])])]),_:1})]),_:1})])),i.printMode?(m(),u("div",vt,[(m(!0),u(h,null,y(i.toPrint,e=>(m(),u("div",{key:e.Item,style:{"margin-bottom":"50px","page-break-inside":"avoid"}},[t("h4",It,l(e.Item)+" ("+l(e.Type)+", "+l(e.Rarity)+") ",1),t("div",{innerHTML:i.marked.parse(e.Effect),style:{"font-size":"1.5em"}},null,8,Dt)]))),128)),t("button",{class:"btn btn-success print-hide",onClick:s[45]||(s[45]=e=>{i.toPrint=[],i.printMode=!1})}," Exit ")])):$("",!0)])}var Bt=T(E,[["render",Rt],["__scopeId","data-v-00987a11"]]);export{Bt as default};
