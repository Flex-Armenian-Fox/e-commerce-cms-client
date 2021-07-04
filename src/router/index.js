import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Products from "../views/Products.vue";
import Accounts from "../views/Accounts.vue";
import Edit from "../components/EditForm.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: Dashboard
  },
  {
    path: "/products",
    name: "products",
    component: Products
  },
  {
    path: "/accounts",
    name: "accounts",
    component: Accounts
  }
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
