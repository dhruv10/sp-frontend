<template>
  <div class="classroom-root-container">
    <div class="card table-card">
      <div class="card-content">
        <data-table
          title="Classroom"
          :loading="loading"
          :table-data="classDetails"
          :columns-info="tableConfig"
          @addClick="openAddModal"
          @bulkUploadClick="bulkUpload"
          @editClick="editClassroom"
          @deleteClick="deleteClassroom"
        ></data-table>
      </div>
    </div>
    <b-modal
      :active.sync="openModal"
      :width="640"
      scroll="keep"
    >
      <classroom-form
        :formType="formType"
        @closeModal="closeModal"
        :classData="classData"
        @getTableData="getTableData"
        :teachers="teachers"
      />
    </b-modal>
  </div>
</template>

<script>
import DataTable from '../../components/DataTableLayout';
import ClassroomForm from '../../components/ClassroomForm';

export default {
  components: {
    DataTable,
    ClassroomForm,
  },
  data() {
    return {
      openModal: false,
      formType: 'add',
      post: null,
      teachers: [],
      classDetails: [],
      classData: {},
      loading: false,
      tableConfig: [
        {
          label: 'Class Name',
          field: 'name',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Class Number',
          field: 'classNumber',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Class Section',
          field: 'classSection',
          sortable: true,
          centered: true,
        },
        {
          label: 'Total Students',
          field: 'totalStudents',
          sortable: true,
          centered: true,
        },
        {
          label: 'Class Teacher',
          field: 'classTeacher.basicInfo.name',
          sortable: true,
          centered: true,
        },
      ],
    };
  },
  mounted() {
    this.getTableData();
    this.getTeachers();
  },
  methods: {
    openAddModal() {
      this.formType = 'add';
      this.openModal = true;
    },
    closeModal() {
      this.openModal = false;
    },
    getTeachers() {
      this.$http.get('/teacher').then((res) => {
        this.teachers = res.data.results;
        console.log('this.teachers', this.teachers);
      }).catch(e => console.log(e));
    },
    bulkUpload() {
    },
    editClassroom(data) {
      this.classData = data;
      this.formType = 'edit';
      this.openModal = true;
    },
    getTableData() {
      this.loading = true;
      this.$http.get('/classroom').then((res) => {
        this.classDetails = res.data.results;
        console.log(res);
        this.loading = false;
      }).catch((e) => {
        console.log(e);
        this.loading = false;
      });
    },
    deleteClassroom(data) {
      const { dialog, snackbar } = this.$buefy;
      dialog.confirm({
        title: 'Deleting Class',
        message:
          'Are you sure you want to <b>delete</b> your class? This action cannot be undone.',
        confirmText: 'Delete Class',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.loading = true;
          this.$http.delete(`/classroom/${data._id}`).then(() => {
            this.getTableData();
            this.loading = false;
            snackbar.open('Class deleted!');
          }).catch(() => {
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
.classroom-root-container {
  margin-top: 50px;
  height: 100%;
}
.table-card {
  height: 90vh;
}
</style>
