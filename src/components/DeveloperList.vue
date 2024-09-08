<template>
  <ul class="developers">
    <li class="developers__item">
      <span>Designer: </span>
      <a href="https://t.me/Mrshmallowww" target="_blank">Anastasia Ilina</a>
    </li>
    <li class="developers__item">
      <span>Developer: </span>
      <a href="https://t.me/rootdiv" target="_blank">Vladimir</a>
    </li>
  </ul>
</template>

<style scoped lang="scss">
  .developers {
    @media (min-width: 580px) {
      grid-column: 1/2;
    }

    &__item {
      margin-bottom: 8px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__link {
      outline: 1px solid transparent;
      border-radius: 4px;

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
