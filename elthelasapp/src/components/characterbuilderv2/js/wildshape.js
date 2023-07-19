import { useCharacterv2Store, useCreatureStore } from '@/stores/index';
import { storeToRefs } from 'pinia';
import creaturecalc from '@/helpers/creaturecalc';
import { marked } from '@/../node_modules/marked/lib/marked.esm.js';

export default {
  setup () {
    const characterStore = useCharacterv2Store();
    const creatureStore = useCreatureStore();
    creatureStore.getAllCreatures();
    const { character, getStatTotal, getStatMod, profbonus } = storeToRefs(characterStore);
    const { creatures } = storeToRefs(creatureStore);
    return { character, creatures, creatureStore, characterStore, getStatTotal, getStatMod, creaturecalc, marked, profbonus };
  },
  computed: {
    druidLevel () {
      let druidLevel = 0;
      this.character.charclasses.forEach((cl) => {
        if (cl.thisclass.name === "Druid") {
          druidLevel = cl.level;
        }
      });
      return druidLevel;
    },
    moonDruid () {
      let moon = false;
      this.character.charclasses.forEach((cl) => {
        if (cl.selsubclass.name === "Circle of the Moon" && cl.level >= 1) {
          moon = true;
        }
      });
      return moon;
    },
    formsCount () {
      let count = 0;
      if (this.druidLevel >= 2) {
        count += 3;
      }
      if (this.druidLevel >= 4) {
        count++;
      }
      if (this.druidLevel >= 8) {
        count++;
      }
      if (this.moonDruid && this.druidLevel >= 14) {
        count += 2;
      }
      while (this.character.wildShapeOptions.length < count) {
        this.character.wildShapeOptions.push({ shape: { stats: [] }, baseshape: {}, key: Math.random() });
      }
      if (this.character.wildShapeOptions.length > count) {
        this.character.wildShapeOptions.length = count;
      }
      return count;
    },
    maxCR () {
      if (this.moonDruid) {
        let level = Math.floor(this.druidLevel / 3);
        if (this.druidLevel >= 10) {
          level += 2;
        }
        return level;
      } else if (this.druidLevel >= 8) {
        return 1;
      } else if (this.druidLevel >= 4) {
        return 0.5;
      } else if (this.druidLevel >= 2) {
        return 0.25;
      } else {
        return 0;
      }
    },
    availableForms () {
      return this.creatures.filter((a) => {
        if (a.cr <= this.maxCR && (!a.speed.toLowerCase().includes("fly") || this.druidLevel >= 8) && (a.type === "beast" || (a.type === "elemental" && this.moonDruid && this.druidLevel >= 10))) {
          return true;
        } else {
          return false;
        }
      }).sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        } else {
          return 0;
        }
      });
    }
  },
  methods: {
    loadCreature (form) {
      console.log("loading");
      if (form.baseshape._id) {
        this.creatureStore.getCreature(form.baseshape._id).then((cre) => {
          form.shape = cre;
        });
      }
    }
  }
};
