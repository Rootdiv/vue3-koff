<script setup lang="ts">
  import { ref } from 'vue';

  const { changeDeliveryPrice } = defineProps<{
    changeDeliveryPrice(price: number): void;
  }>();

  const addressInput = ref('');
  const deliveryTypeInput = ref('');

  const handleChangeDeliveryPrice = (newPrice: number) => {
    if (deliveryTypeInput.value === 'pickup') {
      addressInput.value = '';
    }
    changeDeliveryPrice(newPrice);
  };
</script>

<template>
  <form id="order" method="POST" class="form-order">
    <h3 class="form-order__title">Данные для доставки</h3>
    <fieldset class="form-order__fieldset form-order__fieldset_input">
      <input name="name" placeholder="Фамилия" class="form-order__input" required="true" />
      <input name="phone" placeholder="Телефон" class="form-order__input" required="true" />
      <input name="email" placeholder="E-mail" class="form-order__input" required="true" />
      <input
        name="address"
        v-model="addressInput"
        placeholder="Адрес доставки"
        :required="deliveryTypeInput === 'delivery'"
        :disabled="deliveryTypeInput === 'pickup'"
        class="form-order__input" />
      <textarea
        name="comments"
        placeholder="Комментарий к заказу"
        class="form-order__textarea"></textarea>
    </fieldset>
    <fieldset class="form-order__fieldset form-order__fieldset_radio">
      <legend class="form-order__legend">Доставка</legend>
      <label class="form-order__label radio">
        Доставка
        <input
          @change="handleChangeDeliveryPrice(500)"
          type="radio"
          name="deliveryType"
          value="delivery"
          required="true"
          v-model="deliveryTypeInput"
          class="radio__input" />
      </label>
      <label class="form-order__label radio">
        Самовывоз
        <input
          @change="handleChangeDeliveryPrice(0)"
          type="radio"
          name="deliveryType"
          value="pickup"
          required="true"
          v-model="deliveryTypeInput"
          class="radio__input" />
      </label>
    </fieldset>
    <fieldset class="form-order__fieldset form-order__fieldset_radio">
      <legend class="form-order__legend">Оплата</legend>
      <label class="form-order__label radio">
        Картой при получении
        <input type="radio" name="paymentType" value="card" required="true" class="radio__input" />
      </label>
      <label class="form-order__label radio">
        Наличными при получении
        <input type="radio" name="paymentType" value="cash" required="true" class="radio__input" />
      </label>
    </fieldset>
  </form>
</template>

<style scoped lang="scss">
  .form-order {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;

    @media (min-width: 580px) {
      gap: 10px 16px;
      grid-template-columns: 230px 230px 1fr;
    }

    @media (min-width: 820px) {
      gap: 24px 16px;
      grid-template-columns: 196px 196px 1fr;
    }

    &__title {
      font-size: 16px;
      font-weight: 400;
      margin-bottom: 16px;
      grid-column: 1 / -1;

      @media (min-width: 480px) {
        font-size: 20px;
      }
    }

    &__fieldset {
      padding: 0;
      margin: 0;
      border: none;

      &_input {
        display: grid;
        grid-template-columns: 1fr;
        gap: 8px;

        @media (min-width: 580px) {
          grid-column: 1/-1;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        @media (min-width: 880px) {
          max-width: 832px;
          gap: 16px;
        }
      }

      &_radio {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
    }

    &__input {
      border-radius: 4px;
      background-color: #eeeff2;
      padding: 0 14px;
      width: 100%;
      height: 38px;
      border: none;

      &::placeholder {
        color: #969eae;
      }

      &:hover,
      &:focus-visible {
        outline: 1px solid #dfe3eb;
      }

      &:disabled {
        opacity: 50%;
        pointer-events: none;
      }
    }

    &__textarea {
      min-height: 120px;
      padding: 12px 14px;
      border-radius: 4px;
      background-color: #eeeff2;
      border: none;
      resize: vertical;

      &::placeholder {
        color: #969eae;
      }

      &:hover,
      &:focus-visible {
        outline: 1px solid #dfe3eb;
      }

      @media (min-width: 580px) {
        grid-column: 1/-1;
      }
    }

    &__legend {
      font-size: 16px;
      margin-bottom: 12px;

      @media (min-width: 580px) {
        margin-bottom: 17px;
      }
    }
  }

  .radio {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    margin-bottom: 8px;
    font-size: 12px;
    line-height: 16px;

    &:last-child {
      margin-bottom: 0;
    }

    &__input {
      position: relative;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      padding: 2px;
      margin-right: 8px;

      &:before {
        content: '';
        display: block;
        width: 12px;
        height: 12px;
        background-color: #ffffff;
        border: 1px solid #000000;
        border-radius: 8px;
      }

      &:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 4px;
        height: 4px;
        background-color: #151515;
        border-radius: 50%;
        opacity: 0;
      }

      &:focus-visible {
        outline: none;

        &:before {
          box-shadow: 0px 0px 10px rgba(120, 0, 150, 0.5);
        }
      }

      &:checked:after {
        opacity: 1;
      }

      &:hover {
        &:not(:disabled):before {
          box-shadow: 0px 0px 10px rgba(120, 0, 150, 0.5);
        }
      }

      &:disabled:before {
        background-color: #cccccc;
      }
    }
  }
</style>
