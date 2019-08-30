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
            <b-input v-model="subject.code"></b-input>
          </b-field>
          <b-field label="Subject Name" class="mid">
            <b-input v-model="subject.name"></b-input>
          </b-field>
        </div>
        <b-field label="Type">
          <div>
            <div class="field">
              <b-radio v-model="radio" :native-value="false">Mandatory</b-radio>
            </div>
            <div class="field">
              <b-radio v-model="radio" :native-value="true">Optional</b-radio>
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
    subjectData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      startLoading: false,
      radio: 'Mandatory',
      subject: {},
    };
  },
  mounted() {
    if (this.formType === 'edit') {
      this.subject = this.subjectData;
    }
    console.log(this.subjectData);
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    addSubject() {
      console.log(this.subject);
      const { snackbar } = this.$buefy;
      this.startLoading = true;
      this.$http
        .post('/subject', { ...this.subject })
        .then(() => {
          this.startLoading = false;
          this.$emit('getTableData');
          this.$emit('closeModal');
          snackbar.open('Subject added!');
        })
        .catch(() => {
          this.startLoading = false;
          this.$emit('closeModal');
          snackbar.open('Something went wrong. Please try again later!');
        });
    },
    editSubject() {
      const { snackbar } = this.$buefy;
      this.startLoading = true;
      const editedSub = {
        ...this.subject,
        optional: Boolean(this.subject.optional === 'Optional'),
      };
      delete editedSub._id;
      this.$http
        .put(`/subject/${this.subjectData._id}`, { ...editedSub })
        .then(() => {
          this.startLoading = false;
          this.$emit('getTableData');
          this.$emit('closeModal');
          snackbar.open('Subject edited!');
        })
        .catch(() => {
          this.startLoading = false;
          this.$emit('closeModal');
          snackbar.open('Something went wrong. Please try again later!');
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
