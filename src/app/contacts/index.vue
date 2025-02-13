<template>
  <main class="article contacts">
    <div class="wrapper">
      <!-- {% include 'includes/blocks/breadcrumbs.html' %} -->

      <AppBreadcrumbs :root="'/contacts/'" :title="$t('contacts.title')" />

      <div class="mtp">
        <h1>{{ $t('contacts.title') }}</h1>
        <div class="flex-wrapper">
          <transition appear name="fade">
            <div
              class="mtp__spoiler js-spoiler"
              v-if="contacts && contacts.length > 0 && !$fetchState.pending"
            >
              <AppSpoilerItem
                v-for="item in contacts"
                :key="item.id"
                :title="item.name"
                :preopened="true"
              >
                <div class="mtp__spoiler-image" v-if="item.image">
                  <picture>
                    <source :srcset="item.image_webp" type="image/webp" />
                    <img :src="item.image" :alt="item.name" />
                  </picture>
                </div>

                <a
                  v-if="item.address"
                  target="_blank"
                  rel="noopener noreferrer"
                  :href="'https://yandex.ru/maps/?text=' + item.address"
                >
                  {{ $t('contacts.address') }}: {{ item.address }}
                </a>
                <template v-if="item.phones && item.phones.length > 0">
                  <a
                    v-for="phone in item.phones"
                    :href="phone | filterPhone"
                    :key="phone.id"
                  >
                    {{ $t('contacts.phone') }}: {{ phone }}
                  </a>
                </template>
                <p v-if="item.time">
                  {{ $t('contacts.time') }}: {{ item.time }}
                </p>
                <template v-if="item.emails && item.emails.length > 0">
                  <a
                    v-for="email in item.emails"
                    :href="email | filterEmail"
                    :key="email.id"
                  >
                    E-mail: {{ email }}
                  </a>
                </template>
                <p v-if="item.description">{{ item.time }}</p>
              </AppSpoilerItem>
            </div>
          </transition>
          <transition appear name="fade">
            <div class="form" v-if="!$fetchState.pending">
              <div class="form__wrapper">
                <h2 class="form-title">{{ $t('form.contacts.title') }}</h2>
                <p class="form-subtitle">{{ $t('form.contacts.text') }}</p>

                <AppDefaultForm :btnText="$t('form.contacts.btn')" />
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import AppBreadcrumbs from '../../components/general/AppBreadcrumbs.vue';
import AppSpoilerItem from '../../components/general/AppSpoilerItem.vue';
import AppDefaultForm from '../../components/forms/AppDefaultForm.vue';

export default {
  name: 'Contacts',
  computed: {
    contacts() {
      return this.$store.getters['contacts/getterContacts'];
    },
  },
  async fetch() {
    await this.$store.dispatch('contacts/updateActionContacts');
  },
  components: { AppBreadcrumbs, AppSpoilerItem, AppDefaultForm },
};
</script>

<style lang="scss">
@import '@/assets/styles/article.scss';
</style>
