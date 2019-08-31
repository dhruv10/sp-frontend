<template>
  <div class="main-container">
    <div class="card">
      <header class="card-header">
        <p
          class="card-header-title header"
        >{{ formType === 'add' ? 'Add Gatepass' : 'Edit Gatepass' }}</p>
      </header>
    </div>
    <div class="card-content">
      <div class="content card-area">
        <div class="mt-3">
          <div class="columns">
            <div class="column">
              <section>
                <b-field label="Student Name">
                  <b-input icon-pack="fas" v-model="gatepass.student"></b-input>
                </b-field>
              </section>
            </div>
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
          <div class="submit">
            <b-button outlined type="is-primary" class="mr-1" @click="closeModal()">Cancel</b-button>
            <b-button
              @click="formType === 'add' ? addGatepassRecord() : editGatepassRecord()"
              icon-right="arrow-circle-right"
              class="submit"
              :type="startLoading ? 'is-loading is-primary' : 'is-primary'"
            >{{ formType === 'add' ? 'Add Gatepass' : 'Edit Gatepass' }}</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GatepassForm',
  props: {
    formType: {
      type: String,
      default: 'add',
    },
    formData: {
      type: Object,
    },
  },
  data() {
    return {
      startLoading: false,
      gatepass: {
        student: '',
        guardianName: '',
        guardianPhone: '',
      },
    };
  },
  mounted() {
    if (this.formType === 'edit') this.gatepass = this.formData;
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    addGatepassRecord() {
      const { snackbar } = this.$buefy;
      this.startLoading = true;
      this.$http
        .post('/gatepass', { ...this.gatepass })
        .then(() => {
          this.startLoading = false;
          this.$emit('getTableData');
          this.$emit('closeModal');
          snackbar.open('Gatepass record added!');
        })
        .catch(e => console.log(e));
    },
    editGatepassRecord() {
      const { snackbar } = this.$buefy;
      this.startLoading = true;
      this.$http
        .put(`/gatepass/${this.formData._id}`, { ...this.gatepass })
        .then(() => {
          this.startLoading = false;
          this.$emit('closeModal');
          snackbar.open('Gatepass Record edited!');
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
