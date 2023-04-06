<template>
  <div class="charsheet-static" id="attackdiv">
    <h4>Attacks</h4>
    <div v-for="(attack, index) in character.attacks" :key="index" class="smalltext">
      <b-modal v-model="attack.roll" title="Roll Attack"
               @ok="attack.roll = false; attack.rolled = false" :class="userinfo.darkmode">
        <h4>{{ attack.name }}</h4>
        Advantage
        <select class="form-control" v-model="attack.advantage">
          <option :value="false">None</option>
          <option value="advantage">Advantage</option>
          <option value="disadvantage">Disadvantage</option>
        </select>
        <button type="button" class="btn btn-primary" @click="rollAttack(attack)">Roll Now!</button>
        <div v-if="attack.rolled">
          <h5 v-if="attack.rolls.crit">Critical Hit!</h5>
          <p>
            <strong>Attack Roll:</strong> {{ attack.rolls.toHit }} ({{ attack.rolls.rawRoll }} + {{ getAttackBonus(attack) }}) (All dice results: {{ attack.rolls.firstRoll }} <span v-if="attack.advantage">{{ attack.rolls.secondRoll }} <span v-if="attack.rolls.elvenAccuracy">{{ attack.rolls.thirdRoll }}</span></span>)
          </p>
          <p>
            <strong>Total Damage: </strong> {{ attack.rolls.totalDamage }}
          </p>
          <p>
            <strong>Damage Rolls</strong>
          </p>
          <div v-for="(dmg, $index) in attack.rolls.damage" :key="$index">
            {{ dmg.dtype }} Damage: {{ dmg.total }}
            <table class="abilitytable">
              <thead>
                <tr>
                  <th>Total</th>
                  <th v-for="num in parse(dmg.dice).numDice" :key="num">{{ num }}</th>
                  <th v-if="attack.rolls.crit" v-for="num in parse(dmg.dice).numDice" :key="num">{{ num + parse(dmg.dice).numDice }}</th>
                  <th>Bonus</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ dmg.total }}</td>
                  <td v-for="num in parse(dmg.dice).numDice" :key="num">{{ dmg.dRoll.rolls[num - 1] }}</td>
                  <td v-if="attack.rolls.crit" v-for="num in parse(dmg.dice).numDice" :key="num">{{ dmg.critRoll.rolls[num - 1] }}</td>
                  <td>{{ getDamageBonus(dmg, attack.stat) }}</td>
                </tr>
                <tr>
                  <td>-</td>
                  <td v-for="num in parse(dmg.dice).numDice" :key="num">
                    <button class="btn btn-sm btn-primary" @click="rerollDie('1d' + parse(dmg.dice).numSides, dmg.dRoll.rolls, num - 1, attack)">ReRoll</button>
                  </td>
                  <td v-if="attack.rolls.crit" v-for="num in parse(dmg.dice).numDice" :key="num">
                    <button class="btn btn-sm btn-primary" @click="rerollDie('1d' + parse(dmg.dice).numSides, dmg.critRoll.rolls, num - 1, attack)">ReRoll</button>
                  </td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </b-modal>
      <button type="button" class="btn print-hide btn-sm btn-primary" @click="attack.roll = true">roll</button>
      <strong>{{ attack.name }}:</strong> {{ attack.type }},
      range {{ attack.range }},
      <span v-if="getAttackBonus(attack) > -1">+</span>{{ getAttackBonus(attack) }} to hit
      (
      <span v-for="(dmg, $index) in attack.damage" :key="$index">{{ dmg.dice }}<span v-if="getDamageBonus(dmg, attack.stat) > 0">+ {{ getDamageBonus(dmg, attack.stat) }}</span>
      <span v-if="getDamageBonus(dmg, attack.stat) < 0"> {{ getDamageBonus(dmg, attack.stat) }}</span> {{ dmg.dtype }} damage </span>) Critical Hit on {{ attack.critRange }}.
      <button type="button" class="print-hide btn-symbol" @click="attack.edit = true">&#9998;</button>
      <button type="button" @click="removeAttack(index)" class="print-hide btn btn-sm btn-danger">X</button>
      <b-modal v-model="attack.edit" :class="userinfo.darkmode">
        Name:
        <input type="text" class="form-control" v-model="attack.name" />
        <input type="checkbox" v-model="attack.prof">Proficient?
        <select class="form-control" v-model="attack.stat">
          <option :value="0">Strength</option>
          <option :value="1">Dexterity</option>
          <option :value="2">Constitution</option>
          <option :value="3">Intelligence</option>
          <option :value="4">Wisdom</option>
          <option :value="5">Charisma</option>
        </select>
        Crit Roll:
        <input type="number" class="form-control" v-model="attack.critRange" />
        Additional Attack Bonus:
        <input type="number" class="form-control" v-model="attack.bonus" />
        Range:
        <input type="text" class="form-control" v-model="attack.range" />
        Type:
        <select v-model="attack.type" class="form-control">
          <option>Melee Weapon Attack</option>
          <option>Ranged Weapon Attack</option>
          <option>Melee Spell Attack</option>
          <option>Ranged Spell Attack</option>
          <option>Unarmed Strike</option>
        </select>
        <div v-for="(dmg, $index) in attack.damage" :key="$index">
          Damage Dice:
          <input type="text" class="form-control" v-model="dmg.dice" />
          Damage Bonus (not including ability mod):
          <input type="number" class="form-control" v-model="dmg.damagebonus" />
          <input type="checkbox" v-model="dmg.addstat" />Add Ability Mod to Damage?<br />
          Damage Type:
          <select v-model="dmg.dtype" class="form-control">
            <option>Bludgeoning</option>
            <option>Piercing</option>
            <option>Slashing</option>
            <option>Acid</option>
            <option>Cold</option>
            <option>Fire</option>
            <option>Force</option>
            <option>Lightning</option>
            <option>Necrotic</option>
            <option>Poison</option>
            <option>Psychic</option>
            <option>Radiant</option>
            <option>Thunder</option>
          </select>
          <button @click="removeDamage(attack, $index)" class="btn btn-sm btn-danger">Remove</button>
        </div>
        <button @click="addDamage(attack)" class="btn btn-primary btn-sm">Add Damage</button>
      </b-modal>
    </div>
    <button type="button" @click="attackmodal = true" class="print-hide btn btn-primary btn-sm">+</button>
    <b-modal v-model="attackmodal" title="Add Attack" @ok="addAttack()">
      Name:
      <input type="text" class="form-control" v-model="newattack.name" />
      <input type="checkbox" v-model="newattack.prof">Proficient?
      <select class="form-control" v-model="newattack.stat">
        <option :value="0">Strength</option>
        <option :value="1">Dexterity</option>
        <option :value="2">Constitution</option>
        <option :value="3">Intelligence</option>
        <option :value="4">Wisdom</option>
        <option :value="5">Charisma</option>
      </select>
      Crit Roll:
      <input type="number" class="form-control" v-model="newattack.critRange" />
      Additional Attack Bonus (do not include proficiency or ability mod):
      <input type="number" class="form-control" v-model="newattack.bonus" />
      Range:
      <input type="text" class="form-control" v-model="newattack.range" />
      Type:
      <select v-model="newattack.type" class="form-control">
        <option>Melee Weapon Attack</option>
        <option>Ranged Weapon Attack</option>
        <option>Melee Spell Attack</option>
        <option>Ranged Spell Attack</option>
        <option>Unarmed Strike</option>
      </select>
      <div v-for="(dmg, $index) in newattack.damage" :key="$index">
        Damage Dice:
        <input type="text" class="form-control" v-model="dmg.dice" />
        Damage Bonus (not including ability mod):
        <input type="number" class="form-control" v-model="dmg.damagebonus" />
        <input type="checkbox" v-model="dmg.addstat" />Add Ability Mod to Damage?<br />
        Damage Type:
        <select v-model="dmg.dtype" class="form-control">
          <option>Bludgeoning</option>
          <option>Piercing</option>
          <option>Slashing</option>
          <option>Acid</option>
          <option>Cold</option>
          <option>Fire</option>
          <option>Force</option>
          <option>Lightning</option>
          <option>Necrotic</option>
          <option>Poison</option>
          <option>Psychic</option>
          <option>Radiant</option>
          <option>Thunder</option>
        </select>
        <button @click="removeDamage(newattack, $index)" class="btn btn-sm btn-danger">Remove</button>
      </div>
      <button @click="addDamage(newattack)" class="btn btn-primary btn-sm">Add Damage</button>
    </b-modal>
  </div>
</template>
<script src="./js/attacks.js"></script>
