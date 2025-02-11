export const state = () => ({
  navigation: [],
  services: [],
});

export const getters = {
  getterNavigation: (state) => {
    return state.navigation;
  },
  getterServices: (state) => {
    return state.services;
  },
};

export const mutations = {
  updateNavigation: (state, navigation) => {
    state.navigation = navigation;
  },

  updateServices: (state, services) => {
    state.services = services;
  },
};

export const actions = {
  async updateActionNavigation({ commit }, [ordering = '']) {
    try {
      await this.$axios
        .$get('/api/sections/tree', {
          params: {
            ordering: ordering,
          },
        })
        .then((response) => {
          // console.log("🚀 ~ file: navigation.js ~ line 25 ~ .then ~ response", response);
          commit('updateNavigation', response);
        });
    } catch (error) {
      console.error(error);
    }
  },

  async updateActionServices({ commit }, [ordering = '']) {
    try {
      await this.$axios
        .$get('/api/section-services', {
          params: {
            ordering: ordering,
          },
        })
        .then((response) => {
          commit('updateServices', response);
        });
    } catch (error) {
      console.error(error);
    }
  },
};
