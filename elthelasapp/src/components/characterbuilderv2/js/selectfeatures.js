import fightingstyles from './selectable/fightingstyles.js';
import infusions from './selectable/artificerinfusions.js';
import metamagic from './selectable/metamagicoptions.js';
import invocations from './selectable/warlockinvocations.js';
import { useCharacterv2Store } from '@/stores/index';
import { storeToRefs } from 'pinia';

export default {
  setup () {
    const characterStore = useCharacterv2Store();
    const { character } = storeToRefs(characterStore);

    return {
      fightingstyles, infusions, metamagic, invocations, character
    };
  },
  computed: {
    availablestyles () {
      return this.fightingstyles.filter((fs) => {
        for (let i in this.character.fightingstyles) {
          if (this.character.fightingstyles[i].name === fs.name) {
            return false;
          }
        }
        return true;
      });
    },
    availableinfusions () {
      let qualifyinginfusions = this.infusions.filter((inf) => {
        for (let cl in this.character.charclasses) {
          if (this.character.charclasses[cl].thisclass.name === "Artificer" && this.character.charclasses[cl].level >= inf.level) {
            return true;
          }
        }
        if (inf.level === 0) {
          return true;
        }
        return false;
      });
      return qualifyinginfusions.filter((inf) => {
        for (let i in this.character.infusions) {
          if (this.character.infusions[i].name === inf.name) {
            return false;
          }
        }
        return true;
      });
    },
    availablemetamagic () {
      return this.metamagic.filter((mt) => {
        for (let i in this.character.metamagic) {
          if (this.character.metamagic[i].name === mt.name) {
            return false;
          }
        }
        return true;
      });
    },
    availableinvocations () {
      return this.invocations.filter((inv) => {
        for (let i in this.character.invocations) {
          if (this.character.invocations[i].name === inv.name) {
            return false;
          }
        }
        return true;
      });
    },
    numMeta () {
      var asi = 0;
      this.character.charclasses.forEach((cl) => {
        if (cl.thisclass.name === "Sorcerer" && cl.level >= 3) {
          asi += 2;
          if (cl.level >= 10) {
            asi++;
          }
          if (cl.level >= 14) {
            asi++;
          }
        }
      });
      this.character.feats.forEach((cl) => {
        if (cl.name === "Metamagic Adept") {
          asi+=1;
        }
      });
      asi += Number(this.character.bonusmetamagic);
      while (this.character.metamagic.length < asi) {
        this.character.metamagic.push({ name: "", description: "" });
      }
      if (this.character.metamagic.length > asi) {
        this.character.metamagic.length = asi;
      }
      return asi;
    },
    numStyles () {
      var asi = 0;
      this.character.charclasses.forEach((cl) => {
        if (cl.thisclass.name === "Fighter" && cl.level >= 2) {
          asi++;
          if (cl.selsubclass.name === "Champion" && cl.level >= 10) {
            asi++;
          }
        }
        if (cl.level >= 2 && (cl.thisclass.name === "Paladin" || cl.thisclass.name === "Ranger")) {
          asi++;
        }
        if (cl.level >= 2 && cl.selsubclass.name === "Brains Over Brawn") {
          asi++;
        }
        if (cl.level >= 2 && cl.selsubclass.name === "College of Swords") {
          asi++;
        }
      });
      this.character.feats.forEach((cl) => {
        if (cl.name === "Fighting Initiate") {
          asi++;
        }
      });
      asi += Number(this.character.bonusstyles);
      while (this.character.fightingstyles.length < asi) {
        this.character.fightingstyles.push({ name: "", description: "" });
      }
      if (this.character.fightingstyles.length > asi) {
        this.character.fightingstyles.length = asi;
      }
      return asi;
    },
    numInfusionsKnown () {
      var asi = 0;
      this.character.charclasses.forEach((cl) => {
        if (cl.thisclass.name === "Artificer" && cl.level >= 1) {
          cl.thisclass.resources.forEach((res) => {
            if (res.name === "Infusions Known") {
              let tableentry = res.count.findLast((t) => {
                return cl.level >= t[0];
              });
              if (tableentry !== undefined) {
                asi = tableentry[1];
              }
            }
          });
        }
      });
      asi += Number(this.character.bonusinfusions);
      while (this.character.infusions.length < asi) {
        this.character.infusions.push({ name: "", level: 0, item: "", description: "" });
      }
      if (this.character.infusions.length > asi) {
        this.character.infusions.length = asi;
      }
      return asi;
    },
    numInvocations () {
      var asi = 0;
      this.character.charclasses.forEach((cl) => {
        if (cl.thisclass.name === "Warlock" && cl.level >= 2) {
          cl.thisclass.resources.forEach((res) => {
            if (res.name === "Invocations") {
              let tableentry = res.count.findLast((t) => {
                return cl.level >= t[0];
              });
              if (tableentry !== undefined) {
                asi = tableentry[1];
              }
            }
          });
        }
      });
      this.character.feats.forEach((cl) => {
        if (cl.name === "Eldritch Adept") {
          asi++;
        }
      });
      asi += Number(this.character.bonusinvocations);
      while (this.character.invocations.length < asi) {
        this.character.invocations.push({ name: "", level: 0, item: "", description: "" });
      }
      if (this.character.invocations.length > asi) {
        this.character.invocations.length = asi;
      }
      return asi;
    }
  }
};