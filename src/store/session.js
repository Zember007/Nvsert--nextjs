export const state = () => ({
  session_id: '',
});

export const getters = {
  getterSessionId: (state) => {
    return state.session_id;
  },
};

export const mutations = {
  updateSessionId: (state, payload) => {
    state.session_id = payload;
  },
};

export const actions = {
  async updateActionSessionId({ commit }) {
    let parsed = this.$cookies.getAll();

    if (parsed.sessionid) {
      commit('updateSessionId', parsed.sessionid);
    } else {

      await this.$axios.$get(`/api/session`).then((response) => {

        this.$cookies.set('sessionid', response.sessionid, {
          expires: new Date(response.expires)
        });
        commit('updateSessionId', response.sessionid);
      
      });

    }
  },
};
