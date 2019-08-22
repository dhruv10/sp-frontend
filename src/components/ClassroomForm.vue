<template>
  <div class="main-container">
    <div class="card">
      <header class="card-header">
        <p
          class="card-header-title header"
        >{{ formType === 'add' ? 'Add Classroom' : 'Edit Classroom' }}</p>
      </header>
    </div>
    <div class="card-content">
      <div class="content card-area">
        <b-field label="Class Name">
          <b-input></b-input>
        </b-field>
        <div class="line">
          <b-field label="Class Number">
            <b-input></b-input>
          </b-field>
          <b-field label="Section" class="mid">
            <b-input></b-input>
          </b-field>
          <b-field label="Total Students">
            <b-input></b-input>
          </b-field>
        </div>
        <b-field label="Class Teacher">
          <b-input></b-input>
        </b-field>
        <div class="submit">
          <b-button outlined type="is-primary" class="mr-1">Cancel</b-button>
          <b-button
            icon-right="arrow-circle-right"
            type="is-primary"
            class="submit"
          >{{ formType === 'add' ? 'Add Classroom' : 'Edit Classroom' }}</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClassroomForm',
  props: {
    formType: {
      type: String,
      default: 'add',
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
</style>
