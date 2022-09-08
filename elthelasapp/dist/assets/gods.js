import{u as G,_}from"./index.js";import{m as N,h as p,o as s,c as i,i as d,w as r,f as e,F as u,j as m,e as g,t as l,l as k,J as A,q as y,g as v,C as M,E as T,k as B}from"./vendor.js";var S={setup(){const t=G();return{gods:t.gods,statics:t,marked:N}},computed:{domains(){let t=[];return this.gods.forEach(n=>{n.domains5.split(", ").forEach(c=>{t.includes(c)||t.push(c)})}),t.sort()}},data(){return{GodByName:{lore:"",level10:"",level1:"",holiday:"",worshippers:"",appearance:"",home:""},alignment:"",domain:"",SelectedGod:"",alignmentGods:[],domainGods:[]}},watch:{alignment:function(){this.alignmentGods=this.gods.filter(t=>t.alignment===this.alignment)},domain:function(){this.domainGods=this.gods.filter(t=>{var n=t.domains5.split(", ");return n.includes(this.domain)})},SelectedGod:function(t){this.loadGod(t)}},methods:{loadGod(t){this.GodByName=this.gods.filter(n=>n.id===t)[0]}},created(){this.statics.getAllGods().then(()=>{if(this.$route.params.god){var t=this.$route.params.god;this.loadGod(this.gods.filter(function(n){return n.id===t||n.name===t})[0].id)}})}};const o=t=>(M("data-v-4fdec80d"),t=t(),T(),t),L=o(()=>e("h2",null,"Gods Quick Ref Table",-1)),H={class:"table table-sm table-striped"},E=o(()=>e("thead",null,[e("tr",null,[e("th",null,"Symbol"),e("th",null,"Name"),e("th",null,"Portfolio"),e("th",null,"Domains"),e("th",null,"Alignment")])],-1)),V=["title"],D={class:"row"},C={class:"col-sm-3"},I=o(()=>e("h2",null,"Browse Gods By...",-1)),W=o(()=>e("h4",null,"Name",-1)),F=["value"],P=o(()=>e("h4",null,"Alignment",-1)),U=o(()=>e("option",{value:"",selected:"selected"},"Select an Alignment",-1)),$=o(()=>e("option",{value:"Lawful Good"},"Lawful Good",-1)),j=o(()=>e("option",{value:"Neutral Good"},"Neutral Good",-1)),q=o(()=>e("option",{value:"Chaotic Good"},"Chaotic Good",-1)),K=o(()=>e("option",{value:"Lawful Neutral"},"Lawful Neutral",-1)),R=o(()=>e("option",{value:"Neutral"},"Neutral",-1)),z=o(()=>e("option",{value:"Chaotic Neutral"},"Chaotic Neutral",-1)),Z=o(()=>e("option",{value:"Lawful Evil"},"Lawful Evil",-1)),J=o(()=>e("option",{value:"Neutral Evil"},"Neutral Evil",-1)),O=o(()=>e("option",{value:"Chaotic Evil"},"Chaotic Evil",-1)),Q=o(()=>e("h4",null,"Domain",-1)),Y=o(()=>e("option",{value:"",selected:""},"Select a Domain",-1)),X=["value"],x={class:"col-sm-9"},ee={class:"row"},te={class:"table table-striped table-responsive col-sm-7"},oe=o(()=>e("td",null,"Holy Symbol",-1)),ae={"data-ng-if":"GodByName.symbolimage == undefined"},ne=o(()=>e("td",null,"Alignment",-1)),le=o(()=>e("td",null,"Portfolio",-1)),se=o(()=>e("td",null,"Domains 5e",-1)),ie=o(()=>e("td",null,"Favored Weapon",-1)),de=o(()=>e("td",null,"Origins",-1)),re=o(()=>e("td",null,"Enemies",-1)),he=["title"],ue=o(()=>e("h4",null,"Home",-1)),me=["innerHTML"],ce=o(()=>e("h4",null,"Appearance",-1)),fe=["innerHTML"],pe=o(()=>e("h4",null,"Worshippers",-1)),ve=["innerHTML"],ge=o(()=>e("h4",null,"High Tenets",-1)),ye=o(()=>e("h4",null,"Holidays",-1)),be=["innerHTML"],we=o(()=>e("h4",null,"Level 1 Faction Feature",-1)),Ge=["innerHTML"],_e=o(()=>e("h4",null,"Level 10 Faction Feature",-1)),Ne=["innerHTML"],ke=o(()=>e("h4",null,"Lore and History",-1)),Ae=["innerHTML"],Me=o(()=>e("div",{class:"row"},[e("div",{class:"col-sm-12"},[e("h2",null,"History and Relationships of the Gods")]),e("div",{class:"col-sm-12"},[e("h3",null,"The 3 Mothers"),e("p",null,[e("strong",null,"Nera, Gaian, and Area"),B(" were the first of the Gods, inevitable from the beginning of the universe. The 3 mother goddesses represented the elemental order, the material, and the elemental chaos. As the first beings of divine spark, their form was absolute, and they could not be destroyed. Meeting together they saw that the Universe was barren, an endless and empty Astral Sea without form or time, and so they agreed to each bring forth 4 children. Nera begat Alohim, Mat'raktha, Io, and Tock, Gaian begat Molton, Trimala, Dorun, and Sylvan, and Area begat Annam, Fanome, Zhuul, and ?. With the aid of these children, they created Elthelas, and all the Planes of Existence. ")]),e("h3",null,"The 3rd Generation"),e("p",null," All was not well, however. The Second Generation of Gods grew jealous of their mothers dominion, and their ability to create new Gods, and so they met together, and together went before their mothers to demand that they confer upon them the ability to create Gods. "),e("p",null,' Their mothers were vexed by their childrens demands, but seeing that they were all resolute, they came to an agreement. "We cannot give you this which you seek, for we have not the power to make equals unto ourselves, however, each of you may entreat each of us for one child, who will share of your essence and that of their Mother God." And so the 3rd generation of Gods was born, 3 for each of the second generation, 1 from each Mother God. '),e("p",null," Many of this generation have perished, or their influence is not known to us today, but we do know that Alohim begat Amathera via Nera, Sara via Gaian, and Cora via Area. Mat'raktha begat Asmodeus via Nera, and Malik via Area. Io begat Bahamut via Nera, Leviathan via Gaian, and Tiamat via Area. Tock begat Chronos via Gaian and Woden via Area (Woden however, perished in the Gods War, and his domain was eventually taken up by Dorman). We also know that Trimala begat Maris via Nera, and Zhuul begat Ba'al via Area. "),e("h3",null,"The Birth of the Mortal Races"),e("p",null," All was not well however, as the 3rd generation saw that their parents and their parents parents could bring forth children, but they could not, so they went to the Mother Gods and demanded that they too be allowed to bring forth children unto the world, but this 3rd generation was too far removed from the Mother Gods to bring forth new Gods, and so the Mother Gods could not meet their request as they had their parents, so instead they gave them the ability to create the lesser beings both mortal and immortal, and gave this ability to their parents as well, and so all the races were born in all their variety, such that the Gods could each have their dominion. "),e("p",null," Chief among these races were the Sorceron, created collectively by all the Gods to share in their power so much as was possible and assist in the creation of the lesser races, but so also at this time were created the Dragons, the Giants, humans, elves, orcs, and dwarves and many others. "),e("h3",null,"The God's War"),e("p",null,` Yet peace was not be had among the Gods, in particular Mat'raktha coveted the dominion of his brother Alohim, for he felt that Alohim had taken more than was fair to him, claiming the dominion of Kings. And so Mat'raktha went to his brother and demanded that he give him Dominion over Kings and Nations and Humanity, but Alohim responded, "No, my brother, I cannot give this to you, for it is a part of me, and to give it up would be my end." `),e("p",null," Mat'raktha grew wroth at his brother's rejection, and struck him, but Alohim resisted, and soon Mat'raktha was forced to retreat. So Mat'raktha conferred with the other Gods, convincing many of the rightness of his claim and together they went to Alohim and demanded that he give up his Dominion over Kings and Nations and all Humanity, and again Alohim refused, and many rallied to his defense, and seeing that he could not force Alohim to give up his dominion, Mat'raktha left. "),e("p",null,` In his anger, Mat'raktha commanded all in his domain and all who would aid him, "Today, and from henceforth, we make war on the children of Alohim, and all who would aid them." And they marched forth their hosts, and Alohim and the Gods of Good marched forth their hosts, and the battle lasted uncountable years upon the face of Elthelas and throughout the Planes of Existence, and many millions died on both sides. `),e("p",null," Then the Mother Gods, seeing the war among their children, met together to decide what to do. Area advocated to destroy all that they had created and start over, without their children and keeping all the powers of creation to the Mother Gods, but Gaian loved her children, and refused her, and in anger Area struck Gaian what should have been a fatal blow were she not absolute. Nevertheless, it left Gaian unconscious and unable to be revived. Seeing this, Nera summoned all her will, and created a great prison beyond the Astral Sea. Then she invited Area to join her for a great feast in this place, for it was full of verdant fields of green, saying it would be the beginning of their new creation, and once Area was within, she sealed it away, banishing Area from Elthelas and all the Planes of Existence forever. "),e("p",null,' Then, Nera summoned her will again and forged it into a single blade, and she spoke to all of the Gods. "In this blade I have created for myself the ability to destroy that which my sisters and I have wrought, yea, even thee our greatest children would suffer death at the hands of this blade, for what we created I can destroy. So long as this blade exists, no God but Gaian will walk upon Elthelas, and each shall be banished to the Planes of their Dominion, and whosoever shall break this eternal truce shall be no more." And with this proclamation, the Gods fled, each to their respective Dominion. The Sorceron fled with them, all but a few, wounded and trapped upon Elthelas. '),e("p",null," The mortal races found themselves alone and scattered upon Elthelas, the gifts of their Gods gone, their homes long destroyed in war, and the long rebuilding began. ")])],-1));function Te(t,n,b,c,Be,Se){const f=p("b-tab"),h=p("b-form-select"),w=p("b-tabs");return s(),i("div",null,[d(w,null,{default:r(()=>[d(f,{title:"Table"},{default:r(()=>[L,e("table",H,[E,e("tbody",null,[(s(!0),i(u,null,m(t.gods,a=>(s(),i("tr",{key:a.id},[e("td",{style:g("background-image: url("+a.symbolimage+");max-height:30px;width:auto;background-size:contain;background-repeat: no-repeat;"),title:t.GodByName.holysymbol},null,12,V),e("td",null,l(a.name),1),e("td",null,l(a.domains),1),e("td",null,l(a.domains5),1),e("td",null,l(a.alignment),1)]))),128))])])]),_:1}),d(f,{title:"Details"},{default:r(()=>[e("div",D,[e("div",C,[I,W,e("p",null,[k(e("select",{"onUpdate:modelValue":n[0]||(n[0]=a=>t.GodByName=a),class:"form-select"},[(s(!0),i(u,null,m(t.gods,a=>(s(),i("option",{key:a.id,value:a},l(a.name),9,F))),128))],512),[[A,t.GodByName]])]),P,e("p",null,[d(h,{modelValue:t.alignment,"onUpdate:modelValue":n[1]||(n[1]=a=>t.alignment=a)},{default:r(()=>[U,$,j,q,K,R,z,Z,J,O]),_:1},8,["modelValue"])]),e("p",null,[t.alignment!==""?(s(),y(h,{key:0,options:t.alignmentGods,modelValue:t.SelectedGod,"onUpdate:modelValue":n[2]||(n[2]=a=>t.SelectedGod=a),"text-field":"name","value-field":"id"},null,8,["options","modelValue"])):v("v-if",!0)]),Q,e("p",null,[d(h,{modelValue:t.domain,"onUpdate:modelValue":n[3]||(n[3]=a=>t.domain=a)},{default:r(()=>[Y,(s(!0),i(u,null,m(t.domains,a=>(s(),i("option",{key:a,value:a},l(a),9,X))),128))]),_:1},8,["modelValue"])]),e("p",null,[t.domain!==""?(s(),y(h,{key:0,options:t.domainGods,modelValue:t.SelectedGod,"onUpdate:modelValue":n[4]||(n[4]=a=>t.SelectedGod=a),"text-field":"name","value-field":"id"},null,8,["options","modelValue"])):v("v-if",!0)])]),e("div",x,[e("div",null,[e("h2",null,l(t.GodByName.name),1),e("div",ee,[e("table",te,[e("tr",null,[oe,e("td",null,[e("span",ae,l(t.GodByName.holysymbol),1)])]),e("tr",null,[ne,e("td",null,l(t.GodByName.alignment),1)]),e("tr",null,[le,e("td",null,l(t.GodByName.domains),1)]),e("tr",null,[se,e("td",null,l(t.GodByName.domains5),1)]),e("tr",null,[ie,e("td",null,l(t.GodByName.weapon),1)]),e("tr",null,[de,e("td",null,l(t.GodByName.parents),1)]),e("tr",null,[re,e("td",null,l(t.GodByName.enemy),1)])]),t.GodByName.symbolimage!=null?(s(),i("div",{key:0,class:"symbolimage col-sm-5",style:g("background-image: url("+t.GodByName.symbolimage+")"),title:t.GodByName.holysymbol},null,12,he)):v("v-if",!0)]),ue,e("div",{innerHTML:t.marked.parse(t.GodByName.home)},null,8,me),ce,e("div",{innerHTML:t.marked.parse(t.GodByName.appearance)},null,8,fe),pe,e("div",{innerHTML:t.marked.parse(t.GodByName.worshippers)},null,8,ve),ge,e("ul",null,[(s(!0),i(u,null,m(t.GodByName.tenets,a=>(s(),i("li",{key:a},l(a),1))),128))]),ye,e("div",{innerHTML:t.marked.parse(t.GodByName.holiday)},null,8,be),we,e("div",{innerHTML:t.marked.parse(t.GodByName.level1)},null,8,Ge),_e,e("div",{innerHTML:t.marked.parse(t.GodByName.level10)},null,8,Ne),ke,e("div",{innerHTML:t.marked.parse(t.GodByName.lore)},null,8,Ae)])])])]),_:1}),d(f,{title:"History"},{default:r(()=>[Me]),_:1})]),_:1})])}var Ee=_(S,[["render",Te],["__scopeId","data-v-4fdec80d"]]);export{Ee as default};
//# sourceMappingURL=gods.js.map
