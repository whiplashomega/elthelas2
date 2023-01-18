import { useMeta } from 'vue-meta';
import { useStaticsStore } from '@/stores/index';
import { marked } from '@/../node_modules/marked/lib/marked.esm.js';
import { storeToRefs } from 'pinia';
import Calc from '@/helpers/charcalc';

export default {
  setup () {
    useMeta({ title: "Character Classes" });
    const staticsStore = useStaticsStore();
    const { classesv2: classes } = storeToRefs(staticsStore);
    return {
      marked, classes, staticsStore
    }
  },
  computed: {
    tableResources () {
      return this.shownClass.resources.filter((a) => {
        return a.addToTable;
      });
    }
  },
  data () {
    return {
      shownClass: { features: [], subclass: [{ castermult: 0 }] }
    };
  },
  methods: {
    getFeaturesByLevel (level) {
      let featuresArray = this.shownClass.features.filter((a) => {
        return a.level === level;
      });
      let featuresString = "";
      featuresArray.forEach((e) => {
        featuresString += e.name + ", ";
      });
      return { arr: featuresArray, str: featuresString };
    },
    getSlotsByLevel (spelllvl, level) {
      let casterlevel = Math.ceil(level * this.shownClass.subclass[0].castermult);
      return Calc.slots[casterlevel][spelllvl-1];
    },
    getResCount(res, level) {
      let count = 0;
      if (res.counttype === "table") {
        for (var x = 0; x < res.count.length; x++) {
          if (res.count[x][0] <= level) {
            count = res.count[x][1];
          }
        }
      }
      if (res.counttype === "level") {
        count = level + res.count;
      }
      if (level < res.minlevel) {
        count = 0;
      }
      return count;
    }
  },
  mounted () {
    this.staticsStore.getAll().then(() => {
      if (this.$route.params.id) {
        this.shownClass = this.classes.filter((a) => {
          return a.name.toLowerCase() === this.$route.params.id.toLowerCase();
        })[0];
      }
    })
  }
};
