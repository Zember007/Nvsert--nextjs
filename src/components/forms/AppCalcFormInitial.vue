<template>
  <div>

    <template>

      <AppValidationObserver v-slot="{ handleSubmit }" ref="calcFormInitObserver">
        <form @submit.prevent="handleSubmit(onSubmit)" ref="calcFormInit" enctype="multipart/form-data">
          <div class="cost-calc__group">
            <AppInputDate :inputName="fields[0]" :title="$t('calculation.form.placeholder.doc')" />
            <span class="discount" v-if="sales[0] > 0">+{{ sales[0] }}%</span>
          </div>

          <div class="cost-calc__group">
            <AppInput :inputName="fields[1]" :required="true" :title="$t('calculation.form.placeholder.name')" />
            <span class="discount" v-if="sales[1] > 0">+{{ sales[1] }}%</span>
          </div>

          <div class="cost-calc__group">
            <AppInput :inputName="fields[2]" :type="'phone'" :mask="'phone'"
              :title="$t('calculation.form.placeholder.phone')" />
            <span class="discount" v-if="sales[2] > 0">+{{ sales[2] }}%</span>
          </div>

          <div class="cost-calc__group">
            <AppInput :inputName="fields[3]" :type="'email'" :required="true"
              :title="$t('calculation.form.placeholder.mail')" />
            <span class="discount" v-if="sales[3] > 0">+{{ sales[3] }}%</span>
          </div>

          <div class="cost-calc__group">
            <AppInput :inputName="fields[4]" :title="$t('calculation.form.placeholder.company_name')"
              :autocomplete="'off'" ref="companyInput" />
            <span class="discount" v-if="sales[4] > 0">+{{ sales[4] }}%</span>

            <ul class="cost-calc__dropdown" :class="{ 'active': showCompanyHints && companyHints.length > 0 }">

              <div class="cost-calc__hint"
                @click="$refs.companyInput.changeValue(`${hint.value} ${hint.city !== null ? ', ' + hint.city : ''}`); showCompanyHints = false;"
                v-for="hint in     companyHints    " :key="JSON.stringify(hint)">
                {{ hint.value }}
                <span v-if=" hint.city !== null ">, {{ hint.city }}</span>
                <span v-if=" hint.inn !== null "> - ИНН: {{ hint.inn }}</span>
              </div>

            </ul>

          </div>

          <div class="cost-calc__group">
            <AppInput :inputName=" fields[5] " :title=" $t('calculation.form.placeholder.company_site') " />
            <span class="discount" v-if=" sales[5] > 0 ">+{{ sales[5] }}%</span>
          </div>

          <div class="cost-calc__group">
            <AppInput :inputName=" fields[6] " :title=" $t('calculation.form.placeholder.company_city') " />
            <span class="discount" v-if=" sales[6] > 0 ">+{{ sales[6] }}%</span>
          </div>

          <div class="cost-calc__group">
            <AppInputFile :inputName=" fields[7] " :discount=" sales[7] " />
          </div>

          <div class="form-bottom">
            <button class="btn btn--primary btn--l" type="submit">
              {{ $t('calculation.form.btn.next') }}
            </button>
            <div class="policy">
              <label class="field-check">
                <input class="field-check__input" :required=" true " type="checkbox" />
                <span class="field-check__name">
                  {{ $t('privacy.btn.next') }}
                  <nuxt-link to="/soglashenie/polzovatelskoe-soglashenie/" target="_blank"> {{ $t('privacy.btn.link') }}
                  </nuxt-link>
                </span>
              </label>
            </div>
          </div>
        </form>
      </AppValidationObserver>
    </template>

  </div>
</template>

<script>
import AppInput from '@/components/forms/elements/AppInput';
import AppInputFile from '@/components/forms/elements/AppInputFile';
import AppInputDate from '@/components/forms/elements/AppInputDate.vue';

export default {
  name: 'AppCalcFormInitital',

  async fetch() {
    await this.$store.dispatch('session/updateActionSessionId');
  },

  components: {
    AppInput,
    AppInputFile,
    AppInputDate,
  },

  data() {
    return {
      serverErrors: null,
      formData: [],
      salesUsed: [],
      companyHints: [],
      showCompanyHints: false,
      hintsTimeout: null,
    };
  },

  watch: {
    salesUsedSum(nv) {
      this.triggerCurrDiscount(nv);
    },
  },

  computed: {
    sales() {
      return this.discount
        ? this.discount.map((discount) => {
          return discount.sale;
        })
        : [];
    },
    fields() {
      return this.discount
        ? this.discount.map((discount) => {
          return discount.field;
        })
        : [];
    },

    sessionKey() {
      return this.$store.getters['session/getterSessionId'];
    },

    salesUsedSum() {
      return this.formData.reduce((prev, curr) => {
        if (curr.value !== '') {
          let discountVal =
            this.discount.find((item) => {
              return item.field === curr.name;
            })?.sale || 0;

          return prev + discountVal;
        } else {
          return prev;
        }
      }, 0);
    },
  },

  methods: {
    async getSession() {
      await this.$store.dispatch('session/updateActionSessionId');
    },

    nextStep() {
      this.$nuxt.$emit('stepChange');
    },

    async getCompanyHints(inputValue) {

      await this.$axios.$get('/api/order/companies', {
        params: {
          query: inputValue,
          count: 10
        },
      })
        .then((response) => {
          this.companyHints = response;
          this.showCompanyHints = true;
        });
    },

    inputListener() {
      this.$nuxt.$on('inputChange', (inputName, inputValue) => {
        this.formData.find((item) => item.name === inputName)
          ? (this.formData.find((item) => item.name === inputName).value =
            inputValue)
          : this.formData.push({ name: inputName, value: inputValue });


        //dadata для названия компании
        let vm = this;

        if (inputName === 'company') {

          clearTimeout(vm.hintsTimeout);

          if (inputValue.length >= 3) {

            vm.hintsTimeout = setTimeout(function () {
              vm.getCompanyHints(inputValue);
            }, 600);


          } else {
            vm.showCompanyHints = false;
            vm.companyHints.length = 0;
          }
        }
      });

    },

    getCookieValueByName(name) {
      let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));

      return matches ? decodeURIComponent(matches[1]) : undefined;
    },

    async onSubmit() {
      const vm = this;
      try {
        await this.$refs.calcFormInitObserver
          .validate()
          .then((success) => {
            if (!success) {
              return;
            }
          })
          .then(() => {
            return this.$recaptcha.execute('calcFormInit');
          })
          .then((response) => {
            if (response) {
              console.log(vm.$cookies.getAll());
              let formData = new FormData(this.$refs.calcFormInit);
              formData.append('captcha', response);
              formData.append('sessionid', this.sessionKey);
              return formData;
            } else {
              throw new Error('Recaptcha failed');
            }
          })
          .then((data) => {
            if (data) {
              return this.$axios.post('/api/order/data', data);
            }
          })
          .then((response) => {
            if (response.status == 200 || 201) {
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

    triggerCurrDiscount(nv) {
      this.$nuxt.$emit('changeCurrDiscount', nv);
    },
  },

  created() {
    this.inputListener();
  },

  props: {
    discount: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },

};
</script>
