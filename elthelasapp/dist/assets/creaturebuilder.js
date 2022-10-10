import{C as g,x as C,_ as V,o as i,c as u,d as e,l,v as n,A as v,F as h,r as f,e as a,a as y}from"./index.js";const U={setup(){const t=g(),{builderCreature:o}=C(t),{saveNewCreature:p,resetCreature:c,saveCreature:m,getCreatureForEdit:b}=t;return{creature:o,saveNewCreature:p,resetCreature:c,saveCreature:m,getCreature:b}},methods:{addTag(){this.creature.tags.push({id:Math.random(),name:""})},removeTag(t){this.creature.tags.splice(t,1)},addSkill(){this.creature.skills.push({id:Math.random(),value:""})},removeSkill(t){this.creature.skills.splice(t,1)},submitCreature(){this.creature._id?this.saveCreature(this.creature):this.saveNewCreature(this.creature),this.resetCreature(),this.$router.push("/runner")},checkCreature(){let t=!0,o="";this.creature.ac==""&&(t=!1,o+="Must have a value for AC. "),t?this.submitCreature():alert(o)}},mounted(){this.$route.params.id&&this.getCreature(this.$route.params.id)}},_={class:"col-sm-12"},k={class:"row"},S={class:"col-sm-4"},w=a(" Name "),T={class:"col-sm-4"},$=a(" Size "),A=y('<option value="tiny">Tiny</option><option value="small">Small</option><option value="medium">Medium</option><option value="large">Large</option><option value="huge">Huge</option><option value="gargantuan">Gargantuan</option><option value="colossal">Colossal</option>',7),D=[A],N={class:"col-sm-4"},M=a(" CR "),z={class:"row"},F={class:"col-sm-4"},H=a(" Type "),R=y('<option value="aberration">Aberration</option><option value="beast">Beast</option><option value="celestial">Celestial</option><option value="construct">Construct</option><option value="dragon">Dragon</option><option value="elemental">Elemental</option><option value="fiend">Fiend</option><option value="giant">Giant</option><option value="humanoid">Humanoid</option><option value="monstrosity">Monstrosity</option><option value="plant">Plant</option><option value="ooze">Ooze</option><option value="undead">Undead</option>',13),B=[R],E={class:"col-sm-4"},I=a(" Subtype "),L={class:"col-sm-4"},P=a(" Alignment "),X={class:"row"},G={class:"col-sm-12"},O=a(" Ability Scores "),W={class:"table table-striped"},j=e("thead",null,[e("tr",null,[e("th",null,"STR"),e("th",null,"DEX"),e("th",null,"CON"),e("th",null,"INT"),e("th",null,"WIS"),e("th",null,"CHA")])],-1),q={class:"row"},J={class:"col-sm-6"},K=a(" Tags "),Q=["onUpdate:modelValue"],Y=["onClick"],Z={class:"col-sm-6"},x=a(" Skills "),ee=["onUpdate:modelValue"],te=["onClick"],oe={class:"row"},se={class:"col-sm-4"},le=a(" AC "),ne={class:"col-sm-4"},ae=a(" AC Description "),re={class:"col-sm-4"},ie=a(" Speed "),ue={class:"row"},de={class:"col-sm-4"},pe=a(" HP "),ce={class:"col-sm-4"},me=a(" HP Description "),be={class:"col-sm-4"},ve=a(" Saves "),he={class:"row"},fe={class:"col-sm-4"},ye=a(" Damage Resistances "),ge={class:"col-sm-4"},Ce=a(" Damage Immunities "),Ve={class:"col-sm-4"},Ue=a(" Condition Immunities "),_e={class:"row"},ke={class:"col-sm-4"},Se=a(" Languages "),we={class:"col-sm-4"},Te=a(" Senses "),$e={class:"col-sm-4"},Ae=a(" Locations "),De={class:"row"},Ne={class:"col-sm-12"},Me=a(" Description, Actions, and Abilities "),ze={class:"btn-group"};function Fe(t,o,p,c,m,b){return i(),u("div",_,[e("div",k,[e("label",S,[w,l(e("input",{type:"text",class:"form-control","onUpdate:modelValue":o[0]||(o[0]=s=>t.creature.name=s)},null,512),[[n,t.creature.name]])]),e("label",T,[$,l(e("select",{"onUpdate:modelValue":o[1]||(o[1]=s=>t.creature.size=s),class:"form-control"},D,512),[[v,t.creature.size]])]),e("label",N,[M,l(e("input",{type:"number",min:"0",max:"30",class:"form-control","onUpdate:modelValue":o[2]||(o[2]=s=>t.creature.cr=s)},null,512),[[n,t.creature.cr]])])]),e("div",z,[e("label",F,[H,l(e("select",{"onUpdate:modelValue":o[3]||(o[3]=s=>t.creature.type=s),class:"form-control"},B,512),[[v,t.creature.type]])]),e("label",E,[I,l(e("input",{type:"text",class:"form-control","onUpdate:modelValue":o[4]||(o[4]=s=>t.creature.subtype=s)},null,512),[[n,t.creature.subtype]])]),e("label",L,[P,l(e("input",{type:"text",class:"form-control","onUpdate:modelValue":o[5]||(o[5]=s=>t.creature.alignment=s)},null,512),[[n,t.creature.alignment]])])]),e("div",X,[e("label",G,[O,e("table",W,[j,e("tbody",null,[e("tr",null,[e("td",null,[l(e("input",{type:"number","onUpdate:modelValue":o[6]||(o[6]=s=>t.creature.str=s)},null,512),[[n,t.creature.str]])]),e("td",null,[l(e("input",{type:"number","onUpdate:modelValue":o[7]||(o[7]=s=>t.creature.dex=s)},null,512),[[n,t.creature.dex]])]),e("td",null,[l(e("input",{type:"number","onUpdate:modelValue":o[8]||(o[8]=s=>t.creature.con=s)},null,512),[[n,t.creature.con]])]),e("td",null,[l(e("input",{type:"number","onUpdate:modelValue":o[9]||(o[9]=s=>t.creature.int=s)},null,512),[[n,t.creature.int]])]),e("td",null,[l(e("input",{type:"number","onUpdate:modelValue":o[10]||(o[10]=s=>t.creature.wis=s)},null,512),[[n,t.creature.wis]])]),e("td",null,[l(e("input",{type:"number","onUpdate:modelValue":o[11]||(o[11]=s=>t.creature.cha=s)},null,512),[[n,t.creature.cha]])])])])])])]),e("div",q,[e("label",J,[K,(i(!0),u(h,null,f(t.creature.tags,(s,d)=>(i(),u("p",{key:s.id,class:"clearfix"},[l(e("input",{type:"text",class:"form-control col-sm-10",style:{float:"left"},"onUpdate:modelValue":r=>s.name=r},null,8,Q),[[n,s.name]]),e("button",{class:"btn btn-danger col-sm-1",style:{float:"left"},onClick:r=>t.removeTag(d)},"X",8,Y)]))),128)),e("button",{class:"btn btn-success",onClick:o[12]||(o[12]=s=>t.addTag())},"Add Tag")]),e("label",Z,[x,(i(!0),u(h,null,f(t.creature.skills,(s,d)=>(i(),u("p",{key:s.id,class:"clearfix"},[l(e("input",{type:"text",class:"form-control col-sm-10",style:{float:"left"},"onUpdate:modelValue":r=>s.value=r},null,8,ee),[[n,s.value]]),e("button",{class:"btn btn-danger col-sm-1",style:{float:"left"},onClick:r=>t.removeSkill(d)},"X",8,te)]))),128)),e("button",{class:"btn btn-success",onClick:o[13]||(o[13]=s=>t.addSkill())},"Add Skill")])]),e("div",oe,[e("label",se,[le,l(e("input",{type:"number",class:"form-control","onUpdate:modelValue":o[14]||(o[14]=s=>t.creature.ac=s)},null,512),[[n,t.creature.ac]])]),e("label",ne,[ae,l(e("input",{type:"text",class:"form-control","onUpdate:modelValue":o[15]||(o[15]=s=>t.creature.acdesc=s)},null,512),[[n,t.creature.acdesc]])]),e("label",re,[ie,l(e("input",{type:"text",class:"form-control","onUpdate:modelValue":o[16]||(o[16]=s=>t.creature.speed=s)},null,512),[[n,t.creature.speed]])])]),e("div",ue,[e("label",de,[pe,l(e("input",{type:"number",class:"form-control","onUpdate:modelValue":o[17]||(o[17]=s=>t.creature.hp=s)},null,512),[[n,t.creature.hp]])]),e("label",ce,[me,l(e("input",{type:"text",class:"form-control","onUpdate:modelValue":o[18]||(o[18]=s=>t.creature.hpdesc=s)},null,512),[[n,t.creature.hpdesc]])]),e("label",be,[ve,l(e("input",{type:"text",class:"form-control","onUpdate:modelValue":o[19]||(o[19]=s=>t.creature.saves=s)},null,512),[[n,t.creature.saves]])])]),e("div",he,[e("label",fe,[ye,l(e("input",{type:"text",class:"form-control","onUpdate:modelValue":o[20]||(o[20]=s=>t.creature.damageresistances=s)},null,512),[[n,t.creature.damageresistances]])]),e("label",ge,[Ce,l(e("input",{type:"text",class:"form-control","onUpdate:modelValue":o[21]||(o[21]=s=>t.creature.damageimmunities=s)},null,512),[[n,t.creature.damageimmunities]])]),e("label",Ve,[Ue,l(e("input",{type:"text",class:"form-control","onUpdate:modelValue":o[22]||(o[22]=s=>t.creature.conditionimmunities=s)},null,512),[[n,t.creature.conditionimmunities]])])]),e("div",_e,[e("label",ke,[Se,l(e("input",{type:"text",class:"form-control","onUpdate:modelValue":o[23]||(o[23]=s=>t.creature.languages=s)},null,512),[[n,t.creature.languages]])]),e("label",we,[Te,l(e("input",{type:"text",class:"form-control","onUpdate:modelValue":o[24]||(o[24]=s=>t.creature.senses=s)},null,512),[[n,t.creature.senses]])]),e("label",$e,[Ae,l(e("input",{type:"text",class:"form-control","onUpdate:modelValue":o[25]||(o[25]=s=>t.creature.locations=s)},null,512),[[n,t.creature.locations]])])]),e("div",De,[e("label",Ne,[Me,l(e("textarea",{class:"form-control","onUpdate:modelValue":o[26]||(o[26]=s=>t.creature.description=s)},null,512),[[n,t.creature.description]])])]),e("div",ze,[e("button",{class:"btn btn-success",onClick:o[27]||(o[27]=s=>t.checkCreature())},"Submit"),e("button",{class:"btn btn-warning",onClick:o[28]||(o[28]=s=>t.resetForm())},"Reset")])])}const Re=V(U,[["render",Fe]]);export{Re as default};
