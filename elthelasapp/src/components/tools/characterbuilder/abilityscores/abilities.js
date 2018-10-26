import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      character: "getCharacter",
      getStatTotal: 'getStatTotal',
      getStatMod: 'getStatMod',
      getSaveMod: 'getSaveMod',
      pointbuy: 'pointbuy',
      statRolls: 'getStatRolls',
      mobile: 'isMobile'
    })
  },
  methods: {
    ...mapActions({
      rollStats: 'rollStats'
    })
  }
};
