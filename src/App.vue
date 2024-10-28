<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <AppHeader />
  <RouterView />
</template>

<style scoped>
:global(body) {
  background-color: rgb(243, 243, 243);
}
</style>
