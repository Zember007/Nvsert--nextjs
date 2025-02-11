<template>
  <footer class="footer">
    <div class="wrapper footer__wrapper">
      <div class="footer-top">
        <div class="footer-top__col footer-top__col--info">
          <AppLogo :inverted="true" />

          <template v-if="companyRequsites && companyRequsites.length > 0">
            <div
              class="footer-company"
              :key="company.name"
              v-for="company in companyRequsites"
            >
              <h6 class="footer-company__title" v-if="company.name">
                {{ company.name }}
              </h6>
              <div class="footer-company__requisite" v-if="company.inn">
                {{ company.inn }}
              </div>
              <div class="footer-company__requisite" v-if="company.attestation">
                {{ company.attestation }}
              </div>
            </div>
          </template>
        </div>
        <nav class="footer-top__col footer-top__col--nav footer-top__nav">
          <ul class="footer-top__nav-list">
            <!-- <li class="footer-top__nav-item">
              <nuxt-link to="/" class="footer-top__nav-link">{{$t('navigation.about')}}</nuxt-link>
            </li> -->
            <li class="footer-top__nav-item">
              <nuxt-link to="/class/okp/" class="footer-top__nav-link">{{
                $t('navigation.okp')
              }}</nuxt-link>
            </li>
            <li class="footer-top__nav-item">
              <nuxt-link to="/class/tnved/" class="footer-top__nav-link">{{
                $t('navigation.tnved')
              }}</nuxt-link>
            </li>
            <li class="footer-top__nav-item">
              <nuxt-link to="/contacts/" class="footer-top__nav-link">{{
                $t('navigation.contacts')
              }}</nuxt-link>
            </li>
          </ul>
        </nav>
        <div class="footer-top__col footer-top__col--contacts">
          <div class="footer-contacts">
            <h6 class="footer-contacts__title">{{ $t('contacts.title') }}</h6>
            <ul class="footer-contacts__list">
              <li class="footer-contacts__item" v-if="moscowPhone">
                <a
                  :href="moscowPhone.value | filterPhone"
                  class="footer-contacts__link"
                  >{{ moscowPhone.value }} (МСК)</a
                >
              </li>
              <li class="footer-contacts__item" v-if="spbPhone">
                <a
                  :href="spbPhone.value | filterPhone"
                  class="footer-contacts__link"
                  >{{ spbPhone.value }} (СПБ)</a
                >
              </li>
              <li class="footer-contacts__item" v-if="RussiaPhone">
                <a
                  :href="RussiaPhone.value | filterPhone"
                  class="footer-contacts__link"
                  >{{ RussiaPhone.value }}</a
                >
              </li>
              <li class="footer-contacts__item" v-if="email">
                <a
                  :href="email.value | filterEmail"
                  class="footer-contacts__link"
                  >{{ email.value }}</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <nav class="footer-nav">
        <AppNavigation />
      </nav>
      <div class="footer-bottom">
        <div class="footer-bottom__message">
          <nuxt-link
            to="/soglashenie/polzovatelskoe-soglashenie/"
            class="footer-bottom__policy"
          >
            {{ $t('privacy.policy') }}
          </nuxt-link>
          <div class="footer-bottom__rights">
            {{ $t('privacy.description') }}
          </div>
        </div>
        <div class="footer-bottom__developer">
          <div class="title">{{ $t('designed') }}</div>
          <a
            href="https://coffeestudio.ru/"
            target="_blank"
            rel="noopener"
            class="logo"
          >
            <img src="@/assets/images/cs-logo.svg" alt="Coffee Studio" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import AppNavigation from './AppNavigation.vue';
import AppLogo from './AppLogo.vue';
export default {
  name: 'AppFooter',

  components: { AppNavigation, AppLogo },

  computed: {
    configs() {
      return this.$store.getters['configs/getterConfigs'];
    },

    moscowPhone() {
      return this.configs.find((item) => item.key == 'PHONE_MOSCOW');
    },

    spbPhone() {
      return this.configs.find((item) => item.key == 'PHONE_SPB');
    },

    RussiaPhone() {
      return this.configs.find((item) => item.key == 'PHONE_RUSSIA');
    },

    email() {
      return this.configs.find((item) => item.key == 'email');
    },

    companyRequsites() {
      return [
        {
          name: this.configs.find((item) => item.key == 'company1').value ?? '',
          inn: this.configs.find((item) => item.key == 'inn1').value ?? '',
          attestation:
            this.configs.find((item) => item.key == 'attestation1').value ?? '',
        },
        {
          name: this.configs.find((item) => item.key == 'company2').value ?? '',
          inn: this.configs.find((item) => item.key == 'inn2').value ?? '',
          attestation:
            this.configs.find((item) => item.key == 'attestation2').value ?? '',
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped></style>
