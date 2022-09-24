<template>
  <div class="col-sm-12">
    <div class="btn-group">
      <button class="btn btn-primary" @click="save()" v-if="campaign._id">Save</button>
      <button class="btn btn-primary" @click="saveNew()" v-if="!campaign._id">Save New</button>
      <button class="btn btn-success" @click="getAllSilent();showLoadModal()">Load</button>
      <button class="btn btn-warning" @click="newCamp()">New Campaign</button>
      <button class="btn btn-primary" @click="showChapters = !showChapters"><span v-if="showChapters">Hide</span><span v-else>Show</span> Chapters</button>
    </div>
    <b-tabs v-model="activeTab">
      <b-tab title="Notes">
        <notes :buildmode="buildmode" :show-chapters="showChapters" />
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
    <modal id="campaignmodal" title="Load File from Server" :modalProps="modalProps">
      <table class="table table-striped">
        <tr>
          <th>Campaign Name</th><th>-</th>
        </tr>
        <tr v-for="camp in allCampaigns" :key="camp._id">
          <td><a class="clickable" @click="load({ campaign: camp, comp: comp });modalProps.isActive = false">{{ camp.title }}</a></td>
          <td>
            <input type="button" @click="deleteCamp(camp)"
                   class="btn btn-danger" value="X" />
          </td>
        </tr>
      </table>
    </modal>
  </div>
</template>
<script src="./js/campaignbuilder.js"></script>
