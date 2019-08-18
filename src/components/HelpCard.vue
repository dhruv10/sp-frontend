<template>
  <div class="card">
    <div class="help-card-title">
      <header class="card-header" card-header-color="red">
        <p class="card-header-title header-color">
          Leave us a message
        </p>
        <a href="#" class="card-header-icon" aria-label="more options">
          <span class="icon" @click="closeCard()">
            <b-icon
              class="header-color"
              icon="minus"
              size="is-small">
            </b-icon>
          </span>
        </a>
      </header>
    </div>
  <div class="card-content">
    <div class="content card-area">
      <b-field label="Your name (optional)">
        <b-input></b-input>
      </b-field>
      <b-field label="Email address">
        <b-input type="email"></b-input>
      </b-field>
      <b-field label="How can we help you?">
        <b-input type="textarea"></b-input>
      </b-field>
    </div>
  </div>
  <div class="footer-buttons">
    <b-button outlined type="is-primary" class="cancel-button">Cancel</b-button>
    <b-button type="is-primary">Send</b-button>
  </div>
</div>
</template>

<script>
export default {
  methods: {
    closeCard() {
      console.log('here');
      this.$emit('closeCard');
    },
  },
};
</script>

<style lang="scss">
@import '../styles/app.global.scss';
.help-card-title {
  background: $primary-color
}
.card-area {
  margin-bottom: 50px;
}
.footer-buttons {
  position: absolute;
  right: 10px;
  bottom:10px;
  .cancel-button {
    margin-right: 20px;
  }
}
.header-color {
  color: white
}
</style>
