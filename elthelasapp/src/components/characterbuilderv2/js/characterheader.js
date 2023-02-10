import { useCharacterv2Store, useGlobalsStore, useStaticsStore } from '@/stores/index';
import { storeToRefs } from 'pinia';

export default {
  setup () {
    const characters = useCharacterv2Store();
    const globals = useGlobalsStore();
    const statics = useStaticsStore();
    
    const { character, classtext } = storeToRefs(characters);
    const { builderAncestries: ancestries, backgrounds } = storeToRefs(statics);
    const { mobile } = storeToRefs(globals);
    
    const setRaceDefaults = characters.setRaceDefaults;
    return {
      character,
      ancestries,
      classtext,
      backgrounds,
      mobile,
      setRaceDefaults
    };
  }
};
