<template>
  <div>
    <button @click="newNPC()">Add NPC</button>
    <div>
      <label>
        Filter By Chapter:
        <b-form-radio-group v-model="filterByChapter"
                            :options="availableChapters" name="filterByChapter">
          <b-form-radio value="all">All</b-form-radio>
        </b-form-radio-group>
      </label>
    </div>
    <div v-for="npc in filteredNPCs" :key="npc.id" class="card">
      <h3>
        <span v-if="!npc.editMode">{{ npc.name }}</span>
        <input type="text" class="form-control"
               v-model="npc.name" v-if="npc.editMode" />
        <button class="btn-symbol btn-sm" @click="switchEditMode(npc)">&#9998;</button>
        <button class="btn-symbol btn-sm" @click="deleteNPC(npc)">&#128465;</button>
        <button type="button" class="btn btn-primary float-right" @click="npc.show = !npc.show">
          <span v-if="npc.show">&#x25B2;</span>
          <span v-if="!npc.show">&#x25BC;</span>
        </button>
      </h3>
      <div v-if="npc.show">
        <div class="row">
          <label class="col-sm-2">
            <strong>Job: </strong>
            <span v-if="!npc.editMode">{{ npc.job }}</span>
            <input type="text" class="form-control"
                   v-model="npc.job" v-if="npc.editMode" />
          </label>
          <label class="col-sm-3">
            <strong>Relation to Party:</strong>
            <span v-if="!npc.editMode">{{ npc.relation }}</span>
            <input type="text" class="form-control"
                   v-model="npc.relation" v-if="npc.editMode" />
          </label>
          <label class="col-sm-7">
            <router-link :to="npc.link" v-if="!npc.editMode" target="_blank"><strong>Link to Stats</strong></router-link>
            <strong v-if="npc.editMode">Link to Stats</strong>
            <input type="text" class="form-control"
                   v-model="npc.link" v-if="npc.editMode" />
          </label>
        </div>
        <div class="row">
          <label class="col-sm-2">
            <strong>Location:</strong>
            <span v-if="!npc.editMode">{{ npc.location }}</span>
            <input type="text" class="form-control"
                   v-model="npc.location" v-if="npc.editMode" />
          </label>
          <label class="col-sm-10">
            <strong>Relevant Chapters:</strong>
            <span v-if="!npc.editMode" v-for="chapter in npc.chapters" :key="chapter"> {{ chapter }}</span>
            <b-form-checkbox-group v-model="npc.chapters" v-if="npc.editMode" :options="availableChapters">
              <b-form-checkbox value="all">All</b-form-checkbox>
            </b-form-checkbox-group>
          </label>
        </div>
        <div class="row">
          <label class="col-sm-12">
            <strong>History: </strong>
            <span v-if="!npc.editMode" v-html="marked.parse(npc.history)"></span>
            <textarea v-model="npc.history" class="form-control" v-if="npc.editMode"></textarea>
          </label>
        </div>
        <div class="row">
          <label class="col-sm-12">
            <strong>Motivations: </strong>
            <span v-if="!npc.editMode" v-html="marked.parse(npc.motivations)"></span>
            <textarea v-model="npc.motivations" class="form-control" v-if="npc.editMode"></textarea>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./js/npcmanager.js"></script>
<style></style>
