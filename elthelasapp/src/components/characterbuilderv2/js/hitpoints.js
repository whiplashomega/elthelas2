import { useCharacterv2Store } from '@/stores/index';
import { storeToRefs } from 'pinia';

export default {
  setup () {
    const characters = useCharacterv2Store();
    
    const { character, getHPTotal, maxExhaustion, pccalc } = storeToRefs(characters);

    const shortrest = characters.shortrest;
    const longrest = characters.longrest;
    
    return {
      character,
      getHPTotal,
      shortrest,
      pccalc,
      longrest,
      maxExhaustion
    };
  },
  data: function () {
    return {
      damagetaken: 0,
      dtype: "piercing",
      dlog: []
    };
  },
  methods: {
    applyDamage () {
      let adjusteddamage = this.damagetaken;
      if (this.dtype === 'healing') {
        adjusteddamage = -adjusteddamage;
        this.character.hpcurrent -= adjusteddamage;
        if (this.character.hpcurrent > this.getHPTotal) {
          this.character.hpcurrent = this.getHPTotal;
        }
      } else {
        if (this.dtype === "bludgeoning" || this.dtype === "piercing" || this.dtype === "slashing") {
          adjusteddamage = Math.max(adjusteddamage - this.pccalc, 0);
        }
        if (this.character.dr[this.dtype] === "3") {
          adjusteddamage = Math.max(adjusteddamage - 3, 0);
        } else if (this.character.dr[this.dtype] === "resistance") {
          adjusteddamage = Math.max(Math.floor(adjusteddamage / 2), 1);
        } else if (this.character.dr[this.dtype] === "immunity") {
          adjusteddamage = 0;
        } else if (this.character.dr[this.dtype] === "vulnerable") {
          adjusteddamage *= 2;
        }
        this.character.temphp -= adjusteddamage;
        if (this.character.temphp < 0) {
          this.character.hpcurrent += this.character.temphp;
          this.character.temphp = 0;
          if (this.character.hpcurrent < 0) {
            this.character.hpcurrent = 0;
          }
        }
      }
    }
  }
};
