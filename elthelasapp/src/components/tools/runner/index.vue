<template>
  <div class="col-sm-12">
    <h1>Encounter Runner</h1>
    <p>
      <a :href="encounterlink">Link to this Encounter</a>
    </p>
    <div class="row">
      <div class="col-sm-8">
        <label>
          Party Size
          <select class="form-control" v-model="partysize" @change="calculateDifficulty()">
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
        <label>
          Average Level
          <select class="form-control" v-model="partylevel" @change="calculateDifficulty()">
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
        <label>
          Terrain
          <select class="form-control" v-model="terrain" @change="calculateDifficulty()">
            <option :value="0.75">Player Advantage</option>
            <option :value="1">None</option>
            <option :value="1.25">Monster Advantage</option>
          </select>
        </label>
        <label>
          Monster Has Powerful AoE
          <input type="checkbox" class="checkbox"
                 v-model="aoe" @change="calculateDifficulty()" />
        </label>
      </div>
      <div class="col-sm-4">
        <input type="button" class="btn btn-primary"
               value="Calculate" @click="calculateDifficulty()" /> Encounter Difficulty: {{ difficulty }} <br />
        XP Value: {{ xpvalue }}<br />
        Adjusted XP Value: {{ adjustedxpvalue }}
      </div>
    </div>
    <div>
      <input type="button" @click="getFromServer(comp)"
             value="Load Character" class="btn btn-success margin15" />
    </div>
    <div class="row" v-sortable="{ handle: '.handle' }">
      <div v-for="creature in encountercreatures" :key="creature.id" class="col-sm-3" >
        <h2> {{ creature.name }} <i class="handle">&#8592;&#8594;<button class="close" type="button" @click="removeCreature(creature)">&times;</button></i> </h2>
        <div class="creature">
          <h4> {{ creature.size }} {{ creature.type }}<span v-if="creature.subtype"> ({{ creature.subtype }})</span>, {{ creature.alignment }}</h4>
          <p>
            <strong>Armor Class:</strong> {{ creature.acdesc }} <br />
            <strong>Speed:</strong> {{ creature.speed }}
          </p>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ creature.str }} (<span v-if="creature.strmod > 0">+</span>{{ creature.strmod }})</td>
                <td>{{ creature.dex }} (<span v-if="creature.dexmod > 0">+</span>{{ creature.dexmod }})</td>
                <td>{{ creature.con }} (<span v-if="creature.conmod > 0">+</span>{{ creature.conmod }})</td>
                <td>{{ creature.int }} (<span v-if="creature.intmod > 0">+</span>{{ creature.intmod }})</td>
                <td>{{ creature.wis }} (<span v-if="creature.wismod > 0">+</span>{{ creature.wismod }})</td>
                <td>{{ creature.cha }} (<span v-if="creature.chamod > 0">+</span>{{ creature.chamod }})</td>
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
          <b-btn :disabled="!creaturestable.filterValue" @click="creaturestable.filterValue = ''">Clear</b-btn>
        </b-input-group>
      </b-col>
    </b-row>
    <b-table show-empty
             id="creaturetable"
             :striped="true" :bordered="false"
             :responsive="true"
             stacked="sm"
             :items="filteredcreatures"
             :fields="creaturestable.fields"
             :sort-by.sync="creaturestable.sortBy"
             :sort-desc.sync="creaturestable.sortDesc">
      <template v-slot:cell(name)="row"><span><a href="#" @click.stop="addToEncounter(row.item, row.index, $event.target)">{{ row.value }}</a> <button class="btn btn-warning btn-sm" @click="edit(row.item)" v-if="admin">&#9998;</button><button class="btn btn-sm btn-danger" @click="del(row.item)" v-if="admin">X</button></span></template>
    </b-table>
    <div id="inithptracker" class="row">
      <div v-for="creature in encountercreaturesinit" :key="creature.id" class="form-inline form-row col-md-6" >
        {{ creature.name }}&nbsp;
        <input type="text" class="form-control"
               style="max-width: 150px;" placeholder="mini description"
               v-model="creature.mini" />&nbsp;
        <input type="number" v-model="creature.currenthp"
               style="max-width: 75px;" class="form-control" /> &nbsp;/ {{ creature.hpdesc }}
        Init: +{{ creature.initMod }}&nbsp;
        <input type="number" v-model="creature.init"
               style="max-width: 75px;" class="form-control" />&nbsp;
        <div class="ck-button"><label><input type="checkbox" v-model="creature.advantage" /><span>Adv</span></label></div>
        <div class="ck-button"><label><input type="checkbox" v-model="creature.disadvantage" /><span>Dis</span></label></div>
        <button class="close" type="button" @click="removeCreature(creature)">&times;</button>
      </div>
      <input type="button" class="btn btn-success"
             @click="roll()" value="Roll Initiative" />
    </div>
    <b-modal id="servermodal" title="Load File from Server">
      <table class="table table-striped">
        <tr>
          <th>Character Name</th><th>Level</th><th>-</th>
        </tr>
        <tr v-for="character in characters" :key="character._id">
          <td><span class="clickable" @click="selCharacter(character)">{{ character.name }}</span></td><td>{{ charlevel(character) }}</td>
        </tr>
      </table>
    </b-modal>
    <b-modal id="loading"
             no-close-on-backdrop no-close-on-esc
             hide-header hide-footer>
      <img src="https://elthelas-images.herokuapp.com/giphy.gif" alt="Loading" />
    </b-modal>
  </div>
</template>
<script src="./runner.js"></script>
<style src="./runner.scss" lang="scss" scoped></style>
