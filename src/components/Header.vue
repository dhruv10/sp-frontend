<template>
  <div
    class="header-root"
    :style="{ width: expanded ? '100%' : '84%', 'margin-left': expanded ? '12px' : null }"
  >
    <b-navbar>
      <template slot="brand">
        <a
          class="navbar-item"
          @click="toggleMenu"
        >
          <b-icon icon="bars"></b-icon>
        </a>
      </template>
      <template slot="start">
        <b-navbar-item class="is-primary">
          <p class="is-primary">
            <b>{{ schoolName }}</b>
          </p>
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="user">
            <b-navbar-item class="is-primary">
              <p class="is-primary"><b>Welcome, {{ userEmail }}</b></p>
            </b-navbar-item>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
export default {
  props: {
    expanded: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      schoolName: '',
      userEmail: '',
    };
  },
  methods: {
    toggleMenu() {
      this.$emit('toggleMenu');
    },
  },
  mounted() {
    this.schoolName = localStorage.getItem('schoolName');
    this.userEmail = localStorage.getItem('userEmail');
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/app.global.scss";

.header-root {
  box-shadow: 3px 2px 8px -5px;
  position: fixed;
  z-index: 10;
  width: 84%;
}
.userTag {
  font-weight: 800;
  color: $primary-color;
}
</style>
