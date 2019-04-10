import Vue from 'vue';
import ctest from '../cordovatest.js';
import Stronghold from '../classes/stronghold';

export default {
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
