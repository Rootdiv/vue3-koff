<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { useCartStore } from '@/stores/cart';
  import { onMounted } from 'vue';

  const cartStore = useCartStore();

  onMounted(() => {
    cartStore.getCartGoods();
  });
</script>

<template>
  <nav class="navigation">
    <RouterLink class="navigation__link" to="/favorites">
      <span class="navigation__link-text">Избранное</span>
      <svg width="16" height="16" class="navigation__favorites">
        <use href="/img/sprite.svg#favorites" />
      </svg>
    </RouterLink>
    <RouterLink class="navigation__link" to="/cart">
      <span class="navigation__link-text">Корзина</span>
      <span class="navigation__count">({{ cartStore.totalCount }})</span>
      <svg width="16" height="16">
        <use href="/img/sprite.svg#cart" />
      </svg>
    </RouterLink>
  </nav>
</template>

<style scoped lang="scss">
  .navigation {
    justify-self: end;
    display: flex;
    gap: 16px;

    &__link {
      display: flex;
      flex-direction: row-reverse;
      align-items: flex-end;
      gap: 4px;

      @media (min-width: 580px) {
        flex-direction: row;
      }

      &:hover,
      &:focus-visible,
      &:active {
        color: #780096;

        .navigation__favorite {
          fill: #780096;
        }
      }
    }

    &__link-text {
      display: none;

      @media (min-width: 580px) {
        display: block;
      }
    }
  }
</style>
