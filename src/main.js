import Vue from 'vue';
import Buefy from 'buefy';
import VueTour from 'vue-tour';
import App from './App.vue';
import router from './router';
import store from './store';
import 'buefy/dist/buefy.css';
import './registerServiceWorker';
import './init-axios';
import './init-ismobile';
import './init-file-upload';

require('vue-tour/dist/vue-tour.css');

Vue.use(VueTour);

Vue.use(Buefy, {
  defaultIconPack: 'fas',
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
