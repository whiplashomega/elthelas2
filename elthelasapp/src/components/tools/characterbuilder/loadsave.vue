<template>
  <div>
    <div class="row">
      <div class="col-sm-4">
        <h4>Load/Save From Disk</h4>
        <div class="row" style="margin-bottom: 5px;">
          <input type="file" id="fileload" />
        </div>
        <div class="row">
          <div class="btn-group">
            <input type="button" value="Save"
                   @click="saveCharacter()" class="btn btn-primary" />
            <input type="button" value="Load"
                   @click="loadCharacter()" class="btn btn-success" />
            <input type="button" value="Reset"
                   @click="resetCharacter()" class="btn btn-warning" />
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <h4>Load/Save From Server</h4>
        <div class="row" v-if="loggedin">
          <div class="btn-group col-12">
            <input type="button" v-if="character._id"
                   value="Save" @click="updateToServer(comp)"
                   class="btn btn-primary" />
            <input type="button" value="Save New"
                   @click="newToServer(comp)" class="btn btn-primary" />
            <input type="button" value="Load"
                   @click="getFromServer(comp)" class="btn btn-success" />
          </div>
        </div>
        <div class="row" v-else>
          <p class="col">
            Login from the menu to load/save on the web server.
          </p>
        </div>
        <div v-if="character._id && loggedin">
          <input type="checkbox" v-model="character.autosave" /> Autosave Character Changes
        </div>
      </div>
      <div class="col-sm-4">
        <h4>Load/Save From Google</h4>
        <div class="row" v-if="googletoken">
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
      </div>
    </div>
  </div>
</template>
<script src="./js/loadsave.js"></script>
<style src="../scss/characterbuilder.scss" lang="scss" scoped></style>
