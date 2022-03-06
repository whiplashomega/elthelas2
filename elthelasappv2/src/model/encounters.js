import Vue from 'vue';
import newEncounter from './classes/encounter';

var shuffle = function (array) {
  var currentIndex = array.length;
  var temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

export default {
  state: {
    all: [],
    current: newEncounter()
  },
  getters: {
    getEncounters: (state) => state.all,
    getCurrentEncounter: (state) => state.current,
    getRandomEncounters: (state) => (tier, environment) => {
      let eligible = state.all.filter((enc) => {
        if (enc.prereq) {
          var prereq = state.all.filter((a) => {
            return a._id === enc.prereq;
          })[0];
        } else {
          prereq = false;
        }
        if ((enc.tier === 'Any' || tier === "Any" || enc.tier === tier) &&
            (enc.environment === 'Any' || environment === "Any" || enc.environment === environment) &&
            !enc.complete &&
            enc.random &&
            (!prereq || prereq.complete)
        ) {
          return true;
        } else {
          return false;
        }
      });
      shuffle(eligible);
      let final = [];
      eligible.forEach((enc) => {
        if (final.length < 6) {
          final.push(enc);
        }
      });
      return final;
    }
  },
  actions: {
    getAllEncounters: ({ state, getters }) => {
      return new Promise((resolve) => {
        Vue.http.get('/encounters?token=' + getters.getUserInfo.token).then((res) => {
          state.all = res.body;
          resolve();
        });
      });
    },
    saveNewEncounter: ({ state, getters }) => {
      Vue.http.post('/encounters?token=' + getters.getUserInfo.token, { encounter: { ...state.current, _id: undefined } }).then((res) => {
        state.current = { ...res.body };
        state.all.push(res.body);
      });
    },
    loadEncounter: ({ state }, encounter) => {
      state.current = { ...encounter };
    },
    loadEncounterById: ({ state }, { id }) => {
      state.current = { ...state.all.filter((a) => {
        return a._id === id;
      })[0] };
    },
    saveEncounter: ({ state, getters }) => {
      Vue.http.post('/encounters/' + state.current._id + "?token=" + getters.getUserInfo.token, { encounter: state.current }).then((res) => {
        state.all.splice(state.all.indexOf(state.current), 1);
        state.current = { ...res.body };
        state.all.push(res.body);
      });
    },
    deleteEncounter: ({ state, getters }, { encounter }) => {
      Vue.http.delete('/encounters/' + encounter._id + "?token=" + getters.getUserInfo.token).then(() => {
        state.all.splice(state.all.indexOf(encounter));
      });
    },
    resetEncounter: ({ state }) => {
      state.current = newEncounter();
    }
  }
};
