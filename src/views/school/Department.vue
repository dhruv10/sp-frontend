<template>
  <div class="classroom-root-container">
    <div class="card table-card">
      <div class="card-content">
        <data-table
          title="Department"
          :loading="loading"
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
      loading: false,
      tableConfig: [
        {
          headerName: 'Department Name',
          field: 'name',
          sortable: true,
        },
        {
          headerName: 'Code',
          field: 'code',
          sortable: true,
        },
        {
          headerName: 'Note',
          field: 'note',
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
          this.departmentDetails = res.data.results;
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
  height: 100%;
}
.table-card {
  height: 90vh
}
</style>
