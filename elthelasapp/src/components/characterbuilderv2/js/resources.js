import { useCharacterv2Store } from '@/stores/index';
import helpers from './helpers';
import { storeToRefs } from 'pinia';

export default {
  setup () {
    const characters = useCharacterv2Store();

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
        a.thisclass.resources.forEach((b) => {
          helpers.resourcePopulator(this.character, a, b);
        });
        a.selsubclass.resources.forEach((c) => {
          helpers.resourcePopulator(this.character, a, c);
        });
      });
    }
  }
};
