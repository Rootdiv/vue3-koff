<script setup lang="ts">
  import { API_URL } from '@/const';
  import type { IProductCart } from '@/stores/cart';
  import { priceFormat } from '@/helpers/priceFormat';
  import { ref, watch } from 'vue';

  const props = defineProps<{
    goods: IProductCart[];
    updateProductInCard({ productId, quantity }: { productId: number; quantity: number }): void;
    removeProductFromCard(id: number): void;
  }>();

  const isChanging = ref(false);

  const decrementButton = (id: number, quantity: number) => {
    isChanging.value = true;
    if (quantity > 1) {
      props.updateProductInCard({ productId: id, quantity: quantity - 1 });
    } else {
      props.removeProductFromCard(id);
    }
  };

  const incrementButton = (id: number, quantity: number) => {
    isChanging.value = true;
    props.updateProductInCard({ productId: id, quantity: quantity + 1 });
  };

  watch(props.goods, () => {
    isChanging.value = false;
  });
</script>

<template>
  <ul class="cart__products">
    <li class="cart__product" v-for="product in goods" :key="product.id">
      <img :src="`${API_URL}/${product.images[0]}`" class="cart__img" />
      <h3 class="cart__title-product">{{ product.name }}</h3>
      <p class="cart__price">{{ priceFormat(product.price) }}</p>
      <p class="cart__article">арт.&nbsp;{{ product.article }}</p>
      <div class="cart__product-control">
        <button
          type="button"
          :disabled="isChanging"
          class="cart__product-btn"
          @click="decrementButton(product.id, product.quantity)">
          -
        </button>
        <p class="cart__product-count">{{ product.quantity }}</p>
        <button
          type="button"
          :disabled="isChanging"
          class="cart__product-btn"
          @click="incrementButton(product.id, product.quantity)">
          +
        </button>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
  .cart {
    &__products {
      grid-area: content;
      margin-bottom: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;

      @media (min-width: 880px) {
        margin-bottom: 0;
      }
    }

    &__product {
      display: grid;
      align-items: center;
      gap: 4px 8px;
      grid-template-columns: 25vw min-content 1fr;
      grid-template-rows: min-content min-content 1fr;
      grid-template-areas:
        'img title title'
        'img article article'
        'img control price';

      @media (min-width: 480px) {
        grid-template-columns: 120px 1fr min-content;
        gap: 6px 12px;
        grid-template-areas:
          'img title price'
          'img article article'
          'img control .';
      }

      @media (min-width: 880px) {
        max-width: 514px;
      }
    }

    &__img {
      grid-area: img;
      border-radius: 16px;
    }

    &__title-product {
      grid-area: title;
      font-size: 12px;
      font-weight: 400;

      @media (min-width: 480px) {
        font-size: 16px;
        padding-top: 12px;
      }
    }

    &__price {
      grid-area: price;
      color: #1c1c1c;

      @media (min-width: 480px) {
        align-self: start;
        justify-self: end;
        font-size: 16px;
        padding-top: 12px;
      }
    }

    &__article {
      grid-area: article;
      color: #969eae;
      font-size: 9px;

      @media (min-width: 480px) {
        font-size: 12px;
      }
    }

    &__product-control {
      grid-area: control;
      justify-self: start;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 5px 11px;
      border-radius: 32px;
      border: 1px solid #eeeff2;

      @media (min-width: 480px) {
        align-self: end;
      }
    }

    &__product-btn {
      width: 14px;
      height: 14px;
      line-height: 14px;
      border: 1px solid transparent;
      outline: none;

      &:focus-visible {
        border-color: #780096;
      }
    }

    &__product-count {
      min-width: 14px;
      text-align: center;
    }
  }
</style>
