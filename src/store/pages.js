const defaultState = () => {
  return {
    pages: {},
  };
};

export const state = () => ({
  pages: {},
  SEO: {},
});

export const getters = {
  getterPages: (state) => {
    return state.pages;
  },
  getterPagesSeo: (state) => {
    return state.SEO;
  },
};

export const mutations = {
  updatePages: (state, pages) => {
    state.pages = pages;
    state.SEO = {
      title: pages.title,
      og_description: pages.og_description,
      og_image: pages.og_image,
      og_title: pages.og_title,
      seo_description: pages.seo_description,
      seo_h1: pages.seo_h1,
      seo_keywords: pages.seo_keywords,
      seo_title: pages.seo_title,
    };
  },
  resetPages: (state) => {
    Object.assign(state, defaultState());
  },
};

export const actions = {
  resetActionPages({ commit }) {
    commit('resetPages');
  },

  async updateActionPages(
    { commit },
    [route, ordering = '', page, pageSize = '', search = '', okp = '', tnved = '']
  ) {
    let url = route ? '/api/pages/' + route : '/api/pages';

    await this.$axios
      .$get(url, {
        params: {
          ordering: ordering,
          page: page,
          pageSize: pageSize,
          search,
          okp,
          tnved,
        },
      })
      .then((response) => {
        commit('updatePages', response);
      });
  },
};
