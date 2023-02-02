<template>
  <div class="row">
    <div class="col-sm-8">
      <div class="row">
        <label class="col-sm-4">
          Name
          <input type="text" class="form-control" v-model="creature.name" />
        </label>
        <label class="col-sm-2">
          Size
          <select v-model="creature.size" class="form-control">
            <option value="Tiny">Tiny</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="Huge">Huge</option>
            <option value="Gargantuan">Gargantuan</option>
            <option value="Colossal">Colossal</option>
          </select>
        </label>
        <label class="col-sm-2">
          Type
          <select v-model="creature.type" class="form-control">
            <option value="Aberration">Aberration</option>
            <option value="Beast">Beast</option>
            <option value="Celestial">Celestial</option>
            <option value="Construct">Construct</option>
            <option value="Dragon">Dragon</option>
            <option value="Elemental">Elemental</option>
            <option value="Fiend">Fiend</option>
            <option value="Giant">Giant</option>
            <option value="Humanoid">Humanoid</option>
            <option value="Monstrosity">Monstrosity</option>
            <option value="Plant">Plant</option>
            <option value="Ooze">Ooze</option>
            <option value="Undead">Undead</option>
          </select>
        </label>
        <label class="col-sm-2">
          Subtype
          <input type="text" class="form-control" v-model="creature.subtype" />
        </label>
        <label class="col-sm-2">
          Alignment
          <select type="text" class="form-control" v-model="creature.alignment">
            <option>Any Alignment</option>
            <option>Unaligned</option>
            <option>Lawful Good</option>
            <option>Neutral Good</option>
            <option>Chaotic Good</option>
            <option>Lawful Neutral</option>
            <option>Neutral</option>
            <option>Chaotic Neutral</option>
            <option>Lawful Evil</option>
            <option>Neutral Evil</option>
            <option>Chaotic Evil</option>
          </select>
        </label>
      </div>
      <div class="row print-hide">
        <input type="file" id="imageload" class="col-sm" />
        <div class="col-sm">
          <input type="button" @click="loadImage()"
                class="btn btn-success" value="upload image" />
        </div>
      </div>
      <div class="row">
        <label class="col-sm-12">
          Ability Scores
          <table class="table table-striped table-sm">
            <thead>
              <tr><th></th><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Ability</td>
                <td><input type="number" class="numberfield" v-model="creature.stats[0]" /></td>
                <td><input type="number" class="numberfield" v-model="creature.stats[1]" /></td>
                <td><input type="number" class="numberfield" v-model="creature.stats[2]" /></td>
                <td><input type="number" class="numberfield" v-model="creature.stats[3]" /></td>
                <td><input type="number" class="numberfield" v-model="creature.stats[4]" /></td>
                <td><input type="number" class="numberfield" v-model="creature.stats[5]" /></td>
              </tr>
              <tr>
                <td>Saves</td>
                <td><input type="checkbox" v-model="creature.saves[0]"/></td>
                <td><input type="checkbox" v-model="creature.saves[1]"/></td>
                <td><input type="checkbox" v-model="creature.saves[2]"/></td>
                <td><input type="checkbox" v-model="creature.saves[3]"/></td>
                <td><input type="checkbox" v-model="creature.saves[4]"/></td>
                <td><input type="checkbox" v-model="creature.saves[5]"/></td>
              </tr>
            </tbody>
          </table>
        </label>
      </div>
      <div class="row">
        <label class="col-sm-3">
          AC
          <input type="number" class="form-control" v-model="creature.ac" />
        </label>
        <label class="col-sm-3">
          PC
          <input type="number" class="form-control" v-model="creature.pc" />
        </label>
        <label class="col-sm-3">
          Max Dex (Use 99 for Unlimited)
          <input type="number" class="form-control" v-model="creature.maxdex" />
        </label>
        <label class="col-sm-3">
          Armor Description
          <input type="text" class="form-control" v-model="creature.acdesc" />
        </label>
      </div>
      <div class="row">
        <label class="col-sm-3">
          Hit Dice
          <input type="number" class="form-control" v-model="creature.hitdice" />
        </label>
        <label class="col-sm-3">
          Extra Bonus to Initiative
          <input type="number" class="form-control" v-model="creature.initmod" />
        </label>
        <label class="col-sm-3">
          Languages
          <input type="text" class="form-control" v-model="creature.languages" />
        </label>
        <label class="col-sm-3">
          Senses
          <input type="text" class="form-control" v-model="creature.senses" />
        </label>
      </div>
      <div class="row">
        <div class="col-sm-4">
          <table class="abilitytable">
            <thead>
              <tr><th>Skill</th><th>Prof?</th><th>Magic</th></tr>
            </thead>
            <tbody>
              <tr v-for="skill in creature.skills" :key="skill.name">
                <th>{{ skill.name }}</th>
                <td>
                  <select v-model="skill.prof" class="charsheet-num">
                    <option :value="0">No</option>
                    <option :value="0.5">Half</option>
                    <option :value="1">Yes</option>
                    <option :value="2">Exp</option>
                  </select>
                </td>
                <td><input type="number" class="numberfield" v-model="skill.magic" /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-sm-8">
          <h4>Attacks</h4>
          <div v-for="(attack, i) in creature.attacks" :key="attack.id">
            <div class="row">
              <label class="col-sm-11">
                <input type="text" v-model="attack.name" class="form-control" />
                Name
              </label>
              <label class="col-sm-1">
                <button class="btn btn-danger" @click="removeAttack(i)">X</button>
              </label>
            </div>
            <div class="row">
              <label class="col-sm-2">
                <select class="form-control" v-model="attack.stat">
                  <option :value="0">Strength</option>
                  <option :value="1">Dexterity</option>
                  <option :value="2">Constitution</option>
                  <option :value="3">Intelligence</option>
                  <option :value="4">Wisdom</option>
                  <option :value="5">Charisma</option>
                </select>
                Attack Stat
              </label>
              <label class="col-sm-2">
                <select v-model="attack.attroll" class="form-control">
                  <option :value="true">Yes</option>
                  <option :value="false">No</option>
                </select>
              </label>
              <label class="col-sm-2">
                <input type="text" v-model="attack.range" class="form-control" />
                Range
              </label>
              <label class="col-sm-4">
                <select v-model="attack.type" class="form-control">
                  <option>Melee Weapon Attack</option>
                  <option>Ranged Weapon Attack</option>
                  <option>Melee Spell Attack</option>
                  <option>Ranged Spell Attack</option>
                  <option>Spell</option>
                  <option>Monstrous Ability</option>
                </select>
                Type
              </label>
              <label class="col-sm-2" v-if="attack.attroll">
                <input type="number" v-model="attack.bonus" class="form-control" />
                Bonus
              </label>
            </div>
            <div v-if="attack.attroll">
              Damage <button class="btn btn-success btn-sm" @click="attack.damage.push({ dice: '1d4', dtype: 'Piercing', damagebonus: 0, addstat: false })">Add Damage</button>
              <div class="row" v-for="(dmg, i) in attack.damage" :key="dmg.dice + dmg.dtype">
                <label class="col-sm-3">
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
                  Damage Type
                </label>
                <label class="col-sm-3">
                  <input type="text" v-model="dmg.dice" class="form-control" />
                  Damage Dice
                </label>
                <label class="col-sm-2">
                  <input type="number" class="form-control" v-model="dmg.damagebonus" />
                  Bonus
                </label>
                <label class="col-sm-3">
                  <select v-model="dmg.addstat" class="form-control">
                    <option :value="true">Yes</option>
                    <option :value="false">No</option>
                  </select>
                  Add Stat to Damage
                </label>
                <label class="col-sm-1">
                  <button class="btn btn-danger" @click="removeDmg(attack, i)">X</button>
                </label>
              </div>
            </div>
            <div class="row">
              <label class="col-sm-3">
                <select v-model="attack.save" class="form-control">
                  <option :value="true">Yes</option>
                  <option :value="false">No</option>
                </select>  
                Saving Throw              
              </label>
              <label class="col-sm-9">
                <textarea class="form-control" v-model="attack.extra"></textarea>
                Extra Effects
              </label>
            </div>
            <div class="row">
              <label class="col-sm-3" v-if="attack.save">
                <select v-model="attack.savestat" class="form-control">
                  <option>Strength</option>
                  <option>Dexterity</option>
                  <option>Constitution</option>
                  <option>Intelligence</option>
                  <option>Wisdom</option>
                  <option>Charisma</option>                  
                </select>
                Save Stat
              </label>
              <label class="col-sm-9" v-if="attack.save">
                <textarea class="form-control" v-model="attack.saveextra"></textarea>
                Extra Effect on Failed Save
              </label>
            </div>
            <div v-if="attack.save">
              Save Damage <button class="btn btn-success btn-sm" @click="attack.savedamage.push({ dice: '1d4', dtype: 'Piercing', damagebonus: 0, addstat: false })">Add Damage</button>
              <div class="row" v-for="(dmg, i) in attack.savedamage" :key="dmg.dice + dmg.dtype">
                <label class="col-sm-3">
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
                  Damage Type
                </label>
                <label class="col-sm-3">
                  <input type="text" v-model="dmg.dice" class="form-control" />
                  Damage Dice
                </label>
                <label class="col-sm-2">
                  <input type="number" class="form-control" v-model="dmg.damagebonus" />
                  Bonus
                </label>
                <label class="col-sm-3">
                  <select v-model="dmg.addstat" class="form-control">
                    <option :value="true">Yes</option>
                    <option :value="false">No</option>
                  </select>
                  Add Stat to Damage
                </label>
                <label class="col-sm-1">
                  <button class="btn btn-danger" @click="removeSaveDmg(attack, i)">X</button>
                </label>
              </div>
            </div>
          </div>
          <button class="btn btn-success" @click="addAttack()">Add Attack</button>
        </div>
      </div>
      <h5>Resistances, Immunities, and Vulnerabilities</h5>
      <table class="table table-sm">
        <tr>
          <th>Piercing</th>
          <th>Slashing</th>
          <th>Bludgeoning</th>
          <th>Acid</th>
          <th>Cold</th>
          <th>Fire</th>
          <th>Lightning</th>
        </tr>
        <tr>
          <td>
            <select v-model="creature.dr.piercing" class="form-control">
              <option value="0">0</option>
              <option value="resistance">Resistance</option>
              <option value="immunity">Immunity</option>
              <option value="vulnerable">Vulnerable</option>
            </select>
          </td>
          <td>
            <select v-model="creature.dr.slashing" class="form-control">
              <option value="0">0</option>
              <option value="resistance">Resistance</option>
              <option value="immunity">Immunity</option>
              <option value="vulnerable">Vulnerable</option>
            </select>
          </td>
          <td>
            <select v-model="creature.dr.bludgeoning" class="form-control">
              <option value="0">0</option>
              <option value="resistance">Resistance</option>
              <option value="immunity">Immunity</option>
              <option value="vulnerable">Vulnerable</option>
            </select>
          </td>
          <td>
            <select v-model="creature.dr.acid" class="form-control">
              <option value="0">0</option>
              <option value="resistance">Resistance</option>
              <option value="immunity">Immunity</option>
              <option value="vulnerable">Vulnerable</option>
            </select>
          </td>
          <td>
            <select v-model="creature.dr.cold" class="form-control">
              <option value="0">0</option>
              <option value="3">3</option>
              <option value="resistance">Resistance</option>
              <option value="immunity">Immunity</option>
              <option value="vulnerable">Vulnerable</option>
            </select>
          </td>
          <td>
            <select v-model="creature.dr.fire" class="form-control">
              <option value="0">0</option>
              <option value="3">3</option>
              <option value="resistance">Resistance</option>
              <option value="immunity">Immunity</option>
              <option value="vulnerable">Vulnerable</option>
            </select>
          </td>
          <td>
            <select v-model="creature.dr.lightning" class="form-control">
              <option value="0">0</option>
              <option value="3">3</option>
              <option value="resistance">Resistance</option>
              <option value="immunity">Immunity</option>
              <option value="vulnerable">Vulnerable</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>Force</th>
          <th>Necrotic</th>
          <th>Poison</th>
          <th>Psychic</th>
          <th>Radiant</th>
          <th>Thunder</th>
          <th></th>
        </tr>
        <tr>
          <td>
            <select v-model="creature.dr.force" class="form-control">
              <option value="0">0</option>
              <option value="3">3</option>
              <option value="resistance">Resistance</option>
              <option value="immunity">Immunity</option>
              <option value="vulnerable">Vulnerable</option>
            </select>
          </td>
          <td>
            <select v-model="creature.dr.necrotic" class="form-control">
              <option value="0">0</option>
              <option value="3">3</option>
              <option value="resistance">Resistance</option>
              <option value="immunity">Immunity</option>
              <option value="vulnerable">Vulnerable</option>
            </select>
          </td>
          <td>
            <select v-model="creature.dr.poison" class="form-control">
              <option value="0">0</option>
              <option value="3">3</option>
              <option value="resistance">Resistance</option>
              <option value="immunity">Immunity</option>
              <option value="vulnerable">Vulnerable</option>
            </select>
          </td>
          <td>
            <select v-model="creature.dr.psychic" class="form-control">
              <option value="0">0</option>
              <option value="3">3</option>
              <option value="resistance">Resistance</option>
              <option value="immunity">Immunity</option>
              <option value="vulnerable">Vulnerable</option>
            </select>
          </td>
          <td>
            <select v-model="creature.dr.radiant" class="form-control">
              <option value="0">0</option>
              <option value="3">3</option>
              <option value="resistance">Resistance</option>
              <option value="immunity">Immunity</option>
              <option value="vulnerable">Vulnerable</option>
            </select>
          </td>
          <td>
            <select v-model="creature.dr.thunder" class="form-control">
              <option value="0">0</option>
              <option value="3">3</option>
              <option value="resistance">Resistant</option>
              <option value="immunity">Immune</option>
              <option value="vulnerable">Vulnerable</option>
            </select>
          </td>
          <td></td>
        </tr>
      </table>
      <h5>Condition Immunities</h5>
      <table class="table table-sm">
        <tr><th v-for="condition in creature.conditions" :key="condition.name">{{ condition.name }}</th></tr>
        <tr><td v-for="condition in creature.conditions" :key="condition.name"><input type="checkbox" v-model="condition.value" /></td></tr>
      </table>
      <h4>Features</h4>
      <div class="row" v-for="(feature, i) in creature.features" :key="feature.id">
        <label class="col-sm-3">
          Name
          <input type="text" class="form-control" v-model="feature.name" />
          <button class="btn btn-danger" @click="removeFeature(i)">X</button>
        </label>
        <label class="col-sm-9">
          Description
          <textarea class="form-control" v-model="feature.description"></textarea>
        </label>
      </div>
      <button class="btn btn-success" @click="addFeature()">Add Feature</button>
      <h4>Actions</h4>
      <div class="row" v-for="(action, i) in creature.actions" :key="action.id">
        <label class="col-sm-3">
          Name
          <input type="text" class="form-control" v-model="action.name" />
          Type
          <select v-model="action.type" class="form-control">
            <option>Bonus</option>
            <option>Standard</option>
            <option>Legendary</option>
          </select>
        </label>
        <label class="col-sm-9">
          Description
          <textarea class="form-control" v-model="action.description"></textarea>
          <button class="btn btn-danger" @click="removeAction(i)">X</button>
        </label>
        <label class="col-sm-12">
          Related Attacks
          <button class="btn btn-success" @click="addAttackToAction(action)">+</button>
          <div v-for="(att, n) in action.attacks" :key="att.id" class="row">
            <label class="col-sm-9">
              Attack
              <select v-model="att.attack" class="form-control">
                <option v-for="attack in creature.attacks" :value="attack" :key="attack.id">{{ attack.name }}</option>
              </select>
            </label>
            <label class="col-sm-2">
              Count
              <input type="number" class="form-control" v-model="att.num" />
            </label>
            <label class="col-sm-1">
              <br />
              <button class="btn btn-danger" @click="removeAttackFromAction(action, n)">X</button>
            </label>
          </div>
        </label>
      </div>
      <button class="btn btn-success" @click="addAction()">Add Action</button>
      <div class="row">
        <label class="col-sm-12">
          Description
          <textarea class="form-control" v-model="creature.description"></textarea>
        </label>
      </div>
      <div class="row">
        <label class="col-sm-2">
          Regeneration
          <input type="number" class="form-control" v-model="creature.crmods.regeneration"/>
        </label>
        <label class="col-sm-2">
          Has AoE Attacks
          <input type="checkbox" v-model="creature.crmods.hasaoe" />
        </label>
      </div>
      <div class="btn-group">
        <button class="btn btn-success" @click="checkCreature()">Submit</button>
        <button class="btn btn-warning" @click="resetForm()">Reset</button>
      </div>
    </div>
    <div class="col-sm-4">
      <h2>{{ creature.name }}</h2>
      <creature :creature="creature" />
    </div>
  </div>
</template>
<script src="./js/creaturebuilder.js"></script>
<style>
  .numberfield {
    width: 50px;
  }
</style>
