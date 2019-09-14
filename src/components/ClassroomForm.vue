<template>
  <div>
    <div class="main-container">
      <div class="card">
        <header class="card-header">
          <p
            class="card-header-title header"
          >{{ formType === 'add' ? 'Add Classroom' : 'Edit Classroom' }}</p>
        </header>
      </div>
      <div class="card-content">
        <div class="content card-area">
          <b-field label="Class Name">
            <b-input required v-model="classroom.name"></b-input>
          </b-field>
          <div class="line">
            <b-field label="Class Number">
              <b-input required v-model="classroom.classNumber"></b-input>
            </b-field>
            <b-field label="Section" class="mid">
              <b-input required v-model="classroom.classSection"></b-input>
            </b-field>
            <!-- <b-field label="Total Students">
              <b-input required v-model="classroom.totalStudents"></b-input>
            </b-field>-->
          </div>
          <b-field label="Class Teacher">
            <MultiSelect
              required
              v-model="classroom.classTeacher"
              :allOptions="teacherNames"
              :isMultiple="false"
              placeholder="Select Class Teacher"
            />
          </b-field>
          <div class="submit">
            <b-button outlined type="is-primary" class="mr-1" @click="closeModal()">Cancel</b-button>
            <b-button
              icon-right="arrow-circle-right"
              type="is-primary"
              class="submit"
              @click="formType === 'add' ? addClass() : editClass()"
            >{{ formType === 'add' ? 'Add Classroom' : 'Edit Classroom' }}</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MultiSelect from '@/components/MultiSelect.vue';

export default {
  name: 'ClassroomForm',
  props: {
    formType: {
      type: String,
      default: 'add',
    },
    teachers: {
      type: Array,
      default: () => [],
    },
    classData: {
      type: Object,
      default: () => {},
    },
  },
  components: { MultiSelect },
  data() {
    return {
      startLoading: false,
      classroom: {},
      teacherNames: [],
      classTeacherId: '',
    };
  },
  mounted() {
    console.log('teachers: ', this.teachers);
    this.teacherNames = this.teachers.map(val => ({
      name: val.basicInfo.name,
      code: val.basicInfo.name,
    }));
    if (this.formType === 'edit') {
      this.classroom = this.classData;
      this.classroom.classTeacher = this.classData.classTeacher.basicInfo.name;
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    selectedTeacher(data) {
      this.classTeacherId = data;
    },
    addClass() {
      const { snackbar } = this.$buefy;
      this.startLoading = true;
      this.$http
        .post('/classroom', {
          ...this.classroom,
          classTeacher: this.classTeacherId,
        })
        .then(() => {
          this.startLoading = false;
          this.$emit('getTableData');
          this.$emit('closeModal');
          snackbar.open('Class added!');
        })
        .catch(() => {
          this.startLoading = false;
          this.$emit('closeModal');
          snackbar.open('Something went wrong. Please try again later!');
        });
    },
    editClass() {
      const { snackbar } = this.$buefy;
      this.startLoading = true;
      this.$http
        .put(`/classroom/${this.classData._id}`, this.classroom)
        .then(() => {
          this.$emit('getTableData');
          this.startLoading = false;
          this.$emit('closeModal');
          snackbar.open('Classroom edited!');
        })
        .catch(() => {
          this.startLoading = false;
          this.$emit('closeModal');
          snackbar.open('Something went wrong. Please try again later!');
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/app.global.scss";

.main-container {
  background: white;
  .card-header {
    background: $primary-color;
    .header {
      font-size: 22px;
      font-weight: 800;
      color: white;
      margin-left: 20px;
    }
  }
  .card-area {
    margin: 0px 8px 50px 8px;
  }
  .line {
    display: flex;
    .mid {
      margin: 0px 20px;
    }
  }
}
.submit {
  display: flex;
  justify-content: flex-end;
}
.teacher-label {
  width: 33rem;
}
.mr-1 {
  margin-right: 1rem;
}
</style>
