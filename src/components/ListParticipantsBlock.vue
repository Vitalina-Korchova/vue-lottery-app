<script setup lang="ts">
import { ref } from 'vue'
import RegistrationForm from './RegistrationForm.vue'
import type { Participant } from './RegistrationForm.vue'

//масив
const participants = ref<Participant[]>([])

// Метод для оновлення списку учасників
const addParticipant = (newParticipant: Participant) => {
  participants.value.push(newParticipant)
}
</script>

<template>
  <RegistrationForm @add-participant="addParticipant" />
  <div
    id="containerParticipants"
    class="d-flex flex-column py-5 px-4 mb-5 bg-white border border-light-subtle"
  >
    <div id="NamesElements" class="d-flex flex-row justify-content-between fs-5">
      <div id="Names">
        <span class="fw-bold">#</span>
        <span class="fw-bold mx-5">Name</span>
      </div>
      <div id="DateEmailPhone" class="d-flex flex-row">
        <span class="fw-bold mx-5">Date of Birth</span>
        <span class="fw-bold mx-5">Email</span>
        <span class="fw-bold mx-5">Phone number</span>
      </div>
    </div>
    <hr />
    <div id="ParticipantsInner">
      <div
        v-for="(participant, index) in participants"
        :key="index"
        class="d-flex flex-row justify-content-between fs-6 mb-3"
      >
        <div id="NamesParticipants">
          <span>{{ index + 1 }}</span>
          <span class="mx-5">{{ participant.name }}</span>
        </div>
        <div id="ParticipantsEmailPhone" class="d-flex flex-row">
          <span class="element">{{ participant.dateBirth }}</span>
          <span class="element">{{ participant.email }}</span>
          <span class="element"> {{ participant.phoneNumber }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#DateEmailPhone {
  margin-left: 270px;
}

.element {
}
</style>
