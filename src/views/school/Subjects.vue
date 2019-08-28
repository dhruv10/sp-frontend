<template>
  <div class="subject-root-container">
    <div class="card">
      <div class="card-content">
        <data-table
          title="Subject"
          :table-data="data"
          :columns-info="tableConfig"
          @addClick="openAddModal"
          @bulkUploadClick="bulkUpload"
          @editClick="editSubject"
          @deleteClick="deleteSubject"
        >
        </data-table>
      </div>
    </div>
    <b-modal :active.sync="openModal" :width="640" scroll="keep">
      <subject-form :formType="formType" @closeModal="closeModal" />
    </b-modal>
  </div>
</template>

<script>
import DataTable from '../../components/DataTableLayout';
import SubjectForm from '../../components/SubjectForm';

const generateMockData = length => Array(length)
  .fill(null)
  .map(() => ({
    name: ['Maths', 'English', 'Hindi'][Math.floor(Math.random() * 3)],
    code: Math.floor(Math.random() * 12),
    type: ['Mandatory', 'Optional'][Math.floor(Math.random() * 2)],
  }));

export default {
  components: {
    DataTable,
    SubjectForm,
  },
  data() {
    return {
      openModal: false,
      formType: 'add',
      tableConfig: [
        {
          label: 'Subject Code',
          field: 'code',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Subject Name',
          field: 'name',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Type',
          field: 'type',
          sortable: true,
          centered: true,
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
    editSubject() {
      this.formType = 'edit';
      this.openModal = true;
    },
    deleteSubject() {
      const { dialog, snackbar } = this.$buefy;
      dialog.confirm({
        title: 'Deleting Subject',
        message: 'Are you sure you want to <b>delete</b> your subject? This action cannot be undone.',
        confirmText: 'Delete Subject',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          new Promise((resolve) => {
            setTimeout(() => {
              resolve({ error: false });
            }, 1000);
          }).then(() => {
            snackbar.open('Subject deleted!');
          });
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.subject-root-container {
  margin-top: 50px;
  height: 100%;
}
</style>
