<script setup lang="ts">
  import TheLogo from '@/components/TheLogo.vue';
  import SearchForm from '@/components/SearchForm.vue';
  import HeaderNavigation from '@/components/HeaderNavigation.vue';
</script>

<template>
  <header class="header">
    <div class="container header__container">
      <TheLogo class="header__logo" />
      <SearchForm class="header__search" />
      <HeaderNavigation class="header__control" />
    </div>
  </header>
</template>

<style scoped lang="scss">
  .header {
    padding-top: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #eeeff2;

    &__container {
      display: grid;
      gap: 16px;
      align-items: center;
      justify-content: space-between;
      grid-template-areas:
        'logo control'
        'search search';

      @media (min-width: 820px) {
        grid-template-areas: 'logo search control';
        grid-template-columns: 94px 1fr auto;
        align-items: center;
      }
    }

    &__logo {
      grid-area: logo;
      width: 94px;
    }

    &__search {
      grid-area: search;
    }

    &__control {
      grid-area: control;
    }
  }
</style>
