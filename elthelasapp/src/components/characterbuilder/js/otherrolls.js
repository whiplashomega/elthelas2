import { useCharacterStore, useUserStore } from '@/stores/index';
import { storeToRefs } from 'pinia';

export default {
  setup () {
    const characters = useCharacterStore();
    const userinfo = useUserStore();
    
    const { character, getSaveDC, getDamageBonus } = storeToRefs(characters);
    
    return { character, getSaveDC, getDamageBonus, userinfo };
  },
  data () {
    return {
      newroll: { name: "", stat: 0, damage: [ { dice: "", label: "", damagebonus: 0, addstat: false, prof: false, higherlevels: "" } ], range: "", edit: false, savestat: "", savefor: "", description: "" },
      rollmodal: false
    };
  },
  methods: {
    addRoll() {
      this.character.rolls.push(this.newroll);
      this.newroll = { name: "", stat: 0, damage: [ { dice: "", label: "", damagebonus: 0, addstat: false, prof: false, higherlevels: "" } ], range: "", edit: false, savestat: "", savefor: "", description: "" };
      this.rollmodal = false;
    },
    removeRoll(i) {
      this.character.rolls.splice(i, 1);
    },
    addDamage (roll) {
      roll.damage.push({ dice: "", label: "", damagebonus: 0, addstat: false, prof: false, higherlevels: "" });
    },
    removeDamage (roll, i) {
      roll.damage.splice(i, 1);
    }
  }
};
