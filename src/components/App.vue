<template>
  <div id="app">
    <headercomponent />
    <div class='container-fluid'>
      <div class="row">
        <router-view class="view two col-sm-2" name="sidebar"></router-view>
        <router-view class="view one col-sm-10"></router-view>
      </div>
    </div>
  </div>
</template>
<style src="./scss/globalstyles.scss" lang="scss">

</style>
<script>

import headercomponent from './header/headercomponent';
import { mapGetters } from 'vuex';

export default {
  name: 'app',
  components: {
    headercomponent
  },
  computed: mapGetters({
    weapons: 'allWeapons',
    armor: 'allArmor',
    spells: 'allSpells'
  }),
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
    this.$store.dispatch('getAllSpells').then(() => {
      console.log("Spells Retrieved");
      this.$store.dispatch('getAllArmor').then(() => {
        console.log("Armor Retrieved");
        this.$store.dispatch('getAllWeapons').then(() => {
          console.log("Weapons Retrieved");
          this.$store.dispatch('getAllMagicItems', {weapons: this.weapons, spells: this.spells, armor: this.armor}).then(() => {
            console.log("Magic Items Retreived");
          });
        });
      });
    });
  }
};
</script>
