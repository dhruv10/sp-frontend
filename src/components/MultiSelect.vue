<template>
  <div>
    <multiselect
      :value="selectedValues"
      tag-placeholder="Add this as new tag"
      label="name"
      track-by="code"
      :placeholder="placeholder"
      :options="allOptions"
      :multiple="isMultiple"
      :taggable="isTaggable"
      tagPosition="bottom"
      @tag="addTag"
      @input="selectedValues = $event; $emit('input', selectedValues)"
      :disabled="disable"
      :loading="loading"
    ></multiselect>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';

export default {
  props: {
    value: {},
    allOptions: {
      type: Array,
    },
    isMultiple: {
      type: Boolean,
      default: true,
    },
    isTaggable: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Select a value',
    },
    disable: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Multiselect,
  },
  data() {
    return {
      selectedValues: [],
    };
  },
  methods: {
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag,
      };
      this.options.push(tag);
      this.selectedValues.push(tag);
    },
  },
  watch: {
    value: {
      handler(newVal) {
        this.selectedValues = newVal;
      },
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
div.multiselect__content-wrapper > ul {
  margin-left: 0 !important;
  margin-top: 0 !important;
}
div.multiselect__content-wrapper {
  font-size: 12px !important;
}
.multiselect__tags {
  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
  border-color: #dbdbdb;
  border-radius: 4px;
  color: #363636;
}
</style>
