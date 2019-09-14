<template>
  <div class="main-container">
    <div class="card">
      <header class="card-header">
        <p
          class="card-header-title header"
        >{{ formType === 'add' ? 'Add Teacher' : 'Edit Teacher' }}</p>
      </header>
    </div>
    <div class="card-content">
      <div class="content card-area">
        <p>BASIC INFO</p>
        <div class="line">
          <b-field label="Name" class="name">
            <b-input v-model="teacher.basicInfo.name" required></b-input>
          </b-field>
        </div>
        <div class="line">
          <b-field label="Gender" class="gender">
            <MultiSelect
              required
              v-model="teacher.basicInfo.gender"
              :isMultiple="false"
              :allOptions="genderList"
              placeholder="Select Gender"
            />
          </b-field>
          <b-field label="Biometric Code" class="code">
            <b-input v-model="teacher.biometricCode" required></b-input>
          </b-field>
          <b-field label="Contact Number" class="phone">
            <b-input v-model="teacher.basicInfo.phoneNumber" required></b-input>
          </b-field>
        </div>
        <div class="line">
          <b-field label="Blood Group" class="blood">
            <MultiSelect
              required
              v-model="teacher.basicInfo.bloodGroup"
              :isMultiple="false"
              :allOptions="allBloodGroups"
              placeholder="Select Blood Group"
            />
          </b-field>
          <b-field label="Nationality" class="nation ml-2">
            <b-input v-model="teacher.basicInfo.nationality" required></b-input>
          </b-field>
          <b-field label="Date of Birth" class="dob ml-2">
            <b-datepicker
              required
              v-model="teacher.basicInfo.birthDate"
              position="is-bottom-left"
              placeholder
              icon="calendar-today"
            ></b-datepicker>
          </b-field>
        </div>
        <div class="line mt-1">
          <b-field label="Email" class="email">
            <b-input type="email" required v-model="teacher.basicInfo.personalEmail"></b-input>
          </b-field>
          <b-field label="Marital Status">
            <MultiSelect
              required
              v-model="teacher.martialStatus.status"
              :isMultiple="false"
              :allOptions="martialStatus"
              placeholder="Select Martial Status"
            />
          </b-field>
        </div>
        <div>
          <b-field label="Permanent Address">
            <b-input
              maxlength="200"
              type="textarea"
              required
              v-model="teacher.basicInfo.permanentAddress"
            ></b-input>
          </b-field>
        </div>
      </div>
      <div v-if="teacher.martialStatus.status">
        <p class="sub-heading">SPOUSE INFO</p>
        <div class="columns">
          <div class="column is-6">
            <b-field label="Spouse Name">
              <b-input
                icon-pack="fas"
                required
                v-model="teacher.martialStatus.spouseBasicInfo.name"
              ></b-input>
            </b-field>
            <b-field label="Mobile Number">
              <b-input
                required
                icon-pack="fas"
                type="number"
                v-model="teacher.martialStatus.spouseBasicInfo.phoneNumber"
              ></b-input>
            </b-field>
          </div>
          <div class="column is-6">
            <b-field>
              <b-upload
                required
                v-model="teacher.martialStatus.spouseBasicInfo.docs"
                multiple
                drag-drop
              >
                <div class="uploadsection">
                  <div class="content has-text-centered">
                    <p>
                      <b-icon icon="upload" size="is-large"></b-icon>
                    </p>
                    <p>Upload Documents</p>
                  </div>
                </div>
              </b-upload>
            </b-field>
          </div>
        </div>
        <div class="line">
          <div>
            <b-field label="Alternative Mobile Number">
              <b-input
                required
                icon-pack="fas"
                type="number"
                v-model="teacher.martialStatus.spouseBasicInfo.alternativePhoneNumber"
              ></b-input>
            </b-field>
          </div>
          <div class="ml-2">
            <b-field label="Age">
              <b-input
                required
                icon-pack="fas"
                type="number"
                v-model="teacher.martialStatus.spouseBasicInfo.age"
              ></b-input>
            </b-field>
          </div>
        </div>
        <b-field label="Email" class="mt-1">
          <b-input
            required
            icon-pack="fas"
            type="email"
            v-model="teacher.martialStatus.spouseBasicInfo.email"
          ></b-input>
        </b-field>
      </div>

      <div class="line mt-1">
        <b-field label="Joining Date">
          <b-datepicker
            required
            v-model="teacher.joiningDate"
            position="is-bottom-right"
            placeholder
            icon="calendar-today"
          ></b-datepicker>
        </b-field>
        <!-- <div class="class-teacher">
          <b-field label="Is Class Teacher">
            <div class="field">
              <b-switch v-model="isSwitched">{{ isSwitched }}</b-switch>
            </div>
          </b-field>
        </div>-->
        <div class="ml-2">
          <b-field label="Subject">
            <MultiSelect
              required
              v-model="teacher.subjects"
              :isMultiple="true"
              :allOptions="subjects"
              placeholder="Select Subjects"
            />
          </b-field>
        </div>
        <div class="ml-2">
          <b-field label="Department">
            <MultiSelect
              required
              v-model="teacher.department"
              :isMultiple="false"
              :allOptions="departmentList"
             placeholder="Select Department"
            />
          </b-field>
        </div>
      </div>
      <div class="mt-1">
        <p class="sub-heading">BANK INFO</p>
        <div class="line">
          <div class="bank">
            <b-field label="Bank Name">
              <b-input required v-model="teacher.bankAccountInfo.bank"></b-input>
            </b-field>
          </div>
          <div class="branchh ml-2">
            <b-field label="Branch">
              <b-input required v-model="teacher.bankAccountInfo.branch"></b-input>
            </b-field>
          </div>
          <div class="grade ml-2">
            <b-field label="Grade">
              <b-input required v-model="teacher.salaryGrade"></b-input>
            </b-field>
          </div>
        </div>
        <div class="line mt-1">
          <div class="bank">
            <b-field label="Account No">
              <b-input required v-model="teacher.bankAccountInfo.accountNo"></b-input>
            </b-field>
          </div>
          <div class="branch ml-2">
            <b-field label="IFSC Code">
              <b-input required v-model="teacher.bankAccountInfo.IFSC"></b-input>
            </b-field>
          </div>
        </div>
        <div class="line mt-1">
          <div class="bank">
            <b-field label="PF No">
              <b-input required v-model="teacher.bankAccountInfo.pfNo"></b-input>
            </b-field>
          </div>
          <div class="branch ml-2">
            <b-field label="Payment Type">
              <b-dropdown aria-role="list" required v-model="teacher.bankAccountInfo.paymentType">
                <button class="button is-outline" slot="trigger">
                  <span class="payment-label">{{ teacher.bankAccountInfo.paymentType }}</span>
                  <b-icon icon="menu-down"></b-icon>
                </button>

                <b-dropdown-item value="Cash" aria-role="listitem">
                  <div class="field">Cash</div>
                </b-dropdown-item>
                <b-dropdown-item value="Cheque" aria-role="listitem">
                  <div class="field">Cheque</div>
                </b-dropdown-item>
                <b-dropdown-item value="NEFT" aria-role="listitem">
                  <div class="field">NEFT</div>
                </b-dropdown-item>
              </b-dropdown>
            </b-field>
          </div>
        </div>
        <div class="line mt-1">
          <div class="photo">
            <b-field label="Upload Photo">
              <b-upload required v-model="teacher.photo" multiple drag-drop>
                <div class="uploadsection">
                  <div class="content has-text-centered">
                    <p>
                      <b-icon icon="upload" size="is-large"></b-icon>
                    </p>
                    <p>Upload Profile Photo</p>
                  </div>
                </div>
              </b-upload>
            </b-field>
          </div>
          <div class="ml-32">
            <b-field label="Upload Documents">
              <b-upload required v-model="teacher.docs" multiple drag-drop>
                <div class="uploadsection">
                  <div class="content has-text-centered">
                    <p>
                      <b-icon icon="upload" size="is-large"></b-icon>
                    </p>
                    <p>Upload Documents</p>
                  </div>
                </div>
              </b-upload>
            </b-field>
          </div>
        </div>
      </div>
      <div class="footer-buttons">
        <b-button outlined type="is-primary" @click="closeModal()">Cancel</b-button>
        <b-button
          :type="startLoading ? 'is-loading is-primary' : 'is-primary'"
          class="submit"
          @click="formType === 'add' ? addTeacher() : editTeacher()"
        >{{ formType === 'add' ? 'Add Teacher' : 'Apply Changes' }}</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import MultiSelect from '@/components/MultiSelect.vue';

export default {
  name: 'TeacherForm',
  props: {
    formType: {
      type: String,
      default: 'add',
    },
    teacherData: {
      type: Object,
      default: () => {},
    },
    subjects: {
      type: Array,
      default: () => [],
    },
    departmentList: {
      type: Array,
      default: () => [],
    },
  },
  components: { MultiSelect },
  data() {
    return {
      startLoading: false,
      selectedDeptId: '',
      teacher: {
        basicInfo: {},
        department: [],
        bankAccountInfo: {},
        identityDocumentUrl: 'http://placehold.it/255',
        martialStatus: {
          spouseBasicInfo: {},
        },
      },
      selectedSubjectId: [],
      radio: 'mandatory',
      genderList: ['Male', 'Female'],
      allBloodGroups: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
      martialStatus: ['Unmarried', 'Married'],
    };
  },
  mounted() {
    console.log('d list', this.departmentList);
    if (this.formType === 'edit') {
      this.teacher = this.teacherData;
    }
    this.genderList = this.genderList.map(val => ({
      name: `${val}`,
      code: `${val}`,
    }));
    this.allBloodGroups = this.allBloodGroups.map(val => ({
      name: `${val}`,
      code: `${val}`,
    }));
    this.martialStatus = this.martialStatus.map(val => ({
      name: `${val}`,
      code: `${val}`,
    }));
    // this.departmentList = this.departmentList.map(val => ({
    //   name: `${val}`,
    //   code: `${val}`
    // }));
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    selectedSubjects(id) {
      this.selectedSubjectId.push(id);
    },
    selectedDept(id) {
      this.selectedDeptId = id;
    },
    addTeacher() {
      console.log(this.teacher);
      const { snackbar } = this.$buefy;
      this.startLoading = true;
      this.$http
        .post('/teacher', {
          ...this.teacher,
          subjects: this.selectedSubjectId,
          department: this.selectedDeptId,
          ...this.teacher.basicInfo,
        })
        .then(() => {
          this.$emit('getTableData');
          this.startLoading = false;
          this.$emit('closeModal');
          snackbar.open('Teacher added!');
        })
        .catch(() => {
          this.$emit('closeModal');
          snackbar.open('Something went wrong. Please try later!');
        });
    },
    editTeacher() {
      const { snackbar } = this.$buefy;
      this.startLoading = true;
      this.$http
        .put(`/teacher/${this.teacherData._id}`, {
          ...this.teacher,
          subjects: this.selectedSubjectId,
          department: this.selectedDeptId,
        })
        .then(() => {
          this.$emit('getTableData');
          this.startLoading = false;
          this.$emit('closeModal');
          snackbar.open('Teacher edited!');
        })
        .catch(() => {
          this.$emit('closeModal');
          snackbar.open('Something went wrong. Please try later!');
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
    margin: 0px 8px 10px 8px;
  }
  .line {
    display: flex;
    width: 100%;
    .name {
      width: 100%;
      margin-right: 10px;
      margin-bottom: 10px;
    }
    .last {
      margin-left: 10px;
      width: 50%;
    }
  }
  .line {
    display: flex;
    width: 100%;
    .gender {
      margin-right: 10px;
      .gender-label {
        width: 50px;
      }
    }
    .code {
      margin: 0px 10px;
      width: 30%;
    }
    .phone {
      margin-left: 10px;
      width: 50%;
    }
    .email {
      margin-right: 20px;
      width: 70%;
    }
  }
  .footer-buttons {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    .submit {
      margin-left: 20px;
    }
  }
  .subject-label {
    width: 8rem;
  }
}
.s-number {
  width: 50%;
}
.s-uploads {
  width: 40%;
}
.uploadsection {
  padding: 1.53rem;
  width: 16.5rem;
}
.sub-heading {
  margin-bottom: 15px;
}
.mt-1 {
  margin-top: 10px;
}
.class-teacher {
  margin-left: 20px;
}
.ml-2 {
  margin-left: 20px;
}
.department-label {
  width: 8rem;
}
.blood {
  width: 20%;
}
.nation {
  width: 15rem;
}
.bank {
  width: 60%;
}
.branch {
  width: 35%;
}
.account {
  width: 63%;
}
.payment-label {
  width: 10rem;
}
.grade {
  width: 60px;
}
.branchh {
  width: 8rem;
}
.ml-32 {
  margin-left: 32px;
}
.blood-group-label {
  width: 4rem;
}
</style>
