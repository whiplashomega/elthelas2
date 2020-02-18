<template>
  <div class="container">
    <div class="row" v-if="!mobile">
      <div class="print-hide col-sm-12">
        <loadsave minimal />
      </div>
      <div class="print-full" :class="buildHide ? 'col-12' : 'col-8'">
        <characterheader />
        <div class="row">
          <div class="col-7">
            <div class="row">
              <!-- Ability Scores -->
              <div class="col-7" v-if="!hideleft">
                <abilityscores />
                <skills />
              </div>
              <div :class="hideleft ? 'col-12' : 'col-5'">
                <!-- Initiative -->
                <initiative />
                <!-- HP -->
                <hitpoints :key="hitdicechanged" />
                <!-- Combat -->
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
                <button class="btn btn-primary btn-sm" @click="hideleft = !hideleft"><span v-if="!hideleft">Hide</span><span v-if="hideleft">Show</span> Left</button>&nbsp;
                <button class="btn btn-primary btn-sm" @click="buildHide = !buildHide"><span v-if="!buildHide">Hide</span><span v-if="buildHide">Show</span> Build</button>&nbsp;
                <button class="btn btn-primary btn-sm" @click="showActions = !showActions"><span v-if="showActions">Hide</span><span v-if="!showActions">Show</span> Actions</button>&nbsp;
                <button class="btn btn-primary btn-sm" @click="combatModal = true">Combat HUD</button>
              </div>
            </div>
          </div>
        </div>
        <div class="print-hide">
          <loadsave :minimal="false" />
        </div>
        <div style="page-break-after: always">&nbsp;</div>
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
        <div class="row">
          <div class="col">
            <actions v-if="showActions" />
          </div>
        </div>
        <div style="page-break-after: always">&nbsp;</div>
        <!-- Fluff Details -->
        <appearance />
        <fluff />
      </div>
      <div class="col-4 print-hide" v-if="!buildHide">
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
                  <td><input type="checkbox" v-model="character.saves[0]" /></td>
                  <td><input type="checkbox" v-model="character.saves[1]" /></td>
                  <td><input type="checkbox" v-model="character.saves[2]" /></td>
                  <td><input type="checkbox" v-model="character.saves[3]" /></td>
                  <td><input type="checkbox" v-model="character.saves[4]" /></td>
                  <td><input type="checkbox" v-model="character.saves[5]" /></td>
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
            Stat Rolls: <span v-for="(roll, index) in statRolls" :key="index">{{ roll }} </span>
            <input type="button" @click="rollStats()" value="Roll!" />
          </div>
        </div>
        <bonus />
        <createcreature />
        <campaigninfo />
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
          <hitpoints :key="hitdicechanged" />
          <combat />
          <actions />
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
          <resources />
        </b-tab>
        <b-tab title="Equipment">
          <equipment />
        </b-tab>
        <b-tab title="Features">
          <features />
        </b-tab>
        <b-tab title="Fluff">
          <fluff />
        </b-tab>
        <b-tab title="Build">
          <loadsave :minimal="false" />
          <bonus />
        </b-tab>
        <b-tab title="Campaign">
          <campaigninfo />
        </b-tab>
      </b-tabs>
    </div>
    <loadsavemodals />
    <b-modal v-model="combatModal" title="Combat HUD"
             hide-footer size="xl">
      <div class="row">
        <div class="col-2">
          <hitpoints />
        </div>
        <div class="col-4">
          <attacks />
        </div>
        <div class="col-6">
          <actions />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <resources />
        </div>
      </div>
    </b-modal>
  </div>
</template>
<style src="./scss/characterbuilder.scss" scoped lang="scss"></style>
<script src="./js/characterbuilder.js"></script>
