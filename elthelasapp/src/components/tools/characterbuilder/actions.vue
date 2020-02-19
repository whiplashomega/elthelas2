<template>
  <div class="charsheet-static smalltext" id="attackdiv">
    <div class='row'>
      <div class="col-sm">
        <h4>Actions</h4>
        <div v-for="action in actions" :key="action.id + action.show.toString()" :title="action.description">
          <strong>{{ action.name }}</strong>
          <button class="btn btn-xs" @click="action.show = !action.show; forceUpdate()"><span v-if="action.show">&#x25B2;</span><span v-if="!action.show">&#x25BC;</span></button>
          <button v-if="action.useradd && action.resourceused" :disabled="!resourceAvailable(action)"
                  @click="doAction(action)" class="btn btn-sm btn-primary">Do</button>
          <span v-if="action.resourceused && !resourceAvailable(action)" class="alert">Out of Uses</span>
          <button @click="deleteAction(action)" class="btn btn-sm" v-if="action.useradd">X</button>
          <button v-if="action.title" type="button"
                  class="btn btn-sm btn-primary print-hide"
                  @click="castSpell(action)">Cast</button>
          <select v-if="action.title && action.level !== 'cantrip'" v-model="action.castLevel">
            <option>{{ Number(action.level) }}</option>
            <option v-for="i in 9 - action.level" :key="i">{{ Number(i) + Number(action.level) }}</option>
            <option v-if="warlockSlotLevel >= action.level" value="warlock">warlock</option>
          </select>
          <div v-if="action.show" v-html="$options.filters.marked(action.description)" :key="action.id"></div>
        </div>
      </div>
      <div class="col-sm">
        <h4>Bonus Actions</h4>
        <div v-for="action in bonus" :key="action.id + action.show.toString()" :title="action.description">
          <strong>{{ action.name }}</strong>
          <button class="btn btn-xs" @click="action.show = !action.show; forceUpdate()"><span v-if="action.show">&#x25B2;</span><span v-if="!action.show">&#x25BC;</span></button>
          <button v-if="action.useradd && action.resourceused" @click="doAction(action)"
                  class="btn btn-sm btn-primary" :disabled="!resourceAvailable(action)">Do</button>
          <span v-if="action.resourceused && !resourceAvailable(action)" class="alert">Out of Uses</span>
          <button @click="deleteAction(action)" class="btn btn-sm" v-if="action.useradd">X</button>
          <button v-if="action.title" type="button"
                  class="btn btn-sm btn-primary print-hide"
                  @click="castSpell(action)">Cast</button>
          <select v-if="action.title && action.level !== 'cantrip'" v-model="action.castLevel">
            <option>{{ Number(action.level) }}</option>
            <option v-for="i in 9 - action.level" :key="i">{{ Number(i) + Number(action.level) }}</option>
            <option v-if="warlockSlotLevel >= action.level" value="warlock">warlock</option>
          </select>
          <div v-if="action.show" v-html="$options.filters.marked(action.description)"></div>
        </div>
      </div>
      <div class="col-sm">
        <h4>Reactions</h4>
        <div v-for="action in reactions" :key="action.id + action.show.toString()" :title="action.description">
          <strong>{{ action.name }}</strong>
          <button class="btn btn-xs" @click="action.show = !action.show; forceUpdate()"><span v-if="action.show">&#x25B2;</span><span v-if="!action.show">&#x25BC;</span></button>
          <button v-if="action.useradd && action.resourceused" @click="doAction(action)"
                  class="btn btn-sm btn-primary" :disabled="!resourceAvailable(action)">Do</button>
          <span v-if="action.resourceused && !resourceAvailable(action)" class="alert">Out of Uses</span>
          <button @click="deleteAction(action)" class="btn btn-sm" v-if="action.useradd">X</button>
          <button v-if="action.title" type="button"
                  class="btn btn-sm btn-primary print-hide"
                  @click="castSpell(action)">Cast</button>
          <select v-if="action.title && action.level !== 'cantrip'" v-model="action.castLevel">
            <option>{{ Number(action.level) }}</option>
            <option v-for="i in 9 - action.level" :key="i">{{ Number(i) + Number(action.level) }}</option>
            <option v-if="warlockSlotLevel >= action.level" value="warlock">warlock</option>
          </select>
          <div v-if="action.show" v-html="$options.filters.marked(action.description)"></div>
        </div>
      </div>
      <b-modal v-model="addActionModal" @ok="addAction()">
        <label>Name:</label>
        <input type="text" class="form-control" v-model="newaction.name" />
        <label>Action Type:</label>
        <select v-model="newaction.actiontype" class="form-control">
          <option value="action">Action</option>
          <option value="bonus">Bonus Action</option>
          <option value="reaction">Reaction</option>
        </select>
        <label>Resource Used</label>
        <select v-model="newaction.resourceused" class="form-control">
          <option :value="false">None</option>
          <option v-for="resource in character.resources" :key="resource.name" :value="resource">{{ resource.name }}</option>
        </select>
        <label>Description:</label>
        <textarea v-model="newaction.description" class="form-control"></textarea>
      </b-modal>
    </div>
    <div class="row">
      <div class="btn-group col">
        <button @click="addActionModal = true" class="btn btn-sm btn-primary">+</button>
      </div>
    </div>
  </div>
</template>
<script src="./js/actions.js"></script>
<style src="./scss/characterbuilder.scss" lang="scss" scoped></style>
