export const state = () => ({
  article: {},
  SEO: {},
});

export const getters = {
  getterArticle: (state) => {
    return state.article;
  },
  getterArticleSeo: (state) => {
    return state.SEO;
  },
};

export const mutations = {
  updateArticle: (state, article) => {
    state.article = article;
    state.SEO = {
      title: article.title,
      og_description: article.og_description,
      og_image: article.og_image,
      og_title: article.og_title,
      seo_description: article.seo_description,
      seo_h1: article.seo_h1,
      seo_keywords: article.seo_keywords,
      seo_title: article.seo_title,
    };
  },
};

export const actions = {
  async updateActionArticle({ commit }, [slug]) {
    await this.$axios.$get(`/api/article/${slug}`).then((response) => {
      commit('updateArticle', response);
    });
  },
};
