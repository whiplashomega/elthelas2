<template>
  <div>
    <nav class="sidenav nav flex-column nav-pills" role="navigation">
      <router-link to="/ref/quick" class="nav-link">Quick Reference Manual</router-link>
      <router-link to="/ref/magicitems" class="nav-link">Magic Item Catalog</router-link>
      <router-link to="/ref/bestiary" class="nav-link" v-if="loggedin">Bestiary</router-link>
      <router-link to="/ref/calendar" class="nav-link">Calendar</router-link>
      <router-link to="/ref/cosmology" class="nav-link">Cosmology</router-link>
      <router-link to="/ref/astronomy" class="nav-link">Astronomy</router-link>
      <router-link to="/ref/magic" class="nav-link">Magic</router-link>
      <router-link to="/ref/gods" class="nav-link">Gods</router-link>
      <router-link to="/ref/orgs" class="nav-link">Organizations</router-link>
      <router-link to="/ref/divines" class="nav-link">Divine Beings</router-link>
    </nav>
  </div>
</template>
<script src="./js/ref.js"></script>
<style src="./scss/ref.scss" lang="scss" scoped></style>
