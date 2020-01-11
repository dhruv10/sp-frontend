<template>
  <div class="main-container">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title header">Generate Gatepass</p>
      </header>
      <div class="card-content">
        <div class="content card-area">
          <StudentSelection/>
        </div>
        <div class="columns">
          <div class="column is-half">
            <b-field label="Guardian's Name ">
              <b-input v-model="gatepass.guardianName"></b-input>
            </b-field>
          </div>
          <div class="column is-half">
            <b-field label="Guardian's Phone ">
              <b-input v-model="gatepass.guardianPhone"></b-input>
            </b-field>
          </div>
        </div>
        <div class="columns">
          <div class="column is-full">
            <b-field label="Reason For Picking Student">
              <textarea class="textarea"/>
            </b-field>
          </div>
        </div>
        <div class="submit">
          <b-button outlined type="is-primary" class="mr-1" @click="closeModal()">Cancel</b-button>
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
</template>

<script>
import StudentSelection from './StudentSelection';

export default {
  data() {
    return {
      startLoading: false,
      gatepass: {
        guardianName: '',
        guardianPhone: '',
      },
    };
  },
  components: {
    StudentSelection,
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    addGatepassRecord() {
      this.startLoading = true;
      setTimeout(() => {
        this.startLoading = false;
        this.closeModal();
      }, 2000);
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
