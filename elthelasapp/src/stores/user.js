/* globals localStorage */

import axios from 'axios';

var now = new Date();

export default {
  state: () => {
    return {
      loggedin: { token: localStorage.getItem('token'), username: localStorage.getItem('user'), admin: localStorage.getItem('admin'), themesetting: localStorage.getItem('themesetting') },
      googletoken: { token: localStorage.getItem('googletoken'), expiry: new Date(Number(localStorage.getItem('googleExpires'))) },
      darkmode: "light",
    };
  },
  getters: {
    isLoggedIn: (state) => {
      if (state.loggedin.token) {
        return true;
      } else {
        return false;
      }
    },
    isAdmin: (state) => {
      if (state.loggedin.token) {
        return state.loggedin.admin;
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
  },
  actions: {
    switchTheme () {
      if (this.darkmode === "light") {
        this.darkmode = "dark";
      } else {
        this.darkmode = "light";
      }
      localStorage.setItem('themesetting', this.darkmode);
    },
    loadTheme () {
      let temp = localStorage.getItem('themesetting');
      if (temp === "dark" || temp === "light") {
        this.darkmode = temp;
      }
    },
    login (payload) {
      return new Promise((resolve, reject) => {
        axios.post('/users/login', { username: payload.username, password: payload.password }).then((response) => {
          if (response.status === 200) {
            this.saveLogin({ user: response.data.user, token: response.data.token });
            resolve(true);
          } else {
            resolve(false);
          }
        }).catch((response) => {
          console.log(response);
          resolve(false);
        });
      });
    },
    changePassword (user) {
      return new Promise((resolve, reject) => {
        axios.put('/users/' + user.username + "?token=" + this.loggedin.token, user).then((response) => {
          if (response.status === 200) {
            this.saveLogin({ user: response.data.user, token: response.data.token });
            resolve(response);
          } else {
            resolve(response);
          }
        }).catch((response) => {
          reject(response);
        });
      });
    },
    register (user) {
      return new Promise ((resolve) => {
        if (user.password !== user.passwordConfirm) {
          resolve(false);
        }
        axios.post('/users/register', user, (response) => {
          if (response.status === 200) {
            this.saveLogin({ user: response.data.user, token: response.data.token });
            resolve(true);
          } else {
            resolve(false);
            console.log(response);
          }
        }, 'application/json').catch((response) => {
          alert("registration error");
          console.log(response);
          resolve(false);
        });
      });
    },
    logout () {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      localStorage.removeItem("user");
      localStorage.removeItem("themesetting");
      axios.defaults.headers.common['Authorization'] = "";
      this.loggedin = false;
    },
    saveAuthHeader() {
      var token = this.loggedin.token;
      axios.defaults.headers.common['Authorization'] = 'Basic ' + token;
    },
    saveLogin ({ user, token }) {
      axios.defaults.headers.common['Authorization'] = 'Basic ' + token;
      this.loggedin = user;
      this.loggedin.token = token;
      localStorage.setItem('user', user.username);
      localStorage.setItem('admin', user.admin);
      localStorage.setItem('token', user.token);
    },
    setOAuth({ params }) {
      var expires = new Date(now.getTime() + params.expires_in * 1000);
      this.googletoken = { token: params.access_token, expiry: expires };
      localStorage.setItem('googletoken', params.access_token);
      localStorage.setItem('googleExpires', expires.getTime());
    }
  }
};
