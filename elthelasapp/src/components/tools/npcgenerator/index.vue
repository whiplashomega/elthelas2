<template>
  <div class="container">
    <h3>Basic Details</h3>
    <div class="row">
      <div class="col-sm-3">
        <label>Profession</label>
        <select v-model="npcgen.profession"></select>
      </div>
      <div class="col-sm-3">
        <label>Home Country</label>
        <select v-model="npcgen.homecountry"></select>
      </div>
      <div class="col-sm-3">
        <label>Gender</label>
        <select v-model="npcgen.gender">
          <option :value="false">Random</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  </div>
</template>
<script src="./npcgen.js"></script>
<style src="./npcgen.scss" lang="scss" scoped></style>
