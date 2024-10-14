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

const removeParticipant = (id: number) => {
  participants.value = participants.value.filter((p) => p.id !== id)
}

const updateParticipant = (updatedParticipant: Participant) => {
  const index = participants.value.findIndex((p) => p.id === updatedParticipant.id)
  if (index !== -1) {
    participants.value[index] = { ...participants.value[index], ...updatedParticipant }
  }
}
</script>

<template>
  <div class="container">
    <WinnerBlock :participants="participants" />
    <RegistrationForm @add-participant="addParticipant" />
    <ListParticipants
      :participants="participants"
      @remove-participant="removeParticipant"
      @update-participant="updateParticipant"
    />
  </div>
</template>

<style scoped>
:global(body) {
  background-color: rgb(243, 243, 243);
}
</style>
