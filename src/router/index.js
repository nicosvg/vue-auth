import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { completeAuthentication, startAuthentication } from "../auth";

Vue.use(VueRouter);

let authenticated = false;

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: "/about",
    name: "About",
    meta: { requiresAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/authenticated",
    name: "authenticated",
    beforeEnter: async (to, from, next) => {
      await completeAuthentication();
      authenticated = true;
      next("/");
    }
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth && !authenticated) {
    await startAuthentication();
    return next(false);
  }
  return next();
});

export default router;
