<template>
  <div>
    <h1>Feats</h1>
    <div v-for="feat in featsort" :key="feat.name">
      <h4>{{ feat.name }}</h4>
      <h6 v-if="feat.prereq !== ''">Prerequisite: {{ feat.prereq }}</h6>
      <p v-html="$options.filters.marked(feat.description)"></p>
    </div>
  </div>
</template>
<script src="./js/feats.js"></script>
<style src="./scss/feats.scss" lang="scss" scoped></style>
