<script setup lang="ts">
  import { RouterLink } from 'vue-router';
</script>

<template>
  <header class="header">
    <div class="container header__container">
      <RouterLink class="header__link-logo" to="/">
        <img src="/img/logo.svg" class="header__logo" alt="Логотип мебельного маркета Koff" />
      </RouterLink>
      <form class="header__search" method="GET">
        <input type="search" name="search" placeholder="Введите запрос" class="header__input" />
        <button type="submit" class="header__btn">
          <svg width="16" height="16">
            <use href="/img/sprite.svg#search"></use>
          </svg>
        </button>
      </form>
      <nav class="header__control">
        <RouterLink class="header__link" to="/favorites">
          <span class="header__link-text">Избранное</span>
          <svg width="16" height="16" class="header__favorites">
            <use href="/img/sprite.svg#favorites"></use>
          </svg>
        </RouterLink>
        <RouterLink class="header__link" to="/cart">
          <span class="header__link-text">Корзина</span><span class="header__count">(0)</span>
          <svg width="16" height="16">
            <use href="/img/sprite.svg#cart"></use>
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

    &__link-logo {
      grid-area: logo;
    }

    &__logo {
      width: 94px;
    }

    &__search {
      grid-area: search;
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
