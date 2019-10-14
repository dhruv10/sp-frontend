<template>
  <div style="margin-top: 7px">
    <a
      class="button is-primary is-small is-outlined"
      style="margin-right: 10px"
      @click="onButtonClick('edit')"
    >
      <span>Edit</span>
      <span class="icon is-small">
        <i class="fas fa-edit"></i>
      </span>
    </a>
    <a class="button is-danger is-small is-outlined" @click="onButtonClick('delete')">
      <span>Delete</span>
      <span class="icon is-small">
        <i class="fas fa-times"></i>
      </span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'TableActionButtons',
  methods: {
    onButtonClick(type) {
      this.params.frameworkComponentWrapper.parent.$parent.onTableButtonClick(type, this.params.data);
    },
  },
};
</script>

<style>
</style>
