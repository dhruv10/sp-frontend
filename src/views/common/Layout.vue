<template>
  <div class="root-container">
    <div class="main-layout">
      <div>
        <div
          class="side-menu-container"
          v-show="menuOpen"
        >
          <side-menu :config="sideMenuConfig"></side-menu>
        </div>
      </div>
      <div class="body" :style="{ width: menuOpen ? 'calc(100% - 250px)' : '100%' }">
        <app-header
          :expanded="!menuOpen"
          @toggleMenu="toggleMenu"
        />
        <div style="padding: 20px">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideMenu from '@/components/SideMenu';
import AppHeader from '@/components/Header';

const SideMenuConfig = {
  title: 'MENU',
  icon: 'school',
  options: [
    {
      title: 'Manage',
      icon: 'cog',
      route: '/school',
      children: [
        {
          icon: 'chalkboard-teacher',
          label: 'Classrooms',
          route: '/classrooms',
        },
        {
          icon: 'user-graduate',
          label: 'Student',
          route: '/student',
        },
        {
          icon: 'folder',
          label: 'Subjects',
          route: '/subjects',
        },
        {
          icon: 'table',
          label: 'Salary Grade',
          route: '/salary-grade',
        },
        {
          icon: 'chess-rook',
          label: 'Teachers',
          route: '/teachers',
        },
        {
          icon: 'user-graduate',
          label: 'Syllabus',
          route: '/syllabus',
        },
        {
          icon: 'box',
          label: 'Department',
          route: '/department',
        },
        {
          icon: 'box',
          label: 'Easy Invoicing',
          route: '/easy-invoicing',
        },
      ],
    },
    {
      title: 'Accounts',
      icon: 'cog',
      route: '/accounts',
      children: [
        {
          icon: '',
          label: 'Fee Deposit',
          route: '/',
        },
        {
          icon: '',
          label: 'Transport',
          route: '/transport',
        },
      ],
    },
    {
      title: 'Receptionist',
      icon: 'cog',
      route: '/receptionist',
      children: [
        {
          icon: '',
          label: 'Gatepass Records',
          route: '/',
        },
        {
          icon: '',
          label: 'Verfiy Gatepass',
          route: '/verify-gatepass',
        },
      ],
    },
    {
      title: 'Actions',
      icon: 'cog',
      route: '',
      children: [
        {
          icon: 'sign-out-alt',
          label: 'Logout',
          route: '/login',
          handler() {
            localStorage.clear();
          },
        },
      ],
    },
  ],
};

export default {
  components: {
    SideMenu,
    AppHeader,
  },
  data() {
    return {
      menuOpen: true,
      sideMenuConfig: SideMenuConfig,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/app.global.scss";
.root-container {
  width: 100%;
  .main-layout {
    display: flex;
  }
}
.side-menu-container {
  width: 250px;
  position: relative;
  transition: width 1s;
  box-shadow: black 1px 1px 12px -5px;
  padding-right: 0px;
  height: 100vh;
}
.body {
  width: calc(100% - 250px);
  padding-left: 0px;
}
</style>
