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
        <div class="mt-3">
          <div class="columns">
            <div class="column">
              <section>
                <b-field label="Grade Name">
                  <b-input icon-pack="fas" icon="credit-card"></b-input>
                </b-field>

                <div class="columns">
                  <div class="column">
                    <section>
                      <b-field label="Basic Salary">
                        <b-input type="number"></b-input>
                      </b-field>
                      <b-field label="Transport Allowance">
                        <b-input type="number"></b-input>
                      </b-field>
                      <b-field label="Over Time Hourly Rate">
                        <b-input type="number"></b-input>
                      </b-field>
                      <b-field label="Hourly Rate">
                        <b-input type="number"></b-input>
                      </b-field>
                    </section>
                  </div>
                  <div class="column">
                    <section>
                      <b-field label="House Rent">
                        <b-input type="number"></b-input>
                      </b-field>
                      <b-field label="Medical Allowance">
                        <b-input type="number"></b-input>
                      </b-field>
                      <b-field label="Provident Fund">
                        <b-input type="number"></b-input>
                      </b-field>
                      <b-field label="Taxation">
                        <b-input type="number"></b-input>
                      </b-field>
                    </section>
                  </div>
                </div>
                <b-field label="Total Allowance">
                  <b-input type="number"></b-input>
                </b-field>

                <b-field label="Total Deduction">
                  <b-input type="number"></b-input>
                </b-field>

                <b-field label="Gross Salary">
                  <b-input type="number"></b-input>
                </b-field>

                <b-field label="Net Salary">
                  <b-input type="number"></b-input>
                </b-field>

                <div class="submit">
                  <b-button
                    outlined
                    type="is-primary"
                    class="mr-1"
                  >Cancel</b-button>
                  <b-button
                    icon-right="arrow-circle-right"
                    type="is-primary"
                    class="submit"
                  >{{ formType === 'add' ? 'Add Salary Grade' : 'Edit Salary Grade' }}</b-button>
                </div>
              </section>
            </div>
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
  methods: {},
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
.mr-1 {
  margin-right: 1rem;
}
</style>
