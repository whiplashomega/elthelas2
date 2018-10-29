<template>
<div class="charsheet-static" id="attackdiv">
  <h4>Attacks</h4>
  <div v-for="(attack, index) in character.attacks" v-bind:key="index" class="smalltext">
    <strong>{{attack.name}}:</strong> {{attack.type}},
    range {{attack.range}},
    <span v-if="attack.bonus > -1">+</span>{{getAttackBonus(attack)}} to hit
    ({{attack.damage}}
    <span v-if="getAttackDamageBonus(attack) > 0">+ {{getAttackDamageBonus(attack)}}</span>
    <span v-if="getAttackDamageBonus(attack) < 0"> - {{getAttackDamageBonus(attack)}}</span> {{attack.dtype}} damage
    <span v-if="attack.damage2 !== ''"> + {{attack.damage2}} {{attack.dtype2}} damage</span>).
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
      Additional Damage Bonus:
      <input type="text" class="form-control" v-model="attack.damagebonus" />
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
    Additional Attack Bonus:
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
    Additional Damage Bonus:
    <input type="text" class="form-control" v-model="newattack.damagebonus" />
  </b-modal>
</div>
</template>
<script src="./attacks.js"></script>
<style src="../characterbuilder.scss" lang="scss" scoped></style>
