import Vue from 'vue';
import ctest from './cordovatest.js';

const state = {
  all: [{ name: 'Placeholder', id: 'placeholder' }]
};

const getters = {
  allOrganizations: state => state.all
};

const actions = {
  getAllOrganizations ({ commit }) {
    return new Promise((resolve) => {
      Vue.http.get(ctest.baseUrl + 'json/organizations.json').then((response) => {
        var orgs = response.body.documents;
        commit('organizations', { orgs: orgs });
        resolve();
      });
    });
  }
};

const mutations = {
  'organizations' (state, { orgs }) {
    state.all = orgs;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
