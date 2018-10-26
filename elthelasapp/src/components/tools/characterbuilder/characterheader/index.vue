<template>
<div class="row">
  <div class="col-sm-9">
    <!-- Character, Player, Class -->
    <div class="row">
      <div class="col-sm">
        <input type="text" class="charsheet-text" v-model="character.name">
        Character Name
      </div>
      <div class="col-sm">
        <input type="text" class="charsheet-text" v-model="character.player">
        Player
      </div>
      <div class="col-sm">
        <select v-model="character.background" class="charsheet-text">
          <option :value="character.background">{{character.background.name}}</option>
          <option v-for="background in backgrounds" :value="background"
            v-bind:key="background.name">
            {{background.name}}
          </option>
        </select>
        Background
      </div>
    </div>
    <!-- Race, Background, Alignment -->
    <div class="row">
      <div class="col-sm-6">
        <select @change="setRaceDefaults()" v-model="character.race" class="charsheet-text">
          <option :value="character.race">{{character.race.singular}}</option>
          <option v-for="race in races" v-bind:key="race.id" :value="race">
            {{race.singular}}
          </option>
        </select>
        Race
      </div>
      <div class="col-sm-6">
        <div class="charsheet-text">{{classtext}}</div>
        Class(es)
      </div>
    </div>
    <!-- Faction, Home Country, Home Town -->
    <div class="row">
      <div class="col-sm-4">
        <select class="charsheet-text" v-model="character.faction">
          <option :value="character.faction">{{character.faction.title}}</option>
          <option v-for="faction in factions" :value="faction"
            v-bind:key="faction.id">{{faction.title}}</option>
        </select>
        Faction
      </div>
      <div class="col-sm-4">
        <input list="countrylist" type="text" class="charsheet-text" v-model="character.homecountry">
        Home Country
      </div>
      <datalist id="countrylist">
        <option :value="nation"
          v-for="nation in nations" v-bind:key="nation">{{nation}}</option>
      </datalist>
      <div class="col-sm-4">
        <input list="citylist" type="text" class="charsheet-text" v-model="character.hometown">
        Home Town
      </div>
      <datalist id="citylist">
        <option :value="city"
          v-for="city in cities" v-bind:key="city">{{city}}</option>
      </datalist>
    </div>
  </div>
  <div class="col-sm-3" v-if="!mobile"><img src="https://elthelas-images.herokuapp.com/ddlogo.png" class="ddlogo" /></div>
</div>
</template>
<script src="./characterheader.js"></script>
<style src="../characterbuilder.scss" lang="scss" scoped></style>
