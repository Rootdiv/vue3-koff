<script setup lang="ts">
  import { declOfNum } from '@/helpers/declOfNum';
  import { priceFormat } from '@/helpers/priceFormat';

  defineProps<{ totalCount: number; totalPrice: number; deliveryPrice: number }>();
</script>

<template>
  <div class="place">
    <h3 class="place__subtitle">Оформление</h3>
    <div class="place__info">
      <p class="place__count">
        {{ declOfNum(totalCount, ['товар', 'товара', 'товаров']) }} на сумму:
      </p>
      <p class="place__price">{{ priceFormat(totalPrice) }}</p>
    </div>
    <p class="place__delivery">Доставка {{ deliveryPrice }} &nbsp;&#8381;</p>
    <button type="submit" form="order" class="place__btn">Оформить заказ</button>
  </div>
</template>

<style scoped lang="scss">
  .place {
    padding-top: 25px;

    @media (min-width: 820px) {
      padding-top: 0;
    }

    &__subtitle {
      font-size: 16px;
      font-weight: 400;
      margin-bottom: 16px;

      @media (min-width: 480px) {
        font-size: 20px;
      }
    }

    &__info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 32px;

      @media (min-width: 480px) {
        font-size: 16px;
        margin-bottom: 40px;
      }
    }

    &__delivery {
      color: #969eae;
      font-size: 9px;
      margin-bottom: 8px;

      @media (min-width: 480px) {
        font-size: 12px;
        margin-bottom: 12px;
      }
    }

    &__btn {
      width: 100%;
      padding: 12px 24px;
      border-radius: 32px;
      border: 1px solid transparent;
      background-color: #780096;
      color: #ffffff;
    }
  }
</style>
