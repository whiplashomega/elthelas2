<template>
  <div>
    <div class="row">
      <select v-model="currentSession" class="charsheet-text">
        <option :value="currentSession">{{ currentSession.date }}</option>
        <option v-for="sess in sortedSessions" :value="sess" :key="sess.id">{{ sess.date }}</option>
      </select>
      <div class="btn-group">
        <button @click="addSession()" class="btn btn-primary btn-sm">Add Session</button>
      </div>
    </div>
    <div v-if="currentSession.id !== ''">
      <div class="row">
        <div class="col-3">
          <div class="charsheet-static">
            <label>Today's Date</label>
            <input type="text" class="charsheet-text" v-model="currentSession.date" />
          </div>
        </div>
        <div class="col-3">
          <div class="charsheet-static">
            <label>Session Start Date</label>
            <input type="text" class="charsheet-text" v-model="currentSession.ingamedate.start" />
          </div>
        </div>
        <div class="col-3">
          <div class="charsheet-static">
            <label>Session End Date</label>
            <input type="text" class="charsheet-text" v-model="currentSession.ingamedate.end" />
          </div>
        </div>
        <div class="col-3 btn-group">
          <button @click="removeSession(currentSession)" class="btn btn-danger">Delete</button>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="charsheet-static">
            <h4>Where Are We?</h4>
            <textarea v-model="currentSession.locations" class="charsheet-textarea smalltext" @input="textareaResize"></textarea>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="charsheet-static">
            <h4>Who Did We Meet?</h4>
            <textarea v-model="currentSession.npcs" class="charsheet-textarea smalltext" @input="textareaResize"></textarea>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="charsheet-static">
            <h4>What are we doing?</h4>
            <textarea v-model="currentSession.goals" class="charsheet-textarea smalltext" @input="textareaResize"></textarea>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="charsheet-static">
            <h4>Encounters</h4>
            <textarea v-model="currentSession.encounters" class="charsheet-textarea smalltext" @input="textareaResize"></textarea>
          </div>
        </div>
        <div class="col-6">
          <div class="charsheet-static">
            <h4>Loot</h4>
            <textarea v-model="currentSession.loot" class="charsheet-textarea smalltext" @input="textareaResize"></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./js/gamenotes.js"></script>
<style src="./scss/characterbuilder.scss" lang="scss" scoped></style>
