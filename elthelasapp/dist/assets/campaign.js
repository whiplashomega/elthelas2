import{f as L,_ as A,d as G,a as J,m as O}from"./index.js";import{I as H,m as B,o as n,e as a,g as e,l as m,t as u,h as r,p as h,v as p,F as U,k as w,n as E,J as M,K as W,d as R,i as f,j as y,w as g,E as X,G as q,u as D}from"./vendor.js";import Q from"./runner.js";var Y={setup(){const t=L(),{current:i,currentChapter:b}=H(t),{addChapter:C,addEncounterToChapter:V,loadChapter:S,moveEncounterUp:s,moveEncounterDown:l,moveChapterUp:o,moveChapterDown:k,deleteEncounter:c,deleteChapter:d,addSection:_,deleteSection:v,addEncounterToSection:T,deleteEncounterFromSection:N,moveEncounterUpInSection:I,moveEncounterDownInSection:P,moveEncounterFromSectionToSection:F,moveEncounterFromChapterToSection:j,moveSectionUp:z,moveSectionDown:K}=t;return{campaign:i,chapter:b,addChapter:C,addEncounter:V,loadChapter:S,moveEnUp:s,moveEnDown:l,moveChUp:o,moveChDown:k,deleteCampaignEncounter:c,deleteChapter:d,addSection:_,deleteSection:v,addEncounterToSection:T,deleteEncounterFromSection:N,moveEncounterUpInSection:I,moveEncounterDownInSection:P,moveEncounterFromSectionToSection:F,moveEncounterFromChapterToSection:j,moveSectionUp:z,moveSectionDown:K,marked:B}},props:["buildmode","showChapters"],data:function(){return{comp:this,section2:{title:"Please Select a Section",id:0}}},methods:{loadEncounter(t){this.$parent.$parent.$parent.loadEncounter(t)}}};const Z={key:0,class:"col-sm-12"},x={class:"notes"},ee={key:0},te={key:1,class:"row"},oe={class:"col-sm-6"},se=m(" Campaign Title "),le=m(),ne={class:"col-sm-6"},ae={class:"row"},ie={key:0,class:"col-sm-3"},de={class:"sidenav nav flex-column nav-pill"},re=["onClick"],ce=["onClick"],ue=["onClick"],he=["onClick"],me={key:0},_e={key:1,class:"row"},pe={class:"col-sm-12"},be=m(" Chapter Title "),ke={key:0},ve=["href"],Ce=["onClick"],$e=["onClick"],ye=["onClick"],fe=["onClick"],ge={class:"form-check"},Me=["onUpdate:modelValue"],Ue=e("label",{class:"form-check-label"},"Complete",-1),we={class:"form-check"},Ve=["onUpdate:modelValue"],Se=e("label",{class:"form-check-label"},"Hide",-1),Te={key:0,style:{float:"right","max-width":"40%"}},Ee=["src","alt"],Le=["innerHTML"],Ae=["innerHTML"],He=e("h4",null,"Session Notes",-1),Ne=["onUpdate:modelValue"],Ie={key:1},Pe={class:"row"},De={class:"col-sm-6"},Be=e("label",null,"Name",-1),Re=["onClick"],Fe=["onClick"],je=["onClick"],ze=["onUpdate:modelValue"],Ke={class:"col-sm-6"},Ge=e("label",null,"Runner Link",-1),Je=["onUpdate:modelValue"],Oe={class:"row"},We={class:"col-sm-6"},Xe=e("label",null,"Image URL",-1),qe=["onUpdate:modelValue"],Qe={class:"col-sm-4"},Ye=e("label",null,"Flags",-1),Ze={class:"form-check"},xe=["onUpdate:modelValue"],et=e("label",{class:"form-check-label"},"Random",-1),tt={class:"form-check"},ot=["onUpdate:modelValue"],st=e("label",{class:"form-check-label"},"Complete",-1),lt={class:"row"},nt={class:"col-sm-6"},at=e("label",null,"Encounter Text (markdown allowed)",-1),it=["onUpdate:modelValue"],dt=["innerHTML"],rt=e("label",null,"Potential Treasure (markdown allowed)",-1),ct=["onUpdate:modelValue"],ut=["onClick"],ht={key:0},mt=["onClick"],_t=["onClick"],pt=["onClick"],bt={class:"form-check"},kt=["onUpdate:modelValue"],vt=e("label",{class:"form-check-label"},"Complete",-1),Ct={class:"form-check"},$t=["onUpdate:modelValue"],yt=e("label",{class:"form-check-label"},"Hide",-1),ft=["innerHTML"],gt={key:1},Mt={class:"row"},Ut={class:"col-sm-12"},wt=e("label",null,"Title",-1),Vt=["onClick"],St=["onClick"],Tt=["onClick"],Et=["onClick"],Lt=["onUpdate:modelValue"],At={class:"form-check"},Ht=["onUpdate:modelValue"],Nt=e("label",{class:"form-check-label"},"Hide",-1),It={key:0,class:"row"},Pt={class:"col-sm-6"},Dt=e("label",null,"Section Description (markdown allowed)",-1),Bt=["onUpdate:modelValue"],Rt=["innerHTML"],Ft={key:0},jt=["href"],zt=["onClick"],Kt=["onClick"],Gt=["onClick"],Jt=["onClick"],Ot={class:"form-check"},Wt=["onUpdate:modelValue"],Xt=e("label",{class:"form-check-label"},"Complete",-1),qt={class:"form-check"},Qt=["onUpdate:modelValue"],Yt=e("label",{class:"form-check-label"},"Hide",-1),Zt={key:0,style:{float:"right","max-width":"40%"}},xt=["src","alt"],eo=["innerHTML"],to=["innerHTML"],oo=e("h4",null,"Session Notes",-1),so=["onUpdate:modelValue"],lo={key:1},no=e("hr",null,null,-1),ao={class:"row"},io={class:"col-sm-6"},ro=e("label",null,"Name",-1),co=["onClick"],uo=["onClick"],ho=["onClick"],mo=["onClick"],_o=["onUpdate:modelValue"],po={class:"col-sm-6"},bo=e("label",null,"Runner Link",-1),ko=["onUpdate:modelValue"],vo={class:"row"},Co={class:"col-sm-6"},$o=e("label",null,"Image URL",-1),yo=["onUpdate:modelValue"],fo={class:"col-sm-4"},go=e("label",null,"Flags",-1),Mo={class:"form-check"},Uo=["onUpdate:modelValue"],wo=e("label",{class:"form-check-label"},"Complete",-1),Vo={class:"row"},So={class:"col-sm-6"},To=e("label",null,"Encounter Text (markdown allowed)",-1),Eo=["onUpdate:modelValue"],Lo=["innerHTML"],Ao=e("label",null,"Potential Treasure (markdown allowed)",-1),Ho=["onUpdate:modelValue"],No=m(" Move to Section "),Io=["value"],Po=["onClick"],Do=["onClick"],Bo={key:3,class:"row"},Ro=e("hr",null,null,-1),Fo={class:"btn-group"},jo=["onClick"],zo={class:"row"},Ko=e("hr",null,null,-1),Go={class:"btn-group"};function Jo(t,i,b,C,V,S){return n(),a("div",null,[t.campaign?(n(),a("div",Z,[e("div",x,[t.campaign.buildmode?r("",!0):(n(),a("h1",ee,[m(u(t.campaign.title)+" ",1),e("button",{onClick:i[0]||(i[0]=s=>t.campaign.buildmode=!0),class:"btn btn-primary"},"\u270E")])),t.campaign.buildmode?(n(),a("div",te,[e("label",oe,[se,h(e("input",{type:"text","onUpdate:modelValue":i[1]||(i[1]=s=>t.campaign.title=s),class:"form-control"},null,512),[[p,t.campaign.title]]),le,e("button",{onClick:i[2]||(i[2]=s=>t.campaign.buildmode=!1),class:"btn btn-primary"},"Done")]),e("label",ne,[m(" URI (campaign information will be reachable via https://elthelas.com/tools/campaigns/"+u(t.campaign.url)+" ",1),h(e("input",{type:"text","onUpdate:modelValue":i[3]||(i[3]=s=>t.campaign.url=s),class:"form-control"},null,512),[[p,t.campaign.url]])])])):r("",!0),e("div",ae,[t.showChapters?(n(),a("div",ie,[e("nav",de,[(n(!0),a(U,null,w(t.campaign.chapters,(s,l)=>(n(),a("li",{class:"navitem",key:s.id},[e("a",{href:"#",onClick:o=>t.loadChapter(s)},"Chapter "+u(l)+": "+u(s.title),9,re),e("button",{onClick:o=>t.moveChUp(l)},"\u2191",8,ce),e("button",{onClick:o=>t.moveChDown(l)},"\u2193",8,ue),e("button",{onClick:o=>t.deleteChapter(l)},"\u{1F5D1}",8,he)]))),128))]),e("button",{class:"btn btn-primary",onClick:i[4]||(i[4]=s=>t.addChapter()),style:{"margin-top":"12px"}},"Add Chapter")])):r("",!0),e("div",{class:E(t.showChapters?"col-sm-9":"col-sm-12")},[t.chapter.buildmode?r("",!0):(n(),a("h2",me,[m(u(t.chapter.title)+" ",1),e("button",{onClick:i[5]||(i[5]=s=>t.chapter.buildmode=!0),class:"btn btn-primary"},"\u270E")])),t.chapter.buildmode?(n(),a("div",_e,[e("label",pe,[be,h(e("input",{type:"text",class:"form-control","onUpdate:modelValue":i[6]||(i[6]=s=>t.chapter.title=s)},null,512),[[p,t.chapter.title]])]),e("button",{onClick:i[7]||(i[7]=s=>t.chapter.buildmode=!1),class:"btn btn-primary"},"Done")])):r("",!0),(n(!0),a(U,null,w(t.chapter.encounters,(s,l)=>(n(),a("div",{key:s.id,class:E(s.complete?"complete":"")},[s.buildmode?r("",!0):(n(),a("div",ke,[e("h3",null,[e("a",{href:s.link,target:"_blank"},u(s.name),9,ve),e("button",{onClick:o=>t.moveEnUp(l)},"\u2191",8,Ce),e("button",{onClick:o=>t.moveEnDown(l)},"\u2193",8,$e),e("button",{onClick:o=>t.loadEncounter(s.link),class:"btn btn-success"},"Run in Tab",8,ye)]),e("button",{class:"btn btn-primary",onClick:o=>{s.buildmode=!0}},"\u270E",8,fe),e("div",ge,[h(e("input",{type:"checkbox",class:"form-check-input","onUpdate:modelValue":o=>s.complete=o},null,8,Me),[[M,s.complete]]),Ue]),e("div",we,[h(e("input",{type:"checkbox",class:"form-check-input","onUpdate:modelValue":o=>s.closed=o},null,8,Ve),[[M,s.closed]]),Se]),s.image&&!s.closed?(n(),a("div",Te,[e("img",{src:s.image,alt:s.name},null,8,Ee)])):r("",!0),s.closed?r("",!0):(n(),a("div",{key:1,innerHTML:t.marked.parse(s.text)},null,8,Le)),s.closed?r("",!0):(n(),a("div",{key:2,innerHTML:t.marked.parse(s.treasure)},null,8,Ae)),e("div",null,[He,h(e("textarea",{"onUpdate:modelValue":o=>s.sessionnotes=o,class:"form-control"},null,8,Ne),[[p,s.sessionnotes]])])])),s.buildmode?(n(),a("div",Ie,[e("div",Pe,[e("div",De,[Be,e("button",{onClick:o=>t.moveEnUp(l)},"\u2191",8,Re),e("button",{onClick:o=>t.moveEnDown(l)},"\u2193",8,Fe),e("button",{onClick:o=>t.deleteEncounter(l)},"\u{1F5D1}",8,je),h(e("input",{type:"text",class:"form-control","onUpdate:modelValue":o=>s.name=o},null,8,ze),[[p,s.name]])]),e("div",Ke,[Ge,h(e("input",{type:"text",class:"form-control","onUpdate:modelValue":o=>s.link=o},null,8,Je),[[p,s.link]])])]),e("div",Oe,[e("div",We,[Xe,h(e("input",{type:"text",class:"form-control","onUpdate:modelValue":o=>s.image=o},null,8,qe),[[p,s.image]])]),e("div",Qe,[Ye,e("div",Ze,[h(e("input",{type:"checkbox",class:"form-check-input","onUpdate:modelValue":o=>s.random=o},null,8,xe),[[M,s.random]]),et]),e("div",tt,[h(e("input",{type:"checkbox",class:"form-check-input","onUpdate:modelValue":o=>s.complete=o},null,8,ot),[[M,s.complete]]),st])])]),e("div",lt,[e("div",nt,[at,h(e("textarea",{"onUpdate:modelValue":o=>s.text=o,class:"form-control encounterbox"},null,8,it),[[p,s.text]])]),e("div",{class:"col-sm-6",innerHTML:t.marked.parse(s.text)},null,8,dt)]),e("div",null,[rt,h(e("textarea",{"onUpdate:modelValue":o=>s.treasure=o,class:"form-control"},null,8,ct),[[p,s.treasure]])]),e("button",{onClick:o=>s.buildmode=!1,class:"btn btn-primary"},"Done",8,ut)])):r("",!0)],2))),128)),(n(!0),a(U,null,w(t.chapter.sections,(s,l)=>(n(),a("div",{key:s.id,class:E(s.complete?"complete":"")},[s.buildmode?r("",!0):(n(),a("div",ht,[e("h3",null,[m(u(s.title)+" ",1),e("button",{onClick:o=>t.moveSectionUp(l),class:"btn btn-sm"},"\u2191",8,mt),e("button",{onClick:o=>t.moveSectionDown(l),class:"btn btn-sm"},"\u2193",8,_t),e("button",{onClick:o=>s.buildmode=!0,class:"btn btn-sm"},"\u270E",8,pt)]),e("div",bt,[h(e("input",{type:"checkbox",class:"form-check-input","onUpdate:modelValue":o=>s.complete=o},null,8,kt),[[M,s.complete]]),vt]),e("div",Ct,[h(e("input",{type:"checkbox",class:"form-check-input","onUpdate:modelValue":o=>s.hidden=o},null,8,$t),[[M,s.hidden]]),yt]),s.hidden?r("",!0):(n(),a("div",{key:0,innerHTML:t.marked.parse(s.description)},null,8,ft))])),s.buildmode?(n(),a("div",gt,[e("div",Mt,[e("div",Ut,[wt,e("button",{onClick:o=>t.moveSectionUp(l),class:"btn btn-sm"},"\u2191",8,Vt),e("button",{onClick:o=>t.moveSectionDown(l),class:"btn btn-sm"},"\u2193",8,St),e("button",{onClick:o=>t.deleteSection(s),class:"btn btn-sm"},"\u{1F5D1}",8,Tt),e("button",{onClick:o=>s.buildmode=!1,class:"btn btn-sm"},"Done",8,Et),h(e("input",{type:"text",class:"form-control","onUpdate:modelValue":o=>s.title=o},null,8,Lt),[[p,s.title]])])]),e("div",At,[h(e("input",{type:"checkbox",class:"form-check-input","onUpdate:modelValue":o=>s.hidden=o},null,8,Ht),[[M,s.hidden]]),Nt]),s.hidden?r("",!0):(n(),a("div",It,[e("div",Pt,[Dt,h(e("textarea",{"onUpdate:modelValue":o=>s.description=o,class:"form-control encounterbox"},null,8,Bt),[[p,s.description]])]),e("div",{class:"col-sm-6",innerHTML:t.marked.parse(s.description)},null,8,Rt)]))])):r("",!0),s.hidden?r("",!0):(n(!0),a(U,{key:2},w(s.encounters,(o,k)=>(n(),a("div",{key:o.id,class:E(o.complete?"complete":"")},[o.buildmode?r("",!0):(n(),a("div",Ft,[e("h4",null,[e("a",{href:o.link,target:"_blank"},u(o.name),9,jt),e("button",{onClick:c=>t.moveEncounterUpInSection({section:s,index:k}),class:"btn btn-xs"},"\u2191",8,zt),e("button",{onClick:c=>t.moveEncounterDownInSection({section:s,index:k}),class:"btn btn-xs"},"\u2193",8,Kt),e("button",{onClick:c=>t.loadEncounter(o.link),class:"btn btn-success btn-xs"},"Run in Tab",8,Gt),e("button",{onClick:c=>o.buildmode=!0,class:"btn btn-xs"},"\u270E",8,Jt)]),e("div",Ot,[h(e("input",{type:"checkbox",class:"form-check-input","onUpdate:modelValue":c=>o.complete=c},null,8,Wt),[[M,o.complete]]),Xt]),e("div",qt,[h(e("input",{type:"checkbox",class:"form-check-input","onUpdate:modelValue":c=>o.closed=c},null,8,Qt),[[M,o.closed]]),Yt]),o.image&&!o.closed?(n(),a("div",Zt,[e("img",{src:o.image,alt:o.name},null,8,xt)])):r("",!0),o.closed?r("",!0):(n(),a("div",{key:1,innerHTML:t.marked.parse(o.text)},null,8,eo)),o.closed?r("",!0):(n(),a("div",{key:2,innerHTML:t.marked.parse(o.treasure)},null,8,to)),e("div",null,[oo,h(e("textarea",{"onUpdate:modelValue":c=>o.sessionnotes=c,class:"form-control"},null,8,so),[[p,o.sessionnotes]])])])),o.buildmode?(n(),a("div",lo,[no,e("div",ao,[e("div",io,[ro,e("button",{onClick:c=>t.moveEncounterUpInSection({section:s,index:k}),class:"btn btn-xs"},"\u2191",8,co),e("button",{onClick:c=>t.moveEncounterDownInSection({section:s,index:k}),class:"btn btn-sm"},"\u2193",8,uo),e("button",{onClick:c=>t.deleteEncounterFromSection({section:s,encounter:o}),class:"btn btn-xs"},"\u{1F5D1}",8,ho),e("button",{onClick:c=>o.buildmode=!1,class:"btn btn-xs"},"Done",8,mo),h(e("input",{type:"text",class:"form-control","onUpdate:modelValue":c=>o.name=c},null,8,_o),[[p,o.name]])]),e("div",po,[bo,h(e("input",{type:"text",class:"form-control","onUpdate:modelValue":c=>o.link=c},null,8,ko),[[p,o.link]])])]),e("div",vo,[e("div",Co,[$o,h(e("input",{type:"text",class:"form-control","onUpdate:modelValue":c=>o.image=c},null,8,yo),[[p,o.image]])]),e("div",fo,[go,e("div",Mo,[h(e("input",{type:"checkbox",class:"form-check-input","onUpdate:modelValue":c=>o.complete=c},null,8,Uo),[[M,o.complete]]),wo])])]),e("div",Vo,[e("div",So,[To,h(e("textarea",{"onUpdate:modelValue":c=>o.text=c,class:"form-control"},null,8,Eo),[[p,o.text]])]),e("div",{class:"col-sm-6",innerHTML:t.marked.parse(o.text)},null,8,Lo)]),e("div",null,[Ao,h(e("textarea",{"onUpdate:modelValue":c=>o.treasure=c,class:"form-control"},null,8,Ho),[[p,o.treasure]])]),e("div",null,[No,h(e("select",{"onUpdate:modelValue":i[8]||(i[8]=c=>t.section2=c),class:"form-control form-control-sm"},[(n(!0),a(U,null,w(t.chapter.sections,c=>(n(),a("option",{key:c.id,value:c},u(s.title),9,Io))),128))],512),[[W,t.section2]]),e("button",{class:"btn btn-success btn-sm",onClick:c=>t.moveEncounterFromSectionToSection({section1:s,section2:t.section2,encounter:o})},"Go",8,Po),e("button",{class:"btn btn-primary btn-sm",onClick:c=>t.addEncounterToSection({section:s,index:k+1})},"Add Encounter After This One",8,Do)])])):r("",!0)],2))),128)),s.hidden?r("",!0):(n(),a("div",Bo,[Ro,e("div",Fo,[e("button",{class:"btn btn-primary",onClick:o=>t.addEncounterToSection({section:s,index:s.encounters.length})},"Add Encounter",8,jo)])]))],2))),128)),e("div",zo,[Ko,e("div",Go,[e("button",{class:"btn btn-primary",onClick:i[9]||(i[9]=s=>t.addSection())},"Add Section")])])],2)])])])):r("",!0)])}var Oo=A(Y,[["render",Jo]]),Wo={setup(){const t=L(),{current:i,campaignCharacters:b}=H(t),{invitePCToCampaign:C,fetchCampaignCharacter:V}=t,{skillMod:S,statMod:s,saveMod:l,statTotal:o,initMod:k,acCalc:c,profbonus:d}=G;return{campaign:i,pcs:b,invitePC:C,fetchCampaignCharacter:V,skillMod:S,statMod:s,saveMod:l,statTotal:o,initMod:k,acCalc:c,profbonus:d,marked:B}},data:function(){return{pcid:""}},methods:{addToCampaign(){this.campaign.playercharacters.push(this.pcid),this.fetchCampaignCharacter(this.pcid),this.pcid=""},reloadCharacter(t){let i=this.pcs.findIndex(b=>b._id===t._id);this.pcs.splice(i,1),this.fetchCampaignCharacter(t._id)},rollCheck(t){let i=R.roll("1d20").total,b=R.roll("1d20").total;alert("Base Roll: "+(i+t)+" ("+i+" + "+t+`)
Adv/Dis Roll: `+(b+t)+" ("+b+" + "+t+")")},removeFromCampaign(t){let i=this.campaign.playercharacters.findIndex(C=>C===t._id);this.campaign.playercharacters.splice(i,1);let b=this.pcs.findIndex(C=>C._id===t._id);this.pcs.splice(b,1)}}};const $=t=>(X("data-v-a027a002"),t=t(),q(),t),Xo=m(" PC Manager "),qo={class:"row"},Qo={class:"btn-group"},Yo=["onClick"],Zo=["onClick"],xo={class:"row"},es={class:"col-6"},ts={class:"charsheet-static center"},os=m(" AC"),ss=$(()=>e("br",null,null,-1)),ls={class:"col-6"},ns={class:"charsheet-static center"},as=m(" Initiative: "),is={key:0},ds={class:"abilitytable"},rs=$(()=>e("thead",null,[e("tr",null,[e("th",null,"Ability"),e("th",null,"Score"),e("th",null,"Mod"),e("th",null,"Save")])],-1)),cs=$(()=>e("th",null,"STR",-1)),us=["onClick"],hs={key:0},ms=["onClick"],_s={key:0},ps=$(()=>e("th",null,"DEX",-1)),bs=["onClick"],ks={key:0},vs=["onClick"],Cs={key:0},$s=$(()=>e("th",null,"CON",-1)),ys=["onClick"],fs={key:0},gs=["onClick"],Ms={key:0},Us=$(()=>e("th",null,"INT",-1)),ws=["onClick"],Vs={key:0},Ss=["onClick"],Ts={key:0},Es=$(()=>e("th",null,"WIS",-1)),Ls=["onClick"],As={key:0},Hs=["onClick"],Ns={key:0},Is=$(()=>e("th",null,"CHA",-1)),Ps=["onClick"],Ds={key:0},Bs=["onClick"],Rs={key:0},Fs={class:"abilitytable"},js=$(()=>e("thead",null,[e("tr",null,[e("th",null,"Skill"),e("th",null,"Mod")])],-1)),zs=["onClick"],Ks={key:0},Gs={class:"charsheet-static"},Js=$(()=>e("h5",null,"Proficiencies and Languages",-1)),Os={style:{"font-size":"9px","margin-bottom":"2px"}},Ws=$(()=>e("strong",null,"Armor: ",-1)),Xs={style:{"font-size":"9px","margin-bottom":"2px"}},qs=$(()=>e("strong",null,"Weapons: ",-1)),Qs={style:{"font-size":"9px","margin-bottom":"2px"}},Ys=$(()=>e("strong",null,"Tools: ",-1)),Zs={style:{"font-size":"9px","margin-bottom":"2px"}},xs=$(()=>e("strong",null,"Saves: ",-1)),el=["innerHTML"];function tl(t,i,b,C,V,S){const s=f("router-link");return n(),a("div",null,[Xo,h(e("input",{type:"text","onUpdate:modelValue":i[0]||(i[0]=l=>t.pcid=l)},null,512),[[p,t.pcid]]),e("button",{class:"btn btn-success",onClick:i[1]||(i[1]=l=>t.addToCampaign())},"Add PC"),e("div",qo,[(n(!0),a(U,null,w(t.pcs,l=>(n(),a("div",{key:l._id,class:"col-sm-3"},[e("h4",null,[y(s,{to:"/tools/charbuilder/"+l._id,target:"_blank"},{default:g(()=>[m(u(l.name),1)]),_:2},1032,["to"])]),e("div",Qo,[e("button",{onClick:o=>t.reloadCharacter(l),class:"btn btn-success"},"Reload",8,Yo),e("button",{onClick:o=>t.removeFromCampaign(l),class:"btn btn-danger"},"Remove",8,Zo)]),e("div",xo,[e("div",es,[e("div",ts,[os,ss,m(u(t.acCalc(l)),1)])]),e("div",ls,[e("div",ns,[as,t.initMod(l)>-1?(n(),a("span",is,"+")):r("",!0),m(u(t.initMod(l)),1)])])]),e("table",ds,[rs,e("tbody",null,[e("tr",null,[cs,e("td",null,u(t.statTotal(l,0)),1),e("td",null,[e("button",{onClick:o=>t.rollCheck(t.statMod(l,0))},[t.statMod(l,0)>-1?(n(),a("span",hs,"+")):r("",!0),m(u(t.statMod(l,0)),1)],8,us)]),e("td",null,[e("button",{onClick:o=>t.rollCheck(t.saveMod(l,0))},[t.saveMod(l,0)>-1?(n(),a("span",_s,"+")):r("",!0),m(u(t.saveMod(l,0)),1)],8,ms)])]),e("tr",null,[ps,e("td",null,u(t.statTotal(l,1)),1),e("td",null,[e("button",{onClick:o=>t.rollCheck(t.statMod(l,1))},[t.statMod(l,1)>-1?(n(),a("span",ks,"+")):r("",!0),m(u(t.statMod(l,1)),1)],8,bs)]),e("td",null,[e("button",{onClick:o=>t.rollCheck(t.saveMod(l,1))},[t.saveMod(l,1)>-1?(n(),a("span",Cs,"+")):r("",!0),m(u(t.saveMod(l,1)),1)],8,vs)])]),e("tr",null,[$s,e("td",null,u(t.statTotal(l,2)),1),e("td",null,[e("button",{onClick:o=>t.rollCheck(t.statMod(l,2))},[t.statMod(l,2)>-1?(n(),a("span",fs,"+")):r("",!0),m(u(t.statMod(l,2)),1)],8,ys)]),e("td",null,[e("button",{onClick:o=>t.rollCheck(t.saveMod(l,2))},[t.saveMod(l,2)>-1?(n(),a("span",Ms,"+")):r("",!0),m(u(t.saveMod(l,2)),1)],8,gs)])]),e("tr",null,[Us,e("td",null,u(t.statTotal(l,3)),1),e("td",null,[e("button",{onClick:o=>t.rollCheck(t.statMod(l,3))},[t.statMod(l,3)>-1?(n(),a("span",Vs,"+")):r("",!0),m(u(t.statMod(l,3)),1)],8,ws)]),e("td",null,[e("button",{onClick:o=>t.rollCheck(t.saveMod(l,3))},[t.saveMod(l,3)>-1?(n(),a("span",Ts,"+")):r("",!0),m(u(t.saveMod(l,3)),1)],8,Ss)])]),e("tr",null,[Es,e("td",null,u(t.statTotal(l,4)),1),e("td",null,[e("button",{onClick:o=>t.rollCheck(t.statMod(l,4))},[t.statMod(l,4)>-1?(n(),a("span",As,"+")):r("",!0),m(u(t.statMod(l,4)),1)],8,Ls)]),e("td",null,[e("button",{onClick:o=>t.rollCheck(t.saveMod(l,4))},[t.saveMod(l,4)>-1?(n(),a("span",Ns,"+")):r("",!0),m(u(t.saveMod(l,4)),1)],8,Hs)])]),e("tr",null,[Is,e("td",null,u(t.statTotal(l,5)),1),e("td",null,[e("button",{onClick:o=>t.rollCheck(t.statMod(l,5))},[t.statMod(l,5)>-1?(n(),a("span",Ds,"+")):r("",!0),m(u(t.statMod(l,5)),1)],8,Ps)]),e("td",null,[e("button",{onClick:o=>t.rollCheck(t.saveMod(l,5))},[t.saveMod(l,5)>-1?(n(),a("span",Rs,"+")):r("",!0),m(u(t.saveMod(l,5)),1)],8,Bs)])])])]),e("table",Fs,[js,e("tbody",null,[(n(!0),a(U,null,w(l.skills,o=>(n(),a("tr",{key:o.name},[e("th",null,u(o.name),1),e("td",null,[e("button",{onClick:k=>t.rollCheck(t.skillMod(l,o))},[t.skillMod(l,o)>-1?(n(),a("span",Ks,"+")):r("",!0),m(u(t.skillMod(l,o)),1)],8,zs)])]))),128))])]),e("div",Gs,[Js,e("p",Os,[Ws,m(u(l.charclasses[0].thisclass.proficiencies.armor.join(", ")),1)]),e("p",Xs,[qs,m(u(l.charclasses[0].thisclass.proficiencies.weapons.join(", ")),1)]),e("p",Qs,[Ys,m(u(l.charclasses[0].thisclass.proficiencies.tools.join(", ")),1)]),e("p",Zs,[xs,m(u(l.charclasses[0].thisclass.proficiencies["saving throws"].join(", ")),1)]),e("p",{innerHTML:l.proficiencies,style:{"font-size":"9px","margin-bottom":"2px"}},null,8,el)])]))),128))])])}var ol=A(Wo,[["render",tl],["__scopeId","data-v-a027a002"]]),sl={setup(){const t=L(),{current:i}=H(t);return{campaign:i,marked:B}},props:{buildmode:Boolean},computed:{availableChapters:function(){let t=[];return this.campaign.chapters.forEach(i=>{t.push({value:i.title,text:i.title})}),t},filteredNPCs:function(){let t=[];return this.campaign.npcs.forEach(i=>{(this.filterByChapter==="all"||i.chapters.includes("all")||i.chapters.includes(this.filterByChapter))&&t.push(i)}),t}},data:function(){return{filterByChapter:"all"}},methods:{newNPC(){this.campaign.npcs.push({id:Math.random(),name:"New NPC",editMode:!0,job:"",relation:"",link:"",skills:"",location:"",motivations:"",history:"",chapters:["all"],show:!0})},switchEditMode(t){t.editMode=!t.editMode},deleteNPC(t){let i=this.campaign.npcs.findIndex(b=>b.id===t.id);window.confirm("Are you sure you want to delete "+t.name+"?")&&this.campaign.npcs.splice(i,1)}}};const ll=m(" Filter By Chapter: "),nl=m("All"),al={key:0},il=["onUpdate:modelValue"],dl=["onClick"],rl=["onClick"],cl=["onClick"],ul={key:0},hl={key:1},ml={key:0},_l={class:"row"},pl={class:"col-sm-2"},bl=e("strong",null,"Job: ",-1),kl={key:0},vl=["onUpdate:modelValue"],Cl={class:"col-sm-3"},$l=e("strong",null,"Relation to Party:",-1),yl={key:0},fl=["onUpdate:modelValue"],gl={class:"col-sm-7"},Ml=e("strong",null,"Link to Stats",-1),Ul={key:1},wl=["onUpdate:modelValue"],Vl={class:"row"},Sl={class:"col-sm-2"},Tl=e("strong",null,"Location:",-1),El={key:0},Ll=["onUpdate:modelValue"],Al={class:"col-sm-10"},Hl=e("strong",null,"Relevant Chapters:",-1),Nl=m("All"),Il={class:"row"},Pl={class:"col-sm-12"},Dl=e("strong",null,"History: ",-1),Bl=["innerHTML"],Rl=["onUpdate:modelValue"],Fl={class:"row"},jl={class:"col-sm-12"},zl=e("strong",null,"Motivations: ",-1),Kl=["innerHTML"],Gl=["onUpdate:modelValue"];function Jl(t,i,b,C,V,S){const s=f("b-form-radio"),l=f("b-form-radio-group"),o=f("router-link"),k=f("b-form-checkbox"),c=f("b-form-checkbox-group");return n(),a("div",null,[e("button",{onClick:i[0]||(i[0]=d=>t.newNPC())},"Add NPC"),e("div",null,[e("label",null,[ll,y(l,{modelValue:t.filterByChapter,"onUpdate:modelValue":i[1]||(i[1]=d=>t.filterByChapter=d),options:t.availableChapters,name:"filterByChapter"},{default:g(()=>[y(s,{value:"all"},{default:g(()=>[nl]),_:1})]),_:1},8,["modelValue","options"])])]),(n(!0),a(U,null,w(t.filteredNPCs,d=>(n(),a("div",{key:d.id,class:"card"},[e("h3",null,[d.editMode?r("",!0):(n(),a("span",al,u(d.name),1)),d.editMode?h((n(),a("input",{key:1,type:"text",class:"form-control","onUpdate:modelValue":_=>d.name=_},null,8,il)),[[p,d.name]]):r("",!0),e("button",{class:"btn-symbol btn-sm",onClick:_=>t.switchEditMode(d)},"\u270E",8,dl),e("button",{class:"btn-symbol btn-sm",onClick:_=>t.deleteNPC(d)},"\u{1F5D1}",8,rl),e("button",{type:"button",class:"btn btn-primary float-right",onClick:_=>d.show=!d.show},[d.show?(n(),a("span",ul,"\u25B2")):r("",!0),d.show?r("",!0):(n(),a("span",hl,"\u25BC"))],8,cl)]),d.show?(n(),a("div",ml,[e("div",_l,[e("label",pl,[bl,d.editMode?r("",!0):(n(),a("span",kl,u(d.job),1)),d.editMode?h((n(),a("input",{key:1,type:"text",class:"form-control","onUpdate:modelValue":_=>d.job=_},null,8,vl)),[[p,d.job]]):r("",!0)]),e("label",Cl,[$l,d.editMode?r("",!0):(n(),a("span",yl,u(d.relation),1)),d.editMode?h((n(),a("input",{key:1,type:"text",class:"form-control","onUpdate:modelValue":_=>d.relation=_},null,8,fl)),[[p,d.relation]]):r("",!0)]),e("label",gl,[d.editMode?r("",!0):(n(),D(o,{key:0,to:d.link,target:"_blank"},{default:g(()=>[Ml]),_:2},1032,["to"])),d.editMode?(n(),a("strong",Ul,"Link to Stats")):r("",!0),d.editMode?h((n(),a("input",{key:2,type:"text",class:"form-control","onUpdate:modelValue":_=>d.link=_},null,8,wl)),[[p,d.link]]):r("",!0)])]),e("div",Vl,[e("label",Sl,[Tl,d.editMode?r("",!0):(n(),a("span",El,u(d.location),1)),d.editMode?h((n(),a("input",{key:1,type:"text",class:"form-control","onUpdate:modelValue":_=>d.location=_},null,8,Ll)),[[p,d.location]]):r("",!0)]),e("label",Al,[Hl,d.editMode?r("",!0):(n(!0),a(U,{key:0},w(d.chapters,_=>(n(),a("span",{key:_},u(_),1))),128)),d.editMode?(n(),D(c,{key:1,modelValue:d.chapters,"onUpdate:modelValue":_=>d.chapters=_,options:t.availableChapters},{default:g(()=>[y(k,{value:"all"},{default:g(()=>[Nl]),_:1})]),_:2},1032,["modelValue","onUpdate:modelValue","options"])):r("",!0)])]),e("div",Il,[e("label",Pl,[Dl,d.editMode?r("",!0):(n(),a("span",{key:0,innerHTML:t.marked.parse(d.history)},null,8,Bl)),d.editMode?h((n(),a("textarea",{key:1,"onUpdate:modelValue":_=>d.history=_,class:"form-control"},null,8,Rl)),[[p,d.history]]):r("",!0)])]),e("div",Fl,[e("label",jl,[zl,d.editMode?r("",!0):(n(),a("span",{key:0,innerHTML:t.marked.parse(d.motivations)},null,8,Kl)),d.editMode?h((n(),a("textarea",{key:1,"onUpdate:modelValue":_=>d.motivations=_,class:"form-control"},null,8,Gl)),[[p,d.motivations]]):r("",!0)])])])):r("",!0)]))),128))])}var Ol=A(sl,[["render",Jl]]),Wl={setup(){const t=L(),i=J(),{campaigns:b,current:C,currentChapter:V,campaignCharacters:S}=H(t),{getUserInfo:s,isLoggedIn:l}=i,{getAllCampaigns:o,getAllCampaignsSilent:k,saveNewCampaign:c,saveCampaign:d,loadCampaign:_,loadCampaignById:v,loadCampaignByUrl:T,deleteCampaign:N,newCampaign:I}=t;let P=C.buildmode;return{campaigns:t,userinfo:i,allCampaigns:b,campaign:C,chapter:V,pcs:S,token:s,loggedin:l,buildmode:P,getAll:o,getAllSilent:k,saveNew:c,save:d,load:_,loadById:v,loadByUrl:T,deleteCamp:N,newCamp:I}},components:{notes:Oo,pcmanager:ol,npcmanager:Ol,runner:Q,modal:O},data:function(){return{comp:this,showChapters:!0,creArray:[],charArray:[],runnerKey:0,activeTab:0,modalProps:{isActive:!1}}},watch:{campaign:{handler(){this.campaign._id&&this.loggedin&&this.save()},deep:!0}},methods:{loadEncounter(t){this.creArray=t.substr(t.search("runner/")+7).split("&"),this.charArray=this.pcs,this.runnerKey++,this.activeTab=3,window.scroll(1,300)},showLoadModal(){this.modalProps.isActive=!0}},created(){this.getAllSilent().then(()=>{this.$route.params.campaign&&this.loadByUrl({url:this.$route.params.campaign})})}};const Xl={class:"col-sm-12"},ql={class:"btn-group"},Ql={key:0},Yl={key:1},Zl=m(" Chapters"),xl={class:"table table-striped"},en=e("tr",null,[e("th",null,"Campaign Name"),e("th",null,"-")],-1),tn=["onClick"],on=["onClick"];function sn(t,i,b,C,V,S){const s=f("notes"),l=f("b-tab"),o=f("pcmanager"),k=f("npcmanager"),c=f("runner"),d=f("b-tabs"),_=f("modal");return n(),a("div",Xl,[e("div",ql,[t.campaign._id?(n(),a("button",{key:0,class:"btn btn-primary",onClick:i[0]||(i[0]=v=>t.save())},"Save")):r("",!0),t.campaign._id?r("",!0):(n(),a("button",{key:1,class:"btn btn-primary",onClick:i[1]||(i[1]=v=>t.saveNew())},"Save New")),e("button",{class:"btn btn-success",onClick:i[2]||(i[2]=v=>{t.getAllSilent(),t.showLoadModal()})},"Load"),e("button",{class:"btn btn-warning",onClick:i[3]||(i[3]=v=>t.newCamp())},"New Campaign"),e("button",{class:"btn btn-primary",onClick:i[4]||(i[4]=v=>t.showChapters=!t.showChapters)},[t.showChapters?(n(),a("span",Ql,"Hide")):(n(),a("span",Yl,"Show")),Zl])]),y(d,{modelValue:t.activeTab,"onUpdate:modelValue":i[5]||(i[5]=v=>t.activeTab=v)},{default:g(()=>[y(l,{title:"Notes"},{default:g(()=>[y(s,{buildmode:t.buildmode,"show-chapters":t.showChapters},null,8,["buildmode","show-chapters"])]),_:1}),y(l,{title:"PC Manager"},{default:g(()=>[y(o)]),_:1}),y(l,{title:"NPCs"},{default:g(()=>[y(k,{buildmode:t.buildmode},null,8,["buildmode"])]),_:1}),y(l,{title:"Encounter Runner"},{default:g(()=>[(n(),D(c,{"cre-array":t.creArray,"char-array":t.charArray,key:t.runnerKey},null,8,["cre-array","char-array"]))]),_:1})]),_:1},8,["modelValue"]),y(_,{id:"campaignmodal",title:"Load File from Server",modalProps:t.modalProps},{default:g(()=>[e("table",xl,[en,(n(!0),a(U,null,w(t.allCampaigns,v=>(n(),a("tr",{key:v._id},[e("td",null,[e("a",{class:"clickable",onClick:T=>{t.load({campaign:v,comp:t.comp}),t.modalProps.isActive=!1}},u(v.title),9,tn)]),e("td",null,[e("input",{type:"button",onClick:T=>t.deleteCamp(v),class:"btn btn-danger",value:"X"},null,8,on)])]))),128))])]),_:1},8,["modalProps"])])}var dn=A(Wl,[["render",sn]]);export{dn as default};
