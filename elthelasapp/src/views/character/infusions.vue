<template>
  <div>
    <p>
      The following infusions are valid options in the Elthelas Campaign Setting.
    </p>
    <div v-for="inv in infusions" :key="inv.name">
      <h4>{{ inv.name }}</h4>
      <h6 v-if="inv.level !== 0">Prerequisite: Level {{ inv.level }} artificer</h6>
      <h6>Item: {{ inv.item }}</h6>
      <p v-html="marked.parse(inv.description)"></p>
    </div>
  </div>
</template>
<script src="./js/infusions.js"></script>