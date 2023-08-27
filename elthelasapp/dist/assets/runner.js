import{I as J,Q as K,k as Z,s as $,B as x,l as ee,m as N,f as te,_ as se,g as k,o as u,c as d,a as t,e as l,n as v,E as y,C as oe,t as n,F as A,r as w,h as b,w as M,H as C,d as f,R as ne,v as F,b as I}from"./index.js";import{c as z}from"./creaturecalc.js";const le={name:"",tags:"",size:"",cr:"",type:"",subtype:"",alignment:"",ac:"",acdesc:"",hp:"",hpdesc:"",speed:"",str:"",dex:"",con:"",int:"",wis:"",cha:"",stats:[0,0,0,0,0,0],skills:"",saves:"",senses:"",damageimmunities:"",conditionimmunities:"",damageresistances:"",languages:"",locations:"",latlong:"",description:""},ie=[{cr:0,xp:10},{cr:.125,xp:25},{cr:.25,xp:50},{cr:.5,xp:100},{cr:1,xp:200},{cr:2,xp:450},{cr:3,xp:700},{cr:4,xp:1100},{cr:5,xp:1800},{cr:6,xp:2300},{cr:7,xp:2900},{cr:8,xp:3900},{cr:9,xp:5e3},{cr:10,xp:5900},{cr:11,xp:7200},{cr:12,xp:8400},{cr:13,xp:1e4},{cr:14,xp:11500},{cr:15,xp:13e3},{cr:16,xp:15e3},{cr:17,xp:18e3},{cr:18,xp:2e4},{cr:19,xp:22e3},{cr:20,xp:25e3},{cr:21,xp:33e3},{cr:22,xp:41e3},{cr:23,xp:5e4},{cr:24,xp:62e3},{cr:26,xp:9e4},{cr:30,xp:155e3}];function D(e){return!isNaN(z.hp(e))}function B(e){return!(e.speed.includes("ft")||e.speed.includes("feet")||e.senses.includes("ft")||e.senses.includes("feet")||e.description.includes("ft")||e.description.includes("feet"))}const ae={setup(){const e=J(),s=K(),a=Z(),{creatures:r}=$(e),{charlevel:p,accalc:c,getSpeedStat:i,getStatTotal:h,getStatMod:m,getSaveMod:g,getSkillMod:V,getHPTotal:T,getAttackBonus:o,getDamageBonus:_,totalslots:S,getInitMod:P,getCharacter:U,characters:E}=$(s),{loggedin:L,isLoggedIn:R,isAdmin:H,getUserInfo:j}=a,{getFromServer:O,loadChar:X,selCharacter:Y}=s,{getCreature:G,saveNewCreature:Q,deleteCreature:W,getAllCreatures:q}=e;return q(),x({title:"Encounter Runner"}),{creatures:r,charlevel:p,accalc:c,getSpeedStat:i,getStatTotal:h,getStatMod:m,getSaveMod:g,getSkillMod:V,getHPTotal:T,getAttackBonus:o,getDamageBonus:_,totalslots:S,getInitMod:P,curcharacter:U,characters:E,token:L,loggedin:R,admin:H,userinfo:j,getFromServer:O,loadChar:X,selCharacter:Y,getCreature:G,saveNewCreature:Q,deleteCreature:W,creaturecalc:z}},props:{creArray:Array,charArray:Array},components:{modal:ee},computed:{convertedcount(){return this.creatures.filter(e=>D(e)).filter(e=>B(e)).length},metriccount(){return this.creatures.filter(e=>B(e)).length},validhpcount(){return this.creatures.filter(e=>D(e)).length},unconvertedcount(){return this.creatures.filter(e=>!D(e)).length},filteredcreatures(){return this.creatures.filter(e=>{var s=this.creaturestable.filterValue.split(" ");let a=!0;if(this.typeFilter!==""&&e.type!==this.typeFilter||this.sizeFilter!==""&&e.size!==this.sizeFilter||this.crFilterMin>e.cr||this.crFilterMax<e.cr)return!1;if(this.converted){if(this.converted==="Yes"&&!D(e))return!1;if(this.converted==="No"&&D(e))return!1}if(this.metric){if(this.metric==="Yes"&&!B(e))return!1;if(this.metric==="No"&&B(e))return!1}return s.forEach(r=>{let p=this.creaturestable.filterBy.some(function(c){for(var i in e)if(c===i&&e[i].toString().toLowerCase().includes(r.toLowerCase()))return!0});this.creaturestable.filterValue&&!p&&(a=!1)}),!!a}).sort((e,s)=>e[this.creaturestable.sortBy]>s[this.creaturestable.sortBy]&&this.creaturestable.sortDesc===!1||e[this.creaturestable.sortBy]<s[this.creaturestable.sortBy]&&this.creaturestable.sortDesc===!0?1:-1)},statBlocks(){let e=[];return this.encountercreatures.forEach(s=>{s.ispc||e.findIndex(r=>r.name===s.name)===-1&&e.push(s)}),e},encountercreaturesinit(){return this.encountercreatures.sort((e,s)=>e.init>s.init?-1:1)},encounterlink(){return"/tools/runner/"+this.encountercreatures.map(e=>e.name.replace(/ /g,"").toLowerCase()).join("&")}},data(){return{creaturestable:{fields:[{key:"name",label:"Name",sortable:!0},{key:"size",label:"Size",sortable:!0},{key:"cr",label:"CR",sortable:!0},{key:"type",label:"Type",sortable:!0},{key:"subtype",label:"Subtype",sortable:!0},{key:"alignment",label:"Alignment",sortable:!0}],filterValue:"",sortBy:"name",sortDesc:!1,filterBy:["name","size","cr","subtype","alignment"],modalInfo:{...le},notupdatedonly:!1},modalProps:{isActive:!1},typeFilter:"",sizeFilter:"",crFilterMin:0,crFilterMax:40,nextIndex:0,partylevel:1,partysize:4,difficulty:"",xpvalue:0,terrain:1,adjustedxpvalue:0,aoe:!1,comp:this,encountercreatures:[],converted:!1,metric:!1}},methods:{del(e){confirm("are you sure you want to delete "+e.name+"? It cannot be recovered if you do.")+this.admin&&this.deleteCreature(e._id)},edit(e){confirm("are you sure you want to edit "+e.name+"?")+this.admin&&this.$router.push("/tools/creaturebuilder/"+e._id)},xpByCR(e){return ie.find(s=>s.cr===e).xp},calculateDifficulty(){for(var e=[25,50,75,125,250,300,350,450,550,600,800,1e3,1100,1250,1400,1600,2e3,2100,2400,2800],s=[50,100,150,250,500,600,750,900,1100,1200,1600,2e3,2200,2500,2800,3200,3900,4200,4900,5700],a=[75,150,225,375,750,900,1100,1400,1600,1900,2400,3e3,3400,3800,4300,4800,5900,6300,7300,8500],r=[100,200,400,500,1100,1400,1700,2100,2400,2800,3600,4500,5100,5700,6400,7200,8800,9500,10900,12700],p=e[this.partylevel-1]*this.partysize,c=s[this.partylevel-1]*this.partysize,i=a[this.partylevel-1]*this.partysize,h=r[this.partylevel-1]*this.partysize,m=0,g=0;g<this.encountercreatures.length;g++)this.encountercreatures[g].ispc||(m+=this.xpByCR(this.encountercreatures[g].cr));this.xpvalue=m,m*=4/this.partysize,m*=1+this.encountercreatures.length*.1,m*=this.terrain*(1+.05*this.aoe*this.partysize),this.adjustedxpvalue=Math.floor(m),m<p?this.difficulty="too easy":m<c?this.difficulty="easy":m<i?this.difficulty="medium":m<h?this.difficulty="hard":m<h*1.5?this.difficulty="deadly":this.difficulty="nigh on impossible"},async addToEncounter(e){e=await this.getCreature(e._id);var s=Object.assign({},e);s.id=this.nextIndex,s.ispc=!1,this.nextIndex++,s.currenthp=z.hp(s),s.descr=N.parse(s.description),s.mini="",s.initMod=z.statMod(s,s.stats[1]),s.advantage=!1,s.disadvantage=!1,s.init=0,this.encountercreatures.push(s),this.calculateDifficulty()},removeCreature(e){this.encountercreatures=this.encountercreatures.filter(s=>s.id!==e.id),this.calculateDifficulty()},createSkillsArray(e){return e.skills.reduce((s,a)=>(a.prof>0&&s.push("+"+this.getSkillMod(a)+" "+a.name),s),[])},createDescription(e){let s=this,a=e.attacks.reduce((c,i)=>{let h="**"+i.name+":** "+i.type+", range "+i.range+", ";return s.getAttackBonus(i)>-1&&(h+="+"),h+=s.getAttackBonus(i)+" to hit ("+i.damage,s.getDamageBonus(i)>0?h+=" +"+s.getDamageBonus(i):s.getDamageBonus(i)<0&&(h+=" -"+s.getDamageBonus(i)),h+=" "+i.dtype+" damage ",i.damage2!==""&&(h+=" + "+i.damage2+" "+i.dtype2+" damage"),c+h+`

`},""),r=(c,i)=>c+"**"+i.name+":** "+i.description+`

`;a=e.feats.reduce(r,a),a=e.charclasses.reduce((c,i)=>(c=i.thisclass.features.reduce(r,c),c=i.selsubclass.features.reduce(r,c),c),a),e.race.traits&&(a=e.race.traits.reduce(r,a)),a=e.features.reduce(r,a);let p=`**Spells**

`;for(let c in e.spells)e.spells[c].length>0&&(p+="**"+c+"("+this.totalslots(c)+" slots):** "+e.spells[c].reduce((i,h)=>i+h.title+(h.prepared?"*":"")+", ","")+`

`);return p.length>14&&(a+=p),N.parse(a)},buildCreature(e,s){this.setCharacter(e);let a={id:this.nextIndex,name:e.name,size:"medium",type:"humanoid",ispc:s,subtype:e.race.singular,alignment:e.alignment,acdesc:this.accalc,speed:this.getSpeedStat(0)+" ft",str:this.getStatTotal(0)+0,dex:this.getStatTotal(1),con:this.getStatTotal(2),int:this.getStatTotal(3),wis:this.getStatTotal(4),cha:this.getStatTotal(5),strmod:this.getStatMod(0),dexmod:this.getStatMod(1),conmod:this.getStatMod(2),intmod:this.getStatMod(3),wismod:this.getStatMod(4),chamod:this.getStatMod(5),saves:"+"+this.getSaveMod(0)+" strength +"+this.getSaveMod(1)+" dexterity +"+this.getSaveMod(2)+" constitution +"+this.getSaveMod(3)+" intelligence +"+this.getSaveMod(4)+" wisdom +"+this.getSaveMod(5)+" charisma.",skills:this.createSkillsArray(e),senses:"",damageresistances:"",damageimmunities:"",conditionimmunities:"",languages:e.proficiencies,cr:this.charlevel(e)-1,descr:this.createDescription(e),mini:"",currenthp:e.hpcurrent,hpdesc:this.getHPTotal,initMod:this.getInitMod,advantage:!1,disadvantage:!1,init:0};this.encountercreatures.push(a),this.nextIndex++,this.calculateDifficulty()},async selCharacter(e){await this.loadChar({character:e,comp:this,passthrough:!0}).then(()=>{this.buildCreature(e,!1),this.$root.$emit("bv::hide::modal","servermodal")})},roll(){let e=[];this.encountercreatures.forEach(s=>{let a=e.findIndex(r=>r.name===s.name);if(a!==-1)s.init=e[a].init;else{let r=Number(s.initMod)+Math.floor(Math.random()*20)+1,p=Number(s.initMod)+Math.floor(Math.random()*20)+1;s.advantage&&!s.disadvantage?r>p?s.init=r:s.init=p:!s.advantage&&s.disadvantage?r<p?s.init=r:s.init=p:s.init=r,e.push(s)}})},getCreaturesOnMount(e){this.$store.dispatch("getAllCreatures").then(()=>{for(var s=0;s<e.length;s++){var a=this.creatures.filter(function(r){return r.name.toLowerCase().replace(/ /g,"")===e[s].toLowerCase().replace(/ /g,"")});a.length>0&&this.addToEncounter(a[0])}this.calculateDifficulty()})},async loadCharacters(e){e.forEach(s=>{this.buildCreature(s,!0)})}},mounted(){if(this.encountercreatures=[],this.$route.params.encounter){console.log("there is an encounter parameter");var e=this.$route.params.encounter.split("&");this.getCreaturesOnMount(e)}else typeof this.creArray<"u"&&this.creArray.length>0&&(console.log("running in campaign setting"),e=this.creArray,this.getCreaturesOnMount(e));typeof this.charArray<"u"&&this.charArray.length>0&&(this.loadCharacters(this.charArray),this.partysize=this.charArray.length,this.partylevel=te.charlevel(this.charArray[0]))}},re={class:"col-sm-12"},ue={class:"col-sm-9"},de={class:"row"},ce={class:"col-sm-2"},he=I('<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option>',10),pe=[he],me={class:"col-sm-2"},fe=I('<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option>',20),ve=[fe],ge={class:"col-sm-2"},_e=["value"],ye=t("option",{value:1},"None",-1),be=["value"],Ce={class:"col-sm-2"},ke={class:"col-sm-4"},Me=t("br",null,null,-1),Se={title:"This is the total XP of the monsters in this encounter, before adjustment."},De={title:"After adjustment, this is the amount of XP you should award to players."},Ae={class:"row"},we=t("i",{class:"handle"},"\u2190\u2192",-1),Be={class:"creature"},ze={key:0},Ve={class:"row"},Te={class:"col-9"},Fe=t("strong",null,"Armor Class:",-1),$e=t("br",null,null,-1),Ne=t("strong",null,"Base HP:",-1),Ie=t("br",null,null,-1),Pe=t("strong",null,"Protection Points:",-1),Ue=t("br",null,null,-1),Ee=t("strong",null,"Speed:",-1),Le={class:"col-3"},Re=["src","alt"],He={class:"table table-striped"},je=t("thead",null,[t("tr",null,[t("th",null,"STR"),t("th",null,"DEX"),t("th",null,"CON"),t("th",null,"INT"),t("th",null,"WIS"),t("th",null,"CHA")])],-1),Oe={key:0},Xe={key:0},Ye={key:0},Ge={key:0},Qe={key:0},We={key:0},qe={"data-v-if":"creature.saves"},Je=t("strong",null,"Saving Throws:",-1),Ke=t("br",null,null,-1),Ze={key:0},xe=t("strong",null,"Skills:",-1),et=t("br",null,null,-1),tt=t("strong",null,"Senses:",-1),st=t("br",null,null,-1),ot={key:1},nt=t("strong",null,"Damage Resistances:",-1),lt=t("br",null,null,-1),it={key:2},at=t("strong",null,"Damage Immunities:",-1),rt=t("br",null,null,-1),ut={key:3},dt=t("strong",null,"Damage Vulnerabilities:",-1),ct=t("br",null,null,-1),ht={key:4},pt=t("strong",null,"Condition Immunities:",-1),mt=t("br",null,null,-1),ft=t("strong",null,"Languages:",-1),vt=t("br",null,null,-1),gt=t("strong",null,"Challenge:",-1),_t=["innerHTML"],yt=t("option",{value:""},"All",-1),bt=t("option",{value:"aberration"},"Aberration",-1),Ct=t("option",{value:"beast"},"Beast",-1),kt=t("option",{value:"celestial"},"Celestial",-1),Mt=t("option",{value:"construct"},"Construct",-1),St=t("option",{value:"dragon"},"Dragon",-1),Dt=t("option",{value:"elemental"},"Elemental",-1),At=t("option",{value:"fey"},"Fey",-1),wt=t("option",{value:"fiend"},"Fiend",-1),Bt=t("option",{value:"giant"},"Giant",-1),zt=t("option",{value:"humanoid"},"Humanoid",-1),Vt=t("option",{value:"monstrosity"},"Monstrosity",-1),Tt=t("option",{value:"plant"},"Plant",-1),Ft=t("option",{value:"ooze"},"Ooze",-1),$t=t("option",{value:"undead"},"Undead",-1),Nt=[yt,bt,Ct,kt,Mt,St,Dt,At,wt,Bt,zt,Vt,Tt,Ft,$t],It=t("br",null,null,-1),Pt=t("option",{value:""},"All",-1),Ut=t("option",{value:"tiny"},"tiny",-1),Et=t("option",{value:"small"},"small",-1),Lt=t("option",{value:"medium"},"medium",-1),Rt=t("option",{value:"large"},"large",-1),Ht=t("option",{value:"huge"},"huge",-1),jt=t("option",{value:"gargantuan"},"gargantuan",-1),Ot=t("option",{value:"colossal"},"colossal",-1),Xt=[Pt,Ut,Et,Lt,Rt,Ht,jt,Ot],Yt=t("br",null,null,-1),Gt=t("br",null,null,-1),Qt=t("br",null,null,-1),Wt={class:"col-2"},qt=t("br",null,null,-1),Jt=t("br",null,null,-1),Kt=t("br",null,null,-1),Zt={class:"col-sm-2"},xt=t("br",null,null,-1),es=t("option",{value:"Yes"},"Yes",-1),ts=t("option",{value:"No"},"No",-1),ss=t("option",{value:!1},"Any",-1),os=[es,ts,ss],ns=t("br",null,null,-1),ls=t("option",{value:"Yes"},"Yes",-1),is=t("option",{value:"No"},"No",-1),as=t("option",{value:!1},"Any",-1),rs=[ls,is,as],us=["disabled"],ds={class:"table table-striped table-responsive",id:"creaturetable"},cs=["onClick"],hs=["onClick"],ps=["onClick"],ms={id:"inithptracker"},fs=["href"],vs={class:"row"},gs={class:"col-sm-5"},_s={class:"col-sm-2"},ys={class:"col-sm-5"},bs={class:"row"},Cs={class:"col-sm-3"},ks=["onUpdate:modelValue"],Ms={class:"col-sm-3"},Ss={class:"col-sm-3"},Ds=["onClick"],As={class:"table table-striped"},ws=t("tr",null,[t("th",null,"Character Name"),t("th",null,"Level"),t("th",null,"-")],-1),Bs=["onClick"];function zs(e,s,a,r,p,c){const i=k("b-col"),h=k("router-link"),m=k("b-form-input"),g=k("b-input-group"),V=k("b-row"),T=k("modal");return u(),d("div",re,[t("div",ue,[t("div",de,[t("div",ce,[t("label",null,[l(" Party Size "),v(t("select",{class:"charsheet-text","onUpdate:modelValue":s[0]||(s[0]=o=>e.partysize=o),onChange:s[1]||(s[1]=o=>e.calculateDifficulty())},pe,544),[[y,e.partysize]])])]),t("div",me,[t("label",null,[l(" Average Level "),v(t("select",{class:"charsheet-text","onUpdate:modelValue":s[2]||(s[2]=o=>e.partylevel=o),onChange:s[3]||(s[3]=o=>e.calculateDifficulty())},ve,544),[[y,e.partylevel]])])]),t("div",ge,[t("label",null,[l(" Terrain "),v(t("select",{class:"charsheet-text","onUpdate:modelValue":s[4]||(s[4]=o=>e.terrain=o),onChange:s[5]||(s[5]=o=>e.calculateDifficulty())},[t("option",{value:.75},"Player Advantage",8,_e),ye,t("option",{value:1.25},"Monster Advantage",8,be)],544),[[y,e.terrain]])])]),t("div",Ce,[t("label",null,[l(" Monster Has Powerful AoE "),v(t("input",{type:"checkbox",class:"checkbox","onUpdate:modelValue":s[6]||(s[6]=o=>e.aoe=o),onChange:s[7]||(s[7]=o=>e.calculateDifficulty())},null,544),[[oe,e.aoe]])])]),t("div",ke,[l(" Encounter Difficulty: "+n(e.difficulty)+" ",1),Me,t("span",Se,"XP: "+n(e.xpvalue),1),l("\xA0\xA0 "),t("span",De,"Adjusted XP: "+n(e.adjustedxpvalue),1)])]),t("div",Ae,[(u(!0),d(A,null,w(e.statBlocks,o=>(u(),d("div",{key:o.id,class:"col-sm-4"},[t("h2",null,[l(n(o.name)+" ",1),we]),t("div",Be,[t("h4",null,[l(n(o.size)+" "+n(o.type),1),o.subtype?(u(),d("span",ze," ("+n(o.subtype)+")",1)):f("",!0),l(", "+n(o.alignment),1)]),t("div",Ve,[t("div",Te,[Fe,l(" "+n(o.ac)+" ("+n(o.acdesc)+") ",1),$e,Ne,l(" "+n(e.creaturecalc.basehp(o)),1),Ie,Pe,l(" "+n(e.creaturecalc.pp(o)),1),Ue,Ee,l(" "+n(o.speed),1)]),t("div",Le,[v(t("img",{src:o.image,alt:o.name},null,8,Re),[[ne,o.image]])])]),t("table",He,[je,t("tbody",null,[t("tr",null,[t("td",null,[l(n(o.stats[0])+" (",1),e.creaturecalc.statMod(o,0)>0?(u(),d("span",Oe,"+")):f("",!0),l(n(e.creaturecalc.statMod(o,0))+")",1)]),t("td",null,[l(n(o.stats[1])+" (",1),e.creaturecalc.statMod(o,1)>0?(u(),d("span",Xe,"+")):f("",!0),l(n(e.creaturecalc.statMod(o,1))+")",1)]),t("td",null,[l(n(o.stats[2])+" (",1),e.creaturecalc.statMod(o,2)>0?(u(),d("span",Ye,"+")):f("",!0),l(n(e.creaturecalc.statMod(o,2))+")",1)]),t("td",null,[l(n(o.stats[3])+" (",1),e.creaturecalc.statMod(o,3)>0?(u(),d("span",Ge,"+")):f("",!0),l(n(e.creaturecalc.statMod(o,3))+")",1)]),t("td",null,[l(n(o.stats[4])+" (",1),e.creaturecalc.statMod(o,4)>0?(u(),d("span",Qe,"+")):f("",!0),l(n(e.creaturecalc.statMod(o,4))+")",1)]),t("td",null,[l(n(o.stats[5])+" (",1),e.creaturecalc.statMod(o,5)>0?(u(),d("span",We,"+")):f("",!0),l(n(e.creaturecalc.statMod(o,5))+")",1)])])])]),t("p",null,[t("span",qe,[Je,l(" "+n(o.saves)+" ",1),Ke]),o.skills.length>0?(u(),d("span",Ze,[xe,l(" "+n(o.skills.join(", "))+" ",1),et])):f("",!0),tt,l(" "+n(o.senses)+" ",1),st,o.damageresistances?(u(),d("span",ot,[nt,l(" "+n(o.damageresistances)+" ",1),lt])):f("",!0),o.damageimmunities?(u(),d("span",it,[at,l(" "+n(o.damageimmunities)+" ",1),rt])):f("",!0),o.damagevulnerabilities?(u(),d("span",ut,[dt,l(" "+n(o.damagevulnerabilities),1),ct])):f("",!0),o.conditionimmunities?(u(),d("span",ht,[pt,l(" "+n(o.conditionimmunities)+" ",1),mt])):f("",!0),ft,l(" "+n(o.languages)+" ",1),vt,gt,l(" "+n(o.cr),1)]),t("div",{innerHTML:o.descr},null,8,_t)])]))),128))]),b(V,null,{default:M(()=>[b(i,{md:"2"},{default:M(()=>[t("label",null,[l(" Type "),v(t("select",{"onUpdate:modelValue":s[8]||(s[8]=o=>e.typeFilter=o)},Nt,512),[[y,e.typeFilter]]),l(),It,l(" Size "),v(t("select",{"onUpdate:modelValue":s[9]||(s[9]=o=>e.sizeFilter=o)},Xt,512),[[y,e.sizeFilter]]),l(),Yt,l(" CR Min "),v(t("input",{type:"number","onUpdate:modelValue":s[10]||(s[10]=o=>e.crFilterMin=o),class:"charsheet-num"},null,512),[[F,e.crFilterMin]]),l(),Gt,l(" Max "),v(t("input",{type:"number","onUpdate:modelValue":s[11]||(s[11]=o=>e.crFilterMax=o),class:"charsheet-num"},null,512),[[F,e.crFilterMax]]),Qt])]),_:1}),t("div",Wt,[l(" Fully Converted: "+n(e.convertedcount),1),qt,l(" Metric: "+n(e.metriccount),1),Jt,l(" Valid HP: "+n(e.validhpcount),1),Kt,l(" Unconverted: "+n(e.unconvertedcount),1)]),t("div",Zt,[b(h,{to:"/tools/creaturebuilder",class:"btn btn-primary",style:{"margin-top":"10px"}},{default:M(()=>[l("New Creature")]),_:1}),xt,v(t("select",{"onUpdate:modelValue":s[12]||(s[12]=o=>e.metric=o)},os,512),[[y,e.metric]]),l(" Metric "),ns,v(t("select",{"onUpdate:modelValue":s[13]||(s[13]=o=>e.converted=o)},rs,512),[[y,e.converted]]),l(" Converted ")]),b(i,{md:"4",class:"my-1"},{default:M(()=>[b(g,null,{default:M(()=>[b(m,{modelValue:e.creaturestable.filterValue,"onUpdate:modelValue":s[14]||(s[14]=o=>e.creaturestable.filterValue=o),placeholder:"Type to Search"},null,8,["modelValue"]),t("button",{class:"btn btn-primary",disabled:!e.creaturestable.filterValue,onClick:s[15]||(s[15]=o=>e.creaturestable.filterValue="")},"Clear",8,us)]),_:1}),l(" Results: "+n(e.filteredcreatures.length),1)]),_:1})]),_:1}),t("table",ds,[t("thead",null,[t("tr",null,[t("th",null,[t("a",{href:"#",onClick:s[16]||(s[16]=C(o=>{e.creaturestable.sortBy="name",e.creaturestable.sortDesc=!e.creaturestable.sortDesc},["stop"]))},"Name")]),t("th",null,[t("a",{href:"#",onClick:s[17]||(s[17]=C(o=>{e.creaturestable.sortBy="size",e.creaturestable.sortDesc=!e.creaturestable.sortDesc},["stop"]))},"Size")]),t("th",null,[t("a",{href:"#",onClick:s[18]||(s[18]=C(o=>{e.creaturestable.sortBy="cr",e.creaturestable.sortDesc=!e.creaturestable.sortDesc},["stop"]))},"CR")]),t("th",null,[t("a",{href:"#",onClick:s[19]||(s[19]=C(o=>{e.creaturestable.sortBy="type",e.creaturestable.sortDesc=!e.creaturestable.sortDesc},["stop"]))},"Type")]),t("th",null,[t("a",{href:"#",onClick:s[20]||(s[20]=C(o=>{e.creaturestable.sortBy="subtype",e.creaturestable.sortDesc=!e.creaturestable.sortDesc},["stop"]))},"Subtype")]),t("th",null,[t("a",{href:"#",onClick:s[21]||(s[21]=C(o=>{e.creaturestable.sortBy="alignment",e.creaturestable.sortDesc=!e.creaturestable.sortDesc},["stop"]))},"Alignment")])])]),t("tbody",null,[(u(!0),d(A,null,w(e.filteredcreatures,(o,_)=>(u(),d("tr",{key:o._id},[t("td",null,[t("span",null,[t("a",{href:"#",onClick:C(S=>e.addToEncounter(o,_,S.target),["stop"])},n(o.name),9,cs),e.admin?(u(),d("button",{key:0,class:"btn btn-warning btn-sm",onClick:S=>e.edit(o)},"\u270E",8,hs)):f("",!0),e.admin?(u(),d("button",{key:1,class:"btn btn-sm btn-danger",onClick:S=>e.del(o)},"X",8,ps)):f("",!0)])]),t("td",null,n(o.size),1),t("td",null,n(o.cr),1),t("td",null,n(o.type),1),t("td",null,n(o.subtype),1),t("td",null,n(o.alignment),1)]))),128))])])]),t("div",ms,[t("p",null,[t("a",{href:e.encounterlink},"Link to this Encounter",8,fs)]),(u(!0),d(A,null,w(e.encountercreaturesinit,o=>(u(),d("div",{key:o.id,class:"form-inline form-row"},[t("div",vs,[t("div",gs,n(o.name)+"\xA0",1),t("div",_s,"AC "+n(o.ac),1),t("div",ys,n(o.speed),1)]),t("div",bs,[t("div",Cs,[v(t("input",{type:"number","onUpdate:modelValue":_=>o.currenthp=_,style:{"font-size":"0.7rem"},class:"form-control form-control-sm"},null,8,ks),[[F,o.currenthp]])]),t("div",Ms," / "+n(e.creaturecalc.hp(o))+" ("+n(e.creaturecalc.basehp(o))+" + "+n(e.creaturecalc.pp(o))+") ",1),t("div",Ss,[t("button",{class:"close",type:"button",onClick:_=>e.removeCreature(o)},"\xD7",8,Ds)])])]))),128))]),b(T,{id:"servermodal",title:"Load File from Server",modalProps:e.modalProps},{default:M(()=>[t("table",As,[ws,(u(!0),d(A,null,w(e.characters,o=>(u(),d("tr",{key:o._id},[t("td",null,[t("a",{class:"clickable",onClick:_=>e.selCharacter(o)},n(o.name),9,Bs)]),t("td",null,n(e.charlevel(o)),1)]))),128))])]),_:1},8,["modalProps"])])}const Fs=se(ae,[["render",zs]]);export{Fs as default};
