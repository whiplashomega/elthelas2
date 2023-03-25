<template>
  <div>
    <h2>Factions</h2>
    <p>
      Through the course of play, DMs may choose to grant players the ability to join various factions. Joining a faction comes with responsibilities, risks, and rewards, as well as the potential to gain ranks and influence. Whenever players complete work on behalf of a faction, the DM may award disposition points to the players completing the work. If you are not actually part of the faction you cannot have more than 5 disposition points with a faction. Each faction has a number of ranks (listed in the faction description). Gaining a new rank requires a certain mimimum disposition, as well as other requirements the DM might set. Once a rank is achieved, the players gain certain benefits. Players can also lose disposition points (and thus ranks) if they act against a factions interests or break the rules. The list below is an incomplete list of factions that exist in the Elthelas setting. Some factions in the list, such as the National Military Organization, or Guild factions represent a <em>type</em> of faction. Providing general guidelines for DMs to develop factions of that type. For example, your DM might allow you to join the army of Gerasalim, but modify some of the ranks or features to better suit their vision for how that organization is structured.
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
