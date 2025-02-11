<template>
  <section class="main-adv">
    <div class="wrapper">
      <div class="main-adv__left">
        <h2 class="main-adv__title">NVSERT ведёт свою историю с 2009 года</h2>
        <ul class="main-adv__list">
          <li class="main-adv__item">
            <img src="~assets/images/svg/adv-1.svg" width="48" height="48" />
            {{ $t('advantages.items[0]') }}
          </li>
          <li class="main-adv__item">
            <img src="~assets/images/svg/adv-2.svg" width="48" height="48" />
            {{ $t('advantages.items[1]') }}
          </li>
          <li class="main-adv__item">
            <img src="~assets/images/svg/adv-3.svg" width="48" height="48" />
            {{ $t('advantages.items[2]') }}
          </li>
          <li class="main-adv__item">
            <img src="~assets/images/svg/adv-4.svg" width="48" height="48" />
            {{ $t('advantages.items[3]') }}
          </li>
          <li class="main-adv__item">
            <img src="~assets/images/svg/adv-5.svg" width="48" height="48" />
            {{ $t('advantages.items[4]') }}
          </li>
          <li class="main-adv__item">
            <img src="~assets/images/svg/adv-6.svg" width="48" height="48" />
            {{ $t('advantages.items[5]') }}
          </li>
        </ul>
      </div>
      <div class="main-adv__right">
        <p>{{ $t('advantages.text') }}</p>

        <nuxt-link to="/about/o-kompanii/" class="main-adv__link">
          {{ $t('advantages.about') }}
          <i class="icon icon--arrow--dropdown"></i>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppMainAbout',

  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
