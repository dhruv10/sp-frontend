<template>
  <div class="card">
    <div class="help-card-title">
      <header class="card-header">
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
    <b-button outlined type="is-primary">Cancel</b-button>
    <b-button type="is-primary" class="send-button">Send</b-button>
  </div>
</div>
</template>

<script>
export default {
  methods: {
    closeCard() {
      this.$emit('closeCard');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/app.global.scss';
.help-card-title {
  background: $primary-color
}
.card-area {
  margin-bottom: 50px;
}
.footer-buttons {
  position: absolute;
  right: 20px;
  bottom:10px;
  .send-button {
    margin-left: 15px;
    padding: 0px 10px
  }
}
.header-color {
  color: white
}
</style>
