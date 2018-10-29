import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      character: 'getCharacter',
      getAttBonus: 'getAttBonus',
      getAttackBonus: "getAttackBonus",
      getAttackDamageBonus: "getAttackDamageBonus"
    })
  },
  data () {
    return {
      newattack: { name: "", stat: 0, bonus: 0, addstat: false, damage: "", range: "", type: "", dtype: "", edit: false, damagebonus: 0, prof: true, damage2: "", dtype2: "" },
      attackmodal: false
    };
  },
  methods: {
    ...mapActions({
      removeAttack: "removeAttack"
    }),
    addAttack() {
      this.character.attacks.push(this.newattack);
      this.newattack = { name: "", stat: 0, bonus: 0, addstat: 0, damage: "", range: "", type: "", dtype: "", edit: false, damagebonus: 0, prof: true, damage2: "", dtype2: "" };
      this.attackmodal = false;
    }
  }
};
