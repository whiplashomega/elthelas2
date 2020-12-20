<template>
  <div class="col-sm-10">
    <h1>
      Classes
    </h1>
    <p>
      This page lists custom class descriptions for classes available in the Elthelas Campaign Setting.  As well as optional changes to existing classes
      for balance reasons.
    </p>
    <ul class="list-inline">
      <li class="list-inline-item"><button @click="shownClass = 'artificer'" class="racebutton btn btn-default">Artificer</button></li>
      <li class="list-inline-item"><button @click="shownClass = 'barbarian'" class="racebutton btn btn-default">Barbarian</button></li>
      <li class="list-inline-item"><button @click="shownClass ='bard'" class="racebutton btn btn-default">Bard</button></li>
      <li class="list-inline-item"><button @click="shownClass = 'cleric'" class="racebutton btn btn-default">Cleric</button></li>
      <li class="list-inline-item"><button @click="shownClass = 'druid'" class="racebutton btn btn-default">Druid</button></li>
      <li class="list-inline-item"><button @click="shownClass = 'factotum'" class="racebutton btn btn-default">Factotum</button></li>
      <li class="list-inline-item"><button @click="shownClass = 'fighter'" class="racebutton btn btn-default">Fighter</button></li>
      <li class="list-inline-item"><button @click="shownClass = 'monk'" class="racebutton btn btn-default">Monk</button></li>
      <li class="list-inline-item"><button @click="shownClass = 'paladin'" class="racebutton btn btn-default">Paladin</button></li>
      <li class="list-inline-item"><button @click="shownClass = 'ranger'" class="racebutton btn btn-default">Ranger</button></li>
      <li class="list-inline-item"><button @click="shownClass = 'rogue'" class="racebutton btn btn-default">Rogue</button></li>
      <li class="list-inline-item"><button @click="shownClass = 'sorcerer'" class="racebutton btn btn-default">Sorcerer</button></li>
      <li class="list-inline-item"><button @click="shownClass = 'warlock'" class="racebutton btn btn-default">Warlock</button></li>
      <li class="list-inline-item"><button @click="shownClass = 'wizard'" class="racebutton btn btn-default">Wizard</button></li>
    </ul>
    <div id="raceDetails"></div>
    <div v-if="shownClass === 'artificer'">
      <h2>Artificer</h2>
      <p>For a detailed description of the Artificer class see Tasha's Cauldron of Everything (p9-23)</p>
      <h3>Artificer Specialists</h3>
      <ul>
        <li>Alchemist (TCE p14-15)</li>
        <li>Armorer (TCE p15-17)</li>
        <li>Artillerist (TCE p17-18)</li>
        <li>Battle Smith (TCE p18-20)</li>
      </ul>
    </div>
    <div v-if="shownClass === 'barbarian'">
      <h2>Barbarian</h2>
      <p>For a detailed description of the Barbarian class see the Player's Handbook (p46-50)</p>
      <h3>Primal Path</h3>
      <p>Barbarians have the following Primal Paths available to them: </p>
      <ul>
        <li>Path of the Ancestral Guardian (XGE p9)</li>
        <li>Path of the Battlerager (SCAG p121)</li>
        <li>Path of the Beast (TCE p24-25)</li>
        <li>Path of the Berserker (PHB p49)</li>
        <li>Path of the Storm Herald (XGE p10)</li>
        <li>Path of the Totem Warrior (PHB p50)</li>
        <li>Path of Wild Magic (TCE p25-26)</li>
        <li>Path of the Zealot (XGE p11)</li>
      </ul>
      <h3>Barbarians in Elthelas</h3>
      <p>
        Barbarian tribes exist in a wide variety of areas in Elthelas, particularly in the wild areas far from the cities. Notable places in Elathia include the runic mountains, sword mountains, the wooded region southwest of Purs, the border region between Eldoran, Demal Thor, and Curinor, the far southern region of Waelin, near the Glass Cliff, the Black Peaks, and the central plains of Malinval. In Atyrea, notable regions include the mountains of Stagenheim (since the gnomish cities exist mostly as cavern cities, the surface is largely held by barbarians), the southern ice wastes, throughout Sage, and the Tiaov Coast. In Riftlan, barbarian tribes can be found throughout in all regions north of Zelfir.
      </p>
    </div>
    <div v-if="shownClass === 'bard'">
      <h2>Bard</h2>
      <p>For a detailed description of the Bard class see the Player's Handbook (p51-55)</p>
      <h3>Bard College</h3>
      <p>Bards have the following Bard Colleges available to them: </p>
      <ul>
        <li>College of Creation (TCE p28-29)</li>
        <li>College of Eloquence (TCE p29-30)</li>
        <li>College of Glamour (XGE p14)</li>
        <li>College of Lore (PHB p54)</li>
        <li>College of Swords (XGE p15)</li>
        <li>College of Valor (PHB p55)</li>
        <li>College of Whispers (XGE p16)</li>
      </ul>
      <h3>Bards in Elthelas</h3>
      <p>
        Schools that train bards exist throughout Elthelas, in many larger cities you can find 2 or even 3 colleges in competition with each other for students, promoting their different philosophies. While the differnet schools of thought have each spread throughout the lands, the College's of Glamour and Lore hold the most sway in Eldoran, while the College's of Swords and Valor are more common among the Dwarves and Humans. The College of Whispers is unique in that it does not publicize it's existence, although its graduates are often recruited by state sponsored spy agencies.
      </p>
    </div>
    <div v-if="shownClass === 'cleric'">
      <h2>Cleric</h2>
      <p>For a detailed description of the Cleric class see the Player's Handbook (p56-63)</p>
      <h3><router-link to="/options/domains">Domain</router-link></h3>
      <p>Clerics have the following Domains available to them: </p>
      <ul>
        <li><router-link to="/options/domains">Air (homebrew)</router-link></li>
        <li>Arcana (SCAG p125-126)</li>
        <li>Death (DMG)</li>
        <li><router-link to="/options/domains">Earth (homebrew)</router-link></li>
        <li><router-link to="/options/domains">Fire (homebrew)</router-link></li>
        <li><router-link to="/options/domains">Forge (XGE)</router-link></li>
        <li><router-link to="/options/domains">Knowledge (PHB p59-60)</router-link></li>
        <li><router-link to="/options/domains">Life (PHB p60)</router-link></li>
        <li><router-link to="/options/domains">Light (PHB p60-61)</router-link></li>
        <li><router-link to="/options/domains">Nature (PHB p61-62)</router-link></li>
        <li>Order Domain (TCE p31-32)</li>
        <li>Peace Domain (TCE p32-33)</li>
        <li><router-link to="/options/domains">Tempest (PHB p62)</router-link></li>
        <li><router-link to="/options/domains">Trade (homebrew)</router-link></li>
        <li><router-link to="/options/domains">Trickery (PHB p62-63)</router-link></li>
        <li>Twilight Domain (TCE p34-35)</li>
        <li><router-link to="/options/domains">War (PHB p63)</router-link></li>
        <li><router-link to="/options/domains">Water (homebrew)</router-link></li>
      </ul>
      <p>Note that a Cleric's domain choices are limited by the God they choose to worship, refer to the Gods section of the reference manual for more information.</p>
      <h3>Clerics in Elthelas</h3>
      <p>
        You can find Clerics of local Gods in just about every town or village in Elthelas. No farming community would establish itself without a cleric of Sara, and no war camp would be without a cleric of Cora, Mat'raktha, or Malik. Even larger trading ships or caravans will often recruit a cleric of Maris to aid them.
      </p>
    </div>
    <div v-if="shownClass === 'druid'">
      <h2>Druid</h2>
      <p>For a detailed description of the Druid class see the Player's Handbook (p64-69)</p>
      <h3>Druid Circle</h3>
      <p>Druids have the following Druid Circles available to them: </p>
      <ul>
        <li>Circle of Dreams (XGE p22)</li>
        <li>Circle of the Land (PHB p68-69)</li>
        <li>Circle of the Moon (PHB p69)</li>
        <li>Circle of the Shepherd (XGE p23)</li>
        <li>Circle of Spores (TCE p36-37)</li>
        <li>Circle of Stars (TCE p38-39)</li>
        <li>Circle of Wildfire (TCE p39-40)</li>
      </ul>
    </div>
    <div v-if="shownClass === 'fighter'">
      <h2>Fighter</h2>
      <p>For a detailed description of the Fighter class see the Player's Handbook (p70-75)</p>
      <h3>Martial Archetypes</h3>
      <p>Fighters have the following Martial Archetypes available to them: </p>
      <ul>
        <li>Arcane Archer (XGE p28)</li>
        <li>Battle Master (PHB p73-74)</li>
        <li>Cavalier (XGE p30)</li>
        <li>Champion (PHB p72-73)</li>
        <li>Eldritch Knight (PHB p74-75, see spell list option below)</li>
        <li>Knight of the Realm (see Purple Dragon Knight SCAG p128)</li>
        <li>Samurai (XGE p31)</li>
        <li>Scourer (homebrew, see below)</li>
        <li>Psi Warrior (TCE p42-44)</li>
        <li>Rune Knight (TCE p44-45)</li>
      </ul>
      <div>
        <h3>Scourer</h3>
        <p>
          The scourer has dedicated their life to defeating magic. The scourer is a specialized individual that has trained to combat mages and the
          spells they create. The scourer is unstoppable against those that cast spells, but is less effective against fighters, soldiers and
          the like.
        </p>
        <p>
          A scourer may be traveling alone, having a specific magical person or item to seek revenge on, or be part of a small group dedicated to
          eradicating magic from the world. Scourers are part of a backlash against those in power that always seem to be, or have access to, magic.
        </p>
        <p>
          Hiring a scourer is often cheaper than hiring a wizard, and can be used to effectively level the playing field against a group with magic.
        </p>
        <h4>Slay Magic</h4>
        <p>
          At third level when you take this Martial Archetype your skills reveal weak spots in spell casters that others miss. Gain an extra 1d8 damage against an enemy that you have seen casting a spell within the last minute. This damage increases to 2d8 at level 18.
        </p>
        <h4>Bonus Proficiencies</h4>
        <p>
          You gain proficiency in the arcana skill.
        </p>
        <h4>Capture Magic</h4>
        <p>
          At level 7 you have learned how spell casters create and spin their magical effects, and have learned how to prevent it. When you successfully
          grapple a creature, the target becomes unable to cast spells that have verbal or semantic components as long as they are grappled.
        </p>
        <h4>Counter Magic</h4>
        <p>
          At level 10 you have learned the inner working of spells and can inherently use the spell against itself. Twice per short rest, you can bend another’s
          spell to your will.  To do this you must spend your reaction to negate or control another casters spell. 3rd level or lower spells are automatically affected while higher level spells
          require a charisma check with the DC being 10 + the spells level. If you succeed, you can choose to negate the spell entirely, or
          if the spell targets a single target other than the caster, you can choose a different target for the spell and if the spell is a concentration spell,
          you take over concentration for the spells duration. You may only concentrate on one spell at a time.
        </p>
        <h4>See Magic</h4>
        <p>
          At level 15, you have learned to see past the trickery magic can create. You have advantage on wisdom saves against spells and advantage on detecting
          illusions.
        </p>
      </div>
      <div>
        <h3>Eldritch Knight</h3>
        <p>
          At your DMs discretion you may be able to use the spell list below instead of the wizard spell list when selecting Eldritch Knight spells, if you do you cannot select a spell off of the wizard list unless it is also on this list. Additionally, if using the list below the school of the spell does not matter and you can always select any spell from this list at any level.
        </p>
        <h4>Cantrips</h4>
        <ul>
          <li>Acid Splash</li>
          <li>Blade Ward</li>
          <li>Booming Blade</li>
          <li>Control Flames</li>
          <li>Create Bonfire</li>
          <li>Fire Bolt</li>
          <li>Force Weapon</li>
          <li>Frostbite</li>
          <li>Green-Flame Blade</li>
          <li>Gust</li>
          <li>Light</li>
          <li>Lightning Lure</li>
          <li>Message</li>
          <li>Poison Spray</li>
          <li>Ray of Frost</li>
          <li>Resistance</li>
          <li>Shape Water</li>
          <li>Shocking Grasp</li>
          <li>Sword Burst</li>
          <li>Thunderclap</li>
          <li>True Strike</li>
        </ul>
        <h4>Level 1</h4>
        <ul>
          <li>Absorb Elements</li>
          <li>Armor of Agathys</li>
          <li>Burning Hands</li>
          <li>Catapult</li>
          <li>Chromatic Orb</li>
          <li>Compelled Duel</li>
          <li>Earth Tremor</li>
          <li>Expeditious Retreat</li>
          <li>Feather Fall</li>
          <li>Find Familiar</li>
          <li>Hail of Thorns</li>
          <li>Hellish Rebuke</li>
          <li>Hunter's Mark</li>
          <li>Ice Knife</li>
          <li>Jump</li>
          <li>Longstrider</li>
          <li>Mage Armor</li>
          <li>Magic Missile</li>
          <li>Searing Smite</li>
          <li>Thunderous Smite</li>
          <li>Thunderwave</li>
          <li>Shield</li>
          <li>Witch Bolt</li>
          <li>Wrathful Smite</li>
        </ul>
        <h4>Level 2</h4>
        <ul>
          <li>Aganazzar's Scorcher</li>
          <li>Blur</li>
          <li>Continual Flame</li>
          <li>Cordon of Arrows</li>
          <li>Darkness</li>
          <li>Darkvision</li>
          <li>Dragon's Breath</li>
          <li>Enlarge/Reduce</li>
          <li>Flame  Blade</li>
          <li>Gust of Wind</li>
          <li>Magic Weapon</li>
          <li>Melf's Acid Arrow</li>
          <li>Mirror Image</li>
          <li>Misty Step</li>
          <li>Moonbeam</li>
          <li>Protection from Poison</li>
          <li>Scorching Ray</li>
          <li>Shadow Blade</li>
          <li>Shatter</li>
          <li>Snilloc's Snowball Swarm</li>
          <li>Warding Wind</li>
        </ul>
        <h4>Level 3</h4>
        <ul>
          <li>Blinding Smite</li>
          <li>Conjure Barrage</li>
          <li>Elemental Weapon</li>
          <li>Erupting Earth</li>
          <li>Fireball</li>
          <li>Flame Arrows</li>
          <li>Fly</li>
          <li>Haste</li>
          <li>Lightning Arrow</li>
          <li>Lightning Bolt</li>
          <li>Magic Circle</li>
          <li>Melf's Minute Meteors</li>
          <li>Phantom Steed</li>
          <li>Protection from Energy</li>
          <li>Sending</li>
          <li>Sleet Storm</li>
          <li>Slow</li>
          <li>Thunder Step</li>
          <li>Wall of Sand</li>
          <li>Wall of Water</li>
          <li>Water Breathing</li>
          <li>Wind Wall</li>
        </ul>
        <h4>Level 4</h4>
        <ul>
          <li>Banishment</li>
          <li>Control Water</li>
          <li>Dimension Door</li>
          <li>Fire Shield</li>
          <li>Freedom of Movement</li>
          <li>Ice Storm</li>
          <li>Otiluke's Resilient Sphere</li>
          <li>Polymorph</li>
          <li>Sickening Radiance</li>
          <li>Staggering Smite</li>
          <li>Stoneskin</li>
          <li>Storm Sphere</li>
          <li>Vitriolic Sphere</li>
          <li>Wall of Fire</li>
        </ul>
      </div>
    </div>
    <div v-if="shownClass === 'factotum'">
      <h2>Factotum</h2>
      <p>
        The Factotum is a homebrewed class loosely based on the similarly named class from D&D 3.5.
      </p>
      <p>
        The Factotum is the ultimate seeker of knowledge.  A student of all schools, the Factotum seeks any kind of knowledge, and uses everything she learns to her advantage.  Her constant study allows the Factotum to display flashes of inspiration, filling any role necessary, if only for a short time.  The Factotum is nothing if not versatile, although occasionally unfocused.
      </p>
      <p>
        Above all, the Factotum is prepared for anything, any circumstance and any challenge, at least when they manage to make it out of the library.  While the Factotum's focus on learning new things is similar to the wizard's focus on arcane knowledge, the Factotum does not share the Wizard's focus. The Factotum is just as interested in that tome on combat styles, or the architects detailed schematics as that previously unknown spell.
      </p>
      <p>
        Factotum's as civilians often work as librarians, scientists, or advisors to people of power.  As adventurers they travel the world seeking out stores of hidden knowledge, documenting unusual creatures, learning from reclusive masters of various arts and skills, or just meeting unusual people, enjoying foods they could never experience at home, and seeing the sights.  In all of their doings they have a talent for coming up with the solution no one else thought of, and with a flash of inspiration, snatching victory and success from the jaws of failure and defeat.
      </p>
      <p>
        Humans and half-elves are the most common factotums, followed by halflings and gnomes.
      </p>
      <h3>The Factotum</h3>
      <table class="classtable table table-striped" id="factotumtable">
        <thead>
          <tr>
            <th>Level</th><th>Prof. Bonus</th><th>Feature</th><th class="tablet-l">Cantrips Known</th><th class="tablet-l">1st</th><th class="tablet-l">2nd</th><th class="tablet-l">3rd</th><th class="tablet-l">4th</th><th class="tablet-l">5th</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td><td>2</td><td>Inspiration, Inspired Skills</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
          </tr>
          <tr>
            <td>2</td><td>2</td><td>Inspired Attack, Inspired Damage, Spellcasting</td><td>4</td><td>2</td><td>0</td><td>0</td><td>0</td><td>0</td>
          </tr>
          <tr>
            <td>3</td><td>2</td>
            <td>Factotum Philosophy Feature</td><td>4</td><td>3</td><td>0</td><td>0</td><td>0</td><td>0</td>
          </tr>
          <tr>
            <td>4</td><td>2</td>
            <td>Ability Score Improvement</td><td>4</td><td>3</td><td>0</td><td>0</td><td>0</td><td>0</td>
          </tr>
          <tr>
            <td>5</td><td>3</td>
            <td>Extra Attack</td><td>4</td><td>4</td><td>2</td><td>0</td><td>0</td><td>0</td>
          </tr>
          <tr>
            <td>6</td><td>3</td>
            <td>Ability Score Improvement</td><td>4</td><td>4</td><td>2</td><td>0</td><td>0</td><td>0</td>
          </tr>
          <tr>
            <td>7</td><td>3</td>
            <td>Factotum Philosophy Feature</td><td>4</td><td>4</td><td>3</td><td>0</td><td>0</td><td>0</td>
          </tr>
          <tr>
            <td>8</td><td>3</td>
            <td>Ability Score Improvement</td><td>4</td><td>4</td><td>3</td><td>0</td><td>0</td><td>0</td>
          </tr>
          <tr>
            <td>9</td><td>4</td>
            <td>-</td><td>4</td><td>4</td><td>3</td><td>2</td><td>0</td><td>0</td>
          </tr>
          <tr>
            <td>10</td><td>4</td>
            <td>Factotum Philosophy Feature</td><td>5</td><td>4</td><td>3</td><td>2</td><td>0</td><td>0</td>
          </tr>
          <tr>
            <td>11</td><td>4</td>
            <td>Inspired Defense</td><td>5</td><td>4</td><td>3</td><td>3</td><td>0</td><td>0</td>
          </tr>
          <tr>
            <td>12</td><td>4</td>
            <td>Ability Score Improvement</td><td>5</td><td>4</td><td>3</td><td>3</td><td>0</td><td>0</td>
          </tr>
          <tr>
            <td>13</td><td>5</td>
            <td>-</td><td>5</td><td>4</td><td>3</td><td>3</td><td>1</td><td>0</td>
          </tr>
          <tr>
            <td>14</td><td>5</td>
            <td>Inspired Aid</td><td>6</td><td>4</td><td>3</td><td>3</td><td>1</td><td>0</td>
          </tr>
          <tr>
            <td>15</td><td>5</td>
            <td>Factotum Philosophy Feature</td><td>6</td><td>4</td><td>3</td><td>3</td><td>2</td><td>0</td>
          </tr>
          <tr>
            <td>16</td><td>5</td>
            <td>Ability Score Improvement</td><td>6</td><td>4</td><td>3</td><td>3</td><td>2</td><td>0</td>
          </tr>
          <tr>
            <td>17</td><td>6</td>
            <td></td><td>6</td><td>4</td><td>3</td><td>3</td><td>3</td><td>1</td>
          </tr>
          <tr>
            <td>18</td><td>6</td>
            <td></td><td>6</td><td>4</td><td>3</td><td>3</td><td>3</td><td>1</td>
          </tr>
          <tr>
            <td>19</td><td>6</td>
            <td>Ability Score Improvement</td><td>6</td><td>4</td><td>3</td><td>3</td><td>3</td><td>2</td>
          </tr>
          <tr>
            <td>20</td><td>6</td>
            <td>Inspired Recovery</td><td>6</td><td>4</td><td>3</td><td>3</td><td>3</td><td>2</td>
          </tr>
        </tbody>
      </table>
      <h3>Hit Points</h3>
      <p>
        <strong>Hit Dice:</strong> 1d8 per factotum level<br />
        <strong>Hit Points at 1st Level:</strong> 8 + your Constitution Modifier<br />
        <strong>Hit Points at Higher Levels:</strong> 1d8(or 5) + your Constitution modifier per factotum level after 1st.
      </p>
      <h3>Proficiencies</h3>
      <p>
        <strong>Armor: </strong>Light armor, medium armor, shields<br />
        <strong>Weapons: </strong>Simple and martial weapons<br />
        <strong>Tools: </strong>Thieves' Tools<br />
        <strong>Saving Throws: </strong> Dexterity, Intelligence<br />
        <strong>Skills: </strong> Choose any three skills
      </p>
      <h3>Equipment</h3>
      <p>You start with the following equipment, in addition to the equipment granted by your background:</p>
      <ul>
        <li>(a) 2 weapons or (b) 1 weapon and a shield</li>
        <li>(a) a short bow and 20 arrows, (b) a light crossbow and 20 bolts, or (c) two handaxes</li>
        <li>(a) A dungeoneer's pack or (b) an explorer's pack</li>
        <li>Leather armor</li>
        <li>(a) a component pouch or (b) an arcane focus</li>
        <li>Thief's tools</li>
      </ul>
      <h3>Class Features</h3>
      <h4>Inspired</h4>
      <p>
        The Factotum gets a number of epiphany points that they can spend to activate certain class features.  They get epiphany points equal to their intelligence modifier plus half their class level (rounded down), minimum 1.  They recover all of their epiphany points when they finish a long rest.
      </p>
      <h4>Inspired Skills</h4>
      <p>
        You can spend an epiphany point when making any skill check to gain advantage on the check.
      </p>
      <h4>Spellcasting</h4>
      <p>
        Starting at 2nd level, you start to pick up the intricacies of casting spells.  As a student of magic, you have a spellbook containing spells that you have picked up in your travels.
      </p>
      <h4>Cantrips</h4>
      <p>
        At 2nd level, you know four cantrips of your choice from any spell list. You learn additional cantrips of your choice at higher levels, as shown in the Cantrips Known column of the Factotum table.
      </p>
      <h4>Spellbook</h4>
      <p>
        At 2nd level you have a spellbook containing six 1st-level spells of your choice.
      </p>
      <h4>Preparing and Casting Spells</h4>
      <p>
        The Factotum table shows how many spell slots you have to cast your spells of 1st level and higher.  To cast one of these spells, you must expend a slot of the spell's level or higher.  You regain all expended spell slots when you finish a long rest.
      </p>
      <p>
        You prepare the list of spells that are available for you to cast.  To do so choose a number of spells from your spellbook equal to your intelligence modifier + one half of your factotum level (rounded down, minimum of 1 spell).  The spells must be of a level for which you have spell slots.
      </p>
      <p>
        For example, if you're a 5th-level factotum, you have four 1st-level and two 2nd-level spell slots.  With an intelligence of 16, your list of prepared spells can include five spells of 1st or 2nd level, in any combination, chosen from your spellbook.  If you prepare the 1st-level spell magic missile, you can cast it using a 1st-level or a 2nd-level slot.  Casting a spell doesn't remove it from your list of prepared spells.
      </p>
      <p>
        You can change your list of prepared spells when you finish a long rest. Preparing a new list of spells requires time spent studying your spellbook and memorizing incantations and gestures you must make to cast a spell: at least 1 minute per spell level for each spell on your list.
      </p>
      <h4>Spellcasting Ability</h4>
      <p>
        Intelligence is your spellcasting ability for your spells, since you learn your spells through dedicated study and memorization. You use your Intelligence whenever a spell refers to your spellcasting ability. In addition, you use your Intelligence modifier when setting the saving throw DC for a spell you cast and when making an attack roll with one. Spell save DC = 8 + your proficiency bonus + your Intelligence modifier Spell attack modifier = your proficiency bonus + your intelligence modifier.
      </p>
      <h4>Ritual Casting</h4>
      <p>
        You can cast a spell as a ritual if that spell has the ritual tag and you have the spell in your spellbook. You don't need to have the spell prepared.
      </p>
      <h4>Spellcasting Focus</h4>
      <p>
        You can use an arcane focus or a divine focus (found in chapter 5) as a spellcasting focus for your spells.
      </p>
      <h4>Learning Spells of 1st Level and Higher</h4>
      <p>
        Each time you gain a Factotum level after 2nd, you can add one spell of your choice to your spellbook. Each of these spells must be of a level for which you have spell slots, as shown on the Factotum table. On your adventures, you might find other spells that you can add to your spellbook (see the “Your Spellbook” sidebar).
      </p>
      <h4>Inspired Attack</h4>
      <p>
        Starting at 2nd level, you can spend an epiphany point before making an attack roll to gain advantage on the roll.
      </p>
      <h4>Inspired Damage</h4>
      <p>
        Starting at 2nd level, when you hit with an attack you can spend an epiphany point to add 2d8 damage to the damage roll. At 11th level this increases to 3d8, and at 17th level this increases to 4d8.
      </p>
      <h4>Factotum Philosophy</h4>
      <p>
        At 3rd level your studies begin to focus on a particular specialty. Choose one of the Factotum Philosophies below, you gain different abilities depending on which philosophy you choose.  You gain additional philosophy features at 7th, 10th and 15th level.
      </p>
      <h4>Ability Score Improvement</h4>
      <p>
        At 4th level, and again at 6th, 8th, 12th, 16th, and 19th level, you gain a +2 bonus to one ability score, +1 to two ability scores, or a feat.
      </p>
      <h4>Extra Attack</h4>
      <p>
        At 5th level you can make 2 attacks when you take the attack action on your turn.
      </p>
      <h4>Inspired Defense</h4>
      <p>
        At 11th level you can spend 1 epiphany point to use the dodge or disengage actions as bonus actions on your turn.
      </p>
      <h4>Inspired Aid</h4>
      <p>
        At 14th level you can spend 1 epiphany point to use the help action as a bonus action on your turn.
      </p>
      <h4>Inspired Recovery</h4>
      <p>
        At 20th level if you have less than half of your epiphany points when you roll initiative you regain enough epiphany points to put you at half your maximum.
      </p>
      <h3>Factotum Philosophies</h3>
      <h3>Brains Over Brawn</h3>
      <p>
        Those who follow the Brains over Brawn philosophy have focused their studies on the weaknesses of their potential enemies, taking the idea of knowledge as power into the field of combat. These scholars always seem to know their enemies weaknesses, and can use that knowledge to get around their defenses.
      </p>
      <h4>Know Your Enemy</h4>
      <p>
        Starting at 3rd level, your combat tactics focus on knowing your opponent and how to get past its defenses. You can use your intelligence modifier instead of strength or dexterity on weapon attack rolls and damage rolls.
      </p>
      <h4>Fighting Style Mimic</h4>
      <p>
        At 7th level the Brains over Brawn Factotum can pick one of the following fighting styles. Whenever they finish a long rest they can spend 3 epiphany points to replace this fighting style with a different one from the list. If you already have a particular fighting style granted by another class you cannot pick that fighting style again.
      </p>
      <ul>
        <li><strong>Archery</strong> - You gain a +2 bonus to attack rolls you make with ranged weapons.</li>
        <li><strong>Dueling</strong> - When you are wielding a melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon.</li>
        <li><strong>Two-Weapon Fighting</strong> - When you engage in two-weapon fighting, you can add your ability modifier to the damage of the second attack.</li>
        <li>
          <strong>Great Weapon Fighting</strong> - When you roll a 1 or 2 on a damage die for an attack you make with a melee weapon that you are wielding with two hands, you can reroll the die and must use the new roll, even if the new roll is a 1 or a 2. The weapon must have the two-handed or versatile property for you to gain this benefit.
        </li>
      </ul>
      <h4>Improved Inspired Damage</h4>
      <p>
        At 10th level, when you use the inspired damage feature you add an additional 1d8 damage to the attack.
      </p>
      <h4>Improved inspired Attack</h4>
      <p>
        At 15th level, when you use an epiphany point to add a bonus to your attack roll, you can make an additional attack as a bonus action, gaining advantage on both attacks.
      </p>
      <h3>Arcane Dilettante</h3>
      <p>
        The Arcane Dilettante has studied magic enough that they begin to seem less like their faking it, and more like a practiced wizard.  They no longer rely on bursts of inspiration for their most practiced spells, and can put together an idea of how to cast even unpracticed spells with less effort.
      </p>
      <h4>Cantrip Master</h4>
      <p>
        At 3rd level you have become particularly adept at casting very basic spells.  You learn 2 additional cantrips in addition to the number shown in the Factotum table.
      </p>
      <h4>Additional Skill Proficiency</h4>
      <p>
        At 3rd level the arcane dilettante gains proficiency in the arcana skill.  If they were already proficient in the arcana skill they gain expertise in the arcana skill (can add their proficiency bonus twice).
      </p>
      <h4>Spell Studies</h4>
      <p>
        At 7th level the Arcane Dilettante can immediately add 6 spells to their spellbook of any level they can cast. Additionally, every factotum level after this one they can add 1 additional spell to their spellbook of any level they can cast.
      </p>
      <h4>Quick Study</h4>
      <p>
        Starting at 10th level, whenever The Factotum finishes a short rest they can trade 1 spell from their prepared list for a different spell in their spellbook.
      </p>
      <h4>Sage</h4>
      <p>
        Starting at 15th level the factotum uses her level, rather than half her level to determine the maximum number of spells she can prepare.
      </p>
      <h3>The Skill Monkey</h3>
      <p> The Skill Monkey has made it their mission to master every skill, taking the Factotum's philosophy of being prepared for anything to its ultimate extreme.</p>
      <h4>Jack-of-all-Trades</h4>
      <p>
        Starting at 3rd level, you can add half your proficiency bonus, rounded down, to any ability check you make that doesn’t already include your proficiency bonus.
      </p>
      <h4>Improved Inspired Skills</h4>
      <p>
        Starting at 7th level, when the Skill Monkey uses the inspire skill ability they add their proficiency bonus to the check, even if they are already proficient in that skill.
      </p>
      <h4>Expertise</h4>
      <p>
        At 10th level, choose two of your skill proficiencies. Your proficiency bonus is doubled for any ability check you make that uses either of the chosen proficiencies.
      </p>
      <h4>Reliable Talent</h4>
      <p>
        By 15th level, you have refined your chosen skills until they approach perfection. Whenever you make an ability check that lets you add your proficiency bonus, you can treat a d20 roll of 9 or lower as a 10.
      </p>
    </div>
    <div v-if="shownClass === 'monk'">
      <h2>Monk</h2>
      <p>For a detailed description of the Monk class see the Player's Handbook (p76-81)</p>
      <h3>Monastic Tradition</h3>
      <p>Monks have the following Monastic Traditions available to them: </p>
      <ul>
        <li>Way of the Drunken Master (XGE p33)</li>
        <li>Way of the Four Elements (PHB p80-81)</li>
        <li>Way of the Kensei (XGE p34)</li>
        <li>Way of the Long Death (SCAG p130-131)</li>
        <li>Way of the Open Hand (PHB p79-80)</li>
        <li>Way of Shadow (PHB p80)</li>
        <li>Way of the Sun Soul (SCAG p131/XGE p35)</li>
        <li>Way of Mercy (TCE p49-50)</li>
        <li>Way of the Astral Self (TCE p50-51)</li>
      </ul>
    </div>
    <div v-if="shownClass === 'paladin'">
      <h2>Paladin</h2>
      <p>For a detailed description of the Paladin class see the Player's Handbook (p82-88)</p>
      <h3>Sacred Oath</h3>
      <p>Paladins have the following Sacred Oaths available to them:</p>
      <ul>
        <li>Oath of the Ancients (PHB p86-87)</li>
        <li>Oath of Conquest (XGE p37)</li>
        <li>Oath of Devotion (PHB p85-86)</li>
        <li>Oath of Redemption (XGE p38)</li>
        <li>Oath of the Crown (SCAG p132-133)</li>
        <li>Oath of Vengeance (PHB p87-88)</li>
        <li>Oath of the Watchers (TCE p54-55)</li>
        <li>Oath of Glory (TCE p53-54)</li>
      </ul>
    </div>
    <div v-if="shownClass === 'ranger'">
      <h2>Ranger</h2>
      <div class="alert alert-danger">
        This version of the ranger is included for the purpose of being a reference for continuing characters. Otherwise please use the new and replacement abilities provided by Tasha's Cauldron of Everything to balance the ranger class.
      </div>
      <p>
        The ranger has been an issue of some consternation for many players, as written in the PHB, many, including myself, consider it to be underpowered compared to the other classes. It
        lacked a real niche. Outclassed in whatever role it might try to fill, whether that be as a scout, skill monkey, striker, tank, etc. There have been many attempts to resolve this, including, famously, multiple revisions of a revised ranger class that appeared in unearthed arcana. In my opinion, however, this revised ranger went too far, especially when taking into account the possibility of multiclass characters, feats, etc. Looking at the analysis that exists about the real problems with the ranger class, and using the revised ranger as inspiration, I have, instead of a complete overhaul of the class, reworked a few of the classes features to be more useful, and largely replaced the beast master archetype with a variation on unearthed arcana's version.  These revisions are below:
      </p>
      <h3>Favored Enemy</h3>
      <p>
        Beginning at 1st level, you have significant experience studying, tracking, hunting, and even talking to a certain type of enemy commonly encountered in the wilds.
      </p>
      <p>
        Choose a type of favored enemy: aberrations, beasts, celestials, constructs, dragons, elementals, fey, fiends, giants, monstrosities, oozes, plants, or undead. You gain a +2 bonus to damage rolls with weapon attacks against creatures of the chosen type. Additionally, you have advantage on Wisdom (Survival) checks to track your favored enemies, as well as on Intelligence checks to recall information about them.
      </p>
      <p>
        When you gain this feature, you also learn one language of your choice, typically one spoken by your favored enemy or creatures associated with it. However, you are free to pick any language you wish to learn.
      </p>
      <p>
        You choose one additional favored enemy, as well as an additional language, at 6th level and 14th level, and the damage you do to your favored enemies increases to +4 at 6th level, and +6 at 14th level.
      </p>
      <h3>Natural Explorer</h3>
      <p>
        You are a master of navigating the natural world, and you react with swift and decisive action when attacked. This grants you the following benefits:
      </p>
      <ul>
        <li>You have advantage on initiative rolls.</li>
      </ul>
      <p>
        In addition you are skilled at navigating the wilderness. You gain the following benefits when traveling for an hour or more:
      </p>
      <ul>
        <li>Difficult terrain doesn't slow your groups travel.</li>
        <li>Your group can't become lost except by magical means.</li>
        <li>Even when you are engaged in another activity while traveling (such as foraging, navigating, or tracking), you remain alert to danger.</li>
        <li>If you are traveling alone, you can move stealthily at a normal pace.</li>
        <li>When you forage, you find twice as much food as you normally would.</li>
        <li>While tracking other creatures, you also learn their exact number, their sizes, and how long ago they passed through the area.</li>
      </ul>
      <h3>Primeval Awareness</h3>
      <p>
        Beginning at 3rd level, you can use your action and to focus your awareness on the region around you. For 1 minute you can sense whether the following types of creatures are present within 1 mile of you: aberrations, celestials, dragons, elementals, fey, fiends, and undead. This feature doesn’t reveal the creatures location or number. If at least one of the creatures is within 60 feet of you this ability reveals the location of the nearest creature.
      </p>
      <h3>Ability Score Improvement</h3>
      <p>
        When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase
        two ability scores of your choice by 1. As normal, you can’t increase an ability score above 20 using this feature.
      </p>
      <h3>Hide in Plain Sight</h3>
      <p>
        Starting at 10th level, you can remain perfectly still for long periods of time to set up ambushes.
      </p>
      <p>
        When you attempt to hide on your turn, you can opt to not move on that turn. If you avoid moving, creatures that attempt to detect you
        take a −5 penalty to their Wisdom (Perception) checks until the start of your next turn. You lose this benefit if you move or fall prone, either
        voluntarily or because of some external effect. You are still automatically detected if any effect or action causes you to no longer be hidden.
      </p>
      <p>
        If you are still hidden on your next turn, you can continue to remain motionless and gain this benefit until you are detected.
      </p>
      <h3>Foe Slayer</h3>
      <p>
        At 20th level, you become an unparalleled hunter. Once on each of your turns, you can add your Wisdom modifier to the attack roll or the
        damage roll of an attack you make. You can choose to use this feature before or after the roll, but before any effects of the roll are applied.
      </p>
      <h2>Ranger Archetypes</h2>
      <p>
        Ranger's can adhere to one of the following archetypes:
      </p>
      <ul>
        <li>Beast Master (PHB with revisions in TCE p60)</li>
        <li>Hunter (PHB)</li>
        <li>Gloom Stalker (XGE)</li>
        <li>Horizon Walker (XGE)</li>
        <li>Monster Slayer (XGE)</li>
        <li>Fey Wanderer (TCE p58-59)</li>
        <li>Swarmkeeper (TCE p59-60)</li>
      </ul>
      <h3>Optional Homebrew Features</h3>
      <p>Ask your DM before taking these features. They are intended to help balance the ranger subclasses.</p>
      <h4>Hunter Magic</h4>
      <p>Level 3 Hunter Feature</p>
      <p>
        This feature is homebrew, get your DM's permission to use it. You learn additional spells when you reach certain levels in this class, as shown on the Hunter Spells table. Each spell counts as a ranger spell for you, but it doesn't count against the number of ranger spells you know.
      </p>
      <table class="classtable table table-striped">
        <tr>
          <th>Ranger Level</th><th>Spell</th>
        </tr>
        <tr>
          <td>3rd</td><td>Ensnaring Strike</td>
        </tr>
        <tr>
          <td>5th</td><td>Melf's Acid Arrow</td>
        </tr>
        <tr>
          <td>9th</td><td>Conjure Barrage</td>
        </tr>
        <tr>
          <td>13th</td><td>Guardian of Nature</td>
        </tr>
        <tr>
          <td>17th</td><td>Wrath of Nature</td>
        </tr>
      </table>
      <h4>Beast Master Magic</h4>
      <p>Level 3 Beast Master Feature</p>
      <p>
        This feature is homebrew, get your DM's permission to use it. You learn additional spells when you reach certain levels in this class, as shown on the Beast Master Spells table. Each spell counts as a ranger spell for you, but it doesn't count against the number of ranger spells you know.
      </p>
      <table class="classtable table table-striped">
        <tr>
          <th>Ranger Level</th><th>Spell</th>
        </tr>
        <tr>
          <td>3rd</td><td>Beast Bond</td>
        </tr>
        <tr>
          <td>5th</td><td>Summon Beast</td>
        </tr>
        <tr>
          <td>9th</td><td>Conjure Animals</td>
        </tr>
        <tr>
          <td>13th</td><td>Giant Insect</td>
        </tr>
        <tr>
          <td>17th</td><td>Commune with Nature</td>
        </tr>
      </table>
    </div>
    <div v-if="shownClass === 'rogue'">
      <h2>Rogue</h2>
      <p>For a detailed description of the Rogue class see the Player's Handbook (p94-98)</p>
      <h3>Roguish Archetype</h3>
      <p>Rogues have the following Roguish Archetypes available to them:</p>
      <ul>
        <li>Arcane Trickster (PHB p97-98)</li>
        <li>Assassin (PHB p97)</li>
        <li>Inquisitive (XGE p45)</li>
        <li>Mastermind (SCAG p135/XGE p46)</li>
        <li>Scout (XGE p47)</li>
        <li>Swashbuckler (SCAG p135-136/XGE p47)</li>
        <li>Thief (PHB p97)</li>
        <li>Soulknife (TCE p63-65)</li>
        <li>Phantom (TCE p62-63)</li>
      </ul>
    </div>
    <div v-if="shownClass === 'sorcerer'">
      <h2>Sorcerer</h2>
      <p>For a detailed description of the Sorcerer class see the Player's Handbook (p99-104)</p>
      <h3>Sorcerous Origins</h3>
      <p>Sorcerers have the following Sorcerous Origins available to them:</p>
      <ul>
        <li>Divine Soul (XGE p50)</li>
        <li>Draconic Bloodline (PHB p102-103)</li>
        <li>Wild Magic (PHB p103-104)</li>
        <li>Shadow Magic (XGE p50)</li>
        <li>Sorceron Bloodline (homebrew, see below)</li>
        <li>Storm Sorcery (XGE p51)</li>
        <li>Clockwork Soul (TCE p68-69)</li>
        <li>Aberrant Mind (TCE p66-68)</li>
      </ul>
      <h3>Optional Class Features</h3>
      <p>Ask your DM before taking these features. They are intended to help balance the sorcerer subclasses.</p>
      <h4>Divine Magic (Alternate)</h4>
      <p>1st level divine soul feature</p>
      <p>This replaces the existing Divine Magic feature.</p>
      <p>
        Your link to the divine allows you to learn spells from the cleric class. When your Spellcasting feature lets you learn or replace a sorcerer cantrip or a sorcerer spell of 1st level or higher, you can choose the new spell from the cleric spell list or the sorcerer spell list. You must otherwise obey all the restrictions for selecting the spell, and it becomes a sorcerer spell for you.
      </p>
      <p>
        You learn additional spells when you reach certain levels in this class. Select two affinities from the following list: Good, Evil, Law, Chaos, Neutrality. Your chosen affinities can be different from your alignment, but you may not choose opposite ends of the same axis. You learn the spells from the tables below corresponding to your chosen affinities. Each spell counts as a sorcerer spell for you, but it doesn't count against the number of sorcerer spells you know.
      </p>
      <h5>Good Affinity Spells</h5>
      <table class="classtable table table-striped">
        <tr>
          <th>Sorcerer Level</th><th>Spell</th>
        </tr>
        <tr><td>1st</td><td>Cure Wounds</td></tr>
        <tr><td>3rd</td><td>Prayer of Healing</td></tr>
        <tr><td>5th</td><td>Revivify</td></tr>
        <tr><td>7th</td><td>Death Ward</td></tr>
        <tr><td>9th</td><td>Greater Restoration</td></tr>
      </table>
      <h5>Evil Affinity Spells</h5>
      <table class="classtable table table-striped">
        <tr>
          <th>Sorcerer Level</th><th>Spell</th>
        </tr>
        <tr><td>1st</td><td>Inflict Wounds</td></tr>
        <tr><td>3rd</td><td>Ray of Enfeeblement</td></tr>
        <tr><td>5th</td><td>Animate Dead</td></tr>
        <tr><td>7th</td><td>Blight</td></tr>
        <tr><td>9th</td><td>Danse Macabre</td></tr>
      </table>
      <h5>Law Affinity Spells</h5>
      <table class="classtable table table-striped">
        <tr>
          <th>Sorcerer Level</th><th>Spell</th>
        </tr>
        <tr><td>1st</td><td>Bless</td></tr>
        <tr><td>3rd</td><td>Calm Emotions</td></tr>
        <tr><td>5th</td><td>Remove Curse</td></tr>
        <tr><td>7th</td><td>Banishment</td></tr>
        <tr><td>9th</td><td>Planar Binding</td></tr>
      </table>
      <h5>Chaos Affinity Spells</h5>
      <table class="classtable table table-striped">
        <tr>
          <th>Sorcerer Level</th><th>Spell</th>
        </tr>
        <tr><td>1st</td><td>Bane</td></tr>
        <tr><td>3rd</td><td>Crown of Madness</td></tr>
        <tr><td>5th</td><td>Curse</td></tr>
        <tr><td>7th</td><td>Freedom of Movement</td></tr>
        <tr><td>9th</td><td>Destructive Wave</td></tr>
      </table>
      <h5>Neutrality Affinity Spells</h5>
      <table class="classtable table table-striped">
        <tr>
          <th>Sorcerer Level</th><th>Spell</th>
        </tr>
        <tr><td>1st</td><td>Protection from Evil and Good</td></tr>
        <tr><td>3rd</td><td>Zone of Truth</td></tr>
        <tr><td>5th</td><td>Spirit Guardians</td></tr>
        <tr><td>7th</td><td>Divination</td></tr>
        <tr><td>9th</td><td>Dispel Evil and Good</td></tr>
      </table>
      <h4>Wilder Magic</h4>
      <p>1st level Wild Mage feature</p>
      <p>
        This feature is homebrew, get your DM's permission to use it. As an action you can expend a spell slot of 5th level or lower to attempt to cast a Sorcerer spell you do not know of equal or lower level to the spell slot you expended. Before you resolve the spell, you must make a Charisma saving throw. The DC is 10 + twice the level of the spell slot you expended. On a successful save, you cast the spell as normal. On a failed save, the spell fails and instead you trigger a Wild Magic Surge.\n\nOnce you use this feature you cannot do so again until you finish a short or long rest.
      </p>
      <h4>Draconic Magic</h4>
      <p>1st level Draconic Ancestry feature</p>
      <p>
        This feature is homebrew, get your DM's permission to use it. You learn additional spells when you reach certain levels in this class. Each spell counts as a sorcerer spell for you, but it doesn't count against the number of sorcerer spells you know. You learn the spells from the Draconic Spells table below, as well as those on the table of your draconic ancestry.
      </p>
      <h5>Draconic Spells</h5>
      <table class="classtable table table-striped">
        <tr>
          <th>Sorcerer Level</th><th>Spell</th>
        </tr>
        <tr><td>1st</td><td>Command</td></tr>
        <tr><td>3rd</td><td>Dragon's Breath</td></tr>
        <tr><td>5th</td><td>Fear</td></tr>
        <tr><td>7th</td><td>Elemental Bane</td></tr>
        <tr><td>9th</td><td>Dominate Person</td></tr>
      </table>
      <h5>Black Dragon Spells</h5>
      <table class="classtable table table-striped">
        <tr>
          <th>Sorcerer Level</th><th>Spell</th>
        </tr>
        <tr><td>1st</td><td>Cause Fear</td></tr>
        <tr><td>3rd</td><td>Melf's Acid Arrow</td></tr>
        <tr><td>5th</td><td>Water Breathing</td></tr>
        <tr><td>7th</td><td>Vitriolic Sphere</td></tr>
        <tr><td>9th</td><td>Insect Plague</td></tr>
      </table>
      <h5>Blue Dragon Spells</h5>
      <table class="classtable table table-striped">
        <tr>
          <th>Sorcerer Level</th><th>Spell</th>
        </tr>
        <tr><td>1st</td><td>Witch Bolt</td></tr>
        <tr><td>3rd</td><td>Dust Devil</td></tr>
        <tr><td>5th</td><td>Lightning Bolt</td></tr>
        <tr><td>7th</td><td>Storm Sphere</td></tr>
        <tr><td>9th</td><td>Wall of Stone</td></tr>
      </table>
      <h5>Brass Dragon Spells</h5>
      <table class="classtable table table-striped">
        <tr>
          <th>Sorcerer Level</th><th>Spell</th>
        </tr>
        <tr><td>1st</td><td>Sleep</td></tr>
        <tr><td>3rd</td><td>Suggestion</td></tr>
        <tr><td>5th</td><td>Windwall</td></tr>
        <tr><td>7th</td><td>Charm Monster</td></tr>
        <tr><td>9th</td><td>Telepathic Bond</td></tr>
      </table>
      <h5>Bronze Dragon Spells</h5>
      <table class="classtable table table-striped">
        <tr>
          <th>Sorcerer Level</th><th>Spell</th>
        </tr>
        <tr><td>1st</td><td>Thunderwave</td></tr>
        <tr><td>3rd</td><td>Gust of Wind</td></tr>
        <tr><td>5th</td><td>Tidal Wave</td></tr>
        <tr><td>7th</td><td>Watery Sphere</td></tr>
        <tr><td>9th</td><td>Control Winds</td></tr>
      </table>
      <h5>Copper Dragon Spells</h5>
      <table class="classtable table table-striped">
        <tr>
          <th>Sorcerer Level</th><th>Spell</th>
        </tr>
        <tr><td>1st</td><td>Tasha's Hideous Laughter</td></tr>
        <tr><td>3rd</td><td>Spike Growth</td></tr>
        <tr><td>5th</td><td>Slow</td></tr>
        <tr><td>7th</td><td>Confusion</td></tr>
        <tr><td>9th</td><td>Geas</td></tr>
      </table>
      <h5>Gold Dragon Spells</h5>
      <table class="classtable table table-striped">
        <tr>
          <th>Sorcerer Level</th><th>Spell</th>
        </tr>
        <tr><td>1st</td><td>Shield</td></tr>
        <tr><td>3rd</td><td>Scorching Ray</td></tr>
        <tr><td>5th</td><td>Counterspell</td></tr>
        <tr><td>7th</td><td>Polymorph</td></tr>
        <tr><td>9th</td><td>Dream</td></tr>
      </table>
      <h5>Green Dragon Spells</h5>
      <table class="classtable table table-striped">
        <tr>
          <th>Sorcerer Level</th><th>Spell</th>
        </tr>
        <tr><td>1st</td><td>Ray of Sickness</td></tr>
        <tr><td>3rd</td><td>Invisibility</td></tr>
        <tr><td>5th</td><td>Stinking Cloud</td></tr>
        <tr><td>7th</td><td>Hallucinatory Terrain</td></tr>
        <tr><td>9th</td><td>Cloudkill</td></tr>
      </table>
      <h5>Red Dragon Spells</h5>
      <table class="classtable table table-striped">
        <tr>
          <th>Sorcerer Level</th><th>Spell</th>
        </tr>
        <tr><td>1st</td><td>Burning Hands</td></tr>
        <tr><td>3rd</td><td>Aganazzar's Scorcher</td></tr>
        <tr><td>5th</td><td>Fireball</td></tr>
        <tr><td>7th</td><td>Wall of Fire</td></tr>
        <tr><td>9th</td><td>Immolation</td></tr>
      </table>
      <h5>Silver Dragon Spells</h5>
      <table class="classtable table table-striped">
        <tr>
          <th>Sorcerer Level</th><th>Spell</th>
        </tr>
        <tr><td>1st</td><td>Identify</td></tr>
        <tr><td>3rd</td><td>Hold Person</td></tr>
        <tr><td>5th</td><td>Leomund's Tiny Hut</td></tr>
        <tr><td>7th</td><td>Ice Storm</td></tr>
        <tr><td>9th</td><td>Legend Lore</td></tr>
      </table>
      <h5>White Dragon Spells</h5>
      <table class="classtable table table-striped">
        <tr>
          <th>Sorcerer Level</th><th>Spell</th>
        </tr>
        <tr><td>1st</td><td>Ice Knife</td></tr>
        <tr><td>3rd</td><td>Snilloc's Snowball Swarm</td></tr>
        <tr><td>5th</td><td>Sleet Storm</td></tr>
        <tr><td>7th</td><td>Fireshield (chill shield only)</td></tr>
        <tr><td>9th</td><td>Cone of Cold</td></tr>
      </table>
      <h4>Shadowfell Magic</h4>
      <p>1st level Shadow Magic feature</p>
      <p>
        his feature is homebrew, get your DM's permission to use it. You learn additional spells when you reach certain levels in this class, as shown on the Shadowfell Spells table. Each spell counts as a sorcerer spell for you, but it doesn't count against the number of sorcerer spells you know.\n* 1st - inflict wounds, false life\n* 3rd - pass without trace, shadow blade\n* 5th - nondetection, summon shadowspawn\n* 7th - blight, shadow of moil\n* 9th - antilife shell, creation
      </p>
      <table class="classtable table table-striped">
        <tr>
          <th>Sorcerer Level</th><th>Spell</th>
        </tr>
        <tr><td>1st</td><td>Inflict Wounds, False Life</td></tr>
        <tr><td>3rd</td><td>Pass Without Trace, Shadow Blade</td></tr>
        <tr><td>5th</td><td>Nondetection, Summon Shadowspawn</td></tr>
        <tr><td>7th</td><td>Blight, Shadow of Moil</td></tr>
        <tr><td>9th</td><td>Antilife Shell, Creation</td></tr>
      </table>
      <h4>Storm Magic</h4>
      <p>1st level Storm Sorcery feature</p>
      <p>
        This feature is homebrew, get your DM's permission to use it. You learn additional spells when you reach certain levels in this class, as shown on the Storm Spells table. Each spell counts as a sorcerer spell for you, but it doesn't count against the number of sorcerer spells you know.
      </p>
      <table class="classtable table table-striped">
        <tr>
          <th>Sorcerer Level</th><th>Spell</th>
        </tr>
        <tr><td>1st</td><td>Fog Cloud, Thunderwave</td></tr>
        <tr><td>3rd</td><td>Shatter, Skywrite</td></tr>
        <tr><td>5th</td><td>Call Lightning, Fly</td></tr>
        <tr><td>7th</td><td>Ice Storm, Storm Sphere</td></tr>
        <tr><td>9th</td><td>Control Winds, Destructive Wave</td></tr>
      </table>
      <h3>Sorceron Bloodline</h3>
      <p>
        The descendents of the Sorceron often show the physical traits of their ancient magical celestial ancestors
        (see the Sorceron Blooded Aasimar subrace), however some appear to show the physical characteristics of
        their other family.  Nevertheless many of them have one thing in common, blood naturally infused with
        Arcanum crystal, and the resulting affinity for sorcerous magic.  Granted many of them do not pursue this path,
        using their magical abilities rarely if at all, and thus not developing in the sorcerer class, but those
        that do can choose the Sorceron Bloodline for their Sorcerous Origin.
      </p>
      <h4>Force Magic</h4>
      <p>
        The blood of the Sorceron gives the Sorceron blooded a special affinity for spells that manipulate pure magical force. You learn additional spells when you reach certain levels in this class, as shown on the Sorceron Spells table. Each spell counts as a sorcerer spell for you, but it doesn't count against the number of sorcerer spells you know.
      </p>
      <h5>Sorceron Spells Table</h5>
      <table class="classtable table table-striped">
        <tr>
          <th>Sorcerer Level</th><th>Spells</th>
        </tr>
        <tr><td>1st</td><td>Magic Missile, Mage Armor</td></tr>
        <tr><td>3rd</td><td>Spiritual Weapon, Misty Step</td></tr>
        <tr><td>5th</td><td>Blink, Leomund's Tiny Hut</td></tr>
        <tr><td>7th</td><td>Dimension Door, Banishment</td></tr>
        <tr><td>9th</td><td>Bigby's Hand, Wall of Force</td></tr>
      </table>
      <h4>Enhanced Force Spells</h4>
      <p>
        When the Sorceron Blooded casts the magic missile spell, each missile does 1d4 + 2 in damage instead of its normal damage.
      </p>
      <p>
        When the Sorceron Blooded casts the Mage Armor spell it has a duration of 16 hours instead of the typical 8 hours.
      </p>
      <h4>Spontaneous Recovery</h4>
      <p>
        Starting at 6th level, whenever the Sorceron Blooded casts a spell of 1st level or higher, roll a d20, on a 20 the spell slot is not expended
        when the spell is cast.  Starting at 18th level the spell slot is not expended when the Sorceron Blooded rolls a 19 or a 20 on the d20 roll.
      </p>
      <h4>Overwhelming Force</h4>
      <p>
        At 14th level your connection to pure force has grown.  You learn the disintigrate spell, if you already know the disintigrate spell pick
        a different sorcerer spell of 5th level or lower.  Whenever you cast disintigrate, if the target makes their save they take half damage
        instead of no damage.
      </p>
    </div>
    <div v-if="shownClass === 'warlock'">
      <h2>Warlock</h2>
      <p>For a detailed description of the Warlock class see the Player's Handbook (p105-111)</p>
      <h3>Otherworldly Patron</h3>
      <p>Warlocks have the following Otherworldly Patrons available to them:</p>
      <ul>
        <li>The Archfey (PHB p108-109) also see the <a href="/ref/divines">list of fey lords on the lesser divines page</a></li>
        <li>The Celestial (XGE p54)</li>
        <li>The Fiend (PHB p109)</li>
        <li>The Great Old One (PHB p109-110)</li>
        <li>The Hexblade (XGE p55)</li>
        <li>The Undying (SCAG p139-140)</li>
        <li>The Genie (TCE p73-75)</li>
        <li>The Fathomless (TCE p72-73)</li>
      </ul>
    </div>
    <div v-if="shownClass === 'wizard'">
      <h2>Wizard</h2>
      <p>For a detailed description of the Wizard class see the Player's Handbook (p112-119)</p>
      <h3>Arcane Tradition</h3>
      <p>Wizards have the following Arcane Traditions available to them:</p>
      <ul>
        <li>Bladesinging (TCE p75-77)</li>
        <li>Order of Scribes (TCE p77-78)</li>
        <li>School of Abjuration (PHB p115-116)</li>
        <li>School of Conjuration (PHB p116)</li>
        <li>School of Divination (PHB p116-117)</li>
        <li>School of Enchantment (PHB p117)</li>
        <li>School of Evocation (PHB p117-118)</li>
        <li>School of Illusion (PHB p118)</li>
        <li>School of Necromancy (PHB p118-119)</li>
        <li>School of Transmutation (PHB p119)</li>
        <li>War Magic (XGE p59)</li>
      </ul>
      <h3>Optional Class Features</h3>
      <p>Ask your DM before taking these features. They are intended to help balance the wizard against the power creep of other casters, and provide additional incentive to adhere to the flavor of the various sublcasses.</p>
      <h4>Expanded Spellbook</h4>
      <p>Level 2 Wizard Feature</p>
      <p>This feature is homebrew, get your DM's permission to use it. You gain additional spells based on your particular specialty. As part of your studies you have memorized certain spells common to your field. Add the following spells to your spellbook at the level listed from the chart relevant to your Wizard School. Once you have added one of these spells to your spellbook, you always have it prepared, and it does not count against your maximum prepared spells."
        },</p>
        <h5>Bladesinging</h5>
        <table class="classtable table table-striped">
          <tr><th>Wizard Level</th><th>Spell</th></tr>
          <tr><td>2nd</td><td>Longstrider</td></tr>
          <tr><td>3rd</td><td>Shadow Blade</td></tr>
          <tr><td>5th</td><td>Haste</td></tr>
          <tr><td>7th</td><td>Stoneskin</td></tr>
          <tr><td>9th</td><td>Steel Wind Strike</td></tr>
        </table>
        <h5>Order of Scribes</h5>
        <table class="classtable table table-striped">
          <tr><th>Wizard Level</th><th>Spell</th></tr>
          <tr><td>2nd</td><td>Illusory Script</td></tr>
          <tr><td>3rd</td><td>Augury</td></tr>
          <tr><td>5th</td><td>Glyph of Warding</td></tr>
          <tr><td>7th</td><td>Arcane Eye</td></tr>
          <tr><td>9th</td><td>Modify Memory</td></tr>
        </table>
        <h5>School of Abjuration</h5>
        <table class="classtable table table-striped">
          <tr><th>Wizard Level</th><th>Spell</th></tr>
          <tr><td>2nd</td><td>Mage Armor</td></tr>
          <tr><td>3rd</td><td>Protection from Poison</td></tr>
          <tr><td>5th</td><td>Magic Circle</td></tr>
          <tr><td>7th</td><td>Freedom of Movement</td></tr>
          <tr><td>9th</td><td>Dispel Evil and Good</td></tr>
        </table>
        <h5>School of Conjuration</h5>
        <table class="classtable table table-striped">
          <tr><th>Wizard Level</th><th>Spell</th></tr>
          <tr><td>2nd</td><td>Grease</td></tr>
          <tr><td>3rd</td><td>Misty Step</td></tr>
          <tr><td>5th</td><td>Summon Shadowspawn</td></tr>
          <tr><td>7th</td><td>Dimension Door</td></tr>
          <tr><td>9th</td><td>Cloudkill</td></tr>
        </table>
        <h5>School of Divination</h5>
        <table class="classtable table table-striped">
          <tr><th>Wizard Level</th><th>Spell</th></tr>
          <tr><td>2nd</td><td>Detect Magic</td></tr>
          <tr><td>3rd</td><td>See Invisibility</td></tr>
          <tr><td>5th</td><td>Tongues</td></tr>
          <tr><td>7th</td><td>Locate Creature</td></tr>
          <tr><td>9th</td><td>Legend Lore</td></tr>
        </table>
        <h5>School of Enchantment</h5>
        <table class="classtable table table-striped">
          <tr><th>Wizard Level</th><th>Spell</th></tr>
          <tr><td>2nd</td><td>Command</td></tr>
          <tr><td>3rd</td><td>Calm Emotions</td></tr>
          <tr><td>5th</td><td>Enemies Abound</td></tr>
          <tr><td>7th</td><td>Dominate Beast</td></tr>
          <tr><td>9th</td><td>Hold Monster</td></tr>
        </table>
        <h5>School of Evocation</h5>
        <table class="classtable table table-striped">
          <tr><th>Wizard Level</th><th>Spell</th></tr>
          <tr><td>2nd</td><td>Chromatic Orb</td></tr>
          <tr><td>3rd</td><td>Shatter</td></tr>
          <tr><td>5th</td><td>Melf's Minute Meteors</td></tr>
          <tr><td>7th</td><td>Ice Storm</td></tr>
          <tr><td>9th</td><td>Wall of Stone</td></tr>
        </table>
        <h5>School of Illusion</h5>
        <table class="classtable table table-striped">
          <tr><th>Wizard Level</th><th>Spell</th></tr>
          <tr><td>2nd</td><td>Silent Image</td></tr>
          <tr><td>3rd</td><td>Invisibility</td></tr>
          <tr><td>5th</td><td>Fear</td></tr>
          <tr><td>7th</td><td>Hallucinatory Terrain</td></tr>
          <tr><td>9th</td><td>Mislead</td></tr>
        </table>
        <h5>School of Necromancy Spells</h5>
        <table class="classtable table table-striped">
          <tr><th>Wizard Level</th><th>Spell</th></tr>
          <tr><td>2nd</td><td>False Life</td></tr>
          <tr><td>3rd</td><td>Ray of Enfeeblement</td></tr>
          <tr><td>5th</td><td>Summon Undead</td></tr>
          <tr><td>7th</td><td>Blight</td></tr>
          <tr><td>9th</td><td>Negative Energy Flood</td></tr>
        </table>
        <h5>School of Transmutation</h5>
        <table class="classtable table table-striped">
          <tr><th>Wizard Level</th><th>Spell</th></tr>
          <tr><td>2nd</td><td>Feather Fall</td></tr>
          <tr><td>3rd</td><td>Enhance Ability</td></tr>
          <tr><td>5th</td><td>Fly</td></tr>
          <tr><td>7th</td><td>Polymorph</td></tr>
          <tr><td>9th</td><td>Transmute Rock</td></tr>
        </table>
        <h5>War Magic</h5>
        <table class="classtable table table-striped">
          <tr><th>Wizard Level</th><th>Spell</th></tr>
          <tr><td>2nd</td><td>Magic Missile</td></tr>
          <tr><td>3rd</td><td>Flaming Sphere</td></tr>
          <tr><td>5th</td><td>Counterspell</td></tr>
          <tr><td>7th</td><td>Storm Sphere</td></tr>
          <tr><td>9th</td><td>Dawn</td></tr>
        </table>
    </div>
    <div>
      <h3>
        Multiclass Prerequisites and Proficiencies for Custom Classes
      </h3>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Class</th><th>Preqrequisites</th><th>Bonus Proficiencies</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Factotum</td><td>Intelligence 13</td><td>Light armor, simple weapons, shields, one skill proficiency</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script src="./js/class.js"></script>
<style src="./scss/class.scss" lang="scss" scoped></style>
