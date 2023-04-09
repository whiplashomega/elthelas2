import { useCharacterv2Store, useUserStore, useStaticsStore } from '@/stores/index';
import { storeToRefs } from 'pinia';
import { marked } from '@/../node_modules/marked/lib/marked.esm.js';

export default {
  setup () {
    const characters = useCharacterv2Store();
    const userinfo = useUserStore();
    const statics = useStaticsStore();

    const { character, level } = storeToRefs(characters);
    const { featsv2: feats, featv2sort: featsort } = storeToRefs(statics);

    const addInjury = characters.addInjury;
    const removeInjury = characters.removeInjury;

    return {
      userinfo,
      character,
      feats,
      level,
      featsort,
      addInjury,
      removeInjury,
      marked
    };
  },
  computed: {
    lvl1feats () {
      return this.feats.filter((a) => {
      if (!a.prereq.includes("4th level")) {
        return true;
      }
      return  false;
    });
    },
    numASI () {
      var asi = 1;
      this.character.charclasses.forEach((cl) => {
        if (cl.level >= 4) {
          asi++;
        }
        if (cl.level >= 6 && (cl.thisclass.name === "Fighter" || cl.thisclass.name === "Factotum")) {
          asi++;
        }
        if (cl.level >= 8) {
          asi++;
        }
        if (cl.level >= 10 && (cl.thisclass.name === "Rogue")) {
          asi++;
        }
        if (cl.level >= 12) {
          asi++;
        }
        if (cl.level >= 14 && cl.thisclass.name === "Fighter") {
          asi++;
        }
        if (cl.level >= 16) {
          asi++;
        }
        if (cl.level >= 19) {
          asi++;
        }
      });
      asi += Number(this.character.bonusfeats);
      while (this.character.feats.length < asi) {
        this.character.feats.push({ name: "", prereq: "", description: "" });
      }
      if (this.character.feats.length > asi) {
        this.character.feats.length = asi;
      }
      return asi;
    }
  },
  data () {
    return {
      newfeature: { name: "", description: "", show: false },
      newFeatureModal: false
    };
  },
  methods: {
    addFeature() {
      this.character.features.push(this.newfeature);
      this.newfeature = { name: "", description: "", show: false };
      this.newFeatureModal = false;
    },
    setval(object, attribute, value) {
      object[attribute] = value;
      this.$forceUpdate();
    },
    removeFeature(i) {
      this.character.features.splice(i, 1);
    }
  }
};
