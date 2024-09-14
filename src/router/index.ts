import { createRouter, createWebHistory } from 'vue-router';
import MainView from '@/views/MainView.vue';
import CardView from '@/views/CardView.vue';
import FavoritesView from '@/views/FavoritesView.vue';
import CartView from '@/views/CartView.vue';

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
      component: CardView,
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavoritesView,
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
    },
  ],
});

export default router;
