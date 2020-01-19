<template>
  <div class="main-container">
    <div class="card">
      <header class="card-header">
        <p
          class="card-header-title header"
        >{{ formType === 'add' ? 'Add Salary Grade' : 'Edit Salary Grade' }}</p>
      </header>
    </div>
    <div class="card-content">
      <div class="content card-area">
        <div class="columns">
          <div class="column">
            <section>
              <b-field label="Grade Name">
                <b-input icon-pack="fas" required v-model="salaryGrade.name" icon="credit-card"></b-input>
              </b-field>

              <div class="columns">
                <div class="column">
                  <section>
                    <b-field label="Basic Salary">
                      <b-input type="number" required v-model="salaryGrade.basicSalary"></b-input>
                    </b-field>
                    <b-field label="Transport Allowance">
                      <b-input type="number" required v-model="salaryGrade.transportAllowance"></b-input>
                    </b-field>
                    <b-field label="Over Time Hourly Rate">
                      <b-input type="number" required v-model="salaryGrade.overtimeHourlyRate"></b-input>
                    </b-field>
                    <b-field label="Hourly Rate">
                      <b-input type="number" required v-model="salaryGrade.hourlyRate"></b-input>
                    </b-field>
                  </section>
                </div>
                <div class="column">
                  <section>
                    <b-field label="House Rent">
                      <b-input type="number" required v-model="salaryGrade.houseRent"></b-input>
                    </b-field>
                    <b-field label="Medical Allowance">
                      <b-input type="number" required v-model="salaryGrade.medicalAllowance"></b-input>
                    </b-field>
                    <b-field label="Provident Fund">
                      <b-input type="number" required v-model="salaryGrade.providentFund"></b-input>
                    </b-field>
                    <b-field label="Taxation">
                      <b-input type="number" required v-model="salaryGrade.taxation"></b-input>
                    </b-field>
                  </section>
                </div>
              </div>
              <b-field label="Total Allowance">
                <b-input type="number" required v-model="salaryGrade.totalAllowance"></b-input>
              </b-field>

              <b-field label="Total Deduction">
                <b-input type="number" required v-model="salaryGrade.totalDeduction"></b-input>
              </b-field>

              <b-field label="Gross Salary">
                <b-input type="number" required v-model="salaryGrade.grossSalary"></b-input>
              </b-field>

              <b-field label="Net Salary">
                <b-input type="number" required v-model="salaryGrade.netSalary"></b-input>
              </b-field>

              <div class="submit mt-2">
                <b-button outlined type="is-primary" class="mr-1" @click="closeModal()">Cancel</b-button>
                <b-button
                  @click="formType === 'add' ? addSalaryGrade() : editSalaryGrade()"
                  icon-right="arrow-circle-right"
                  class="submit"
                  :type="startLoading ? 'is-loading is-primary' : 'is-primary'"
                >{{ formType === 'add' ? 'Add Salary Grade' : 'Edit Salary Grade' }}</b-button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SalaryGradeForm',
  props: {
    formType: {
      type: String,
      default: 'add',
    },
  },
  data() {
    return {
      startLoading: false,
      salaryGrade: {
        name: '',
        basicSalary: '',
        transportAllowance: '',
        overtimeHourlyRate: '',
        hourlyRate: '',
        houseRent: '',
        medicalAllowance: '',
        providentFund: '',
        taxation: '',
        totalAllowance: '',
        totalDeduction: '',
        grossSalary: '',
        netSalary: '',
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    addSalaryGrade() {
      const { snackbar } = this.$buefy;
      this.startLoading = true;
      this.$http
        .post('/salary-grade', { ...this.salaryGrade })
        .then(() => {
          this.startLoading = false;
          this.$emit('getTableData');
          this.$emit('closeModal');
          snackbar.open('Salary Grade added!');
        })
        .catch(e => console.log(e));
    },
    editSalaryGrade() {
      const { snackbar } = this.$buefy;
      this.startLoading = true;
      this.$http
        .put(`/salary-grade/${this.formData._id}`, { ...this.salaryGrade })
        .then((res) => {
          console.log('Edited Response: ', res);
          this.startLoading = false;
          this.$emit('closeModal');
          snackbar.open('Salary Grade edited!');
        })
        .catch(e => console.log(e));
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
    margin: 0px 8px 8px 8px;
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
.mr-1 {
  margin-right: 1rem;
}
</style>
