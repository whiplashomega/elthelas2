import Vue from 'vue';
import ctest from './cordovatest.js';

const state = {
  all: []
};

const getters = {
  allTerritories: state => state.all
};

const actions = {
  getAllTerritories ({ commit }) {
    return new Promise((resolve) => {
      Vue.http.get(ctest.baseUrl + 'json/territories.json').then((response) => {
        var territories = response.body.documents;
        commit('GET_TERRITORIES', { territories: territories });
        resolve();
      });
    });
  }
};

const mutations = {
  'GET_TERRITORIES' (state, { territories }) {
    state.all = territories;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
