const state = {
  username: "",
  cartCount: 0,
};

const mutations = {
  SAVEUSERNAME(state, username) {
    state.username = username;
  },
  SAVECARTCOUNT(state, count) {
    state.cartCount = count;
  },
};

const actions = {
  saveUserName({ commit }, username) {
    commit("SAVEUSERNAME", username);
  },

  saveCartCount({ commit }, count) {
    commit("SAVECARTCOUNT", count);
  },
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
