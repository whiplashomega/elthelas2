import Vue from 'vue';
import ctest from './cordovatest.js';
import staffTypes from './classes/stafftypes';

var Stronghold = function () {
  return {
    castleName: "",
    townName: "",
    treasury: 0,
    transactionrecord: [],
    improvements: [{
      "id": "new-land",
      "name": "Land",
      "cost": 2500,
      "benefit": "Gain an additional 1 km^2 of unimproved forested land",
      "staff": [],
      "revenue": 0,
      "pop": 0,
      "staffpop": 0,
      "employs": 0,
      "buildtime": 0,
      "prerequisites": [ ],
      "hide": true,
      "count": 5,
      "max": 100,
      "type": "countryside"
    }],
    construction: [],
    staff: [],
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
    if (districts) land += (districts.count * 1.25);
    return land;
  },
  farmLand: (state) => {
    let land = 0;
    let foodfarms = state.current.improvements.filter((a) => {
      return a.id === "food-farm";
    })[0];
    let cashfarms = state.current.improvements.filter((a) => {
      return a.id === "cash-crop-farm";
    })[0];
    if (foodfarms) land += foodfarms.count;
    if (cashfarms) land += cashfarms.count;
    return land;
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
    Vue.http.post('/strongholds/' + state.current._id + "?token=" + getters.getUserInfo.token, { stronghold: state.current }).then((res) => {
      state.strongholds.splice(state.all.indexOf(state.current), 1);
      state.current = { ...res.body };
      state.strongholds.push(res.body);
    });
  },
  deleteStronghold: ({ state, getters }, { stronghold }) => {
    Vue.http.delete('/strongholds/' + stronghold._id + "?token=" + getters.getUserInfo.token).then(() => {
      state.strongholds.splice(state.all.indexOf(stronghold));
    });
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
