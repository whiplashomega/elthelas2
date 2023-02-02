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
    },
    sortedFeatures () {
      return this.shownClass.features.sort((a, b) => {
        if (a.level > b.level) {
          return 1;
        } else {
          return -1;
        }
      })
    }
  },
  data () {
    return {
      shownClass: { features: [], subclass: [{ castermult: 0 }] },
      shownSubClass: { features: [] }
    };
  },
  methods: {
    getFeaturesByLevel (level) {
      let featuresArray = this.shownClass.features.filter((a) => {
        return a.level === level;
      }).map((a) => {
        return a.name;
      });
      if (level === 8 || level === 12 || level === 16 || level === 19) {
        featuresArray.push("Ability Score Improvement")
      }
      let featuresString = featuresArray.join(", ");
      return { arr: featuresArray, str: featuresString };
    },
    getSlotsByLevel (spelllvl, level) {
      let casterlevel = Math.ceil(level * this.shownClass.subclass[0].castermult);
      if (level === 1 && this.shownClass.subclass[0].castermult != 1 && this.shownClass.name !== "Artificer") {
        casterlevel = 0;
      }
      return Calc.slots[casterlevel][spelllvl-1];
    },
    getCantripCount(level) {
      let mult = this.shownClass.subclass[0].castermult;
      if (mult === 1 || this.shownClass.name === "Warlock") {
        return this.shownClass.cantrips + (level >= 10 ? 2 :(level >= 4 ? 1 : 0));
      } else if (mult === 0.5) {
        return this.shownClass.cantrips + (level >= 14 ? 2 :(level >= 10 ? 1 : 0));
      }
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
      if (count === 99) {
        return "Unlimited";
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
