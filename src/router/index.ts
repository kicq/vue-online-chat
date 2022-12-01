import { store } from "@/store";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { getModule } from "vuex-module-decorators";
import HomeView from "../views/HomeView.vue";
import User from "./../store/user";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    // redirect: { name: "login" },
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/RegistrationView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const { isAuth } = getModule(User, store);

router.beforeEach((guard) => {
  if (guard.name === "home" && !isAuth) {
    router.push("login");
  }
  console.log("guard", guard);
});

export default router;
