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
      <input type="button" @click="addInit()" value="+" class="btn btn-success" />
    </div>
    <div id="card" v-if="style === 'card'">
      <div v-for="c in initlist" v-bind:key="c.id" v-if="c.id === current">
        <label>Name: <input type="text" v-model="c.name" class="form-control"/></label> <label>Init: <input type="number" v-model="c.init" class="form-control" /></label><br />
        <button @click=removeInit(c.id) class="btn btn-danger">X</button>
        <button @click="delay(c)" class="btn btn-success">Delay</button>
        <input type="button" @click="nextCard(c)" value="Done with Turn" class="btn btn-success" />
      </div>
      <br />
      <input type="button" @click="addInit()" value="+" class="btn btn-success" />
    </div>
  </div>
</template>
<script src="./inittracker.js"></script>
<style src="./inittracker.scss" lang="scss" scoped></style>
