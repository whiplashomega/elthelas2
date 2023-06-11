<template>
  <div class="col-sm-12">
      <b-row>
        <b-col md="2">
          <label>
            Type <select v-model="typeFilter">
              <option value="">All</option>
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
            </select> <br />
            Size <select v-model="sizeFilter">
              <option value="">All</option>
              <option value="tiny">tiny</option>
              <option value="small">small</option>
              <option value="medium">medium</option>
              <option value="large">large</option>
              <option value="huge">huge</option>
              <option value="gargantuan">gargantuan</option>
              <option value="colossal">colossal</option>
            </select> <br />
            CR Min <input type="number" v-model="crFilterMin" class="charsheet-num" /> <br />
            Max <input type="number" v-model="crFilterMax" class="charsheet-num" /><br />
          </label>
        </b-col>
        <div class="col-2">

        </div>
        <div class="col-sm-2">
        </div>
        <b-col md="4" class="my-1">
          <b-input-group>
            <b-form-input v-model="creaturestable.filterValue" placeholder="Type to Search" />
            <button class="btn btn-primary" :disabled="!creaturestable.filterValue" @click="creaturestable.filterValue = ''">Clear</button>
          </b-input-group>
          Results: {{filteredcreatures.length}}
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
              <a href="#" @click.stop="info(cre, index, $event.target)">{{ cre.name }}</a>
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
    <modal id="creaturemodal" :modalProps="modalProps"
             ok-only>
      <h4> {{ creature.size }} {{ creature.type }}<span v-if="creature.subtype"> ({{ creature.subtype }})</span>, {{ creature.alignment }}</h4>
      <p>
        <strong>Armor Class:</strong> {{creature.ac}} {{ creature.acdesc }} <br />
        <strong>Hit Points:</strong>{{ creaturecalc.hp(creature) }} ({{creaturecalc.basehp(creature)}} + {{ creaturecalc.pp(creature)}}) <br />
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
        <span v-if="creature.saves"><strong>Saving Throws:</strong> {{ creature.saves }} <br /></span>
        <span v-if="creature.skills.length > 0"><strong>Skills:</strong> {{ creature.skills.join(", ") }} <br /></span>
        <strong>Senses:</strong> {{ creature.senses }} <br />
        <span v-if="creature.damageresistances"><strong>Damage Resistances:</strong> {{ creature.damageresistances }} <br /></span>
        <span v-if="creature.damageimmunities"><strong>Damage Immunities:</strong> {{ creature.damageimmunities }} <br /></span>
        <span v-if="creature.conditionimmunities"><strong>Condition Immunities:</strong> {{ creature.conditionimmunities }} <br /></span>
        <strong>Languages:</strong> {{ creature.languages }} <br />
        <strong>Challenge:</strong> {{ creature.cr }}
      </p>
      <div v-html="creature.descr"></div>
    </modal>
  </div>
</template>
<script src="./js/bestiary.js"></script>
<style src="./scss/bestiary.scss" lang="scss" scoped></style>
