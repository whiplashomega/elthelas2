<template>
  <div class="row">
    <div class="col-3">
      <h4>Fighting Styles: {{ numStyles }}</h4>
      <div> Bonus: <input type="number" class="charsheet-num" v-model="character.bonusstyles" /></div>
      <div v-for="(style, index) in character.fightingstyles" :key="style.name">
        <select class="charsheet-text" v-model="character.fightingstyles[index]">
          <option :value="character.fightingstyles[index]" :title="character.fightingstyles[index].description">{{character.fightingstyles[index].name}}</option>
          <option v-for="fs in availablestyles" :key="fs.name" :value="fs" :title="fs.description">{{fs.name}}</option>
        </select>
      </div>
    </div>
    <div class="col-3">
      <h4>Infusions Known: {{numInfusionsKnown}}</h4>
      <div> Bonus: <input type="number" class="charsheet-num" v-model="character.bonusinfusions" /></div>
      <div v-for="(inf, index) in character.infusions" :key="inf.name">
        <select class="charsheet-text" v-model="character.infusions[index]">
          <option :value="character.infusions[index]" :title="character.infusions[index].description">{{character.infusions[index].name}}</option>
          <option v-for="avinf in availableinfusions" :key="avinf.name" :value="avinf" :title="avinf.description">{{avinf.name}}</option>
        </select>
      </div>
    </div>
    <div class="col-3">
      <h4>Metamagic Options: {{numMeta}}</h4>
      <div> Bonus: <input type="number" class="charsheet-num" v-model="character.bonusmetamagic" /></div>
      <div v-for="(meta, index) in character.metamagic" :key="metamagic.name">
        <select class="charsheet-text" v-model="character.metamagic[index]">
          <option :value="character.metamagic[index]" :title="meta.description">{{meta.name}}</option>
          <option v-for="avmeta in availablemetamagic" :key="avmeta.name" :value="avmeta" :title="avmeta.description">{{avmeta.name}}</option>
        </select>
      </div>
    </div>
    <div class="col-3">
      <h4>Invocations: {{numInvocations}}</h4>
      <div> Bonus: <input type="number" class="charsheet-num" v-model="character.bonusinvocations" /></div>
      <div v-for="(inv, index) in character.invocations" :key="inv.name">
        <select class="charsheet-text" v-model="character.invocations[index]">
          <option :value="character.invocations[index]" :title="inv.description">{{character.invocations[index].name}}</option>
          <option v-for="avinv in availableinvocations" :key="avinv.name" :title="avinv.description" :value="avinv">{{avinv.name}}</option>
        </select>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-3">
      <h4>Skill Tricks: {{numTricks}}</h4>
      <div> Bonus: <input type="number" class="charsheet-num" v-model="character.bonustricks" /></div>
      <div v-for="(inv, index) in character.skilltricks" :key="inv.name">
        <select class="charsheet-text" v-model="character.skilltricks[index]">
          <option :value="character.skilltricks[index]" :title="inv.description">{{character.skilltricks[index].name}}</option>
          <option v-for="avinv in availabletricks" :key="avinv.name" :title="avinv.description" :value="avinv">{{avinv.name}}</option>
        </select>
      </div>
    </div>
  </div>
</template>
<script src="./js/selectfeatures.js"></script>