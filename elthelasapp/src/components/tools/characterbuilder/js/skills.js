import { mapGetters } from 'vuex';
import droll from 'droll';

export default {
  computed: {
    ...mapGetters({
      getSkillMod: "getSkillMod",
      character: "getCharacter"
    })
  },
  methods: {
    rollCheck (modifier) {
      let res = droll.roll('1d20').total;
      let adv = droll.roll('1d20').total;
      alert("Base Roll: " + (res + modifier) + " (" + res + " + " + modifier + ")\nAdv/Dis Roll: " + (adv + modifier) + " (" + adv + " + " + modifier + ")");
    }
  }
};
