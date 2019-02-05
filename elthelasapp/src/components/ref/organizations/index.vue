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
      <div v-html="$options.filters.marked(currentOrg.description)"></div>
      <div>
        <h4>Tenets</h4>
        <ul>
          <li v-for="tenet in currentOrg.tenets" :key="tenet" v-html="$options.filters.marked(tenet)"></li>
        </ul>
      </div>
      <h4>Level 1 Benefit</h4>
      <div v-html="$options.filters.marked(currentOrg.level1)"></div>
      <h4>Level 10 Benefit</h4>
      <div v-html="$options.filters.marked(currentOrg.level10)"></div>
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
<script src="./organizations.js"></script>
<style src="./organizations.scss" lang="scss" scoped></style>
