<script setup lang="ts">
  import { API_URL } from '@/const';
  // import { RouterLink } from 'vue-router';
  import type { Product } from '@/stores/goods';
  import { priceFormat } from '@/helpers/priceFormat';

  const { product } = defineProps<{ product: Product }>();
</script>

<template>
  <article class="card">
    <a class="card__link card__link_img" :href="`/product/${product.id}`">
      <img :src="`${API_URL}/${product.images[0]}`" class="card__img" :alt="product.name" />
    </a>
    <div class="card__info">
      <h3 class="card__title">
        <a :href="`/product/${product.id}`" class="card__link">
          {{ product.name }}
        </a>
      </h3>
      <p class="card__price">{{ priceFormat(product.price) }}&nbsp;&#8381;</p>
    </div>
    <button class="card__btn" type="button" :data-id="product.id">В корзину</button>
    <button class="card__favorites" type="button" :data-id="product.id">
      <svg width="16" height="16" class="card__svg">
        <use href="/img/sprite.svg#favorites"></use>
      </svg>
    </button>
  </article>
</template>

<style scoped lang="scss">
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;

    &__link {
      &_img {
        display: block;
        margin-bottom: 12px;

        @media (min-width: 580px) {
          margin-bottom: 16px;
        }
      }
    }

    &__img {
      width: 100%;
      object-fit: cover;
      border-radius: 16px;
      aspect-ratio: 1/1;
    }

    &__info {
      flex-grow: 1;
      @media (min-width: 580px) {
        display: flex;
        gap: 10px;
        justify-content: space-between;
        margin-bottom: 20px;
      }
    }

    &__title {
      font-size: 12px;
      font-weight: 400;
      margin-bottom: 4px;

      @media (min-width: 580px) {
        padding-top: 3px;
        font-size: 16px;
        margin-bottom: 0;
      }
    }

    &__price {
      font-size: 16px;
      font-weight: 400;
      margin-bottom: 12px;

      @media (min-width: 580px) {
        font-size: 20px;
        margin-bottom: 0;
      }
    }

    &__btn {
      color: #780096;
      padding: 12px 24px;
      border-radius: 32px;
      border: 1px solid #780096;
      width: 100%;

      &:hover,
      &:focus-visible {
        color: #ffffff;
        background-color: #9200b7;
      }

      &:active {
        color: #780096;
        border-color: #cc00ff;
        background-color: transparent;
      }

      &:disabled {
        opacity: 20%;
        pointer-events: none;
      }
    }

    &__favorites {
      position: absolute;
      top: 12px;
      right: 12px;

      &:hover,
      &:focus-visible,
      &:active,
      &_active {
        color: #780096;

        .card__svg {
          fill: #780096;
        }
      }
    }
  }
</style>
