<script setup lang="ts">
  import { useFavoritesStore } from '@/stores/favorites';

  defineProps<{ productId: number }>();

  const store = useFavoritesStore();

  const handleFavoritesClick = (id: number) => {
    if (store.isFavorites(id)) {
      store.removeFromFavorites(id);
    } else {
      store.addToFavorites(id);
    }
  };
</script>

<template>
  <button
    type="button"
    @click="handleFavoritesClick(productId)"
    :class="['favorites', { favorites_active: store.isFavorites(productId) }]">
    <svg width="16" height="16" class="favorites__svg">
      <use href="/img/sprite.svg#favorites" />
    </svg>
  </button>
</template>

<style scoped lang="scss">
  .favorites {
    &:hover,
    &:focus-visible,
    &:active,
    &_active {
      color: #780096;

      .favorites__svg {
        fill: #780096;
      }
    }
  }
</style>
