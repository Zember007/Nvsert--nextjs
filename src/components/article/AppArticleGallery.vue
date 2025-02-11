<template>
  <div class="mtp__gallery js-mtp-gallery">
    <div class="mtp__gallery-wrapper">

      <a :href="item.image" v-for="item in media" :key="item.id" class="mtp__gallery-item js-mtp-gallery-item">
        <picture>
          <source v-if="item.image_webp" :srcset="item.image_webp" type="image/webp" />
          <img v-if="item.image" :src="item.image" :alt="item.title" loading="lazy" />
        </picture>
      </a>
    </div>
  </div>

</template>

<script>
export default {
  name: 'AppArticleGallery',

  props: {
    media: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>