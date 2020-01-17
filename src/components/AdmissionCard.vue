<template>
  <div class="card">
    <div class="card-content">
      <div class="columns col">
        <div class="column inner-col is-2">
          <p class="title is-5">{{ admissionDetailList.name }}</p>
          <p class="subtitle is-6">{{ admissionDetailList.dob }}</p>
        </div>

        <div class="column inner-col is-1 right-container">
          <p class="picked-title title is-6 m-0">{{ admissionDetailList.class }}</p>
        </div>

        <div class="column inner-col is-2">
          <p class="is-6">(F) {{ admissionDetailList.fPhone }}</p>
          <p class="is-6">(M) {{ admissionDetailList.mPhone }}</p>
        </div>

        <div class="column inner-col ml-1 is-3">
          <p class="sub-title is-6">{{ admissionDetailList.address }}</p>
        </div>

        <div class="column inner-col is-2 right-container">
          <p class="title is-6">
            <b-tag rounded :type="testStatus.color">{{ testStatus.text }}</b-tag>
          </p>
        </div>
        <div class="column inner-col is-2">
          <div class="btn-details" v-if="admissionDetailList.status === 0">
            <b-button type="is-primary" size="is-small" @click="openModal()">Schedule Test</b-button>
          </div>
          <div class="status" v-else-if="admissionDetailList.status === 1">
            <p class="title is-6" v-if="testDateLeft">{{admissionDetailList.testScheduledDate }}</p>
            <b-button v-else type="is-primary" size="is-small" @click="openModal()">Add Result</b-button>
          </div>
          <div class="right-container" v-else>
            <b-button
              type="is-primary"
              size="is-small"
              @click="openModal()"
              v-if="admissionDetailList.isPass"
            >Schedule Interview</b-button>
            <p v-else class="completed">Application Closed</p>
          </div>
          <div class="btn-details" v-if="admissionDetailList.isPass">
            <a class="cancel" @click="deleteRequest">Cancel Admission</a>
          </div>
        </div>
      </div>
    </div>
    <b-modal :active.sync="openActionModal" :width="400" scroll="keep">
      <AdmissionStatusModal
        :action="admissionDetailList.status"
        @closeModal="closeModal"
        @setDate="setDate"
        @setResult="setResult"
      />
    </b-modal>
  </div>
</template>

<script>
import AdmissionStatusModal from './AdmissionStatusModal.vue';

const STATUSES = {
  SCHEDULE_TEST: 0,
  RESULT_AWAITING: 1,
  RESULT_DECLARED: 2,
};

export default {
  data() {
    return {
      openActionModal: false,
      testDateLeft: true,
      dateToday: new Date().toLocaleDateString(),
    };
  },
  props: {
    admissionDetailList: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    AdmissionStatusModal,
  },
  mounted() {
    // TODO: fix action overflowing layout
    console.log(this.admissionDetailList.testScheduledDate, this.dateToday);
    if (this.admissionDetailList.testScheduledDate < this.dateToday) this.testDateLeft = false;
    else this.testDateLeft = true;
  },
  computed: {
    testStatus() {
      const { status } = this.admissionDetailList;
      let res = { text: '', color: '' };
      if (status === STATUSES.SCHEDULE_TEST) {
        res = {
          text: 'Not Scheduled',
          color: 'is-info',
        };
      } else if (status === STATUSES.RESULT_AWAITING) {
        res = {
          text: 'Awaiting',
          color: 'is-warning',
        };
      } else {
        res = {
          text: this.admissionDetailList.isPass ? 'Pass' : 'Fail',
          color: this.admissionDetailList.isPass ? 'is-success' : 'is-danger',
        };
      }

      return res;
    },
  },
  methods: {
    closeModal() {
      this.openActionModal = false;
    },
    openModal() {
      this.openActionModal = true;
    },
    setDate(date) {
      this.$emit('nextAction', new Date(date).toLocaleDateString());
      console.log(this.admissionDetailList.testScheduledDate, this.dateToday);

      if (this.admissionDetailList.testScheduledDate < this.dateToday) this.testDateLeft = false;
      else this.testDateLeft = true;
    },
    setResult(result) {
      this.$emit('nextAction', result);
    },
    deleteRequest() {
      this.$emit('deleteAdmissionQuery', this.admissionDetailList);
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
.col {
  align-items: center !important;
}
.inner-col {
  padding: 0px !important;
}
.ml-1 {
  margin-left: 2rem;
}
.completed {
  font-size: 14px;
  font-weight: 500;
}
</style>
