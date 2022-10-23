<template>
  <div class="col-sm-12">
    <div v-if="!printMode">
      <h1>Margo's Mystics Magic Item Catalog</h1>
      <p class="alert alert-warning">
        Note: The In Stock column is only relevant on game day, and reflects the
        items that Margo has in stock at her store during game.
      </p>
      <div class="row">
        <div class="col-md-8">
          <b-form-checkbox label="In Stock Only" v-model="instockonly"
            >Display In Stock Items Only</b-form-checkbox
          >
          <div class="checkbox-group row">
            <div class="col-2">
              <b-form-checkbox v-model="magicitemtables.filterBy.Item">
                Item
              </b-form-checkbox>
            </div>
            <div class="col-2">
              <b-form-checkbox v-model="magicitemtables.filterBy.Type">
                Type
              </b-form-checkbox>
            </div>
            <div class="col-2">
              <b-form-checkbox v-model="magicitemtables.filterBy['Cost (gp)']">
                Cost (gp)
              </b-form-checkbox>
            </div>
            <div class="col-2">
              <b-form-checkbox v-model="magicitemtables.filterBy.Attunement">
                Attunement
              </b-form-checkbox>
            </div>
            <div class="col-2">
              <b-form-checkbox v-model="magicitemtables.filterBy.Effect">
                Effect
              </b-form-checkbox>
            </div>
            <div class="col-2">
              <b-form-checkbox v-model="magicitemtables.filterBy.Rarity">
                Rarity
              </b-form-checkbox>
            </div>
          </div>
          <div class="checkbox-group row">
            <div class="col-2">
              <b-form-checkbox v-model="magicitemtables.filterRarity.Common">
                Common
              </b-form-checkbox>
            </div>
            <div class="col-2">
              <b-form-checkbox v-model="magicitemtables.filterRarity.Uncommon">
                Uncommon
              </b-form-checkbox>
            </div>
            <div class="col-2">
              <b-form-checkbox v-model="magicitemtables.filterRarity.Rare">
                Rare
              </b-form-checkbox>
            </div>
            <div class="col-2">
              <b-form-checkbox v-model="magicitemtables.filterRarity['Very Rare']">
                Very Rare
              </b-form-checkbox>
            </div>
            <div class="col-2">
              <b-form-checkbox v-model="magicitemtables.filterRarity.Legendary">
                Legendary
              </b-form-checkbox>
            </div>
          </div>
          <label class="col-4">
            Maximum Cost
            <b-form-input
              label="Maximum Cost"
              type="number"
              v-model="magicitemtables.filterCost"/>
          </label>
        </div>
        <b-col md="4" class="my-1">
          <b-input-group>
            <b-form-input
              v-model="magicitemtables.filter"
              placeholder="Type to Search"
            />
            <button
              class="btn btn-primary"
              :disabled="!magicitemtables.filter"
              @click="magicitemtables.filter = ''"
            >
              Clear
            </button>
          </b-input-group>
        </b-col>
      </div>
      <modal id="magicitemmodal" :modalProps="modalProps">
        <p><strong>Type: </strong>{{ magicItemModal.Type }}</p>
        <p><strong>Cost (gp): </strong>{{ magicItemModal["Cost (gp)"] }}</p>
        <p><strong>Attunement: </strong>{{ magicItemModal.Attunement }}</p>
        <p><strong>Rarity: </strong>{{ magicItemModal.Rarity }}</p>
        <p>
          <strong>{{ magicItemModal.instock }}</strong>
        </p>
        <div v-html="marked.parse(magicItemModal.Effect)"></div>
      </modal>
      <b-tabs id="magicitemcatalog">
        <b-tab title="Scrolls">
          <table class="table table-striped table-responsive">
            <thead>
              <tr>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Item';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Item
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Attunement';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Attunement
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Rarity';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Rarity
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Cost (gp)';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Cost (gp)
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='instock';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  In Stock
                </a></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredScrolls" :key="item.Item">
                <td><a href="#" @click.stop="magicItemInfo(item)">{{item.Item}}</a></td>
                <td>{{item.Attunement}}</td>
                <td>{{item.Rarity}}</td>
                <td>{{item['Cost (gp)']}}</td>
                <td>{{item.instock}}</td>
              </tr>
            </tbody>
          </table>
        </b-tab>
        <b-tab title="Wands">
          <table class="table table-striped table-responsive">
            <thead>
              <tr>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Item';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Item
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Attunement';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Attunement
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Rarity';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Rarity
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Cost (gp)';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Cost (gp)
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='instock';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  In Stock
                </a></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredWands" :key="item.Item">
                <td><a href="#" @click.stop="magicItemInfo(item)">{{item.Item}}</a></td>
                <td>{{item.Attunement}}</td>
                <td>{{item.Rarity}}</td>
                <td>{{item['Cost (gp)']}}</td>
                <td>{{item.instock}}</td>
              </tr>
            </tbody>
          </table>
        </b-tab>
        <b-tab title="Weapons">
          <table class="table table-striped table-responsive">
            <thead>
              <tr>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Item';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Item
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Attunement';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Attunement
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Rarity';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Rarity
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Cost (gp)';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Cost (gp)
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='instock';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  In Stock
                </a></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredWeapons" :key="item.Item">
                <td><a href="#" @click.stop="magicItemInfo(item)">{{item.Item}}</a></td>
                <td>{{item.Attunement}}</td>
                <td>{{item.Rarity}}</td>
                <td>{{item['Cost (gp)']}}</td>
                <td>{{item.instock}}</td>
              </tr>
            </tbody>
          </table>
        </b-tab>
        <b-tab title="Adv. Weapons">
          <table class="table table-striped table-responsive">
            <thead>
              <tr>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Item';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Item
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Attunement';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Attunement
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Rarity';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Rarity
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Cost (gp)';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Cost (gp)
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='instock';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  In Stock
                </a></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredAdvWeapons" :key="item.Item">
                <td><a href="#" @click.stop="magicItemInfo(item)">{{item.Item}}</a></td>
                <td>{{item.Attunement}}</td>
                <td>{{item.Rarity}}</td>
                <td>{{item['Cost (gp)']}}</td>
                <td>{{item.instock}}</td>
              </tr>
            </tbody>
          </table>
        </b-tab>
        <b-tab title="Armor">
          <table class="table table-striped table-responsive">
            <thead>
              <tr>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Item';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Item
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Attunement';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Attunement
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Rarity';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Rarity
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Cost (gp)';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Cost (gp)
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='instock';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  In Stock
                </a></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredArmor" :key="item.Item">
                <td><a href="#" @click.stop="magicItemInfo(item)">{{item.Item}}</a></td>
                <td>{{item.Attunement}}</td>
                <td>{{item.Rarity}}</td>
                <td>{{item['Cost (gp)']}}</td>
                <td>{{item.instock}}</td>
              </tr>
            </tbody>
          </table>
        </b-tab>
        <b-tab title="Other">
          <table class="table table-striped table-responsive">
            <thead>
              <tr>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Item';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Item
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Attunement';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Attunement
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Rarity';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Rarity
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='Cost (gp)';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  Cost (gp)
                </a></th>
                <th><a href="#" @click.stop="this.magicitemtables.sortBy='instock';this.magicitemtables.sortDesc = !this.magicitemtables.sortDesc">
                  In Stock
                </a></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredOther" :key="item.Item">
                <td><a href="#" @click.stop="magicItemInfo(item)">{{item.Item}}</a></td>
                <td>{{item.Attunement}}</td>
                <td>{{item.Rarity}}</td>
                <td>{{item['Cost (gp)']}}</td>
                <td>{{item.instock}}</td>
              </tr>
            </tbody>
          </table>
        </b-tab>
      </b-tabs>
    </div>
    <div class="col-sm-12" v-if="printMode">
      <div
        v-for="item in toPrint"
        :key="item.Item"
        style="margin-bottom: 50px; page-break-inside: avoid"
      >
        <h4 style="font-size: 3em">
          {{ item.Item }} ({{ item.Type }}, {{ item.Rarity }})
        </h4>
        <div v-html="marked.parse(item.Effect)" style="font-size: 1.5em"></div>
      </div>
      <button
        class="btn btn-success print-hide"
        @click="
          toPrint = [];
          printMode = false;
        "
      >
        Exit
      </button>
    </div>
  </div>
</template>
<script src="./js/magicitemcatalog.js"></script>
<style src="./scss/magicitemcatalog.scss" lang="scss" scoped></style>
