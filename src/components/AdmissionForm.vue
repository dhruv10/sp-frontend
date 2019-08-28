<template>
  <div class="main-container">
    <div class="card">
      <header class="card-header">
        <p
          class="card-header-title header"
        >{{ formType === 'add' ? 'Add Admission Query' : 'Edit Admission Query' }}</p>
      </header>
    </div>
    <div class="card-content">
      <div class="content card-area">
        <div class="mt-3">
          <div class="columns">
            <div class="column is-8">
              <section>
                <b-field label="Student Name">
                  <b-input icon-pack="fas" icon="credit-card"></b-input>
                </b-field>
                <b-field label="Class">
                  <b-input icon-pack="fas"></b-input>
                </b-field>
              </section>
            </div>
            <div class="column is-4">
              <b-field label="Enrollment Number ">
                <b-input type="number" disabled></b-input>
              </b-field>
              <b-field label="Admission Slot">
                <b-select placeholder="Select a Slot">
                  <option v-for="option in slot" :value="option" :key="option">{{ option }}</option>
                </b-select>
              </b-field>
            </div>
          </div>
          <hr />
          <section>
            <h2>Guardian Details</h2>
            <div class="columns">
              <div class="column">
                <b-field label="Guardian's Name">
                  <b-input icon-pack="fas"></b-input>
                </b-field>
                <b-field label="Mobile Number">
                  <b-input icon-pack="fas" type="number"></b-input>
                </b-field>
                <b-field label="Guardian's Email">
                  <b-input icon-pack="fas" type="email"></b-input>
                </b-field>
                <b-field label="Guardian's Designation">
                  <b-input icon-pack="fas"></b-input>
                </b-field>
              </div>
            </div>
          </section>
        </div>
        <div class="submit">
          <b-button outlined type="is-primary" class="mr-1">Cancel</b-button>
          <b-button
            icon-right="arrow-circle-right"
            type="is-primary"
            class="submit"
          >{{ formType === 'add' ? 'Add Admission Query' : 'Edit Admission Query' }}</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdmissionForm',
  props: {
    formType: {
      type: String,
      default: 'add',
    },
    post: Object,
  },
  data() {
    return {
      slot: ['a', 'b', 'c'],
    };
  },
  mounted() {},
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

.notearea {
  min-height: 7rem !important;
}
</style>
