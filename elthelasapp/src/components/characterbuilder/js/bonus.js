import { useCharacterStore } from '@/stores/index';
import { storeToRefs } from 'pinia';

export default {
  setup () {
    const characters = useCharacterStore();
    const { character } = storeToRefs(characters);
    
    return {
      character
    };
  }
};
