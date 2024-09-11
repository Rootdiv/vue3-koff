<script setup lang="ts">
  import CardItem from '@/components/CardItem.vue';
  import { useGoodsStore } from '@/stores/goods';
  import { onMounted, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRoute } from 'vue-router';
  import PaginationElem from '@/components/PaginationElem.vue';
  import { useFavoritesStore } from '@/stores/favorites';

  const route = useRoute();
  const storeGoods = useGoodsStore();
  const storeFavorites = useFavoritesStore();

  const updateGetGoods = () => {
    if (route.path === '/category') {
      storeGoods.getGoods(route.query);
    } else if (route.path === '/favorites') {
      storeGoods.getGoods({ list: storeFavorites.favoritesList.join(',') });
    } else {
      storeGoods.getGoods({});
    }
  };

  onMounted(updateGetGoods);

  watch(route, updateGetGoods);

  const { goods, pagination } = storeToRefs(storeGoods);
</script>

<template>
  <section class="goods">
    <div class="container goods__container">
      <h2 :class="['visually-hidden', { goods__title: route.path === '/favorites' }]">
        {{ route.path === '/favorites' ? 'Избранное' : 'Список товаров' }}
      </h2>
      <p v-if="storeGoods.status === 'error'" class="goods__error">
        Ошибка: {{ storeGoods.error }}
      </p>
      <ul class="goods__list" v-if="goods.length">
        <li class="goods__item" v-for="product in goods" :key="product.id">
          <CardItem class="goods__card" :product="product" />
        </li>
      </ul>
      <PaginationElem v-if="pagination && pagination.totalPages > 1" :pagination="pagination" />
      <p v-else-if="goods.length === 0 && route.path === '/category'" class="goods__empty">
        Категория не существует
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .goods {
    padding-top: 24px;

    @media (min-width: 580px) {
      padding-top: 32px;
    }

    @media (min-width: 820px) {
      padding-top: 40px;
    }

    &__title {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 24px;

      @media (min-width: 580px) {
        font-size: 32px;
        margin-bottom: 32px;
      }

      @media (min-width: 820px) {
        margin-bottom: 40px;
      }
    }

    &__list {
      display: grid;
      gap: 50px 8px;
      justify-content: space-evenly;
      grid-template-columns: repeat(auto-fit, 140px);
      margin-bottom: 32px;

      @media (min-width: 580px) {
        gap: 65px 10px;
        grid-template-columns: repeat(auto-fit, 230px);
        margin-bottom: 40px;
      }

      @media (min-width: 820px) {
        gap: 81px 16px;
        grid-template-columns: repeat(auto-fit, 302px);
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__empty {
      padding-top: 50px;
      font-size: 16px;
      text-align: center;
    }

    &__error {
      padding-top: 25px;
      font-size: 16px;
    }
  }
</style>
