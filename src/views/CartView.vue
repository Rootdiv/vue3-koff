<script setup lang="ts">
  import CartGoods from '@/components/CartGoods.vue';
  import CartPlace from '@/components/CartPlace.vue';
  import CartForm from '@/components/CartForm.vue';
  import { useCartStore } from '@/stores/cart';

  const cartStore = useCartStore();

  defineEmits(['vnode-unmounted']);
</script>

<template>
  <section class="cart">
    <div class="container cart__container">
      <h2 class="cart__title">Корзина</h2>
      <p v-if="cartStore.status === 'loading'" class="cart__loading">Загрузка корзины...</p>
      <p v-else-if="cartStore.status === 'error'" class="cart__error">
        Ошибка: {{ cartStore.error }}
      </p>
      <template v-else-if="cartStore.products.length">
        <CartGoods
          :goods="cartStore.products"
          :updateProductInCard="cartStore.updateProductInCard"
          :removeProductFromCard="cartStore.removeProductFromCard" />
        <CartPlace
          class="cart__place"
          :totalCount="cartStore.totalCount"
          :totalPrice="cartStore.totalPrice"
          :deliveryPrice="cartStore.deliveryPrice" />
        <CartForm
          class="cart__form"
          :deliveryPrice="cartStore.deliveryPrice"
          :changeDeliveryPrice="cartStore.changeDeliveryPrice" />
      </template>
      <p v-else class="cart__empty">В корзину ничего не добавлено</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .cart {
    padding-top: 24px;

    @media (min-width: 580px) {
      padding-top: 32px;
    }

    @media (min-width: 820px) {
      padding-top: 40px;
    }

    &__container {
      display: grid;
      grid-template-areas: 'title' 'content' 'form' 'place';

      @media (min-width: 880px) {
        grid-template-columns: 1fr 302px;
        gap: 40px 30px;
        grid-template-areas: 'title .' 'content place' 'form form';
        justify-content: space-between;
      }

      @media (min-width: 1080px) {
        grid-template-columns: 1fr 408px;
      }
    }

    &__title {
      grid-area: title;
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 24px;

      @media (min-width: 580px) {
        font-size: 32px;
        margin-bottom: 24px;
      }

      @media (min-width: 880px) {
        margin-bottom: 0;
      }
    }

    &__place {
      grid-area: place;
    }

    &__form {
      grid-area: form;
      padding-top: 30px;
      padding-bottom: 25px;

      @media (min-width: 580px) {
        padding-top: 40px;
        padding-bottom: 40px;
      }

      @media (min-width: 880px) {
        padding-bottom: 0;
      }
    }

    &__loading,
    &__empty,
    &__error {
      grid-column: 1 / -1;
      padding-top: 20px;
      font-size: 20px;
      text-align: center;

      @media (min-width: 880px) {
        padding-top: 0;
      }
    }

    &__error {
      font-size: 16px;
      text-align: unset;
    }
  }
</style>
