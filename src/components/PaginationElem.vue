<script setup lang="ts">
  import { ref } from 'vue';
  import { RouterLink, useRoute } from 'vue-router';
  import type { IPagination } from '@/stores/goods';

  const { pagination } = defineProps<{ pagination: IPagination }>();
  const route = useRoute();

  const currentPageNumber = ref(Number(route.query.page) || pagination.currentPage);
  const prevPageNumber = ref(0);
  const nextPageNumber = ref(0);
  const prevPageUrl = ref('');
  const nextPageUrl = ref('');

  const createPageUrl = (pageNumber: number) => {
    const page = String(pageNumber);
    const newSearchParams = new URLSearchParams({ ...route.query, page });
    newSearchParams.set('page', page);
    return `${route.path}?${newSearchParams}`;
  };

  prevPageNumber.value = currentPageNumber.value - 1;
  nextPageNumber.value = currentPageNumber.value + 1;

  if (prevPageNumber.value > 0) {
    prevPageUrl.value = createPageUrl(prevPageNumber.value);
  }
  if (nextPageNumber.value <= pagination.totalPages) {
    nextPageUrl.value = createPageUrl(nextPageNumber.value);
  }
</script>
<template>
  <div class="pagination">
    <div
      class="pagination__bar"
      :style="{ '--width': `calc((${currentPageNumber} / ${pagination.totalPages}) * 100%)` }" />
    <div class="pagination__arrows">
      <RouterLink
        :to="prevPageUrl"
        :class="['pagination__left', { pagination__disabled: !prevPageUrl }]">
        <svg width="16" height="16">
          <use href="/img/sprite.svg#left"></use>
        </svg>
      </RouterLink>
      <p class="pagination__info">
        <span class="pagination__current">{{ currentPageNumber }}</span>
        из
        <span class="pagination__total">{{ pagination.totalPages }}</span>
      </p>
      <RouterLink
        :to="nextPageUrl"
        :class="['pagination__right', { pagination__disabled: !nextPageUrl }]">
        <svg width="16" height="16">
          <use href="/img/sprite.svg#right"></use>
        </svg>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .pagination {
    width: 200px;
    margin: 0 auto;

    &__bar {
      background-color: #eeeff2;
      height: 6px;
      width: 100%;
      border-radius: 3px;
      margin-bottom: 16px;

      &::after {
        content: '';
        display: block;
        background-color: #780096;
        height: 100%;
        width: var(--width);
        border-radius: 3px;
        transition: width 0.36s ease-in-out;
      }
    }

    &__arrows {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    &__info {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    &__left {
      &:hover,
      &:focus-visible,
      &:active {
        color: #780096;
      }
    }

    &__right {
      &:hover,
      &:focus-visible,
      &:active {
        color: #780096;
      }
    }

    &__disabled {
      opacity: 50%;
      pointer-events: none;
      cursor: default;
    }
  }
</style>
