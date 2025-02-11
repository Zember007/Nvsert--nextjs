<template>
  <section class="main-gallery">
    <div class="wrapper">
      <h2 class="main-gallery__title">А ещё у нас есть рекомендации и отзывы</h2>

      <div class="mtp__gallery js-mtp-gallery">
        <div class="mtp__gallery-wrapper">
          <a
            href="~assets/images/main-gallery/0001.jpg.1000x0_q85_crop-smart_detail.jpg"
            class="mtp__gallery-item js-mtp-gallery-item"
          >
            <picture>
              <img
                src="~assets/images/main-gallery/0001.jpg.1000x0_q85_crop-smart_detail.jpg"
              />
            </picture>
          </a>

          <a
            href="~assets/images/main-gallery/blagod-pismopage-0001.jpg.1000x0_q85_crop-smart_detail.jpg"
            class="mtp__gallery-item js-mtp-gallery-item"
          >
            <picture>
              <img
                src="~assets/images/main-gallery/blagod-pismopage-0001.jpg.1000x0_q85_crop-smart_detail.jpg"
              />
            </picture>
          </a>

          <a
            href="~assets/images/main-gallery/blagodarstvennoe-pismo-1pages-to-jpg-0001.jpg.1000x0_q85_crop-smart_detail.jpg"
            class="mtp__gallery-item js-mtp-gallery-item"
          >
            <picture>
              <img
                src="~assets/images/main-gallery/blagodarstvennoe-pismo-1pages-to-jpg-0001.jpg.1000x0_q85_crop-smart_detail.jpg"
              />
            </picture>
          </a>

          <a
            href="~assets/images/main-gallery/blagodarstvennoe-pismopage-0001.jpg.1000x0_q85_crop-smart_detail.jpg"
            class="mtp__gallery-item js-mtp-gallery-item"
          >
            <picture>
              <img
                src="~assets/images/main-gallery/blagodarstvennoe-pismopage-0001.jpg.1000x0_q85_crop-smart_detail.jpg"
              />
            </picture>
          </a>

          <a
            href="~assets/images/main-gallery/informatsionnoe-pismopage-0001.jpg.1000x0_q85_crop-smart_detail.jpg"
            class="mtp__gallery-item js-mtp-gallery-item"
          >
            <picture>
              <img
                src="~assets/images/main-gallery/informatsionnoe-pismopage-0001.jpg.1000x0_q85_crop-smart_detail.jpg"
              />
            </picture>
          </a>

          <a
            href="~assets/images/main-gallery/otzyiv-o-rabote-signed-1pages-to-jpg-0001.jpg.1000x0_q85_crop-smart_detail.jpg"
            class="mtp__gallery-item js-mtp-gallery-item"
          >
            <picture>
              <img
                src="~assets/images/main-gallery/otzyiv-o-rabote-signed-1pages-to-jpg-0001.jpg.1000x0_q85_crop-smart_detail.jpg"
              />
            </picture>
          </a>

          <a
            href="~assets/images/main-gallery/otzyiv-o-rabotepage-0001_6o2usfz.jpg.1000x0_q85_crop-smart_detail.jpg"
            class="mtp__gallery-item js-mtp-gallery-item"
          >
            <picture>
              <img
                src="~assets/images/main-gallery/otzyiv-o-rabotepage-0001_6o2usfz.jpg.1000x0_q85_crop-smart_detail.jpg"
              />
            </picture>
          </a>

          <a
            href="~assets/images/main-gallery/otzyiv-o-rabotepage-0001.jpg.1000x0_q85_crop-smart_detail.jpg"
            class="mtp__gallery-item js-mtp-gallery-item"
          >
            <picture>
              <img
                src="~assets/images/main-gallery/otzyiv-o-rabotepage-0001.jpg.1000x0_q85_crop-smart_detail.jpg"
              />
            </picture>
          </a>

          <a
            href="~assets/images/main-gallery/otzyiv-v-tsentr-standartpage-0001.jpg.1000x0_q85_crop-smart_detail.jpg"
            class="mtp__gallery-item js-mtp-gallery-item"
          >
            <picture>
              <img
                src="~assets/images/main-gallery/otzyiv-v-tsentr-standartpage-0001.jpg.1000x0_q85_crop-smart_detail.jpg"
              />
            </picture>
          </a>

          <a
            href="~assets/images/main-gallery/psm-tsspage-0001.jpg.1000x0_q85_crop-smart_detail.jpg"
            class="mtp__gallery-item js-mtp-gallery-item"
          >
            <picture>
              <img
                src="~assets/images/main-gallery/psm-tsspage-0001.jpg.1000x0_q85_crop-smart_detail.jpg"
              />
            </picture>
          </a>

          <a
            href="~assets/images/main-gallery/sdk-tsentr-standartizatsiipage-0001.jpg.1000x0_q85_crop-smart_detail.jpg"
            class="mtp__gallery-item js-mtp-gallery-item"
          >
            <picture>
              <img
                src="~assets/images/main-gallery/sdk-tsentr-standartizatsiipage-0001.jpg.1000x0_q85_crop-smart_detail.jpg"
              />
            </picture>
          </a>

          <a
            href="~assets/images/main-gallery/skan-pismopage-0001.jpg.1000x0_q85_crop-smart_detail.jpg"
            class="mtp__gallery-item js-mtp-gallery-item"
          >
            <picture>
              <img
                src="~assets/images/main-gallery/skan-pismopage-0001.jpg.1000x0_q85_crop-smart_detail.jpg"
              />
            </picture>
          </a>
        </div>
      </div>

      <div class="main-gallery__img">
        <img
          src="~assets/images/robot-3.gif"
          :alt="$t('mainGallery.imgTitle')"
          :title="$t('mainGallery.imgTitle')"
          width="554"
          height="516"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { initGallery } from '../../scripts_modules/popup-gallery';

export default {
  name: 'AppMainGallery',

  mounted() {
    this.$nextTick(() => {
      initGallery();
    });
  },
};
</script>

<style lang="scss" scoped></style>
