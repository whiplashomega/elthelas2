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
            <input type="number" class="charsheet-num" v-model="pet.ac" />
            AC
          </div>
          <div class="col-sm">
            <input type="number" class="charsheet-num" v-model="pet.hpmax" />
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
                <td>+{{ calcScoreMod(pet.abilityscores[0]) }}</td>
                <td>+{{ calcScoreMod(pet.abilityscores[1]) }}</td>
                <td>+{{ calcScoreMod(pet.abilityscores[2]) }}</td>
                <td>+{{ calcScoreMod(pet.abilityscores[3]) }}</td>
                <td>+{{ calcScoreMod(pet.abilityscores[4]) }}</td>
                <td>+{{ calcScoreMod(pet.abilityscores[5]) }}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <textarea v-model="pet.features"></textarea>
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
      <b-table show-empty
               id="creaturetable"
               :striped="true" :bordered="false"
               :responsive="true"
               stacked="sm"
               :items="filteredcreatures"
               :fields="creaturestable.fields"
               :sort-by.sync="creaturestable.sortBy"
               :sort-desc.sync="creaturestable.sortDesc">
        <template v-slot:cell(name)="row"><span><a href="#" @click.stop="importPet(row.item, row.index, $event.target)">{{ row.value }}</a> <button class="btn btn-warning btn-sm" @click="edit(row.item)" v-if="admin">&#9998;</button><button class="btn btn-sm btn-danger" @click="del(row.item)" v-if="admin">X</button></span></template>
      </b-table>
    </b-modal>
  </div>
</template>
<script src="./js/pets.js"></script>
<style src="./scss/characterbuilder.scss" lang="scss" scoped></style>
