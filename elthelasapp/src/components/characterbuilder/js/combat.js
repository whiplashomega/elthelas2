import { useCharacterStore, useUserStore } from '@/stores/index';
import { storeToRefs } from 'pinia';
export default {
  setup () {
    const characters = useCharacterStore();
    const userinfo = useUserStore();
    
    const { character, accalc, armorac, profbonus, getSpeedStat } = storeToRefs(characters);
    
    const removeArmor = characters.removeArmor;
    
    return {
      userinfo,
      character,
      accalc,
      armorac,
      profbonus,
      getSpeedStat,
      removeArmor
    }
  },
  data () {
    return {
      newarmor: { name: "", type: "", ac: 0, edit: false },
      armormodal: false
    };
  },
  methods: {
    addArmor() {
      this.character.armors.push(this.newarmor);
      this.newarmor = { name: "", type: "", ac: 0, edit: false };
      this.armormodal = false;
    }
  }
};
