<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import GoodsList from '@/components/GoodsList.vue';
  import { useFavoritesStore } from '@/stores/favorites';

  const storeFavorites = useFavoritesStore();

  defineEmits(['vnode-unmounted']);
</script>

<template>
  <GoodsList v-if="storeFavorites.favoritesList.length" />
  <section v-else class="favorites">
    <div class="container">
      <h2 class="favorites__message">В избранное ничего не добавлено</h2>
      <RouterLink class="favorites__link-btn" to="/">На главную</RouterLink>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .favorites {
    text-align: center;

    &__message {
      padding-top: 70px;
      margin-bottom: 45px;
    }

    &__link-btn {
      font-size: 15px;
      padding: 12px 30px;
      color: #ffffff;
      border: 1px solid transparent;
      background-color: #780096;
      border-radius: 32px;

      &:hover {
        background-color: #9200b7;
      }

      &:focus-visible {
        border-color: #cc00ff;
      }
    }
  }
</style>
