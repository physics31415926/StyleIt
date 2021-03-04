import Vue from "vue";
import VueRouter from "vue-router";
import { store } from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/Login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/LoginView.vue")
  },
  {
    path: "/Home",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "Home" */ "../views/HomeView.vue")
  },
  {
    path: "/Profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "Profile" */ "../views/ProfileView.vue")
  },
  {
    path: "*",
    redirect: "/Home"
  }
];

const router = new VueRouter({
  mode: "history", // remove # in the URL
  routes
});

router.beforeEach((to, from, next) => {
  if (store.user) {
    if (to.name === "Login") {
      next({ name: "Home" });
    } else {
      next();
    }
  } else {
    if (to.name === "Login") {
      next();
    } else {
      next({ name: "Login" });
    }
  }
});

export default router;
