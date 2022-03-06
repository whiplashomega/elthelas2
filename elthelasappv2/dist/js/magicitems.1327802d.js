(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["magicitems"],{"42b6":function(t,e,i){"use strict";var r=i("dea4"),s=i.n(r);s.a},dea4:function(t,e,i){},f62b:function(t,e,i){"use strict";i.r(e);var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"col-sm-12"},[t.printMode?t._e():i("div",[i("h1",[t._v("Margo's Mystics Magic Item Catalog")]),i("p",{staticClass:"alert alert-warning"},[t._v("\n      Note: The In Stock column is only relevant on game day, and reflects the items that Margo has in stock at her store during game.\n    ")]),i("b-row",[i("b-col",{attrs:{md:"8"}},[i("b-form-checkbox",{attrs:{label:"In Stock Only"},model:{value:t.instockonly,callback:function(e){t.instockonly=e},expression:"instockonly"}},[t._v("Display In Stock Items Only")]),i("b-form-checkbox-group",{model:{value:t.magicitemtables.filterBy,callback:function(e){t.$set(t.magicitemtables,"filterBy",e)},expression:"magicitemtables.filterBy"}},[i("b-form-checkbox",{attrs:{value:"Item"}},[t._v("Item")]),i("b-form-checkbox",{attrs:{value:"Type"}},[t._v("Type")]),i("b-form-checkbox",{attrs:{value:"Cost (gp)"}},[t._v("Cost (gp)")]),i("b-form-checkbox",{attrs:{value:"Attunement"}},[t._v("Attunement")]),i("b-form-checkbox",{attrs:{value:"Effect"}},[t._v("Effect")]),i("b-form-checkbox",{attrs:{value:"Rarity"}},[t._v("Rarity")])],1),i("b-form-checkbox-group",{model:{value:t.magicitemtables.filterRarity,callback:function(e){t.$set(t.magicitemtables,"filterRarity",e)},expression:"magicitemtables.filterRarity"}},[i("b-form-checkbox",{attrs:{value:"Common"}},[t._v("Common")]),i("b-form-checkbox",{attrs:{value:"Uncommon"}},[t._v("Uncommon")]),i("b-form-checkbox",{attrs:{value:"Rare"}},[t._v("Rare")]),i("b-form-checkbox",{attrs:{value:"Very Rare"}},[t._v("Very Rare")]),i("b-form-checkbox",{attrs:{value:"Legendary"}},[t._v("Legendary")])],1),i("label",{staticClass:"col-4"},[t._v("Maximum Cost "),i("b-form-input",{attrs:{label:"Maximum Cost",type:"number"},model:{value:t.magicitemtables.filterCost,callback:function(e){t.$set(t.magicitemtables,"filterCost",e)},expression:"magicitemtables.filterCost"}})],1),i("button",{staticClass:"btn btn-primary col-2",staticStyle:{"margin-top":"-5px"},on:{click:function(e){return t.printSelected()}}},[t._v("Print Selected")])],1),i("b-col",{staticClass:"my-1",attrs:{md:"4"}},[i("b-input-group",[i("b-form-input",{attrs:{placeholder:"Type to Search"},model:{value:t.magicitemtables.filter,callback:function(e){t.$set(t.magicitemtables,"filter",e)},expression:"magicitemtables.filter"}}),i("b-btn",{attrs:{disabled:!t.magicitemtables.filter},on:{click:function(e){t.magicitemtables.filter=""}}},[t._v("Clear")])],1)],1)],1),i("b-modal",{attrs:{id:"magicitemmodal",size:"lg",title:t.magicItemModal.Item,"ok-only":"","modal-class":t.userinfo.themesetting},on:{hide:t.resetMagicItemModal}},[i("p",[i("strong",[t._v("Type: ")]),t._v(t._s(t.magicItemModal.Type))]),i("p",[i("strong",[t._v("Cost (gp): ")]),t._v(t._s(t.magicItemModal["Cost (gp)"]))]),i("p",[i("strong",[t._v("Attunement: ")]),t._v(t._s(t.magicItemModal.Attunement))]),i("p",[i("strong",[t._v("Rarity: ")]),t._v(t._s(t.magicItemModal.Rarity))]),i("p",[i("strong",[t._v(t._s(t.magicItemModal.instock))])]),i("div",{domProps:{innerHTML:t._s(t.$options.filters.marked(t.magicItemModal.Effect))}})]),i("b-tabs",{attrs:{id:"magicitemcatalog"}},[i("b-tab",{attrs:{title:"Scrolls"}},[i("b-table",{attrs:{"show-empty":"",striped:!0,bordered:!1,responsive:!0,stacked:"sm",items:t.filteredScrolls,fields:t.magicitemtables.fields,"sort-by":t.magicitemtables.sortBy,"sort-desc":t.magicitemtables.sortDesc},on:{"row-clicked":t.selectForPrint,"update:sortBy":function(e){return t.$set(t.magicitemtables,"sortBy",e)},"update:sort-by":function(e){return t.$set(t.magicitemtables,"sortBy",e)},"update:sortDesc":function(e){return t.$set(t.magicitemtables,"sortDesc",e)},"update:sort-desc":function(e){return t.$set(t.magicitemtables,"sortDesc",e)}},scopedSlots:t._u([{key:"cell(Item)",fn:function(e){return[i("a",{attrs:{href:"#"},on:{click:function(i){return i.stopPropagation(),t.magicItemInfo(e.item,e.index,i.target)}}},[t._v(t._s(e.value))])]}}],null,!1,1669913004)})],1),i("b-tab",{attrs:{title:"Wands"}},[i("b-table",{attrs:{"show-empty":"",striped:!0,bordered:!1,responsive:!0,stacked:"sm",items:t.filteredWands,fields:t.magicitemtables.fields,"sort-by":t.magicitemtables.sortBy,"sort-desc":t.magicitemtables.sortDesc},on:{"row-clicked":t.selectForPrint,"update:sortBy":function(e){return t.$set(t.magicitemtables,"sortBy",e)},"update:sort-by":function(e){return t.$set(t.magicitemtables,"sortBy",e)},"update:sortDesc":function(e){return t.$set(t.magicitemtables,"sortDesc",e)},"update:sort-desc":function(e){return t.$set(t.magicitemtables,"sortDesc",e)}},scopedSlots:t._u([{key:"cell(Item)",fn:function(e){return[i("a",{attrs:{href:"#"},on:{click:function(i){return i.stopPropagation(),t.magicItemInfo(e.item,e.index,i.target)}}},[t._v(t._s(e.value))])]}}],null,!1,1669913004)})],1),i("b-tab",{attrs:{title:"Weapons"}},[i("b-table",{attrs:{"show-empty":"",striped:!0,bordered:!1,responsive:!0,stacked:"sm",items:t.filteredWeapons,fields:t.magicitemtables.fields,"sort-by":t.magicitemtables.sortBy,"sort-desc":t.magicitemtables.sortDesc},on:{"row-clicked":t.selectForPrint,"update:sortBy":function(e){return t.$set(t.magicitemtables,"sortBy",e)},"update:sort-by":function(e){return t.$set(t.magicitemtables,"sortBy",e)},"update:sortDesc":function(e){return t.$set(t.magicitemtables,"sortDesc",e)},"update:sort-desc":function(e){return t.$set(t.magicitemtables,"sortDesc",e)}},scopedSlots:t._u([{key:"cell(Item)",fn:function(e){return[i("a",{attrs:{href:"#"},on:{click:function(i){return i.stopPropagation(),t.magicItemInfo(e.item,e.index,i.target)}}},[t._v(t._s(e.value))])]}}],null,!1,1669913004)})],1),i("b-tab",{attrs:{title:"Armor"}},[i("b-table",{attrs:{"show-empty":"",striped:!0,bordered:!1,responsive:!0,stacked:"sm",items:t.filteredArmor,fields:t.magicitemtables.fields,"sort-by":t.magicitemtables.sortBy,"sort-desc":t.magicitemtables.sortDesc},on:{"row-clicked":t.selectForPrint,"update:sortBy":function(e){return t.$set(t.magicitemtables,"sortBy",e)},"update:sort-by":function(e){return t.$set(t.magicitemtables,"sortBy",e)},"update:sortDesc":function(e){return t.$set(t.magicitemtables,"sortDesc",e)},"update:sort-desc":function(e){return t.$set(t.magicitemtables,"sortDesc",e)}},scopedSlots:t._u([{key:"cell(Item)",fn:function(e){return[i("a",{attrs:{href:"#"},on:{click:function(i){return i.stopPropagation(),t.magicItemInfo(e.item,e.index,i.target)}}},[t._v(t._s(e.value))])]}}],null,!1,1669913004)})],1),i("b-tab",{attrs:{title:"Other"}},[i("b-table",{attrs:{"show-empty":"",striped:!0,bordered:!1,responsive:!0,stacked:"sm",items:t.filteredOther,fields:t.magicitemtables.fields,"sort-by":t.magicitemtables.sortBy,"sort-desc":t.magicitemtables.sortDesc},on:{"row-clicked":t.selectForPrint,"update:sortBy":function(e){return t.$set(t.magicitemtables,"sortBy",e)},"update:sort-by":function(e){return t.$set(t.magicitemtables,"sortBy",e)},"update:sortDesc":function(e){return t.$set(t.magicitemtables,"sortDesc",e)},"update:sort-desc":function(e){return t.$set(t.magicitemtables,"sortDesc",e)}},scopedSlots:t._u([{key:"cell(Item)",fn:function(e){return[i("a",{attrs:{href:"#"},on:{click:function(i){return i.stopPropagation(),t.magicItemInfo(e.item,e.index,i.target)}}},[t._v(t._s(e.value))])]}}],null,!1,1669913004)})],1)],1)],1),t.printMode?i("div",{staticClass:"col-sm-12"},[t._l(t.toPrint,(function(e){return i("div",{key:e.Item,staticStyle:{"margin-bottom":"50px","page-break-inside":"avoid"}},[i("h4",{staticStyle:{"font-size":"3em"}},[t._v(t._s(e.Item)+" ("+t._s(e.Type)+", "+t._s(e.Rarity)+")")]),i("div",{staticStyle:{"font-size":"1.5em"},domProps:{innerHTML:t._s(t.$options.filters.marked(e.Effect))}})])})),i("button",{staticClass:"btn btn-success print-hide",on:{click:function(e){t.toPrint=[],t.printMode=!1}}},[t._v("Exit")])],2):t._e()])},s=[],a=(i("8e6e"),i("ac6a"),i("456d"),i("c5f6"),i("6b54"),i("6762"),i("2fdb"),i("bd86")),o=i("2f62");function n(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,r)}return i}function c(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?n(i,!0).forEach((function(e){Object(a["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):n(i).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var l={computed:c({},Object(o["c"])({title:"title",magicitems:"allMagicItems",magicwands:"allMagicWands",magicscrolls:"allMagicScrolls",magicweapons:"allMagicWeapons",magicarmor:"allMagicArmor",magicother:"allMagicOther",commons:"allCommons",uncommons:"allUncommons",rares:"allRares",veryrares:"allVeryRares",legendaries:"allLegendaries",userinfo:"getUserInfo"}),{filteredWands:function(){return this.magicwands.filter(this.magicitemfilter)},filteredScrolls:function(){return this.magicscrolls.filter(this.magicitemfilter)},filteredWeapons:function(){return this.magicweapons.filter(this.magicitemfilter)},filteredArmor:function(){return this.magicarmor.filter(this.magicitemfilter)},filteredOther:function(){return this.magicother.filter(this.magicitemfilter)}}),data:function(){return{magicitemtables:{fields:[{key:"print",label:"Print",sortable:!1},{key:"Item",label:"Item",sortable:!0},{key:"Attunement",label:"Attunement",sortable:!0},{key:"Rarity",label:"Rarity",sortable:!0},{key:"Cost (gp)",label:"Cost (gp)",sortable:!0},{key:"instock",label:"In Stock",sortable:!0}],filter:"",filterBy:["Item","Type","Attunement","Rarity","Cost (gp)","Effect"],filterRarity:["Common","Uncommon","Rare","Very Rare","Legendary"],filterCost:"",sortBy:null,sortDesc:!1},magicItemModal:{Item:"",Rarity:"",instock:"",Effect:"","Cost (gp)":"",Attunement:""},instockonly:!0,toPrint:[],printMode:!1}},methods:{selectForPrint:function(t){t.print=!t.print,t.print?t._rowVariant="success":t._rowVariant=void 0},printSelected:function(){this.toPrint=this.magicitems.reduce((function(t,e){return e.print&&t.push(e),t}),[]),this.printMode=!0},magicItemInfo:function(t,e,i){this.magicItemModal=t,this.$root.$emit("bv::show::modal","magicitemmodal",i)},resetMagicItemModal:function(){this.magicItemModal={Item:"",Rarity:"",instock:"",Effect:"","Cost (gp)":"",Attunement:""}},instockfilter:function(t){return!this.instockonly||"In Stock"===t.instock},magicitemfilter:function(t){var e=this,i=this.magicitemtables.filterBy,r=this.magicitemtables.filter;if(this.instockfilter(t)){var s=i.some((function(i){for(var s in t)if(i===s&&t[s].toString().toLowerCase().includes(r.toLowerCase())&&(!e.magicitemtables.filterCost||Number(e.magicitemtables.filterCost)>=t["Cost (gp)"])&&e.magicitemtables.filterRarity.includes(t.Rarity))return!0}));return!!(!r&&(!this.magicitemtables.filterCost||Number(this.magicitemtables.filterCost))>=t["Cost (gp)"]&&this.magicitemtables.filterRarity.includes(t.Rarity)||s)}return!1}}},m=l,u=(i("42b6"),i("2877")),f=Object(u["a"])(m,r,s,!1,null,"045d33a5",null);e["default"]=f.exports}}]);
//# sourceMappingURL=magicitems.1327802d.js.map