import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      character: 'getCharacter',
      getSaveDC: 'getSaveDC',
      getDamageBonus: 'getDamageBonus',
      userinfo: "getUserInfo"
    })
  },
  data () {
    return {
      newroll: { name: "", stat: 0, damage: [ { dice: "", label: "", damagebonus: 0, addstat: false, prof: false } ], range: "", edit: false, savestat: "", savefor: "", description: "" },
      rollmodal: false
    };
  },
  methods: {
    addRoll() {
      this.character.rolls.push(this.newroll);
      this.newroll = { name: "", stat: 0, damage: [ { dice: "", label: "", damagebonus: 0, addstat: false, prof: false } ], range: "", edit: false, savestat: "", savefor: "", description: "" };
      this.rollmodal = false;
    },
    removeRoll(i) {
      this.character.rolls.splice(i, 1);
    },
    addDamage (roll) {
      roll.damage.push({ dice: "", label: "", damagebonus: 0, addstat: false });
    },
    removeDamage (roll, i) {
      roll.damage.splice(i, 1);
    }
  }
};
