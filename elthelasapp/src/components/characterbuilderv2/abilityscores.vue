<template>
  <div>
    <div v-if="!mobile">
      <table class="abilitytable">
        <thead>
          <tr><th>Ability</th><th>Score</th><th>Mod</th><th>Save</th></tr>
        </thead>
        <tbody>
          <tr>
            <th>STR</th><td>{{ getStatTotal(0) }}</td>
            <td><button @click="rollCheck(getStatMod(0))"><span v-if="getStatMod(0) > -1">+</span>{{ getStatMod(0) }}</button></td>
            <td><button @click="rollCheck(getSaveMod(0))"><span v-if="getSaveMod(0) > -1">+</span>{{ getSaveMod(0) }}</button></td>
          </tr>
          <tr>
            <th>DEX</th><td>{{ getStatTotal(1) }}</td>
            <td><button @click="rollCheck(getStatMod(1))"><span v-if="getStatMod(1) > -1">+</span>{{ getStatMod(1) }}</button></td>
            <td><button @click="rollCheck(getSaveMod(1))"><span v-if="getSaveMod(1) > -1">+</span>{{ getSaveMod(1) }}</button></td>
          </tr>
          <tr>
            <th>CON</th><td>{{ getStatTotal(2) }}</td>
            <td><button @click="rollCheck(getStatMod(2))"><span v-if="getStatMod(2) > -1">+</span>{{ getStatMod(2) }}</button></td>
            <td><button @click="rollCheck(getSaveMod(2))"><span v-if="getSaveMod(2) > -1">+</span>{{ getSaveMod(2) }}</button></td>
          </tr>
          <tr>
            <th>INT</th><td>{{ getStatTotal(3) }}</td>
            <td><button @click="rollCheck(getStatMod(3))"><span v-if="getStatMod(3) > -1">+</span>{{ getStatMod(3) }}</button></td>
            <td><button @click="rollCheck(getSaveMod(3))"><span v-if="getSaveMod(3) > -1">+</span>{{ getSaveMod(3) }}</button></td>
          </tr>
          <tr>
            <th>WIS</th><td>{{ getStatTotal(4) }}</td>
            <td><button @click="rollCheck(getStatMod(4))"><span v-if="getStatMod(4) > -1">+</span>{{ getStatMod(4) }}</button></td>
            <td><button @click="rollCheck(getSaveMod(4))"><span v-if="getSaveMod(4) > -1">+</span>{{ getSaveMod(4) }}</button></td>
          </tr>
          <tr>
            <th>CHA</th><td>{{ getStatTotal(5) }}</td>
            <td><button @click="rollCheck(getStatMod(5))"><span v-if="getStatMod(5) > -1">+</span>{{ getStatMod(5) }}</button></td>
            <td><button @click="rollCheck(getSaveMod(5))"><span v-if="getSaveMod(5) > -1">+</span>{{ getSaveMod(5) }}</button></td>
          </tr>
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
            <th>Total</th><td>{{ getStatTotal(0) }}</td><td>{{ getStatTotal(1) }}</td><td>{{ getStatTotal(2) }}</td>
            <td>{{ getStatTotal(3) }}</td><td>{{ getStatTotal(4) }}</td><td>{{ getStatTotal(5) }}</td>
          </tr>
          <tr>
            <th>Mod</th>
            <td v-for="n in 6" :key="n"><button @click="rollCheck(getStatMod(n - 1))">{{ getStatMod(n - 1) }}</button></td>
          </tr>
          <tr>
            <th>Save</th>
            <td v-for="n in 6" :key="n"><button @click="rollCheck(getSaveMod(n - 1))">{{ getSaveMod(n - 1) }}</button></td>
          </tr>
          <tr>
            <th>Base</th>
            <td v-for="n in 6" :key="n"><input type="number" v-model="character.stats[n - 1]" class="charsheet-num"></td>
          </tr>
          <tr>
            <th>Racial</th>
            <td v-for="n in 6" :key="n"><input type="number" v-model="character.race.stats[n - 1]" class="charsheet-num"></td>
          </tr>
          <tr>
            <th>Bonus</th>
            <td v-for="n in 6" :key="n"><input type="number" v-model="character.statbonus[n - 1]" class="charsheet-num"></td>
          </tr>
          <tr>
            <th>Save+</th>
            <td v-for="n in 6" :key="n"><input type="checkbox" v-model="character.saves[n - 1]" /></td>
          </tr>
          <tr>
            <th>Save Bonus</th>
            <td v-for="n in 6" :key="n"><input type="number" v-model="character.savebonus[n-1]" class="charsheet-num"></td>
          </tr>
        </tbody>
      </table>
      Point Buy Total: {{ characters.pointbuy }}<br />
      Stat Rolls:
      <span v-for="(roll, index) in statRolls"
            :key="index">{{ roll }} </span>
      <input type="button" @click="rollStats()"
             value="Roll!" />
    </div>
  </div>
</template>
<script src="./js/abilities.js"></script>
