<template>
  <portal to="knowCost">
    <AppValidationObserver v-slot="{ handleSubmit }" ref="defaultFormObserver">
      <form
        @submit.prevent="handleSubmit(onSubmit)"
        ref="defaultForm"
        :key="formSubmitSuccess"
      >
        <h3 class="modal__title">{{ $t('form.knowCost.title') }}</h3>
        <p class="modal__subtitle">{{ $t('form.knowCost.text') }}</p>

        <AppInput
          ref="formElement"
          :title="$t('form.input.titles.phone')"
          :inputName="'phone'"
          :type="'phone'"
          :mask="'phone'"
          :required="true"
        />

        <button type="submit" class="btn btn--primary btn--l">
          {{ $t('form.knowCost.btn') }}
        </button>

        <div class="policy">
          Нажимая на кнопку «Связаться» вы соглашаетесь с 
          <nuxt-link to="/soglashenie/polzovatelskoe-soglashenie/" target="_blank">политикой конфиденциальности</nuxt-link>
        </div>
      </form>
    </AppValidationObserver>
  </portal>
</template>

<script>
import AppInput from './elements/AppInput.vue';

import defaultFormSubmit from '@/mixins/defaultFormSubmit.js';

export default {
  name: 'AppKnowCostForm',

  mixins: [defaultFormSubmit],
  components: {
    AppInput,
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

<style lang="scss"></style>
