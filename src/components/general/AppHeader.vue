<template>
  <header class="header">
    <div class="wrapper header__wrapper">
      <AppLogo />
      <div
        class="header__menu js-header-menu"
        :class="{ active: burgerMenuActive }"
      >
        <nav class="header-nav">
          <ul class="header-nav__list">
            <li class="header-nav__item">
              <button
                type="button"
                class="header-nav__link services-menu__btn js-services-menu__btn"
                @click.prevent="handleNavMenu"
                :class="{ active: servicesMenuActive }"
              >
                <span class="burger-btn">
                  <span></span>
                </span>
                Услуги
              </button>
            </li>
            <li class="header-nav__item">
              <nuxt-link :to="'/about/o-kompanii/'" class="header-nav__link">{{
                $t('navigation.about')
              }}</nuxt-link>
            </li>
            <!-- <li class="header-nav__item">
              <a href="#0" class="header-nav__link">{{$t('navigation.about')}}</a>
            </li> -->
            <li class="header-nav__item">
              <nuxt-link to="/contacts/" class="header-nav__link">{{
                $t('navigation.contacts')
              }}</nuxt-link>
            </li>
          </ul>
        </nav>
        <div class="header__menu-content">
          <h4 class="title">
            Зачем искать что-то самому, если можно заказать расчет?
          </h4>
          <p class="subtitle">
            Оставьте свои контактные данные, и мы сформируем для вас предложение
            по документу или пакету документов
          </p>
          <nuxt-link
            to="/find-out-cost/"
            class="btn btn--primary btn--m header__calc-link"
            >{{ $t('calculation.name') }}</nuxt-link
          >
        </div>
        <div
          class="services-menu js-services-menu"
          :class="{ active: servicesMenuActive }"
        >
          <div class="wrapper">
            <div class="services-menu__header">
              <h2 class="services-menu__title">Услуги</h2>
              <button
                class="services-menu__btn-close js-services-menu__btn"
                :class="{ active: servicesMenuActive }"
                @click.prevent="handleNavMenu"
                type="button"
              >
                <i class="icon icon--close"></i>
              </button>
            </div>
            <div class="services-menu__wrapper">
              <AppNavigation />
            </div>
          </div>
        </div>
      </div>

      <div class="header-phone">
        <a
          :href="headerPhone.value | filterPhone"
          class="header-phone__link"
          v-if="headerPhone"
          >{{ headerPhone.value }}</a
        >
        <button type="button" 
              class="header-phone__burger" 
              v-if="moscowPhone || spbPhone"
              :class="{'active': showPhonesDropdown}"
              @click="showPhonesDropdown = !showPhonesDropdown"></button>

        <transition name="fade">
          <div class="header-phone__dropdown"
            v-show="showPhonesDropdown"
            v-if="moscowPhone || spbPhone">
            <a
              :href="moscowPhone.value | filterPhone"
              v-if="moscowPhone"
              >{{ moscowPhone.value }} (МСК)</a>
            <a
              :href="spbPhone.value | filterPhone"
              v-if="spbPhone"
              >{{ spbPhone.value }} (СПБ)</a>
          </div>
        </transition>
      </div>
      <button
        type="button"
        class="btn-mobile js-burger-btn"
        @click="burgerHandler"
        :class="{ active: burgerMenuActive }"
      >
        Меню
        <span class="burger-btn">
          <span></span>
        </span>
      </button>
      <nuxt-link
        to="/find-out-cost/"
        class="btn btn--primary btn--m header__calc-link"
        >{{ $t('calculation.name') }}</nuxt-link
      >
    </div>
  </header>
</template>

<script>
import AppLogo from './AppLogo.vue';
import AppNavigation from './AppNavigation.vue';

export default {
  name: 'AppHeader',
  components: { AppLogo, AppNavigation },

  watch: {
    '$route.path': function () {
      this.closeNavMenues();
    },
  },

  data() {
    return {
      servicesMenuActive: false,
      burgerMenuActive: false,
      showPhonesDropdown: false,
    };
  },

  computed: {
    configs() {
      return this.$store.getters['configs/getterConfigs'];
    },

    headerPhone() {
      return this.configs.find((item) => item.key == 'PHONE_RUSSIA');
    },

    moscowPhone() {
      return this.configs.find((item) => item.key == 'PHONE_MOSCOW');
    },

    spbPhone() {
      return this.configs.find((item) => item.key == 'PHONE_SPB');
    },
  },

  methods: {
    handleNavMenu() {
      if (this.servicesMenuActive) {
        this.servicesMenuActive = false;
        if (!this.burgerMenuActive) {
          this.$nuxt.$emit('disableOverflow');
        }
        // if (this.$route.path !== '/') {
          // this.$nuxt.$emit('makeDefaultHeader');
        // }
      } else {
        this.servicesMenuActive = true;
        this.$nuxt.$emit('enableOverflow');
        // this.$nuxt.$emit('makeTransparentHeader');
      }
    },

    closeNavMenues() {
      this.servicesMenuActive = false;
      this.burgerMenuActive = false;
      this.$nuxt.$emit('disableOverflow');
      // if (this.$route.path !== '/') {
      this.$nuxt.$emit('makeDefaultHeader');
      // }
    },

    burgerHandler() {
      let headerIsTransparent = document
        .querySelector('body')
        .classList.contains('transparent-header');

      let bodyTag = document.querySelector('body');
      if (!this.burgerMenuActive) {
        this.burgerMenuActive = true;
        this.$nuxt.$emit('enableOverflow');

        if (headerIsTransparent === false) {
          this.$nuxt.$emit('makeTransparentHeader');
        }
      } else {
        this.burgerMenuActive = false;

        this.$nuxt.$emit('disableOverflow');
        if (headerIsTransparent === false) {
          this.$nuxt.$emit('makeDefaultHeader');
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
