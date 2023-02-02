import { useCharacterv2Store } from '@/stores/index';
import { storeToRefs } from 'pinia';

export default {
  setup () {
    const characters = useCharacterv2Store();
    const { character } = storeToRefs(characters);
    
    return {
      character
    };
  }
};
