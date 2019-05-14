export default {
  changeby: state => state.changeby,
  record: state => state.record,
  allImprovements: state => state.all,
  availableClearedLand: (state, getters) => {
    let land = state.current.improvements.filter((a) => {
      return a.id === "clear-land";
    })[0];
    if (land) return land.count - getters.farmLand;
    return 0;
  },
  availableForestedLand: (state, getters) => {
    return getters.forestedLand - getters.timberLand;
  },
  availableLaborers: (state) => {
    return Number(state.current.laborers) - state.current.improvements.reduce((total, imp) => {
      return total + Number(imp.laborers);
    }, 0);
  },
  availableOfType: (state, getters) => (type) => {
    let total = 0;
    if (type === "Guard") {
      total = Number(state.current.guards);
    } else if (type === "Servant") {
      total = Number(state.current.servants);
    } else {
      let match = getters.staffSummary.filter((a) => {
        if (type.includes('(')) {
          return a.job.name + ' (' + a.job.subtype + ')' === type;
        } else {
          return a.job.name === type;
        }
      })[0];
      if (match) {
        total = Number(match.count);
      }
    }
    let assigned = state.current.improvements.reduce((total, imp) => {
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
  },
  availableStaffBeds: (state, getters) => {
    return getters.staffBeds - (state.current.staff.length + Number(state.current.guards) + Number(state.current.servants));
  },
  bankRevenue: (state, getters) => {
    let bank = state.current.improvements.filter((a) => {
      return a.id === "merchant-bank";
    })[0];
    if (bank) {
      return Math.round((state.current.treasury * 0.002 + getters.taxRevenue * 0.1) * getters.calcRevRatio(bank) * 100) / 100;
    }
    return 0;
  },
  buildingMaintenance: (state) => {
    return state.current.improvements.reduce((a, b) => {
      let maintenanceFree = [ "new-land", "clear-land", "teleportation-circle", "temple", "chapel" ];
      if (maintenanceFree.includes(b.id)) {
        return a;
      }
      return a + b.goldCost * 0.0005;
    }, 0);
  },
  calcRevRatio: (state) => (improvement) => {
    let numerator = 0;
    let denominator = 0;
    let staffratio = 1;
    let resourceratios = {
      "alcohol": 1,
      "arcanum": 1,
      "cloth": 1,
      "coal": 1,
      "food": 1,
      "iron": 1,
      "leather": 1,
      "lumber": 1,
      "steel": 1,
      "stone": 1,
      "timber": 1,
      "wool": 1
    };
    if (improvement.staff.length > 0 || improvement.employs > 0) {
      numerator += Number(improvement.laborers);
      denominator += improvement.employs * improvement.count;
      improvement.staff.forEach((a) => {
        let match = state.current.staff.filter((b) => {
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
    for (let res in improvement.revenue) {
      if (improvement.revenue[res] !== 0 && state.current.resources[res] + improvement.revenue[res] * improvement.count < 0) {
        resourceratios[res] = -state.current.resources[res] / improvement.revenue[res] * improvement.count;
      }
    }
    let ops = 0;
    if (improvement.operating) {
      ops = 1;
    }
    return Math.round(Math.min(
      resourceratios.alcohol,
      resourceratios.arcanum,
      resourceratios.cloth,
      resourceratios.coal,
      resourceratios.food,
      resourceratios.iron,
      resourceratios.leather,
      resourceratios.lumber,
      resourceratios.steel,
      resourceratios.stone,
      resourceratios.timber,
      resourceratios.wool,
      staffratio,
      ops
    ) * 100) / 100;
  },
  calcTotalRevenue: (state, getters) => {
    let rev = state.current.improvements.reduce((total, imp) => {
      let rev = getters.calculateRevenue(imp);
      for (let key in total) {
        total[key] += rev[key];
      }
      return total;
    }, { alcohol: 0, arcanum: 0, cloth: 0, coal: 0, food: 0, iron: 0, leather: 0, lumber: 0, steel: 0, stone: 0, timber: 0, wool: 0 });
    for (let key in rev) {
      rev[key] = Math.round((rev[key] + Number(state.current.autoSell[key])) * 100) / 100;
    }
    rev['food'] -= state.current.laws.foodSubsidies;
    return rev;
  },
  calculateIncome: (state, getters) => (improvement) => {
    return Math.round(getters.calcRevRatio(improvement) * improvement.income * improvement.count * 100) / 100;
  },
  calculateRevenue: (state, getters) => (improvement) => {
    let revenue = {};
    for (let res in improvement.revenue) {
      revenue[res] = Math.round(improvement.revenue[res] * getters.calcRevRatio(improvement) * improvement.count * 100) / 100;
      let naturecleric = state.current.staff.filter((a) => {
        return a.job.subtype === 'Nature';
      })[0];
      if (naturecleric && (improvement.id === 'food-farm' || improvement.id === 'sheep-farm' || improvement.id === "cattle-farm" || improvement.id === "winery")) {
        revenue[res] *= 2;
      }
      let earthcleric = state.current.staff.filter((a) => {
        return a.job.subtype === "Earth";
      })[0];
      if (earthcleric && (improvement.id === 'coal-mine' || improvement.id === 'iron-mine' || improvement.id === 'quarry')) {
        revenue[res] *= 2;
      }
    }
    return revenue;
  },
  expenses: (state, getters) => {
    return Math.round((getters.totalSalary + getters.buildingMaintenance + getters.resourceCost) * 100) / 100;
  },
  exportLimit: (state, getters) => {
    let road = state.current.improvements.filter((a) => {
      if (a.id === "road") {
        return true;
      }
      return false;
    })[0];
    let harbor = state.current.improvements.filter((a) => {
      if (a.id === "harbor") {
        return true;
      }
      return false;
    })[0];
    let base = state.current.merchants.reduce((tot, mer) => {
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
  farmLand: (state) => {
    let land = 0;
    let foodfarms = state.current.improvements.filter((a) => {
      return a.id === "food-farm";
    })[0];
    let cashfarms = state.current.improvements.filter((a) => {
      return a.id === "sheep-farm";
    })[0];
    let cowfarms = state.current.improvements.filter((a) => {
      return a.id === "cattle-farm";
    })[0];
    let winefarms = state.current.improvements.filter((a) => {
      return a.id === "winery";
    })[0];
    let pfoodfarms = state.current.privateEnterprise.filter((a) => {
      return a.id === "food-farm";
    })[0];
    let pcashfarms = state.current.privateEnterprise.filter((a) => {
      return a.id === "sheep-farm";
    })[0];
    let pcowfarms = state.current.privateEnterprise.filter((a) => {
      return a.id === "cattle-farm";
    })[0];
    let pwinefarms = state.current.privateEnterprise.filter((a) => {
      return a.id === "winery";
    })[0];
    if (foodfarms) land += foodfarms.count;
    if (cashfarms) land += cashfarms.count;
    if (cowfarms) land += cowfarms.count;
    if (winefarms) land += winefarms.count;
    if (pfoodfarms) land += pfoodfarms.count;
    if (pcashfarms) land += pcashfarms.count;
    if (pcowfarms) land += pcowfarms.count;
    if (pwinefarms) land += pwinefarms.count;
    return land;
  },
  forestedLand: (state, getters) => {
    return getters.totalLand - (getters.availableClearedLand + getters.farmLand + getters.urbanLand);
  },
  gameDate: (state) => {
    return state.current.gameMonth + "/" + state.current.gameDay + "/" + state.current.gameYear;
  },
  getPop: (state) => {
    let pop = state.current.improvements.reduce((a, b) => {
      return a + b.pop * b.count;
    }, 0) + state.current.staff.length + state.current.privateEmployees.length;
    return pop;
  },
  getBuyTable: state => state.buyTable,
  getSellTable: state => state.sellTable,
  grossRevenue: (state, getters) => {
    return Math.round((getters.taxRevenue + getters.bankRevenue + getters.improvementRevenue + getters.resourceRevenue) * 100) / 100;
  },
  guardsNeeded (state) {
    return state.current.improvements.reduce((a, b) => {
      b.staff.forEach((st) => {
        if (st.name === "Guard") {
          a += st.num * b.count;
        }
      });
      return a;
    }, 0);
  },
  headTax: (state, getters) => {
    return Math.round(state.current.laws.headTaxRate * getters.getPop * getters.taxEfficiency * 100) / 100;
  },
  improvementRevenue: (state, getters) => {
    return state.current.improvements.reduce((total, imp) => {
      return total + getters.calculateIncome(imp);
    }, 0);
  },
  incomeTax: (state, getters) => {
    let publicEmployees = (state.current.laws.incomeTaxRate / 100) * getters.totalSalary * getters.taxEfficiency;
    let privateIncomes = state.current.privateEnterprise.reduce((total, imp) => {
      return total + imp.employs * 0.5;
    }, 0) + state.current.privateEmployees.reduce((total, st) => {
      return total + st.typicalSalary;
    }, 0);
    let privateEmployees = (state.current.laws.incomeTaxRate / 100) * privateIncomes * getters.taxEfficiency;
    return Math.round((publicEmployees + privateEmployees) * 100) / 100;
  },
  laborersNeeded (state) {
    return state.current.improvements.reduce((a, b) => {
      return a + b.employs * b.count;
    }, 0);
  },
  maxLaborers: (state, getters) => {
    return state.current.improvements.reduce((total, imp) => {
      return total + Math.floor(imp.pop * imp.count * 0.7);
    }, 0) + state.current.privateEnterprise.reduce((total, imp) => {
      return total + Math.floor(imp.pop * imp.count * 0.7);
    }, 0) - getters.privateLaborers;
  },
  neededStaff: (state) => {
    return state.current.improvements.reduce((a, b) => {
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
  netRevenue: (state, getters) => {
    return Math.round((getters.grossRevenue - getters.expenses) * 100) / 100;
  },
  privateLaborers: (state) => {
    return state.current.privateEnterprise.reduce((total, imp) => {
      return total + imp.employs * imp.count;
    }, 0);
  },
  propertyTax: (state, getters) => {
    let privateEnterpriseValue = state.current.privateEnterprise.reduce((total, imp) => {
      return total + imp.goldCost;
    }, 0);
    return Math.round(state.current.laws.propertyTaxRate * privateEnterpriseValue * getters.taxEfficiency) / 100;
  },
  resourceCost: (state) => {
    let resourceRevenue = 0;
    for (let key in state.current.autoSell) {
      let amount = Number(state.current.autoSell[key]);
      if (amount > 0) {
        resourceRevenue += amount * state.buyTable[key];
      }
    }
    return Math.round(resourceRevenue * 100) / 100;
  },
  resourceRevenue (state) {
    let resourceRevenue = 0;
    for (let key in state.current.autoSell) {
      let amount = Number(state.current.autoSell[key]);
      if (amount < 0) {
        resourceRevenue -= amount * state.sellTable[key];
      }
    }
    return Math.round(resourceRevenue * 100) / 100;
  },
  servantsNeeded (state) {
    return state.current.improvements.reduce((a, b) => {
      b.staff.forEach((st) => {
        if (st.name === "Servant") {
          a += st.num * b.count;
        }
      });
      return a;
    }, 0);
  },
  staffBeds: (state) => {
    return state.current.improvements.reduce((a, b) => {
      return a + b.staffpop * b.count;
    }, 0);
  },
  staffSummary: (state, getters) => {
    return state.current.staff.reduce((a, b) => {
      let needmatch = getters.neededStaff.filter((st) => {
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
  staffTypes: state => state.staffTypes,
  stronghold: state => state.current,
  strongholds: state => state.strongholds,
  taxEfficiency: (state, getters) => {
    let constablecount = 0;
    let guardcount = state.current.guards;
    let taxEfficiency = 0;
    let steward = getters.staffSummary.filter((a) => {
      return a.job.name === "Steward";
    })[0];
    let constablesoffice = state.current.improvements.filter((a) => {
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
      taxEfficiency = Math.min(1, (guardcount * 100 + constablecount * 500) / getters.getPop);
    }
    return Math.round(taxEfficiency * 100) / 100;
  },
  taxRevenue: (state, getters) => {
    return getters.headTax + getters.incomeTax + getters.propertyTax;
  },
  timberLand: (state, getters) => {
    let land = 0;
    let lumbercamps = state.current.improvements.filter((a) => {
      return a.id === "lumber-camp";
    })[0];
    let plumbercamps = state.current.privateEnterprise.filter((a) => {
      return a.id === "lumber-camp";
    })[0];
    if (lumbercamps) land += lumbercamps.count;
    if (plumbercamps) land += plumbercamps.count;
    return land;
  },
  totalEmployees: (state) => {
    return Number(state.current.laborers) + state.current.staff.length + Number(state.current.guards) + Number(state.current.servants);
  },
  totalLand: (state) => {
    let land = state.current.improvements.filter((a) => {
      return a.id === "new-land";
    })[0];
    if (land) return land.count;
    return 0;
  },
  totalPrivateEmployed: (state, getters) => {
    return getters.privateLaborers + state.current.privateEmployees.length;
  },
  totalSalary: (state) => {
    return state.current.staff.reduce((a, b) => {
      return a + Number(b.salary);
    }, 0) + state.current.guards * 2 + state.current.servants * 0.5 + state.current.laborers * 0.5;
  },
  totalStorage: (state) => {
    return state.current.improvements.reduce((tot, imp) => {
      return tot + imp.storage * imp.count;
    }, 0);
  },
  unemploymentRate: (state, getters) => {
    return Math.round((1 - ((getters.totalEmployees + getters.totalPrivateEmployed) / (getters.getPop * 0.7))) * 100);
  },
  unitWeightMod: (state) => state.unitWeightMod,
  unmetStaffNeed: (state, getters) => {
    let needed = [];
    getters.neededStaff.forEach((a) => {
      needed.push({ ...a });
    });
    state.current.staff.forEach((st) => {
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
      guards.num -= state.current.guards;
      if (guards.num <= 0) {
        needed.splice(needed.indexOf(guards), 1);
      }
    }
    let servants = needed.filter((a) => { return a.name === "Servant"; })[0];
    if (servants) {
      servants.num -= state.current.servants;
      if (servants.num <= 0) {
        needed.splice(needed.indexOf(servants), 1);
      }
    }
    return needed;
  },
  unrest: (state, getters) => {
    let unrest = 0;
    if (getters.getPop > 0) {
      // people hate head taxes
      if (Number(state.current.laws.headTaxRate) > 0) {
        unrest += Number(state.current.laws.headTaxRate) * 200;
      };
      // and hate high income taxes
      if (Number(state.current.laws.incomeTaxRate) > 10) {
        unrest += Number(state.current.laws.incomeTaxRate) - 10;
      }
      if (Number(state.current.laws.propertyTaxRate) > 0.1) {
        unrest += (Number(state.current.laws.propertyTaxRate) - 0.1) * 50;
      }
      // people want to work, very low unemployment reduces unrest, high unemployment increases unrest
      let unemploymentModifier = (getters.unemploymentRate - 20) * 0.5;
      unrest += unemploymentModifier;
      let foodSubsidiesModifier = ((Number(state.current.laws.foodSubsidies) / getters.getPop)) * 50;
      unrest -= foodSubsidiesModifier;
    }
    return Math.round(unrest);
  },
  urbanLand: (state) => {
    let land = 0;
    let village = state.current.improvements.filter((a) => {
      return a.id === "village";
    })[0];
    if (village) land += (village.count * 0.25);
    let town = state.current.improvements.filter((a) => {
      return a.id === "town";
    })[0];
    if (town) land += (town.count * 1.25);
    let districts = state.current.improvements.filter((a) => {
      return a.id === "additional-district";
    })[0];
    let otherurbanland = state.current.improvements.reduce((tot, a) => {
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
  usedStorage: (state) => {
    return state.current.resources.alcohol +
           state.current.resources.arcanum +
           state.current.resources.cloth +
           state.current.resources.coal +
           state.current.resources.food +
           state.current.resources.iron +
           state.current.resources.leather +
           state.current.resources.steel +
           state.current.resources.wool;
  }
};
