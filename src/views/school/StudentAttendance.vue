<template>
  <div class="main-container-student-attendance">
    <div class="card table-card">
      <div class="card-content">
        <div class="content card-area">
          <p class="title">Student Attendance</p>
          <section class="columns">
            <b-field class="column is-6" label="Search by Name">
              <b-input size="is-medium" v-model="search" @input="searchByName"></b-input>
            </b-field>
            <b-field class="column is-6" label="Class">
              <MultiSelect
                required
                :allOptions="classList"
                placeholder="Shows all by default"
                @input="filterWithSubjects"
              />
            </b-field>
          </section>
          <section class="mt-2">
            <div v-if="notFound" class="dflex-c">
              <img :src="blankCanvas" class="not-found-img" />
              <p class="not-found-txt">No students found...</p>
            </div>
            <b-table
              v-else
              :data="filteredAttendanceData"
              ref="studentAttendanceTable"
              paginated
              per-page="10"
              :opened-detailed="defaultOpenedDetails"
              detailed
              detail-key="_id"
              @details-open="(row, index) => $buefy.toast.open(`Expanded ${row.student.name}`)"
              :show-detail-icon="showDetailIcon"
              aria-next-label="Next page"
              aria-previous-label="Previous page"
              aria-page-label="Page"
              aria-current-label="Current page"
            >
              <template slot-scope="props">
                <b-table-column
                  field="_id"
                  label="Roll No"
                  width="40"
                  numeric
                  sortable
                  searchable
                  >{{ props.row._id }}</b-table-column
                >

                <b-table-column field="student.name" label="Student Name" sortable searchable>
                  <template v-if="showDetailIcon">{{ props.row.student.name }}</template>
                  <template v-else>
                    <a @click="toggle(props.row)">{{ props.row.student.name }}</a>
                  </template>
                </b-table-column>

                <b-table-column field="student.class" label="Class" sortable searchable>{{
                  props.row.student.class
                }}</b-table-column>

                <b-table-column field="father.name" label="Father's Name" sortable searchable>{{
                  props.row.father.name
                }}</b-table-column>

                <b-table-column field="father.number" label="Father's number" sortable searchable>{{
                  props.row.father.number
                }}</b-table-column>

                <b-table-column field="mother.name" label="Mother's Name" sortable searchable>{{
                  props.row.mother.name
                }}</b-table-column>

                <b-table-column field="mother.number" label="Mother's number" sortable searchable>{{
                  props.row.mother.number
                }}</b-table-column>
              </template>

              <template slot="detail" slot-scope="props">
                <div class="columns is-desktop">
                  <b-datepicker
                    class="column is-5 mt-1"
                    inline
                    v-model="date"
                    :events="props.row.events"
                    indicators="bars"
                  ></b-datepicker>
                  <div class="column is-7 txt-ctr">
                    <p
                      v-if="
                        props.row.attendancePercentage &&
                          props.row.attendancePercentage[props.row.selected.year][
                            props.row.selected.month
                          ]
                      "
                      class="percentage"
                    >
                      Attendance Percentage:
                      <span
                        :class="
                          getPercentageColor(
                            props.row.attendancePercentage[props.row.selected.year][
                              props.row.selected.month
                            ]
                          )
                        "
                      >
                        {{
                          props.row.attendancePercentage[props.row.selected.year][
                            props.row.selected.month
                          ]
                        }}%
                      </span>
                    </p>
                    <p v-else>N.A.</p>
                    <Chart
                      chartType="pie"
                      :chartData="chartData.data"
                      :chartOptions="chartData.options"
                    />
                  </div>
                </div>
              </template>
            </b-table>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/Chart.vue';
import MultiSelect from '@/components/MultiSelect.vue';
import blankCanvas from '@/assets/blank_canvas.svg';

export default {
  name: 'student-attendance',
  components: { Chart, MultiSelect },
  data() {
    return {
      studentAttendanceData: [],
      filteredAttendanceData: [],
      search: '',
      notFound: false,
      date: new Date(),
      defaultOpenedDetails: [1],
      showDetailIcon: true,
      blankCanvas,
      chartData: {
        data: {
          labels: ['Absent', 'HalfDay', 'Present'],
          datasets: [
            {
              label: '# of Votes',
              data: [0, 0, 3],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {},
      },
      classList: ['Daffodil', 'english', 'maths'].map(
        val => ({
          name: `${val}`,
          code: `${val}`,
        }),
      ),
      classID: ['5e47a88d1097a1b903db1c9a'],
      selected: {
        year: 2020,
        month: 0,
      },
    };
  },
  mounted() {
    this.classID.forEach((classId) => {
      this.getDataFromAPI(classId);
    });
  },
  computed: {},
  methods: {
    toggle(row) {
      this.$refs.studentAttendanceTable.toggleDetails(row);
    },
    getDataFromAPI(classID) {
      this.$http
        .get(`student/${classID}/attendance`)
        .then((res) => {
          const studentObj = res.data.students;
          const allStudentsAttendanceData = studentObj.map((item) => {
            const processedStudentData = this.calculateCurrentStudentData(item);
            return {
              // for every student
              _id: item.rollNo,
              student: {
                name: item.name,
                class: item.class,
              },
              father: {
                name: item.father.name,
                number: item.father.phoneNumber,
              },
              mother: {
                name: item.mother.name,
                number: item.mother.phoneNumber,
              },
              attendancePercentage: processedStudentData.attendancePercentage,
              events: processedStudentData.studentAttendanceEvents,
              selected: {
                year: this.selected.year,
                month: this.selected.month,
              },
            };
          });

          this.studentAttendanceData = allStudentsAttendanceData;
          this.filteredAttendanceData = allStudentsAttendanceData;
        })
        .catch(err => console.log(err));
    },
    calculateCurrentStudentData(data) {
      const studentAttendanceEvents = [];
      const attendancePercentage = {};

      // Iterate for every student - API data
      Object.keys(data.attendanceMap).forEach((year) => {
        const months = data.attendanceMap[year];
        attendancePercentage[year] = [];

        Object.keys(months).forEach((monthIndex) => {
          const monthData = months[monthIndex];
          let totalDays = 0;
          let presentDays = 0;
          let currMonthAttendance = 0;
          totalDays = Object.keys(monthData).length;

          Object.keys(monthData).forEach((date) => {
            // const attendanceStatus = monthData[date];
            presentDays += 1;
            // Create attendance events for every day
            const attendanceEvent = {
              date: new Date(year, monthIndex, date),
              type: this.getEventColor(),
            };
            studentAttendanceEvents.push(attendanceEvent);
          });

          // calc attendance for each month
          currMonthAttendance = (presentDays / totalDays) * 100;
          attendancePercentage[year].push(currMonthAttendance);
        });
      });

      return {
        studentAttendanceEvents,
        attendancePercentage,
      };
    },
    getEventColor() {
      // if (day.holiday) return "is-warning";

      // if (day.status) return "is-success";
      return 'is-danger';
    },
    getPercentageColor(percentage) {
      if (percentage >= 80) return 'green';
      if (percentage < 80 && percentage >= 60) return 'yellow';
      return 'red';
    },
    searchByName(studentName) {
      this.notFound = false;
      this.filteredAttendanceData = this.studentAttendanceData.filter(item => item.student.name.toLowerCase().includes(studentName.toLowerCase()));
      if (!this.filteredAttendanceData.length) this.notFound = true;
    },
    filterWithSubjects() {
      // this.notFound = false;
      // if (!filteredSubjects.length) {
      //   this.filteredTeachersAttendanceData = this.teachersAttendanceData;
      //   return;
      // }
      // this.filteredTeachersAttendanceData = this.teachersAttendanceData.filter(teacher => filteredSubjects.some(subject => teacher.subjects.includes(subject.name)));
      // if (!this.filteredTeachersAttendanceData.length) this.notFound = true;
    },
  },
};
</script>

<style scoped>
.main-container-student-attendance {
  height: 100vh;
  margin-top: 3rem;
}
/*
.dflex {
  display: flex;
  justify-content: space-between;
  overflow-x: scroll;
} */
.percentage {
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}
.student-card {
  margin: 1rem;
  padding: 1 rem;
}

.student-info {
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.green {
  color: green;
}

.mt-1 {
  margin-top: 1rem;
}

.student-card-wrapper {
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}

.mr-1 {
  margin-right: 5px;
}

.b-table .table tr.detail {
  box-shadow: none !important;
  background: #fff !important;
}

.txt-ctr {
  text-align: center;
}

.dflex-c {
  display: flex;
  justify-content: center;
  align-items: center;
}
.not-found-img {
  width: 45%;
}
.not-found-txt {
  font-size: 3rem;
  font-weight: 500;
  color: #7957d5;
  margin: auto;
  width: 45%;
}
</style>

<style>
.pagination-list {
  margin: 0 !important;
}
</style>
