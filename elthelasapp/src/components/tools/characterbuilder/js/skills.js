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
    notRawCheck (skill) {
      if (
        skill.name === "Strength" ||
        skill.name === "Dexterity" ||
        skill.name === "Constitution" ||
        skill.name === "Intelligence" ||
        skill.name === "Wisdom" ||
        skill.name === "Charisma"
      ) {
        return false;
      }
      return true;
    },
    rollCheck (modifier) {
      let res = droll.roll('1d20').total;
      let adv = droll.roll('1d20').total;
      alert("Base Roll: " + (res + modifier) + " (" + res + " + " + modifier + ")\nAdv/Dis Roll: " + (adv + modifier) + " (" + adv + " + " + modifier + ")");
    }
  }
};
