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
import characters from './characters';
import auth from './auth';
import feats from './feats';
import territories from './territories';
import encounters from './encounters';

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
    feats,
    territories,
    characters,
    encounters
  },
  state: {
    title: "Test",
    mobile: false
  },
  mutations: {
    'CHANGE_TITLE' (state, { title }) {
      state.title = title;
    },
    setMobile (state, val) {
      state.mobile = val;
    }
  },
  getters: {
    title: state => state.title,
    isMobile: state => state.mobile
  },
  actions: {
    changeTitle ({ commit }, title) {
      commit('CHANGE_TITLE', { title });
    }
  }
});
