<template>
	<div>
    <h1>Player Races</h1>
    <div>
      <div v-for="race in races" v-bind:key="race.id" class="racebuttondiv">
        <button class="racebutton btn btn-primary" @click="loadRace(race.id)">{{race.name}}</button>
      </div>
    </div>
    <p style="clear:both;">
      Note that for all PC races, starting languages are determined by country of origin, not race, although classes or backgrounds may provide bonus
      languages as specified in their descriptions.
    </p>
    <div id="raceDiv" v-if="currentRace.name">
      <h2>{{currentRace.name}}</h2>
      <img :src="currentRace.subraces[0].image" :alt="currentRace.name" class="raceimage" />
      <div v-html="$options.filters.marked(currentRace.description)"></div>
      <div class="subrace" v-for="(subrace, index) in currentRace.subraces" v-bind:key="subrace.id">
        <h3 v-if="subrace.name !== 'default'">{{subrace.name}}</h3>
        <img :src="subrace.image" :alt="subrace.name" v-if="subrace.image && index !== 0" class="raceimage" />
        <div v-html="$options.filters.marked(subrace.description)"></div>
        <ul>
          <li v-for="(trait, index) in currentRace.traits" v-bind:key="index"><div v-if="typeof trait === 'string'" v-html="$options.filters.marked(trait)"></div><div v-else><strong>{{trait.name}}</strong><span v-html="$options.filters.marked(trait.description)"></span></div></li>
          <li v-for="(trait, index) in subrace.traits" v-bind:key="index"><div v-if="typeof trait === 'string'" v-html="$options.filters.marked(trait)"></div><div v-else><strong>{{trait.name}}</strong><span v-html="$options.filters.marked(trait.description)"></span></div></li>
        </ul>
      </div>
    </div>
    	<h3 style="clear:both;">Age</h3>
    	<p>
    		Age in Elthelas differs from default D&amp;D, particularly in that none of the major races differ from humans in max age by more than an order
    		of magnitude.  Only dragons, outsiders, fae, and a few other animals and monsters live longer than 200 years without divine
    		or magical intervention.  Such intervention usually draws the ire of the Gods (specifically Nera, goddess of death and rebirth, but the other
    		Gods usually frown on it as well).
    	</p>
    	<p>
    		Typical ages of various life stages for each of the major races.  Note "max age" is not a strict maximum age, but rather the age when 95%
    		of any particular cohort has died.  Start of Puberty and Sexual Maturity are given in exact median age (any individual is usually +/- 2), all
    		others are rounded to the nearest multiple of 5.
    	</p>
    	<div class="row">
      	<div class="col-sm-6"><b-pagination :total-rows="ages.length" :per-page="agePerPage" v-model="ageCurrentPage"></b-pagination></div>
      	<div class="col-sm-6"><b-form-input v-model="ageFilter" placeholder="Type to Search" /></div>
    	</div>
      <b-table id="ageTable" striped responsive="sm"
        :items="ages"
        :fields="ageFields"
        :sort-by.sync="ageSortBy"
        :sort-desc.sync="ageSortDesc"
        :current-page="ageCurrentPage"
        :filter="ageFilter"
        :per-page="agePerPage"></b-table>
    	<h3>Height and Weight</h3>
    	<div class="row">
      	<div class="col-sm-6"><b-pagination :total-rows="hw.length" :per-page="hwPerPage" v-model="hwCurrentPage"></b-pagination></div>
      	<div class="col-sm-6"><b-form-input v-model="hwFilter" placeholder="Type to Search" /></div>
    	</div>
      <b-table id="ageTable" striped responsive="sm"
        :items="hw"
        :fields="hwFields"
        :sort-by.sync="hwSortBy"
        :sort-desc.sync="hwSortDesc"
        :current-page="hwCurrentPage"
        :filter="hwFilter"
        :per-page="hwPerPage"></b-table>
  </div>
</template>
<script src="./races.js"></script>
<style src="./races.scss" lang="scss" scoped></style>
