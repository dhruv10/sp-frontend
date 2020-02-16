<template>
  <div
    class="header-root"
    :style="{ width: expanded ? '100%' : 'calc(100% - 250px)' }"
  >
    <b-navbar>
      <template slot="brand">
        <a
          class="navbar-item"
          @click="toggleMenu"
        >
          <b-icon icon="bars" type="is-light"></b-icon>
        </a>
        <p class="is-primary school-name">
          <b>{{ schoolName }}</b>
        </p>
          <!-- <div class="user">
            <p class="is-primary"><b>Welcome, {{ userEmail }}</b></p>
          </div> -->
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
    schoolName: String,
  },
  data() {
    return {
      userEmail: '',
    };
  },
  methods: {
    toggleMenu() {
      this.$emit('toggleMenu');
    },
  },
  mounted() {
    this.userEmail = localStorage.getItem('userEmail');
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/app.global.scss";
.navbar {
  color: white;
  background: $primary-color;
}
.header-root {
  box-shadow: 1px 1px 8px -5px;
  position: fixed;
  z-index: 10;
  width: 84%;
}
.school-name {
  display: flex;
  align-items: center;
}
.userTag {
  font-weight: 800;
  color: $primary-color;
}
</style>
