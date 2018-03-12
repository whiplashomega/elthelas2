import Vue from 'vue';

const state = {
  all: []
};

const getters = {
  allArmor: state => state.all
};

const actions = {
  getAllArmor ({ commit }) {
    return new Promise((resolve) => {
      Vue.http.get('/static/json/armor.json').then((response) => {
        var armor = response.body;
        commit('GET_ARMOR', { armor: armor });
        resolve();
      });
    });
  }
};

const mutations = {
  'GET_ARMOR' (state, { armor }) {
    state.all = armor;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
