<template>
  <div class="receptionist-root-container">
    <div class="card">
      <div class="info-header">
        <h1 class="gatepass-title">Gate Pass</h1>
        <div>
          <b-button type="is-primary" icon-left="plus" rounded @click="openAddModal">Generate gatepass</b-button>
        </div>
      </div>
      <div class="card-content">
        <div class="card">
          <div class="card-content">
            <div class="columns">
              <div class="column is-3">
                <p class="title is-6">Student</p>
              </div>
              <div class="column is-3">
                <p class="title is-6">Picked By</p>
              </div>
              <div class="column is-2">
                <p class="title is-6">Reason For leaving</p>
              </div>
              <div class="column is-2">
                <p class="title is-6 align">Checkout Status</p>
              </div>
              <div class="column is-2">
                <p class="title is-6 align">Verification</p>
              </div>
            </div>
          </div>
        </div>
        <GatePassDetailCard/>
        <GatePassDetailCard/>
        <GatePassDetailCard/>
      </div>
    </div>
    <b-modal :active.sync="openModal" :width="640" scroll="keep">
      <GenerateGatepassModal
        :formData="formData"
        :formType="formType"
        @closeModal="closeModal"
      />
    </b-modal>
  </div>
</template>

<script>
// import DataTable from '../../components/DataTableLayout';
import GatePassDetailCard from '../../components/GatePassDetailCard';
import GenerateGatepassModal from '../../components/GenerateGatepassModal';

export default {
  components: {
    // DataTable,
    GatePassDetailCard,
    GenerateGatepassModal,
  },
  data() {
    return {
      openModal: false,
      formType: 'add',
      formData: {},
      loading: false,
      post: null,
      gatepassData: [],
      tableConfig: [
        {
          label: 'Student Name',
          field: 'student',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: "Guardian's Name",
          field: 'guardianName',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: "Guardian's Phone No",
          field: 'guardianPhone',
          sortable: true,
          centered: true,
        },
      ],
    };
  },
  mounted() {
    // this.getTableData();
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
    openAddModal() {
      this.openModal = true;
    },
    closeModal() {
      this.openModal = false;
    },
    bulkUpload() {
      console.log('bulk');
    },
    editAdmissionQuery(rowinfo) {
      this.formType = 'edit';
      this.openModal = true;
      this.formData = rowinfo;
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
.receptionist-root-container {
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
</style>
