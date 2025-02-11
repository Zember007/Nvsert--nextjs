<template>
  <ul class="services-menu__list">
    <li class="services-menu__item" v-for="item in navigation" :key="item.id">
      <nuxt-link :to="defineUrl(item)" class="services-menu__link"
        >{{ item.title }}
      </nuxt-link>
      <ul
        class="services-menu__list"
        v-if="item.children && item.children.length > 0"
      >
        <li
          class="services-menu__item"
          v-for="item in item.children"
          :key="item.i"
        >
          <nuxt-link :to="defineUrl(item)" class="services-menu__link">
            {{ item.title }}</nuxt-link
          >
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AppNavigation',

  computed: {
    navigation() {
      return this.$store.getters['navigation/getterServices'];
    },
  },

  methods: {
    defineUrl(item) {
      if (item.children.length === 0 && item.article_preview) {
        return '/' + item.article_preview + '/';
      } else {
        return '/' + item.full_slug + '/';
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
