<template>
	<div class="col-12">
  <h1>Encounter Runner</h1>
    <div class="row">
    <div class="col-sm-4">
      <label>
        Party Size
        <select class="form-control" v-model="partysize" @change="calculateDifficulty()">
          <option ng-value="1">1</option>
          <option ng-value="2">2</option>
          <option ng-value="3">3</option>
          <option ng-value="4">4</option>
          <option ng-value="5">5</option>
          <option ng-value="6">6</option>
          <option ng-value="7">7</option>
          <option ng-value="8">8</option>
          <option ng-value="9">9</option>
          <option ng-value="10">10</option>
        </select>
      </label>
    </div>
    <div class="col-sm-4">
      <label>
        Average Level
        <select class="form-control" v-model="partylevel" @change="calculateDifficulty()">
          <option ng-value="1">1</option>
          <option ng-value="2">2</option>
          <option ng-value="3">3</option>
          <option ng-value="4">4</option>
          <option ng-value="5">5</option>
          <option ng-value="6">6</option>
          <option ng-value="7">7</option>
          <option ng-value="8">8</option>
          <option ng-value="9">9</option>
          <option ng-value="10">10</option>
          <option ng-value="11">11</option>
          <option ng-value="12">12</option>
          <option ng-value="13">13</option>
          <option ng-value="14">14</option>
          <option ng-value="15">15</option>
          <option ng-value="16">16</option>
          <option ng-value="17">17</option>
          <option ng-value="18">18</option>
          <option ng-value="19">19</option>
          <option ng-value="20">20</option>
        </select>
      </label>
    </div>
    <div class="col-sm-4">
      <input type="button" class="btn btn-primary" value="Calculate" @click="calculateDifficulty()" /> Encounter Difficulty: {{ difficulty }} <br />
      XP Value: {{xpvalue}}<br />
      Adjusted XP Value: {{adjustedxpvalue}}
    </div>
  </div>
  <div class="row" v-sortable="{ handle: '.handle' }">
    <div v-for="creature in encountercreatures" v-bind:key="creature.id" class="col-sm-3" >
        <h2> {{creature.name}} <i class="handle">&#8592;&#8594;<button class="close" type="button" @click="removeCreature(creature)">&times;</button></i> </h2>
        <div class="creature">
          <h4> {{creature.size}} {{creature.type}}<span data-ng-if="creature.subtype"> ({{creature.subtype}})</span>, {{creature.alignment}}</h4>
          <input type="text" class="form-control" placeholder="mini description" v-model="creature.mini" />
          <p>
            <strong>Armor Class:</strong> {{creature.acdesc}} <br />
            <strong>Hit Points:</strong> <input type="number" v-model="creature.currenthp" style="max-width: 50px;" /> / {{creature.hpdesc}} <br />
            <strong>Speed:</strong> {{creature.speed}}
          </p>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{creature.str}} (<span ng-if="creature.strmod > 0">+</span>{{creature.strmod}})</td>
                <td>{{creature.dex}} (<span ng-if="creature.dexmod > 0">+</span>{{creature.dexmod}})</td>
                <td>{{creature.con}} (<span ng-if="creature.conmod > 0">+</span>{{creature.conmod}})</td>
                <td>{{creature.int}} (<span ng-if="creature.intmod > 0">+</span>{{creature.intmod}})</td>
                <td>{{creature.wis}} (<span ng-if="creature.wismod > 0">+</span>{{creature.wismod}})</td>
                <td>{{creature.cha}} (<span ng-if="creature.chamod > 0">+</span>{{creature.chamod}})</td>
              </tr>
            </tbody>
          </table>
          <p>
            <span data-ng-if="creature.saves"><strong>Saving Throws:</strong> {{creature.saves}} <br /></span>
            <span data-ng-if="creature.skills.length > 0"><strong>Skills:</strong> {{creature.skills.join(", ")}} <br /></span>
            <strong>Senses:</strong> {{creature.senses}} <br />
            <span data-ng-if="creature.damageresistances"><strong>Damage Resistances:</strong> {{creature.damageresistances}} <br /></span>
            <span data-ng-if="creature.damageimmunities"><strong>Damage Immunities:</strong> {{creature.damageimmunities}} <br /></span>
            <span data-ng-if="creature.conditionimmunities"><strong>Condition Immunities:</strong> {{creature.conditionimmunities}} <br /></span>
            <strong>Languages:</strong> {{creature.languages}} <br />
            <strong>Challenge:</strong> {{creature.cr}}
          </p>
          <div v-html="creature.descr"></div>
        </div>
    </div>
  </div>
  <b-row>
    <b-col md="8">
      <b-form-checkbox-group v-model="creaturestable.filterBy">
        <b-form-checkbox value="name">Name</b-form-checkbox>
  	    <b-form-checkbox value="size">Size</b-form-checkbox>
        <b-form-checkbox value="cr">CR</b-form-checkbox>
        <b-form-checkbox value="type">Type</b-form-checkbox>
        <b-form-checkbox value="subtype">Subtype</b-form-checkbox>
        <b-form-checkbox value="alignment">Alignment</b-form-checkbox>
        <b-form-checkbox value="description">Description</b-form-checkbox>
      </b-form-checkbox-group>
    </b-col>
    <b-col md="4" class="my-1">
      <b-input-group>
        <b-form-input v-model="creaturestable.filterValue" placeholder="Type to Search" />
        <b-btn :disabled="!creaturestable.filterValue" @click="filter = ''">Clear</b-btn>
      </b-input-group>
    </b-col>
  </b-row>
  <b-table show-empty
    :striped="true" :bordered="false"
    :responsive="true"
    stacked="sm"
    :items="creatures"
    :fields="creaturestable.fields"
    :filter="filter"
    :sort-by.sync="creaturestable.sortBy"
    :sort-desc.sync="creaturestable.sortDesc">
    <template slot="name" slot-scope="row"><a href="#" @click.stop="addToEncounter(row.item, row.index, $event.target)">{{row.value}}</a></template>
  </b-table>
  </div>
</template>
<script src="./runner.js"></script>
<style src="./runner.scss" lang="scss" scoped></style>
