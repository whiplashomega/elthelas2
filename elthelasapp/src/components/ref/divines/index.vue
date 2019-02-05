<template>
  <div>
    <h2>Divines</h2>
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
<script src="./divines.js"></script>
<style src="./divines.scss" lang="scss" scoped></style>
