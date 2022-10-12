<template>
  <div class="col-sm-12">
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
          <button :disabled="!creaturestable.filterValue" @click="creaturestable.filterValue = ''"
                  class="btn btn-primary">Clear</button>
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
      <template v-slot:cell(name)="row"><span><a href="#" @click.stop="info(row.item, row.index, $event.target)">{{ row.value }}</a> <button class="btn btn-warning btn-sm" @click="edit(row.item)" v-if="admin">&#9998;</button><button class="btn btn-sm btn-danger" @click="del(row.item)" v-if="admin">X</button></span></template>
    </b-table>
    <b-modal id="creaturemodal" size="lg"
             @hide="resetModal" :title="creaturestable.modalInfo.name"
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
    </b-modal>
  </div>
</template>
<script src="./js/bestiary.js"></script>
<style src="./scss/bestiary.scss" lang="scss" scoped></style>
