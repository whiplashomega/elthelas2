<template>
  <div>
    <div v-if="!mobile">
      <table class="abilitytable">
      <thead>
        <tr><th>Ability</th><th>Score</th><th>Mod</th><th>Save</th></tr>
      </thead>
        <tbody>
          <tr><th>STR</th><td>{{getStatTotal(0)}}</td><td><span v-if="getStatMod(0) > -1">+</span>{{getStatMod(0)}}</td><td><span v-if="getSaveMod(0) > -1">+</span>{{getSaveMod(0)}}</td></tr>
          <tr><th>DEX</th><td>{{getStatTotal(1)}}</td><td><span v-if="getStatMod(1) > -1">+</span>{{getStatMod(1)}}</td><td><span v-if="getSaveMod(1) > -1">+</span>{{getSaveMod(1)}}</td></tr>
          <tr><th>CON</th><td>{{getStatTotal(2)}}</td><td><span v-if="getStatMod(2) > -1">+</span>{{getStatMod(2)}}</td><td><span v-if="getSaveMod(2) > -1">+</span>{{getSaveMod(2)}}</td></tr>
          <tr><th>INT</th><td>{{getStatTotal(3)}}</td><td><span v-if="getStatMod(3) > -1">+</span>{{getStatMod(3)}}</td><td><span v-if="getSaveMod(3) > -1">+</span>{{getSaveMod(3)}}</td></tr>
          <tr><th>WIS</th><td>{{getStatTotal(4)}}</td><td><span v-if="getStatMod(4) > -1">+</span>{{getStatMod(4)}}</td><td><span v-if="getSaveMod(4) > -1">+</span>{{getSaveMod(4)}}</td></tr>
          <tr><th>CHA</th><td>{{getStatTotal(5)}}</td><td><span v-if="getStatMod(5) > -1">+</span>{{getStatMod(5)}}</td><td><span v-if="getSaveMod(5) > -1">+</span>{{getSaveMod(5)}}</td></tr>
        </tbody>
      </table>
    </div>
    <div v-if="mobile">
      <table class="abilitytable">
        <thead>
          <tr><th>Stat</th><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th></tr>
        </thead>
        <tbody>
          <tr>
            <th>Total</th><td>{{getStatTotal(0)}}</td><td>{{getStatTotal(1)}}</td><td>{{getStatTotal(2)}}</td>
            <td>{{getStatTotal(3)}}</td><td>{{getStatTotal(4)}}</td><td>{{getStatTotal(5)}}</td>
          </tr>
          <tr>
            <th>Mod</th><td>{{getStatMod(0)}}</td><td>{{getStatMod(1)}}</td><td>{{getStatMod(2)}}</td>
            <td>{{getStatMod(3)}}</td><td>{{getStatMod(4)}}</td><td>{{getStatMod(5)}}</td>
          </tr>
          <tr>
            <th>Save</th><td>{{getSaveMod(0)}}</td><td>{{getSaveMod(1)}}</td><td>{{getSaveMod(2)}}</td>
            <td>{{getSaveMod(3)}}</td><td>{{getSaveMod(4)}}</td><td>{{getSaveMod(5)}}</td>
          </tr>
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
            <th>Save+</th>
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
</template>
<script src="./abilities.js"></script>
<style src="../characterbuilder.scss" lang="scss" scoped></style>
