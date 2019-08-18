<template>
	<b-navbar>
		<template slot="brand">
			<a class="navbar-item" @click="toggleMenu">
				<b-icon icon="bars"></b-icon>
			</a>
		</template>
		<template slot="start">
			<b-navbar-item>
				Rajnikaant Public School
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

<style>
</style>
