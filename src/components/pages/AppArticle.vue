<template>
    <div>
        <h1>{{ pageTitle }}</h1>
        <transition name="fade" appear>
            <template v-if="article.full_text">
                <div v-html="article.full_text" />
            </template>

        </transition>
        <transition name="fade" appear>
            <template v-if="
                article.media &&
                article.media.length > 0
            ">
                <AppArticleGallery :media="article.media" />
            </template>

        </transition>

        <template v-if="article && article.files_list && article.files_list.length > 0">
            <Docs :docs="article.files_list" />
        </template>

        <template v-if="article && article.show_staff">
            <Staff />
        </template>

    </div>
</template>
  
<script>
import { initGallery } from '@/scripts_modules/popup-gallery';

import head from '@/mixins/head.js';

import AppArticleGallery from '@/components/article/AppArticleGallery.vue';
import Staff from '@/components/article/Staff.vue';
import Docs from '@/components/article/Docs.vue';

export default {
    name: 'ArticlesPage',
    components: {
        AppArticleGallery,
        Staff,
        Docs,
    },
    mixins: [head],

    data() {
        return {
            navigationOrdering: '',
        };
    },

    computed: {

        article() {
            return this.$store.getters['pages/getterPages'];
        },

        SEO() {
            return this.$store.getters['pages/getterPagesSeo'];
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
};
</script>