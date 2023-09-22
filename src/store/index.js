import Vue from "vue";
import Vuex from "vuex";
import todoModule from "./modules/todoModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    todoModule,
  },
});
