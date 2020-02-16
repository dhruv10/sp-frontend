<template>
  <div class="columns main-container">
    <div class="column side-col-1"></div>
    <div class="column">
      <div class="side-col-2 ml-3 mr-3">
        <div class="header">StudentPress</div>
        <p class="title-head">Hi Welcome Back</p>
        <p class="sub-title-head">
          Please enter your school registered email id and password to proceed
        </p>
        <b-field message class="input-container">
          <b-input
            size="is-medium"
            type="email"
            class="input-box"
            placeholder="name@domain.com"
            v-model="email"
          ></b-input>
        </b-field>
        <b-field message class="input-container">
          <b-input
            size="is-medium"
            type="password"
            class="input-box"
            password-reveal
            placeholder="**********"
            v-model="password"
          ></b-input>
        </b-field>
        <b-button class="next-button" :type="startLoading ? 'is-loading is-primary is-medium' : 'is-primary is-medium'" @click="login()">
          <span class="button-text">Login</span>
          <b-icon icon="arrow-right" size="is-small"></b-icon>
        </b-button>
        <div class="help-card-container" v-if="helpCard">
          <help-card @closeCard="closeHelpCard"></help-card>
        </div>
        <div class="buttons help-button-container" v-else>
          <b-button class="help-button" type="is-primary is-medium" rounded @click="openHelpCard()">
            <b-icon icon="question-circle" size="is-small"></b-icon>
            <span class="button-heading">Help</span>
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HelpCard from '../../components/HelpCard.vue';

export default {
  name: 'login',
  data() {
    return {
      helpCard: false,
      email: '',
      password: '',
      startLoading: false,
    };
  },
  components: {
    HelpCard,
  },
  mounted() {
    document.addEventListener('keyup', this.loginWithEnter);
  },
  destroyed() {
    document.removeEventListener('keyup', this.loginWithEnter);
  },
  methods: {
    loginWithEnter(e) {
      if (e.keyCode === 13) {
        this.login();
      }
    },
    login() {
      const { snackbar } = this.$buefy;
      this.startLoading = true;
      if (this.email === '') {
        this.startLoading = false;
        snackbar.open({
          message: 'Email field is missing!',
          type: 'is-danger',
        });
        return;
      }
      // eslint-disable-next-line no-useless-escape
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(this.email.toLowerCase())) {
        this.startLoading = false;
        snackbar.open({
          message: 'Email field is not in correct format!',
          type: 'is-danger',
        });
        return;
      }
      if (this.password === '') {
        this.startLoading = false;
        snackbar.open({
          message: 'Password field is missing!',
          type: 'is-danger',
        });
        return;
      }
      this.$http.post('/auth/signin', {
        email: this.email,
        password: this.password,
      }).then((res) => {
        this.startLoading = false;
        localStorage.setItem('auth_token', res.data.token);
        localStorage.setItem('userEmail', res.data.user.basicInfo.personalEmail);
        localStorage.setItem('schoolId', res.data.user.basicInfo.schoolId);
        snackbar.open('Logged in succesfully!');
        this.$router.push('/school');
      })
        .catch((e) => {
          this.startLoading = false;
          snackbar.open({
            message: e.response && e.response.data && e.response.data.errors && e.response.data.errors.message,
            type: 'is-danger',
          });
        });
    },
    openHelpCard() {
      this.helpCard = true;
    },
    closeHelpCard() {
      this.helpCard = false;
    },
  },
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
        .input-box {
          width: 33.5rem;
          text-align: center;
          font-size: 10px;
        }
      }
      .help-card-container {
        z-index: 10;
        position: absolute;
        right: 20px;
        bottom: 20px;
        width: 23%
      }
      .next-button {
        margin-top: 30px;
        padding-right: 50px;
        padding-left: 50px;
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
