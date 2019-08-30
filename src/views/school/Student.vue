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
    <b-modal :active.sync="openModal" :width="720" scroll="keep">
      <student-form
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
          label: 'Date',
          field: 'date',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Nationality',
          field: 'nationality',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Roll No',
          field: 'rollno',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Admission No',
          field: 'admissionno',
          sortable: true,
          centered: true,
        },
        {
          label: 'Enrollment No',
          field: 'enrollmentno',
          sortable: true,
          centered: true,
        },
        {
          label: 'Admission Date',
          field: 'admissiondate',
          sortable: true,
          centered: true,
        },
        {
          label: 'Blood Group',
          field: 'bloodgroup',
          sortable: true,
          centered: true,
        },
        {
          label: 'Class',
          field: 'classes',
          sortable: true,
          centered: true,
        },
        {
          label: 'Subjects',
          field: 'checkboxGroup',
          sortable: true,
          centered: true,
        },
        {
          label: "Father's Name",
          field: 'fatherName',
          sortable: true,
          centered: true,
        },
        {
          label: "Father's Mobile",
          field: 'fatherMobileNo',
          sortable: true,
          centered: true,
        },
        {
          label: "Father's DOB",
          field: 'fatherDOB',
          sortable: true,
          centered: true,
        },
        {
          label: "Father's Blood Group",
          field: 'fatherBloodGroup',
          sortable: true,
          centered: true,
        },
        {
          label: "Father's Education",
          field: 'fatherEducation',
          sortable: true,
          centered: true,
        },
        {
          label: "Father's Profession",
          field: 'fatherProfession',
          sortable: true,
          centered: true,
        },
        {
          label: "Father's Designation",
          field: 'fatherDesignation',
          sortable: true,
          centered: true,
        },
        {
          label: "Mother's Name",
          field: 'motherName',
          sortable: true,
          centered: true,
        },
        {
          label: "Mother's Mobile",
          field: 'motherMobileNo',
          sortable: true,
          centered: true,
        },
        {
          label: "Mother's DOB",
          field: 'motherDOB',
          sortable: true,
          centered: true,
        },
        {
          label: "Mother's Blood Group",
          field: 'motherBloodGroup',
          sortable: true,
          centered: true,
        },
        {
          label: "Mother's Education",
          field: 'motherEducation',
          sortable: true,
          centered: true,
        },
        {
          label: "Mother's Profession",
          field: 'motherProfession',
          sortable: true,
          centered: true,
        },
        {
          label: "Mother's Designation",
          field: 'motherDesignation',
          sortable: true,
          centered: true,
        },
        {
          label: 'Address',
          field: 'address',
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
  height: 90vh
}
</style>
