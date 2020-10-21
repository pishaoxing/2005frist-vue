import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/home";

import allRoutes from "./allRoutes";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children:allRoutes
  },
  {
     path:"*",
     component:()=>import(/* webpackChunkName:"page404" */ "../pages/page404")
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ "../pages/login")
  }
];

const router = new VueRouter({
  routes
});

export default router;
