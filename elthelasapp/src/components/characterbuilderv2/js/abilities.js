import { useCharacterv2Store, useGlobalsStore } from '@/stores/index';
import { storeToRefs } from 'pinia';
import droll from 'droll';

export default {
  setup () {
    const characters = useCharacterv2Store();
    const globals = useGlobalsStore();
    
    const { character, getStatTotal, getStatMod, pointbuy, statRolls, getSaveMod } = storeToRefs(characters);
    const { mobile } = storeToRefs(globals);

    return {
      characters,
      globals,
      character,
      getStatTotal,
      getStatMod,
      pointbuy,
      statRolls,
      getSaveMod,
      mobile,
      rollStats: characters.rollStats,
      rollBoundedStats: characters.rollBoundedStats
    }
  },
  methods: {
    rollCheck (modifier) {
      let res = droll.roll('1d20').total;
      let adv = droll.roll('1d20').total;
      alert("Base Roll: " + (res + modifier) + " (" + res + " + " + modifier + ")\nAdv/Dis Roll: " + (adv + modifier) + " (" + adv + " + " + modifier + ")");
    }
  }
};
