import Vue from "vue";
import VueRouter from "vue-router";

import wage from "../components/wage/wage.vue";
import houseprice from "../components/houseprice/houseprice.vue"
import compareAreacity from "../components/houseprice/compareAreacity.vue"

Vue.use(VueRouter);

const routes = [
  {
    // 默认重定向
    path: "/",
    redirect: '/wage',
    component: () =>
      import('../views/Home'),
    children: [{
      path: '/wage',
      component: wage,
    },
    {
      path: '/houseprice',
      component: houseprice
    },
    {
      path: '/compareAreacity',
      name:'compareAreacity',
      component: compareAreacity
    }]
  },

  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
