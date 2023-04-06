<template>
  <div class="col-sm-12">
    <div class="row">
      <div class="col-sm-3">
        <div>
          <label>
            Name
          </label>
          <input type="text" class="charsheet-text" v-model="creature.name" />
        </div>
        <div>
          <label>
            CR
          </label>
          <input type="number" min=0
               max=30 class="charsheet-text"
               v-model="creature.cr" />
        </div>
        <div>
          <label>
            Type
          </label>
          <select v-model="creature.type" class="charsheet-text">
            <option value="aberration">Aberration</option>
            <option value="beast">Beast</option>
            <option value="celestial">Celestial</option>
            <option value="construct">Construct</option>
            <option value="dragon">Dragon</option>
            <option value="elemental">Elemental</option>
            <option value="fey">Fey</option>
            <option value="fiend">Fiend</option>
            <option value="giant">Giant</option>
            <option value="humanoid">Humanoid</option>
            <option value="monstrosity">Monstrosity</option>
            <option value="plant">Plant</option>
            <option value="ooze">Ooze</option>
            <option value="undead">Undead</option>
          </select>
        </div>
        <div>
          <label>AC</label>
          <input type="number" class="charsheet-text" v-model="creature.ac" />
        </div>
        <div>
          <label>HP (deprecated)</label>
          <input type="number" class="charsheet-text" v-model="creature.hp" />
        </div>
        <div>
          <label>PC</label>
          <input type="number" class="charsheet-text" v-model="creature.pc" />
        </div>
        <div>
          <label>Speed</label>
          <input type="text" class="charsheet-text" v-model="creature.speed" />
        </div>

        <div>
          <label>
            Damage Resistances
            <input type="text" class="charsheet-text" v-model="creature.damageresistances" />
          </label>
          <label>
            Damage Immunities
            <input type="text" class="charsheet-text" v-model="creature.damageimmunities" />
          </label>
          <label>
            Condition Immunities
            <input type="text" class="charsheet-text" v-model="creature.conditionimmunities" />
          </label>
        </div>
        <label>Tags</label>
        <div v-for="(tag, $index) in creature.tags" :key="tag.id" class="clearfix row">
          <div class="col-sm-10">
            <input type="text" class="charsheet-text" v-model="tag.name" />
          </div>
          <div class="col-sm-2">
            <button class="btn btn-danger btn-sm" @click="removeTag($index)">X</button>
          </div>
        </div>
        <div style="margin-top:10px;"><button class="btn btn-primary btn-sm" @click="addTag()">Add Tag</button></div>
        <div id="imageupload">
          <div class="row print-hide">
            <input type="file" id="imageload" class="col-sm" />
            <div class="col-sm">
              <input type="button" @click="loadimage()"
                     class="btn btn-success" value="upload image" />
            </div>
          </div>
        </div>
        <div class="btn-group" style="">
          <button class="btn btn-success" @click="checkCreature()">Submit</button>
          <button class="btn btn-warning" @click="resetForm()">Reset</button>
        </div>
      </div>
      <div class="col-sm-3">
        <div>
          <label>
            Size
          </label>
          <select v-model="creature.size" class="charsheet-text">
            <option value="tiny">Tiny</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="huge">Huge</option>
            <option value="gargantuan">Gargantuan</option>
            <option value="colossal">Colossal</option>
          </select>
        </div>
        <div>
          <label>
            Alignment
          </label>
          <input type="text" class="charsheet-text" v-model="creature.alignment" />
        </div>
        <div>
          <label>
            Subtype
          </label>
          <input type="text" class="charsheet-text" v-model="creature.subtype" />
        </div>
        <div>
          <label>AC Description</label>
          <input type="text" class="charsheet-text" v-model="creature.acdesc" />
        </div>
        <div>
          <label>HP Description (deprecated)</label>
          <input type="text" class="charsheet-text" v-model="creature.hpdesc" />
        </div>
        <div>
          <label>Hit Dice:</label>
          <input type="number" class="charsheet-num" v-model="creature.hitdice" />d<span v-if="creature.size === 'tiny'">4</span><span v-if="creature.size === 'small'">6</span><span v-if="creature.size === 'medium'">8</span><span v-if="creature.size === 'large'">10</span><span v-if="creature.size === 'huge'">12</span><span v-if="creature.size === 'gargantuan'">20</span><span v-if="creature.size === 'colossal'">20</span> <label>HP: </label> {{creaturecalc.hp(creature)}}
        </div>
        <div>
          <label>Saves</label>
          <input type="text" class="charsheet-text" v-model="creature.saves" />
        </div>
        <div class="row">
          <label>
            Languages
            <input type="text" class="charsheet-text" v-model="creature.languages" />
          </label>
          <label>
            Senses
            <input type="text" class="charsheet-text" v-model="creature.senses" />
          </label>
          <label>
            Locations
            <input type="text" class="charsheet-text" v-model="creature.locations" />
          </label>

        <label>Skills</label>
        <div v-for="(skill, $index) in creature.skills" :key="skill.id" class="clearfix row">
          <div class="col-sm-10"><input type="text" class="charsheet-text" v-model="skill.value" /></div>
          <div class="col-sm-2"><button class="btn btn-danger btn-sm" @click="removeSkill($index)">X</button></div>
        </div>
        <div style="margin-top:10px;"><button class="btn btn-primary btn-sm" @click="addSkill()">Add Skill</button></div>
        </div>
        <img :src="creature.image" :alt="creature.name" style="max-width:100%;" v-if="creature.image" />
      </div>

      <label class="col-sm-6">
        Ability Scores
        <table class="table table-striped table-sm">
          <thead>
            <tr><th></th><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th></tr>
          </thead>
          <tbody>
            <tr>
              <th>Score (dep)</th>
              <td>{{creature.str}}</td>
              <td>{{creature.dex}}</td>
              <td>{{creature.con}}</td>
              <td>{{creature.int}}</td>
              <td>{{creature.wis}}</td>
              <td>{{creature.cha}}</td>
            </tr>
            <tr>
              <th>Score</th>
              <td><input type="number" class="charsheet-num" style="margin-right:0;" v-model="creature.stats[0]" /></td>
              <td><input type="number" class="charsheet-num" style="margin-right:0;" v-model="creature.stats[1]" /></td>
              <td><input type="number" class="charsheet-num" style="margin-right:0;" v-model="creature.stats[2]" /></td>
              <td><input type="number" class="charsheet-num" style="margin-right:0;" v-model="creature.stats[3]" /></td>
              <td><input type="number" class="charsheet-num" style="margin-right:0;" v-model="creature.stats[4]" /></td>
              <td><input type="number" class="charsheet-num" style="margin-right:0;" v-model="creature.stats[5]" /></td>
            </tr>
            <tr>
              <th>Mod</th>
              <td>{{creaturecalc.statMod(creature, 0)}}</td>
              <td>{{creaturecalc.statMod(creature, 1)}}</td>
              <td>{{creaturecalc.statMod(creature, 2)}}</td>
              <td>{{creaturecalc.statMod(creature, 3)}}</td>
              <td>{{creaturecalc.statMod(creature, 4)}}</td>
              <td>{{creaturecalc.statMod(creature, 5)}}</td>
            </tr>
            <tr>
              <th>w/ Prof</th>
              <td>{{creaturecalc.attMod(creature, 0)}}</td>
              <td>{{creaturecalc.attMod(creature, 1)}}</td>
              <td>{{creaturecalc.attMod(creature, 2)}}</td>
              <td>{{creaturecalc.attMod(creature, 3)}}</td>
              <td>{{creaturecalc.attMod(creature, 4)}}</td>
              <td>{{creaturecalc.attMod(creature, 5)}}</td>
            </tr>
            <tr>
              <th>w/ Exp</th>
              <td>{{creaturecalc.attMod(creature, 0) + creaturecalc.prof(creature)}}</td>
              <td>{{creaturecalc.attMod(creature, 1) + creaturecalc.prof(creature)}}</td>
              <td>{{creaturecalc.attMod(creature, 2) + creaturecalc.prof(creature)}}</td>
              <td>{{creaturecalc.attMod(creature, 3) + creaturecalc.prof(creature)}}</td>
              <td>{{creaturecalc.attMod(creature, 4) + creaturecalc.prof(creature)}}</td>
              <td>{{creaturecalc.attMod(creature, 5) + creaturecalc.prof(creature)}}</td>
            </tr>
            <tr>
              <th>Save DC</th>
              <td>{{creaturecalc.saveDC(creature, 0)}}</td>
              <td>{{creaturecalc.saveDC(creature, 1)}}</td>
              <td>{{creaturecalc.saveDC(creature, 2)}}</td>
              <td>{{creaturecalc.saveDC(creature, 3)}}</td>
              <td>{{creaturecalc.saveDC(creature, 4)}}</td>
              <td>{{creaturecalc.saveDC(creature, 5)}}</td>
            </tr>
            <tr>

            </tr>
          </tbody>
        </table>
        <div>
          <label>Description, Actions, and Abilities</label>
          <textarea class="form-control" style="min-height:600px" v-model="creature.description"></textarea>
        </div>
      </label>
    </div>
  </div>
</template>
<script src="./js/creaturebuilder.js"></script>
