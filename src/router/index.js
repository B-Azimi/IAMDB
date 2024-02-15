import { createRouter, createWebHistory } from "vue-router";
import homePage from "../views/homePage.vue";
import movieView from "../views/movieView.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "homePage",
      component: homePage,
    },
    {
      path: "/movieView/:id",
      name: "movieView",
      props: true,
      component: movieView,
    },

    // {
    //   path: "/movieDetails/:id",
    //   name: "movieDetails",
    //   component: () => import("../views/movieDetails.vue"),
    // },

    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../views/pageNotFind.vue"),
    },
  ],
});
