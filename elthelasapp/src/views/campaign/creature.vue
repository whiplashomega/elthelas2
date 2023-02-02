<template>
    <div>
        <div class="row">
        <div class="col">
          <h6>{{ creature.size }} {{ creature.type }} ({{ creature.subtype }}) {{ creature.alignment }}</h6>
          <strong>HP:</strong> {{ hp }} ({{ creature.hitdice }}d{{ hitDieSize }} + {{ statMod(2) * creature.hitdice }})<br />
          <strong>Armor:</strong> AC {{ ac }}, PC {{ creature.pc }} ( {{ creature.acdesc }} <span v-if="creature.maxdex != 99">Max Dex {{ creature.maxdex }}</span> )<br />
          <strong>Proficiency Bonus: </strong> +{{ prof }}<br />
          <strong>Initiative: </strong>+{{ init }}<br />
        </div>
        <div class="col">
          <img :src="creature.image" :alt="creature.name" style="max-width:100%; max-height: 175px;" />
        </div>
      </div>
      <table class="table table-sm">
        <tr><th></th><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th></tr>
        <tr><th>Score</th><td>{{ creature.stats[0] }}</td><td>{{ creature.stats[1] }}</td><td>{{ creature.stats[2] }}</td><td>{{ creature.stats[3] }}</td><td>{{ creature.stats[4] }}</td><td>{{ creature.stats[5] }}</td></tr>
        <tr><th>Mod</th>
          <td><span v-if="statMod(0) > -1">+</span>{{ statMod(0) }}</td>
          <td><span v-if="statMod(1) > -1">+</span>{{ statMod(1) }}</td>
          <td><span v-if="statMod(2) > -1">+</span>{{ statMod(2) }}</td>
          <td><span v-if="statMod(3) > -1">+</span>{{ statMod(3) }}</td>
          <td><span v-if="statMod(4) > -1">+</span>{{ statMod(4) }}</td>
          <td><span v-if="statMod(5) > -1">+</span>{{ statMod(5) }}</td>
        </tr>
        <tr><th>Save</th>
          <td><span v-if="saveMod(0) > -1">+</span>{{ saveMod(0) }}</td>
          <td><span v-if="saveMod(1) > -1">+</span>{{ saveMod(1) }}</td>
          <td><span v-if="saveMod(2) > -1">+</span>{{ saveMod(2) }}</td>
          <td><span v-if="saveMod(3) > -1">+</span>{{ saveMod(3) }}</td>
          <td><span v-if="saveMod(4) > -1">+</span>{{ saveMod(4) }}</td>
          <td><span v-if="saveMod(5) > -1">+</span>{{ saveMod(5) }}</td>
        </tr>
      </table>
      Languages: {{ creature.languages }}<br />
      Senses: passive perception {{ passivePerception }} {{ creature.senses }}<br />
      Skills: <span v-for="skill in creature.skills" :key="skill.name"><span v-if="skill.prof">{{ skill.name }} +{{ skillMod(skill) }};&nbsp;</span></span><br />
      CR: {{ cr }}<br />
      Immunities: <span v-for="value, property in creature.dr" :key="property"><span v-if="value=='immunity'">{{ property }}; </span></span><br />
      Resistances: <span v-for="value, property in creature.dr" :key="property"><span v-if="value=='resistance'">{{ property }}; </span></span><br />
      Vulnerabilities: <span v-for="value, property in creature.dr" :key="property"><span v-if="value=='vulnerable'">{{ property }}; </span></span><br />
      Condition Immunities: <span v-for="condition in creature.conditions" :key="condition.name"><span v-if="condition.value">{{ condition.name }}; </span></span><br />
      <h5>Features</h5>
      <p v-for="feature in creature.features" :key="feature.id"><strong>{{ feature.name }}. </strong> {{ feature.description }}</p>
      <h5>Actions</h5>
      <div v-for="action in creature.actions" :key="action.id">
      <p v-if="action.type === 'Standard'"><strong>{{ action.name }}. </strong> {{ action.description }}</p>
      </div>
      <h5>Bonus Actions</h5>
      <div v-for="action in creature.actions" :key="action.id">
      <p v-if="action.type === 'Bonus'"><strong>{{ action.name }}. </strong> {{ action.description }}</p>
      </div>
      <h5>Legendary Actions</h5>
      <div v-for="action in creature.actions" :key="action.id">
      <p v-if="action.type === 'Legendary'"><strong>{{ action.name }}. </strong> {{ action.description }}</p>
      </div>
      <h5>Attacks</h5>
      <div v-for="attack in creature.attacks" :key="attack.id">
        <strong>{{ attack.name }}.</strong> {{ attack.type }}, Range {{ attack.range }} ft. +{{ attMod(attack) }} to hit. Damage 
        <span v-for="dmg in attack.damage" :key="dmg.dice + dmg.dtype">{{ dmg.dice }} + {{ dmgBonus(attack, dmg) }} {{ dmg.dtype }} damage; </span>
        {{ attack.extra }} <span v-if="attack.save">then make a DC {{ saveDC(attack) }} {{ attack.savestat }} save or <span v-if="attack.savedamage.length > 0">take</span> <span v-for="dmg in attack.savedamage" :key="dmg.dice + dmg.dtype">{{ dmg.dice }} + {{ dmgBonus(attack, dmg) }} {{ dmg.dtype }} damage; </span> <span v-if="attack.saveextra">and {{ attack.saveextra }}</span></span>
      </div>
    </div>
</template>
<script src="./js/creature.js"></script>