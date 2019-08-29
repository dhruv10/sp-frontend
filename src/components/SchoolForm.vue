<template>
  <div class="main-container">
    <div class="card">
      <header class="card-header">
        <p
          class="card-header-title header"
        >{{ formType === 'add' ? 'Add School' : 'Edit School' }}</p>
      </header>
    </div>
    <div class="card-content">
      <div class="content card-area">
        <div class="columns">
          <div class="column is-8">
            <section>
              <b-field label="School Name">
                <b-input v-model="school.name"></b-input>
              </b-field>

              <b-field label="Address">
                <b-input v-model="school.address" class="address" maxlength="200" type="textarea"></b-input>
              </b-field>
            </section>
          </div>
          <div class="column is-4 mt-2">
            <b-field>
              <b-upload v-model="school.dropFiles" multiple drag-drop>
                <section class="uploadsection">
                  <div class="content has-text-centered">
                    <p>
                      <b-icon icon="upload" size="is-large"></b-icon>
                    </p>
                    <p class="smalltext">Upload the file in PDF format</p>
                  </div>
                </section>
              </b-upload>
            </b-field>

            <div class="tags">
              <span v-for="(file, index) in school.dropFiles" :key="index" class="tag is-primary">
                {{file.name}}
                <button
                  class="delete is-small"
                  type="button"
                  @click="deleteDropFile(index)"
                ></button>
              </span>
            </div>

            <b-field label="School Code">
              <b-input icon-pack="fas" v-model="school.code" disabled></b-input>
            </b-field>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <section>
              <b-field label="Email">
                <b-input type="email" v-model="school.email" maxlength="30"></b-input>
              </b-field>

              <div class="columns">
                <div class="column">
                  <section>
                    <b-field label="Phone Number">
                      <b-input v-model="school.phone"></b-input>
                    </b-field>
                    <b-field label="Registration Date">
                      <b-datepicker
                        placeholder="Type or select a date..."
                        icon="calendar-today"
                        v-model="school.registrationDate"
                        editable
                      ></b-datepicker>
                    </b-field>
                  </section>
                </div>
                <div class="column">
                  <section>
                    <b-field label="Fax">
                      <b-input v-model="school.fax"></b-input>
                    </b-field>
                    <b-field label="Subscription Date">
                      <b-datepicker
                        placeholder="Type or select a date..."
                        icon="calendar-today"
                        v-model="school.subscriptionDate"
                        editable
                      ></b-datepicker>
                    </b-field>
                  </section>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <b-field label="Facebook">
              <b-input v-model="school.fb"></b-input>
            </b-field>

            <b-field label="Twitter">
              <b-input v-model="school.twitter"></b-input>
            </b-field>
          </div>
        </div>
      </div>
      <div class="submit">
        <b-button outlined type="is-primary" class="mr-1">Cancel</b-button>
        <b-button
          :type="startLoading ? 'is-loading is-primary' : 'is-primary'"
          icon-right="arrow-circle-right"
        >{{ formType === 'add' ? 'Add School' : 'Edit School' }}</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SchoolForm',
  props: {
    formType: {
      type: String,
      default: 'add',
    },
  },
  data() {
    return {
      startLoading: false,
      school: {
        name: '',
        address: '',
        dropFiles: [],
        basicSalary: '',
        code: Math.floor(Math.random() * 3000),
        email: '',
        phone: '',
        registrationDate: '',
        fax: '',
        subscriptionDate: '',
        fb: '',
        twitter: '',
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    submitFormData() {
      console.log('school form object: ', this.school);
    },
    addSchool() {
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
    editSchool() {
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
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
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
}
.w-65 {
  width: 65%;
}
.w-25 {
  width: 25%;
}
.dropfile {
  width: 16rem;
  height: 12rem;
}
.mr-1 {
  margin-right: 1rem;
}
.submit {
  display: flex;
  justify-content: flex-end;
}
.address {
  min-height: 8rem !important;
}
</style>