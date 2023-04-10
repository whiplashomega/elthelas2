<template>
  <div>
    <div class="row">
      <div class="col">
        <div class="charsheet-static">
          HP: <input type="number" class="charsheet-num"
                     v-model="character.hpcurrent" disabled /> / {{ getHPTotal }} Max <br />
          Temporary: <input type="number" class="charsheet-num"
                            v-model="character.temphp" /> <br />
          Exhaustion: <input type="number" class="charsheet-num" v-model="character.exhaustion"
                             min=0 max=12 step=1 /> / {{ maxExhaustion }}
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="charsheet-static">
          <div class="row">
            <div class="col-sm-6">
              Damage: <input type="number" class="charsheet-num"
                             v-model="damagetaken" :min="0" />
            </div>
            <div class="col-sm-6">
              <div class="btn-group">
                <input type="button" class="btn btn-sm btn-danger"
                       value="Take Damage" @click="applyDamage()" />
              </div>
            </div>
          </div>
          <div class="alert alert-warning smalltext" v-if="character.dr[dtype] != '0'">
            Affected by Resistance
          </div>
          <select class="charsheet-text" v-model="dtype">
            <option value="piercing">Piercing</option>
            <option value="slashing">Slashing</option>
            <option value="bludgeoning">Bludgeoning</option>
            <option value="acid">Acid</option>
            <option value="cold">Cold</option>
            <option value="fire">Fire</option>
            <option value="force">Force</option>
            <option value="lightning">Lightning</option>
            <option value="necrotic">Necrotic</option>
            <option value="poison">Poison</option>
            <option value="psychic">Psychic</option>
            <option value="radiant">Radiant</option>
            <option value="thunder">Thunder</option>
            <option value="ignore">Ignores Resistance</option>
            <option value="healing">Healing</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row combat-hud-hide">
      <div class="col">
        <div class="charsheet-static">
          Hit Dice<br />
          <div v-for="cc in character.charclasses" :key="cc.thisclass.name">
            <input type="number" class="charsheet-num"
                   v-model="cc.hitdice" /> / {{ cc.level }}d{{ cc.thisclass.hitdie }}
          </div>
        </div>
      </div>
    </div>
    <div class="row print-hide combat-hud-hide" style="margin-top: 10px;">
      <div class="btn-group col-12 print-hide">
        <button class="btn btn-primary" @click="shortrest()">Short Rest</button>
        <button class="btn btn-success" @click="longrest()">Long Rest</button>
      </div>
    </div>
  </div>
</template>
<script src="./js/hitpoints.js"></script>
