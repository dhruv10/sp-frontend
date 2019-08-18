<template>
  <div class="add-school h-100 dflex-center">
    <b-message type="is-info" class="w-65 mt-3">
      <div class="columns">
        <div class="column is-8">
          <section>
            <b-field label="School Name">
              <b-input size="is-small" v-model="name"></b-input>
            </b-field>

            <b-field label="Address">
              <b-input class="address" maxlength="200" type="textarea"></b-input>
            </b-field>
          </section>
        </div>
        <div class="column mt-2">
          <section>
            <b-field>
              <b-upload class="dropfile" v-model="dropFiles" multiple drag-drop>
                <section class="section">
                  <div class="content has-text-centered">
                    <p>
                      <b-icon icon-pack="fas" icon="envelope" size="is-large"></b-icon>
                    </p>
                    <p>Drop your files here or click to upload</p>
                  </div>
                </section>
              </b-upload>
            </b-field>

            <div class="tags">
              <span v-for="(file, index) in dropFiles" :key="index" class="tag is-primary">
                {{file.name}}
                <button class="delete is-small" type="button" @click="deleteDropFile(index)"></button>
              </span>
            </div>
          </section>
        </div>
      </div>

      <div class="columns">
        <div class="column is-8">
          <section>
            <b-field label="Email">
              <b-input size="is-small" type="email" maxlength="30"></b-input>
            </b-field>

            <div class="columns">
              <div class="column">
                <section>
                  <b-field label="Phone Number">
                    <b-input size="is-small" v-model="name"></b-input>
                  </b-field>
                  <b-field label="Registration Date">
                    <b-datepicker size="is-small" placeholder="Type or select a date..." icon="calendar-today" editable></b-datepicker>
                  </b-field>
                </section>
              </div>
              <div class="column">
                <section>
                  <b-field label="Fax">
                    <b-input size="is-small" v-model="name"></b-input>
                  </b-field>
                  <b-field label="Subscription Date">
                    <b-datepicker size="is-small" placeholder="Type or select a date..." icon="calendar-today" editable></b-datepicker>
                  </b-field>
                </section>
              </div>
            </div>
          </section>
        </div>
        <div class="column">
          <section>
            <b-field label="School Code">
              <b-numberinput icon-pack="fas" size="is-small" v-model="number"></b-numberinput>
            </b-field>
          </section>
        </div>
      </div>

      <div class="columns">
        <div class="column is-8">
          <b-field label="Facebook">
            <b-input size="is-small" v-model="name"></b-input>
          </b-field>

          <b-field label="Twitter">
            <b-input size="is-small" v-model="name"></b-input>
          </b-field>
        </div>
      </div>
    </b-message>
  </div>
</template>

<script>
export default {
  name: 'AddSchool',
  data() {
    return {
      dropFiles: [],
    };
  },
  methods: {
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.w-65 {
  width: 65%;
}
.w-25 {
  width: 25%;
}
.dropfile {
  width: 16rem;
  height: 12rem;
}
.address {
  min-height: 7rem !important;
}
</style>
