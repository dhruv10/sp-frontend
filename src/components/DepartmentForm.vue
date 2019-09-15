<template>
  <div class="main-container">
    <div class="card">
      <header class="card-header">
        <p
          class="card-header-title header"
        >{{ formType === 'add' ? 'Add Department' : 'Edit Department' }}</p>
      </header>
    </div>
    <div class="card-content">
      <div class="content card-area">
        <div class="mt-3">
          <div class="columns">
            <div class="column is-8">
              <section>
                <b-field label="Department Name">
                  <b-input icon-pack="fas" required v-model="department.name" icon="credit-card"></b-input>
                </b-field>
              </section>
            </div>
            <div class="column is-4">
              <b-field label="Code ">
                <b-input v-model="department.code" required></b-input>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column is-12">
              <b-field label="Note">
                <b-input class="notearea" v-model="department.note" maxlength="200" type="textarea"></b-input>
              </b-field>
            </div>
          </div>
        </div>
        <div class="submit">
          <b-button outlined type="is-primary" class="mr-1" @click="closeModal()">Cancel</b-button>
          <b-button
            @click="formType === 'add' ? addDepartment() : editDepartment()"
            icon-right="arrow-circle-right"
            class="submit"
            :type="startLoading ? 'is-loading is-primary' : 'is-primary'"
          >{{ formType === 'add' ? 'Add Department' : 'Edit Department' }}</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DepartmentForm',
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
      department: {
        name: '',
        code: '',
        note: '',
      },
    };
  },
  mounted() {
    if (this.formType === 'edit') this.department = this.formData;
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    addDepartment() {
      const { snackbar } = this.$buefy;
      this.startLoading = true;
      this.$http
        .post('/department', { ...this.department })
        .then(() => {
          this.startLoading = false;
          this.$emit('getTableData');
          this.$emit('closeModal');
          snackbar.open('Department added!');
        })
        .catch(e => console.log(e));
    },
    editDepartment() {
      const { snackbar } = this.$buefy;
      this.startLoading = true;
      this.$http
        .put(`/department/${this.formData._id}`, { ...this.department })
        .then(() => {
          this.startLoading = false;
          this.$emit('closeModal');
          snackbar.open('Department edited!');
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
</style>
