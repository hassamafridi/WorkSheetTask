import { createRouter, createWebHistory } from "vue-router";
import index from "../views/index.vue";

const routes = [
  {
    path: "/",
    name: "index",
    component: index,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
