<template>
  <portal to="introForm">
    <h3 class="modal__title">{{ $t('form.help.title') }}</h3>
    <p class="modal__subtitle">{{ $t('form.help.text') }}</p>

    <AppDefaultForm :btnText="$t('form.help.btn')" />
  </portal>
</template>

<script>
import AppDefaultForm from './AppDefaultForm.vue';

export default {
  name: 'AppIntroForm',
  components: { AppDefaultForm },
};
</script>

<style lang="scss"></style>
