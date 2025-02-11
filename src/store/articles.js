const defaultState = () => {
  return {
    articles: {},
  };
};

export const state = () => ({
  articles: {},
});

export const getters = {
  getterArticles: (state) => {
    return state.articles;
  },
};

export const mutations = {
  updateArticles: (state, articles) => {
    state.articles = articles;
  },
  resetArticles: (state) => {
    Object.assign(state, defaultState());
  },
};

export const actions = {
  resetActionArticles({ commit }) {
    commit('resetArticles');
  },

  async updateActionArticles(
    { commit },
    [id, ordering = '', page, pageSize = '', search = '', okp = '', tnved = '']
  ) {
    let url = id ? '/api/articles/' + id : '/api/articles';

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
        commit('updateArticles', response);
      });
  },
};
