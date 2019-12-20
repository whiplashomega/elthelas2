<template>
  <div class="col-sm-12">
    <div v-if="!printMode">
      <h1>Margo's Mystics Magic Item Catalog</h1>
      <p class="alert alert-warning">
        Note: The In Stock column is only relevant on game day, and reflects the items that Margo has in stock at her store during game.
      </p>
      <b-row>
        <b-col md="8">
          <b-form-checkbox label="In Stock Only" v-model="instockonly">Display In Stock Items Only</b-form-checkbox>
          <b-form-checkbox-group v-model="magicitemtables.filterBy">
            <b-form-checkbox value="Item">Item</b-form-checkbox>
            <b-form-checkbox value="Type">Type</b-form-checkbox>
            <b-form-checkbox value="Cost (gp)">Cost (gp)</b-form-checkbox>
            <b-form-checkbox value="Attunement">Attunement</b-form-checkbox>
            <b-form-checkbox value="Effect">Effect</b-form-checkbox>
            <b-form-checkbox value="Rarity">Rarity</b-form-checkbox>
          </b-form-checkbox-group>
          <b-form-checkbox-group v-model="magicitemtables.filterRarity">
            <b-form-checkbox value="Common">Common</b-form-checkbox>
            <b-form-checkbox value="Uncommon">Uncommon</b-form-checkbox>
            <b-form-checkbox value="Rare">Rare</b-form-checkbox>
            <b-form-checkbox value="Very Rare">Very Rare</b-form-checkbox>
            <b-form-checkbox value="Legendary">Legendary</b-form-checkbox>
          </b-form-checkbox-group>
          <label class="col-4">Maximum Cost <b-form-input label="Maximum Cost" type="number" v-model="magicitemtables.filterCost" /></label>
          <button class="btn btn-primary col-2" @click="printSelected()" style="margin-top:-5px;">Print Selected</button>
        </b-col>
        <b-col md="4" class="my-1">
          <b-input-group>
            <b-form-input v-model="magicitemtables.filter" placeholder="Type to Search" />
            <b-btn :disabled="!magicitemtables.filter" @click="magicitemtables.filter = ''">Clear</b-btn>
          </b-input-group>
        </b-col>
      </b-row>
      <b-modal id="magicitemmodal" size="lg"
               @hide="resetMagicItemModal" :title="magicItemModal.Item"
               ok-only>
        <p><strong>Type: </strong>{{ magicItemModal.Type }}</p>
        <p><strong>Cost (gp): </strong>{{ magicItemModal["Cost (gp)"] }}</p>
        <p><strong>Attunement: </strong>{{ magicItemModal.Attunement }}</p>
        <p><strong>Rarity: </strong>{{ magicItemModal.Rarity }}</p>
        <p><strong>{{ magicItemModal.instock }}</strong></p>
        <div v-html="$options.filters.marked(magicItemModal.Effect)"></div>
      </b-modal>
      <b-tabs id="magicitemcatalog">
        <b-tab title="Scrolls">
          <b-table show-empty @row-clicked="selectForPrint"
                   :striped="true" :bordered="false"
                   :responsive="true"
                   stacked="sm"
                   :items="filteredScrolls"
                   :fields="magicitemtables.fields"
                   :sort-by.sync="magicitemtables.sortBy"
                   :sort-desc.sync="magicitemtables.sortDesc">
            <template v-slot:cell(Item)="row"><a href="#" @click.stop="magicItemInfo(row.item, row.index, $event.target)">{{ row.value }}</a></template>
          </b-table>
        </b-tab>
        <b-tab title="Wands">
          <b-table show-empty @row-clicked="selectForPrint"
                   :striped="true" :bordered="false"
                   :responsive="true"
                   stacked="sm"
                   :items="filteredWands"
                   :fields="magicitemtables.fields"
                   :sort-by.sync="magicitemtables.sortBy"
                   :sort-desc.sync="magicitemtables.sortDesc">
            <template v-slot:cell(Item)="row"><a href="#" @click.stop="magicItemInfo(row.item, row.index, $event.target)">{{ row.value }}</a></template>
          </b-table>
        </b-tab>
        <b-tab title="Weapons">
          <b-table show-empty @row-clicked="selectForPrint"
                   :striped="true" :bordered="false"
                   :responsive="true"
                   stacked="sm"
                   :items="filteredWeapons"
                   :fields="magicitemtables.fields"
                   :sort-by.sync="magicitemtables.sortBy"
                   :sort-desc.sync="magicitemtables.sortDesc">
            <template v-slot:cell(Item)="row"><a href="#" @click.stop="magicItemInfo(row.item, row.index, $event.target)">{{ row.value }}</a></template>
          </b-table>
        </b-tab>
        <b-tab title="Armor">
          <b-table show-empty @row-clicked="selectForPrint"
                   :striped="true" :bordered="false"
                   :responsive="true"
                   stacked="sm"
                   :items="filteredArmor"
                   :fields="magicitemtables.fields"
                   :sort-by.sync="magicitemtables.sortBy"
                   :sort-desc.sync="magicitemtables.sortDesc">
            <template v-slot:cell(Item)="row"><a href="#" @click.stop="magicItemInfo(row.item, row.index, $event.target)">{{ row.value }}</a></template>
          </b-table>
        </b-tab>
        <b-tab title="Other">
          <b-table show-empty @row-clicked="selectForPrint"
                   :striped="true" :bordered="false"
                   :responsive="true"
                   stacked="sm"
                   :items="filteredOther"
                   :fields="magicitemtables.fields"
                   :sort-by.sync="magicitemtables.sortBy"
                   :sort-desc.sync="magicitemtables.sortDesc">
            <template v-slot:cell(Item)="row"><a href="#" @click.stop="magicItemInfo(row.item, row.index, $event.target)">{{ row.value }}</a></template>
          </b-table>
        </b-tab>
      </b-tabs>
    </div>
    <div class="col-sm-12" v-if="printMode">
      <div v-for="item in toPrint" :key="item.Item" style="margin-bottom:50px;page-break-inside:avoid;">
        <h4 style="font-size:3em;">{{ item.Item }} ({{ item.Type }}, {{ item.Rarity }})</h4>
        <div v-html="$options.filters.marked(item.Effect)" style="font-size:1.5em;"></div>
      </div>
      <button class="btn btn-success print-hide" @click="toPrint = []; printMode = false;">Exit</button>
    </div>
  </div>
</template>
<script src="./js/magicitemcatalog.js"></script>
<style src="./scss/magicitemcatalog.scss" lang="scss" scoped></style>
