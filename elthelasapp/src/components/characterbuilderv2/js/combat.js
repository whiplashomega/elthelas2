import { useCharacterv2Store, useUserStore } from '@/stores/index';
import { storeToRefs } from 'pinia';
export default {
  setup () {
    const characters = useCharacterv2Store();
    const userinfo = useUserStore();
    
    const { character, accalc, pccalc, armorac, armorpc, profbonus, getSpeedStat, getStatMod } = storeToRefs(characters);
    
    const removeArmor = characters.removeArmor;
    
    return {
      userinfo,
      character,
      accalc,
      pccalc,
      armorac,
      armorpc,
      profbonus,
      getSpeedStat,
      removeArmor,
      getStatMod
    }
  },
  data () {
    return {
      newarmor: { name: "", type: "", ac: 0, pc: 0, maxdex: 0, edit: false },
      armormodal: false
    };
  },
  methods: {
    addArmor() {
      this.character.armors.push(this.newarmor);
      this.newarmor = { name: "", type: "", ac: 0, pc: 0, maxdex: 0, edit: false };
      this.armormodal = false;
    }
  }
};
