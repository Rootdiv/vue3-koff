<template>
  <div class="contacts">
    <a href="tel:+79398391297" class="contacts__phone">
      <svg width="16" height="16">
        <use href="/img/sprite.svg#phone"></use>
      </svg>
      <span>+7 (939) 839 12 97</span>
    </a>
    <ul class="contacts__list">
      <li class="contacts__item">
        <a class="contacts__link" href="#">
          <svg width="16" height="16">
            <use href="/img/sprite.svg#vk"></use>
          </svg>
        </a>
      </li>
      <li class="contacts__item">
        <a class="contacts__link" href="#">
          <svg width="16" height="16">
            <use href="/img/sprite.svg#youtube"></use>
          </svg>
        </a>
      </li>
      <li class="contacts__item">
        <a class="contacts__link" href="#">
          <svg width="16" height="16">
            <use href="/img/sprite.svg#telegram"></use>
          </svg>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
  .contacts {
    &__phone {
      display: flex;
      gap: 4px;
      margin-bottom: 20px;
    }

    &__list {
      display: flex;
      gap: 8px;
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
