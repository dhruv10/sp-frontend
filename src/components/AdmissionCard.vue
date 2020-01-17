<template>
  <div class="card">
    <div class="card-content">
      <div class="columns col">
        <div class="column inner-col is-2">
          <p class="title is-5">Sakshi Srivastava</p>
          <p class="subtitle is-6">03/10/1998</p>
        </div>

        <div class="column inner-col is-1 right-container">
          <p class="picked-title title is-6 m-0">7</p>
        </div>

        <div class="column inner-col is-1">
          <p class="is-6">8595475182</p>
          <p class="is-6">9968516771</p>
        </div>

        <div class="column inner-col ml-1 is-2">
          <p class="sub-title is-6">CD - 199 pitampura delhi - 110034</p>
        </div>

        <div class="column is-3"></div>
        <div class="column inner-col is-1 right-container">
          <p class="title is-6">
            <b-tag rounded type="is-warning">Awaiting</b-tag>
          </p>
        </div>
        <div class="column inner-col is-2">
          <div class="btn-details" v-if="!scheduledDate">
            <b-button type="is-primary" size="is-small" @click="scheduleTest()">Schedule Test</b-button>
          </div>
          <div class="status" v-else-if="!result">
            <b-button type="is-primary" size="is-small" @click="AddResult()">Add Result</b-button>
          </div>
          <div class="right-container" v-else>
            <b-tag rounded :type="result == 'Pass' ? 'is-success' : 'is-danger'">{{ result }}</b-tag>
          </div>
          <div class="btn-details">
            <a class="cancel" @click="deleteRequest">Cancel Admission</a>
          </div>
        </div>
      </div>
    </div>
    <b-modal :active.sync="openScheduleTest" :width="640" scroll="keep">
      <AdmissionStatusModal :isScheduleTest="isScheduleTest" @closeModal="closeModal" @setDate="setDate" @setResult="setResult" />
    </b-modal>
  </div>
</template>

<script>
import AdmissionStatusModal from './AdmissionStatusModal.vue';

export default {
  data() {
    return {
      isScheduleTest: true,
      openScheduleTest: false,
      scheduledDate: null,
      result: null,
    };
  },
  components: {
    AdmissionStatusModal,
  },
  methods: {
    scheduleTest() {
      this.isScheduleTest = true;
      this.openScheduleTest = true;
    },
    closeModal() {
      this.openScheduleTest = false;
    },
    AddResult() {
      this.isScheduleTest = false;
      this.openScheduleTest = true;
    },
    setDate(date) {
      this.scheduledDate = new Date(date).toLocaleDateString();
    },
    setResult(result) {
      this.result = result;
    },
    deleteRequest() {
      const { dialog, snackbar } = this.$buefy;
      dialog.confirm({
        title: 'Deleting Gatepass Request',
        message:
          'Are you sure you want to <b>delete</b> this Admission request? This action cannot be undone.',
        confirmText: 'Delete Admission',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.loading = true;
          setTimeout(() => {
            snackbar.open('Admission deleted!');
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
@import "../styles/app.global.scss";

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
.ml-1 {
  margin-left: 2rem;
}
</style>
