<template>
  <div :class="isScheduleTest ? 'main-container' : 'main-container result'">
    <header class="card-header">
      <p class="card-header-title header">{{isScheduleTest ? "Schedule Test Date" : "Add Result" }}</p>
    </header>
    <div v-if="isScheduleTest" class="card-area">
      <b-datepicker v-model="date" inline :unselectable-days-of-week="[0, 6]"></b-datepicker>
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
    <div v-else>
      <div class="card-area">
        <div class="field">
          <b-radio v-model="result" name="name" native-value="Pass">Pass</b-radio>
        </div>
        <div class="field">
          <b-radio v-model="result" name="name" native-value="Fail">Fail</b-radio>
        </div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: new Date(),
      result: '',
    };
  },
  props: {
    isScheduleTest: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    schedule() {
      this.$emit('setDate', this.date);
      this.$emit('closeModal');
    },
    submitResult() {
      this.$emit('setResult', this.result);
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
  width: calc(100% - 20rem);
}
.modal-content {
  max-width: 410px !important;
}
</style>
