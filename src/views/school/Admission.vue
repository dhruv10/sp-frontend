<template>
  <div class="admission-root-container">
    <div class="card">
      <div class="info-header">
        <h1 class="admission-title">Admission</h1>
        <div>
          <b-button
            type="is-primary"
            icon-left="plus"
            rounded
            @click="openAdmissionForm"
          >Addmission Form</b-button>
        </div>
      </div>
      <div class="card-content">
        <div class="card">
          <div class="card-content">
            <div class="columns">
              <div class="column is-2">
                <p class="title is-6">Student</p>
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
        <div v-for="detail in admissionDetailList" :key="detail._id">
          <AdmissionCard
            :admissionDetailList="detail"
            @nextAction="nextAction(detail, $event)"
            @deleteAdmissionQuery="deleteAdmissionQuery"
          />
        </div>
      </div>
    </div>
    <b-modal :active.sync="openModal" :width="640" scroll="keep">
      <AdmissionForm @closeModal="closeModal"/>
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
      admissionDetailList: [],
    };
  },
  mounted() {
    this.admissionDetailList.push({
      name: 'Sakshi Srivastava',
      class: 4,
      dob: '03/10/1999',
      mPhone: 88928292829,
      fPhone: 19392029991,
      address: 'CD 199 Pitampura delhi',
      status: 0,
      isPass: true,
      testScheduledDate: '',
      _id: '',
    });
  },
  methods: {
    getTableData() {
      this.loading = true;
      // this.$http
      //   .get("/gatepass")
      //   .then(res => {
      //     this.loading = false;
      //     this.gatepassData = res.data.results;
      //   })
      //   .catch(e => {
      //     console.log(e);
      //     this.loading = false;
      //   });
    },
    closeModal() {
      this.openModal = false;
    },
    openAdmissionForm() {
      this.openModal = true;
    },
    nextAction(detail, data) {
      const index = this.admissionDetailList.findIndex(admission => admission._id === detail._id);
      if (detail.status === 0) this.admissionDetailList[index].testScheduledDate = data;
      else this.admissionDetailList[index].isPass = data;
      this.admissionDetailList[index].status += 1;
    },
    deleteAdmissionQuery(rowinfo) {
      console.log(rowinfo);
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
</style>
