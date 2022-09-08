import { useCharacterStore, useGlobalsStore, useStaticsStore } from '@/stores/index';
import { storeToRefs } from 'pinia';

export default {
  setup () {
    const characters = useCharacterStore();
    const globals = useGlobalsStore();
    const statics = useStaticsStore();
    
    const { character, classtext } = storeToRefs(characters);
    const { races, nations, cities, organizations: factions, backgrounds } = statics;
    const { mobile } = storeToRefs(globals);
    
    const setRaceDefaults = characters.setRaceDefaults;
    return {
      character,
      races,
      classtext,
      nations,
      cities,
      factions,
      backgrounds,
      mobile,
      setRaceDefaults
    };
  }
};
