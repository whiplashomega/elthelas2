import{H as W,J as q,j as x,s as $,B as K,k as Q,m as z,f as Y,_ as Z,g as k,o as u,c as d,a as t,e as l,l as y,C as M,A as ee,t as n,F as D,r as A,h as _,w as C,G as b,d as f,O as te,v as se,b as V}from"./index.js";import{c as T}from"./creaturecalc.js";const oe={name:"",tags:"",size:"",cr:"",type:"",subtype:"",alignment:"",ac:"",acdesc:"",hp:"",hpdesc:"",speed:"",str:"",dex:"",con:"",int:"",wis:"",cha:"",stats:[0,0,0,0,0,0],skills:"",saves:"",senses:"",damageimmunities:"",conditionimmunities:"",damageresistances:"",languages:"",locations:"",latlong:"",description:""},ne=[{cr:0,xp:10},{cr:.125,xp:25},{cr:.25,xp:50},{cr:.5,xp:100},{cr:1,xp:200},{cr:2,xp:450},{cr:3,xp:700},{cr:4,xp:1100},{cr:5,xp:1800},{cr:6,xp:2300},{cr:7,xp:2900},{cr:8,xp:3900},{cr:9,xp:5e3},{cr:10,xp:5900},{cr:11,xp:7200},{cr:12,xp:8400},{cr:13,xp:1e4},{cr:14,xp:11500},{cr:15,xp:13e3},{cr:16,xp:15e3},{cr:17,xp:18e3},{cr:18,xp:2e4},{cr:19,xp:22e3},{cr:20,xp:25e3},{cr:21,xp:33e3},{cr:22,xp:41e3},{cr:23,xp:5e4},{cr:24,xp:62e3},{cr:26,xp:9e4},{cr:30,xp:155e3}],le={setup(){const e=W(),s=q(),i=x(),{creatures:r}=$(e),{charlevel:h,accalc:c,getSpeedStat:a,getStatTotal:p,getStatMod:m,getSaveMod:v,getSkillMod:w,getHPTotal:B,getAttackBonus:o,getDamageBonus:g,totalslots:S,getInitMod:I,getCharacter:N,characters:P}=$(s),{loggedin:E,isLoggedIn:L,isAdmin:U,getUserInfo:j}=i,{getFromServer:F,loadChar:H,selCharacter:R}=s,{getCreature:O,saveNewCreature:X,deleteCreature:G,getAllCreatures:J}=e;return J(),K({title:"Encounter Runner"}),{creatures:r,charlevel:h,accalc:c,getSpeedStat:a,getStatTotal:p,getStatMod:m,getSaveMod:v,getSkillMod:w,getHPTotal:B,getAttackBonus:o,getDamageBonus:g,totalslots:S,getInitMod:I,curcharacter:N,characters:P,token:E,loggedin:L,admin:U,userinfo:j,getFromServer:F,loadChar:H,selCharacter:R,getCreature:O,saveNewCreature:X,deleteCreature:G,creaturecalc:T}},props:{creArray:Array,charArray:Array},components:{modal:Q},computed:{filteredcreatures(){let e=this;return this.creatures.filter(s=>{var i=e.creaturestable.filterValue.split(" ");let r=!0;return e.typeFilter!==""&&s.type!==e.typeFilter&&(r=!1),i.forEach(h=>{let c=e.creaturestable.filterBy.some(function(a){for(var p in s)if(a===p&&s[p].toString().toLowerCase().includes(h.toLowerCase()))return!0});e.creaturestable.filterValue&&!c&&(r=!1)}),!!r}).sort((s,i)=>s[this.creaturestable.sortBy]>i[this.creaturestable.sortBy]&&this.creaturestable.sortDesc===!1||s[this.creaturestable.sortBy]<i[this.creaturestable.sortBy]&&this.creaturestable.sortDesc===!0?1:-1)},statBlocks(){let e=[];return this.encountercreatures.forEach(s=>{s.ispc||e.findIndex(r=>r.name===s.name)===-1&&e.push(s)}),e},encountercreaturesinit(){return this.encountercreatures.sort((e,s)=>e.init>s.init?-1:1)},encounterlink(){return"/tools/runner/"+this.encountercreatures.map(e=>e.name.replace(/ /g,"").toLowerCase()).join("&")}},data(){return{creaturestable:{fields:[{key:"name",label:"Name",sortable:!0},{key:"size",label:"Size",sortable:!0},{key:"cr",label:"CR",sortable:!0},{key:"type",label:"Type",sortable:!0},{key:"subtype",label:"Subtype",sortable:!0},{key:"alignment",label:"Alignment",sortable:!0}],filterValue:"",sortBy:"name",sortDesc:!1,filterBy:["name","size","cr","subtype","alignment"],modalInfo:{...oe}},modalProps:{isActive:!1},typeFilter:"",nextIndex:0,partylevel:1,partysize:4,difficulty:"",xpvalue:0,terrain:1,adjustedxpvalue:0,aoe:!1,comp:this,encountercreatures:[]}},methods:{del(e){confirm("are you sure you want to delete "+e.name+"? It cannot be recovered if you do.")+this.admin&&this.deleteCreature(e._id)},edit(e){confirm("are you sure you want to edit "+e.name+"?")+this.admin&&this.$router.push("/tools/creaturebuilder/"+e._id)},xpByCR(e){return ne.find(s=>s.cr===e).xp},calculateDifficulty(){for(var e=[25,50,75,125,250,300,350,450,550,600,800,1e3,1100,1250,1400,1600,2e3,2100,2400,2800],s=[50,100,150,250,500,600,750,900,1100,1200,1600,2e3,2200,2500,2800,3200,3900,4200,4900,5700],i=[75,150,225,375,750,900,1100,1400,1600,1900,2400,3e3,3400,3800,4300,4800,5900,6300,7300,8500],r=[100,200,400,500,1100,1400,1700,2100,2400,2800,3600,4500,5100,5700,6400,7200,8800,9500,10900,12700],h=e[this.partylevel-1]*this.partysize,c=s[this.partylevel-1]*this.partysize,a=i[this.partylevel-1]*this.partysize,p=r[this.partylevel-1]*this.partysize,m=0,v=0;v<this.encountercreatures.length;v++)this.encountercreatures[v].ispc||(m+=this.xpByCR(this.encountercreatures[v].cr));this.xpvalue=m,m*=4/this.partysize,m*=1+this.encountercreatures.length*.1,m*=this.terrain*(1+.05*this.aoe*this.partysize),this.adjustedxpvalue=Math.floor(m),m<h?this.difficulty="too easy":m<c?this.difficulty="easy":m<a?this.difficulty="medium":m<p?this.difficulty="hard":m<p*1.5?this.difficulty="deadly":this.difficulty="nigh on impossible"},async addToEncounter(e){e.description||(e=await this.getCreature(e._id));var s=Object.assign({},e);s.id=this.nextIndex,s.ispc=!1,this.nextIndex++,s.currenthp=T.hp(s),s.descr=z.parse(s.description),s.mini="",s.initMod=T.statMod(s,s.stats[1]),s.advantage=!1,s.disadvantage=!1,s.init=0,this.encountercreatures.push(s),this.calculateDifficulty()},removeCreature(e){this.encountercreatures=this.encountercreatures.filter(s=>s.id!==e.id),this.calculateDifficulty()},createSkillsArray(e){return e.skills.reduce((s,i)=>(i.prof>0&&s.push("+"+this.getSkillMod(i)+" "+i.name),s),[])},createDescription(e){let s=this,i=e.attacks.reduce((c,a)=>{let p="**"+a.name+":** "+a.type+", range "+a.range+", ";return s.getAttackBonus(a)>-1&&(p+="+"),p+=s.getAttackBonus(a)+" to hit ("+a.damage,s.getDamageBonus(a)>0?p+=" +"+s.getDamageBonus(a):s.getDamageBonus(a)<0&&(p+=" -"+s.getDamageBonus(a)),p+=" "+a.dtype+" damage ",a.damage2!==""&&(p+=" + "+a.damage2+" "+a.dtype2+" damage"),c+p+`

`},""),r=(c,a)=>c+"**"+a.name+":** "+a.description+`

`;i=e.feats.reduce(r,i),i=e.charclasses.reduce((c,a)=>(c=a.thisclass.features.reduce(r,c),c=a.selsubclass.features.reduce(r,c),c),i),e.race.traits&&(i=e.race.traits.reduce(r,i)),i=e.features.reduce(r,i);let h=`**Spells**

`;for(let c in e.spells)e.spells[c].length>0&&(h+="**"+c+"("+this.totalslots(c)+" slots):** "+e.spells[c].reduce((a,p)=>a+p.title+(p.prepared?"*":"")+", ","")+`

`);return h.length>14&&(i+=h),z.parse(i)},buildCreature(e,s){this.setCharacter(e);let i={id:this.nextIndex,name:e.name,size:"medium",type:"humanoid",ispc:s,subtype:e.race.singular,alignment:e.alignment,acdesc:this.accalc,speed:this.getSpeedStat(0)+" ft",str:this.getStatTotal(0)+0,dex:this.getStatTotal(1),con:this.getStatTotal(2),int:this.getStatTotal(3),wis:this.getStatTotal(4),cha:this.getStatTotal(5),strmod:this.getStatMod(0),dexmod:this.getStatMod(1),conmod:this.getStatMod(2),intmod:this.getStatMod(3),wismod:this.getStatMod(4),chamod:this.getStatMod(5),saves:"+"+this.getSaveMod(0)+" strength +"+this.getSaveMod(1)+" dexterity +"+this.getSaveMod(2)+" constitution +"+this.getSaveMod(3)+" intelligence +"+this.getSaveMod(4)+" wisdom +"+this.getSaveMod(5)+" charisma.",skills:this.createSkillsArray(e),senses:"",damageresistances:"",damageimmunities:"",conditionimmunities:"",languages:e.proficiencies,cr:this.charlevel(e)-1,descr:this.createDescription(e),mini:"",currenthp:e.hpcurrent,hpdesc:this.getHPTotal,initMod:this.getInitMod,advantage:!1,disadvantage:!1,init:0};this.encountercreatures.push(i),this.nextIndex++,this.calculateDifficulty()},async selCharacter(e){await this.loadChar({character:e,comp:this,passthrough:!0}).then(()=>{this.buildCreature(e,!1),this.$root.$emit("bv::hide::modal","servermodal")})},roll(){let e=[];this.encountercreatures.forEach(s=>{let i=e.findIndex(r=>r.name===s.name);if(i!==-1)s.init=e[i].init;else{let r=Number(s.initMod)+Math.floor(Math.random()*20)+1,h=Number(s.initMod)+Math.floor(Math.random()*20)+1;s.advantage&&!s.disadvantage?r>h?s.init=r:s.init=h:!s.advantage&&s.disadvantage?r<h?s.init=r:s.init=h:s.init=r,e.push(s)}})},getCreaturesOnMount(e){this.$store.dispatch("getAllCreatures").then(()=>{for(var s=0;s<e.length;s++){var i=this.creatures.filter(function(r){return r.name.toLowerCase().replace(/ /g,"")===e[s].toLowerCase().replace(/ /g,"")});i.length>0&&this.addToEncounter(i[0])}this.calculateDifficulty()})},async loadCharacters(e){e.forEach(s=>{this.buildCreature(s,!0)})}},mounted(){if(this.encountercreatures=[],this.$route.params.encounter){console.log("there is an encounter parameter");var e=this.$route.params.encounter.split("&");this.getCreaturesOnMount(e)}else typeof this.creArray<"u"&&this.creArray.length>0&&(console.log("running in campaign setting"),e=this.creArray,this.getCreaturesOnMount(e));typeof this.charArray<"u"&&this.charArray.length>0&&(this.loadCharacters(this.charArray),this.partysize=this.charArray.length,this.partylevel=Y.charlevel(this.charArray[0]))}},ie={class:"col-sm-12"},ae={class:"col-sm-9"},re={class:"row"},ue={class:"col-sm-2"},de=V('<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option>',10),ce=[de],pe={class:"col-sm-2"},he=V('<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option>',20),me=[he],fe={class:"col-sm-2"},ve=["value"],ge=t("option",{value:1},"None",-1),ye=["value"],_e={class:"col-sm-2"},be={class:"col-sm-4"},ke=t("br",null,null,-1),Ce={title:"This is the total XP of the monsters in this encounter, before adjustment."},Se={title:"After adjustment, this is the amount of XP you should award to players."},Me={class:"row"},De=t("i",{class:"handle"},"\u2190\u2192",-1),Ae={class:"creature"},we={key:0},Be={class:"row"},Te={class:"col-9"},$e=t("strong",null,"Armor Class:",-1),ze=t("br",null,null,-1),Ve=t("strong",null,"Protection Class:",-1),Ie=t("br",null,null,-1),Ne=t("strong",null,"Speed:",-1),Pe={class:"col-3"},Ee=["src","alt"],Le={class:"table table-striped"},Ue=t("thead",null,[t("tr",null,[t("th",null,"STR"),t("th",null,"DEX"),t("th",null,"CON"),t("th",null,"INT"),t("th",null,"WIS"),t("th",null,"CHA")])],-1),je={key:0},Fe={key:0},He={key:0},Re={key:0},Oe={key:0},Xe={key:0},Ge={"data-v-if":"creature.saves"},Je=t("strong",null,"Saving Throws:",-1),We=t("br",null,null,-1),qe={key:0},xe=t("strong",null,"Skills:",-1),Ke=t("br",null,null,-1),Qe=t("strong",null,"Senses:",-1),Ye=t("br",null,null,-1),Ze={key:1},et=t("strong",null,"Damage Resistances:",-1),tt=t("br",null,null,-1),st={key:2},ot=t("strong",null,"Damage Immunities:",-1),nt=t("br",null,null,-1),lt={key:3},it=t("strong",null,"Damage Vulnerabilities:",-1),at=t("br",null,null,-1),rt={key:4},ut=t("strong",null,"Condition Immunities:",-1),dt=t("br",null,null,-1),ct=t("strong",null,"Languages:",-1),pt=t("br",null,null,-1),ht=t("strong",null,"Challenge:",-1),mt=["innerHTML"],ft=t("option",{value:""},"All",-1),vt=t("option",{value:"aberration"},"Aberration",-1),gt=t("option",{value:"beast"},"Beast",-1),yt=t("option",{value:"celestial"},"Celestial",-1),_t=t("option",{value:"construct"},"Construct",-1),bt=t("option",{value:"dragon"},"Dragon",-1),kt=t("option",{value:"elemental"},"Elemental",-1),Ct=t("option",{value:"fiend"},"Fiend",-1),St=t("option",{value:"giant"},"Giant",-1),Mt=t("option",{value:"humanoid"},"Humanoid",-1),Dt=t("option",{value:"monstrosity"},"Monstrosity",-1),At=t("option",{value:"plant"},"Plant",-1),wt=t("option",{value:"ooze"},"Ooze",-1),Bt=t("option",{value:"undead"},"Undead",-1),Tt=[ft,vt,gt,yt,_t,bt,kt,Ct,St,Mt,Dt,At,wt,Bt],$t={class:"col-sm-6"},zt=["disabled"],Vt={class:"table table-striped table-responsive",id:"creaturetable"},It=["onClick"],Nt=["onClick"],Pt=["onClick"],Et={id:"inithptracker"},Lt=["href"],Ut={class:"row"},jt={class:"col-sm-5"},Ft={class:"col-sm-2"},Ht={class:"col-sm-5"},Rt={class:"row"},Ot={class:"col-sm-3"},Xt=["onUpdate:modelValue"],Gt={class:"col-sm-3"},Jt={class:"col-sm-3"},Wt=["onClick"],qt={class:"table table-striped"},xt=t("tr",null,[t("th",null,"Character Name"),t("th",null,"Level"),t("th",null,"-")],-1),Kt=["onClick"];function Qt(e,s,i,r,h,c){const a=k("b-col"),p=k("router-link"),m=k("b-form-input"),v=k("b-input-group"),w=k("b-row"),B=k("modal");return u(),d("div",ie,[t("div",ae,[t("div",re,[t("div",ue,[t("label",null,[l(" Party Size "),y(t("select",{class:"charsheet-text","onUpdate:modelValue":s[0]||(s[0]=o=>e.partysize=o),onChange:s[1]||(s[1]=o=>e.calculateDifficulty())},ce,544),[[M,e.partysize]])])]),t("div",pe,[t("label",null,[l(" Average Level "),y(t("select",{class:"charsheet-text","onUpdate:modelValue":s[2]||(s[2]=o=>e.partylevel=o),onChange:s[3]||(s[3]=o=>e.calculateDifficulty())},me,544),[[M,e.partylevel]])])]),t("div",fe,[t("label",null,[l(" Terrain "),y(t("select",{class:"charsheet-text","onUpdate:modelValue":s[4]||(s[4]=o=>e.terrain=o),onChange:s[5]||(s[5]=o=>e.calculateDifficulty())},[t("option",{value:.75},"Player Advantage",8,ve),ge,t("option",{value:1.25},"Monster Advantage",8,ye)],544),[[M,e.terrain]])])]),t("div",_e,[t("label",null,[l(" Monster Has Powerful AoE "),y(t("input",{type:"checkbox",class:"checkbox","onUpdate:modelValue":s[6]||(s[6]=o=>e.aoe=o),onChange:s[7]||(s[7]=o=>e.calculateDifficulty())},null,544),[[ee,e.aoe]])])]),t("div",be,[l(" Encounter Difficulty: "+n(e.difficulty)+" ",1),ke,t("span",Ce,"XP: "+n(e.xpvalue),1),l("\xA0\xA0 "),t("span",Se,"Adjusted XP: "+n(e.adjustedxpvalue),1)])]),t("div",Me,[(u(!0),d(D,null,A(e.statBlocks,o=>(u(),d("div",{key:o.id,class:"col-sm-4"},[t("h2",null,[l(n(o.name)+" ",1),De]),t("div",Ae,[t("h4",null,[l(n(o.size)+" "+n(o.type),1),o.subtype?(u(),d("span",we," ("+n(o.subtype)+")",1)):f("",!0),l(", "+n(o.alignment),1)]),t("div",Be,[t("div",Te,[$e,l(" "+n(o.ac)+" ("+n(o.acdesc)+") ",1),ze,Ve,l(" "+n(o.pc),1),Ie,Ne,l(" "+n(o.speed),1)]),t("div",Pe,[y(t("img",{src:o.image,alt:o.name},null,8,Ee),[[te,o.image]])])]),t("table",Le,[Ue,t("tbody",null,[t("tr",null,[t("td",null,[l(n(o.stats[0])+" (",1),e.creaturecalc.statMod(o,0)>0?(u(),d("span",je,"+")):f("",!0),l(n(e.creaturecalc.statMod(o,0))+")",1)]),t("td",null,[l(n(o.stats[1])+" (",1),e.creaturecalc.statMod(o,1)>0?(u(),d("span",Fe,"+")):f("",!0),l(n(e.creaturecalc.statMod(o,1))+")",1)]),t("td",null,[l(n(o.stats[2])+" (",1),e.creaturecalc.statMod(o,2)>0?(u(),d("span",He,"+")):f("",!0),l(n(e.creaturecalc.statMod(o,2))+")",1)]),t("td",null,[l(n(o.stats[3])+" (",1),e.creaturecalc.statMod(o,3)>0?(u(),d("span",Re,"+")):f("",!0),l(n(e.creaturecalc.statMod(o,3))+")",1)]),t("td",null,[l(n(o.stats[4])+" (",1),e.creaturecalc.statMod(o,4)>0?(u(),d("span",Oe,"+")):f("",!0),l(n(e.creaturecalc.statMod(o,4))+")",1)]),t("td",null,[l(n(o.stats[5])+" (",1),e.creaturecalc.statMod(o,5)>0?(u(),d("span",Xe,"+")):f("",!0),l(n(e.creaturecalc.statMod(o,5))+")",1)])])])]),t("p",null,[t("span",Ge,[Je,l(" "+n(o.saves)+" ",1),We]),o.skills.length>0?(u(),d("span",qe,[xe,l(" "+n(o.skills.join(", "))+" ",1),Ke])):f("",!0),Qe,l(" "+n(o.senses)+" ",1),Ye,o.damageresistances?(u(),d("span",Ze,[et,l(" "+n(o.damageresistances)+" ",1),tt])):f("",!0),o.damageimmunities?(u(),d("span",st,[ot,l(" "+n(o.damageimmunities)+" ",1),nt])):f("",!0),o.damagevulnerabilities?(u(),d("span",lt,[it,l(" "+n(o.damagevulnerabilities),1),at])):f("",!0),o.conditionimmunities?(u(),d("span",rt,[ut,l(" "+n(o.conditionimmunities)+" ",1),dt])):f("",!0),ct,l(" "+n(o.languages)+" ",1),pt,ht,l(" "+n(o.cr),1)]),t("div",{innerHTML:o.descr},null,8,mt)])]))),128))]),_(w,null,{default:C(()=>[_(a,{md:"2"},{default:C(()=>[t("label",null,[l(" Type "),y(t("select",{"onUpdate:modelValue":s[8]||(s[8]=o=>e.typeFilter=o),class:"form-control"},Tt,512),[[M,e.typeFilter]])])]),_:1}),t("div",$t,[_(p,{to:"/tools/creaturebuilder",class:"btn btn-primary",style:{"margin-top":"25px"}},{default:C(()=>[l("New Creature")]),_:1})]),_(a,{md:"4",class:"my-1"},{default:C(()=>[_(v,null,{default:C(()=>[_(m,{modelValue:e.creaturestable.filterValue,"onUpdate:modelValue":s[9]||(s[9]=o=>e.creaturestable.filterValue=o),placeholder:"Type to Search"},null,8,["modelValue"]),t("button",{class:"btn btn-primary",disabled:!e.creaturestable.filterValue,onClick:s[10]||(s[10]=o=>e.creaturestable.filterValue="")},"Clear",8,zt)]),_:1})]),_:1})]),_:1}),t("table",Vt,[t("thead",null,[t("tr",null,[t("th",null,[t("a",{href:"#",onClick:s[11]||(s[11]=b(o=>{e.creaturestable.sortBy="name",e.creaturestable.sortDesc=!e.creaturestable.sortDesc},["stop"]))},"Name")]),t("th",null,[t("a",{href:"#",onClick:s[12]||(s[12]=b(o=>{e.creaturestable.sortBy="size",e.creaturestable.sortDesc=!e.creaturestable.sortDesc},["stop"]))},"Size")]),t("th",null,[t("a",{href:"#",onClick:s[13]||(s[13]=b(o=>{e.creaturestable.sortBy="cr",e.creaturestable.sortDesc=!e.creaturestable.sortDesc},["stop"]))},"CR")]),t("th",null,[t("a",{href:"#",onClick:s[14]||(s[14]=b(o=>{e.creaturestable.sortBy="type",e.creaturestable.sortDesc=!e.creaturestable.sortDesc},["stop"]))},"Type")]),t("th",null,[t("a",{href:"#",onClick:s[15]||(s[15]=b(o=>{e.creaturestable.sortBy="subtype",e.creaturestable.sortDesc=!e.creaturestable.sortDesc},["stop"]))},"Subtype")]),t("th",null,[t("a",{href:"#",onClick:s[16]||(s[16]=b(o=>{e.creaturestable.sortBy="alignment",e.creaturestable.sortDesc=!e.creaturestable.sortDesc},["stop"]))},"Alignment")])])]),t("tbody",null,[(u(!0),d(D,null,A(e.filteredcreatures,(o,g)=>(u(),d("tr",{key:o._id},[t("td",null,[t("span",null,[t("a",{href:"#",onClick:b(S=>e.addToEncounter(o,g,S.target),["stop"])},n(o.name),9,It),e.admin?(u(),d("button",{key:0,class:"btn btn-warning btn-sm",onClick:S=>e.edit(o)},"\u270E",8,Nt)):f("",!0),e.admin?(u(),d("button",{key:1,class:"btn btn-sm btn-danger",onClick:S=>e.del(o)},"X",8,Pt)):f("",!0)])]),t("td",null,n(o.size),1),t("td",null,n(o.cr),1),t("td",null,n(o.type),1),t("td",null,n(o.subtype),1),t("td",null,n(o.alignment),1)]))),128))])])]),t("div",Et,[t("p",null,[t("a",{href:e.encounterlink},"Link to this Encounter",8,Lt)]),(u(!0),d(D,null,A(e.encountercreaturesinit,o=>(u(),d("div",{key:o.id,class:"form-inline form-row"},[t("div",Ut,[t("div",jt,n(o.name)+"\xA0",1),t("div",Ft,"AC "+n(o.ac),1),t("div",Ht,n(o.speed),1)]),t("div",Rt,[t("div",Ot,[y(t("input",{type:"number","onUpdate:modelValue":g=>o.currenthp=g,style:{"font-size":"0.7rem"},class:"form-control form-control-sm"},null,8,Xt),[[se,o.currenthp]])]),t("div",Gt," / "+n(e.creaturecalc.hp(o)),1),t("div",Jt,[t("button",{class:"close",type:"button",onClick:g=>e.removeCreature(o)},"\xD7",8,Wt)])])]))),128))]),_(B,{id:"servermodal",title:"Load File from Server",modalProps:e.modalProps},{default:C(()=>[t("table",qt,[xt,(u(!0),d(D,null,A(e.characters,o=>(u(),d("tr",{key:o._id},[t("td",null,[t("a",{class:"clickable",onClick:g=>e.selCharacter(o)},n(o.name),9,Kt)]),t("td",null,n(e.charlevel(o)),1)]))),128))])]),_:1},8,["modalProps"])])}const es=Z(le,[["render",Qt]]);export{es as default};
