<template>
  <div>
    PC Manager
    <input type="text" v-model="pcid" />
    <button @click="invitePC(pcid); emit()">Invite</button>
  </div>
</template>
<script src="./pcmanager.js"></script>