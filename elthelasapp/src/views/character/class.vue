<template>
  <div>
    <p>
      This page lists custom class descriptions for classes available in the Elthelas Campaign Setting.  As well as optional changes to existing classes
      for balance reasons.
    </p>
    <ul class="list-inline">
      <li class="list-inline-item" v-for="cls in classes" :key="cls.name"><button @click="shownClass = cls" class="racebutton btn btn-primary">{{cls.name}}</button></li>
    </ul>
    <div id="raceDetails" v-if="shownClass.name">
      <h1>{{ shownClass.name }}</h1>
      <table class="table table-striped table-sm">
        <thead>
          <tr><th>Level</th><th>Proficiency</th><th>Features</th><th v-for="res in tableResources" :key="res.name">{{ res.name }}</th><th v-if="shownClass.cantrips">Cantrips</th>
          <th v-if="getSlotsByLevel(1,20)">1st</th><th v-if="getSlotsByLevel(1,20)">2nd</th><th v-if="getSlotsByLevel(1,20)">3rd</th>
          <th v-if="getSlotsByLevel(1,20)">4th</th><th v-if="getSlotsByLevel(1,20)">5th</th><th v-if="getSlotsByLevel(1,20)">6th</th>
          <th v-if="getSlotsByLevel(1,20)">7th</th><th v-if="getSlotsByLevel(1,20)">8th</th><th v-if="getSlotsByLevel(1,20)">9th</th></tr>
        </thead>
        <tbody>
          <tr v-for="num in 20" :key="num">
            <td>{{ num }}</td>
            <td>+{{ Math.floor((num - 1)/4 + 2) }}</td>
            <td>{{ getFeaturesByLevel(num).str }}</td>
            <td v-for="res in tableResources" :key="res.name">{{ getResCount(res, num) }}</td>
            <td v-if="shownClass.cantrips">{{ getCantripCount(num) }}</td>
            <td v-if="getSlotsByLevel(1,20)">{{  getSlotsByLevel(1, num) }}</td>
            <td v-if="getSlotsByLevel(1,20)">{{  getSlotsByLevel(2, num) }}</td>
            <td v-if="getSlotsByLevel(1,20)">{{  getSlotsByLevel(3, num) }}</td>
            <td v-if="getSlotsByLevel(1,20)">{{  getSlotsByLevel(4, num) }}</td>
            <td v-if="getSlotsByLevel(1,20)">{{  getSlotsByLevel(5, num) }}</td>
            <td v-if="getSlotsByLevel(1,20)">{{  getSlotsByLevel(6, num) }}</td>
            <td v-if="getSlotsByLevel(1,20)">{{  getSlotsByLevel(7, num) }}</td>
            <td v-if="getSlotsByLevel(1,20)">{{  getSlotsByLevel(8, num) }}</td>
            <td v-if="getSlotsByLevel(1,20)">{{  getSlotsByLevel(9, num) }}</td>
          </tr>
        </tbody>
      </table>
      <h2>Class Features</h2>
      <h4>Hit Points</h4>
      <p>
        <strong>Hit Dice: </strong>1d{{shownClass.hitdie}} per {{shownClass.name}} level<br />
        <strong>Hit Points at 1st Level: </strong> {{shownClass.hitdie}} + your Constitution modifier <br />
        <strong>Hit Points at Higher Levels: </strong> {{shownClass.hitdie/2 + 1}} + your Constitution modifier per {{shownClass.name}} level after 1st.
      </p>
      <h4>Proficiencies</h4>
      <p>
        <strong>Armor: </strong>{{ shownClass.proficiencies.armor.join(", ") }}<br />
        <strong>Weapons: </strong>{{ shownClass.proficiencies.weapons.join(", ") }}<br />
        <strong>Tools: </strong>{{ shownClass.proficiencies.tools.join(", ") }}<br />
        <strong>Saving Throws: </strong>{{ shownClass.proficiencies["saving throws"].join(", ") }}<br />
        <strong>Skills: </strong>Choose {{ shownClass.proficiencies.numskills }} additional skills<br />
      </p>
      <h4>Equipment</h4>
      <ul>
        <li>Select one suit of armor with which you are proficient that costs 300 gp or less. <router-link to="/ref/equipment">See the Equipment page for details on options.</router-link>
          <ul>
            <li>Light Armor: Leather Cuirass, Scale Cuirass, Leather Hauberk, Chain Cuirass.</li>
            <li>Medium Armor: Leather Full Armor, Scale Hauberk, Chain Hauberk</li>
            <li>Heavy Armor: Scale Full Armor, Chain Full Armor</li>
          </ul>
        </li>
        <li>Select up to 3 weapons with which you are proficient. Again, <router-link to="/ref/equipment">see the Equipment page for options.</router-link> If one of your weapons requires ammunition, take 50 units of basic, nonmagical ammunition for the weapon (such as bullets for a sling, darts for a blowgun, arrows for a longbow, or bolts for a light crossbow). If you are proficient with shields, you may select a wooden or steel shield in place of one weapon. The weapons you select must not have the Rare, Artillery, or Heavy Artillery properties.</li>
        <li>If you are proficient with one or more sets of tools, add one set of tools to your inventory that you are proficient with.</li>
        <li>If you are proficient with one or more instruments or gaming sets, add one instrument or gaming set you are proficient with.</li>
        <li>If your class can cast spells, one spellcasting focus appropriate for your class.</li>
        <li v-if="shownClass.name === 'Wizard' || shownClass.name === 'Factotum'">A spellbook.</li>
        <li>Select one equipment pack from the following list:
          <ul>
            <li>Burglar's Pack - Includes a backpack, a bag of 1,000 ball bearings, 10 feet of string, a bell, 5 candles, a crowbar, a hammer, 10 pitons, a hooded lantern, 2 flasks of oil, 5 days rations, a tinderbox, and a waterskin. The pack also has 50 feet of hempen rope strapped to the side of it.</li>
            <li>Diplomat's Pack - Includes a chest, 2 cases for maps and scrolls, a set of fine clothes, a bottle of ink, an ink pen, a lamp, 2 flasks of oil, 5 sheets of paper, a vial of perfume, sealing wax, and soap.</li>
            <li>Dungeoneer's Pack - Includes a backpack, a crowbar, a hammer, 10 pitons, 10 torches, a tinderbox, 10 days of rations, and a waterskin. The pack also has 50 feet of hempen rope strapped to the side of it.</li>
            <li>Entertainer's Pack - Includes a backpack, a bedroll, 2 costumes, 5 candles, 5 days of rations, a waterskin, and a disguise kit.</li>
            <li>Explorer's Pack - Includes a backpack, a bedroll, a mess kit, a tinderbox, 10 torches, 10 days of rations, and a waterskin. The pack also has 50 feet of hempen rope strapped to the side of it.</li>
            <li>Priest's Pack - Includes a backpack, a blanket, 10 candles, a tinderbox, an alms box, 2 blocks of incense, a censer, vestments, 2 days of rations, and a waterskin.</li>
            <li>Scholar's Pack - Includes a backpack, a book of lore, a bottle of ink, an ink pen, 10 sheets of parchment, a little bag of sand, and a small knife.</li>
          </ul>
        </li>
      </ul>
      <div v-for="ft in sortedFeatures" :key="ft.name">
        <h3>Level {{ ft.level }}: {{ ft.name }}</h3>
        <div v-html="marked.parse(ft.description)"></div>
      </div>
      <h2>Subclasses</h2>
      <ul class="list-inline">
        <li class="list-inline-item" v-for="sc in shownClass.subclass" :key="sc.name">
          <button @click="shownSubClass = sc" class="racebutton btn btn-primary">{{sc.name}}</button>
        </li>
      </ul>
      <div>
        <h3>{{ shownSubClass.name }}</h3>
        <div v-for="ft in shownSubClass.features" :key="ft.name">
          <h4>Level {{ ft.level }}: {{ ft.name }}</h4>
          <div v-html="marked.parse(ft.description)"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./js/class.js"></script>
