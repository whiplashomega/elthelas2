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
  </div>
</template>
<script src="./bonus.js"></script>
<style src="../characterbuilder.scss" lang="scss" scoped></style>
