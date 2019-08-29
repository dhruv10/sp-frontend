import Vue from 'vue';
import Router from 'vue-router';
import AddSchool from './views/master-admin/AddSchool.vue';
import Classrooms from './views/school/Classrooms.vue';
import SalaryGrade from './views/school/SalaryGrade.vue';
import Department from './views/school/Department.vue';
import Student from './views/school/Student.vue';
import Syllabus from './views/school/Syllabus.vue';
import Subjects from './views/school/Subjects.vue';
import Teachers from './views/school/Teachers.vue';
import Receptionist from './views/school/Receptionist.vue';

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
    {
      path: '/school',
      component: () => import(/* webpackChunkName: "layout" */ './views/common/Layout.vue'),
      children: [
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
          path: 'receptionist',
          component: Receptionist,
        },
      ],
    },
  ],
});
