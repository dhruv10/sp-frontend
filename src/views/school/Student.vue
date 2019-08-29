<template>
  <div class="classroom-root-container">
    <div class="card">
      <div class="card-content">
        <data-table
          title="Student"
          :table-data="studentDetails"
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

export default {
  components: {
    DataTable,
    StudentForm,
  },
  data() {
    return {
      openModal: false,
      formType: 'add',
      studentDetails: [],
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
          label: "Father's Name",
          field: 'name',
          sortable: true,
          centered: true,
        },
      ],
    };
  },
  mounted() {
    this.$http
      .get('/student')
      .then((res) => {
        this.studentDetails = res.data.results;
        console.log(this.studentDetails);
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
    editStudent() {
      this.formType = 'edit';
      this.openModal = true;
    },
    deleteStudent() {
      const { dialog, snackbar } = this.$buefy;
      dialog.confirm({
        title: 'Deleting Student',
        message:
          'Are you sure you want to <b>delete</b> your student? This action cannot be undone.',
        confirmText: 'Delete Student',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$http
            .delete('/student')
            .then((res) => {
              console.log(res);
              snackbar.open('Student deleted!');
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
