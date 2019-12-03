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
  getCreatureForEdit ({ state, getters }, id) {
    return new Promise((resolve) => {
      Vue.http.get(ctest.baseUrl + 'creatures/' + id + "?token=" + getters.getUserInfo.token).then((response) => {
        state.builderCreature = response.body;
        if (state.builderCreature.skills.length > 0 && typeof state.builderCreature.skills[0] === 'string') {
          state.builderCreature.skills = state.builderCreature.skills.map((a) => {
            return { id: Math.random(), value: a };
          });
        }
        resolve(response.body);
      });
    });
  },
  saveCreature ({ getters }, creature) {
    return new Promise((resolve) => {
      Vue.http.post(ctest.baseUrl + 'creatures/' + creature._id + '?token=' + getters.getUserInfo.token, { creature: creature }).then((response) => {
        creature = response.body;
        resolve(response.body);
      });
    });
  },
  getCreature ({ state, getters }, id) {
    return new Promise((resolve) => {
      Vue.http.get(ctest.baseUrl + 'creatures/' + id + "?token=" + getters.getUserInfo.token).then((response) => {
        let i = state.all.findIndex((cre) => {
          return cre._id === id;
        });
        state.all[i] = response.body;
        calcStatMods(state.all[i]);
        if (state.all[i].skills.length > 0 && typeof state.all[i].skills[0] === 'object') {
          state.all[i].skills = state.all[i].skills.map((a) => {
            return a.value;
          });
        }
        if (state.all[i].tags.length > 0 && typeof state.all[i].tags[0] === 'object') {
          state.all[i].tags = state.all[i].tags.map((a) => {
            return a.name;
          });
        }
        resolve(state.all[i]);
      });
    });
  },
  deleteCreature ({ state, getters }, id) {
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
        state.all.push(response.body);
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
