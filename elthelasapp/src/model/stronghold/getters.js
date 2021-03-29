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
      "alcohol": 1, "arcanum": 1, "brick": 1, "clay": 1, "cloth": 1, "coal": 1, "coffee": 1, "consumergoods": 1, "cotton": 1, "food": 1, "furniture": 1, "horses": 1, "iron": 1, "leather": 1, "lumber": 1, "paper": 1, "pottery": 1, "raremetal": 1, "steel": 1, "stone": 1, "sugar": 1, "timber": 1, "wool": 1
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
      resourceratios.brick,
      resourceratios.clay,
      resourceratios.cloth,
      resourceratios.coal,
      resourceratios.coffee,
      resourceratios.consumergoods,
      resourceratios.cotton,
      resourceratios.food,
      resourceratios.furniture,
      resourceratios.horses,
      resourceratios.iron,
      resourceratios.leather,
      resourceratios.lumber,
      resourceratios.paper,
      resourceratios.pottery,
      resourceratios.raremetal,
      resourceratios.steel,
      resourceratios.stone,
      resourceratios.sugar,
      resourceratios.timber,
      resourceratios.wool,
      staffratio,
      ops
    ) * 100) / 100;
  },
  calcGrossRevenue: (state, getters) => {
    let rev = state.current.improvements.reduce((total, imp) => {
      let rev = getters.calculateRevenue(imp);
      for (let key in total) {
        total[key] += rev[key];
      }
      return total;
    }, { alcohol: 0, arcanum: 0, brick: 0, clay: 0, cloth: 0, coal: 0, coffee: 0, consumergoods: 0, cotton: 0, food: 0, furniture: 0, horses: 0, iron: 0, leather: 0, lumber: 0, paper: 0, pottery: 0, raremetal: 0, steel: 0, stone: 0, sugar: 0, timber: 0, wool: 0 });
    return rev;
  },
  calcTotalRevenue: (state, getters) => {
    let rev = getters.calcGrossRevenue;
    for (let key in rev) {
      rev[key] = Math.round((rev[key] + Number(state.current.autoSell[key])) * 100) / 100;
    }
    rev['food'] -= state.current.laws.foodSubsidies;
    rev['food'] -= state.current.animals.reduce((b, a) => {
      if (a.livesat === "homeless") {
        return b + a.foodcost * 2;
      } else {
        return b + a.foodcost;
      }
    }, 0);
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
      if (naturecleric && (improvement.id === 'food-farm' || improvement.id === "winery")) {
        revenue[res] *= 1.25;
      }
      let earthcleric = state.current.staff.filter((a) => {
        return a.job.subtype === "Earth";
      })[0];
      if (earthcleric && (improvement.id === 'coal-mine' || improvement.id === 'iron-mine' || improvement.id === 'quarry')) {
        revenue[res] *= 1.25;
      }
    }
    return revenue;
  },
  expenses: (state, getters) => {
    return Math.round((getters.totalSalary + getters.buildingMaintenance + getters.resourceCost) * 100) / 100;
  },
  farmLand: (state) => {
    let land = 0;
    state.current.improvements.forEach((a) => {
      if (a.isfarm) {
        land++;
      }
    });
    state.current.privateEnterprise.forEach((a) => {
      if (a.isfarm) {
        land++;
      }
    });
    return land;
  },
  forestedLand: (state, getters) => {
    return getters.totalLand - (getters.availableClearedLand + getters.farmLand + getters.urbanLand);
  },
  gameDate: (state) => {
    return state.current.gameMonth + "/" + state.current.gameDay + "/" + state.current.gameYear;
  },
  getPop: (state) => {
    let pop = Number(state.current.population.adults) + Number(state.current.population.children) + Number(state.current.population.invalid) + state.current.staff.length;
    pop += Number(state.current.guards) + Number(state.current.servants);
    return pop;
  },
  getEmployable: (state) => {
    return state.current.population.adults;
  },
  getChildren: (state) => {
    return state.current.population.children;
  },
  getInvalid: (state) => {
    return state.current.population.invalid;
  },
  getPopNeeds: (state, getters) => {
    let popNeeds = {};
    for (let key in state.popNeedsMultCommon) {
      popNeeds[key] = state.popNeedsMultCommon[key] * getters.nonstaffPop;
      state.current.staff.forEach((staff) => {
        if (staff.salary > 10) {
          popNeeds[key] += state.popNeedsMultUpper[key];
        } else {
          popNeeds[key] += state.popNeedsMultMiddle[key];
        }
      });
    }
    for (let key in popNeeds) {
      popNeeds[key] = Math.round(popNeeds[key] * 100) / 100;
    }
    return popNeeds;
  },
  getPrivateProduction: (state, getters) => {
    let produced = state.current.privateEnterprise.reduce((b, a) => {
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
  rents: (state, getters) => {
    let rentRate = Number(state.current.laws.rentRate);
    let publicHousing = state.current.improvements.reduce((total, imp) => {
      return total + Math.floor(imp.pop * imp.count);
    }, 0);
    let numberRenting = getters.getPop - state.current.privateEnterprise.reduce((total, imp) => {
      return total + Math.floor(imp.pop * imp.count);
    }, 0);
    if (rentRate) {
      return rentRate * 5 * (getters.staffBeds - getters.availableStaffBeds) + rentRate * Math.min(publicHousing, numberRenting);
    } else {
      state.current.laws.rentRate = 0;
      return 0;
    }
  },
  laborersNeeded (state) {
    return state.current.improvements.reduce((a, b) => {
      return a + b.employs * b.count;
    }, 0);
  },
  maxLaborers: (state, getters) => {
    return Math.min(state.current.improvements.reduce((total, imp) => {
      return total + Math.floor(imp.pop * imp.count * 0.7);
    }, 0) + state.current.privateEnterprise.reduce((total, imp) => {
      return total + Math.floor(imp.pop * imp.count * 0.7);
    }, 0) - getters.privateLaborers, state.current.population.adults - getters.privateLaborers);
  },
  totalHousing: (state) => {
    return state.current.improvements.reduce((total, imp) => {
      return total + Math.floor(imp.pop * imp.count);
    }, 0) + state.current.privateEnterprise.reduce((total, imp) => {
      return total + Math.floor(imp.pop * imp.count);
    }, 0);
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
    return getters.headTax + getters.incomeTax + getters.propertyTax + getters.rents;
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
    return state.current.population.adults ? Math.round((1 - ((getters.totalEmployees + getters.totalPrivateEmployed) / Number(state.current.population.adults))) * 100) : 0;
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
      // rent is despised
      unrest += Number(state.current.laws.rentRate) * 100;
      if (Number(state.current.laws.propertyTaxRate) > 0.1) {
        unrest += (Number(state.current.laws.propertyTaxRate) - 0.1) * 50;
      }
      // homeless animals owned by the party
      unrest += state.current.animals.reduce((b, a) => {
        if (a.livesat === "homeless") {
          return b + 0.25;
        }
      }, 0);
      // people want to work, very low unemployment reduces unrest, high unemployment increases unrest
      let unemploymentModifier = (getters.unemploymentRate) * 0.5;
      unrest += unemploymentModifier;
      let foodSubsidiesModifier = getters.getPop ? ((Number(state.current.laws.foodSubsidies) / getters.getPop)) * 50 : 0;
      unrest -= foodSubsidiesModifier;
      // people want a place to live. If there isn't enough housing, unrest increases
      let housingModifier = getters.nonstaffPop ? Math.max(((getters.nonstaffPop - getters.totalHousing) / getters.nonstaffPop) * 2, 0) : 0;
      unrest += housingModifier;
    }
    return Math.max(Math.round(unrest), 0);
  },
  nonstaffPop: (state, getters) => {
    return getters.getPop - (state.current.staff.length + Number(state.current.guards) + Number(state.current.servants));
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
    return Object.values(state.current.resources).reduce((a, b) => {
      return a + b;
    }, 0);
  }
};
