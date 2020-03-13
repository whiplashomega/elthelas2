import { mapGetters, mapActions } from 'vuex';
import droll from 'droll';

let Proficiency = {
        custom: true,
        name: "",
        stat: 0,
        prof: 0,
        magic: 0
};

export default {
  computed: {
    ...mapGetters({
      getSkillMod: "getSkillMod",
      character: "getCharacter",
      userinfo: "getUserInfo"
    })
  },
  data: function () {
    return {
      newProfModal: false,
      newProf: new Proficiency()
    };
  },
  methods: {
    ...mapActions({
      addProficiency: "addProficiency",
      removeProficiency: "removeProficiency"
    }),
    addProf (skill) {
      this.addProficiency(skill);
      this.newProf = new Proficiency();
    },
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
