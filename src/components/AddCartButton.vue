<script setup lang="ts">
  import { ref } from 'vue';
  import { useCartStore } from '@/stores/cart';

  const props = defineProps<{ productId: number }>();

  const cartStore = useCartStore();

  const productInCart = ref(cartStore.inCart(props.productId));
  const buttonDisabled = ref(cartStore.statusAddRemove);

  const handleAddToCart = (id: number) => {
    if (productInCart.value) {
      cartStore.removeProductFromCard(id);
    } else {
      cartStore.addProductToCard({ productId: id, quantity: 1 });
    }
  };

  cartStore.$subscribe(() => {
    productInCart.value = cartStore.inCart(props.productId);
    buttonDisabled.value = cartStore.statusAddRemove;
  });
</script>

<template>
  <button
    type="button"
    @click="handleAddToCart(productId)"
    :disabled="buttonDisabled === 'loading'">
    {{ productInCart ? 'Из корзины' : 'В корзину' }}
  </button>
</template>
