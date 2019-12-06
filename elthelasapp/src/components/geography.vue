<template>
  <div class="col-sm-12">
    <h1>Geography</h1>
    <div class="btn-group">
      <input type="button" class="btn btn-primary"
             @click="showCities()" value="Cities" />
      <input type="button" class="btn btn-primary"
             @click="showContinents()" value="Continents and Oceans" />
      <input type="button" class="btn btn-primary"
             @click="showFeatures()" value="Geographical Features" />
      <input type="button" class="btn btn-primary"
             @click="showLandmarks()" value="Landmarks" />
      <input type="button" class="btn btn-primary"
             @click="showNations()" value="Nations" />
      <input type="button" class="btn btn-primary"
             @click="showAll()" value="Show All" />
    </div>
    <div id="map"></div>
    Latlong: [{{ mouselat }}, {{ mouselong }}]
    <h3>General Notes on the Geography and Climate of Elthelas</h3>
    <p>
      In general the climate of Elthelas is relatively mild. It has an axial tilt of ~15 degrees, causing correspondingly smaller polar and tropical regions, and larger temperate regions. Additionally periodic magical catastrophes (and the gods reaction to those catastrophes) have caused various areas to have unusual climates or geographical features. Notable examples include:
    </p>
    <ul>
      <li>the Desert of Despair is somehow magically prevented from receiving any rainfall.</li>
      <li>The mountains surrounding Nerim (that cause that region to receive little to no rainfall) were placed their by an act of the Gods after the cataclysm that destroyed that nation.</li>
      <li>The Glass Cliff was created by some magical event in the time before recorded history.</li>
      <li>Legend has it that the rust desert was the place where the Gods discarded their broken weapons at the end of the Gods War.</li>
      <li>The Black Shard Pass was carved by wizards seeking to create a new invasion route into Malinval.</li>
    </ul>
    <b-modal id="nationmodal" size="lg"
             @hide="hideModal" :title="nation.name"
             ok-only>
      <div>
        <div data-ng-if="nation.map != undefined" style="float:right; max-width: 40%;">
          <img :src="nation.map" :alt="nation.name" style="max-width:100%;" />
        </div>
        <p>
          <strong>Capitol: </strong> <router-link :to="'/geo/city/' + nation.capitol">{{ nation.capitol }}</router-link>
        </p>
        <p>
          <strong>Major Cities: </strong>
        </p>
        <ul><li v-for="city in nation.cities" :key="city"><router-link :to="'/geo/city/' + city">{{ city }}</router-link></li></ul>
        <p>
          <strong>Major Landmarks: </strong>
        </p>
        <ul><li v-for="landmark in nation.landmarks" :key="landmark"><router-link :to="'/geo/landmark/' + landmark">{{ landmark }}</router-link></li></ul>
        <p>
          <strong>Bordering Nations: </strong>
        </p>
        <ul>
          <li v-for="nat in nation.borders" :key="nat"><router-link :to="'/geo/nation/' + nat">{{ nat }}</router-link></li>
        </ul>
        <p>
          <strong>Population: </strong> {{ nation.population }}
        </p>
        <h4>Population Distribution</h4>
        <table class="table table-striped">
          <thead>
            <tr><th>Race</th><th>Population</th><th>Fraction of Total</th></tr>
          </thead>
          <tbody>
            <tr v-for="pop in nation.populationDistribution" :key="pop.race">
              <td><router-link :to="'/options/races/' + pop.race" >{{ pop.race }}</router-link></td>
              <td>{{ div(pop.proportion).mul(nation.population).toNumber() }}</td>
              <td>{{ div(pop.proportion).mul(100).toNumber() }}%</td>
            </tr>
            <tr>
              <td>Other</td>
              <td>{{ (otherSize * nation.population) }}</td>
              <td>{{ otherSize * 100 }}%</td>
            </tr>
          </tbody>
        </table>
        <h4>Government</h4>
        <p>
          <strong>Current Ruler: </strong> {{ nation.ruler }}
        </p>
        <div v-html="$options.filters.marked(nation.government)"></div>
        <h4>History</h4>
        <div v-html="$options.filters.marked(nation.history)"></div>
        <h4>Gods and Worship</h4>
        <p><strong>Commonly Worshipped Gods:</strong></p>
        <ul>
          <li v-for="god in nation.gods" :key="god"><router-link :to="'/ref/gods/' + god" >{{ god }}</router-link></li>
        </ul>
        <div v-html="$options.filters.marked(nation.worship)"></div>
        <h4>Cultural Notes</h4>
        <div v-html="$options.filters.marked(nation.culture)"></div>
        <h4>Economics</h4>
        <div v-html="$options.filters.marked(nation.economics)"></div>
        <h3>Laws Concerning Common Topics</h3>
        <h4>Slavery</h4>
        <div v-html="$options.filters.marked(nation.slavery)"></div>
        <h4>Magic</h4>
        <div v-html="$options.filters.marked(nation.magic)"></div>
        <h4>Property</h4>
        <div v-html="$options.filters.marked(nation.property)"></div>
        <h4>Citizenship</h4>
        <div v-html="$options.filters.marked(nation.citizenship)"></div>
      </div>
    </b-modal>
    <b-modal id="citymodal" size="lg"
             @hide="hideModal" :title="city.name"
             ok-only>
      <div v-if="city.map != undefined" style="float:right; max-width: 40%;">
        <img :src="city.map" :alt="city.name" style="max-width:100%;" />
      </div>
      <h4>National Allegiance: <router-link :to="'/geo/nation/' + city.nation">{{ city.nation }}</router-link></h4>
      <h3>Facts and Figures</h3>
      <table class="table table-striped" :class="city.map != undefined ? 'col-sm-6': ''">
        <tr>
          <th>Population (city)</th><td>{{ city.population }}</td>
        </tr>
        <tr>
          <th>Population (metro area)</th><td>{{ city.metro }}</td>
        </tr>
        <tr>
          <th>Racial Majority</th><td><router-link :to="'/options/races/' + city.majority" >{{ city.majority }}</router-link></td>
        </tr>
        <tr>
          <th>Ruling Race</th><td><router-link :to="'/options/races/' + city.ruling" >{{ city.ruling }}</router-link></td>
        </tr>
        <tr v-if="city.ruler != undefined">
          <th>Current Ruler</th><td>{{ city.ruler }}</td>
        </tr>
        <tr v-if="city.factions != undefined">
          <th>Major Factions</th><td><span v-for="faction in city.factions" :key="faction"><router-link :to="'/ref/orgs/' + faction">{{ faction }}</router-link></span></td>
        </tr>
        <tr>
          <th>Notable Minorities</th><td><span v-for="minority in city.minorities" :key="minority"><router-link :to="'/options/races/' + minority" >{{ minority }}</router-link>, </span></td>
        </tr>
        <tr>
          <th>Exports</th><td><span>{{ city.exports.join(", ") }}</span></td>
        </tr>
      </table>
      <h3 style="clear:both;">Description</h3>
      <div v-html="$options.filters.marked(city.description)"></div>
      <h3 v-if="city.landmarks != undefined && city.landmarks.length > 0">Major Landmarks</h3>
      <div v-for="landmark in city.landmarks" :key="landmark.name">
        <h4>{{ landmark.name }}</h4>
        <div v-html="$options.filters.marked(landmark.description)"></div>
      </div>
    </b-modal>
    <b-modal id="landmarkmodal" size="lg"
             @hide="hideModal" :title="landmark.name"
             ok-only>
      <div>
        <div v-html="$options.filters.marked(landmark.description)"></div>
        <ul v-if="landmark.contains != undefined && landmark.contains.length > 0">
          <li v-for="nation in landmark.contains" :key="nation"><router-link :to="'/geo/nation/' + nation">{{ nation }}</router-link></li>
        </ul>
        <div style="clear:both;">&nbsp;</div>
      </div>
    </b-modal>
    <b-modal id="featuremodal" size="lg"
             @hide="hideModal" :title="feature.name"
             ok-only>
      <div>
        <div v-html="$options.filters.marked(feature.description)"></div>
        <ul v-if="feature.contains != undefined && feature.contains.length > 0">
          <li v-for="nation in feature.contains" :key="nation"><router-link :to="'/geo/nation/' + nation">{{ nation }}</router-link></li>
        </ul>
        <div style="clear:both;">&nbsp;</div>
      </div>
    </b-modal>
    <b-modal id="continentmodal" size="lg"
             @hide="hideModal" :title="continent.name"
             ok-only>
      <div class="modal-body">
        <div v-html="$options.filters.marked(continent.description)"></div>
        <ul v-if="continent.contains != undefined && continent.contains.length > 0">
          <li v-for="nation in continent.contains" :key="nation"><router-link :to="'/geo/nation/' + nation">{{ nation }}</router-link></li>
        </ul>
        <div style="clear:both;">&nbsp;</div>
      </div>
    </b-modal>
  </div>
</template>
<script src="./js/geography.js"></script>
<style src="./scss/geography.scss" lang="scss" scoped></style>
