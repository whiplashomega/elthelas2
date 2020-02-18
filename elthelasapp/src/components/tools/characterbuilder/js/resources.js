import { mapGetters, mapActions } from 'vuex';
import helpers from './helpers';

export default {
  computed: {
    ...mapGetters({
      character: "getCharacter",
      getStatMod: "getStatMod",
      totalslots: "totalslots",
      warlockSlots: "warlockSlots",
      warlockSlotLevel: "warlockSlotLevel"
    })
  },
  methods: {
    ...mapActions({
      shortrest: "shortrest",
      longrest: "longrest"
    }),
    addResource() {
      this.character.resources.push({ name: "", current: 0, max: 0, recharge: "never" });
    },
    removeResource(i) {
      let c = window.confirm("are you sure you want to delete " + this.character.resources[i].name + "?");
      if (c) {
        this.character.resources.splice(i, 1);
      }
    },
    useResource(i) {
      if (this.character.resources[i].current > 0) {
        this.character.resources[i].current--;
      } else {
        alert("Cannot use " + this.character.resources[i].name + ", already expended.");
      }
    },
    populateResources() {
      this.character.charclasses.forEach((a) => {
        if (a.thisclass.name === "Artificer") {
          helpers.artificerResources(this, this.character, a);
        }
        if (a.thisclass.name === "Barbarian") {
          helpers.barbResources(this.character, a);
        }
        if (a.thisclass.name === "Bard") {
          helpers.bardResources(this, this.character, a);
        }
        if (a.thisclass.name === "Cleric") {
          helpers.clericResources(this.character, a);
        }
        if (a.thisclass.name === "Druid") {
          helpers.druidResources(this, this.character, a);
        }
        if (a.thisclass.name === "Factotum") {
          helpers.factotumResources(this, this.character, a);
        }
        if (a.thisclass.name === "Fighter") {
          helpers.fighterResources(this.character, a);
        }
        if (a.thisclass.name === "Monk") {
          helpers.monkResources(this.character, a);
        }
        if (a.thisclass.name === "Paladin") {
          helpers.paladinResources(this, this.character, a);
        }
        if (a.thisclass.name === "Sorcerer") {
          helpers.sorcererResources(this.character, a);
        }
        if (a.thisclass.name === "Warlock") {
          helpers.warlockResources(this.character, a);
        }
        if (a.thisclass.name === "Wizard") {
          helpers.wizardResources(this.character, a);
        }
      });
    }
  }
};
