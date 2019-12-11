import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      character: "getCharacter",
      getHPTotal: "getHPTotal"
    })
  },
  data: function () {
    return {
      damagetaken: 0,
      dtype: "piercing"
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
    },
    ...mapActions({
      shortrest: "shortrest",
      longrest: "longrest"
    })
  }
};
