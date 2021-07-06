<template>
  <div class="charsheet-static" id="attackdiv">
    <h4>Other Rolls</h4>
    <div v-for="(roll, index) in character.rolls" :key="index" class="smalltext">
      <strong>{{ roll.name }}:</strong>,
      range {{ roll.range }},
      <span v-for="(dmg, $index) in roll.damage" :key="$index">{{ dmg.dice }}<span v-if="getDamageBonus(dmg, roll.stat) > 0">+ {{ getDamageBonus(dmg, roll.stat) }} </span>
      <span v-if="getDamageBonus(dmg, roll.stat) < 0"> {{ getDamageBonus(dmg, roll.stat) }}</span> {{ dmg.label }}</span> <span v-if="roll.savestat">DC {{ getSaveDC(roll.stat) }} {{ roll.savestat }} {{ roll.savefor }}</span> {{ roll.description }}.
      <button type="button" class="print-hide btn-symbol" @click="roll.edit = true">&#9998;</button>
      <button type="button" @click="removeRoll(index)" class="print-hide btn btn-sm btn-danger">X</button>
      <b-modal v-model="roll.edit">
        Name:
        <input type="text" class="form-control" v-model="roll.name" />
        Ability
        <select class="form-control" v-model="roll.stat">
          <option :value="0">Strength</option>
          <option :value="1">Dexterity</option>
          <option :value="2">Constitution</option>
          <option :value="3">Intelligence</option>
          <option :value="4">Wisdom</option>
          <option :value="5">Charisma</option>
        </select>
        Save?
        <select class="form-control" v-model="roll.savestat">
          <option value="">No Save</option>
          <option value="Strength">Strength</option>
          <option value="Dexterity">Dexterity</option>
          <option value="Constitution">Constitution</option>
          <option value="Intelligence">Intelligence</option>
          <option value="Wisdom">Wisdom</option>
          <option value="Charisma">Charisma</option>
          <option value="Varies (see description)">Varies (see description)</option>
        </select>
        Save Effect
        <input type="text" class="form-control" v-model="roll.savefor" />
        Range
        <input type="text" class="form-control" v-model="roll.range" />
        Description
        <textarea class="form-control" v-model="roll.description"></textarea>
        <div v-for="(dmg, $index) in roll.damage" :key="$index">
          Dice:
          <input type="text" class="form-control" v-model="dmg.dice" />
          Higher Levels Dice:
          <input type="text" class="form-control" v-model="dmg.higherlevels" />
          Bonus (not including ability mod or proficiency):
          <input type="number" class="form-control" v-model="dmg.damagebonus" />
          <input type="checkbox" v-model="dmg.addstat" />Add Ability Mod?<br />
          <input type="checkbox" v-model="dmg.prof" />Add Proficiency?<br />
          Type:
          <input type="text" class="form-control" v-model="dmg.label" />
          <button @click="removeDamage(roll, $index)" class="btn btn-sm btn-danger">Remove</button>
        </div>
        <button @click="addDamage(roll)" class="btn btn-primary btn-sm">Add Damage</button>
      </b-modal>
    </div>
    <button type="button" @click="rollmodal = true" class="print-hide btn btn-primary btn-sm">+</button>
    <b-modal v-model="rollmodal" title="Add Roll" @ok="addRoll()">
      Name:
      <input type="text" class="form-control" v-model="newroll.name" />
      Ability
      <select class="form-control" v-model="newroll.stat">
        <option :value="0">Strength</option>
        <option :value="1">Dexterity</option>
        <option :value="2">Constitution</option>
        <option :value="3">Intelligence</option>
        <option :value="4">Wisdom</option>
        <option :value="5">Charisma</option>
      </select>
      Save?
      <select class="form-control" v-model="newroll.savestat">
        <option value="">No Save</option>
        <option value="Strength">Strength</option>
        <option value="Dexterity">Dexterity</option>
        <option value="Constitution">Constitution</option>
        <option value="Intelligence">Intelligence</option>
        <option value="Wisdom">Wisdom</option>
        <option value="Charisma">Charisma</option>
      </select>
      Save Effect
      <input type="text" class="form-control" v-model="newroll.savefor" />
      Range:
      <input type="text" class="form-control" v-model="newroll.range" />
      Description
      <textarea class="form-control" v-model="newroll.description"></textarea>
      <div v-for="(dmg, $index) in newroll.damage" :key="$index">
        Dice:
        <input type="text" class="form-control" v-model="dmg.dice" />
        Higher Levels Dice:
        <input type="text" class="form-control" v-model="dmg.higherlevels" />
        Bonus (not including ability mod or proficiency):
        <input type="number" class="form-control" v-model="dmg.damagebonus" />
        <input type="checkbox" v-model="dmg.addstat" />Add Ability Mod?<br />
        <input type="checkbox" v-model="dmg.prof" />Add Proficiency?<br />
        Type:
        <input type="text" class="form-control" v-model="dmg.label" />
        <button @click="removeDamage(newroll, $index)" class="btn btn-sm btn-danger">Remove</button>
      </div>
      <button @click="addDamage(newroll)" class="btn btn-primary btn-sm">Add Damage</button>
    </b-modal>
  </div>
</template>
<script src="./js/otherrolls.js"></script>
<style src="./scss/characterbuilder.scss" lang="scss" scoped></style>
