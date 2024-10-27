<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import WinnerBlock from './components/WinnersBlock.vue'
import ListParticipants from './components/ListParticipantsBlock.vue'
import RegistrationForm from './components/RegistrationForm.vue'
import ParticipantService from './ParticipantService'
import AppHeader from './components/AppHeader.vue'

const participantService = new ParticipantService()
const participants = participantService.getAllParticipants()
const filteredParticipants = participantService.filteredParticipants()
</script>

<template>
  <AppHeader />
  <div class="container">
    <WinnerBlock :participants="participants" />
    <RegistrationForm :participantService="participantService" />
    <ListParticipants
      :participants="filteredParticipants"
      :participantService="participantService"
    />
  </div>
</template>

<style scoped>
:global(body) {
  background-color: rgb(243, 243, 243);
}
</style>
