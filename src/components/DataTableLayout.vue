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
            >
              Add {{ title }}
            </b-button>
          </div>
          <div class="column">
            <b-button
              type="is-primary"
              icon-left="upload"
              rounded
              @click="onButtonClick('excel')"
            >
              Import via Excel
            </b-button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <p v-if="noData && !loading" class="noData">{{ tableStatus }}</p>
    </div>
    <b-table
      :data="data"
      :paginated="!noData"
      :per-page="10"
      :loading="loading"
      :current-page.sync="currentPage"
      :pagination-simple="true"
      pagination-position="bottom"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >
      <template slot-scope="props">
        <b-table-column
          v-for="column of columns"
          :key="column.field"
          :field="column.field"
          :label="column.label"
          :width="column.width"
          :sortable="column.sortable"
          :numeric="column.numeric"
          :centered="column.centered"
        >
          <div class="option-data">{{ getValue(props.row, column.field) }}</div>
        </b-table-column>
        <b-table-column
          label="Actions"
          :centered="true"
        >
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
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
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
  data() {
    return {
      currentPage: 1,
      data: this.tableData,
      columns: this.columnsInfo,
      tableStatus: 'No data available',
      noData: false,
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
/* showing ... in long text */
.option-data {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100px;
}
</style>
