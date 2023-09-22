import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueRouter from "vue-router";
import LoginPage from "./components/LoginPage.vue";
import ListPage from "./components/ListPage.vue";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  { path: "/", component: LoginPage },
  { path: "/list", component: ListPage },
];

const router = new VueRouter({
  routes,
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
