<template>
  <div class="col-sm-12">
    <div class="row">
      <label class="col-sm-4">
        Name
        <input type="text" class="form-control" v-model="creature.name" />
      </label>
      <label class="col-sm-4">
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
      <label class="col-sm-4">
        CR
        <input type="number" min=0 max=30
               class="form-control" v-model="creature.cr" />
      </label>
    </div>
    <div class="row">
      <label class="col-sm-4">
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
      <label class="col-sm-4">
        Subtype
        <input type="text" class="form-control" v-model="creature.subtype" />
      </label>
      <label class="col-sm-4">
        Alignment
        <input type="text" class="form-control" v-model="creature.alignment" />
      </label>      
    </div>
    <div class="row">
      <label class="col-sm-12">
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
    </div>
    <div class="row">
      <label class="col-sm-6">
        Tags
        <p v-for="(tag, $index) in creature.tags" :key="tag + $index" class="clearfix">
          <input type="text" class="form-control col-sm-10" style="float:left;" v-model="tag" />
          <button class="btn btn-danger col-sm-1" style="float:left;" @click="removeTag($index)">X</button>
        </p>
        <button class="btn btn-success" @click="addTag()">Add Tag</button>
      </label>
      <label class="col-sm-6">
        Skills
        <p v-for="(skill, $index) in creature.skills" :key="skill + $index" class="clearfix">
          <input type="text" class="form-control col-sm-10" style="float:left;" v-model="skill" />
          <button class="btn btn-danger col-sm-1" style="float:left;" @click="removeSkill($index)">X</button>
        </p>
        <button class="btn btn-success" @click="addSkill()">Add Skill</button>
      </label>
    </div>
    <div class="row">
      <label class="col-sm-4">
        AC
        <input type="number" class="form-control" v-model="creature.ac" />
      </label>
      <label class="col-sm-4">
        AC Description
        <input type="text" class="form-control" v-model="creature.acdesc" />
      </label>
      <label class="col-sm-4">
        Speed
        <input type="text" class="form-control" v-model="creature.speed" />
      </label>
    </div>
    <div class="row">
      <label class="col-sm-4">
        HP
        <input type="number" class="form-control" v-model="creature.hp" />
      </label>
      <label class="col-sm-4">
        HP Description
        <input type="text" class="form-control" v-model="creature.hpdesc" />
      </label>
      <label class="col-sm-4">
        Saves
        <input type="text" class="form-control" v-model="creature.saves" />
      </label>      
    </div>
    <div class="row">
      <label class="col-sm-4">
        Senses
        <input type="text" class="form-control" v-model="creature.senses" />
      </label>
      <label class="col-sm-4">
        Damage Immunities
        <input type="text" class="form-control" v-model="creature.damageimmunities" />
      </label>
      <label class="col-sm-4">
        Condition Immunities
        <input type="text" class="form-control" v-model="creature.conditionimmunities" />
      </label>
    </div>
    <div class="row">
      <label class="col-sm-4">
        Languages
        <input type="text" class="form-control" v-model="creature.languages" />
      </label>
      <label class="col-sm-4">
        Damage Resistances
        <input type="text" class="form-control" v-model="creature.damageresistances" />
      </label>
      <label class="col-sm-4">
        Locations
        <input type="text" class="form-control" v-model="creature.locations" />
      </label>
    </div>
    <div class="row">
      <label class="col-sm-12">
        Description, Actions, and Abilities
        <textarea class="form-control" v-model="creature.description"></textarea>
      </label>      
    </div>
    <div class="btn-group">
      <button class="btn btn-success" @click="submitCreature()">Submit</button>
      <button class="btn btn-warning" @click="resetForm()">Reset</button>
    </div>
  </div>
</template>
<script src="./creaturebuilder.js"></script>