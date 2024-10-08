<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import useVuelidate from '@vuelidate/core';
  import { helpers, required, email, minLength } from '@vuelidate/validators';
  import { useFormCartStore } from '@/stores/formCart';
  import { useRouter } from 'vue-router';
  import type { IFormData } from '@/stores/types';

  const { changeDeliveryPrice } = defineProps<{
    changeDeliveryPrice(price: number): void;
  }>();

  const nameField = ref('');
  const phoneField = ref('');
  const emailField = ref('');
  const addressField = ref('');
  const commentsField = ref('');
  const deliveryTypeInput = ref('');
  const paymentTypeInput = ref('');

  const router = useRouter();

  const isNotEmpty = (value: string) => {
    if (deliveryTypeInput.value === 'delivery') {
      return value.trim() !== '';
    }
    return true;
  };

  const rules = computed(() => ({
    nameField: {
      required: helpers.withMessage('Это обязательное поле', required),
      minLength: helpers.withMessage('Минимальная длина: 2 символа', minLength(2)),
    },
    phoneField: {
      required: helpers.withMessage('Введите Ваш телефон', required),
      minLength: helpers.withMessage('Минимальная длина: 5 символов', minLength(5)),
    },
    emailField: {
      required: helpers.withMessage('Введите Ваш E-mail', required),
      email: helpers.withMessage('Вы ввели неверный E-mail', email),
    },
    addressField: {
      addressField: helpers.withMessage('Заполните поле адреса', isNotEmpty),
      minLength: helpers.withMessage('Минимальная длина: 10 символов', minLength(10)),
    },
    deliveryTypeInput: {
      required: helpers.withMessage('Выберете тип доставки', required),
    },
    paymentTypeInput: {
      required: helpers.withMessage('Выберете способ оплаты', required),
    },
  }));

  const validator = useVuelidate(rules, {
    nameField,
    phoneField,
    emailField,
    addressField,
    deliveryTypeInput,
    paymentTypeInput,
  });

  const handleChangeDeliveryPrice = (newPrice: number) => {
    if (deliveryTypeInput.value === 'pickup') {
      addressField.value = '';
    }
    changeDeliveryPrice(newPrice);
  };

  const storeFormCart = useFormCartStore();

  const handleSubmitForm = ({ target }: Event) => {
    const data = new FormData(target as HTMLFormElement);
    const formData = Object.fromEntries(data) as unknown as IFormData;
    console.log('formData: ', formData);
    validator.value.$touch();
    if (!validator.value.$error) {
      storeFormCart.submitCartForm(formData);
    }
  };

  watch(storeFormCart, () => {
    if (storeFormCart.orderId) {
      router.push({ name: 'order', params: { id: storeFormCart.orderId } });
    }
  });
</script>

<template>
  <form id="order" class="form-order" @submit.prevent="handleSubmitForm">
    <h3 class="form-order__title">Данные для доставки</h3>
    <fieldset class="form-order__fieldset form-order__fieldset_input">
      <label class="form-order__wrapper">
        <input
          name="name"
          placeholder="Фамилия"
          class="form-order__input"
          v-model.trim="validator.nameField.$model" />
        <span
          class="form-order__error"
          v-for="element of validator.nameField.$errors"
          :key="element.$uid">
          {{ element.$message }}
        </span>
      </label>
      <label class="form-order__wrapper">
        <input
          name="phone"
          placeholder="Телефон"
          class="form-order__input"
          v-model.trim="validator.phoneField.$model" />
        <span
          class="form-order__error"
          v-for="element of validator.phoneField.$errors"
          :key="element.$uid">
          {{ element.$message }}
        </span>
      </label>
      <label class="form-order__wrapper">
        <input
          name="email"
          placeholder="E-mail"
          class="form-order__input"
          v-model.trim="validator.emailField.$model" />
        <span
          class="form-order__error"
          v-for="element of validator.emailField.$errors"
          :key="element.$uid">
          {{ element.$message }}<br />
        </span>
      </label>
      <label class="form-order__wrapper">
        <input
          name="address"
          placeholder="Адрес доставки"
          v-model.trim="validator.addressField.$model"
          :disabled="deliveryTypeInput === 'pickup'"
          class="form-order__input" />
        <span
          class="form-order__error"
          v-for="element of validator.addressField.$errors"
          :key="element.$uid">
          {{ element.$message }}
        </span>
      </label>
      <textarea
        name="comments"
        v-model.trim="commentsField"
        placeholder="Комментарий к заказу"
        class="form-order__textarea"></textarea>
    </fieldset>
    <fieldset class="form-order__fieldset form-order__fieldset_radio">
      <legend class="form-order__legend">Доставка</legend>
      <label class="form-order__label form-order__radio">
        Доставка
        <input
          @change="handleChangeDeliveryPrice(500)"
          type="radio"
          name="deliveryType"
          value="delivery"
          v-model.trim="validator.deliveryTypeInput.$model"
          class="form-order__radio-input" />
      </label>
      <label class="form-order__label form-order__radio">
        Самовывоз
        <input
          @change="handleChangeDeliveryPrice(0)"
          type="radio"
          name="deliveryType"
          value="pickup"
          v-model.trim="validator.deliveryTypeInput.$model"
          class="form-order__radio-input" />
      </label>
      <div
        class="form-order__error"
        v-for="element of validator.deliveryTypeInput.$errors"
        :key="element.$uid">
        {{ element.$message }}
      </div>
    </fieldset>
    <fieldset class="form-order__fieldset form-order__fieldset_radio">
      <legend class="form-order__legend">Оплата</legend>
      <label class="form-order__label form-order__radio">
        Картой при получении
        <input
          type="radio"
          name="paymentType"
          value="card"
          v-model.trim="validator.paymentTypeInput.$model"
          class="form-order__radio-input" />
      </label>
      <label class="form-order__label form-order__radio">
        Наличными при получении
        <input
          type="radio"
          name="paymentType"
          value="cash"
          v-model.trim="validator.paymentTypeInput.$model"
          class="form-order__radio-input" />
      </label>
      <div
        class="form-order__error"
        v-for="element of validator.paymentTypeInput.$errors"
        :key="element.$uid">
        {{ element.$message }}
      </div>
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

    &__error {
      color: #ff0000;
    }

    &__radio {
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

      &-input {
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
  }
</style>
