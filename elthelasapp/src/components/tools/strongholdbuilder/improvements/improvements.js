import { mapGetters } from 'vuex';
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
      urbanLand: 'urbanLand'
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
      showAvailable: true
    };
  },
  methods: {
    addToConstruction (improvement) {
      if (improvement.buildtime > 0) {
        this.stronghold.construction.push({ ...improvement });
      } else {
        this.addImprovement(improvement);
      }
      if (!improvement.private) {
        for (let key in improvement.resourceCost) {
          this.stronghold.resources[key] -= improvement.resourceCost[key];
          if (this.stronghold.resources[key] < 0) {
            this.buyResource(key, this.stronghold.resources[key] * -1);
          }
        }
        this.addToTreasury(-improvement.goldCost, "Begin construction on " + improvement.name);
      }
      this.addImprovementModal = false;
    },
    addImprovement (improvement) {
      var match = this.stronghold.improvements.filter((a) => {
        return a.id === improvement.id;
      })[0];
      if (improvement.private) {
        match = this.stronghold.privateEnterprise.filter((a) => {
          return a.id === improvement.id;
        })[0];
        if (match) {
          match.count++;
        } else {
          improvement.count++;
          this.stronghold.privateEnterprise.push(improvement);
          improvement.staff.forEach((st) => {
            let match = this.staffTypes.filter((a) => {
              return a.name === st.name;
            })[0];
            if (match && st.num > 0) {
              for (var x = 0; x < st.num; x++) {
                this.stronghold.privateEmployees.push({ id: Date.now() + Math.random(), ...match });
              }
            } else if (match) {
              this.stronghold.privateEmployees.push({ id: Date.now() + Math.random(), ...match });
            }
          });
        }
      } else {
        if (match) {
          match.count++;
        } else {
          improvement.count++;
          this.stronghold.improvements.push(improvement);
        }
      }
    }
  }
};
