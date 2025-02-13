<template>
  <section class="main-banner">
    <div class="wrapper">
      <h1 class="main-banner__title">{{ $t('mainIntro.title') }}</h1>
      <div class="main-banner__content">
        <div class="main-banner__img">
          <!-- Если указать путь не через require, гифка не проиграется после перезагрузки страницы со сбросом кеша -->

          <img v-if="!operating" :src="require('~/assets/images/search-icon.gif')" width="370" height="485"/>
          <img v-else :src="require('~/assets/images/search-icon-2.gif')" width="370" height="485"/>
        </div>
        <div class="main-banner__search" :class="{ operating: operating }">
          <transition name="fade">
            <button
                v-if="operating"
                type="button"
                @click="resetCategory"
                class="btn btn--close search__cancel"
            >
              <i class="icon icon--close"></i>
            </button>
          </transition>

          <div class="form">
            <label class="field search__label">
              <transition name="fade">
                <template v-if="operating">
                  <div
                      class="search__category-icon"
                      v-if="currentSearchCategory == 'section'"
                  >
                    <img
                        src="~assets/images/svg/type-1.svg"
                        width="40"
                        height="40"
                    />
                  </div>
                  <div
                      class="search__category-icon"
                      v-if="currentSearchCategory == 'okp'"
                  >
                    <img
                        src="~assets/images/svg/type-2.svg"
                        width="40"
                        height="40"
                    />
                  </div>
                  <div
                      class="search__category-icon"
                      v-if="currentSearchCategory == 'tn'"
                  >
                    <img
                        src="~assets/images/svg/type-3.svg"
                        width="40"
                        height="40"
                    />
                  </div>
                </template>
              </transition>
              <input
                  type="text"
                  v-model="searchValue"
                  class="field__input search__input js-search-input"
                  @input="performSearch"
                  ref="searchInput"
                  :placeholder="placeholderText"
              />
              <transition name="fade">
                <span class="field__title search__input-title">{{
                    placeholderText
                  }}</span>
              </transition>

              <button type="submit" class="field__btn">
                <i class="icon icon--search"></i>
              </button>
            </label>
          </div>

          <transition-group
              name="list-complete"
              tag="ul"
              class="main-banner__tags"
              :class="{ opened: !listFolded }"
              v-if="resultsToShow && !nothingFounded"
          >
            <app-intro-link
                v-for="item in resultsToShowFinal"
                :key="JSON.stringify(item)"
                :item="item"
                :linkType="currentSearchCategory"
            />

            <button
                v-if="maxDifference > 0"
                :key="maxDifference"
                type="button"
                @click="unfoldList"
                class="main-banner__tag-btn"
            >
              {{ $t('mainIntro.button.showMore') }} {{ maxDifference }}
              {{ getEnding }}
            </button>
          </transition-group>

          <transition name="fade">
            <ul
                class="main-banner__types"
                v-show="!operating && !nothingFounded"
            >
              <span class="main-banner__subtitle">{{
                  $t('mainIntro.info')
                }}</span>
              <li>
                <label class="main-banner__type" type="button">
                  <input
                      type="checkbox"
                      value="section"
                      @change="chooseCategory($event)"
                      v-model="searchCategories"
                  />
                  <div class="main-banner__type-content">
                    <img
                        src="~assets/images/svg/type-1.svg"
                        width="40"
                        height="40"
                    />
                    {{ $t('mainIntro.button.section') }}
                  </div>
                </label>
              </li>
              <li>
                <label class="main-banner__type" type="button">
                  <input
                      type="checkbox"
                      value="okp"
                      @change="chooseCategory($event)"
                      v-model="searchCategories"
                  />
                  <div class="main-banner__type-content">
                    <img
                        src="~assets/images/svg/type-2.svg"
                        width="40"
                        height="40"
                    />
                    {{ $t('mainIntro.button.okp') }}
                  </div>
                </label>
              </li>
              <li>
                <label class="main-banner__type" type="button">
                  <input
                      type="checkbox"
                      value="tn"
                      @change="chooseCategory($event)"
                      v-model="searchCategories"
                  />
                  <div class="main-banner__type-content">
                    <img
                        src="~assets/images/svg/type-3.svg"
                        width="40"
                        height="40"
                    />
                    {{ $t('mainIntro.button.tnved') }}
                  </div>
                </label>
              </li>
              <li>
                <button
                    class="btn main-banner__type"
                    type="button"
                    @click.prevent="openIntroModal"
                >
                  <div class="main-banner__type-content">
                    <img
                        src="~assets/images/svg/type-4.svg"
                        width="40"
                        height="40"
                    />
                    {{ $t('mainIntro.button.form') }}
                  </div>
                </button>
              </li>
            </ul>
          </transition>

          <transition name="fade">
            <div class="main-banner__no-results" v-if="nothingFounded">
              <h3 class="no-results__title">
                {{ $t('mainIntro.unknown.title') }}
              </h3>
              <p class="no-results__text">
                {{ $t('mainIntro.unknown.text') }}
              </p>
              <p class="no-results__text">
                {{ $t('mainIntro.unknown.subtext') }}
              </p>

              <div class="no-results__controls">
                <button
                    type="button"
                    @click="openIntroModal"
                    class="btn btn--primary"
                >
                  {{ $t('mainIntro.unknown.btn') }}
                </button>
                <button
                    type="button"
                    @click="resetCategory"
                    class="btn btn--hollow"
                >
                  {{ $t('mainIntro.unknown.cancel') }}
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppIntroLink from './AppIntroLink.vue';

export default {
  name: 'AppMainIntro',


  components: {AppIntroLink},

  data() {
    return {
      limit: 25,
      placeholder: 'all',
      operating: false,
      searchValue: '',
      nothingFounded: false,
      searchCategories: [],
      currentSearchCategory: 'article',
      delayTimer: 0,
      listFolded: true,
    };
  },

  methods: {
    focusInput() {
      this.$refs.searchInput.focus();
    },

    resetCategory() {
      this.searchCategories = [];
      this.placeholder = 'all';
      this.currentSearchCategory = 'article';
      this.searchValue = '';
      this.operating = false;
      this.listFolded = true;
      this.nothingFounded = false;
      this.$store.dispatch('search/resetActionSearchResults');
    },

    chooseCategory(evt) {
      this.searchCategories = this.searchCategories.filter(
          (cat) => cat == evt.target.value
      );
      if (this.searchCategories.length > 0) {
        this.searchValue = '';
        this.placeholder = this.searchCategories[0];
        this.currentSearchCategory = this.searchCategories[0];
        this.operating = true;
        this.focusInput();
      } else {
        this.placeholder = 'all';
        this.currentSearchCategory = 'article';
        this.operating = false;
        this.focusInput();
      }
      this.$store.dispatch('search/resetActionSearchResults');

    },

    performSearch() {
      clearTimeout(this.delayTimer);
      if (this.searchValue.length > 2) {

        // this.operating = true;

        this.delayTimer = setTimeout(async () => {
         
          await this.$store
              .dispatch('search/updateSearchResults', [
                this.currentSearchCategory,
                this.searchValue,
                this.limit,
              ])
              .then(() => {
                this.listFolded = true;
                this.searchResults.content?.length === 0
                    ? (this.nothingFounded = true)
                    : (this.nothingFounded = false);
              });
        }, 500);
      } else {
        this.$store.dispatch('search/resetActionSearchResults');
        this.nothingFounded = false;
      }
    },

    openIntroModal() {
      this.$nuxt.$emit('defineModalContent', 'introForm');
    },

    unfoldList() {
      this.listFolded = false;
    },
  },

  computed: {
    placeholderText() {
      switch (this.placeholder) {
        case 'all':
          return this.$t('mainIntro.placeholder.all');
        case 'section':
          return this.$t('mainIntro.placeholder.section');
        case 'okp':
          return this.$t('mainIntro.placeholder.okp');
        case 'tn':
          return this.$t('mainIntro.placeholder.tnved');
        default:
          return this.$t('mainIntro.placeholder.all');
      }
    },

    defaultResults() {
      return this.$store.getters['search/getterSearchDefault'];
    },

    searchResults() {
      return this.$store.getters['search/getterSearchResults'];
    },

    // linkType() {
    //   return this.$store.getters['search/getterSearchLinkType'];
    // },

    resultsToShow() {
      if (this.searchResults.content && this.searchResults.content.length > 0) {
        return this.searchResults.content;
      } else if (this.defaultResults && this.defaultResults.content) {
        switch (this.currentSearchCategory) {
          case 'article':
            return this.defaultResults.content.default ?? [];
          case 'tn':
            return this.defaultResults.content.tn_ved ?? [];
          case 'okp':
            return this.defaultResults.content.okp ?? [];
          case 'section':
            return this.defaultResults.content.sections ?? [];
          default:
            return this.defaultResults.content.default ?? [];
        }
      }
    },

    resultsToShowFinal() {
      if (this.resultsToShow) {
        return this.listFolded
            ? this.resultsToShow.slice(0, 5)
            : this.resultsToShow;
      } else {
        return [];
      }
    },

    maxDifference() {
      if (this.resultsToShow && this.resultsToShowFinal) {
        return this.resultsToShow.length - this.resultsToShowFinal.length;
      } else {
        return 0;
      }
    },

    /* nothingFounded() {
      if (
        this.searchValue.length > 3 &&
        (!this.searchResults.content || this.searchResults.content.length === 0)
      ) {
        return true;
      } else {
        return false;
      }
    }, */

    getEnding() {
      if (this.maxDifference > 0) {
        switch (true) {
          case this.maxDifference === 1:
            return this.$t('mainIntro.button.variant');
          case this.maxDifference > 1 && this.maxDifference < 5:
            return this.$t('mainIntro.button.variants_s');
          case this.maxDifference > 5:
            return this.$t('mainIntro.button.variants_l');
          default:
            return this.$t('mainIntro.button.variant');
        }
      } else {
        return '';
      }
    },
  },

  async fetch() {
    try {
      await this.$store.dispatch('search/updateDefaultResults', [this.limit]);
    } catch (error) {
      console.error(error.message);
    }
  },

  mounted() {
    let vm = this;
    vm.performSearch();
  },

};
</script>

<style lang="scss">
@import '~assets/styles/sections/main/main-banner';

.list-complete-item {
  transition: all 0.23s;
}

.list-complete-enter,
.list-complete-leave-to

  /* .list-complete-leave-active below version 2.1.8 */
{
  opacity: 0;
  transform: translateX(30px);
}

.list-complete-leave-active {
  // position: absolute;
}
</style>
