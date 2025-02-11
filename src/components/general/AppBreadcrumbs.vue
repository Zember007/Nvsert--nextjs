<template>
  <ul class="breadcrumbs">
    <li class="breadcrumbs__item" key="home">
      <nuxt-link to="/" class="breadcrumbs__link"
        ><i class="icon icon--home"></i
      ></nuxt-link>
    </li>
    <li class="breadcrumbs__item" key="set" v-if="title">
      <nuxt-link :to="root" class="breadcrumbs__link">{{ title }}</nuxt-link>
    </li>

    <li class="breadcrumbs__item" v-for="item in breadcrumbs" :key="item.id">
      <nuxt-link
        :to="root + (item.full_slug ? item.full_slug + '/' : item.id)"
        class="breadcrumbs__link"
      >
        {{ crumbTitle(item) }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AppBreadcrumbs',

  methods: {
    crumbTitle(item) {
      return item.seo_h1 ? item.seo_h1 : item.title;
    },
  },

  props: {
    root: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      default: '',
    },

    breadcrumbs: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>

<style lang="scss"></style>
