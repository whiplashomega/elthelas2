import Vue from 'vue';
import ctest from './cordovatest.js';

const state = {
  all: [{ name: 'Placeholder', id: 'placeholder', domains5: "" }]
};

const getters = {
  allGods: state => state.all
};

const actions = {
  getAllGods ({ commit }) {
    return new Promise((resolve) => {
      Vue.http.get(ctest.baseUrl + 'json/gods.json').then((response) => {
        var gods = response.body.documents;
        commit('GET_GODS', { gods: gods });
        resolve();
      });
    });
  }
};

const mutations = {
  'GET_GODS' (state, { gods }) {
    state.all = gods;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
