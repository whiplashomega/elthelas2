<template>
  <div class="col-sm-12">
    <div class="row">
      <div class="col-sm-8">
        <h1>Encounter Builder</h1>
        <div class="btn-group">
          <input type="button" class="btn btn-success" value="Save" v-if="current._id" @click="save()" />
          <input type="button" class="btn btn-primary" value="Save New" @click="saveNew()" />
          <input type="button" class="btn btn-warning" value="Reset" @click="reset()" />
        </div>
        <div class="row">
          <div class="col-sm-6">
            <label>Name</label>
            <input type="text" class="form-control" v-model="current.name" />
          </div>
          <div class="col-sm-6">
            <label>Prerequisite</label>
            <select v-model="current.prereq" class="form-control">
              <option value="">None</option>
              <option v-for="enc in all" :value="enc._id" :key="enc._id">{{enc.name}}</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <label>Runner Link</label>
            <input type="text" class="form-control" v-model="current.link" />
          </div>
          <div class="col-sm-6">
            <label>Image URL</label>
            <input type="text" class="form-control" v-model="current.image" />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-4">
            <label>Environment</label>
            <select v-model="current.environment" class="form-control">
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
          <div class="col-sm-4">
            <label>Tier</label>
            <select v-model="current.tier" class="form-control">
              <option value="Any">Any</option>
              <option value="Beginners">Beginners (levels 1-4)</option>
              <option value="Heroic">Heroic (levels 5-10)</option>
              <option value="Epic">Epic (levels 11-16)</option>
              <option value="Masters">Masters (levels 17-20)</option>
            </select>
          </div>
          <div class="col-sm-4">
            <label>Flags</label>
            <div class="form-check">
              <input type="checkbox" class="form-check-input" v-model="current.random" />
              <label class="form-check-label">Random</label>
            </div>
            <div class="form-check">
              <input type="checkbox" class="form-check-input" v-model="current.complete" />
              <label class="form-check-label">Complete</label>
            </div>
          </div>
        </div>
        <div>
          <label>Encounter Text (markdown allowed)</label>
          <textarea v-model="current.text" class="form-control" style="min-height:150px;"></textarea>
        </div>
        <div>
          <label>Potential Treasure (markdown allowed)</label>
          <textarea v-model="current.treasure" class="form-control" style="min-height:150px;"></textarea>
        </div>
        <div>
          <h2>Preview</h2>
          <h3><a :href="current.link">{{current.name}}</a></h3>
          <div style="float:right;max-width:40%;" v-if="current.image">
            <img :src="current.image" :alt="current.name" />
          </div>
          <div v-html="$options.filters.marked(current.text)"></div>
          <div v-html="$options.filters.marked(current.treasure)"></div>
        </div>
      </div>
      <div class="col-sm-4">
        <h2>Existing Encounters</h2>
        <table class="table table-striped">
          <thead><tr><th>Encounter Name</th><th>X</th></tr></thead>
          <tbody>
            <tr v-for="encounter in all" :key="encounter._id">
              <td><a href="#" @click="load(encounter)">{{encounter.name}}</a></td>
              <td><button @click="deleteEncounter({ encounter: encounter })" class="btn btn-danger btn-sm">X</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script src="./encounterbuilder.js"></script>
<style src="./encounterbuilder.scss" lang="scss"></style>
