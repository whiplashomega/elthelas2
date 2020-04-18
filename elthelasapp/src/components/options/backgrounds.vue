<template>
  <div id="#main" class="col-sm-10">
    <h1>Backgrounds</h1>
    <p>
      The following backgrounds are suggested possibilities for players.  Work with your DM to determine the background for your character.
    </p>
    <div v-for="background in backgrounds" :key="background.name"
         class="card" v-if="backgrounds">
      <h3 class="card-title">{{ background.name }}<button type="button" class="btn btn-primary float-right" @click="background.isCollapsed = !background.isCollapsed">
        <span v-if="!background.isCollapsed">&#x25B2;</span><span v-if="background.isCollapsed">&#x25BC;</span>
      </button></h3>
      <div v-if="!background.isCollapsed">
        <div marked="background.description"></div>
        <p v-if="background.skills">
          <strong>Skills: </strong>{{ background.skills.join(', ') }}<br />
          <strong>Tools: </strong>{{ background.tools.join(', ') }}<span v-if="background.tools.length === 0">None</span><br />
          <span v-if="background.languages"><strong>Languages: </strong>{{ background.languages }} of your choice</span>
        </p>
        <p>
          <strong>Equipment: </strong><span v-html="$options.filters.marked(background.equipment)"></span>
        </p>
        <h4 v-if="background.feature">Feature: {{ background.feature.name }}</h4>
        <div v-if="background.feature" v-html="$options.filters.marked(background.feature.description)"></div>
        <h4>Suggested Characteristics</h4>
        <div v-if="background.characteristics" v-html="$options.filters.marked(background.characteristics)"></div>
      </div>
    </div>
  </div>
</template>
<script src="./js/backgrounds.js"></script>
<style src="./scss/backgrounds.scss" lang="scss" scoped></style>
