import Vue from 'vue';
import axios from 'axios';
import Buefy from 'buefy';
import localforage from 'localforage';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';
import 'buefy/dist/buefy.css';
import './registerServiceWorker';
import { AUTH_TOKEN } from './localstorage-keys';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/',
});

// http interceptor to add `authorization` field in requests
axios.interceptors.request.use(async () => ({
  headers: {
    authorization: `Bearer ${await localforage.getItem(AUTH_TOKEN)}`,
  },
}));

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
