<template>
  <div class="classroom-root-container">
    <div class="card table-card">
      <div class="card-content">
        <data-table
          title="FeeDeposit"
          :loading="loading"
          :table-data="feeDetails"
          :columns-info="tableConfig"
          @addClick="openAddModal"
          @bulkUploadClick="bulkUpload"
          @editClick="editFeeRecord"
          @deleteClick="deleteFeeRecord"
        ></data-table>
      </div>
    </div>
    <b-modal :active.sync="openModal" :width="640" scroll="keep">
      <fee-deposit-form
        :formData="formData"
        :formType="formType"
        @closeModal="closeModal"
        @getTableData="getTableData"
      />
    </b-modal>
  </div>
</template>

<script>
import DataTable from '../../components/DataTableLayout';
import FeeDepositForm from '../../components/FeeDepositForm';

export default {
  components: {
    DataTable,
    FeeDepositForm,
  },
  data() {
    return {
      openModal: false,
      formType: 'add',
      formData: {},
      feeDetails: [],
      loading: false,
      tableConfig: [
        {
          headerName: 'Admission Number',
          field: 'admissionNo',
          sortable: true,
        },
        {
          headerName: 'Amount',
          field: 'amount',
          sortable: true,
        },
        {
          headerName: 'Payment Mode',
          field: 'paymentMode',
          sortable: true,
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
        .get('/department')
        .then((res) => {
          this.loading = false;
          this.feeDetails = res.data.results;
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
    bulkUpload() {},
    editFeeRecord(rowinfo) {
      this.formType = 'edit';
      this.openModal = true;
      this.formData = rowinfo;
    },
    deleteFeeRecord(rowinfo) {
      const { dialog, snackbar } = this.$buefy;
      dialog.confirm({
        title: 'Deleting Department',
        message:
          'Are you sure you want to <b>delete</b> your department? This action cannot be undone.',
        confirmText: 'Delete Department',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.loading = true;
          this.$http
            .delete(`/department/${rowinfo._id}`)
            .then(() => {
              snackbar.open('Department deleted!');
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
}
.table-card {
  min-height: 88vh;
  height: 100%;
}
</style>
