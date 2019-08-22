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
          animation="null"
        >
          <template
            slot="label"
            slot-scope="props"
          >
            {{ option.title }}
            <b-icon
              class="is-pulled-right"
              :icon="props.expanded ? 'chevron-up' : 'chevron-right'"
            >
            </b-icon>
          </template>
          <b-menu-item
            v-for="child in option.children"
            :key="child.title"
            :icon="child.icon"
            :label="child.label"
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
  methods: {
    navigateTo(parentRoute, childRoute) {
      this.$router.push(parentRoute + childRoute);
    },
  },
};
</script>

<style lang="scss" scoped>
.side-menu-root {
  margin-top: 20px;
  margin-left: 2px;
}
</style>
