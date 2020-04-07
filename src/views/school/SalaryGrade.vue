<template>
  <div class="root-container">
    <div class="card table-card">
      <div class="card-content">
        <data-table
          title="Salary Grade"
          :loading="loading"
          :table-data="salaryGradeDetails"
          :columns-info="tableConfig"
          @addClick="openAddModal"
          @bulkUploadClick="bulkUpload"
          @editClick="editSalaryGrade"
          @deleteClick="deleteSalaryGrade"
        ></data-table>
      </div>
    </div>
    <b-modal :active.sync="openModal" :width="640" scroll="keep">
      <salary-grade-form :formData="formData" :formType="formType" @closeModal="closeModal" @getTableData="getTableData" />
    </b-modal>
  </div>
</template>

<script>
import DataTable from '../../components/DataTableLayout';
import SalaryGradeForm from '../../components/SalaryGradeForm.vue';

export default {
  components: {
    DataTable,
    SalaryGradeForm,
  },
  data() {
    return {
      openModal: false,
      formType: 'add',
      formData: {},
      salaryGradeDetails: [],
      loading: false,
      tableConfig: [
        {
          headerName: 'Grade Name',
          field: 'gradeName',
          sortable: true,
        },
        {
          headerName: 'Basic Salary',
          field: 'basicSalary',
          sortable: true,
        },
        {
          headerName: 'Transport Allowance',
          field: 'transportAllowance',
          sortable: true,
        },
        {
          headerName: 'Over Time Hourly Rate',
          field: 'overTimeHourlyRate',
          sortable: true,
        },
        {
          headerName: 'Hourly Rate',
          field: 'hourlyRate',
          sortable: true,
        },
        {
          headerName: 'House Rent',
          field: 'houseRent',
          sortable: true,
        },
        {
          headerName: 'Medical Allowance',
          field: 'medicalAllowance',
          sortable: true,
        },
        {
          headerName: 'Provident Fund',
          field: 'providentFund',
          sortable: true,
        },
        {
          headerName: 'Taxation',
          field: 'taxation',
          sortable: true,
        },
        {
          headerName: 'Total Allowance',
          field: 'totalAllowance',
          sortable: true,
        },
        {
          headerName: 'Total Deduction',
          field: 'totalDeduction',
          sortable: true,
        },
        {
          headerName: 'Gross Salary',
          field: 'grossSalary',
          sortable: true,
        },
        {
          headerName: 'Net Salary',
          field: 'netSalary',
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
        .get('/salary-grade')
        .then((res) => {
          this.salaryGradeDetails = res.data.results;
          this.loading = false;
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
    editSalaryGrade(rowinfo) {
      this.formType = 'edit';
      this.openModal = true;
      this.formData = rowinfo;
    },
    deleteSalaryGrade(rowinfo) {
      const { dialog, snackbar } = this.$buefy;
      dialog.confirm({
        title: 'Deleting Salary Grade',
        message:
          'Are you sure you want to <b>delete</b> your salary grade? This action cannot be undone.',
        confirmText: 'Delete Salary Grade',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.loading = true;
          this.$http
            .delete(`/salary-grade/${rowinfo._id}`)
            .then(() => {
              snackbar.open('Salary Grade deleted!');
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
.root-container {
  margin-top: 50px;
  height: 100%;
}
.table-card {
  height: 90vh;
}
</style>
