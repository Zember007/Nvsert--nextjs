<template>
  <form @submit.prevent="makeOrder">
    <div class="product-list">
      <app-calc-doc-item
        v-for="doc in receivedDocs"
        :key="doc.id"
        :docItem="doc"
        :orderDocId="doc.id"
      />
    </div>
    <div class="form-bottom">
      <div class="form-bottom__price">
        <div class="form-bottom__price-txt">Итого:</div>
        <div class="form-bottom__price-wrapper">
          <div class="form-bottom__price-outdated" v-if="price.old_price">
            {{ price.old_price | filterRub }} ₽
          </div>
          <div class="form-bottom__price-total">
            {{ price.price | filterRub }} ₽
          </div>
        </div>
      </div>
      <button class="btn btn-send-order btn--primary btn--l" type="submit">
        Оформить заказ
      </button>
    </div>
  </form>
</template>

<script>
import AppCalcDocItem from '../calculation/AppCalcDocItem.vue';
export default {
  name: 'AppCalcFormFinal',
  components: { AppCalcDocItem },

  computed: {
    sessionKey() {
      return this.$store.getters['session/getterSessionId'];
    },

    receivedDocs() {
      return this.$store.getters['documents/getterReceivedDocs'];
    },

    docsSendable() {
      return this.receivedDocs.map((item) => {
        let oper = Object.assign({}, item);

        delete oper.document;
        return oper;
      });
    },

    price() {
      return this.$store.getters['documents/getterDocsPrice'];
    },
  },

  methods: {
    async updateDocCount(docs) {
      try {
        await this.$store.dispatch('documents/updateActionReceivedDocs', [
          this.sessionKey,
          docs,
        ]);
      } catch (error) {
        if (error instanceof Error) console.error(error);
      }
    },

    removeDocument(id) {
      this.$store.dispatch('documents/removeDocument', id);

      if (this.docsSendable.length === 0) {
        this.$nuxt.$emit('stepBack');
      }
    },

    updateListener() {
      this.$nuxt.$on('countUpdate', (id, count, val) => {
        let newArr = this.docsSendable.map((item) => {
          if (item.id === id) {
            val ? (item.count = count += 1) : (item.count = count -= 1);
            return item;
          } else {
            return item;
          }
        });

        this.updateDocCount(newArr);
      });
    },

    removeDocumentListener() {
      this.$nuxt.$on('removeDoc', (id) => {
        this.removeDocument(id);
      });
    },

    async makeOrder() {
      try {
        await this.$axios
          .patch('api/order/done', {
            sessionid: this.sessionKey,
          })
          .then((response) => {
            if (response.status === 200 || 201) {
              this.$nuxt.$emit('defineModalContent', 'successMessage');

              setTimeout(() => {
                window.location.reload();
              }, 4000);
            }
          });
      } catch (error) {
        if (error instanceof Error) console.error(error);
      }
    },
  },

  created() {
    this.updateListener();
    this.removeDocumentListener();
  },

  beforeDestroy() {
    this.$nuxt.$off('removeDoc');
    this.$nuxt.$off('countUpdate');
  },
};
</script>

<style lang="scss" scoped></style>
