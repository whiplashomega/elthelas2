import { useCharacterStore } from '@/stores/index';
import { storeToRefs } from 'pinia';
import droll from 'droll';

export default {
  setup () {
    const characters = useCharacterStore();
    
    const { character } = storeToRefs(characters);
    
    const loadimage = characters.loadImage;
    
    return {
      character,
      loadimage
    }
  },
  methods: {
    rollHeightWeight () {
      let heightroll = droll.roll(this.character.race.heightroll).total;
      let height = this.character.race.baseheight + heightroll;
      let feet = Math.floor(height / 12);
      let inches = height % 12;
      this.character.height = feet + "' " + inches + "\"";
      let weightroll = droll.roll(this.character.race.weightroll).total;
      this.character.weight = this.character.race.baseweight + heightroll * weightroll + " lbs";
    }
  }
};
