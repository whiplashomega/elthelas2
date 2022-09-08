import { useCharacterStore } from '@/stores/index';
import { storeToRefs } from 'pinia';

export default {
  setup () {
    const characters = useCharacterStore();
    const { character, getInitMod } = storeToRefs(characters);
    
    return {
      characters,
      character,
      getInitMod
    };
  }
};
