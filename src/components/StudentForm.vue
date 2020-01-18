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
        <section>
          <h4>Student Details</h4>
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
            <div class="column is-4">
              <b-field>
                <b-upload required @input="uploadPhoto($event, student)" drag-drop>
                  <section class="uploadsection photoUpload">
                    <div class="content has-text-centered">
                      <p>
                        <b-icon icon="upload" size="is-large"></b-icon>
                      </p>
                      <p>Upload photo less than 2MB</p>
                    </div>
                  </section>
                </b-upload>
              </b-field>

              <div v-if="student.photoUploadValue">
                <b-progress
                  :value="student.photoUploadValue"
                  type="is-info"
                  show-value
                  format="percent"
                ></b-progress>
              </div>

              <div class="tags">
                <span v-for="(file, index) in student.photo" :key="index" class="tag is-primary">
                  {{file.name}}
                  <button
                    class="delete is-small"
                    type="button"
                    @click="deleteDropFile(index, student.photo)"
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
                <b-input icon-pack="fas" type="email" required v-model="student.personalEmail"></b-input>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Phone Number">
                <b-input icon-pack="fas" required v-model="student.phoneNumber"></b-input>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column is-12">
              <b-field label="Permanent Address">
                <b-input
                  class="notearea"
                  required
                  v-model="student.permanentAddress"
                  maxlength="200"
                  type="textarea"
                ></b-input>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field label="Roll Number">
                <b-input type="number" required v-model="student.rollNo"></b-input>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Enrollment Number">
                <b-input type="number" required v-model="student.enrollmentNo"></b-input>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Admission Date">
                <b-datepicker
                  placeholder="Click to select..."
                  icon="calendar-today"
                  icon-pack="fas"
                  required
                  v-model="student.admissionDate"
                ></b-datepicker>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field label="Admission Number">
                <b-input type="number" required v-model="student.admissionNo"></b-input>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Blood Group">
                <MultiSelect
                  required
                  v-model="student.bloodGroup"
                  :isMultiple="false"
                  :allOptions="allBloodGroups"
                  placeholder="Select Blood Group"
                />
              </b-field>
            </div>
            <div class="column">
              <b-field label="Gender">
                <MultiSelect
                  required
                  v-model="student.gender"
                  :isMultiple="false"
                  :allOptions="genderList"
                  placeholder="Select the gender"
                />
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column is-half">
              <b-field label="Link Class">
                <MultiSelect
                  required
                  v-model="student.class"
                  :isMultiple="false"
                  :allOptions="classlist"
                  placeholder="Select a class"
                />
              </b-field>
            </div>
            <div class="column is-half">
              <b-field label="Link Subjects">
                <MultiSelect
                  required
                  v-model="student.subjects"
                  :isMultiple="true"
                  :allOptions="subjectsList"
                  placeholder="Select subjects"
                />
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column is-8">
              <b-field label="Health Disorder Note (if any)">
                <b-input
                  v-model="student.healthDisorderNote"
                  class="notearea"
                  maxlength="200"
                  type="textarea"
                ></b-input>
              </b-field>
            </div>
            <div class="column is-4 mt-2">
              <b-field>
                <b-upload class="dropfile" required v-model="student.healthDocs" multiple drag-drop>
                  <section class="healthUpload">
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
          <h4>Father Details</h4>
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
                <b-upload required @input="uploadPhoto($event, student.fatherInfo)" drag-drop>
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

              <div v-if="student.fatherInfo.photoUploadValue">
                <b-progress
                  :value="student.fatherInfo.photoUploadValue"
                  type="is-info"
                  show-value
                  format="percent"
                ></b-progress>
              </div>

              <div class="tags">
                <span
                  v-for="(file, index) in student.fatherInfo.photo"
                  :key="index"
                  class="tag is-primary"
                >
                  {{file.name}}
                  <button
                    class="delete is-small"
                    type="button"
                    @click="deleteDropFile(index, student.fatherInfo.photo)"
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
                <MultiSelect
                  required
                  v-model="student.fatherInfo.bloodGroup"
                  :isMultiple="false"
                  :allOptions="allBloodGroups"
                  placeholder="Select Blood Group"
                />
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
          <h4>Mother Details</h4>
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
                <b-upload required @input="uploadPhoto($event, student.motherInfo)" drag-drop>
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

              <div v-if="student.motherInfo.photoUploadValue">
                <b-progress
                  :value="student.motherInfo.photoUploadValue"
                  type="is-info"
                  show-value
                  format="percent"
                ></b-progress>
              </div>

              <div class="tags">
                <span
                  v-for="(file, index) in student.motherInfo.photo"
                  :key="index"
                  class="tag is-primary"
                >
                  {{file.name}}
                  <button
                    class="delete is-small"
                    type="button"
                    @click="deleteDropFile(index, student.motherInfo.photo)"
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
                <MultiSelect
                  required
                  v-model="student.motherInfo.bloodGroup"
                  :isMultiple="false"
                  :allOptions="allBloodGroups"
                  placeholder="Select Blood Group"
                />
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
          <h4>Documents</h4>
          <div class="document-container">
            <div class="docs" v-for="i in docs" :key="i">
              <b-field class="upload-field">
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
                    @click="deleteDropFile(index, student.otherdocuments)"
                  ></button>
                </span>
              </div>
            </div>
          </div>
        </section>
        <div class="submit">
          <b-button outlined type="is-primary" class="mr-1" @click="closeModal()">Cancel</b-button>
          <b-button
            :type="startLoading ? 'is-loading is-primary' : 'is-primary'"
            @click="formType === 'add' ? addStudent() : editStudent()"
            icon-right="arrow-circle-right"
            class="submit"
          >{{ formType === "add" ? "Add Student" : "Edit Student" }}</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MultiSelect from '@/components/MultiSelect.vue';

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
    classrooms: {
      type: Array,
      default: () => [],
    },
    subject: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    MultiSelect,
  },
  data() {
    return {
      docs: [1, 2, 3, 4, 5, 6],
      startLoading: false,
      genderList: ['Male', 'Female'],
      classlist: [],
      subjectsList: [],
      allBloodGroups: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
      student: {
        name: '',
        username: '',
        personalEmail: '',
        phoneNumber: '',
        studentDOB: new Date(),
        nationality: '',
        photo: [],
        photoUploadValue: 0,
        rollNo: 0,
        enrollmentNo: 0,
        admissionDate: new Date(),
        admissionNo: 0,
        bloodGroup: '',
        gender: '',
        class: '',
        subjects: ['Maths', 'Science'],
        healthDisorderNote: '',
        healthDocs: [],
        fatherInfo: {
          name: '',
          phoneNumber: '',
          designation: '',
          bloodGroup: '',
          dob: new Date(),
          education: '',
          profession: '',
          photo: [],
          photoUploadValue: 0,
        },
        motherInfo: {
          name: '',
          phoneNumber: '',
          designation: '',
          bloodGroup: '',
          dob: new Date(),
          education: '',
          profession: '',
          photo: [],
          photoUploadValue: 0,
        },
        permanentAddress: '',
        otherdocuments: [],
      },
    };
  },
  mounted() {
    if (this.formType === 'edit') this.student = this.formData;
    this.classlist = this.classrooms.map(val => ({
      name: `${val.classSection} ${val.classNumber}`,
      code: `${val.classSection} ${val.classNumber}`,
    }));
    this.genderList = this.genderList.map(val => ({
      name: `${val}`,
      code: `${val}`,
    }));
    this.allBloodGroups = this.allBloodGroups.map(val => ({
      name: `${val}`,
      code: `${val}`,
    }));
    this.subjectsList = this.subject.map(val => ({
      name: `${val.name}`,
      _id: `${val._id}`,
      code: `${val.code}`,
    }));
  },
  methods: {
    uploadPhoto(file, instance) {
      this.$uploadFile(
        '/students',
        file.name + new Date().getTime(),
        file,
        (p) => {
          instance.photoUploadValue = p;
        },
      )
        .then((url) => {
          instance.photo.push({ name: file.name, url });
          instance.photoUploadValue = 0;
          console.log('instance photo', instance.photo);
        })
        .catch(console.log);
    },
    uploadMultipleDocs(file, instance) {
      this.$uploadFile(
        '/students',
        file.name + new Date().getTime(),
        file,
        (p) => {
          instance.photoUploadValue = p;
        },
      )
        .then((url) => {
          instance.photo.push({ name: file.name, url });
          instance.photoUploadValue = 0;
          console.log('instance photo', instance.photo);
        })
        .catch(console.log);
    },
    deleteDropFile(index, instance) {
      instance.splice(index, 1);
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
    margin: 0px 8px 8px 8px;
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
.photoUpload {
  padding: 0.8rem;
}
.healthUpload {
  padding: 0rem;
}
.samesection {
  padding: 0;
  margin-top: -1rem;
}
.document-container {
  display: flex;
  flex-wrap: wrap;
}
.docs {
  margin-right: 20px;
  margin-bottom: 20px;
}
.upload-field {
  width: 11rem;
}
</style>
