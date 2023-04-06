<template>
  <div class="row">
    <div class="col">
      <div class="charsheet-static center">
        Initiative: <span v-if="characters.getInitMod > -1">+</span>{{ getInitMod }}
      </div>
    </div>
  </div>
</template>
<script src="./js/initiative.js"></script>
