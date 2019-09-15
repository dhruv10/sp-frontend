<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-8 is-vertical is-parent">
        <h1 class="title">{{ `${title}` }}</h1>
      </div>
      <div class="tile is-4 is-vertical is-parent">
        <div class="columns">
          <div class="column">
            <b-button
              type="is-primary"
              icon-left="plus"
              rounded
              @click="onButtonClick('add')"
            >Add {{ title }}</b-button>
          </div>
          <div class="column">
            <b-button
              type="is-primary"
              icon-left="upload"
              rounded
              @click="onButtonClick('excel')"
            >Import via Excel</b-button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <p v-if="noData && !loading" class="noData">{{ tableStatus }}</p>
    </div>
    <div v-if="loading">
      <b-loading :is-full-page="false" :active.sync="loading"></b-loading>
    </div>
    <div v-if="!noData && !loading" id="myGrid" style="height: 100%;" class="ag-theme-material">
      <ag-grid-vue
        style="width: 100%; height: 77vh;"
        class="ag-theme-balham"
        :columnDefs="columnsInfo"
        :rowData="data"
        :defaultColDef="{
          sortable: true,
          resizable: true,
          filter: true
        }"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :paginationNumberFormatter="paginationNumberFormatter"
        :gridOptions="gridOptions"

      ></ag-grid-vue>
    </div>
  </div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

export default {
  props: {
    title: String,
    tableData: {
      type: Array,
      default: () => [],
    },
    columnsInfo: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    AgGridVue,
  },
  data() {
    return {
      currentPage: 1,
      data: this.tableData,
      columns: this.columnsInfo,
      tableStatus: 'No data available',
      noData: false,
      gridOptions: {
        headerHeight: 50,
        rowHeight: 45,
        animateRows: true,
      },
      enableStatusBar: true,
      paginationPageSize: null,
      paginationNumberFormatter: null,
    };
  },
  watch: {
    tableData: {
      handler() {
        this.data = this.tableData;
        if (!this.data.length && !this.loading) {
          this.noData = true;
        } else this.noData = false;
      },
    },
  },
  mounted() {
    if (!this.data.length) {
      console.log('no data found');
      this.noData = true;
    }
    this.columnsInfo.push({
      headerName: 'Actions',
      field: '',
      template: `
            <div style="margin-top: 7px">
              <a
                class="button is-primary is-small is-outlined"
                style="margin-right: 10px"
                @click="onButtonClick('edit', props.row)"
              >
                <span>Edit</span>
                <span class="icon is-small">
                  <i class="fas fa-edit"></i>
                </span>
              </a>
              <a
                class="button is-danger is-small is-outlined"
                @click="onButtonClick('delete', props.row)"
              >
                <span>Delete</span>
                <span class="icon is-small">
                  <i class="fas fa-times"></i>
                </span>
              </a>
            </div>
          `,
      minWidth: 80,
      maxWidth: 80,
      pinned: 'right',
    });
  },
  methods: {
    getValue(value, field) {
      const keys = field.split('.');
      const newValue = keys.reduce((acc, prevValue) => acc[prevValue], value);
      return newValue;
    },
    onButtonClick(type, payload) {
      if (type === 'add') {
        this.$emit('addClick');
      } else if (type === 'excel') {
        this.$emit('bulkUploadClick');
      } else if (type === 'edit') {
        this.$emit('editClick', payload);
      } else if (type === 'delete') {
        this.$emit('deleteClick', payload);
      }
    },
  },
};
</script>

<style>
.noData {
  text-align: center;
  margin-top: 90px;
  font-size: 25px;
}
.ag-cell-label-container{
  height: 100%;
  font-size: 16px;
  color: black;
  font-weight: 800;
  font-family: "Avenir";
}
.ag-theme-material {
  font-size: 16px;
  font-weight: 300;
  font-family: "Avenir";
}
</style>
