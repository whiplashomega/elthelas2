<template>
  <div class="container">
    <div class="row" v-if="!mobile">
      <div class="print-full" v-bind:class="buildHide ? 'col-12' : 'col-8'">
        <characterheader />
        <div class="row">
          <div class="col-7">
            <div class="row">
              <!-- Ability Scores -->
              <div class="col-7">
                <abilityscores />
              </div>
              <div class="col-5">
                <!-- Initiative -->
                <initiative />
                <!-- HP -->
                <hitpoints />
              </div>
            </div>
            <div class="row">
              <!-- skills -->
              <div class="col-7">
                <skills />
              </div>
              <div class="col-5">
                <combat />
                <!-- Equipment -->
                <equipment />
              </div>
            </div>
          </div>
          <div class="col-5">
            <div class="row">
              <div class="col">
                <!-- Attacks -->
                <attacks />
                <features />
              </div>
            </div>
            <div class="row print-hide">
              <div class="col">
                <input type="button" @click="buildHide = !buildHide" value="Hide Build Section" v-if="!buildHide" class="btn btn-primary" />
                <input type="button" @click="buildHide = !buildHide" value="Show Build Section" v-if="buildHide" class="btn btn-primary" />
              </div>
            </div>
          </div>
        </div>
        <br style="page-break-after: always" />
        <!-- Spells -->
        <div class="row">
          <div class="col-12">
            <spells />
          </div>
        </div>
        <!-- Resources -->
        <div class="row">
          <div class="col-12">
            <resources />
          </div>
        </div>
        <!-- Fluff Details -->
        <appearance />
        <div class="row">
          <div class="col">
            <div class="charsheet-static">
              <h5>Allies and Organizations</h5>
              <textarea v-model="character.allies" class="charsheet-textarea smalltext"></textarea>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="charsheet-static">
              <h5>Family</h5>
              <textarea v-model="character.family" class="charsheet-textarea smalltext"></textarea>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="charsheet-static">
              <h5>Backstory</h5>
              <textarea v-model="character.backstory" class="charsheet-textarea smalltext"></textarea>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="charsheet-static">
              <h5>Bond</h5>
              <textarea v-model="character.bond" class="charsheet-textarea smalltext"></textarea>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="charsheet-static">
              <h5>Personality</h5>
              <textarea v-model="character.personality" class="charsheet-textarea smalltext"></textarea>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="charsheet-static">
              <h5>Notes</h5>
              <textarea v-model="character.notes" class="charsheet-textarea smalltext"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4 print-hide" v-if="!buildHide">
        <loadsave />
        <h2>Build</h2>
        <buildclass />
        <div class="row">
          <div class="col">
            <table class="abilitytable">
              <thead>
                <tr><th>Stat</th><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th></tr>
              </thead>
              <tbody>
                <tr>
                  <th>Base</th>
                  <td><input type="number" v-model="character.stats[0]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.stats[1]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.stats[2]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.stats[3]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.stats[4]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.stats[5]" class="charsheet-num"></td>
                </tr>
                <tr>
                  <th>Racial</th>
                  <td><input type="number" v-model="character.race.stats[0]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.race.stats[1]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.race.stats[2]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.race.stats[3]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.race.stats[4]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.race.stats[5]" class="charsheet-num"></td>
                </tr>
                <tr>
                  <th>Bonus</th>
                  <td><input type="number" v-model="character.statbonus[0]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.statbonus[1]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.statbonus[2]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.statbonus[3]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.statbonus[4]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.statbonus[5]" class="charsheet-num"></td>
                </tr>
                <tr>
                  <th>Save</th>
                  <td><input type="checkbox" v-model="character.saves[0]"  /></td>
                  <td><input type="checkbox" v-model="character.saves[1]"  /></td>
                  <td><input type="checkbox" v-model="character.saves[2]"  /></td>
                  <td><input type="checkbox" v-model="character.saves[3]"  /></td>
                  <td><input type="checkbox" v-model="character.saves[4]"  /></td>
                  <td><input type="checkbox" v-model="character.saves[5]"  /></td>
                </tr>
                <tr>
                  <th>Save Bonus</th>
                  <td><input type="number" v-model="character.savebonus[0]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.savebonus[1]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.savebonus[2]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.savebonus[3]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.savebonus[4]" class="charsheet-num"></td>
                  <td><input type="number" v-model="character.savebonus[5]" class="charsheet-num"></td>
                </tr>
              </tbody>
            </table>
            Point Buy Total: {{ pointbuy }}<br />
            Stat Rolls: <span v-for="(roll, index) in statRolls" v-bind:key="index">{{roll}} </span>
            <input type="button" @click="rollStats()" value="Roll!" />
          </div>
        </div>
        <bonus />
      </div>
    </div>
    <div v-if="mobile">
      <b-tabs>
        <b-tab title="Basics">
          <characterheader />
          <buildclass />
          <appearance />
        </b-tab>
        <b-tab title="Stats">
          <div class="row">
            <div class="col">
              <abilityscores />
            </div>
          </div>
        </b-tab>
        <b-tab title="Skills">
          <skills />
        </b-tab>
        <b-tab title="Combat">
          <initiative />
          <hitpoints />
          <combat />
          <!-- Attacks -->
          <attacks />
        </b-tab>
        <b-tab title="Spells">
          <div class="row">
            <div class="col-12">
              <spells />
            </div>
          </div>
        </b-tab>
        <b-tab title="Resources">
          <div class="row">
            <div class="col-12">
              <div class="charsheet-static smalltext">
                <h4>Various Resources</h4>
                <div class="row" v-for="(resource, index) in character.resources"
                  v-bind:key="index">
                  <div class="col-5">
                    <input type="text" v-model="resource.name" class="charsheet-text" />
                  </div>
                  <input type="number" class="charsheet-num" v-model="resource.current" /> /
                  <input type="number" class="charsheet-num" v-model="resource.max" />
                  <select v-model="resource.recharge" class="charsheet-text col-3">
                    <option value="never">Never</option>
                    <option value="shortrest">Short Rest</option>
                    <option value="longrest">Long Rest</option>
                  </select>
                  <button class="btn btn-sm btn-danger print-hide" @click="removeResource(index)">X</button>
                </div>
                <button type="button" class="btn btn-sm print-hide btn-primary"
                  @click="addResource()">+</button>
                <button type="button" class="btn btn-sm btn-success print-hide" @click="populateResources()">Populate from Classes</button>
              </div>
            </div>
          </div>
        </b-tab>
        <b-tab title="Equipment">
          <equipment />
        </b-tab>
        <b-tab title="Features">
          <features />
        </b-tab>
        <b-tab title="Fluff">
          <div class="row">
            <div class="col">
              <div class="charsheet-static">
                <h5>Allies and Organizations</h5>
                <textarea v-model="character.allies" class="charsheet-textarea smalltext"></textarea>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="charsheet-static">
                <h5>Family</h5>
                <textarea v-model="character.family" class="charsheet-textarea smalltext"></textarea>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="charsheet-static">
                <h5>Backstory</h5>
                <textarea v-model="character.backstory" class="charsheet-textarea smalltext"></textarea>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="charsheet-static">
                <h5>Bond</h5>
                <textarea v-model="character.bond" class="charsheet-textarea smalltext"></textarea>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="charsheet-static">
                <h5>Personality</h5>
                <textarea v-model="character.personality" class="charsheet-textarea smalltext"></textarea>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="charsheet-static">
                <h5>Notes</h5>
                <textarea v-model="character.notes" class="charsheet-textarea smalltext"></textarea>
              </div>
            </div>
          </div>
        </b-tab>
        <b-tab title="Build">
          <loadsave />
          <bonus />
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<style src="./characterbuilder.scss" scoped lang="scss"></style>
<script src="./characterbuilder.js"></script>
