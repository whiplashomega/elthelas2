<template>
  <div class="col-sm-12">
    <div v-if="current._id">
      <h3><a :href="current.link">{{current.name}}</a></h3>
      <div class="row">
        <div class="col-sm-3">
          <strong>Environment:</strong> {{current.environment}}
        </div>
        <div class="col-sm-3">
          <strong>Tier:</strong> {{current.tier}}
        </div>
        <div class="col-sm-3">
          <strong>Random:</strong> {{current.random}}
        </div>
        <div class="col-sm-3">
          <strong>Complete:</strong> {{current.complete}}
        </div>
      </div>
      <div style="float:right;max-width:40%;" v-if="current.image">
        <img :src="current.image" :alt="current.name" />
      </div>
      <div v-html="$options.filters.marked(current.text)"></div>
      <div v-html="$options.filters.marked(current.treasure)"></div>
    </div>
    <table class="table table-striped">
      <thead><tr><th>Name</th><th>Environment</th><th>Tier</th><th>Random</th><th>Complete</th></tr></thead>
      <tbody>
        <tr v-for="encounter in all" :key="encounter._id">
          <td><router-link :to="'/encounter/details/' + encounter._id">{{encounter.name}}</router-link></td>
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
