import Vue from 'vue';
import ctest from './cordovatest.js';

const state = {
  all: []
};

const getters = {
  allFeats: state => state.all
};

const actions = {
  getAllFeats ({ commit }) {
    return new Promise((resolve) => {
      Vue.http.get(ctest.baseUrl + 'static/json/feats.json').then((response) => {
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
