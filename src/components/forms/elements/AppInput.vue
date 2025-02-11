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

    <input
      :type="type"
      class="field__input"
      :name="inputName"
      v-mask="maskReg"
      :placeholder="title"
      :autocomplete="autocomplete"
      @input="getValue"
      v-model="inputValue"
    />
    <span class="field__title">
      {{ title }}
    </span>
  </AppValidationProvider>
</template>

<script>
export default {
  name: 'AppInput',

  data() {
    return {
      inputValue: '',
    };
  },

  computed: {
    validationRules() {
      let validations = {};

      this.required ? (validations.required = true) : false;
      this.type == 'email' ? (validations.email = true) : false;

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

    currentValue() {
      if(this.inputValue !== '') {
        return this.inputValue;
      }
      return ''
    }
  },

  methods: {
    getValue() {
      this.$nuxt.$emit('inputChange', this.inputName, this.inputValue);
    },

    resetElement() {
      this.inputValue = '';
    },

    changeValue(string) {
      this.inputValue = string;
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

    type: {
      type: String,
      default: 'text',
    },
    required: {
      type: Boolean,
      default: false,
    },
    autocomplete: {
      type: String,
      default: 'on',
    },

    mask: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped></style>
