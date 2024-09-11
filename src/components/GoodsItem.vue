<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { useRoute } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { useProductStore } from '@/stores/product';
  import { priceFormat } from '@/helpers/priceFormat';
  import SliderImages from '@/components/SliderImages.vue';
  import FavoritesButton from '@/components/FavoritesButton.vue';

  const route = useRoute();
  const storeProduct = useProductStore();
  const cardId = ref('');
  cardId.value = String(route.params.id);

  onMounted(() => {
    storeProduct.getProduct(cardId.value);
  });

  const { product } = storeToRefs(storeProduct);

  onBeforeUnmount(() => {
    storeProduct.clearProduct();
  });
</script>

<template>
  <section class="product">
    <div class="container product__container">
      <h2 class="product__title">{{ product.name }}</h2>
      <SliderImages :images="product.images" />
      <div class="product__info">
        <p class="product__price">{{ priceFormat(product.price) }}</p>
        <p class="product__article">арт.&nbsp;{{ product.article }}</p>
        <div class="product__characteristics">
          <h3 class="product__characteristics-title">Общие характеристики</h3>
          <table class="product__characteristics-table table">
            <tbody>
              <tr
                class="table__row"
                v-for="([filed, value], i) in product.characteristics"
                :key="i">
                <td class="table__field">{{ filed }}</td>
                <td class="table__value">{{ value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="product__btns">
          <button class="product__btn" type="button" :data-id="product.id">В корзину</button>
          <FavoritesButton class="product__favorites" :id="product.id" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .product {
    padding-top: 24px;

    @media (min-width: 580px) {
      padding-top: 28px;
    }

    @media (min-width: 820px) {
      padding-top: 40px;
    }

    &__container {
      @media (min-width: 820px) {
        display: grid;
        grid-template-columns: 66% 1fr;
        gap: 40px 16px;
      }
    }

    &__title {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 24px;

      @media (min-width: 580px) {
        font-size: 32px;
      }

      @media (min-width: 820px) {
        grid-column: 1/-1;
        margin-bottom: 0;
      }
    }

    &__info {
      @media (min-width: 820px) {
        grid-column: 2/3;
      }
    }

    &__price {
      font-size: 20px;
      margin-bottom: 12px;
    }

    &__article {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 32px;
      background-color: #eeeff2;
      margin-bottom: 24px;
    }

    &__characteristics-title {
      font-size: 16px;
      font-weight: 400;
      margin-bottom: 4px;
    }

    &__characteristics-table {
      margin-bottom: 24px;
    }

    &__btns {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    &__btn {
      flex-grow: 1;
      padding: 12px 24px;
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

      &:disabled {
        opacity: 20%;
        pointer-events: none;
      }
    }

    &__favorites {
      width: 16px;
      height: 16px;
    }

    &__empty {
      grid-column: 1 / -1;
      padding-top: 50px;
      font-size: 16px;
      text-align: center;
    }
  }
</style>
