<template>
  <div class="row">
    <div class="col-sm-10">
      <!-- Character, Player, Class -->
      <div class="row">
        <div class="col">
          <input type="text" class="charsheet-text" v-model="character.name">
          Character Name
        </div>
        <div class="col">
          <input type="text" class="charsheet-text" v-model="character.player">
          Player
        </div>
        <div class="col">
          <select v-model="character.background" class="charsheet-text">
            <option :value="character.background">{{ character.background.name }}</option>
            <option v-for="background in backgrounds" :value="background"
                    :key="background.name">
              {{ background.name }}
            </option>
          </select>
          Background
        </div>
      </div>
      <!-- Race, Background, Alignment -->
      <div class="row">
        <div class="col">
          <select @change="setRaceDefaults()" v-model="character.race" class="charsheet-text">
            <option :value="character.race">{{ character.race.singular }}</option>
            <option v-for="ancestry in ancestries" :key="ancestry.id" :value="ancestry">
              {{ ancestry.singular }}
            </option>
          </select>
          <div class="print-hide">
            <input type="text" class="charsheet-text" v-model="character.race.singular" />
          </div>
          Ancestry
        </div>
        <div class="col">
          <div class="charsheet-text">{{ classtext }}</div>
          Class(es)
        </div>
      </div>
    </div>
    <div class="col-sm-2" v-if="!mobile">
      <img v-if="!character.image" src="https://elthelas-images.herokuapp.com/swordshieldlogo.png" class="ddlogo desktop print-hide" />
      <img v-else :src="character.image"
           :alt="character.name" class="ddlogo desktop" />
    </div>
  </div>
</template>
<script src="./js/characterheader.js"></script>
