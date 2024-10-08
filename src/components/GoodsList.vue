<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { useGoodsStore } from '@/stores/goods';
  import { useFavoritesStore } from '@/stores/favorites';
  import CardItem from '@/components/CardItem.vue';
  import PaginationElem from '@/components/PaginationElem.vue';

  const route = useRoute();
  const storeGoods = useGoodsStore();
  const storeFavorites = useFavoritesStore();

  const isHiddenTitle = ref(true);
  const goodsTitle = ref('Список товаров');

  const updateGetGoodsAndTitle = () => {
    if (route.path === '/search' || route.path === '/favorites') {
      goodsTitle.value = route.path === '/search' ? 'Результаты поиска:' : 'Избранное';
      isHiddenTitle.value = false;
    } else {
      goodsTitle.value = 'Список товаров';
      isHiddenTitle.value = true;
    }
    if (route.path === '/category' || route.path === '/search') {
      if (Object.keys(route.query).length && Object.values(route.query)[0] !== '') {
        storeGoods.getGoods(route.query);
      }
    } else if (route.path === '/favorites') {
      storeGoods.getGoods({ list: storeFavorites.favoritesList.join(',') });
    } else {
      storeGoods.getGoods({});
    }
  };

  onMounted(updateGetGoodsAndTitle);

  watch(route, updateGetGoodsAndTitle);

  const { goods, pagination } = storeToRefs(storeGoods);
</script>

<template>
  <section class="goods">
    <div class="container goods__container">
      <h2 :class="['goods__title', { 'visually-hidden': isHiddenTitle }]">
        {{ goodsTitle }}
      </h2>
      <p v-if="storeGoods.status === 'loading'" class="goods__loading">Загрузка товаров...</p>
      <p v-else-if="storeGoods.status === 'error'" class="goods__error">
        Ошибка: {{ storeGoods.error }}
      </p>
      <template v-else-if="goods.length">
        <ul class="goods__list">
          <li class="goods__item" v-for="product in goods" :key="product.id">
            <CardItem class="goods__card" :product="product" />
          </li>
        </ul>
        <PaginationElem v-if="pagination && pagination.totalPages > 1" :pagination="pagination" />
      </template>
      <p v-else-if="route.path === '/category'" class="goods__empty">Категория не существует</p>
      <p v-else-if="route.path === '/search'" class="goods__empty">
        По Вашему запросу ничего не найдено
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

    &__empty,
    &__loading {
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
