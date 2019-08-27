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
        <div class="mt-3">
          <div class="columns">
            <div class="column">
              <section>
                <b-field label="Student Name">
                  <b-input icon-pack="fas" icon="user-graduate"></b-input>
                </b-field>
                <div class="columns">
                  <div class="column is-half">
                    <b-field label="Roll Number">
                      <b-input type="number"></b-input>
                    </b-field>
                    <b-field label="Enrollment Number">
                      <b-input type="number"></b-input>
                    </b-field>
                  </div>
                  <div class="column is-half">
                    <b-field label="Admission Date">
                      <b-input type="date"></b-input>
                    </b-field>
                    <b-field label="Admission Number">
                      <b-input type="number"></b-input>
                    </b-field>
                  </div>
                </div>
                <section>
                  <b-field label="Father's Name">
                    <b-input icon-pack="fas"></b-input>
                  </b-field>
                  <b-field label="Mother's Name">
                    <b-input icon-pack="fas"></b-input>
                  </b-field>
                </section>
                <div class="columns">
                  <div class="column is-8">
                    <b-field label="Health Disorder Note (if any)">
                      <b-input class="notearea" maxlength="200" type="textarea"></b-input>
                    </b-field>
                  </div>
                  <div class="column is-4 mt-2">
                    <b-field>
                      <b-upload class="dropfile" v-model="dropFiles" multiple drag-drop>
                        <section>
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
              </section>
            </div>
          </div>
        </div>
        <div class="submit">
          <b-button outlined type="is-primary" class="mr-1">Cancel</b-button>
          <b-button
            icon-right="arrow-circle-right"
            type="is-primary"
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
    post: Object,
  },
  mounted() {
    console.log('post pppp ', this.$props.post);
  },
  methods: {},
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
