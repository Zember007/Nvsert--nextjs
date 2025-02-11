export const state = () => ({
    staff: {},
  });
  
  export const getters = {
    getterStaff: (state) => {
      return state.staff;
    },
  };
  
  export const mutations = {
    updateStaff: (state, staff) => {
      state.staff = staff;
    },
  };
  
  export const actions = {
    async updateStaff({ commit }) {
      try {
        await this.$axios.$get(`/api/staff`).then((response) => {
          commit('updateStaff', response);
        });
      } catch (error) {
        console.error(error);
      }
    },
  };
  