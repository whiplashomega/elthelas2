<template>
  <div class="col-sm-12">
    <div class="btn-group">
      <button class="btn btn-primary" @click="buildmode = !buildmode">Toggle <span v-if="buildmode">View</span><span v-else>Build</span> Mode</button>
      <button class="btn btn-primary" @click="save()" v-if="campaign._id">Save</button>
      <button class="btn btn-primary" @click="saveNew()" v-if="!campaign._id">Save New</button>
      <button class="btn btn-success" @click="getAll(comp)">Load</button>
      <button class="btn btn-warning" @click="newCamp()">New Campaign</button>
      <button class="btn btn-primary" @click="showChapters = !showChapters"><span v-if="showChapters">Hide</span><span v-else>Show</span> Chapters</button>
    </div>
    <b-tabs>
      <b-tab title="Notes">
        <notes :buildmode="buildmode"></notes>
      </b-tab>
      <b-tab title="PC Manager">
        <pcmanager></pcmanager>
      </b-tab>
    </b-tabs>
  </div>
</template>
<script src="./campaignbuilder.js"></script>
