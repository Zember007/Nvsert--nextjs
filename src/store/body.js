export const state = () => ({
  overflow: false,
});

export const getters = {
  getterOverflow: (state) => {
    return state.overflow;
  },
};

export const mutations = {
  updateOverflow: (state, payload) => {
    state.overflow = payload;
  },
};

export const actions = {
  enableOverflow({ commit }) {
    commit('updateOverflow', true);
  },
  disableOverflow({ commit }) {
    commit('updateOverflow', false);
  },
};
