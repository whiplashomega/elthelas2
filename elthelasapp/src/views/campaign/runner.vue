<template>
  <div class="col-sm-12">
    <div class="col-sm-9">
      <div class="row">
        <div class="col-sm-2">
          <label>
            Party Size
            <select class="charsheet-text" v-model="partysize" @change="calculateDifficulty()">
              <option :value="1">1</option>
              <option :value="2">2</option>
              <option :value="3">3</option>
              <option :value="4">4</option>
              <option :value="5">5</option>
              <option :value="6">6</option>
              <option :value="7">7</option>
              <option :value="8">8</option>
              <option :value="9">9</option>
              <option :value="10">10</option>
            </select>
          </label>
        </div>
        <div class="col-sm-2">
          <label>
            Average Level
            <select class="charsheet-text" v-model="partylevel" @change="calculateDifficulty()">
              <option :value="1">1</option>
              <option :value="2">2</option>
              <option :value="3">3</option>
              <option :value="4">4</option>
              <option :value="5">5</option>
              <option :value="6">6</option>
              <option :value="7">7</option>
              <option :value="8">8</option>
              <option :value="9">9</option>
              <option :value="10">10</option>
              <option :value="11">11</option>
              <option :value="12">12</option>
              <option :value="13">13</option>
              <option :value="14">14</option>
              <option :value="15">15</option>
              <option :value="16">16</option>
              <option :value="17">17</option>
              <option :value="18">18</option>
              <option :value="19">19</option>
              <option :value="20">20</option>
            </select>
          </label>
        </div>
        <div class="col-sm-2">
          <label>
            Terrain
            <select class="charsheet-text" v-model="terrain" @change="calculateDifficulty()">
              <option :value="0.75">Player Advantage</option>
              <option :value="1">None</option>
              <option :value="1.25">Monster Advantage</option>
            </select>
          </label>
        </div>
        <div class="col-sm-2">
          <label>
            Monster Has Powerful AoE
            <input type="checkbox" class="checkbox"
                   v-model="aoe" @change="calculateDifficulty()" />
          </label>
        </div>
        <div class="col-sm-4">
           Encounter Difficulty: {{ difficulty }} <br />
          <span title="This is the total XP of the monsters in this encounter, before adjustment.">XP: {{ xpvalue }}</span>&nbsp;&nbsp;
          <span title="After adjustment, this is the amount of XP you should award to players.">Adjusted XP: {{ adjustedxpvalue }}</span>
        </div>
      </div>
      <!--<div>
        <input type="button" @click="getFromServer(); modalProps.isActive = true"
               value="Load Character" class="btn btn-success margin15" />
      </div>-->
      <div class="row">
        <div v-for="creature in statBlocks" :key="creature.id" class="col-sm-4">
          <h2> {{ creature.name }} <i class="handle">&#8592;&#8594;</i>         </h2>
          <div class="creature">
            <h4> {{ creature.size }} {{ creature.type }}<span v-if="creature.subtype"> ({{ creature.subtype }})</span>, {{ creature.alignment }}</h4>
            <div class="row">
              <div class="col-9">
                <strong>Armor Class:</strong> {{ creature.ac }} ({{creature.acdesc}}) <br />
                <strong>Protection Class:</strong> {{ creature.pc }}<br />
                <strong>Speed:</strong> {{ creature.speed }}
              </div>
              <div class="col-3">
                <img v-show="creature.image" :src="creature.image" :alt="creature.name" />
              </div>
            </div>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ creature.stats[0] }} (<span v-if="creaturecalc.statMod(creature, 0) > 0">+</span>{{ creaturecalc.statMod(creature, 0) }})</td>
                  <td>{{ creature.stats[1] }} (<span v-if="creaturecalc.statMod(creature, 1) > 0">+</span>{{ creaturecalc.statMod(creature, 1) }})</td>
                  <td>{{ creature.stats[2] }} (<span v-if="creaturecalc.statMod(creature, 2) > 0">+</span>{{ creaturecalc.statMod(creature, 2) }})</td>
                  <td>{{ creature.stats[3] }} (<span v-if="creaturecalc.statMod(creature, 3) > 0">+</span>{{ creaturecalc.statMod(creature, 3) }})</td>
                  <td>{{ creature.stats[4] }} (<span v-if="creaturecalc.statMod(creature, 4) > 0">+</span>{{ creaturecalc.statMod(creature, 4) }})</td>
                  <td>{{ creature.stats[5] }} (<span v-if="creaturecalc.statMod(creature, 5) > 0">+</span>{{ creaturecalc.statMod(creature, 5) }})</td>
                </tr>
              </tbody>
            </table>
            <p>
              <span data-v-if="creature.saves"><strong>Saving Throws:</strong> {{ creature.saves }} <br /></span>
              <span v-if="creature.skills.length > 0"><strong>Skills:</strong> {{ creature.skills.join(", ") }} <br /></span>
              <strong>Senses:</strong> {{ creature.senses }} <br />
              <span v-if="creature.damageresistances"><strong>Damage Resistances:</strong> {{ creature.damageresistances }} <br /></span>
              <span v-if="creature.damageimmunities"><strong>Damage Immunities:</strong> {{ creature.damageimmunities }} <br /></span>
              <span v-if="creature.conditionimmunities"><strong>Condition Immunities:</strong> {{ creature.conditionimmunities }} <br /></span>
              <strong>Languages:</strong> {{ creature.languages }} <br />
              <strong>Challenge:</strong> {{ creature.cr }}
            </p>
            <div v-html="creature.descr"></div>
          </div>
        </div>
      </div>
      <b-row>
        <b-col md="2">
          <label>
            Type
            <select v-model="typeFilter" class="form-control">
              <option value="">All</option>
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
        </b-col>
        <b-col md="6">
          <b-form-checkbox-group v-model="creaturestable.filterBy">
            <b-form-checkbox value="name">Name</b-form-checkbox>
            <b-form-checkbox value="size">Size</b-form-checkbox>
            <b-form-checkbox value="cr">CR</b-form-checkbox>
            <b-form-checkbox value="subtype">Subtype</b-form-checkbox>
            <b-form-checkbox value="alignment">Alignment</b-form-checkbox>
          </b-form-checkbox-group>
        </b-col>
        <b-col md="4" class="my-1">
          <b-input-group>
            <b-form-input v-model="creaturestable.filterValue" placeholder="Type to Search" />
            <button class="btn btn-primary" :disabled="!creaturestable.filterValue" @click="creaturestable.filterValue = ''">Clear</button>
          </b-input-group>
        </b-col>
      </b-row>
      <table class="table table-striped table-responsive" id="creaturetable">
        <thead><tr>
          <th><a href="#" @click.stop="creaturestable.sortBy = 'name'; creaturestable.sortDesc = !creaturestable.sortDesc">Name</a></th>
          <th><a href="#" @click.stop="creaturestable.sortBy = 'size'; creaturestable.sortDesc = !creaturestable.sortDesc">Size</a></th>
          <th><a href="#" @click.stop="creaturestable.sortBy = 'cr'; creaturestable.sortDesc = !creaturestable.sortDesc">CR</a></th>
          <th><a href="#" @click.stop="creaturestable.sortBy = 'type'; creaturestable.sortDesc = !creaturestable.sortDesc">Type</a></th>
          <th><a href="#" @click.stop="creaturestable.sortBy = 'subtype'; creaturestable.sortDesc = !creaturestable.sortDesc">Subtype</a></th>
          <th><a href="#" @click.stop="creaturestable.sortBy = 'alignment'; creaturestable.sortDesc = !creaturestable.sortDesc">Alignment</a></th>
        </tr></thead>
        <tbody>
          <tr v-for="(cre, index) in filteredcreatures" :key="cre._id">
            <td><span>
              <a href="#" @click.stop="addToEncounter(cre, index, $event.target)">{{ cre.name }}</a>
              <button class="btn btn-warning btn-sm" @click="edit(cre)" v-if="admin">&#9998;</button>
              <button class="btn btn-sm btn-danger" @click="del(cre)" v-if="admin">X</button>
            </span></td>
            <td>{{ cre.size }}</td>
            <td>{{ cre.cr }}</td>
            <td>{{ cre.type }}</td>
            <td>{{ cre.subtype }}</td>
            <td>{{ cre.alignment }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="inithptracker">
      <p>
        <a :href="encounterlink">Link to this Encounter</a>
      </p>
      <div v-for="creature in encountercreaturesinit" :key="creature.id" class="form-inline form-row">
        <div class="row">
          <div class="col-sm-5">{{ creature.name }}&nbsp;</div>
          <div class="col-sm-2">AC {{ creature.ac }}</div>
          <div class="col-sm-5">{{ creature.speed }}</div>
        </div>
        <div class="row">
          <div class="col-sm-3">
            <input type="number" v-model="creature.currenthp"
                 style="font-size:0.7rem" class="form-control form-control-sm" />
          </div>
          <div class="col-sm-3">
             / {{ creaturecalc.hp(creature) }}
          </div>
          <div class="col-sm-3">
             <button class="close" type="button" @click="removeCreature(creature)">&times;</button>
          </div>
        </div>

      </div>
    </div>
    <modal id="servermodal" title="Load File from Server" :modalProps="modalProps">
      <table class="table table-striped">
        <tr>
          <th>Character Name</th><th>Level</th><th>-</th>
        </tr>
        <tr v-for="character in characters" :key="character._id">
          <td><a class="clickable" @click="selCharacter(character)">{{ character.name }}</a></td><td>{{ charlevel(character) }}</td>
        </tr>
      </table>
    </modal>
  </div>
</template>
<script src="./js/runner.js"></script>
<style src="./scss/runner.scss" lang="scss" scoped></style>
