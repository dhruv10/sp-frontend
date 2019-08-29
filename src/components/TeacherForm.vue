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
            <b-input></b-input>
          </b-field>
        </div>
        <div class="line">
          <b-field label="Gender" class="gender">
            <b-dropdown aria-role="list">
              <button class="button is-outline" slot="trigger">
                <span class="gender-label"></span>
                <b-icon icon="menu-down"></b-icon>
              </button>

              <b-dropdown-item aria-role="listitem">Male</b-dropdown-item>
              <b-dropdown-item aria-role="listitem">Female</b-dropdown-item>
              <b-dropdown-item aria-role="listitem">Others</b-dropdown-item>
            </b-dropdown>
          </b-field>
          <b-field label="Biometric Code" class="code">
            <b-input></b-input>
          </b-field>
          <b-field label="Contact Number" class="phone">
            <b-input></b-input>
          </b-field>
        </div>
        <div class="line">
          <b-field label="Blood Group" class="blood">
            <b-input></b-input>
          </b-field>
          <b-field label="Nationality" class="nation ml-2">
            <b-input></b-input>
          </b-field>
          <b-field label="Date of Birth" class="dob ml-2">
            <b-input type="date"></b-input>
          </b-field>
        </div>
        <div class="line mt-1">
          <b-field label="Email" class="email">
            <b-input type="email"></b-input>
          </b-field>
          <b-field label="Marital Status">
            <b-dropdown aria-role="list" v-mdodel="martial">
              <button class="button is-outline" slot="trigger">
                <span class="subject-label"></span>
                <b-icon icon="menu-down"></b-icon>
              </button>
              <b-dropdown-item aria-role="listitem" :value="true">Married</b-dropdown-item>
              <b-dropdown-item aria-role="listitem" :value="false">Unmarried</b-dropdown-item>
            </b-dropdown>
          </b-field>
        </div>
        <div>
          <b-field label="Permanent Address">
            <b-input maxlength="200" type="textarea"></b-input>
          </b-field>
        </div>
      </div>
      <p class="sub-heading">SPOUSE INFO</p>

      <div v-if="married">
        <div class="columns">
          <div class="column is-6">
            <b-field label="Spouse Name">
              <b-input icon-pack="fas"></b-input>
            </b-field>
            <b-field label="Mobile Number">
              <b-input icon-pack="fas" type="number"></b-input>
            </b-field>
          </div>
          <div class="column is-6">
            <b-field>
              <b-upload v-model="dropFiles" multiple drag-drop>
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

            <!-- <div class="tags">
              <span v-for="(file, index) in dropFiles" :key="index" class="tag is-primary">
                {{file.name}}
                <button
                  class="delete is-small"
                  type="button"
                  @click="deleteDropFile(index)"
                ></button>
              </span>
            </div> -->
          </div>
        </div>
      </div>

      <div class="line mt-1">
        <b-field label="Joining Date">
          <b-input type="date"></b-input>
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
            <b-dropdown aria-role="list">
              <button class="button is-outline" slot="trigger">
                <span class="subject-label"></span>
                <b-icon icon="menu-down"></b-icon>
              </button>

              <b-dropdown-item aria-role="listitem">
                <div class="field">
                  <b-checkbox>English</b-checkbox>
                </div>
              </b-dropdown-item>
              <b-dropdown-item aria-role="listitem">
                <div class="field">
                  <b-checkbox>Maths</b-checkbox>
                </div>
              </b-dropdown-item>
              <b-dropdown-item aria-role="listitem">
                <div class="field">
                  <b-checkbox>Science</b-checkbox>
                </div>
              </b-dropdown-item>
            </b-dropdown>
          </b-field>
        </div>
        <div class="ml-2">
          <b-field label="Department">
            <b-dropdown aria-role="list">
              <button class="button is-outline" slot="trigger">
                <span class="department-label"></span>
                <b-icon icon="menu-down"></b-icon>
              </button>

              <b-dropdown-item aria-role="listitem">
                <div class="field">
                  <b-checkbox>English</b-checkbox>
                </div>
              </b-dropdown-item>
              <b-dropdown-item aria-role="listitem">
                <div class="field">
                  <b-checkbox>Maths</b-checkbox>
                </div>
              </b-dropdown-item>
              <b-dropdown-item aria-role="listitem">
                <div class="field">
                  <b-checkbox>Science</b-checkbox>
                </div>
              </b-dropdown-item>
            </b-dropdown>
          </b-field>
        </div>
      </div>
      <div class="mt-1">
        <p class="sub-heading">BANK INFO</p>
        <div class="line">
          <div class="bank">
            <b-field label="Bank Name">
              <b-input></b-input>
            </b-field>
          </div>
          <div class="branchh ml-2">
            <b-field label="Branch">
              <b-input></b-input>
            </b-field>
          </div>
          <div class="grade ml-2">
            <b-field label="Grade">
              <b-input></b-input>
            </b-field>
          </div>
        </div>
        <div class="line mt-1">
          <div class="bank">
            <b-field label="Account No">
              <b-input></b-input>
            </b-field>
          </div>
          <div class="branch ml-2">
            <b-field label="ESI No">
              <b-input></b-input>
            </b-field>
          </div>
        </div>
        <div class="line mt-1">
          <div class="bank">
            <b-field label="PF No">
              <b-input></b-input>
            </b-field>
          </div>
          <div class="branch ml-2">
            <b-field label="Payment Type">
              <b-dropdown aria-role="list">
                <button class="button is-outline" slot="trigger">
                  <span class="payment-label"></span>
                  <b-icon icon="menu-down"></b-icon>
                </button>

                <b-dropdown-item aria-role="listitem">
                  <div class="field">Cash</div>
                </b-dropdown-item>
                <b-dropdown-item aria-role="listitem">
                  <div class="field">Cheque</div>
                </b-dropdown-item>
                <b-dropdown-item aria-role="listitem">
                  <div class="field">Shares</div>
                </b-dropdown-item>
              </b-dropdown>
            </b-field>
          </div>
        </div>
        <div class="line mt-1">
          <div class="photo">
            <b-field label="Upload Photo">
              <b-upload v-model="dropFiles" multiple drag-drop>
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
              <b-upload v-model="dropFiles" multiple drag-drop>
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
export default {
  name: 'TeacherForm',
  props: {
    formType: {
      type: String,
      default: 'add',
      radio: 'Mandatory',
    },
  },
  data() {
    return {
      startLoading: false,
      married: true,
      martial: null,
    };
  },
  watch: {
    martial: {
      handler() {
        if (this.marital === 'married') this.married = true;
        else this.married = false;
      },
    },
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    addTeacher() {
      const { snackbar } = this.$buefy;
      this.startLoading = true;
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({ error: false });
        }, 1000);
      }).then(() => {
        this.startLoading = false;
        this.$emit('closeModal');
        snackbar.open('Teacher added!');
      });
    },
    editTeacher() {
      const { snackbar } = this.$buefy;
      this.startLoading = true;
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({ error: false });
        }, 1000);
      }).then(() => {
        this.startLoading = false;
        this.$emit('closeModal');
        snackbar.open('Teacher edited!');
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
</style>
