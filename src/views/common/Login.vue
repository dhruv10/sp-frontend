<template>
  <div class="columns main-container">
    <div class="column side-col-1"></div>
    <div class="column">
      <div class="side-col-2 ml-3 mr-3">
        <div class="header">StudentPress</div>
        <p class="title-head">Hi Welcome Back</p>
        <p class="sub-title-head">Please enter your school registered email id to login</p>
        <b-field message class="input-container">
          <b-input
            size="is-medium"
            type="email"
            class="username-input"
            placeholder="name@domain.com"
          ></b-input>
        </b-field>
        <b-button class="next-button" type="is-primary is-medium">
          <span class="button-text">Next</span>
          <b-icon icon="arrow-right" size="is-small"></b-icon>
        </b-button>
        <div class="buttons help-button-container">
          <b-button class="help-button" type="is-primary is-medium" rounded>
            <b-icon icon="question-circle" size="is-small"></b-icon>
            <span class="button-heading">Help</span>
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
};
</script>

<style lang="scss" scoped>
@import '../../styles/app.global.scss';
.main-container {
  margin: 0px;
  .side-col-1 {
    height: 100vh;
    background: $primary-color;
  }
  .column {
    padding: 0px;
    .side-col-2 {
      text-align: left;
      .header {
        font-size: 30px;
        font-weight: 900;
        margin-top: 15px;
        margin-bottom: 12rem;
      }
      .title-head {
        font-size: 25px;
        font-weight: 700;
      }
      .sub-title-head {
        font-size: 17px;
      }
      .input-container {
        margin-top: 25px;
        .username-input {
          width: 30rem;
          text-align: center;
          font-size: 10px;
        }
      }
      .next-button {
        margin-top: 20px;
        padding-right: 40px;
        padding-left: 40px;
        .button-text {
          font-size: 18px;
        }
      }
      .help-button-container {
        position: absolute;
        right: 20px;
        bottom: 20px;
        .help-button {
          font-size: 18px;
          .button-heading {
            margin-left: 5px;
          }
        }
      }
    }
  }
}
</style>
