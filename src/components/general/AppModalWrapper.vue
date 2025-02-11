<template>
  <modal
    class="modal"
    name="defaultModal"
    :width="'100%'"
    :height="'auto'"
    :max-width="512"
    :adaptive="true"
    :shiftY="0.42"
    @opened="handleOpen"
    @closed="handleClose"
  >
    <div class="modal__close--wrapper">
      <button class="btn modal__close" @click="$modal.hide('defaultModal')">
        <i class="icon icon--close"></i>
      </button>
    </div>
    <div class="modal__content">
      <portal-target :name="contentName"></portal-target>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'AppModalWrapper',

  methods: {
    handleOpen() {
      this.$nuxt.$emit('enableOverflow');
    },
    handleClose() {
      this.$nuxt.$emit('disableOverflow');
    },
  },

  props: {
    contentName: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
