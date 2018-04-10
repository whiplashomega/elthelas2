/* globals localStorage */

import Vue from 'vue';

const state = {
  loggedin: localStorage.getItem('token'),
  googletoken: ""
};

const getters = {
  isLoggedIn: (state) => {
    if (state.loggedin) {
      return true;
    } else {
      return false;
    }
  },
  getUserInfo: (state) => {
    return state.loggedin;
  },
  getGoogleToken: (state) => {
    return state.googletoken;
  }
};

const actions = {
  login ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      Vue.http.post('/users/login', { username: payload.username, password: payload.password }).then((response) => {
        if (response.status === 200) {
          commit('saveLogin', { user: response.body.user, token: response.body.token });
          resolve(response);
        } else {
          resolve(response);
        }
      }).catch((response) => {
        reject(response);
      });
    });
  },
  register ({ commit }, user) {
    if (user.password !== user.passwordConfirm) {
      return false;
    }
    Vue.http.post('/users/register', user, (response) => {
      if (response.status === 200) {
        commit('saveLogin', { user: response.body.user, token: response.body.token });
      } else {
        console.log(response);
      }
    }, 'application/json').catch((response) => {
      alert("registration error");
      console.log(response);
    });
  },
  logout ({ commit }) {
    localStorage.removeItem("token");
    Vue.http.headers.common['Authorization'] = "";
    commit("LOGOUT");
  },
  saveAuthHeader() {
    var token = state.loggedin;
    Vue.http.headers.common['Authorization'] = 'Basic ' + token;
  }
};

const mutations = {
  getCachedCredentials (state) {
  },
  "saveLogin" (state, { user, token, rememberme }) {
    console.log("SAVE LOGIN TRIGGERED");
    console.log(user);
    Vue.http.headers.common['Authorization'] = 'Basic ' + token;
    localStorage.setItem('token', token);
    state.loggedin = user;
    state.loggedin.token = token;
  },
  "LOGOUT"(state) {
    state.loggedin = false;
  },
  setOAuth(state, {token}) {
    state.googletoken = token;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
