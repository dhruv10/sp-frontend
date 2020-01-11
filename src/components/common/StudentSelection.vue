<template>
  <div class="main-container">
    <div class="container columns">
      <div class="column is-5">
        <section>
          <b-field label="Select Class">
            <MultiSelect
              required
              :isMultiple="false"
              :allOptions="classlist"
              placeholder="Select a class"
              v-model="selectedClass"
              :loading="classLoading"
            />
          </b-field>
        </section>
      </div>
      <div class="column is-7">
        <section>
          <b-field label="Select Student">
            <MultiSelect
              required
              :isMultiple="false"
              :allOptions="studentList"
              placeholder="Select student"
              :disable="!studentList.length"
              :loading="studentLoading"
            />
          </b-field>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import MultiSelect from '@/components/MultiSelect.vue';

export default {
  data() {
    return {
      selectedClass: null,
      classRes: [],
      classlist: [],
      studentList: [],
      classLoading: false,
      studentLoading: false,
    };
  },
  components: {
    MultiSelect,
  },
  mounted() {
    this.classLoading = true;
    this.$http
      .get('/classroom')
      .then((res) => {
        this.classRes = res.data.results;
        this.classLoading = false;
      })
      .catch((e) => {
        console.log(e);
        this.classLoading = false;
      });
  },
  watch: {
    selectedClass: {
      handler(val) {
        this.studentList = [];
        if (val) {
          this.studentLoading = true;

          setTimeout(() => {
            const studentList = [
              { name: 'Sakshi Srivastava', rollNo: 41, id: 'siafsagf' },
              { name: 'Akshat Srivastava', rollNo: 42, id: 'siafsagf' },
              { name: 'Dhruv Srivastava', rollNo: 43, id: 'siafsagf' },
            ];

            this.studentList = studentList.map(student => ({
              name: `${student.name} (${student.rollNo})`,
              code: student.id,
            }));

            this.studentLoading = false;
          }, 3000);
        }
      },
    },
    classRes: {
      handler() {
        this.classlist = this.classRes.map(c => ({
          name: `${c.classNumber} - ${c.classSection}`,
          code: c._id,
        }));
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/app.global.scss";

.main-container {
  // margin: 20px !important;
  background: white;
}
</style>
