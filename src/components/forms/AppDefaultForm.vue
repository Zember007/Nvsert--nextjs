<template>
  <AppValidationObserver v-slot="{ handleSubmit }" ref="defaultFormObserver">
    <form @submit.prevent="handleSubmit(onSubmit)" ref="defaultForm" :key="formSubmitSuccess">
      <template>
        <AppInput ref="formElement" :title="$t('form.input.titles.name')" :inputName="'name'" :required="true" />

        <AppInput ref="formElement" :title="$t('form.input.titles.phone')" :inputName="'phone'" :mask="'phone'"
          :type="'phone'" :required="true" />

        <AppInput ref="formElement" :title="$t('form.input.titles.email')" :inputName="'email'" :type="'email'" />

        <AppTextarea ref="formElement" :title="$t('form.input.titles.question')" :inputName="'comment'"
          :required="true" />

        <button type="submit" class="btn btn--primary btn--l">
          {{ btnText }}
        </button>

        <div class="policy">
          <label class="field-check">
            <input class="field-check__input" type="checkbox" required />
            <span class="field-check__name">
              Нажимая на кнопку «Связаться» вы соглашаетесь с
              <nuxt-link to="/soglashenie/polzovatelskoe-soglashenie/" target="_blank">политикой конфиденциальности
              </nuxt-link>
            </span>
          </label>
        </div>
      </template>
    </form>
  </AppValidationObserver>
</template>

<script>
import AppInput from './elements/AppInput.vue';
import AppTextarea from './elements/AppTextarea.vue';

import defaultFormSubmit from '@/mixins/defaultFormSubmit.js';

export default {
  name: 'AppDefaultForm',

  mixins: [defaultFormSubmit],

  components: { AppInput, AppTextarea },

  props: {
    btnText: {
      type: String,
      default: '',
    },
  },

  methods: {
    onSubmit() {
      this.defaultFormSubmit(
        this.$refs.defaultForm,
        this.$refs.defaultFormObserver
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
