<template>
  <div class="classroom-root-container">
    <div class="card table-card">
      <div class="card-content">
        <data-table
          title="Student"
          :loading="loading"
          :table-data="studentDetails"
          :columns-info="tableConfig"
          @addClick="openAddModal"
          @bulkUploadClick="bulkUpload"
          @editClick="editStudent"
          @deleteClick="deleteStudent"
        ></data-table>
      </div>
    </div>
    <b-modal :active.sync="openModal" :width="720" scroll="keep" :full-screen="this.$isMobile()">
      <student-form
        :formData="formData"
        :formType="formType"
        @closeModal="closeModal"
        @getTableData="getTableData"
        :classrooms="classrooms"
        :subject="subjects"
      />
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
      formData: {},
      loading: false,
      classrooms: [],
      subjects: [],
      studentDetails: [],
      tableConfig: [
        {
          headerName: 'Student Name',
          field: 'name',
          sortable: true,
        },
        {
          headerName: 'Date',
          field: 'date',
          sortable: true,
        },
        {
          headerName: 'Nationality',
          field: 'nationality',
          sortable: true,
        },
        {
          headerName: 'Roll No',
          field: 'rollno',
          sortable: true,
        },
        {
          headerName: 'Admission No',
          field: 'admissionno',
          sortable: true,
        },
        {
          headerName: 'Enrollment No',
          field: 'enrollmentno',
          sortable: true,
        },
        {
          headerName: 'Admission Date',
          field: 'admissiondate',
          sortable: true,
        },
        {
          headerName: 'Blood Group',
          field: 'bloodgroup',
          sortable: true,
        },
        {
          headerName: 'Class',
          field: 'classes',
          sortable: true,
        },
        {
          headerName: 'Subjects',
          field: 'checkboxGroup',
          sortable: true,
        },
        {
          headerName: "Father's Name",
          field: 'fatherName',
          sortable: true,
        },
        {
          headerName: "Father's Mobile",
          field: 'fatherMobileNo',
          sortable: true,
        },
        {
          headerName: "Father's DOB",
          field: 'fatherDOB',
          sortable: true,
        },
        {
          headerName: "Father's Blood Group",
          field: 'fatherBloodGroup',
          sortable: true,
        },
        {
          headerName: "Father's Education",
          field: 'fatherEducation',
          sortable: true,
        },
        {
          headerName: "Father's Profession",
          field: 'fatherProfession',
          sortable: true,
        },
        {
          headerName: "Father's Designation",
          field: 'fatherDesignation',
          sortable: true,
        },
        {
          headerName: "Mother's Name",
          field: 'motherName',
          sortable: true,
        },
        {
          headerName: "Mother's Mobile",
          field: 'motherMobileNo',
          sortable: true,
        },
        {
          headerName: "Mother's DOB",
          field: 'motherDOB',
          sortable: true,
        },
        {
          headerName: "Mother's Blood Group",
          field: 'motherBloodGroup',
          sortable: true,
        },
        {
          headerName: "Mother's Education",
          field: 'motherEducation',
          sortable: true,
        },
        {
          headerName: "Mother's Profession",
          field: 'motherProfession',
          sortable: true,
        },
        {
          headerName: "Mother's Designation",
          field: 'motherDesignation',
          sortable: true,
        },
        {
          headerName: 'Address',
          field: 'address',
          sortable: true,
        },
      ],
    };
  },
  mounted() {
    this.getTableData();
    this.getClassrooms();
    this.getSubjects();
  },
  methods: {
    getTableData() {
      this.loading = true;
      this.$http
        .get('/student')
        .then((res) => {
          this.studentDetails = res.data.results;
          this.loading = false;
        })
        .catch((e) => {
          console.log(e);
          this.loading = false;
        });
    },
    getClassrooms() {
      this.$http
        .get('/classroom')
        .then((res) => {
          this.classrooms = res.data.results;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getSubjects() {
      this.$http
        .get('/subject')
        .then((res) => {
          this.subjects = res.data.results;
        })
        .catch((e) => {
          console.log(e);
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
    editStudent(rowinfo) {
      this.formType = 'edit';
      this.openModal = true;
      this.formData = rowinfo;
    },
    deleteStudent(rowinfo) {
      const { dialog, snackbar } = this.$buefy;
      dialog.confirm({
        title: 'Deleting Student',
        message:
          'Are you sure you want to <b>delete</b> your student? This action cannot be undone.',
        confirmText: 'Delete Student',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.loading = true;
          this.$http
            .delete(`/student/${rowinfo._id}`)
            .then(() => {
              snackbar.open('Student deleted!');
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
  height: 90vh;
}
</style>
