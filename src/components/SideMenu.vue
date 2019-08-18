<template>
	<div class="side-menu-root">
		<b-menu>
			<b-menu-list label="Menu" icon="school-alt">
				<b-menu-item icon="information-outline" label="Info"></b-menu-item>
				<b-menu-item icon="settings" active expanded>
					<template slot="label" slot-scope="props">
						Getting Started
						<b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-down' : 'menu-up'">
						</b-icon>
					</template>
					<b-menu-item icon="account" label="Send Announcement"></b-menu-item>
					<b-menu-item icon="cellphone-link" label="School Calendar"></b-menu-item>
					<b-menu-item icon="cash-multiple" label="Payments" disabled></b-menu-item>
				</b-menu-item>
				<b-menu-item icon="account" label="My Account">
					<b-menu-item label="Account data"></b-menu-item>
					<b-menu-item label="Addresses"></b-menu-item>
				</b-menu-item>
			</b-menu-list>
			<b-menu-list>
				<b-menu-item label="Expo" icon="link" tag="router-link" target="_blank" to="/expo">
				</b-menu-item>
			</b-menu-list>
			<b-menu-list label="Actions">
				<b-menu-item label="Logout"></b-menu-item>
			</b-menu-list>
		</b-menu>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.side-menu-root {
  margin-top: 20px;
  margin-left: 2px;
}
</style>
