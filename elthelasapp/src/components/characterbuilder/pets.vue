<template>
  <div class="charsheet-static">
    <h3>Pets</h3>
    <div v-for="pet in character.pets" :key="pet.id" class="row">
      <div class="col-sm-4">
        {{ pet.name }}
      </div>
      <div class="col-sm">
        AC: {{ pet.ac }}
      </div>
      <div class="col-sm">
        HP: <input type="number" class="charsheet-num" v-model="pet.hp" /> / {{ pet.hpmax }}
      </div>
      <div class="col-sm">
        <div class="btn-group">
          <button class="btn btn-primary btn-sm" @click="pet.showPetDetails = true">Details</button>
          <button class="btn btn-danger btn-sm" @click="deletePet(pet)">Delete</button>
        </div>
      </div>
      <b-modal v-model="pet.showPetDetails" :title="pet.name"
               size="lg" :modal-class="userinfo.themesetting"
               hide-footer>
        <div class="row">
          <div class="col-sm">
            <input type="text" class="charsheet-text" v-model="pet.name" />
            Name
          </div>
          <div class="col-sm">
            <input type="text" class="charsheet-text" v-model="pet.species" />
            Species
          </div>
          <div class="col-sm">
            <select v-model="pet.size" class="charsheet-text">
              <option value="tiny">Tiny</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="huge">Huge</option>
              <option value="gargantuan">Gargantuan</option>
            </select>
            Size
          </div>
          <div class="col-sm">
            <input type="text" v-model="pet.speed" class="charsheet-text" />
            Speed
          </div>
        </div>
        <div class="row">
          <div class="col-sm">
            <input type="number" class="charsheet-num" v-model="pet.ac" /><br />
            AC
          </div>
          <div class="col-sm">
            <input type="number" class="charsheet-num" v-model="pet.hpmax" /><br />
            HP Max
          </div>
          <div class="col-sm-8">
            <table class="abilitytable">
              <tr>
                <th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th>
              </tr>
              <tr>
                <td><input type="number" class="charsheet-num" v-model="pet.abilityscores[0]"></td>
                <td><input type="number" class="charsheet-num" v-model="pet.abilityscores[1]"></td>
                <td><input type="number" class="charsheet-num" v-model="pet.abilityscores[2]"></td>
                <td><input type="number" class="charsheet-num" v-model="pet.abilityscores[3]"></td>
                <td><input type="number" class="charsheet-num" v-model="pet.abilityscores[4]"></td>
                <td><input type="number" class="charsheet-num" v-model="pet.abilityscores[5]"></td>
              </tr>
              <tr>
                <td><span v-if="calcScoreMod(pet.abilityscores[0]) > 0">+</span>{{ calcScoreMod(pet.abilityscores[0]) }}</td>
                <td><span v-if="calcScoreMod(pet.abilityscores[1]) > 0">+</span>{{ calcScoreMod(pet.abilityscores[1]) }}</td>
                <td><span v-if="calcScoreMod(pet.abilityscores[2]) > 0">+</span>{{ calcScoreMod(pet.abilityscores[2]) }}</td>
                <td><span v-if="calcScoreMod(pet.abilityscores[3]) > 0">+</span>{{ calcScoreMod(pet.abilityscores[3]) }}</td>
                <td><span v-if="calcScoreMod(pet.abilityscores[4]) > 0">+</span>{{ calcScoreMod(pet.abilityscores[4]) }}</td>
                <td><span v-if="calcScoreMod(pet.abilityscores[5]) > 0">+</span>{{ calcScoreMod(pet.abilityscores[5]) }}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            Features
            <textarea v-model="pet.features" class="charsheet-text" style="min-height:200px;"></textarea>
          </div>
        </div>
      </b-modal>
    </div>
    <button class="btn btn-primary btn-sm" @click="addPet()">Add New</button>
    <button class="btn btn-primary btn-sm" @click="importPetModal = true">Import Creature</button>
    <b-modal v-model="importPetModal" title="Import Creature as Pet"
             :modal-class="userinfo.themesetting" hide-footer
             size="lg">
      <input type="text" v-model="creaturefilter" class="charsheet-text">
      Search
      <div style="overflow-y:scroll; height: 500px;">
        <b-table show-empty
                 id="creaturetable"
                 :striped="true" :bordered="false"
                 :responsive="true"
                 stacked="sm"
                 :items="filteredcreatures"
                 :fields="creaturestable.fields"
                 :sort-by.sync="creaturestable.sortBy"
                 :sort-desc.sync="creaturestable.sortDesc">
          <template v-slot:cell(name)="row"><span><a href="#" @click.stop="importPet(row.item, row.index, $event.target)">{{ row.value }}</a> </span></template>
        </b-table>
      </div>
    </b-modal>
  </div>
</template>
<script src="./js/pets.js"></script>
