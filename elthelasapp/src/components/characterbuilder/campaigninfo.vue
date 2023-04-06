<template>
  <div>
    <h5>Campaign Information</h5>
    <span title="Give this value to your DM to invite you to the campaign">ID: {{ character._id }}</span>
    <p v-if="character._id">
      <router-link :to="'/5e/charbuilder/' + character._id">Copy this link to share your character</router-link><br />
      <a href="/static/zip/elthelasextension.zip">Download the Chrome/Firefox Extension</a> (allows you to make rolls in roll20)
    </p>
  </div>
</template>
<script src="./js/campaigninfo.js"></script>
