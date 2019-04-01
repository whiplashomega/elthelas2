import { mapGetters, mapActions } from 'vuex';
import improvement from './improvement';

export default {
  components: {
    improvement: improvement
  },
  computed: {
    ...mapGetters({
      improvements: "allImprovements",
      staffTypes: "staffTypes",
      stronghold: "stronghold",
      allStrongholds: "strongholds",
      availableForestedLand: "availableForestedLand",
      timberLand: "timberLand",
      forestedLand: "forestedLand",
      urbanLand: "urbanLand",
      farmLand: "farmLand",
      totalLand: "totalLand",
      calcRevRatio: 'calcRevRatio',
      calculateIncome: 'calculateIncome',
      calculateRevenue: 'calculateRevenue',
      availableClearedLand: "availableClearedLand",
      guardsNeeded: 'guardsNeeded',
      laborersNeeded: 'laborersNeeded',
      servantsNeeded: 'servantsNeeded',
      availableLaborers: 'availableLaborers',
      neededStaff: 'neededStaff',
      staffSummary: 'staffSummary',
      privateLaborers: 'privateLaborers',
      maxLaborers: 'maxLaborers',
      totalPrivateEmployed: 'totalPrivateEmployed'
    }),
    staffList () {
      return [ ...this.stronghold.staff ].sort((a, b) => {
        if (this.staffSort === 'job') {
          if (a.job.name > b.job.name) {
            return 1;
          } else {
            return -1;
          }
        } else {
          if (a[this.staffSort] > b[this.staffSort]) {
            return 1;
          } else {
            return -1;
          }
        }
      });
    },
    calcTotalRevenue () {
      let rev = this.stronghold.improvements.reduce((total, imp) => {
        let rev = this.calculateRevenue(imp);
        for (let key in total) {
          total[key] += rev[key];
        }
        return total;
      }, { alcohol: 0, arcanum: 0, cloth: 0, coal: 0, food: 0, iron: 0, leather: 0, lumber: 0, steel: 0, stone: 0, timber: 0, wool: 0 });
      for (let key in rev) {
        rev[key] += Number(this.stronghold.autoSell[key]);
      }
      rev['food'] -= this.stronghold.laws.foodSubsidies;
      return rev;
    },
    reverseTransactions () {
      return this.stronghold.transactionrecord.slice().reverse();
    },
    getPop () {
      let pop = this.stronghold.improvements.reduce((a, b) => {
        return a + b.pop * b.count;
      }, 0) + this.stronghold.staff.length + this.stronghold.privateEmployees.length;
      return pop;
    },
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
    },
    unmetStaffNeed () {
      let needed = [];
      this.neededStaff.forEach((a) => {
        needed.push({ ...a });
      });
      this.stronghold.staff.forEach((st) => {
        let index = -1;
        needed.forEach((stn) => {
          if (st.job.name === stn.name && stn.name !== "Guard" && stn.name !== "Servant") {
            index = needed.indexOf(stn);
            stn.num--;
          } else if (st.job.subtype && stn.name === st.job.name + " (" + st.job.subtype + ")") {
            index = needed.indexOf(stn);
            stn.num--;
          }
        });
        if (index !== -1 && needed[index].num <= 0) {
          needed.splice(index, 1);
        }
      });
      let guards = needed.filter((a) => { return a.name === "Guard"; })[0];
      if (guards) {
        guards.num -= this.stronghold.guards;
        if (guards.num <= 0) {
          needed.splice(needed.indexOf(guards), 1);
        }
      }
      let servants = needed.filter((a) => { return a.name === "Servant"; })[0];
      if (servants) {
        servants.num -= this.stronghold.servants;
        if (servants.num <= 0) {
          needed.splice(needed.indexOf(servants), 1);
        }
      }
      return needed;
    },
    totalSalary () {
      return this.stronghold.staff.reduce((a, b) => {
        return a + Number(b.salary);
      }, 0) + this.stronghold.guards * 2 + this.stronghold.servants * 0.5 + this.stronghold.laborers * 0.5;
    },
    taxEfficiency () {
      let constablecount = 0;
      let guardcount = this.stronghold.guards;
      let taxEfficiency = 0;
      let steward = this.staffSummary.filter((a) => {
        return a.job.name === "Steward";
      })[0];
      let constablesoffice = this.improvements.filter((a) => {
        return a.id === "constables-office";
      })[0];
      let constables;
      if (constablesoffice) {
        constables = constablesoffice.staff.filter((a) => {
          return a.name === "Constable";
        })[0];
      }
      if (constables) constablecount = constables.cur;
      if (steward) {
        taxEfficiency = Math.min(1, (guardcount * 100 + constablecount * 500) / this.getPop);
      }
      return Math.round(taxEfficiency * 100) / 100;
    },
    propertyTax () {
      let privateEnterpriseValue = this.stronghold.privateEnterprise.reduce((total, imp) => {
        return total + imp.goldCost;
      }, 0);
      return Math.round(this.stronghold.laws.propertyTaxRate * privateEnterpriseValue * this.taxEfficiency) / 100;
    },
    headTax () {
      return Math.round(this.stronghold.laws.headTaxRate * this.getPop * this.taxEfficiency * 100) / 100;
    },
    incomeTax () {
      let publicEmployees = (this.stronghold.laws.incomeTaxRate / 100) * this.totalSalary * this.taxEfficiency;
      let privateIncomes = this.stronghold.privateEnterprise.reduce((total, imp) => {
        return total + imp.employs * 0.5;
      }, 0) + this.stronghold.privateEmployees.reduce((total, st) => {
        return total + st.typicalSalary;
      }, 0);
      let privateEmployees = (this.stronghold.laws.incomeTaxRate / 100) * privateIncomes * this.taxEfficiency;
      return Math.round((publicEmployees + privateEmployees) * 100) / 100;
    },
    taxRevenue () {
      return this.headTax + this.incomeTax + this.propertyTax;
    },
    bankRevenue () {
      let bank = this.stronghold.improvements.filter((a) => {
        return a.id === "merchant-bank";
      })[0];
      if (bank) {
        return Math.round((this.stronghold.treasury * 0.002 + this.taxRevenue * 0.1) * this.calcRevRatio(bank) * 100) / 100;
      }
      return 0;
    },
    improvementRevenue () {
      return this.stronghold.improvements.reduce((total, imp) => {
        return total + this.calculateIncome(imp);
      }, 0);
    },
    grossRevenue () {
      return Math.round((this.taxRevenue + this.bankRevenue + this.improvementRevenue + this.resourceRevenue) * 100) / 100;
    },
    resourceRevenue () {
      let resourceRevenue = 0;
      for (let key in this.stronghold.autoSell) {
        let amount = Number(this.stronghold.autoSell[key]);
        if (amount < 0) {
          resourceRevenue -= amount * this.sellTable[key];
        }
      }
      return Math.round(resourceRevenue * 100) / 100;
    },
    resourceCost () {
      let resourceRevenue = 0;
      for (let key in this.stronghold.autoSell) {
        let amount = Number(this.stronghold.autoSell[key]);
        if (amount > 0) {
          resourceRevenue += amount * this.buyTable[key];
        }
      }
      return Math.round(resourceRevenue * 100) / 100;
    },
    netRevenue () {
      return Math.round((this.grossRevenue - this.expenses) * 100) / 100;
    },
    expenses () {
      return Math.round((this.totalSalary + this.buildingMaintenance + this.resourceCost) * 100) / 100;
    },
    unemploymentRate () {
      return Math.round((1 - ((this.totalEmployees + this.totalPrivateEmployed) / (this.getPop * 0.7))) * 100);
    },
    totalEmployees () {
      return Number(this.stronghold.laborers) + this.stronghold.staff.length + Number(this.stronghold.guards) + Number(this.stronghold.servants);
    },
    staffBeds () {
      return this.stronghold.improvements.reduce((a, b) => {
        return a + b.staffpop * b.count;
      }, 0);
    },
    availableStaffBeds () {
      return this.staffBeds - (this.stronghold.staff.length + Number(this.stronghold.guards) + Number(this.stronghold.servants));
    },
    unrest () {
      let unrest = 0;
      if (this.getPop > 0) {
        // people hate head taxes
        if (Number(this.stronghold.laws.headTaxRate) > 0) {
          unrest += Number(this.stronghold.laws.headTaxRate) * 200;
        };
        // and hate high income taxes
        if (Number(this.stronghold.laws.incomeTaxRate) > 10) {
          unrest += Number(this.stronghold.laws.incomeTaxRate) - 10;
        }
        if (Number(this.stronghold.laws.propertyTaxRate) > 0.1) {
          unrest += (Number(this.stronghold.laws.propertyTaxRate) - 0.1) * 50;
        }
        // people want to work, very low unemployment reduces unrest, high unemployment increases unrest
        let unemploymentModifier = (this.unemploymentRate - 20) * 0.5;
        unrest += unemploymentModifier;
        let foodSubsidiesModifier = ((Number(this.stronghold.laws.foodSubsidies) / this.getPop)) * 50;
        unrest -= foodSubsidiesModifier;
      }
      return Math.round(unrest);
    },
    gameDate () {
      return this.stronghold.gameMonth + "/" + this.stronghold.gameDay + "/" + this.stronghold.gameYear;
    },
    buildingMaintenance () {
      return this.stronghold.improvements.reduce((a, b) => {
        let maintenanceFree = [ "new-land", "clear-land", "teleportation-circle", "temple", "chapel" ];
        if (maintenanceFree.includes(b.id)) {
          return a;
        }
        return a + b.goldCost * 0.0005;
      }, 0);
    },
    sanctuaryAnimals () {
      return this.stronghold.animals.filter((a) => {
        return a.livesat === "animal-sanctuary";
      }).sort();
    },
    stableAnimals () {
      return this.stronghold.animals.filter((a) => {
        return a.livesat === "stable";
      }).sort();
    },
    ayrieAnimals () {
      return this.stronghold.animals.filter((a) => {
        return a.livesat === "ayrie";
      }).sort();
    },
    exportLimit () {
      let road = this.stronghold.improvements.filter((a) => {
        if (a.id === "road") {
          return true;
        }
        return false;
      })[0];
      let harbor = this.stronghold.improvements.filter((a) => {
        if (a.id === "harbor") {
          return true;
        }
        return false;
      })[0];
      let base = this.stronghold.merchants.reduce((tot, mer) => {
        return tot + Number(mer.carryweight);
      }, 0);
      let exportLimit = base;
      if (road) {
        exportLimit += base;
      }
      if (harbor) {
        exportLimit += base * 2;
      }
      return exportLimit;
    },
    currentExportWeight () {
      // first subtract local consumption, we let it go negative because our population will import food if they have to.
      // general stores sell to the local populace, but don't directly import goods
      let generalstores = this.stronghold.improvements.filter((a) => {
        return a.id === 'general-store';
      })[0];
      let genstoresrev = { food: 0, alcohol: 0, cloth: 0, leather: 0, steel: 0 };
      if (generalstores) {
        genstoresrev = this.calculateRevenue(generalstores);
      }
      let food = Number(this.stronghold.autoSell.food) + Number(this.getPop) + genstoresrev.food;
      let alcohol = Number(this.stronghold.autoSell.alcohol) + Number(this.getPop) / 6 + genstoresrev.alcohol;
      let steel = Number(this.stronghold.autoSell.steel) + Number(this.getPop) / 20 + genstoresrev.steel;
      let cloth = Number(this.stronghold.autoSell.cloth) + Number(this.getPop) / 20 + genstoresrev.cloth;
      let leather = Number(this.stronghold.autoSell.leather) + Number(this.getPop) / 200 + genstoresrev.leather;
      let timber = Number(this.stronghold.autoSell.timber) + Number(this.getPop) / 3;
      let total = this.stronghold.laws.todaysExports + Math.abs(food);
      total += Math.abs(steel);
      total += Math.abs(Number(this.stronghold.autoSell.iron));
      total += Math.abs(alcohol);
      total += Math.abs(Number(this.stronghold.autoSell.coal));
      total += Math.abs(Number(this.stronghold.autoSell.arcanum));
      total += Math.abs(Number(this.stronghold.autoSell.wool));
      total += Math.abs(leather * 20);
      total += Math.abs(timber * 16);
      total += Math.abs(Number(this.stronghold.autoSell.lumber) * 16);
      total += Math.abs(cloth / 2);
      total += Math.abs(Number(this.stronghold.autoSell.stone) * 1000);
      return Math.round(total);
    }
  },
  data () {
    return {
      changeby: 0,
      buyTable: {
        alcohol: 0.3,
        arcanum: 750,
        cloth: 3,
        coal: 0.15,
        food: 0.15,
        iron: 0.45,
        leather: 60,
        lumber: 0.75,
        steel: 0.75,
        stone: 1.5,
        timber: 0.15,
        wool: 1.5
      },
      sellTable: {
        alcohol: 0.2,
        arcanum: 500,
        cloth: 2,
        coal: 0.1,
        food: 0.1,
        iron: 0.3,
        leather: 40,
        lumber: 0.5,
        steel: 0.5,
        stone: 1,
        timber: 0.1,
        wool: 1
      },
      resourceChange: {
        alcohol: 0,
        arcanum: 0,
        cloth: 0,
        coal: 0,
        food: 0,
        iron: 0,
        leather: 0,
        lumber: 0,
        steel: 0,
        stone: 0,
        timber: 0,
        wool: 0
      },
      unitWeightMod: {
        alcohol: 1,
        arcanum: 1,
        cloth: 0.5,
        coal: 1,
        food: 1,
        iron: 1,
        leather: 20,
        lumber: 16,
        steel: 1,
        stone: 1000,
        timber: 16,
        wool: 1
      },
      record: "",
      staffSort: "name",
      showAvailable: true,
      showTransactionRecord: false,
      addImprovementModal: false,
      newstaff: {
        name: "",
        job: { name: "", typicalSalary: 0, bonus: "", subtype: "" },
        salary: 0
      },
      newmodal: true,
      newanimal: { name: "", livesat: "stables", species: "", foodcost: 0 }
    };
  },
  methods: {
    ...mapActions({
      getImprovements: 'getAllImprovements',
      newStronghold: 'newStronghold',
      getStrongholds: 'getAllStrongholds',
      loadStronghold: 'loadStronghold',
      loadStrongholdById: 'loadStrongholdById',
      saveStronghold: 'saveStronghold',
      saveNewStronghold: 'saveNewStronghold',
      deleteStronghold: 'deleteStronghold'
    }),
    buyResource (type, amount) {
      let checkWeight = this.stronghold.laws.todaysExports + Number(amount) * this.unitWeightMod[type];
      this.stronghold.resources[type] += Number(amount);
      this.stronghold.laws.todaysExports = checkWeight;
      this.addToTreasury(-1 * Number(amount) * this.buyTable[type], "Purchase " + amount + " " + type);
    },
    sellResource (type, amount) {
      let checkWeight = this.stronghold.laws.todaysExports + Number(amount) * this.unitWeightMod[type];
      this.stronghold.resources[type] -= Number(amount);
      this.stronghold.laws.todaysExports = checkWeight;
      this.addToTreasury(Number(amount) * this.buyTable[type], "Sell " + amount + " " + type);
    },
    addStaff () {
      this.stronghold.staff.push({ id: Date.now(), ...this.newstaff, job: { ...this.newstaff.job } });
      this.newstaff = { name: "", job: { name: "", typicalSalary: 0, bonus: "" }, salary: 0 };
    },
    newDay () {
      // reduce food subsidies if necessary
      if (this.stronghold.laws.foodSubsidies > this.stronghold.resources.food) {
        this.stronghold.laws.foodSubsidies = this.stronghold.resources.food;
      }
      // increment exports down
      this.stronghold.laws.todaysExports -= this.exportLimit;
      if (this.stronghold.laws.todaysExports < 0) {
        this.stronghold.laws.todaysExports = 0;
      }
      // change autosell values
      let remExportCap = this.exportLimit - this.stronghold.laws.todaysExports;
      for (let key in this.stronghold.autoSell) {
        let amount = Number(this.stronghold.autoSell[key]);
        if (-amount > this.stronghold.resources[key]) {
          this.stronghold.autoSell[key] = -this.stronghold.resources[key];
        }
        if (Math.abs(amount) * this.unitWeightMod[key] + remExportCap >= this.exportLimit && amount !== 0) {
          let unitweight = remExportCap / (Math.abs(amount) * this.unitWeightMod[key]);
          this.stronghold.autoSell[key] *= unitweight;
        }
      }
      // gold revenue
      this.addToTreasury(this.netRevenue, "daily net revenue");
      // resource revenue
      let rev = this.calcTotalRevenue;
      for (let key in this.stronghold.resources) {
        this.stronghold.resources[key] += Number(rev[key]);
      }
      // increment the date
      this.stronghold.gameDay += 1;
      if (this.stronghold.gameDay > 30) {
        this.stronghold.gameDay = 1;
        this.stronghold.gameMonth += 1;
      }
      if (this.stronghold.gameMonth > 12) {
        this.stronghold.gameMonth = 1;
        this.stronghold.gameYear += 1;
      }
      let finished = [];
      // increment items under construction
      this.stronghold.construction.forEach((imp) => {
        imp.buildtime -= 1;
        if (imp.buildtime <= 0) {
          finished.push(imp);
          this.addImprovement(imp);
        }
      });
      // clear finished projects
      finished.forEach((a) => {
        this.stronghold.construction.splice(this.stronghold.construction.indexOf(a), 1);
      });
    },
    addAnimal () {
      this.stronghold.animals.push({ id: Date.now() + Math.random(), ...this.newanimal });
      this.newanimal = { name: "", livesat: "stables", species: "", foodcost: 0 };
    },
    removeAnimal (animal) {
      this.stronghold.animals.splice(this.stronghold.animals.indexOf(animal), 1);
    },
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
    },
    addResource (res, amount) {
      this.stronghold.resources[res] += Number(amount);
    },
    fireStaff (staff) {
      this.stronghold.staff.splice(this.stronghold.staff.indexOf(staff), 1);
    },
    addToTreasury (changeby, record) {
      this.stronghold.treasury += Number(changeby);
      this.stronghold.transactionrecord.push({ id: Date.now() + changeby + record, amount: changeby, description: record, balance: this.stronghold.treasury, date: this.gameDate });
      this.changeby = 0;
      this.record = "";
      var x = Math.round(this.stronghold.treasury * 100);
      this.stronghold.treasury = x / 100;
    },
    addMerchant () {
      this.stronghold.merchants.push({
        id: Date.now() + Math.random(),
        name: "",
        carryweight: 0
      });
    },
    deleteMerchant (merchant) {
      this.stronghold.merchants.splice(this.stronghold.merchants.indexOf(merchant), 1);
    }
  },
  created () {
    this.getImprovements();
    this.getStrongholds();
  }
};
