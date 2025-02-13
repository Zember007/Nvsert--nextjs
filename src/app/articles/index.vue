<template>
  <main class="article">
    <div class="wrapper">
      <AppBreadcrumbs :root="'/articles/'" />
      <div class="article__wrapper">
        <!-- <transition name="fade" appear> -->
        <button
          @click.prevent="toogleMobileSidebar"
          class="cat-menu__btn js-cat-menu-btn btn btn--l btn--primary"
          type="button"
        >
          <span class="btn-text">Категории</span>
        </button>

        <div class="cat-menu js-cat-menu">
          <transition name="fade" appear>
            <AppSidebar
              v-if="!$fetchState.pending && navigation && navigation.length > 0"
              :navigation="navigation"
              :mobileOpened="sidebarOpened"
            />
          </transition>
        </div>
        <!-- </transition> -->

        <div class="mtp">
          <h1>{{ $t('articles') }}</h1>

          <template v-if="searchQuery">
            <h4>{{ searchQuery }}</h4>
          </template>

          <transition-group
            tag="div"
            name="fade"
            apper
            class="mtp__news"
            v-if="
              !$fetchState.pending &&
              articles.content &&
              articles.content.length > 0
            "
          >
            <AppArticlesCard
              v-for="card in articles.content"
              :key="card.id"
              :card="card"
            />
          </transition-group>
          <!-- {% include 'includes/blocks/pagination.html' %} -->

          <AppArticlesPagination :pagination="pagination" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import articleMobileSidebar from '@/mixins/articleMobileSidebar.js';

import AppSidebar from '../../components/general/AppSidebar.vue';
import AppBreadcrumbs from '../../components/general/AppBreadcrumbs.vue';
import AppArticlesCard from '../../components/articles/AppArticlesCard.vue';
import AppArticlesPagination from '../../components/articles/AppArticlesPagination.vue';
export default {
  name: 'ArticlesList',
  mixins: [articleMobileSidebar],

  watch: {
    '$route.query': function (newQuery, oldQuery) {
      if (JSON.stringify(newQuery) !== JSON.stringify(oldQuery)) {
        // console.log("Query changed");
        this.$fetch();
      }
    },
  },

  components: {
    AppSidebar,
    AppArticlesCard,
    AppArticlesPagination,
    AppBreadcrumbs,
  },

  data() {
    return {
      pageInitial: 1,
      pageSizeInitial: 12,
      orderingInitial: '',
      navigationOrdering: '',
    };
  },

  computed: {
    page() {
      return this.$route.query.page ? this.$route.query.page : 1;
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

    searchQuery() {
      // return this.$route.query
      console.log(
        '🚀 ~ file: index.vue ~ line 85 ~ coinc ~ Object.entries(this.$route.query)',
        Object.entries(this.$route.query)
      );

      let coinc = Object.entries(this.$route.query)
        .map(([key, value]) => {
          switch (key) {
            case 'okp':
              return 'ОКП: ' + value;
            case 'tnved':
              return 'ТН ВЭД: ' + value;
            case 'search':
              return 'Поиск по совпадению: ' + value;
            default:
              return '';
          }
        })
        ?.join(', ');

      if (coinc) {
        return `Результаты поискового запроса: "${coinc}"`;
      }
    },

    articles() {
      return this.$store.getters['articles/getterArticles'];
    },

    navigation() {
      return this.$store.getters['navigation/getterNavigation'];
    },

    breadcrumbs() {
      return this.articles.breadcrumbs ?? [];
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

  async fetch() {
    try {
      await this.$store.dispatch('navigation/updateActionNavigation', [
        this.navigationOrdering,
      ]);
      await this.$store.dispatch('articles/updateActionArticles', [
        '',
        this.ordering,
        this.page,
        this.pageSizeInitial,
        this.search,
        this.okp,
        this.tnved,
      ]);
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style lang="scss">
@import '~assets/styles/article.scss';
</style>
