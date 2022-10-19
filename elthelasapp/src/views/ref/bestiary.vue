<template>
  <div class="col-sm-12">
    <b-row>
      <b-col md="8">
        &nbsp;
      </b-col>
      <b-col md="4" class="my-1">
        <b-input-group>
          <b-form-input v-model="creaturestable.filterValue" placeholder="Type to Search" />
          <button :disabled="!creaturestable.filterValue" @click="creaturestable.filterValue = ''"
                  class="btn btn-primary">Clear</button>
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
      <h4> {{ creaturestable.modalInfo.size }} {{ creaturestable.modalInfo.type }}<span v-if="creaturestable.modalInfo.subtype"> ({{ creaturestable.modalInfo.subtype }})</span>, {{ creaturestable.modalInfo.alignment }}</h4>
      <p>
        <strong>Armor Class:</strong> {{ creaturestable.modalInfo.acdesc }} <br />
        <strong>Hit Points:</strong>{{ creaturestable.modalInfo.hpdesc }} <br />
        <strong>Speed:</strong> {{ creaturestable.modalInfo.speed }}
      </p>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ creaturestable.modalInfo.str }} (<span v-if="creaturestable.modalInfo.strmod > 0">+</span>{{ creaturestable.modalInfo.strmod }})</td>
            <td>{{ creaturestable.modalInfo.dex }} (<span v-if="creaturestable.modalInfo.dexmod > 0">+</span>{{ creaturestable.modalInfo.dexmod }})</td>
            <td>{{ creaturestable.modalInfo.con }} (<span v-if="creaturestable.modalInfo.conmod > 0">+</span>{{ creaturestable.modalInfo.conmod }})</td>
            <td>{{ creaturestable.modalInfo.int }} (<span v-if="creaturestable.modalInfo.intmod > 0">+</span>{{ creaturestable.modalInfo.intmod }})</td>
            <td>{{ creaturestable.modalInfo.wis }} (<span v-if="creaturestable.modalInfo.wismod > 0">+</span>{{ creaturestable.modalInfo.wismod }})</td>
            <td>{{ creaturestable.modalInfo.cha }} (<span v-if="creaturestable.modalInfo.chamod > 0">+</span>{{ creaturestable.modalInfo.chamod }})</td>
          </tr>
        </tbody>
      </table>
      <p>
        <span v-if="creaturestable.modalInfo.saves"><strong>Saving Throws:</strong> {{ creaturestable.modalInfo.saves }} <br /></span>
        <span v-if="creaturestable.modalInfo.skills.length > 0"><strong>Skills:</strong> {{ creaturestable.modalInfo.skills.join(", ") }} <br /></span>
        <strong>Senses:</strong> {{ creaturestable.modalInfo.senses }} <br />
        <span v-if="creaturestable.modalInfo.damageresistances"><strong>Damage Resistances:</strong> {{ creaturestable.modalInfo.damageresistances }} <br /></span>
        <span v-if="creaturestable.modalInfo.damageimmunities"><strong>Damage Immunities:</strong> {{ creaturestable.modalInfo.damageimmunities }} <br /></span>
        <span v-if="creaturestable.modalInfo.conditionimmunities"><strong>Condition Immunities:</strong> {{ creaturestable.modalInfo.conditionimmunities }} <br /></span>
        <strong>Languages:</strong> {{ creaturestable.modalInfo.languages }} <br />
        <strong>Challenge:</strong> {{ creaturestable.modalInfo.cr }}
      </p>
      <div v-html="creaturestable.modalInfo.descr"></div>
    </modal>
  </div>
</template>
<script src="./js/bestiary.js"></script>
<style src="./scss/bestiary.scss" lang="scss" scoped></style>
