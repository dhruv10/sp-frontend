<template>
  <div class="main-container">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title header">Add Admission Query</p>
      </header>
    </div>
    <div class="card-content">
      <div class="content card-area">
        <h4>Student Details</h4>
        <div class="columns">
          <div class="column is-8">
            <b-field label="Student Name">
              <b-input icon-pack="fas"></b-input>
            </b-field>
          </div>
          <div class="column is-4">
            <b-field label="Enrollment Number ">
              <b-input type="number" disabled></b-input>
            </b-field>
          </div>
        </div>
        <div class="columns">
          <div class="column is-3">
            <b-field label="Class">
              <b-input icon-pack="fas"></b-input>
            </b-field>
          </div>
          <div class="column is-4">
            <b-field label="Date of Birth ">
              <b-datepicker placeholder="Click to select"/>
            </b-field>
          </div>
          <div class="column is-5">
            <b-field label="Place of Birth ">
              <b-input icon-pack="fas"></b-input>
            </b-field>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <b-field label="Residential Address">
              <b-input type="textarea"></b-input>
            </b-field>
          </div>
        </div>

        <h4>Father's Details</h4>
        <div class="columns">
          <div class="column is-12">
            <b-field label="Father's Name">
              <b-input icon-pack="fas"></b-input>
            </b-field>
          </div>
        </div>
        <div class="columns">
          <div class="column is-6">
            <b-field label="Occupation">
              <b-input icon-pack="fas"></b-input>
            </b-field>
          </div>
          <div class="column is-6">
            <b-field label="Office Name">
              <b-input icon-pack="fas"></b-input>
            </b-field>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <b-field label="Office Address">
              <b-input type="textarea"></b-input>
            </b-field>
          </div>
        </div>
        <div class="columns">
          <div class="column is-5">
            <b-field label="Mobile Number">
              <b-input icon-pack="fas" type="number"></b-input>
            </b-field>
          </div>
          <div class="column is-7">
            <b-field label="Father's Email">
              <b-input icon-pack="fas" type="email"></b-input>
            </b-field>
          </div>
        </div>

        <h4>Mother's Details</h4>
        <div class="columns">
          <div class="column is-12">
            <b-field label="Mother's Name">
              <b-input icon-pack="fas"></b-input>
            </b-field>
          </div>
        </div>
        <div class="columns">
          <div class="column is-6">
            <b-field label="Occupation">
              <b-input icon-pack="fas"></b-input>
            </b-field>
          </div>
          <div class="column is-6">
            <b-field label="Office Name">
              <b-input icon-pack="fas"></b-input>
            </b-field>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <b-field label="Office Address">
              <b-input type="textarea"></b-input>
            </b-field>
          </div>
        </div>
        <div class="columns">
          <div class="column is-5">
            <b-field label="Mobile Number">
              <b-input icon-pack="fas" type="number"></b-input>
            </b-field>
          </div>
          <div class="column is-7">
            <b-field label="Mother's Email">
              <b-input icon-pack="fas" type="email"></b-input>
            </b-field>
          </div>
        </div>

        <h4>Previous School Details</h4>
        <div class="columns">
          <div class="column is-half">
            <b-field label="Current Class">
              <b-input icon-pack="fas"></b-input>
            </b-field>
          </div>
          <div class="column is-half">
            <b-field label="Medium">
              <b-input></b-input>
            </b-field>
          </div>
        </div>

        <h4>Sibling Details</h4>
        <div class="columns">
          <div class="column is-8">
            <b-field label="Name">
              <b-input/>
            </b-field>
          </div>
          <div class="column is-4">
            <b-field label="Class">
              <b-input/>
            </b-field>
          </div>
        </div>

        <h4>Documents Upload</h4>

        <div class="docs-container">
          <div class="docs">
            <b-upload v-model="dropFiles" drag-drop>
              <section class="section">
                <div class="content has-text-centered">
                  <p>
                    <b-icon icon="upload" size="is-large"></b-icon>
                  </p>
                  <p>Drop your files here or click to upload</p>
                </div>
              </section>
            </b-upload>
          </div>
          <div class="docs">
            <b-upload v-model="dropFilies" drag-drop>
              <section class="section">
                <div class="content has-text-centered">
                  <p>
                    <b-icon icon="upload" size="is-large"></b-icon>
                  </p>
                  <p>Drop your files here or click to upload</p>
                </div>
              </section>
            </b-upload>
          </div>
          <div class="docs">
            <b-upload v-model="dropFilies" drag-drop>
              <section class="section">
                <div class="content has-text-centered">
                  <p>
                    <b-icon icon="upload" size="is-large"></b-icon>
                  </p>
                  <p>Drop your files here or click to upload</p>
                </div>
              </section>
            </b-upload>
          </div>
          <div class="docs">
            <b-upload v-model="dropFilies" drag-drop>
              <section class="section">
                <div class="content has-text-centered">
                  <p>
                    <b-icon icon="upload" size="is-large"></b-icon>
                  </p>
                  <p>Drop your files here or click to upload</p>
                </div>
              </section>
            </b-upload>
          </div>
          <div class="tags">
            <span v-for="(file, index) in dropFiles" :key="index" class="tag is-primary">
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
      <div class="submit">
        <b-button outlined type="is-primary" class="mr-1" @click="closeModal">Cancel</b-button>
        <b-button
          icon-right="arrow-circle-right"
          type="is-primary"
          class="submit"
        >Add Admission Query</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdmissionForm',
  data() {
    return {
      dropFiles: [],
    };
  },
  mounted() {},
  methods: {
    closeModal() {
      this.$emit('closeModal');
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
    margin: 0px 8px 15px 8px;
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

.docs-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
.docs-container > div {
  display: flex;
  width: calc(100% - 20rem);
  flex-direction: column;
}
.docs-container > div > div {
  display: flex;
  flex-direction: row;
}

.docs {
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>
