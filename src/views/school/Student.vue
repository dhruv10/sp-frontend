<template>
  <div class="classroom-root-container">
    <div class="card">
      <div class="card-content">
        <data-table
          title="Student"
          :table-data="data"
          :columns-info="tableConfig"
          @addClick="openAddModal"
          @bulkUploadClick="bulkUpload"
          @editClick="editStudent"
          @deleteClick="deleteStudent"
        ></data-table>
      </div>
    </div>
    <b-modal :active.sync="openModal" :width="720" scroll="keep">
      <student-form :formType="formType" />
    </b-modal>
  </div>
</template>

<script>
import DataTable from '../../components/DataTableLayout';
import StudentForm from '../../components/StudentForm';

const generateMockData = length => Array(length)
  .fill(null)
  .map(() => ({
    name: ['Daffodils', 'Lotus', 'Sunflower'][Math.floor(Math.random() * 3)],
    number: Math.floor(Math.random() * 12),
    section: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
    students: Math.floor(Math.random() * 50),
    teacher: ['Rekha', 'Seema', 'Payal'][Math.floor(Math.random() * 3)],
  }));

export default {
  components: {
    DataTable,
    StudentForm,
  },
  data() {
    return {
      openModal: false,
      formType: 'add',
      post: null,
      tableConfig: [
        {
          label: 'Student Name',
          field: 'name',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Roll No',
          field: 'number',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Admission No',
          field: 'number',
          sortable: true,
          centered: true,
        },
        {
          label: 'Enrollment No',
          field: 'number',
          sortable: true,
          centered: true,
        },
        {
          label: 'Admission Date',
          field: 'date',
          sortable: true,
          centered: true,
        },
        {
          label: 'Father\'s Name',
          field: 'name',
          sortable: true,
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
    editStudent() {
      this.formType = 'edit';
      this.openModal = true;
    },
    deleteStudent() {},
  },
};
</script>

<style lang="scss" scoped>
.classroom-root-container {
  margin-top: 50px;
  height: 100%;
}
</style>
