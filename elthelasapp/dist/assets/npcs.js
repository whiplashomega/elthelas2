import{i as p,_ as y}from"./index.js";import{u as b,h as f,m as k,o as l,c as a,f as e,p as n,v as d,L as v,k as r,F as h,l as u,t as c,g as _}from"./vendor.js";var x={setup(){b({title:"NPCs of Elthelas"});const s=p();s.getAllNPCs();const{npcs:i}=f(s);return{npcs:i,marked:k,npcStore:s}},computed:{filterednpcs(){return this.npcs.filter(s=>{for(let i in s){if(this.living&&s.died||this.player&&s.player==="")return!1;if(typeof s[i]=="string"&&s[i].includes(this.filtertext))return!0;if(this.filtertext==="")return!0}return!1})}},data(){return{filtertext:"",living:!1,player:!1}},methods:{npc(){return{name:"",born:"",died:"",lastlocation:"",history:"",motivations:"",charid:"",player:"",campaigns:[],home:"",dmonly:!1,job:"",knownassociates:"",ancestry:"",flags:[],expand:!0,edit:!0}},addNPC(){this.npcs.push(this.npc())},addCampaign(s){s.campaigns.push({id:Math.random(),name:""})},removeCampaign(s,i){s.campaigns.splice(s.campaigns.indexOf(i),1)},save(s){s.edit=!1,s._id?this.npcStore.saveUpdate(s):this.npcStore.saveNew(s)},deleteNPC(s){window.confirm("Are you sure you want to delete this NPC? It cannot be recovered.")&&(s._id?this.npcStore.deleteNPC(s):this.npcs.splice(this.npcs.indexOf(s),1))}}};const C={class:"col-12"},V={class:"row"},U={class:"col-3"},g={class:"col-3"},w={key:0},L={class:"row"},N={class:"col-4"},M=e("label",null,"Name",-1),P=["onUpdate:modelValue"],$={class:"col-4"},H=e("label",null,"Character Link",-1),T=["onUpdate:modelValue"],S={class:"col-4"},A=e("label",null,"Player",-1),B=["onUpdate:modelValue"],D={class:"row"},j={class:"col-4"},K=e("label",null,"Born",-1),E=["onUpdate:modelValue"],O={class:"col-4"},F=e("label",null,"Died",-1),J=["onUpdate:modelValue"],I={class:"col-4"},R=e("label",null,"Ancestry",-1),X=["onUpdate:modelValue"],q={class:"row"},z={class:"col-4"},G=e("label",null,"Last Known Location",-1),Q=["onUpdate:modelValue"],W={class:"col-4"},Y=e("label",null,"Home",-1),Z=["onUpdate:modelValue"],ee={class:"col-4"},te=e("label",null,"Job",-1),se=["onUpdate:modelValue"],oe={class:"row"},le={class:"col-6"},ae=e("label",null,"History",-1),ne=["onUpdate:modelValue"],ie={class:"col-6"},de=e("label",null,"Motivations",-1),re=["onUpdate:modelValue"],ce={class:"row"},_e={class:"col-6"},he=e("label",null,"Known Associates",-1),ue=["onUpdate:modelValue"],me={class:"col-6"},ve=e("label",null,"Met in Campaigns",-1),pe={class:"col-10"},ye=["onUpdate:modelValue"],be={class:"col-2"},fe=["onClick"],ke=["onClick"],xe={class:"btn-group"},Ce=["onClick"],Ve=["onClick"],Ue={key:1},ge={class:"card-title"},we=["href"],Le=["onClick"],Ne=["onClick"],Me={key:0},Pe={key:1},$e={key:0},He={key:0},Te={class:"row"},Se={class:"col-4"},Ae=e("br",null,null,-1),Be=e("br",null,null,-1),De={class:"col-4"},je=e("br",null,null,-1),Ke=e("br",null,null,-1),Ee={key:0},Oe=e("br",null,null,-1),Fe={key:1},Je=["innerHTML"],Ie={class:"row"},Re={class:"col-6"},Xe={key:0},qe=["innerHTML"],ze={key:1},Ge=["innerHTML"],Qe={class:"col-6"},We=e("h5",null,"Campaigns",-1),Ye=e("br",null,null,-1),Ze={class:"btn-group"};function et(s,i,tt,st,ot,lt){return l(),a(h,null,[e("div",C,[n(e("input",{type:"text",class:"form-control",placeholder:"Search","onUpdate:modelValue":i[0]||(i[0]=t=>s.filtertext=t)},null,512),[[d,s.filtertext]]),e("div",V,[e("div",U,[n(e("input",{type:"checkbox","onUpdate:modelValue":i[1]||(i[1]=t=>s.player=t)},null,512),[[v,s.player]]),r(" PC ")]),e("div",g,[n(e("input",{type:"checkbox","onUpdate:modelValue":i[2]||(i[2]=t=>s.living=t)},null,512),[[v,s.living]]),r(" Living Only ")])])]),(l(!0),a(h,null,u(s.filterednpcs,t=>(l(),a("div",{key:t._id,class:"card"},[t.edit?(l(),a("div",w,[e("div",L,[e("div",N,[M,n(e("input",{type:"text","onUpdate:modelValue":o=>t.name=o,class:"charsheet-text"},null,8,P),[[d,t.name]])]),e("div",$,[H,n(e("input",{type:"text","onUpdate:modelValue":o=>t.charid=o,class:"charsheet-text"},null,8,T),[[d,t.charid]])]),e("div",S,[A,n(e("input",{type:"text","onUpdate:modelValue":o=>t.player=o,class:"charsheet-text"},null,8,B),[[d,t.player]])])]),e("div",D,[e("div",j,[K,n(e("input",{type:"text","onUpdate:modelValue":o=>t.born=o,class:"charsheet-text"},null,8,E),[[d,t.born]])]),e("div",O,[F,n(e("input",{type:"text","onUpdate:modelValue":o=>t.died=o,class:"charsheet-text"},null,8,J),[[d,t.died]])]),e("div",I,[R,n(e("input",{type:"text","onUpdate:modelValue":o=>t.ancestry=o,class:"charsheet-text"},null,8,X),[[d,t.ancestry]])])]),e("div",q,[e("div",z,[G,n(e("input",{type:"text","onUpdate:modelValue":o=>t.lastlocation=o,class:"charsheet-text"},null,8,Q),[[d,t.lastlocation]])]),e("div",W,[Y,n(e("input",{type:"text","onUpdate:modelValue":o=>t.home=o,class:"charsheet-text"},null,8,Z),[[d,t.home]])]),e("div",ee,[te,n(e("input",{type:"text","onUpdate:modelValue":o=>t.job=o,class:"charsheet-text"},null,8,se),[[d,t.job]])])]),e("div",oe,[e("div",le,[ae,n(e("textarea",{"onUpdate:modelValue":o=>t.history=o,class:"charsheet-textarea"},null,8,ne),[[d,t.history]])]),e("div",ie,[de,n(e("textarea",{"onUpdate:modelValue":o=>t.motivations=o,class:"charsheet-textarea"},null,8,re),[[d,t.motivations]])])]),e("div",ce,[e("div",_e,[he,n(e("textarea",{"onUpdate:modelValue":o=>t.knownassociates=o,class:"charsheet-textarea"},null,8,ue),[[d,t.knownassociates]])]),e("div",me,[ve,(l(!0),a(h,null,u(t.campaigns,o=>(l(),a("div",{key:o.id,class:"row"},[e("div",pe,[n(e("input",{type:"text",class:"charsheet-text","onUpdate:modelValue":m=>o.name=m},null,8,ye),[[d,o.name]])]),e("div",be,[e("button",{class:"btn btn-sm btn-danger",onClick:m=>s.removeCampaign(t,o)},"X",8,fe)])]))),128)),e("button",{onClick:o=>s.addCampaign(t),class:"btn btn-sm btn-primary"},"+",8,ke)])]),e("div",xe,[e("button",{class:"btn btn-primary",onClick:o=>s.save(t)},"Save",8,Ce),e("button",{class:"btn btn-danger",onClick:o=>s.deleteNPC(t)},"Delete",8,Ve)])])):(l(),a("div",Ue,[e("h4",ge,[e("a",{href:t.charid},c(t.name),9,we),r(),e("button",{class:"btn btn-warning",onClick:o=>t.edit=!0},"Edit",8,Le),e("button",{type:"button",class:"btn btn-primary",style:{float:"right"},onClick:o=>t.expand=!t.expand},[t.expand?(l(),a("span",Me,"\u25B2")):_("",!0),t.expand?_("",!0):(l(),a("span",Pe,"\u25BC"))],8,Ne)]),t.expand?(l(),a("div",$e,[t.player?(l(),a("h6",He,"Player: "+c(t.player),1)):_("",!0),e("div",Te,[e("div",Se,[r(" Last Known Location: "+c(t.lastlocation),1),Ae,r(" Home: "+c(t.home),1),Be,r(" Job: "+c(t.job),1)]),e("div",De,[r(" Ancestry: "+c(t.ancestry),1),je,r(" Born: "+c(t.born),1),Ke,t.died?(l(),a("span",Ee,[r("Died: "+c(t.died),1),Oe])):_("",!0)])]),t.history?(l(),a("h5",Fe,"History")):_("",!0),e("div",{innerHTML:s.marked.parse(t.history)},null,8,Je),e("div",Ie,[e("div",Re,[t.motivations?(l(),a("h5",Xe,"Motivations")):_("",!0),e("div",{innerHTML:s.marked.parse(t.motivations)},null,8,qe),t.knownassociates?(l(),a("h5",ze,"Known Associates")):_("",!0),e("div",{innerHTML:s.marked.parse(t.knownassociates)},null,8,Ge)]),e("div",Qe,[We,(l(!0),a(h,null,u(t.campaigns,o=>(l(),a("span",null,[r(c(o.name),1),Ye]))),256))])])])):_("",!0)]))]))),128)),e("div",Ze,[e("button",{class:"btn btn-primary",onClick:i[3]||(i[3]=t=>s.addNPC())},"+")])],64)}var it=y(x,[["render",et]]);export{it as default};
