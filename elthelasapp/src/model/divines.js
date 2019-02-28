import Vue from 'vue';
import marked from 'marked';
import ctest from './cordovatest.js';

const state = {
  all: [{ name: 'Placeholder', id: 'placeholder' }]
};

const getters = {
  allDivines: state => state.all
};

const actions = {
  getAllDivines ({ commit }) {
    return new Promise((resolve) => {
      Vue.http.get(ctest.baseUrl + 'json/divines.json').then((response) => {
        var divines = response.body.documents;
        for (var x = 0; x < divines.length; x++) {
          divines[x].descr = marked(divines[x].description);
        }
        commit('GET_DIVINES', { divines: divines });
        resolve();
      });
    });
  }
};

const mutations = {
  'GET_DIVINES' (state, { divines }) {
    state.all = divines;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
