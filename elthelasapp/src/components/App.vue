<template>
  <div :class="getThemeSetting" class="fullBody">
    <headercomponent />
    <div class='container-fluid' id="pagebody">
      <div class="row">
        <router-view class="view two col-sm-2" name="sidebar" />
        <router-view class="view one col-sm-10" />
      </div>
    </div>
    <footer-comp />
  </div>
</template>
<style src="./scss/globalstyles.scss" lang="scss">
</style>
<script>

import headercomponent from '@/components/global/header';
import FooterComp from '@/components/global/footer';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'App',
  components: {
    headercomponent,
    FooterComp
  },
  computed: {
    ...mapGetters({
      weapons: 'allWeapons',
      armor: 'allArmor',
      spells: 'allSpells',
      user: "getUserInfo"
    }),
    getThemeSetting () {
      if (this.user.themesetting) {
        return this.user.themesetting;
      }
      return "light";
    }
  },
  data: function () {
    return {};
  },
  created () {
    this.$store.dispatch('getAllEquipment');
    this.$store.dispatch('getAllCreatures');
    this.$store.dispatch('getAllRaces');
    this.$store.dispatch('getAllClasses');
    this.$store.dispatch('getAllBackgrounds');
    this.$store.dispatch('getAllOrganizations');
    this.$store.dispatch('getAllNations');
    this.$store.dispatch('getAllCities');
    this.$store.dispatch('getAllFeats');
    this.$store.dispatch('getAllMagicItems');
  },
  methods: {
    ...mapMutations({
      setMobile: "setMobile"
    })
  },
  mounted () {
    if (window.outerWidth < 1024) {
      this.setMobile(true);
    }
  },
  updated () {
    if (window.outerWidth < 1024) {
      this.setMobile(true);
    } else {
      this.setMobile(false);
    }
  }
};
</script>
