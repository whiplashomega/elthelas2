import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      character: "getCharacter",
      accalc: "accalc",
      armorac: "armorac",
      profbonus: "profbonus",
      getSpeedStat: "getSpeedStat"
    })
  },
  data () {
    return {
      newarmor: { name: "", type: "", ac: 0, edit: false },
      armormodal: false
    };
  },
  methods: {
    ...mapActions({
      removeArmor: "removeArmor"
    }),
    addArmor() {
      this.character.armors.push(this.newarmor);
      this.newarmor = { name: "", type: "", ac: 0, edit: false };
      this.armormodal = false;
    }
  }
};
