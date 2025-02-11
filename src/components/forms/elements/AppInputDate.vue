<template>
  <AppValidationProvider
    tag="label"
    :rules="validationRules"
    class="field"
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

    <DatePicker
      v-model="inputValue"
      :placeholder="title"
      format="DD.MM.YYYY"
      :input-attr="{ name: inputName }"
      @input="getValue"
    />

    <span class="field__title">
      {{ title }}
    </span>
  </AppValidationProvider>
</template>

<script>
export default {
  name: 'AppInputDate',

  data() {
    return {
      inputValue: '',
    };
  },

  computed: {
    validationRules() {
      let validations = {};

      this.required ? (validations.required = true) : false;

      return validations;
    },
  },

  methods: {
    getValue() {
      this.$nuxt.$emit('inputChange', this.inputName, this.inputValue);
    },
  },

  props: {
    title: {
      type: String,
      required: true,
    },

    inputName: {
      type: String,
      required: true,
    },

    required: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.field :deep(.mx-icon-calendar) {
  right: 64px;
}
.field :deep(.mx-icon-clear) {
  right: 64px;
}
</style>
