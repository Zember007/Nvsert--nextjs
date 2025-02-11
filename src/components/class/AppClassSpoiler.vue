<template>
  <div
    class="mtp__spoiler-item js-spoiler-item"
    :class="{
      empty: this.spoiler.is_leaf_node,
      loading: this.loading,
    }"
  >
    <div class="mtp__spoiler-item-header">
      <button
        class="mtp__spoiler-button js-spoiler-button"
        @click="classBtnHandler($event)"
      >
        {{ spoilerName }}
      </button>
    </div>
    <div class="mtp__spoiler-item-content js-spoiler-content">
      <transition name="fade" appear>
        <div class="mtp__spoiler-text" v-if="childs && childs.length > 0">
          <app-class-spoiler
            v-for="spoiler in childs"
            :key="spoiler.name"
            :spoiler="spoiler"
            :slug="slug"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppClassSpoiler',

  data() {
    return {
      childs: [],
      contentLoaded: false,
      loading: false,
    };
  },

  computed: {
    spoilerName() {
      return this.spoiler.code
        ? this.spoiler.code + ': ' + this.spoiler.name
        : this.spoiler.name;
    },
  },

  methods: {
    async getChilds() {
      if (this.spoiler.id && !this.spoiler.is_leaf_node) {
        if (this.slug !== 'okp/' && this.slug !== 'tnved/') return false;

        this.loading = true;

        let url = ''
        if(this.slug === 'tnved/') {
          url = 'tn'
        } else {
          url = 'okp'
        }
        try {
          await this.$axios
            .$get('api/' + url, {
              params: {
                parent_id: this.spoiler.id,
              },
            })
            .then((response) => {
              console.log(
                '🚀 ~ file: class.js ~ line 48 ~ .then ~ response',
                response
              );
              if (response && response.content.length > 0) {
                this.childs = response.content;
              }
            });
        } catch (error) {
          if (error instanceof Error) {
            console.error(error);
            return [];
          }
        }
      }
    },

    async classBtnHandler(evt) {
      if (this.spoiler.is_leaf_node) return;
      try {
        if (this.contentLoaded) {
          this.toggleOpen(evt);
        } else {
          await this.getChilds()
            .then((response) => {
              this.contentLoaded = true;
            })
            .then(() => {
              this.loading = false;
            })
            .then(() => {
              this.toggleOpen(evt);
            });
        }
      } catch (error) {
        if (error instanceof Error) console.error(error);
      }
    },

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
    spoiler: {
      type: Object,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
};
</script>
