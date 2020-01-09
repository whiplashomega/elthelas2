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
        <notes :buildmode="buildmode" />
      </b-tab>
      <b-tab title="PC Manager">
        <pcmanager />
      </b-tab>
      <b-tab title="NPCs">
        <npcmanager :buildmode="buildmode" />
      </b-tab>
      <b-tab title="Encounter Runner">
        <runner :cre-array="creArray" :char-array="charArray" :key="runnerKey" />
      </b-tab>
    </b-tabs>
    <b-modal id="campaignmodal" title="Load File from Server">
      <table class="table table-striped">
        <tr>
          <th>Campaign Name</th><th>-</th>
        </tr>
        <tr v-for="camp in allCampaigns" :key="camp._id">
          <td><span class="clickable" @click="load({ campaign: camp, comp: comp })">{{ camp.title }}</span></td>
          <td>
            <input type="button" @click="deleteCamp(camp)"
                   class="btn btn-danger" value="X" />
          </td>
        </tr>
      </table>
    </b-modal>
  </div>
</template>
<script src="./js/campaignbuilder.js"></script>
