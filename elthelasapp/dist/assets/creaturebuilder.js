import{H as U,s as k,B as M,_ as f,o as n,c as o,a as t,n as s,v as u,C as y,e as i,F as g,r as C,d,t as r,b as V}from"./index.js";import{c as S}from"./creaturecalc.js";const D={setup(){const e=U(),{builderCreature:l}=k(e),{saveNewCreature:m,resetCreature:h,saveCreature:v,getCreatureForEdit:b}=e;return M({title:"Creature Builder"}),{creature:l,saveNewCreature:m,resetCreature:h,saveCreature:v,getCreature:b,creaturecalc:S}},methods:{addTag(){this.creature.tags.push({id:Math.random(),name:""})},removeTag(e){this.creature.tags.splice(e,1)},addSkill(){this.creature.skills.push({id:Math.random(),value:""})},removeSkill(e){this.creature.skills.splice(e,1)},submitCreature(){this.creature._id?this.saveCreature(this.creature):this.saveNewCreature(this.creature),this.resetCreature(),this.$router.push("/tools/runner")},checkCreature(){let e=!0,l="";this.creature.ac==""&&(e=!1,l+="Must have a value for AC. "),e?this.submitCreature():alert(l)}},mounted(){this.$route.params.id&&this.getCreature(this.$route.params.id)}};const T={class:"col-sm-12"},$={class:"row"},z={class:"col-sm-3"},w=t("label",null," Name ",-1),A=t("label",null," CR ",-1),N=t("label",null," Type ",-1),H=V('<option value="aberration">Aberration</option><option value="beast">Beast</option><option value="celestial">Celestial</option><option value="construct">Construct</option><option value="dragon">Dragon</option><option value="elemental">Elemental</option><option value="fiend">Fiend</option><option value="giant">Giant</option><option value="humanoid">Humanoid</option><option value="monstrosity">Monstrosity</option><option value="plant">Plant</option><option value="ooze">Ooze</option><option value="undead">Undead</option>',13),B=[H],P=t("label",null,"AC",-1),E=t("label",null,"HP (deprecated)",-1),F=t("label",null,"PC",-1),R=t("label",null,"Speed",-1),I=t("label",null,"Tags",-1),L={class:"col-sm-10"},X=["onUpdate:modelValue"],G={class:"col-sm-2"},O=["onClick"],W={style:{"margin-top":"10px"}},j={class:"btn-group",style:{}},q={class:"col-sm-3"},J=t("label",null," Size ",-1),K=V('<option value="tiny">Tiny</option><option value="small">Small</option><option value="medium">Medium</option><option value="large">Large</option><option value="huge">Huge</option><option value="gargantuan">Gargantuan</option><option value="colossal">Colossal</option>',7),Q=[K],Y=t("label",null," Alignment ",-1),Z=t("label",null," Subtype ",-1),_=t("label",null,"AC Description",-1),x=t("label",null,"HP Description (deprecated)",-1),ee=t("label",null,"Hit Dice:",-1),te={key:0},le={key:1},ae={key:2},re={key:3},se={key:4},ue={key:5},ne={key:6},oe=t("label",null,"HP: ",-1),ie=t("label",null,"Saves",-1),de={class:"row"},pe=t("label",null,"Skills",-1),ce={class:"col-sm-10"},me=["onUpdate:modelValue"],he={class:"col-sm-2"},ve=["onClick"],be={style:{"margin-top":"10px"}},ye={class:"col-sm-6"},ge={class:"table table-striped"},Ce=t("thead",null,[t("tr",null,[t("th"),t("th",null,"STR"),t("th",null,"DEX"),t("th",null,"CON"),t("th",null,"INT"),t("th",null,"WIS"),t("th",null,"CHA")])],-1),Ve=t("th",null,"Score (dep)",-1),Ue=t("th",null,"Score",-1),ke=t("th",null,"Mod",-1),Me=t("th",null,"w/ Prof",-1),fe=t("th",null,"w/ Exp",-1),Se=t("th",null,"Save DC",-1),De=t("tr",null,null,-1),Te=t("label",null,"Description, Actions, and Abilities",-1);function $e(e,l,m,h,v,b){return n(),o("div",T,[t("div",$,[t("div",z,[t("div",null,[w,s(t("input",{type:"text",class:"charsheet-text","onUpdate:modelValue":l[0]||(l[0]=a=>e.creature.name=a)},null,512),[[u,e.creature.name]])]),t("div",null,[A,s(t("input",{type:"number",min:"0",max:"30",class:"charsheet-text","onUpdate:modelValue":l[1]||(l[1]=a=>e.creature.cr=a)},null,512),[[u,e.creature.cr]])]),t("div",null,[N,s(t("select",{"onUpdate:modelValue":l[2]||(l[2]=a=>e.creature.type=a),class:"charsheet-text"},B,512),[[y,e.creature.type]])]),t("div",null,[P,s(t("input",{type:"number",class:"charsheet-text","onUpdate:modelValue":l[3]||(l[3]=a=>e.creature.ac=a)},null,512),[[u,e.creature.ac]])]),t("div",null,[E,s(t("input",{type:"number",class:"charsheet-text","onUpdate:modelValue":l[4]||(l[4]=a=>e.creature.hp=a)},null,512),[[u,e.creature.hp]])]),t("div",null,[F,s(t("input",{type:"number",class:"charsheet-text","onUpdate:modelValue":l[5]||(l[5]=a=>e.creature.pc=a)},null,512),[[u,e.creature.pc]])]),t("div",null,[R,s(t("input",{type:"text",class:"charsheet-text","onUpdate:modelValue":l[6]||(l[6]=a=>e.creature.speed=a)},null,512),[[u,e.creature.speed]])]),t("div",null,[t("label",null,[i(" Damage Resistances "),s(t("input",{type:"text",class:"charsheet-text","onUpdate:modelValue":l[7]||(l[7]=a=>e.creature.damageresistances=a)},null,512),[[u,e.creature.damageresistances]])]),t("label",null,[i(" Damage Immunities "),s(t("input",{type:"text",class:"charsheet-text","onUpdate:modelValue":l[8]||(l[8]=a=>e.creature.damageimmunities=a)},null,512),[[u,e.creature.damageimmunities]])]),t("label",null,[i(" Condition Immunities "),s(t("input",{type:"text",class:"charsheet-text","onUpdate:modelValue":l[9]||(l[9]=a=>e.creature.conditionimmunities=a)},null,512),[[u,e.creature.conditionimmunities]])])]),I,(n(!0),o(g,null,C(e.creature.tags,(a,c)=>(n(),o("div",{key:a.id,class:"clearfix row"},[t("div",L,[s(t("input",{type:"text",class:"charsheet-text","onUpdate:modelValue":p=>a.name=p},null,8,X),[[u,a.name]])]),t("div",G,[t("button",{class:"btn btn-danger btn-sm",onClick:p=>e.removeTag(c)},"X",8,O)])]))),128)),t("div",W,[t("button",{class:"btn btn-primary btn-sm",onClick:l[10]||(l[10]=a=>e.addTag())},"Add Tag")]),t("div",j,[t("button",{class:"btn btn-success",onClick:l[11]||(l[11]=a=>e.checkCreature())},"Submit"),t("button",{class:"btn btn-warning",onClick:l[12]||(l[12]=a=>e.resetForm())},"Reset")])]),t("div",q,[t("div",null,[J,s(t("select",{"onUpdate:modelValue":l[13]||(l[13]=a=>e.creature.size=a),class:"charsheet-text"},Q,512),[[y,e.creature.size]])]),t("div",null,[Y,s(t("input",{type:"text",class:"charsheet-text","onUpdate:modelValue":l[14]||(l[14]=a=>e.creature.alignment=a)},null,512),[[u,e.creature.alignment]])]),t("div",null,[Z,s(t("input",{type:"text",class:"charsheet-text","onUpdate:modelValue":l[15]||(l[15]=a=>e.creature.subtype=a)},null,512),[[u,e.creature.subtype]])]),t("div",null,[_,s(t("input",{type:"text",class:"charsheet-text","onUpdate:modelValue":l[16]||(l[16]=a=>e.creature.acdesc=a)},null,512),[[u,e.creature.acdesc]])]),t("div",null,[x,s(t("input",{type:"text",class:"charsheet-text","onUpdate:modelValue":l[17]||(l[17]=a=>e.creature.hpdesc=a)},null,512),[[u,e.creature.hpdesc]])]),t("div",null,[ee,s(t("input",{type:"number",class:"charsheet-num","onUpdate:modelValue":l[18]||(l[18]=a=>e.creature.hitdice=a)},null,512),[[u,e.creature.hitdice]]),i("d"),e.creature.size==="tiny"?(n(),o("span",te,"4")):d("",!0),e.creature.size==="small"?(n(),o("span",le,"6")):d("",!0),e.creature.size==="medium"?(n(),o("span",ae,"8")):d("",!0),e.creature.size==="large"?(n(),o("span",re,"10")):d("",!0),e.creature.size==="huge"?(n(),o("span",se,"12")):d("",!0),e.creature.size==="gargantuan"?(n(),o("span",ue,"20")):d("",!0),e.creature.size==="colossal"?(n(),o("span",ne,"20")):d("",!0),i(),oe,i(" "+r(e.creaturecalc.hp(e.creature)),1)]),t("div",null,[ie,s(t("input",{type:"text",class:"charsheet-text","onUpdate:modelValue":l[19]||(l[19]=a=>e.creature.saves=a)},null,512),[[u,e.creature.saves]])]),t("div",de,[t("label",null,[i(" Languages "),s(t("input",{type:"text",class:"charsheet-text","onUpdate:modelValue":l[20]||(l[20]=a=>e.creature.languages=a)},null,512),[[u,e.creature.languages]])]),t("label",null,[i(" Senses "),s(t("input",{type:"text",class:"charsheet-text","onUpdate:modelValue":l[21]||(l[21]=a=>e.creature.senses=a)},null,512),[[u,e.creature.senses]])]),t("label",null,[i(" Locations "),s(t("input",{type:"text",class:"charsheet-text","onUpdate:modelValue":l[22]||(l[22]=a=>e.creature.locations=a)},null,512),[[u,e.creature.locations]])]),pe,(n(!0),o(g,null,C(e.creature.skills,(a,c)=>(n(),o("div",{key:a.id,class:"clearfix row"},[t("div",ce,[s(t("input",{type:"text",class:"charsheet-text","onUpdate:modelValue":p=>a.value=p},null,8,me),[[u,a.value]])]),t("div",he,[t("button",{class:"btn btn-danger btn-sm",onClick:p=>e.removeSkill(c)},"X",8,ve)])]))),128)),t("div",be,[t("button",{class:"btn btn-primary btn-sm",onClick:l[23]||(l[23]=a=>e.addSkill())},"Add Skill")])])]),t("label",ye,[i(" Ability Scores "),t("table",ge,[Ce,t("tbody",null,[t("tr",null,[Ve,t("td",null,r(e.creature.str),1),t("td",null,r(e.creature.dex),1),t("td",null,r(e.creature.con),1),t("td",null,r(e.creature.int),1),t("td",null,r(e.creature.wis),1),t("td",null,r(e.creature.cha),1)]),t("tr",null,[Ue,t("td",null,[s(t("input",{type:"number",class:"charsheet-num","onUpdate:modelValue":l[24]||(l[24]=a=>e.creature.stats[0]=a)},null,512),[[u,e.creature.stats[0]]])]),t("td",null,[s(t("input",{type:"number",class:"charsheet-num","onUpdate:modelValue":l[25]||(l[25]=a=>e.creature.stats[1]=a)},null,512),[[u,e.creature.stats[1]]])]),t("td",null,[s(t("input",{type:"number",class:"charsheet-num","onUpdate:modelValue":l[26]||(l[26]=a=>e.creature.stats[2]=a)},null,512),[[u,e.creature.stats[2]]])]),t("td",null,[s(t("input",{type:"number",class:"charsheet-num","onUpdate:modelValue":l[27]||(l[27]=a=>e.creature.stats[3]=a)},null,512),[[u,e.creature.stats[3]]])]),t("td",null,[s(t("input",{type:"number",class:"charsheet-num","onUpdate:modelValue":l[28]||(l[28]=a=>e.creature.stats[4]=a)},null,512),[[u,e.creature.stats[4]]])]),t("td",null,[s(t("input",{type:"number",class:"charsheet-num","onUpdate:modelValue":l[29]||(l[29]=a=>e.creature.stats[5]=a)},null,512),[[u,e.creature.stats[5]]])])]),t("tr",null,[ke,t("td",null,r(e.creaturecalc.statMod(e.creature,0)),1),t("td",null,r(e.creaturecalc.statMod(e.creature,1)),1),t("td",null,r(e.creaturecalc.statMod(e.creature,2)),1),t("td",null,r(e.creaturecalc.statMod(e.creature,3)),1),t("td",null,r(e.creaturecalc.statMod(e.creature,4)),1),t("td",null,r(e.creaturecalc.statMod(e.creature,5)),1)]),t("tr",null,[Me,t("td",null,r(e.creaturecalc.attMod(e.creature,0)),1),t("td",null,r(e.creaturecalc.attMod(e.creature,1)),1),t("td",null,r(e.creaturecalc.attMod(e.creature,2)),1),t("td",null,r(e.creaturecalc.attMod(e.creature,3)),1),t("td",null,r(e.creaturecalc.attMod(e.creature,4)),1),t("td",null,r(e.creaturecalc.attMod(e.creature,5)),1)]),t("tr",null,[fe,t("td",null,r(e.creaturecalc.attMod(e.creature,0)+e.creaturecalc.prof(e.creature)),1),t("td",null,r(e.creaturecalc.attMod(e.creature,1)+e.creaturecalc.prof(e.creature)),1),t("td",null,r(e.creaturecalc.attMod(e.creature,2)+e.creaturecalc.prof(e.creature)),1),t("td",null,r(e.creaturecalc.attMod(e.creature,3)+e.creaturecalc.prof(e.creature)),1),t("td",null,r(e.creaturecalc.attMod(e.creature,4)+e.creaturecalc.prof(e.creature)),1),t("td",null,r(e.creaturecalc.attMod(e.creature,5)+e.creaturecalc.prof(e.creature)),1)]),t("tr",null,[Se,t("td",null,r(e.creaturecalc.saveDC(e.creature,0)),1),t("td",null,r(e.creaturecalc.saveDC(e.creature,1)),1),t("td",null,r(e.creaturecalc.saveDC(e.creature,2)),1),t("td",null,r(e.creaturecalc.saveDC(e.creature,3)),1),t("td",null,r(e.creaturecalc.saveDC(e.creature,4)),1),t("td",null,r(e.creaturecalc.saveDC(e.creature,5)),1)]),De])]),t("div",null,[Te,s(t("textarea",{class:"form-control",style:{"min-height":"600px"},"onUpdate:modelValue":l[30]||(l[30]=a=>e.creature.description=a)},null,512),[[u,e.creature.description]])])])])])}const Ae=f(D,[["render",$e]]);export{Ae as default};
