<template>
  <div>
    <b-modal id="drivemodal" title="Load File from Google Drive" :modal-class="userinfo.themesetting">
      <table class="table table-striped">
        <tr>
          <th>File Name</th><th>Modified Date</th>
        </tr>
        <tr v-for="(file, index) in filelist" :key="index">
          <td><span class="clickable" @click="loadFromDrive(file.id)">{{ file.name }}</span></td>
          <td>{{ file.modifiedTime | date }}</td>
        </tr>
      </table>
    </b-modal>
    <b-modal id="servermodal" title="Load File from Server" :modal-class="userinfo.themesetting">
      <table class="table table-striped">
        <tr>
          <th>Character Name</th><th>Level</th><th>-</th>
        </tr>
        <tr v-for="character in charsorted" :key="character._id">
          <td><span class="clickable" @click="loadChar({ character: character, comp: comp })">{{ character.name }}</span></td><td>{{ charlevel(character) }}</td>
          <td>
            <input type="button" @click="deleteFromServer({ character: character, comp: comp })"
                   class="btn btn-danger" value="X" />
          </td>
        </tr>
      </table>
    </b-modal>
    <b-modal id="loading" no-close-on-backdrop
             no-close-on-esc hide-header
             hide-footer :modal-class="userinfo.themesetting">
      <img src="https://elthelas-images.herokuapp.com/giphy.gif" alt="Loading" />
    </b-modal>
  </div>
</template>
<script src="./js/loadsavemodals.js"></script>
<style src="./scss/characterbuilder.scss" lang="scss" scoped></style>
