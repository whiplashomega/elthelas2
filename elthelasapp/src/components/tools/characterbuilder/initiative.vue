<template>
  <div class="row">
    <div class="col">
      <div class="charsheet-static center">
        Initiative: <span v-if="getInitMod > -1">+</span>{{ getInitMod }}
      </div>
    </div>
  </div>
</template>
<script src="./js/initiative.js"></script>
<style src="../scss/characterbuilder.scss" lang="scss" scoped></style>
