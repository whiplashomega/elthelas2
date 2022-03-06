import { mapGetters, mapActions } from 'vuex';
import droll from 'droll';

export default {
  computed: {
    ...mapGetters({
      character: "getCharacter"
    })
  },
  methods: {
    ...mapActions({
      loadimage: "loadImage"
    }),
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
