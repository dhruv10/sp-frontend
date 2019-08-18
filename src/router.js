import Vue from 'vue';
import Router from 'vue-router';
import AddSchool from './views/master-admin/AddSchool.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "login" */ './views/common/Login.vue'),
    },
    {
      path: '/master-admin',
      component: () => import(/* webpackChunkName: "layout" */ './views/common/Layout.vue'),
      children: [
        {
          path: 'add-school',
          component: AddSchool,
        },
      ],
    },
  ],
});
