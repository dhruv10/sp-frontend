<template>
  <div class="classroom-root-container">
    <div class="card">
      <div class="card-content">
        <data-table
          title="Syllabus"
          :table-data="data"
          :columns-info="tableConfig"
          @addClick="openAddModal"
          @bulkUploadClick="bulkUpload"
          @editClick="editSyllabus"
          @deleteClick="deleteSyllabus"
        ></data-table>
      </div>
    </div>
    <b-modal :active.sync="openModal" :width="540" scroll="keep">
      <syllabus-form :formType="formType" />
    </b-modal>
  </div>
</template>

<script>
import DataTable from '../../components/DataTableLayout';
import SyllabusForm from '../../components/SyllabusForm';

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
    SyllabusForm,
  },
  data() {
    return {
      openModal: false,
      formType: 'add',
      post: null,
      tableConfig: [
        {
          label: 'Document Name',
          field: 'name',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Class',
          field: 'name',
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
    editSyllabus() {
      this.formType = 'edit';
      this.openModal = true;
    },
    deleteSyllabus() {},
  },
};
</script>

<style lang="scss" scoped>
.classroom-root-container {
  margin-top: 50px;
  height: 100%;
}
</style>
