<template>
  <div class="main-container-teacher-attendance">
    <div class="card table-card">
      <div class="card-content">
        <div class="content card-area">
          <p class="title">Teacher Attendance</p>
          <section class="columns">
            <b-field class="column is-6" label="Search by Name">
              <b-input size="is-medium" v-model="search" @input="searchByName"></b-input>
            </b-field>
            <b-field class="column is-6" label="Subject">
              <MultiSelect
                required
                :allOptions="subjectList"
                placeholder="Select Subject"
                @input="filterWithSubjects"
              />
            </b-field>
          </section>
          <section :class="['dflex', 'mt-2', notFound ? 'no-scroll' : 'scroll']">
            <div v-if="notFound" class="dflex-c no-scroll">
              <img :src="blankCanvas" class="not-found-img" />
              <p class="not-found-txt">No teachers found...</p>
            </div>
            <div v-else v-for="teacherObj in filteredTeachersAttendanceData" :key="teacherObj._id">
              <div class="p-1">
                <div class="teacher-card-wrapper mb-2 p-1">
                  <div class="teacher-info">
                    <div>
                      <p class="title is-5">{{ teacherObj.teacherName }}</p>
                    </div>
                    <div
                      :class="[
                        'title',
                        'is-5',
                        getPercentageColor(
                          teacherObj.attendancePercentage[teacherObj.selected.year][teacherObj.selected.month]
                        )
                      ]"
                      v-if="
                        teacherObj.attendancePercentage &&
                          teacherObj.attendancePercentage[teacherObj.selected.year] &&
                          teacherObj.attendancePercentage[teacherObj.selected.year][teacherObj.selected.month]
                      "
                    >
                      {{ teacherObj.attendancePercentage[teacherObj.selected.year][teacherObj.selected.month] }}%
                    </div>
                    <div v-else>N.A.</div>
                  </div>
                  <b-tag
                    v-for="k in teacherObj.subjects"
                    :key="teacherObj.subjects[k]"
                    type="is-primary"
                    aria-close-label="Close tag"
                    class="mr-1"
                    >{{ k }}</b-tag
                  >
                  <b-datepicker
                    class="mt-1"
                    inline
                    v-model="teacherObj.date"
                    :events="teacherObj.events"
                    indicators="bars"
                    @change-month="
                      monthIndex => {
                        teacherObj.selected.month = monthIndex;
                      }
                    "
                    @change-year="
                      yearIndex => {
                        teacherObj.selected.year = yearIndex;
                      }
                    "
                  ></b-datepicker>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MultiSelect from '@/components/MultiSelect.vue';
import blankCanvas from '@/assets/blank_canvas.svg';

const thisMonth = new Date().getMonth();

export default {
  name: 'teacherAttendance',
  components: {
    MultiSelect,
  },
  data() {
    return {
      search: '',
      selected: {
        year: 2020,
        month: 0,
      },
      notFound: false,
      filteredSubjects: [],
      subjectList: ['Magic', 'english', 'maths', 'Sakshulogy', 'Akshatanitration', 'Dhruvism'].map(
        val => ({
          name: `${val}`,
          code: `${val}`,
        }),
      ),
      blankCanvas,
      teachersAttendanceData: [
        {
          _id: 1000,
          teacherName: 'Ms. Shweta Tiwari',
          subjects: [],
          attendance: 94,
          events: [
            {
              date: new Date(2017, thisMonth, 6),
              type: 'is-info',
            },
            {
              date: new Date(2017, thisMonth, 8),
              type: 'is-danger',
            },
            {
              date: new Date(2017, thisMonth, 10),
              type: 'is-success',
            },
            {
              date: new Date(2017, thisMonth, 10),
              type: 'is-link',
            },
            {
              date: new Date(2017, thisMonth, 12),
              type: 'is-warning',
            },
            {
              date: new Date(2017, thisMonth, 16),
              type: 'is-danger',
            },
            {
              date: new Date(2017, thisMonth, 29),
              type: 'is-success',
            },
            {
              date: new Date(2017, thisMonth, 29),
              type: 'is-warning',
            },
            {
              date: new Date(2017, thisMonth, 29),
              type: 'is-info',
            },
          ],
        },
      ],
      filteredTeachersAttendanceData: [
        {
          _id: 1000,
          teacherName: 'Ms. Shweta Tiwari',
          subjects: [],
          attendance: 94,
          events: [
            {
              date: new Date(2017, thisMonth, 6),
              type: 'is-info',
            },
            {
              date: new Date(2017, thisMonth, 8),
              type: 'is-danger',
            },
            {
              date: new Date(2017, thisMonth, 10),
              type: 'is-success',
            },
            {
              date: new Date(2017, thisMonth, 10),
              type: 'is-link',
            },
            {
              date: new Date(2017, thisMonth, 12),
              type: 'is-warning',
            },
            {
              date: new Date(2017, thisMonth, 16),
              type: 'is-danger',
            },
            {
              date: new Date(2017, thisMonth, 29),
              type: 'is-success',
            },
            {
              date: new Date(2017, thisMonth, 29),
              type: 'is-warning',
            },
            {
              date: new Date(2017, thisMonth, 29),
              type: 'is-info',
            },
          ],
        },
      ],
    };
  },
  beforeMount() {
    this.getDataFromAPI();
  },
  mounted() {
    this.updateCalendarDesign();
  },
  updated() {
    this.updateCalendarDesign();
  },
  computed: {},
  methods: {
    getDataFromAPI() {
      this.$http
        .get('teacher/attendance')
        .then((res) => {
          const teacherAttendance = res.data.teachers;
          const teacherDataCalendar = teacherAttendance.map((item) => {
            const processedTeacherData = this.calculateCurrentTeacherData(item);
            return {
            // for every teacher
              ...item,
              teacherName: item.name,
              subjects: item.subjects,
              attendancePercentage: processedTeacherData.totalAttendancePercentage,
              events: processedTeacherData.teacherAttendanceEvents,
              selected: {
                year: this.selected.year,
                month: this.selected.month,
              },
            };
          });

          this.teachersAttendanceData = teacherDataCalendar;
          this.filteredTeachersAttendanceData = teacherDataCalendar;
        })
        .catch(e => console.log(e));
    },
    calculateCurrentTeacherData(data) {
      const teacherAttendanceEvents = [];
      const totalAttendancePercentage = {};

      // Iterate for every teacher - API data
      Object.keys(data.attendanceMap).forEach((year) => {
        const months = data.attendanceMap[year];
        totalAttendancePercentage[year] = [];

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
              type: this.getEventColor(date),
            };
            teacherAttendanceEvents.push(attendanceEvent);
          });

          // calc attendance for each month
          currMonthAttendance = (presentDays / totalDays) * 100;
          totalAttendancePercentage[year].push(currMonthAttendance);
        });
      });

      return {
        teacherAttendanceEvents,
        totalAttendancePercentage,
      };
    },
    getEventColor() {
      // if (day.holiday) return 'is-warning';

      // if (day.status) return 'is-danger';
      return 'is-success';
    },
    getPercentageColor(percentage) {
      if (percentage >= 80) return 'green';
      if (percentage < 80 && percentage >= 60) return 'yellow';
      return 'red';
    },
    filterWithSubjects(filteredSubjects = []) {
      this.notFound = false;
      if (!filteredSubjects.length) {
        this.filteredTeachersAttendanceData = this.teachersAttendanceData;
        return;
      }
      this.filteredTeachersAttendanceData = this.teachersAttendanceData.filter(teacher => filteredSubjects.some(subject => teacher.subjects.includes(subject.name)));
      if (!this.filteredTeachersAttendanceData.length) this.notFound = true;
    },
    searchByName(teacherName) {
      this.notFound = false;
      this.filteredTeachersAttendanceData = this.teachersAttendanceData.filter(teacher => teacher.name.toLowerCase().includes(teacherName.toLowerCase()));
      if (!this.filteredTeachersAttendanceData.length) this.notFound = true;
    },
    updateCalendarDesign() {
      const datepickerContent = document.getElementsByClassName('datepicker-content');
      const dropdownContent = document.getElementsByClassName('dropdown-content');
      const dropdownItem = document.getElementsByClassName('dropdown-item');

      for (let i = 0; i < datepickerContent.length; i += 1) {
        datepickerContent[i].style.height = '15rem';
        dropdownContent[i].style.boxShadow = 'none';
        dropdownItem[i].style.padding = '0';
      }
    },
  },
};
</script>

<style scoped>
.main-container-teacher-attendance {
  height: 100vh;
  margin-top: 3rem;
}

.dflex {
  display: flex;
  justify-content: start;
  /* overflow-x: scroll; */
}

.dflex-c {
  display: flex;
  justify-content: center;
  align-items: center;
}

.not-found-img {
  width: 45%;
}

.teacher-card {
  margin: 1rem;
  padding: 1 rem;
}

.teacher-info {
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.green {
  color: green !important;
}
.yellow {
  color: coral !important;
}
.red {
  color: red !important;
}

.teacher-card-wrapper {
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
}

.mr-1 {
  margin-right: 5px;
}

.not-found-txt {
  font-size: 3rem;
  font-weight: 500;
  color: #7957d5;
  margin: auto;
  width: 45%;
}

::-webkit-scrollbar {
  height: 5px;
  width: 0;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px grey;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #7957d5;
  border-radius: 10px;
}

.no-scroll {
  overflow-x: hidden !important;
}

.scroll {
  overflow-x: scroll;
}
</style>
