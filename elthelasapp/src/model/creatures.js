import Vue from 'vue';
import marked from 'marked';
import ctest from './cordovatest.js';

const state = {
  all: []
};

const getters = {
  allCreatures: state => state.all
};

function calcStatMods (creature) {
  creature.descr = marked(creature.description);
  creature.strmod = Math.floor(creature.str / 2) - 5;
  creature.dexmod = Math.floor(creature.dex / 2) - 5;
  creature.conmod = Math.floor(creature.con / 2) - 5;
  creature.intmod = Math.floor(creature.int / 2) - 5;
  creature.wismod = Math.floor(creature.wis / 2) - 5;
  creature.chamod = Math.floor(creature.cha / 2) - 5;
}

const actions = {
  getAllCreatures ({ commit }) {
    return new Promise((resolve) => {
      Vue.http.get(ctest.baseUrl + 'json/creatures.json').then((response) => {
        var creatures = response.body.documents;
        Vue.http.get(ctest.baseUrl + '/creatures').then((response) => {
          creatures.push(...response.body);
          commit('GET_CREATURES', { creatures: creatures });
          resolve();
          for (var x = 0; x < creatures.length; x++) {
            if (creatures[x].description) {
              calcStatMods(creatures[x]);
            }
          }
        })
      });
    });
  },
  getCreature ({ state, getters }, id) {
    return new Promise((resolve) => {
      Vue.http.get(ctest.baseUrl + '/creatures/' + id + "?token=" + getters.getUserInfo.token).then((response) => {
        let i = state.all.findIndex((cre) => {
          return cre._id === id;
        });
        state.all[i] = response.body;
        resolve();
      });
    });
  },
  saveNewCreature ({ state, getters }, creature) {
    return new Promise((resolve) => {
      Vue.http.post(ctest.baseUrl + '/creatures/?token=' + getters.getUserInfo.token, creature).then((response) => {
        creature._id = response.body._id;
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
