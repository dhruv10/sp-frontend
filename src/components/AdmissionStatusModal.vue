<template>
  <div class="main-container">
    <header class="card-header">
      <p
        class="card-header-title header"
      >{{action === 0 ? "Schedule Test Date" : (action == 1 ? "Add Result" : "Schedule Interview") }}</p>
    </header>
    <div v-if="action === 0" class="card-area">
      <b-datepicker v-model="testDate" inline :unselectable-days-of-week="[0, 7]" :min-date="new Date()"></b-datepicker>
      <div class="submit">
        <b-button outlined type="is-primary" class="mr-1" @click="closeModal">Cancel</b-button>
        <b-button
          icon-right="arrow-circle-right"
          type="is-primary"
          class="submit"
          @click="schedule"
        >Schedule</b-button>
      </div>
    </div>
    <div v-else-if="action === 1">
      <div class="card-area">
        <b-field class="field">
          <b-radio-button v-model="result" name="name" native-value="Pass" type="is-success">
            <p class="result">Pass</p>
          </b-radio-button>
          <b-radio-button v-model="result" name="name" native-value="Fail" type="is-danger">
            <p class="result">Fail</p>
          </b-radio-button>
        </b-field>
      </div>
      <div class="submit mr-2">
        <b-button outlined type="is-primary" class="mr-1" @click="closeModal">Cancel</b-button>
        <b-button
          icon-right="arrow-circle-right"
          type="is-primary"
          class="submit"
          @click="submitResult"
        >Submit Result</b-button>
      </div>
    </div>
    <div v-else-if="action == 2" class="card-area">
      <b-datepicker v-model="interviewDate" inline :unselectable-days-of-week="[0, 7]" :min-date="new Date()"></b-datepicker>
      <div class="submit mr-2">
        <b-button outlined type="is-primary" class="mr-1" @click="closeModal">Cancel</b-button>
        <b-button
          icon-right="arrow-circle-right"
          type="is-primary"
          class="submit"
          @click="scheduleInterview"
        >Schedule Interview</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      testDate: new Date(),
      interviewDate: new Date(),
      result: '',
    };
  },
  props: {
    action: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    schedule() {
      this.$emit('setDate', this.testDate);
      this.$emit('closeModal');
    },
    submitResult() {
      this.result = this.result === 'Pass';
      this.$emit('setResult', this.result);
      this.$emit('closeModal');
    },
    scheduleInterview() {
      console.log(this.interviewDate);
      this.$emit('closeModal');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/app.global.scss";

.control {
  text-align: center !important;
  margin-bottom: 20px;
}
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
    margin: 20px;
  }
}
.submit {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
.mr-1 {
  margin-right: 1rem;
}
.result {
  padding: 40px;
  font-size: 18px;
}
.field {
  justify-content: center !important;
}
</style>
