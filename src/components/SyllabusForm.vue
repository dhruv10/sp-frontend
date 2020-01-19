<template>
  <div class="main-container">
    <div class="card">
      <header class="card-header">
        <p
          class="card-header-title header"
        >{{ formType === 'add' ? 'Add Syllabus' : 'Edit Syllabus' }}</p>
      </header>
    </div>
    <div class="card-content">
      <div class="content card-area">
        <div class="mb-2">
          <div class="columns">
            <div class="column is-8">
              <section>
                <b-field label="Document Title">
                  <b-input icon-pack="fas" required v-model="syllabus.documentTitle" icon="credit-card"></b-input>
                </b-field>
                <b-field label="Link Class">
                  <div class="custom">
                  <MultiSelect
                    required
                    v-model="syllabus.class"
                    :isMultiple="false"
                    :allOptions="classlist"
                    placeholder="Select a class"
                  />
                  </div>
                </b-field>
              </section>
            </div>
            <div class="column is-4 mt-2">
              <b-field>
                <b-upload v-model="syllabus.documentUrl" multiple drag-drop required>
                  <section class="uploadsection">
                    <div class="content has-text-centered">
                      <p>
                        <b-icon icon="upload" size="is-large"></b-icon>
                      </p>
                      <p class="smalltext">Upload the syllabus file in PDF format</p>
                    </div>
                  </section>
                </b-upload>
              </b-field>

              <div class="tags">
                <!-- <span v-for="(file, index) in syllabus.documentUrl" :key="index" class="tag is-primary">
                  {{file.name}}
                  <button
                    class="delete is-small"
                    type="button"
                    @click="deleteDropFile(index)"
                  ></button>
                </span> -->
              </div>
            </div>
          </div>
        </div>
        <div class="submit">
          <b-button outlined type="is-primary" class="mr-1" @click="closeModal()">Cancel</b-button>
          <b-button
            icon-right="arrow-circle-right"
            class="submit"
            :type="startLoading ? 'is-loading is-primary' : 'is-primary'"
            @click="formType === 'add' ? addSyllabus() : editSyllabus()"
          >{{ formType === 'add' ? 'Add Syllabus' : 'Edit Syllabus' }}</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MultiSelect from '@/components/MultiSelect.vue';

export default {
  name: 'Syllabus',
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
  },
  components: {
    MultiSelect,
  },
  data() {
    return {
      startLoading: false,
      dropFiles: [],
      syllabus: {
        documentTitle: '',
        class: '',
        documentUrl: () => 'https://mock.com',
      },
      classlist: this.classrooms,
    };
  },
  mounted() {
    if (this.formType === 'edit') this.syllabus = this.formData;
  },
  methods: {
    // deleteDropFile() {
    //   // this.syllabus.documentUrl.splice(index, 1);
    // },
    closeModal() {
      this.$emit('closeModal');
    },
    addSyllabus() {
      const { snackbar } = this.$buefy;
      this.startLoading = true;
      this.$http
        .post('/syllabus', { ...this.syllabus, class: this.syllabus.class._id })
        .then(() => {
          this.startLoading = false;
          this.$emit('getTableData');
          this.$emit('closeModal');
          snackbar.open('Syllabus added!');
        })
        .catch(e => snackbar.open('Error:', e));
    },
    editSyllabus() {
      const { snackbar } = this.$buefy;
      this.startLoading = true;
      this.$http
        .put(`/syllabus/${this.formData._id}`, { ...this.syllabus })
        .then(() => {
          this.startLoading = false;
          this.$emit('closeModal');
          snackbar.open('Syllabus edited!');
        })
        .catch(e => snackbar.open('Error:', e));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/app.global.scss";

.main-container {
  background: white;
  overflow: visible !important;
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
    overflow: visible !important;
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
.smalltext {
  font-size: 0.8rem;
  margin: 0.5rem;
}
.custom {
  overflow: visible !important;
}

.multiselect__content {
  overflow: visible !important;

}
</style>
