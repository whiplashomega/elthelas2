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
    },
    numConcentrating () {
      return this.character.activemodifiers.reduce((a, b) => {
        return a + b.concentrating;
      }, 0);
    }
  },
  props: { combatModal: Boolean },
  methods: {
    addActiveModifier () {
      this.character.activemodifiers.push({
        id: Date.now() + Math.random(),
        modifier: "",
        remaining: 10,
        concentrating: false
      });
    },
    removeActiveModifier (id) {
      this.character.activemodifiers.splice(this.character.activemodifiers.findIndex((a) => {
        return a.id === id;
      }), 1);
    },
    passTime (amount) {
      this.character.activemodifiers.forEach((a) => {
        a.remaining -= amount;
      });
      this.character.activemodifiers = this.character.activemodifiers.filter((a) => {
        if (a.remaining <= 0) {
          alert(a.modifier + " has ended");
        }
        return a.remaining > 0;
      });
    },
    ...mapActions({}),
    rollCheck (modifier) {
      let res = droll.roll('1d20').total;
      let adv = droll.roll('1d20').total;
      alert("Base Roll: " + (res + modifier) + " (" + res + " + " + modifier + ")\nAdv/Dis Roll: " + (adv + modifier) + " (" + adv + " + " + modifier + ")");
    }
  }
};
