<template>
  <article class="message is-dark" :style="styles">
    <div class="message-header">
      <div class="d-flex">
        <slot name="header">
          <b-icon :icon="topIcon" size="is-small"></b-icon>
          <p class="icon-style">{{ message }}</p>
        </slot>
      </div>
      <div class="is-small open" @click="navigate(route)">
        <b-icon :class="colorClass" icon="external-link-alt" size="is-small"></b-icon>
      </div>
    </div>
    <div class="card-content">
      <div class="level is-mobile">
        <slot name="body">
          <div class="level-item">
            <div class="is-widget-label">
              <h3 class="subtitle is-spaced">{{ title }}</h3>
              <h1 class="title">
                <div>{{ value }}</div>
              </h1>
            </div>
          </div>
          <div class="level-item has-widget-icon icon-style" @click="navigate(route)">
            <b-icon :class="colorClass" :icon="mainIcon" size="is-large"></b-icon>
          </div>
        </slot>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'InfoCard',
  props: {
    title: {
      type: String,
      required: false,
    },
    value: {
      type: [String, Number],
      required: false,
    },
    route: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: false,
    },
    mainIcon: {
      type: String,
      required: false,
    },
    colorClass: {
      type: String,
      required: false,
    },
    topIcon: {
      type: String,
      default: 'home',
      required: false,
    },
    styles: {
      type: String,
      required: false,
    },
  },
  methods: {
    navigate(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style scoped>
.message.is-dark .message-header {
  background-color: #f5f5f5 !important;
  color: #000 !important;
}
.icon-style {
  margin-left: 1rem;
  cursor: pointer;
}
.message-header {
  /* justify-content: flex-start; */
  align-items: center;
}
.d-flex {
  display: flex;
}
.open {
  border: none !important;
  outline: none;
  cursor: pointer;
}
</style>
