<template>
  <div class="cost-calc__form">
    <transition name="fade-stay" mode="out-in">
      <h3 class="form-title" :key="formTitle">{{ formTitle }}</h3>
    </transition>
    <transition name="fade-stay" mode="out-in">
      <p class="form-text" :key="formSubtitle">{{ formSubtitle }}</p>
    </transition>

    <transition name="fade-stay">
      <component
        :is="currentForm"
        :discount="discount"
        :documents="documents"
      />

      <!-- <AppCalcFormInitial v-if="currentStep === 1" key="form1" />

      <AppCalcFormSecond v-if="currentStep === 2" key="form2" /> -->
    </transition>
  </div>
</template>

<script>
import AppCalcFormInitial from '../forms/AppCalcFormInitial.vue';
import AppCalcFormSecond from '../forms/AppCalcFormSecond.vue';
import AppCalcFormFinal from '../forms/AppCalcFormFinal.vue';

export default {
  name: 'AppCalcFormWrapper',

  components: { AppCalcFormInitial, AppCalcFormSecond, AppCalcFormFinal },

  computed: {
    formTitle() {
      switch (this.currentStep) {
        case 1:
          return this.$t('calculation.progress.name_1');
        case 2:
          return this.$t('calculation.progress.name_2');
        case 3:
          return this.$t('calculation.progress.name_3');
        default:
          return '';
      }
    },

    formSubtitle() {
      switch (this.currentStep) {
        case 1:
          return this.$t('calculation.form.subtitle.step_1');
        case 2:
          return this.$t('calculation.form.subtitle.step_2');
        case 3:
          return this.$t('calculation.form.subtitle.step_3');
        default:
          return '';
      }
    },

    currentForm() {
      switch (this.currentStep) {
        case 1:
          return AppCalcFormInitial;
        case 2:
          return AppCalcFormSecond;
        case 3:
          return AppCalcFormFinal;
      }
    },
  },

  methods: {},

  props: {
    currentStep: {
      type: Number,
      default: 1,
    },

    discount: {
      type: Array,
      default: () => {
        return [];
      },
    },

    documents: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>
