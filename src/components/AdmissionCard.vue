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
          <div class="btn-details" v-if="!admissionDetail.testScheduledDate">
            <b-button type="is-primary" size="is-small" @click="openModal()">
              Schedule Test
            </b-button>
          </div>
          <div class="status" v-else-if="admissionDetail.testResult === 0 && admissionDetail.testScheduledDate">
            <p class="heading is-6" v-if="testDateLeft && false">
              Test on <br/><b>{{ new Date(Number(admissionDetail.testScheduledDate)).toLocaleDateString() }}</b>
            </p>
            <b-button v-else type="is-primary" size="is-small" @click="openModal()">Add Result</b-button>
          </div>
          <div class="right-container" v-else>
            <b-button
              type="is-primary"
              size="is-small"
              @click="openModal()"
              v-if="admissionDetail.testResult === 1"
            >Schedule Interview</b-button>
            <p v-else class="completed">Application Closed</p>
          </div>
          <div class="btn-details" v-if="admissionDetail.testResult === 1">
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
    if (this.admissionDetail.testScheduledDate < new Date()) this.testDateLeft = false;
    else this.testDateLeft = true;
  },
  computed: {
    testStatus() {
      const { testResult, testScheduledDate } = this.admissionDetail;
      let res = { text: '', color: '' };
      console.log('something', testScheduledDate);
      if (!testScheduledDate) {
        res = {
          text: 'Not Scheduled',
          color: 'is-info',
        };
      } else if (testResult === 1) {
        res = {
          text: 'Pass',
          color: 'is-success',
        };
      } else if (testResult === -1) {
        res = {
          text: 'Fail',
          color: 'is-danger',
        };
      } else if (testScheduledDate) {
        res = {
          text: 'Awaiting',
          color: 'is-warning',
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
      this.$emit('scheduleTest', new Date(date).getTime());
    },
    setResult(result) {
      console.log(result);
      this.$emit('updateTestResult', result ? 1 : -1);
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
