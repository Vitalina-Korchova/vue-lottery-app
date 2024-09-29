<script setup lang="ts">
import WinnerBlock from './components/WinnersBlock.vue'
import RegisterForm from './components/RegistrationForm.vue'
import ListParticipants from './components/ListParticipantsBlock.vue'
</script>

<template>
  <body>
    <div class="container">
      <WinnerBlock />
      <RegisterForm />
      <ListParticipants />
    </div>
  </body>
</template>

<style scoped>
:global(body) {
  background-color: rgb(243, 243, 243);
}
</style>
