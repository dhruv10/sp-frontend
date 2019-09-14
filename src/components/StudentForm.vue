<template>
  <div class="main-container">
    <div class="card">
      <header class="card-header">
        <p
          class="card-header-title header"
        >{{ formType === "add" ? "Add Student" : "Edit Student" }}</p>
      </header>
    </div>
    <div class="card-content">
      <div class="content card-area">
        <div class="mt-1">
          <div class="columns">
            <div class="column p0">
              <section>
                <p>Student Details</p>
                <div class="columns">
                  <div class="column is-8">
                    <b-field label="Student Name">
                      <b-input required v-model="student.name" icon-pack="fas" icon="user-graduate"></b-input>
                    </b-field>
                    <div class="columns">
                      <div class="column">
                        <b-field label="Date of birth">
                          <b-datepicker
                            placeholder="Click to select..."
                            icon="calendar-today"
                            icon-pack="fas"
                            required
                            v-model="student.studentDOB"
                          ></b-datepicker>
                        </b-field>
                      </div>
                      <div class="column">
                        <b-field label="Nationality">
                          <b-input icon-pack="fas" required v-model="student.nationality"></b-input>
                        </b-field>
                      </div>
                    </div>
                  </div>
                  <div class="column is-4 mt-2">
                    <b-field>
                      <b-upload required v-model="student.photo" multiple drag-drop>
                        <section class="uploadsection">
                          <div class="content has-text-centered">
                            <p>
                              <b-icon icon="upload" size="is-large"></b-icon>
                            </p>
                            <p>Upload photo less than 2MB</p>
                          </div>
                        </section>
                      </b-upload>
                    </b-field>

                    <div class="tags">
                      <span
                        v-for="(file, index) in student.photo"
                        :key="index"
                        class="tag is-primary"
                      >
                        {{file.name}}
                        <button
                          class="delete is-small"
                          type="button"
                          @click="deleteDropFile(index)"
                        ></button>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <b-field label="Username">
                      <b-input icon-pack="fas" required v-model="student.username"></b-input>
                    </b-field>
                  </div>
                  <div class="column">
                    <b-field label="Email ID">
                      <b-input icon-pack="fas" required v-model="student.personalEmail"></b-input>
                    </b-field>
                  </div>
                  <div class="column">
                    <b-field label="Phone Number">
                      <b-input icon-pack="fas" required v-model="student.phoneNumber"></b-input>
                    </b-field>
                  </div>
                </div>
                <div class="columns">
                  <div class="column is-half">
                    <b-field label="Roll Number">
                      <b-input type="number" required v-model="student.rollNo"></b-input>
                    </b-field>
                    <b-field label="Enrollment Number">
                      <b-input type="number" required v-model="student.enrollmentNo"></b-input>
                    </b-field>
                  </div>
                  <div class="column is-half">
                    <b-field label="Admission Date">
                      <b-datepicker
                        placeholder="Click to select..."
                        icon="calendar-today"
                        icon-pack="fas"
                        required
                        v-model="student.admissionDate"
                      ></b-datepicker>
                    </b-field>
                    <b-field label="Admission Number">
                      <b-input type="number" required v-model="student.admissionNo"></b-input>
                    </b-field>
                  </div>
                </div>
                <div class="columns">
                  <div class="column is-half">
                    <b-field label="Blood Group">
                      <b-select
                        placeholder="Select Blood Group"
                        required
                        v-model="student.bloodGroup"
                      >
                        <option v-for="i in allBloodGroups" :value="i" :key="i">{{ i }}</option>
                      </b-select>
                    </b-field>
                  </div>
                  <div class="column is-half">
                    <b-field label="Gender">
                      <b-select
                        placeholder="Select the Gender please"
                        required
                        v-model="student.gender"
                      >
                        <option v-for="option in gender" :value="option" :key="option">{{ option }}</option>
                      </b-select>
                    </b-field>
                  </div>
                </div>
                <div class="columns">
                  <div class="column is-half">
                    <b-field label="Link Class">
                      <b-select placeholder="Select a class" required v-model="student.class">
                        <option
                          v-for="option in student.classes"
                          :value="option"
                          :key="option"
                        >{{ option }}</option>
                      </b-select>
                    </b-field>
                  </div>
                  <div class="column is-half mt-2">
                    <div class="block">
                      <b-checkbox
                        required
                        v-model="student.checkboxGroup"
                        native-value="Science"
                      >Science</b-checkbox>
                      <b-checkbox
                        required
                        v-model="student.checkboxGroup"
                        native-value="Maths"
                      >Maths</b-checkbox>
                      <b-checkbox
                        required
                        v-model="student.checkboxGroup"
                        native-value="English"
                      >English</b-checkbox>
                      <br />
                      <b-checkbox
                        required
                        v-model="student.checkboxGroup"
                        native-value="Social Science"
                      >Social Science</b-checkbox>
                      <b-checkbox
                        required
                        v-model="student.checkboxGroup"
                        native-value="Sports"
                      >Sports</b-checkbox>
                    </div>
                  </div>
                </div>
                <div class="columns">
                  <div class="column is-8">
                    <b-field label="Health Disorder Note (if any)">
                      <b-input
                        required
                        v-model="student.healthDisorderNote"
                        class="notearea"
                        maxlength="200"
                        type="textarea"
                      ></b-input>
                    </b-field>
                  </div>
                  <div class="column is-4 mt-2">
                    <b-field>
                      <b-upload
                        class="dropfile"
                        required
                        v-model="student.healthDocs"
                        multiple
                        drag-drop
                      >
                        <section class="uploadsection">
                          <div class="content has-text-centered">
                            <p>
                              <b-icon icon-pack="fas" icon="envelope" size="is-large"></b-icon>
                            </p>
                            <p>Drop related documents here</p>
                          </div>
                        </section>
                      </b-upload>
                    </b-field>
                  </div>
                </div>
                <hr />
                <section>
                  <p>Father Details</p>
                  <div class="columns">
                    <div class="column is-8">
                      <b-field label="Father's Name">
                        <b-input icon-pack="fas" required v-model="student.fatherInfo.name"></b-input>
                      </b-field>
                      <b-field label="Mobile Number">
                        <b-input
                          icon-pack="fas"
                          required
                          v-model="student.fatherInfo.phoneNumber"
                          type="number"
                        ></b-input>
                      </b-field>
                    </div>
                    <div class="column is-4 mt-2">
                      <b-field>
                        <b-upload required v-model="student.fatherPhoto" multiple drag-drop>
                          <section class="uploadsection">
                            <div class="content has-text-centered">
                              <p>
                                <b-icon icon="upload" size="is-large"></b-icon>
                              </p>
                              <p>Upload photo less than 2MB</p>
                            </div>
                          </section>
                        </b-upload>
                      </b-field>

                      <div class="tags">
                        <span
                          v-for="(file, index) in student.fatherPhoto"
                          :key="index"
                          class="tag is-primary"
                        >
                          {{file.name}}
                          <button
                            class="delete is-small"
                            type="button"
                            @click="deleteDropFile(index)"
                          ></button>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="columns samesection">
                    <div class="column is-half">
                      <b-field label="Date of birth">
                        <b-datepicker
                          placeholder="Click to select..."
                          icon="calendar-today"
                          icon-pack="fas"
                          required
                          v-model="student.fatherInfo.dob"
                        ></b-datepicker>
                      </b-field>
                    </div>
                    <div class="column is-half">
                      <b-field label="Blood Group">
                        <b-select
                          placeholder="Select Blood Group"
                          required
                          v-model="student.fatherInfo.bloodGroup"
                        >
                          <option v-for="i in allBloodGroups" :value="i" :key="i">{{ i }}</option>
                        </b-select>
                      </b-field>
                    </div>
                  </div>
                  <div class="columns samesection">
                    <div class="column">
                      <b-field label="Father's Education">
                        <b-input icon-pack="fas" required v-model="student.fatherInfo.education"></b-input>
                      </b-field>
                      <b-field label="Father's Profession">
                        <b-input icon-pack="fas" required v-model="student.fatherInfo.profession"></b-input>
                      </b-field>
                      <b-field label="Father's Designation">
                        <b-input icon-pack="fas" required v-model="student.fatherInfo.designation"></b-input>
                      </b-field>
                    </div>
                  </div>
                </section>
                <hr />
                <section>
                  <p>Mother Details</p>
                  <div class="columns">
                    <div class="column is-8">
                      <b-field label="Mother's Name">
                        <b-input icon-pack="fas" required v-model="student.motherInfo.name"></b-input>
                      </b-field>
                      <b-field label="Mobile Number">
                        <b-input
                          icon-pack="fas"
                          type="number"
                          required
                          v-model="student.motherInfo.phoneNumber"
                        ></b-input>
                      </b-field>
                    </div>
                    <div class="column is-4 mt-2">
                      <b-field>
                        <b-upload required v-model="student.motherPhoto" multiple drag-drop>
                          <section class="uploadsection">
                            <div class="content has-text-centered">
                              <p>
                                <b-icon icon="upload" size="is-large"></b-icon>
                              </p>
                              <p>Upload photo less than 2MB</p>
                            </div>
                          </section>
                        </b-upload>
                      </b-field>

                      <div class="tags">
                        <span
                          v-for="(file, index) in student.motherPhoto"
                          :key="index"
                          class="tag is-primary"
                        >
                          {{file.name}}
                          <button
                            class="delete is-small"
                            type="button"
                            @click="deleteDropFile(index)"
                          ></button>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="columns samesection">
                    <div class="column is-half">
                      <b-field label="Date of birth">
                        <b-datepicker
                          placeholder="Click to select..."
                          icon="calendar-today"
                          icon-pack="fas"
                          required
                          v-model="student.motherDOB"
                        ></b-datepicker>
                      </b-field>
                    </div>
                    <div class="column is-half">
                      <b-field label="Blood Group">
                        <b-select
                          placeholder="Select Blood Group"
                          required
                          v-model="student.motherInfo.bloodGroup"
                        >
                          <option v-for="i in allBloodGroups" :value="i" :key="i">{{ i }}</option>
                        </b-select>
                      </b-field>
                    </div>
                  </div>
                  <div class="columns samesection">
                    <div class="column">
                      <b-field label="Mother's Education">
                        <b-input icon-pack="fas" required v-model="student.motherInfo.education"></b-input>
                      </b-field>
                      <b-field label="Mother's Profession">
                        <b-input icon-pack="fas" required v-model="student.motherInfo.profession"></b-input>
                      </b-field>
                      <b-field label="Mother's Designation">
                        <b-input icon-pack="fas" required v-model="student.motherInfo.designation"></b-input>
                      </b-field>
                    </div>
                  </div>
                </section>
                <hr />
                <section>
                  <p>Common Details</p>
                  <div class="columns">
                    <div class="column is-8">
                      <b-field label="Address">
                        <b-input
                          class="notearea"
                          required
                          v-model="student.permanentAddress"
                          maxlength="200"
                          type="textarea"
                        ></b-input>
                      </b-field>
                    </div>
                    <div class="column is-4 mt-2">
                      <b-field>
                        <b-upload required v-model="student.otherdocuments" multiple drag-drop>
                          <section class="uploadsection">
                            <div class="content has-text-centered">
                              <p>
                                <b-icon icon="upload" size="is-large"></b-icon>
                              </p>
                              <p>Upload all other important documents !</p>
                            </div>
                          </section>
                        </b-upload>
                      </b-field>

                      <div class="tags">
                        <span
                          v-for="(file, index) in student.otherdocuments"
                          :key="index"
                          class="tag is-primary"
                        >
                          {{file.name}}
                          <button
                            class="delete is-small"
                            type="button"
                            @click="deleteDropFile(index)"
                          ></button>
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              </section>
            </div>
          </div>
        </div>
        <div class="submit mt-2">
          <b-button outlined type="is-primary" class="mr-1" @click="closeModal()">Cancel</b-button>
          <b-button
            :type='startLoading ? "is-loading is-primary" : "is-primary"'
            @click='formType === "add" ? addStudent() : editStudent()'
            icon-right="arrow-circle-right"
            class="submit"
          >{{ formType === "add" ? "Add Student" : "Edit Student" }}</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentForm',
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
      gender: ['Male', 'Female'],
      classes: ['X-A', 'X-B', 'XI-A', 'XII-A', 'XI-C'],
      allBloodGroups: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
      student: {
        name: '',
        username: '',
        personalEmail: '',
        phoneNumber: '',
        studentDOB: new Date(),
        nationality: '',
        photo: [],
        rollNo: 0,
        enrollmentNo: 0,
        admissionDate: new Date(),
        admissionNo: 0,
        bloodGroup: '',
        gender: '',
        class: '',
        checkboxGroup: ['Maths', 'Science'],
        healthDisorderNote: '',
        healthDocs: [],
        fatherPhoto: [],
        fatherInfo: {
          name: '',
          phoneNumber: '',
          designation: '',
          bloodGroup: '',
          dob: new Date(),
          education: '',
          profession: '',
        },
        motherPhoto: [],
        motherInfo: {
          name: '',
          phoneNumber: '',
          designation: '',
          bloodGroup: '',
          dob: new Date(),
          education: '',
          profession: '',
        },
        permanentAddress: '',
        otherdocuments: [],
      },
    };
  },
  mounted() {
    if (this.formType === 'edit') this.student = this.formData;
  },
  methods: {
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
    },
    closeModal() {
      this.$emit('closeModal');
    },
    addStudent() {
      console.log(this.student);
      const { snackbar } = this.$buefy;
      this.startLoading = true;
      this.$http
        .post('/student', {
          ...this.student,
          password: this.student.enrollmentNo,
          birthDate: this.student.studentDOB.getTime().toString(),
          admissionDate: this.student.admissionDate.getTime().toString(),
        })
        .then(() => {
          this.startLoading = false;
          this.$emit('getTableData');
          this.$emit('closeModal');
          snackbar.open('Student Added!');
        })
        .catch(e => console.log(e));
    },
    editStudent() {
      const { snackbar } = this.$buefy;
      this.startLoading = true;
      this.$http
        .put(`/student/${this.formData._id}`, { ...this.student })
        .then(() => {
          this.startLoading = false;
          this.$emit('closeModal');
          snackbar.open('Student edited!');
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
.notearea {
  min-height: 7rem !important;
}
.uploadsection {
  padding: 0.1rem;
}
.samesection {
  padding: 0;
  margin-top: -1rem;
}
.p0 {
  padding: 0;
}
</style>
