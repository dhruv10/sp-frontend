<template>
  <div class="teacher-root-container">
    <div class="card table-card">
      <div class="card-content">
        <data-table
          title="Teacher"
          :loading="loading"
          :table-data="teacherDetail"
          :columns-info="tableConfig"
          @addClick="openAddModal"
          @bulkUploadClick="bulkUpload"
          @editClick="editTeacher"
          @deleteClick="deleteTeacher"
        ></data-table>
      </div>
    </div>
    <b-modal :active.sync="openModal" :width="640" scroll="keep">
      <teacher-form
        :formType="formType"
        @closeModal="closeModal"
        :teacherData="teacherData"
        @getTableData="getTableData"
      />
    </b-modal>
  </div>
</template>

<script>
import DataTable from '../../components/DataTableLayout';
import TeacherForm from '../../components/TeacherForm';

export default {
  components: {
    DataTable,
    TeacherForm,
  },
  data() {
    return {
      openModal: false,
      formType: 'add',
      teacherDetail: [],
      teacherData: {},
      loading: false,
      tableConfig: [
        {
          label: 'Biometric Code',
          field: 'biometricCode',
          sortable: true,
          centered: true,
        },
        {
          label: 'Name',
          field: 'name',
          sortable: true,
          centered: true,
        },
        {
          label: 'Gender',
          field: 'gender',
          sortable: true,
          centered: true,
        },
        {
          label: 'Contact Number',
          field: 'number',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Blood Group',
          field: 'blood',
          sortable: true,
          centered: true,
        },
        {
          label: 'Nationality',
          field: 'naitionality',
          sortable: true,
          centered: true,
        },
        {
          label: 'Date of Birth',
          field: 'dob',
          sortable: true,
          centered: true,
        },
        {
          label: 'Email',
          field: 'email',
          sortable: true,
        },
        {
          label: 'Address',
          field: 'address',
        },
      ],
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    openAddModal() {
      this.formType = 'add';
      this.openModal = true;
    },
    getTableData() {
      this.loading = true;
      this.$http
        .get('/teacher')
        .then((res) => {
          console.log('teacher', res.data.results);
          this.teacherDetail = res.data.results;
          this.loading = false;
        })
        .catch((e) => {
          console.log(e);
          this.loading = false;
        });
    },
    closeModal() {
      this.openModal = false;
    },
    bulkUpload() {},
    editTeacher(data) {
      this.formType = 'edit';
      this.teacherData = data;
      this.openModal = true;
    },
    deleteTeacher(data) {
      const { dialog, snackbar } = this.$buefy;
      dialog.confirm({
        title: 'Deleting Teacher',
        message:
          'Are you sure you want to <b>delete</b> your teacher? This action cannot be undone.',
        confirmText: 'Delete Teacher',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.loading = true;
          this.$http
            .delete(`/teacher/${data._id}`)
            .then(() => {
              this.getTableData();
              this.loading = false;
              snackbar.open('Teacher deleted!');
            })
            .catch(() => {
              this.loading = false;
              snackbar.open('Something went wrong. Please try again later!');
            });
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.teacher-root-container {
  margin-top: 50px;
}
.table-card {
  height: 90vh
}
</style>
