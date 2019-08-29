<template>
  <div class="classroom-root-container">
    <div class="card">
      <div class="card-content">
        <data-table
          title="Add School"
          :table-data="data"
          :columns-info="tableConfig"
          @addClick="openAddModal"
          @bulkUploadClick="bulkUpload"
          @editClick="editSchool"
          @deleteClick="deleteSchool"
        ></data-table>
      </div>
    </div>
    <b-modal :active.sync="openModal" :width="740" scroll="keep">
      <school-form :formType="formType" />
    </b-modal>
  </div>
</template>

<script>
import DataTable from '../../components/DataTableLayout';
import SchoolForm from '../../components/SchoolForm';

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
    SchoolForm,
  },
  data() {
    return {
      openModal: false,
      formType: 'add',
      post: null,
      tableConfig: [
        {
          label: 'School Name',
          field: 'name',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Address',
          field: 'number',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Code',
          field: 'section',
          sortable: true,
          centered: true,
        },
        {
          label: 'Email',
          field: 'section',
          sortable: true,
          centered: true,
        },
        {
          label: 'Phone',
          field: 'section',
          sortable: true,
          centered: true,
        },
        {
          label: 'Registration Date',
          field: 'section',
          sortable: true,
          centered: true,
        },
        {
          label: 'Fax',
          field: 'section',
          sortable: true,
          centered: true,
        },
        {
          label: 'Facebook',
          field: 'section',
          sortable: true,
          centered: true,
        },
        {
          label: 'Twitter',
          field: 'section',
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
    editSchool() {
      this.formType = 'edit';
      this.openModal = true;
    },
    deleteSchool() {},
  },
};
</script>

<style lang="scss" scoped>
.classroom-root-container {
  margin-top: 50px;
  height: 100%;
}
</style>
