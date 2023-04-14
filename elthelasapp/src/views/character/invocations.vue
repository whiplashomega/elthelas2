<template>
  <div>
    <p>
      The following invocations are valid options in the Elthelas Campaign Setting.
    </p>
    <div v-for="inv in invocations" :key="inv.name">
      <h4>{{ inv.name }}</h4>
      <h6 v-if="inv.prereq !== ''">Prerequisite: {{ inv.prereq }}</h6>
      <p v-html="marked.parse(inv.description)"></p>
    </div>
  </div>
</template>
<script src="./js/invocations.js"></script>