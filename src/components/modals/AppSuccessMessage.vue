<template>
  <portal to="successMessage">
    <div class="success-message__wrapper">
      <h3 class="success-message__title">
        {{ $t('success.title') }}
      </h3>

      <p class="success-message__subtitle">
        {{ $t('success.subtitle') }}
      </p>

      <button
        type="button"
        @click="closeModal"
        class="btn btn--primary success-message__btn"
      >
        {{ $t('success.btn') }}
      </button>
    </div>
  </portal>
</template>

<script>
export default {
  name: 'AppSuccessMessage',

  methods: {
    closeModal() {
      this.$modal.hide('defaultModal');

      this.$router.push({ path: '/' });
    },
  },
};
</script>

<style lang="scss" scoped>
.success-message {
  &__wrapper {
    display: flex;
    flex-direction: column;
  }

  &__title {
    margin: 0 0 8px 0;
    color: $typography-invert;
  }

  &__subtitle {
    margin: 0;
    color: $typography-invert;
  }

  &__btn {
    width: 100%;
    margin: 56px 0 0 0 !important;
    @include btn--l;
  }
}
</style>
