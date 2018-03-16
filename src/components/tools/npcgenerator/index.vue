<template>
  <div class="col-sm-12">
    <div class="row">
      <div class="col-sm-2">
        <b-select v-model="character.race">
          <option value="">Select a Race</option>
          <option v-for="race in races" :value="race" v-bind:key="race.id">{{race.name}}</option>
        </b-select>
      </div>
      <div class="col-sm-2">
        <b-select v-model="character.primarystat">
          <option value="">Select Primary Attribute</option>
          <option :value="stat" v-for="stat in primestats" v-bind:key="stat">{{stat}}</option>
        </b-select>
      </div>
      <div class="col-sm-2">
        <b-select v-model="character.skilllevel">
          <option value="">Select Skill Level</option>
          <option :value="statarray" v-for="statarray in statarrays" v-bind:key="statarray.name">{{statarray.name}}</option>
        </b-select>
      </div>
      <div class="col-sm-2">
        <input type="text" v-model="character.name" class="form-control" placeholder="character name" />
        <input type="button" class="btn btn-primary" @click="generateName()" value="Generate" />
      </div>
    </div>
  </div>
</template>
<script src="./npcgen.js"></script>
<style src="./npcgen.scss" lang="scss" scoped></style>
