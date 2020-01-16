<template>
  <div class="admission-root-container">
    <div class="card">
      <div class="info-header">
        <h1 class="gatepass-title">Admission</h1>
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
              <div class="column is-1">
                <p class="title is-6">Phone</p>
              </div>
              <div class="column is-2 ml-1">
                <p class="title is-6">Address</p>
              </div>
              <div class="column is-3">
                <p class="title is-6"></p>
              </div>
              <div class="column is-1 align">
                <p class="title is-6">Documents</p>
              </div>
              <div class="column is-2 align">
                <p class="title is-6">Status</p>
              </div>
            </div>
          </div>
        </div>
        <AdmissionCard />
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
    };
  },
  methods: {
    getTableData() {
      this.loading = true;
      this.$http
        .get('/gatepass')
        .then((res) => {
          this.loading = false;
          this.gatepassData = res.data.results;
        })
        .catch((e) => {
          console.log(e);
          this.loading = false;
        });
    },
    closeModal() {
      this.openModal = false;
    },
    openAdmissionForm() {
      this.openModal = true;
    },
    deleteAdmissionQuery(rowinfo) {
      const { dialog, snackbar } = this.$buefy;
      dialog.confirm({
        title: 'Deleting Gatepass Record',
        message:
          'Are you sure you want to <b>delete</b> your gatepass record? This action cannot be undone.',
        confirmText: 'Delete Gatepass Record',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.loading = true;
          this.$http
            .delete(`/gatepass/${rowinfo._id}`)
            .then(() => {
              snackbar.open('Gatepass Record deleted!');
              this.getTableData();
              this.loading = false;
            })
            .catch((e) => {
              console.log(e);
              this.loading = false;
            });
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
.gatepass-title {
  font-size: 2rem;
  font-weight: 600;
}
.ml-1 {
  margin-left: 2rem;
}
</style>
