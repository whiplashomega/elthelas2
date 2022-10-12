<template>
  <div>
    <p>
      In a pantheon, every deity has influence over different aspects of mortal life and civilization, called a deity's domain. All the domains over which a deity has influence are called the deity's portfolio.  For example, the portfolio of the greek god Apollo includes the domains of Knowledge, Life, and Light.  As a cleric, you choose one aspect of your deity's portfolio to emphasize, and you are granted powers related to that domain.
    </p>
    <p>
      Your choice might correspond to a particular sect dedicated to your deity.  Apollo, for example, could be worshiped in one region as Phoebus ("radiant") Apollo, emphasizing his influence over the Light domain, and in a different place as Apollo Acesius ("healing"), emphasizing his association with the Life domain. Alternatively, your choice of domain could simply be a matter of personal preference, the aspect of the deity that appeals to you most.
    </p>
    <p>
      Each domain's description gives examples of deities who have influence over that domain.
    </p>
    <ul class="list-inline">
      <li class="list-inline-item"><button @click="changeDomain('air')" class="racebutton btn btn-primary">Air</button></li>
      <li class="list-inline-item"><button @click="shownDomain = 'arcana'" class="racebutton btn btn-primary">Arcana</button></li>
      <li class="list-inline-item"><button @click="shownDomain = 'death'" class="racebutton btn btn-primary">Death</button></li>
      <li class="list-inline-item"><button @click="shownDomain = 'earth'" class="racebutton btn btn-primary">Earth</button></li>
      <li class="list-inline-item"><button @click="shownDomain = 'fire'" class="racebutton btn btn-primary">Fire</button></li>
      <li class="list-inline-item"><button @click="shownDomain = 'forge'" class="racebutton btn btn-primary">Forge</button></li>
      <li class="list-inline-item"><button @click="shownDomain = 'grave'" class="racebutton btn btn-primary">Grave</button></li>
      <li class="list-inline-item"><button @click="shownDomain = 'knowledge'" class="racebutton btn btn-primary">Knowledge</button></li>
      <li class="list-inline-item"><button @click="shownDomain = 'life'" class="racebutton btn btn-primary">Life</button></li>
      <li class="list-inline-item"><button @click="shownDomain = 'light'" class="racebutton btn btn-primary">Light</button></li>
      <li class="list-inline-item"><button @click="shownDomain = 'nature'" class="racebutton btn btn-primary">Nature</button></li>
      <li class="list-inline-item"><button @click="shownDomain = 'order'" class="racebutton btn btn-primary">Order</button></li>
      <li class="list-inline-item"><button @click="shownDomain = 'tempest'" class="racebutton btn btn-primary">Tempest</button></li>
      <li class="list-inline-item"><button @click="shownDomain = 'trade'" class="racebutton btn btn-primary">Trade</button></li>
      <li class="list-inline-item"><button @click="shownDomain = 'trickery'" class="racebutton btn btn-primary">Trickery</button></li>
      <li class="list-inline-item"><button @click="shownDomain = 'war'" class="racebutton btn btn-primary">War</button></li>
      <li class="list-inline-item"><button @click="shownDomain = 'water'" class="racebutton btn btn-primary">Water</button></li>
    </ul>
    <div class="domaindiv" id="air" v-if="shownDomain == 'air'">
      <h2>Air Domain</h2>
      <h4>Air Domain Spells</h4>
      <table class='classtable table table-striped'>
        <thead>
          <tr>
            <th>Cleric Level</th><th>Spells</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1st</td><td>feather fall, thunderwave</td>
          </tr>
          <tr>
            <td>3rd</td><td>gust of wind, dust devil</td>
          </tr>
          <tr>
            <td>5th</td><td>Wind Wall, Lightning Bolt</td>
          </tr>
          <tr>
            <td>7th</td><td>conjure minor elementals(air only), storm sphere</td>
          </tr>
          <tr>
            <td>9th</td><td>Control Winds, Conjure Elemental(air only)</td>
          </tr>
        </tbody>
      </table>
      <h4>Bonus Proficiency</h4>
      <p>
        When you choose this domain at 1st level, you gain proficiency with martial weapons.
      </p>
      <h4>Disciple of Air</h4>
      <p>
        Also starting at 1st level, your lightning spells are more effective, you add your wisdom modifier to the damage of any spell you cast that does lightning damage.
      </p>
      <h4>Channel Divinity: Gale</h4>
      <p>
        Starting at 2nd level, you can use your Channel Divinity to create a gale of wind like a tornado
      </p>
      <p>
        As an action, you present your holy symbol and gale force winds permeate the area.  The area within 60 ft of you becomes filled with strong winds.  You and a number of creatures equal to your wisdom
        modifier that you select ignore these winds, meanwhile for any other creature moving 1 ft requires 2 ft of movement as they battle through the strong winds.  Additionally, when the winds start each
        creature effected must make a strength saving throw or be knocked prone.
      </p>
      <h4>Burst of Wind</h4>
      <p>
        At 6th level your God grants you the ability to manipulate winds around you. As an action you can use the force of the wind to knock over creatures and move objects.  To do so, select a 10 ft cube within 60 ft of you.  Any creatures in that area must make a strength saving throw or be pushed 10 ft in a direction of your choice and fall prone, they choose which effect they are subjected to.  If they succeed they are not affected.  Objects in the area that are not secured are automatically pushed 10 ft away.
      </p>
      <h4>Lightning Strike</h4>
      <p>
        At 8th level, you gain the ability to infuse your weapon strikes with lightning energy. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 lightning damage to the target. When you reach 14th level, the extra damage  increases to 2d8.
      </p>
      <h4>Living Air</h4>
      <p>
        At 17th level you gain the ability to summon a air elemental once per day.  The air elemental serves you and only you faithfully,  obeying your verbal commands.  It stays with you until it is killed, but you can only have one elemental companion such as this at a time.  Summoning the elemental requires 1 minute of intense concentration and meditation, during which you cannot move more than 5 feet from the location you started  the summoning, and must use your action on every turn to continue the summoning ritual.
      </p>
    </div>
    <div id="arcana" v-if="shownDomain === 'arcana'">
      <h2>Arcana Domain</h2>
      <h4>Arcana Domain Spells</h4>
      <table class='classtable table table-striped'>
        <thead>
          <tr>
            <th>Cleric Level</th><th>Spells</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1st</td><td>detect magic, magic missile</td>
          </tr>
          <tr>
            <td>3rd</td><td>magic weapon, Nystul's magic aura</td>
          </tr>
          <tr>
            <td>5th</td><td>dispel magic, magic circle</td>
          </tr>
          <tr>
            <td>7th</td><td>arcane eye, Leomund's secret chest</td>
          </tr>
          <tr>
            <td>9th</td><td>planar binding, teleportation circle</td>
          </tr>
        </tbody>
      </table>
      <h4>Arcane Initiate</h4>
      <p>
        When you choose this domain at 1st level, you gain proficiency in the Arcana skill, and you gain two cantrips of your choice from the wizard spell list. For you, these cantrips count as cleric cantrips.
      </p>
      <h4>Channel Divinity: Arcane Abjuration</h4>
      <p>
        Starting at 2nd level, you can use your Channel Divinity to abjure otherworldly creatures.
      </p>
      <p>
        As an action, you present your holy symbol, and one celestial, elemental, fey, or fiend of your choice that is within 30 feet of you must make a Wisdom saving throw, provided that the creature can see or hear you. If the creature fails its saving throw, it is turned for 1 minute or until it takes any damage.
      </p>
      <p>
        A turned creature must spend its turns trying to move as far away from you as it can, and it can't willingly end its move in a space within 30 feet of you. It also can't take reactions. For its action, it can only use the Dash action or try to escape from an effect that prevents it from moving. If there's nowhere to move, the creature can use the Dodge action.
      </p>
      <p>
        After you reach 5th level, when a creature fails its saving throw against your Arcane Abjuration feature, the creature is banished for 1 minute (as in the banishment spell, no concentration required) if it isn't on its plane of origin and its challenge rating is at or below a certain threshold, as shown on the Arcane Banishment table.
      </p>
      <h4>Arcane Banishment</h4>
      <table class='classtable table table-striped'>
        <thead>
          <tr>
            <th>Cleric Level</th><th>Banishes Creatures of CR ...</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>5th</td><td>1/2 or lower</td>
          </tr>
          <tr>
            <td>8th</td><td>1 or lower</td>
          </tr>
          <tr>
            <td>11th</td><td>2 or lower</td>
          </tr>
          <tr>
            <td>14th</td><td>3 or lower</td>
          </tr>
          <tr>
            <td>17th</td><td>4 or lower</td>
          </tr>
        </tbody>
      </table>
      <h4>Spell Breaker</h4>
      <p>
        Starting at 6th level, when you restore hit points to an ally with a spell of 1st level or higher, you can also end one spell of your choice on that creature. The level of the spell you end must be equal to or lower than the level of the spell slot you use to cast the healing spell.
      </p>
      <h4>Potent Spellcasting</h4>
      <p>
        Starting at 8th level, you add your Wisdom modifier to the damage you deal with any cleric cantrip.
      </p>
      <h4>Arcane Mastery</h4>
      <p>
        At 17th level, you choose four spells from the wizard spell list, one from each of the following levels: 6th, 7th, 8th, and 9th. You add them to your list of domain spells. Like your other domain spells, they are always prepared and count as cleric spells for you.
      </p>
    </div>
    <div class="domaindiv" id="death" v-if="shownDomain === 'death'">
      <h2>Death Domain</h2>
      <h4>Death Domain Spells</h4>
      <table class="classtable table table-striped">
        <thead>
          <tr>
            <th>Cleric Level</th><th>Spells</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1st</td><td>false life, ray of sickness</td>
          </tr>
          <tr>
            <td>3rd</td><td>blindness/deafness, ray of enfeeblement</td>
          </tr>
          <tr>
            <td>5th</td><td>animate dead, vampiric touch</td>
          </tr>
          <tr>
            <td>7th</td><td>blight, death ward</td>
          </tr>
          <tr>
            <td>9th</td><td>antilife shell, cloudkill</td>
          </tr>
        </tbody>
      </table>
      <h4>Bonus Proficiency</h4>
      <p>
        When the cleric chooses this domain at 1st level, he or she gains proficiency with martial weapons.
      </p>
      <h4>Reaper</h4>
      <p>
        At 1st level, the cleric learns one necromancy cantrip of his or her choice from any spell list. When the cleric casts a necromancy cantrip that normally targets only one creature, the spell can instead target two creatures within range and within 5 feet of each other.
      </p>
      <h4>Channel Divinity: Touch of Death</h4>
      <p>
        Starting at 2nd level, the cleric can use Channel Divinity to destroy another creature's life force by touch.
      </p>
      <p>
        When the cleric hits a creature with a melee attack, the cleric can use Channel Divinity to deal extra necrotic damage to the target. The damage equals 5 + twice his or her cleric level.
      </p>
      <h4>Inescapable Destruction</h4>
      <p>
        Starting at 6th level, the cleric's ability to channel negative energy becomes more potent. Necrotic damage dealt by the character's cleric spells and Channel Divinity options ignores resistance to necrotic damage.
      </p>
      <h4>Divine Strike</h4>
      <p>
        At 8th level, the cleric gains the ability to infuse his or her weapon strikes with necrotic energy. Once on each of the cleric's turns when he or she hits a creature with a weapon attack, the cleric can cause the attack to deal an extra 1d8 necrotic damage to the target. When the cleric reaches 14th level, the extra damage increases to 2d8.
      </p>
      <h4>Improved Reaper</h4>
      <p>
        Starting at 17th level, when the cleric casts a necromancy spell of 1st through 5th level that targets only one creature, the spell can instead target two creatures within range and within 5 feet of each other. If the spell consumes its material components, the cleric must provide them for each target.
      </p>
    </div>
    <div class="domaindiv" id="earth"  v-if="shownDomain === 'earth'">
      <h2>Earth Domain</h2>
      <h4>Earth Domain Spells</h4>
      <table class='classtable table table-striped'>
        <thead>
          <tr>
            <th>Cleric Level</th><th>Spells</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1st</td><td>earth tremor, absorb elements</td>
          </tr>
          <tr>
            <td>3rd</td><td>shatter, dust devil</td>
          </tr>
          <tr>
            <td>5th</td><td>Erupting Earth, Meld into Stone</td>
          </tr>
          <tr>
            <td>7th</td><td>conjure minor elementals(earth only), Stone Shape</td>
          </tr>
          <tr>
            <td>9th</td><td>Wall of Stone, Conjure Elemental(earth only)</td>
          </tr>
        </tbody>
      </table>
      <h4>Bonus Proficiency</h4>
      <p>
        When you choose this domain at 1st level, you gain proficiency with heavy armor.
      </p>
      <h4>Bonus Cantrips</h4>
      <p>
        You learn the magic stone and mold earth cantrips.
      </p>
      <h4>Channel Divinity: Armor of Stone</h4>
      <p>
        Starting at 2nd level, you can use your Channel Divinity to strengthen your armor with the strength of the earth itself.
      </p>
      <p>
        As an action, you present your holy symbol and perform an incantation.  Pick a number of willing creatures equal to your wisdom modifier within 30 ft of you.  Each of those creatures has their armor class increased by 2 for 1 minute.
      </p>
      <h4>Move in the Earth</h4>
      <p>
        Also Starting at 6th level, you gain a burrow speed equal to your movement speed.  When you burrow you leave no trail behind you, as your body melds itself into the earth itself.
      </p>
      <h4>Earth Strike</h4>
      <p>
        At 8th level, you gain the ability to infuse your weapon strikes with fire energy. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 magic bludgeoning damage to the target. When you reach 14th level, the extra damage increases to 2d8.
      </p>
      <h4>Living Earth</h4>
      <p>
        At 17th level you gain the ability to summon an earth elemental once per day.  The earth elemental serves you and only you faithfully, obeying your verbal commands.  It stays with you until it is killed, but you can only have one elemental companion such as this at a time.  Summoning the elemental requires 1 minute of intense concentration and meditation, during which you cannot move more than 5 feet from the location you started the summoning, and must use your action on every turn to continue the summoning ritual.
      </p>
    </div>
    <div class="domaindiv" id="fire"  v-if="shownDomain === 'fire'">
      <h2>Fire Domain</h2>
      <h4>Fire Domain Spells</h4>
      <table class='classtable table table-striped'>
        <thead>
          <tr>
            <th>Cleric Level</th><th>Spells</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1st</td><td>fairie fire, burning hands</td>
          </tr>
          <tr>
            <td>3rd</td><td>heat metal, flame blade</td>
          </tr>
          <tr>
            <td>5th</td><td>fireball, elemental weapon(fire only)</td>
          </tr>
          <tr>
            <td>7th</td><td>conjure minor elementals(fire only), wall of fire</td>
          </tr>
          <tr>
            <td>9th</td><td>flame strike, Conjure Elemental(fire only)</td>
          </tr>
        </tbody>
      </table>
      <h4>Bonus Proficiency</h4>
      <p>
        When you choose this domain at 1st level, you gain proficiency with martial weapons.
      </p>
      <h4>Bonus Cantrips</h4>
      <p>
        You learn two of the following cantrips of your choice: create bonfire, control flames, fire bolt, produce flame, or green flame blade. These cantrips count as cleric spells for you.
      </p>
      <h4>Channel Divinity: Fire Burst</h4>
      <p>
        Starting at 2nd level, you can use your Channel Divinity to create divine flames
      </p>
      <p>
        As an action, you present your holy symbol and nearby enemies burst into flame.  Pick a number of opponents equal to your wisdom modifier within 30 feet of you.  Each of those creatures must make a constitution saving throw or catch fire.  The fire does 3d6 fire damage every round at the start of that creatures turn until someone uses an action to extinguish the flames.
      </p>
      <h4>Disciple of Fire</h4>
      <p>
        Starting at 6th level, your fire spells are more effective, you add your wisdom modifier to the damage of any spell you cast that does fire damage.
      </p>
      <h4>Flame Strike</h4>
      <p>
        At 8th level, you gain the ability to infuse your weapon strikes with fire energy. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 fire damage to the target. When you reach 14th level, the extra damage increases to 2d8.
      </p>
      <h4>Living Fire</h4>
      <p>
        At 17th level you gain the ability to summon a fire elemental once per day.  The fire elemental serves you and only you faithfully,
        obeying your verbal commands.  It stays with you until it is killed, but you can only have one elemental companion such as this at
        a time.  Summoning the elemental requires 1 minute of intense concentration and meditation, during which you cannot move more than 5 feet from the location you started
        the summoning, and must use your action on every turn to continue the summoning ritual.
      </p>
    </div>
    <div class="domaindiv" id="forge" v-if="shownDomain === 'forge'">
      <h2>Forge Domain</h2>
      <h4>Forge Domain Spells</h4>
      <table class="classtable table table-striped">
        <thead>
          <tr>
            <th>Cleric Level</th><th>Spells</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1st</td><td>searing smite, shield</td>
          </tr>
          <tr>
            <td>3rd</td><td>Heat Metal, Magic Weapon</td>
          </tr>
          <tr>
            <td>5th</td><td>Elemental Weapon, Protection from Energy</td>
          </tr>
          <tr>
            <td>7th</td><td>Fabricate, Wall of Fire</td>
          </tr>
          <tr>
            <td>9th</td><td>Animate Objects, Creation</td>
          </tr>
        </tbody>
      </table>
      <h4>Bonus Proficiencies</h4>
      <p>
        When you choose this domain at 1st level, you gain proficiency with heavy armor.
      </p>
      <h4>Blessing of the Forge</h4>
      <p>
        At 1st level, you gain the ability to imbue magic into a weapon or armor. At the end of a long rest, touch one nonmagical object that is a suit of armor or a simple or martial weapon. Until the end of your next long rest, the object becomes a magic item, granting a +1 bonus to AC if it’s armor or a +1 bonus to attack and damage rolls if it’s a weapon.
      </p>
      <p>
        Once you use this feature, you can’t use it again until you finish a long rest.
      </p>
      <h4>Channel Divinity: Artisan's Blessing</h4>
      <p>
        Starting at 2nd level, you can use your Channel Divinity to create simple items.
      </p>
      <p>
        Starting at the beginning of a short rest, you conduct a ritual to your deity that grants you the ability to craft a finished item that  is at least part metal. The item is completed at the end of the rest.
      </p>
      <p>
        The  object can be worth  no more than 100 gp, and as part of this ritual you must expend metals, such as coins or other finished items, with a value equal to the item you want to make. The item can be an exact duplicate of a nonmagical item, such as a copy of a key, if you possess the original during your short rest.
      </p>
      <h4>Soul of the Forge</h4>
      <p>
        Starting at 6th level, your mastery  of the forge grants  you  a number  of  special  abilities:
      </p>
      <ul>
        <li>You  gain a +1 bonus  to AC while  you  are  wearing  medium or heavy  armor</li>
        <li>You  gain resistance to fire damage.</li>
        <li>When you hit a construct with an attack, you deal additional force damage to it equal to your cleric level.</li>
      </ul>
      <h4>Divine Strike</h4>
      <p>
        At 8th level, you gain the ability to infuse your weapon strikes with the fiery power of the forge. Once on each of your turns when you  hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 fire damage to the target. When you reach 14th level, the extra damage increases to 2d8.
      </p>
      <h4>Saint of Forge and Fire</h4>
      <p>
        At 17th level, your affinity for fire and metal becomes more powerful due to your deity’s blessing. You gain immunity to fire damage, and while you’re wearing heavy  armor, you have resistance to bludgeoning, piercing, and slashing damage from nonmagical attacks.
      </p>
    </div>
    <div class="domaindiv" id="grave" v-if="shownDomain === 'grave'">
      <h2>Grave Domain</h2>
      <p>
        Gods of the grave watch over the line between life and death. To these deities, death and the afterlife are a foundational part of the multiverse. To desecrate the peace of the dead is an abomination. Followers of these deities seek to put wandering spirits to rest, destroy the undead, and ease the suffering of the dying. Their magic also allows them to stave off death for a time. particularly for a person who still has some great work to accomplish in the world. This is a delay of death, not a denial of it, for death will eventually get its due.
      </p>
      <h4>Grave Domain Spells</h4>
      <table class="classtable table table-striped">
        <thead>
          <tr>
            <th>Cleric Level</th><th>Spells</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1st</td><td>bane, false life</td>
          </tr>
          <tr>
            <td>3rd</td><td>gentle repose, ray of enfeeblement</td>
          </tr>
          <tr>
            <td>5th</td><td>revivify, vampiric touch</td>
          </tr>
          <tr>
            <td>7th</td><td>blight, death ward</td>
          </tr>
          <tr>
            <td>9th</td><td>antilife shell, raise dead (Cleric of Nera Only)</td>
          </tr>
        </tbody>
      </table>
      <h4>Circle of Mortality</h4>
      <p>
        At 1st level, you gain the ability to manipulate the line between life and death. When you would normally roll one or more dice to restore hit points with a spell to a creature at 0 hit points, you instead use the highest number possible for each die.
      </p>
      <p>
        In addition, you learn the spare the dying cantrip, which doesn’t count against the number of cleric cantrips you know. For you, it has a range of 30 feet, and you can cast it as a bonus action.
      </p>
      <h4>Eyes of the Grave</h4>
      <p>
        At lst level, you gain the ability to occasionally sense the presence of the undead, whose existence is an insult to the natural cycle of life. As an action, you can open your awareness to magically detect undead. Until the end of your next turn, you know the location of any undead within 60 feet of you that isn’t behind total cover and that isn’t protected from divination magic. This sense doesn’t tell you anything about a creature's capabilities or identity.
      </p>
      <p>
        You can use this feature a number of times equal to your Wisdom modifier (minimum Of once). You regain all expended uses when you finish a long rest.
      </p>
      <h4>Channel Divinity: Path to the Grave</h4>
      <p>
        Starting at 2nd level, you can use your Channel Divinity to mark another creature’s life force for termination.
      </p>
      <p>
        As an action, you choose one creature you can see within 30 feet of you, cursing it until the end Of your next turn. The next time you or an ally of yours hits the cursed creature with an attack, the creature has vulnerability to all of that attack's damage, and then the curse ends.
      </p>
      <h4>Sentinel at Death's Door</h4>
      <p>
        At 6th level, you gain the ability to impede death’s progress. As a reaction when you or a creature you can see within 30 feet of you suffers a critical hit, you can turn that hit into a normal hit. Any effects triggered by a critical hit are canceled.
      </p>
      <p>
        You can use this feature a number of times equal to your Wisdom modifier (minimum of once). You regain all expended uses when you finish a long rest.
      </p>
      <h4>Potent Spellcasting</h4>
      <p>
        Starting at 8th level, you add your Wisdom modifier to the damage you deal with any cleric cantrip.
      </p>
      <h4>Keeper of Souls</h4>
      <p>
        Starting at 17th level. you can seize a trace of vitality from a parting soul and use it to heal the living. When an enemy you can see dies within 60 feet of you, you or one creature of your choice that is within 60 feet of you regains hit points equal to the enemy’s number of Hit Dice. You can use this feature only if you aren’t incapacitated. Once you use it, you can't do so again until the start of your next turn.
      </p>
    </div>
    <div class="domaindiv" id="knowledge" v-if="shownDomain === 'knowledge'">
      <h2>Knowledge Domain</h2>
      <p>
        The gods of knowledge-Amathera and Tock-value learning and understanding above all. Some teach that knowledge is to be gathered and shared in libraries and universities, or promote the practical knowledge of craft and invention. Some deities hoard knowledge and keep its secrets to themselves. And some promise their followers that they will gain tremendous power if they unlock the secrets of the multiverse. Followers of these gods study esoteric lore, collect old tomes, delve into the secret places of the earth, and learn all they can. Some gods of knowledge promote the practical knowledge of craft and invention, including smith deities like Gond, Reorx, Onatar, Moradin, Hephaestus, and Goibhniu.
      </p>
      <h4>Knowledge Domain Spells</h4>
      <table class='classtable table table-striped'>
        <thead>
          <tr>
            <th>Cleric Level</th><th>Spells</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1st</td><td>command, identify</td>
          </tr>
          <tr>
            <td>3rd</td><td>augury, suggestion</td>
          </tr>
          <tr>
            <td>5th</td><td>nondetection, speak with dead</td>
          </tr>
          <tr>
            <td>7th</td><td>arcane eye, confusion</td>
          </tr>
          <tr>
            <td>9th</td><td>legend lore, scrying</td>
          </tr>
        </tbody>
      </table>
      <h4>Blessings of Knowledge</h4>
      <p>
        At 1st level, you learn two languages of your choice. You also become proficient in your choice of two of the following skills: Arcana, History, Nature, or Religion.
      </p>
      <p>
        Your proficiency bonus is doubled for any ability check you make that uses either of those skills.
      </p>
      <h4>Channel Divinity: Knowledge of the Ages</h4>
      <p>
        Starting at 2nd level, you can use your Channel Divinity to tap into a divine well of knowledge. As an action, you choose one skill or tool. For 10 minutes, you have proficiency with the chosen skill or tool.
      </p>
      <h4>Channel Divinity: Read Thoughts</h4>
      <p>
        At 6th level, you can use your Channel Divinity to read a creature's thoughts. You can then use your access to the creature's mind to command it.
      </p>
      <p>
        As an action, choose one creature that you can see within 60 feet of you. That creature must make a Wisdom saving throw. If the creature succeeds on the saving throw, you can't use this feature on it again until you finish a long rest.
      </p>
      <p>
        If the creature fails its save, you can read its surface thoughts (those foremost in its mind, reflecting its current emotions and what it is actively thinking about) when it is within 60 feet of you. This effect lasts for 1 minute.
      </p>
      <p>
        During that time, you can use your action to end this effect and cast the suggestion spell on the creature without expending a spell slot. The target automatically fails its saving throw against the spell.
      </p>
      <h4>Potent Spellcasting</h4>
      <p>
        Starting at 8th level, you add your Wisdom modifier to the damage you deal with any cleric cantrip.
      </p>
      <h4>Visions of the Past</h4>
      <p>
        Starting at 17th level, you can call up visions of the past that relate to an object you hold or your immediate surroundings. You spend at least 1 minute in meditation and prayer, then receive dreamlike, shadowy glimpses of recent events. You can meditate in this way for a number of minutes equal to your Wisdom score and must maintain concentration during that time, as if you were casting a spell.
      </p>
      <p>
        Once you use this feature, you can't use it again until you finish a short or long rest.
      </p>
      <p>
        <strong>Object Reading.</strong> Holding an object as you meditate, you can see visions of the object's previous owner. After meditating for 1 minute, you learn how the owner acquired and lost the object, as w ell as the most recent significant event involving the object and that owner. If the object w as owned by another creature in the recent past (within a number of days equal to your Wisdom score), you can spend 1 additional minute for each owner to learn the same information about that creature.
      </p>
      <p>
        <strong>Area Reading.</strong> As you meditate, you see visions of recent events in your immediate vicinity (a room, street, tunnel, clearing, or the like, up to a 50-foot cube), going back a number of days equal to your Wisdom score. For each minute you meditate, you learn about one significant event, beginning with the most recent. Significant events typically involve powerful emotions, such as battles and betrayals, marriages and murders, births and funerals. However, they might also include more mundane events that are nevertheless important in your current situation.
      </p>
    </div>
    <div class="domaindiv" id="life" v-if="shownDomain === 'life'">
      <h2>Life Domain</h2>
      <p>
        The Life domain focuses on the vibrant positive energy-one of the fundamental forces of the universe-that sustains all life. The gods of life promote vitality and health through healing the sick and wounded, caring for those in need, and driving away the forces of death and undeath. Almost any non-evil deity can claim influence over this domain, particularly agricultural deities (such as Chauntea, Arawai, and Demeter), sun gods (such as Lathander, Pelor, and Re-Horakhty), gods of healing or endurance (such as Ilmater, Mishakal, Apollo, and Diancecht), and gods of home and community (such as Hestia, Hathor, and Boldrei).
      </p>
      <h4>Life Domain Spells</h4>
      <table class='classtable table table-striped'>
        <thead>
          <tr>
            <th>Cleric Level</th><th>Spells</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1st</td><td>bless, cure wounds</td>
          </tr>
          <tr>
            <td>3rd</td><td>lesser restoration, spiritual weapon</td>
          </tr>
          <tr>
            <td>5th</td><td>beacon of hope, revivify</td>
          </tr>
          <tr>
            <td>7th</td><td>death ward, guardian of faith</td>
          </tr>
          <tr>
            <td>9th</td><td>mass cure wounds, raise dead</td>
          </tr>
        </tbody>
      </table>
      <h4>Bonus Proficiency</h4>
      <p>
        When you choose this domain at 1st level, you gain proficiency with heavy armor.
      </p>
      <h4>Disciple of Life</h4>
      <p>
        Also starting at 1st level, your healing spells are more effective. Whenever you use a spell of 1st level or higher to restore hit points to a creature, the creature regains additional hit points equal to 2 + the spell's level.
      </p>
      <h4>Channel Divinity: Preserve Life</h4>
      <p>
        Starting at 2nd level, you can use your Channel Divinity to heal the badly injured.
      </p>
      <p>
        As an action, you present your holy symbol and evoke healing energy that can restore a number of hit points equal to five times your cleric level. Choose any creatures within 30 feet of you, and divide those hit points among them. This feature can restore a creature to no more than half of its hit point maximum. You can't use this feature on an undead or a construct.
      </p>
      <h4>Blessed Healer</h4>
      <p>
        Beginning at 6th level, the healing spells you cast on others heal you as well. When you cast a spell of 1st level or higher that restores hit points to a creature other than you, you regain hit points equal to 2 + the spell's level.
      </p>
      <h4>Divine Strike</h4>
      <p>
        At 8th level, you gain the ability to infuse your weapon strikes with divine energy. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 radiant damage to the target. When you reach 14th level, the extra damage increases to 2d8.
      </p>
      <h4>Supreme Healing</h4>
      <p>
        Starting at 17th level, when you would normally roll one or more dice to restore hit points with a spell, you instead use the highest number possible for each die. For example, instead of restoring 2d6 hit points to a creature, you restore 12.
      </p>
    </div>
    <div class="domaindiv" id="light" v-if="shownDomain === 'light'">
      <h2>Light Domain</h2>
      <p>
        Gods of light promote the ideals of rebirth and renewal, truth, vigilance, and beauty, often using the symbol of the sun. Some of these gods are portrayed as the sun itself or as a charioteer who guides the sun across the sky. Others are tireless sentinels whose eyes pierce every shadow and see through every deception. Some are deities of beauty and artistry, who teach that art is a vehicle for the soul's improvement. Clerics of a god of light are enlightened souls infused with radiance and the power of their gods' discerning vision, charged with chasing away lies and burning away darkness.
      </p>
      <h4>Light Domain Spells</h4>
      <table class='classtable table table-striped'>
        <thead>
          <tr>
            <th>Cleric Level</th><th>Spells</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1st</td><td>burning hands, faerie fire</td>
          </tr>
          <tr>
            <td>3rd</td><td>flaming sphere, scorching ray</td>
          </tr>
          <tr>
            <td>5th</td><td>daylight, fireball</td>
          </tr>
          <tr>
            <td>7th</td><td>guardian of faith, wall of fire</td>
          </tr>
          <tr>
            <td>9th</td><td>flame strike, scrying</td>
          </tr>
        </tbody>
      </table>
      <h4>Bonus Cantrip</h4>
      <p>
        When you choose this domain at 1st level, you gain the light cantrip if you don't already know it.
      </p>
      <h4>Warding Flare</h4>
      <p>
        Also at 1st level, you can interpose divine light between yourself and an attacking enemy. When you are attacked by a creature within 30 feet of you that you can see, you can use your reaction to impose disadvantage on the attack roll, causing light to flare before the attacker before it hits or misses. An attacker that can't be blinded is immune to this feature.
      </p>
      <p>
        You can use this feature a number of times equal to your Wisdom modifier (a minimum of once). You regain all expended uses when you finish a long rest.
      </p>
      <h4>Channel Divinity: Radiance of the Dawn</h4>
      <p>
        Starting at 2nd level, you can use your Channel Divinity to harness sunlight, banishing darkness and dealing radiant damage to your foes.
      </p>
      <p>
        As an action, you present your holy symbol, and any magical darkness within 30 feet of you is dispelled. Additionally, each hostile creature within 30 feet of you must make a Constitution saving throw. A creature takes radiant damage equal to 2d10 + your cleric level on a failed saving throw, and half as much damage on a successful one. A creature that has total cover from you is not affected.
      </p>
      <h4>Improved Flare</h4>
      <p>
        Starting at 6th level, you can also use your Warding Flare feature when a creature that you can see within 30 feet of you attacks a creature other than you.
      </p>
      <h4>Potent Spellcasting</h4>
      <p>
        Starting at 8th level, you add your Wisdom modifier to the damage you deal with any cleric cantrip.
      </p>
      <h4>Corona of Light</h4>
      <p>
        Starting at 17th level, you can use your action to activate an aura of sunlight that lasts for 1 minute or until you dismiss it using another action. You emit bright light in a 60-foot radius and dim light 30 feet beyond that. Your enemies in the bright light have disadvantage on saving throws against any spell that deals fire or radiant damage.
      </p>
    </div>
    <div class="domaindiv" id="nature" v-if="shownDomain === 'nature'">
      <h2>Nature Domain</h2>
      <p>
        Gods of nature are as varied as the natural world itself, from inscrutable gods of the deep forests to friendly deities associated with particular springs and groves (such as Eldath). Druids revere nature as a whole and might serve one of these deities, practicing mysterious rites and reciting all-but-forgotten prayers in their own secret tongue. But many of these gods have clerics as well, champions who take a more active role in advancing the interests of a particular nature god. These clerics might hunt the evil monstrosities that despoil the woodlands, bless the harvest of the faithful, or wither the crops of those who anger their gods.
      </p>
      <h4>Nature Domain Spells</h4>
      <table class='classtable table table-striped'>
        <thead>
          <tr>
            <th>Cleric Level</th><th>Spells</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1st</td><td>animal friendship, speak with animals</td>
          </tr>
          <tr>
            <td>3rd</td><td>barkskin, spike growth</td>
          </tr>
          <tr>
            <td>5th</td><td>plant growth, wind wall</td>
          </tr>
          <tr>
            <td>7th</td><td>dominate beast, grasping vine</td>
          </tr>
          <tr>
            <td>9th</td><td>insect plague, tree stride</td>
          </tr>
        </tbody>
      </table>
      <h4>Acolyte of Nature</h4>
      <p>
        At 1st level, you learn one druid cantrip of your choice. You also gain proficiency in one of the following skills of your choice: Animal Handling, Nature, or Survival.
      </p>
      <h4>Bonus Proficiency</h4>
      <p>
        Also at 1st level, you gain proficiency with heavy armor.
      </p>
      <h4>Channel Divinity: Charm Animals and Plants</h4>
      <p>
        Starting at 2nd level, you can use your Channel Divinity to charm animals and plants.
      </p>
      <p>
        As an action, you present your holy symbol and invoke the name of your deity. Each beast or plant creature that can see you within 30 feet of you must make a Wisdom saving throw. If the creature fails its saving throw, it is charmed by you for 1 minute or until it takes damage. While it is charmed by you, it is friendly to you and other creatures you designate.
      </p>
      <h4>Dampen Elements</h4>
      <p>
        Starting at 6th level, when you or a creature within 30 feet of you takes acid, cold, fire, lightning, or thunder damage, you can use your reaction to grant resistance to the creature against that instance of the damage.
      </p>
      <h4>Divine Strike</h4>
      <p>
        At 8th level, you gain the ability to infuse your weapon strikes with divine energy. Once on each of your turns when you hit a creature with a weapon attack, you   can cause the attack to deal an extra 1d8 cold, fire, or lightning damage (your choice) to the target. When you reach 14th level, the extra damage increases to 2d8.
      </p>
      <h4>Master of Nature</h4>
      <p>
        At 17th level, you gain the ability to command animals and plant creatures. While creatures are charmed by your Charm Animals and Plants feature, you can take a bonus action on your turn to verbally command what each of those creatures will do on its next turn.
      </p>
    </div>
    <div class="domaindiv" id="order" v-if="shownDomain === 'order'">
      <h2>Order Domain</h2>
      <p>
        The Order Domain represents discipline, as well as devotion to a society or an institution and strict obedience to the laws governing it.
      </p>
      <p>
        The ideal of order is obedience to the law above all else, rather than to a specific individual or the passing influence of emotion or popular rule. Clerics of order are typically concerned with how things are done, rather than whether an action's results are just. Following the law and obeying its edicts is critical, especially when it benefits these clerics and their guilds or deities.
      </p>
      <p>
        Law establishes hierarchies. Those selected by the law to lead must be obeyed. Those who obey must do so to the best of their ability. In this manner, law creates an intricate web of obligations that allows society to forge order and security in a chaotic multiverse.
      </p>
      <h4>Order Domain Spells</h4>
      <table class='classtable table table-striped'>
        <thead>
          <tr>
            <th>Cleric Level</th><th>Spells</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1st</td><td>command, heroism</td>
          </tr>
          <tr>
            <td>3rd</td><td>hold person, zone of truth</td>
          </tr>
          <tr>
            <td>5th</td><td>mass healing word, slow</td>
          </tr>
          <tr>
            <td>7th</td><td>compulsion, locate creature</td>
          </tr>
          <tr>
            <td>9th</td><td>commune, dominate person</td>
          </tr>
        </tbody>
      </table>
      <h4>Bonus Proficiencies</h4>
      <p>
        When you choose this domain at 1st level, you gain proficiency with heavy armor. You also gain proficiency in the Intimidation or Persuasion skill (your choice).
      </p>
      <h4>Voice of Authority</h4>
      <p>
        Starting at 1st level, you can invoke the power of law to drive an ally to attack. If you cast a spell with a spell slot of 1st level or higher and target an ally with the spell, that ally can use their reaction immediately after the spell to make one weapon attack against a creature of your choice that you can see.
      </p>
      <p>
        If the spell targets more than one ally, you choose the ally who can make the attack.
      </p>
      <h4>Channel Divinity: Order's Demand</h4>
      <p>
        Starting at 2nd level, you can use your Channel Divinity to exert an intimidating presence over others.
      </p>
      <p>
        As an action, you present your holy symbol, and each creature of your choice that can see or hear you within 30 feet of you must succeed on a Wisdom saving throw or be charmed by you until the end of your next turn or until the charmed creature takes any damage. You can also cause any of the charmed creatures to drop what they are holding when they fail the saving th row.
      </p>
      <h4>Embodiment of the Law</h4>
      <p>
        At 6th level, you become remarkably adept at channeling magical energy to compel others.
      </p>
      <p>
        If you cast a spell of the enchantment school using a spell slot of 1st level or higher, you can change the spell's casting time to 1 bonus action for this casting, provided the spell's casting time is normally 1 action.
      </p>
      <p>
        You can use this feature a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses of it when you finish a long rest.
      </p>
      <h4>Divine Strike</h4>
      <p>
        At 8th level, you gain the ability to infuse your weapon strikes with divine energy. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra ld8 psychic damage to the target. When you reach 14th level, the extra damage increases to 2d8.
      </p>
      <h4>Order's Wrath</h4>
      <p>
        Starting at 17th level, enemies you designate for destruction wilt under the combined efforts of you and your allies. If you deal your Divine Strike damage to a creature on your turn, you can curse that creature until the start of your next turn. The next time one of your allies hits the cursed creature with an attack, the target also takes 2d8 psychic damage, and the curse ends. You can curse a creature in this way only once per turn.
      </p>
    </div>
    <div class="domaindiv" id="tempest" v-if="shownDomain === 'tempest'">
      <h2>Tempest Domain</h2>
      <p>
        Gods whose portfolios include the Tempest domain govern storms, sea, and sky. They include gods of lightning and thunder, gods of earthquakes, some fire gods, and certain gods of violence, physical strength, and courage. In some pantheons, a god of this domain rules over other deities and is known for swift justice delivered by thunderbolts. In the pantheons of seafaring people, gods of this domain are ocean deities and the patrons of sailors. Tempest gods send their clerics to inspire fear in the common folk, either to keep those folk on the path of righteousness or to encourage them to offer sacrifices of propitiation to ward off divine wrath.
      </p>
      <h4>Tempest Domain Spells</h4>
      <table class='classtable table table-striped'>
        <thead>
          <tr>
            <th>Cleric Level</th><th>Spells</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1st</td><td>fog cloud, thunderwave</td>
          </tr>
          <tr>
            <td>3rd</td><td>gust of wind, shatter</td>
          </tr>
          <tr>
            <td>5th</td><td>call lightning, sleet storm</td>
          </tr>
          <tr>
            <td>7th</td><td>control water, ice storm</td>
          </tr>
          <tr>
            <td>9th</td><td>destructive wave, insect plague</td>
          </tr>
        </tbody>
      </table>
      <h4>Bonus Proficiencies</h4>
      <p>
        At 1st level, you gain proficiency with martial weapons and heavy armor.
      </p>
      <h4>Wrath of the Storm</h4>
      <p>
        Also at 1st level, you can thunderously rebuke attackers. When a creature within 5 feet of you that you can see hits you with an attack, you can use your reaction to cause the creature to make a Dexterity saving throw. The creature takes 2d8 lightning or thunder damage (your choice) on a failed saving throw, and half as much damage on a successful one.
      </p>
      <p>
        You can use this feature a number of times equal to your Wisdom modifier (a minimum of once). You regain all expended uses when you finish a long rest.
      </p>
      <h4>Channel Divinity: Destructive Wrath</h4>
      <p>
        Starting at 2nd level, you can use your Channel Divinity to wield the power of the storm with unchecked ferocity.
      </p>
      <p>
        When you roll lightning or thunder damage, you can use your Channel Divinity to deal maximum damage, instead of rolling.
      </p>
      <h4>Thunderbolt Strike</h4>
      <p>
        At 6th level, when you deal lightning damage to a Large or smaller creature, you can also push it up to 10 feet away from you.
      </p>
      <h4>Divine Strike</h4>
      <p>
        At 8th level, you gain the ability to infuse your weapon strikes with divine energy. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 thunder damage to the target. When you reach 14th level, the extra damage increases to 2d8.
      </p>
      <h4>Storm born</h4>
      <p>
        At 17th level, you have a flying speed equal to your current walking speed whenever you are not underground or indoors.
      </p>
    </div>
    <div class="domaindiv" id="trade" v-if="shownDomain === 'trade'">
      <h2>Trade Domain</h2>
      <h4>
        Trade Domain Spells
      </h4>
      <table class='classtable table table-striped'>
        <thead>
          <tr>
            <th>Cleric Level</th><th>Spells</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1st</td><td>Comprehend Languages, Charm Person</td>
          </tr>
          <tr>
            <td>3rd</td><td>Zone of Truth, Calm Emotions</td>
          </tr>
          <tr>
            <td>5th</td><td>Tongues, Sending</td>
          </tr>
          <tr>
            <td>7th</td><td>Freedom of Movement, Dimension Door</td>
          </tr>
          <tr>
            <td>9th</td><td>Teleportation Circle, Rary's Telepathic Bond</td>
          </tr>
        </tbody>
      </table>
      <h4>Bonus Proficiency</h4>
      <p>Starting when you take this domain at 1st level you gain proficiency with one type of Artisan's tools of your choice, the persuasion skill, and in 2 additional languages</p>
      <h4>Channel Divinity: Appraisal</h4>
      <p>Starting at 2nd level, whenever you touch an object you can use an action and a use of your channel divinity feature to learn what it is and its monetary value, if any. You learn about the object as if you had cast the 'identify' spell on it.  Additionally you get an idea of what it's approximate monetary value is on the open market (although individual buyers may offer different amounts).</p>
      <h4>Fast Travel</h4>
      <p>
        Starting at 6th level your movement speed increases by 10 ft.  Additionally once per day you can use your action to increase the movement speed of any friendly creature within 30 ft of you by 10 ft for 1 hour.
      </p>
      <h4>Dimensional Pocket</h4>
      <p>
        Starting at 8th level you can access a dimensional pocket where you can store your acquisitions and wealth.  It takes a 1 minute ritual to access the dimensional pocket, after which you can add or remove any non-living object that you can hold in your hands and which is smaller than 10 ft in all dimensions.  No other creature can access your pocket plane, however, if you die all of it's contents appear near your corpse.
      </p>
      <h4>World Wanderer</h4>
      <p>
        Starting at 14th level, you add the spells Teleport and Mordenkainen's Magnificent Mansion to your list of domain spells, also you can ignore the material component cost of Teleportation Circle.
      </p>
      <h4>Channel Divinity: Money is no Object</h4>
      <p>
        Starting at 17th level you can use your channel divinity feature to turn other metals into gold.  Choose one object made of metal of less than 50 lbs and less than 5 ft in any dimension. As an action you can turn that object into pure gold.  If that object is an armor or weapon, it's damage or AC are reduced by 2.
      </p>
    </div>
    <div class="domaindiv" id="trickery" v-if="shownDomain === 'trickery'">
      <h2>Trickery Domain</h2>
      <p>
        Gods of trickery are mischief-makers and instigators who stand as a constant challenge to the accepted order among both gods and mortals. They're patrons of thieves, scoundrels, gamblers, rebels, and liberators. Their clerics are a disruptive force in the world, puncturing pride, mocking tyrants, stealing from the rich, freeing captives, and flouting hollow traditions. They prefer subterfuge, pranks, deception, and theft rather than direct confrontation.
      </p>
      <h4>Trickery Domain Spells</h4>
      <table class='classtable table table-striped'>
        <thead>
          <tr>
            <th>Cleric Level</th><th>Spells</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1st</td><td>charm person, disguise self</td>
          </tr>
          <tr>
            <td>3rd</td><td>mirror image, pass without trace</td>
          </tr>
          <tr>
            <td>5th</td><td>blink, dispel magic</td>
          </tr>
          <tr>
            <td>7th</td><td>dimension door, polymorph</td>
          </tr>
          <tr>
            <td>9th</td><td>dominate person, modify memory</td>
          </tr>
        </tbody>
      </table>
      <h4>Blessing of the Trickster</h4>
      <p>
        Starting when you choose this domain at 1st level, you can use your action to touch a w illing creature other than yourself to give it advantage on Dexterity (Stealth) checks. This blessing lasts for 1 hour or until you use this feature again.
      </p>
      <h4>Channel Divinity: Invoke Duplicity</h4>
      <p>
        Starting at 2nd level, you can use your Channel Divinity to create an illusory duplicate of yourself.
      </p>
      <p>
        As an action, you create a perfect illusion of yourself that lasts for 1 minute, or until you lose your concentration (as if you were concentrating on a spell). The illusion appears in an unoccupied space that you can see within 30 feet of you. As a bonus action on your turn, you can move the illusion up to 30 feet to a space you can see, but it must remain within 120 feet of you.
      </p>
      <p>
        For the duration, you can cast spells as though you were in the illusion's space, but you must use your own senses. Additionally, when both you and your illusion are within 5 feet of a creature that can see the illusion, you have advantage on attack rolls against that creature, given how distracting the illusion is to the target.
      </p>
      <h4>Channel Divinity: Cloak of Shadows</h4>
      <p>
        Starting at 6th level, you can use your Channel Divinity to vanish.
      </p>
      <p>
        As an action, you become invisible until the end of your next turn. You become visible if you attack or cast a spell.
      </p>
      <h4>Divine Strike</h4>
      <p>
        At 8th level, you gain the ability to infuse your weapon strikes with poison-a gift from your deity. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 poison damage to the target. When you reach 14th level, the extra damage increases to 2d8.
      </p>
      <h4>Improved Duplicity</h4>
      <p>
        At 17th level, you can create up to four duplicates of yourself, instead of one, when you use Invoke Duplicity. As a bonus action on your turn, you can move any number of them up to 30 feet, to a maximum range of 120 feet.
      </p>
    </div>
    <div class="domaindiv" id="war" v-if="shownDomain === 'war'">
      <h2>War Domain</h2>
      <p>
        War has many manifestations. It can make heroes of ordinary people. It can be desperate and horrific, with acts of cruelty and cowardice eclipsing instances of excellence and courage. In either case, the gods of war watch over warriors and reward them for their great deeds. The clerics of such gods excel in battle, inspiring others to fight the good fight or offering acts of violence as prayers. Gods of war include champions of honor and chivalry as well as gods of destruction and pillage and gods of conquest and domination. Other war gods take a more neutral stance, promoting war in all its manifestations and supporting warriors in any circumstance.
      </p>
      <h4>War Domain Spells</h4>
      <table class='classtable table table-striped'>
        <thead>
          <tr>
            <th>Cleric Level</th><th>Spells</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1st</td><td>divine favor, shield of faith</td>
          </tr>
          <tr>
            <td>3rd</td><td>magic weapon, spiritual weapon</td>
          </tr>
          <tr>
            <td>5th</td><td>crusader's mantle, spirit guardians</td>
          </tr>
          <tr>
            <td>7th</td><td>freedom of movement, stoneskin</td>
          </tr>
          <tr>
            <td>9th</td><td>flame strike, hold monster</td>
          </tr>
        </tbody>
      </table>
      <h4>Bonus Proficiencies</h4>
      <p>
        At 1st level, you gain proficiency with martial weapons and heavy armor.
      </p>
      <h4>War Priest</h4>
      <p>
        From 1st level, your god delivers bolts of inspiration to you while you are engaged in battle. When you use the Attack action, you can make one weapon attack as a bonus action.
      </p>
      <p>
        You can use this feature a number of times equal to your Wisdom modifier (a minimum of once). You regain all expended uses when you finish a long rest.
      </p>
      <h4>Channel Divinity: Guided Strike</h4>
      <p>
        Starting at 2nd level, you can use your Channel Divinity to strike with supernatural accuracy. When you make an attack roll, you can use your Channel Divinity to gain a +10 bonus to the roll. You make this choice after you see the roll, but before the DM says whether the attack hits or misses.
      </p>
      <h4>Channel Divinity: War God's Blessing</h4>
      <p>
        At 6th level, when a creature within 30 feet of you makes an attack roll, you can use your reaction to grant that creature a +10 bonus to the roll, using your Channel Divinity. You make this choice after you see the roll, but before the DM says whether the attack hits or misses.
      </p>
      <h4>Divine Strike</h4>
      <p>
        At 8th level, you gain the ability to infuse your weapon strikes with divine energy. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 damage of the same type dealt by the weapon to the target. When you reach 14th level, the extra damage increases to 2d8.
      </p>
      <h4>Avatar of Battle</h4>
      <p>
        At 17th level, you gain resistance to bludgeoning, piercing, and slashing damage from non-magical weapons.
      </p>
    </div>
    <div class="domaindiv" id="water" v-if="shownDomain == 'water'">
      <h2>Water Domain</h2>
      <table class='classtable table table-striped'>
        <thead>
          <tr>
            <th>Cleric Level</th><th>Spells</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1st</td><td>Create or Destroy Water, Ice Knife</td>
          </tr>
          <tr>
            <td>3rd</td><td>lesser restoration, water walk</td>
          </tr>
          <tr>
            <td>5th</td><td>Wall of Water, Water Breathing</td>
          </tr>
          <tr>
            <td>7th</td><td>Control Water, Watery Sphere</td>
          </tr>
          <tr>
            <td>9th</td><td>Cone of Cold, Greater Restoration</td>
          </tr>
        </tbody>
      </table>
      <h4>Bonus Proficiency</h4>
      <p>
        When you choose this domain at 1st level, you gain proficiency with martial weapons.
      </p>
      <h4>Disciple of the Sea</h4>
      <p>
        Also starting at 1st level, your cold spells are more effective, you add your wisdom modifier to the damage of any spell you cast that does cold damage.
      </p>
      <h4>Channel Divinity: Downpour</h4>
      <p>
        Starting at 2nd level, you can use your Channel Divinity to create a rainstorm as an action. The rainstorm occurs in a cylinder with a radius of 300 ft.  Vision within the rainstorm is lightly obscured beyond 100 ft, fires within the area are put out, and all creatures in it have resistance to fire damage.  The rainstorm drops a cubic foot of water on each 5 ft square every round that it continues. You can dismiss the storm at any time, or it will end on its own after 10 minutes.
      </p>
      <h4>State Change</h4>
      <p>
        At 6th level your God grants you the ability to manipulate water around you. As an action you can use the powers granted by your God to change a small of water to ice or steam, or ice or steam into water.  To do so, select a 5 ft cube within 60 ft of you. If the square contains water you can choose to turn that water to ice or steam.  If you change it into ice it does 2d6 cold damage to any creature in or adjacent to that square and any creature in that square must make a strength save against your spell save DC or be paralyzed. They can attempt the save again at the end of each turn.  If they succeed on the save the ice breaks into small shards.  If you turn it into steam it does 3d8 fire damage instead.  If you change ice or steam into water it has no additional adverse effect. The transformation lasts for 1 minute, after which the effect is reversed (potentially doing damage if steam or ice that was turned into water reverts into ice or steam).  You can make this change a number of times per day equal to your wisdom modifier.
      </p>
      <h4>Cold Strike</h4>
      <p>
        At 8th level, you gain the ability to infuse your weapon strikes with cold energy. Once on each of your turns  when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 cold damage to the target. When you reach 14th level, the extra damage increases to 2d8.
      </p>
      <h4>Living Water</h4>
      <p>
        At 17th level you gain the ability to summon a water elemental once per day. The water elemental serves you and only you faithfully, obeying your verbal commands.  It stays with you until it is killed, but you can only have one elemental companion such as this at a time. Summoning the elemental requires 1 minute of intense concentration and meditation, during which you cannot move more than 5 feet from the location you started the summoning, and must use your action on every turn to continue the summoning ritual.
      </p>
    </div>
  </div>
</template>
<script src="./js/domains.js"></script>
<style src="./scss/domains.scss" lang="scss" scoped></style>
