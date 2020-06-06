import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "movie-home" */ '@/views/Home.vue'),
  },
  {
    path: '/movies/:movieId',
    name: 'MovieView',
    component: () => import(/* webpackChunkName: "movie-detail" */ '@/views/MovieView.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
