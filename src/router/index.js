import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "Home" */ "../views/Home.vue"),
    meta: {
      title: 'table封装'
    }
  },
  {
    path: "/About",
    name: "about",
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: {
      title: '分页封装'
    }
  },
];

const router = new VueRouter({
  routes,
});

export default router;
