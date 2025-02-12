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

