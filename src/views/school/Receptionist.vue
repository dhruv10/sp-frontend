<template>
  <div class="classroom-root-container">
    <div class="card">
      <div class="card-content">
        <data-table
          title="GatePass Records"
          :table-data="data"
          :columns-info="tableConfig"
          @addClick="openAddModal"
          @bulkUploadClick="bulkUpload"
          @editClick="editAdmissionQuery"
          @deleteClick="deleteAdmissionQuery"
        ></data-table>
      </div>
    </div>
    <b-modal :active.sync="openModal" :width="640" scroll="keep">
      <generate-gate-pass-form :formType="formType" />
    </b-modal>
  </div>
</template>

<script>
import DataTable from '../../components/DataTableLayout';
import GenerateGatePassForm from '../../components/GenerateGatePassForm';

export default {
  components: {
    DataTable,
    GenerateGatePassForm,
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
          label: 'Enrollment No',
          field: 'number',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Class',
          field: 'section',
          sortable: true,
          centered: true,
        },
        {
          label: 'Admission Slot',
          field: 'section',
          sortable: true,
          centered: true,
        },
        {
          label: 'Guardian\'s name',
          field: 'teacher',
          sortable: true,
          centered: true,
        },
        {
          label: 'Guardian\'s number',
          field: 'number',
          sortable: true,
          centered: true,
        },
      ],
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
    editAdmissionQuery() {
      this.formType = 'edit';
      this.openModal = true;
    },
    deleteAdmissionQuery() {},
  },
};
</script>

<style lang="scss" scoped>
.classroom-root-container {
  margin-top: 50px;
  height: 100%;
}
</style>
