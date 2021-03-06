import Vue from 'vue';
import marked from 'marked';
import ctest from './cordovatest.js';

const state = {
  all: [{ name: 'Placeholder', id: 'placeholder' }],
  personal: [{ name: 'Placeholder', id: 'placeholder' }]
};

const getters = {
  allEvents: state => state.all,
  personalEvents: state => state.personal
};

const actions = {
  getAllEvents ({ commit }) {
    return new Promise((resolve) => {
      Vue.http.get(ctest.baseUrl + 'json/history.json').then((response) => {
        var events = response.body.documents;
        for (var x = 0; x < events.length; x++) {
          events[x].text.text = marked(events[x].text.text);
        }
        commit('history', { events: events });
        resolve();
      });
    });
  },
  getPersonalEvents ({ commit }) {
    return new Promise((resolve) => {
      Vue.http.get(ctest.baseUrl + 'json/personalhistory.json').then((response) => {
        var events = response.body.documents;
        for (var x = 0; x < events.length; x++) {
          events[x].text.text = marked(events[x].text.text);
        }
        commit('history', { events: events });
        resolve();
      });
    });
  }
};

const mutations = {
  'history' (state, { events }) {
    state.all = events;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
