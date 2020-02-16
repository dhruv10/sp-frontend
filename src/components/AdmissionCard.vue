<template>
  <div class="card acard">
    <div class="card-content">
      <div class="columns col">
        <div class="column inner-col is-2">
          <p class="title is-5">{{ admissionDetail.name }}</p>
          <p class="subtitle is-6">{{ admissionDetail.dob }}</p>
        </div>

        <div class="column inner-col is-1 right-container">
          <p class="picked-title title is-6 m-0">{{ admissionDetail.class }}</p>
        </div>

        <div class="column inner-col is-2">
          <p class="is-6">(F) {{ admissionDetail.fPhone }}</p>
          <p class="is-6">(M) {{ admissionDetail.mPhone }}</p>
        </div>

        <div class="column inner-col ml-1 is-3">
          <p class="sub-title is-6">{{ admissionDetail.address }}</p>
        </div>

        <div class="column inner-col is-2 right-container">
          <p class="title is-6">
            <b-tag rounded :type="testStatus.color">{{ testStatus.text }}</b-tag>
          </p>
        </div>
        <div class="column inner-col is-2">
          <div class="btn-details" v-if="admissionDetail.status === 0">
            <b-button type="is-primary" size="is-small" @click="openModal()">Schedule Test</b-button>
          </div>
          <div class="status" v-else-if="admissionDetail.status === 1">
            <p class="heading is-6" v-if="testDateLeft">
              Test on <br/><b>{{ new Date(Number(admissionDetail.testScheduledDate)).toLocaleDateString() }}</b>
            </p>
            <b-button v-else type="is-primary" size="is-small" @click="openModal()">Add Result</b-button>
          </div>
          <div class="right-container" v-else>
            <b-button
              type="is-primary"
              size="is-small"
              @click="openModal()"
              v-if="admissionDetail.isPass"
            >Schedule Interview</b-button>
            <p v-else class="completed">Application Closed</p>
          </div>
          <div class="btn-details" v-if="admissionDetail.isPass">
            <a class="cancel" @click="deleteRequest">Cancel Admission</a>
          </div>
        </div>
      </div>
    </div>
    <b-modal :active.sync="openActionModal" :width="400" scroll="keep">
      <AdmissionStatusModal
        :action="admissionDetail.status"
        @closeModal="closeModal"
        @setDate="scheduleTest"
        @setResult="setResult"
      />
    </b-modal>
  </div>
</template>

<script>
import AdmissionStatusModal from './AdmissionStatusModal.vue';

const STATUSES = {
  NOT_SCHEDULED_YET: 0,
  RESULT_AWAITING: 1,
  RESULT_DECLARED: 2,
};

export default {
  data() {
    return {
      openActionModal: false,
      testDateLeft: true,
    };
  },
  props: {
    admissionDetail: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    AdmissionStatusModal,
  },
  mounted() {
    // TODO: fix action overflowing layout
    console.log(new Date(Number(this.admissionDetail.testScheduledDate)));
    if (this.admissionDetail.testScheduledDate < new Date()) this.testDateLeft = false;
    else this.testDateLeft = true;
  },
  computed: {
    testStatus() {
      const { status } = this.admissionDetail;
      let res = { text: '', color: '' };
      if (status === STATUSES.NOT_SCHEDULED_YET) {
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
          text: this.admissionDetail.isPass ? 'Pass' : 'Fail',
          color: this.admissionDetail.isPass ? 'is-success' : 'is-danger',
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
    scheduleTest(date) {
      this.$emit('scheduleTest', { date: new Date(date).getTime() });
    },
    setResult(result) {
      this.$emit('nextAction', result);
    },
    deleteRequest() {
      this.$emit('deleteAdmissionQuery', this.admissionDetail);
    },
  },
};
</script>

<style>

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
.acard {
  margin: 0 1px;
}
</style>
