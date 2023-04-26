import { useCharacterv2Store, useGlobalsStore, useStaticsStorev2 } from '@/stores/index';
import { storeToRefs } from 'pinia';

export default {
  setup () {
    const characters = useCharacterv2Store();
    const globals = useGlobalsStore();
    const statics = useStaticsStorev2();

    const { character, classtext } = storeToRefs(characters);
    const { builderAncestries: ancestries, backgroundsv2: backgrounds } = storeToRefs(statics);
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
