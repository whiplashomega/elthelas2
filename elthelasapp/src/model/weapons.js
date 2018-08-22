import Vue from 'vue';
import ctest from './cordovatest.js';

const state = {
  all: []
};

const getters = {
  allWeapons: state => state.all
};

const actions = {
  getAllWeapons ({ commit }) {
    return new Promise((resolve) => {
      Vue.http.get(ctest.baseUrl + 'json/weapons.json').then((response) => {
        var weapons = response.body;
        commit('GET_WEAPONS', { weapons: weapons });
        resolve();
      });
    });
  }
};

const mutations = {
  'GET_WEAPONS' (state, { weapons }) {
    state.all = weapons;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
