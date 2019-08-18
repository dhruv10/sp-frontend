<template>
	<div class="header-root">
		<b-navbar>
			<template slot="brand">
				<a class="navbar-item" @click="toggleMenu">
					<b-icon icon="bars"></b-icon>
				</a>
			</template>
			<template slot="start">
				<b-navbar-item class="is-primary">
					<p class="is-primary">
						<b>Rajnikaant Public School</b>
					</p>
				</b-navbar-item>
			</template>

			<template slot="end">
				<b-navbar-item tag="div">
					<div class="buttons">
						<b-button type="is-primary" icon-left="user" outlined>
							<strong>Welcome, Shikhar Seth</strong>
						</b-button>
					</div>
				</b-navbar-item>
			</template>
		</b-navbar>
	</div>
</template>

<script>
export default {
  methods: {
    toggleMenu() {
      this.$emit('toggleMenu');
    },
  },
};
</script>

<style scoped>
.header-root {
  box-shadow: 3px 2px 8px -5px;
  position: fixed;
  z-index: 10;
  width: 84%;
}
</style>
