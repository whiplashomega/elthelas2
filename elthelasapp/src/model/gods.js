import Vue from 'vue';

const state = {
  all: [{ name: 'Placeholder', id: 'placeholder' }]
};

const getters = {
  allGods: state => state.all
};

const actions = {
  getAllGods ({ commit }) {
    return new Promise((resolve) => {
      Vue.http.get('/static/json/gods.json').then((response) => {
        var gods = response.body.documents;
        commit('GET_GODS', { gods: gods });
        resolve();
      });
    });
  }
};

const mutations = {
  'GET_GODS' (state, { gods }) {
    state.all = gods;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
