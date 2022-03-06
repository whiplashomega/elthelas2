// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueResource from 'vue-resource';
import { marked } from '../node_modules/marked/lib/marked.esm.js';
import 'bootstrap';
import App from './components/App';
import router from './router';
import store from './model';
import './registerServiceWorker';
// import VueSocketio from 'vue-socket.io';

var Sortable = typeof require === 'function'
  ? require('sortablejs')
  : window.Sortable;

Vue.directive('sortable', {
  bind: function (a, b) {
    var options = b || {};

    var sortable = new Sortable(a, options);

    return sortable;
  }
});

Vue.config.ignoredElements = ['gse:searchbox-only'];

Vue.filter('marked', function(input) {
  if (input) {
    return marked.parse(input);
  } else {
    return "";
  }
});

Vue.use(BootstrapVue);
Vue.use(VueResource);
console.log(window.location.hostname);
// Vue.use(VueSocketio, window.location.hostname);

Vue.config.productionTip = false;
Vue.config.ignoredElements = ['gcse:search'];
/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
});
export default app;
