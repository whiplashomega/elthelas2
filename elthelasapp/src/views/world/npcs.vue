<template>
  <h2>NPCs in Elthelas</h2>
  <div v-for="npc in npcs" :key="npc._id">
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
        <div class="col-6">
          <label>Born</label>
          <input type="text" v-model="npc.born" class="charsheet-text" />
        </div>
        <div class="col-6">
          <label>Died</label>
          <input type="text" v-model="npc.died" class="charsheet-text" />
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
      <h4><a :href="npc.charid">{{npc.name}}</a> <button class="btn btn-warning" @click="npc.edit = true">Edit</button></h4>
      <h6>Player: {{npc.player}}</h6>
      <div class="row">
        <div class="col-4">
          Last Known Location: {{npc.lastlocation}}<br />
          Home: {{npc.home}}<br />
          Job: {{npc.job}}
        </div>
        <div class="col-4">
          Born: {{npc.born}}<br />
          <span v-if="npc.died">Died: {{npc.died}}<br /></span>
        </div>
      </div>
      <h5 v-if="npc.history">History</h5>
      <div v-html="marked.parse(npc.history)"></div>
      <h5 v-if="npc.motivations">Motivations</h5>
      <div v-html="marked.parse(npc.motivations)"></div>
      <h5 v-if="npc.knownassociates">Known Associates</h5>
      <!--<div v-html="marked.parse(npc.knownassociates)"></div>-->
    </div>
  </div>
    <div class="btn-group">
      <button class="btn btn-primary" @click="addNPC()">+</button>
    </div>
</template>
<script src="./js/npcs.js"></script>