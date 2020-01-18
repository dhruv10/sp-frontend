<template>
  <div class="card">
    <div class="card-content">
      <div class="columns col">
        <div class="column inner-col is-3">
          <p class="title is-5">Sakshi Srivastava</p>
          <p class="subtitle is-6">VI - A, 45</p>
        </div>

        <div class="column inner-col is-3">
          <p class="picked-title title is-5 m-0">Rekha Srivastava</p>
          <p class="is-6">Niece, 8585858593</p>
          <!-- <p class="subtitle is-6 is-inline">Verified By:</p>
          <p class="title is-6 is-inline">Father</p>-->
        </div>

        <div class="column inner-col is-2">
          <!-- <p class="picked-title title is-6 m-0">Reason for picking:</p> -->
          <p class="is-6">Family function at nani's home</p>
        </div>

        <div class="column inner-col is-2">
          <div class="right-container">
            <!-- <div>Fri, 26 Jan, 2019 (10:45)</div> -->
            <!-- <div class="mt-1"></div> -->
            <p class="title is-6">
              <b-tag rounded type="is-warning">Awaiting</b-tag>
            </p>
          </div>
        </div>

        <div class="column inner-col is-2">
          <!-- <div class="status">
              <b-icon pack="fas" icon="exclamation-triangle" size="is-small" type="is-warning"></b-icon>
          </div>-->
          <div class="btn-details" v-if="!verifying && !verified" id="v-step-3">
            <otp-input @value="checkOtp"/>
          </div>
          <div class="btn-details" v-else-if="verifying && !verified">hello</div>
          <div class="status" v-if="verified">
              <b-icon pack="fas" icon="download" size="is-medium" type="is-primary"></b-icon>
              <p class="download" @click="deleteRequest">Download Gatepass</p>
          </div>
          <div class="btn-details" v-else>
            <a class="cancel" @click="deleteRequest">Cancel Request</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OtpInput from './common/OtpInput.vue';

export default {
  data() {
    return {
      loading: false,
      verifying: false,
      verified: false,
    };
  },
  props: {
    steps: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    'otp-input': OtpInput,
  },
  methods: {
    deleteRequest() {
      const { dialog, snackbar } = this.$buefy;
      dialog.confirm({
        title: 'Deleting Gatepass Request',
        message:
          'Are you sure you want to <b>delete</b> this gatepass request? This action cannot be undone.',
        confirmText: 'Delete Request',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.loading = true;
          setTimeout(() => {
            snackbar.open('Request deleted!');
            this.loading = false;
          }, 2000);
        },
      });
    },
    checkOtp(otp) {
      this.verifying = true;
      console.log(otp);
      setTimeout(() => {
        const { snackbar } = this.$buefy;
        snackbar.open('OTP Verfied!');
        this.verifying = false;
        this.verified = true;
      }, 3000);
    },
  },
};
</script>

<style>
@import '../styles/app.global.scss';
.right-container {
  text-align: center;
}
.status {
  text-align: center;
  cursor: pointer;
}
.btn-details {
  text-align: center;
  margin-top: 2px;
}
.picked-title {
  margin: 0 !important;
}
.cancel {
  color: red;
  font-size: 12px;
}
.download {
  /* color: $primary-color; */
  font-size: 12px;
}
.col {
  align-items: center !important;
}
.inner-col {
  padding: 0px !important;
}
.otp {
  padding-right: 2px !important;
}
.otp-button {
  width: 50%;
  height: 70%;
}
.otp-input {
  height: 28px !important;
}
</style>

<style scoped>
.v-tour__target--highlighted {
  box-shadow: 0 0 0 99999px rgba(0,0,0,.4);
}
</style>
