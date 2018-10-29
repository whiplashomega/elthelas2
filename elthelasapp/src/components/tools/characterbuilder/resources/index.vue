<template>
<div class="charsheet-static smalltext">
  <h4>Various Resources</h4>
  <div class="row" v-for="(resource, index) in character.resources"
    :key="index">
    <div class="col-5">
      <input type="text" v-model="resource.name" class="charsheet-text" />
    </div>
    <input type="number" class="charsheet-num" v-model="resource.current" /> /
    <input type="number" class="charsheet-num" v-model="resource.max" />
    <select v-model="resource.recharge" class="charsheet-text col-3">
      <option value="never">Never/Other</option>
      <option value="shortrest">Short Rest</option>
      <option value="longrest">Long Rest</option>
    </select>
    <button class="btn btn-sm btn-danger print-hide" @click="removeResource(index)">X</button>
  </div>
  <button type="button" class="btn btn-sm print-hide btn-primary"
    @click="addResource()">+</button>
  <button type="button" class="btn btn-sm btn-success print-hide" @click="populateResources()">Populate from Classes</button>
</div>
</template>
<script src="./resources.js"></script>
<style src="../characterbuilder.scss" lang="scss" scoped></style>
