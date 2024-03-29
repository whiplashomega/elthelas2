import { useCharacterStore } from '@/stores/index';
import helpers from './helpers';
import { storeToRefs } from 'pinia';

export default {
  setup () {
    const characters = useCharacterStore();
    
    const { character, getStatMod, totalslots, warlockSlots, warlockSlotLevel, shortrest, longrest } =  storeToRefs(characters);

    return {
      character,
      getStatMod,
      totalslots,
      warlockSlots,
      warlockSlotLevel,
      shortrest,
      longrest
    };
  },
  methods: {
    addResource() {
      this.character.resources.push({ id: Date.now() + Math.random(), name: "", current: 0, max: 0, recharge: "never" });
    },
    removeResource(i) {
      let c = window.confirm("are you sure you want to delete " + this.character.resources[i].name + "?");
      if (c) {
        let actions = this.character.actions.filter((a) => {
          return a.resourceused.name === this.character.resources[i].name;
        });
        if (actions.length > 0) {
          actions.forEach((a) => {
            alert("Cannot delete resource " + this.character.resources[i].name + ". It is still used by the action " + a.name);
          });
        } else {
          this.character.resources.splice(i, 1);
        }
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
          helpers.barbResources(this, this.character, a);
        }
        if (a.thisclass.name === "Bard") {
          helpers.bardResources(this, this.character, a);
        }
        if (a.thisclass.name === "Cleric") {
          helpers.clericResources(this, this.character, a);
        }
        if (a.thisclass.name === "Druid") {
          helpers.druidResources(this, this.character, a);
        }
        if (a.thisclass.name === "Factotum") {
          helpers.factotumResources(this, this.character, a);
        }
        if (a.thisclass.name === "Fighter") {
          helpers.fighterResources(this, this.character, a);
        }
        if (a.thisclass.name === "Monk") {
          helpers.monkResources(this, this.character, a);
        }
        if (a.thisclass.name === "Paladin") {
          helpers.paladinResources(this, this.character, a);
        }
        if (a.thisclass.name === "Sorcerer") {
          helpers.sorcererResources(this, this.character, a);
        }
        if (a.thisclass.name === "Warlock") {
          helpers.warlockResources(this, this.character, a);
        }
        if (a.thisclass.name === "Wizard") {
          helpers.wizardResources(this, this.character, a);
        }
      });
    }
  }
};
