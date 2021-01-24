import { mapGetters, mapActions } from 'vuex';
import improvement from '../improvement';

export default {
  components: {
    improvement: improvement
  },
  computed: {
    ...mapGetters({
      availableClearedLand: 'availableClearedLand',
      availableForestedLand: 'availableForestedLand',
      farmLand: 'farmLand',
      forestedLand: 'forestedLand',
      improvements: 'allImprovements',
      stronghold: 'stronghold',
      timberLand: 'timberLand',
      totalLand: 'totalLand',
      urbanLand: 'urbanLand',
      userinfo: "getUserInfo"
    }),
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
          if ((imp.id === "food-farm" || imp.id === "cattle-farm" || imp.id === 'winery' || imp.id === "sheep-farm") && this.availableClearedLand < 1) {
            allmet = false;
          } else if ((imp.id === "town" || imp.id === "additional-district") && this.availableForestedLand < 1.25) {
            allmet = false;
          } else if ((imp.id === "village") && this.availableForestedLand < 0.25) {
            allmet = false;
          } else if ((imp.id === "clear-land" || imp.id === "lumber-camp") && this.availableForestedLand < 1) {
            allmet = false;
          }
          return allmet;
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
      addImediately: false
    };
  },
  methods: {
    ...mapActions({
      addImprovement: 'addImprovement',
      addToTreasury: 'addToTreasury',
      buyResource: 'buyResource'
    }),
    addToConstruction (improvement) {
      let buildtime = improvement.buildtime;
      if (this.addImediately) {
        buildtime = 0;
      }
      if (buildtime > 0) {
        this.stronghold.construction.push({ ...improvement });
      } else {
        this.addImprovement(improvement);
      }
      if (!improvement.private && !this.dmGift) {
        for (let key in improvement.resourceCost) {
          this.stronghold.resources[key] -= improvement.resourceCost[key];
          if (this.stronghold.resources[key] < 0) {
            this.buyResource({ type: key, amount: this.stronghold.resources[key] * -1 });
          }
        }
        this.addToTreasury({ changeby: -improvement.goldCost, record: "Begin construction on " + improvement.name });
      }
      this.addImprovementModal = false;
    }
  }
};
