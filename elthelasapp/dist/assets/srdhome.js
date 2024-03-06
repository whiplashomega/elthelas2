import{u as B,h as D,m as F,Q as T,i as _,R as W,o,c as i,j as u,w as c,f as e,p as b,v as L,F as A,l as M,k as l,t as C,g as f,P as x}from"./vendor.js";import{u as R,_ as P}from"./index.js";import{i as q}from"./warlockinvocations.js";import{i as N}from"./artificerinfusions.js";var I={setup(){B({title:"System Reference Search"});const a=R(),{ancestries:s,armorv2:y,backgroundsv2:w,classesv2:k,divines:S,equipmentv2:g,featsv2:t,magicitemvsv2:r,rules:d,rulesByCategory:h,spellsv2:v,weaponsv2:$}=D(a);return{ancestries:s,armor:y,backgrounds:w,classes:k,divines:S,equipment:g,feats:t,magicitems:r,statics:a,rules:d,rulesByCategory:h,spells:v,weapons:$,marked:F}},computed:{rulesresults(){let a=[];return this.searchtext!==""&&(a=this.rules.filter(s=>{if(s.title.toLowerCase().includes(this.searchtext.toLowerCase()))return s.weight=1,!0;if(s.description.toLowerCase().includes(this.searchtext.toLowerCase()))return s.weight=2,!0;if(s.subcategory.toLowerCase().includes(this.searchtext.toLowerCase()))return s.weight=3,!0}),a.push(...this.extrarules.filter(s=>{if(s.title.toLowerCase().includes(this.searchtext.toLowerCase()))return s.weight=1,!0;if(s.description.toLowerCase().includes(this.searchtext.toLowerCase()))return s.weight=2,!0;if(s.subcategory.toLowerCase().includes(this.searchtext.toLowerCase()))return s.weight=3,!0}))),a.sort((s,y)=>s.weight>y.weight?1:-1)}},data(){return{searchtext:"",showresults:!1}},created(){this.statics.getAllNew().then(()=>{const a=[];this.classes.forEach(t=>{a.push({title:t.name,category:"Character Classes",subcategory:t.name,description:"For more information about the "+t.name+" Class, see the <a href='/options/class/"+t.name+"'>Classes Page</a>",isCollapsed:!1}),t.features.forEach(r=>{a.push({title:r.name,category:"Character Classes",subcategory:t.name,description:r.description,isCollapsed:!1})}),t.subclass.forEach(r=>{a.push({title:r.name,category:"Character Classes",subcategory:t.name,description:"For more information about the "+r.name+" Sub Class, see the <a href='/options/class/"+t.name+"'>"+t.name+" Classes Page</a>",isCollapsed:!1}),r.features.forEach(d=>{a.push({title:d.name,category:"Character Classes",subcategory:t.name+" - "+r.name,description:d.description,isCollapsed:!1})})})});let s=[];this.spells.forEach(t=>{s.push({title:t.title,category:"Spells",subcategory:t.school+" "+t.level.replace("level","level "),description:`<h4>
              <strong>${t.school} ${t.level.replace("level","level ")} ${t.ritual?" Ritual":""} </strong> (${t.source})
            </h4>
            <p><strong>Casting Time: </strong> ${t.castingTime}</p>
            <p><strong>Range: </strong> ${t.range}</p>
            <p><strong>Components: </strong> ${t.components}</p>
            <p><strong>Duration: </strong> ${t.duration}</p>
            <div>${t.description}</div>`,isCollapsed:!1})});let y=[];this.feats.forEach(t=>{y.push({title:t.name,category:"Feats",subcategory:"Feat Descriptions",description:`<h5>Prerequisites: ${t.prereq}</h5><div>${t.description}</div>`,isCollapsed:!1})});let w=[];this.ancestries.forEach(t=>{w.push({title:t.name,category:"Ancestries",subcategory:"Ancestry Options",description:`<p>For the full description of the ${t.name} ancestry visit the <a href="/options/ancestry">Ancestry page</a></p>
          <div>${t.description}</div>`,isCollapsed:!1}),t.subraces.forEach(r=>{let d={title:r.id==="default"?t.name:r.name,category:"Ancestries",subcategory:"Ancestry Options - "+t.name,description:`<p>For the full description of the ${r.name} ancestry visit the <a href="/options/ancestry">Ancestry page</a></p><div>${r.description}</div><ul>`,isCollapsed:!1};t.traits.forEach(h=>{d.description+=`<li><strong>${h.name}.</strong> ${h.description}</li>`}),r.traits.forEach(h=>{d.description+=`<li><strong>${h.name}.</strong> ${h.description}</li>`}),d.description+="</ul>",w.push(d)})});let k=[];this.backgrounds.forEach(t=>{k.push({title:t.name,category:"Backgrounds",subcategory:"Example Backgrounds",description:`<p>
            <strong>Skills: </strong>${t.skills.join(", ")}<br />
            <strong>Tools: </strong>${t.tools.join(", ")}<br />
            <strong>Languages: </strong>${t.languages} of your choice<br />
            <strong>Feat: </strong>${t.feature}
          </p>
          <p>
            ${t.description}
          </p>
          <p>
            <strong>Equipment: </strong> ${t.equipment}
          </p>`})});let S=[];q.forEach(t=>{S.push({title:t.name,category:"Character Classes",subcategory:"Warlock - Warlock Invocations",description:`Prerequisite: ${t.prereq}

${t.description}`})});let g=[];N.forEach(t=>{g.push({title:t.name,category:"Character Classes",subcategory:"Artificer - Artificer Infusions",description:`Prerequisite: ${t.level}

Item: ${t.item}

${t.description}`})}),this.extrarules=T([...s,...a,...y,...w,...k,...S,...g])})}};const z=e("p",null," This work includes material taken from the System Reference Document 5.1 (\u201CSRD 5.1\u201D) by Wizards of the Coast LLC and available at https://dnd.wizards.com/resources/systems-reference-document. The SRD 5.1 is licensed under the Creative Commons Attribution 4.0 International License available at https://creativecommons.org/licenses/by/4.0/legalcode. ",-1),H={id:"search"},j={class:"row"},U={class:"col-sm-8"},G={class:"col-sm-4 btn-group"},O=e("hr",null,null,-1),V={key:0,id:"rulesresults"},Y=["onClick"],K={key:0},J={key:1},Q=["innerHTML"],Z=e("hr",null,null,-1),X=["onClick"],ee={key:0},te={key:1},le=["onClick"],se={key:0},ne={key:1},ae=e("hr",null,null,-1),oe=["onClick"],ie={key:0},re={key:1},ue=["innerHTML"],ce=e("hr",null,null,-1),de=e("hr",null,null,-1),he=e("h4",null,"Ancestry Changes",-1),pe=e("ul",null,[e("li",null,"None this update")],-1),ge=e("h4",null,"Class Changes",-1),me=e("h5",null,"Barbarian",-1),fe=e("ul",null,[e("li",null,"Fixed Form of the Beast natural weapons to specify reach, and added a bonus action attack if you choose the bite.")],-1),ye=e("h5",null,"Bard",-1),ve=e("ul",null,[e("li",null,"Removed font of inspiration feature, bardic inspiration is now always a short rest resource."),e("li",null,"Jack of all Trades moved to level 5"),e("li",null,"Bardic inspiration can now be used as a bonus action (lasting 1 minute) or a reaction (used immediately).")],-1),_e=e("h5",null,"Rogue",-1),be=e("ul",null,[e("li",null,"Rogue Inquisitive's Unerring Eye feature now just grants blindsight instead of shitty blindsight.")],-1),we=e("h4",null,"Equipment Changes",-1),Ce=e("ul",null,[e("li",null,"Knockdown and Grapple weapon properties now uses the ability modifier used in the attack to set the DC rather than always strength. This should make them usable for all kinds of martial characters. For example a whip is a finesse weapon, but it's grapple property was dependent on strength to set it's DC. By allowing it to use the modifier used in the attack, a dex based fighter using a whip can get the full benefit of its grapple property."),e("li",null,"Scale hauberk AC bonus reduced to 14, PC increased to 2. Scale hauberk was the only non-rare armor that allowed you to get a total AC of 17 (from base AC + dex), making it an obvious choice for anyone with a dex bonus of 2+, this should make armor choice more competitive."),e("li",null,"Finally converted magic item descriptions from feet to meters."),e("li",null,"Weapon ranges reduced (they now use a base factor of 3 meters instead of 4 meters). This should make weapon ranges more relevant and help justify taking the longer range weapons.")],-1),ke=e("h4",null,"Feat Changes",-1),Se=e("ul",null,[e("li",null,"Dual-Wielder AC bonus no longer requires forgoing an attack. This seemed unnecessarily complicated, and removed the whole point of TWF, getting that extra attack."),e("li",null,"Removed the bonus action attack provided by Shield Master feat, it now removes the AC penalty for using your shield in TWF instead.")],-1),Ae=e("h4",null,"Rules Changes and General Fixes",-1),Me=e("ul",null,[e("li",null,"Cleaned up various places on the site still using feet instead of meters."),e("li",null,"features in character builder, when expanded, now show their source. (such as Level 1 Artificer feature)."),e("li",null,"Fixed character builder giving Fighting Styles at the wrong level for Paladins and Rangers."),e("li",null,"Improved the appearance of this changelog, separating changes into categories and versions."),e("li",null,"Fixed filter on Weapons page in equipment so it now filters across all fields.")],-1),xe=e("h4",null,"Spell Changes",-1),$e=e("ul",null,[e("li",null,"Mage Armor no longer grants protection points, base AC formula changed to 12 + dex, now has higher levels upcast. Simplifies mage armor, and puts it more in-line with the current armor formulas (roughly equivalent to a +1 leather cuirass)."),e("li",null,"Enervation damage increased to 5d8, takes full damage the first turn even on successful save (but save avoids continuous damage effect)."),e("li",null,"Healing spells effect increased, typically by giving them an extra die of base healing.")],-1),Ee=e("h4",null,"Ancestry Changes",-1),Be=e("ul",null,[e("li",null,"Races -> Ancestries"),e("li",null,"Ancestries rebalanced using a formula based on Treantmonks formula for power level."),e("li",null,"Stat adjustments decoupled from ancestry (everyone gets a +2 and a +1)")],-1),De=e("h4",null,"Class Changes",-1),Fe=e("h5",null,"Every Class.",-1),Te=e("ul",null,[e("li",null,"Subclasses are received at level 2. Additional features received at 6, 10 and 14. This means some classes had additional subclass features added (if they only got 3 before)."),e("li",null,"Tasha's class features are now simply standard")],-1),We=e("h5",null,"Artificer",-1),Le=e("ul",null,[e("li",null,"Battle Smith gets Combat Caster feature"),e("li",null,"Alchemist Experimental Elixir options improved, and can always be chosen rather than random."),e("li",null,"Alchemist gains poisonous infusions feature, allowing them to add poison damage to attacks and spells.")],-1),Re=e("h5",null,"Barbarian",-1),Pe=e("ul",null,[e("li",null,"Unarmored defense provides protection points. No longer a trap! Now makes you super tanky!"),e("li",null,"Rage feature rewritten. Rage damage bonus increased."),e("li",null,"Impose Self -> use your hit dice in combat to tank for allies."),e("li",null,"Improved Critical, Brutal Critical -> Barbarians are now actually built to look for that big damage critical at high levels, critting at 19 starting at level 9, and with a much better Brutal Critical feature."),e("li",null,"Vengeful -> counterattack when tanking for allies"),e("li",null,"Weapon Mastery"),e("li",null,"Frenzy no longer causes exhaustion"),e("li",null,"Beast barbarian damage increased"),e("li",null,"Beast barbarian +1 bonus instead of 'count as magic'"),e("li",null,"Unarmored Defense gives PP/Lvl"),e("li",null,"Path of the Zealot reworked"),e("li",null,"Path of Wild Magic reworked")],-1),qe=e("h5",null,"Bard",-1),Ne=e("ul",null,[e("li",null,"Bardic inspiration is now a reaction."),e("li",null,"Magical Secrets moved to levels 9 and 13"),e("li",null,"Each subclasses bardic inspiration based ability now has an improved version at level 10."),e("li",null,"Valor Bard and Swords Bard get Combat Caster feature and Cantrip casting in Extra Attack"),e("li",null,"Countercharm removed. Jack-of-all-Trades moved to level 7.")],-1),Ie=e("h5",null,"Cleric",-1),ze=e("ul",null,[e("li",null,"Combat Caster feature!"),e("li",null,"Holy Order feature."),e("li",null,"Blessed Strikes is now just a level 8 cleric feature, rather than a subclass feature in most subclasses."),e("li",null,"Channel Divinity moved to level 3, subclass channel divinity options moved to level 6"),e("li",null,"Twilight Sanctuary range reduced."),e("li",null,"Emboldening Bond reduced to once per long rest.")],-1),He=e("h5",null,"Druid",-1),je=e("ul",null,[e("li",null,"Wildshape rules modified, largely for clarity, but also some balance and ease of play changes."),e("li",null,"All subclasses can now wildshape as a bonus action."),e("li",null,"Limited number of wild shape forms."),e("li",null,"Moon Druids now get the ability to wild shape into even better beast forms at high levels, and can choose elementals other than the standard 4."),e("li",null,"Elemental Fury ability added, giving a damage boost at level 7."),e("li",null,"+1 bonus instead of natural weapon attacks 'count as magic'."),e("li",null,"Circle of the Land Circle Spells adds 1st level spells at 2nd level (in addition to the 2-5th level spells at later levels).")],-1),Ue=e("h5",null,"Factotum (New Class)",-1),Ge=e("ul",null,[e("li",null,"New high level features removing dead levels that allows you to inspire your saving throws.")],-1),Oe=e("h5",null,"Fighter",-1),Ve=e("ul",null,[e("li",null,"Fourth extra attack moved to level 17"),e("li",null,"Add proficiency bonus to indomitable"),e("li",null,"Called Critical -> new capstone ability"),e("li",null,"Impose Self -> use hit dice to tank"),e("li",null,"Weapon Mastery"),e("li",null,"Champion gets enhanced fighting style"),e("li",null,"Eldritch Knight is now a half caster"),e("li",null,"Eldritch Knight Combat caster feature"),e("li",null,"Eldritch Knight war magic allows them to replace one weapon attack with a cantrip"),e("li",null,"Arcane Archer gets additional uses/options to put them in line with Battle Masters"),e("li",null,"Samurai level 14 feature reworked to handle new Dying condition")],-1),Ye=e("h5",null,"Monk",-1),Ke=e("ul",null,[e("li",null,"Unarmored defense now provides protection points."),e("li",null,"Martial Arts die size increased"),e("li",null,"Weapon Mastery"),e("li",null,"Way of the Elements reworked, is now effectively a half caster, and all spells are cheaper."),e("li",null,"Increased hit die size")],-1),Je=e("h5",null,"Paladin",-1),Qe=e("ul",null,[e("li",null,"New capstone -> Truesight. Necessary since existing capstone was part of subclasses, so was moved to level 14."),e("li",null,"Aura of Protection moved to level 7"),e("li",null,"Aura of Courage moved to level 9"),e("li",null,"Combat caster feature"),e("li",null,"Weapon Mastery")],-1),Ze=e("h5",null,"Ranger",-1),Xe=e("ul",null,[e("li",null,"Combat Caster"),e("li",null,"Class features have largely been rewritten and reorganized based on OneDND ranger."),e("li",null,"Hunter features changed significantly."),e("li",null,"Beast Master -> no action necessary to command companion"),e("li",null,"Gloomstalker, Horizon Walker, Monster Slayer, Fey Wanderer, and Swarmkeeper have had their 2nd level features redone."),e("li",null,"Weapon Mastery")],-1),et=e("h5",null,"Rogue",-1),tt=e("ul",null,[e("li",null,"Skill Tricks! -> Do cool stuff with skills you are proficient in."),e("li",null,"Devious Strikes -> Modify sneak attack by trading damage for special effects."),e("li",null,"Arcane Trickster now a half-caster"),e("li",null,"Assassins Assassinate feature no longer requires the surprised condition, just first round of combat and an opponent who hasn't acted yet. Gives extra damage equal to rogue level instead of auto-crit."),e("li",null,"Thief's Use Magic Device now gives an additional attunement slot, a chance to avoid expending charges on magic items, and the ability to use any spell scroll from any class."),e("li",null,"Inquisitive Rogue Unerring Eye is now always on, no longer requiring an action and no longer having limited uses."),e("li",null,"Mastermind Rogue level 6 feature now has charm effect.")],-1),lt=e("h5",null,"Sorcerer",-1),st=e("ul",null,[e("li",null,"Subclass spell lists"),e("li",null,"Font of Magic moved to level 3"),e("li",null,[l("Metamagic Changes "),e("ul",null,[e("li",null,"Careful Spell now protects from all damage."),e("li",null,"Heightened Spell now cheaper"),e("li",null,"Seeking Spell now cheaper")])]),e("li",null,"Sorcerous Restoration moved to 18"),e("li",null,"Master of Metamagic -> new capstone"),e("li",null,"Draconic Sorcerer damage resistance is now permanent feature")],-1),nt=e("h5",null,"Warlock",-1),at=e("ul",null,[e("li",null,[l("Pact's reworked "),e("ul",null,[e("li",null,"Pact of the Blade now gives Charisma to att/dmg instead of hex warrior doing so"),e("li",null,"Hex Warrior feature gone."),e("li",null,"All Pacts now have 5th level improvement that used to be an invocation.")])]),e("li",null,"All warlocks get Medium armor proficiency."),e("li",null,"1 fewer invocation known"),e("li",null,"Expanded spell lists now add to spells known."),e("li",null,"More spell slots, 2 at level 1, 3 at level 5, 4 at level 9, 5 at level 13, and 6 at level 17."),e("li",null,"Warlocks now always know Eldritch Blast cantrip."),e("li",null,"Hexblade's Curse now twice per rest")],-1),ot=e("h5",null,"Wizard",-1),it=e("ul",null,[e("li",null,"Expanded spellbook for each subclass"),e("li",null,"Completely reworked bladesinger"),e("li",null,"War Wizard Arcane Deflection no longer limits you to cantrips, but is now limited to proficiency times per long rest."),e("li",null,"War Wizard power surge now just gives bonus damage to cantrips."),e("li",null,"Evocation Wizard Potent Cantrip now also gives intelligence modifier as bonus damage to cantrips."),e("li",null,"Necromancer Wizard Grim Harvest now requires damaging a creature, not killing it."),e("li",null,"Necromancer Wizard Undead Thralls now applies to all undead created or summoned by any spell."),e("li",null,"Illusion Wizard features rearranged to provide more power earlier (malleable illusion moved to level 2, Illusory self to level 6)."),e("li",null,"Illusion Wizard gains Potent Illusions feature at level 10 (impose disadvantage on one save or check vs your illusions as a reaction)")],-1),rt=e("h4",null,"Equipment Changes",-1),ut=e("ul",null,[e("li",null,"Weapons reworked from the ground up"),e("li",null,[l("Armor reworked from the ground up "),e("ul",null,[e("li",null,"Protection Points"),e("li",null,"Different armor types, every armor has its pros and cons now.")])])],-1),ct=e("h4",null,"Feat Changes",-1),dt=e("ul",null,[e("li",null,"Feats reworked across the board in OneDND style, most level 4+ feats provide a +1 to a stat.")],-1),ht=e("h4",null,"Rules Changes and General Fixes",-1),pt=e("ul",null,[e("li",null,"New actions: Run, delay, first aid, and repair armor"),e("li",null,"Dying condition added"),e("li",null,"Grappled condition added"),e("li",null,"Exhaustion rework"),e("li",null,"Backgrounds, default is build your own, template moving to 5.5 style (2 skills, 1 tool, 1 language, 1 lvl 1 feat)"),e("li",null,"Languages: No common, based on home country not ancestry."),e("li",null,"Monster rules changes: added PP, proficiency based on HD. No more non-magical weapon resistance, converting to just standard resistances."),e("li",null,"Many individual monster stats reworked, particularly resistances and vulnerabilities."),e("li",null,"Injuries."),e("li",null,"Group Ability Checks"),e("li",null,"Factions"),e("li",null,"Drinking a potion yourself can be done as a bonus action."),e("li",null,"Metric Conversion and Space Rules -> 1 meter squares. Most distances have been converted using a 5 ft -> 1 meter conversion."),e("li",null,"Flanking -> 1d6 Bonus damage."),e("li",null,"New Wild Magic table")],-1),gt=e("h4",null,"Spell Changes",-1),mt=e("ul",null,[e("li",null,"Many spells changed, look up your spell descriptions!"),e("li",null,"Many underwhelming damage spells have been buffed slightly."),e("li",null,"Many must-have spells have been nerfed (shield, counterspell, etc).")],-1),ft=e("h2",null,"Building a Character",-1),yt=e("p",null,[e("strong",null,"Step 2: Determine Ability Scores."),l(" Their are many methods to determine your characters ability scores, talk to your DM about their prefered method. The most common methods are either a 'point buy' system, or rolling 4d6 and dropping the lowest. Once you have rolled or finished your point buy, you add your starting ability score improvements. This is a +2 to one score of your choice, and a +1 to another score of your choice (but different from the first one). You will get additional ability score improvements as you level up. ")],-1),vt=e("p",null,[e("strong",null,"Step 3: Describe your Character"),l(" Now it is time to describe your character. Give them a name, some history, a home country, a home town, appearance details and any other details that may be important to roleplay later. ")],-1),_t=e("strong",null,"Step 4: Skills, Languages, and other Proficiencies.",-1),bt=e("p",null,[e("strong",null,"Step 5: Picking Spells"),l(" If your character is an artificer, bard, cleric, druid, sorcerer, warlock, or wizard, you will need to pick spells. Refer to your classes Spellcasting feature for how to do this. ")],-1),wt=e("p",null,[e("strong",null,"Step 6: Starting Equipment"),l(" Refer to your background and your class to determine your options for starting equipment. ")],-1),Ct=e("p",null,[e("strong",null,"Step 7: Leveling Up"),l(" If your DM decides to start your character at a level other than first, use the Leveling Up section of the SRD (under Other Rules) to do this. ")],-1);function kt(a,s,y,w,k,S){const g=_("b-tab"),t=_("b-card-header"),r=_("b-card-body"),d=_("b-collapse"),h=_("b-card"),v=_("router-link"),$=_("b-tabs"),E=W("b-toggle");return o(),i("div",null,[z,u($,null,{default:c(()=>[u(g,{title:"Search"},{default:c(()=>[e("div",H,[e("div",j,[e("div",U,[b(e("input",{type:"text",class:"form-control col-sm-10","onUpdate:modelValue":s[0]||(s[0]=n=>a.searchtext=n)},null,512),[[L,a.searchtext]])]),e("div",G,[e("button",{type:"button",class:"btn btn-primary",onClick:s[1]||(s[1]=n=>a.showresults=!0)},"Search"),e("button",{type:"button",class:"btn btn-warning",onClick:s[2]||(s[2]=n=>{a.showresults=!1,a.searchtext=""})},"Clear")])]),O,a.showresults?(o(),i("div",V,[(o(!0),i(A,null,M(a.rulesresults,n=>(o(),i("div",{key:n.category+n.subcategory+n.title},[e("h4",null,[l(C(n.title)+" ",1),e("button",{type:"button",class:"btn btn-primary",style:{float:"right"},onClick:p=>n.isCollapsed=!n.isCollapsed},[n.isCollapsed?(o(),i("span",K,"\u25B2")):f("",!0),n.isCollapsed?f("",!0):(o(),i("span",J,"\u25BC"))],8,Y)]),e("h6",null,C(n.category)+" - "+C(n.subcategory),1),b(e("div",{innerHTML:a.marked.parse(n.description)},null,8,Q),[[x,n.isCollapsed]]),Z]))),128))])):f("",!0)])]),_:1}),u(g,{title:"Index"},{default:c(()=>[(o(!0),i(A,null,M(a.rulesByCategory,n=>(o(),i("div",{key:n.title},[e("h2",null,[e("button",{type:"button",class:"btn btn-primary",style:{float:"left"},onClick:p=>n.isCollapsed=!n.isCollapsed},[n.isCollapsed?(o(),i("span",ee,"\u25B2")):f("",!0),n.isCollapsed?f("",!0):(o(),i("span",te,"\u25BC"))],8,X),l("\xA0\xA0"+C(n.title),1)]),b(e("div",null,[(o(!0),i(A,null,M(n.subcategories,p=>(o(),i("div",{key:p.title,style:{"margin-left":"40px"}},[e("h3",null,[e("button",{type:"button",class:"btn btn-primary btn-sm",style:{float:"left"},onClick:m=>p.isCollapsed=!p.isCollapsed},[p.isCollapsed?(o(),i("span",se,"\u25B2")):f("",!0),p.isCollapsed?f("",!0):(o(),i("span",ne,"\u25BC"))],8,le),l("\xA0\xA0"+C(p.title),1)]),(o(!0),i(A,null,M(p.rules,m=>b((o(),i("div",{key:m.title,style:{"margin-left":"40px"}},[ae,e("h4",null,[e("button",{type:"button",class:"btn btn-primary btn-sm",style:{float:"left"},onClick:St=>m.isCollapsed=!m.isCollapsed},[m.isCollapsed?(o(),i("span",ie,"\u25B2")):f("",!0),m.isCollapsed?f("",!0):(o(),i("span",re,"\u25BC"))],8,oe),l("\xA0\xA0"+C(m.title),1)]),b(e("div",{innerHTML:a.marked.parse(m.description)},null,8,ue),[[x,m.isCollapsed]])])),[[x,p.isCollapsed]])),128)),ce]))),128))],512),[[x,n.isCollapsed]]),de]))),128))]),_:1}),u(g,{title:"Change Log"},{default:c(()=>[u(h,{"no-body":"",class:"mb-1"},{default:c(()=>[u(t,{"header-tag":"header",class:"p-1",role:"tab"},{default:c(()=>[b((o(),i("h2",null,[l("Changes in version 1.1")])),[[E,void 0,void 0,{"ver1-1":!0}]])]),_:1}),u(d,{id:"ver1-1"},{default:c(()=>[u(r,null,{default:c(()=>[he,pe,ge,me,fe,ye,ve,_e,be,we,Ce,ke,Se,Ae,Me,xe,$e]),_:1})]),_:1})]),_:1}),u(h,{"no-body":"",class:"mb-1"},{default:c(()=>[u(t,{"header-tag":"header",class:"p-1",role:"tab"},{default:c(()=>[b((o(),i("h2",null,[l("Changes in version 1.0")])),[[E,void 0,void 0,{"ver1-0":!0}]])]),_:1}),u(d,{id:"ver1-0"},{default:c(()=>[u(r,null,{default:c(()=>[Ee,Be,De,Fe,Te,We,Le,Re,Pe,qe,Ne,Ie,ze,He,je,Ue,Ge,Oe,Ve,Ye,Ke,Je,Qe,Ze,Xe,et,tt,lt,st,nt,at,ot,it,rt,ut,ct,dt,ht,pt,gt,mt]),_:1})]),_:1})]),_:1})]),_:1}),u(g,{title:"Building a Character"},{default:c(()=>[ft,e("p",null,[l(" First and foremost it is recommended that you use the "),u(v,{to:"/tools/charbuilder",target:"_blank"},{default:c(()=>[l("Elthelas Character Builder")]),_:1}),l(" to create your character sheet. While it is not required, it will make your life easier. The instructions below will assume that you already have a concept in mind for your character, it need not be more than a vague idea, and even that isn't necessary. Maybe as you go through the first couple of steps a concept that appeals to you will occur to you. ")]),e("p",null,[e("strong",null,[l("Step 1: ABC "),u(v,{to:"/options/ancestry",target:"_blank"},{default:c(()=>[l("Ancestry")]),_:1}),l(", "),u(v,{to:"/options/background",target:"_blank"},{default:c(()=>[l("Background")]),_:1}),l(", and "),u(v,{to:"/options/class",target:"_blank"},{default:c(()=>[l("Class")]),_:1}),l(".")]),l(` Your character's Ancestry is the species of humanoid they belong to. Most ancestries also include a variety of sub-species to choose from. Your character's background is all about the life they lived before they became an adventurer. There are a number of options on the backgrounds page, but remember that "Custom" is the default. Their background is an opportunity to be creative and start to figure out their backstory. As part of defining your background you will pick some starting proficiencies for your character, and a level 1 feat. Your characters class is their specialty or area of advanced training as an adventurer. `)]),yt,vt,e("p",null,[_t,l(" Your ancestry, background, and class will each provide certain proficiencies and languages. Refer to their descriptions for what and how many you get. For languages first refer to the information on the "),u(v,{to:"/options/languages",target:"_blank"},{default:c(()=>[l("Languages page")]),_:1}),l(" to figure out what languages you know, and then pick any additional languages known you may have. ")]),bt,wt,Ct]),_:1})]),_:1})])}var Et=P(I,[["render",kt]]);export{Et as default};
