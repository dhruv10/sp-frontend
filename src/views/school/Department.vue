<template>
  <div class="classroom-root-container">
    <div class="card">
      <div class="card-content">
        <data-table
          title="Department"
          :table-data="departmentDetails"
          :columns-info="tableConfig"
          @addClick="openAddModal"
          @bulkUploadClick="bulkUpload"
          @editClick="editDepartment"
          @deleteClick="deleteDepartment"
        ></data-table>
      </div>
    </div>
    <b-modal :active.sync="openModal" :width="440" scroll="keep">
      <department-form
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
import DepartmentForm from '../../components/DepartmentForm';

export default {
  components: {
    DataTable,
    DepartmentForm,
  },
  data() {
    return {
      openModal: false,
      formType: 'add',
      formData: {},
      departmentDetails: [],
      tableConfig: [
        {
          label: 'Department Name',
          field: 'name',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Code',
          field: 'code',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Note',
          field: 'note',
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
      this.$http
        .get('/department')
        .then((res) => {
          this.departmentDetails = res.data.results;
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
    editDepartment(rowinfo) {
      this.formType = 'edit';
      this.openModal = true;
      this.formData = rowinfo;
    },
    deleteDepartment(rowinfo) {
      const { dialog, snackbar } = this.$buefy;
      dialog.confirm({
        title: 'Deleting Department',
        message:
          'Are you sure you want to <b>delete</b> your department? This action cannot be undone.',
        confirmText: 'Delete Department',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$http
            .delete(`/department/${rowinfo._id}`)
            .then(() => {
              snackbar.open('Department deleted!');
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
.classroom-root-container {
  margin-top: 50px;
  height: 100%;
}
</style>
