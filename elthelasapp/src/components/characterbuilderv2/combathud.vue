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
          Save DC & Spell Attack
          <div v-for="cl in character.charclasses"
               :key="cl.thisclass.name">
            {{ cl.thisclass.name }}
            DC: {{ getSaveDC(cl.savedcstat, cl) }}
            Att: {{ getAttBonus(cl.savedcstat, cl) }}
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
        <div class="charsheet-static">
          <h4>Active Modifiers</h4>
          <div class="row">
            <div class="col-7">Modifier</div>
            <div class="col-2">Time</div>
            <div class="col-2">Concentration?</div>
          </div>
          <div class="row" v-for="mod in character.activemodifiers" :key="mod.id">
            <div class="col-7"><input type="text" v-model="mod.modifier" class="charsheet-text" /></div>
            <div class="col-2"><input type="number" v-model="mod.remaining" class="charsheet-num" /></div>
            <div class="col-2"><select v-model="mod.concentrating" class="charsheet-text">
              <option :value="false">No</option>
              <option :value="true">Yes</option>
            </select></div>
            <div class="col-1"><button @click="removeActiveModifier(mod.id)" class="btn btn-sm btn-danger">X</button></div>
          </div>
          <div class="row">
            <div class="btn-group col">
              <button @click="addActiveModifier()" class="btn btn-sm btn-primary">+</button>
            </div>
          </div>
          <p>Active Concentration Effects: {{ numConcentrating }}</p>
          <h5>Pass Time</h5>
          <div class="row">
            <div class="btn-group col">
              <button @click="passTime(1)" class="btn btn-sm btn-primary">1 Round</button>
              <button @click="passTime(10)" class="btn btn-sm btn-primary">1 Minute</button>
              <button @click="passTime(100)" class="btn btn-sm btn-primary">10 Minutes</button>
              <button @click="passTime(600)" class="btn btn-sm btn-primary">1 hour</button>
              <button @click="passTime(4800)" class="btn btn-sm btn-primary">8 hours</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./js/combathud.js"></script>
