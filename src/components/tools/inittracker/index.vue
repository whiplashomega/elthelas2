<template>
  <div class="col-sm-12">
    <div class="btn-group">
      <input type="button" value="List Style" @click="style = 'list'" class="btn btn-default" />
      <input type="button" value="Card Style" @click="style = 'card'" class="btn btn-primary" />
    </div>
    <div id="list" v-if="style === 'list'">
      <div v-for="c in initlist" v-bind:key="c.id">
        <span v-if="current === c.id">X</span>
        <label>Name: <input type="text" v-model="c.name" class="form-control"/></label> <label>Init: <input type="number" v-model="c.init" class="form-control" /></label>
        <button @click=removeInit(c.id) class="btn btn-danger">X</button>
        <button @click="delay(c)" class="btn btn-success">Delay</button>
        <input type="button" @click="nextCard(c)" value="Done with Turn" class="btn btn-success" />
      </div>
      <br />
      <input type="button" @click="addInit()" value="+" class="btn btn-success" /> <input type="button" @click="getFromServer()" value="Load Character" class="btn btn-sucess" />
    </div>
    <div id="card" v-if="style === 'card'">
      <div v-for="c in initlist" v-bind:key="c.id" v-if="c.id === current">
        <label>Name: <input type="text" v-model="c.name" class="form-control"/></label> <label>Init: <input type="number" v-model="c.init" class="form-control" /></label><br />
        <button @click=removeInit(c.id) class="btn btn-danger">X</button>
        <button @click="delay(c)" class="btn btn-success">Delay</button>
        <input type="button" @click="nextCard(c)" value="Done with Turn" class="btn btn-success" />
      </div>
      <br />
      <input type="button" @click="addInit()" value="+" class="btn btn-success" /> <input type="button" @click="getFromServer()" value="Load Character" class="btn btn-success" />
    </div>
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
