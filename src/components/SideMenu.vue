<template>
  <div class="side-menu-root">
    <b-menu>
      <b-menu-list>
        <template slot="label">
          <div style="padding: 20px">
            <div class="columns">
              <div class="column is-4">
                <b-icon
                  :icon="config.icon"
                  size="is-large"
                  type="is-primary"
                ></b-icon>
              </div>
              <div class="column">
                <p
                  class="title"
                  style="margin-top: 10px"
                >{{ config.title }}</p>
              </div>
            </div>
          </div>
        </template>
        <b-menu-item
          v-for="option in config.options"
          :key="option.title"
          :icon="option.icon"
          :expanded="parentRoute === option.route"
          :active="parentRoute === option.route"
          animation="null"
        >
          <template
            slot="label"
            slot-scope="props"
          >
            {{ option.title }}
            <b-icon
              class="is-pulled-right"
              size="is-small"
              :icon="props.expanded ? '' : 'chevron-right'"
            >
            </b-icon>
          </template>
          <b-menu-item
            v-for="child in option.children"
            :key="child.title"
            :icon="child.icon"
            :label="child.label"
            :active="fullRoute === option.route + child.route"
            @click="navigateTo(option.route, child.route)"
          >
          </b-menu-item>
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
      return this.$router.currentRoute.path;
    },
    parentRoute() {
      const routes = this.fullRoute.split('/');
      return `/${routes[1]}`;
    },
  },
  methods: {
    navigateTo(parentRoute, childRoute) {
      this.$router.push(parentRoute + childRoute);
    },
  },
};
</script>

<style lang="scss">
.side-menu-root {
  position: fixed;
  margin-top: 20px;
  margin-left: 2px;
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
</style>
