<template>
  <div class="root-container">
    <div class="columns">
      <div
        class="column is-2 side-menu-container"
        v-show="menuOpen"
      >
        <side-menu :config="sideMenuConfig"></side-menu>
      </div>
      <div class="column body">
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
}
.side-menu-container {
  position: relative;
  transition: width 1s;
  box-shadow: black 1px 1px 12px -5px;
  padding-right: 0px;
  height: 100vh;
}
.body {
  padding-left: 0px;
}
</style>
