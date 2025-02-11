<template>
  <div class="mtp__spoiler-item js-spoiler-item" :class="{ active: preopened }">
    <div class="mtp__spoiler-item-header">
      <button
        class="mtp__spoiler-button js-spoiler-button"
        @click="toggleOpen($event)"
      >
        {{ title }}
      </button>
    </div>
    <div
      class="mtp__spoiler-item-content js-spoiler-content"
      :style="{ 'height: auto': preopened }"
    >
      <div class="mtp__spoiler-text">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppSpolerItem',

  methods: {
    toggleOpen(evt) {
      evt.preventDefault();
      let target = evt.target.closest('.js-spoiler-button');

      const spoiler = target.closest('.js-spoiler-item');
      const spoilerContent = spoiler.querySelector('.js-spoiler-content');
      let parentContent = spoilerContent
        .closest('.js-spoiler-item')
        .closest('.js-spoiler-content');

      if (!spoiler.classList.contains('active')) {
        spoiler.classList.add('active');
        spoilerContent.style.height = 'auto';

        let height = spoilerContent.clientHeight + 'px';
        spoilerContent.style.height = '0px';

        spoilerContent.addEventListener(
          'transitionend',
          function () {
            spoilerContent.style.height = 'auto';
          },
          {
            once: true,
          }
        );

        setTimeout(function () {
          spoilerContent.style.height = height;
        }, 0);
      } else {
        spoilerContent.style.height = spoilerContent.clientHeight + 'px';

        spoilerContent.addEventListener(
          'transitionend',
          function () {
            spoiler.classList.remove('active');
          },
          {
            once: true,
          }
        );

        setTimeout(function () {
          spoilerContent.style.height = '0px';
        }, 0);
      }
    },
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    preopened: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.mtp__spoiler-text :deep(ul, ol) {
  margin-top: 16px;
  padding-left: 32px;
  list-style: none;

  @media (max-width: $media-s) {
    padding-left: 24px;
  }

  li {
    position: relative;
    margin-bottom: 8px;
    margin-top: 8px;
    font-size: 16px;
    line-height: 24px;

    @media (max-width: $media-m) {
      font-size: 14px;
      line-height: 1.4;
    }
  }
}

.mtp__spoiler-text :deep(ul) {
  li {
    display: list-item;
    list-style-type: disc;

    &::marker {
      position: absolute;
      top: 13px;
      width: 6px;
      height: 6px;
      color: $typography-accent;
      border-radius: 50%;
    }
  }
}

.mtp__spoiler-text :deep(ol) {
  li {
    list-style-type: decimal;
    display: list-item;
    padding-left: 8px;

    &::marker {
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;

      @media (max-width: $media-m) {
        //font-weight: 600;
        font-size: 14px;
        line-height: 1.4;
      }
    }
  }
}
</style>
