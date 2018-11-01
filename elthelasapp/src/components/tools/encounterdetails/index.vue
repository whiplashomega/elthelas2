<template>
  <div clas="col-sm-12">
    <h3><a :href="current.link">{{current.name}}</a></h3>
    <div class="row">
      <div class="col-sm-6">
        Environment: {{current.environment}} Tier: {{current.tier}} Random: {{current.random}} Complete: {{current.complete}}
      </div>
    </div>
    <div style="float:right;max-width:40%;" v-if="current.image">
      <img :src="current.image" :alt="current.name" />
    </div>
    <div v-html="$options.filters.marked(current.text)"></div>
    <table class="table table-striped">
      <thead><tr><th>Name</th><th>Environment</th><th>Tier</th><th>Random</th><th>Complete</th></tr></thead>
      <tbody>
        <tr v-for="encounter in all" :key="encounter._id">
          <td>{{encounter.name}}</td>
          <td>{{encounter.environment}}</td>
          <td>{{encounter.tier}}</td>
          <td>{{encounter.random}}</td>
          <td>{{encounter.complete}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script src="./encounterdetails.js"></script>
