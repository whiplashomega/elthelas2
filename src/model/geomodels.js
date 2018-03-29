import Vue from 'vue';

const state = {
  cities: [],
  nations: [],
  landmarks: [],
  features: [],
  continents: []
};

const getters = {
  allCities: state => state.cities,
  allNations: state => state.nations,
  allNationNames: state => {
    return state.nations.map((a) => {
      return a.name;
    });
  },
  allCityNames: state => {
    return state.cities.map((a) => {
      return a.name;
    });
  },
  allLandmarks: state => state.landmarks,
  allFeatures: state => state.features,
  allContinents: state => state.continents
};

const actions = {
  getAllCities ({ commit }) {
    return new Promise((resolve) => {
      Vue.http.get('/static/json/cities.json').then((response) => {
        var cities = response.body.documents;
        commit('getCities', { cities: cities });
        resolve();
      });
    });
  },
  getAllNations ({ commit }) {
    return new Promise((resolve) => {
      Vue.http.get('/static/json/nations.json').then((response) => {
        var nations = response.body.documents;
        commit('getNations', { nations: nations });
        resolve();
      });
    });
  },
  getAllLandmarks ({ commit }) {
    return new Promise((resolve) => {
      Vue.http.get('/static/json/landmarks.json').then((response) => {
        var landmarks = response.body.documents;
        commit('getLandmarks', { landmarks: landmarks });
        resolve();
      });
    });
  },
  getAllFeatures ({ commit }) {
    return new Promise((resolve) => {
      Vue.http.get('/static/json/features.json').then((response) => {
        var features = response.body.documents;
        commit('getFeatures', { features: features });
        resolve();
      });
    });
  },
  getAllContinents ({ commit }) {
    return new Promise((resolve) => {
      Vue.http.get('/static/json/continents.json').then((response) => {
        var continents = response.body.documents;
        commit('getContinents', { continents: continents });
        resolve();
      });
    });
  }
};

const mutations = {
  getCities (state, { cities }) {
    state.cities = cities;
  },
  getNations (state, { nations }) {
    state.nations = nations;
  },
  getFeatures (state, { features }) {
    state.features = features;
  },
  getLandmarks (state, { landmarks }) {
    state.landmarks = landmarks;
  },
  getContinents (state, { continents }) {
    state.continents = continents;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
