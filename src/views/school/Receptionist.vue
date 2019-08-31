<template>
  <div class="classroom-root-container">
    <div class="card">
      <div class="card-content">
        <data-table
          title="Gatepass Records"
          :loading="loading"
          :table-data="gatepassData"
          :columns-info="tableConfig"
          @addClick="openAddModal"
          @bulkUploadClick="bulkUpload"
          @editClick="editAdmissionQuery"
          @deleteClick="deleteAdmissionQuery"
        ></data-table>
      </div>
    </div>
    <b-modal :active.sync="openModal" :width="640" scroll="keep">
      <gatepass-form
        :formData="formData"
        :formType="formType"
        @closeModal="closeModal"
        @getTableData="getTableData" />
    </b-modal>
  </div>
</template>

<script>
import DataTable from '../../components/DataTableLayout';
import GatepassForm from '../../components/GatepassForm';

export default {
  components: {
    DataTable,
    GatepassForm,
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
          label: 'Guardian\'s Name',
          field: 'guardianName',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Guardian\'s Phone No',
          field: 'guardianPhone',
          sortable: true,
          centered: true,
        },
      ],
    };
  },
  mounted() {
    this.getTableData();
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
      this.formType = 'add';
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
.classroom-root-container {
  margin-top: 50px;
  height: 100%;
}
</style>
