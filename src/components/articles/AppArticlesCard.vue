<template>
  <div class="mtp__news-item">
    <div class="mtp__news-head">
      <nuxt-link :to="`/${card.full_slug}/`" class="mtp__news-link">
        <h5 class="mtp__news-title" v-if="card.title" v-html="card.title"></h5>
      </nuxt-link>
      <!-- <div class="date" v-if="card.created">{{card.created}}</div> -->
    </div>
    <div
      class="mtp__news-txt"
      v-if="card.short_text"
      v-html="card.short_text"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'AppArticlesCard',

  props: {
    card: Object,
    required: true,
  },
};
</script>

<style lang="scss" scoped></style>
