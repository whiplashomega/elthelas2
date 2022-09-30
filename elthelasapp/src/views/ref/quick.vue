<template>
  <div class="col-sm-12">
    <b-tabs id="refdiv">
      <b-tab index="0" title="Spells">
        <h3>Spells</h3>
        <b-row>
          <b-col md="8">
            Filter by Class
            <select v-model="spelltable.classFilter" class="form-control">
              <option value="all">All</option>
              <option value="archivist">Archivist</option>
              <option value="artificer">Artificer</option>
              <option value="bard">Bard</option>
              <option value="cleric">Cleric</option>
              <option value="druid">Druid</option>
              <option value="eldritchknight">Fighter (Eldritch Knight)</option>
              <option value="paladin">Paladin</option>
              <option value="ranger">Ranger</option>
              <option value="sorcerer">Sorcerer</option>
              <option value="warlock">Warlock</option>
              <option value="wizard">Wizard</option>
            </select>
          </b-col>
          <b-col md="4" class="my-1">
            Search
            <b-input-group>
              <b-form-input v-model="spelltable.filterValue" placeholder="Type to Search" />
              <button class="btn btn-primary" :disabled="!spelltable.filterValue" @click="filter = ''">Clear</button>
            </b-input-group>
          </b-col>
        </b-row>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Level</th>
              <th>School</th>
              <th>Casting Time</th>
              <th>Duration</th>
              <th>Tags</th>
            </tr>
            <tr>
              <th><input type="text" v-model="spelltable.titleFilter" class="form-control" /></th>
              <th><select v-model="spelltable.levelFilter" class="form-control">
                <option value="all" selected>All</option>
                <option value="cantrip">Cantrips</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
              </select></th>
              <th><select v-model="spelltable.schoolFilter" class="form-control">
                <option value="all">All</option>
                <option value="abjuration">Abjuration</option>
                <option value="conjuration">Conjuration</option>
                <option value="divination">Divination</option>
                <option value="enchantment">Enchantment</option>
                <option value="evocation">Evocation</option>
                <option value="illusion">Illusion</option>
                <option value="necromancy">Necromancy</option>
                <option value="transmutation">Transmutation</option>
              </select></th>
              <th><select v-model="spelltable.timeFilter" class="form-control">
                <option value="all">All</option>
                <option value="1 action">1 action</option>
                <option value="1 bonus action">1 bonus action</option>
                <option value="1 reaction">1 reaction</option>
                <option value="1 minute">1 minute</option>
                <option value="10 minutes">10 minutes</option>
                <option value="1 hour">1 hour</option>
                <option value="8 hours">8 hours</option>
                <option value="24 hours">24 hours</option>
              </select></th>
              <th><input type="checkbox" v-model="spelltable.concFilter" /> Exclude Concentration <select v-model="spelltable.durationFilter" class="form-control">
                <option value="all">All</option>
                <option value="instantaneous">Instantaneous</option>
                <option value="1 round">1 round</option>
                <option value="1 minute">1 minute</option>
                <option value="10 minutes">10 minutes</option>
                <option value="1 hour">1 hour</option>
                <option value="6 hours">6 hours</option>
                <option value="8 hours">8 hours</option>
                <option value="24 hours">24 hours</option>
                <option value="10 days">10 days</option>
                <option value="until dispelled">until dispelled</option>
              </select></th>
              <th><input type="text" v-model="spelltable.tagsFilter" class="form-control" /> </th>
            </tr>
          </thead>
            <tbody class="spelltable">
              <tr style="margin-top:100px;"><td colspan="6"></td></tr>
              <tr v-for="spell in filteredSpells" :key="spell.title">
                <td><a href="#" @click.stop="info(spell, 0, $event.target)">{{ spell.title }}</a></td>
                <td>{{ spell.level }}</td>
                <td>{{ spell.school }}</td>
                <td>{{ spell.castingTime }}</td>
                <td>{{ spell.duration }}</td>
                <td>{{ spell.tagsText }}</td>
              </tr>
            </tbody>
        </table>
        <modal id="spellmodal" :modalProps="spellModalProps">
          <h4>
            <strong>{{ spelltable.modalInfo.content.school }}
              {{ spelltable.modalInfo.content.level.replace('level', 'level ') }}
            </strong>
            <span v-if="spelltable.modalInfo.content.ritual"> Ritual</span> ({{ spelltable.modalInfo.content.source }})
          </h4>
          <p><strong>Casting Time: </strong>{{ spelltable.modalInfo.content.castingTime }}</p>
          <p><strong>Range: </strong>{{ spelltable.modalInfo.content.range }}</p>
          <p><strong>Components: </strong>{{ spelltable.modalInfo.content.components }}</p>
          <p><strong>Duration: </strong>{{ spelltable.modalInfo.content.duration }}</p>
          <p><strong>Tags: </strong> {{ spelltable.modalInfo.content.tagText }}</p>
          <div v-html="marked.parse(spelltable.modalInfo.description)"></div>
        </modal>
      </b-tab>
      <b-tab index="1" title="Conditions">
        <h3>Conditions</h3>
        <h4>Blinded</h4>
        <ul>
          <li>You can’t see and automatically fail any ability check requiring sight.</li>
          <li>Attack rolls against you have advantage and your attack rolls have disadvantage.</li>
        </ul>
        <h4>Charmed</h4>
        <ul>
          <li>You can’t attack the charmer or target the charmer with harmful abilities or magical effects.</li>
          <li>The charmer has advantage on any ability check to socially interact with you.</li>
        </ul>
        <h4>Deafened</h4>
        <ul>
          <li>You can’t hear and automatically fail any ability check requiring hearing.</li>
        </ul>
        <h4>Cover</h4>
        <ul>
          <li>Creature with Half Cover gets +2 to AC and Dex Saves.</li>
          <li>3/4 Cover gets +5 to AC and dex saves.</li>
          <li>Full cover cannot be targetted.</li>
        </ul>
        <h4>Frightened</h4>
        <ul>
          <li>You have disadvantage on ability checks and attack rolls while the source of your fear is within line of sight.</li>
          <li>You cannot willingly move closer to the source of your fear.</li>
        </ul>
        <h4>Grappled</h4>
        <ul>
          <li>Your speed becomes 0 and you cannot benefit from any bonus to your speed.</li>
          <li>
            This condition ends if the grappler is incapacitated or if an effect removes you from the reach of the grappler or grappling effect.
          </li>
        </ul>
        <h4>Incapacitated</h4>
        <ul>
          <li>You cannot take actions or reactions.</li>
        </ul>
        <h4>Invisible</h4>
        <ul>
          <li>
            You are impossible to see without the aid of magic or a special sense. For the purpose of hiding, you are heavily obscured. Your location can be detected by any noise you make or any tracks you leave.
          </li>
          <li>
            Attack rolls against you have disadvantage and your attack rolls have advantage.
          </li>
        </ul>
        <h4>Obscured/Concealed</h4>
        <ul>
          <li>Lightly obscured includes dim light, patchy fog, moderate foliage, disadvantage on wisdom(perception) checks that rely on sight.</li>
          <li>Heavily obscured areas--such as darkness, opaque fog or dense foliage--blocks  vision entirely, a creature in the area effectively is blind.</li>
        </ul>
        <h4>Paralyzed</h4>
        <ul>
          <li>You are incapacitated and cannot move or speak.</li>
          <li>You automatically fail Strength and Dexterity saving throws.</li>
          <li>Attack rolls against you have advantage.</li>
          <li>Any attack that hits you is a critical hit if your attacker is within 5 feet of you.</li>
        </ul>
        <h4>Petrified</h4>
        <ul>
          <li>
            You are transformed, along with any nonmagical object you are wearing or carrying, into a solid inanimate substance. Your weight increases by a factor of ten and you cease aging.
          </li>
          <li>You are incapacitated, cannot move or speak, and are unaware of your surroundings.</li>
          <li>Attack rolls against you have advantage.</li>
          <li>You automatically fail Strength and Dexterity saving throws.</li>
          <li>You are immune to poison and disease, though a poison or disease already in your system is suspended, not neutralized.</li>
        </ul>
        <h4>Poisoned</h4>
        <ul>
          <li>You have disadvantage on attack rolls and ability checks.</li>
        </ul>
        <h4>Prone</h4>
        <ul>
          <li>Your only movement option is to crawl, unless you stand up and thereby end this condition.</li>
          <li>You have disadvantage on attack rolls.</li>
          <li>
            Attack rolls against you have advantage if your attacker is within 5 feet of you; otherwise, attack rolls against you have disadvantage.
          </li>
        </ul>
        <h4>Restrained</h4>
        <ul>
          <li>Your speed becomes 0 and you cannot benefit from any bonus to your speed.</li>
          <li>Attack rolls against you have advantage, and your attack rolls have disadvantage.</li>
          <li>You have disadvantage on Dexterity saving throws.</li>
        </ul>
        <h4>Stunned</h4>
        <ul>
          <li>You are incapacitated, cannot move, and can only speak falteringly.</li>
          <li>You automatically fail Strength and Dexterity saving throws.</li>
          <li>Attack rolls against you have advantage.</li>
        </ul>
        <h4>Unconscious</h4>
        <ul>
          <li>You are incapacitated, cannot move or speak, and are unaware of your surroundings.</li>
          <li>You drop whatever you were holding and fall prone.</li>
          <li>You automatically fail Strength and Dexterity saving throws.</li>
          <li>Attack rolls against you have advantage.</li>
          <li>Any attack that hits you is a critical hit if your attacker is within 5 feet of you.</li>
        </ul>
      </b-tab>
      <b-tab index="2" title="Injuries">
        <h3>Injuries</h3>
        <b-tabs id="injuries">
          <b-tab title="Rules">
            <p>
              The following homebrew injury rules come via rypillal, with some minor changes for brevity and formatting. <a href="http://homebrewery.naturalcrit.com/share/rypillall">See his original at Homebrewery</a>.
            </p>
            <p>
              If the character is at 0 hit points or less, the character is injured, and the player rolls a d100 on the relevant Lingering Injuries table, adding the character's Constitution score to the roll. If the attack does enough damage that the leftover damage is equal to half or more of their maximum hit points, the character is severely injured, and the player doesn't add the character's Constitution score to the roll.
            </p>
            <p>
              Results should be written onto the character's sheet as a new flaw. Also, unless the result is "I'm... I'm Alright!", the character must still make death saving throws as usual. If a result doesn't specify any lasting injury to the character, assume that, in the long-term, they recover with no adverse lingering effects.
            </p>
            <p>
              Which Lingering Injuries table they roll on depends on the damage type of the attack that pushed the character to the 0 hit points threshold. If the injuring attack combined two or more damage types (such as slashing and fire damage), either go with the damage table that makes most sense, or roll once and cross reference the result on both (or all) tables, and go with what is most fun or interesting: the Dungeon Master has the final say. Should the character be resistant to the injuring attack's damage type, they gain advantage on the roll.
            </p>
            <h4>Recovery</h4>
            <p>
              Several of the Lingering Injury results give a base recovery time, often expressed in increments of days or weeks, after which the worst effects of an injury diminish. However, as different individuals recover at different rates, the base recovery times given in the various entries should be modified by deducting the character's Constitution score.
            </p>
            <p>
              As well as the character's general vigour, factors such as lifestyle can have an impact on how quickly a character can recuperate during downtime. Particularly bad living conditions can drag a recovery out for longer, whereas good food and surroundings can have a character up on their feet in no time!
            </p>
            <p>
              Consult the list below and, depending on the recovering character's lifestyle, apply a positive or negative adjustment to the character's effective Constitution score for recovery purposes. If a character undergoes a variety of lifestyles while recuperating, average out the modifier according to logic.
            </p>
            <p>
              Additionally, the character can choose to focus on recuperating during their downtime. Each whole day of recuperating activity counts as two days of base recovery time.
            </p>
          </b-tab>
          <b-tab index='1' title="Acid">
            <table class="table table-striped">
              <thead><tr><th>D100 Roll</th><th>Injury</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td>1</td><th>Instant Death.</th><td>Your brain or other major organs are dissolved, killing you instantly.</td></tr>
                <tr><td>2</td><th>Fatal Wound</th><td>Either you suffer massive tissue damage, or major organs are part eaten away. Even if you succeed at the normal death saving throws, you remain unconscious and will die after 1d6 turns have passed, at the end of your turn, unless you are magically healed above 0 hit points, or stabilised with a DC 17 Wisdom (Medicine) check using a healer's kit.</td></tr>
                <tr><td>3</td><th>Paralysis</th><td>Spinal damage leaves you unable to move or feel anything from the waist down. You will need carrying or some sort of device to allow mobility (otherwise you can only crawl 5 feet per turn), and count as restrained. Still, there is always hope for a particularly strong person: at the beginning of every week, you can make a DC 20 Constitution saving throw – on a success, you miraculously recover. Otherwise, this flaw only ends if you receive powerful magic such as Greater Restoration, Heal, Regenerate or Wish.</td></tr>
                <tr><td>4</td><th>Melted Arm</th><td>Your arm or hand is scorched off, pumping arterial blood and yellow ichor everywhere. Due to the flow of blood, you lose 1d6 hit points at the end of each of your turns, unless you receive magical healing to seal the stump, it is cauterised by fire or radiant damage, or another character uses an action to apply a tourniquet. Due to system shock, you must make a death saving throw immediately, with disadvantage on the roll. Following recovery, you can no longer hold anything with two hands, and can hold only a single object at a time. The distraction of the pain means that if you attempt to cast any spell you must first succeed on a DC 11 Constitution saving throw or lose your action that turn – the spell slot, if any, is not lost. Finally, if the lost arm was your dominant arm (50% chance), unless you are trained in the Dual Wielder feat or the Two-Weapon Fighting Style, you suffer disadvantage with weapon attacks until you learn to use your off-hand. You learn to live with this pain and train your off-hand after a base recovery time of 40 days (see Recovery above). The limb can be restored by either Regenerate or Wish.</td></tr>
                <tr><td>5</td><th>Melted Leg</th><td>Your leg or foot is scorched off, pumping arterial blood and yellow ichor everywhere. Due to the flow of blood, you lose 1d6 hit points at the end of each of your turns, unless you receive magical healing to seal the stump, it is cauterised by fire or radiant damage, or another character uses an action to apply a tourniquet. Due to system shock, you must make a death saving throw immediately, with disadvantage on the roll. Following recovery, your speed on foot is halved and you must use a cane or crutch to move, unless you receive a prosthesis of some kind. Additionally, you fall prone after using the dash action, and suffer disadvantage on Dexterity checks made to balance. Finally, distraction from the pain means that if you attempt to cast any spell you must first succeed on a DC 11 Constitution saving throw or lose your action that turn – the spell slot, if any, is not lost. You learn to live with this pain after a base recovery time of 40 days (see Recovery above). The limb can be restored by either Regenerate or Wish.</td></tr>
                <tr><td>6-11</td><th>Multiple Injuries</th><td>Roll again on this table 1d3+1 times, suffering the combined effects of the various results (within reason!). Reroll any duplicates, and also reroll Multiple Injuries, Minor Scar, Full Recovery, “I'm... I'm Alright!” and any results which indicate death (like Fatal Wound or Instant Death).</td></tr>
                <tr><td>12-14</td><th>Internal Bleeding</th><td>The attack leaves you with hidden damage, drawing you towards death. You lose 1d3 hit points at the end of every hour, even if stabilised. This injury is difficult to spot, but once diagnosed, This flaw can be removed by magic such as Heal, Regenerate or Wish, or if another character proficient in Medicine conducts surgery: this takes 1 hour, expends one use of a healer's kit and requires a successful DC 17 Wisdom (Medicine) check. The surgery itself inflicts 3d6 piercing damage.</td></tr>
                <tr><td>15-17</td><th>Frail</th><td>You recover, but your health is never quite the same again. You can barely keep food down, and lose 1 point from your Constitution score. Finally, if you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce the character's hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>18-20</td><th>Painful Joints</th><td>You heal, but are never again as sprightly. You lose 1 point from your Dexterity score. If you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce your hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>21-23</td><th>Enfeebled</th><td>You heal, but are never again as strong. You lose 1 point from your Strength score. If you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce your hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>24-27</td><th>Ruined Eye</th><td>If you wear a helmet, you must make a DC 17 Dexterity saving throw – if you fail (or have no helmet), one of your eyes is destroyed. From now on, you suffer disadvantage on Wisdom (Perception) checks that rely on sight, and on ranged attack rolls. If a subsequent injury damages your other eye, you are permanently blinded. Magic such as Regenerate or Wish can restore the lost eye.</td></tr>
                <tr><td>28-30</td><th>Pelvic Injury</th><td>The attack destroys your nethers. Whenever you attempt a Strength (Athletics) check or take any action in combat (other than casting a spell), you must succeed at a DC 11 Constitution saving throw or lose 1d6 hit points. You also can't ride a horse without suffering 1d10 hit points. Finally, this injury renders you permanently infertile. This flaw ends after a base recovery time of 70 days (see Recovery above), or if you receive magic such as Heal, Regenerate or Wish, although the infertility can only be reversed by Greater Restoration or Remove Curse.</td></tr>
                <tr><td>31-35</td><th>Leg Wound</th><td>Your leg is badly damaged. Until a base recovery time of 40 days has passed (see Recovery above), you must use a cane or crutch to move at half speed, you fall prone after using the dash action, and you suffer disadvantage on Dexterity checks made to balance. Even after the worst of the damage has passed, your speed on foot is reduced by 5 feet. The limb can be restored by either Heal, Regenerate or Wish.</td></tr>
                <tr><td>36-39</td><th>Hand Injury</th><td>The attack costs you several fingers. There is a 50% chance of the affected hand being your dominant hand. You can just about carry a shield, but if it's a weapon hand, your weapon attacks suffer a -2 penalty, unless you are trained in either the Dual Wielder feat or the Two-Weapon Fighting Style. Also, if it is your dominant hand, if you attempt to cast a spell with somatic components, you must first succeed on a DC 11 Constitution saving throw or lose your action that turn – the spell slot, if any, is not lost. These penalties last a base recovery time of 40 days (see Recovery above). This flaw can be reversed by magic such as Regenerate or Wish.</td></tr>
                <tr><td>40-44</td><th>Ruined Armor</th><td>Unless your armour is enchanted or made of adamantine, the attack leaves it badly damaged, affording little protection and fitting badly. You suffer -2 from your AC. This penalty lasts until it is replaced, repaired (costing half the the total cost of the item) or subject to a Mending spell. If you have no armour, treat this result as Minor Scar instead.</td></tr>
                <tr><td>45-48</td><th>Old Battle Wound</th><td>You more or less recover, but become plagued for years with recurring pains. After every long rest, you must succeed at a DC 11 Constitution saving throw or suffer -2 to your Dexterity and Wisdom scores until the next long rest. This penalty can be neutralised by special salves, prepared by a character proficient in Medicine or using a herbalism kit with which they are proficient. This flaw can be removed through magic such as Greater Restoration, Heal, Regenerate or Wish.</td></tr>
                <tr><td>49-52</td><th>Useless Shield</th><td>Unless your shield is enchanted or made of adamantine, the attack leaves it ruined and worthless. If you don't have a shield, treat this result as Ruined Armour instead.</td></tr>
                <tr><td>53-59</td><th>Infected Wounds</th><td>The damage refuses to properly heal, and instead becomes swollen and leaks a noisome pus. Your hit point maximum is reduced by 1 for every 24 hours the wound persists. If your hit point maximum drops to 0, you die. The wound heals if you receive the spell heal minor injury or, alternatively, someone can tend to the wound and make a DC 14 Wisdom (Medicine) check once every 24 hours. After ten successes, the wound heals. Characters who are immune to disease treat this result as Minor Scar instead.</td></tr>
                <tr><td>60-62</td><th>Personality Change</th><td>In the aftermath of the attack, due to post-traumatic stress, you soon exhibit a shift in personality. Roll 1d100 and consult the Indefinite Madness table (on page 260 of the Dungeon Master's Guide) to see what permanent flaw you gain. This flaw can only be removed by magic such as Greater Restoration or Wish, or possibly by some kind of long-term therapy, at the Dungeon Master's discretion.</td></tr>
                <tr><td>63-65</td><th>I'm Melting!</th><td>Unless you are immune to being frightened, you frantically stumble towards an ally, grasping at them, pleading for help and dripping acid, before passing out. You immediately move up to half your speed (rounded up) towards a random friendly creature and attempt a grapple; this movement can result in opportunity attacks. If the grapple succeeds, you also inflict 1d6 acid damage. At the beginning of your next turn, you fall unconscious, and begin making death saving throws as usual.</td></tr>
                <tr><td>66-69</td><th>Fixation</th><td>Following recovery, you develop an unhealthy fixation. Roll 1d6: on a 1-3, you nurture a bitter enmity; on a 4-6, you develop an overpowering phobia. If you are immune to being frightened, then this result is bitter enmity. You should work with the Dungeon Master on the phrasing of the new flaw: your hatred or phobia may focus on some element of the attacker's identity (for example, a mindless hatred towards dragons or sorcerers) or even the type of attack (such as a fear of acid). This flaw can be removed by magic such as Greater restoration or Wish.</td></tr>
                <tr><td>70-76</td><th>Horrible Scar</th><td>If you wear a helmet, you must make a DC 14 Dexterity saving throw – if you fail (or have no helmet), you are disfigured to the extent that the wound can't be easily concealed, or palated. You have disadvantage on Charisma (Persuasion) checks and advantage on Charisma (Intimidation) checks. Magic like Heal, Regenerate or Wish can remove the scar.</td></tr>
                <tr><td>77-96</td><th>Minor Scar</th><td>The scar doesn't have any adverse effect, but may make you more memorable and badass! Magic such as Heal, Regenerate or Wish can remove the scar.</td></tr>
                <tr><td>97-98</td><th>Scarred Nerves</th><td>Bathed in a mist of acid droplets, the pain is so intense it proves transcendental, ruining almost all your nerve endings. Although horrific, you learn to live with the background pain, and future sensations seem trivial. Following a long rest, you feel almost no pain, and can reroll a failed Constitution saving throw to maintain concentration on spells due to receiving damage; you must accept the second result. Also, in future, when you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You can't use this feature again until you finish a long rest. Finally, as you may find it difficult to perceive the extent of your injuries, the Dungeon Master might like to roll for your future Lingering Injuries in secret! This flaw can only be removed by magic such as Regenerate or Wish.</td></tr>
                <tr><td>99+</td><th>I'm... I'm Alright!</th><td>The gods must be smiling today – the blow seemed worse than it actually is, and you are assumed dead. Rather than making any death saving throws, you are instead stabilised and returned to 1 hit point and, at the beginning of your next turn, regain 1d10 hit points and can act as normal, gaining advantage on your first attack that turn.</td></tr>
              </tbody>
            </table>
          </b-tab>
          <b-tab index='2' title="Bludgeoning">
            <table class="table table-striped">
              <thead><tr><th>D100 Roll</th><th>Injury</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td>1</td><th>Instant Death.</th><td>Your skull is crushed, or you suffer massive internal injuries, killing you instantly.</td></tr>
                <tr><td>2</td><th>Fatal Wound</th><td>Either your back is broken or your internal organs are ruptured. Even if you succeed at the normal death saving throws, you remain unconscious and will die after 1d6 turns have passed, at the end of your turn, unless you are magically healed above 0 hit points, or stabilised with a DC 17 Wisdom (Medicine) check using a healer's kit.</td></tr>
                <tr><td>3</td><th>Paralysis</th><td>Spinal damage leaves you unable to move or feel anything from the waist down. You will need carrying or some sort of device to allow mobility (otherwise you can only crawl 5 feet per turn), and count as restrained. Still, there is always hope for a particularly strong person: at the beginning of every week, you can make a DC 20 Constitution saving throw – on a success, you miraculously recover. Otherwise, this flaw only ends if you receive magic such as Greater Restoration, Heal, Regenerate or Wish.</td></tr>
                <tr><td>4</td><th>Shattered Arm</th><td>Your arm or hand is smashed beyond recovery, and will require amputation. Following recovery, you can no longer hold anything with two hands, and can hold only a single object at a time. The distraction of the pain means that if you attempt to cast any spell you must first succeed on a DC 11 Constitution saving throw or lose your action that turn – the spell slot, if any, is not lost. Finally, if the lost arm was your dominant arm (50% chance), unless you are trained in the Dual Wielder feat or the Two-Weapon Fighting Style, you suffer disadvantage with weapon attacks until you learn to use your off-hand. You learn to live with this pain and train your off-hand after a base recovery time of 40 days (see Recovery above). The limb can be restored by either Regenerate or Wish.</td></tr>
                <tr><td>5</td><th>Shattered Leg</th><td>Your leg or foot is smashed beyond recovery, and will require amputation. Following recovery, your speed on foot is halved and you must use a cane or crutch to move, unless you receive a prosthesis of some kind. Additionally, you fall prone after using the dash action, and suffer disadvantage on Dexterity checks made to balance. Finally, the distraction of the pain means that if you attempt to cast any spell you must first succeed on a DC 11 Constitution saving throw or lose your action that turn – the spell slot, if any, is not lost. You learn to live with this pain after a base recovery time of 40 days (see Recovery above). The limb can be restored by either Regenerate or Wish.</td></tr>
                <tr><td>6-11</td><th>Multiple Injuries</th><td>Roll again on this table 1d3+1 times, suffering the combined effects of the various results (within reason!). Reroll any duplicates, and also reroll Multiple Injuries, Minor Scar, Full Recovery, "I'm... I'm Alright!" and any results which indicate death (like Fatal Wound or Instant Death).</td></tr>
                <tr><td>12-13</td><th>I Can't Move!</th><td>Brain trauma leaves you fully paralysed, at least for a short time. You can do little more than speak, but can still cast spells that don't require somatic components. However, as you can't feel much of your body, you gain advantage on any Constitution saving throw to maintain concentration on spells due to receiving damage. After every long rest, the character can make a DC 14 Constitution saving throw to end the paralysis. This flaw can also be removed by magic such as Freedom of Movement, Greater Restoration, Heal Minor Injury, Remove Curse or Wish.</td></tr>
                <tr><td>14-15</td><th>I Can't See!</th><td> If you wear a helmet, you must make a DC 11 Constitution saving throw – if you fail (or have no helmet), then one too many blows to the head has damaged your brain in a strange and horrible way. You are temporarily blinded. This flaw ends when you receive magic such as Heal Minor Injury, Greater Restoration, Heal, Regenerate or Wish, or you succeed at a DC 14 Constitution saving throw, which you can make after every long rest.</td></tr>
                <tr><td>16-19</td><th>Internal Bleeding</th><td>The attack leaves you with hidden damage, drawing you towards death. You lose 1d3 hit points at the end of every hour, even if stabilised. This injury is difficult to spot, but once diagnosed, This flaw can be removed by magic such as Heal, Regenerate or Wish, or if another character proficient in Medicine conducts surgery: this takes 1 hour, expends one use of a healer's kit and requires a successful DC 17 Wisdom (Medicine) check. The surgery itself inflicts 3d6 piercing damage.</td></tr>
                <tr><td>20-22</td><th>Frail</th><td>You recover, but your health is never quite the same again. You can barely keep food down, and lose 1 point from your Constitution score. Finally, if you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce the character's hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>23-25</td><th>Painful Joints</th><td>You heal, but are never again as sprightly. You lose 1 point from your Dexterity score. If you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce your hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>26-28</td><th>Enfeebled</th><td>You heal, but are never again as strong. You lose 1 point from your Strength score. If you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce your hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>29-31</td><th>Head Injury</th><td> If you wear a helmet, you must make a DC 11 Constitution saving throw – if you fail (or have no helmet), then head trauma damages your mental facilities somehow, often leaving a bald patch at the scar. Roll 1d3: 1: you lose 1 point from your Intelligence score; 2: you lose 1 point from your Wisdom score; 3: you lose 1 point from your Charisma score. This flaw is often accompanied by speech or memory problems, requiring you to relearn basic skills and social niceties. If the same ability score is affected a second time or more in the future by this flaw, you must succeed at a DC 14 Constitution saving throw or also suffer the Coma flaw (see the Cold Damage page). This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>32-35</td><th>Multiple Fractures</th><td>You take a thorough beating, punctuated by the cracking of several bones. Roll 1d6 twice (rerolling duplicates), and you suffer both the relevant flaws: 1: Broken Arm; 2: Broken Jaw; 3: Broken Ribs; 4: Hand Injury; 5: Leg Wound; 6: Pelvic Injury.</td></tr>
                <tr><td>36-39</td><th>Broken Jaw</th><td>If you wear a helmet, you must make a DC 11 Dexterity or Constitution saving throw (your choice) – if you fail (or have no helmet), your jaw is smashed, scattering teeth everwhere. You find eating and speaking very painful, and suffer disadvantage on most Charisma checks. Additionally, if you attempt to cast a spell which uses verbal components, you must first succeed on a DC 11 Constitution saving throw or lose your action that turn – the spell slot, if any, is not lost. This flaw ends after a base recovery time of 90 days (see Recovery above), or if you receive magic such as Greater Restoration, Heal, Regenerate or Wish.</td></tr>
                <tr><td>40-43</td><th>Broken Arm</th><td>As the attack slams home, an audible 'crack' renders an arm close to useless for a time. There is a 50% chance that the broken arm is your dominant arm and if so, unless you are trained in the Dual Wielder feat or the Two-Weapon Fighting Style, you suffer disadvantage with weapon attacks. If it is your other arm, you cannot wear a shield. This flaw ends after a base recovery time of 30 weeks (see Recovery above), or if you receive magic such as a Greater Restoration, Heal, Regenerate or Wish.</td></tr>
                <tr><td>44-47</td><th>Deafened</th><td>If you wear a helmet, you must make a DC 14 Constitution saving throw – if you fail (or have no helmet), then either through brain damage or damage to the ears, you are deafened. This flaw is removed if you receive magic such as Greater Restoration, Heal, Heal Minor Injury, Regenerate or Wish.</td></tr>
                <tr><td>48-51</td><th>Pelvic Injury</th><td>Either your pelvis is struck a crippling blow, or the attack destroys your nethers. Whenever you attempt a Strength (Athletics) check or take any action in combat (other than casting a spell), you must succeed at a DC 11 Constitution saving throw or lose 1d6 hit points. You also can't ride a horse without suffering 1d10 hit points. Finally, this injury renders you permanently infertile. This flaw ends after a base recovery time of 70 days (see Recovery above), or if you receive magic such as Heal, Regenerate or Wish, although the infertility can only be reversed by Greater Restoration or Remove Curse.</td></tr>
                <tr><td>52-55</td><th>Leg Wound</th><td>Your leg is badly damaged. Until a base recovery time of 40 days has passed (see Recovery above), you must use a cane or crutch to move at half speed, you fall prone after using the dash action, and you suffer disadvantage on Dexterity checks made to balance. Even after the worst of the damage has passed, your speed on foot is reduced by 5 feet. The limb can be restored by magic such as Heal, Regenerate or Wish.</td></tr>
                <tr><td>56-59</td><th>Broken Ribs</th><td>Your rib cage is partly caved in. Whenever you attempt a Strength (Athletics) check or attempt to take any action in combat (other than casting a spell), you must succeed at a DC 11 Constitution saving throw. If you fail the save, you lose your action and can't use reactions until the start of your next turn. This flaw ends after a base recovery time of 50 days (see Recovery above), or if you receive magic such as Heal, Regenerate or Wish.</td></tr>
                <tr><td>60-63</td><th>Punch Drunk</th><td> If you wear a helmet, you must make a DC 11 Constitution saving throw – if you fail (or have no helmet), then due to hearing impairment or brain trauma, your coordination is often disrupted. After every short or long rest, you must succeed at a DC 11 Constitution or Wisdom saving throw (your choice), or suffer disadvantage on Dexterity (Acrobatics) checks. This penalty lasts until the next short or long rest. Additionally, if you are knocked prone, it costs you double the standard movement to stand up. This flaw can be removed through magic such as Greater Restoration, Heal, Heal Minor Injury, Regenerate or Wish.</td></tr>
                <tr><td>64-67</td><th>Ruined Armor</th><td>Unless your armour is enchanted or made of adamantine, the attack leaves it badly damaged, affording little protection and fitting badly. You suffer -2 from your AC. This penalty lasts until it is replaced, repaired (costing half the the total cost of the item) or subject to a Mending spell. If you have no armour, treat this result as Minor Scar instead.</td></tr>
                <tr><td>68-71</td><th>Useless Shield</th><td>Unless your shield is enchanted or made of adamantine, the attack leaves it ruined and worthless. If you don't have a shield, treat this result as Ruined Armour instead.</td></tr>
                <tr><td>72-74</td><th>Personality Change</th><td>In the aftermath of the attack, either as a result of head injury or due to post-traumatic stress, you soon exhibit a shift in personality. Roll 1d100 and consult the Indefinite Madness table (on page 260 of the Dungeon Master's Guide) to see what permanent flaw you gain. This flaw can only be removed by magic such as Greater Restoration or Wish, or possibly by some kind of long-term therapy, at the Dungeon Master's discretion.</td></tr>
                <tr><td>75-76</td><th>Fastball Special</th><td>The force of the attack sends you haplessly flying through the air towards another unsuspecting creature. You are pushed up to 10 feet towards a random creature and, if in range to strike it, knock it prone, unless that other creature succeeds at a DC 11 Dexterity or Strength saving throw (creature's choice). This roll is made with disadvantage if you are bigger than the dodging creature. If you are huge or gargantuan, you are too heavy to be thrown, and this result has no effect.</td></tr>
                <tr><td>77-98</td><th>Minor Scar</th><td>The scar doesn't have any adverse effect, but may make you more memorable and badass! Magic such as Heal, Regenerate or Wish can remove the scar.</td></tr>
                <tr><td>99+</td><th>I'm... I'm Alright!</th><td>The gods must be smiling today – the blow seemed worse than it actually is, and you are assumed dead. Rather than making any death saving throws, you are instead stabilised and returned to 1 hit point and, at the beginning of your next turn, regain 1d10 hit points and can act as normal, gaining advantage on your first attack that turn.</td></tr>
              </tbody>
            </table>
          </b-tab>
          <b-tab index='3' title="Cold">
            <table class="table table-striped">
              <thead><tr><th>D100 Roll</th><th>Injury</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td>1</td><th>Shattered Pieces</th><td>You are frozen solid, and the impact as you hit the floor shatters you into hundreds of pieces. You can now only be brought back by powerful magic like Reincarnate, True Resurrection or Wish.</td></tr>
                <tr><td>2</td><th>Instant Death.</th><td>You are frozen solid, dying instantly.</td></tr>
                <tr><td>3</td><th>Fatal Wound</th><td>Either you suffer massive tissue damage, or your major organs are necrotised by the cold. Even if you succeed at the normal death saving throws, you remain unconscious and will die after 1d6 turns have passed, at the end of your turn, unless you are magically healed above 0 hit points, or stabilised with a DC 17 Wisdom (Medicine) check using a healer's kit.</td></tr>
                <tr><td>4</td><th>Coma</th><td>You enter a death-like sleep from which nothing can seemingly awaken you, though dim life signs still remain. You remain unconscious, even after being stabilised. Following a long rest, make a death saving throw. Three failed saves result in death (possibly due to lack of fluids, amongst other complications), but a result of 15 or means the coma ends. If and when you awaken, you suffer three levels of exhaustion (these exhaustion levels can be removed normally). The coma can also be ended prematurely by magic such as Dream, Remove Curse, Greater Restoration or Wish.</td></tr>
                <tr><td>5</td><th>Destroyed Arm</th><td>Your arm or hand is frozen solid and then shattered, leaving only a numb, blackened stump. Due to system shock, you must make a death saving throw immediately, with disadvantage on the roll. Following recovery, you can no longer hold anything with two hands, and can hold only a single object at a time. Additionally, if the lost arm was your dominant arm (50% chance), unless you are trained in the Dual Wielder feat or the Two-Weapon Fighting Style, you suffer disadvantage with weapon attacks until you learn to use your off-hand. You learn to train your off-hand after a base recovery time of 40 days (see Recovery above). The limb can be restored by either Regenerate or Wish.</td></tr>
                <tr><td>6</td><th>Destroyed Leg</th><td>Your leg or foot is frozen solid and then shattered, leaving only a numb, blackened stump. Due to system shock, you must make a death saving throw immediately, with disadvantage on the roll. Following recovery, your speed on foot is halved and you must use a cane or crutch to move, unless you receive a prosthesis of some kind. Additionally, you fall prone after using the dash action, and suffer disadvantage on Dexterity checks made to balance. The limb can be restored by either Regenerate or Wish.</td></tr>
                <tr><td>7-11</td><th>Multiple Injuries</th><td>Roll again on this table 1d3+1 times, suffering the combined effects of the various results (within reason!). Reroll any duplicates, and also reroll Multiple Injuries, Minor Scar, Full Recovery, "I'm... I'm Alright!" and any results which indicate death (like Fatal Wound, Instant Death or worse).</td></tr>
                <tr><td>12-15</td><th>Lung Trauma</th><td>Your lungs are withered, placing you dangerously close to death. While this flaw remains, you can only stabilise naturally after five death saving throws, rather than three. Following recovery, even routine activity leaves you breathless, and you are wracked with coughing fits when the air is thin or smoky. For every four hours spent walking (or eight hours riding), and when reduced to half your maximum hit points or less, you must succeed at a DC 11 Constitution saving throw or suffer one level of exhaustion. Exhaustion levels gained from this flaw are lost during a short or long rest, or can be removed by a character equipped with a herbalism kit with which they are proficient. Finally, this flaw ends if you succeed at a DC 17 Constitution saving throw rolled at the beginning of every month, or if removed by Heal, Greater Restoration, Regenerate or Wish.</td></tr>
                <tr><td>16-19</td><th>Severe Hypothermia</th><td> Reduced core body heat leaves you with pale puffy skin, blue extremities and lips, and confusion. Your speed is halved (rounded up) and, in combat, you count as if you are subject to the confusion spell (although you cannot make Wisdom saving throws to end the effect as in the standard spell). This flaw ends if you succeed at a DC 11 Constitution saving throw rolled after a long rest, or you receive magic such as Greater Restoration, Protection from Energy (cold) or Wish. At the Dungeon Master's discretion, sources of intense heat may allow you to make an additional saving throw.</td></tr>
                <tr><td>20-23</td><th>Frail</th><td>You recover, but your health is never quite the same again. You can barely keep food down, and lose 1 point from your Constitution score. Finally, if you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce the character's hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>24-27</td><th>Painful Joints</th><td>You heal, but are never again as sprightly. You lose 1 point from your Dexterity score. If you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce your hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>28-31</td><th>Enfeebled</th><td>You heal, but are never again as strong. You lose 1 point from your Strength score. If you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce your hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>32-36</td><th>Crippling Fatigue</th><td>You can never shake your sense of tiredness, and gain one level of exhaustion. This can be removed normally. However, following every long rest, you must succeed at a DC 11 Constitution or Wisdom saving throw (your choice), or gain a level of exhaustion. If you fail this saving throw by 5 or more, you gain two levels. Accumulating enough exhaustion levels can lead to your death. However, if you roll an unmodified 20, this flaw ends, and can also be ended by magic such as Greater Restoration or Wish.</td></tr>
                <tr><td>37-41</td><th>Frost Bite</th><td> Some of your digits rot away, leaving painful blackened stumps. Roll 1d3: 1: you lose 1d3 toes; 2: you lose 1d3 fingers; 3: you lose 1d3 fingers and 1d3 toes. If you lose toes, your foot speed is reduced by 5 feet. If you lose fingers, there is a 50% chance of the affected hand being your dominant hand. You can just about carry a shield, but if it's a weapon hand, your weapon attacks suffer a -2 penalty, unless you are trained in either the Dual Wielder feat or the Two-Weapon Fighting Style. Also, if it is your dominant hand, if you attempt to cast a spell with somatic components, you must first succeed on a DC 11 Constitution saving throw or lose your action that turn – the spell slot, if any, is not lost. These penalties last a base recovery time of 40 days (see Recovery above). This flaw can be removed by magic such as Regenerate or Wish.</td></tr>
                <tr><td>42-46</td><th>Deep Freeze</th><td>Shaking violently with the cold, your strength is sapped for days. While affected by this flaw, you only recover a quarter of your hit dice (rounded up) during a long rest. After a long rest, you can make a DC 17 Constitution saving throw (with advantage if resistant to cold damage): on a success, this flaw ends – otherwise, it remains until you succeed on a future roll, or until you are the subject of magic such as Heal, Greater Restoration, Protection from Energy (cold) or Wish.</td></tr>
                <tr><td>47-50</td><th>Ruined Armor</th><td>Unless your armour is enchanted or made of adamantine, the attack leaves it badly damaged, affording little protection and fitting badly. You suffer -2 from your AC. This penalty lasts until it is replaced, repaired (costing half the the total cost of the item) or subject to a Mending spell. If you have no armour, treat this result as Minor Scar instead.</td></tr>
                <tr><td>51-64</td><th>Useless Shield</th><td>Unless your shield is enchanted or made of adamantine, the attack leaves it ruined and worthless. If you don't have a shield, treat this result as Ruined Armour instead.</td></tr>
                <tr><td>65-68</td><th>Wave of Ice</th><td>A freak burst of elemental ice blossoms where you fall. All other creatures within 10-foot range of you must succeed on a DC 11 Constitution saving throw, or suffer 2d6 cold damage. Additionally, this 10 feet radius of floor is frozen for up to one minute, counting as difficult terrain. A creature attempting to move across this area before it thaws must succeed on a DC 11 Dexterity saving throw or fall prone.</td></tr>
                <tr><td>69-72</td><th>Fixation</th><td>Following recovery, you develop an unhealthy fixation. Roll 1d6: on a 1-3, you nurture a bitter enmity; on a 4-6, you develop an overpowering phobia. If you are immune to being frightened, then this result is bitter enmity. You should work with the Dungeon Master on the phrasing of the new flaw: your hatred or phobia may focus on some element of the attacker's identity (for example, a mindless hatred towards dragons or sorcerers) or even the type of attack (such as a fear of snow). This flaw can be removed by magic such as Greater Restoration or Wish.</td></tr>
                <tr><td>73-76</td><th>Horrible Scar</th><td> If you wear a helmet, you must make a DC 14 Dexterity saving throw – if you fail (or have no helmet), you are disfigured to the extent that the wound can't be easily concealed, or palated. You have disadvantage on Charisma (Persuasion) checks and advantage on Charisma (Intimidation) checks. Magic like Heal, Regenerate or Wish can remove the scar.</td></tr>
                <tr><td>77-96</td><th>Minor Scar</th><td>The scar doesn't have any adverse effect, but may make you more memorable and badass! Magic such as Heal, Regenerate or Wish can remove the scar.</td></tr>
                <tr><td>97-98</td><th>Cold Heart</th><td>By some freak coincidence, the intensity of the frost opens the briefest of rifts to the Plane of Elemental Water and you are permanently infused with the smallest fragment of energy from that plane. Your body becomes icy cold to the touch and, from now on, you reduce fire damage that you suffer by -3 per attack, and your own unarmed attacks inflict an additional 1 point of magical cold damage. Additionally, once per long rest, upon striking a foe within 10 feet, you can choose to channel an additional 2d6 magical cold damage against the target. This costs no action. This flaw can only be removed by magic such as Remove Curse or Wish.</td></tr>
                <tr><td>99+</td><th>I'm... I'm Alright!</th><td>The gods must be smiling today – the blow seemed worse than it actually is, and you are assumed dead. Rather than making any death saving throws, you are instead stabilised and returned to 1 hit point and, at the beginning of your next turn, regain 1d10 hit points and can act as normal, gaining advantage on your first attack that turn.</td></tr>
              </tbody>
            </table>
          </b-tab>
          <b-tab index='4' title="Fire">
            <table class="table table-striped">
              <thead><tr><th>D100 Roll</th><th>Injury</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td>1</td><th>Disintigrated</th><td>The conflagration burns unnaturally hot, killing you instantly and leaving nothing but ash. You can now only be brought back by powerful magic like True Resurrection or Wish.</td></tr>
                <tr><td>2</td><th>Instant Death.</th><td>Your major organs are incinerated, or your brain boils inside your skull, killing you instantly.</td></tr>
                <tr><td>3</td><th>Fatal Wound</th><td>You suffer massive burns, or internal burn damage to major organs. Even if you succeed at the normal death saving throws, you remain unconscious and will die after 1d6 turns have passed, at the end of your turn, unless you are magically healed above 0 hit points, or stabilised with a DC 17 Wisdom (Medicine) check using a healer's kit.</td></tr>
                <tr><td>4</td><th>Incinerated Arm</th><td>Your arm or hand is almost entirely disintegrated. Due to system shock, you must make a death saving throw immediately, with disadvantage on the roll. Following recovery, you can no longer hold anything with two hands, and can hold only a single object at a time. The distraction of the pain means that if you attempt to cast any spell you must first succeed on a DC 11 Constitution saving throw or lose your action that turn – the spell slot, if any, is not lost. Finally, if the lost arm was your dominant arm (50% chance), unless you are trained in the Dual Wielder feat or the Two-Weapon Fighting Style, you suffer disadvantage with weapon attacks until you learn to use your off-hand. You learn to live with this pain and train your off-hand after a base recovery time of 40 days (see Recovery above). The limb can be restored by either Regenerate or Wish.</td></tr>
                <tr><td>5</td><th>Incinerated Leg</th><td>Your leg or foot is almost entirely disintegrated. Due to system shock, you must make a death saving throw immediately, with disadvantage on the roll. Following recovery, your speed on foot is halved and you must use a cane or crutch to move, unless you receive a prosthesis of some kind. Additionally, you fall prone after using the dash action, and suffer disadvantage on Dexterity checks made to balance. Finally, the distraction of the pain means that if you attempt to cast any spell you must first succeed on a DC 11 Constitution saving throw or lose your action that turn – the spell slot, if any, is not lost. You learn to live with this pain after a base recovery time of 40 days (see Recovery above). The limb can be restored by either Regenerate or Wish.</td></tr>
                <tr><td>6-11</td><th>Multiple Injuries</th><td>Roll again on this table 1d3+1 times, suffering the combined effects of the various results (within reason!). Reroll any duplicates, and also reroll Multiple Injuries, Minor Scar, Full Recovery, "I'm... I'm Alright!" and any results which indicate death (like Fatal Wound, Instant Death or worse).</td></tr>
                <tr><td>12-15</td><th>Lung Trauma</th><td>Your lungs are scorched or withered, placing you dangerously close to death. While this flaw remains, you can only stabilise naturally after five death saving throws, rather than three. Following recovery, even routine activity leaves you breathless, and you are wracked with coughing fits when the air is thin or smoky. For every four hours spent walking (or eight hours riding), and when reduced to half your maximum hit points or less, you must succeed at a DC 11 Constitution saving throw or suffer one level of exhaustion. Exhaustion levels gained from this flaw are lost during a short or long rest, or can be removed by a character equipped with a herbalism kit with which they are proficient. Finally, this flaw ends if you succeed at a DC 17 Constitution saving throw rolled at the beginning of every month, or if removed by Greater Restoration, Heal, Regenerate or Wish.</td></tr>
                <tr><td>16-19</td><th>Frail</th><td>You recover, but your health is never quite the same again. You can barely keep food down, and lose 1 point from your Constitution score. Finally, if you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce the character's hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>20-23</td><th>Painful Joints</th><td>You heal, but are never again as sprightly. You lose 1 point from your Dexterity score. If you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce your hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>24-27</td><th>Enfeebled</th><td>You heal, but are never again as strong. You lose 1 point from your Strength score. If you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce your hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>28-31</td><th>Leg Wound</th><td>Your leg is badly damaged. Until a base recovery time of 40 days has passed (see Recovery above), you must use a cane or crutch to move at half speed, you fall prone after using the dash action, and you suffer disadvantage on Dexterity checks made to balance. Even after the worst of the damage has passed, your speed on foot is reduced by 5 feet. The limb can be restored by either Heal, Regenerate or Wish.</td></tr>
                <tr><td>32-36</td><th>Hand Injury</th><td>The attack costs you several fingers. There is a 50% chance of the affected hand being your dominant hand. You can just about carry a shield, but if it's a weapon hand, your weapon attacks suffer a -2 penalty, unless you are trained in either the Dual Wielder feat or the Two-Weapon Fighting Style. Also, if it is your dominant hand, if you attempt to cast a spell with somatic components, you must first succeed on a DC 11 Constitution saving throw or lose your action that turn – the spell slot, if any, is not lost. These penalties last a base recovery time of 40 days (see Recovery above). This flaw can be removed by magic such as Regenerate or Wish.</td></tr>
                <tr><td>37-40</td><th>Troubled Sleep</th><td>Unless you are immune to being frightened, you suffer the following flaw: though you more or less recover, your sleep or trance is ravaged by inescapable nightmares, and rarely affords much rest. You must succeed on a DC 11 Charisma or Wisdom saving throw (your choice) after every long rest, or only recover a quarter of your hit dice. If you beat the save DC by 10 or more, the flaw ends. It can also be removed by magic such as Dream, Greater Restoration, Remove Curse or Wish.</td></tr>
                <tr><td>41-45</td><th>Ruined Armor</th><td>Unless your armour is enchanted or made of adamantine, the attack leaves it badly damaged, affording little protection and fitting badly. You suffer -2 from your AC. This penalty lasts until it is replaced, repaired (costing half the the total cost of the item) or subject to a Mending spell. If you have no armour, treat this result as Minor Scar instead.</td></tr>
                <tr><td>46-52</td><th>Useless Shield</th><td>Unless your shield is enchanted or made of adamantine, the attack leaves it ruined and worthless. If you don't have a shield, treat this result as Ruined Armour instead.</td></tr>
                <tr><td>53-57</td><th>Infected Wounds</th><td>The damage refuses to properly heal, and instead becomes swollen and leaks a noisome pus. Your hit point maximum is reduced by 1 for every 24 hours the wound persists. If your hit point maximum drops to 0, you die. The wound heals if you receive the spell Heal Minor Injury or, alternatively, someone can tend to the wound and make a DC 14 Wisdom (Medicine) check once every 24 hours. After ten successes, the wound heals. Characters who are immune to disease treat this result as Minor Scar instead.</td></tr>
                <tr><td>58-61</td><th>Personality Change</th><td>In the aftermath of the attack, due to post-traumatic stress, you soon exhibit a shift in personality. Roll 1d100 and consult the Indefinite Madness table (on page 260 of the Dungeon Master's Guide) to see what permanent flaw you gain. This flaw can only be removed by magic such as Greater Restoration or Wish, or possibly by some kind of long-term therapy, at the Dungeon Master's discretion.</td></tr>
                <tr><td>62-65</td><th>Aaaaaaarghhhhh!</th><td>Unless you are immune to being frightened, you panic as the flames consume you, slamming bodily into a creature that interrupts your maddened flight. You immediately move up to half your speed (rounded up) towards a random creature and attempt a shove (either to knock prone or push, your choice); this movement can result in opportunity attacks. If the shove succeeds, you also inflict 1d6 fire damage. Following this attack, you then fall unconscious, and begin making death saving throws as usual.</td></tr>
                <tr><td>66-70</td><th>Fixation</th><td>Following recovery, you develop an unhealthy fixation. Roll 1d6: on a 1-3, you nurture a bitter enmity; on a 4-6, you develop an overpowering phobia. If you are immune to being frightened, then this result is bitter enmity. You should work with the Dungeon Master on the phrasing of the new flaw: your hatred or phobia may focus on some element of the attacker's identity (for example, a mindless hatred towards dragons or sorcerers) or even the type of attack (such as a fear of fire). This flaw can be removed by magic such as Greater Restoration or Wish.</td></tr>
                <tr><td>71-76</td><th>Horrible Scar</th><td>If you wear a helmet, you must make a DC 14 Dexterity saving throw – if you fail (or have no helmet), you are disfigured to the extent that the wound can't be easily concealed, or palated. You have disadvantage on Charisma (Persuasion) checks and advantage on Charisma (Intimidation) checks. Magic like Heal, Regenerate or Wish can remove the scar.</td></tr>
                <tr><td>77-96</td><th>Minor Scar</th><td>The scar doesn't have any adverse effect, but may make you more memorable and badass! Magic such as Heal, Regenerate or Wish can remove the scar.</td></tr>
                <tr><td>97-98</td><th>Fire Touched</th><td>By some freak coincidence, the intensity of the flame opens the briefest of rifts to the Plane of Elemental Fire and, you become permanently infused with the smallest fragment of energy from that plane. Your body radiates heat and, from now on, you reduce cold damage that you suffer by -3 per attack, and your own unarmed attacks inflict an additional 1 point of magical fire damage. Additionally, once per long rest, upon striking a foe within 10 feet, you can choose to channel an additional 2d6 magical fire damage against the target. This costs no action, but if a nonmagical wooden weapon is used to channel this flame, it is destroyed. This flaw can only be removed by magic such as Remove Curse or Wish.</td></tr>
                <tr><td>99+</td><th>I'm... I'm Alright!</th><td>The gods must be smiling today – the blow seemed worse than it actually is, and you are assumed dead. Rather than making any death saving throws, you are instead stabilised and returned to 1 hit point and, at the beginning of your next turn, regain 1d10 hit points and can act as normal, gaining advantage on your first attack that turn.</td></tr>
              </tbody>
            </table>
          </b-tab>
          <b-tab index='5' title="Force">
            <table class="table table-striped">
              <thead><tr><th>D100 Roll</th><th>Injury</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td>1</td><th>Hole in Time and Space.</th><td>Uh oh. The energy of the rogue magic contracts into a super-dense point at your heart and begins to drag all ambient magic inwards – seconds later, your remains crumple silently inward, and all that remains is an orb of impenetrable dark force – a sphere of annihilation! You die instantly and your remains and equipment are destroyed (with the possible exception of any artifact in your possession) and, at the beginning of what would be your next turn, a sphere of annihilation occupies your former space. You can now only be brought back by a Wish.</td></tr>
                <tr><td>2</td><th>Instant Death.</th><td>Your skull is crushed, or you suffer massive internal injuries, killing you instantly.</td></tr>
                <tr><td>3</td><th>Fatal Wound</th><td>Either your back is broken, or your internal organs are ruptured. Even if you succeed at the normal death saving throws, you remain unconscious and will die after 1d6 turns have passed, at the end of your turn, unless you are magically healed above 0 hit points, or stabilised with a DC 17 Wisdom (Medicine) check using a healer's kit.</td></tr>
                <tr><td>4</td><th>Paralysis</th><td>Spinal damage leaves you unable to move or feel anything from the waist down. You will need carrying or some sort of device to allow mobility (otherwise you can only crawl 5 feet per turn), and count as restrained. Still, there is always hope for a particularly strong person: at the beginning of every week, you can make a DC 20 Constitution saving throw – on a success, you miraculously recover. Otherwise, this flaw only ends if you receive magic such as Greater Restoration, Heal, Regenerate or Wish.</td></tr>
                <tr><td>5</td><th>Shattered Arm</th><td>Your arm or hand is smashed beyond recovery, and will require amputation. Following recovery, you can no longer hold anything with two hands, and can hold only a single object at a time. The distraction of the pain means that if you attempt to cast any spell you must first succeed on a DC 11 Constitution saving throw or lose your action that turn – the spell slot, if any, is not lost. Finally, if the lost arm was your dominant arm (50% chance), unless you are trained in the Dual Wielder feat or the Two-Weapon Fighting Style, you suffer disadvantage with weapon attacks until you learn to use your off-hand. You learn to live with this pain and train your off-hand after a base recovery time of 40 days (see Recovery above). The limb can be restored by either Regenerate or Wish.</td></tr>
                <tr><td>6</td><th>Shattered Leg</th><td>Your leg or foot is smashed beyond recovery, and will require amputation. Following recovery, your speed on foot is halved and you must use a cane or crutch to move, unless you receive a prosthesis of some kind. Additionally, you fall prone after using the dash action, and suffer disadvantage on Dexterity checks made to balance. Finally, the distraction of the pain means that if you attempt to cast any spell you must first succeed on a DC 11 Constitution saving throw or lose your action that turn – the spell slot, if any, is not lost. You learn to live with this pain after a base recovery time of 40 days (see Recovery above). The limb can be restored by either Regenerate or Wish.</td></tr>
                <tr><td>7-11</td><th>Multiple Injuries</th><td>Roll again on this table 1d3+1 times, suffering the combined effects of the various results (within reason!). Reroll any duplicates, and also reroll Multiple Injuries, Minor Scar, Full Recovery, "I'm... I'm Alright!" and any results which indicate death (like Fatal Wound, Instant Death or worse).</td></tr>
                <tr><td>12-15</td><th>Internal Bleeding.</th><td>The attack leaves you with hidden damage, drawing you towards death. You lose 1d3 hit points at the end of every hour, even if stabilised. This injury is difficult to spot, but once diagnosed, This flaw can be removed by magic such as Heal, Regenerate or Wish, or if another character proficient in Medicine conducts surgery: this takes 1 hour, expends one use of a healer's kit and requires a successful DC 17 Wisdom (Medicine) check. The surgery itself inflicts 3d6 piercing damage.</td></tr>
                <tr><td>16-19</td><th>Frail</th><td>You recover, but your health is never quite the same again. You can barely keep food down, and lose 1 point from your Constitution score. Finally, if you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce the character's hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>20-23</td><th>Painful Joints</th><td>You heal, but are never again as sprightly. You lose 1 point from your Dexterity score. If you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce your hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>24-29</td><th>Enfeebled</th><td>You heal, but are never again as strong. You lose 1 point from your Strength score. If you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce your hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>30-33</td><th>Head Injury</th><td>If you wear a helmet, you must make a DC 11 Constitution saving throw – if you fail (or have no helmet), ten head trauma damages your mental facilities somehow, often leaving a bald patch at the scar. Roll 1d3: 1: you lose 1 point from your Intelligence score; 2: you lose 1 point from your Wisdom score; 3: you lose 1 point from your Charisma score. This flaw is often accompanied by speech or memory problems, requiring you to relearn basic skills and social niceties. If the same ability score is affected a second time or more in the future by this flaw, you must succeed at a DC 14 Constitution saving throw or also suffer the Coma flaw. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>34-38</td><th>Broken Arm</th><td>As the attack slams home, an audible 'crack' renders an arm close to useless for a time. There is a 50% chance that the broken arm is your dominant arm and if so, unless you are trained in the Dual Wielder feat or the Two-Weapon Fighting Style, you suffer disadvantage with weapon attacks. If it is your other arm, you cannot wear a shield. This flaw ends after a base recovery time of 30 weeks (see Recovery above), or if you receive magic such as Greater Restoration, Heal, Regenerate or Wish.</td></tr>
                <tr><td>39-43</td><th>Deafened</th><td>If you wear a helmet, you must make a DC 14 Constitution saving throw – if you fail (or have no helmet), then either through brain damage or damage to the ears, the attack leaves you deafened. This flaw is removed if you receive magic such as Greater Restoration, Heal, Heal Minor Injury, Regenerate or Wish.</td></tr>
                <tr><td>44-47</td><th>Leg Wound</th><td>Your leg is badly damaged. Until a base recovery time of 40 days has passed (see Recovery above), you must use a cane or crutch to move at half speed, you fall prone after using the dash action, and you suffer disadvantage on Dexterity checks made to balance. Even after the worst of the damage has passed, your speed on foot is reduced by 5 feet. The limb can be restored by either Heal, Regenerate or Wish.</td></tr>
                <tr><td>48-52</td><th>Broken Ribs</th><td>Your rib cage is partly caved in. Whenever you attempt a Strength (Athletics) check or attempt to take any action in combat (other than casting a spell), you must succeed at a DC 11 Constitution saving throw. If you fail the save, you lose your action and can't use reactions until the start of your next turn. This flaw ends after a base recovery time of 50 days (see Recovery above), or if you receive magic such as Heal, Regenerate or Wish.</td></tr>
                <tr><td>53-57</td><th>Punch Drunk</th><td>If you wear a helmet, you must make a DC 11 Constitution saving throw – if you fail (or have no helmet), then due to hearing impairment or brain trauma, your coordination is often disrupted. After every short or long rest, you must succeed at a DC 11 Constitution or Wisdom saving throw (your choice), or suffer disadvantage on Dexterity (Acrobatics) checks. This penalty lasts until the next short or long rest. Additionally, if you are knocked prone, it costs you double the standard movement to stand up. This flaw can be removed through magic such as Greater Restoration, Heal, Heal Minor Injury, Regenerate or Wish.</td></tr>
                <tr><td>58-62</td><th>Shell-Shock</th><td>Either due to brain damage or a lifetime of facing horrors and death, you are somewhat indecisive and slow to react. You suffer a penalty of -2 to your Initiative. This flaw can be removed through magic such as Greater Restoration or Wish.</td></tr>
                <tr><td>63-66</td><th>Ruined Armor</th><td>Unless your armour is enchanted or made of adamantine, the attack leaves it badly damaged, affording little protection and fitting badly. You suffer -2 from your AC. This penalty lasts until it is replaced, repaired (costing half the the total cost of the item) or subject to a Mending spell. If you have no armour, treat this result as Minor Scar instead.</td></tr>
                <tr><td>67-68</td><th>Force Magnet</th><td>Somehow, the magic of the attack embeds itself into your being and begins to attract other force energy towards you. From now on, whenever magic missile is cast by any spellcaster (including you!) and you are within its range, an extra missile flies off and strikes you, for normal damage. This flaw can only be removed by magic such as Remove Curse or Wish.</td></tr>
                <tr><td>69-72</td><th>Personality Change</th><td>In the aftermath of the attack, either as a result of head injury or due to post-traumatic stress, you soon exhibit a shift in personality. Roll 1d100 and consult the Indefinite Madness table (on page 260 of the Dungeon Master's Guide) to see what permanent flaw you gain. This flaw can only be removed by magic such as Greater Restoration or Wish, or possibly by some kind of long-term therapy, at the Dungeon Master's discretion.</td></tr>
                <tr><td>73-76</td><th>Fastball Special</th><td>The force of the attack sends you haplessly flying through the air towards another unsuspecting creature. You are pushed up to 10 feet towards a random creature and, if in range to strike it, knock it prone, unless that other creature succeeds at a DC 11 Dexterity or Strength saving throw (creature's choice). This roll is made with disadvantage if you are bigger than the dodging creature. If you are huge or gargantuan, you are too heavy to be thrown, and this result has no effect.</td></tr>
                <tr><td>77-96</td><th>Full Recovery</th><td>You seem to be fine.</td></tr>
                <tr><td>97-98</td><th>One with the Magic</th><td>Although the spell takes effect as normal, the mystic energy refuses to ebb away but instead weaves around and into you. Following recovery, you soon learn a couple of ways of harnessing this magic for simple telekinetic effects. Once per long rest, you can cast either mage hand or shield. These function as the standard spell (including being cancelled by Antimagic Field, Counterspell, Dispel Magic and the like), but don't use up any spell slot. This flaw can only be removed by magic such as Remove Curse or Wish.</td></tr>
                <tr><td>99+</td><th>I'm... I'm Alright!</th><td>The gods must be smiling today – the blow seemed worse than it actually is, and you are assumed dead. Rather than making any death saving throws, you are instead stabilised and returned to 1 hit point and, at the beginning of your next turn, regain 1d10 hit points and can act as normal, gaining advantage on your first attack that turn.</td></tr>
              </tbody>
            </table>
          </b-tab>
          <b-tab index='6' title="Lightning">
            <table class="table table-striped">
              <thead><tr><th>D100 Roll</th><th>Injury</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td>1</td><th>Disintigrated.</th><td>The conflagration burns unnaturally hot, killing you instantly and leaving nothing but ash. You can now only be brought back by powerful magic like True Resurrection or Wish.</td></tr>
                <tr><td>2</td><th>Instant Death.</th><td>You suffer a massive overload of your nervous system, or your brain is shorted out, killing you instantly.</td></tr>
                <tr><td>3</td><th>Fatal Wound</th><td>You suffer massive burns, or internal burn damage to major organs. Even if you succeed at the normal death saving throws, you remain unconscious and will die after 1d6 turns have passed, at the end of your turn, unless you are magically healed above 0 hit points, or stabilised with a DC 17 Wisdom (Medicine) check using a healer's kit.</td></tr>
                <tr><td>4</td><th>Paralysis</th><td>Spinal damage leaves you unable to move or feel anything from the waist down. You will need carrying or some sort of device to allow mobility (otherwise you can only crawl 5 feet per turn), and count as restrained. Still, there is always hope for a particularly strong person: at the beginning of every week, you can make a DC 20 Constitution saving throw – on a success, you miraculously recover. Otherwise, this flaw only ends if you receive magic such as Greater Restoration, Heal, Regenerate or Wish.</td></tr>
                <tr><td>5</td><th>Incinerated Arm</th><td>Your arm or hand is almost entirely disintegrated. Due to system shock, you must make a death saving throw immediately, with disadvantage on the roll. Following recovery, you can no longer hold anything with two hands, and can hold only a single object at a time. The distraction of the pain means that if you attempt to cast any spell you must first succeed on a DC 11 Constitution saving throw or lose your action that turn – the spell slot, if any, is not lost. Finally, if the lost arm was your dominant arm (50% chance), unless you are trained in the Dual Wielder feat or the Two-Weapon Fighting Style, you suffer disadvantage with weapon attacks until you learn to use your off-hand. You learn to live with this pain and train your off-hand after a base recovery time of 40 days (see Recovery above). The limb can be restored by either Regenerate or Wish.</td></tr>
                <tr><td>6</td><th>Incinerated Leg</th><td>Your leg or foot is almost entirely disintegrated. Due to system shock, you must make a death saving throw immediately, with disadvantage on the roll. Following recovery, your speed on foot is halved and you must use a cane or crutch to move, unless you receive a prosthesis of some kind. Additionally, you fall prone after using the dash action, and suffer disadvantage on Dexterity checks made to balance. Finally, the distraction of the pain means that if you attempt to cast any spell you must first succeed on a DC 11 Constitution saving throw or lose your action that turn – the spell slot, if any, is not lost. You learn to live with this pain after a base recovery time of 40 days (see Recovery above). The limb can be restored by either Regenerate or Wish.</td></tr>
                <tr><td>7-11</td><th>Multiple Injuries</th><td>Roll again on this table 1d3+1 times, suffering the combined effects of the various results (within reason!). Reroll any duplicates, and also reroll Multiple Injuries, Minor Scar, Full Recovery, "I'm... I'm Alright!" and any results which indicate death (like Fatal Wound, Instant Death or worse).</td></tr>
                <tr><td>12-15</td><th>Lung Trauma</th><td>Your lungs are scorched or withered, placing you dangerously close to death. While this flaw remains, you can only stabilise naturally after five death saving throws, rather than three. Following recovery, even routine activity leaves you breathless, and you are wracked with coughing fits when the air is thin or smoky. For every four hours spent walking (or eight hours riding), and when reduced to half your maximum hit points or less, you must succeed at a DC 11 Constitution saving throw or suffer one level of exhaustion. Exhaustion levels gained from this flaw are lost during a short or long rest, or can be removed by a character equipped with a herbalism kit with which they are proficient. Finally, this flaw ends if you succeed at a DC 17 Constitution saving throw rolled at the beginning of every month, or if removed by Greater Restoration, Heal, Regenerate or Wish.</td></tr>
                <tr><td>16-19</td><th>Frail</th><td>You recover, but your health is never quite the same again. You can barely keep food down, and lose 1 point from your Constitution score. Finally, if you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce the character's hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>20-23</td><th>Painful Joints</th><td>You heal, but are never again as sprightly. You lose 1 point from your Dexterity score. If you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce your hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>24-26</td><th>Enfeebled</th><td>You heal, but are never again as strong. You lose 1 point from your Strength score. If you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce your hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>27-30</td><th>Brain Damage</th><td>The attack damages your mental facilities somehow. Roll 1d3: 1: you lose 1 point from your Intelligence score; 2: you lose 1 point from your Wisdom score; 3: you lose 1 point from your Charisma score. This flaw is often accompanied by speech or memory problems, requiring you to relearn basic skills and social niceties. If the same ability score is affected a second time or more in the future by this flaw, you must succeed at a DC 14 Constitution saving throw or also suffer the Coma flaw. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>31-35</td><th>Blasted Eye</th><td>One of your eyes is destroyed by the burst of electricity. From now on, you suffer disadvantage on Wisdom (Perception) checks that rely on sight, and on ranged attack rolls. If a subsequent injury damages your other eye, you are permanently blinded. Magic such as Regenerate or Wish can restore the lost eye.</td></tr>
                <tr><td>36-40</td><th>Deafened</th><td>If you wear a helmet, you must make a DC 14 Constitution saving throw – if you fail (or have no helmet), then either through brain damage or damage to the ears, the attack leaves you deafened. This flaw is removed if you receive magic such as Greater Restoration, Heal, Heal Minor Injury, Regenerate or Wish.</td></tr>
                <tr><td>41-45</td><th>Pelvic Injury</th><td>Either your pelvis is struck a crippling blow, or the attack destroys your nethers. Whenever yo attempt a Strength (Athletics) check or take any action in combat (other than casting a spell), you must succeed at a DC 11 Constitution saving throw or lose 1d6 hit points. You also can't ride a horse without suffering 1d10 hit points. Finally, this injury renders you permanently infertile. This flaw ends after a base recovery time of 70 days (see Recovery above), or if you receive magic such as Heal, Regenerate or Wish, although the infertility can only be reversed by Greater Restoration or Remove Curse.</td></tr>
                <tr><td>46-51</td><th>Punch Drunk</th><td>If you wear a helmet, you must make a DC 11 Constitution saving throw – if you fail (or have no helmet), then due to hearing impairment or brain trauma, your coordination is often disrupted. After every short or long rest, you must succeed at a DC 11 Constitution or Wisdom saving throw (your choice), or suffer disadvantage on Dexterity (Acrobatics) checks. This penalty lasts until the next short or long rest. Additionally, if you are knocked prone, it costs you double the standard movement to stand up. This flaw can be removed through magic such as Greater Restoration, Heal, Heal Minor Injury, Regenerate or Wish.</td></tr>
                <tr><td>52-57</td><th>Shell-Shock</th><td>Either due to brain damage or a lifetime of facing horrors and death, you are somewhat indecisive and slow to react. You suffer a penalty of -2 to your Initiative. This flaw can be removed through magic such as Greater Restoration or Wish.</td></tr>
                <tr><td>58-63</td><th>Ruined Armor</th><td>Unless your armour is enchanted or made of adamantine, the attack leaves it badly damaged, affording little protection and fitting badly. You suffer -2 from your AC. This penalty lasts until it is replaced, repaired (costing half the the total cost of the item) or subject to a Mending spell. If you have no armour, treat this result as Minor Scar instead.</td></tr>
                <tr><td>64-67</td><th>Chain Discharge</th><td>The electricity crackles over you for a moment and then, as you silently collapse, arcs out towards others nearby. All other creatures within 10-foot range of you must succeed on a DC 11 Dexterity saving throw or suffer 2d6 lightning damage.</td></tr>
                <tr><td>69-72</td><th>Fixation</th><td>Following recovery, you develop an unhealthy fixation. Roll 1d6: on a 1-3, you nurture a bitter enmity; on a 4-6, you develop an overpowering phobia. If you are immune to being frightened, then this result is bitter enmity. You should work with the Dungeon Master on the phrasing of the new flaw: your hatred or phobia may focus on some element of the attacker's identity (for example, a mindless hatred towards dragons or sorcerers) or even the type of attack (such as a fear of storms). This flaw can be removed by magic such as Greater Restoration or Wish.</td></tr>
                <tr><td>73-76</td><th>Hideous Scar</th><td>You are scorched to the extent that the wound can't be easily concealed, or palated. You have disadvantage on Charisma (Persuasion) checks and advantage on Charisma (Intimidation) checks. Magic such as Heal, Regenerate or Wish can remove the scar.</td></tr>
                <tr><td>77-96</td><th>Minor Scar</th><td>The scar doesn't have any adverse effect, but may make you more memorable and badass! Magic such as Heal, Regenerate or Wish can remove the scar.</td></tr>
                <tr><td>97-98</td><th>Storm Blood</th><td>By some freak coincidence, the intensity of the electricity opens the briefest of rifts to the Plane of Elemental Air and you become permanently infused with the smallest fragment of energy from that plane. Your body flickers with static, and from now on anyone who hits you in melee must succeed at a DC 14 Dexterity saving throw or suffer 1d6 magical lightning damage, and your unarmed attacks inflict an additional 1 point of magical lightning damage. This costs no action. This flaw can only be removed by magic such as Remove Curse or Wish.</td></tr>
                <tr><td>99+</td><th>I'm... I'm Alright!</th><td>The gods must be smiling today – the blow seemed worse than it actually is, and you are assumed dead. Rather than making any death saving throws, you are instead stabilised and returned to 1 hit point and, at the beginning of your next turn, regain 1d10 hit points and can act as normal, gaining advantage on your first attack that turn.</td></tr>
              </tbody>
            </table>
          </b-tab>
          <b-tab index='7' title="Necrotic">
            <table class="table table-striped">
              <thead><tr><th>D100 Roll</th><th>Injury</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td>1</td><th>Hole in Time and Space.</th><td>Uh oh. The energy of the rogue magic contracts into a super-dense point at your heart and begins to drags all ambient magic inwards – seconds later, your remains crumple silently inward, and all that remains is an orb of impenetrable dark force – a sphere of annihilation! You die instantly and your remains and equipment are destroyed (with the possible exception of any artifact in your possession) and, at the beginning of what would be your next turn, a sphere of annihilation occupies your former space. You can now only be brought back by a Wish.</td></tr>
                <tr><td>2</td><th>Restless Death</th><td>Your life is snuffed out, and you don't even get the relief of the afterlife. You die instantly, and at the beginning of what would be your next turn (if you have not been magically revived somehow), a spectre rises in your space. You can now only be brought back by powerful magic like Reincarnate, True Resurrection or Wish.</td></tr>
                <tr><td>3</td><th>Instant Death</th><td>The dark energy withers you utterly, leaving only a mummified husk – you are killed instantly.</td></tr>
                <tr><td>4</td><th>Fatal Wound</th><td>Either you suffer massive tissue damage, or major organs are part eaten away. Even if you succeed at the normal death saving throws, you remain unconscious and will die after 1d6 turns have passed, at the end of your turn, unless you are magically healed above 0 hit points, or stabilised with a DC 17 Wisdom (Medicine) check using a healer's kit.</td></tr>
                <tr><td>5</td><th>Coma</th><td>You enter a death-like sleep from which nothing can seemingly awaken you, though dim life signs still remain. You remain unconscious, even after being stabilised. Following a long rest, make a death saving throw. Three failed saves result in death (possibly due to lack of fluids, amongst other complications), but a result of 15 or means the coma ends. If and when you awaken, you suffer three levels of exhaustion (these exhaustion levels can be removed normally). The coma can also be ended prematurely by magic such as Dream, Greater Restoration, Remove Curse or Wish.</td></tr>
                <tr><td>6</td><th>Shrivelled Arm</th><td>Your arm or hand is withered beyond recovery, and will require amputation. Following recovery, you can no longer hold anything with two hands, and can hold only a single object at a time. The distraction of the pain means that if you attempt to cast any spell you must first succeed on a DC 11 Constitution saving throw or lose your action that turn – the spell slot, if any, is not lost. Finally, if the lost arm was your dominant arm (50% chance), unless you are trained in the Dual Wielder feat or the Two-Weapon Fighting Style, you suffer disadvantage with weapon attacks until you learn to use your off-hand. You learn to live with this pain and train your off-hand after a base recovery time of 40 days (see Recovery above). The limb can be restored by either Regenerate or Wish.</td></tr>
                <tr><td>7</td><th>Shrivelled Leg</th><td>Your leg or foot is withered beyond recovery, and will require amputation. Following recovery, your speed on foot is halved and you must use a cane or crutch to move, unless you receive a prosthesis of some kind. Additionally, you fall prone after using the dash action, and suffer disadvantage on Dexterity checks made to balance. Finally, the distraction of the pain means that if you attempt to cast any spell you must first succeed on a DC 11 Constitution saving throw or lose your action that turn – the spell slot, if any, is not lost. You learn to live with this pain after a base recovery time of 40 days (see Recovery above). The limb can be restored by either Regenerate or Wish.</td></tr>
                <tr><td>8-11</td><th>Multiple Injuries</th><td>Roll again on this table 1d3+1 times, suffering the combined effects of the various results (within reason!). Reroll any duplicates, and also reroll Multiple Injuries, Minor Scar, Full Recovery, "I'm... I'm Alright!" and any results which indicate death (like Fatal Wound, Instant Death or worse).</td></tr>
                <tr><td>12-15</td><th>Lung Trauma</th><td>Your lungs are scorched or withered, placing you dangerously close to death. While this flaw remains, you can only stabilise naturally after five death saving throws, rather than three. Following recovery, even routine activity leaves you breathless, and you are wracked with coughing fits when the air is thin or smoky. For every four hours spent walking (or eight hours riding), and when reduced to half your maximum hit points or less, you must succeed at a DC 11 Constitution saving throw or suffer one level of exhaustion. Exhaustion levels gained from this flaw are lost during a short or long rest, or can be removed by a character equipped with a herbalism kit with which they are proficient. Finally, this flaw ends if you succeed at a DC 17 Constitution saving throw rolled at the beginning of every month, or if removed by Greater Restoration, Heal, Regenerate or Wish.</td></tr>
                <tr><td>16-19</td><th>Frail</th><td>You recover, but your health is never quite the same again. You can barely keep food down, and lose 1 point from your Constitution score. Finally, if you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce the character's hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>20-23</td><th>Painful Joints</th><td>You heal, but are never again as sprightly. You lose 1 point from your Dexterity score. If you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce your hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>24-27</td><th>Enfeebled</th><td>You heal, but are never again as strong. You lose 1 point from your Strength score. If you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce your hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>28-31</td><th>Ruined Eye</th><td>If you wear a helmet, you must make a DC 17 Dexterity saving throw – if you fail (or have no helmet), one of your eyes is destroyed. From now on, you suffer disadvantage on Wisdom (Perception) checks that rely on sight, and on ranged attack rolls. If a subsequent injury damages your other eye, you are permanently blinded. Magic such as Regenerate or Wish can restore the lost eye.</td></tr>
                <tr><td>32-36</td><th>Pelvic Injury</th><td>Either your pelvis is struck a crippling blow, or the attack destroys your nethers. Whenever you attempt a Strength (Athletics) check or take any action in combat (other than casting a spell), you must succeed at a DC 11 Constitution saving throw or lose 1d6 hit points. You also can't ride a horse without suffering 1d10 hit points. Finally, this injury renders you permanently infertile. This flaw ends after a base recovery time of 70 days (see Recovery above), or if you receive magic such as Heal, Regenerate or Wish, although the infertility can only be removed by Greater Restoration or Remove Curse.</td></tr>
                <tr><td>37-40</td><th>Agonizing Wound</th><td>The injury plagues you with flashes of searing pain from time to time. Whenever you attempt a Strength (Athletics) check or attempt to take any action in combat (other than casting a spell), you must succeed at a DC 11 Constitution saving throw. If you fail the save, you lose your action and can't use reactions until the start of your next turn. This flaw ends after a base recovery time of 70 days (see Recovery above), and is also removed by magic such as Heal, Regenerate or Wish.</td></tr>
                <tr><td>41-46</td><th>Crippling Fatigue</th><td>You can never shake your sense of tiredness, and gain one level of exhaustion. This can be removed normally. However, following every long rest, you must succeed at a DC 11 Constitution or Wisdom saving throw (your choice), or gain a level of exhaustion. If you fail this saving throw by 5 or more, you gain two levels. Accumulating enough exhaustion levels can lead to your death. However, if you roll an unmodified 20, this flaw ends, and can also be removed by magic such as Greater Restoration or Wish.</td></tr>
                <tr><td>47-53</td><th>Stolen Life</th><td>Unless you are immune to magical ageing, you physically age by 1d6 years, and are rendered infertile. For every year you age, you suffer an additional 1d4 necrotic damage: this damage may lead to instant death. If this flaw is inflicted by a creature (or a spell cast by one), then that creature gains temporary hit points equal to the additional necrotic damage inflicted. The infertility can only be reversed by magic such as either Remove Curse or Wish.</td></tr>
                <tr><td>54-58</td><th>Troubled Sleep</th><td>Unless you are immune to being frightened, you suffer the following flaw: though you more or less recover, your sleep or trance is ravaged by inescapable nightmares, and rarely affords much rest. You must succeed on a DC 11 Charisma or Wisdom saving throw (your choice) after every long rest, or only recover a quarter of your hit dice. If you beat the save DC by 10 or more, the flaw ends. It can also be removed by magic such as Dream, Greater Restoration, Remove Curse or Wish.</td></tr>
                <tr><td>59-65</td><th>Infected Wounds</th><td>The damage refuses to properly heal, and instead becomes swollen and leaks a noisome pus. Your hit point maximum is reduced by 1 for every 24 hours the wound persists. If your hit point maximum drops to 0, you die. The wound heals if you receive the spell Heal Minor Injury or, alternatively, someone can tend to the wound and make a DC 14 Wisdom (Medicine) check once every 24 hours. After ten successes, the wound heals. Characters who are immune to disease treat this result as Minor Scar instead.</td></tr>
                <tr><td>66-69</td><th>Personality Change</th><td>In the aftermath of the attack, due to post-traumatic stress, you soon exhibit a shift in personality. Roll 1d100 and consult the Indefinite Madness table (on page 260 of the Dungeon Master's Guide) to see what permanent flaw you gain. This flaw can only be removed by magic such as Greater Restoration or Wish, or possibly by some kind of long-term therapy, at the Dungeon Master's discretion.</td></tr>
                <tr><td>70-73</td><th>Fixation</th><td>Following recovery, you develop an unhealthy fixation. Roll 1d6: on a 1-3, you nurture a bitter enmity; on a 4-6, you develop an overpowering phobia. If you are immune to being frightened, then this result is bitter enmity. You should work with the Dungeon Master on the phrasing of the new flaw: your hatred or phobia may focus on some element of the attacker's identity (for example, a mindless hatred towards undead or sorcerers) or even the type of attack (such as a fear of germs). This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>74-76</td><th>Horrible Scar</th><td>If you wear a helmet, you must make a DC 14 Dexterity saving throw – if you fail (or have no helmet), you are disfigured to the extent that the wound can't be easily concealed, or palated. You have disadvantage on Charisma (Persuasion) checks and advantage on Charisma (Intimidation) checks. Magic like Heal, Regenerate or Wish can remove the scar.</td></tr>
                <tr><td>77-96</td><th>Minor Scar</th><td>The scar doesn't have any adverse effect, but may make you more memorable and badass! Magic such as Heal, Regenerate or Wish can remove the scar.</td></tr>
                <tr><td>97-98</td><th>Dead One</th><td>The necrotic energy fails to overcome your will to live, but instead somehow alters you into a being not undead, but not entirely living either. Diminutive plants and beasts (with 1 hit point or less) die within 5 feet of you, and the condition of the sick, elderly and young in your presence worsen. People with whom you have regular contact begin to find you 'wrong' in some intangible way. You reduce necrotic damage that you suffer by -3 per attack. Additionally, most undead fail to perceive you as a living being, and unintelligent undead (such as zombies or skeletons) tend to ignore you, unless you take hostile action. This flaw can only be removed by magic such as Remove Curse or Wish.</td></tr>
                <tr><td>99+</td><th>I'm... I'm Alright!</th><td>The gods must be smiling today – the blow seemed worse than it actually is, and you are assumed dead. Rather than making any death saving throws, you are instead stabilised and returned to 1 hit point and, at the beginning of your next turn, regain 1d10 hit points and can act as normal, gaining advantage on your first attack that turn.</td></tr>
              </tbody>
            </table>
          </b-tab>
          <b-tab index="8" title="Piercing">
            <table class="table table-striped">
              <thead><tr><th>D100 Roll</th><th>Injury</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td>1</td><th>Instant Death</th><td>You are pierced through the heart, or suffer some other grievous wound which kills you instantly.</td></tr>
                <tr><td>2</td><th>Fatal Wound</th><td>You are are gutted, or stabbed through the lung or throat. Even if you succeed at the normal death saving throws, you remain unconscious and will die after 1d6 turns have passed, at the end of your turn, unless you are magically healed above 0 hit points, or stabilised with a DC 17 Wisdom (Medicine) check using a healer's kit.</td></tr>
                <tr><td>3</td><th>Severed Arm</th><td>Your arm or hand is hacked off, pumping arterial blood everywhere. Due to the flow of blood, you lose 1d6 hit points at the end of each of your turns, unless you receive magical healing to seal the stump, it is cauterised by fire or radiant damage, or another character uses an action to apply a tourniquet. Due to system shock, you must make a death saving throw immediately, with disadvantage on the roll. Following recovery, you can no longer hold anything with two hands, and can hold only a single object at a time. The distraction of the pain means that if you attempt to cast any spell you must first succeed on a DC 11 Constitution saving throw or lose your action that turn – the spell slot, if any, is not lost. Finally, if the lost arm was your dominant arm (50% chance), unless you are trained in the Dual Wielder feat or the Two-Weapon Fighting Style, you suffer disadvantage with weapon attacks until you learn to use your off-hand. You learn to live with this pain and train your off-hand after a base recovery time of 40 days (see Recovery above). The limb can be restored by either Regenerate or Wish.</td></tr>
                <tr><td>4</td><th>Severed Leg</th><td>Your leg or foot is hacked off, pumping arterial blood everywhere. Due to the flow of blood, you lose 1d6 hit points at the end of each of your turns, unless you receive magical healing to seal the stump, it is cauterised by fire or radiant damage, or another character uses an action to apply a tourniquet. Due to system shock, you must make a death saving throw immediately, with disadvantage on the roll. Following recovery, your speed on foot is halved and you must use a cane or crutch to move, unless you receive a prosthesis of some kind. Additionally, you fall prone after using the dash action, and suffer disadvantage on Dexterity checks made to balance. Finally, the distraction of the pain means that if you attempt to cast any spell you must first succeed on a DC 11 Constitution saving throw or lose your action that turn – the spell slot, if any, is not lost. You learn to live with this pain after a base recovery time of 40 days (see Recovery above). The limb can be restored by either Regenerate or Wish.</td></tr>
                <tr><td>5-11</td><th>Multiple Injuries</th><td>Roll again on this table 1d3+1 times, suffering the combined effects of the various results (within reason!). Reroll any duplicates, and also reroll Multiple Injuries, Minor Scar, Full Recovery, "I'm... I'm Alright!" and any results which indicate death (like Fatal Wound or Instant Death).</td></tr>
                <tr><td>12-15</td><th>Punctured Lung</th><td>Your lungs are pierced and part collapsed, placing you dangerously close to death. While this flaw remains, you can only stabilise naturally after five death saving throws, rather than three. Following recovery, even routine activity leaves you breathless, and you are wracked with coughing fits when the air is thin or smoky. For every four hours spent walking (or eight hours riding), and when reduced to half your maximum hit points or less, you must succeed at a DC 11 Constitution saving throw or suffer one level of exhaustion. Exhaustion levels gained from this flaw are lost during a short or long rest, or can be removed by a character equipped with a herbalism kit with which they are proficient. Finally, this flaw ends if you succeed at a DC 17 Constitution saving throw rolled at the beginning of every month, or if removed by Greater Restoration, Heal, Regenerate or Wish.</td></tr>
                <tr><td>16-19</td><th>Internal Bleeding</th><td>The attack leaves you with hidden damage, drawing you towards death. You lose 1d3 hit points at the end of every hour, even if stabilised. This injury is difficult to spot, but once diagnosed, This flaw can be removed by magic such as Heal, Regenerate or Wish, or if another character proficient in Medicine conducts surgery: this takes 1 hour, expends one use of a healer's kit and requires a successful DC 17 Wisdom (Medicine) check. The surgery itself inflicts 3d6 piercing damage.</td></tr>
                <tr><td>20-23</td><th>Frail</th><td>You recover, but your health is never quite the same again. You can barely keep food down, and lose 1 point from your Constitution score. Finally, if you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce the character's hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>24-27</td><th>Painful Joints</th><td>You heal, but are never again as sprightly. You lose 1 point from your Dexterity score. If you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce your hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>28-31</td><th>Enfeebled</th><td>You heal, but are never again as strong. You lose 1 point from your Strength score. If you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce your hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>32-35</td><th>Gouged Eye</th><td>If you wear a helmet, you must make a DC 14 Dexterity saving throw – if you fail (or have no helmet), one of your eyes is pierced, either by the foe's weapon or the dent in your helm. From now on, you suffer disadvantage on Wisdom (Perception) checks that rely on sight, and on ranged attack rolls. If a subsequent injury damages your other eye, you are permanently blinded. Magic such as Regenerate or Wish can restore the lost eye.</td></tr>
                <tr><td>36-39</td><th>Pelvic Injury</th><td>Either your pelvis is struck a crippling blow, or the attack destroys your nethers. Whenever you attempt a Strength (Athletics) check or take any action in combat (other than casting a spell), you must succeed at a DC 11 Constitution saving throw or lose 1d6 hit points. You also can't ride a horse without suffering 1d10 hit points. Finally, this injury renders you permanently infertile. This flaw ends after a base recovery time of 70 days (see Recovery above), or if you receive magic such as Heal, Regenerate or Wish, although the infertility can only be reversed by Greater Restoration or Remove Curse.</td></tr>
                <tr><td>40-43</td><th>Agonizing Wound</th><td>The injury plagues you with flashes of searing pain from time to time. Whenever you attempt a Strength (Athletics) check or attempt to takes any action in combat (other than casting a spell), you must succeed at a DC 11 Constitution saving throw. If you fail the save, you lose your action and can't use reactions until the start of your next turn. This flaw ends after a base recovery time of 70 days (see Recovery above), and is also removed by magic such as Heal, Regenerate or Wish.</td></tr>
                <tr><td>44-47</td><th>Leg Wound</th><td>Your leg is badly damaged. Until a base recovery time of 40 days has passed (see Recovery above), you must use a cane or crutch to move at half speed, you fall prone after using the dash action, and you suffer disadvantage on Dexterity checks made to balance. Even after the worst of the damage has passed, your speed on foot is reduced by 5 feet. The limb can be restored by either Heal, Regenerate or Wish.</td></tr>
                <tr><td>48-51</td><th>Shell-Shock</th><td> Either due to brain damage or a lifetime of facing horrors and death, you are somewhat indecisive and slow to react. You suffer a penalty of -2 to your Initiative. This flaw can be removed through magic such as Greater Restoration or Wish.</td></tr>
                <tr><td>52-55</td><th>Hand Injury</th><td>The attack costs you several fingers. There is a 50% chance of the affected hand being your dominant hand. You can just about carry a shield, but if it's a weapon hand, your weapon attacks suffer a -2 penalty, unless you are trained in either the Dual Wielder feat or the Two-Weapon Fighting Style. Also, if it is your dominant hand, if you attempt to cast a spell with somatic components, you must first succeed on a DC 11 Constitution saving throw or lose your action that turn – the spell slot, if any, is not lost. These penalties last a base recovery time of 40 days (see Recovery above). This flaw can be removed by magic such as Regenerate or Wish.</td></tr>
                <tr><td>56-59</td><th>Bleeding Wound</th><td>Frustratingly, the latest injury is loathe to stop bleeding. When you roll for initiative at the start of combat, on the result of an odd number, the wound re-opens: they suffer 1 hit point at the end of each of your turns, unless a character uses an action to bind the wound. This flaw ends if you receive magical healing, or if you succeed at a DC 17 Constitution saving throw after a long rest: if they fail this save the first time, they gain a +5 bonus in future.</td></tr>
                <tr><td>60-63</td><th>Ruined Armor</th><td>Unless your armour is enchanted or made of adamantine, the attack leaves it badly damaged, affording little protection and fitting badly. You suffer -2 from your AC. This penalty lasts until it is replaced, repaired (costing half the the total cost of the item) or subject to a Mending spell. If you have no armour, treat this result as Minor Scar instead.</td></tr>
                <tr><td>64-67</td><th>Old Battle Wound</th><td>You more or less recover, but become plagued for years with recurring pains. After every long rest, you must succeed at a DC 11 Constitution saving throw or suffer -2 to your Dexterity and Wisdom scores until the next long rest. This penalty can be neutralised by special salves, prepared by a character proficient in Medicine or using a herbalism kit with which they are proficient. This flaw can be removed through magic such as Greater Restoration, Heal, Regenerate or Wish.</td></tr>
                <tr><td>68-70</td><th>Infected Wound</th><td>The damage refuses to properly heal, and instead becomes swollen and leaks a noisome pus. Your hit point maximum is reduced by 1 for every 24 hours the wound persists. If your hit point maximum drops to 0, you die. The wound heals if you receive the spell Heal Minor Injury or, alternatively, someone can tend to the wound and make a DC 14 Wisdom (Medicine) check once every 24 hours. After ten successes, the wound heals. Characters who are immune to disease treat this result as Minor Scar instead.</td></tr>
                <tr><td>71-73</td><th>Shish Kebab</th><td>The attacker impales you, and the force of the blow drives the protruding tip towards another creature, too. Another creature of the attacker's choice within 5 feet (or within 10 feet, if the attacker is huge or gargantuan) is also targeted, and the attacker makes another attack roll for free. This second target does not need to be within normal attacking range for the attacker, but they will gain the benefit of cover from the impaled character! If you are huge or gargantuan, you are too heavy to be moved, and this result has no effect.</td></tr>
                <tr><td>74-76</td><th>Horrible Scar</th><td>If you wear a helmet, you must make a DC 14 Dexterity saving throw – if you fail (or have no helmet), you are disfigured to the extent that the wound can't be easily concealed, or palated. You have disadvantage on Charisma (Persuasion) checks and advantage on Charisma (Intimidation) checks. Magic like Heal, Regenerate or Wish can remove the scar.</td></tr>
                <tr><td>77-96</td><th>Minor Scar</th><td>The scar doesn't have any adverse effect, but may make you more memorable and badass! Magic such as Heal, Regenerate or Wish can remove the scar.</td></tr>
                <tr><td>97-98</td><th>Snagged Weapon</th><td>As the attacker's attack strikes home, the weight and direction of your fall drags the weapon from their hand, and it is buried too deep to pull out with ease. The attacker is disarmed until they spend an action retrieving their weapon. If the weapon is a natural melee weapon (like claws or teeth) the unfortunate creature is restrained until it uses an action to free itself.</td></tr>
                <tr><td>99+</td><th>I'm... I'm Alright!</th><td>The gods must be smiling today – the blow seemed worse than it actually is, and you are assumed dead. Rather than making any death saving throws, you are instead stabilised and returned to 1 hit point and, at the beginning of your next turn, regain 1d10 hit points and can act as normal, gaining advantage on your first attack that turn.</td></tr>
              </tbody>
            </table>
          </b-tab>
          <b-tab index="9" title="Poison">
            <table class="table table-striped">
              <thead><tr><th>D100 Roll</th><th>Injury</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td>1</td><th>Instant Death</th><td>The toxin sweeps through your system, stopping the heart cold, and killing you instantly.</td></tr>
                <tr><td>2</td><th>Fatal Poisoning</th><td>The venom burns through your system, systematically ruining one organ after another. Even if you succeed at the normal death saving throws, you remain unconscious and will die after 1d6 turns have passed, at the end of your turn, unless you are magically healed above 0 hit points and the poison is neutralised.</td></tr>
                <tr><td>3</td><th>Coma</th><td>You enter a death-like sleep from which nothing can seemingly awaken you, though dim life signs still remain. You remain unconscious, even after being stabilised. Following a long rest, make a death saving throw. Three failed saves result in death (possibly due to lack of fluids, amongst other complications), but a result of 15 or means the coma ends. If and when you awaken, you suffer three levels of exhaustion (these exhaustion levels can be removed normally). The coma can also be ended prematurely by magic such as Dream, Greater Restoration, Remove Curse or Wish.</td></tr>
                <tr><td>4</td><th>Shrivelled Arm</th><td>Your arm or hand is withered beyond recovery, and will require amputation. Following recovery, you can no longer hold anything with two hands, and can hold only a single object at a time. The distraction of the pain means that if you attempt to cast any spell you must first succeed on a DC 11 Constitution saving throw or lose your action that turn – the spell slot, if any, is not lost. Finally, if the lost arm was your dominant arm (50% chance), unless you are trained in the Dual Wielder feat or the Two-Weapon Fighting Style, you suffer disadvantage with weapon attacks until you learn to use your off-hand. You learn to live with this pain and train your off-hand after a base recovery time of 40 days (see Recovery above). The limb can be restored by either Regenerate or Wish.</td></tr>
                <tr><td>5</td><th>Shrivelled Leg</th><td>Your leg or foot is withered beyond recovery, and will require amputation. Following recovery, your speed on foot is halved and you must use a cane or crutch to move, unless you receive a prosthesis of some kind. Additionally, you fall prone after using the dash action, and suffer disadvantage on Dexterity checks made to balance. Finally, the distraction of the pain means that if you attempt to cast any spell you must first succeed on a DC 11 Constitution saving throw or lose your action that turn – the spell slot, if any, is not lost. You learn to live with this pain after a base recovery time of 40 days (see Recovery above). The limb can be restored by either Regenerate or Wish.</td></tr>
                <tr><td>6-7</td><th>Anaphylactic Shock</th><td>Your body reacts dramatically to the venom. Following recovery, you suffer disadvantage on saves against the effects of this specific venom. If you do become affected by this venom, as well as any other effects, you must succeed at a DC 14 Constitution saving throw or be immediately reduced to 0 hit points, and will die after 1d6 turns have passed, at the end of your turn, unless the poison is neutralised, or you are stabilised by another character succeeding at a DC 14 Wisdom (Medicine) check. This result overrides any existing resistance you may have to that venom.</td></tr>
                <tr><td>8-11</td><th>Multiple Injuries</th><td>Roll again on this table 1d3+1 times, suffering the combined effects of the various results (within reason!). Reroll any duplicates, and also reroll Multiple Injuries, Minor Scar, Full Recovery, "I'm... I'm Alright!" and any results which indicate death (like Fatal Poisoning or Instant Death).</td></tr>
                <tr><td>12-15</td><th>Destroyed Eyes</th><td>The virulent toxin destroys your eyes. From now on, you are permanently blinded, unless you are cured by magic such Greater Restoration, Heal, Regenerate or Wish. Perhaps you'll learn to adapt?</td></tr>
                <tr><td>16-19</td><th>Lung Trauma</th><td> Your lungs are scorched or withered, placing you dangerously close to death. Until you are stabilised, you must make two death saving throws a turn. Following recovery, even routine activity leaves you breathless, and you are wracked with coughing fits when the air is thin or smoky. For every four hours spent walking (or eight hours riding), and when reduced to half your maximum hit points or less, you must succeed at a DC 11 Constitution saving throw or suffer one level of exhaustion. Exhaustion levels gained from this flaw are lost during a short or long rest, or can be removed by a character equipped with a herbalism kit with which they are proficient. Finally, this flaw ends if you succeed at a DC 17 Constitution saving throw rolled at the beginning of every month, or if removed by magic such as Greater Restoration, Heal, Regenerate or Wish.</td></tr>
                <tr><td>20-25</td><th>Frail</th><td>You recover, but your health is never quite the same again. You can barely keep food down, and lose 1 point from your Constitution score. Finally, if you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce the character's hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>26-31</td><th>Painful Joints</th><td>You heal, but are never again as sprightly. You lose 1 point from your Dexterity score. If you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce your hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>32-37</td><th>Enfeebled</th><td>You heal, but are never again as strong. You lose 1 point from your Strength score. If you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce your hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>38-42</td><th>Impaired Mind</th><td>Unless you are immune to poison, the venom permanently damages your mental facilities somehow. Roll 1d3: 1: you lose 1 point from your Intelligence score; 2: you lose 1 point from your Wisdom score; 3: you lose 1 point from your Charisma score. This flaw is often accompanied by speech or memory problems, requiring you to relearn basic skills and social niceties. If the same ability score is affected a second time or more in the future by this flaw, you must succeed at a DC 14 Constitution saving throw or also suffer the Coma flaw. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>43-49</td><th>Pelvic Injury</th><td>Either your pelvis is struck a crippling blow, or the attack destroys your nethers. Whenever you attempt a Strength (Athletics) check or take any action in combat (other than casting a spell), you must succeed at a DC 11 Constitution saving throw or lose 1d6 hit points. You also can't ride a horse without suffering 1d10 hit points. Finally, this injury renders you permanently infertile. This flaw ends after a base recovery time of 70 days (see Recovery above), or if you receive magic such as Heal, Regenerate or Wish, although the infertility can only be reversed by Greater Restoration or Remove Curse.</td></tr>
                <tr><td>50-54</td><th>Leg Wound</th><td>Your leg is badly damaged. Until a base recovery time of 40 days has passed (see Recovery above), you must use a cane or crutch to move at half speed, you fall prone after using the dash action, and you suffer disadvantage on Dexterity checks made to balance. Even after the worst of the damage has passed, your speed on foot is reduced by 5 feet. The limb can be restored by Heal, Regenerate or Wish.</td></tr>
                <tr><td>55-61</td><th>Liver Failure</th><td>The poison was almost too much you, and from now on you suffer vulnerability to all poison damage, and can no longer tolerate other toxins, such as alcohol. No more tavern crawls for you! This flaw overrides any existing resistance you may have to poison, and can only be removed by magic such as Greater Restoration, Heal, Regenerate or Wish.</td></tr>
                <tr><td>62-68</td><th>Crippling Fatigue</th><td>You can never shake your sense of tiredness, and gain one level of exhaustion. This can be removed normally. However, following every long rest, you must succeed at a DC 11 Constitution or Wisdom saving throw (your choice), or gain a level of exhaustion. If you fail this saving throw by 5 or more, you gain two levels. Accumulating enough exhaustion levels can lead to your death. However, if you roll an unmodified 20, this flaw ends, and can also be removed by magic such as Greater Restoration or Wish.</td></tr>
                <tr><td>69-72</td><th>Personality Change</th><td>In the aftermath of the attack, due to post-traumatic stress, you soon exhibit a shift in personality. Roll 1d100 and consult the Indefinite Madness table (on page 260 of the Dungeon Master's Guide) to see what permanent flaw you gain. This flaw can only be removed by Greater Restoration or Wish, or possibly by some kind of long-term therapy, at the Dungeon Master's discretion.</td></tr>
                <tr><td>73-76</td><th>Fixation</th><td>Following recovery, you develop an unhealthy fixation. Roll 1d6: on a 1-3, you nurture a bitter enmity; on a 4-6, you develop an overpowering phobia. If you are immune to being frightened, then this result is bitter enmity. You should work with the Dungeon Master on the phrasing of the new flaw: your hatred or phobia may focus on some element of the attacker's identity (for example, a mindless hatred towards spiders or sorcerers) or even the type of attack (such as a fear of wine). This flaw can be removed by magic such as Greater Restoration or Wish.</td></tr>
                <tr><td>77-96</td><th>Full Recovery</th><td>You seem to be fine.</td></tr>
                <tr><td>97-98</td><th>Mithraditic Resistance</th><td>Your body rapidly develops a resistance to the venom that borders on the miraculous! If you succeed at a DC 20 Constitution saving throw, you are completely immune to that venom. If you fail, you instead have resistance to poison damage of the specific venom you were injured by, gain advantage on saves against its effects, and the duration of its effects on you are halved. This result overrides any existing vulnerability they may have to that venom.</td></tr>
                <tr><td>99+</td><th>I'm... I'm Alright!</th><td>The gods must be smiling today – the blow seemed worse than it actually is, and you are assumed dead. Rather than making any death saving throws, you are instead stabilised and returned to 1 hit point and, at the beginning of your next turn, regain 1d10 hit points and can act as normal, gaining advantage on your first attack that turn.</td></tr>
              </tbody>
            </table>
          </b-tab>
          <b-tab index="10" title="Psychic">
            <table class="table table-striped">
              <thead><tr><th>D100 Roll</th><th>Injury</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td>1</td><th>Instant Death</th><td>Your brain explodes, killing you instantly.</td></tr>
                <tr><td>2</td><th>Shredded Psyche</th><td>You convulse with agony, and your shredded mind refuses to let normal bodily processes continue. Even if you succeed at the normal death saving throws, you remain unconscious and will die after 1d6 turns have passed, at the end of your turn, unless you are magically healed above 0 hit points.</td></tr>
                <tr><td>3</td><th>Coma</th><td>You enter a death-like sleep from which nothing can seemingly awaken you, though dim life signs still remain. You remain unconscious, even after being stabilised. Following a long rest, make a death saving throw. Three failed saves result in death (possibly due to lack of fluids, amongst other complications), but a result of 15 or means the coma ends. If and when you awaken, you suffer three levels of exhaustion (these exhaustion levels can be removed normally). The coma can also be ended prematurely by magic such as Dream, Greater Restoration, Remove Curse or Wish.</td></tr>
                <tr><td>4</td><th>Screaming Horror</th><td>Unless you are immune to being frightened, your mind is broken beyond redemption, and you spend your days alternating between empty-eyed stares and bouts of horrified screaming – death would be a kinder fate. You are almost entirely useless, though you can be persuaded to stumble along meekly when feeling more placid – however, there is a 50% chance (checked for after each short or long rest) that you will scream uncontrollably, unless drugged, knocked out or subject to a calm emotions spell. This flaw can only be removed by magic such as Greater Restoration or Wish.</td></tr>
                <tr><td>5-7</td><th>I Can't Move!</th><td>Brain trauma leaves you fully paralysed, at least for a short time. You can do little more than speak, but can still cast spells that don't require somatic components. However, as you can't feel much of your body, you gain advantage on any Constitution saving throw to maintain concentration on spells due to receiving damage. After every long rest, the character can make a DC 17 Constitution saving throw to end the paralysis. This flaw can also be removed by magic such as Freedom of Movement, Greater Restoration, Heal Minor Injury, Remove Curse or Wish.</td></tr>
                <tr><td>8-10</td><th>Horrors in the Dark</th><td>Your scrambled brain plays tricks on you, leaving your vision a deep blackness peopled by fleeting spirits and phantasms. You are temporarily blinded. This flaw ends when you receive magic such as Dream, Greater Restoration, Heal Minor Injury, Remove Curse or Wish, or you succeed on a DC 14 Intelligence saving throw, which you can make after every long rest.</td></tr>
                <tr><td>11-16</td><th>Brain Damage</th><td>The attack damages your mental facilities somehow. Roll 1d3: 1: you lose 1 point from your Intelligence score; 2: you lose 1 point from your Wisdom score; 3: you lose 1 point from your Charisma score. This flaw is often accompanied by speech or memory problems, requiring you to relearn basic skills and social niceties. If the same ability score is affected a second time or more in the future by this flaw, you must succeed at a DC 14 Constitution saving throw or also suffer the Coma flaw. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>17-21</td><th>Recurring Possession</th><td>Even if the attacker is eventually destroyed, a fragment of its spirit burrows itself deep within your psyche, making you commit horrors when you suspect yourself safe. Every time you take a long rest, you must succeed at a DC 11 Charisma saving throw or be possessed by the attacking creature (or its spirit) for up to 1d10 minutes, in a manner similar to the dominate spell. As with the spell, you can repeat your saving throw if you suffer damage. When the possession ends, you have no memory of what you have done. This possession can typically be noticed by a change in your mannerisms when possessed, and also by a detect magic spell at any time. This flaw can only be removed by magic such as Greater Restoration, Remove Curse or Wish, or possibly by destroying or confronting the possessing spirit, at the Dungeon Master's discretion.</td></tr>
                <tr><td>22-28</td><th>Debilitating Migraines</th><td>The attack permanently damaged your brain, and you become plagued with nosebleeds and nauseating headaches. These come most frequently in times of stress, or following loud noise. When rolling for initiative at the start of combat, or when you suffer thunder damage, you must make a DC 11 Constitution saving throw. If you fail the save, the migraines come again: you suffer disadvantage on future initiative and Wisdom (Perception) checks. The migraine attack ends when you take a short or long rest. This flaw can only be removed by magic such as Greater Restoration, Heal, Remove Curse or Wish.</td></tr>
                <tr><td>29-33</td><th>Crippling Fatigue</th><td>You can never shake your sense of tiredness, and gain one level of exhaustion. This can be removed normally. However, following every long rest, you must succeed at a DC 11 Constitution or Wisdom saving throw (your choice), or gain a level of exhaustion. If you fail this saving throw by 5 or more, you gain two levels. Accumulating enough exhaustion levels can lead to your death. However, if you roll an unmodified 20, this flaw ends, and can also be ended by magic such as Greater Restoration or Wish.</td></tr>
                <tr><td>34-38</td><th>Partially Deafened</th><td>If you wear a helmet, you must make a DC 11 Constitution saving throw – if you fail (or have no helmet), then either through brain damage or damage to the ears, the attack leaves your hearing permanently muffled. You suffer disadvantage on Wisdom (Perception) checks that rely on hearing. This flaw can be reversed through magic such as Greater Restoration, Heal, Heal Minor Injury, Regenerate or Wish.</td></tr>
                <tr><td>39-48</td><th>Shell-Shock</th><td>Either due to brain damage or a lifetime of facing horrors and death, you are somewhat indecisive and slow to react. You suffer a penalty of -2 to your Initiative. This flaw can be removed through magic such as Greater Restoration or Wish.</td></tr>
                <tr><td>49-57</td><th>Troubled Sleep</th><td>Unless you are immune to being frightened, you suffer the following flaw: though you more or less recover, your sleep or trance is ravaged by inescapable nightmares, and rarely affords much rest. You must succeed on a DC 11 Charisma or Wisdom saving throw (your choice) after every long rest, or only recover a quarter of your hit dice. If you beat the save DC by 10 or more, the flaw ends. It can also be removed by magic such as Dream, Greater Restoration, Remove Curse or Wish.</td></tr>
                <tr><td>58-62</td><th>Pushed to the Brink</th><td>Unless you are immune to being frightened, your mind is rendered brittle. You become over-emotional and prone to regular fits of crying, suffer disadvantage on checks or saving throws related to avoiding being frightened, and may react strongly to certain enchantment spells (at the Dungeon Master's discretion). This ends when you make a successful DC 17 Charisma or Wisdom saving throw (your choice) rolled at the beginning of each month – this saving throw can also be made if you are subject to a Calm Emotions spell. The flaw can also be removed by magic such as Greater Restoration, Remove Curse or Wish.</td></tr>
                <tr><td>63-71</td><th>Personality Change</th><td>In the aftermath of the attack, you soon exhibit a shift in personality. Roll 1d100 and consult the Indefinite Madness table (on page 260 of the Dungeon Master's Guide) to see what permanent flaw you gain. This flaw can only be removed by magic such as Greater Restoration or Wish, or possibly by some kind of long-term therapy, at the Dungeon Master's discretion.</td></tr>
                <tr><td>72-76</td><th>Fixation</th><td>Following recovery, you develop an unhealthy fixation. Roll 1d6: on a 1-3, you nurture a bitter enmity; on a 4-6, you develop an overpowering phobia. If you are immune to being frightened, then this result is bitter enmity. You should work with the Dungeon Master on the phrasing of the new flaw: your hatred or phobia may focus on some element of the attacker's identity (for example, a mindless hatred towards mind flayers or sorcerers) or even the type of attack (such as a fear of magic). This flaw can be removed bymagci such as Greater Restoration or Wish.</td></tr>
                <tr><td>77-96</td><th>Full Recovery</th><td>You seem to be fine.</td></tr>
                <tr><td>97-98</td><th>Steel Mind</th><td>Though the mental onslaught is agonizing, you reconstruct your mind by will alone – stronger than it was before. From now on, you reduce psychic damage that you suffer by -3 per attack and, if attacked with psychic damage by a creature, you can use a reaction to make an opposed contest against the attacker (using your choice of Wisdom or Charisma against the attacker's Charisma). If you win the contest, the attacker suffers the same amount of psychic damage as you. Finally, if a creature attempts to read your mind, the would-be intruder suffers disadvantage on their attempt, and you gain advantage on rolls to resist.</td></tr>
                <tr><td>99+</td><th>I'm... I'm Alright!</th><td>The gods must be smiling today – the blow seemed worse than it actually is, and you are assumed dead. Rather than making any death saving throws, you are instead stabilised and returned to 1 hit point and, at the beginning of your next turn, regain 1d10 hit points and can act as normal, gaining advantage on your first attack that turn.</td></tr>
              </tbody>
            </table>
          </b-tab>
          <b-tab index="11" title="Radiant">
            <table class="table table-striped">
              <thead><tr><th>D100 Roll</th><th>Injury</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td>1</td><th>Instant Death</th><td>Your major organs are incinerated, or your brain boils inside your skull, killing you instantly.</td></tr>
                <tr><td>2</td><th>Fatal Wound</th><td>You suffer massive burns, or internal burn damage to major organs. Even if you succeed at the normal death saving throws, you remain unconscious and will die after 1d6 turns have passed, at the end of your turn, unless you are magically healed above 0 hit points, or stabilised with a DC 17 Wisdom (Medicine) check using a healer's kit.</td></tr>
                <tr><td>3</td><th>Incinerated Arm</th><td>Your arm or hand is almost entirely disintegrated. Due to system shock, you must make a death saving throw immediately, with disadvantage on the roll. Following recovery, you can no longer hold anything with two hands, and can hold only a single object at a time. The distraction of the pain means that if you attempt to cast any spell you must first succeed on a DC 11 Constitution saving throw or lose your action that turn – the spell slot, if any, is not lost. Finally, if the lost arm was your dominant arm (50% chance), unless you are trained in the Dual Wielder feat or the Two-Weapon Fighting Style, you suffer disadvantage with weapon attacks until you learn to use your off-hand. You learn to live with this pain and train your off-hand after a base recovery time of 40 days (see Recovery above). The limb can be restored by either Regenerate or Wish.</td></tr>
                <tr><td>4</td><th>Incinerated Leg</th><td>Your leg or foot is almost entirely disintegrated. Due to system shock, you must make a death saving throw immediately, with disadvantage on the roll. Following recovery, your speed on foot is halved and you must use a cane or crutch to move, unless you receive a prosthesis of some kind. Additionally, you fall prone after using the dash action, and suffer disadvantage on Dexterity checks made to balance. Finally, the distraction of the pain means that if you attempt to cast any spell you must first succeed on a DC 11 Constitution saving throw or lose your action that turn – the spell slot, if any, is not lost. You learn to live with this pain after a base recovery time of 40 days (see Recovery above). The limb can be restored by either Regenerate or Wish.</td></tr>
                <tr><td>5-11</td><th>Multiple Injuries</th><td>Roll again on this table 1d3+1 times, suffering the combined effects of the various results (within reason!). Reroll any duplicates, and also reroll Multiple Injuries, Minor Scar, Full Recovery, "I'm... I'm Alright!" and any results which indicate death (like Fatal Wound or Instant Death).</td></tr>
                <tr><td>12-16</td><th>Burnt-Out Eyes</th><td>If you wear a helmet, you must make a DC 17 Dexterity saving throw – if you fail (or have no helmet), then the intense light gives you one last glimpse of beauty, before it takes your sight forever. From now on, you are permanently blinded – unless you are cured by magic such as Greater Restoration, Heal, Regenerate or Wish.</td></tr>
                <tr><td>17-20</td><th>Frail</th><td>You recover, but your health is never quite the same again. You can barely keep food down, and lose 1 point from your Constitution score. Finally, if you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce the character's hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>21-24</td><th>Painful Joints</th><td>You heal, but are never again as sprightly. You lose 1 point from your Dexterity score. If you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce your hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>25-28</td><th>Enfeebled</th><td>You heal, but are never again as strong. You lose 1 point from your Strength score. If you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce your hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>29-34</td><th>Ruined Eye</th><td>If you wear a helmet, you must make a DC 17 Dexterity saving throw – if you fail (or have no helmet), one of your eyes is destroyed. From now on, you suffer disadvantage on Wisdom (Perception) checks that rely on sight, and on ranged attack rolls. If a subsequent injury damages your other eye, you are permanently blinded. Magic such as Regenerate or Wish can restore the lost eye.</td></tr>
                <tr><td>35-38</td><th>Scarred Eye</th><td>If you wear a helmet, you must make a DC 14 Dexterity saving throw – if you fail (or have no helmet), one of your eyes is scarred by the attack, costing its sight for a time. From now on, you suffer disadvantage on Wisdom (Perception) checks that rely on sight, and on ranged attack rolls. If a subsequent injury damages your other eye, you are blinded. The damaged eye's function can be restored either by succeeding at a DC 17 Constitution saving throw after a long rest, or by magic such as Greater Restoration, Heal, Heal Minor Injury, Regenerate or Wish.</td></tr>
                <tr><td>36-42</td><th>Pelvic Injury</th><td>Either your pelvis is struck a crippling blow, or the attack destroys your nethers. Whenever you attempt a Strength (Athletics) check or take any action in combat (other than casting a spell), you must succeed at a DC 11 Constitution saving throw or lose 1d6 hit points. You also can't ride a horse without suffering 1d10 hit points. Finally, this injury renders you permanently infertile. This flaw ends after a base recovery time of 70 days (see Recovery above), or if you receive magic such as Heal, Regenerate or Wish, although the infertility can only be reversed by Greater Restoration or Remove Curse.</td></tr>
                <tr><td>43-46</td><th>Leg Wound</th><td>Your leg is badly damaged. Until a base recovery time of 40 days has passed (see Recovery above), you must use a cane or crutch to move at half speed, you fall prone after using the dash action, and you suffer disadvantage on Dexterity checks made to balance. Even after the worst of the damage has passed, your speed on foot is reduced by 5 feet. The limb can be restored by either Heal, Regenerate or Wish.</td></tr>
                <tr><td>47-50</td><th>Hand Injury</th><td>The attack costs you several fingers. There is a 50% chance of the affected hand being your dominant hand. You can just about carry a shield, but if it's a weapon hand, your weapon attacks suffer a -2 penalty, unless you are trained in either the Dual Wielder feat or the Two-Weapon Fighting Style. Also, if it is your dominant hand, if you attempt to cast a spell with somatic components, you must first succeed on a DC 11 Constitution saving throw or lose your action that turn – the spell slot, if any, is not lost. These penalties last a base recovery time of 40 days (see Recovery above). This flaw can be removed by magic such as Regenerate or Wish.</td></tr>
                <tr><td>51-54</td><th>Ruined Armour</th><td>Unless your armour is enchanted or made of adamantine, the attack leaves it badly damaged, affording little protection and fitting badly. You suffer -2 from your AC. This penalty lasts until it is replaced, repaired (costing half the the total cost of the item) or subject to a Mending spell. If you have no armour, treat this result as Minor Scar instead.</td></tr>
                <tr><td>55-58</td><th>Old Battle Wound</th><td>You more or less recover, but become plagued for years with recurring pains. After every long rest, you must succeed at a DC 11 Constitution saving throw or suffer -2 to your Dexterity and Wisdom scores until the next long rest. This penalty can be neutralised by special salves, prepared by a character proficient in Medicine or using a herbalism kit with which they are proficient. This flaw can be removed through magic such as Greater Restoration, Heal, Regenerate or Wish.</td></tr>
                <tr><td>59-62</td><th>Useless Shield</th><td>Unless your shield is enchanted or made of adamantine, the attack leaves it ruined and worthless. If you don't have a shield, treat this result as Ruined Armour.</td></tr>
                <tr><td>63-66</td><th>Blinding Refraction</th><td>The focused beam not only puts you down, but also, by sheer chance, reflects off a shiny surface to strike another creature. A random creature without total cover from you (possibly including the attacker) must succeed at a DC14 Dexterity saving throw (this roll is made with advantage if they have half or three-quarters cover), or be blinded until the end of their next turn.</td></tr>
                <tr><td>67-71</td><th>Fixation</th><td>Following recovery, you develop an unhealthy fixation. Roll 1d6: on a 1-3, you nurture a bitter enmity; on a 4-6, you develop an overpowering phobia. If you are immune to being frightened, then this result is bitter enmity. You should work with the Dungeon Master on the phrasing of the new flaw: your hatred or phobia may focus on some element of the attacker's identity (for example, a mindless hatred towards angels or sorcerers) or even the type of attack (such as a fear of sunlight). This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>72-76</td><th>Horrible Scar</th><td>If you wear a helmet, you must make a DC 14 Dexterity saving throw – if you fail (or have no helmet), you are disfigured to the extent that the wound can't be easily concealed, or palated. You have disadvantage on Charisma (Persuasion) checks and advantage on Charisma (Intimidation) checks. Magic like Heal, Regenerate or Wish can remove the scar.</td></tr>
                <tr><td>77-96</td><th>Minor Scar</th><td>The scar doesn't have any adverse effect, but may make you more memorable and badass! Magic such as Heal, Regenerate or Wish can remove the scar.</td></tr>
                <tr><td>97-98</td><th>Sun-Blessed</th><td>Either due to some purity inherent in your nature, or as part of an unknowable divine plan, the holy radiance imbues itself permanently into your mortal shell. Your skin or eyes seem to glimmer with astral radiance, and you can use a bonus action to cause your skin to glow with a soft light, shedding bright light in a 5-foot radius and dim light for an additional 5 feet – this can be turned off with another bonus action, and also turns off if you fall unconscious. Additionally, once per long rest, you can cast the bless spell as a 1st level spell, without using up a spell slot. This flaw can only be removed by magic such as Protection from Evil and Good or Wish.</td></tr>
                <tr><td>99+</td><th>I'm... I'm Alright!</th><td>The gods must be smiling today – the blow seemed worse than it actually is, and you are assumed dead. Rather than making any death saving throws, you are instead stabilised and returned to 1 hit point and, at the beginning of your next turn, regain 1d10 hit points and can act as normal, gaining advantage on your first attack that turn.</td></tr>
              </tbody>
            </table>
          </b-tab>
          <b-tab index="12" title="Slashing">
            <table class="table table-striped">
              <thead><tr><th>D100 Roll</th><th>Injury</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td>1</td><th>Instant Death</th><td>You are decapitated, or suffer some other grievous wound which kills you instantly.</td></tr>
                <tr><td>2</td><th>Fatal Wound</th><td>Either you are gutted, your spine is severed, or something equally horrible happens. Even if you succeed at the normal death saving throws, you remain unconscious and will die after 1d6 turns have passed, at the end of your turn, unless you are magically healed above 0 hit points, or stabilised with a DC 17 Wisdom (Medicine) check using a healer's kit.</td></tr>
                <tr><td>3</td><th>Disembowelment</th><td>Your internal organs become external. Even if you succeed at the normal death saving throws and regain consciousness, you are capable of nothing more strenuous than moving at half speed (rounded up), cannot take actions, bonus actions or reactions, and will die after a number of hours equal to your Constitution score, unless you are subject to powerful healing like Heal, Regenerate or Wish. Alternatively, if a character spends a use of a healer's kit and succeeds at a DC 17 Wisdom (Medicine) check, then you will be stabilised and able to undertake normal activity after a long rest.</td></tr>
                <tr><td>4</td><th>Paralysis</th><td>Spinal damage leaves you unable to move or feel anything from the waist down. You will need carrying or some sort of device to allow mobility (otherwise you can only crawl 5 feet per turn), and count as restrained. Still, there is always hope for a particularly strong person: at the beginning of every week, you can make a DC 20 Constitution saving throw – on a success, you miraculously recover. Otherwise, this flaw only ends if you receive powerful magic such as Greater Restoration, Heal, Regenerate or Wish.</td></tr>
                <tr><td>5</td><th>Severed Arm</th><td>Your arm or hand is hacked off, pumping arterial blood everywhere. Due to the flow of blood, you lose 1d6 hit points at the end of each of your turns, unless you receive magical healing to seal the stump, it is cauterised by fire or radiant damage, or another character uses an action to apply a tourniquet. Due to system shock, you must make a death saving throw immediately, with disadvantage on the roll. Following recovery, you can no longer hold anything with two hands, and can hold only a single object at a time. The distraction of the pain means that if you attempt to cast any spell you must first succeed on a DC 11 Constitution saving throw or lose your action that turn – the spell slot, if any, is not lost. Finally, if the lost arm was your dominant arm (50% chance), unless you are trained in the Dual Wielder feat or the Two-Weapon Fighting Style, you suffer disadvantage with weapon attacks until you learn to use your off-hand. You learn to live with this pain and train your off-hand after a base recovery time of 40 days (see Recovery above). The limb can be restored by either Regenerate or Wish.</td></tr>
                <tr><td>6</td><th>Severed Leg</th><td>Your leg or foot is hacked off, pumping arterial blood everywhere. Due to the flow of blood, you lose 1d6 hit points at the end of each of your turns, unless you receive magical healing to seal the stump, it is cauterised by fire or radiant damage, or another character uses an action to apply a tourniquet. Due to system shock, you must make a death saving throw immediately, with disadvantage on the roll. Following recovery, your speed on foot is halved and you must use a cane or crutch to move, unless you receive a prosthesis of some kind. Additionally, you fall prone after using the dash action, and suffer disadvantage on Dexterity checks made to balance. Finally, the distraction of the pain means that if you attempt to cast any spell you must first succeed on a DC 11 Constitution saving throw or lose your action that turn – the spell slot, if any, is not lost. You learn to live with this pain after a base recovery time of 40 days (see Recovery above). The limb can be restored by either Regenerate or Wish.</td></tr>
                <tr><td>7-11</td><th>Multiple Injuries</th><td>Roll again on this table 1d3+1 times, suffering the combined effects of the various results (within reason!). Reroll any duplicates, and also reroll Multiple Injuries, Minor Scar, Full Recovery, "I'm... I'm Alright!" and any results which indicate death (like Disembowelment, Fatal Wound or worse).</td></tr>
                <tr><td>12-15</td><th>I Can't Move!</th><td>Brain trauma leaves you fully paralysed, at least for a short time. You can do little more than speak, but can still cast spells that don't require somatic components. However, as you can't feel much of your body, you gain advantage on any Constitution saving throw to maintain concentration on spells due to receiving damage. After every long rest, the character can make a DC 17 Constitution saving throw to end the paralysis. This flaw can also be ended by magic such as Freedom of Movement, Greater Restoration, Heal Minor Injury, Remove Curse or Wish.</td></tr>
                <tr><td>16-19</td><th>Frail</th><td>You recover, but your health is never quite the same again. You can barely keep food down, and lose 1 point from your Constitution score. Finally, if you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce the character's hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>20-23</td><th>Painful Joints</th><td>You heal, but are never again as sprightly. You lose 1 point from your Dexterity score. If you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce your hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>24-27</td><th>Enfeebled</th><td>You heal, but are never again as strong. You lose 1 point from your Strength score. If you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce your hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>28-31</td><th>Head Injury</th><td>If you wear a helmet, you must make a DC 11 Constitution saving throw – if you fail (or have no helmet), ten head trauma damages your mental facilities somehow, often leaving a bald patch at the scar. Roll 1d3: 1: you lose 1 point from your Intelligence score; 2: you lose 1 point from your Wisdom score; 3: you lose 1 point from your Charisma score. This flaw is often accompanied by speech or memory problems, requiring you to relearn basic skills and social niceties. If the same ability score is affected a second time or more in the future by this flaw, you must succeed at a DC 14 Constitution saving throw or also suffer the Coma flaw. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>32-35</td><th>Broken Arm</th><td>As the attack slams home, an audible 'crack' renders an arm close to useless for a time. There is a 50% chance that the broken arm is your dominant arm and if so, unless you are trained in the Dual Wielder feat or the Two-Weapon Fighting Style, you suffer disadvantage with weapon attacks. If it is your other arm, you cannot wear a shield. This flaw ends after a base recovery time of 30 weeks (see Recovery above), or if you receive magic such as a Greater Restoration, Heal, Regenerate or Wish.</td></tr>
                <tr><td>36-39</td><th>Leg Wound</th><td>Your leg is badly damaged. Until a base recovery time of 40 days has passed (see Recovery above), you must use a cane or crutch to move at half speed, you fall prone after using the dash action, and you suffer disadvantage on Dexterity checks made to balance. Even after the worst of the damage has passed, your speed on foot is reduced by 5 feet. The limb can be restored by magic such as Heal, Regenerate or Wish.</td></tr>
                <tr><td>40-43</td><th>Broken Ribs</th><td>Your rib cage is partly caved in. Whenever you attempt a Strength (Athletics) check or attempt to take any action in combat (other than casting a spell), you must succeed at a DC 11 Constitution saving throw. If you fail the save, you lose your action and can't use reactions until the start of your next turn. This flaw ends after a base recovery time of 50 days (see Recovery above), or if you receive magic such as Heal, Regenerate or Wish.</td></tr>
                <tr><td>44-47</td><th>Hand Injury</th><td>The attack costs you several fingers. There is a 50% chance of the affected hand being your dominant hand. You can just about carry a shield, but if it's a weapon hand, your weapon attacks suffer a -2 penalty, unless you are trained in either the Dual Wielder feat or the Two-Weapon Fighting Style. Also, if it is your dominant hand, if you attempt to cast a spell with somatic components, you must first succeed on a DC 11 Constitution saving throw or lose your action that turn – the spell slot, if any, is not lost. These penalties last a base recovery time of 40 days (see Recovery above). This flaw can be removed by magic such as Regenerate or Wish.</td></tr>
                <tr><td>48-51</td><th>Scalp Cut</th><td>Unless you are wearing a helmet, you suffer the following flaw: it's only a shallow wound, but that doesn't seem to stop it bleeding profusely, and blinding you with your own blood. When you roll for initiative at the start of combat, on the result of an odd number, you are blinded. You can use a bonus action to wipe away the blood to avoid being blinded until the beginning of your next turn. This flaw ends either by receiving the spell Heal Minor Injury, or after a long rest.</td></tr>
                <tr><td>52-55</td><th>Bleeding Wound</th><td>Frustratingly, the latest injury is loathe to stop bleeding. When you roll for initiative at the start of combat, on the result of an odd number, the wound re-opens: you suffer 1 damage at the end of each of your turns, unless a character uses an action to bind the wound. This flaw ends if you receive the spell Heal Minor Injury, or if you succeed at a DC 17 Constitution saving throw after a long rest: if you fail this save the first time, you gain a +5 bonus in future.</td></tr>
                <tr><td>56-60</td><th>Ruined Armor</th><td>Unless your armour is enchanted or made of adamantine, the attack leaves it badly damaged, affording little protection and fitting badly. You suffer -2 from your AC. This penalty lasts until it is replaced, repaired (costing half the the total cost of the item) or subject to a Mending spell. If you have no armour, treat this result as Minor Scar instead.</td></tr>
                <tr><td>61-64</td><th>Useless Shield</th><td>Unless your shield is enchanted or made of adamantine, the attack leaves it ruined and worthless. If you don't have a shield, treat this result as Ruined Armour instead.</td></tr>
                <tr><td>65-68</td><th>Infected Wounds</th><td>The damage refuses to properly heal, and instead becomes swollen and leaks a noisome pus. Your hit point maximum is reduced by 1 for every 24 hours the wound persists. If your hit point maximum drops to 0, you die. The wound heals if you receive the spell Heal Minor Injury or, alternatively, someone can tend to the wound and make a DC 14 Wisdom (Medicine) check once every 24 hours. After ten successes, the wound heals. Characters who are immune to disease treat this result as Minor Scar instead.</td></tr>
                <tr><td>69-72</td><th>Fixation</th><td>Following recovery, you develop an unhealthy fixation. Roll 1d6: on a 1-3, you nurture a bitter enmity; on a 4-6, you develop an overpowering phobia. If you are immune to being frightened, then this result is bitter enmity. You should work with the Dungeon Master on the phrasing of the new flaw: your hatred or phobia may focus on some element of the attacker's identity (for example, a mindless hatred towards orcs or sorcerers) or even the type of attack (such as a fear of knives). This flaw can be removed by magic such as Greater Restoration or Wish.</td></tr>
                <tr><td>73-76</td><th>Horrible Scar</th><td>If you wear a helmet, you must make a DC 14 Dexterity saving throw – if you fail (or have no helmet), you are disfigured to the extent that the wound can't be easily concealed, or palated. You have disadvantage on Charisma (Persuasion) checks and advantage on Charisma (Intimidation) checks. Magic like Heal, Regenerate or Wish can remove the scar.</td></tr>
                <tr><td>77-98</td><th>Minor Scar</th><td>The scar doesn't have any adverse effect, but may make you more memorable and badass! Magic such as Heal, Regenerate or wish can remove the scar.</td></tr>
                <tr><td>99+</td><th>I'm... I'm Alright!</th><td>The gods must be smiling today – the blow seemed worse than it actually is, and you are assumed dead. Rather than making any death saving throws, you are instead stabilised and returned to 1 hit point and, at the beginning of your next turn, regain 1d10 hit points and can act as normal, gaining advantage on your first attack that turn.</td></tr>
              </tbody>
            </table>
          </b-tab>
          <b-tab index="13" title="Thunder">
            <table class="table table-striped">
              <thead><tr><th>D100 Roll</th><th>Injury</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td>1</td><th>Instant Death</th><td>Your skull is shattered, or you suffer massive internal injuries, killing you instantly.</td></tr>
                <tr><td>2</td><th>Fatal Wound</th><td>Either your back is broken, or your internal organs are ruptured. Even if you succeed at the normal death saving throws, you remain unconscious and will die after 1d6 turns have passed, at the end of your turn, unless you are magically healed above 0 hit points, or stabilised with a DC 17 Wisdom (Medicine) check using a healer's kit.</td></tr>
                <tr><td>3</td><th>Paralysis</th><td>Spinal damage leaves you unable to move or feel anything from the waist down. You will need carrying or some sort of device to allow mobility (otherwise you can only crawl 5 feet per turn), and count as restrained. Still, there is always hope for a particularly strong person: at the beginning of every week, you can make a DC 20 Constitution saving throw – on a success, you miraculously recover. Otherwise, this flaw only ends if you receive magic such as Greater Restoration, Heal, Regenerate or Wish.</td></tr>
                <tr><td>4</td><th>Coma</th><td>You enter a death-like sleep from which nothing can seemingly awaken you, though dim life signs still remain. You remain unconscious, even after being stabilised. Following a long rest, make a death saving throw. Three failed saves result in death (possibly due to lack of fluids, amongst other complications), but a result of 15 or means the coma ends. If and when you awaken, you suffer three levels of exhaustion (these exhaustion levels can be removed normally). The coma can also be ended prematurely by magic such as Dream, Greater Restoration, Remove Curse or Wish.</td></tr>
                <tr><td>5-11</td><th>Multiple Injuries</th><td>Roll again on this table 1d3+1 times, suffering the combined effects of the various results (within reason!). Reroll any duplicates, and also reroll Multiple Injuries, Minor Scar, Full Recovery, "I'm... I'm Alright!" and any results which indicate death (like Fatal Wound or Instant Death).</td></tr>
                <tr><td>12-14</td><th>Frail</th><td>You recover, but your health is never quite the same again. You can barely keep food down, and lose 1 point from your Constitution score. Finally, if you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce the character's hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>15-17</td><th>Painful Joints</th><td>You heal, but are never again as sprightly. You lose 1 point from your Dexterity score. If you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce your hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>18-20</td><th>Enfeebled</th><td>You heal, but are never again as strong. You lose 1 point from your Strength score. If you suffer this flaw again in the future, your hit dice are permanently reduced by one: if multiple versions of this flaw reduce your hit dice to 0, you die. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>21-25</td><th>Head Injury</th><td>If you wear a helmet, you must make a DC 11 Constitution saving throw – if you fail (or have no helmet), ten head trauma damages your mental facilities somehow, often leaving a bald patch at the scar. Roll 1d3: 1: you lose 1 point from your Intelligence score; 2: you lose 1 point from your Wisdom score; 3: you lose 1 point from your Charisma score. This flaw is often accompanied by speech or memory problems, requiring you to relearn basic skills and social niceties. If the same ability score is affected a second time or more in the future by this flaw, you must succeed at a DC 14 Constitution saving throw or also suffer the Coma flaw. This flaw can be removed by Greater Restoration or Wish.</td></tr>
                <tr><td>26-33</td><th>Deafened</th><td>If you wear a helmet, you must make a DC 14 Constitution saving throw – if you fail (or have no helmet), then either through brain damage or damage to the ears, the attack leaves you deafened. This flaw is removed if you receive magic such as Greater Restoration, Heal, Heal Minor Injury, Regenerate or Wish.</td></tr>
                <tr><td>34-37</td><th>Broken Ribs</th><td>Your rib cage is partly caved in. Whenever you attempt a Strength (Athletics) check or attempt to take any action in combat (other than casting a spell), you must succeed at a DC 11 Constitution saving throw. If you fail the save, you lose your action and can't use reactions until the start of your next turn. This flaw ends after a base recovery time of 50 days (see Recovery above), or if you receive magic such as Heal, Regenerate or Wish.</td></tr>
                <tr><td>38-43</td><th>Debilitating Migraines</th><td>The attack permanently damaged your brain, and you become plagued with nosebleeds and nauseating headaches. These come most frequently in times of stress, or following loud noise. When rolling for initiative at the start of combat, or when you are hit by an attack causing thunder damage, you must make a DC 11 Constitution saving throw. If you fail the save, the migraines come again: you suffer disadvantage on future initiative and Wisdom (Perception) checks. The migraine attack ends when you take a short or long rest. This flaw can only be removed by magic such as Greater Restoration, Heal, Remove Curse or Wish.</td></tr>
                <tr><td>44-50</td><th>Punch Drunk</th><td>If you wear a helmet, you must make a DC 11 Constitution saving throw – if you fail (or have no helmet), then due to hearing impairment or brain trauma, your coordination is often disrupted. After every short or long rest, you must succeed at a DC 11 Constitution or Wisdom saving throw (your choice), or suffer disadvantage on Dexterity (Acrobatics) checks. This penalty lasts until the next short or long rest. Additionally, if you are knocked prone, it costs you double the standard movement to stand up. This flaw can be removed through magic such as Greater Restoration, Heal, Heal Minor Injury, Regenerate or Wish.</td></tr>
                <tr><td>51-57</td><th>Partially Deafened</th><td>If you wear a helmet, you must make a DC 11 Constitution saving throw – if you fail (or have no helmet), then either through brain damage or damage to the ears, the attack leaves your hearing permanently muffled. You suffer disadvantage on Wisdom (Perception) checks that rely on hearing. This flaw can be removed through magic such as Greater Restoration, Heal, Heal Minor Injury, Regenerate or Wish.</td></tr>
                <tr><td>58-62</td><th>Shell-Shock</th><td>Either due to brain damage or a lifetime of facing horrors and death, you are somewhat indecisive and slow to react. You suffer a penalty of -2 to your Initiative. This flaw can be removed through magic such as Greater Restoration or Wish.</td></tr>
                <tr><td>63-67</td><th>Troubled Sleep</th><td>Unless you are immune to being frightened, you suffer the following flaw: though you more or less recover, your sleep or trance is ravaged by inescapable nightmares, and rarely affords much rest. You must succeed on a DC 11 Charisma or Wisdom saving throw (your choice) after every long rest, or only recover a quarter of your hit dice. If you beat the save DC by 10 or more, the flaw ends. It can also be removed by magic such as Dream, Greater Restoration, Remove Curse or Wish.</td></tr>
                <tr><td>68-70</td><th>Personality Change</th><td>In the aftermath of the attack, either as a result of head injury or due to post-traumatic stress, you soon exhibit a shift in personality. Roll 1d100 and consult the Indefinite Madness table (on page 260 of the Dungeon Master's Guide) to see what permanent flaw you gain. This flaw can only be removed by magic such as Greater Restoration or Wish, or possibly by some kind of long-term therapy, at the Dungeon Master's discretion.</td></tr>
                <tr><td>71-73</td><th>Shrapnel</th><td>As the sound booms around you, its tones shatter nearby fragile objects (such as windows or a non-magic metal weapon), and the shards slice into an unfortunate witness. A random creature (possibly including the attacker) within 30 feet of you must succeed on a DC 14 Dexterity saving throw, or suffer 1d6 piercing damage; this damage may be higher at the Dungeon Master's discretion, depending on the size and weight of the shattered material.</td></tr>
                <tr><td>74-76</td><th>Fixation</th><td>Following recovery, you develop an unhealthy fixation. Roll 1d6: on a 1-3, you nurture a bitter enmity; on a 4-6, you develop an overpowering phobia. If you are immune to being frightened, then this result is bitter enmity. You should work with the Dungeon Master on the phrasing of the new flaw: your hatred or phobia may focus on some element of the attacker's identity (for example, a mindless hatred towards elementals or sorcerers) or even the type of attack (such as a fear of storms). This flaw can be removed by magic such as Greater Restoration or Wish.</td></tr>
                <tr><td>77-96</td><th>Full Recovery</th><td>You seem to be fine.</td></tr>
                <tr><td>97-98</td><th>Thunder-Born</th><td>By some freak coincidence, the intensity of the sound opens the briefest of rifts to the Plane of Elemental Air and you become permanently infused with the smallest fragment of energy from that plane. In moments of anger or excitement, ambient thunder rolls protectively around you. You can use a reaction to gain resistance to thunder and lightning damage until the beginning of your next turn, but a growling wave of thunder sweeps out, audible up to 100 feet away, and creatures within 5 feet must succeed at a DC 14 Constitution saving throw or suffer 1d6 thunder damage. Finally, when you spend more than three nights in one area, it is likely that natural storms will begin to form in the vicinity. This flaw can only be removed by magic such as Remove Curse or Wish.</td></tr>
                <tr><td>99+</td><th>I'm... I'm Alright!</th><td>The gods must be smiling today – the blow seemed worse than it actually is, and you are assumed dead. Rather than making any death saving throws, you are instead stabilised and returned to 1 hit point and, at the beginning of your next turn, regain 1d10 hit points and can act as normal, gaining advantage on your first attack that turn.</td></tr>
              </tbody>
            </table>
          </b-tab>
        </b-tabs>
      </b-tab>
      <b-tab index="3" title="Actions">
        <h3>Actions</h3>
        <h4>Movement</h4>
        <table class="table table-striped datatable">
          <thead>
            <tr>
              <th>Item</th><th>Rule</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Difficult Terrain</td>
              <td>Costs 1 extra foot of movement per foot moved(stacks with other modifiers). Low furniture, rubble, undergrowth, steep stairs, snow, shallow bogs, and other creatures spaces are difficult terrain</td>
            </tr>
            <tr>
              <td>Standing Up</td>
              <td>Costs an amount of movement equal to half your speed (rounded down).  Cannot stand if speed is 0.</td>
            </tr>
            <tr>
              <td>Crawling</td>
              <td>Costs 1 extra foot of movement per foot moved(stacks with other modifiers).</td>
            </tr>
            <tr>
              <td>Moving through another creature's space</td>
              <td>Can always move through friendly creatures space.  Hostile creatures only if 2 sizes larger.  Cannot end movement in another creatures space. Always difficult terrain.</td>
            </tr>
            <tr>
              <td>Flying</td>
              <td>No minimum distance moved.  Without hover you fall if you are knocked prone or have your speed reduced to 0.</td>
            </tr>
            <tr>
              <td>Squeezing</td>
              <td>Must be large enough for creature 1 size smaller.  Must spend 1 extra foot of movement for every foot (stacks with other modifiers).</td>
            </tr>
            <tr>
              <td>Climbing & Swimming</td>
              <td>Must spend 1 extra foot of movement for every foot moved (stacks with other modifiers), unless you have a specific speed for climbing or swimming.</td>
            </tr>
            <tr>
              <td>Alternating between types of movement.</td>
              <td>Subtract the total distance you have moved from whatever speed you are currently using to determine how far you can continue moving.</td>
            </tr>
            <tr>
              <td>Running Jump</td>
              <td>Horizontal feet equal to strength score, Vertical feet equal to 3 + strength modifier. Minimum 10 ft. on foot before jump.</td>
            </tr>
            <tr>
              <td>Standing Jump</td>
              <td>Horizontal feet equal to strength score/2 Vertical feet equal to (3 + strength modifier)/2</td>
            </tr>
            <tr>
              <td>Vertical Reach</td>
              <td>Equal to 1 1/2 * height + vertical jumping distance.</td>
            </tr>
            <tr>
              <td>Moving Stealthily</td>
              <td>Requires moving at half speed.  Make a dexterity (stealth) check opposed by wisdom (perception) or passive perception of observers.</td>
            </tr>
            <tr>
              <td>Mounting and Dismounting</td>
              <td>Once during your move, you can mount a creature that is within 5 feet o f you or dismount. Doing so costs an amount o f movement equal to half your speed.</td>
            </tr>
            <tr>
              <td>Falling off your mount</td>
              <td>if your mount is moved against it's will or you are knocked prone, you must succeed on a DC 10 Dexterity saving throw or fall off the mount, landing prone in a space within 5 feet of it.  If your mount is knocked prone you may use your reaction to land on your feet next to it, otherwise you are knocked prone.</td>
            </tr>
          </tbody>
        </table>
        <h4>Actions in Combat</h4>
        <table class="table table-striped datatable">
          <thead>
            <tr>
              <th>Action</th>
              <th>Rule</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Attack</td>
              <td>Make one melee or ranged weapon attack.</td>
            </tr>
            <tr>
              <td>Cast a Spell</td>
              <td>Most spells cost 1 action to cast.  Spell description may specify otherwise.</td>
            </tr>
            <tr>
              <td>Dash</td>
              <td>Gain extra movement for the turn equal to your speed.</td>
            </tr>
            <tr>
              <td>Disengage</td>
              <td>Movement doesn't provoke opportunity attacks for the rest of the turn.</td>
            </tr>
            <tr>
              <td>Dodge</td>
              <td>Attack rolls against you have disadvantage.</td>
            </tr>
            <tr>
              <td>Help</td>
              <td>Give advantage on the next ability check or attack roll you are helping with before the start of your next turn.</td>
            </tr>
            <tr>
              <td>Hide</td>
              <td>Make a dexterity (stealth) check to attempt to hide.  Cannot hide from creature that can see you.</td>
            </tr>
            <tr>
              <td>Ready</td>
              <td>Choose circumstance to trigger action and action to use.  Can choose at circumstance happening what you do.</td>
            </tr>
            <tr>
              <td>Search</td>
              <td>Try to find something using Wisdom (Perception) or Intelligence (Investigation)</td>
            </tr>
            <tr>
              <td>Use an Object</td>
              <td>
                Most objects can be interacted with as part of another action(such as drawing a sword or spell component). Interact with one normal object for free each turn.  Certain objects require an action to use, or you can interact with a second object on your turn as an action.
              </td>
            </tr>
          </tbody>
        </table>
        <h4>Attacks</h4>
        <table class="table table-striped datatable">
          <thead>
            <tr><th>Attack</th><th>Rule</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Critical Hit</td>
              <td>when the d20 roll is a 20 attack hits regardless of modifiers or targets AC. Double all damage dice.</td>
            </tr>
            <tr>
              <td>Critical Miss</td>
              <td>when the d20 roll is a 1 the attack misses regardless of modifiers or targets AC.</td>
            </tr>
            <tr>
              <td>Unseen Combatants</td>
              <td>Disadvantage on attack rolls against, advantage on attack rolls for.  If guessing wrong location automatic miss. Give away location when make an attack (hit or miss)</td>
            </tr>
            <tr>
              <td>Ranged Attack</td>
              <td>Uses DEX for attack roll and damage, thrown weapon can use strength at option. Disadvantage when enemy within 5 ft.</td>
            </tr>
            <tr>
              <td>Unarmed Fighting</td>
              <td>
                Unarmed strikes are not weapons in the normal sense, and attacking with them does not count as a weapon attack but can be done instead of attacking with a weapon. However you are always proficient in unarmed strikes.
              </td>
            </tr>
            <tr>
              <td>Opportunity Attack</td>
              <td>Uses reaction.  Make 1 weapon attack when a hostile creature you can see moves out of your reach.</td>
            </tr>
            <tr>
              <td>Two-weapon fighting</td>
              <td>
                When you attack with a light melee weapon held in one hand you can use a bonus action to attack with a different light melee weapon in the other hand. Do not add your ability modifier to the damage of the second attack.s
              </td>
            </tr>
            <tr>
              <td>Grapple</td>
              <td>
                Replaces 1 attack.  Use strength(athletics), opposed by strength(athletics) or dexterity(acrobatics).  Target gets grappled condition(speed 0). Can move grappled creature with you but speed is halved.  Target must be no more than 1 size larger than you.
              </td>
            </tr>
            <tr>
              <td>Shove</td>
              <td>
                Replaces 1 attack. Similar rules to grapple.  Target is knocked prone or pushed back 5 ft. on a success.
              </td>
            </tr>
          </tbody>
        </table>
      </b-tab>
      <b-tab index='4' title="Trade Goods">
        <h3>Trade Goods</h3>
        <table class="table table-striped datatable">
          <thead>
            <tr>
              <th>Name</th><th>Type</th><th>Weight</th><th>Unit of Sale</th><th>Price per Unit</th><th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Wheat</td><td>Foodstuff</td><td>60 lbs</td><td>1 bushel</td><td>5 sp</td><td>Unmilled wheat, usually only bought by millers who then make and sell flour</td>
            </tr>
            <tr>
              <td>Flour</td><td>Foodstuff</td><td>10 lb</td><td>sack</td><td>1.8 sp</td><td>milled flour, 8 days of food</td>
            </tr>
            <tr>
              <td>Bread</td><td>Foodstuff</td><td>1 lb</td><td>loaf</td><td>2 cp</td><td>cooked bread 0.5 days of food</td>
            </tr>
            <tr>
              <td>Biscuits</td><td>Foodstuff</td><td>1 lb</td><td>dozen</td><td>3 cp</td><td>soft biscuits 0.8 days of food</td>
            </tr>
            <tr>
              <td>Hardtack</td><td>Foodstuff</td><td>1 lb</td><td>dozen</td><td>2 cp</td><td>hard unappetizing biscuits, 1 day of food</td>
            </tr>
            <tr>
              <td>Salt</td><td>Foodstuff</td><td>1 lb</td><td>lb</td><td>5 cp</td><td>delicious salt, can be used to preserve meats or flavor food</td>
            </tr>
            <tr>
              <td>Ginger</td><td>Foodstuff</td><td>1 lb</td><td>lb</td><td>2 sp</td><td>usually sold as whole ginger root, 0.2 days of food</td>
            </tr>
            <tr>
              <td>Cinnamon</td><td>Foodstuff</td><td>1 lb</td><td>lb</td><td>7 sp</td><td>the bark of the cinnamon tree, sold as rolled sheets, 0.5 days of food</td>
            </tr>
            <tr>
              <td>Pepper</td><td>Foodstuff</td><td>1 lb</td><td>lb</td><td>7 sp</td><td>The black variety, used to disguise the taste of spoiled meat, 0.5 days of food</td>
            </tr>
            <tr>
              <td>Cloves</td><td>Foodstuff</td><td>1 lb</td><td>lb</td><td>2.5 gp</td><td>A rare spice made from the flower buds of the clove tree, 0.6 days of food</td>
            </tr>
            <tr>
              <td>Vegetables</td><td>Foodstuff</td><td>1 lb</td><td>lb</td><td>2 cp</td><td>Carrots, tomatoes, cucumbers, etc, 0.1 days of food</td>
            </tr>
            <tr>
              <td>Milk</td><td>Foodstuff</td><td>8.5 lb</td><td>gallon</td><td>3 cp</td><td>Delicious cow(or goat, or other mammal) juice, 1.2 days of food</td>
            </tr>
            <tr>
              <td>Cheese</td><td>Foodstuff</td><td>22 lb</td><td>wheel</td><td>5 sp</td><td>A large wheel of cheese, 20 days of food</td>
            </tr>
            <tr>
              <td>Straw</td><td>Foodstuff</td><td>36 lb</td><td>truss</td><td>1 cp</td><td>a decent basic feed for cows, horses, and other grazing herbivores, 3 days of animal feed</td>
            </tr>
            <tr>
              <td>Corn</td><td>Foodstuff</td><td>60 lb</td><td>bushel</td><td>4 sp</td><td>Sweet or flour corn suitable for eating, full ears. Can also be ground into flour.  14 days of food</td>
            </tr>
            <tr>
              <td>Fresh Fruit</td><td>Foodstuff</td><td>1 lb</td><td>lb</td><td>3 cp</td><td>Fruit, from apples to berries. 0.1 days of food</td>
            </tr>
            <tr>
              <td>Eggs</td><td>Foodstuff</td><td>1.5 lb</td><td>dozen</td><td>2 sp</td><td>Fruit, from apples to berries. 0.5 days of food</td>
            </tr>
            <tr>
              <td>Meat, dried or salted</td><td>Foodstuff</td><td>1 lb</td><td>lb</td><td>2 sp</td><td>Meat is typically dried or salted to preserve it. 0.6 days of food</td>
            </tr>
            <tr>
              <td>Meat, fresh</td><td>Foodstuff</td><td>1 lb</td><td>lb</td><td>1 sp</td><td>Fresh meat, delicious but spoils easily, 0.5 days of food</td>
            </tr>
            <tr>
              <td>Peasant's diet (daily)</td><td>Foodstuff</td><td>3 lbs</td><td>one days worth of food</td><td>3 cp</td><td>A days worth of simple wheat or corn bread, vegetables, and milk</td>
            </tr>
            <tr>
              <td>Balanced diet (daily)</td><td>Foodstuff</td><td>3 lbs</td><td>one days worth of food</td><td>1.7 sp</td><td>includes some preserved meat, vegetables, fruits, cheese, and bread, but little or no spices.</td>
            </tr>
            <tr>
              <td>Rich diet (daily)</td><td>Foodstuff</td><td>4 lbs</td><td>one days worth of food</td><td>6 sp</td><td>includes fresh meat, vegetables, fruits, cheese, milk, bread, and spices in enough quantity to put on weight over time.</td>
            </tr>
            <tr>
              <td>Survival Rations (daily)</td><td>Foodstuff</td><td>1 lb</td><td>one days worth of food</td><td>5 cp</td><td>Hardtack and a little jerky for protein.</td>
            </tr>
            <tr>
              <td>Good Rations (daily)</td><td>Foodstuff</td><td>1.5 lb</td><td>one days worth of food</td><td>1.2 sp</td><td>preserved meat, biscuits, and cheese.</td>
            </tr>
            <tr>
              <td>Canvas</td><td>Raw Material</td><td>0.5 lb</td><td>square yard</td><td>3 sp</td><td>heavy cotton canvas, good for tents or ships sails.</td>
            </tr>
            <tr>
              <td>Linen</td><td>Raw Material</td><td>0.2 lb</td><td>square yard</td><td>9 sp</td><td>fine linen, used to make comfortable warm weather clothing.</td>
            </tr>
            <tr>
              <td>Silk</td><td>Raw Material</td><td>0.2 lb</td><td>square yard</td><td>6 gp</td><td>fine silks, used for the finest clothing.</td>
            </tr>
            <tr>
              <td>Cotton</td><td>Raw Material</td><td>500 lb</td><td>bale</td><td>40 gp</td><td>raw cotton, used to produce cotton cloth.</td>
            </tr>
            <tr>
              <td>Flax</td><td>Raw Material</td><td>500 lb</td><td>bale</td><td>120 gp</td><td>raw flax, used to produce linen cloth.</td>
            </tr>
            <tr>
              <td>Wool</td><td>Raw Material</td><td>500 lb</td><td>bale</td><td>40 gp</td><td>raw wool, used to produce wool cloth.</td>
            </tr>
            <tr>
              <td>Cotton Cloth</td><td>Raw Material</td><td>0.3 lb</td><td>square yard</td><td>2 sp</td><td>medium weight cotton cloth, suitable for making clothing.</td>
            </tr>
            <tr>
              <td>Wool Cloth</td><td>Raw Material</td><td>0.4 lb</td><td>square yard</td><td>3 sp</td><td>thick wool cloth, suitable for making cold weather clothing.</td>
            </tr>
            <tr>
              <td>Softwood lumber, milled</td><td>Raw Material</td><td>2 lb</td><td>inches thick x square feet</td><td>2 cp</td><td>milled boards of spruce, pine, maple, or other softwoods. Used for the planks of a ship or as a cheap construction material for buildings.</td>
            </tr>
            <tr>
              <td>Softwood lumber, raw logs</td><td>Raw Material</td><td>1 2/3 lb</td><td>radius(feet)^2*length(inches)</td><td>radius(feet)^2*length(inches)*2 cp or 6 gp for a 10 ft. long 12" diameter log</td><td>raw logs of softwood trees.</td>
            </tr>
            <tr>
              <td>Hardwood lumber, milled</td><td>Raw Material</td><td>3.75 lb</td><td>inches thick x square feet</td><td>1 sp</td><td>milled boards of oak, walnut, cherry, or other hardwoods.  Used primarily for furniture.</td>
            </tr>
            <tr>
              <td>Hardwood lumber, raw logs</td><td>Raw Material</td><td>3 lb</td><td>radius(feet)^2*length(inches)</td><td>radius(feet)^2*length(inches)*2 sp or 6 gp for a 10 ft. long 12" diameter log</td><td>raw logs of hardwood trees.</td>
            </tr>
            <tr>
              <td>Ironwood lumber, milled</td><td>Raw Material</td><td>6 lb</td><td>inches thick x square feet</td><td>4 gp</td><td>milled boards of oak, walnut, cherry, or other hardwoods.  Used primarily for furniture.</td>
            </tr>
            <tr>
              <td>Ironwood lumber, raw logs</td><td>Raw Material</td><td>4.8 lb</td><td>radius(feet)^2*length(inches)</td><td>radius(feet)^2*length(inches)*40 sp or 120 gp for a 10 ft. long 12" diameter log</td><td>raw logs of hardwood trees.</td>
            </tr>
            <tr>
              <td>Hides</td><td>Raw Material</td><td>20 lb</td><td>1 finished hide</td><td>10 gp</td><td>A cowhide that has been dried and de-fleshed.</td>
            </tr>
            <tr>
              <td>Leather</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>2 gp</td><td>Leather ready for use in clothing or armor.</td>
            </tr>
            <tr>
              <td>Dragon Hide</td><td>Raw Material</td><td>150 lb</td><td>1 finished hide</td><td>6000 gp</td><td>A finished dragonhide that has been dried, descaled and de-fleshed.</td>
            </tr>
            <tr>
              <td>Dragon Leather</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>40 gp</td><td>Dragon leather ready for use in clothing or armor.</td>
            </tr>
            <tr>
              <td>Dragon Scales</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>30 gp</td><td>Dragon scales ready for use in clothing or armor.</td>
            </tr>
            <tr>
              <td>Hemp</td><td>Raw Material</td><td>500 lb</td><td>bale</td><td>10 gp</td><td>Hemp used for making rope.</td>
            </tr>
            <tr>
              <td>Cut Stone</td><td>Raw Material</td><td>2000 lb</td><td>ton</td><td>1 gp</td><td>Rough cut stone suitable for construction.</td>
            </tr>
            <tr>
              <td>Brick</td><td>Raw Material</td><td>2000 lb</td><td>ton</td><td>17 gp</td><td>Molded clay brick suitable for construction.</td>
            </tr>
            <tr>
              <td>Marble</td><td>Raw Material</td><td>2000 lb</td><td>ton</td><td>135 gp</td><td>cut marble suitable for construction.</td>
            </tr>
            <tr>
              <td>Concrete</td><td>Raw Material</td><td>2000 lb</td><td>ton</td><td>13 gp</td><td>unmixed concrete.</td>
            </tr>
            <tr>
              <td>Copper</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>3 sp</td><td>Smelted Copper.</td>
            </tr>
            <tr>
              <td>Silver</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>35 gp</td><td>Smelted Silver.</td>
            </tr>
            <tr>
              <td>Gold</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>1000 gp</td><td>Smelted Gold.</td>
            </tr>
            <tr>
              <td>Platinum</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>2000 gp</td><td>Smelted Platinum.</td>
            </tr>
            <tr>
              <td>Arcanum Crystal</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>100 gp</td><td>Unaligned Arcanum Crystal.</td>
            </tr>
            <tr>
              <td>Bronze</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>6 sp</td><td>Smelted bronze.</td>
            </tr>
            <tr>
              <td>Tin</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>2 sp</td><td>Smelted tin.</td>
            </tr>
            <tr>
              <td>Zinc</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>2 sp</td><td>Smelted zinc.</td>
            </tr>
            <tr>
              <td>Iron</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>1 sp</td><td>Smelted iron.</td>
            </tr>
            <tr>
              <td>Steel</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>2 sp</td><td>Smelted steel.</td>
            </tr>
            <tr>
              <td>Brass</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>6 sp</td><td>Smelted brass.</td>
            </tr>
            <tr>
              <td>Nickel</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>3 gp</td><td>Smelted nickel.</td>
            </tr>
            <tr>
              <td>Red Parakas Steel</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>5 gp</td><td>Smelted Parakas Steel.</td>
            </tr>
            <tr>
              <td>Adamantium</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>10 gp</td><td>Smelted Adamantium.</td>
            </tr>
            <tr>
              <td>Mithril</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>15 gp</td><td>Smelted Mithril.</td>
            </tr>
            <tr>
              <td>Aluminum</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>1 gp</td><td>Smelted Aluminum.</td>
            </tr>
            <tr>
              <td>Coal</td><td>Raw Material</td><td>1 lb</td><td>lb</td><td>5 cp</td><td>Raw Coal.</td>
            </tr>
          </tbody>
        </table>
      </b-tab>
      <b-tab index='5' title="Animals">
        <h3>Animals and Vehicles</h3>
        <table class="table table-striped datatable">
          <thead>
            <tr>
              <th>Animal</th><th>Type</th><th>Cost per Head</th><th>Size</th><th>Speed</th><th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Camel</td><td>Mount</td><td>110 gp</td><td>Large</td><td>50 ft.</td><td>A camel trained for riding.</td>
            </tr>
            <tr>
              <td>Donkey</td><td>Livestock</td><td>15 gp</td><td>Medium</td><td>35 ft.</td><td>A donkey trained for carrying goods.</td>
            </tr>
            <tr>
              <td>Mule</td><td>Livestock</td><td>25 gp</td><td>Medium</td><td>40 ft.</td><td>A mule trained for carrying goods.</td>
            </tr>
            <tr>
              <td>Draft Horse</td><td>Livestock</td><td>60 gp</td><td>Large</td><td>40 ft.</td><td>A large horse trained for carrying goods or pulling a load.</td>
            </tr>
            <tr>
              <td>Riding Horse</td><td>Mount</td><td>100 gp</td><td>Large</td><td>60 ft.</td><td>A horse trained for riding.</td>
            </tr>
            <tr>
              <td>Riding Dog(Mastiff)</td><td>Mount</td><td>25 gp</td><td>Medium</td><td>40 ft.</td><td>A large dog trained for riding by small or smaller creatures.</td>
            </tr>
            <tr>
              <td>Herding/Work Dog</td><td>Livestock</td><td>15 gp</td><td>Small</td><td>35 ft.</td><td>A dog trained for work such as herding or tracking.</td>
            </tr>
            <tr>
              <td>Pony</td><td>Mount</td><td>40 gp</td><td>Small</td><td>40 ft.</td><td>A pony trained for riding.</td>
            </tr>
            <tr>
              <td>War horse</td><td>Mount</td><td>200 gp</td><td>Large</td><td>60 ft.</td><td>A large horse trained for riding and fighting in battle.</td>
            </tr>
            <tr>
              <td>War camel</td><td>Mount</td><td>220 gp</td><td>Large</td><td>50 ft.</td><td>A camel trained for riding and fighting in battle.</td>
            </tr>
            <tr>
              <td>Milk Cow</td><td>Livestock</td><td>200 gp</td><td>Large</td><td>30 ft.</td><td>A cow ready to give milk.</td>
            </tr>
            <tr>
              <td>Ox/Bull</td><td>Livestock</td><td>40 gp</td><td>Large</td><td>30 ft.</td><td>An ox or bull trained to haul or pull.</td>
            </tr>
            <tr>
              <td>Pig</td><td>Livestock</td><td>9 gp</td><td>Medium</td><td>20 ft.</td><td>A pig sow, to be raised for meat.</td>
            </tr>
            <tr>
              <td>Sheep</td><td>Livestock</td><td>30 gp</td><td>Medium</td><td>30 ft.</td><td>A sheep that can be raised for wool.</td>
            </tr>
            <tr>
              <td>Goat</td><td>Livestock</td><td>50 gp</td><td>Medium</td><td>40 ft.</td><td>A goat that can be used for milk or meat.</td>
            </tr>
            <tr>
              <td>Elephant</td><td>Livestock</td><td>2250 gp</td><td>Huge</td><td>40 ft.</td><td>A young elephant.</td>
            </tr>
            <tr>
              <td>Chicken</td><td>Livestock</td><td>2 gp</td><td>Tiny</td><td>20 ft.</td><td>An egg laying chicken.</td>
            </tr>
            <tr>
              <td>Goose</td><td>Livestock</td><td>4 gp</td><td>Small</td><td>25 ft. fly 50 ft.</td><td>An egg laying goose.</td>
            </tr>
            <tr>
              <td>Cat</td><td>Livestock</td><td>10 gp</td><td>Tiny</td><td>40 ft., climb 30 ft.</td><td>A mousing cat.</td>
            </tr>
            <tr>
              <td>Wild Beast</td>
              <td>Livestock</td>
              <td>((CR + 1)^2) * 250 gp</td>
              <td>Varies</td>
              <td>Varies</td>
              <td>A captured wild beasts cost is based on the difficulty in capturing and taming it.</td>
            </tr>
          </tbody>
        </table>
        <h3>Tack, Harness, and Drawn Vehicles</h3>
        <table class="table table-striped">
          <thead>
            <tr><th>Item</th><th>Cost</th><th>Weight</th></tr>
          </thead>
          <tbody>
            <tr><td>Barding for Medium Creature</td><td>Armor Price x 2</td><td>Armor Weight</td></tr>
            <tr><td>Barding for Large Creature</td><td>Armor Price x 4</td><td>Armor Weight x 2</td></tr>
            <tr><td>Barding for Huge Creature</td><td>Armor Price x 8</td><td>Armor Weight x 4</td></tr>
            <tr><td>Bit and bridle</td><td>2 gp</td><td>1 lb</td></tr>
            <tr><td>Carraige</td><td>100 gp</td><td>600 lb</td></tr>
            <tr><td>Cart</td><td>15 gp</td><td>200 lb</td></tr>
            <tr><td>Chariot</td><td>250 gp</td><td>100 lb</td></tr>
            <tr><td>Feed (for large grazing animals, per day)</td><td>5 cp</td><td>10 lb</td></tr>
            <tr><td>Saddle, Exotic</td><td>60 gp</td><td>40 lb</td></tr>
            <tr><td>Saddle, Military</td><td>20 gp</td><td>30 lb</td></tr>
            <tr><td>Saddle, Pack</td><td>5 gp</td><td>15 lb</td></tr>
            <tr><td>Saddle, Riding</td><td>10 gp</td><td>25 lb</td></tr>
            <tr><td>Saddlebags</td><td>4 gp</td><td>8 lb</td></tr>
            <tr><td>Sled</td><td>20 gp</td><td>300 lb</td></tr>
            <tr><td>Wagon</td><td>35 gp</td><td>400 lb</td></tr>
          </tbody>
        </table>
        <h3>Waterborne Vehicles</h3>
        <table class="table table-striped">
          <thead>
            <tr><th>Item</th><th>Cost (gp)</th><th>Speed</th><th>Length (feet)</th><th>Minimum Crew</th><th>Capacity (persons)</th><th>Capacity(deadweight)</th></tr>
          </thead>
          <tbody>
            <tr><td>Galley</td><td>30000</td><td>8.5 mph</td><td>60</td><td>50</td><td>150</td><td>400000 lbs</td></tr>
            <tr><td>River Keelboat</td><td>3000</td><td>1 mph</td><td>50</td><td>5</td><td>30</td><td>50000 lbs</td></tr>
            <tr><td>Staelic Longship</td><td>10000</td><td>18 mph</td><td>75</td><td>24</td><td>48</td><td>150000 lbs</td></tr>
            <tr><td>Rowboat</td><td>50</td><td>4 mph</td><td>15</td><td>1</td><td>4</td><td>2000 lbs</td></tr>
            <tr><td>Sailing Cog</td><td>20000</td><td>7 mph</td><td>65</td><td>15</td><td>60</td><td>300000 lbs</td></tr>
            <tr><td>Morrind Clipper</td><td>100000</td><td>20 mph</td><td>225</td><td>40</td><td>160</td><td>1000000 lbs</td></tr>
          </tbody>
        </table>
      </b-tab>
      <b-tab index="6" title="Labor">
        <h3>Labor</h3>
        <p>
          Prices listed are per person per day.
        </p>
        <table class="table table-striped datatable">
          <thead>
            <tr>
              <th>Worker</th><th>Class Level</th><th>In Vicinity of Home</th><th>Adventuring</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Guard/Mercenary</td><td>Level 1 Fighter</td><td>2 gp</td><td>4 gp</td>
            </tr>
            <tr>
              <td>Unskilled Laborer</td><td>Level 1 Commoner</td><td>5 sp (plus materials)</td><td>1 gp (plus materials)</td>
            </tr>
            <tr>
              <td>Artisan</td><td>Level 5 Commoner</td><td>3 gp (plus materials)</td><td>6 gp (plus materials)</td>
            </tr>
            <tr>
              <td>Master Craftsman</td><td>Level 10 Commoner</td><td>5 gp (plus materials)</td><td>10 gp (plus materials)</td>
            </tr>
            <tr>
              <td>Level 1 NPC</td><td>Any PC Class Level 1</td><td>2 gp</td><td>4 gp</td>
            </tr>
            <tr>
              <td>Level 2 NPC</td><td>Any PC Class Level 2</td><td>10 gp</td><td>20 gp</td>
            </tr>
            <tr>
              <td>Level 3 NPC</td><td>Any PC Class Level 3</td><td>20 gp</td><td>40 gp</td>
            </tr>
            <tr>
              <td>Level 4 NPC</td><td>Any PC Class Level 4</td><td>40 gp</td><td>80 gp</td>
            </tr>
            <tr>
              <td>Level 5 NPC</td><td>Any PC Class Level 5</td><td>60 gp</td><td>240 gp</td>
            </tr>
            <tr>
              <td>Level 6 NPC</td><td>Any PC Class Level 6</td><td>90 gp</td><td>360 gp</td>
            </tr>
            <tr>
              <td>Level 7 NPC</td><td>Any PC Class Level 7</td><td>120 gp</td><td>480 gp</td>
            </tr>
            <tr>
              <td>Level 8 NPC</td><td>Any PC Class Level 8</td><td>160 gp</td><td>640 gp</td>
            </tr>
            <tr>
              <td>Level 9 NPC</td><td>Any PC Class Level 9</td><td>200 gp</td><td>1200 gp</td>
            </tr>
            <tr>
              <td>Level 10 NPC</td><td>Any PC Class Level 10</td><td>250 gp</td><td>1500 gp</td>
            </tr>
            <tr>
              <td>Level 11 NPC</td><td>Any PC Class Level 11</td><td>300 gp</td><td>1800 gp</td>
            </tr>
            <tr>
              <td>Level 12 NPC</td><td>Any PC Class Level 12</td><td>360 gp</td><td>2150 gp</td>
            </tr>
            <tr>
              <td>Level 13 NPC</td><td>Any PC Class Level 13</td><td>420 gp</td><td>3300 gp</td>
            </tr>
            <tr>
              <td>Level 14 NPC</td><td>Any PC Class Level 14</td><td>490 gp</td><td>3900 gp</td>
            </tr>
            <tr>
              <td>Level 15 NPC</td><td>Any PC Class Level 15</td><td>560 gp</td><td>4400 gp</td>
            </tr>
            <tr>
              <td>Level 16 NPC</td><td>Any PC Class Level 16</td><td>640 gp</td><td>5000 gp</td>
            </tr>
            <tr>
              <td>Level 17 NPC</td><td>Any PC Class Level 17</td><td>720 gp</td><td>7125 gp</td>
            </tr>
            <tr>
              <td>Level 18 NPC</td><td>Any PC Class Level 18</td><td>810 gp</td><td>8000 gp</td>
            </tr>
            <tr>
              <td>Level 19 NPC</td><td>Any PC Class Level 19</td><td>900 gp</td><td>9000 gp</td>
            </tr>
            <tr>
              <td>Level 20 NPC</td><td>Any PC Class Level 20</td><td>1000 gp</td><td>10000 gp</td>
            </tr>
          </tbody>
        </table>
      </b-tab>
      <b-tab index='7' title="Adventuring Gear">
        <b-row>
          <b-col md="6"></b-col>
          <b-col md="6" class="my-1">
            <b-input-group>
              <b-form-input v-model="equipmenttable.filter" placeholder="Type to Search" />
              <button class="btn btn-primary" :disabled="!equipmenttable.filter" @click="equipmenttable.filter = ''">Clear</button>
            </b-input-group>
          </b-col>
        </b-row>
        <modal id="gearmodal" :modalProps="gearModalProps">
          <p><strong>Cost (gp): </strong>{{ gearModal.Cost }}</p>
          <p><strong>Weight: </strong>{{ gearModal.Weight }}</p>
          <div v-html="marked.parse(gearModal.Description)"></div>
        </modal>
        <b-table show-empty
                 :striped="true" :bordered="false"
                 :responsive="true"
                 stacked="sm"
                 :items="equipment"
                 :fields="equipmenttable.fields"
                 :filter="equipmenttable.filter"
                 :sort-by.sync="equipmenttable.sortBy"
                 :sort-desc.sync="equipmenttable.sortDesc">
          <template v-slot:cell(Item)="row">
            <a :title="row.item.Description" href="#" @click.stop="adventuringGearInfo(row.item, row.index, $event.target)">{{ row.value }}</a>
          </template>
        </b-table>
      </b-tab>
      <b-tab index='8' title="Armor">
        <h3>Armor</h3>
        <p>
          When ordering custom weapons and armor, the 'time cost' refers to the time required by 1 artisan to do the work by himself.  For most complex items, up to 12 workers may work on an item per day (4 working together in 3 shifts), additionally the presence of a master craftsmen allows the work to be completed in half the time.  Thus the minimum time required to create an item by a master craftsmans guild shop is 1/24 the listed time requirement, or changes the unit from days to hours.
        </p>
        <b-row>
          <b-col md="6"></b-col>
          <b-col md="6" class="my-1">
            <b-input-group>
              <b-form-input v-model="armortable.filter" placeholder="Type to Search" />
              <button class="btn btn-primary" :disabled="!armortable.filter" @click="armortable.filter = ''">Clear</button>
            </b-input-group>
          </b-col>
        </b-row>
        <b-table show-empty
                 :striped="true" :bordered="false"
                 :responsive="true"
                 stacked="sm"
                 :items="armor"
                 :fields="armortable.fields"
                 :filter="armortable.filter"
                 :sort-by.sync="armortable.sortBy"
                 :sort-desc.sync="armortable.sortDesc">
        </b-table>
      </b-tab>
      <b-tab index='9' title="Weapons">
        <h3>Weapons</h3>
        <p>
          When ordering custom weapons and armor, the 'time cost' refers to the time required by 1 artisan to do the work by himself.  For most complex items, up to 12 workers may work on an item per day (4 working together in 3 shifts), additionally the presence of a master craftsmen allows the work to be completed in half the time.  Thus the minimum time required to create an item by a master craftsmans guild shop is 1/24 the listed time requirement, or changes the unit from days to hours.
        </p>
        <b-row>
          <b-col md="6"></b-col>
          <b-col md="6" class="my-1">
            <b-input-group>
              <b-form-input v-model="weapontable.filter" placeholder="Type to Search" />
              <button class="btn btn-primary" :disabled="!weapontable.filter" @click="weapontable.filter = ''">Clear</button>
            </b-input-group>
          </b-col>
        </b-row>
        <b-table show-empty
                 :striped="true" :bordered="false"
                 :responsive="true"
                 stacked="sm"
                 :items="weapons"
                 :fields="weapontable.fields"
                 :filter="weapontable.filter"
                 :sort-by.sync="weapontable.sortBy"
                 :sort-desc.sync="weapontable.sortDesc">
        </b-table>
      </b-tab>
      <b-tab index='10' title="Advanced Weapons">
        <h3>Advanced Weapons (Homebrew)</h3>
        <p>
          This is an alternative weapons table. If used for a campaign it should entirely replace the main weapons table. MOST weapons have been altered from their original in significant ways. Every effort has been made to balance these weapons against each other, and to make every weapon unique and special in some way. Homwever, the average utility of weapons has been increased over the base game. This was done purposefully to help martial characters keep pace in mid to late levels. I strongly recommend pairing this with a few other rules changes as well:
        </p>
        <p>Increase the die size for classes who use a special weapon as their primary weapon. Specifically:</p>
        <ol>
          <li>Barbarian - Path of the Beast - Form of the Beast. Tail and Bite become 1d10, Claws become 1d8</li>
          <li>Artifier - Armorer - Armor Model. Thunder Gauntlet becomes 1d10, Lightning Launcher becomes 1d8</li>
          <li>Monk - All - Martial arts. Die size increase by 1 (So 1d4 becomes 1d6, 1d6 becomes 1d8, 1d8 becomes 1d10, 1d10 becomes 1d12)</li>
          <li>Rogue - Soulknife - Psychic Blades. Main attack becomes 1d8, bonus action attack becomes 1d6.</li>
        </ol>
        <p><strong>Natural weapons for animals and monsters (even when it is your Druid wild shaping) should remain unchanged. Only apply this to creatures that use manufactured weapons (such as Orcs).</strong></p>
        <h4>Weapons</h4>
        <input type="text" class="form-control" v-model="homebrewweaponstable.filter" placeholder="Filter" />
        <table class="table table-striped table-responsive">
          <thead>
            <th v-for="field in homebrewweaponstable.fields">
              <a href="#" @click.stop="changehwSort(field.key)">{{ field.label }}
                <span v-if="homebrewweaponstable.sortBy == field.key && homebrewweaponstable.sortDesc == false">&uarr;</span>
                <span v-if="homebrewweaponstable.sortBy == field.key && homebrewweaponstable.sortDesc == true">&darr;</span>
              </a>
            </th>
          </thead>
          <tbody>
            <tr v-for="weapon in fhweapons" :key="weapon.Weapon">
              <td>{{ weapon.Weapon }}</td>
              <td>{{ weapon.Type }}</td>
              <td>{{ weapon.Damage }}</td>
              <td>{{ weapon.DType }}</td>
              <td>{{ weapon.Properties }}</td>
              <td>{{ weapon.Cost }} gp</td>
              <td>{{ weapon.Weight }} lbs</td>
              <td><span v-if="weapon.Reach > 0">{{ weapon.Reach }} ft</span><span v-else>-</span></td>
              <td><span v-if="weapon.Range > 0">{{ weapon.Range }}/{{ weapon.Range * 3 }} ft</span><span v-else>-</span></td>
            </tr>
          </tbody>
        </table>
        <h4>Property Definitions</h4>
        <table class="table table-striped">
          <thead>
            <tr><th>Property</th><th>Effect Cost</th><th>Effect</th></tr>
          </thead>
          <tbody>
            <tr><td>Finesse</td><td>1</td><td>Can use your choice of dexterity or strength for the attack and damage rolls with this weapon.</td></tr>
            <tr><td>Ranged</td><td>0</td><td>Attacks with this weapon are made with disadvantage when within 5 ft of a hostile character. You use dexterity for attack and damage rolls with this weapon.</td></tr>
            <tr><td>Ammunition</td><td>0</td><td>This weapon requires ammunition of an appropriate type in order to be used.</td></tr>
            <tr><td>Versatile</td><td>0.5</td><td>This weapon uses a damage die one size larger when wielded in two hands. 1d4 becomes 1d6, 1d6 becomes 1d8, 1d8 becomes 1d10, and 1d10 becomes 1d12.</td></tr>
            <tr><td>Heavy</td><td>0</td><td>This weapon is too large and unwieldy for small characters to use effectively, and they have disadvantage on attack rolls while using it.</td></tr>
            <tr><td>Two-handed</td><td>-1</td><td>This weapon requires 2 hands to wield effectively</td></tr>
            <tr><td>Light</td><td>0.5</td><td>This weapon is light and well balanced enough to use one in each hand.</td></tr>
            <tr><td>Thrown</td><td>0</td><td>This weapon can be used to make a ranged attack by throwing it.</td></tr>
            <tr><td>Knock down</td><td>1</td><td>After hitting an opponent with this weapon you can choose to attempt to knock them down with it. If you do so, make a strength (athletics) check opposed by either a strength (athletics) or a dexterity (acrobatics) check by the opponent. On a success you knock the opponent prone.</td></tr>
            <tr><td>Brutal</td><td>1</td><td>This weapon does one extra die of its damage type on a critical hit. So a weapon that does 2d6 damage would deal 5d6 damage on a critical hit, and a weapon that does 1d12 damage would do 3d12 damage on a critical hit. This stacks with the Brutal Critical feature.</td></tr>
            <tr><td>Grapple</td><td>1</td><td>This weapon has the ability to entangle a foe, preventing them from moving. After hitting an opponent with this weapon you can choose to make a strength (athletics) check opposed by either a strength (athletics) or dexterity (acrobatics) check by the opponent. On a success the target is grappled. While the target is grappled in this way you cannot use the weapon to attack until you release the grapple, and if you drop the weapon the grapple is released automatically.</td></tr>
            <tr><td>Loading</td><td>-1</td><td>This weapon takes time to load and can only be used to make 1 attack per round.</td></tr>
            <tr><td>Net special</td><td>6</td><td>When you hit a target with this weapon they are restrained. The target can make a strength (athletics) check or a dexterity (acrobatics) check as an action with a DC of 10 to escape the net.</td></tr>
            <tr><td>Concealable</td><td>0.5</td><td>This weapon is easily concealed in a pocket, boot, or other unobtrusive place such that it is not obvious without a bodily search.</td></tr>
            <tr><td>STR 13 Required</td><td>-2</td><td>This weapon cannot be wielded unless the user has a strength score of at least 13.</td></tr>
            <tr><td>expanded critical</td><td>1.5</td><td>This weapon has an increased chance of a critical hit. Attacks with this weapon are a critical hit on a roll of 19 or 20 on the die. This stacks with other features that increase the range of a critical hit. So a champion fighter with the improved critical feature would score a critical hit on an 18, 19 or 20, or at level 17+ on a roll of 17, 18, 19, or 20</td></tr>
            <tr><td>Awkward</td><td>-1</td><td>This weapon is unwieldy at close range. Attacks with this weapon have disadvantage to hit opponents within 5 ft.</td></tr>
            <tr><td>Poison</td><td>1.5</td><td>This weapon's ammunition is coated with simple poisons. Those hit by this weapon must make a DC 12 Constitution save or suffer the poisoned condition for one round.</td></tr>
            <tr><td>Common</td><td>0.5</td><td>This weapon is exceedingly common and generally seen as a tool by figures of authority, rather than a weapon.</td></tr>
            <tr><td>Versatile Damage</td><td>0.5</td><td>This weapon can attack in different ways, doing different damage types depending on how it is used.</td></tr>
            <tr><td>Armor</td><td>2</td><td>This weapon is also armor, or is part of a suit of armor.</td></tr>
          </tbody>
        </table>
        <h4>Creating New Weapons</h4>
        <p>The weapons above were balanced using a points system, with each weapon having a value of 8 points. The formula is: <strong>Average Damage + Reach + Range + Properties + Type Modifier.</strong></p>
        <ul>
          <li>Average Damage. This is the average roll of the damage dice the weapon uses. So 1d4 = 2.5, 1d6 = 3.5, 1d8 = 4.5, etc.</li>
          <li>Reach. A 5 ft reach melee attack adds 1 pt, a 10 ft reach adds 2, and a 15 ft reach adds 3.5.</li>
          <li>Range. Every 50 ft of range for ranged attacks adds 1 pt (25 ft adds 0.5 pts).</li>
          <li>Properties. Sum the value of all the properties in the table above that apply to your weapon.</li>
          <li>Type Modifier. Martial weapons should in general be better than simple weapons, add 1.5 to the score of a simple weapon.</li>
        </ul>
        <p><strong>Example: </strong>The dagger does 1d4 damage (2.5 pts), has a 5 ft reach (1 pt), a 25 ft base range (0.5 pts), the finesse (1 pt), light (0.5 pts), concealable (0.5 pts), common (0.5 pts), and thrown properties, and is a simple weapon. So the formula is 2.5 + 1 + 0.5 + 2.5 + 1.5 = 8.</p>
        <p><strong>Example 2: </strong>The heavy crossbow does 2d6 damage (7 pts), has a 0 ft reach (not a melee weapon), a 150 range (3 pts), the ranged, ammunition, loading (-1 pt), heavy, and two-handed (-1 pt) properties, and is a martial weapon. So the formula is 7 + 0 + 3 + -2 + 0 = 8.</p>
      </b-tab>
    </b-tabs>
  </div>
</template>
<script src="./js/quick.js"></script>
<style src="./scss/quick.scss" lang="scss" scoped></style>
