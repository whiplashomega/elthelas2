<template>
<div>
  <div class="row">
    <h4 class="col-12">Load/Save From Disk</h4>
    <div class="btn-group col-6">
      <input type="button" value="Save" @click="saveCharacter()" class="btn btn-primary" />
      <input type="button" value="Load" @click="loadCharacter()" class="btn btn-success" />
      <input type="button" value="Reset" @click="resetCharacter()" class="btn btn-warning" />
    </div>
    <input type="file" id="fileload" class="col-6" />
  </div>
  <div class="row" v-if="loggedin">
    <h4 class="col-12">Load/Save From Server</h4>
    <div class="btn-group col-12">
      <input type="button" v-if="character._id" value="Save" @click="updateToServer(comp)" class="btn btn-primary" />
      <input type="button" value="Save New" @click="newToServer(comp)" class="btn btn-primary" />
      <input type="button" value="Load" @click="getFromServer(comp)" class="btn btn-success" />
    </div>
  </div>
  <div class="row" v-if="googletoken">
    <h4 class="col-12">Load/Save From Google</h4>
    <div class="col" style="margin-top:15px;">
      <img src="https://developers.google.com/drive/images/drive_icon.png" alt="Google Drive" style="width:38px;height:38px;">
      <div class="btn-group">
        <button type="button" @click="getDriveFiles()" class="btn btn-primary">Load</button>
        <button type="button" @click="saveToDrive()" class="btn btn-success">Save</button>
      </div>
    </div>
  </div>
  <div class="row" v-else>
    <p class="col">Login to Google from the Menu to enable load and save from drive.</p>
  </div>
  <div class="row" style="margin-top: 10px;">
    <div class="btn-group col-12">
      <button class="btn btn-primary" @click="shortrest()">Short Rest</button>
      <button class="btn btn-success" @click="longrest()">Long Rest</button>
    </div>
  </div>
      <b-modal id="drivemodal" title="Load File from Google Drive">
      <table class="table table-striped">
        <tr>
          <th>File Name</th><th>Modified Date</th>
        </tr>
        <tr v-for="(file, index) in filelist" v-bind:key="index">
          <td><span class="clickable" @click="loadFromDrive(file.id)">{{file.name}}</span></td>
          <td>{{file.modifiedTime | date}}</td>
        </tr>
      </table>
    </b-modal>
    <b-modal id="servermodal" title="Load File from Server">
      <table class="table table-striped">
        <tr>
          <th>Character Name</th><th>Level</th><th>-</th>
        </tr>
        <tr v-for="character in characters" v-bind:key="character._id">
          <td><span class="clickable" @click="loadChar({ character: character, comp: comp })">{{character.name}}</span></td><td>{{charlevel(character)}}</td>
          <td><input type="button" @click="deleteFromServer({ character: character, comp: comp })" class="btn btn-danger" value="X" /></td>
        </tr>
      </table>
    </b-modal>
    <b-modal id="loading"
      no-close-on-backdrop no-close-on-esc hide-header hide-footer>
      <img src="https://elthelas-images.herokuapp.com/giphy.gif" alt="Loading" />
    </b-modal>
</div>
</template>
<script src="./loadsave.js"></script>
<style src="../characterbuilder.scss" lang="scss" scoped></style>
