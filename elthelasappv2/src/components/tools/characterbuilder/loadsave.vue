<template>
  <div>
    <div class="row">
      <div class="col-sm">
        <div class="row" style="margin-bottom: 5px;">
          <div class="col-sm-6" >
            <input type="file" id="fileload" />
          </div>
          <div class="col-sm-6" >
            <div class="btn-group">
              <input type="button" disabled
                     value="File" class="btn"
                     :class="minimal ? 'btm-sm' : ''" />
              <input type="button" value="Save"
                     @click="saveCharacter()" class="btn btn-primary"
                     :class="minimal ? 'btm-sm' : ''" />
              <input type="button" value="Load"
                     @click="loadCharacter()" class="btn btn-success"
                     :class="minimal ? 'btm-sm' : ''" />
              <input type="button" value="Reset"
                     @click="resetCharacter()" class="btn btn-warning"
                     :class="minimal ? 'btm-sm' : ''" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm">
        <div class="row" v-if="loggedin">
          <div class="btn-group col-12">
            <input type="button" disabled
                   value="Server" class="btn"
                   :class="minimal ? 'btm-sm' : ''" />
            <input type="button" v-if="character._id"
                   value="Save" @click="updateToServer(comp)"
                   class="btn btn-primary" :class="minimal ? 'btm-sm' : ''" />
            <input type="button" value="Save New"
                   @click="newToServer(comp)" class="btn btn-primary"
                   :class="minimal ? 'btm-sm' : ''" />
            <input type="button" value="Load"
                   @click="getFromServer(comp)" class="btn btn-success"
                   :class="minimal ? 'btm-sm' : ''" />
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
    </div>
  </div>
</template>
<script src="./js/loadsave.js"></script>
<style src="./scss/characterbuilder.scss" lang="scss" scoped></style>
