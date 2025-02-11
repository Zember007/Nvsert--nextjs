<template>
  <AppValidationProvider
    tag="div"
    :rules="validationRules"
    class="custom-select"
    v-slot="{ errors }"
    :class="{ required }"
  >
    <transition name="height-fade">
      <ul class="error-list" v-if="errors && errors[0]">
        <li class="error-item" :key="error" v-for="error in errors">
          {{ error }}
        </li>
      </ul>
    </transition>

    <multiselect
      :placeholder="title"
      v-model="selectValue"
      track-by="value"
      label="name"
      :name="name"
      :allow-empty="false"
      select-label=""
      :selectedLabel="$t('form.select.selected')"
      :deselectLabel="''"
      :options="optionsFormatted"
      :searchable="false"
      :required="required"
      @input="getValue"
    >
      <template slot="singleLabel" slot-scope="{ option }">{{
        option.name
      }}</template>
    </multiselect>
  </AppValidationProvider>
</template>

<script>
import Multiselect from 'vue-multiselect';

export default {
  name: 'AppSelect',

  components: {
    Multiselect,
  },

  data() {
    return {
      selectValue: '',
    };
  },

  computed: {
    optionsFormatted() {
      return this.options.map((option) => {
        return {
          name: option.title,
          value: option.id,
        };
      });
    },

    validationRules() {
      let validations = {};

      this.required ? (validations.required = true) : false;

      return validations;
    },
  },

  methods: {
    getValue() {
      this.$nuxt.$emit('selectChange', this.selectValue.value, this.name);
    },
  },

  props: {
    title: {
      type: String,
      required: true,
    },

    required: {
      type: Boolean,
      default: false,
    },

    name: {
      type: String,
      required: true,
    },

    options: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss"></style>
