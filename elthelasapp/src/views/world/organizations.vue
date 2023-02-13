<template>
  <div>
    <h2>Major Organizations</h2>
    <p>
      Nations, cities, governments and churches are not the only organizations that have sizable influence on the world.  Occupational groups, religious subsects and other groups with particular interests abound.
    </p>
    <p>
      Many of these organizations provide additional benefits to their members, particularly members of high power and standing can often get large benefits from their affiliation with the group, including additional training, or other benefits.
    </p>
    <div>
      <div v-for="org in organizations" class="racebuttondiv" :key="org.id">
        <button class="racebutton btn btn-primary" @click="loadOrg(org.id)">{{ org.title }}</button>
      </div>
    </div>
    <div id="raceDiv" v-if="!(currentOrg.id === 'error')">
      <h2>{{ currentOrg.title }}</h2>
      <div v-html="marked.parse(currentOrg.description)"></div>
      <div>
        <h4>Rules</h4>
        <ul>
          <li v-for="rule in currentOrg.rules" :key="rule" v-html="marked.parse(rule)"></li>
        </ul>
      </div>
      <div>
        <h3>Ranks</h3>
        <div v-for="rank in currentOrg.ranks" :key="rank.name">
          <h4>{{ rank.name }}</h4>
          <h6>Minimum Disposition: {{ rank.minDisposition }}</h6>
          <div v-html="marked.parse(rank.description)"></div>
          <div v-for="feature in currentOrg.features" :key="feature.name">
            <div v-if="feature.minrank === rank.index">
              <h5>Feature: {{ feature.name }}</h5>
              <div v-html="marked.parse(feature.description)"></div>            
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <h4>Nations with a Major Presence</h4>
        <ul>
          <li v-for="nation in currentOrg.nations" :key="nation">{{ nation }}</li>
        </ul>
      </div>
      <div class="col-sm-6">
        <h4>Cities with a Major Presence</h4>
        <ul>
          <li v-for="city in currentOrg.cities" :key="city">{{ city }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script src="./js/organizations.js"></script>
<style src="./scss/organizations.scss" lang="scss" scoped></style>
