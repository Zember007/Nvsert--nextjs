<template>
  <nav class="pagination" v-if="pagination.totalPages > 1">
    <ul class="pagination__list">
      <li class="pagination__item">
        <button
          class="pagination__link"
          @click.prevent="pageRedirect(1)"
          :class="{ active: 1 == pagination.page }"
        >
          1
        </button>
      </li>

      <li class="pagination__item" v-if="hasPrevDots">. . .</li>

      <li v-for="item in strictedRange" :key="item.id" class="pagination__item">
        <button
          type="button"
          @click.prevent="pageRedirect(item)"
          class="pagination__link"
          :class="{ active: item == pagination.page }"
        >
          {{ item }}
        </button>
      </li>

      <li class="pagination__item" v-if="hasPostDots">. . .</li>

      <li class="pagination__item">
        <button
          type="button"
          @click.prevent="pageRedirect(pagination.totalPages)"
          class="pagination__link"
          :class="{ active: pagination.totalPages == pagination.page }"
        >
          {{ pagination.totalPages }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'AppArticlesPagination',

  computed: {
    currentRange() {
      return Array.from(Array(this.pagination.totalPages).keys()).slice(
        2,
        this.pagination.totalPages
      );
    },

    strictedRange() {
      return this.currentRange.slice(
        Number(this.pagination.page) - 4 > 0
          ? Number(this.pagination.page) - 4
          : 0,
        Number(this.pagination.page) + 1
      );
    },

    hasPrevDots() {
      return Number(this.pagination.page) - 2 > 1 ? true : false;
    },

    hasPostDots() {
      return this.pagination.totalPages - Number(this.pagination.page) > 3
        ? true
        : false;
    },
  },

  methods: {
    pageRedirect(num) {
      let params = Object.assign({}, this.$route.query);

      if (Object.keys(params).includes('page') && params.page == num) return;

      params['page'] = num;

      this.$router.replace({ query: params });
    },
  },

  props: {
    pagination: Object,
    required: true,
  },
};
</script>

<style lang="scss" scoped></style>
