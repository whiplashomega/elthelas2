import Vue from 'vue';
import ctest from './cordovatest.js';
import staffTypes from './classes/stafftypes';

var Stronghold = function () {
  return {
    castleName: "",
    townName: "",
    treasury: 0,
    resources: {
      "alcohol": 0,
      "arcanum": 0,
      "cloth": 0,
      "coal": 0,
      "food": 0,
      "iron": 0,
      "leather": 0,
      "lumber": 0,
      "steel": 0,
      "stone": 0,
      "timber": 0,
      "wool": 0
    },
    autoSell: {
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
    transactionrecord: [],
    improvements: [
      {
        "id": "new-land",
        "name": "Land",
        "benefit": "Gain an additional 1 km^2 of unimproved forested land",
        "goldCost": 5000,
        "resourceCost": {
          "alcohol": 0,
          "arcanum": 0,
          "cloth": 0,
          "coal": 0,
          "food": 0,
          "iron": 0,
          "leather": 0,
          "lumber": 0,
          "steel": 0,
          "stone": 0,
          "timber": 0,
          "wool": 0
        },
        "staff": [],
        "income": 0,
        "revenue": {
          "alcohol": 0,
          "arcanum": 0,
          "cloth": 0,
          "coal": 0,
          "food": 0,
          "iron": 0,
          "leather": 0,
          "lumber": 0,
          "steel": 0,
          "stone": 0,
          "timber": 0,
          "wool": 0
        },
        "pop": 0,
        "staffpop": 0,
        "laborers": 0,
        "employs": 0,
        "storage": 0,
        "operating": true,
        "buildtime": 0,
        "prerequisites": [ ],
        "hide": true,
        "count": 5,
        "max": 100,
        "type": "countryside"
      }
    ],
    construction: [],
    privateEnterprise: [],
    privateEmployees: [],
    staff: [],
    animals: [],
    laws: {
      incomeTaxRate: 0,
      headTaxRate: 0,
      foodSubsidies: 0,
      propertyTaxRate: 0,
      todaysExports: 0
    },
    merchants: [],
    guards: 0,
    servants: 0,
    laborers: 0,
    gameYear: 1846,
    gameMonth: 7,
    gameDay: 12,
    notes: ""
  };
};

const state = {
  all: [],
  strongholds: [],
  current: Stronghold(),
  staffTypes: staffTypes
};

const getters = {
  allImprovements: state => state.all,
  strongholds: state => state.strongholds,
  stronghold: state => state.current,
  staffTypes: state => state.staffTypes,
  forestedLand: (state, getters) => {
    return getters.totalLand - (getters.availableClearedLand + getters.farmLand + getters.urbanLand);
  },
  availableForestedLand: (state, getters) => {
    return getters.forestedLand - getters.timberLand;
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
  totalLand: (state) => {
    let land = state.current.improvements.filter((a) => {
      return a.id === "new-land";
    })[0];
    if (land) return land.count;
    return 0;
  },
  availableClearedLand: (state, getters) => {
    let land = state.current.improvements.filter((a) => {
      return a.id === "clear-land";
    })[0];
    if (land) return land.count - getters.farmLand;
    return 0;
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
  totalStorage: (state) => {
    return state.current.improvements.reduce((tot, imp) => {
      return tot + imp.storage * imp.count;
    }, 0);
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
  laborersNeeded (state) {
    return state.current.improvements.reduce((a, b) => {
      return a + b.employs * b.count;
    }, 0);
  },
  privateLaborers: (state) => {
    return state.current.privateEnterprise.reduce((total, imp) => {
      return total + imp.employs * imp.count;
    }, 0);
  },
  totalPrivateEmployed: (state, getters) => {
    return getters.privateLaborers + state.current.privateEmployees.length;
  },
  maxLaborers: (state, getters) => {
    return state.current.improvements.reduce((total, imp) => {
      return total + Math.floor(imp.pop * imp.count * 0.7);
    }, 0) + state.current.privateEnterprise.reduce((total, imp) => {
      return total + Math.floor(imp.pop * imp.count * 0.7);
    }, 0) - getters.privateLaborers;
  },
  availableLaborers: (state) => {
    return Number(state.current.laborers) - state.current.improvements.reduce((total, imp) => {
      return total + Number(imp.laborers);
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
  }
};

const actions = {

  getAllImprovements ({ commit }) {
    return new Promise((resolve) => {
      Vue.http.get(ctest.baseUrl + 'json/improvements.json').then((response) => {
        var improvements = response.body.documents;
        commit('GET_IMPROVEMENTS', { improvements: improvements });
        resolve();
      });
    });
  },
  newStronghold: ({ state }) => {
    state.current = new Stronghold();
  },
  getAllStrongholds: ({ state, getters }) => {
    return new Promise((resolve) => {
      Vue.http.get('/strongholds').then((res) => {
        state.strongholds = res.body;
        resolve();
      });
    });
  },
  saveNewStronghold: ({ state, getters }) => {
    Vue.http.post('/strongholds?token=' + getters.getUserInfo.token, { stronghold: { ...state.current, _id: undefined } }).then((res) => {
      state.current = { ...res.body };
      state.strongholds.push(res.body);
    });
  },
  loadStronghold: ({ state }, stronghold) => {
    state.current = { ...stronghold };
  },
  loadStrongholdById: ({ state }, { id }) => {
    state.current = { ...state.all.filter((a) => {
      return a._id === id;
    })[0] };
  },
  saveStronghold: ({ state, getters }) => {
    let check = window.confirm("Are you sure you want to save your changes to " + state.current.castleName + "?");
    if (check) {
      Vue.http.post('/strongholds/' + state.current._id + "?token=" + getters.getUserInfo.token, { stronghold: state.current }).then((res) => {
        state.strongholds.splice(state.all.indexOf(state.current), 1);
        state.current = { ...res.body };
        state.strongholds.push(res.body);
      });
    }
  },
  deleteStronghold: ({ state, getters }, { stronghold }) => {
    let check = window.confirm("Are you sure you want to delete " + stronghold.castleName);
    if (check) {
      Vue.http.delete('/strongholds/' + stronghold._id + "?token=" + getters.getUserInfo.token).then(() => {
        state.strongholds.splice(state.all.indexOf(stronghold));
      });
    }
  }
};

const mutations = {
  'GET_IMPROVEMENTS' (state, { improvements }) {
    state.all = improvements;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
