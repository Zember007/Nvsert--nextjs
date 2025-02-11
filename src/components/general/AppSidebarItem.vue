<template>
  <li
    class="cat-menu__item js-dropdown"
    :class="{ active: itemActive }"
    ref="navItem"
  >
    <template v-if="navItem.children && navItem.children.length > 0">
      <transition name="fade">
        <div
          class="cat-menu__group js-cat-menu__group"
          :class="{ active: itemActive }"
          ref="navBtnGroup"
        >
          <button
            @click="openDropdown()"
            type="button"
            class="cat-menu__btn js-cat-menu__btn"
          ></button>

          <nuxt-link :to="getFinalLink(navItem)" class="cat-menu__link">
            {{ navItem.title }}
          </nuxt-link>
        </div>
      </transition>

      <ul
        class="cat-menu__list js-dropdown-content"
        :class="{ active: itemActive }"
        ref="navContent"
      >
        <transition-group name="fade">
          <AppSidebarItem
            v-for="item in navItem.children"
            :key="item.id"
            :navItem="item"
          />
        </transition-group>
      </ul>
    </template>

    <nuxt-link
      v-else
      :to="getFinalLink(navItem)"
      :class="{ active: itemActive }"
      class="cat-menu__link"
    >
      {{ navItem.title }}
    </nuxt-link>
  </li>
</template>

<script>
export default {
  name: 'AppSidebarItem',

  data() {
    return {
      itemActive: false,
    };
  },

  props: {
    navItem: {
      type: Object,
      required: true,
    },
  },

  methods: {
    checkChildrenId() {
      if (this.navItem.children && this.navItem.children.length > 0) {
        let flag = this.navItem.children.find((child) => {
          return child.id == this.$route.path.replace('/', '');
        });

        return flag ? true : false;
      }

      return false;
    },

    /* checkChildrenSlug() {
      if (this.navItem.children && this.navItem.children.length > 0) {
        let flag = this.navItem.children.find((child) => {
          return (
            child.full_slug.indexOf(this.$route.path.replace('/article/', '')) >
            -1
          );
        });

        return flag ? true : false;
      }

      return false;
    }, */

    checkChildrenArticlePreview() {
      if (this.navItem.children && this.navItem.children.length > 0) {
        let flag = this.navItem.children.find((child) => {
          return (
            child.article_preview.indexOf(
              this.$route.path.replace('/article/', '')
            ) > -1
          );
        });

        return flag ? true : false;
      }

      return false;
    },

    checkArticlePreview() {
      this.navItem.article_preview.indexOf(
        this.$route.path.replace('/article/', '')
      ) > -1;
    },

    calcActive() {
      this.$route.path.startsWith(`/${this.navItem.full_slug}`) 
        ? (this.itemActive = true)
        : '';
    },

    openDropdown(evt) {
      this.itemActive = !this.itemActive;
    },

    getFinalLink(item) {
      if (item.children.length === 0 && item.article_preview) {
        return '/' + item.article_preview + '/';
      } else {
        if(item.full_slug.charAt(0) === '/') {
          return `${item.full_slug}/`;
        }
        return `/${item.full_slug}/`;
        
      }
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.calcActive();
    });
  },

  updated() {
    this.$nextTick(() => {
      this.calcActive();
    });
  },
};
</script>

<style lang="scss" scoped>
.cat-menu__link {
  &.nuxt-link-exact-active {
    color: $typography-accent;
    pointer-events: none;
  }
}
</style>
