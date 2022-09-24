import axios from 'axios';
import staffTypes from './stronghold/stafftypes';
import Stronghold from './classes/stronghold';
import constants from './stronghold/constants';
import Decimal from 'decimal.js';
import { mapStores } from 'pinia';
import { useUserStore } from './index.js';

export default {
  state () {
    return {
      improvements: [],
      strongholds: [],
      current: Stronghold(),
      staffTypes: staffTypes,
      changeby: 0,
      user: mapStores(useUserStore),
      record: "",
      ...constants
    };
  },
  getters: {
    availableClearedLand () {
      let land = this.current.improvements.filter((a) => {
        return a.id === "clear-land";
      })[0];
      if (land) return land.count - this.farmLand;
      return 0;
    },
    availableForestedLand () {
      return this.forestedLand - this.timberLand;
    },
    availableLaborers () {
      return Number(this.current.laborers) - this.current.improvements.reduce((total, imp) => {
        return total + Number(imp.laborers);
      }, 0) - this.current.construction.reduce((total, imp) => {
        if (imp.laborersassigned) {
          return total + Number(imp.laborersassigned);
        } else {
          return total;
        }
      }, 0);
    },
    availableOfType () { (type) => {
      let total = 0;
      if (type === "Guard") {
        total = Number(this.current.guards);
      } else if (type === "Servant") {
        total = Number(this.current.servants);
      } else {
        let match = this.staffSummary.filter((a) => {
          if (type.includes('(')) {
            return a.job.name + ' (' + a.job.subtype + ')' === type;
          } else {
            return a.job.name === type;
          }
        }).reduce((a, b) => {
          return a + b.count;
        }, 0);
        return match;
      }
      let assigned = this.current.improvements.reduce((total, imp) => {
        let match = imp.staff.filter((st) => {
          return st.name === type;
        })[0];
        if (match) {
          return total + Number(match.cur);
        } else {
          return total;
        }
      }, 0);
      return Number(total) - Number(assigned);
    }},
    availableStaffBeds () {
      return this.staffBeds - (this.current.staff.length + this.current.privateEmployees.length);
    },
    bankRevenue () {
      let bank = this.current.improvements.filter((a) => {
        return a.id === "merchant-bank";
      })[0];
      if (bank) {
        return Math.round((this.current.treasury * 0.002 + this.taxRevenue * 0.1) * this.calcRevRatio(bank) * 100) / 100;
      }
      return 0;
    },
    buildingMaintenance () {
      return this.current.improvements.reduce((a, b) => {
        let maintenanceFree = [ "new-land", "clear-land", "teleportation-circle", "temple", "chapel" ];
        if (maintenanceFree.includes(b.id)) {
          return a;
        }
        return a + b.goldCost * 0.0005;
      }, 0);
    },
    calcRevRatio () { return (improvement) => {
      let numerator = 0;
      let denominator = 0;
      let staffratio = 1;
      if (improvement.staff.length > 0 || improvement.employs > 0) {
        numerator += Number(improvement.laborers);
        denominator += improvement.employs * improvement.count;
        improvement.staff.forEach((a) => {
          let match = this.current.staff.filter((b) => {
            if (!b.job.subtype && a.name === b.job.name) {
              return true;
            } else if (a.name === b.job.name + " (" + b.job.subtype + ")") {
              return true;
            }
            return false;
          })[0];
          if (a.num > 0) {
            numerator += Number(a.cur) * 5;
            denominator += a.num * 5 * improvement.count;
          } else if (match) {
            numerator += 5;
            denominator += 5;
          } else {
            denominator += 5;
          }
        });
        staffratio = numerator / denominator;
      }
      let ops = 0;
      if (improvement.operating) {
        ops = 1;
      }
      return Math.round(Math.min(staffratio, ops) * 100) / 100;
    }},
    calcConstructionRevenue () {
      let resourcecosts = { alcohol: 0, arcanum: 0, brick: 0, clay: 0, cloth: 0, coal: 0, coffee: 0, consumergoods: 0, cotton: 0, food: 0, furniture: 0, horses: 0, iron: 0, leather: 0, lumber: 0, paper: 0, pottery: 0, raremetal: 0, steel: 0, stone: 0, sugar: 0, timber: 0, wool: 0 };
      this.current.construction.forEach((imp) => {
        if (!imp.laborersassigned) {
          imp.laborersassigned = 0;
        }
        let amountconstructed = Decimal(imp.laborersassigned);
        let percentdone = amountconstructed.div(imp.buildtime);
        if (!imp.private && !imp.dmGift) {
          for (var key in imp.resourceCost) {
            resourcecosts[key] += percentdone.mul(imp.resourceCost[key]);
          }
        }
      });
      return resourcecosts;
    },
    calcGrossRevenue () {
      let rev = this.current.improvements.reduce((total, imp) => {
        let rev = this.calculateRevenue(imp);
        for (let key in total) {
          total[key] += rev[key];
        }
        return total;
      }, { alcohol: 0, arcanum: 0, brick: 0, clay: 0, cloth: 0, coal: 0, coffee: 0, consumergoods: 0, cotton: 0, food: 0, furniture: 0, horses: 0, iron: 0, leather: 0, lumber: 0, paper: 0, pottery: 0, raremetal: 0, steel: 0, stone: 0, sugar: 0, timber: 0, wool: 0 });
      let constrev = this.calcConstructionRevenue;
      for (let key in rev) {
        rev[key] -= constrev[key];
      }
      return rev;
    },
    calcTotalRevenue () {
      let rev = { ...this.calcGrossRevenue };
      for (let key in rev) {
        rev[key] = Math.round((rev[key] + Number(this.current.autoSell[key])) * 100) / 100;
      }
      rev['food'] -= this.current.laws.foodSubsidies;
      rev['food'] -= this.current.animals.reduce((b, a) => {
        if (a.livesat === "homeless") {
          return b + a.foodcost * 2;
        } else {
          return b + a.foodcost;
        }
      }, 0);
      return rev;
    },
    calculateIncome () { return (improvement) => {
      return Math.round(this.calcRevRatio(improvement) * improvement.income * improvement.count * 100) / 100;
    }},
    calculateRevenue () { return (improvement) => {
      let revenue = {};
      for (let res in improvement.revenue) {
        revenue[res] = Math.round(improvement.revenue[res] * this.calcRevRatio(improvement) * improvement.count * 100) / 100;
        let naturecleric = this.current.staff.filter((a) => {
          return a.job.subtype === 'Nature';
        })[0];
        if (naturecleric && (improvement.id === 'food-farm' || improvement.id === "winery")) {
          revenue[res] *= 1.25;
        }
        let earthcleric = this.current.staff.filter((a) => {
          return a.job.subtype === "Earth";
        })[0];
        if (earthcleric && (improvement.id === 'coal-mine' || improvement.id === 'iron-mine' || improvement.id === 'quarry')) {
          revenue[res] *= 1.25;
        }
      }
      return revenue;
    }},
    expenses () {
      return Math.round((this.totalSalary + this.buildingMaintenance + this.resourceCost) * 100) / 100;
    },
    farmLand () {
      let land = 0;
      this.current.improvements.forEach((a) => {
        if (a.isfarm) {
          land++;
        }
      });
      this.current.privateEnterprise.forEach((a) => {
        if (a.isfarm) {
          land++;
        }
      });
      return land;
    },
    forestedLand () {
      return this.totalLand - (this.availableClearedLand + this.farmLand + this.urbanLand);
    },
    gameDate () {
      return this.current.gameMonth + "/" + this.current.gameDay + "/" + this.current.gameYear;
    },
    getPop () {
      let pop = Number(this.current.population.adults) + Number(this.current.population.children) + Number(this.current.population.invalid) + this.current.staff.length;
      return pop;
    },
    getEmployable () {
      return this.current.population.adults;
    },
    getChildren () {
      return this.current.population.children;
    },
    getInvalid () {
      return this.current.population.invalid;
    },
    getPopNeeds () {
      let popNeeds = {};
      for (let key in this.popNeedsMultCommon) {
        popNeeds[key] = this.popNeedsMultCommon[key] * this.nonstaffPop;
        this.current.staff.forEach((staff) => {
          if (staff.salary > 10) {
            popNeeds[key] += this.popNeedsMultUpper[key];
          } else {
            popNeeds[key] += this.popNeedsMultMiddle[key];
          }
        });
      }
      for (let key in popNeeds) {
        popNeeds[key] = Math.round(popNeeds[key] * 100) / 100;
      }
      return popNeeds;
    },
    getPrivateProduction () {
      let produced = this.current.privateEnterprise.reduce((b, a) => {
        for (let key in a.revenue) {
          if (b[key]) {
            b[key] += a.revenue[key];
          } else {
            b[key] = a.revenue[key];
          }
        }
        return b;
      }, {});
      for (let key in produced) {
        produced[key] = Math.round(produced[key] * 100) / 100;
      }
      return produced;
    },
    getBuyTable () { return this.buyTable },
    getSellTable () { return this.sellTable },
    grossRevenue () {
      return Math.round((this.taxRevenue + this.bankRevenue + this.improvementRevenue + this.resourceRevenue) * 100) / 100;
    },
    guardsNeeded () {
      return this.current.improvements.reduce((a, b) => {
        b.staff.forEach((st) => {
          if (st.name === "Guard") {
            a += st.num * b.count;
          }
        });
        return a;
      }, 0);
    },
    headTax () {
      return Math.round(this.current.laws.headTaxRate * this.getPop * this.taxEfficiency * 100) / 100;
    },
    improvementRevenue () {
      return this.current.improvements.reduce((total, imp) => {
        return total + this.calculateIncome(imp);
      }, 0);
    },
    incomeTax () {
      let publicEmployees = (this.current.laws.incomeTaxRate / 100) * this.totalSalary * this.taxEfficiency;
      let privateIncomes = this.current.privateEnterprise.reduce((total, imp) => {
        return total + imp.employs * 0.5;
      }, 0) + this.current.privateEmployees.reduce((total, st) => {
        return total + st.typicalSalary;
      }, 0);
      let privateEmployees = (this.current.laws.incomeTaxRate / 100) * privateIncomes * this.taxEfficiency;
      return Math.round((publicEmployees + privateEmployees) * 100) / 100;
    },
    rents () {
      let rentRate = Number(this.current.laws.rentRate);
      let publicHousing = this.current.improvements.reduce((total, imp) => {
        return total + Math.floor(imp.pop * imp.count);
      }, 0);
      let numberRenting = this.getPop - this.current.privateEnterprise.reduce((total, imp) => {
        return total + Math.floor(imp.pop * imp.count);
      }, 0);
      if (rentRate) {
        return rentRate * 5 * (this.staffBeds - this.availableStaffBeds) + rentRate * Math.min(publicHousing, numberRenting) - (this.current.laws.conscription ? this.current.guards * 5 * rentRate : 0) + (this.current.laws.conscription ? this.current.guard * rentRate : 0);
      } else {
        this.current.laws.rentRate = 0;
        return 0;
      }
    },
    laborersNeeded () {
      return this.current.improvements.reduce((a, b) => {
        return a + b.employs * b.count;
      }, 0);
    },
    maxLaborers () {
      return this.current.population.adults - (this.privateLaborers + Number(this.current.servants) + Number(this.current.guards));
    },
    totalHousing () {
      return this.current.improvements.reduce((total, imp) => {
        return total + Math.floor(imp.pop * imp.count);
      }, 0) + this.current.privateEnterprise.reduce((total, imp) => {
        return total + Math.floor(imp.pop * imp.count);
      }, 0);
    },
    neededStaff () {
      return this.current.improvements.reduce((a, b) => {
        b.staff.forEach((st) => {
          let match = a.filter((stm) => {
            return stm.name === st.name;
          })[0];
          if (match) {
            match.num += st.num * b.count;
          } else {
            a.push({ ...st, id: Date.now(), num: st.num * b.count });
          }
        });
        return a;
      }, []);
    },
    netRevenue () {
      return Math.round((this.grossRevenue - this.expenses) * 100) / 100;
    },
    privateLaborers () {
      return this.current.privateEnterprise.reduce((total, imp) => {
        return total + imp.employs * imp.count;
      }, 0);
    },
    propertyTax () {
      let privateEnterpriseValue = this.current.privateEnterprise.reduce((total, imp) => {
        return total + imp.goldCost;
      }, 0);
      return Math.round(this.current.laws.propertyTaxRate * privateEnterpriseValue * this.taxEfficiency) / 10;
    },
    resourceCost () {
      let resourceRevenue = 0;
      for (let key in this.current.autoSell) {
        let amount = Number(this.current.autoSell[key]);
        if (amount > 0) {
          resourceRevenue += amount * this.buyTable[key];
        }
      }
      let totalRevenue = this.calcTotalRevenue;
      let virtualState = {};
      for (let key in this.current.resources) {
        virtualState[key] = this.current.resources[key];
      }
      for (let key in virtualState) {
        virtualState[key] += totalRevenue[key];
        if (virtualState[key] < 0) {
          resourceRevenue -= virtualState[key] * this.buyTable[key];
        }
      }
      return Math.round(resourceRevenue * 100) / 100;
    },
    resourceRevenue () {
      let resourceRevenue = 0;
      for (let key in this.current.autoSell) {
        let amount = Number(this.current.autoSell[key]);
        if (amount < 0) {
          resourceRevenue -= amount * this.sellTable[key];
        }
      }
      return Math.round(resourceRevenue * 100) / 100;
    },
    servantsNeeded () {
      return this.current.improvements.reduce((a, b) => {
        b.staff.forEach((st) => {
          if (st.name === "Servant") {
            a += st.num * b.count;
          }
        });
        return a;
      }, 0);
    },
    staffBeds () {
      return this.current.improvements.reduce((a, b) => {
        return a + b.staffpop * b.count;
      }, 0) + this.current.privateEnterprise.reduce((total, imp) => {
        return total + imp.staffpop * imp.count;
      }, 0);
    },
    staffSummary () {
      return this.current.staff.reduce((a, b) => {
        let needmatch = this.neededStaff.filter((st) => {
          if (!st.name.includes("(")) {
            return b.job.name === st.name;
          } else {
            return b.job.name + " (" + b.job.subtype + ")" === st.name;
          }
        })[0];
        let match = a.filter((st) => {
          if (!b.job.subtype) {
            return b.job.name === st.job.name;
          } else {
            return b.job.name === st.job.name && b.job.subtype === st.job.subtype;
          }
        })[0];
        if (!needmatch) {
          needmatch = { num: 0 };
        } else if (needmatch.num === 0) {
          needmatch.num = 1;
        }
        if (match) {
          match.count++;
        } else {
          a.push({ job: b.job, count: 1, needed: needmatch.num });
        }
        return a;
      }, []).sort((a, b) => {
        if (a.job.name > b.job.name) {
          return 1;
        } else {
          return -1;
        }
      });
    },
    stronghold () { return this.current },
    taxEfficiency () {
      let constablecount = 0;
      let guardcount = this.current.guards;
      let taxEfficiency = 0;
      let steward = this.staffSummary.filter((a) => {
        return a.job.name === "Steward";
      })[0];
      let constablesoffice = this.current.improvements.filter((a) => {
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
    taxRevenue () {
      return this.headTax + this.incomeTax + this.propertyTax + this.rents + this.vassalTax;
    },
    timberLand () {
      let land = 0;
      let lumbercamps = this.current.improvements.filter((a) => {
        return a.id === "lumber-camp";
      })[0];
      let plumbercamps = this.current.privateEnterprise.filter((a) => {
        return a.id === "lumber-camp";
      })[0];
      if (lumbercamps) land += lumbercamps.count;
      if (plumbercamps) land += plumbercamps.count;
      return land;
    },
    totalEmployees () {
      return Number(this.current.laborers) + this.current.staff.length + Number(this.current.guards) + Number(this.current.servants);
    },
    totalLand () {
      let land = this.current.improvements.filter((a) => {
        return a.id === "new-land";
      })[0];
      if (land) return land.count;
      return 0;
    },
    totalPrivateEmployed () {
      return this.privateLaborers + this.current.privateEmployees.length;
    },
    totalSalary () {
      return this.current.staff.reduce((a, b) => {
        return a + Number(b.salary);
      }, 0) + (this.current.laws.conscription ? this.current.guards * 0.5 : this.current.guards * 2) + this.current.servants * 0.5 + this.current.laborers * 0.5;
    },
    totalStorage () {
      return this.current.improvements.reduce((tot, imp) => {
        return tot + imp.storage * imp.count;
      }, 0);
    },
    employablePeople () {
      return Number(this.current.population.adults) + this.current.staff.length + Number(this.current.guards) + Number(this.current.servants) + Number(this.current.privateEmployees.length);
    },
    unemploymentRate () {
      return Math.max(this.current.population.adults ? Math.round((1 - ((this.totalEmployees + this.totalPrivateEmployed) / this.employablePeople)) * 100) : 0, 0);
    },
    unitWeightMod () { return 1 },
    unmetStaffNeed () {
      let needed = [];
      this.neededStaff.forEach((a) => {
        needed.push({ ...a });
      });
      this.current.staff.forEach((st) => {
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
        guards.num -= this.current.guards;
        if (guards.num <= 0) {
          needed.splice(needed.indexOf(guards), 1);
        }
      }
      let servants = needed.filter((a) => { return a.name === "Servant"; })[0];
      if (servants) {
        servants.num -= this.current.servants;
        if (servants.num <= 0) {
          needed.splice(needed.indexOf(servants), 1);
        }
      }
      return needed;
    },
    unrest () {
      let unrest = 0;
      if (this.getPop > 0) {
        // people hate head taxes
        if (Number(this.current.laws.headTaxRate) > 0) {
          unrest += Number(this.current.laws.headTaxRate) * 200;
        };
        // and hate high income taxes
        if (Number(this.current.laws.incomeTaxRate) > 10) {
          unrest += Number(this.current.laws.incomeTaxRate) - 10;
        }
        // rent is despised
        unrest += Number(this.current.laws.rentRate) * 100;
        if (Number(this.current.laws.propertyTaxRate) > 0.1) {
          unrest += (Number(this.current.laws.propertyTaxRate) - 0.1) * 50;
        }
        // people want to work, very low unemployment reduces unrest, high unemployment increases unrest
        let unemploymentModifier = (this.unemploymentRate) * 0.5;
        unrest += unemploymentModifier;
        let foodSubsidiesModifier = this.getPop ? ((Number(this.current.laws.foodSubsidies) / this.getPop)) * 50 : 0;
        unrest -= foodSubsidiesModifier;
        // people want a place to live. If there isn't enough housing, unrest increases
        let housingModifier = this.nonstaffPop ? Math.max(((this.nonstaffPop - this.totalHousing) / this.nonstaffPop) * 100, 0) : 0;
        unrest += housingModifier;
        if (this.current.laws.conscription) {
          let percentguards = Math.round((this.current.guards / this.getPop) * 100);
          unrest += percentguards;
        }
      }
      return Math.max(Math.round(unrest), 0);
    },
    nonstaffPop () {
      return this.getPop - (this.current.staff.length);
    },
    urbanLand () {
      let land = 0;
      let village = this.current.improvements.filter((a) => {
        return a.id === "village";
      })[0];
      if (village) land += (village.count * 0.25);
      let town = this.current.improvements.filter((a) => {
        return a.id === "town";
      })[0];
      if (town) land += (town.count * 1.25);
      let districts = this.current.improvements.filter((a) => {
        return a.id === "additional-district";
      })[0];
      let otherurbanland = this.current.improvements.reduce((tot, a) => {
        if (a.id === 'house' || a.id === 'staff-house') {
          return tot + 0.01 * a.count;
        } else if (a.id === 'manor-house') {
          return tot + 0.05 * a.count;
        } else if (a.type === 'town') {
          return tot + 0.02 * a.count;
        }
        return tot;
      }, 0);
      land += otherurbanland;
      if (districts) land += (districts.count * 1.25);
      return Math.round(land * 100) / 100;
    },
    usedStorage () {
      return Object.values(this.current.resources).reduce((a, b) => {
        return a + b;
      }, 0);
    },
    vassalTax () {
      let taxcollector = this.current.staff.find((a) => {
        if (a.job.name === "Tax Collector") {
          return true;
        }
      });
      if (taxcollector && Array.isArray(this.current.vassals)) {
        let totalvassalincome = this.current.vassals.reduce((a, b) => {
          return b + Number(a.income);
        }, 0);
        return totalvassalincome * (Number(this.current.laws.vassalTaxRate) / 100);
      } else {
        return 0;
      }
    },
    vassalUnrest () {
      return 0;
    }
  },
  actions: {
    getAllImprovements () {
      return axios.get('/json/improvements.json').then((response) => {
        this.improvements = response.data.documents;
        return true;
      });
    },
    newStronghold () {
      this.current = new Stronghold();
    },
    getAllStrongholds () {
      return axios.get('/strongholds').then((res) => {
        this.strongholds = res.data;
        return true;
      });
    },
    saveNewStronghold () {
      axios.post('/strongholds?token=' + this.user.getUserInfo.token, { stronghold: { ...this.current, _id: undefined } }).then((res) => {
        this.current = { ...res.data };
        this.strongholds.push(res.data);
        return true;
      });
    },
    loadStronghold (stronghold) {
      this.current = { ...stronghold };
    },
    loadStrongholdById ({ id }) {
      this.current = { ...this.all.filter((a) => {
        return a._id === id;
      })[0] };
    },
    saveStronghold () {
      let check = window.confirm("Are you sure you want to save your changes to " + this.current.castleName + "?");
      if (check) {
        axios.post('/strongholds/' + this.current._id + "?token=" + this.user.getUserInfo.token, { stronghold: this.current }).then((res) => {
          this.strongholds.splice(this.strongholds.indexOf(this.current), 1);
          this.current = { ...res.data };
          this.strongholds.push(res.data);
          return true;
        });
      }
    },
    addToTreasury ({ changeby, record }) {
      this.current.treasury += Number(changeby);
      this.current.transactionrecord.push({ id: Date.now() + changeby + record, amount: changeby, description: record, balance: this.current.treasury, date: this.gameDate });
      this.changeby = 0;
      this.record = "";
      var x = Math.round(this.current.treasury * 100);
      this.current.treasury = x / 100;
    },
    deleteStronghold: ({ stronghold }) => {
      let check = window.confirm("Are you sure you want to delete " + stronghold.castleName);
      if (check) {
        axios.delete('/strongholds/' + stronghold._id + "?token=" + this.user.getUserInfo.token).then(() => {
          this.strongholds.splice(this.strongholds.indexOf(stronghold));
          return true;
        }).catch(() => {
          alert("failed to delete stronghold");
          return false;
        });
      }
    },
    addImprovement (improvement) {
      var match = this.current.improvements.filter((a) => {
        return a.id === improvement.id;
      })[0];
      if (improvement.private) {
        match = this.current.privateEnterprise.filter((a) => {
          return a.id === improvement.id;
        })[0];
        if (match) {
          match.count++;
        } else {
          improvement.count++;
          this.current.privateEnterprise.push(improvement);
        }
        improvement.staff.forEach((st) => {
          let match = this.staffTypes.filter((a) => {
            return a.name === st.name;
          })[0];
          if (match && st.num > 0) {
            for (var x = 0; x < st.num; x++) {
              this.current.privateEmployees.push({ id: Date.now() + Math.random(), ...match });
            }
          } else if (match) {
            this.current.privateEmployees.push({ id: Date.now() + Math.random(), ...match });
          }
        });
      } else {
        if (match) {
          match.count++;
        } else {
          improvement.count++;
          this.current.improvements.push(improvement);
        }
      }
    },
    buyResource ({ type, amount }) {
      let checkWeight = this.current.laws.todaysExports + Number(amount) * this.unitWeightMod[type];
      this.current.resources[type] += Number(amount);
      this.current.laws.todaysExports = checkWeight;
      this.addToTreasury({ changeby: -1 * Number(amount) * this.buyTable[type], record: "Purchase " + amount + " " + type });
    }
  }
};