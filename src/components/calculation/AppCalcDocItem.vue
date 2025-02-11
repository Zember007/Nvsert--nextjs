<template>
  <div class="product-card">
    <div class="product-card__img" v-if="docItem.document.image">
      <picture>
        <img
          :src="docItem.document.image"
          :alt="docItem.document.title"
          :title="docItem.document.title"
          width="128"
          height="180"
        />
      </picture>
    </div>
    <div class="product-card__content">
      <h6 class="product-card__title" v-if="docItem.document.title">
        {{ docItem.document.title }}
      </h6>
      <div
        class="product-card__txt"
        v-html="docItem.document.full_text"
        :class="{ folded }"
      ></div>
      <button
        @click.prevent="toogleFold"
        type="button"
        class="btn product-card__link"
      >
        {{ foldBtnText }}
      </button>
    </div>
    <div class="product-card__right">
      <div class="product-card__count">
        <button
          class="product-card__count-btn product-card__count-btn--minus"
          type="button"
          @click="countUpdate(false)"
        >
          <i class="icon icon-btn-minus"></i>
        </button>
        <input
          v-model="count"
          readonly
          type="number"
          class="product-card__count-input"
          min="0"
          max="1000"
          step="1"
        />
        <button
          class="product-card__count-btn product-card__count-btn--plus"
          type="button"
          @click="countUpdate(true)"
        >
          <i class="icon icon-btn-plus"></i>
        </button>
      </div>
      <div class="product-card__price" v-if="docItem.document.price">
        {{ docItem.document.price | filterRub }} ₽
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppCalcDocItem',

  data() {
    return {
      folded: true,
      count: this.docItem.count,
    };
  },

  computed: {
    foldBtnText() {
      switch (this.folded) {
        case true: {
          return 'Подробнее';
        }
        case false: {
          return 'Скрыть';
        }
        default:
          return 'Подробнее';
      }
    },
  },

  methods: {
    toogleFold() {
      this.folded = !this.folded;
    },

    removeDocFromList() {
      this.$nuxt.$emit('removeDoc', this.orderDocId);
    },

    async countUpdate(val) {
      await this.$nuxt.$emit('countUpdate', this.orderDocId, this.count, val);
      if (this.count !== 1) {
        val ? (this.count += 1) : (this.count -= 1);
      } else {
        val ? (this.count += 1) : this.removeDocFromList();
      }
    },
  },

  props: {
    docItem: {
      type: Object,
      required: true,
    },

    orderDocId: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
