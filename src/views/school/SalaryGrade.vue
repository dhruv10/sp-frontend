<template>
  <div class="root-container">
    <div class="card">
      <div class="card-content">
        <data-table
          title="Salary Grade"
          :table-data="data"
          :columns-info="tableConfig"
          @addClick="openAddModal"
          @bulkUploadClick="bulkUpload"
          @editClick="editSalaryGrade"
          @deleteClick="deleteSalaryGrade"
        ></data-table>
      </div>
    </div>
    <b-modal :active.sync="openModal" :width="640" scroll="keep">
      <salary-grade-form :formType="formType" />
    </b-modal>
  </div>
</template>

<script>
import DataTable from '../../components/DataTableLayout';
import SalaryGradeForm from '../../components/SalaryGradeForm.vue';

const generateMockData = length => Array(length)
  .fill(null)
  .map((_, i) => ({
    id: i + 1,
    number: Math.floor(Math.random() * 12),
    section: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
    students: Array(Math.floor(Math.random() * 50)).fill(null),
    subjects: Array(Math.floor((Math.random() + 1) * 10)).fill(null),
  }));

export default {
  components: {
    DataTable,
    SalaryGradeForm,
  },
  data() {
    return {
      openModal: false,
      formType: 'add',
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
          field: 'number',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Transport Allowance',
          field: 'number',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Over Time Hourly Rate',
          field: 'number',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Hourly Rate',
          field: 'number',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'House Rent',
          field: 'number',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Medical Allowance',
          field: 'number',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Provident Fund',
          field: 'number',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Taxation',
          field: 'number',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Total Allowance',
          field: 'number',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Total Deduction',
          field: 'number',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Gross Salary',
          field: 'number',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Net Salary',
          field: 'number',
          sortable: true,
          numeric: true,
          centered: true,
        },
      ],
      data: generateMockData(Math.floor(Math.random() * 50)),
    };
  },
  methods: {
    openAddModal() {
      this.formType = 'add';
      this.openModal = true;
      console.log('add');
    },
    bulkUpload() {
      console.log('bulk');
    },
    editSalaryGrade(rowinfo) {
      this.formType = 'edit';
      this.openModal = true;
      console.log('row info :', rowinfo);
    },
    deleteSalaryGrade() {},
  },
};
</script>

<style lang="scss" scoped>
.root-container {
  margin-top: 50px;
  height: 100%;
}
</style>
