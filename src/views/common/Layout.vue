<template>
	<div class="root-container">
		<div class="columns">
			<div class="column is-2 side-menu-container" v-show="menuOpen">
				<side-menu></side-menu>
			</div>
			<div class="column">
				<app-header @toggleMenu="toggleMenu" />
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
import SideMenu from '@/components/SideMenu';
import AppHeader from '@/components/Header';

export default {
  components: {
    SideMenu,
    AppHeader,
  },
  data() {
    return {
      menuOpen: true,
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
  transition: width 1s;
}
</style>
