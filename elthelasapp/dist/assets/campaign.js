import{P as E,s as L,u as R,m as B,_ as A,o as n,c as a,a as e,f as m,t as u,e as r,p as h,v as p,F as M,r as U,q as T,C as f,E as O,B as I,g as W,h as y,i as $,w as g,K as D,l as X,n as q}from"./index.js";import G from"./runner.js";import"./creaturecalc.js";var J={setup(){const t=E(),{current:i,currentChapter:b}=L(t),{addChapter:C,addEncounterToChapter:w,loadChapter:V,moveEncounterUp:s,moveEncounterDown:l,moveChapterUp:o,moveChapterDown:k,deleteEncounter:c,deleteChapter:d,addSection:_,deleteSection:v,addEncounterToSection:S,deleteEncounterFromSection:N,moveEncounterUpInSection:P,moveEncounterDownInSection:H,moveEncounterFromSectionToSection:F,moveEncounterFromChapterToSection:j,moveSectionUp:z,moveSectionDown:K}=t;return R({title:"Campaign Notes"}),{campaign:i,chapter:b,addChapter:C,addEncounter:w,loadChapter:V,moveEnUp:s,moveEnDown:l,moveChUp:o,moveChDown:k,deleteCampaignEncounter:c,deleteChapter:d,addSection:_,deleteSection:v,addEncounterToSection:S,deleteEncounterFromSection:N,moveEncounterUpInSection:P,moveEncounterDownInSection:H,moveEncounterFromSectionToSection:F,moveEncounterFromChapterToSection:j,moveSectionUp:z,moveSectionDown:K,marked:B}},props:["buildmode","showChapters"],data:function(){return{comp:this,section2:{title:"Please Select a Section",id:0}}},methods:{loadEncounter(t){this.$parent.$parent.$parent.loadEncounter(t)}}};const Q={key:0,class:"col-sm-12"},Y={class:"notes"},Z={key:0},x={key:1,class:"row"},ee={class:"col-sm-6"},te={class:"col-sm-5"},oe={class:"col-sm-1 btn-group"},se={class:"row"},le={key:0,class:"col-sm-3"},ne={class:"sidenav nav flex-column nav-pill"},ae=["onClick"],ie=["onClick"],de=["onClick"],re=["onClick"],ce={key:0},ue={key:1,class:"row"},he={class:"col-sm-11"},me={class:"btn-group col-sm-1"},_e={key:0},pe=["href"],be=["onClick"],ke=["onClick"],ve=["onClick"],Ce=["onClick"],$e={class:"form-check"},ye=["onUpdate:modelValue"],ge=e("label",{class:"form-check-label"},"Complete",-1),fe={class:"form-check"},Me=["onUpdate:modelValue"],Ue=e("label",{class:"form-check-label"},"Hide",-1),we={key:0,style:{float:"right","max-width":"40%"}},Ve=["src","alt"],Se=["innerHTML"],Te=["innerHTML"],Ee=e("h4",null,"Session Notes",-1),Le=["onUpdate:modelValue"],Ae={key:1},Ne={class:"row"},Pe={class:"col-sm-6"},He=e("label",null,"Name",-1),De=["onClick"],Be=["onClick"],Ie=["onClick"],Re=["onUpdate:modelValue"],Fe={class:"col-sm-6"},je=e("label",null,"Runner Link",-1),ze=["onUpdate:modelValue"],Ke={class:"row"},Oe={class:"col-sm-6"},We=e("label",null,"Image URL",-1),Xe=["onUpdate:modelValue"],qe={class:"col-sm-4"},Ge=e("label",null,"Flags",-1),Je={class:"form-check"},Qe=["onUpdate:modelValue"],Ye=e("label",{class:"form-check-label"},"Random",-1),Ze={class:"form-check"},xe=["onUpdate:modelValue"],et=e("label",{class:"form-check-label"},"Complete",-1),tt={class:"row"},ot={class:"col-sm-6"},st=e("label",null,"Encounter Text (markdown allowed)",-1),lt=["onUpdate:modelValue"],nt=["innerHTML"],at=e("label",null,"Potential Treasure (markdown allowed)",-1),it=["onUpdate:modelValue"],dt=["onClick"],rt={key:0},ct=["onClick"],ut=["onClick"],ht=["onClick"],mt={class:"form-check"},_t=["onUpdate:modelValue"],pt=e("label",{class:"form-check-label"},"Complete",-1),bt={class:"form-check"},kt=["onUpdate:modelValue"],vt=e("label",{class:"form-check-label"},"Hide",-1),Ct=["innerHTML"],$t={key:1},yt={class:"row"},gt={class:"col-sm-12"},ft=e("label",null,"Title",-1),Mt=["onClick"],Ut=["onClick"],wt=["onClick"],Vt=["onClick"],St=["onUpdate:modelValue"],Tt={class:"form-check"},Et=["onUpdate:modelValue"],Lt=e("label",{class:"form-check-label"},"Hide",-1),At={key:0,class:"row"},Nt={class:"col-sm-12"},Pt=e("label",null,"Section Description (markdown allowed)",-1),Ht=["onUpdate:modelValue"],Dt={key:2},Bt={key:0},It=["href"],Rt=["onClick"],Ft=["onClick"],jt=["onClick"],zt=["onClick"],Kt={class:"form-check"},Ot=["onUpdate:modelValue"],Wt=e("label",{class:"form-check-label"},"Complete",-1),Xt={class:"form-check"},qt=["onUpdate:modelValue"],Gt=e("label",{class:"form-check-label"},"Hide",-1),Jt={key:0,style:{float:"right","max-width":"40%"}},Qt=["src","alt"],Yt=["innerHTML"],Zt=["innerHTML"],xt=e("h4",null,"Session Notes",-1),eo=["onUpdate:modelValue"],to={key:1},oo=e("hr",null,null,-1),so={class:"row"},lo={class:"col-sm-4"},no=e("label",null,"Name",-1),ao=["onClick"],io=["onClick"],ro=["onClick"],co=["onClick"],uo=["onUpdate:modelValue"],ho={class:"col-sm-3"},mo=e("label",null,"Runner Link",-1),_o=["onUpdate:modelValue"],po={class:"col-sm-3"},bo=e("label",null,"Image URL",-1),ko=["onUpdate:modelValue"],vo={class:"col-sm-2"},Co=e("label",null,"Flags",-1),$o={class:"form-check"},yo=["onUpdate:modelValue"],go=e("label",{class:"form-check-label"},"Complete",-1),fo={class:"row"},Mo={class:"col-sm-12"},Uo=e("label",null,"Encounter Text (markdown allowed)",-1),wo=["onUpdate:modelValue"],Vo=e("label",null,"Potential Treasure (markdown allowed)",-1),So=["onUpdate:modelValue"],To=["value"],Eo=["onClick"],Lo=["onClick"],Ao={key:3,class:"row"},No=e("hr",null,null,-1),Po={class:"btn-group"},Ho=["onClick"],Do={class:"row"},Bo=e("hr",null,null,-1),Io={class:"btn-group"};function Ro(t,i,b,C,w,V){return n(),a("div",null,[t.campaign?(n(),a("div",Q,[e("div",Y,[t.campaign.buildmode?r("",!0):(n(),a("h2",Z,[m(u(t.campaign.title)+" ",1),e("button",{onClick:i[0]||(i[0]=s=>t.campaign.buildmode=!0),class:"btn btn-primary btn-sm"},"\u270E")])),t.campaign.buildmode?(n(),a("div",x,[e("label",ee,[m(" Campaign Title "),h(e("input",{type:"text","onUpdate:modelValue":i[1]||(i[1]=s=>t.campaign.title=s),class:"charsheet-text"},null,512),[[p,t.campaign.title]])]),e("label",te,[m(" URI (campaign information will be reachable via https://elthelas.com/tools/campaigns/"+u(t.campaign.url)+" ",1),h(e("input",{type:"text","onUpdate:modelValue":i[2]||(i[2]=s=>t.campaign.url=s),class:"charsheet-text"},null,512),[[p,t.campaign.url]])]),e("div",oe,[e("button",{onClick:i[3]||(i[3]=s=>t.campaign.buildmode=!1),class:"btn btn-primary btn-sm"},"Done")])])):r("",!0),e("div",se,[t.showChapters?(n(),a("div",le,[e("nav",ne,[(n(!0),a(M,null,U(t.campaign.chapters,(s,l)=>(n(),a("li",{class:"navitem",key:s.id},[e("a",{href:"#",onClick:o=>t.loadChapter(s)},"Chapter "+u(l)+": "+u(s.title),9,ae),e("button",{onClick:o=>t.moveChUp(l)},"\u2191",8,ie),e("button",{onClick:o=>t.moveChDown(l)},"\u2193",8,de),e("button",{onClick:o=>t.deleteChapter(l)},"\u{1F5D1}",8,re)]))),128))]),e("button",{class:"btn btn-primary",onClick:i[4]||(i[4]=s=>t.addChapter()),style:{"margin-top":"12px"}},"Add Chapter")])):r("",!0),e("div",{class:T(t.showChapters?"col-sm-9":"col-sm-12")},[t.chapter.buildmode?r("",!0):(n(),a("h3",ce,[m(u(t.chapter.title)+" ",1),e("button",{onClick:i[5]||(i[5]=s=>t.chapter.buildmode=!0),class:"btn btn-primary btn-sm"},"\u270E")])),t.chapter.buildmode?(n(),a("div",ue,[e("label",he,[m(" Chapter Title "),h(e("input",{type:"text",class:"charsheet-text btn-sm","onUpdate:modelValue":i[6]||(i[6]=s=>t.chapter.title=s)},null,512),[[p,t.chapter.title]])]),e("div",me,[e("button",{onClick:i[7]||(i[7]=s=>t.chapter.buildmode=!1),class:"btn btn-primary"},"Done")])])):r("",!0),(n(!0),a(M,null,U(t.chapter.encounters,(s,l)=>(n(),a("div",{key:s.id,class:T(s.complete?"complete":"")},[s.buildmode?r("",!0):(n(),a("div",_e,[e("h3",null,[e("a",{href:s.link,target:"_blank"},u(s.name),9,pe),e("button",{onClick:o=>t.moveEnUp(l)},"\u2191",8,be),e("button",{onClick:o=>t.moveEnDown(l)},"\u2193",8,ke),e("button",{onClick:o=>t.loadEncounter(s.link),class:"btn btn-success"},"Run in Tab",8,ve)]),e("button",{class:"btn btn-primary",onClick:o=>{s.buildmode=!0}},"\u270E",8,Ce),e("div",$e,[h(e("input",{type:"checkbox",class:"form-check-input","onUpdate:modelValue":o=>s.complete=o},null,8,ye),[[f,s.complete]]),ge]),e("div",fe,[h(e("input",{type:"checkbox",class:"form-check-input","onUpdate:modelValue":o=>s.closed=o},null,8,Me),[[f,s.closed]]),Ue]),s.image&&!s.closed?(n(),a("div",we,[e("img",{src:s.image,alt:s.name},null,8,Ve)])):r("",!0),s.closed?r("",!0):(n(),a("div",{key:1,innerHTML:t.marked.parse(s.text)},null,8,Se)),s.closed?r("",!0):(n(),a("div",{key:2,innerHTML:t.marked.parse(s.treasure)},null,8,Te)),e("div",null,[Ee,h(e("textarea",{"onUpdate:modelValue":o=>s.sessionnotes=o,class:"form-control"},null,8,Le),[[p,s.sessionnotes]])])])),s.buildmode?(n(),a("div",Ae,[e("div",Ne,[e("div",Pe,[He,e("button",{onClick:o=>t.moveEnUp(l)},"\u2191",8,De),e("button",{onClick:o=>t.moveEnDown(l)},"\u2193",8,Be),e("button",{onClick:o=>t.deleteEncounter(l)},"\u{1F5D1}",8,Ie),h(e("input",{type:"text",class:"charsheet-text","onUpdate:modelValue":o=>s.name=o},null,8,Re),[[p,s.name]])]),e("div",Fe,[je,h(e("input",{type:"text",class:"charsheet-text","onUpdate:modelValue":o=>s.link=o},null,8,ze),[[p,s.link]])])]),e("div",Ke,[e("div",Oe,[We,h(e("input",{type:"text",class:"charsheet-text","onUpdate:modelValue":o=>s.image=o},null,8,Xe),[[p,s.image]])]),e("div",qe,[Ge,e("div",Je,[h(e("input",{type:"checkbox",class:"form-check-input","onUpdate:modelValue":o=>s.random=o},null,8,Qe),[[f,s.random]]),Ye]),e("div",Ze,[h(e("input",{type:"checkbox",class:"form-check-input","onUpdate:modelValue":o=>s.complete=o},null,8,xe),[[f,s.complete]]),et])])]),e("div",tt,[e("div",ot,[st,h(e("textarea",{"onUpdate:modelValue":o=>s.text=o,class:"form-control encounterbox"},null,8,lt),[[p,s.text]])]),e("div",{class:"col-sm-6",innerHTML:t.marked.parse(s.text)},null,8,nt)]),e("div",null,[at,h(e("textarea",{"onUpdate:modelValue":o=>s.treasure=o,class:"form-control"},null,8,it),[[p,s.treasure]])]),e("button",{onClick:o=>s.buildmode=!1,class:"btn btn-primary"},"Done",8,dt)])):r("",!0)],2))),128)),(n(!0),a(M,null,U(t.chapter.sections,(s,l)=>(n(),a("div",{key:s.id,class:T(s.complete?"complete":"")},[s.buildmode?r("",!0):(n(),a("div",rt,[e("h3",null,[m(u(s.title)+" ",1),e("button",{onClick:o=>t.moveSectionUp(l),class:"btn btn-sm"},"\u2191",8,ct),e("button",{onClick:o=>t.moveSectionDown(l),class:"btn btn-sm"},"\u2193",8,ut),e("button",{onClick:o=>s.buildmode=!0,class:"btn btn-sm"},"\u270E",8,ht)]),e("div",mt,[h(e("input",{type:"checkbox",class:"form-check-input","onUpdate:modelValue":o=>s.complete=o},null,8,_t),[[f,s.complete]]),pt]),e("div",bt,[h(e("input",{type:"checkbox",class:"form-check-input","onUpdate:modelValue":o=>s.hidden=o},null,8,kt),[[f,s.hidden]]),vt]),s.hidden?r("",!0):(n(),a("div",{key:0,innerHTML:t.marked.parse(s.description)},null,8,Ct))])),s.buildmode?(n(),a("div",$t,[e("div",yt,[e("div",gt,[ft,e("button",{onClick:o=>t.moveSectionUp(l),class:"btn btn-sm"},"\u2191",8,Mt),e("button",{onClick:o=>t.moveSectionDown(l),class:"btn btn-sm"},"\u2193",8,Ut),e("button",{onClick:o=>t.deleteSection(s),class:"btn btn-sm"},"\u{1F5D1}",8,wt),e("button",{onClick:o=>s.buildmode=!1,class:"btn btn-sm"},"Done",8,Vt),h(e("input",{type:"text",class:"charsheet-text","onUpdate:modelValue":o=>s.title=o},null,8,St),[[p,s.title]])])]),e("div",Tt,[h(e("input",{type:"checkbox",class:"form-check-input","onUpdate:modelValue":o=>s.hidden=o},null,8,Et),[[f,s.hidden]]),Lt]),s.hidden?r("",!0):(n(),a("div",At,[e("div",Nt,[Pt,h(e("textarea",{"onUpdate:modelValue":o=>s.description=o,class:"form-control encounterbox"},null,8,Ht),[[p,s.description]])])]))])):r("",!0),s.hidden?r("",!0):(n(),a("div",Dt,[(n(!0),a(M,null,U(s.encounters,(o,k)=>(n(),a("div",{key:o.id,class:T(o.complete?"complete":"")},[o.buildmode?r("",!0):(n(),a("div",Bt,[e("h4",null,[e("a",{href:o.link,target:"_blank"},u(o.name),9,It),e("button",{onClick:c=>t.moveEncounterUpInSection({section:s,index:k}),class:"btn btn-xs"},"\u2191",8,Rt),e("button",{onClick:c=>t.moveEncounterDownInSection({section:s,index:k}),class:"btn btn-xs"},"\u2193",8,Ft),e("button",{onClick:c=>t.loadEncounter(o.link),class:"btn btn-success btn-xs"},"Run in Tab",8,jt),e("button",{onClick:c=>o.buildmode=!0,class:"btn btn-xs"},"\u270E",8,zt)]),e("div",Kt,[h(e("input",{type:"checkbox",class:"form-check-input","onUpdate:modelValue":c=>o.complete=c},null,8,Ot),[[f,o.complete]]),Wt]),e("div",Xt,[h(e("input",{type:"checkbox",class:"form-check-input","onUpdate:modelValue":c=>o.closed=c},null,8,qt),[[f,o.closed]]),Gt]),o.image&&!o.closed?(n(),a("div",Jt,[e("img",{src:o.image,alt:o.name},null,8,Qt)])):r("",!0),o.closed?r("",!0):(n(),a("div",{key:1,innerHTML:t.marked.parse(o.text)},null,8,Yt)),o.closed?r("",!0):(n(),a("div",{key:2,innerHTML:t.marked.parse(o.treasure)},null,8,Zt)),e("div",null,[xt,h(e("textarea",{"onUpdate:modelValue":c=>o.sessionnotes=c,class:"form-control"},null,8,eo),[[p,o.sessionnotes]])])])),o.buildmode?(n(),a("div",to,[oo,e("div",so,[e("div",lo,[no,e("button",{onClick:c=>t.moveEncounterUpInSection({section:s,index:k}),class:"btn btn-sm"},"\u2191",8,ao),e("button",{onClick:c=>t.moveEncounterDownInSection({section:s,index:k}),class:"btn btn-sm"},"\u2193",8,io),e("button",{onClick:c=>t.deleteEncounterFromSection({section:s,encounter:o}),class:"btn btn-sm"},"\u{1F5D1}",8,ro),e("button",{onClick:c=>o.buildmode=!1,class:"btn btn-sm"},"Done",8,co),h(e("input",{type:"text",class:"charsheet-text","onUpdate:modelValue":c=>o.name=c},null,8,uo),[[p,o.name]])]),e("div",ho,[mo,h(e("input",{style:{"margin-top":"8px"},type:"text",class:"charsheet-text","onUpdate:modelValue":c=>o.link=c},null,8,_o),[[p,o.link]])]),e("div",po,[bo,h(e("input",{style:{"margin-top":"8px"},type:"text",class:"charsheet-text","onUpdate:modelValue":c=>o.image=c},null,8,ko),[[p,o.image]])]),e("div",vo,[Co,e("div",$o,[h(e("input",{type:"checkbox",class:"form-check-input","onUpdate:modelValue":c=>o.complete=c},null,8,yo),[[f,o.complete]]),go])])]),e("div",fo,[e("div",Mo,[Uo,h(e("textarea",{"onUpdate:modelValue":c=>o.text=c,class:"form-control"},null,8,wo),[[p,o.text]])])]),e("div",null,[Vo,h(e("textarea",{"onUpdate:modelValue":c=>o.treasure=c,class:"form-control"},null,8,So),[[p,o.treasure]])]),e("div",null,[m(" Move to Section "),h(e("select",{"onUpdate:modelValue":i[8]||(i[8]=c=>t.section2=c),class:"form-control form-control-sm"},[(n(!0),a(M,null,U(t.chapter.sections,c=>(n(),a("option",{key:c.id,value:c},u(s.title),9,To))),128))],512),[[O,t.section2]]),e("button",{class:"btn btn-success btn-sm",onClick:c=>t.moveEncounterFromSectionToSection({section1:s,section2:t.section2,encounter:o})},"Go",8,Eo),e("button",{class:"btn btn-primary btn-sm",onClick:c=>t.addEncounterToSection({section:s,index:k+1})},"Add Encounter After This One",8,Lo)])])):r("",!0)],2))),128))])),s.hidden?r("",!0):(n(),a("div",Ao,[No,e("div",Po,[e("button",{class:"btn btn-primary",onClick:o=>t.addEncounterToSection({section:s,index:s.encounters.length})},"Add Encounter",8,Ho)])]))],2))),128)),e("div",Do,[Bo,e("div",Io,[e("button",{class:"btn btn-primary",onClick:i[9]||(i[9]=s=>t.addSection())},"Add Section")])])],2)])])])):r("",!0)])}var Fo=A(J,[["render",Ro]]),jo={setup(){const t=E(),{current:i,campaignCharacters:b}=L(t),{invitePCToCampaign:C,fetchCampaignCharacter:w}=t,{skillMod:V,statMod:s,saveMod:l,statTotal:o,initMod:k,acCalc:c,profbonus:d,armorAC:_}=W;return{campaign:i,pcs:b,invitePC:C,fetchCampaignCharacter:w,skillMod:V,statMod:s,saveMod:l,statTotal:o,initMod:k,acCalc:c,armorAC:_,profbonus:d,marked:B}},data:function(){return{pcid:""}},methods:{addToCampaign(){this.campaign.playercharacters.push(this.pcid),this.fetchCampaignCharacter(this.pcid),this.pcid=""},reloadCharacter(t){let i=this.pcs.findIndex(b=>b._id===t._id);this.pcs.splice(i,1),this.fetchCampaignCharacter(t._id)},rollCheck(t){let i=I.roll("1d20").total,b=I.roll("1d20").total;alert("Base Roll: "+(i+t)+" ("+i+" + "+t+`)
Adv/Dis Roll: `+(b+t)+" ("+b+" + "+t+")")},removeFromCampaign(t){let i=this.campaign.playercharacters.findIndex(C=>C===t._id);this.campaign.playercharacters.splice(i,1);let b=this.pcs.findIndex(C=>C._id===t._id);this.pcs.splice(b,1)}}};const zo={class:"row"},Ko={class:"col-sm-3"},Oo={class:"col-sm-1 btn-group"},Wo={class:"row"},Xo={class:"btn-group"},qo=["onClick"],Go=["onClick"],Jo={class:"row"},Qo={class:"col-6"},Yo={class:"charsheet-static center"},Zo=e("br",null,null,-1),xo={class:"col-6"},es={class:"charsheet-static center"},ts={key:0},os={class:"abilitytable"},ss=e("thead",null,[e("tr",null,[e("th",null,"Ability"),e("th",null,"Score"),e("th",null,"Mod"),e("th",null,"Save")])],-1),ls=e("th",null,"STR",-1),ns=["onClick"],as={key:0},is=["onClick"],ds={key:0},rs=e("th",null,"DEX",-1),cs=["onClick"],us={key:0},hs=["onClick"],ms={key:0},_s=e("th",null,"CON",-1),ps=["onClick"],bs={key:0},ks=["onClick"],vs={key:0},Cs=e("th",null,"INT",-1),$s=["onClick"],ys={key:0},gs=["onClick"],fs={key:0},Ms=e("th",null,"WIS",-1),Us=["onClick"],ws={key:0},Vs=["onClick"],Ss={key:0},Ts=e("th",null,"CHA",-1),Es=["onClick"],Ls={key:0},As=["onClick"],Ns={key:0},Ps={class:"abilitytable"},Hs=e("thead",null,[e("tr",null,[e("th",null,"Skill"),e("th",null,"Mod")])],-1),Ds=["onClick"],Bs={key:0},Is={class:"charsheet-static"},Rs=e("h5",null,"Proficiencies and Languages",-1),Fs={style:{"font-size":"9px","margin-bottom":"2px"}},js=e("strong",null,"Armor: ",-1),zs={style:{"font-size":"9px","margin-bottom":"2px"}},Ks=e("strong",null,"Weapons: ",-1),Os={style:{"font-size":"9px","margin-bottom":"2px"}},Ws=e("strong",null,"Tools: ",-1),Xs={style:{"font-size":"9px","margin-bottom":"2px"}},qs=e("strong",null,"Saves: ",-1),Gs=["innerHTML"];function Js(t,i,b,C,w,V){const s=y("router-link");return n(),a("div",null,[m(" PC Manager "),e("div",zo,[e("div",Ko,[h(e("input",{type:"text","onUpdate:modelValue":i[0]||(i[0]=l=>t.pcid=l),class:"charsheet-text",title:"input the character id number found in the campaign info section of the character sheet to add them to the tracker."},null,512),[[p,t.pcid]])]),e("div",Oo,[e("button",{class:"btn btn-primary btn-sm",onClick:i[1]||(i[1]=l=>t.addToCampaign())},"Add PC")])]),e("div",Wo,[(n(!0),a(M,null,U(t.pcs,l=>(n(),a("div",{key:l._id,class:"col-sm-2"},[e("h4",null,[$(s,{to:"/tools/charbuilder/"+l._id,target:"_blank"},{default:g(()=>[m(u(l.name),1)]),_:2},1032,["to"])]),e("div",Xo,[e("button",{onClick:o=>t.reloadCharacter(l),class:"btn btn-success"},"Reload",8,qo),e("button",{onClick:o=>t.removeFromCampaign(l),class:"btn btn-danger"},"Remove",8,Go)]),e("div",Jo,[e("div",Qo,[e("div",Yo,[m(" AC"),Zo,m(u(t.acCalc(l)),1)])]),e("div",xo,[e("div",es,[m(" Initiative: "),t.initMod(l)>-1?(n(),a("span",ts,"+")):r("",!0),m(u(t.initMod(l)),1)])])]),e("table",os,[ss,e("tbody",null,[e("tr",null,[ls,e("td",null,u(t.statTotal(l,0)),1),e("td",null,[e("button",{onClick:o=>t.rollCheck(t.statMod(l,0))},[t.statMod(l,0)>-1?(n(),a("span",as,"+")):r("",!0),m(u(t.statMod(l,0)),1)],8,ns)]),e("td",null,[e("button",{onClick:o=>t.rollCheck(t.saveMod(l,0))},[t.saveMod(l,0)>-1?(n(),a("span",ds,"+")):r("",!0),m(u(t.saveMod(l,0)),1)],8,is)])]),e("tr",null,[rs,e("td",null,u(t.statTotal(l,1)),1),e("td",null,[e("button",{onClick:o=>t.rollCheck(t.statMod(l,1))},[t.statMod(l,1)>-1?(n(),a("span",us,"+")):r("",!0),m(u(t.statMod(l,1)),1)],8,cs)]),e("td",null,[e("button",{onClick:o=>t.rollCheck(t.saveMod(l,1))},[t.saveMod(l,1)>-1?(n(),a("span",ms,"+")):r("",!0),m(u(t.saveMod(l,1)),1)],8,hs)])]),e("tr",null,[_s,e("td",null,u(t.statTotal(l,2)),1),e("td",null,[e("button",{onClick:o=>t.rollCheck(t.statMod(l,2))},[t.statMod(l,2)>-1?(n(),a("span",bs,"+")):r("",!0),m(u(t.statMod(l,2)),1)],8,ps)]),e("td",null,[e("button",{onClick:o=>t.rollCheck(t.saveMod(l,2))},[t.saveMod(l,2)>-1?(n(),a("span",vs,"+")):r("",!0),m(u(t.saveMod(l,2)),1)],8,ks)])]),e("tr",null,[Cs,e("td",null,u(t.statTotal(l,3)),1),e("td",null,[e("button",{onClick:o=>t.rollCheck(t.statMod(l,3))},[t.statMod(l,3)>-1?(n(),a("span",ys,"+")):r("",!0),m(u(t.statMod(l,3)),1)],8,$s)]),e("td",null,[e("button",{onClick:o=>t.rollCheck(t.saveMod(l,3))},[t.saveMod(l,3)>-1?(n(),a("span",fs,"+")):r("",!0),m(u(t.saveMod(l,3)),1)],8,gs)])]),e("tr",null,[Ms,e("td",null,u(t.statTotal(l,4)),1),e("td",null,[e("button",{onClick:o=>t.rollCheck(t.statMod(l,4))},[t.statMod(l,4)>-1?(n(),a("span",ws,"+")):r("",!0),m(u(t.statMod(l,4)),1)],8,Us)]),e("td",null,[e("button",{onClick:o=>t.rollCheck(t.saveMod(l,4))},[t.saveMod(l,4)>-1?(n(),a("span",Ss,"+")):r("",!0),m(u(t.saveMod(l,4)),1)],8,Vs)])]),e("tr",null,[Ts,e("td",null,u(t.statTotal(l,5)),1),e("td",null,[e("button",{onClick:o=>t.rollCheck(t.statMod(l,5))},[t.statMod(l,5)>-1?(n(),a("span",Ls,"+")):r("",!0),m(u(t.statMod(l,5)),1)],8,Es)]),e("td",null,[e("button",{onClick:o=>t.rollCheck(t.saveMod(l,5))},[t.saveMod(l,5)>-1?(n(),a("span",Ns,"+")):r("",!0),m(u(t.saveMod(l,5)),1)],8,As)])])])]),e("table",Ps,[Hs,e("tbody",null,[(n(!0),a(M,null,U(l.skills,o=>(n(),a("tr",{key:o.name},[e("th",null,u(o.name),1),e("td",null,[e("button",{onClick:k=>t.rollCheck(t.skillMod(l,o))},[t.skillMod(l,o)>-1?(n(),a("span",Bs,"+")):r("",!0),m(u(t.skillMod(l,o)),1)],8,Ds)])]))),128))])]),e("div",Is,[Rs,e("p",Fs,[js,m(u(l.charclasses[0].thisclass.proficiencies.armor.join(", ")),1)]),e("p",zs,[Ks,m(u(l.charclasses[0].thisclass.proficiencies.weapons.join(", ")),1)]),e("p",Os,[Ws,m(u(l.charclasses[0].thisclass.proficiencies.tools.join(", ")),1)]),e("p",Xs,[qs,m(u(l.charclasses[0].thisclass.proficiencies["saving throws"].join(", ")),1)]),e("p",{innerHTML:l.proficiencies,style:{"font-size":"9px","margin-bottom":"2px"}},null,8,Gs)])]))),128))])])}var Qs=A(jo,[["render",Js]]),Ys={setup(){const t=E(),{current:i}=L(t);return{campaign:i,marked:B}},props:{buildmode:Boolean},computed:{availableChapters:function(){let t=[];return this.campaign.chapters.forEach(i=>{t.push({value:i.title,text:i.title})}),t},filteredNPCs:function(){let t=[];return this.campaign.npcs.forEach(i=>{(this.filterByChapter==="all"||i.chapters.includes("all")||i.chapters.includes(this.filterByChapter))&&t.push(i)}),t}},data:function(){return{filterByChapter:"all"}},methods:{newNPC(){this.campaign.npcs.push({id:Math.random(),name:"New NPC",editMode:!0,job:"",relation:"",link:"",skills:"",location:"",motivations:"",history:"",chapters:["all"],show:!0})},switchEditMode(t){t.editMode=!t.editMode},deleteNPC(t){let i=this.campaign.npcs.findIndex(b=>b.id===t.id);window.confirm("Are you sure you want to delete "+t.name+"?")&&this.campaign.npcs.splice(i,1)}}};const Zs={key:0},xs=["onUpdate:modelValue"],el=["onClick"],tl=["onClick"],ol=["onClick"],sl={key:0},ll={key:1},nl={key:0},al={class:"row"},il={class:"col-sm-2"},dl=e("strong",null,"Job: ",-1),rl={key:0},cl=["onUpdate:modelValue"],ul={class:"col-sm-3"},hl=e("strong",null,"Relation to Party:",-1),ml={key:0},_l=["onUpdate:modelValue"],pl={class:"col-sm-7"},bl=e("strong",null,"Link to Stats",-1),kl={key:1},vl=["onUpdate:modelValue"],Cl={class:"row"},$l={class:"col-sm-2"},yl=e("strong",null,"Location:",-1),gl={key:0},fl=["onUpdate:modelValue"],Ml={class:"col-sm-10"},Ul=e("strong",null,"Relevant Chapters:",-1),wl={class:"row"},Vl={class:"col-sm-12"},Sl=e("strong",null,"History: ",-1),Tl=["innerHTML"],El=["onUpdate:modelValue"],Ll={class:"row"},Al={class:"col-sm-12"},Nl=e("strong",null,"Motivations: ",-1),Pl=["innerHTML"],Hl=["onUpdate:modelValue"];function Dl(t,i,b,C,w,V){const s=y("b-form-radio"),l=y("b-form-radio-group"),o=y("router-link"),k=y("b-form-checkbox"),c=y("b-form-checkbox-group");return n(),a("div",null,[e("button",{onClick:i[0]||(i[0]=d=>t.newNPC())},"Add NPC"),e("div",null,[e("label",null,[m(" Filter By Chapter: "),$(l,{modelValue:t.filterByChapter,"onUpdate:modelValue":i[1]||(i[1]=d=>t.filterByChapter=d),options:t.availableChapters,name:"filterByChapter"},{default:g(()=>[$(s,{value:"all"},{default:g(()=>[m("All")]),_:1})]),_:1},8,["modelValue","options"])])]),(n(!0),a(M,null,U(t.filteredNPCs,d=>(n(),a("div",{key:d.id,class:"card"},[e("h3",null,[d.editMode?r("",!0):(n(),a("span",Zs,u(d.name),1)),d.editMode?h((n(),a("input",{key:1,type:"text",class:"form-control","onUpdate:modelValue":_=>d.name=_},null,8,xs)),[[p,d.name]]):r("",!0),e("button",{class:"btn-symbol btn-sm",onClick:_=>t.switchEditMode(d)},"\u270E",8,el),e("button",{class:"btn-symbol btn-sm",onClick:_=>t.deleteNPC(d)},"\u{1F5D1}",8,tl),e("button",{type:"button",class:"btn btn-primary float-right",onClick:_=>d.show=!d.show},[d.show?(n(),a("span",sl,"\u25B2")):r("",!0),d.show?r("",!0):(n(),a("span",ll,"\u25BC"))],8,ol)]),d.show?(n(),a("div",nl,[e("div",al,[e("label",il,[dl,d.editMode?r("",!0):(n(),a("span",rl,u(d.job),1)),d.editMode?h((n(),a("input",{key:1,type:"text",class:"form-control","onUpdate:modelValue":_=>d.job=_},null,8,cl)),[[p,d.job]]):r("",!0)]),e("label",ul,[hl,d.editMode?r("",!0):(n(),a("span",ml,u(d.relation),1)),d.editMode?h((n(),a("input",{key:1,type:"text",class:"form-control","onUpdate:modelValue":_=>d.relation=_},null,8,_l)),[[p,d.relation]]):r("",!0)]),e("label",pl,[d.editMode?r("",!0):(n(),D(o,{key:0,to:d.link,target:"_blank"},{default:g(()=>[bl]),_:2},1032,["to"])),d.editMode?(n(),a("strong",kl,"Link to Stats")):r("",!0),d.editMode?h((n(),a("input",{key:2,type:"text",class:"form-control","onUpdate:modelValue":_=>d.link=_},null,8,vl)),[[p,d.link]]):r("",!0)])]),e("div",Cl,[e("label",$l,[yl,d.editMode?r("",!0):(n(),a("span",gl,u(d.location),1)),d.editMode?h((n(),a("input",{key:1,type:"text",class:"form-control","onUpdate:modelValue":_=>d.location=_},null,8,fl)),[[p,d.location]]):r("",!0)]),e("label",Ml,[Ul,d.editMode?r("",!0):(n(!0),a(M,{key:0},U(d.chapters,_=>(n(),a("span",{key:_},u(_),1))),128)),d.editMode?(n(),D(c,{key:1,modelValue:d.chapters,"onUpdate:modelValue":_=>d.chapters=_,options:t.availableChapters},{default:g(()=>[$(k,{value:"all"},{default:g(()=>[m("All")]),_:1})]),_:2},1032,["modelValue","onUpdate:modelValue","options"])):r("",!0)])]),e("div",wl,[e("label",Vl,[Sl,d.editMode?r("",!0):(n(),a("span",{key:0,innerHTML:t.marked.parse(d.history)},null,8,Tl)),d.editMode?h((n(),a("textarea",{key:1,"onUpdate:modelValue":_=>d.history=_,class:"form-control"},null,8,El)),[[p,d.history]]):r("",!0)])]),e("div",Ll,[e("label",Al,[Nl,d.editMode?r("",!0):(n(),a("span",{key:0,innerHTML:t.marked.parse(d.motivations)},null,8,Pl)),d.editMode?h((n(),a("textarea",{key:1,"onUpdate:modelValue":_=>d.motivations=_,class:"form-control"},null,8,Hl)),[[p,d.motivations]]):r("",!0)])])])):r("",!0)]))),128))])}var Bl=A(Ys,[["render",Dl]]),Il={setup(){const t=E(),i=X(),{campaigns:b,current:C,currentChapter:w,campaignCharacters:V}=L(t),{getUserInfo:s,isLoggedIn:l}=i,{getAllCampaigns:o,getAllCampaignsSilent:k,saveNewCampaign:c,saveCampaign:d,loadCampaign:_,loadCampaignById:v,loadCampaignByUrl:S,deleteCampaign:N,newCampaign:P}=t;let H=C.buildmode;return R({title:"Campaign Builder"}),{campaigns:t,userinfo:i,allCampaigns:b,campaign:C,chapter:w,pcs:V,token:s,loggedin:l,buildmode:H,getAll:o,getAllSilent:k,saveNew:c,save:d,load:_,loadById:v,loadByUrl:S,deleteCamp:N,newCamp:P}},components:{notes:Fo,pcmanager:Qs,npcmanager:Bl,runner:G,modal:q},data:function(){return{comp:this,showChapters:!0,creArray:[],charArray:[],runnerKey:0,activeTab:0,modalProps:{isActive:!1}}},watch:{campaign:{handler(){this.campaign._id&&this.loggedin&&this.save()},deep:!0}},methods:{loadEncounter(t){this.creArray=t.substr(t.search("runner/")+7).split("&"),this.charArray=this.pcs,this.runnerKey++,this.activeTab=3,window.scroll(1,300)},showLoadModal(){this.modalProps.isActive=!0}},created(){this.getAllSilent().then(()=>{this.$route.params.campaign&&this.loadByUrl({url:this.$route.params.campaign})})}};const Rl={class:"col-sm-12"},Fl={class:"btn-group"},jl={key:0},zl={key:1},Kl={class:"table table-striped"},Ol=e("tr",null,[e("th",null,"Campaign Name"),e("th",null,"-")],-1),Wl=["onClick"],Xl=["onClick"];function ql(t,i,b,C,w,V){const s=y("notes"),l=y("b-tab"),o=y("pcmanager"),k=y("npcmanager"),c=y("runner"),d=y("b-tabs"),_=y("modal");return n(),a("div",Rl,[e("div",Fl,[t.campaign._id?(n(),a("button",{key:0,class:"btn btn-primary",onClick:i[0]||(i[0]=v=>t.save())},"Save")):r("",!0),t.campaign._id?r("",!0):(n(),a("button",{key:1,class:"btn btn-primary",onClick:i[1]||(i[1]=v=>t.saveNew())},"Save New")),e("button",{class:"btn btn-success",onClick:i[2]||(i[2]=v=>{t.getAllSilent(),t.showLoadModal()})},"Load"),e("button",{class:"btn btn-warning",onClick:i[3]||(i[3]=v=>t.newCamp())},"New Campaign"),e("button",{class:"btn btn-primary",onClick:i[4]||(i[4]=v=>t.showChapters=!t.showChapters)},[t.showChapters?(n(),a("span",jl,"Hide")):(n(),a("span",zl,"Show")),m(" Chapters")])]),$(d,{modelValue:t.activeTab,"onUpdate:modelValue":i[5]||(i[5]=v=>t.activeTab=v)},{default:g(()=>[$(l,{title:"Notes"},{default:g(()=>[$(s,{buildmode:t.buildmode,"show-chapters":t.showChapters},null,8,["buildmode","show-chapters"])]),_:1}),$(l,{title:"PC Manager"},{default:g(()=>[$(o)]),_:1}),$(l,{title:"NPCs"},{default:g(()=>[$(k,{buildmode:t.buildmode},null,8,["buildmode"])]),_:1}),$(l,{title:"Encounter Runner"},{default:g(()=>[(n(),D(c,{"cre-array":t.creArray,"char-array":t.charArray,key:t.runnerKey},null,8,["cre-array","char-array"]))]),_:1})]),_:1},8,["modelValue"]),$(_,{id:"campaignmodal",title:"Load File from Server",modalProps:t.modalProps},{default:g(()=>[e("table",Kl,[Ol,(n(!0),a(M,null,U(t.allCampaigns,v=>(n(),a("tr",{key:v._id},[e("td",null,[e("a",{class:"clickable",onClick:S=>{t.load({campaign:v,comp:t.comp}),t.modalProps.isActive=!1}},u(v.title),9,Wl)]),e("td",null,[e("input",{type:"button",onClick:S=>t.deleteCamp(v),class:"btn btn-danger",value:"X"},null,8,Xl)])]))),128))])]),_:1},8,["modalProps"])])}var Yl=A(Il,[["render",ql]]);export{Yl as default};
