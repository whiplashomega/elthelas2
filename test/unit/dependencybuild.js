import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import marked from 'marked';
import 'bootstrap';
import store from '@/model';

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
  return marked(input);
});

Vue.use(BootstrapVue);
Vue.config.productionTip = false;
Vue.config.ignoredElements = ['gcse:search'];

var compbuilder = function(component) {
  return new Vue({
    el: '#app',
    components: { component },
    template: '<component/>',
    store
  }).$mount();
};

export { Vue, compbuilder };
