export const state = () => ({
  contacts: [],
});

export const getters = {
  getterContacts: (state) => {
    return state.contacts;
  },
};

export const mutations = {
  updateContacts: (state, payload) => {
    state.contacts = payload;
  },
};

export const actions = {
  async updateActionContacts({ commit }) {
    try {
      await this.$axios.$get('/api/contacts').then((response) => {
        if (response) {
          commit('updateContacts', response);
        }
      });
    } catch (error) {
      if (error instanceof Error) console.error(error);
    }
  },
};
