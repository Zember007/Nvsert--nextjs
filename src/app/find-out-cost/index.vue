<template>
  <main class="cost-calc wrapper">
    <div class="cost-calc__wrapper" v-if="!$fetchState.pending">
      <AppCalcProgress
        :current-step="currentStep"
        :currentDiscount="discountSum"
        keep-alive
        :keep-alive-props="{ max: 10 }"
      />

      <AppCalcFormWrapper
        :discount="discount"
        :documents="documents"
        :currentStep="currentStep"
        keep-alive
        :keep-alive-props="{ max: 10 }"
      />
    </div>
  </main>
  <!-- {% include 'includes/modals/modal-form.html' %} -->
</template>

<script>
import AppCalcProgress from '../../components/calculation/AppCalcProgress.vue';
import AppCalcFormWrapper from '../../components/calculation/AppCalcFormWrapper.vue';

export default {
  name: 'AppCalculation',
  components: { AppCalcProgress, AppCalcFormWrapper },

  data() {
    return {
      currentStep: 1,
      discountSum: 0,
    };
  },

  computed: {
    discount() {
      return this.$store.getters['documents/getterDiscounts'];
    },

    documents() {
      return this.$store.getters['documents/getterDocuments'];
    },

    // currentStep() {},
  },

  methods: {
    stepChangeListener() {
      this.$nuxt.$on('stepChange', () => {
        this.currentStep < 3 ? (this.currentStep += 1) : false;
      });
    },

    stepBackListener() {
      this.$nuxt.$on('stepBack', () => {
        this.currentStep > 1 ? (this.currentStep -= 1) : false;
      });
    },

    discountListener() {
      this.$nuxt.$on('changeCurrDiscount', (value) => {
        this.discountSum = value;
      });
    },

    async fetchDocuments() {
      await this.$store.dispatch('documents/updateActionDocuments');
    },

    async fetchDiscounts() {
      await this.$store.dispatch('documents/updateActionDiscounts');
    },
  },

  async fetch() {
    try {
      await this.fetchDocuments();
      await this.fetchDiscounts();
    } catch (error) {
      if (error instanceof Error) console.error(error);
    }
  },

  created() {
    this.stepChangeListener();
    this.discountListener();
    this.stepBackListener();
  },
};
</script>

<style lang="scss">
@import '~assets/styles/cost-calc.scss';
</style>
