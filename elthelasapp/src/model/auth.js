/* globals localStorage */

import Vue from 'vue';
import ctest from './cordovatest.js';

var now = new Date();

const state = {
  loggedin: { token: localStorage.getItem('token'), username: localStorage.getItem('user') },
  googletoken: { token: localStorage.getItem('googletoken'), expiry: new Date(Number(localStorage.getItem('googleExpires'))) }
};

const getters = {
  isLoggedIn: (state) => {
    if (state.loggedin.token) {
      return true;
    } else {
      return false;
    }
  },
  isAdmin: (state) => {
    if (state.loggedin.token) {
      return state.loggedin.username.admin;
    } else {
      return false;
    }
  },
  getUserInfo: (state) => {
    return state.loggedin;
  },
  getGoogleToken: (state) => {
    if (state.googletoken.token && state.googletoken.expiry > now) {
      return state.googletoken;
    } else {
      state.googletoken = {};
      return false;
    }
  }
};

const actions = {
  login ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      Vue.http.post(ctest.baseUrl + 'users/login', { username: payload.username, password: payload.password }).then((response) => {
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
    Vue.http.post(ctest.baseUrl + 'users/register', user, (response) => {
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
    var token = state.loggedin.token;
    Vue.http.headers.common['Authorization'] = 'Basic ' + token;
  }
};

const mutations = {
  getCachedCredentials (state) {
  },
  "saveLogin" (state, { user, token }) {
    console.log("SAVE LOGIN TRIGGERED");
    console.log(user);
    Vue.http.headers.common['Authorization'] = 'Basic ' + token;
    state.loggedin = user;
    state.loggedin.token = token;
    localStorage.setItem('user', user.username);
    localStorage.setItem('token', user.token);
  },
  "LOGOUT"(state) {
    state.loggedin = false;
  },
  setOAuth(state, { params }) {
    var expires = new Date(now.getTime() + params.expires_in * 1000);
    state.googletoken = { token: params.access_token, expiry: expires };
    localStorage.setItem('googletoken', params.access_token);
    localStorage.setItem('googleExpires', expires.getTime());
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
