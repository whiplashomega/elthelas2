<template>
  <div>
    <input type="number" v-model="cr" /> Expected CR
    <input type="button" class="btn btn-primary"
           @click="buildCreatureEntry()" value="Build Creature" />
    <b-modal v-model="creatureTextModal" title="Creature Entry">
      <div v-html="creatureText"></div>
    </b-modal>
  </div>
</template>
<script src="./js/createcreature.js"></script>
<style src="./scss/characterbuilder.scss" lang="scss"></style>
