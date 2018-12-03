import Vue from 'vue';
import ctest from './cordovatest.js';

const state = {
  all: []
};

const getters = {
  allSpells: state => state.all
};

const actions = {
  getAllSpells ({ commit }) {
    return new Promise((resolve) => {
      Vue.http.get(ctest.baseUrl + 'json/spells.json').then((response) => {
        var spells = response.body.documents;
        for (var x in spells) {
          try {
            spells[x].tagsText = spells[x].tags.join(', ');
          } catch (e) {
            spells[x].tagsText = "";
            console.log(x);
            console.log(spells[x]);
          }
        }
        commit('GET_SPELLS', { spells: spells });
        resolve();
      });
    });
  }
};

const mutations = {
  'GET_SPELLS' (state, { spells }) {
    state.all = spells;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
