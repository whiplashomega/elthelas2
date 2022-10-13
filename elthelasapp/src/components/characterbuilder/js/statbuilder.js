import { useCharacterStore } from '@/stores/index';
import { storeToRefs } from 'pinia';

export default {
    setup () {
        // stores
        const characters = useCharacterStore();
        // map getters
        const { character, pointbuy } = storeToRefs(characters);
        
        // map actions
        const rollStats = characters.rollStats;
        
        return {
          characters,
          character,
          rollStats,
          pointbuy
        }
      }
}