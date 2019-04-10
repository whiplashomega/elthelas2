import { mapGetters } from 'vuex';
import helpers from './helpers';

export default {
  computed: {
    ...mapGetters({
      character: "getCharacter"
    })
  },
  methods: {
    addResource() {
      this.character.resources.push({ name: "", current: 0, max: 0, recharge: "never" });
    },
    removeResource(i) {
      this.character.resources.splice(i, 1);
    },
    populateResources() {
      this.character.charclasses.forEach((a) => {
        if (a.thisclass.name === "Barbarian") {
          helpers.barbResources(this.character, a);
        }
        if (a.thisclass.name === "Bard") {
          helpers.bardResources(this.character, a);
        }
        if (a.thisclass.name === "Cleric") {
          helpers.clericResources(this.character, a);
        }
        if (a.thisclass.name === "Druid" && Number(a.level) < 20) {
          this.character.resources.push({ name: "Wildshape", current: 2, max: 2, recharge: "shortrest" });
        }
        if (a.thisclass.name === "Factotum") {
          let num = this.getStatMod(3) + Math.floor(Number(a.level) / 2);
          this.character.resources.push({ name: "Epiphany Points", current: num, max: num, recharge: "shortrest" });
        }
        if (a.thisclass.name === "Fighter") {
          helpers.fighterResources(this.character, a);
        }
        if (a.thisclass.name === "Monk" && Number(a.level) >= 2) {
          this.character.resources.push({ name: "Ki", current: Number(a.level), max: Number(a.level), recharge: "shortrest" });
        }
        if (a.thisclass.name === "Paladin") {
          helpers.paladinResources(this.character, a);
        }
        if (a.thisclass.name === "Sorcerer" && Number(a.level) >= 2) {
          this.character.resources.push({ name: "Sorcery Points", current: Number(a.level), max: Number(a.level), recharge: "longrest" });
        }
        if (a.thisclass.name === "Warlock") {
          if (Number(a.level) >= 1 && a.selsubclass.name === "The Hexblade") {
            this.character.resources.push({ name: "Hexblade's Curse", current: 1, max: 1, recharge: "shortrest" });
          }
        }
        if (a.thisclass.name === "Wizard") {
          helpers.wizardResources(this.character, a);
        }
      });
    }
  }
};
