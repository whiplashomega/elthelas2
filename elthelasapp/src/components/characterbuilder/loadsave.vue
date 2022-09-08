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
                   @click="getChars()" class="btn btn-success"
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
      <div>
    <modal id="servermodal" :modalProps="serverModalProps">
      Group:
      <select v-model="groupfilter">
        <option v-for="group in groups" :key="group.id" :value="group.name">{{ group.name }}</option>
        <option value="all">All</option>
      </select>
      <table class="table table-striped">
        <tr>
          <th>Character Name</th><th>Level</th><th>-</th>
        </tr>
        <tr v-for="character in charsorted" :key="character._id">
          <td><span class="clickable" @click="loadChar(character._id)">{{ character.name }}</span></td><td>{{ charlevel(character) }}</td>
          <td>
            <input type="button" @click="deleteFromServer({ character: character, comp: comp })"
                   class="btn btn-danger" value="X" />
          </td>
        </tr>
      </table>
    </modal>
    <modal id="loading" :modalProps="loadingModalProps">
      <img src="https://elthelas-images.herokuapp.com/giphy.gif" alt="Loading" />
    </modal>
  </div>
  </div>
</template>
<script src="./js/loadsave.js"></script>
<style src="@/views/character/scss/characterbuilder.scss" lang="scss" scoped></style>
