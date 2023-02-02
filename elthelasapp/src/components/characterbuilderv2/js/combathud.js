import droll from 'droll';

import hitpoints from '@/components/characterbuilderv2/hitpoints.vue';
import combat from '@/components/characterbuilderv2/combat.vue';
import attacks from '@/components/characterbuilderv2/attacks.vue';
import actions from '@/components/characterbuilderv2/actions.vue';
import resources from '@/components/characterbuilderv2/resources.vue';
import { useCharacterv2Store } from '@/stores/index';
import { storeToRefs } from 'pinia';

export default {
  setup () {
    const characters = useCharacterv2Store();
    
    const { character, getSaveMod, getSkillMod, getSaveDC } = storeToRefs(characters);
    
    return {
      character,
      getSaveMod,
      getSkillMod,
      getSaveDC
    };
  },
  components: {
    hitpoints,
    combat,
    attacks,
    actions,
    resources
  },
  computed: {
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
    rollCheck (modifier) {
      let res = droll.roll('1d20').total;
      let adv = droll.roll('1d20').total;
      alert("Base Roll: " + (res + modifier) + " (" + res + " + " + modifier + ")\nAdv/Dis Roll: " + (adv + modifier) + " (" + adv + " + " + modifier + ")");
    }
  }
};
