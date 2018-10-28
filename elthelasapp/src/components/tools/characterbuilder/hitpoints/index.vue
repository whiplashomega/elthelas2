<template>
<div>
  <div class="row">
    <div class="col">
      <div class="charsheet-static">
        HP: <input type="number" class="charsheet-num" v-model="character.hpcurrent" /> / {{getHPTotal}} Max <br />
        Temporary: <input type="number" class="charsheet-num" />
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <div class="charsheet-static">
        Hit Dice<br />
        <div v-for="cc in character.charclasses" v-bind:key="cc.thisclass.name">
          <input type="number" class="charsheet-num" v-model="cc.hitdice" /> / {{cc.level}}d{{cc.thisclass.hitdie}}
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script src="./hitpoints.js"></script>
<style src="../characterbuilder.scss" lang="scss" scoped></style>
