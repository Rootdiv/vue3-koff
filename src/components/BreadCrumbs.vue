<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { RouterLink, useRoute } from 'vue-router';
  import { useProductStore } from '@/stores/product';

  const route = useRoute();
  const storeProduct = useProductStore();
  const textBreadcrumbs = ref('');

  const { product } = storeToRefs(storeProduct);

  watch(route, () => {
    if (route.query.slug || route.query.q) {
      textBreadcrumbs.value = String(route.query.slug || route.query.q);
    } else if (route.path === '/favorites') {
      textBreadcrumbs.value = 'Избранное';
    } else if (route.name === 'product') {
      textBreadcrumbs.value = 'Товар';
    } else {
      textBreadcrumbs.value = '';
    }
  });
</script>

<template>
  <div
    class="breadcrumbs"
    v-if="textBreadcrumbs && storeProduct.status !== 'loading' && storeProduct.status !== 'error'">
    <div class="container">
      <ul class="breadcrumbs__list">
        <li class="breadcrumbs__item">
          <RouterLink class="breadcrumbs__link" to="/">Главная</RouterLink>
          <span class="breadcrumbs__separator">&gt;</span>
        </li>
        <li v-if="product.category" class="breadcrumbs__item">
          <RouterLink class="breadcrumbs__link" :to="`/category?slug=${product.category}`">
            {{ product.category }}
          </RouterLink>
          <span class="breadcrumbs__separator">&gt;</span>
        </li>
        <li class="breadcrumbs__item">
          <span class="breadcrumbs__link">
            {{ product.name || textBreadcrumbs }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .breadcrumbs {
    padding-top: 20px;

    @media (min-width: 580px) {
      padding-top: 24px;
    }

    &__list {
      display: flex;
      gap: 6px;
      color: #969eae;
    }

    &__item {
      display: flex;
      gap: 6px;
    }

    &__item:last-child &__separator {
      display: none;
    }
  }
</style>
