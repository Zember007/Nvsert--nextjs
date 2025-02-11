export const state = () => ({
  configs: null,
  file_configs: null,
});

export const getters = {
  getterConfigs: (state) => {
    return state.configs;
  },
  getterFileConfigs: (state) => {
    return state.file_configs;
  },
};

export const mutations = {
  updateConfigs: (state, configs) => {
    state.configs = configs;
  },
  updateFileConfigs: (state, file_configs) => {
    state.file_configs = file_configs;
  },
};

export const actions = {
  async updateActionConfigs({ commit }) {
    try {
      await this.$axios.$get('/api/configs').then((res) => {
        if (res) {
          commit('updateConfigs', res);
        }
      });
    } catch (error) {
      console.error(error);
    }
  },

  async updateActionFileConfigs({ commit }) {
    try {
      await this.$axios.$get('/api/file-configs').then((res) => {
        if (res) {
          commit('updateFileConfigs', res);
        }
      });
    } catch (error) {
      console.error(error);
    }
  },
};
