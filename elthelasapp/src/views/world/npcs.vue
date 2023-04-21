<template>
  <div class="col-12">
    <input type="text" class="form-control" placeholder="Search" v-model="filtertext" />
    <div class="row">
      <div class="col-3">
        <input type="checkbox" v-model="player" /> PC
      </div>
      <div class="col-3">
        <input type="checkbox" v-model="living" /> Living Only
      </div>
    </div>
  </div>
  <div v-for="npc in filterednpcs" :key="npc._id" class="card">
    <div v-if="npc.edit">
      <div class="row">
        <div class="col-4">
          <label>Name</label>
          <input type="text" v-model="npc.name" class="charsheet-text" />
        </div>
        <div class="col-4">
          <label>Character Link</label>
          <input type="text" v-model="npc.charid" class="charsheet-text" />
        </div>
        <div class="col-4">
          <label>Player</label>
          <input type="text" v-model="npc.player" class="charsheet-text" />
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <label>Born</label>
          <input type="text" v-model="npc.born" class="charsheet-text" />
        </div>
        <div class="col-4">
          <label>Died</label>
          <input type="text" v-model="npc.died" class="charsheet-text" />
        </div>
        <div class="col-4">
          <label>Ancestry</label>
          <input type="text" v-model="npc.ancestry" class="charsheet-text" />
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <label>Last Known Location</label>
          <input type="text" v-model="npc.lastlocation" class="charsheet-text" />
        </div>
        <div class="col-4">
          <label>Home</label>
          <input type="text" v-model="npc.home" class="charsheet-text" />
        </div>
        <div class="col-4">
          <label>Job</label>
          <input type="text" v-model="npc.job" class="charsheet-text" />
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <label>History</label>
          <textarea v-model="npc.history" class="charsheet-textarea"></textarea>
        </div>
        <div class="col-6">
          <label>Motivations</label>
          <textarea v-model="npc.motivations" class="charsheet-textarea"></textarea>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <label>Known Associates</label>
          <textarea v-model="npc.knownassociates" class="charsheet-textarea"></textarea>
        </div>
        <div class="col-6">
          <label>Met in Campaigns</label>
          <div v-for="camp in npc.campaigns" :key="camp.id" class="row">
            <div class="col-10">
              <input type="text" class="charsheet-text" v-model="camp.name" />
            </div>
            <div class="col-2">
              <button class="btn btn-sm btn-danger" @click="removeCampaign(npc, camp)">X</button>
            </div>
          </div>
          <button @click="addCampaign(npc)" class="btn btn-sm btn-primary">+</button>
        </div>
      </div>
      <div class="btn-group">
        <button class="btn btn-primary" @click="save(npc)">Save</button>
        <button class="btn btn-danger" @click="deleteNPC(npc)">Delete</button>
      </div>
    </div>
    <div v-else>
      <h4 class="card-title"><a :href="npc.charid">{{npc.name}}</a> <button class="btn btn-warning" @click="npc.edit = true">Edit</button><button type="button" class="btn btn-primary" style="float:right;" @click="npc.expand = !npc.expand">
          <span v-if="!npc.expand">&#x25B2;</span><span v-if="npc.expand">&#x25BC;</span>
        </button></h4>
      <div v-if="npc.expand">
        <h6 v-if="npc.player">Player: {{npc.player}}</h6>
        <div class="row">
          <div class="col-4">
            Last Known Location: {{npc.lastlocation}}<br />
            Home: {{npc.home}}<br />
            Job: {{npc.job}}
          </div>
          <div class="col-4">
            Ancestry: {{npc.ancestry}}<br />
            Born: {{npc.born}}<br />
            <span v-if="npc.died">Died: {{npc.died}}<br /></span>
          </div>
        </div>
        <h5 v-if="npc.history">History</h5>
        <div v-html="marked.parse(npc.history)"></div>
        <div class="row">
          <div class="col-6">
            <h5 v-if="npc.motivations">Motivations</h5>
            <div v-html="marked.parse(npc.motivations)"></div>
            <h5 v-if="npc.knownassociates">Known Associates</h5>
            <div v-html="marked.parse(npc.knownassociates)"></div>
          </div>
          <div class="col-6">
            <h5>Campaigns</h5>
            <span v-for="camp in npc.campaigns">{{camp.name}}<br /></span>
          </div>
        </div>
      </div>
    </div>
  </div>
    <div class="btn-group">
      <button class="btn btn-primary" @click="addNPC()">+</button>
    </div>
</template>
<script src="./js/npcs.js"></script>