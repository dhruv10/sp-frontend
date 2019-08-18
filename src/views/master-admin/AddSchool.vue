<template>
  <div class="add-school">
    <h1>Add School module</h1>
    <div class="columns">
      <div class="column is-7 p-4">
        <template>
          <section>
            <b-field label="School Name">
              <b-input v-model="name"></b-input>
            </b-field>

            <b-field label="Official Email" type="is-danger" message="This email is invalid">
              <b-input type="email" maxlength="30"></b-input>
            </b-field>

            <b-field label="Username" type="is-success" message="This username is available">
              <b-input value="johnsilver" maxlength="30"></b-input>
            </b-field>

            <b-field label="Password">
              <b-input type="password" value="iwantmytreasure" password-reveal></b-input>
            </b-field>

            <b-field label="Message">
              <b-input maxlength="200" type="textarea"></b-input>
            </b-field>
          </section>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'John Silver',
    };
  },
};
</script>

<style lang="scss">
</style>
