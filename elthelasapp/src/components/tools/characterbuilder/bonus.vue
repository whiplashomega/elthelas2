<template>
  <div>
    <div class="row">
      <h4 class="col-12">Various Bonuses</h4>
      <div class="col-3">
        <input class="charsheet-text" type="number" v-model="character.initmagic" />
        Initiative
      </div>
      <div class="col-3">
        <input class="charsheet-text" type="number" v-model="character.hpmagic" />
        Hit Points
      </div>
      <div class="col-3">
        <input class="charsheet-text" type="number" v-model="character.acmagic" />
        AC
      </div>
      <div class="col-3">
        <input class="charsheet-text" type="number" v-model="character.bonusfeats" />
        Bonus Feats
      </div>
    </div>
    <div class="row">
      <div class="col-2">
        <input class="charsheet-text" type="number" v-model="character.speedmagic[0]" />
        Speed
      </div>
      <div class="col-2">
        <input class="charsheet-text" type="number" v-model="character.speedmagic[1]" />
        Fly
      </div>
      <div class="col-2">
        <input class="charsheet-text" type="number" v-model="character.speedmagic[2]" />
        Climb
      </div>
      <div class="col-2">
        <input class="charsheet-text" type="number" v-model="character.speedmagic[3]" />
        Swim
      </div>
      <div class="col-2">
        <input class="charsheet-text" type="number" v-model="character.speedmagic[4]" />
        Burrow
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <select v-model="character.size" class="charsheet-text">
          <option value="tiny">Tiny</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="huge">Huge</option>
        </select>Effective Size for Carry Capacity
      </div>
      <div class="col-6">
        <input type="number" class="charsheet-text" v-model="character.capacitybonus" />
        Carry Capacity Bonus
      </div>
    </div>
    <h5>Bonus Spell Slots</h5>
    <div class="row">
      <div class="col-3">
        <input type="number" class="charsheet-text" v-model="character.bonusslots[0]" />
        level 1
      </div>
      <div class="col-3">
        <input type="number" class="charsheet-text" v-model="character.bonusslots[1]" />
        level 2
      </div>
      <div class="col-3">
        <input type="number" class="charsheet-text" v-model="character.bonusslots[2]" />
        level 3
      </div>
      <div class="col-3">
        <input type="number" class="charsheet-text" v-model="character.bonusslots[3]" />
        level 4
      </div>
      <div class="col-3">
        <input type="number" class="charsheet-text" v-model="character.bonusslots[4]" />
        level 5
      </div>
      <div class="col-3">
        <input type="number" class="charsheet-text" v-model="character.bonusslots[5]" />
        level 6
      </div>
      <div class="col-3">
        <input type="number" class="charsheet-text" v-model="character.bonusslots[6]" />
        level 7
      </div>
      <div class="col-3">
        <input type="number" class="charsheet-text" v-model="character.bonusslots[7]" />
        level 8
      </div>
      <div class="col-3">
        <input type="number" class="charsheet-text" v-model="character.bonusslots[8]" />
        level 9
      </div>
      <div class="col-3">
        <input type="number" class="charsheet-text" v-model="character.warlockslotsmagic" />
        Warlock
      </div>
    </div>
    <h5>Save DC Bonus</h5>
    <table class="table table-sm">
      <tr><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th></tr>
      <tr>
        <td><input type="number" class="charsheet-num" v-model="character.saveDCBonus[0]" /></td>
        <td><input type="number" class="charsheet-num" v-model="character.saveDCBonus[1]" /></td>
        <td><input type="number" class="charsheet-num" v-model="character.saveDCBonus[2]" /></td>
        <td><input type="number" class="charsheet-num" v-model="character.saveDCBonus[3]" /></td>
        <td><input type="number" class="charsheet-num" v-model="character.saveDCBonus[4]" /></td>
        <td><input type="number" class="charsheet-num" v-model="character.saveDCBonus[5]" /></td>
      </tr>
    </table>
    <h5>Spell Attack Bonus</h5>
    <table class="table table-sm">
      <tr><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th></tr>
      <tr>
        <td><input type="number" class="charsheet-num" v-model="character.attBonus[0]" /></td>
        <td><input type="number" class="charsheet-num" v-model="character.attBonus[1]" /></td>
        <td><input type="number" class="charsheet-num" v-model="character.attBonus[2]" /></td>
        <td><input type="number" class="charsheet-num" v-model="character.attBonus[3]" /></td>
        <td><input type="number" class="charsheet-num" v-model="character.attBonus[4]" /></td>
        <td><input type="number" class="charsheet-num" v-model="character.attBonus[5]" /></td>
      </tr>
    </table>
    <h5>Bonus Spells Known</h5>
    <table class="table table-sm">
      <tr v-for="(cls, index) in character.charclasses" :key="index">
        <td>{{ cls.thisclass.name }}</td><td><input type="number" v-model="cls.bonusknown" class="charsheet-num" /></td>
      </tr>
    </table>
    <h5>Damage Reduction</h5>
    <table class="table table-sm">
      <tr>
        <th>Piercing (Non-Magical)</th>
        <td>
          <select v-model="character.dr.piercing">
            <option value="0">0</option>
            <option value="3">3</option>
            <option value="resistance">Resistance</option>
            <option value="immunity">Immunity</option>
            <option value="vulnerable">Vulnerable</option>
          </select>
        </td>
      </tr>
      <tr>
        <th>Slashing (Non-Magical)</th>
        <td>
          <select v-model="character.dr.slashing">
            <option value="0">0</option>
            <option value="3">3</option>
            <option value="resistance">Resistance</option>
            <option value="immunity">Immunity</option>
            <option value="vulnerable">Vulnerable</option>
          </select>
        </td>
      </tr>
      <tr>
        <th>Bludgeoning (Non-Magical)</th>
        <td>
          <select v-model="character.dr.bludgeoning">
            <option value="0">0</option>
            <option value="3">3</option>
            <option value="resistance">Resistance</option>
            <option value="immunity">Immunity</option>
            <option value="vulnerable">Vulnerable</option>
          </select>
        </td>
      </tr>
      <tr>
        <th>Piercing (Magical)</th>
        <td>
          <select v-model="character.dr.mpiercing">
            <option value="0">0</option>
            <option value="3">3</option>
            <option value="resistance">Resistance</option>
            <option value="immunity">Immunity</option>
            <option value="vulnerable">Vulnerable</option>
          </select>
        </td>
      </tr>
      <tr>
        <th>Slashing (Magical)</th>
        <td>
          <select v-model="character.dr.mslashing">
            <option value="0">0</option>
            <option value="3">3</option>
            <option value="resistance">Resistance</option>
            <option value="immunity">Immunity</option>
            <option value="vulnerable">Vulnerable</option>
          </select>
        </td>
      </tr>
      <tr>
        <th>Bludgeoning (Magical)</th>
        <td>
          <select v-model="character.dr.mbludgeoning">
            <option value="0">0</option>
            <option value="3">3</option>
            <option value="resistance">Resistance</option>
            <option value="immunity">Immunity</option>
            <option value="vulnerable">Vulnerable</option>
          </select>
        </td>
      </tr>
      <tr>
        <th>Acid</th>
        <td>
          <select v-model="character.dr.acid">
            <option value="0">0</option>
            <option value="3">3</option>
            <option value="resistance">Resistance</option>
            <option value="immunity">Immunity</option>
            <option value="vulnerable">Vulnerable</option>
          </select>
        </td>
      </tr>
      <tr>
        <th>Cold</th>
        <td>
          <select v-model="character.dr.cold">
            <option value="0">0</option>
            <option value="3">3</option>
            <option value="resistance">Resistance</option>
            <option value="immunity">Immunity</option>
            <option value="vulnerable">Vulnerable</option>
          </select>
        </td>
      </tr>
      <tr>
        <th>Fire</th>
        <td>
          <select v-model="character.dr.fire">
            <option value="0">0</option>
            <option value="3">3</option>
            <option value="resistance">Resistance</option>
            <option value="immunity">Immunity</option>
            <option value="vulnerable">Vulnerable</option>
          </select>
        </td>
      </tr>
      <tr>
        <th>Force</th>
        <td>
          <select v-model="character.dr.force">
            <option value="0">0</option>
            <option value="3">3</option>
            <option value="resistance">Resistance</option>
            <option value="immunity">Immunity</option>
            <option value="vulnerable">Vulnerable</option>
          </select>
        </td>
      </tr>
      <tr>
        <th>Lightning</th>
        <td>
          <select v-model="character.dr.lightning">
            <option value="0">0</option>
            <option value="3">3</option>
            <option value="resistance">Resistance</option>
            <option value="immunity">Immunity</option>
            <option value="vulnerable">Vulnerable</option>
          </select>
        </td>
      </tr>
      <tr>
        <th>Necrotic</th>
        <td>
          <select v-model="character.dr.necrotic">
            <option value="0">0</option>
            <option value="3">3</option>
            <option value="resistance">Resistance</option>
            <option value="immunity">Immunity</option>
            <option value="vulnerable">Vulnerable</option>
          </select>
        </td>
      </tr>
      <tr>
        <th>Poison</th>
        <td>
          <select v-model="character.dr.poison">
            <option value="0">0</option>
            <option value="3">3</option>
            <option value="resistance">Resistance</option>
            <option value="immunity">Immunity</option>
            <option value="vulnerable">Vulnerable</option>
          </select>
        </td>
      </tr>
      <tr>
        <th>Psychic</th>
        <td>
          <select v-model="character.dr.psychic">
            <option value="0">0</option>
            <option value="3">3</option>
            <option value="resistance">Resistance</option>
            <option value="immunity">Immunity</option>
            <option value="vulnerable">Vulnerable</option>
          </select>
        </td>
      </tr>
      <tr>
        <th>Radiant</th>
        <td>
          <select v-model="character.dr.radiant">
            <option value="0">0</option>
            <option value="3">3</option>
            <option value="resistance">Resistance</option>
            <option value="immunity">Immunity</option>
            <option value="vulnerable">Vulnerable</option>
          </select>
        </td>
      </tr>
      <tr>
        <th>Thunder</th>
        <td>
          <select v-model="character.dr.thunder">
            <option value="0">0</option>
            <option value="3">3</option>
            <option value="resistance">Resistant</option>
            <option value="immunity">Immune</option>
            <option value="vulnerable">Vulnerable</option>
          </select>
        </td>
      </tr>
    </table>
  </div>
</template>
<script src="./js/bonus.js"></script>
<style src="./scss/characterbuilder.scss" lang="scss" scoped></style>
