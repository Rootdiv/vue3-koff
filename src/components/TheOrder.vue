<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { useOrderStore } from '@/stores/order';
  import { storeToRefs } from 'pinia';
  import { priceFormat } from '@/helpers/priceFormat';

  const route = useRoute();
  const orderStore = useOrderStore();

  const orderId = ref('');
  const totalPrice = ref(0);
  const paymentType = ref('');
  const deliveryType = ref('');

  orderId.value = String(route.params.id);

  onMounted(() => {
    orderStore.getOrder(orderId.value);
  });

  const { orderData } = storeToRefs(orderStore);

  watch(orderData, () => {
    totalPrice.value =
      parseInt(orderData.value.totalPrice) +
      (orderData.value.deliveryType === 'delivery' ? 500 : 0);

    paymentType.value =
      orderData.value.paymentType === 'card' ? 'Картой при получении' : 'Наличными при получении';

    deliveryType.value = orderData.value.deliveryType === 'pickup' ? 'Самовывоз' : 'Доставка';
  });
</script>
<template>
  <section class="order">
    <div class="container order__container">
      <div v-if="orderData.id === 0" class="order__wrapper">Заказ не найден!</div>
      <div v-else class="order__wrapper">
        <div class="order__info">
          <p class="order__title">Заказ успешно размещен</p>
          <p class="order__price">{{ priceFormat(totalPrice) }}</p>
          <p class="order__number">&numero;{{ orderData.id }}</p>
        </div>
        <table class="order__table table">
          <caption class="table__title">
            Данные доставки
          </caption>
          <tbody>
            <tr class="table__row">
              <td class="table__field">Получатель</td>
              <td class="table__value">{{ orderData.name }}</td>
            </tr>
            <tr class="table__row">
              <td class="table__field">Телефон</td>
              <td class="table__value">{{ orderData.phone }}</td>
            </tr>
            <tr class="table__row">
              <td class="table__field">E-mail</td>
              <td class="table__value">{{ orderData.email }}</td>
            </tr>
            <tr v-if="orderData.address" class="table__row">
              <td class="table__field">Адрес доставки</td>
              <td class="table__value">{{ orderData.address }}</td>
            </tr>
            <tr class="table__row">
              <td class="table__field">Способ оплаты</td>
              <td class="table__value">{{ paymentType }}</td>
            </tr>
            <tr class="table__row">
              <td class="table__field">Способ получения</td>
              <td class="table__value">{{ deliveryType }}</td>
            </tr>
          </tbody>
        </table>
        <RouterLink class="order__link-btn" to="/">На главную</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .order {
    padding-top: 32px;

    @media (min-width: 580px) {
      padding-top: 60px;
    }

    &__container {
      padding: 0;

      @media (min-width: 580px) {
        padding: 0 29px;
      }

      @media (min-width: 780px) {
        padding: 0 100px;
      }

      @media (min-width: 880px) {
        padding: 0 170px;
      }

      @media (min-width: 1120px) {
        padding: 0 212px;
      }

      @media (min-width: 1440px) {
        padding: 0 304px;
      }
    }

    &__wrapper {
      margin: 0 auto;
      padding: 24px 16px;
      border-radius: 16px;
      border: 1px solid #eeeff2;

      @media (min-width: 580px) {
        padding: 60px 75px;
      }

      @media (min-width: 780px) {
        padding: 60px 100px;
      }

      @media (min-width: 1120px) {
        padding: 60px 120px;
      }

      @media (min-width: 1440px) {
        padding: 60px 212px;
      }
    }

    &__info {
      display: grid;
      gap: 8px;
      font-size: 16px;
      font-weight: 400;

      @media (min-width: 580px) {
        grid-template-areas: 'title price' 'number .';
        font-size: 20px;
        gap: 12px;
      }
    }

    &__title {
      @media (min-width: 580px) {
        grid-area: title;
      }
    }

    &__price {
      @media (min-width: 580px) {
        grid-area: price;
        justify-self: flex-end;
      }
    }

    &__number {
      font-size: 12px;
      padding: 4px 8px;
      width: max-content;
      border-radius: 32px;
      background-color: #eeeff2;

      @media (min-width: 580px) {
        grid-area: number;
      }
    }

    &__table {
      margin-top: 20px;
      margin-bottom: 24px;
    }

    &__link-btn {
      display: block;
      text-align: center;
      padding: 12px 0;
      color: #ffffff;
      border: 1px solid transparent;
      background-color: #780096;
      border-radius: 32px;
      width: 100%;

      &:hover {
        background-color: #9200b7;
      }

      &:focus-visible {
        border-color: #cc00ff;
      }
    }
  }
</style>
