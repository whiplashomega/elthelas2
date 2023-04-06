<template>
  <div>
    <div class="row">
      <div class="col-sm">
        <input type="text" class="charsheet-text" v-model="character.gender">
        Gender
      </div>
      <div class="col-sm">
        <input type="text" class="charsheet-text" v-model="character.god">
        God Worshipped
      </div>
      <div class="col-sm">
        <select v-model="character.alignment" class="charsheet-text">
          <option value="Lawful Good">Lawful Good</option>
          <option value="Neutral Good">Neutral Good</option>
          <option value="Chaotic Good">Chaotic Good</option>
          <option value="Lawful Neutral">Lawful Neutral</option>
          <option value="Neutral">Neutral</option>
          <option value="Chaotic Neutral">Chaotic Neutral</option>
          <option value="Lawful Evil">Lawful Evil</option>
          <option value="Neutral Evil">Neutral Evil</option>
          <option value="Chaotic Evil">Chaotic Evil</option>
        </select>
        Alignment
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
        <input type="text" class="charsheet-text" v-model="character.age">
        Age
      </div>
      <div class="col-sm">
        <input type="text" class="charsheet-text" v-model="character.height">
        Height <button class="btn-sm btn-primary" @click="rollHeightWeight()">Roll</button>
      </div>
      <div class="col-sm">
        <input type="text" class="charsheet-text" v-model="character.weight">
        Weight
      </div>
      <div class="col-sm">
        <input type="text" class="charsheet-text" v-model="character.hair">
        Hair
      </div>
      <div class="col-sm">
        <input type="text" class="charsheet-text" v-model="character.eyes">
        Eyes
      </div>
      <div class="col-sm">
        <input type="text" class="charsheet-text" v-model="character.skin">
        Skin
      </div>
    </div>
    <div class="row print-hide">
      <input type="file" id="imageload" class="col-sm" />
      <div class="col-sm">
        <input type="button" @click="loadimage()"
               class="btn btn-success" value="upload image" />
      </div>
    </div>
    <div class="row print-hide" v-if="character.image">
      <div class="col">
        <img :src="character.image" :alt="character.name" style="max-width:100%;" />
      </div>
    </div>
  </div>
</template>
<script src="./js/appearance.js"></script>
