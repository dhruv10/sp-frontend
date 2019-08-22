<template>
  <div class="classroom-root-container">
    <div class="card">
      <div class="card-content">
        <data-table
          title="Classroom"
          :table-data="data"
          :columns-info="tableConfig"
          @addClick="openAddModal"
          @bulkUploadClick="bulkUpload"
          @editClick="editClassroom"
          @deleteClick="deleteClassroom"
        >
        </data-table>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from '../../components/DataTableLayout';

const generateMockData = length => Array(length)
  .fill(null)
  .map((_, i) => ({
    id: i + 1,
    number: Math.floor(Math.random() * 12),
    section: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
    students: Array(Math.floor(Math.random() * 50)).fill(null),
    subjects: Array(Math.floor((Math.random() + 1) * 10)).fill(null),
  }));

export default {
  components: {
    DataTable,
  },
  data() {
    return {
      tableConfig: [
        {
          label: 'ID',
          field: 'id',
          width: '46',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Class Number',
          field: 'number',
          sortable: true,
          numeric: true,
          centered: true,
        },
        {
          label: 'Class Section',
          field: 'section',
          sortable: true,
          centered: true,
        },
        {
          label: 'Students',
          field: 'students.length',
          sortable: true,
          centered: true,
        },
      ],
      data: generateMockData(Math.floor(Math.random() * 50)),
    };
  },
  methods: {
    openAddModal() {
      console.log('add');
    },
    bulkUpload() {
      console.log('bulk');
    },
    editClassroom() {},
    deleteClassroom() {},
  },
};
</script>

<style lang="scss" scoped>
.classroom-root-container {
  margin-top: 50px;
  height: 100%;
}
</style>
