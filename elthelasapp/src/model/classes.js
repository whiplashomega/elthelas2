import Vue from 'vue';
import ctest from './cordovatest.js';

const state = {
  all: []
};

const getters = {
  allClasses: state => state.all
};

const actions = {
  getAllClasses ({ commit }) {
    return new Promise((resolve) => {
      Vue.http.get(ctest.baseUrl + 'static/json/classes.json').then((response) => {
        var classes = response.body.documents;
        classes = classes.map((a) => {
          var r = { ...a };
          r.features = a.features.map((b) => {
            var s = { ...b, isCollapsed: true };
            return s;
          });
          r.subclass = r.subclass.map((c) => {
            var t = { ...c };
            t.features = c.features.map((d) => {
              var u = { ...d, isCollapsed: true };
              return u;
            });
            return t;
          });
          return r;
        });
        commit('GET_CLASSES', { classes: classes });
        resolve();
      });
    });
  }
};

const mutations = {
  'GET_CLASSES' (state, { classes }) {
    state.all = classes;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
