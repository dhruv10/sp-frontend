<template>
  <div class="side-menu-root">
    <b-menu>
      <b-menu-list>
        <template slot="label">
          <div style="padding: 20px">
            <div class="columns">
              <div class="column is-4">
                <img
                  src="../assets/logo-2.jpeg"
                  alt="StudentPress logo"
                />
                <!-- <b-icon
                  :icon="config.icon"
                  size="is-large"
                  type="is-primary"
                ></b-icon> -->
              </div>
              <div class="column" style="padding: 0; padding-top: 14px;">
                <p
                  class="heading"
                  style="margin-top: 10px; font-size: 18px"
                >{{ config.title }}</p>
              </div>
            </div>
          </div>
        </template>
        <b-menu-item
          v-for="option in config.options"
          :key="option.title"
          :icon="option.icon"
          :expanded="true"
          animation="null"
        >
          <template
            slot="label"
          >
            {{ option.title }}
            <!-- <b-icon
              class="is-pulled-right"
              size="is-small"
              :icon="props.expanded ? '' : 'chevron-right'"
            ></b-icon> -->
          </template>
          <b-menu-item
            v-for="child in option.children"
            :key="child.title"
            :icon="child.icon"
            :label="child.label"
            :active="fullRoute === option.route + child.route"
            @click="navigateTo(option.route, child.route, child.handler)"
          ></b-menu-item>
        </b-menu-item>
      </b-menu-list>
    </b-menu>
  </div>
</template>

<script>
export default {
  props: {
    config: Object,
  },
  computed: {
    fullRoute() {
      return this.$route.fullPath;
    },
    parentRoute() {
      const routes = this.fullRoute.split('/');
      return `/${routes[1]}`;
    },
  },
  methods: {
    navigateTo(parentRoute, childRoute, handler) {
      if (handler) handler();
      this.$router.push(parentRoute + childRoute);
    },
  },
};
</script>

<style lang="scss">
.side-menu-root {
  width: 234px;
  // margin-top: 20px;
  // margin-left: 2px;
  position: relative;
  // padding-right: 10px;
}

/* to add margin in side-menu child options */
div.column.is-2.side-menu-container
  > div
  > div
  > ul
  > li
  > ul
  > li
  > a
  > span:nth-child(2) {
  margin-left: 20px;
}

/* to add margin in side-menu parent options */
div.column.is-2.side-menu-container
  > div
  > div
  > ul
  > li
  > a
  > span.icon.is-small {
  margin-right: 20px;
}
/* to have no padding right in sidemenu options */
.menu-list li ul {
  border-left: 1px solid #dbdbdb;
  margin: 0.75em 0px 0.75em 0.75em;
  padding-left: 0px;
  padding-right: 0px;
}

.menu-list {
  overflow-y: scroll;
  height: 700px;
  padding-right: 10px;
}
</style>
