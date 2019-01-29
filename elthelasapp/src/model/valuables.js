import Vue from 'vue';
import ctest from './cordovatest.js';
import droll from 'droll';

const state = {
  all: []
};

const getters = {
  allValuables: state => state.all,
  randomValuable: (state) => (min, max) => {
    let possibles = state.all.filter((a) => {
      return a.Value <= max && a.Value >= min;
    });
    let i = droll.roll("1d" + possibles.length.toString()).total - 1;
    return possibles[i];
  }
};

const actions = {
  getAllValuables ({ commit }) {
    return new Promise((resolve) => {
      Vue.http.get(ctest.baseUrl + 'json/valuables.json').then((response) => {
        var valuables = response.body;
        commit('GET_VALUABLES', { valuables: valuables });
        resolve();
      });
    });
  }
};

const mutations = {
  'GET_VALUABLES' (state, { valuables }) {
    state.all = valuables;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
