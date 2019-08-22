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
      title: 'Setup',
      icon: 'cog',
      route: '/school',
      children: [
        {
          icon: 'chalkboard-teacher',
          label: 'Classrooms',
          route: '/classrooms',
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
          label: 'Students',
          route: '/students',
        },
        {
          icon: 'box',
          label: 'Department',
          route: '/department',
        },
      ],
    },
    {
      title: 'Account',
      icon: 'cog',
      children: [
        {
          icon: 'chalkboard-teacher',
          label: 'Classrooms',
        },
        {
          icon: 'folder',
          label: 'Students',
        },
        {
          icon: 'chess-rook',
          label: 'Teachers',
        },
        {
          icon: 'user-graduate',
          label: 'Students',
        },
      ],
    },
    {
      title: 'Actions',
      icon: 'cog',
      children: [
        {
          icon: 'sign-out-alt',
          label: 'Logout',
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
}
.body {
  padding-left: 0px;
}
</style>
