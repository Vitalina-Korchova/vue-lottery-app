<script setup lang="ts">
import WinnersBlock from './WinnersBlock.vue'
import ListParticipantsBlock from './ListParticipantsBlock.vue'
import RegistrationForm from './RegistrationForm.vue'
import ParticipantService from '../ParticipantService'

const participantService = new ParticipantService()
const participants = participantService.getAllParticipants()
console.log(participants)
const filteredParticipants = participantService.filteredParticipants()
</script>

<template>
  <div class="container">
    <WinnersBlock :participants="participants" />
    <RegistrationForm :participantService="participantService" />
    <ListParticipantsBlock
      :participants="filteredParticipants"
      :participantService="participantService"
    />
  </div>
</template>

<style scoped></style>
