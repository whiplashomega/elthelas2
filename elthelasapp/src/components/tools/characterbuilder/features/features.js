import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      character: "getCharacter",
      feats: 'allFeats',
      level: "level",
      featsort: "featsort"
    }),
    numASI () {
      var asi = 0;
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
    ...mapActions({
      addInjury: "addInjury",
      removeInjury: "removeInjury"
    }),
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
