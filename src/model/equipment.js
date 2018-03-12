import Vue from 'vue';

const state = {
  all: []
};

const getters = {
  allEquipment: state => state.all
};

const actions = {
  getAllEquipment ({ commit }) {
    return new Promise((resolve) => {
      Vue.http.get('/static/json/equipment.json').then((response) => {
        var equipment = response.body;
        commit('GET_EQUIPMENT', { equipment: equipment });
        resolve();
      });
    });
  }
};

const mutations = {
  'GET_EQUIPMENT' (state, { equipment }) {
    state.all = equipment;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
