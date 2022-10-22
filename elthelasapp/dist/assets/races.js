import{u as k,B as _,m as S,_ as v,g as B,o as r,c as s,a,F as u,r as d,t as n,d as c,h as b,e as f,p as T,f as F}from"./index.js";const H={metaInfo:{title:"Character Races"},setup(){const e=k(),o=e.races;let p=[],w=[];for(var i=0;i<o.length;i++){o[i].agepoints.name=o[i].name,p.push(o[i].agepoints);for(var m=0;m<o[i].subraces.length;m++){var g=o[i].subraces[m].name;(g==="default"||g==="")&&(g=o[i].name);var t={...o[i].subraces[m]};t.name=g,w.push(t)}}return _({title:"Character Races"}),{statics:e,races:o,ages:p,hw:w,marked:S}},computed:{filterhw(){return this.hw.filter(e=>this.hwFilter!==""?e.name.toLowerCase().includes(this.hwFilter.toLowerCase()):!0).sort((e,o)=>this.hwSortDesc?e[this.hwSortBy]<o[this.hwSortBy]?1:-1:e[this.hwSortBy]>o[this.hwSortBy]?1:-1)},filterage(){return this.ages.filter(e=>this.ageFilter!==""?e.name.toLowerCase().includes(this.ageFilter.toLowerCase()):!0).sort((e,o)=>this.ageSortDesc?e[this.ageSortBy]<o[this.ageSortBy]?1:-1:e[this.ageSortBy]>o[this.ageSortBy]?1:-1)}},data(){return{currentRace:{},ageFields:[{key:"name",sortable:!0,name:"Name"},{key:"puberty",sortable:!0,name:"Puberty"},{key:"sexualmaturity",sortable:!0,name:"Sexual Maturity"},{key:"mentalmaturity",sortable:!0,name:"Mental Maturity"},{key:"middleage",sortable:!0,name:"Middle Age"},{key:"oldage",sortable:!0,name:"Old Age"},{key:"averagelifespan",sortable:!0,name:"Average Lifespan"},{key:"maxage",sortable:!0,name:"Max Age"}],ageSortBy:"name",ageSortDesc:!1,ageCurrentPage:1,agePerPage:10,ageFilter:"",hwFields:[{key:"name",sortable:!0,name:"Name"},{key:"averageheight",sortable:!0,name:"Average Height"},{key:"baseheight",sortable:!0,name:"Base Height"},{key:"heightroll",sortable:!0,name:"Height Roll"},{key:"averageweight",sortable:!0,name:"Average Weight"},{key:"baseweight",sortable:!0,name:"Base Weight"},{key:"weightroll",sortable:!0,name:"Weight Roll"}],hwSortBy:"name",hwSortDesc:!1,hwCurrentPage:1,hwPerPage:10,hwFilter:""}},methods:{loadRace(e){this.currentRace=this.races.filter(o=>o.id===e)[0]},changeHWSort(e){this.hwSortBy===e.key?this.hwSortDesc=!this.hwSortDesc:this.hwSortBy=e.key},changeAgeSort(e){this.ageSortBy===e.key?this.ageSortDesc=!this.ageSortDesc:this.ageSortBy=e.key}}};const h=e=>(T("data-v-570de64e"),e=e(),F(),e),L=["onClick"],M=h(()=>a("p",{style:{clear:"both"}}," Note that for all PC races, starting languages are determined by country of origin, not race, although classes or backgrounds may provide bonus languages as specified in their descriptions. ",-1)),C={key:0,id:"raceDiv"},D=["src","alt"],R=["innerHTML"],A={key:0},N=["src","alt"],P=["innerHTML"],V=["innerHTML"],$={key:1},I=["innerHTML"],W=["innerHTML"],j={key:1},E=["innerHTML"],G=h(()=>a("h3",{style:{clear:"both"}},"Age",-1)),O=h(()=>a("p",null," Age in Elthelas differs from default D&D, particularly in that none of the major races differ from humans in max age by more than an order of magnitude. Only dragons, outsiders, fae, and a few other animals and monsters live longer than 200 years without divine or magical intervention. Such intervention usually draws the ire of the Gods (specifically Nera, goddess of death and rebirth, but the other Gods usually frown on it as well). ",-1)),U=h(()=>a("p",null,' Typical ages of various life stages for each of the major races. Note "max age" is not a strict maximum age, but rather the age when 95% of any particular cohort has died. Start of Puberty and Sexual Maturity are given in exact median age (any individual is usually +/- 2), all others are rounded to the nearest multiple of 5. ',-1)),Y={class:"row"},q=h(()=>a("div",{class:"col-sm-6"},"\xA0",-1)),z={class:"col-sm-6"},J={class:"table table-striped"},K=["onClick"],Q={key:0},X={key:1},Z=h(()=>a("h3",null,"Height and Weight",-1)),x=h(()=>a("p",null,` You can use the tables below to either get an idea of an appropriate height and weight for your character, or to randomly determine a height and weight. To randomly determine a height and weight for your character first start with height. Roll the dice indicated, and write down the result. Then add the result to the base height. This is your characters height in inches. To determine the weight, roll the dice indicated under weightroll. Take the result, multiply it by your result from the height roll and then add it to the base weight. This is your characters weight in pounds. So for example, say a protector Aasimar character rolls 2d10 on their height roll and gets a 12. She adds that to the base height of 58 and gets a height of 70 inches (or 5'10"). Next she rolls the weight roll, 2d4, and gets a 4. She multiplies this by her height roll of 12 to get a result of 48, which she then adds to the base weight (120) to get a total weight of 168 lbs. So on her character sheet under height she puts 5'10" and under weight she writes 168 lbs. `,-1)),ee=h(()=>a("p",null,` If alternatively you want to use this to get reasonable ranges to choose from for your character, use the table to determine minimum and maximums for your character. First look at the height roll and imagine what the lowest and highest numbers you could roll would be. For our Protector Aasimar example the minimum would be 2, and the maximum would be 20. This gives a range of 60 inches - 78 inches or 5'0" - 6'6". She picks a number she feels is appropriate for her character that falls within that range, say 5'7", which would be a roll of 9. She then can use that to determine what an appropriate possible weight would be. 2d4 has results ranging from 2 - 8. So the minimum would be 2 * 9 + 120, or 138 lbs, while the maximum would be 8 * 9 + 120, or 192 lbs. She decides she wants to be on the lighter side without being gaunt, so she decides her character weighs 150 lbs. `,-1)),te={class:"row"},ae=h(()=>a("div",{class:"col-sm-6"},"\xA0",-1)),re={class:"col-sm-6"},se={class:"table table-striped"},oe=["onClick"],ne={key:0},le={key:1};function ie(e,o,p,w,i,m){const g=B("b-form-input");return r(),s("div",null,[a("div",null,[(r(!0),s(u,null,d(e.races,t=>(r(),s("div",{key:t.id,class:"racebuttondiv"},[t.id!=="custom"?(r(),s("button",{key:0,class:"racebutton btn btn-primary",onClick:y=>e.loadRace(t.id)},n(t.name),9,L)):c("",!0)]))),128))]),M,e.currentRace.name?(r(),s("div",C,[a("h2",null,n(e.currentRace.name),1),a("img",{src:e.currentRace.subraces[0].image,alt:e.currentRace.name,class:"raceimage"},null,8,D),a("div",{innerHTML:e.marked.parse(e.currentRace.description)},null,8,R),(r(!0),s(u,null,d(e.currentRace.subraces,(t,y)=>(r(),s("div",{class:"subrace",key:t.id},[t.name!=="default"?(r(),s("h3",A,n(t.name),1)):c("",!0),t.image&&y!==0?(r(),s("img",{key:1,src:t.image,alt:t.name,class:"raceimage"},null,8,N)):c("",!0),a("div",{innerHTML:e.marked.parse(t.description)},null,8,P),a("ul",null,[(r(!0),s(u,null,d(e.currentRace.traits,l=>(r(),s("li",{key:l.name},[typeof l=="string"?(r(),s("div",{key:0,innerHTML:e.marked.parse(l)},null,8,V)):(r(),s("div",$,[a("strong",null,n(l.name),1),a("span",{innerHTML:e.marked.parse(l.description)},null,8,I)]))]))),128)),(r(!0),s(u,null,d(t.traits,l=>(r(),s("li",{key:l.name},[typeof l=="string"?(r(),s("div",{key:0,innerHTML:e.marked.parse(l)},null,8,W)):(r(),s("div",j,[a("strong",null,n(l.name),1),a("span",{innerHTML:e.marked.parse(l.description)},null,8,E)]))]))),128))])]))),128))])):c("",!0),G,O,U,a("div",Y,[q,a("div",z,[b(g,{modelValue:e.ageFilter,"onUpdate:modelValue":o[0]||(o[0]=t=>e.ageFilter=t),placeholder:"Type to Search"},null,8,["modelValue"])])]),a("table",J,[a("thead",null,[(r(!0),s(u,null,d(e.ageFields,t=>(r(),s("th",{key:t.key},[a("button",{onClick:y=>e.changeAgeSort(t),class:"tablebutton"},[f(n(t.name)+" ",1),e.ageSortBy===t.key&&e.ageSortDesc?(r(),s("span",Q,"\u2193")):c("",!0),e.ageSortBy===t.key&&!e.ageSortDesc?(r(),s("span",X,"\u2191")):c("",!0)],8,K)]))),128))]),a("tbody",null,[(r(!0),s(u,null,d(e.filterage,t=>(r(),s("tr",{key:t.name},[a("td",null,n(t.name),1),a("td",null,n(t.puberty),1),a("td",null,n(t.sexualmaturity),1),a("td",null,n(t.mentalmaturity),1),a("td",null,n(t.middleage),1),a("td",null,n(t.oldage),1),a("td",null,n(t.averagelifespan),1),a("td",null,n(t.maxage),1)]))),128))])]),Z,x,ee,a("div",te,[ae,a("div",re,[b(g,{modelValue:e.hwFilter,"onUpdate:modelValue":o[1]||(o[1]=t=>e.hwFilter=t),placeholder:"Type to Search"},null,8,["modelValue"])])]),a("table",se,[a("thead",null,[a("tr",null,[(r(!0),s(u,null,d(e.hwFields,t=>(r(),s("th",{key:t.key},[a("button",{onClick:y=>e.changeHWSort(t),class:"tablebutton"},[f(n(t.name)+" ",1),e.hwSortBy===t.key&&e.hwSortDesc?(r(),s("span",ne,"\u2193")):c("",!0),e.hwSortBy===t.key&&!e.hwSortDesc?(r(),s("span",le,"\u2191")):c("",!0)],8,oe)]))),128))])]),a("tbody",null,[(r(!0),s(u,null,d(e.filterhw,t=>(r(),s("tr",{key:t.name},[a("td",null,n(t.name),1),a("td",null,n(t.averageheight),1),a("td",null,n(t.baseheight),1),a("td",null,n(t.heightroll),1),a("td",null,n(t.averageweight),1),a("td",null,n(t.baseweight),1),a("td",null,n(t.weightroll),1)]))),128))])])])}const ue=v(H,[["render",ie],["__scopeId","data-v-570de64e"]]);export{ue as default};
