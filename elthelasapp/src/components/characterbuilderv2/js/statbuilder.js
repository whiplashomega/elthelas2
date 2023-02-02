import { useCharacterv2Store } from '@/stores/index';
import { storeToRefs } from 'pinia';

export default {
    setup () {
        // stores
        const characters = useCharacterv2Store();
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