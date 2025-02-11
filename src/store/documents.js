export const state = () => ({
  documents: [],
  discounts: [],
  orderStepFormServer: 0,
  calcPageBodyClass: false,
  receivedDocs: [],
  docsPrice: null,
});

export const getters = {
  getterDocuments: (state) => {
    return state.documents;
  },
  getterDiscounts: (state) => {
    return state.discounts;
  },
  getterCalcPageBodyClass: (state) => {
    return state.calcPageBodyClass;
  },
  getterReceivedDocs: (state) => {
    return state.receivedDocs;
  },
  getterDocsPrice: (state) => {
    return state.docsPrice;
  },
};

export const mutations = {
  updateDocuments: (state, payload) => {
    state.documents = payload;
  },
  updateDiscounts: (state, payload) => {
    state.discounts = payload;
  },
  updateCalcPageBodyClass: (state, payload) => {
    state.calcPageBodyClass = payload;
  },
  updateReceivedDocs: (state, payload) => {
    state.receivedDocs = payload;
  },
  updateDocsPrice: (state, payload) => {
    state.docsPrice = payload;
  },
  removeDocumentMutation: (state, id) => {
    state.receivedDocs.splice(
      state.receivedDocs.indexOf(state.receivedDocs.find((i) => i.id == id)),
      1
    );
  },
};

export const actions = {
  async updateActionDocuments({ commit }) {
    try {
      await this.$axios.get('/api/documents').then((response) => {
        if (response.status === 200) {
          commit('updateDocuments', response.data);
        }
      });
    } catch (error) {
      if (error instanceof Error) console.error(error);
    }
  },
  async updateActionDiscounts({ commit }) {
    try {
      await this.$axios.get('/api/documents/sales').then((response) => {
        if (response.status === 200) {
          commit('updateDiscounts', response.data);
        }
      });
    } catch (error) {
      if (error instanceof Error) console.error(error);
    }
  },
  async updateActionGetOrder({ commit }) {
    try {
      await this.$axios.get('/api/documents/sales').then((response) => {
        if (response.status === 200) {
          commit('updateDiscounts', response.data);
        }
      });
    } catch (error) {
      if (error instanceof Error) console.error(error);
    }
  },

  async updateActionReceivedDocs({ commit }, [sessionid, docs]) {
    try {
      await this.$axios
        .patch('/api/order/calc', {
          sessionid,
          docs,
        })
        .then((response) => {
          if (response.status === 200) {
            commit('updateDocsPrice', response.data);
          }
        });
    } catch (error) {
      if (error instanceof Error) console.error(error);
    }
  },

  setActionDocsPrice({ commit }, price) {
    try {
      commit('updateDocsPrice', price);
    } catch (error) {
      if (error instanceof Error) console.error(error);
    }
  },

  setActionReceivedDocs({ commit }, [payload]) {
    try {
      commit('updateReceivedDocs', payload);
    } catch (error) {
      if (error instanceof Error) console.error(error);
    }
  },

  removeDocument({ commit }, id) {
    try {
      commit('removeDocumentMutation', id);
    } catch (error) {
      if (error instanceof Error) console.error(error);
    }
  },

  updateActionCalcPageBodyClass({ commit }, [flag]) {
    try {
      commit('updateCalcPageBodyClass', flag);
    } catch (error) {
      if (error instanceof Error) console.error(error);
    }
  },
};
