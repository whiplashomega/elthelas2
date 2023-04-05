import { useMeta } from "vue-meta";
import { useStaticsStore } from '@/stores/index';
import { storeToRefs } from 'pinia';

export default {
  setup () {
    useMeta({ title: "System Reference Search" });
    const statics = useStaticsStore();
    const {
      ancestries,
      armorv2: armor,
      backgroundsv2: backgrounds,
      classesv2: classes,
      divines,
      equipmentv2: equipment,
      featsv2: feats,
      magicitemvsv2: magicitems,
      rules,
      rulesByCategory,
      spellsv2: spells,
      weaponsv2: weapons,
    } = storeToRefs(statics);
    return { ancestries, armor, backgrounds, classes, divines, equipment, feats, magicitems, statics, rules, rulesByCategory, spells, weapons };
  },
  computed: {
    rulesresults () {
      return this.rules.filter((rule) => {
        if (this.searchtext !== '' && (rule.title.toLowerCase().includes(this.searchtext.toLowerCase()) || rule.description.toLowerCase().includes(this.searchtext.toLowerCase()) || rule.subcategory.toLowerCase().includes(this.searchtext.toLowerCase()))) {
          return true;
        }
      });
    }
  },
  data () {
    return {
      searchtext: "",
      showresults: false
    };
  },
  created () {
    this.statics.getAllNew();
  }
};
