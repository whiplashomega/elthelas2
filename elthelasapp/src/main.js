import { createApp } from 'vue';
import { createPinia, setMapStoreSuffix } from 'pinia';
import { BootstrapVue3 } from 'bootstrap-vue-3';
import { createMetaManager } from 'vue-meta';

import App from './App.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

const app = createApp(App);

setMapStoreSuffix('');
app.use(createPinia());
app.use(router);
app.use(BootstrapVue3);
app.use(createMetaManager());

app.mount('#app');
