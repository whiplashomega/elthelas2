import Vue from 'vue';
import ctest from './cordovatest.js';

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
    gameYear: 1846,
    gameMonth: 7,
    gameDay: 12
  };
};

const state = {
  all: [],
  strongholds: [],
  current: Stronghold(),
  staffTypes: [
    {
      name: "Archmage",
      typicalSalary: 720,
      bonus: "A master wizard of the highest order, can cast the most powerful of spells of the appropriate school.",
      subtypes: [ "Bladesinger", "Conjurer", "Diviner", "Enchanter", "Evoker", "Illusionist", "Necromancer", "Transmuter", "War Wizard" ],
      subtype: ""
    },
    {
      name: "Artificer",
      typicalSalary: 300,
      bonus: "A specialist in magical devices"
    },
    {
      name: "Ayrie Master",
      typicalSalary: 20,
      bonus: "Cares for and trains winged mounts in the ayrie."
    },
    {
      name: "Banker",
      typicalSalary: 10,
      bonus: "Manages a bank."
    },
    {
      name: "Beastmaster",
      typicalSalary: 20,
      bonus: "Can feed and take care of animal companions in an animal sanctuary."
    },
    {
      name: "Beast Trainer",
      typicalSalary: 20,
      bonus: "Able to capture wild beasts and domesticate them for a fee (50% of listed cost)."
    },
    {
      name: "Blacksmith",
      typicalSalary: 5,
      bonus: "Runs a blacksmith shop."
    },
    {
      name: "Captain",
      typicalSalary: 60,
      bonus: "handles hiring, basic training, and assignment of guards."
    },
    {
      name: "Cleric",
      typicalSalary: 60,
      bonus: "A cleric can often serve a variety of functions, most especially providing spellcasting and religious services. Additionally, earth clerics improve the profitability of mines and quarries, and nature clerics improve the profitability of farms.",
      subtypes: [ "Air", "Arcana", "Death", "Earth", "Fire", "Forge", "Knowledge", "Life", "Light", "Nature", "Tempest", "Trade", "Trickery", "War", "Water" ],
      subtype: ""
    },
    {
      name: "Constable",
      typicalSalary: 1,
      bonus: "Maintains law and order in the town, making sure taxes are paid and laws are obeyed"
    },
    {
      name: "Factory Foreman",
      typicalSalary: 5,
      bonus: "Manages a factory as a business."
    },
    {
      name: "Guard",
      typicalSalary: 2,
      bonus: "Protects the town, need 1 per 100 citizens if used to keep the peace and collect taxes."
    },
    {
      name: "Fortification Expert",
      typicalSalary: 10,
      bonus: "fortifications cost 25% less to build, and are built in 75% of the time"
    },
    {
      name: "Harbormaster",
      typicalSalary: 5,
      bonus: "Manages loading and unloading of ships and collection of taxes from a harbor"
    },
    {
      name: "Head Farmer",
      typicalSalary: 2,
      bonus: "Manages a farm, required to operate a farm and provide profits to the players"
    },
    {
      name: "High Priest",
      typicalSalary: 200,
      bonus: "A cleric can often serve a variety of functions, most especially providing spellcasting and religious services. A High priest can cast much higher level spells than a typical cleric.",
      subtypes: [ "Air", "Arcana", "Death", "Earth", "Fire", "Forge", "Knowledge", "Life", "Light", "Nature", "Tempest", "Trade", "Trickery", "War", "Water" ],
      subtype: ""
    },
    {
      name: "Innkeeper",
      typicalSalary: 3,
      bonus: "Runs your inn for you, providing you with profits"
    },
    {
      name: "Librarian",
      typicalSalary: 10,
      bonus: "required to manage library"
    },
    {
      name: "Lumberjack Foreman",
      typicalSalary: 3,
      bonus: "Required to run a lumber camp"
    },
    {
      name: "Master Wizard",
      typicalSalary: 200,
      bonus: "A spellcaster with a particular specialty, can cast up to 5th level spells of the appropriate school.",
      subtypes: [ "Bladesinger", "Conjurer", "Diviner", "Enchanter", "Evoker", "Illusionist", "Necromancer", "Transmuter", "War Wizard" ],
      subtype: ""
    },
    {
      name: "Mine Foreman",
      typicalSalary: 5,
      bonus: "required to collect profits from a mine"
    },
    {
      name: "Quartermaster",
      typicalSalary: 3,
      bonus: "Manages supplies and equipment for a military force or manages a warehouse."
    },
    {
      name: "Prison Warden",
      typicalSalary: 10,
      bonus: "Manages prison population."
    },
    {
      name: "Servant",
      typicalSalary: 0.5,
      bonus: "Keeps things clean, prepares food, or does other menial labor tasks around a castle."
    },
    {
      name: "Shopkeeper",
      typicalSalary: 1,
      bonus: "Manages a shop."
    },
    {
      name: "Stablemaster",
      typicalSalary: 5,
      bonus: "Will keep and train standard mounts such as horses and riding dogs, allowing for the equipment of cavalry."
    },
    {
      name: "Steward",
      typicalSalary: 5,
      bonus: "Required to collect taxes and tolls"
    },
    {
      name: "Teacher",
      typicalSalary: 5,
      bonus: "runs a school for children, teaching reading, writing, and arithmetic"
    },
    {
      name: "Trainer",
      typicalSalary: 90,
      bonus: "increases quality of guards to level 3 equivalent NPCs"
    },
    {
      name: "Trapsmith",
      typicalSalary: 10,
      bonus: "needed to build and maintain defensive traps"
    },
    {
      name: "Wizard",
      typicalSalary: 60,
      bonus: "A spellcaster with a particular specialty, can cast up to 3rd level spells of the appropriate school.",
      subtypes: [ "Bladesinger", "Conjurer", "Diviner", "Enchanter", "Evoker", "Illusionist", "Necromancer", "Transmuter", "War Wizard" ],
      subtype: ""
    }
  ]
};

const getters = {
  allImprovements: state => state.all,
  strongholds: state => state.strongholds,
  stronghold: state => state.current,
  staffTypes: state => state.staffTypes
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
