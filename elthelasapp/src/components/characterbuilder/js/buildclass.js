import { useCharacterStore, useStaticsStore } from '@/stores/index';
import { storeToRefs } from 'pinia';

export default {
  setup () {
    const characters = useCharacterStore();
    const statics = useStaticsStore();

    const { character } = storeToRefs(characters);
    const { classes } = storeToRefs(statics);

    const addclass = characters.addclass;
    const removeclass = characters.removeclass;

    return {
      character,
      classes,
      addclass,
      removeclass
    };
  }
};
