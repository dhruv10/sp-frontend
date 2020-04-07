<template>
  <div class="admission-root-container">
    <div class="card outer-card">
      <div class="info-header">
        <h1 class="admission-title">Admission</h1>
        <b-button
          type="is-primary"
          icon-left="plus"
          rounded
          @click="openAdmissionForm"
        >Admission Form</b-button>
      </div>
      <div class="card-content">
        <div class="card acard">
          <div class="card-content">
            <div class="columns">
              <div class="column is-2">
                <p class="title is-6">
                  <span @click="sortList" class="sortTitle">
                    Student
                    <span class="icon is-small" v-if="sortUp && !sortDown">
                      <i class="fas fa-arrow-up"></i>
                    </span>
                    <span class="icon is-small" v-if="!sortUp && sortDown">
                      <i class="fas fa-arrow-down"></i>
                    </span>
                  </span>
                </p>
              </div>
              <div class="column is-1 align">
                <p class="title is-6">Class</p>
              </div>
              <div class="column is-2">
                <p class="title is-6">Phone</p>
              </div>
              <div class="column is-3 ml-1">
                <p class="title is-6">Address</p>
              </div>
              <div class="column is-2 align">
                <p class="title is-6">Test Status</p>
              </div>
              <div class="column is-2 align">
                <p class="title is-6">Action</p>
              </div>
            </div>
          </div>
        </div>
        <div class="all-admissions">
          <div v-for="detail in paginatedAdmissionList" :key="detail._id">
            <AdmissionCard
              :admissionDetail="detail"
              @scheduleTest="scheduleTest(detail._id, $event)"
              @updateTestResult="updateTestResult(detail._id, $event)"
              @deleteAdmissionQuery="deleteAdmissionQuery"
            />
          </div>
        </div>
        <div class="add-pagination">
          <b-pagination
            :total="admissionDetailList.length"
            :current.sync="current"
            :simple="true"
            order="is-right"
            per-page="10"
            icon-prev="chevron-left"
            icon-next="chevron-right"
            @change="changePage"
          ></b-pagination>
        </div>
      </div>
    </div>
    <b-modal :active.sync="openModal" :width="640" scroll="keep">
      <AdmissionForm @closeModal="closeModal" />
    </b-modal>
  </div>
</template>

<script>
import AdmissionForm from '../../components/AdmissionForm';
import AdmissionCard from '../../components/AdmissionCard';

export default {
  components: {
    AdmissionForm,
    AdmissionCard,
  },
  data() {
    return {
      openModal: false,
      loading: false,
      current: 1,
      admissionDetailList: [],
      paginatedAdmissionList: [],
      originalAdmissionList: [],
      sortUp: false,
      sortDown: false,
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.loading = true;
      this.$http.get('/admission').then(({ data: { results: admissions } }) => {
        this.admissionDetailList = admissions.map(({
          studentDetails,
          fatherDetails,
          motherDetails,
          ...admissionDetails
        }) => ({
          name: studentDetails.name,
          class: studentDetails.classNumber,
          dob: new Date(Number(studentDetails.dateOfBirth)).toLocaleDateString(),
          mPhone: motherDetails.phoneNumber,
          fPhone: fatherDetails.phoneNumber,
          address: studentDetails.residentialAddress,
          _id: admissionDetails._id,
          testScheduledDate: admissionDetails.testDate,
          testResult: admissionDetails.testResult,
        }));
        console.log(this.admissionDetailList);
        this.originalAdmissionList = [...this.admissionDetailList];
        this.paginatedAdmissionList = this.admissionDetailList.slice(0, 10);
        this.loading = false;
      });
    },
    closeModal() {
      this.openModal = false;
    },
    openAdmissionForm() {
      this.openModal = true;
    },
    async updateTestResult(admissionId, result) {
      this.$http.patch(`/admission/${admissionId}/test?result=${result}`).then(() => {
        this.initData();
      });
    },
    async scheduleTest(admissionId, date) {
      this.$http.patch(`/admission/${admissionId}/schedule-test?date=${date}`).then(() => {
        this.initData();
      });
    },
    changePage() {
      this.paginatedAdmissionList = this.admissionDetailList.slice(
        this.current * 10,
        this.current * 10 + 10,
      );
    },
    sortList() {
      if (!this.sortUp && !this.sortDown) {
        this.sortUp = true;
        this.sortDown = false;
        this.paginatedAdmissionList = this.admissionDetailList.sort((a, b) => ((a.name > b.name) ? 1 : -1));
        // console.log(this.admissionDetailList);
      } else if (this.sortUp && !this.sortDown) {
        this.sortUp = false;
        this.sortDown = true;
        this.paginatedAdmissionList = this.admissionDetailList.sort((a, b) => ((a.name < b.name) ? 1 : -1));
      } else if (!this.sortUp && this.sortDown) {
        this.paginatedAdmissionList = this.originalAdmissionList;
        this.sortUp = false;
        this.sortDown = false;
      }
    },
    deleteAdmissionQuery() {
      // console.log(rowinfo);
      const { dialog } = this.$buefy;
      dialog.confirm({
        title: 'Deleting Admission Record',
        message:
          'Are you sure you want to <b>delete</b> your admission record? This action cannot be undone.',
        confirmText: 'Delete Admission Record',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.loading = true;
          // this.$http
          //   .delete(`/gatepass/${rowinfo._id}`)
          //   .then(() => {
          //     snackbar.open("Gatepass Record deleted!");
          //     this.getTableData();
          //     this.loading = false;
          //   })
          //   .catch(e => {
          //     console.log(e);
          //     this.loading = false;
          //   });
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/app.global.scss";
.admission-root-container {
  margin-top: 50px;
  height: 100%;
}
.outer-card {
  height: 90vh;
}
.acard {
  margin: 1px;
}
.columns {
  align-items: center !important;
}
.column {
  padding: 0px !important;
}
.align {
  text-align: center;
}
.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px 0px 25px;
}
.info-header > div > * {
  margin-left: 20px;
}
.main-contianer {
  margin-top: 50px;
}
.admission-title {
  font-size: 2rem;
  font-weight: 600;
}
.ml-1 {
  margin-left: 2rem;
}
.add-pagination {
  margin-top: 15px;
}
.all-admissions {
  overflow-y: scroll;
  height: 65vh;
}
.sortTitle {
  cursor: pointer;
}
</style>
