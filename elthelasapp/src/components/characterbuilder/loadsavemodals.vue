<template>
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
</template>
<script src="./js/loadsavemodals.js"></script>
<style src="@/views/character/scss/characterbuilder.scss" lang="scss" scoped></style>
