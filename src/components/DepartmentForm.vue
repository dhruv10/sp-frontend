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
                  <b-input icon-pack="fas" v-model="department.name" icon="credit-card"></b-input>
                </b-field>
              </section>
            </div>
            <div class="column is-4">
              <b-field label="Code ">
                <b-input type="number" v-model="department.code" disabled></b-input>
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
          <b-button outlined type="is-primary" class="mr-1">Cancel</b-button>
          <b-button
            @click="submitFormData()"
            icon-right="arrow-circle-right"
            type="is-primary"
            class="submit"
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
    post: Object,
  },
  data() {
    return {
      department: {
        name: '',
        code: Math.floor(Math.random() * 3000),
        note: '',
      },
    };
  },
  mounted() {},
  methods: {
    submitFormData() {
      console.log('department form object: ', this.department);
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
