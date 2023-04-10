import{u as f,B as k,m as S,_ as v,g as _,o as r,c as s,a,F as h,r as u,t as o,d,h as w,e as b}from"./index.js";const B={setup(){const e=f(),n=e.ancestries;let y=[],p=[];for(var i=0;i<n.length;i++){n[i].agepoints.name=n[i].name,y.push(n[i].agepoints);for(var g=0;g<n[i].subraces.length;g++){var c=n[i].subraces[g].name;(c==="default"||c==="")&&(c=n[i].name);var t={...n[i].subraces[g]};t.name=c,p.push(t)}}return k({title:"Character Ancestries"}),{statics:e,ancestries:n,ages:y,hw:p,marked:S}},computed:{filterhw(){return this.hw.filter(e=>this.hwFilter!==""?e.name.toLowerCase().includes(this.hwFilter.toLowerCase()):!0).sort((e,n)=>this.hwSortDesc?e[this.hwSortBy]<n[this.hwSortBy]?1:-1:e[this.hwSortBy]>n[this.hwSortBy]?1:-1)},filterage(){return this.ages.filter(e=>this.ageFilter!==""?e.name.toLowerCase().includes(this.ageFilter.toLowerCase()):!0).sort((e,n)=>this.ageSortDesc?e[this.ageSortBy]<n[this.ageSortBy]?1:-1:e[this.ageSortBy]>n[this.ageSortBy]?1:-1)}},data(){return{currentRace:{},ageFields:[{key:"name",sortable:!0,name:"Name"},{key:"puberty",sortable:!0,name:"Puberty"},{key:"sexualmaturity",sortable:!0,name:"Sexual Maturity"},{key:"mentalmaturity",sortable:!0,name:"Mental Maturity"},{key:"middleage",sortable:!0,name:"Middle Age"},{key:"oldage",sortable:!0,name:"Old Age"},{key:"averagelifespan",sortable:!0,name:"Average Lifespan"},{key:"maxage",sortable:!0,name:"Max Age"}],ageSortBy:"name",ageSortDesc:!1,ageCurrentPage:1,agePerPage:10,ageFilter:"",hwFields:[{key:"name",sortable:!0,name:"Name"},{key:"averageheight",sortable:!0,name:"Average Height"},{key:"baseheight",sortable:!0,name:"Base Height"},{key:"heightroll",sortable:!0,name:"Height Roll"},{key:"averageweight",sortable:!0,name:"Average Weight"},{key:"baseweight",sortable:!0,name:"Base Weight"},{key:"weightroll",sortable:!0,name:"Weight Roll"}],hwSortBy:"name",hwSortDesc:!1,hwCurrentPage:1,hwPerPage:10,hwFilter:""}},methods:{loadRace(e){this.currentRace=this.ancestries.filter(n=>n.id===e)[0]},changeHWSort(e){this.hwSortBy===e.key?this.hwSortDesc=!this.hwSortDesc:this.hwSortBy=e.key},changeAgeSort(e){this.ageSortBy===e.key?this.ageSortDesc=!this.ageSortDesc:this.ageSortBy=e.key}}},T=["onClick"],F=a("p",{style:{clear:"both"}}," Note that for all PC Ancestries, starting languages are determined by country of origin, not ancestry, although classes or backgrounds may provide bonus languages as specified in their descriptions. ",-1),H={key:0,id:"raceDiv"},L=["src","alt"],M=["innerHTML"],C={key:0},A=["src","alt"],D=["innerHTML"],R=["innerHTML"],N={key:1},P=["innerHTML"],V=["innerHTML"],$={key:1},W=["innerHTML"],E=a("h3",{style:{clear:"both"}},"Age",-1),G=a("p",null," Age in Elthelas differs is less diverse than in other fantasy settings, particularly in that none of the ancestries differ from humans in max age by more than an order of magnitude. Only dragons, outsiders, fae, and a few other animals and monsters live longer than 200 years without divine or magical intervention. Such intervention usually draws the ire of the Gods (specifically Nera, goddess of death and rebirth, but the other Gods usually frown on it as well). ",-1),O=a("p",null,' The table below lists typical ages of various life stages for each of the ancestries. Note "max age" is not a strict maximum age, but rather the age when 95% of any particular cohort has died. Start of Puberty and Sexual Maturity are given in exact median age (any individual is usually +/- 2), all others are rounded to the nearest multiple of 5. ',-1),U={class:"row"},I=a("div",{class:"col-sm-6"},"\xA0",-1),Y={class:"col-sm-6"},j={class:"table table-striped"},q=["onClick"],z={key:0},J={key:1},K=a("h3",null,"Height and Weight",-1),Q=a("p",null,` You can use the tables below to either get an idea of an appropriate height and weight for your character, or to randomly determine a height and weight. To randomly determine a height and weight for your character first start with height. Roll the dice indicated, and write down the result. Then add the result to the base height. This is your characters height in inches. To determine the weight, roll the dice indicated under weightroll. Take the result, multiply it by your result from the height roll and then add it to the base weight. This is your characters weight in pounds. So for example, say a protector Aasimar character rolls 2d10 on their height roll and gets a 12. She adds that to the base height of 58 and gets a height of 70 inches (or 5'10"). Next she rolls the weight roll, 2d4, and gets a 4. She multiplies this by her height roll of 12 to get a result of 48, which she then adds to the base weight (120) to get a total weight of 168 lbs. So on her character sheet under height she puts 5'10" and under weight she writes 168 lbs. `,-1),X=a("p",null,` If alternatively you want to use this to get reasonable ranges to choose from for your character, use the table to determine minimum and maximums for your character. First look at the height roll and imagine what the lowest and highest numbers you could roll would be. For our Protector Aasimar example the minimum would be 2, and the maximum would be 20. This gives a range of 60 inches - 78 inches or 5'0" - 6'6". She picks a number she feels is appropriate for her character that falls within that range, say 5'7", which would be a roll of 9. She then can use that to determine what an appropriate possible weight would be. 2d4 has results ranging from 2 - 8. So the minimum would be 2 * 9 + 120, or 138 lbs, while the maximum would be 8 * 9 + 120, or 192 lbs. She decides she wants to be on the lighter side without being gaunt, so she decides her character weighs 150 lbs. `,-1),Z={class:"row"},x=a("div",{class:"col-sm-6"},"\xA0",-1),ee={class:"col-sm-6"},te={class:"table table-striped"},ae=["onClick"],re={key:0},se={key:1};function ne(e,n,y,p,i,g){const c=_("b-form-input");return r(),s("div",null,[a("div",null,[(r(!0),s(h,null,u(e.ancestries,t=>(r(),s("div",{key:t.id,class:"racebuttondiv"},[t.id!=="custom"?(r(),s("button",{key:0,class:"racebutton btn btn-primary",onClick:m=>e.loadRace(t.id)},o(t.name),9,T)):d("",!0)]))),128))]),F,e.currentRace.name?(r(),s("div",H,[a("h2",null,o(e.currentRace.name),1),a("img",{src:e.currentRace.subraces[0].image,alt:e.currentRace.name,class:"raceimage"},null,8,L),a("div",{innerHTML:e.marked.parse(e.currentRace.description)},null,8,M),(r(!0),s(h,null,u(e.currentRace.subraces,(t,m)=>(r(),s("div",{class:"subrace",key:t.id},[t.name!=="default"?(r(),s("h3",C,o(t.name),1)):d("",!0),t.image&&m!==0?(r(),s("img",{key:1,src:t.image,alt:t.name,class:"raceimage"},null,8,A)):d("",!0),a("div",{innerHTML:e.marked.parse(t.description)},null,8,D),a("ul",null,[(r(!0),s(h,null,u(e.currentRace.traits,l=>(r(),s("li",{key:l.name},[typeof l=="string"?(r(),s("div",{key:0,innerHTML:e.marked.parse(l)},null,8,R)):(r(),s("div",N,[a("strong",null,o(l.name),1),a("span",{innerHTML:e.marked.parse(l.description)},null,8,P)]))]))),128)),(r(!0),s(h,null,u(t.traits,l=>(r(),s("li",{key:l.name},[typeof l=="string"?(r(),s("div",{key:0,innerHTML:e.marked.parse(l)},null,8,V)):(r(),s("div",$,[a("strong",null,o(l.name),1),a("span",{innerHTML:e.marked.parse(l.description)},null,8,W)]))]))),128))])]))),128))])):d("",!0),E,G,O,a("div",U,[I,a("div",Y,[w(c,{modelValue:e.ageFilter,"onUpdate:modelValue":n[0]||(n[0]=t=>e.ageFilter=t),placeholder:"Type to Search"},null,8,["modelValue"])])]),a("table",j,[a("thead",null,[(r(!0),s(h,null,u(e.ageFields,t=>(r(),s("th",{key:t.key},[a("button",{onClick:m=>e.changeAgeSort(t),class:"tablebutton"},[b(o(t.name)+" ",1),e.ageSortBy===t.key&&e.ageSortDesc?(r(),s("span",z,"\u2193")):d("",!0),e.ageSortBy===t.key&&!e.ageSortDesc?(r(),s("span",J,"\u2191")):d("",!0)],8,q)]))),128))]),a("tbody",null,[(r(!0),s(h,null,u(e.filterage,t=>(r(),s("tr",{key:t.name},[a("td",null,o(t.name),1),a("td",null,o(t.puberty),1),a("td",null,o(t.sexualmaturity),1),a("td",null,o(t.mentalmaturity),1),a("td",null,o(t.middleage),1),a("td",null,o(t.oldage),1),a("td",null,o(t.averagelifespan),1),a("td",null,o(t.maxage),1)]))),128))])]),K,Q,X,a("div",Z,[x,a("div",ee,[w(c,{modelValue:e.hwFilter,"onUpdate:modelValue":n[1]||(n[1]=t=>e.hwFilter=t),placeholder:"Type to Search"},null,8,["modelValue"])])]),a("table",te,[a("thead",null,[a("tr",null,[(r(!0),s(h,null,u(e.hwFields,t=>(r(),s("th",{key:t.key},[a("button",{onClick:m=>e.changeHWSort(t),class:"tablebutton"},[b(o(t.name)+" ",1),e.hwSortBy===t.key&&e.hwSortDesc?(r(),s("span",re,"\u2193")):d("",!0),e.hwSortBy===t.key&&!e.hwSortDesc?(r(),s("span",se,"\u2191")):d("",!0)],8,ae)]))),128))])]),a("tbody",null,[(r(!0),s(h,null,u(e.filterhw,t=>(r(),s("tr",{key:t.name},[a("td",null,o(t.name),1),a("td",null,o(t.averageheight),1),a("td",null,o(t.baseheight),1),a("td",null,o(t.heightroll),1),a("td",null,o(t.averageweight),1),a("td",null,o(t.baseweight),1),a("td",null,o(t.weightroll),1)]))),128))])])])}const le=v(B,[["render",ne]]);export{le as default};
