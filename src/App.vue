<script setup lang="ts">
import { ref } from 'vue'
import WinnerBlock from './components/WinnersBlock.vue'
import ListParticipants from './components/ListParticipantsBlock.vue'
import RegistrationForm from './components/RegistrationForm.vue'
import type { Participant } from './components/RegistrationForm.vue'

const participants = ref<Participant[]>([])

const addParticipant = (newParticipant: Participant) => {
  participants.value.push(newParticipant)
}
</script>

<template>
  <div class="container">
    <WinnerBlock :participants="participants" />
    <RegistrationForm @add-participant="addParticipant" />
    <ListParticipants :participants="participants" />
  </div>
</template>

<style scoped>
:global(body) {
  background-color: rgb(243, 243, 243);
}
</style>
