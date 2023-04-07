<template>
  <div>
    <div class="row" v-for="(charclass, index) in character.charclasses" :key="index">
      <div class="col-sm-3">
        <select class="charsheet-text" v-model="charclass.thisclass">
          <option :value="charclass.thisclass">{{ charclass.thisclass.name }}</option>
          <option v-for="classoption in classes" :value="classoption" :key="classoption.name">
            {{ classoption.name }}
          </option>
        </select>
      </div>
      <div class="col-sm-4">
        <select class="charsheet-text" v-model="charclass.selsubclass">
          <option :value="charclass.selsubclass">{{ charclass.selsubclass.name }}</option>
          <option v-for="subc in charclass.thisclass.subclass" :value="subc" :key="subc.name">
            {{ subc.name }}
          </option>
        </select>
      </div>
      <div class="col-sm-2">
        <input type="number" class="charsheet-text" v-model="charclass.level" />
      </div>
      <div class="col-sm-2">
        <select class="charsheet-text" v-model="charclass.savedcstat">
          <option :value="0">STR</option>
          <option :value="1">DEX</option>
          <option :value="2">CON</option>
          <option :value="3">INT</option>
          <option :value="4">WIS</option>
          <option :value="5">CHA</option>
        </select>
      </div>
      <div class="col-sm-1">
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
<script src="./js/buildclass.js"></script>
