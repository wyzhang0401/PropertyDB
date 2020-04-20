import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Download from "../views/Download.vue";
import Search from "../views/Search.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*", //没有配置的路径
    redirect: "/" //默认跳转首页
  },
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: About
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () =>
    //import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/download",
    name: "Download",
    component: Download
  },
  {
    path: "/search",
    name: "Search",
    component: Search
  },
  {
    path: "/manual.pdf",
    name: "Manual",
    component: () => import("../views/Manual.vue")
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
