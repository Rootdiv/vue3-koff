<script setup lang="ts">
  import TheLogo from '@/components/TheLogo.vue';
  import TheContacts from '@/components/TheContacts.vue';
  import DeveloperList from '@/components/DeveloperList.vue';
</script>

<template>
  <footer class="footer">
    <div class="container footer__container">
      <TheLogo class="footer__logo" />
      <TheContacts class="footer__contacts" />
      <DeveloperList class="footer__developers" />
      <p class="footer__copyright">&copy; Koff, 2024</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
  .footer {
    background-color: #1c1c1c;
    color: #f1e9e4;
    padding: 32px 0 40px;

    @media (min-width: 820px) {
      padding-top: 40px;
    }

    &__container {
      display: flex;
      flex-direction: column;
      gap: 24px;

      @media (min-width: 580px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
      }

      @media (min-width: 820px) {
        gap: 32px;
      }
    }

    &__logo {
      width: 230px;

      @media (min-width: 580px) {
        grid-column: 1/2;
      }

      @media (min-width: 820px) {
        width: 331px;
      }
    }

    &__developers {
      @media (min-width: 580px) {
        grid-column: 1/2;
      }
    }

    &__contacts {
      @media (min-width: 580px) {
        grid-column: 2/3;
        justify-self: end;
      }
    }

    &__copyright {
      @media (min-width: 580px) {
        grid-column: 1/2;
      }
    }
  }
</style>
