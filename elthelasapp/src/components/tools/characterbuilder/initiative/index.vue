<template>
  <div class="row">
    <div class="col">
      <div class="charsheet-static center">
        Initiative: <span v-if="getInitMod > -1">+</span>{{ getInitMod }}
      </div>
    </div>
  </div>
</template>
<script src="./initiative.js"></script>
<style src="../characterbuilder.scss" lang="scss" scoped></style>
