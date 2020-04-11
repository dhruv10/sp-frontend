<template>
  <div>
    <div class="card">
      <div :class="{
        'card-content': true,
        'closed-card-background': gatepassData && gatepassData.closed
      }">
        <div class="columns col">
          <div class="column inner-col is-3">
            <p class="title is-5">
              {{ gatepassData.student && gatepassData.student.basicInfo.name }}
            </p>
            <p
              class="subtitle is-6"
            >{{ gatepassData.student && gatepassData.student.class.classNumber }} - {{ gatepassData.student && gatepassData.student.class.classSection }}, {{ gatepassData.student && gatepassData.student.rollNo }}</p>
          </div>

          <div class="column inner-col is-3">
            <p class="picked-title title is-5 m-0">{{ gatepassData.guardianName }}</p>
            <p class="is-6">{{ gatepassData.guardianRelation }}, {{ gatepassData.guardianPhone }}</p>
            <!-- <p class="subtitle is-6 is-inline">Verified By:</p>
            <p class="title is-6 is-inline">Father</p>-->
          </div>

          <div class="column inner-col is-2">
            <!-- <p class="picked-title title is-6 m-0">Reason for picking:</p> -->
            <p class="is-6">{{ gatepassData.reason }}</p>
          </div>

          <div class="column inner-col is-2">
            <div class="right-container">
              <!-- <div>Fri, 26 Jan, 2019 (10:45)</div> -->
              <!-- <div class="mt-1"></div> -->
              <p class="title is-6">
                <b-tag rounded :type="verficationStatus.color">{{ verficationStatus.text }}</b-tag>
              </p>
            </div>
          </div>

          <div class="column inner-col is-2">
            <!-- <div class="status">
              <b-icon pack="fas" icon="exclamation-triangle" size="is-small" type="is-warning"></b-icon>
            </div>-->
            <div
              class="btn-details"
              v-if="!gatepassData.otpVerified && !gatepassData.checkoutAt && !gatepassData.closed && !otpLoading"
              id="v-step-3"
            >
              <otp-input @value="checkOtp" ref="otp" />
            </div>
            <div class="btn-details" v-else-if="otpLoading">
              <b-loading :is-full-page="false" :active.sync="otpLoading"></b-loading>
            </div>
            <div class="status" v-if="gatepassData.otpVerified && !gatepassData.closed" @click="downloadGatepass">
              <b-icon pack="fas" icon="download" size="is-medium" type="is-primary"></b-icon>
              <p class="download">Download Gatepass</p>
            </div>
            <div v-if="gatepassData.closed" class="closed">---</div>
            <div class="btn-details" v-if="!gatepassData.otpVerified && !gatepassData.closed">
              <a class="cancel" @click="deleteRequest">Cancel Request</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal :active.sync="openQRCodeModal" :width="640" scroll="keep">
      <QRCodeModal :gatePassId="gatepassData._id" :checkoutAt="gatepassData.checkoutAt" />
    </b-modal>
  </div>
</template>

<script>
import OtpInput from './common/OtpInput.vue';
import QRCodeModal from './QRCodeModal';

export default {
  data() {
    return {
      loading: false,
      verifying: false,
      verified: false,
      otpLoading: false,
      openQRCodeModal: false,
    };
  },
  props: {
    steps: {
      type: Array,
      default: () => [],
    },
    gatepassData: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    'otp-input': OtpInput,
    QRCodeModal,
  },
  computed: {
    verficationStatus() {
      const { closed, otpVerified, checkoutAt } = this.gatepassData;
      let res = { text: '', color: '' };
      if (!checkoutAt) {
        res = {
          text: 'Awaiting',
          color: 'is-warning',
        };
      } else if (otpVerified && checkoutAt) {
        res = {
          text: 'Completed',
          color: 'is-success',
        };
      }
      if (closed) {
        res = {
          text: 'Cancelled',
          color: 'is-danger',
        };
      }

      return res;
    },
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
          this.$http
            .patch(`/gatepass/${this.gatepassData._id}/close`)
            .then(() => {
              snackbar.open('Request deleted!');
              this.loading = false;
              this.$emit('getTableData');
            })
            .catch((e) => {
              snackbar.open('Error', e.message);
              this.loading = false;
            });
        },
      });
    },
    checkOtp(otp) {
      this.otpLoading = true;
      const { snackbar } = this.$buefy;
      this.$http
        .post('/gatepass/verify', { id: this.gatepassData._id, otp })
        .then(() => {
          this.$emit('getTableData');
          this.otpLoading = false;
          snackbar.open('OTP verified successfully!');
        })
        .catch((e) => {
          snackbar.open(e.message);
          this.otpLoading = false;
          this.$refs.otp.clearFields();
          snackbar.open('OTP verification failed!');
        });
    },
    downloadGatepass() {
      this.openQRCodeModal = true;
    },
  },
};
</script>

<style>
@import "../styles/app.global.scss";
.closed-card-background {
  background: #F1F1F1 !important;
  opacity: 0.7;
  cursor: not-allowed;
}
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
.closed {
  text-align: center;
  font-size: 22px;
}
</style>

<style scoped>
.v-tour__target--highlighted {
  box-shadow: 0 0 0 99999px rgba(0, 0, 0, 0.4);
}
</style>
