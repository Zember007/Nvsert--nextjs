<template>
  <main class="article">
    <div class="wrapper">
      <!-- {% include 'includes/blocks/breadcrumbs.html' %} -->

      <AppBreadcrumbs :root="'/type/'" :title="title" />
      <div class="article__wrapper">
        <div class="mtp">
          <h1>{{ title }}</h1>

          <transition-group
            tag="div"
            name="fade"
            class="mtp__spoiler js-spoiler"
            ref="boundings"
          >
            <app-class-spoiler
              v-for="spoiler in documents.content"
              :key="spoiler.name"
              :spoiler="spoiler"
              :slug="type"
            />
          </transition-group>

          <div ref="observerTarget" class="observer"></div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import AppClassSpoiler from '../../components/class/AppClassSpoiler.vue';
import AppBreadcrumbs from '../../components/general/AppBreadcrumbs.vue';

export default {
  name: 'Class',

  components: { AppBreadcrumbs, AppClassSpoiler },

  data() {
    return {
      pageSize: 20,
      page: 1,
      observer: null,
    };
  },

  computed: {
    type() {
      return this.$route.path.replace('/class/', '');
    },

    title() {
      switch (this.type) {
        case 'okp/':
          return 'ОКП';
        case 'tnved/':
          return 'ТН ВЭД';
        default:
          return '';
      }
    },

    // page() {
    //   return this.$route.query.page ? this.$route.query.page : 1;
    // },
    ordering() {
      return this.$route.query.ordering ? this.$route.query.ordering : '';
    },
    search() {
      return this.$route.query.search ? this.$route.query.search : '';
    },
    documents() {
      return this.$store.getters['class/getterСlass'];
    },
  },

  methods: {
    async fetchData() {
      
      if(this.type !== 'tnved/' && this.type !== 'okp/') {
        this.$nuxt.error({ statusCode: 404, message: 'not found' })
      }
      
      let url = this.type;
      if(url === 'tnved/') {
        url = 'tn'
      } else {
        url = 'okp'
      }
      
      await this.$store.dispatch('class/updateActionСlass', [
        url,
        this.ordering,
        this.page,
        this.pageSize,
      ])
    },

    async fetchMore() {
      await this.$store.dispatch('class/updateActionMoreСlass', [
        url,
        this.ordering,
        this.page,
        this.pageSize,
      ]);
    },

    async showMore() {
      if (this.page < this.documents.totalPages) {
        console.log(
          '🚀 ~ file: _.vue ~ line 83 ~ showMore ~ showMore',
          'showMore'
        );
        this.page = this.page + 1;
        await this.fetchMore();
      }
    },

    onElementObserved() {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (
            entry.intersectionRatio > 0 &&
            this.page < this.documents.totalPages
          ) {
            this.showMore();
          }
        });
      });
      this.observer.observe(this.$refs.observerTarget);
    },
  },

  created() {},

  mounted() {
    this.onElementObserved();
  },

  async fetch() {
    await this.fetchData();
  },
};
</script>

<style lang="scss">
@import '~assets/styles/article.scss';

.article__wrapper {
  position: relative;

  .observer {
    position: absolute;
    bottom: 280px;
  }
}
</style>
