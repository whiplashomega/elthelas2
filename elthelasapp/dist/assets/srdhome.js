import{B as $,u as T,s as g,_ as B,h as S,o as s,c as n,i as b,w as v,a as e,n as c,v as N,F as p,r as h,e as _,t as d,d as a,N as m}from"./index.js";const D={setup(){$({title:"System Reference Search"});const o=T(),{ancestries:r,armorv2:y,backgroundsv2:f,classesv2:k,divines:w,equipmentv2:u,featsv2:C,magicitemvsv2:t,rules:l,rulesByCategory:i,spellsv2:L,weaponsv2:x}=g(o);return{ancestries:r,armor:y,backgrounds:f,classes:k,divines:w,equipment:u,feats:C,magicitems:t,statics:o,rules:l,rulesByCategory:i,spells:L,weapons:x}},computed:{rulesresults(){return this.rules.filter(o=>{if(this.searchtext!==""&&(o.title.toLowerCase().includes(this.searchtext.toLowerCase())||o.description.toLowerCase().includes(this.searchtext.toLowerCase())||o.subcategory.toLowerCase().includes(this.searchtext.toLowerCase())))return!0})}},data(){return{searchtext:"",showresults:!1}},created(){this.statics.getAllNew()}},M=e("p",null," This work includes material taken from the System Reference Document 5.1 (\u201CSRD 5.1\u201D) by Wizards of the Coast LLC and available at https://dnd.wizards.com/resources/systems-reference-document. The SRD 5.1 is licensed under the Creative Commons Attribution 4.0 International License available at https://creativecommons.org/licenses/by/4.0/legalcode. ",-1),R={id:"search"},V={class:"row"},H={class:"col-sm-8"},q={class:"col-sm-4 btn-group"},z=e("hr",null,null,-1),A={key:0,id:"rulesresults"},F=["onClick"],I={key:0},E={key:1},U=["innerHTML"],W=e("hr",null,null,-1),j=["onClick"],G={key:0},J={key:1},K=["onClick"],O={key:0},P={key:1},Q=e("hr",null,null,-1),X=["onClick"],Y={key:0},Z={key:1},tt=["innerHTML"],et=e("hr",null,null,-1),st=e("hr",null,null,-1);function nt(o,r,y,f,k,w){const u=S("b-tab"),C=S("b-tabs");return s(),n("div",null,[M,b(C,null,{default:v(()=>[b(u,{title:"Search"},{default:v(()=>[e("div",R,[e("div",V,[e("div",H,[c(e("input",{type:"text",class:"form-control col-sm-10","onUpdate:modelValue":r[0]||(r[0]=t=>o.searchtext=t)},null,512),[[N,o.searchtext]])]),e("div",q,[e("button",{type:"button",class:"btn btn-primary",onClick:r[1]||(r[1]=t=>o.showresults=!0)},"Search"),e("button",{type:"button",class:"btn btn-warning",onClick:r[2]||(r[2]=t=>{o.showresults=!1,o.searchtext=""})},"Clear")])]),z,o.showresults?(s(),n("div",A,[(s(!0),n(p,null,h(o.rulesresults,t=>(s(),n("div",{key:t.category+t.subcategory+t.title},[e("h4",null,[_(d(t.title)+" ",1),e("button",{type:"button",class:"btn btn-primary",style:{float:"right"},onClick:l=>t.isCollapsed=!t.isCollapsed},[t.isCollapsed?(s(),n("span",I,"\u25B2")):a("",!0),t.isCollapsed?a("",!0):(s(),n("span",E,"\u25BC"))],8,F)]),e("h6",null,d(t.category)+" - "+d(t.subcategory),1),c(e("div",{innerHTML:t.description},null,8,U),[[m,t.isCollapsed]]),W]))),128))])):a("",!0)])]),_:1}),b(u,{title:"Index"},{default:v(()=>[(s(!0),n(p,null,h(o.rulesByCategory,t=>(s(),n("div",{key:t.title},[e("h2",null,[e("button",{type:"button",class:"btn btn-primary",style:{float:"left"},onClick:l=>t.isCollapsed=!t.isCollapsed},[t.isCollapsed?(s(),n("span",G,"\u25B2")):a("",!0),t.isCollapsed?a("",!0):(s(),n("span",J,"\u25BC"))],8,j),_("\xA0\xA0"+d(t.title),1)]),c(e("div",null,[(s(!0),n(p,null,h(t.subcategories,l=>(s(),n("div",{key:l.title,style:{"margin-left":"40px"}},[e("h3",null,[e("button",{type:"button",class:"btn btn-primary btn-sm",style:{float:"left"},onClick:i=>l.isCollapsed=!l.isCollapsed},[l.isCollapsed?(s(),n("span",O,"\u25B2")):a("",!0),l.isCollapsed?a("",!0):(s(),n("span",P,"\u25BC"))],8,K),_("\xA0\xA0"+d(l.title),1)]),(s(!0),n(p,null,h(l.rules,i=>c((s(),n("div",{key:i.title,style:{"margin-left":"40px"}},[Q,e("h4",null,[e("button",{type:"button",class:"btn btn-primary btn-sm",style:{float:"left"},onClick:L=>i.isCollapsed=!i.isCollapsed},[i.isCollapsed?(s(),n("span",Y,"\u25B2")):a("",!0),i.isCollapsed?a("",!0):(s(),n("span",Z,"\u25BC"))],8,X),_("\xA0\xA0"+d(i.title),1)]),c(e("div",{innerHTML:i.description},null,8,tt),[[m,i.isCollapsed]])])),[[m,l.isCollapsed]])),128)),et]))),128))],512),[[m,t.isCollapsed]]),st]))),128))]),_:1})]),_:1})])}const lt=B(D,[["render",nt]]);export{lt as default};
