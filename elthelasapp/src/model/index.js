import Vue from 'vue';
import Vuex from 'vuex';
import spells from './spells';
import equipment from './equipment';
import armor from './armor';
import weapons from './weapons';
import magicitems from './magicitems';
import creatures from './creatures';
import gods from './gods';
import divines from './divines';
import orgs from './organizations';
import history from './history';
import geo from './geomodels';
import backgrounds from './backgrounds';
import races from './races';
import classes from './classes';
import auth from './auth';
import feats from './feats';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    spells,
    equipment,
    armor,
    weapons,
    magicitems,
    creatures,
    gods,
    divines,
    orgs,
    history,
    geo,
    backgrounds,
    races,
    classes,
    auth,
    feats
  },
  state: {
    title: "Test"
  },
  mutations: {
    'CHANGE_TITLE' (state, { title }) {
      state.title = title;
    }
  },
  getters: {
    title: state => state.title
  },
  actions: {
    changeTitle ({ commit }, title) {
      commit('CHANGE_TITLE', { title });
    }
  }
});
