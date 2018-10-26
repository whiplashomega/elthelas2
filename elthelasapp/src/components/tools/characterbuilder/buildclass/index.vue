<template>
<div>
  <div class="row" v-for="(charclass, index) in character.charclasses" v-bind:key="index">
    <div class="col-sm-4">
      <select class="charsheet-text" v-model="charclass.thisclass">
        <option :value="charclass.thisclass">{{charclass.thisclass.name}}</option>
        <option v-for="classoption in classes" :value="classoption" v-bind:key="classoption.name">
          {{classoption.name}}
        </option>
      </select>
    </div>
    <div class="col-sm-6">
      <select class="charsheet-text" v-model="charclass.selsubclass">
        <option :value="charclass.selsubclass">{{charclass.selsubclass.name}}</option>
        <option v-for="subc in charclass.thisclass.subclass" :value="subc" v-bind:key="subc.name">
          {{subc.name}}
        </option>
      </select>
    </div>
    <div class="col-sm-2">
      <input type="number" class="charsheet-text" v-model="charclass.level" />
      <button type="button" class="btn btn-sm btn-danger" @click="removeclass(index)">X</button>
    </div>
  </div>
  <div class="row">
    <div class='col-12 btn-group'>
      <button class="btn btn-primary btn-sm" type="button" @click="addclass()">+</button>
    </div>
    Class(es)
  </div>
</div>
</template>
<script src="./buildclass.js"></script>
<style src="../characterbuilder.scss" lang="scss" scoped></style>
