<template>
  <div>
    <b-tabs>
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
              <th><a href="#" @click.stop="spelltable.sortBy = 'title'; spelltable.sortDesc = !spelltable.sortDesc;">Title</a></th>
              <th><a href="#" @click.stop="spelltable.sortBy = 'level'; spelltable.sortDesc = !spelltable.sortDesc;">Level</a></th>
              <th><a href="#" @click.stop="spelltable.sortBy = 'school'; spelltable.sortDesc = !spelltable.sortDesc;">School</a></th>
              <th><a href="#" @click.stop="spelltable.sortBy = 'castingTime'; spelltable.sortDesc = !spelltable.sortDesc;">Casting Time</a></th>
              <th><a href="#" @click.stop="spelltable.sortBy = 'duration'; spelltable.sortDesc = !spelltable.sortDesc;">Duration</a></th>
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
      <b-tab index="1" title="What is a Spell?">
        <h2>What is a Spell?</h2>
        <p>
          A spell is a discrete magical effect, a single shaping of the magical energies that suffuse the multiverse into a specific, limited expression. In casting a spell, a character carefully plucks at the invisible strands of raw magic suffusing the world, pins them in place in a particular pattern, sets them vibrating in a specific way, and then releases them to unleash the desired effect—in most cases, all in the span of seconds.
        </p>
        <p>
          Spells can be versatile tools, weapons, or protective wards. They can deal damage or undo it, impose or remove conditions, drain life energy away, and restore life to the dead.
        </p>
        <p>
          Uncounted thousands of spells have been created over the course of the multiverse’s history, and many of them are long forgotten. Some might yet lie recorded in crumbling spellbooks hidden in ancient ruins or trapped in the minds of dead gods. Or they might someday be reinvented by a character who has amassed enough power and wisdom to do so.
        </p>
        <h4>Spell Level</h4>
        <p>
          Every spell has a level from 0 to 9. A spell’s level is a general indicator of how powerful it is, with the lowly (but still impressive) magic missile at 1st level and the earth-shaking wish at 9th. Cantrips—simple but powerful spells that characters can cast almost by rote—are level 0. The higher a spell’s level, the higher level a spellcaster must be to use that spell.
        </p>
        <p>
          Spell level and character level don’t correspond directly. Typically, a character has to be at least 17th level, not 9th level, to cast a 9th-level spell.
        </p>
        <h4>Known and Prepared Spells</h4>
        <p>
          Before a spellcaster can use a spell, he or she must have the spell firmly fixed in mind, or must have access to the spell in a magic item. Members of a few classes, including bards and sorcerers, have a limited list of spells they know that are always fixed in mind. The same thing is true of many magic-using monsters. Other spellcasters, such as clerics and wizards, undergo a process of preparing spells. This process varies for different classes, as detailed in their descriptions.
        </p>
        <p>
          In every case, the number of spells a caster can have fixed in mind at any given time depends on the character’s level.
        </p>
        <h5>Casting in Armor</h5>
        <p>
          Because of the mental focus and precise gestures required for spellcasting, you must be proficient with the armor you are wearing to cast a spell. You are otherwise too distracted and physically hampered by your armor for spellcasting.
        </p>
        <h4>Spell Slots</h4>
        <p>
          Regardless of how many spells a caster knows or prepares, he or she can cast only a limited number of spells before resting. Manipulating the fabric of magic and channeling its energy into even a simple spell is physically and mentally taxing, and higher-level spells are even more so. Thus, each spellcasting class’s description (except that of the warlock) includes a table showing how many spell slots of each spell level a character can use at each character level. For example, the 3rd-level wizard Umara has four 1st-level spell slots and two 2nd-level slots.
        </p>
        <p>
          When a character casts a spell, he or she expends a slot of that spell’s level or higher, effectively “filling” a slot with the spell. You can think of a spell slot as a groove of a certain size—small for a 1st-level slot, larger for a spell of higher level. A 1st-level spell fits into a slot of any size, but a 9th-level spell fits only in a 9th-level slot. So when Umara casts magic missile, a 1st-level spell, she spends one of her four 1st-level slots and has three remaining.
        </p>
        <p>
          Finishing a long rest restores any expended spell slots.
        </p>
        <p>
          Some characters and monsters have special abilities that let them cast spells without using spell slots. For example, a monk who follows the Way of the Four Elements, a warlock who chooses certain eldritch invocations, and a pit fiend from the Nine Hells can all cast spells in such a way.
        </p>
        <h5>Casting a Spell at a Higher Level</h5>
        <p>
          When a spellcaster casts a spell using a slot that is of a higher level than the spell, the spell assumes the higher level for that casting. For instance, if Umara casts magic missile using one of her 2nd-level slots, that magic missile is 2nd level. Effectively, the spell expands to fill the slot it is put into.
        </p>
        <p>
          Some spells, such as magic missile and cure wounds, have more powerful effects when cast at a higher level, as detailed in a spell’s description.
        </p>
        <h4>Cantrips</h4>
        <p>
          A cantrip is a spell that can be cast at will, without using a spell slot and without being prepared in advance. Repeated practice has fixed the spell in the caster’s mind and infused the caster with the magic needed to produce the effect over and over. A cantrip’s spell level is 0.
        </p>
        <h4>Rituals</h4>
        <p>
          Certain spells have a special tag: ritual. Such a spell can be cast following the normal rules for spellcasting, or the spell can be cast as a ritual. The ritual version of a spell takes 10 minutes longer to cast than normal. It also doesn’t expend a spell slot, which means the ritual version of a spell can’t be cast at a higher level.
        </p>
        <p>
          To cast a spell as a ritual, a spellcaster must have a feature that grants the ability to do so. The cleric and the druid, for example, have such a feature. The caster must also have the spell prepared or on his or her list of spells known, unless the character’s ritual feature specifies otherwise, as the wizard’s does.
        </p>
      </b-tab>
      <b-tab index="2" title="Casting a Spell">
        <h2>Casting a Spell</h2>
        <p>
          When a character casts any spell, the same basic rules are followed, regardless of the character’s class or the spell’s effects.
        </p>
        <p>
          Each spell description in chapter 11 begins with a block of information, including the spell’s name, level, school of magic, casting time, range, components, and duration. The rest of a spell entry describes the spell’s effect.
        </p>
        <h4>Casting Time</h4>
        <p>
          Most spells require a single action to cast, but some spells require a bonus action, a reaction, or much more time to cast.
        </p>
        <h5>Bonus Action</h5>
        <p>
          A spell cast with a bonus action is especially swift. You must use a bonus action on your turn to cast the spell, provided that you haven’t already taken a bonus action this turn. You can’t cast another spell during the same turn, except for a cantrip with a casting time of 1 action.
        </p>
        <h5>Reactions</h5>
        <p>
          Some spells can be cast as reactions. These spells take a fraction of a second to bring about and are cast in response to some event. If a spell can be cast as a reaction, the spell description tells you exactly when you can do so.
        </p>
        <h5>Longer Casting Times</h5>
        <p>
          Certain spells (including spells cast as rituals) require more time to cast: minutes or even hours. When you cast a spell with a casting time longer than a single action or reaction, you must spend your action each turn casting the spell, and you must maintain your concentration while you do so (see “Concentration” below). If your concentration is broken, the spell fails, but you don’t expend a spell slot. If you want to try casting the spell again, you must start over.
        </p>
        <h4>Range</h4>
        <p>
          The target of a spell must be within the spell’s range. For a spell like magic missile, the target is a creature. For a spell like fireball, the target is the point in space where the ball of fire erupts.
        </p>
        <p>
          Most spells have ranges expressed in feet. Some spells can target only a creature (including you) that you touch. Other spells, such as the shield spell, affect only you. These spells have a range of self.
        </p>
        <p>
          Spells that create cones or lines of effect that originate from you also have a range of self, indicating that the origin point of the spell’s effect must be you (see "Areas of Effect").
        </p>
        <p>
          Once a spell is cast, its effects aren’t limited by its range, unless the spell’s description says otherwise.
        </p>
        <h4>Components</h4>
        <p>
          A spell’s components are the physical requirements you must meet in order to cast it. Each spell’s description indicates whether it requires verbal (V), somatic (S), or material (M) components. If you can’t provide one or more of a spell’s components, you are unable to cast the spell.
        </p>
        <h5>Verbal (V)</h5>
        <p>
          Most spells require the chanting of mystic words. The words themselves aren’t the source of the spell’s power; rather, the particular combination of sounds, with specific pitch and resonance, sets the threads of magic in motion. Thus, a character who is gagged or in an area of silence, such as one created by the silence spell, can’t cast a spell with a verbal component.
        </p>
        <h5>Somatic (S)</h5>
        <p>
          Spellcasting gestures might include a forceful gesticulation or an intricate set of gestures. If a spell requires a somatic component, the caster must have free use of at least one hand to perform these gestures.
        </p>
        <h5>Material (M)</h5>
        <p>
          Casting some spells requires particular objects, specified in parentheses in the component entry. A character can use a component pouch or a spellcasting focus in place of the components specified for a spell. But if a cost is indicated for a component, a character must have that specific component before he or she can cast the spell.
        </p>
        <p>
          If a spell states that a material component is consumed by the spell, the caster must provide this component for each casting of the spell.
        </p>
        <p>
          A spellcaster must have a hand free to access these components, but it can be the same hand that he or she uses to perform somatic components.
        </p>
        <h4>Duration</h4>
        <p>
          A spell's duration is the length of time the spell persists. A duration can be expressed in rounds, minutes, hours, or even years. Some spells specify that their effects last until the spells are dispelled or destroyed.
        </p>
        <h5>Instantaneous</h5>
        <p>
          Many spells are instantaneous. The spell harms, heals, creates, or alters a creature or an object in a way that can’t be dispelled, because its magic exists only for an instant.
        </p>
        <h5>Concentration</h5>
        <p>
          Some spells require you to maintain concentration in order to keep their magic active. If you lose concentration, such a spell ends.
        </p>
        <p>
          If a spell must be maintained with concentration, that fact appears in its Duration entry, and the spell specifies how long you can concentrate on it. You can end concentration at any time (no action required).
        </p>
        <p>
          Normal activity, such as moving and attacking, doesn’t interfere with concentration. The following factors can break concentration:
        </p>
        <ul>
          <li><strong>Casting another spell that requires concentration.</strong> You lose concentration on a spell if you cast another spell that requires concentration. You can’t concentrate on two spells at once.</li>
          <li><strong>Taking damage.</strong> Whenever you take damage while you are concentrating on a spell, you must make a Constitution saving throw to maintain your concentration. The DC equals 10 or half the damage you take, whichever number is higher. If you take damage from multiple sources, such as an arrow and a dragon’s breath, you make a separate saving throw for each source o f damage.</li>
          <li><strong>Being incapacitated or killed.</strong> You lose concentration on a spell if you are incapacitated or if you die.</li>
        </ul>
        <p>
          The DM might also decide that certain environmental phenomena, such as a wave crashing over you while you’re on a storm-tossed ship, require you to succeed on a DC 10 Constitution saving throw to maintain concentration on a spell.
        </p>
        <h4>Targets</h4>
        <p>
          A typical spell requires you to pick one or more targets to be affected by the spell’s magic. A spell's description tells you whether the spell targets creatures, objects, or a point of origin for an area of effect (described below).
        </p>
        <p>
          Unless a spell has a perceptible effect, a creature might not know it w as targeted by a spell at all. An effect like crackling lightning is obvious, but a more subtle effect, such as an attempt to read a creature’s thoughts, typically goes unnoticed, unless a spell says otherwise.
        </p>
        <h5>A Clear Path to the Target</h5>
        <p>
          To target something, you must have a clear path to it, so it can’t be behind total cover.
        </p>
        <p>
          If you place an area of effect at a point that you can’t see and an obstruction, such as a wall, is between you and that point, the point of origin comes into being on the near side of that obstruction.
        </p>
        <h5>Targeting Yourself</h5>
        <p>
          If a spell targets a creature o f your choice, you can choose yourself, unless the creature must be hostile or specifically a creature other than you. If you are in the area of effect o f a spell you cast, you can target yourself.
        </p>
        <h4>Areas of Effect</h4>
        <p>
          Spells such as burning hands and cone of cold cover an area, allowing them to affect multiple creatures at once.
        </p>
        <p>
          A spell’s description specifies its area of effect, which typically has one of five different shapes: cone, cube, cylinder, line, or sphere. Every area of effect has a point of origin, a location from which the spell’s energy erupts. The rules for each shape specify how you position its point of origin. Typically, a point of origin is a point in space, but some spells have an area whose origin is a creature or an object.
        </p>
        <p>
          A spell’s effect expands in straight lines from the point of origin. If no unblocked straight line extends from the point of origin to a location within the area of effect, that location isn’t included in the spell’s area. To block one of these imaginary lines, an obstruction must provide total cover.
        </p>
        <h5>Cone</h5>
        <p>
          A cone extends in a direction you choose from its point of origin. A cone's width at a given point along its length is equal to that point’s distance from the point of origin. A cone’s area of effect specifies its maximum length.
        </p>
        <p>
          A cone's point of origin is not included in the cone's area of effect, unless you decide otherwise.
        </p>
        <h5>Cube</h5>
        <p>
          You select a cube's point of origin, which lies anywhere on a face of the cubic effect. The cube’s size is expressed as the length of each side.
        </p>
        <p>
          A cube’s point of origin is not included in the cube’s area of effect, unless you decide otherwise.
        </p>
        <h5>Cylinder</h5>
        <p>
          A cylinder’s point of origin is the center of a circle of a particular radius, as given in the spell description. The circle must either be on the ground or at the height of the spell effect. The energy in a cylinder expands in straight lines from the point of origin to the perimeter of the circle, forming the base of the cylinder. The spell’s effect then shoots up from the base or down from the top, to a distance equal to the height of the cylinder.
        </p>
        <p>
          A cylinder’s point of origin is included in the cylinder’s area of effect.
        </p>
        <h5>Line</h5>
        <p>
          A line extends from its point of origin in a straight path up to its length and covers an area defined by its width.
        </p>
        <p>
          A line’s point of origin is not included in the line’s area of effect, unless you decide otherwise.
        </p>
        <h5>Sphere</h5>
        <p>
          You select a sphere’s point of origin, and the sphere extends outward from that point. The sphere’s size is expressed as a radius in feet that extends from the point.
        </p>
        <p>
          A sphere’s point of origin is included in the sphere’s area of effect.
        </p>
        <h4>Saving Throws</h4>
        <p>
          Many spells specify that a target can make a saving throw to avoid some or all of a spell’s effects. The spell specifies the ability that the target uses for the save and what happens on a success or failure.
        </p>
        <p>
          The DC to resist one of your spells equals 8 + your spellcasting ability modifier + your proficiency bonus + any special modifiers.
        </p>
        <h4>Attack Rolls</h4>
        <p>
          Some spells require the caster to make an attack roll to determine whether the spell effect hits the intended target. Your attack bonus with a spell attack equals your spellcasting ability modifier + your proficiency bonus.
        </p>
        <p>
          Most spells that require attack rolls involve ranged attacks. Remember that you have disadvantage on a ranged attack roll if you are within 5 feet of a hostile creature that can see you and that isn’t incapacitated.
        </p>
        <h4>Combining Magical Effects</h4>
        <p>
          The effects of different spells add together while the durations of those spells overlap. The effects of the same spell cast multiple times don't combine, however. Instead, the most potent effect—such as the highest bonus—from those castings applies while their durations overlap.
        </p>
        <p>
          For example, if two clerics cast bless on the same target, that character gains the spell’s benefit only once; he or she doesn’t get to roll two bonus dice.
        </p>
      </b-tab>
      <b-tab index="3" title="Magic in Elthelas">
       <p>
          In our world we are familiar with the 4 fundamental forces.  The strong nuclear force, weak nuclear force, electromagnetic force, and gravitational force.  These forces account for everything in our universe.  In the universe of Elthelas and D&amp;D there are additional forces that act on the universe, namely, the divine force, and the arcane force.
        </p>
        <h4>The Arcane Force</h4>
        <p>
          The arcane force is emitted by arcanum, a rare material that is in fact a unique subatomic particle that is attracted to itself, and reacts to intentionality (a manifestation of the divine force) by emitting forces of its own on standard matter.  Most of the universes arcanum is noninteractive, and forms a barrier between the many "planes" of existence.  It is theorized that in ancient days the Gods built these walls of Arcanum to create greater order in the universe by separating arcanum from ordinary matter, allowing the divine force to act without causing unpredictable side effects.  However, philosophers have postulated that this theory may have a fundamental flaw, as the large collection of divine force necessary to form a God would have created massive chain reactions in a universe where Arcanum was more evenly distributed, likely dispersing the divine force in the process.
        </p>
        <p>
          Most accessible arcanum in the universe is found in crystal-like deposits.  Sometimes these deposits are buried in rock, sometimes they are free-floating, and on occasion they even fall from space.  Gravity appears to act on the deposits normally, but the other forces can have unpredictable results on a deposit of Arcanum.  Wizards have learned how to focus their divine soul to interact with arcanum deposits to produce predictable results, typically through a series of spoken chants and gestures, and sometimes by introducing other forms of matter that the arcane force can act on. The ability to produce increasingly powerful effects requires increasingly large deposits of arcanum (although it is not consumed in the process) however, repeated use of an arcanum crystal attracts free particles of arcanum, incrementally increasing the size of the crystal, and allowing more powerful magic to be cast with it (in game this is represented through a wizard or other arcane casters experience level).  Certain creatures and people have arcanum in their blood (such as dragons and sorcerers) this allows them to produce magical effects without an outside source of arcanum, but because they cannot inscribe on the arcanum, the number of effects they are able to produce is limited by the power of their divine spark. It is common practice among the bardic colleges to artificially infuse the blood with a small amount of arcanum so that the student can produce effects to dazzle and awe their audiences.
        </p>
        <p>
          Because Arcanum is self-attractive, events of massive magical significance can cause arcanum to congregate in a particular area. This leaves the area prone to strange occurrances. Occasionally some of the arcanum attracted leaks from the planar boundaries themselves, introducing new raw arcanum to the material plane, and a weak point into the boundary between worlds, often manifested as a portal or through the random passing back and forth of creatures between planes at that location.
        </p>
        <h4>The Divine Force</h4>
        <p>
          The divine force is the manifestation of life itself, and can be generative or destructive, manifested in positive and negative energy.  The divine force has a unique ability to interact with organic compounds, causing them to react in a predictable (though complex) manner.  Every living thing is endowed with a certain amount of divine force.  The Gods are beings endowed with massive amounts of divine force.  The divine force is self-replenishing with time, such that creatures that use the divine force to produce some effect are drained for a time, but gain it back.  The divine force can also be granted to others (with training) although this weakens the one who grants it slightly.  Most mortals would die if they gave away their divine force, however, Gods give it to their chosen clerics and paladins regularly.  Druids and rangers draw divine force in small amounts from living things around them in the world, such as plants and animals.
        </p>
        <p>
          Both the negative and positive divine forces can be used to grant or destroy life, however they naturally repel one another. Further, it has been found that whether ones soul acts with the negative or positive force is determined by the sorts of things one does.  This has created the natural 'good', 'evil' dichotomy in the universe, as those who choose 'evil' acts emit a force that is naturally repulsive towards those who commit 'good' acts, however in most cases the force is too weak to act at any distance from the individual, and thus this repulsion is undetectable by normal means.
        </p>
        <h2>The Schools of Magic</h2>
        <h4>Abjuration</h4>
        <p>
          Abjuration is the use of the arcane or divine force to create barriers. This includes creating and restoring the barriers between the planes, which includes banishment effects.  Dispelling effects and anti-magic fields are fields that remove or dampen the effects of arcanum or the divine spark, usually by creating a barrier that emits the dampening force that moves outward.
        </p>
        <h4>Conjuration</h4>
        <p>
          Conjuration magic is the use of one of the forces to pierce the planar barriers and, usually, bring something across the gap. This can be anything from energy (such as in an orb of fire spell) to a living creature, to small amounts of divine force (such as in healing spells).
        </p>
        <h4>Divination</h4>
        <p>
          Divination magic is the use of the forces to transmit energy over great distances, the energy transmitted can usually only be very small, and thus it is typically used for observational purposes.
        </p>
        <h4>Enchantment</h4>
        <p>
          Enchantment is the use of the forces to manipulate the minds of others.  This is a delicate and difficult process, and often can only be done in broad strokes.  However, most good societies consider the use of enchantment magic on unwilling individuals to be a violation of personal freedom, and additionally it can leave lasting, and sometimes unpredictable, side effects.
        </p>
        <h4>Evocation</h4>
        <p>
          Evocation is the direct application of arcane or divine force, sometimes to create other energy effects, and sometimes to simply apply force directly.
        </p>
        <h4>Illusion</h4>
        <p>
          Illusion is the use of arcane or divine force to manipulate sound waves, light, and sometimes even smell.  It is a school that often requires a great deal of skill and finesse, but not necessarily a lot of power.
        </p>
        <h4>Necromancy</h4>
        <p>
          Necromancy is an attempt to transfer the divine force from one creature to another, to animate non-living creatures, or tap directly into the positive and negative energy planes.
        </p>
        <h4>Transmutation</h4>
        <p>
          Transmutation is the use of arcane or divine force to actively alter physical forms or infuse them with energy.  It is usually a temporary effect as it is very difficult to overcome a living objects morphic resonance (a manifestation of the divine force that remembers a natural form, this is why healing spells infuse a person with a small amount of additional divine force, it strengthens their morphic resonance allowing them to heal faster).
        </p>
        <h3>Rule Differences</h3>
        <p>
          Prepared Arcane Spells - Arcane casters that would prepare spells with a spell book in official D&amp;D rules instead carry with them a piece of arcanum crystal on which they have inscribed their known spells.  They prepare spells by communing with the arcanum crystal and creating resonances in the crystal that can be tapped later to cast the spell (usually through a keyword and gesture, but sometimes just one or the other, or sometimes also requiring a component of some sort).  Inscribing a spell onto the crystal does not cost anything besides the knowledge of how the spell works.  Although scrolls are very expensive.
        </p>
        <p>
          Scrolls - scrolls are documents written with special ink that has been infused with arcanum crystal.  The act of casting the spell usually emits enough local energy to cause the paper to catch fire, thus making them impractical to reuse.  There are no divine scrolls, as divine force cannot be stored in ink or paper without powerful necromancy.
        </p>
        <p>
          Potions - potions are drinkable liquids that have been infused with arcanum crystal already resonating with a particular spell, or infused with organic matter (often something simple and harmless, like sugar) that has been blessed by a diety.
        </p>
        <p>
          Wands - wands are pieces of wood or metal with a small amount of attuned arcanum crystal and a special crystal that draws in and stores ambient divine energy. By combining the two a magical effect can be produced without any input of divine energy by the user.
        </p>
    
        <h3>Wizards</h3>
        <p>
          Wizards don't have a spell book in the traditional sense, rather they keep an arcanum crystal (which can be integrated into other items
          such as a staff, wand, amulet, ring, or shield) that accumulates free arcanum over time.  Adding a new spell through means besides leveling
          up involves the purchase of arcanum dust, which is then attuned to the new spell by communing with the scroll, crystal, or other arcane
          caster from whom you are learning the spell.  This arcanum dust then fuses with ones existing arcanum crystal.  Only spells whose attuned
          arcanum lies near the surface of the crystal can be cast, meaning changing ones prepared spells involves communing with ones crystal to
          literally rearrange the structure of the crystal.
        </p>
        <p>
          One's arcanum crystal, or whatever it is attached to, acts as your arcane focus.
        </p>
        <p>
          Attuned arcanum crystal glows faintly in colors related to the spells prepared. So a crystal of a wizard with all necromancy spells prepared
          may be a deep black, while one of an evoker might have a red spot for his fireball spell, a white one for his ice storm spell and so on.
        </p>
        <h3>Sorcerers and Bards</h3>
        <p>
          Sorcerers and Bards typically have arcanum crystal that flows through their blood, although some bards have it integrated in colorful ways
          on their instruments instead.  How it got there can vary, certain sorcerers simply inherit such casting ability from their mothers,
          when arcanum crosses the placental barrier, while others who are seeking sorcerous power simply inject themselves (or are injected) with suspended arcanum
          dust, a risky procedure that often kills the recipient.
        </p>
        <h3>Divine Casters</h3>
        <p>
          Divine casters do not use arcanum, but rather borrow divine force from powerful entities, be them Gods or nature itself.
        </p>       
      </b-tab>
    </b-tabs>
  
  </div>
</template>
<script src="./js/magic.js"></script>
<style src="./scss/magic.scss" lang="scss" scoped></style>
