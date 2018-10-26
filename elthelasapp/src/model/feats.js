import Vue from 'vue';
import ctest from './cordovatest.js';

const state = {
  all: []
};

const getters = {
  allFeats: state => state.all,
  featsort: (state) => {
    var feats = [ ...state.all, { name: "Ability Score Increase", prereq: "", description: "Increase one ability score by 2 or 2 ability scores by 1" } ];
    function ftsrt (a, b) {
      if (a.name > b.name) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      }
      return 0;
    }
    return feats.sort(ftsrt);
  }
};

const actions = {
  getAllFeats ({ commit }) {
    return new Promise((resolve) => {
      Vue.http.get(ctest.baseUrl + 'json/feats.json').then((response) => {
        var feats = response.body;
        commit('GET_FEATS', { feats: feats });
        resolve();
      });
    });
  }
};

const mutations = {
  'GET_FEATS' (state, { feats }) {
    state.all = feats;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
