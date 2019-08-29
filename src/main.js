import Vue from 'vue';
import axios from 'axios';
import Buefy from 'buefy';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';
import 'buefy/dist/buefy.css';
import './registerServiceWorker';
import { AUTH_TOKEN } from './localstorage-keys';

const axiosInstance = axios.create({
  baseURL: 'https://studentpress-backend.herokuapp.com/api/',
});

// http interceptor to add `authorization` field in requests
const authToken = localStorage.getItem(AUTH_TOKEN);
axiosInstance.interceptors.request.use(config => ({
  ...config,
  headers: {
    authorization: `Bearer ${authToken}`,
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
