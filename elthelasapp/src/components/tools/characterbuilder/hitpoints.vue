<template>
  <div>
    <div class="row">
      <div class="col">
        <div class="charsheet-static">
          HP: <input type="number" class="charsheet-num" v-model="character.hpcurrent" /> / {{ getHPTotal }} Max <br />
          Temporary: <input type="number" class="charsheet-num" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="charsheet-static">
          Hit Dice<br />
          <div v-for="cc in character.charclasses" :key="cc.thisclass.name">
            <input type="number" class="charsheet-num" v-model="cc.hitdice" /> / {{ cc.level }}d{{ cc.thisclass.hitdie }}
          </div>
        </div>
      </div>
    </div>
    <div class="row print-hide" style="margin-top: 10px;">
      <div class="btn-group col-12">
        <button class="btn btn-primary" @click="shortrest()">Short Rest</button>
        <button class="btn btn-success" @click="longrest()">Long Rest</button>
      </div>
    </div>
  </div>
</template>
<script src="./js/hitpoints.js"></script>
<style src="../scss/characterbuilder.scss" lang="scss" scoped></style>
