export const state = () => ({
  class: [],
});

export const mutations = {
  updateСlass: (state, payload) => {
    state.class = payload;
  },
  updateMoreСlass: (state, payload) => {
    state.class.page = payload.page;
    state.class.content = state.class.content.concat(payload.content);
  },
};

export const actions = {
  async updateActionСlass(
    { commit },
    [type, ordering = '', page = 1, pageSize = '']
  ) {
    if (type !== 'okp' && type !== 'tn') return false;
    
    await this.$axios
      .$get('api/' + type, {
        params: {
          ordering: ordering,
          page: page,
          pageSize: pageSize,
        },
      })
      .then((response) => {
        if (response) {
          commit('updateСlass', response);
        }
      });
  },

  async updateActionMoreСlass(
    { commit },
    [type, ordering = '', page, pageSize = '']
  ) {
    if (type !== 'okp' && type !== 'tn') return false;

    try {
      await this.$axios
        .$get('api/' + type, {
          params: {
            ordering: ordering,
            page: page,
            pageSize: pageSize,
          },
        })
        .then((response) => {
          if (response) {
            commit('updateMoreСlass', response);
          }
        });
    } catch (error) {
      if (error instanceof Error) console.error(error);
    }
  },
};

export const getters = {
  getterСlass: (state) => {
    return state.class;
  },
};
