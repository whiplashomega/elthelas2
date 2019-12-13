<template>
  <div>
    PC Manager
    <input type="text" v-model="pcid" /><button class="btn btn-success" @click="addToCampaign()">Add PC</button>
    <div v-for="pc in pcs" :key="pc._id" class="col-sm-4">
      <h4><router-link :to="'/tools/charbuilder/' + pc._id" target="_blank">{{ pc.name }}</router-link></h4>
      <table class="abilitytable">
        <thead>
          <tr><th>Ability</th><th>Score</th><th>Mod</th><th>Save</th></tr>
        </thead>
        <tbody>
          <tr>
            <th>STR</th><td>{{ getStatTotal(pc, 0) }}</td>
            <td><button @click="rollCheck(getStatMod(pc, 0))"><span v-if="getStatMod(pc, 0) > -1">+</span>{{ getStatMod(pc, 0) }}</button></td>
            <td><button @click="rollCheck(getSaveMod(pc, 0))"><span v-if="getSaveMod(pc, 0) > -1">+</span>{{ getSaveMod(pc, 0) }}</button></td>
          </tr>
          <tr>
            <th>DEX</th><td>{{ getStatTotal(pc, 1) }}</td>
            <td><button @click="rollCheck(getStatMod(pc, 1))"><span v-if="getStatMod(pc, 1) > -1">+</span>{{ getStatMod(pc, 1) }}</button></td>
            <td><button @click="rollCheck(getSaveMod(pc, 1))"><span v-if="getSaveMod(pc, 1) > -1">+</span>{{ getSaveMod(pc, 1) }}</button></td>
          </tr>
          <tr>
            <th>CON</th><td>{{ getStatTotal(pc, 2) }}</td>
            <td><button @click="rollCheck(getStatMod(pc, 2))"><span v-if="getStatMod(pc, 2) > -1">+</span>{{ getStatMod(pc, 2) }}</button></td>
            <td><button @click="rollCheck(getSaveMod(pc, 2))"><span v-if="getSaveMod(pc, 2) > -1">+</span>{{ getSaveMod(pc, 2) }}</button></td>
          </tr>
          <tr>
            <th>INT</th><td>{{ getStatTotal(pc, 3) }}</td>
            <td><button @click="rollCheck(getStatMod(pc, 3))"><span v-if="getStatMod(pc, 3) > -1">+</span>{{ getStatMod(pc, 3) }}</button></td>
            <td><button @click="rollCheck(getSaveMod(pc, 3))"><span v-if="getSaveMod(pc, 3) > -1">+</span>{{ getSaveMod(pc, 3) }}</button></td>
          </tr>
          <tr>
            <th>WIS</th><td>{{ getStatTotal(pc, 4) }}</td>
            <td><button @click="rollCheck(getStatMod(pc, 4))"><span v-if="getStatMod(pc, 4) > -1">+</span>{{ getStatMod(pc, 4) }}</button></td>
            <td><button @click="rollCheck(getSaveMod(pc, 4))"><span v-if="getSaveMod(pc, 4) > -1">+</span>{{ getSaveMod(pc, 4) }}</button></td>
          </tr>
          <tr>
            <th>CHA</th><td>{{ getStatTotal(pc, 5) }}</td>
            <td><button @click="rollCheck(getStatMod(pc, 5))"><span v-if="getStatMod(pc, 5) > -1">+</span>{{ getStatMod(pc, 5) }}</button></td>
            <td><button @click="rollCheck(getSaveMod(pc, 5))"><span v-if="getSaveMod(pc, 5) > -1">+</span>{{ getSaveMod(pc, 5) }}</button></td>
          </tr>
        </tbody>
      </table>
      <button @click="removeFromCampaign(pc)" class="btn btn-danger">Remove</button>
    </div>
  </div>
</template>
<script src="./js/pcmanager.js"></script>
