import{u as c,B as l,_ as u,o as t,c as s,F as h,r as d,d as a,b as p,a as o,e as i,t as n}from"./index.js";const y={setup(){const r=c();return r.getAllBackgroundsv2(),l({title:"Backgrounds"}),{statics:r}}},g={id:"#main",class:"col-sm-12"},_=p("<p> The following backgrounds are suggested possibilities for players. Work with your DM to determine the background for your character. </p><p> Every story has a beginning. Your character&#39;s background reveals where you came from, how you became an adventurer, and your place in the world. Your fighter might have been a courageous knight or a grizzled soldier. Your wizard could have been a sage or an artisan. Your rogue might have gotten by as a guild thief or commanded audiences as a jester. </p><p> Choosing a background provides you with important story cues about your character&#39;s identity. The most important question to ask about your background is what changed? Why did you stop doing whatever your background describes and start adventuring? Where did you get the money to purchase your starting gear, or, if you come from a wealthy background, why don&#39;t you have more money? How did you learn the skills of your class? What sets you apart from ordinary people who share your background? </p><h4>Proficiencies</h4><p> Each background gives a character proficiency in two skills. </p><p> In addition, most backgrounds give a character proficiency with one or more tools. </p><p> If a character would gain the same proficiency from two different sources, he or she can choose a different proficiency of the same kind (skill or tool) instead. </p><h4>Languages</h4><p> Each background allows you to learn one language of your choice. </p><h4>Feat</h4><p> Each background provides 1 feat available to level 1 characters. Alternatively you can take a level 1 feat of your choice. </p><h4>Equipment</h4><p> Each background provides a package of starting equipment. Alternatively, you can forgo the starting equipment and spend an extra 50 gp on equipment of your choice. </p>",13),m={key:0},f={class:"card-title"},v=["onClick"],k={key:0},b={key:1},w={key:0},C={key:0},E=o("strong",null,"Skills: ",-1),q=o("br",null,null,-1),B=o("strong",null,"Tools: ",-1),T={key:0},L=o("br",null,null,-1),N={key:1},S=o("strong",null,"Languages: ",-1),$=o("br",null,null,-1),F=o("strong",null,"Feat: ",-1),V=o("strong",null,"Equipment: ",-1),W=["innerHTML"];function Y(r,j,x,z,A,H){return t(),s("div",g,[_,r.statics.backgroundsv2?(t(),s("div",m,[(t(!0),s(h,null,d(r.statics.backgroundsv2,e=>(t(),s("div",{key:e.name,class:"card"},[o("h3",f,[i(n(e.name),1),o("button",{type:"button",class:"btn btn-primary",style:{float:"right"},onClick:M=>e.isCollapsed=!e.isCollapsed},[e.isCollapsed?a("",!0):(t(),s("span",k,"\u25B2")),e.isCollapsed?(t(),s("span",b,"\u25BC")):a("",!0)],8,v)]),e.isCollapsed?a("",!0):(t(),s("div",w,[e.skills?(t(),s("p",C,[E,i(n(e.skills.join(", ")),1),q,B,i(n(e.tools.join(", ")),1),e.tools.length===0?(t(),s("span",T,"None")):a("",!0),L,e.languages?(t(),s("span",N,[S,i(n(e.languages)+" of your choice",1)])):a("",!0),$,F,i(n(e.feature),1)])):a("",!0),o("p",null,n(e.description),1),o("p",null,[V,o("span",{innerHTML:e.equipment},null,8,W)])]))]))),128))])):a("",!0)])}const I=u(y,[["render",Y]]);export{I as default};
