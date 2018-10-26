<template>
<div class="row">
  <div class="col">
    <div class="charsheet-static">
      HP: <input type="number" class="charsheet-num" v-model="character.hpcurrent" /> / {{getHPTotal}} Max <br />
      Temporary: <input type="number" class="charsheet-num" />
    </div>
  </div>
</div>
</template>
<script src="./hitpoints.js"></script>
<style src="../characterbuilder.scss" lang="scss" scoped></style>
