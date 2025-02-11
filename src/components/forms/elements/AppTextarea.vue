<template>
  <AppValidationProvider
    tag="label"
    class="field"
    :rules="validationRules"
    v-slot="{ errors }"
    :class="{ required }"
  >
    <transition name="height-fade">
      <ul class="error-list" v-if="errors">
        <li class="error-item" :key="error" v-for="error in errors">
          {{ error }}
        </li>
      </ul>
    </transition>

    <textarea
      class="field__textarea"
      v-mask="maskReg"
      :name="inputName"
      :placeholder="title"
      v-model="inputValue"
    ></textarea>
    <span class="field__title">
      {{ title }}
    </span>
  </AppValidationProvider>
</template>

<script>
export default {
  name: 'AppTextarea',

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

    maskReg() {
      if (this.mask) {
        switch (this.mask) {
          case 'phone':
            return '+7 (###) ###-##-##';
          default:
            return '';
        }
      } else {
        return '';
      }
    },
  },

  methods: {
    resetElement() {
      this.inputValue = '';
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

    mask: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped></style>
