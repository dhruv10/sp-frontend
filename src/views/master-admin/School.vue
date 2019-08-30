<template>
  <div class="classroom-root-container">
    <div class="card">
      <div class="card-content">
        <data-table
          title="Add School"
          :table-data="schoolDetails"
          :columns-info="tableConfig"
          @addClick="openAddModal"
          @bulkUploadClick="bulkUpload"
          @editClick="editSchool"
          @deleteClick="deleteSchool"
        ></data-table>
      </div>
    </div>
    <b-modal :active.sync="openModal" :width="740" scroll="keep">
      <school-form
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
import SchoolForm from '../../components/SchoolForm';

export default {
  components: {
    DataTable,
    SchoolForm,
  },
  data() {
    return {
      openModal: false,
      formType: 'add',
      formData: {},
      schoolDetails: [],
      tableConfig: [
        {
          label: 'School Name',
          field: 'name',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Address',
          field: 'address',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Code',
          field: 'section',
          sortable: true,
          centered: true,
        },
        {
          label: 'Email',
          field: 'email',
          sortable: true,
          centered: true,
        },
        {
          label: 'Phone',
          field: 'phone',
          sortable: true,
          centered: true,
        },
        {
          label: 'Registration Date',
          field: 'registrationDate',
          sortable: true,
          centered: true,
        },
        {
          label: 'Subscription Date',
          field: 'subscriptionDate',
          sortable: true,
          centered: true,
        },
        {
          label: 'Fax',
          field: 'fax',
          sortable: true,
          centered: true,
        },
        {
          label: 'Facebook',
          field: 'fb',
          sortable: true,
          centered: true,
        },
        {
          label: 'Twitter',
          field: 'twitter',
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
      this.$http
        .get('/school')
        .then((res) => {
          this.schoolDetails = res.data.results;
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
    editSchool(rowinfo) {
      this.formType = 'edit';
      this.openModal = true;
      this.formData = rowinfo;
    },
    deleteSchool(rowinfo) {
      const { dialog, snackbar } = this.$buefy;
      dialog.confirm({
        title: 'Deleting School',
        message:
          'Are you sure you want to <b>delete</b> your school? This action cannot be undone.',
        confirmText: 'Delete School',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$http
            .delete(`/school/${rowinfo._id}`)
            .then(() => {
              snackbar.open('School deleted!');
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
