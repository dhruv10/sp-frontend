<template>
  <div class="classroom-root-container">
    <div class="card table-card">
      <div class="card-content">
        <data-table
          title="Easy Invoicing"
          :loading="loading"
          :table-data="invoiceDetails"
          :columns-info="tableConfig"
          @addClick="openAddModal"
          @bulkUploadClick="bulkUpload"
          @editClick="editinvoice"
          @deleteClick="deleteinvoice"
        ></data-table>
      </div>
    </div>
    <b-modal :active.sync="openModal" :width="640" scroll="keep">
      <invoicing-form
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
import InvoicingForm from '../../components/InvoicingForm';

export default {
  components: {
    DataTable,
    InvoicingForm,
  },
  data() {
    return {
      openModal: false,
      formType: 'add',
      formData: {},
      invoiceDetails: [],
      loading: false,
      tableConfig: [
        {
          label: 'invoice Name',
          field: 'name',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Code',
          field: 'code',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Note',
          field: 'note',
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
      this.loading = true;
      this.$http
        .get('/invoice')
        .then((res) => {
          this.loading = false;
          this.invoiceDetails = res.data.results;
        })
        .catch((e) => {
          console.log(e);
          this.loading = false;
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
    editinvoice(rowinfo) {
      this.formType = 'edit';
      this.openModal = true;
      this.formData = rowinfo;
    },
    deleteinvoice(rowinfo) {
      const { dialog, snackbar } = this.$buefy;
      dialog.confirm({
        title: 'Deleting invoice',
        message:
          'Are you sure you want to <b>delete</b> your invoice? This action cannot be undone.',
        confirmText: 'Delete invoice',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.loading = true;
          this.$http
            .delete(`/invoice/${rowinfo._id}`)
            .then(() => {
              snackbar.open('invoice deleted!');
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
  height: 90vh
}
</style>
