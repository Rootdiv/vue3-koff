<script setup lang="ts">
  import { useCategoriesStore } from '@/stores/categories';
  import { onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { RouterLink, useRoute } from 'vue-router';

  const route = useRoute();
  const store = useCategoriesStore();

  onMounted(() => {
    store.getCategories();
  });

  const { categories } = storeToRefs(store);
</script>

<template>
  <nav v-if="route.path !== '/cart'" class="catalog">
    <div class="container catalog__container">
      <ul class="catalog__list">
        <li v-if="store.status === 'loading'" class="cart__loading">Загрузка...</li>
        <li v-else class="catalog__item" v-for="(category, index) in categories" :key="index">
          <RouterLink
            :class="['catalog__link', { ['catalog__link_active']: route.query.slug === category }]"
            :to="`/category?slug=${category}`">
            {{ category }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="scss">
  .catalog {
    overflow-x: hidden;
    padding-top: 24px;

    @media (min-width: 580px) {
      padding-top: 32px;
    }

    @media (min-width: 820px) {
      padding-top: 40px;
    }

    &__container {
      padding: 0;

      @media (min-width: 1120px) {
        padding: 0;
      }
    }

    &__list {
      overflow-x: auto;
      padding: 0 16px;
      display: flex;
      gap: 4px;

      @media (min-width: 580px) {
        padding: 0 29px;
      }

      @media (min-width: 820px) {
        padding: 0 43px;
      }

      @media (min-width: 1120px) {
        padding: 0 92px;
      }
    }

    &__link {
      display: block;
      padding: 8px 14px 10px 14px;
      border-radius: 32px;
      background-color: #eeeff2;
      color: #969eae;
      outline: none;
      border: 1px solid transparent;
      white-space: nowrap;

      &:hover,
      &:focus-visible {
        color: #780096;
        border-color: #780096;
      }

      &:active,
      &_active {
        color: #ffffff;
        background-color: #780096;
      }

      &_active {
        pointer-events: none;
      }
    }
  }
</style>
