import { useCharacterv2Store, useStaticsStore } from '@/stores/index';
import { storeToRefs } from 'pinia';

export default {
  setup () {
    const characters = useCharacterv2Store();
    const statics = useStaticsStore();
    
    const { character } = storeToRefs(characters);
    const classes = statics.classesv2;
    
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
