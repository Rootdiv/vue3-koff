<script setup lang="ts">
  import { useFavoritesStore } from '@/stores/favorites';

  const { id } = defineProps<{ id: number }>();

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
    :class="['favorites', { favorites_active: store.isFavorites(id) }]"
    @click="handleFavoritesClick(id)">
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
