<template>
  <div>
    <p>"Divine" beings are incredibly powerful immortal beings that do not rise to the level of Gods. They are lieutenants of Gods, Fey creatures, demonic lords, ancient urges from beyond the planes and many more.</p>
    <select v-model="divineFilter" class="form-control" @change="filterDivines">
      <option value="" selected>Filter By Type</option>
      <option v-for="type in types" :value="type" :key="type">{{ type }}</option>
    </select>
    <div v-for="divine in filteredDivines" :key="divine.id">
      <h3>{{ divine.name }}</h3>
      <h4>Alignment: {{ divine.alignment }}</h4>
      <h4>Type: {{ divine.type }}</h4>
      <h4>Planar Home: {{ divine.home }}</h4>
      <div v-html="divine.descr"></div>
    </div>
  </div>
</template>
<script src="./js/divines.js"></script>
<style src="./scss/divines.scss" lang="scss" scoped></style>
