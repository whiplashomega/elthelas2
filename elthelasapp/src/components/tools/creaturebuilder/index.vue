<template>
  <div>
    <label>
      Name
      <input type="text" class="form-control" v-model="creature.name" />
    </label>
    <label>
      Tags
      <div v-for="(tag, $index) in creature.tags" :key="tag + $index">
        <input type="text" class="form-control" v-model="tag" />
        <button class="btn btn-danger" @click="removeTag($index)">X</button>
      </div>
      <button class="btn btn-success" @click="addTag()">Add Tag</button>
    </label>
    <label>
      Size
      <select v-model="creature.size" class="form-control">
        <option value="tiny">Tiny</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
        <option value="huge">Huge</option>
        <option value="gargantuan">Gargantuan</option>
        <option value="colossal">Colossal</option>
      </select>
    </label>
    <label>
      Type
      <select v-model="creature.type" class="form-control">
        <option value="aberration">Aberration</option>
        <option value="beast">Beast</option>
        <option value="celestial">Celestial</option>
        <option value="construct">Construct</option>
        <option value="dragon">Dragon</option>
        <option value="elemental">Elemental</option>
        <option value="fiend">Fiend</option>
        <option value="giant">Giant</option>
        <option value="humanoid">Humanoid</option>
        <option value="monstrosity">Monstrosity</option>
        <option value="plant">Plant</option>
        <option value="ooze">Ooze</option>
        <option value="undead">Undead</option>
      </select>
    </label>
    <label>
      Subtype
      <input type="text" class="form-control" v-model="creature.subtype" />
    </label>
    <label>
      CR
      <input type="number" min=0 max=30
             class="form-control" v-model="creature.cr" />
    </label>
    <label>
      Alignment
      <input type="text" class="form-control" v-model="creature.alignment" />
    </label>
    <label>
      AC
      <input type="number" class="form-control" v-model="creature.ac" />
    </label>
    <label>
      AC Description
      <input type="text" class="form-control" v-model="creature.acdesc" />
    </label>
    <label>
      HP
      <input type="number" class="form-control" v-model="creature.hp" />
    </label>
    <label>
      HP Description
      <input type="text" class="form-control" v-model="creature.hpdesc" />
    </label>
    <label>
      Speed
      <input type="text" class="form-control" v-model="creature.speed" />
    </label>
    <label>
      Ability Scores
      <table class="table table-striped">
        <thead>
          <tr><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="number" v-model="creature.str" /></td>
            <td><input type="number" v-model="creature.dex" /></td>
            <td><input type="number" v-model="creature.con" /></td>
            <td><input type="number" v-model="creature.int" /></td>
            <td><input type="number" v-model="creature.wis" /></td>
            <td><input type="number" v-model="creature.cha" /></td>
          </tr>
        </tbody>
      </table>
    </label>
    <label>
      Skills
      <div v-for="(skill, $index) in creature.skills" :key="skill + $index">
        <input type="text" class="form-control" v-model="skill" />
        <button class="btn btn-danger" @click="removeSkill($index)">X</button>
      </div>
      <button class="btn btn-success" @click="addSkill()">Add Skill</button>
    </label>
    <label>
      Saves
      <input type="text" class="form-control" v-model="creature.saves" />
    </label>
    <label>
      Senses
      <input type="text" class="form-control" v-model="creature.senses" />
    </label>
    <label>
      Damage Immunities
      <input type="text" class="form-control" v-model="creature.damageimmunities" />
    </label>
    <label>
      Condition Immunities
      <input type="text" class="form-control" v-model="creature.conditionimmunities" />
    </label>
    <label>
      Languages
      <input type="text" class="form-control" v-model="creature.languages" />
    </label>
    <label>
      Damage Resistances
      <input type="text" class="form-control" v-model="creature.damageresistances" />
    </label>
    <label>
      Locations
      <input type="text" class="form-control" v-model="creature.locations" />
    </label>
    <label>
      Description, Actions, and Abilities
      <textarea class="form-control" v-model="creature.description"></textarea>
    </label>
    <div class="btn-group">
      <button class="btn btn-success" @click="submitCreature()">Submit</button>
      <button class="btn btn-warning" @click="resetForm()">Reset</button>
    </div>
  </div>
</template>
<script src="./creaturebuilder.js"></script>