<template>
  <div class="charsheet-static smalltext">
    <h4>Various Resources</h4>
    <div class="row" v-for="(resource, index) in character.resources"
         :key="index" style="margin-top: 2px;">
      <div class="col-5">
        <input type="text" v-model="resource.name" class="charsheet-text" />
      </div>
      <button class="btn btn-sm btn-primary print-hide col-1" @click="useResource(index)">Use</button>
      <div class="col-2">
        <input type="number" class="charsheet-num" v-model="resource.current" /> /
        <input type="number" class="charsheet-num" v-model="resource.max" />
      </div>
      <div class="col-2">
        <select v-model="resource.recharge" class="charsheet-text">
          <option value="never">Never/Other</option>
          <option value="shortrest">Short Rest</option>
          <option value="longrest">Long Rest</option>
        </select>
      </div>
      <button class="btn btn-sm btn-danger print-hide col-1" @click="removeResource(index)">X</button>
    </div>
    <div class="row print-hide" style="margin-top: 10px;">
      <div class="btn-group col-12">
        <button type="button" class="btn btn-sm print-hide btn-primary"
                @click="addResource()">+</button>
        <button type="button" class="btn btn-sm btn-success print-hide" @click="populateResources()">Populate from Classes</button>
        <button class="btn btn-primary btn-sm" @click="shortrest()">Short Rest</button>
        <button class="btn btn-success btn-sm" @click="longrest()">Long Rest</button>
      </div>
    </div>
    <h6>Spell Slots</h6>
    <div class="row print-hide">
      <div class="col" v-for="i in 9" :key="i">
        Lvl {{ i }}: {{ character.availableslots["level" + i] }} / {{ totalslots("level" + i) }}
      </div>
      <div class="col">
        Wck: {{ character.warlockslotsavailable }} / {{ warlockSlots }} Lvl {{ warlockSlotLevel }}
      </div>
    </div>
  </div>
</template>
<script src="./js/resources.js"></script>
<style src="@/views/character/scss/characterbuilder.scss" lang="scss" scoped></style>
