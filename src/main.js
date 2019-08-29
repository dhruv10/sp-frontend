import Vue from 'vue';
import axios from 'axios';
import Buefy from 'buefy';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';
import 'buefy/dist/buefy.css';
import './registerServiceWorker';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/',
});

Vue.use(VueAxios, axiosInstance);

Vue.use(Buefy, {
  defaultIconPack: 'fas',
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
