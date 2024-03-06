<template>
<div>
  <p>
    This work includes material taken from the System Reference Document 5.1 (“SRD 5.1”) by Wizards of the Coast LLC and available at https://dnd.wizards.com/resources/systems-reference-document. The SRD 5.1 is licensed under the Creative Commons Attribution 4.0 International License available at https://creativecommons.org/licenses/by/4.0/legalcode.
  </p>
  <b-tabs>
    <b-tab title="Search">
      <div id="search">
        <div class="row">
          <div class="col-sm-8">
            <input type="text" class="form-control col-sm-10" v-model="searchtext" />
          </div>
          <div class="col-sm-4 btn-group">
            <button type="button" class="btn btn-primary" @click="showresults = true">Search</button>
            <button type="button" class="btn btn-warning" @click="showresults = false;searchtext = ''">Clear</button>
          </div>
        </div>
        <hr />
        <div id="rulesresults" v-if="showresults">
          <div v-for="rule in rulesresults" :key="rule.category + rule.subcategory + rule.title">
            <h4>{{ rule.title }} <button type="button" class="btn btn-primary" style="float:right;" @click="rule.isCollapsed = !rule.isCollapsed">
              <span v-if="rule.isCollapsed">&#x25B2;</span><span v-if="!rule.isCollapsed">&#x25BC;</span>
            </button></h4>
            <h6>{{ rule.category }} - {{ rule.subcategory }}</h6>
            <div v-html="marked.parse(rule.description)" v-show="rule.isCollapsed"></div>
            <hr />
          </div>
        </div>
      </div>
    </b-tab>
    <b-tab title="Index">
      <div v-for="category in rulesByCategory" :key="category.title">
        <h2><button type="button" class="btn btn-primary" style="float:left;" @click="category.isCollapsed = !category.isCollapsed">
              <span v-if="category.isCollapsed">&#x25B2;</span><span v-if="!category.isCollapsed">&#x25BC;</span>
            </button>&nbsp;&nbsp;{{ category.title }}</h2>
        <div v-show="category.isCollapsed">
          <div v-for="subcategory in category.subcategories" :key="subcategory.title" style="margin-left:40px;">
            <h3><button type="button" class="btn btn-primary btn-sm" style="float:left;" @click="subcategory.isCollapsed = !subcategory.isCollapsed">
              <span v-if="subcategory.isCollapsed">&#x25B2;</span><span v-if="!subcategory.isCollapsed">&#x25BC;</span>
            </button>&nbsp;&nbsp;{{ subcategory.title }}</h3>
            <div v-for="rule in subcategory.rules" :key="rule.title" v-show="subcategory.isCollapsed" style="margin-left:40px;">
              <hr />
              <h4><button type="button" class="btn btn-primary btn-sm" style="float:left;" @click="rule.isCollapsed = !rule.isCollapsed">
                <span v-if="rule.isCollapsed">&#x25B2;</span><span v-if="!rule.isCollapsed">&#x25BC;</span>
              </button>&nbsp;&nbsp;{{ rule.title }}</h4>
              <div v-html="marked.parse(rule.description)" v-show="rule.isCollapsed"></div>
            </div>
            <hr />
          </div>
        </div>
        <hr />
      </div>
    </b-tab>
    <b-tab title="Change Log">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <h2 v-b-toggle.ver1-1>Changes in version 1.1</h2>
        </b-card-header>
        <b-collapse id="ver1-1">
        <b-card-body>
          <h4>Ancestry Changes</h4>
          <ul>
            <li>None this update</li>
          </ul>
          <h4>Class Changes</h4>
          <h5>Barbarian</h5>
          <ul>
            <li>Fixed Form of the Beast natural weapons to specify reach, and added a bonus action attack if you choose the bite.</li>
          </ul>
          <h5>Bard</h5>
          <ul>
            <li>Removed font of inspiration feature, bardic inspiration is now always a short rest resource.</li>
            <li>Jack of all Trades moved to level 5</li>
            <li>Bardic inspiration can now be used as a bonus action (lasting 1 minute) or a reaction (used immediately).</li>
          </ul>
          <h5>Rogue</h5>
          <ul>
            <li>Rogue Inquisitive's Unerring Eye feature now just grants blindsight instead of shitty blindsight.</li>
          </ul>
          <h4>Equipment Changes</h4>
          <ul>
            <li>Knockdown and Grapple weapon properties now uses the ability modifier used in the attack to set the DC rather than always strength. This should make them usable for all kinds of martial characters. For example a whip is a finesse weapon, but it's grapple property was dependent on strength to set it's DC. By allowing it to use the modifier used in the attack, a dex based fighter using a whip can get the full benefit of its grapple property.</li>
            <li>Scale hauberk AC bonus reduced to 14, PC increased to 2. Scale hauberk was the only non-rare armor that allowed you to get a total AC of 17 (from base AC + dex), making it an obvious choice for anyone with a dex bonus of 2+, this should make armor choice more competitive.</li>
            <li>Finally converted magic item descriptions from feet to meters.</li>
            <li>Weapon ranges reduced (they now use a base factor of 3 meters instead of 4 meters). This should make weapon ranges more relevant and help justify taking the longer range weapons.</li>
          </ul>
          <h4>Feat Changes</h4>
          <ul>
            <li>Dual-Wielder AC bonus no longer requires forgoing an attack. This seemed unnecessarily complicated, and removed the whole point of TWF, getting that extra attack.</li>
            <li>Removed the bonus action attack provided by Shield Master feat, it now removes the AC penalty for using your shield in TWF instead.</li>
          </ul>
          <h4>Rules Changes and General Fixes</h4>
          <ul>
            <li>Cleaned up various places on the site still using feet instead of meters.</li>
            <li>features in character builder, when expanded, now show their source. (such as Level 1 Artificer feature).</li>
            <li>Fixed character builder giving Fighting Styles at the wrong level for Paladins and Rangers.</li>
            <li>Improved the appearance of this changelog, separating changes into categories and versions.</li>
            <li>Fixed filter on Weapons page in equipment so it now filters across all fields.</li>
          </ul>
          <h4>Spell Changes</h4>
          <ul>
            <li>Mage Armor no longer grants protection points, base AC formula changed to 12 + dex, now has higher levels upcast. Simplifies mage armor, and puts it more in-line with the current armor formulas (roughly equivalent to a +1 leather cuirass).</li>
            <li>Enervation damage increased to 5d8, takes full damage the first turn even on successful save (but save avoids continuous damage effect).</li>
            <li>Healing spells effect increased, typically by giving them an extra die of base healing.</li>
          </ul>
        </b-card-body>
      </b-collapse>
      </b-card>
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <h2 v-b-toggle.ver1-0>Changes in version 1.0</h2>
        </b-card-header>
        <b-collapse id="ver1-0">
          <b-card-body>
            <h4>Ancestry Changes</h4>
            <ul>
              <li>Races -> Ancestries</li>
              <li>Ancestries rebalanced using a formula based on Treantmonks formula for power level.</li>
              <li>Stat adjustments decoupled from ancestry (everyone gets a +2 and a +1)</li>
            </ul>
            <h4>Class Changes</h4>
            <h5>Every Class.</h5>
            <ul>
              <li>Subclasses are received at level 2. Additional features received at 6, 10 and 14. This means some classes had additional subclass features added (if they only got 3 before).</li>
              <li>Tasha's class features are now simply standard</li>
            </ul>
            <h5>Artificer</h5>
            <ul>
              <li>Battle Smith gets Combat Caster feature</li>
              <li>Alchemist Experimental Elixir options improved, and can always be chosen rather than random.</li>
              <li>Alchemist gains poisonous infusions feature, allowing them to add poison damage to attacks and spells.</li>
            </ul>
            <h5>Barbarian</h5>
            <ul>
              <li>Unarmored defense provides protection points. No longer a trap! Now makes you super tanky!</li>
              <li>Rage feature rewritten. Rage damage bonus increased.</li>
              <li>Impose Self -> use your hit dice in combat to tank for allies.</li>
              <li>Improved Critical, Brutal Critical -> Barbarians are now actually built to look for that big damage critical at high levels, critting at 19 starting at level 9, and with a much better Brutal Critical feature.</li>
              <li>Vengeful -> counterattack when tanking for allies</li>
              <li>Weapon Mastery</li>
              <li>Frenzy no longer causes exhaustion</li>
              <li>Beast barbarian damage increased</li>
              <li>Beast barbarian +1 bonus instead of 'count as magic'</li>
              <li>Unarmored Defense gives PP/Lvl</li>
              <li>Path of the Zealot reworked</li>
              <li>Path of Wild Magic reworked</li>
            </ul>
            <h5>Bard</h5>
            <ul>
              <li>Bardic inspiration is now a reaction.</li>
              <li>Magical Secrets moved to levels 9 and 13</li>
              <li>Each subclasses bardic inspiration based ability now has an improved version at level 10.</li>
              <li>Valor Bard and Swords Bard get Combat Caster feature and Cantrip casting in Extra Attack</li>
              <li>Countercharm removed. Jack-of-all-Trades moved to level 7.</li>
            </ul>
            <h5>Cleric</h5>
            <ul>
              <li>Combat Caster feature!</li>
              <li>Holy Order feature.</li>
              <li>Blessed Strikes is now just a level 8 cleric feature, rather than a subclass feature in most subclasses.</li>
              <li>Channel Divinity moved to level 3, subclass channel divinity options moved to level 6</li>
              <li>Twilight Sanctuary range reduced.</li>
              <li>Emboldening Bond reduced to once per long rest.</li>
            </ul>
            <h5>Druid</h5>
            <ul>
              <li>Wildshape rules modified, largely for clarity, but also some balance and ease of play changes.</li>
              <li>All subclasses can now wildshape as a bonus action.</li>
              <li>Limited number of wild shape forms.</li>
              <li>Moon Druids now get the ability to wild shape into even better beast forms at high levels, and can choose elementals other than the standard 4.</li>
              <li>Elemental Fury ability added, giving a damage boost at level 7.</li>
              <li>+1 bonus instead of natural weapon attacks 'count as magic'.</li>
              <li>Circle of the Land Circle Spells adds 1st level spells at 2nd level (in addition to the 2-5th level spells at later levels).</li>
            </ul>
            <h5>Factotum (New Class)</h5>
            <ul>
              <li>New high level features removing dead levels that allows you to inspire your saving throws.</li>
            </ul>
            <h5>Fighter</h5>
            <ul>
              <li>Fourth extra attack moved to level 17</li>
              <li>Add proficiency bonus to indomitable</li>
              <li>Called Critical -> new capstone ability</li>
              <li>Impose Self -> use hit dice to tank</li>
              <li>Weapon Mastery</li>
              <li>Champion gets enhanced fighting style</li>
              <li>Eldritch Knight is now a half caster</li>
              <li>Eldritch Knight Combat caster feature</li>
              <li>Eldritch Knight war magic allows them to replace one weapon attack with a cantrip</li>
              <li>Arcane Archer gets additional uses/options to put them in line with Battle Masters</li>
              <li>Samurai level 14 feature reworked to handle new Dying condition</li>
            </ul>
            <h5>Monk</h5>
            <ul>
              <li>Unarmored defense now provides protection points.</li>
              <li>Martial Arts die size increased</li>
              <li>Weapon Mastery</li>
              <li>Way of the Elements reworked, is now effectively a half caster, and all spells are cheaper.</li>
              <li>Increased hit die size</li>
            </ul>
            <h5>Paladin</h5>
            <ul>
              <li>New capstone -> Truesight. Necessary since existing capstone was part of subclasses, so was moved to level 14.</li>
              <li>Aura of Protection moved to level 7</li>
              <li>Aura of Courage moved to level 9</li>
              <li>Combat caster feature</li>
              <li>Weapon Mastery</li>
            </ul>
            <h5>Ranger</h5>
            <ul>
              <li>Combat Caster</li>
              <li>Class features have largely been rewritten and reorganized based on OneDND ranger.</li>
              <li>Hunter features changed significantly.</li>
              <li>Beast Master -> no action necessary to command companion</li>
              <li>Gloomstalker, Horizon Walker, Monster Slayer, Fey Wanderer, and Swarmkeeper have had their 2nd level features redone.</li>
              <li>Weapon Mastery</li>
            </ul>
            <h5>Rogue</h5>
            <ul>
              <li>Skill Tricks! -> Do cool stuff with skills you are proficient in.</li>
              <li>Devious Strikes -> Modify sneak attack by trading damage for special effects.</li>
              <li>Arcane Trickster now a half-caster</li>
              <li>Assassins Assassinate feature no longer requires the surprised condition, just first round of combat and an opponent who hasn't acted yet. Gives extra damage equal to rogue level instead of auto-crit.</li>
              <li>Thief's Use Magic Device now gives an additional attunement slot, a chance to avoid expending charges on magic items, and the ability to use any spell scroll from any class.</li>
              <li>Inquisitive Rogue Unerring Eye is now always on, no longer requiring an action and no longer having limited uses.</li>
              <li>Mastermind Rogue level 6 feature now has charm effect.</li>
            </ul>
            <h5>Sorcerer</h5>
            <ul>
              <li>Subclass spell lists</li>
              <li>Font of Magic moved to level 3</li>
              <li>Metamagic Changes
                <ul>
                  <li>Careful Spell now protects from all damage.</li>
                  <li>Heightened Spell now cheaper</li>
                  <li>Seeking Spell now cheaper</li>
                </ul>
              </li>
              <li>Sorcerous Restoration moved to 18</li>
              <li>Master of Metamagic -> new capstone</li>
              <li>Draconic Sorcerer damage resistance is now permanent feature</li>
            </ul>
            <h5>Warlock</h5>
            <ul>
              <li>Pact's reworked
                <ul>
                  <li>Pact of the Blade now gives Charisma to att/dmg instead of hex warrior doing so</li>
                  <li>Hex Warrior feature gone.</li>
                  <li>All Pacts now have 5th level improvement that used to be an invocation.</li>
                </ul>
              </li>
              <li>All warlocks get Medium armor proficiency.</li>
              <li>1 fewer invocation known</li>
              <li>Expanded spell lists now add to spells known.</li>
              <li>More spell slots, 2 at level 1, 3 at level 5, 4 at level 9, 5 at level 13, and 6 at level 17.</li>
              <li>Warlocks now always know Eldritch Blast cantrip.</li>
              <li>Hexblade's Curse now twice per rest</li>
            </ul>
            <h5>Wizard</h5>
            <ul>
              <li>Expanded spellbook for each subclass</li>
              <li>Completely reworked bladesinger</li>
              <li>War Wizard Arcane Deflection no longer limits you to cantrips, but is now limited to proficiency times per long rest.</li>
              <li>War Wizard power surge now just gives bonus damage to cantrips.</li>
              <li>Evocation Wizard Potent Cantrip now also gives intelligence modifier as bonus damage to cantrips.</li>
              <li>Necromancer Wizard Grim Harvest now requires damaging a creature, not killing it.</li>
              <li>Necromancer Wizard Undead Thralls now applies to all undead created or summoned by any spell.</li>
              <li>Illusion Wizard features rearranged to provide more power earlier (malleable illusion moved to level 2, Illusory self to level 6).</li>
              <li>Illusion Wizard gains Potent Illusions feature at level 10 (impose disadvantage on one save or check vs your illusions as a reaction)</li>
            </ul>
            <h4>Equipment Changes</h4>
            <ul>
              <li>Weapons reworked from the ground up</li>
              <li>Armor reworked from the ground up
                <ul>
                  <li>Protection Points</li>
                  <li>Different armor types, every armor has its pros and cons now.</li>
                </ul>
              </li>
            </ul>
            <h4>Feat Changes</h4>
            <ul>
              <li>Feats reworked across the board in OneDND style, most level 4+ feats provide a +1 to a stat.</li>
            </ul>
            <h4>Rules Changes and General Fixes</h4>
            <ul>
              <li>New actions: Run, delay, first aid, and repair armor</li>
              <li>Dying condition added</li>
              <li>Grappled condition added</li>
              <li>Exhaustion rework</li>
              <li>Backgrounds, default is build your own, template moving to 5.5 style (2 skills, 1 tool, 1 language, 1 lvl 1 feat)</li>
              <li>Languages: No common, based on home country not ancestry.</li>
              <li>Monster rules changes: added PP, proficiency based on HD. No more non-magical weapon resistance, converting to just standard resistances.</li>
              <li>Many individual monster stats reworked, particularly resistances and vulnerabilities.</li>
              <li>Injuries.</li>
              <li>Group Ability Checks</li>
              <li>Factions</li>
              <li>Drinking a potion yourself can be done as a bonus action.</li>
              <li>Metric Conversion and Space Rules -> 1 meter squares. Most distances have been converted using a 5 ft -> 1 meter conversion.</li>
              <li>Flanking -> 1d6 Bonus damage.</li>
              <li>New Wild Magic table</li>
            </ul>
            <h4>Spell Changes</h4>
            <ul>
              <li>Many spells changed, look up your spell descriptions!</li>
              <li>Many underwhelming damage spells have been buffed slightly.</li>
              <li>Many must-have spells have been nerfed (shield, counterspell, etc).</li>
            </ul>
          </b-card-body>
        </b-collapse>
      </b-card>
    </b-tab>
    <b-tab title="Building a Character">
      <h2>Building a Character</h2>
      <p>
        First and foremost it is recommended that you use the <router-link to="/tools/charbuilder" target="_blank">Elthelas Character Builder</router-link> to create your character sheet. While it is not required, it will make your life easier. The instructions below will assume that you already have a concept in mind for your character, it need not be more than a vague idea, and even that isn't necessary. Maybe as you go through the first couple of steps a concept that appeals to you will occur to you.
      </p>
      <p>
        <strong>Step 1: ABC <router-link to="/options/ancestry" target="_blank">Ancestry</router-link>, <router-link to="/options/background" target="_blank">Background</router-link>, and <router-link to="/options/class" target="_blank">Class</router-link>.</strong> Your character's Ancestry is the species of humanoid they belong to. Most ancestries also include a variety of sub-species to choose from. Your character's background is all about the life they lived before they became an adventurer. There are a number of options on the backgrounds page, but remember that "Custom" is the default. Their background is an opportunity to be creative and start to figure out their backstory. As part of defining your background you will pick some starting proficiencies for your character, and a level 1 feat. Your characters class is their specialty or area of advanced training as an adventurer.
      </p>
      <p>
        <strong>Step 2: Determine Ability Scores.</strong> Their are many methods to determine your characters ability scores, talk to your DM about their prefered method. The most common methods are either a 'point buy' system, or rolling 4d6 and dropping the lowest. Once you have rolled or finished your point buy, you add your starting ability score improvements. This is a +2 to one score of your choice, and a +1 to another score of your choice (but different from the first one). You will get additional ability score improvements as you level up.
      </p>
      <p>
        <strong>Step 3: Describe your Character</strong> Now it is time to describe your character. Give them a name, some history, a home country, a home town, appearance details and any other details that may be important to roleplay later.
      </p>
      <p>
        <strong>Step 4: Skills, Languages, and other Proficiencies.</strong> Your ancestry, background, and class will each provide certain proficiencies and languages. Refer to their descriptions for what and how many you get. For languages first refer to the information on the <router-link to="/options/languages" target="_blank">Languages page</router-link> to figure out what languages you know, and then pick any additional languages known you may have.
      </p>
      <p>
        <strong>Step 5: Picking Spells</strong> If your character is an artificer, bard, cleric, druid, sorcerer, warlock, or wizard, you will need to pick spells. Refer to your classes Spellcasting feature for how to do this.
      </p>
      <p>
        <strong>Step 6: Starting Equipment</strong> Refer to your background and your class to determine your options for starting equipment.
      </p>
      <p>
        <strong>Step 7: Leveling Up</strong> If your DM decides to start your character at a level other than first, use the Leveling Up section of the SRD (under Other Rules) to do this.
      </p>
    </b-tab>
  </b-tabs>
</div>

</template>
<script src="./js/srdhome.js"></script>
<style></style>