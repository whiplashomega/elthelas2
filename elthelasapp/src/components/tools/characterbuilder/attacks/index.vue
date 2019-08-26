<template>
  <div class="charsheet-static" id="attackdiv">
    <h4>Attacks</h4>
    <div v-for="(attack, index) in character.attacks" :key="index" class="smalltext">
      <button type="button" class="btn print-hide btn-sm btn-primary" @click="rollAttack(attack)">roll</button>
      <select v-model="attack.advantage">
        <option :value="false">none</option>
        <option value="advantage">advantage</option>
        <option value="disadvantage">disadvantage</option>
      </select>
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
