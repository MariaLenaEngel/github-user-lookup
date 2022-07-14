import UserSearchVue from "@/Components/UserSearch.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: UserSearchVue,
    },
    {
      path: "/favorites",
      name: "favorites",
      component: () => import("../Components/FavouriteRepos.vue"),
    },
  ],
});

export default router;
