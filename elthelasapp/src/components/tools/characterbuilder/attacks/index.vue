<template>
  <div class="charsheet-static" id="attackdiv">
    <h4>Attacks</h4>
    <div v-for="(attack, index) in character.attacks" :key="index" class="smalltext">
      <b-modal v-model="attack.roll" title="Roll Attack" @ok="attack.roll = false; attack.rolled = false">
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
          {{ attack.dtype }} Damage: {{ attack.rolls.total1 }}
          <table class="abilitytable">
            <thead>
              <tr>
                <th>Total</th>
                <th v-for="num in parse(attack.damage).numDice" :key="num">{{ num }}</th>
                <th v-if="attack.rolls.crit" v-for="num in parse(attack.damage).numDice" :key="num">{{ num + parse(attack.damage).numDice }}</th>
                <th>Bonus</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ attack.rolls.total1 }}</td>
                <td v-for="num in parse(attack.damage).numDice" :key="num">{{ attack.rolls.dRoll1.rolls[num - 1] }}</td>
                <td v-if="attack.rolls.crit" v-for="num in parse(attack.damage).numDice" :key="num">{{ attack.rolls.critRoll1.rolls[num - 1] }}</td>
                <td>{{ getAttackDamageBonus(attack) }}</td>
              </tr>
              <tr>
                <td>-</td>
                <td v-for="num in parse(attack.damage).numDice" :key="num">
                  <button class="btn btn-sm btn-primary" @click="rerollDie('1d' + parse(attack.damage).numSides, attack.rolls.dRoll1.rolls, num - 1, attack)">ReRoll</button>
                </td>
                <td v-if="attack.rolls.crit" v-for="num in parse(attack.damage).numDice" :key="num">
                  <button class="btn btn-sm btn-primary" @click="rerollDie('1d' + parse(attack.damage).numSides, attack.rolls.critRoll1.rolls, num - 1, attack)">ReRoll</button>
                </td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
          <div v-if="attack.rolls.dRoll2">
            {{ attack.dtype2 }} Damage: {{ attack.rolls.total2 }}
            <table class="abilitytable">
              <thead>
                <tr>
                  <th>Total</th>
                  <th v-for="num in parse(attack.damage2).numDice" :key="num">{{ num }}</th>
                  <th v-if="attack.rolls.crit" v-for="num in parse(attack.damage2).numDice" :key="num">{{ num + parse(attack.damage2).numDice }}</th>
                  <th>Bonus</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ attack.rolls.total2 }}</td>
                  <td v-for="num in parse(attack.damage2).numDice" :key="num">{{ attack.rolls.dRoll2.rolls[num - 1] }}</td>
                  <td v-if="attack.rolls.crit" v-for="num in parse(attack.damage2).numDice" :key="num">{{ attack.rolls.critRoll2.rolls[num - 1] }}</td>
                  <td>{{ attack.damagebonus2 }}</td>
                </tr>
                <tr>
                  <td>-</td>
                  <td v-for="num in parse(attack.damage2).numDice" :key="num">
                    <button class="btn btn-sm btn-primary" @click="rerollDie('1d' + parse(attack.damage2).numSides, attack.rolls.dRoll2.rolls, num - 1, attack)">ReRoll</button>
                  </td>
                  <td v-if="attack.rolls.crit" v-for="num in parse(attack.damage2).numDice" :key="num">
                    <button class="btn btn-sm btn-primary" @click="rerollDie('1d' + parse(attack.damage2).numSides, attack.rolls.critRoll2.rolls, num - 1, attack)">ReRoll</button>
                  </td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="attack.rolls.dRoll3">
            {{ attack.dtype3 }} Damage: {{ attack.rolls.total3 }}
            <table class="abilitytable">
              <thead>
                <tr>
                  <th>Total</th>
                  <th v-for="num in parse(attack.damage3).numDice" :key="num">{{ num }}</th>
                  <th v-if="attack.rolls.crit" v-for="num in parse(attack.damage3).numDice" :key="num">{{ num + parse(attack.damage3).numDice }}</th>
                  <th>Bonus</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ attack.rolls.total3 }}</td>
                  <td v-for="num in parse(attack.damage3).numDice" :key="num">{{ attack.rolls.dRoll3.rolls[num - 1] }}</td>
                  <td v-if="attack.rolls.crit" v-for="num in parse(attack.damage3).numDice" :key="num">{{ attack.rolls.critRoll3.rolls[num - 1] }}</td>
                  <td>{{ attack.damagebonus3 }}</td>
                </tr>
                <tr>
                  <td>-</td>
                  <td v-for="num in parse(attack.damage3).numDice" :key="num">
                    <button class="btn btn-sm btn-primary" @click="rerollDie('1d' + parse(attack.damage3).numSides, attack.rolls.dRoll3.rolls, num - 1, attack)">ReRoll</button>
                  </td>
                  <td v-if="attack.rolls.crit" v-for="num in parse(attack.damage3).numDice" :key="num">
                    <button class="btn btn-sm btn-primary" @click="rerollDie('1d' + parse(attack.damage3).numSides, attack.rolls.critRoll3.rolls, num - 1, attack)">ReRoll</button>
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
      ({{ attack.damage }}
      <span v-if="getAttackDamageBonus(attack) > 0">+ {{ getAttackDamageBonus(attack) }}</span>
      <span v-if="getAttackDamageBonus(attack) < 0"> - {{ getAttackDamageBonus(attack) }}</span> {{ attack.dtype }} damage
      <span v-if="(attack.damage2 !== '') || Number(attack.damagebonus2) > 0"> + {{ attack.damage2 }} + {{ attack.damagebonus2 }} {{ attack.dtype2 }} damage</span>
      <span v-if="(attack.damage3 !== '') || Number(attack.damagebonus3) > 0"> + {{ attack.damage3 }} + {{ attack.damagebonus3 }} {{ attack.dtype3 }} damage</span>) Critical Hit on {{ attack.critRange }}.
      <button type="button" class="print-hide btn-symbol" @click="attack.edit = true">&#9998;</button>
      <button type="button" @click="removeAttack(index)" class="print-hide btn btn-sm btn-danger">X</button>
      <b-modal v-model="attack.edit">
        Name:
        <input type="text" class="form-control" v-model="attack.name" />
        <input type="checkbox" v-model="attack.prof">Proficient? <input type="checkbox" v-model="attack.addstat" />Add Ability Mod to Damage?
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
        Damage Dice:
        <input type="text" class="form-control" v-model="attack.damage" />
        Damage Bonus (not including ability mod):
        <input type="number" class="form-control" v-model="attack.damagebonus" />
        Damage Type:
        <select v-model="attack.dtype" class="form-control">
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
          <option>Radiant</option>
          <option>Thunder</option>
        </select>
        Damage Dice 2:
        <input type="text" class="form-control" v-model="attack.damage2" />
        Damage Bonus 2:
        <input type="number" class="form-control" v-model="attack.damagebonus2" />
        Damage Type 2:
        <select v-model="attack.dtype2" class="form-control">
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
          <option>Radiant</option>
          <option>Thunder</option>
        </select>
        Damage Dice 3:
        <input type="text" class="form-control" v-model="attack.damage3" />
        Damage Bonus 3:
        <input type="number" class="form-control" v-model="attack.damagebonus3" />
        Damage Type 3:
        <select v-model="attack.dtype3" class="form-control">
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
          <option>Radiant</option>
          <option>Thunder</option>
        </select>
      </b-modal>
    </div>
    <button type="button" @click="attackmodal = true" class="print-hide btn btn-primary btn-sm">+</button>
    <b-modal v-model="attackmodal" title="Add Attack" @ok="addAttack()">
      Name:
      <input type="text" class="form-control" v-model="newattack.name" />
      <input type="checkbox" v-model="newattack.prof">Proficient? <input type="checkbox" v-model="newattack.addstat" />Add Ability Mod to Damage?
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
      Damage Dice:
      <input type="text" class="form-control" v-model="newattack.damage" />
      Damage Bonus (not including ability mod):
      <input type="number" class="form-control" v-model="newattack.damagebonus" />
      Damage Type:
      <select v-model="newattack.dtype" class="form-control">
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
        <option>Radiant</option>
        <option>Thunder</option>
      </select>
      Damage Dice 2:
      <input type="text" class="form-control" v-model="newattack.damage2" />
      Damage Bonus 2:
      <input type="number" class="form-control" v-model="newattack.damagebonus2" />
      Damage Type 2:
      <select v-model="newattack.dtype2" class="form-control">
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
        <option>Radiant</option>
        <option>Thunder</option>
      </select>
      Damage Dice 3:
      <input type="text" class="form-control" v-model="newattack.damage3" />
      Damage Bonus 3:
      <input type="number" class="form-control" v-model="newattack.damagebonus3" />
      Damage Type 3:
      <select v-model="newattack.dtype3" class="form-control">
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
        <option>Radiant</option>
        <option>Thunder</option>
      </select>
    </b-modal>
  </div>
</template>
<script src="./attacks.js"></script>
<style src="../characterbuilder.scss" lang="scss" scoped></style>
