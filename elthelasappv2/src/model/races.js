import Vue from 'vue';
import ctest from './cordovatest.js';

const state = {
  all: []
};

const getters = {
  allRaces: state => state.all,
  builderRaces: state => {
    var all = [];
    for (var x = 0; x < state.all.length; x++) {
      for (var y = 0; y < state.all[x].subraces.length; y++) {
        var b = {
          ...state.all[x],
          ...state.all[x].subraces[y],
          name: state.all[x].name + ", " + state.all[x].subraces[y].name,
          singular: state.all[x].singular + ", " + state.all[x].subraces[y].singular,
          traits: [ ...state.all[x].traits, ...state.all[x].subraces[y].traits ]
        };
        if (state.all[x].subraces[y].id === "default") {
          b.id = state.all[x].id;
          b.name = state.all[x].name;
          b.singular = state.all[x].singular;
        }
        all.push(b);
      }
    }
    return all;
  }
};

const actions = {
  getAllRaces ({ commit }) {
    return new Promise((resolve) => {
      Vue.http.get(ctest.baseUrl + 'json/races.json').then((response) => {
        var races = response.body.documents;
        commit('GET_RACES', { races: races });
        resolve();
      });
    });
  }
};

const mutations = {
  'GET_RACES' (state, { races }) {
    state.all = races;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
