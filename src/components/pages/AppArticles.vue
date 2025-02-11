<template>
    <div>
        <h1>{{ articles.seo_h1 ? articles.seo_h1 : articles.title }}</h1>

        <div class="mtp__news">
            <transition-group tag="div" name="fade" apper class="mtp__news" v-if="
                articles.content &&
                articles.content.length > 0
            ">
                <AppArticlesCard v-for="card in articles.content" :key="card.id" :card="card" />
            </transition-group>

            <AppArticlesPagination :pagination="pagination" />
        </div>
    </div>
</template>
  
<script>

import AppArticlesCard from '@/components/articles/AppArticlesCard.vue';
import AppArticlesPagination from '@/components/articles/AppArticlesPagination.vue';

import head from '@/mixins/head.js';

export default {
    name: 'ArticlesListSlug',

    data() {
        return {
            pageInitial: 1,
            pageSizeInitial: 12,
            orderingInitial: '',
            navigationOrdering: '',
        };
    },
    mixins: [head],

    computed: {
        page() {
            return this.$route.query.page ? this.$route.query.page : 1;
        },

        id() {
            return this.$route.params.pathMatch;
        },

        SEO() {
            return this.$store.getters['pages/getterPagesSeo'];
        },

        ordering() {
            return this.$route.query.ordering ? this.$route.query.ordering : '';
        },

        search() {
            return this.$route.query.search ? this.$route.query.search : '';
        },
        okp() {
            return this.$route.query.okp ? this.$route.query.okp : '';
        },
        tnved() {
            return this.$route.query.tnved ? this.$route.query.tnved : '';
        },

        articles() {
            return this.$store.getters['pages/getterPages'];
        },

        pagination() {
            return {
                page: this.page ?? null,
                next: this.articles.next ?? null,
                prev: this.articles.previous ?? null,
                totalElements: this.articles.totalElements ?? null,
                totalPages: this.articles.totalPages ?? null,
                pageSize: this.articles.pageSize ?? null,
            };
        },
    },

/*     async fetch() {
        this.$store.dispatch('articles/resetActionArticles');

        await this.$store.dispatch('navigation/updateActionNavigation', [
            this.navigationOrdering,
        ]);
    },
 */
    components: {
        AppArticlesCard,
        AppArticlesPagination,
    },
};
</script>
  