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
        :subjects="subjects"
        :deparmentList="deparmentList"
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
      subjects: [],
      deparmentList: [],
      tableConfig: [
        {
          headerName: 'Name',
          field: 'basicInfo.name',
        },
        {
          headerName: 'Gender',
          field: 'basicInfo.gender',
          width: 150,
        },
        {
          headerName: 'Mobile',
          field: 'basicInfo.phoneNumber',
          width: 180,
        },
        {
          headerName: 'Blood Group',
          field: 'basicInfo.bloodGroup',
          width: 180,
        },
        {
          headerName: 'Date of Birth',
          field: 'basicInfo.birthDate',
          width: 200,
        },
        {
          headerName: 'Email',
          field: 'basicInfo.personalEmail',
          width: 230,
        },
        {
          headerName: 'Address',
          field: 'basicInfo.permanentAddress',
          width: 280,
        },
      ],
    };
  },
  mounted() {
    this.getTableData();
    this.getSubject();
    this.getDept();
  },
  methods: {
    openAddModal() {
      this.formType = 'add';
      this.openModal = true;
    },
    getDept() {
      this.$http
        .get('/department')
        .then((res) => {
          this.deparmentList = res.data.results;
          // console.log('2', res.data.results);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getSubject() {
      this.$http
        .get('/subject')
        .then((res) => {
          this.subjects = res.data.results;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getTableData() {
      this.loading = true;
      this.$http
        .get('/teacher')
        .then((res) => {
          if (!res.data.teachers) return;
          this.teacherDetail = res.data.teachers.map(teacher => ({
            ...teacher,
            basicInfo: {
              name: teacher.basicInfo.name,
              gender: teacher.basicInfo.gender,
              phoneNumber: teacher.basicInfo.phoneNumber,
              bloodGroup: teacher.basicInfo.bloodGroup,
              nationality: teacher.basicInfo.nationality,
              birthDate: teacher.basicInfo.birthDate,
              personalEmail: teacher.basicInfo.personalEmail,
              permanentAddress: teacher.basicInfo.permanentAddress,
            },
          }));
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
  min-height: 88vh;
}
</style>
