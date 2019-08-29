<template>
  <div class="classroom-root-container">
    <div class="card">
      <div class="card-content">
        <data-table
          title="Classroom"
          :table-data="data"
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
      />
    </b-modal>
  </div>
</template>

<script>
import DataTable from '../../components/DataTableLayout';
import ClassroomForm from '../../components/ClassroomForm';

const generateMockData = length => Array(length)
  .fill(null)
  .map(() => ({
    name: ['Daffodils', 'Lotus', 'Sunflower'][Math.floor(Math.random() * 3)],
    number: Math.floor(Math.random() * 12),
    section: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
    students: Math.floor(Math.random() * 50),
    teacher: ['Rekha', 'Seema', 'Payal'][Math.floor(Math.random() * 3)],
  }));

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
          field: 'number',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Class Section',
          field: 'section',
          sortable: true,
          centered: true,
        },
        {
          label: 'Total Students',
          field: 'students',
          sortable: true,
          centered: true,
        },
        {
          label: 'Class Teacher',
          field: 'teacher',
          sortable: true,
          centered: true,
        },
      ],
      data: generateMockData(Math.floor(Math.random() * 50)),
    };
  },
  mounted() {
    // this.$http.get('/class').then(console.log);
  },
  methods: {
    openAddModal() {
      this.formType = 'add';
      this.openModal = true;
    },
    closeModal() {
      this.openModal = false;
    },
    bulkUpload() {
    },
    editClassroom() {
      this.formType = 'edit';
      this.openModal = true;
    },
    deleteClassroom() {
      const { dialog, snackbar } = this.$buefy;
      dialog.confirm({
        title: 'Deleting Class',
        message:
          'Are you sure you want to <b>delete</b> your class? This action cannot be undone.',
        confirmText: 'Delete Class',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          new Promise((resolve) => {
            setTimeout(() => {
              resolve({ error: false });
            }, 1000);
          }).then(() => {
            snackbar.open('Class deleted!');
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
</style>
