<template>
  <div>
    <h5>Campaign Information</h5>
    <span title="Give this value to your DM to invite you to the campaign">ID: {{ character._id }}</span>
    <p v-if="character._id"> 
      <router-link :to="'/tools/charbuilder/' + character._id">Copy this link to share your character</router-link>
    </p>
  </div>
</template>
<script src="./campaigninfo.js"></script>
