<template>
  <div class="root-container">
    <div class="card">
      <div class="card-content">
        <data-table
          title="Salary Grade"
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
      tableConfig: [
        {
          label: 'ID',
          field: 'id',
          width: '46',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Grade Name',
          field: 'name',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Basic Salary',
          field: 'basicSalary',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Transport Allowance',
          field: 'transportAllowance',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Over Time Hourly Rate',
          field: 'overtimeHourlyRate',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Hourly Rate',
          field: 'hourlyRate',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'House Rent',
          field: 'houseRent',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Medical Allowance',
          field: 'medicalAllowance',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Provident Fund',
          field: 'providentFund',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Taxation',
          field: 'taxation',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Total Allowance',
          field: 'totalAllowance',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Total Deduction',
          field: 'totalDeduction',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Gross Salary',
          field: 'grossSalary',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Net Salary',
          field: 'netSalary',
          sortable: true,
          numeric: true,
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
      this.$http
        .get('/salary-grade')
        .then((res) => {
          this.salaryGradeDetails = res.data.results;
        })
        .catch(e => console.log(e));
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
      console.log('row info :', rowinfo);
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
          this.$http
            .delete(`/salary-grade${rowinfo._id}`)
            .then(() => {
              snackbar.open('Salary Grade deleted!');
              this.getTableData();
            })
            .catch(e => console.log(e));
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
</style>
