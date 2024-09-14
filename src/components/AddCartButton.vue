<script setup lang="ts">
  import { ref } from 'vue';
  import { useCartStore } from '@/stores/cart';

  const props = defineProps<{ id: number }>();

  const cartStore = useCartStore();

  const productInCart = ref(cartStore.inCart(props.id));
  const buttonDisabled = ref(cartStore.statusAddRemove);

  const handleAddToCart = (id: number) => {
    if (productInCart.value) {
      cartStore.removeProductFromCard(id);
    } else {
      cartStore.addProductToCard({ productId: id, quantity: 1 });
    }
  };

  cartStore.$subscribe(() => {
    productInCart.value = cartStore.inCart(props.id);
    buttonDisabled.value = cartStore.statusAddRemove;
  });
</script>

<template>
  <button type="button" :disabled="buttonDisabled === 'loading'" @click="handleAddToCart(props.id)">
    {{ productInCart ? 'Из корзины' : 'В корзину' }}
  </button>
</template>
