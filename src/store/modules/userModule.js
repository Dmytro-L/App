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
    localStorage.setItem("user", JSON.stringify(user));
  },
  loadUserFromLocalStorage({ commit }) {
    const userJSON = localStorage.getItem("user");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      commit("SET_CURRENT_USER", user);
    }
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
