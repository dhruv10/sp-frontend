<template>
  <div class="subject-root-container">
    <div class="card table-card">
      <div class="card-content">
        <data-table
          title="Subject"
          :loading="loading"
          :table-data="subjectDetails"
          :columns-info="tableConfig"
          @addClick="openAddModal"
          @bulkUploadClick="bulkUpload"
          @editClick="editSubject"
          @deleteClick="deleteSubject"
        ></data-table>
      </div>
    </div>
    <b-modal :active.sync="openModal" :width="640" scroll="keep">
      <subject-form :formType="formType" @closeModal="closeModal" :subjectData="subjectData" @getTableData="getTableData" />
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
      subjectData: {},
      loading: false,
      tableConfig: [
        {
          headerName: 'Subject Code',
          field: 'code',
          sortable: true,
        },
        {
          headerName: 'Subject Name',
          field: 'name',
          sortable: true,
        },
        {
          headerName: 'Type',
          field: 'optional',
          sortable: true,
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
    closeModal() {
      this.openModal = false;
    },
    getTableData() {
      this.loading = true;
      this.$http.get('/subject').then((res) => {
        console.log('ressssss', res.data.results);
        this.subjectDetails = res.data.results.map(sub => ({
          ...sub, optional: sub.optional ? 'Optional' : 'Mandatory',
        }));
        this.loading = false;
        console.log(this.subjectDetails);
      }).catch((e) => {
        console.log(e);
        this.loading = false;
      });
    },
    bulkUpload() {
    },
    editSubject(data) {
      console.log(data);
      this.subjectData = data;
      this.formType = 'edit';
      this.openModal = true;
    },
    deleteSubject(data) {
      const { dialog, snackbar } = this.$buefy;
      dialog.confirm({
        title: 'Deleting Subject',
        message: 'Are you sure you want to <b>delete</b> your subject? This action cannot be undone.',
        confirmText: 'Delete Subject',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.loading = true;
          this.$http.delete(`/subject/${data._id}`).then((res) => {
            console.log(res);
            this.getTableData();
            this.loading = false;
            snackbar.open('Subject deleted!');
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
.subject-root-container {
  margin-top: 40px;
}
.table-card {
  min-height: 90vh;
  height: 100%;
}
</style>
