<template>
  <div class="subject-root-container">
    <div class="card">
      <div class="card-content">
        <data-table
          title="Subject"
          :table-data="subjectDetails"
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

export default {
  components: {
    DataTable,
    SubjectForm,
  },
  data() {
    return {
      openModal: false,
      formType: 'add',
      subjectDetails: [],
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
          field: 'optional',
          sortable: true,
          centered: true,
        },
      ],
    };
  },
  mounted() {
    this.$http.get('/subject').then((res) => {
      this.subjectDetails = res.data.results.map(sub => ({
        ...sub, optional: sub.optional ? 'Optional' : 'Mandatory',
      }));
      console.log(this.subjectDetails);
    }).catch(e => console.log(e));
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
          this.$http.delete('/subject').then((res) => {
            // this.subjectDetails = res
            console.log(res);
            snackbar.open('Subject deleted!');
          }).catch(e => console.log(e));
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
