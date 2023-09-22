import axios from "axios";

const state = {
  todos: [],
};

const getters = {
  allTodos: (state) => state.todos,
};

const actions = {
  async fetchTodos({ commit }) {
    try {
      const localTodosJSON = localStorage.getItem("allTodos");
      const localTodos = localTodosJSON ? JSON.parse(localTodosJSON) : [];

      if (
        JSON.stringify(state.todos) !== JSON.stringify(localTodos) &&
        localTodos.length > 0
      ) {
        commit("setTodos", localTodos);
      } else {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const todos = response.data;
        const todosWithFavorites = todos.map((todo) => ({
          ...todo,
          favorite: false,
        }));
        commit("setTodos", todosWithFavorites);
        localStorage.setItem("allTodos", JSON.stringify(todosWithFavorites));
      }
    } catch (error) {
      console.error("error", error);
    }
  },
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  updateAllTodos(state, newAllTodos) {
    state.todos = newAllTodos;
    localStorage.setItem("allTodos", JSON.stringify(newAllTodos));
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
