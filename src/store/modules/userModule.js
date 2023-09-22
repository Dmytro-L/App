const state = {
  currentUser: null,
};

const mutations = {
  SET_CURRENT_USER(state, user) {
    state.currentUser = user;
  },
};

const actions = {
  setCurrentUser({ commit }, user) {
    commit("SET_CURRENT_USER", user);
  },
};

const getters = {
  currentUser: (state) => state.currentUser,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
