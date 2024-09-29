<script setup lang="ts">
import WinnerBlock from './components/WinnersBlock.vue'
import RegisterForm from './components/RegistrationForm.vue'
</script>

<template>
  <body>
    <div class="container">
      <WinnerBlock />
      <RegisterForm />
    </div>
  </body>
</template>

<style scoped>
:global(body) {
  background-color: rgb(243, 243, 243);
}
</style>
