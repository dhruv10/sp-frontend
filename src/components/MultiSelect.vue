<template>
  <div>
    <multiselect
      v-model="selectedValues"
      tag-placeholder="Add this as new tag"
      label="name"
      track-by="code"
      :placeholder="placeholder"
      :options="allOptions"
      :multiple="isMultiple"
      :taggable="isTaggable"
      tagPosition="bottom"
      @tag="addTag"
      @change="$emit('input', selectedValues)"
    ></multiselect>
    <span v-if="!allOptions.length">No field added</span>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';

export default {
  props: {
    value: {
      type: Array,
    },
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
</style>
