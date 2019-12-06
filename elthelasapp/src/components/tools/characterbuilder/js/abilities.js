import { mapGetters, mapActions } from 'vuex';
import droll from 'droll';

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
    }),
    rollCheck (modifier) {
      let res = droll.roll('1d20').total;
      let adv = droll.roll('1d20').total;
      alert("Base Roll: " + (res + modifier) + " (" + res + " + " + modifier + ")\nAdv/Dis Roll: " + (adv + modifier) + " (" + adv + " + " + modifier + ")");
    }
  }
};
