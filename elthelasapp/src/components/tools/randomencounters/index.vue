<template>
  <div class="col-sm-12">
    <h1>Random Encounter Table</h1>
    <div class="row">
      <div class="col-sm-6">
        <label>Environment</label>
        <select v-model="environment" class="form-control">
          <option value="Any">Any</option>
          <option value="Desert">Desert</option>
          <option value="Grassland">Grassland</option>
          <option value="Forest">Forest</option>
          <option value="Frozen">Frozen</option>
          <option value="Rural">Rural</option>
          <option vlaue="Swamp">Swamp</option>
          <option value="Underground">Underground</option>
          <option value="Urban">Urban</option>
        </select>
      </div>
      <div class="col-sm-6">
        <label>Tier</label>
        <select v-model="tier" class="form-control">
          <option value="Any">Any</option>
          <option value="Beginners">Beginners (levels 1-4)</option>
          <option value="Heroic">Heroic (levels 5-10)</option>
          <option value="Epic">Epic (levels 11-16)</option>
          <option value="Masters">Masters (levels 17-20)</option>
        </select>
      </div>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Encounter Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(encounter, index) in getRandom(tier, environment)" :key="encounter._id">
          <td>{{ index + 1 }}</td>
          <td>{{ encounter.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script src="./randomencounters.js"></script>
<style src="./randomencounters.scss" lang="scss" scoped></style>
