import{u as _,s as k,B as T,m as N,_ as A,g as y,o as l,c as i,h as d,w as r,a as e,G as m,F as c,r as p,N as g,t as s,l as M,C as B,K as w,d as v,p as S,q as D,e as L}from"./index.js";const H={setup(){const t=_(),{gods:a}=k(t);return T({title:"Gods"}),{gods:a,statics:t,marked:N}},computed:{domains(){let t=[];return this.gods.forEach(a=>{a.domains5.split(", ").forEach(f=>{t.includes(f)||t.push(f)})}),t.sort()},sortGods(){return this.gods.sort((t,a)=>t[this.sortBy]>a[this.sortBy]&!this.sortDesc||t[this.sortBy]<a[this.sortBy]&this.sortDesc?1:-1)}},data(){return{GodByName:{lore:"",level10:"",level1:"",holiday:"",worshippers:"",appearance:"",home:""},alignment:"",domain:"",SelectedGod:"",alignmentGods:[],domainGods:[],sortBy:"name",sortDesc:!1}},watch:{alignment:function(){this.alignmentGods=this.gods.filter(t=>t.alignment===this.alignment)},domain:function(){this.domainGods=this.gods.filter(t=>{var a=t.domains5.split(", ");return a.includes(this.domain)})},SelectedGod:function(t){this.loadGod(t)}},methods:{loadGod(t){this.GodByName=this.gods.filter(a=>a.id===t)[0]}},created(){this.statics.getAllGods().then(()=>{if(this.$route.params.god){var t=this.$route.params.god;this.loadGod(this.gods.filter(function(a){return a.id===t||a.name===t})[0].id)}})}};const o=t=>(S("data-v-9debd61a"),t=t(),D(),t),C=o(()=>e("h2",null,"Gods Quick Ref Table",-1)),E={class:"table table-sm table-striped"},V=o(()=>e("th",null,"Symbol",-1)),P=["title"],W={class:"row"},I={class:"col-sm-3"},$=o(()=>e("h2",null,"Browse Gods By...",-1)),F=o(()=>e("h4",null,"Name",-1)),K=["value"],U=o(()=>e("h4",null,"Alignment",-1)),j=o(()=>e("option",{value:"",selected:"selected"},"Select an Alignment",-1)),R=o(()=>e("option",{value:"Lawful Good"},"Lawful Good",-1)),q=o(()=>e("option",{value:"Neutral Good"},"Neutral Good",-1)),z=o(()=>e("option",{value:"Chaotic Good"},"Chaotic Good",-1)),Z=o(()=>e("option",{value:"Lawful Neutral"},"Lawful Neutral",-1)),O=o(()=>e("option",{value:"Neutral"},"Neutral",-1)),Q=o(()=>e("option",{value:"Chaotic Neutral"},"Chaotic Neutral",-1)),Y=o(()=>e("option",{value:"Lawful Evil"},"Lawful Evil",-1)),J=o(()=>e("option",{value:"Neutral Evil"},"Neutral Evil",-1)),X=o(()=>e("option",{value:"Chaotic Evil"},"Chaotic Evil",-1)),x=o(()=>e("h4",null,"Domain",-1)),ee=o(()=>e("option",{value:"",selected:""},"Select a Domain",-1)),te=["value"],oe={class:"col-sm-9"},ae={class:"row"},ne={class:"col-7"},se={class:"table table-striped table-responsive"},le=o(()=>e("td",null,"Holy Symbol",-1)),ie={"data-ng-if":"GodByName.symbolimage == undefined"},de=o(()=>e("td",null,"Alignment",-1)),re=o(()=>e("td",null,"Portfolio",-1)),he=o(()=>e("td",null,"Domains 5e",-1)),ue=o(()=>e("td",null,"Favored Weapon",-1)),me=o(()=>e("td",null,"Origins",-1)),ce=o(()=>e("td",null,"Enemies",-1)),pe=o(()=>e("h4",null,"Home",-1)),fe=["innerHTML"],ye=o(()=>e("h4",null,"Appearance",-1)),ve=["innerHTML"],ge=["title"],we=o(()=>e("h4",null,"Worshippers",-1)),be=["innerHTML"],Ge=o(()=>e("h4",null,"High Tenets",-1)),_e=o(()=>e("h4",null,"Holidays",-1)),ke=["innerHTML"],Te=o(()=>e("h4",null,"Level 1 Faction Feature",-1)),Ne=["innerHTML"],Ae=o(()=>e("h4",null,"Level 10 Faction Feature",-1)),Me=["innerHTML"],Be=o(()=>e("h4",null,"Lore and History",-1)),Se=["innerHTML"],De=o(()=>e("div",{class:"row"},[e("div",{class:"col-sm-12"},[e("h2",null,"History and Relationships of the Gods")]),e("div",{class:"col-sm-12"},[e("h3",null,"The 3 Mothers"),e("p",null,[e("strong",null,"Nera, Gaian, and Area"),L(" were the first of the Gods, inevitable from the beginning of the universe. The 3 mother goddesses represented the elemental order, the material, and the elemental chaos. As the first beings of divine spark, their form was absolute, and they could not be destroyed. Meeting together they saw that the Universe was barren, an endless and empty Astral Sea without form or time, and so they agreed to each bring forth 4 children. Nera begat Alohim, Mat'raktha, Io, and Tock, Gaian begat Molton, Trimala, Dorun, and Sylvan, and Area begat Annam, Fanome, Zhuul, and ?. With the aid of these children, they created Elthelas, and all the Planes of Existence. ")]),e("h3",null,"The 3rd Generation"),e("p",null," All was not well, however. The Second Generation of Gods grew jealous of their mothers dominion, and their ability to create new Gods, and so they met together, and together went before their mothers to demand that they confer upon them the ability to create Gods. "),e("p",null,' Their mothers were vexed by their childrens demands, but seeing that they were all resolute, they came to an agreement. "We cannot give you this which you seek, for we have not the power to make equals unto ourselves, however, each of you may entreat each of us for one child, who will share of your essence and that of their Mother God." And so the 3rd generation of Gods was born, 3 for each of the second generation, 1 from each Mother God. '),e("p",null," Many of this generation have perished, or their influence is not known to us today, but we do know that Alohim begat Amathera via Nera, Sara via Gaian, and Cora via Area. Mat'raktha begat Asmodeus via Nera, and Malik via Area. Io begat Bahamut via Nera, Leviathan via Gaian, and Tiamat via Area. Tock begat Chronos via Gaian and Woden via Area (Woden however, perished in the Gods War, and his domain was eventually taken up by Dorman). We also know that Trimala begat Maris via Nera, and Zhuul begat Ba'al via Area. "),e("h3",null,"The Birth of the Mortal Races"),e("p",null," All was not well however, as the 3rd generation saw that their parents and their parents parents could bring forth children, but they could not, so they went to the Mother Gods and demanded that they too be allowed to bring forth children unto the world, but this 3rd generation was too far removed from the Mother Gods to bring forth new Gods, and so the Mother Gods could not meet their request as they had their parents, so instead they gave them the ability to create the lesser beings both mortal and immortal, and gave this ability to their parents as well, and so all the races were born in all their variety, such that the Gods could each have their dominion. "),e("p",null," Chief among these races were the Sorceron, created collectively by all the Gods to share in their power so much as was possible and assist in the creation of the lesser races, but so also at this time were created the Dragons, the Giants, humans, elves, orcs, and dwarves and many others. "),e("h3",null,"The God's War"),e("p",null,` Yet peace was not be had among the Gods, in particular Mat'raktha coveted the dominion of his brother Alohim, for he felt that Alohim had taken more than was fair to him, claiming the dominion of Kings. And so Mat'raktha went to his brother and demanded that he give him Dominion over Kings and Nations and Humanity, but Alohim responded, "No, my brother, I cannot give this to you, for it is a part of me, and to give it up would be my end." `),e("p",null," Mat'raktha grew wroth at his brother's rejection, and struck him, but Alohim resisted, and soon Mat'raktha was forced to retreat. So Mat'raktha conferred with the other Gods, convincing many of the rightness of his claim and together they went to Alohim and demanded that he give up his Dominion over Kings and Nations and all Humanity, and again Alohim refused, and many rallied to his defense, and seeing that he could not force Alohim to give up his dominion, Mat'raktha left. "),e("p",null,` In his anger, Mat'raktha commanded all in his domain and all who would aid him, "Today, and from henceforth, we make war on the children of Alohim, and all who would aid them." And they marched forth their hosts, and Alohim and the Gods of Good marched forth their hosts, and the battle lasted uncountable years upon the face of Elthelas and throughout the Planes of Existence, and many millions died on both sides. `),e("p",null," Then the Mother Gods, seeing the war among their children, met together to decide what to do. Area advocated to destroy all that they had created and start over, without their children and keeping all the powers of creation to the Mother Gods, but Gaian loved her children, and refused her, and in anger Area struck Gaian what should have been a fatal blow were she not absolute. Nevertheless, it left Gaian unconscious and unable to be revived. Seeing this, Nera summoned all her will, and created a great prison beyond the Astral Sea. Then she invited Area to join her for a great feast in this place, for it was full of verdant fields of green, saying it would be the beginning of their new creation, and once Area was within, she sealed it away, banishing Area from Elthelas and all the Planes of Existence forever. "),e("p",null,' Then, Nera summoned her will again and forged it into a single blade, and she spoke to all of the Gods. "In this blade I have created for myself the ability to destroy that which my sisters and I have wrought, yea, even thee our greatest children would suffer death at the hands of this blade, for what we created I can destroy. So long as this blade exists, no God but Gaian will walk upon Elthelas, and each shall be banished to the Planes of their Dominion, and whosoever shall break this eternal truce shall be no more." And with this proclamation, the Gods fled, each to their respective Dominion. The Sorceron fled with them, all but a few, wounded and trapped upon Elthelas. '),e("p",null," The mortal races found themselves alone and scattered upon Elthelas, the gifts of their Gods gone, their homes long destroyed in war, and the long rebuilding began. ")])],-1)),Le=o(()=>e("h3",null,"The Core Pantheons",-1)),He=o(()=>e("p",null," The two sides of the Gods War took to worshipping separate pantheons of Gods after the Gods war, while there has been some shifting and bifurcation since that time, the pantheons can still be split into a few different sets. ",-1)),Ce=o(()=>e("h4",null,"The Imperial Pantheon",-1)),Ee=o(()=>e("p",null," Worshipped in Dormania, Kandor, Gerasalim, Terron, and Seran as the 'Good' gods. This pantheon is made up of: Dorman, Alohim, Sara, Amathera, and Cora. ",-1)),Ve=o(()=>e("h4",null,"The Malinval Pantheon",-1)),Pe=o(()=>e("p",null," Worshipped in Malinval, Parakas, Olda, and Sage. This is a pantheon of Gods who sided with Mat'raktha in the Gods war, and is made up of Mat'raktha, Malik, Vrasja, Asmodeus, Trolka, and Annam. ",-1)),We=o(()=>e("h4",null,"The Draconic Pantheon",-1)),Ie=o(()=>e("p",null," Worshipped by those who revere dragons above all, this pantheon is neither strictly good or evil, and is made up of Indra, Bahamut, and Tiamat. ",-1)),$e=o(()=>e("h4",null,"The Dwarven Pantheon",-1)),Fe=o(()=>e("p",null," Worshipped by the dwarves of both Curinor and Morrind, as well as the gnomes of Stagenheim. This pantheon is made up of Dorun, Maris, Fanome, and Tock. ",-1)),Ke=o(()=>e("h4",null,"The Elven Pantheon",-1)),Ue=o(()=>e("p",null," The elves worship a pantheon focused on nature and the natural world. This pantheon is made up of Gaian, Sylvan, Agrios, Alidal, and Interitus. ",-1)),je=o(()=>e("h4",null,"The Hisru Pantheon",-1)),Re=o(()=>e("p",null," While in Zelfir, they monotheistically worship Amathera, in Hisru'de'tan they worship a panoply of Gods, often under different names than they are recognized by elsewhere. This pantheon is made up of Agrios, Alidal, Gaian, Alitheia, Chronos, Chthonis, Kamin, Labious, Maris, Moira, Molton, Mystikinae, Sneordra, Sylvan, Trimala, and Vulcan. ",-1)),qe=o(()=>e("h4",null,"The Giants Pantheon",-1)),ze=o(()=>e("p",null," Worshipped by the Giants. This pantheon is made up of Annam, Trolka, Leviathan, and Sneordra. ",-1));function Ze(t,a,b,f,Oe,Qe){const h=y("b-tab"),u=y("b-form-select"),G=y("b-tabs");return l(),i("div",null,[d(G,null,{default:r(()=>[d(h,{title:"Table"},{default:r(()=>[C,e("table",E,[e("thead",null,[e("tr",null,[V,e("th",null,[e("a",{href:"#",onClick:a[0]||(a[0]=m(n=>{t.sortBy="name",t.sortDesc=!t.sortDesc},["stop"]))},"Name")]),e("th",null,[e("a",{href:"#",onClick:a[1]||(a[1]=m(n=>{t.sortBy="domains",t.sortDesc=!t.sortDesc},["stop"]))},"Portfolio")]),e("th",null,[e("a",{href:"#",onClick:a[2]||(a[2]=m(n=>{t.sortBy="domains5",t.sortDesc=!t.sortDesc},["stop"]))},"Domains")]),e("th",null,[e("a",{href:"#",onClick:a[3]||(a[3]=m(n=>{t.sortBy="alignment",t.sortDesc=!t.sortDesc},["stop"]))},"Alignment")])])]),e("tbody",null,[(l(!0),i(c,null,p(t.sortGods,n=>(l(),i("tr",{key:n.id},[e("td",{style:g("background-image: url("+n.symbolimage+");max-height:30px;width:auto;background-size:contain;background-repeat: no-repeat;"),title:t.GodByName.holysymbol},null,12,P),e("td",null,s(n.name),1),e("td",null,s(n.domains),1),e("td",null,s(n.domains5),1),e("td",null,s(n.alignment),1)]))),128))])])]),_:1}),d(h,{title:"Details"},{default:r(()=>[e("div",W,[e("div",I,[$,F,e("p",null,[M(e("select",{"onUpdate:modelValue":a[4]||(a[4]=n=>t.GodByName=n),class:"form-select"},[(l(!0),i(c,null,p(t.gods,n=>(l(),i("option",{key:n.id,value:n},s(n.name),9,K))),128))],512),[[B,t.GodByName]])]),U,e("p",null,[d(u,{modelValue:t.alignment,"onUpdate:modelValue":a[5]||(a[5]=n=>t.alignment=n)},{default:r(()=>[j,R,q,z,Z,O,Q,Y,J,X]),_:1},8,["modelValue"])]),e("p",null,[t.alignment!==""?(l(),w(u,{key:0,options:t.alignmentGods,modelValue:t.SelectedGod,"onUpdate:modelValue":a[6]||(a[6]=n=>t.SelectedGod=n),"text-field":"name","value-field":"id"},null,8,["options","modelValue"])):v("",!0)]),x,e("p",null,[d(u,{modelValue:t.domain,"onUpdate:modelValue":a[7]||(a[7]=n=>t.domain=n)},{default:r(()=>[ee,(l(!0),i(c,null,p(t.domains,n=>(l(),i("option",{key:n,value:n},s(n),9,te))),128))]),_:1},8,["modelValue"])]),e("p",null,[t.domain!==""?(l(),w(u,{key:0,options:t.domainGods,modelValue:t.SelectedGod,"onUpdate:modelValue":a[8]||(a[8]=n=>t.SelectedGod=n),"text-field":"name","value-field":"id"},null,8,["options","modelValue"])):v("",!0)])]),e("div",oe,[e("div",null,[e("h2",null,s(t.GodByName.name),1),e("div",ae,[e("div",ne,[e("table",se,[e("tr",null,[le,e("td",null,[e("span",ie,s(t.GodByName.holysymbol),1)])]),e("tr",null,[de,e("td",null,s(t.GodByName.alignment),1)]),e("tr",null,[re,e("td",null,s(t.GodByName.domains),1)]),e("tr",null,[he,e("td",null,s(t.GodByName.domains5),1)]),e("tr",null,[ue,e("td",null,s(t.GodByName.weapon),1)]),e("tr",null,[me,e("td",null,s(t.GodByName.parents),1)]),e("tr",null,[ce,e("td",null,s(t.GodByName.enemy),1)])]),pe,e("div",{innerHTML:t.marked.parse(t.GodByName.home)},null,8,fe),ye,e("div",{innerHTML:t.marked.parse(t.GodByName.appearance)},null,8,ve)]),t.GodByName.symbolimage!=null?(l(),i("div",{key:0,class:"symbolimage col-5",style:g("background-image: url("+t.GodByName.symbolimage+")"),title:t.GodByName.holysymbol},null,12,ge)):v("",!0)]),we,e("div",{innerHTML:t.marked.parse(t.GodByName.worshippers)},null,8,be),Ge,e("ul",null,[(l(!0),i(c,null,p(t.GodByName.tenets,n=>(l(),i("li",{key:n},s(n),1))),128))]),_e,e("div",{innerHTML:t.marked.parse(t.GodByName.holiday)},null,8,ke),Te,e("div",{innerHTML:t.marked.parse(t.GodByName.level1)},null,8,Ne),Ae,e("div",{innerHTML:t.marked.parse(t.GodByName.level10)},null,8,Me),Be,e("div",{innerHTML:t.marked.parse(t.GodByName.lore)},null,8,Se)])])])]),_:1}),d(h,{title:"History"},{default:r(()=>[De]),_:1}),d(h,{title:"Core Pantheons"},{default:r(()=>[Le,He,Ce,Ee,Ve,Pe,We,Ie,$e,Fe,Ke,Ue,je,Re,qe,ze]),_:1})]),_:1})])}const Je=A(H,[["render",Ze],["__scopeId","data-v-9debd61a"]]);export{Je as default};
