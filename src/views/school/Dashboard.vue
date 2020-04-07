<template>
  <div class="dashboard-root-container">
    <div class="m-1">
      <span style="color: #B8B8B8;">
        Principal /
      </span>
      <span class="title m-1">
        Dashboard
      </span>
    </div>
    <section class="hero is-main-hero">
      <div class="hero-body">
        <!-- <img
          alt="avatar"
          class="avatar"
          src="https://admin-one-vue-cli.justboil.me/data-sources/avatars/annie-spratt-121576-unsplash.jpg"
        /> -->
        <div>
          <p class="is-size-3 has-text-black has-text-weight-medium">{{ schoolDetails.name }}</p>
          <p class="adjustment-address is-size-6 has-text-weight-bold">
            {{ schoolDetails.address }}
          </p>
          <p class="tasks-left">
            You have
            <b>6 tasks</b> due today and
            <b>84 inquiries</b>
          </p>
        </div>
      </div>
    </section>
    <section class="columns main-body is-desktop">
      <div class="column">
        <info-card
          route="teachers"
          title="Total Teachers"
          :value="totalTeachers || 0"
          mainIcon="chalkboard-teacher"
          colorClass="has-text-success"
        />
      </div>
      <div class="column">
        <info-card
          route="student"
          title="Total Students"
          :value="totalStudents || 0"
          mainIcon="user-graduate"
          colorClass="has-text-warning"
        />
      </div>
      <div class="column">
        <info-card
          route="receptionist"
          title="Daily Visitors"
          value="12"
          mainIcon="users"
          colorClass="has-text-info"
        />
      </div>
      <div class="column">
        <info-card
          route="receptionist/admission"
          title="Admsn. Enqs."
          :value="totalAdmissionQueries || 0"
          mainIcon="bell"
          colorClass="has-text-danger"
        />
      </div>
    </section>
    <section class="main-body columns is-desktop">
      <div class="column is-6">
        <info-card message="Student attendance Chart" route="teachers" styles="height: 100%">
          <template v-slot:body>
              <Chart
                chartType="line"
                :chartData="chartData.data"
                :chartOptions="chartData.options"
              />
          </template>
        </info-card>
      </div>
      <div class="column is-6">
        <div class="columns">
          <div class="column">
            <info-card
              route="classrooms"
              mainIcon="book-reader"
              title="Total Classrooms"
              :value="totalClassrooms || 0"
              colorClass="has-text-primary"
            />
          </div>
          <div class="column">
            <info-card
              route="subjects"
              mainIcon="book"
              title="All Subjects"
              :value="totalSubjects || 0"
              colorClass="has-text-warning"
            />
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <info-card
              route="salary-grade"
              mainIcon="money-bill-wave"
              title="Salary Grades"
              :value="totalSalaryGrades || 0"
              colorClass="has-text-success"
            />
          </div>
          <div class="column">
            <info-card
              route="department"
              mainIcon="box"
              title="All Departments"
              :value="totalDepartments || 0"
              colorClass="has-text-info"
            />
          </div>
        </div>
      </div>
    </section>
    <section class="main-body columns is-desktop">
      <div class="column is-3">
        <info-card message="Doughnut chart" route="teachers" styles="height: 100%">
          <template v-slot:body>
            <Chart
              chartType="doughnut"
              :chartData="chartData.data"
              :chartOptions="chartData.options"
            />
          </template>
        </info-card>
      </div>
      <div class="column is-3">
        <div class="columns">
          <div class="column">
            <info-card
              route="teachers"
              mainIcon="bus"
              title="Check your"
              value="Buses"
              colorClass="has-text-warning"
            />
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <info-card
              route="teachers"
              mainIcon="rupee-sign"
              title="Submit school"
              value="Fees"
              colorClass="has-text-success"
            />
          </div>
        </div>
      </div>
      <div class="column is-3">
        <info-card message="Doughnut chart" route="teachers" styles="height: 100%">
          <template v-slot:body>
            <Chart
              chartType="doughnut"
              :chartData="chartData.data"
              :chartOptions="chartData.options"
            />
          </template>
        </info-card>
      </div>
      <div class="column is-3">
        <info-card message="Doughnut chart" route="teachers" styles="height: 100%">
          <template v-slot:body>
            <Chart
              chartType="doughnut"
              :chartData="chartData.data"
              :chartOptions="chartData.options"
            />
          </template>
        </info-card>
      </div>
    </section>
  </div>
</template>

<script>
import Chart from '@/components/Chart.vue';
import InfoCard from '@/components/dashboard/InfoCard.vue';

export default {
  name: 'dashboard',
  components: {
    Chart,
    InfoCard,
  },
  data() {
    return {
      schoolDetails: {},
      totalStudents: 0,
      totalTeachers: 0,
      totalClassrooms: 0,
      totalSubjects: 0,
      totalDepartments: 0,
      totalSalaryGrades: 0,
      totalAdmissionQueries: 0,
      chartData: {
        data: {
          labels: ['Red', 'Blue'],
          datasets: [
            {
              label: '# of Students',
              data: [12, 19],
              backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
              borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          cutoutPercentage: 75,
          legend: {
            display: false,
          },
          title: {
            display: true,
          },
        },
      },
    };
  },
  mounted() {
    this.getStatsFromAPI();
    this.schoolDetails = JSON.parse(localStorage.getItem('schoolDetails'));
  },
  methods: {
    getStatsFromAPI() {
      this.$http.get('dashboard/analytics').then((response) => {
        const apiResponse = response.data.result;
        this.totalStudents = apiResponse.students.total;
        this.totalTeachers = apiResponse.teachers.total;
        this.totalClassrooms = apiResponse.classrooms.total;
        this.totalSubjects = apiResponse.subjects.total;
        this.totalDepartments = apiResponse.departments.total;
        this.totalSalaryGrades = apiResponse.salaryGrades.total;
        this.totalAdmissionQueries = apiResponse.admissionQueries.total;
      });
    },
  },
};
</script>

<style scoped>
.dashboard-root-container {
  margin-top: 50px;
}
.is-main-hero {
  background-image: url("https://admin-one-vue-cli.justboil.me/img/trianglify-bw-50@2x.37c358f2.png");
  background-size: cover;
}
.hero {
  height: 160px;
  background-color: #fff;
  border-bottom: 1px solid rgba(24, 28, 33, 0.06);
}
.hero-body {
  padding: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.main-chart {
  padding: 0.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.avatar {
  border-radius: 50%;
  width: 14%;
  margin-right: 1rem;
}
.main-body {
  padding: 0.5rem 0;
  margin-top: 0.5rem;
}
.adjustment-address {
  margin-top: -8px;
  color: grey;
}
.tasks-left {
  margin-top: 10px;
}
</style>
