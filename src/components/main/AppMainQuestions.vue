<template>
  <section class="main-spoiler wrapper">
    <h2 class="main-spoiler__title">Часто задаваемые вопросы</h2>

    <div class="main-spoiler__container">
      <div class="main-spoiler__items" v-if="questions && questions.length > 0">
        <AppSpoilerItem
          v-for="spoiler in questions"
          :key="spoiler.id"
          :title="spoiler.title"
        >
          <div v-html="spoiler.text"></div>
        </AppSpoilerItem>
      </div>

      <div class="main-spoiler__form-container">
        <div class="main-spoiler__form">
          <h2 class="form-title">{{ $t('form.question.title') }}</h2>
          <span class="form-subtitle">{{ $t('form.question.text') }}</span>

          <AppQuestionForm :btnText="$t('form.question.btn')" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppSpoilerItem from '../general/AppSpoilerItem.vue';
import { questions } from '@/assets/static/questions.js';
import AppQuestionForm from '../forms/AppQuestionForm.vue';

export default {
  name: 'AppMainQuestions',

  data() {
    return {
      questions: questions,
    };
  },

  components: { AppSpoilerItem, AppQuestionForm },
};
</script>

<style lang="scss" scoped></style>
