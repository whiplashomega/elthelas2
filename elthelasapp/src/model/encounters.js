import Vue from 'vue';
import newEncounter from './classes/encounter';

Array.prototype.shuffle2 = function () {
  this.forEach(
    function (v, i, a) {
      let j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  );
  return this;
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
      eligible = eligible.shuffle2();
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
      Vue.http.get('/encounters?token=' + getters.getUserInfo.token).then((res) => {
        state.all = res.body;
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
