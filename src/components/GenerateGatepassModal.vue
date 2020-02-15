<template>
  <div class="main-container">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title header">Generate Gatepass</p>
      </header>
      <div class="card-content">
        <div class="content card-area">
          <StudentSelection @getStudent="getStudent" />
        </div>
        <div class="columns">
        <div class="column is-full">
            <b-field label="Guardian's Name ">
              <b-input v-model="gatepass.guardianName" required></b-input>
            </b-field>
          </div>
        </div>
        <div class="columns">
          <div class="column is-half">
            <b-field label="Guardian's Relation ">
              <b-input v-model="gatepass.guardianRelation" required></b-input>
            </b-field>
          </div>
          <div class="column is-half">
            <b-field label="Guardian's Phone ">
              <b-input v-model="gatepass.guardianPhone" required></b-input>
            </b-field>
          </div>
        </div>
        <div class="columns">
          <div class="column is-full">
            <b-field label="Reason For Picking Student">
              <textarea class="textarea" v-model="gatepass.reason" required/>
            </b-field>
          </div>
        </div>
        <div class="submit">
          <b-button outlined type="is-primary" class="mr-1" @click="closeModal()">Cancel</b-button>
          <div data-v-step="2">
            <b-button
              @click="addGatepassRecord()"
              icon-right="arrow-circle-right"
              class="submit"
              :type="startLoading ? 'is-loading is-primary' : 'is-primary'"
            >Add Gatepass</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StudentSelection from './common/StudentSelection';

export default {
  data() {
    return {
      startLoading: false,
      gatepass: {
        guardianName: '',
        guardianPhone: '',
        guardianRelation: '',
        reason: '',
        student: '',
      },
    };
  },
  props: {
    steps: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    StudentSelection,
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    addGatepassRecord() {
      const { snackbar } = this.$buefy;
      // if(!this.gatepass.student) {
      //   snackbar.open('Student not selected!');
      //   return;
      // }
      this.startLoading = true;
      this.$http.post('/gatepass', this.gatepass).then((res) => {
        console.log(res);
        this.startLoading = false;
        this.closeModal();
        snackbar.open('Gatepass added successfully!');
        this.$emit('getTableData');
      }).catch((e) => {
        console.log(e);
        this.startLoading = false;
        this.closeModal();
        snackbar.open(e.message);
      });
    },
    getStudent(id) {
      this.gatepass.student = id;
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
    margin: 0px 8px 10px 8px;
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

<style scoped>
.v-tour__target--highlighted {
  box-shadow: 0 0 0 99999px rgba(0,0,0,.4);
}
</style>
