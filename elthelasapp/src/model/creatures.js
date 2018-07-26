import Vue from 'vue';
import marked from 'marked';
import ctest from './cordovatest.js';

const state = {
  all: []
};

const getters = {
  allCreatures: state => state.all
};

const actions = {
  getAllCreatures ({ commit }) {
    return new Promise((resolve) => {
      Vue.http.get(ctest.baseUrl + 'static/json/creatures.json').then((response) => {
        var creatures = response.body.documents;
        for (var x = 0; x < creatures.length; x++) {
          creatures[x].descr = marked(creatures[x].description);
          creatures[x].strmod = Math.floor(creatures[x].str / 2) - 5;
          creatures[x].dexmod = Math.floor(creatures[x].dex / 2) - 5;
          creatures[x].conmod = Math.floor(creatures[x].con / 2) - 5;
          creatures[x].intmod = Math.floor(creatures[x].int / 2) - 5;
          creatures[x].wismod = Math.floor(creatures[x].wis / 2) - 5;
          creatures[x].chamod = Math.floor(creatures[x].cha / 2) - 5;
        }
        commit('GET_CREATURES', { creatures: creatures });
        resolve();
      });
    });
  }
};

const mutations = {
  'GET_CREATURES' (state, { creatures }) {
    state.all = creatures;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
