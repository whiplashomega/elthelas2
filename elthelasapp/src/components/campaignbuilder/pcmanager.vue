<template>
  <div>
    PC Manager
    <div class="row">
      <div class="col-sm-3">
        <input type="text" v-model="pcid" class="charsheet-text" title="input the character id number found in the campaign info section of the character sheet to add them to the tracker." />
      </div>
      <div class="col-sm-1 btn-group">
        <button class="btn btn-primary btn-sm" @click="addToCampaign()">Add PC</button>
      </div>
    </div>
    <div class="row">
      <div v-for="pc in pcs" :key="pc._id" class="col-sm-3">
        <h4><router-link :to="'/tools/charbuilder/' + pc._id" target="_blank">{{ pc.name }}</router-link></h4>
        <div class="btn-group">
          <button @click="reloadCharacter(pc)" class="btn btn-success">Reload</button>
          <button @click="removeFromCampaign(pc)" class="btn btn-danger">Remove</button>
        </div>
        <div class="row">
          <div class="col-6">
            <div class="charsheet-static center">
              AC<br />{{ acCalc(pc) }}
            </div>
          </div>
          <div class="col-6">
            <div class="charsheet-static center">
              Initiative: <span v-if="initMod(pc) > -1">+</span>{{ initMod(pc) }}
            </div>
          </div>
        </div>
        <table class="abilitytable">
          <thead>
            <tr><th>Ability</th><th>Score</th><th>Mod</th><th>Save</th></tr>
          </thead>
          <tbody>
            <tr>
              <th>STR</th><td>{{ statTotal(pc, 0) }}</td>
              <td><button @click="rollCheck(statMod(pc, 0))"><span v-if="statMod(pc, 0) > -1">+</span>{{ statMod(pc, 0) }}</button></td>
              <td><button @click="rollCheck(saveMod(pc, 0))"><span v-if="saveMod(pc, 0) > -1">+</span>{{ saveMod(pc, 0) }}</button></td>
            </tr>
            <tr>
              <th>DEX</th><td>{{ statTotal(pc, 1) }}</td>
              <td><button @click="rollCheck(statMod(pc, 1))"><span v-if="statMod(pc, 1) > -1">+</span>{{ statMod(pc, 1) }}</button></td>
              <td><button @click="rollCheck(saveMod(pc, 1))"><span v-if="saveMod(pc, 1) > -1">+</span>{{ saveMod(pc, 1) }}</button></td>
            </tr>
            <tr>
              <th>CON</th><td>{{ statTotal(pc, 2) }}</td>
              <td><button @click="rollCheck(statMod(pc, 2))"><span v-if="statMod(pc, 2) > -1">+</span>{{ statMod(pc, 2) }}</button></td>
              <td><button @click="rollCheck(saveMod(pc, 2))"><span v-if="saveMod(pc, 2) > -1">+</span>{{ saveMod(pc, 2) }}</button></td>
            </tr>
            <tr>
              <th>INT</th><td>{{ statTotal(pc, 3) }}</td>
              <td><button @click="rollCheck(statMod(pc, 3))"><span v-if="statMod(pc, 3) > -1">+</span>{{ statMod(pc, 3) }}</button></td>
              <td><button @click="rollCheck(saveMod(pc, 3))"><span v-if="saveMod(pc, 3) > -1">+</span>{{ saveMod(pc, 3) }}</button></td>
            </tr>
            <tr>
              <th>WIS</th><td>{{ statTotal(pc, 4) }}</td>
              <td><button @click="rollCheck(statMod(pc, 4))"><span v-if="statMod(pc, 4) > -1">+</span>{{ statMod(pc, 4) }}</button></td>
              <td><button @click="rollCheck(saveMod(pc, 4))"><span v-if="saveMod(pc, 4) > -1">+</span>{{ saveMod(pc, 4) }}</button></td>
            </tr>
            <tr>
              <th>CHA</th><td>{{ statTotal(pc, 5) }}</td>
              <td><button @click="rollCheck(statMod(pc, 5))"><span v-if="statMod(pc, 5) > -1">+</span>{{ statMod(pc, 5) }}</button></td>
              <td><button @click="rollCheck(saveMod(pc, 5))"><span v-if="saveMod(pc, 5) > -1">+</span>{{ saveMod(pc, 5) }}</button></td>
            </tr>
          </tbody>
        </table>
        <table class="abilitytable">
          <thead>
            <tr><th>Skill</th><th>Mod</th></tr>
          </thead>
          <tbody>
            <tr v-for="skill in pc.skills" :key="skill.name">
              <th>{{ skill.name }}</th>
              <td><button @click="rollCheck(skillMod(pc, skill))"><span v-if="skillMod(pc, skill) > -1">+</span>{{ skillMod(pc, skill) }}</button></td>
            </tr>
          </tbody>
        </table>
        <div class="charsheet-static">
          <h5>Proficiencies and Languages</h5>
          <p style="font-size:9px;margin-bottom:2px;"><strong>Armor: </strong>{{ pc.charclasses[0].thisclass.proficiencies.armor.join(", ") }}</p>
          <p style="font-size:9px;margin-bottom:2px;"><strong>Weapons: </strong>{{ pc.charclasses[0].thisclass.proficiencies.weapons.join(", ") }}</p>
          <p style="font-size:9px;margin-bottom:2px;"><strong>Tools: </strong>{{ pc.charclasses[0].thisclass.proficiencies.tools.join(", ") }}</p>
          <p style="font-size:9px;margin-bottom:2px;"><strong>Saves: </strong>{{ pc.charclasses[0].thisclass.proficiencies["saving throws"].join(", ") }}</p>
          <p v-html="pc.proficiencies" style="font-size:9px;margin-bottom:2px;"></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./js/pcmanager.js"></script>
