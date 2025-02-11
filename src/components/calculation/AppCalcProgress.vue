<template>
  <div class="cost-calc__stages">
    <h3 class="cost-calc__title">{{ $t('calculation.progress.title') }}</h3>
    <p class="cost-calc__subtitle">{{ $t('calculation.progress.subtitle') }}</p>

    <div class="cost-calc__list">
      <div class="stage" :class="stageStatus(1)">
        <div class="stage__icon">
          <i class="icon icon--dots"></i>
          <i class="icon icon--done"></i>
        </div>
        <div class="stage__name">{{ $t('calculation.progress.name_1') }}</div>
      </div>
      <div class="stage" :class="stageStatus(2)">
        <div class="stage__icon">
          <i class="icon icon--dots"></i>
          <i class="icon icon--done"></i>
        </div>
        <div class="stage__name">{{ $t('calculation.progress.name_2') }}</div>
      </div>
      <div class="stage" :class="stageStatus(3)">
        <div class="stage__icon">
          <i class="icon icon--dots"></i>
          <i class="icon icon--done"></i>
        </div>
        <div class="stage__name">
          {{ $t('calculation.progress.name_3') }}
          <div class="stage__discount">
            {{ $t('calculation.progress.discount') }}:
            <span class="stage__discount-value">{{ printedDiscount }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppCalcProgress',

  computed: {
    printedDiscount() {
      return this.currentDiscount + '%';
    },
  },

  methods: {
    stageStatus(step) {
      switch (true) {
        case step == this.currentStep:
          return 'in-progress';
        case step < this.currentStep:
          return 'done';
      }
    },
  },

  props: {
    currentDiscount: {
      type: Number,
      default: 0,
    },
    currentStep: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style lang="scss" scoped></style>
