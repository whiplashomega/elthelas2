import Vue from 'vue';
import marked from 'marked';
import ctest from './cordovatest.js';
import Creature from './classes/creature';

const state = {
  all: [],
  builderCreature: Creature()
};

const getters = {
  allCreatures: state => state.all,
  builderCreature: state => state.builderCreature
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
      Vue.http.get(ctest.baseUrl + 'creatures').then((response) => {
        var creatures = response.body;
        commit('GET_CREATURES', { creatures: creatures });
        resolve();
      });
    });
  },
  resetCreature ({ state }) {
    state.builderCreature = Creature();
  },
  getCreature ({ state, getters }, id) {
    return new Promise((resolve) => {
      Vue.http.get(ctest.baseUrl + 'creatures/' + id + "?token=" + getters.getUserInfo.token).then((response) => {
        let i = state.all.findIndex((cre) => {
          return cre._id === id;
        });
        state.all[i] = response.body;
        calcStatMods(state.all[i]);
        resolve(state.all[i]);
      });
    });
  },
  deleteCreature ({ state }, id) {
    return new Promise((resolve) => {
      Vue.http.delete(ctest.baseUrl + 'creatures/' + id + "?token=" + getters.getUserInfo.token).then((response) => {
        let i = state.all.findIndex((cre) => {
          return cre._id === id;
        });
        state.all.splice(i, 1);
      });
    });
  },
  saveNewCreature ({ state, getters }, creature) {
    return new Promise((resolve) => {
      Vue.http.post(ctest.baseUrl + 'creatures/?token=' + getters.getUserInfo.token, { creature: creature }).then((response) => {
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
