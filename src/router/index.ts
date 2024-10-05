import { createRouter, createWebHistory } from 'vue-router';
import MainView from '@/views/MainView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      alias: ['/category', '/search'],
      component: MainView,
    },
    {
      // Если :id не передан, возвращаем на главную
      path: '/product',
      redirect: '/',
    },
    {
      name: 'product',
      // Путь будет найден, только если :id состоит из цифр
      path: '/product/:id(\\d+)',
      component: () => import('@/views/CardView.vue'),
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('@/views/FavoritesView.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/CartView.vue'),
    },
  ],
});

export default router;
