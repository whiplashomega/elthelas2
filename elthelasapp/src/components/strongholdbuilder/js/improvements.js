import { useStrongholdStore, useUserStore } from '@/stores/index';
import { storeToRefs } from 'pinia';

import improvement from '../improvement.vue';

export default {
  components: {
    improvement: improvement
  },
  setup () {
    const strongholdStore = useStrongholdStore();
    const userStore = useUserStore();
    
    const { availableClearedLand, availableForestedLand, farmLand, forestedLand, improvements,
            stronghold, timberLand, totalLand, urbanLand, availableLaborers
    } = storeToRefs(strongholdStore);
    
    const { addImprovement, addToTreasury, buyResource } = strongholdStore;
    
    const { getUserInfo: userinfo } = userStore;
    
    return {
      availableClearedLand, availableForestedLand, farmLand, forestedLand, improvements, stronghold,
      timberLand, totalLand, urbanLand, availableLaborers, userinfo,
      
      addImprovement, addToTreasury, buyResource
    };
  },
  computed: {
    availableImprovements () {
      if (this.showAvailable) {
        let stronghold = this.stronghold;
        return this.improvements.filter((imp) => {
          let allmet = true;
          let donematch = stronghold.improvements.filter((a) => {
            return a.id === imp.id;
          })[0];
          let conmatch = stronghold.construction.filter((a) => {
            return a.id === imp.id;
          });
          if ((donematch && donematch.count + conmatch.length >= imp.max) || conmatch.length >= imp.max) {
            allmet = false;
          }
          imp.prerequisites.forEach((req) => {
            let met = false;
            stronghold.improvements.forEach((strimp) => {
              if (strimp.id === req) {
                met = true;
              }
            });
            stronghold.privateEnterprise.forEach((strimp) => {
              if (strimp.id === req) {
                met = true;
              }
            });
            if (met === false) {
              allmet = false;
            }
          });
          if ((imp.isfarm) && this.availableClearedLand < 1) {
            allmet = false;
          } else if ((imp.id === "town" || imp.id === "additional-district") && this.availableForestedLand < 1.25) {
            allmet = false;
          } else if ((imp.id === "village") && this.availableForestedLand < 0.25) {
            allmet = false;
          } else if ((imp.id === "clear-land" || imp.id === "lumber-camp") && this.availableForestedLand < 1) {
            allmet = false;
          }
          if (this.tagFilter !== "all") {
            if (!imp.tags.includes(this.tagFilter)) {
              allmet = false;
            }
          }
          return allmet;
        });
      } else if (this.tagFilter !== "all") {
        return this.improvements.filter((imp) => {
          return imp.tags.includes(this.tagFilter);
        });
      } else {
        return this.improvements;
      }
    },
    castleImprovements () {
      return this.stronghold.improvements.filter((a) => {
        return a.type === "castle";
      }).sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        } else {
          return -1;
        }
      });
    },
    countrysideImprovements () {
      return this.stronghold.improvements.filter((a) => {
        return a.type === "countryside";
      }).sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        } else {
          return -1;
        }
      });
    },
    townImprovements () {
      return this.stronghold.improvements.filter((a) => {
        return a.type === "town";
      }).sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        } else {
          return -1;
        }
      });
    }
  },
  data () {
    return {
      addImprovementModal: false,
      showAvailable: true,
      dmGift: false,
      addImediately: false,
      tagFilter: "all"
    };
  },
  methods: {
    min (a) {
      return Math.min(...a);
    },
    addToConstruction (improvement) {
      let buildtime = improvement.buildtime;
      if (this.addImediately) {
        buildtime = 0;
      }
      if (buildtime > 0) {
        this.stronghold.construction.push({
          ...improvement,
          resourceCost: { ...improvement.resourceCost },
          laborersassigned: 0
        });
      } else {
        this.addImprovement(improvement);
      }
      improvement.dmGift = false;
      if (!this.dmGift && !improvement.private) {
        this.addToTreasury({ changeby: -improvement.goldCost, record: "Begin construction on " + improvement.name });
      }
      if (this.dmGift) {
        improvement.dmGift = true;
      }
      this.addImprovementModal = false;
    }
  }
};
