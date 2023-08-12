<template>
  <div>
    <div class="row">
      <!-- AC -->
      <div class="col-4">
        <div class="charsheet-static center">
          AC<br />{{ accalc }}
        </div>
      </div>
      <div class="col-4">
        <div class="charsheet-static center">
          PP/Lvl<br />
          {{ pccalc }}
        </div>
      </div>
      <!-- Proficiency -->
      <div class="col-4">
        <div class="charsheet-static center">
          Prof<br /><span v-if="profbonus > -1">+</span>{{ profbonus }}
        </div>
      </div>
    </div>
    <!-- Speed -->
    <div class="row">
      <div class="col">
        <div class="charsheet-static">
          <div class="row">
            <div class="col">
              Speed: {{ getSpeedStat(0) }}m<br />
              Climb: {{ getSpeedStat(2) }}m<br />
              Burrow: {{ getSpeedStat(4) }}m
            </div>
            <div class="col">
              Fly: {{ getSpeedStat(1) }}m<br />
              Swim: {{ getSpeedStat(3) }}m
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Armor -->
    <div class="row combat-hud-hide">
      <div class="col">
        <div class="charsheet-static" id="armorbox">
          <h4>Armor</h4>
          <div class="smalltext" v-for="(armor, index) in character.armors" :key="index">
            {{ armor.name }}, {{ armor.type }}, AC {{ armorac(armor) }} <span v-if="armor.type !== 'Shield' && armor.type !== 'Unarmored Bonus'">({{ armor.ac }} + {{ Math.max(0, Math.min(getStatMod(1), armor.maxdex)) }})</span> , PC {{ armorpc(armor) }} <input type="checkbox" v-model="armor.equipped" />
            <button type="button" class="print-hide btn-symbol" @click="armor.edit = true">&#9998;</button>
            <button type="button" @click="removeArmor(index)" class="print-hide btn btn-sm btn-danger">X</button>
            <b-modal v-model="armor.edit" :class="userinfo.darkmode">
              Name:
              <input type="text" class="form-control" v-model="armor.name" />
              Type:
              <select v-model="armor.type" class="form-control">
                <option>Unarmored Bonus</option>
                <option>Light</option>
                <option>Medium</option>
                <option>Heavy</option>
                <option>Shield</option>
              </select>
              <div v-if="armor.type==='Unarmored Bonus'">
                Unarmored Bonus Stat
                <select v-model="armor.unarmoredstat" class="form-control">
                  <option :value="0">Strength</option>
                  <option :value="1">Dexterity</option>
                  <option :value="2">Constitution</option>
                  <option :value="3">Intelligence</option>
                  <option :value="4">Wisdom</option>
                  <option :value="5">Charisma</option>
                </select>
              </div>
              AC:
              <input type="number" v-model="armor.ac" class="form-control" />
              PP/Level:
              <input type="number" v-model="armor.pc" class="form-control" />
              Max Dex:
              <input type="number" v-model="armor.maxdex" class="form-control" />
            </b-modal>
          </div>
          <button type="button" @click="armormodal = true" class="btn btn-sm btn-primary print-hide">+</button>
          <b-modal v-model="armormodal" @ok="addArmor()" :modal-class="userinfo.themesetting">
            Name:
            <input type="text" class="form-control" v-model="newarmor.name" />
            Type:
            <select v-model="newarmor.type" class="form-control">
              <option>Unarmored Bonus</option>
              <option>Light Armor</option>
              <option>Medium Armor</option>
              <option>Heavy Armor</option>
              <option>Shield</option>
            </select>
            <div v-if="newarmor.type==='Unarmored Bonus'">
              Unarmored Bonus Stat
              <select v-model="newarmor.unarmoredstat" class="form-control">
                <option :value="0">Strength</option>
                <option :value="1">Dexterity</option>
                <option :value="2">Constitution</option>
                <option :value="3">Intelligence</option>
                <option :value="4">Wisdom</option>
                <option :value="5">Charisma</option>
              </select>
            </div>
            AC:
            <input type="number" v-model="newarmor.ac" class="form-control" />
            PP/Level:
            <input type="number" v-model="newarmor.pc" class="form-control" />
            Max Dex:
            <input type="number" v-model="newarmor.maxdex" class="form-control" />
          </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./js/combat.js"></script>
