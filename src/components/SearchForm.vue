<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  const router = useRouter();
  const route = useRoute();

  const search = ref('');

  const handleSearch = () => {
    if (search.value) {
      router.push({
        path: 'search',
        query: { q: search.value },
      });
    }
  };

  watch(route, () => {
    if (route.path === '/search' && route.query.q) {
      search.value = String(route.query.q);
    } else {
      search.value = '';
    }
  });
</script>

<template>
  <form class="search" @submit.prevent="handleSearch">
    <input
      type="search"
      name="search"
      v-model.trim="search"
      placeholder="Введите запрос"
      class="search__input" />
    <button type="submit" class="search__btn">
      <svg width="16" height="16">
        <use href="/img/sprite.svg#search" />
      </svg>
    </button>
  </form>
</template>

<style scoped lang="scss">
  .search {
    position: relative;
    width: 100%;
    height: 38px;

    @media (min-width: 820px) {
      max-width: 408px;
      justify-self: center;
    }

    @media (min-width: 1120px) {
      max-width: 514px;
    }
    &__input {
      width: 100%;
      height: 100%;
      padding: 0 40px 0 24px;
      border-radius: 32px;
      background-color: #eeeff2;
      border: none;

      &::placeholder,
      &::placeholder-shown {
        color: #969eae;
      }

      &:hover,
      &:focus-visible {
        outline: 1px solid #dfe3eb;
      }

      &::-webkit-search-cancel-button {
        display: none;
      }
    }

    &__btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 24px;
      display: block;
      width: 16px;
      height: 16px;
      outline-offset: 4px;
      outline: 1px solid transparent;

      &:hover,
      &:active {
        color: #780096;
      }

      &:focus-visible {
        color: #780096;
        outline-color: #780096;
      }
    }
  }
</style>
