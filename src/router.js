import Vue from 'vue';
import Router from 'vue-router';
import School from './views/master-admin/School.vue';
import Classrooms from './views/school/Classrooms.vue';
import SalaryGrade from './views/school/SalaryGrade.vue';
import Department from './views/school/Department.vue';
import Student from './views/school/Student.vue';
import Syllabus from './views/school/Syllabus.vue';
import Subjects from './views/school/Subjects.vue';
import Teachers from './views/school/Teachers.vue';
import Receptionist from './views/school/Receptionist.vue';
import Admission from './views/school/Admission.vue';
import FeeDeposit from './views/school/FeeDeposit.vue';
import Transport from './views/school/Transport.vue';
import EasyInvoicing from './views/school/EasyInvoicing.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
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
          component: School,
        },
      ],
    },
    {
      path: '/school',
      component: () => import(/* webpackChunkName: "layout" */ './views/common/Layout.vue'),
      children: [
        {
          path: '/',
          redirect: 'classrooms',
        },
        {
          path: 'classrooms',
          component: Classrooms,
        },
        {
          path: 'salary-grade',
          component: SalaryGrade,
        },
        {
          path: 'department',
          component: Department,
        },
        {
          path: 'student',
          component: Student,
        },
        {
          path: 'syllabus',
          component: Syllabus,
        },
        {
          path: 'subjects',
          component: Subjects,
        },
        {
          path: 'teachers',
          component: Teachers,
        },
        {
          path: 'easy-invoicing',
          component: EasyInvoicing,
        },
      ],
    },
    {
      path: '/accounts',
      component: () => import(/* webpackChunkName: "layout" */ './views/common/Layout.vue'),
      children: [
        {
          path: '/',
          component: FeeDeposit,
        },
        {
          path: 'transport',
          component: Transport,
        },
      ],
    },
    {
      path: '/receptionist',
      component: () => import(/* webpackChunkName: "layout" */ './views/common/Layout.vue'),
      children: [
        {
          path: '/',
          component: Receptionist,
        },
        {
          path: 'admission',
          component: Admission,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login') next(true);
  else if (localStorage.getItem('auth_token') !== null) next(true);
  else next('/login');
});

export default router;
