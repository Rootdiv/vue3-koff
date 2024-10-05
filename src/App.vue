<script setup lang="ts">
  import TheHeader from '@/components/TheHeader.vue';
  import CatalogList from '@/components/CatalogList.vue';
  import BreadCrumbs from '@/components/BreadCrumbs.vue';
  import TheFooter from '@/components/TheFooter.vue';

  import { useAuthStore } from '@/stores/auth';
  import { onBeforeMount } from 'vue';

  const authStore = useAuthStore();

  onBeforeMount(() => {
    if (authStore.accessKey === '') {
      authStore.fetchAccessKey();
    }
  });
</script>

<template>
  <TheHeader />
  <main>
    <CatalogList />
    <BreadCrumbs />
    <RouterView />
  </main>
  <TheFooter />
</template>
