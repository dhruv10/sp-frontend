<template>
  <div class="main-container">
    <div class="card">
      <header class="card-header">
        <p
          class="card-header-title header"
        >{{ formType === 'add' ? 'Add Subject' : 'Edit Subject' }}</p>
      </header>
    </div>
    <div class="card-content">
      <div class="content card-area">
        <div class="line">
          <b-field label="Subject Code">
            <b-input></b-input>
          </b-field>
          <b-field label="Subject Name" class="mid">
            <b-input></b-input>
          </b-field>
        </div>
        <b-field label="Type">
          <div>
            <div class="field">
              <b-radio v-model="radio" native-value="Mandatory">Mandatory</b-radio>
            </div>
            <div class="field">
              <b-radio v-model="radio" native-value="Optional">Optional</b-radio>
            </div>
          </div>
        </b-field>
      </div>
    </div>
    <div class="footer-buttons">
      <b-button outlined type="is-primary" @click="closeModal()">Cancel</b-button>
      <b-button
        :type="startLoading ? 'is-loading is-primary' : 'is-primary'"
        class="submit"
        @click="formType === 'add' ? addSubject() : editSubject()"
      >{{ formType === 'add' ? 'Add Subject' : 'Apply Changes' }}</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubjectForm',
  props: {
    formType: {
      type: String,
      default: 'add',
    },
  },
  data() {
    return {
      startLoading: false,
      radio: 'Mandatory',
    };
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    addSubject() {
      const { snackbar } = this.$buefy;
      this.startLoading = true;
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({ error: false });
        }, 1000);
      }).then(() => {
        this.startLoading = false;
        this.$emit('closeModal');
        snackbar.open('Subject added!');
      });
    },
    editSubject() {
      const { snackbar } = this.$buefy;
      this.startLoading = true;
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({ error: false });
        }, 1000);
      }).then(() => {
        this.startLoading = false;
        this.$emit('closeModal');
        snackbar.open('Subject edited!');
      });
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
      margin-left: 25px;
      width: 100%;
    }
  }
  .footer-buttons {
    position: absolute;
    right: 30px;
    bottom: 20px;
    .submit {
      margin-left: 20px;
    }
  }
}
</style>
