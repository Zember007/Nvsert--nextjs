<template>
  <div>
    <div class="article">
      <div class="wrapper" v-if="!$fetchState.pending">
        <transition name="fade" appear>
            <AppBreadcrumbs
              :breadcrumbs="article.breadcrumbs"
              :root="'/'"
            />
          
        </transition>

        <div class="article__wrapper">
          <button
            class="cat-menu__btn js-cat-menu-btn btn btn--l btn--primary"
            type="button"
            @click.prevent="toogleMobileSidebar"
          >
            <span class="btn-text">Категории</span>
          </button>
          <div class="cat-menu js-cat-menu">
            <transition name="fade" appear>
              <AppSidebar
                @click.prevent="toogleMobileSidebar"
                v-if="!$fetchState.pending && navigation && navigation.length > 0"
                :navigation="navigation"
                :mobileOpened="sidebarOpened"
              />
            </transition>
          </div>

          <div class="mtp">
            <h1>{{ pageTitle }}</h1>
            <transition name="fade" appear>
              <template v-if="article.full_text">
                <div v-html="article.full_text" />
              </template>
              
            </transition>
            <transition name="fade" appear>
              <template v-if="
                  !$fetchState.pending &&
                  article.media &&
                  article.media.length > 0
                ">
                <AppArticleGallery
                  :media="article.media"
                />
              </template>
              
            </transition>

            <template v-if=" !$fetchState.pending && article && article.show_staff">
              <Staff/>
            </template>
            
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { initGallery } from '../../scripts_modules/popup-gallery';

import head from '@/mixins/head.js';
import articleMobileSidebar from '@/mixins/articleMobileSidebar.js';

import AppBreadcrumbs from '../../components/general/AppBreadcrumbs.vue';
import AppSidebar from '../../components/general/AppSidebar.vue';
import AppArticleGallery from '../../components/article/AppArticleGallery.vue';
import Staff from '@/components/article/Staff.vue';

export default {
  name: 'ArticlesPage',
  components: { 
    AppSidebar, 
    AppBreadcrumbs, 
    AppArticleGallery,
    Staff,
  },
  mixins: [head, articleMobileSidebar],

  data() {
    return {
      navigationOrdering: '',
    };
  },

  computed: {
    slug() {
      return this.$route.path.replace('/article/', '');
    },

    article() {
      return this.$store.getters['article/getterArticle'];
    },

    SEO() {
      return this.$store.getters['article/getterArticleSeo'];
    },

    navigation() {
      return this.$store.getters['navigation/getterNavigation'];
    },

    pageTitle() {
      return this.article.seo_h1 ? this.article.seo_h1 : this.article.title;
    },
  },

  methods: {
    setClickListener(block) {
      block.addEventListener('click', (evt) => {
        this.$nuxt.$emit('defineModalContent', 'knowCost');
        // console.log('raz');
      });
    },

    setKnowCostVisuals(block) {
      let wrapper = block.closest('.know-cost');

      if (!wrapper) return;

      if (wrapper.classList.contains('operating')) return;

      wrapper.classList.add('operating');

      let textBlock = document.createElement('div');
      textBlock.classList.add('know-cost__text');

      textBlock.innerHTML = `

        <p class="know-cost__title">
           Узнай цену и получи скидку!
        </p>

        <p class="know-cost__desc">
          Оставьте заявку на персональную консультацию и наш менеджер с Вами свяжется
        </p>

      `;

      wrapper.insertAdjacentElement('afterbegin', textBlock);
    },

    getKnownCostLinks() {
      let knowCostLinks = [...document.querySelectorAll('a')].filter((a) => {
        return (
          a.href.indexOf('#request-call-id') > 0 ||
          a.href.indexOf('#send-query-id') > 0
        );
      });
      console.log(
        '🚀 ~ file: _.vue ~ line 94 ~ knowCostLinks ~ knowCostLinks',
        knowCostLinks
      );

      if (knowCostLinks) {
        knowCostLinks.forEach((link) => {
          this.setClickListener(link);
          this.setKnowCostVisuals(link);
        });
      }
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.article.media && this.article.media.length > 0
        ? initGallery()
        : false;

      this.getKnownCostLinks();
    });
  },

  updated() {
    this.getKnownCostLinks();
  },

  async fetch() {
    let vm = this;

    await Promise.all([
      vm.$store.dispatch('navigation/updateActionNavigation', [
        vm.navigationOrdering,
      ]),
      vm.$store.dispatch('article/updateActionArticle', [this.slug])
    ]).catch(({ response: error }) => {
      vm.$nuxt.error({ statusCode: error.status, message: error.statusText })
    });

  },
};
</script>

<style lang="scss">
@import '~assets/styles/article.scss';
</style>
