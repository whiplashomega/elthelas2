import Vue from 'vue';

const state = {
  all: []
};

const getters = {
  allRaces: state => state.all
};

const actions = {
  getAllRaces ({ commit }) {
    return new Promise((resolve) => {
      Vue.http.get('/static/json/races.json').then((response) => {
        var races = response.body.documents;
        commit('GET_RACES', { races: races });
        resolve();
      });
    });
  }
};

const mutations = {
  'GET_RACES' (state, { races }) {
    state.all = races;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
