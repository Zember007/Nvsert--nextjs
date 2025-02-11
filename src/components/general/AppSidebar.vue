<template>
  <div
    class="cat-menu-wrapper js-cat-menu__list"
    :class="{ active: mobileOpened }"
  >
    <button
      class="btn close-btn js-close-btn"
      type="button"
      @click.prevent="closeSidebar"
    >
      <span></span>
    </button>

    <ul class="cat-menu__content">
      <AppSidebarItem
        v-for="item in navigation"
        :key="item.id"
        :navItem="item"
      />
    </ul>
  </div>
</template>

<script>
import AppSidebarItem from './AppSidebarItem.vue';
export default {
  name: 'AppSidebar',

  methods: {
    closeSidebar() {
      this.$nuxt.$emit('toggleSidebar');
    },
  },

  props: {
    navigation: {
      type: Array,
      required: true,
      default: () => []
    },

    mobileOpened: {
      type: Boolean,
      default: true,
    },
  },
  components: { AppSidebarItem },
};
</script>

<style lang="scss">
@import '~assets/styles/blocks/sidebar.scss';
</style>
