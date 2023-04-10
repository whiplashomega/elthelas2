<template>
  <div>
    <div v-for="feat in featsort" :key="feat.name">
      <h4>{{ feat.name }}</h4>
      <h6 v-if="feat.prereq !== ''">Prerequisite: {{ feat.prereq }}</h6>
      <p v-html="marked.parse(feat.description)"></p>
    </div>
  </div>
</template>
<script src="./js/feats.js"></script>
