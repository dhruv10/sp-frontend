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
      <department-form :formType="formType" @closeModal="closeModal" />
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
          field: 'number',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Note',
          field: 'section',
          sortable: true,
          centered: true,
        },
      ],
    };
  },

  mounted() {
    this.$http
      .get('/department')
      .then((res) => {
        this.departmentDetails = res.data.results;
        console.log(this.departmentDetails);
      })
      .catch(e => console.log(e));
  },
  methods: {
    openAddModal() {
      this.formType = 'add';
      this.openModal = true;
      console.log('add');
    },
    closeModal() {
      this.openModal = false;
    },
    bulkUpload() {},
    editDepartment() {
      this.formType = 'edit';
      this.openModal = true;
    },
    deleteDepartment() {
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
            .delete('/department')
            .then((res) => {
              console.log(res);
              snackbar.open('Department deleted!');
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
