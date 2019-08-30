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
      <syllabus-form
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
      formData: {},
      syllabusDetails: [],
      tableConfig: [
        {
          label: 'Document Name',
          field: 'docTitle',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Class',
          field: 'class',
          sortable: true,
          numeric: true,
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
      this.$http
        .get('/syllabus')
        .then((res) => {
          this.syllabusDetails = res.data.results;
        })
        .catch(e => console.log(e));
    },
    openAddModal() {
      this.formType = 'add';
      this.openModal = true;
    },
    closeModal() {
      this.openModal = false;
    },
    bulkUpload() {},
    editSyllabus(rowinfo) {
      this.formType = 'edit';
      this.openModal = true;
      this.formData = rowinfo;
    },
    deleteSyllabus(rowinfo) {
      const { dialog, snackbar } = this.$buefy;
      dialog.confirm({
        title: 'Deleting Syllabus',
        message:
          'Are you sure you want to <b>delete</b> your syllabus? This action cannot be undone.',
        confirmText: 'Delete Syllabus',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$http
            .delete(`/syllabus/${rowinfo._id}`)
            .then((res) => {
              console.log(res);
              snackbar.open('Syllabus deleted!');
              this.getTableData();
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
