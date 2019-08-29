<template>
  <div class="classroom-root-container">
    <div class="card">
      <div class="card-content">
        <data-table
          title="Syllabus"
          :table-data="syllabusDetails"
          :columns-info="tableConfig"
          @addClick="openAddModal"
          @bulkUploadClick="bulkUpload"
          @editClick="editSyllabus"
          @deleteClick="deleteSyllabus"
        ></data-table>
      </div>
    </div>
    <b-modal :active.sync="openModal" :width="640" scroll="keep">
      <syllabus-form :formType="formType" @closeModal="closeModal" />
    </b-modal>
  </div>
</template>

<script>
import DataTable from '../../components/DataTableLayout';
import SyllabusForm from '../../components/SyllabusForm';

export default {
  components: {
    DataTable,
    SyllabusForm,
  },
  data() {
    return {
      openModal: false,
      formType: 'add',
      syllabusDetails: [],
      tableConfig: [
        {
          label: 'Document Name',
          field: 'name',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Class',
          field: 'name',
          sortable: true,
          numeric: true,
          centered: true,
        },
      ],
    };
  },
  mounted() {
    this.$http.get('/syllabus').then((res) => {
      this.syllabusDetails = res.data.results;
      console.log(this.syllabusDetails);
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
    bulkUpload() {},
    editSyllabus() {
      this.formType = 'edit';
      this.openModal = true;
    },
    deleteSyllabus() {
      const { dialog, snackbar } = this.$buefy;
      dialog.confirm({
        title: 'Deleting Syllabus',
        message: 'Are you sure you want to <b>delete</b> your syllabus? This action cannot be undone.',
        confirmText: 'Delete Syllabus',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$http.delete('/syllabus').then((res) => {
            console.log(res);
            snackbar.open('Syllabus deleted!');
          }).catch(e => console.log(e));
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
