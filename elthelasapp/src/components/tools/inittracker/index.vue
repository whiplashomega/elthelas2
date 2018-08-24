<template>
  <div class="col-sm-12">
    <div class="btn-group">
      <input type="button" value="List Style" @click="style = 'list'" class="btn btn-default margin15" />
      <input type="button" value="Card Style" @click="style = 'card'" class="btn btn-primary margin15" />
    </div>
    <div id="list" v-if="style === 'list'">
      <div v-for="c in initlist" v-bind:key="c.id" :class="currentClass(c)">
        <span v-if="current === c.id">X</span>
        <span v-if="current !== c.id">O</span>
        <label class="margin15">Name: <input type="text" v-model="c.name" class="form-control"/></label>
        <label class="margin15">Mod: <input type="number" v-model="c.mod" class="form-control"/></label>
        <label class="margin15">Init: <input type="number" v-model="c.init" class="form-control margin15" /></label>
        <button @click=removeInit(c.id) class="btn btn-danger margin15">X</button>
        <button @click="delay(c)" class="btn btn-success margin15">Delay</button>
        <input type="button" @click="nextCard(c)" value="Done with Turn" class="btn btn-success margin15" />
      </div>
      <br />
    </div>
    <div id="card" v-if="style === 'card'">
      <div v-for="c in initlist" v-bind:key="c.id" v-if="c.id === current">
        <label class="margin15">Name: <input type="text" v-model="c.name" class="form-control"/></label>
        <label class="margin15">Mod: <input type="number" v-model="c.mod" class="form-control"/></label>
        <label class="margin15">Init: <input type="number" v-model="c.init" class="form-control" /></label><br />
        <button @click=removeInit(c.id) class="btn btn-danger margin15">X</button>
        <button @click="delay(c)" class="btn btn-success margin15">Delay</button>
        <input type="button" @click="nextCard(c)" value="Done with Turn" class="btn btn-success margin15" />
      </div>
      <br />
    </div>
    <input type="button" @click="addInit()" value="+" class="btn btn-success margin15" />
    <input type="button" @click="getFromServer()" value="Load Character" class="btn btn-success margin15" />
    <input type="button" @click="roll()" value="Roll Initiative" class="btn btn-success margin15" />
    <b-modal id="servermodal" title="Load File from Server">
      <table class="table table-striped">
        <tr>
          <th>Character Name</th><th>Level</th><th>-</th>
        </tr>
        <tr v-for="character in characters" v-bind:key="character._id">
          <td><span class="clickable" @click="loadChar(character)">{{character.name}}</span></td><td>{{charlevel(character)}}</td>
          <td><input type="button" @click="deleteFromServer(character)" class="btn btn-danger" value="X" /></td>
        </tr>
      </table>
    </b-modal>
    <b-modal id="loading"
      no-close-on-backdrop no-close-on-esc hide-header hide-footer>
      <img src="/static/images/giphy.gif" alt="Loading" />
    </b-modal>
  </div>
</template>
<script src="./inittracker.js"></script>
<style src="./inittracker.scss" lang="scss" scoped></style>
