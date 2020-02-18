import { mapGetters, mapActions } from 'vuex';
import droll from 'droll';

import hitpoints from '@/components/tools/characterbuilder/hitpoints';
import combat from '@/components/tools/characterbuilder/combat';
import attacks from '@/components/tools/characterbuilder/attacks';
import actions from '@/components/tools/characterbuilder/actions';
import resources from '@/components/tools/characterbuilder/resources';

export default {
  components: {
    hitpoints,
    combat,
    attacks,
    actions,
    resources
  },
  computed: {
    ...mapGetters({
      getSaveMod: "getSaveMod",
      getSkillMod: "getSkillMod",
      character: "getCharacter",
      getSaveDC: "getSaveDC"
    }),
    athletics () {
      return this.character.skills.filter((a) => {
        return a.name === "Athletics";
      })[0];
    },
    acrobatics () {
      return this.character.skills.filter((a) => {
        return a.name === "Acrobatics";
      })[0];
    },
    perception () {
      return this.character.skills.filter((a) => {
        return a.name === "Perception";
      })[0];
    },
    stealth () {
      return this.character.skills.filter((a) => {
        return a.name === "Stealth";
      })[0];
    }
  },
  props: { combatModal: Boolean },
  methods: {
    ...mapActions({}),
    rollCheck (modifier) {
      let res = droll.roll('1d20').total;
      let adv = droll.roll('1d20').total;
      alert("Base Roll: " + (res + modifier) + " (" + res + " + " + modifier + ")\nAdv/Dis Roll: " + (adv + modifier) + " (" + adv + " + " + modifier + ")");
    }
  }
};
