<template>
  <div class="classroom-root-container">
    <div class="card table-card">
      <div class="card-content">
        <data-table
          title="Syllabus"
          :loading="loading"
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
        :classrooms="classrooms"
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
      classrooms: [],
      loading: false,
      tableConfig: [
        {
          headerName: 'Document Name',
          field: 'documentTitle',
          sortable: true,
        },
        {
          headerName: 'Class',
          field: 'class',
          sortable: true,
        },
      ],
    };
  },
  mounted() {
    this.getClassrooms();
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.loading = true;
      this.$http
        .get('/syllabus')
        .then((res) => {
          this.syllabusDetails = res.data.results;
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
          this.classrooms = res.data.results.map(val => ({
            name: `${val.classNumber} - ${val.classSection}`,
            code: `${val.classNumber} - ${val.classSection}`,
            _id: `${val._id}`,
          }));
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
    editSyllabus(rowinfo) {
      this.formType = 'edit';
      this.openModal = true;
      const cur = this.classrooms.findIndex(c => c._id === rowinfo.class);
      rowinfo.class = this.classrooms[cur];
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
          this.loading = true;
          this.$http
            .delete(`/syllabus/${rowinfo._id}`)
            .then((res) => {
              console.log(res);
              snackbar.open('Syllabus deleted!');
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
