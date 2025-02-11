<template>
  <div>
    <AppValidationObserver
      v-slot="{ handleSubmit }"
      ref="calcFormSecondObserver"
    >
      <form @submit.prevent="handleSubmit(onSubmit)" ref="calcFormSecond">
        <h5 class="form-subtitle">{{ $t('calculation.form.text.step_2') }}</h5>

        <AppInput
          :inputName="'product'"
          :title="$t('calculation.form.placeholder.product_name')"
          :required="true"
        />

        <h5 class="form-subtitle">
          {{ $t('calculation.form.subtext.step_2') }}
        </h5>

        <AppSelect
          :title="$t('calculation.form.placeholder.choose_doc')"
          :name="'doc_1'"
          :options="documents"
          :required="true"
        />
        <AppSelect
          :title="$t('calculation.form.placeholder.choose_doc')"
          :name="'doc_2'"
          :options="documents"
        />
        <AppSelect
          :title="$t('calculation.form.placeholder.choose_doc')"
          :name="'doc_3'"
          :options="documents"
        />

        <div class="form-bottom">
          <button class="btn btn--primary btn--l" type="submit">
            {{ $t('calculation.form.btn.next') }}
          </button>
          <button
            class="btn btn-modal-open"
            type="button"
            @click.prevent="openIntroModal"
          >
            {{ $t('calculation.form.btn.modal') }}
          </button>
        </div>
      </form>
    </AppValidationObserver>
  </div>
</template>

<script>
import AppInput from '@/components/forms/elements/AppInput';
import AppSelect from './elements/AppSelect.vue';

export default {
  name: 'AppCalcFormSecond',

  components: {
    AppInput,
    AppSelect,
  },

  data() {
    return {
      serverErrors: null,
      formData: [],
      selectedDocs: [],
    };
  },

  computed: {
    sessionKey() {
      return this.$store.getters['session/getterSessionId'];
    },
  },

  methods: {
    nextStep() {
      this.$nuxt.$emit('stepChange');
    },

    openIntroModal() {
      this.$nuxt.$emit('defineModalContent', 'introForm');
    },

    selectListener() {
      this.$nuxt.$on('selectChange', (inputValue, inputName) => {
        console.log('selectChange');
        this.selectedDocs.find((item) => item.name === inputName)
          ? (this.selectedDocs.find((item) => item.name === inputName).value =
              inputValue)
          : this.selectedDocs.push({ name: inputName, value: inputValue });
      });
    },

    inputListener() {
      this.$nuxt.$on('inputChange', (inputName, inputValue) => {
        this.formData.find((item) => item.name === inputName)
          ? (this.formData.find((item) => item.name === inputName).value =
              inputValue)
          : this.formData.push({ name: inputName, value: inputValue });
      });
    },

    async onSubmit() {
      try {
        await this.$refs.calcFormSecondObserver
          .validate()
          .then((success) => {
            if (!success) {
              return;
            }
          })
          .then(() => {
            return this.$recaptcha.execute('calcFormSecond');
          })
          .then((response) => {
            if (response) {
              let data = {};

              let productValue = this.formData.find(
                (item) => item.name === 'product'
              ).value;

              let chosenDocs = this.selectedDocs.map((item) =>
                parseInt(item.value)
              );

              data['captcha'] = response;
              data['sessionid'] = this.sessionKey;
              data['product'] = productValue;
              data['docs'] = chosenDocs;
              // formData.append('sessionid', this.sessionKey);
              // formData.append('product', productValue);
              // formData.append('docs', chosenDocs);

              return data;
            } else {
              throw new Error('Recaptcha failed');
            }
          })
          .then((data) => {
            if (data) {
              return this.$axios.patch('/api/order/docs', data);
            }
          })
          .then((response) => {
            if (response.status == 200 || 201) {
              this.$store.dispatch('documents/setActionReceivedDocs', [
                response.data.docs,
              ]);
              this.$store.dispatch('documents/setActionDocsPrice', {
                price: response.data.total,
                old_price: response.data.total_without_sale,
              });

              this.nextStep();
            } else {
              response.errors ?? Object.keys(response.errors).length > 0
                ? (this.serverErrors = response.errors)
                : false;
            }
          });
      } catch (error) {
        if (error instanceof Error) console.error(error);
      }
    },
  },

  created() {
    this.inputListener();
    this.selectListener();
  },

  beforeDestroy() {
    this.$nuxt.$off('inputChange');
    this.$nuxt.$off('selectChange');
  },

  props: {
    documents: {
      type: Array,
      required: true,
    },
  },
};
</script>
