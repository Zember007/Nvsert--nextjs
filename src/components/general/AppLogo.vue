<template>
  <nuxt-link to="/" class="logo" title="NVSERT" :class="{ invert: inverted }">
    <i class="icon icon--logo"></i>
    <i class="icon icon--logo-mob"></i>
  </nuxt-link>
</template>

<script>
export default {
  name: 'AppLogo',

  props: {
    inverted: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  width: 122px;
  height: 24px;
  color: $typography-primary;
  z-index: 12;

  @media (max-width: $media-s) {
    width: 42px;
  }

  .icon {
    width: 100%;
    height: 100%;

    &--logo {
      @media (max-width: $media-s) {
        display: none;
      }
    }

    &--logo-mob {
      display: none;

      @media (max-width: $media-s) {
        display: block;
      }
    }
  }

  &.invert {
    width: 192px;
    height: 40px;
    color: $white-color;

    @media (max-width: $media-s) {
      width: 42px;
    }

    .icon {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
