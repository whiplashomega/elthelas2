import Vue from 'vue';
import ctest from './cordovatest.js';

const state = {
  all: []
};

const getters = {
  allBackgrounds: state => state.all
};

const actions = {
  getAllBackgrounds ({ commit }) {
    return new Promise((resolve) => {
      Vue.http.get(ctest.baseUrl + 'json/backgrounds.json').then((response) => {
        var backgrounds = response.body.documents;
        for (var x = 0; x < backgrounds.length; x++) {
          backgrounds[x].isCollapsed = true;
        }
        commit('GET_BACKGROUNDS', { backgrounds: backgrounds });
        resolve();
      });
    });
  }
};

const mutations = {
  'GET_BACKGROUNDS' (state, { backgrounds }) {
    state.all = backgrounds;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
