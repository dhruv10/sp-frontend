<template>
  <div class="main-container">
    <div class="card">
      <header class="card-header">
        <p
          class="card-header-title header"
        >{{ formType === 'add' ? 'Add Student' : 'Edit Student' }}</p>
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
                      <b-input v-model="student.name" icon-pack="fas" icon="user-graduate"></b-input>
                    </b-field>
                    <div class="columns">
                      <div class="column">
                        <b-field label="Date of birth">
                          <b-input type="date" v-model="student.date"></b-input>
                        </b-field>
                      </div>
                      <div class="column">
                        <b-field label="Nationality">
                          <b-input icon-pack="fas" v-model="student.nationality"></b-input>
                        </b-field>
                      </div>
                    </div>
                  </div>
                  <div class="column is-4 mt-2">
                    <b-field>
                      <b-upload v-model="student.photo" multiple drag-drop>
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
                  <div class="column is-half">
                    <b-field label="Roll Number">
                      <b-input type="number" v-model="student.rollno"></b-input>
                    </b-field>
                    <b-field label="Enrollment Number">
                      <b-input type="number" v-model="student.enrollmentno"></b-input>
                    </b-field>
                  </div>
                  <div class="column is-half">
                    <b-field label="Admission Date">
                      <b-input type="date" v-model="student.admissiondate"></b-input>
                    </b-field>
                    <b-field label="Admission Number">
                      <b-input type="number" v-model="student.admissionno"></b-input>
                    </b-field>
                  </div>
                </div>
                <div class="columns">
                  <div class="column is-half">
                    <div class="columns">
                      <div class="column">
                        <b-field label="Blood Group">
                          <b-input icon-pack="fas" v-model="student.bloodgroup"></b-input>
                        </b-field>
                      </div>
                      <div class="column">
                        <b-field label="Link Class">
                          <b-select placeholder="Select a class">
                            <option
                              v-for="option in student.classes"
                              :value="option"
                              :key="option"
                            >{{ option }}</option>
                          </b-select>
                        </b-field>
                      </div>
                    </div>
                  </div>
                  <div class="column is-half mt-2">
                    <div class="block">
                      <b-checkbox v-model="student.checkboxGroup" native-value="Science">Science</b-checkbox>
                      <b-checkbox v-model="student.checkboxGroup" native-value="Maths">Maths</b-checkbox>
                      <b-checkbox v-model="student.checkboxGroup" native-value="English">English</b-checkbox>
                      <br />
                      <b-checkbox
                        v-model="student.checkboxGroup"
                        native-value="Social Science"
                      >Social Science</b-checkbox>
                      <b-checkbox v-model="student.checkboxGroup" native-value="Sports">Sports</b-checkbox>
                    </div>
                  </div>
                </div>
                <div class="columns">
                  <div class="column is-8">
                    <b-field label="Health Disorder Note (if any)">
                      <b-input
                        v-model="student.checkboxGroup"
                        class="notearea"
                        maxlength="200"
                        type="textarea"
                      ></b-input>
                    </b-field>
                  </div>
                  <div class="column is-4 mt-2">
                    <b-field>
                      <b-upload class="dropfile" v-model="student.healthDocs" multiple drag-drop>
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
                        <b-input icon-pack="fas" v-model="student.fatherName"></b-input>
                      </b-field>
                      <b-field label="Mobile Number">
                        <b-input icon-pack="fas" v-model="student.fatherMobileNo" type="number"></b-input>
                      </b-field>
                    </div>
                    <div class="column is-4 mt-2">
                      <b-field>
                        <b-upload v-model="student.fatherPhoto" multiple drag-drop>
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
                        <b-input type="date" v-model="student.fatherDOB"></b-input>
                      </b-field>
                    </div>
                    <div class="column is-half">
                      <b-field label="Blood Group">
                        <b-input icon-pack="fas" v-model="student.fatherBloodGroup"></b-input>
                      </b-field>
                    </div>
                  </div>
                  <div class="columns samesection">
                    <div class="column">
                      <b-field label="Father's Education">
                        <b-input icon-pack="fas" v-model="student.fatherEducation"></b-input>
                      </b-field>
                      <b-field label="Father's Profession">
                        <b-input icon-pack="fas" v-model="student.fatherProfession"></b-input>
                      </b-field>
                      <b-field label="Father's Designation">
                        <b-input icon-pack="fas" v-model="student.fatherDesignation"></b-input>
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
                        <b-input icon-pack="fas" v-model="student.motherName"></b-input>
                      </b-field>
                      <b-field label="Mobile Number">
                        <b-input icon-pack="fas" type="number" v-model="student.motherMobileNo"></b-input>
                      </b-field>
                    </div>
                    <div class="column is-4 mt-2">
                      <b-field>
                        <b-upload v-model="student.motherPhoto" multiple drag-drop>
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
                        <b-input type="date" v-model="student.motherDOB"></b-input>
                      </b-field>
                    </div>
                    <div class="column is-half">
                      <b-field label="Blood Group">
                        <b-input icon-pack="fas" v-model="student.motherBloodGroup"></b-input>
                      </b-field>
                    </div>
                  </div>
                  <div class="columns samesection">
                    <div class="column">
                      <b-field label="Mother's Education">
                        <b-input icon-pack="fas" v-model="student.motherEducation"></b-input>
                      </b-field>
                      <b-field label="Mother's Profession">
                        <b-input icon-pack="fas" v-model="student.motherProfession"></b-input>
                      </b-field>
                      <b-field label="Mother's Designation">
                        <b-input icon-pack="fas" v-model="student.motherDesignation"></b-input>
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
                          v-model="student.address"
                          maxlength="200"
                          type="textarea"
                        ></b-input>
                      </b-field>
                    </div>
                    <div class="column is-4 mt-2">
                      <b-field>
                        <b-upload v-model="student.otherdocuments" multiple drag-drop>
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
            :type="startLoading ? 'is-loading is-primary' : 'is-primary'"
            @click="formType === 'add' ? addStudent() : editStudent()"
            icon-right="arrow-circle-right"
            class="submit"
          >{{ formType === 'add' ? 'Add Student' : 'Edit Student' }}</b-button>
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
      student: {
        name: '',
        date: '',
        nationality: '',
        photo: [],
        rollno: '',
        enrollmentno: '',
        admissiondate: '',
        admissionno: '',
        bloodgroup: '',
        classes: ['X-A', 'X-B', 'XI-A', 'XII-A', 'XI-C'],
        checkboxGroup: ['Maths', 'Science'],
        healthDocs: [],
        fatherName: '',
        fatherMobileNo: '',
        fatherBloodGroup: '',
        fatherPhoto: [],
        fatherDOB: '',
        fatherEducation: '',
        fatherProfession: '',
        fatherDesignation: '',
        motherName: '',
        motherMobileNo: '',
        motherBloodGroup: '',
        motherPhoto: [],
        motherDOB: '',
        motherEducation: '',
        motherProfession: '',
        motherDesignation: '',
        address: '',
        otherdocuments: '',
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
        .post('/student', { ...this.student })
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
        .then((res) => {
          console.log('Edited Response: ', res);
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
