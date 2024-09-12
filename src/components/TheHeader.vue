<script setup lang="ts">
  import { RouterLink } from 'vue-router';

  import TheLogo from '@/components/TheLogo.vue';
  import SearchForm from '@/components/SearchForm.vue';
</script>

<template>
  <header class="header">
    <div class="container header__container">
      <TheLogo class="header__logo" />
      <SearchForm class="header__search" />
      <nav class="header__control">
        <RouterLink class="header__link" to="/favorites">
          <span class="header__link-text">Избранное</span>
          <svg width="16" height="16" class="header__favorites">
            <use href="/img/sprite.svg#favorites" />
          </svg>
        </RouterLink>
        <RouterLink class="header__link" to="/cart">
          <span class="header__link-text">Корзина</span><span class="header__count">(0)</span>
          <svg width="16" height="16">
            <use href="/img/sprite.svg#cart" />
          </svg>
        </RouterLink>
      </nav>
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
      justify-self: end;
      display: flex;
      gap: 16px;
    }

    &__link {
      display: flex;
      flex-direction: row-reverse;
      align-items: flex-end;
      gap: 4px;

      @media (min-width: 580px) {
        flex-direction: row;
      }

      &:hover,
      &:focus-visible,
      &:active {
        color: #780096;

        .header__favorite {
          fill: #780096;
        }
      }
    }

    &__link-text {
      display: none;

      @media (min-width: 580px) {
        display: block;
      }
    }
  }
</style>
