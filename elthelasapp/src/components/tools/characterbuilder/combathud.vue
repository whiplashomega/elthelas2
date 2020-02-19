<template>
  <div class="combat-hud">
    <div class="row">
      <div class="col-5">
        <div class="charsheet-static">
          <h6>Select Skills</h6>
          <div class="row">
            <div class="col">
              {{ acrobatics.name }}<br />
              <button @click="rollCheck(getSkillMod(acrobatics))"><span v-if="getSkillMod(acrobatics) > -1">+</span>{{ getSkillMod(acrobatics) }}</button>
            </div>
            <div class="col">
              {{ athletics.name }}<br />
              <button @click="rollCheck(getSkillMod(athletics))"><span v-if="getSkillMod(athletics) > -1">+</span>{{ getSkillMod(athletics) }}</button>
            </div>
            <div class="col">
              {{ perception.name }}<br />
              <button @click="rollCheck(getSkillMod(perception))"><span v-if="getSkillMod(perception) > -1">+</span>{{ getSkillMod(perception) }}</button>
            </div>
            <div class="col">
              {{ stealth.name }}<br />
              <button @click="rollCheck(getSkillMod(stealth))"><span v-if="getSkillMod(stealth) > -1">+</span>{{ getSkillMod(stealth) }}</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-2">
        <div class="charsheet-static">
          Save DCs
          <div v-for="cl in character.charclasses"
               :key="cl.thisclass.name" v-if="cl.savedcstat">
            {{ cl.thisclass.name }}
            Save DC: {{ getSaveDC(cl.savedcstat) }}
          </div>
        </div>
      </div>
      <div class="col-5">
        <div class="charsheet-static">
          <h6>Saves</h6>
          <div class="row">
            <div class="col">
              STR<br />
              <button @click="rollCheck(getSaveMod(0))"><span v-if="getSaveMod(0) > -1">+</span>{{ getSaveMod(0) }}</button>
            </div>
            <div class="col">
              DEX<br />
              <button @click="rollCheck(getSaveMod(1))"><span v-if="getSaveMod(1) > -1">+</span>{{ getSaveMod(1) }}</button>
            </div>
            <div class="col">
              CON<br />
              <button @click="rollCheck(getSaveMod(2))"><span v-if="getSaveMod(2) > -1">+</span>{{ getSaveMod(2) }}</button>
            </div>
            <div class="col">
              INT<br />
              <button @click="rollCheck(getSaveMod(3))"><span v-if="getSaveMod(3) > -1">+</span>{{ getSaveMod(3) }}</button>
            </div>
            <div class="col">
              WIS<br />
              <button @click="rollCheck(getSaveMod(4))"><span v-if="getSaveMod(4) > -1">+</span>{{ getSaveMod(4) }}</button>
            </div>
            <div class="col">
              CHA<br />
              <button @click="rollCheck(getSaveMod(5))"><span v-if="getSaveMod(5) > -1">+</span>{{ getSaveMod(5) }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <div class="row">
          <div class="col-4">
            <hitpoints />
            <combat />
          </div>
          <div class="col-8">
            <attacks />
          </div>
        </div>
        <resources />
      </div>
      <div class="col-6">
        <actions />
      </div>
    </div>
  </div>
</template>
<script src="./js/combathud.js"></script>
<style src="./scss/characterbuilder.scss" lang="scss"></style>
