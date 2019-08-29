<template>
  <div class="teacher-root-container">
    <div class="card">
      <div class="card-content">
        <data-table
          title="Teacher"
          :table-data="data"
          :columns-info="tableConfig"
          @addClick="openAddModal"
          @bulkUploadClick="bulkUpload"
          @editClick="editTeacher"
          @deleteClick="deleteTeacher"
        >
        </data-table>
      </div>
    </div>
    <b-modal :active.sync="openModal" :width="640" scroll="keep">
      <teacher-form :formType="formType" @closeModal="closeModal" />
    </b-modal>
  </div>
</template>

<script>
import DataTable from '../../components/DataTableLayout';
import TeacherForm from '../../components/TeacherForm';

const generateMockData = length => Array(length)
  .fill(null)
  .map(() => ({
    name: ['Rekha Jain', 'Ria Malhotra', 'Veena'][Math.floor(Math.random() * 3)],
    code: Math.floor(Math.random() * 12),
    gender: ['Female', 'Male'][Math.floor(Math.random() * 2)],
    number: ['1212121212', '3232323223'][Math.floor(Math.random() * 2)],
    blood: ['A', 'B', '+B'][Math.floor(Math.random() * 3)],
    naitionality: ['Indian', 'English'][Math.floor(Math.random() * 2)],
    dob: ['01/02/1998', '23/12/1987'][Math.floor(Math.random() * 2)],
    email: ['sakshisrivastava413@gmail.com', 'abc@gmail.com'][Math.floor(Math.random() * 2)],
    address: ['CD 199 Pitampura delhi', '1222 rohini sector 12 delhi'][Math.floor(Math.random() * 2)],
  }));

export default {
  components: {
    DataTable,
    TeacherForm,
  },
  data() {
    return {
      openModal: false,
      formType: 'add',
      tableConfig: [
        {
          label: 'Biometric Code',
          field: 'code',
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
      data: generateMockData(Math.floor(Math.random() * 50)),
    };
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
    bulkUpload() {
      console.log('bulk');
    },
    editTeacher() {
      this.formType = 'edit';
      this.openModal = true;
    },
    deleteTeacher() {
      const { dialog, snackbar } = this.$buefy;
      dialog.confirm({
        title: 'Deleting Teacher',
        message: 'Are you sure you want to <b>delete</b> your teacher? This action cannot be undone.',
        confirmText: 'Delete Teacher',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          new Promise((resolve) => {
            setTimeout(() => {
              resolve({ error: false });
            }, 1000);
          }).then(() => {
            snackbar.open('Teacher deleted!');
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
  height: 100%;
}
</style>
