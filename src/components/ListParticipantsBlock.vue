<script setup lang="ts">
import type { PropType } from 'vue'
import type { Participant } from './RegistrationForm.vue'

defineProps({
  participants: {
    type: Array as PropType<Participant[]>,
    required: true
  }
})
</script>

<template>
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
        class="d-flex flex-row fs-6 mb-3"
      >
        <div id="NamesParticipants">
          <span>{{ index + 1 }}</span>
          <span class="mx-5">{{ participant.name }}</span>
        </div>
        <div id="ParticipantsEmailPhone">
          <span>{{ participant.dateBirth }}</span>
          <span>{{ participant.email }}</span>
          <span>{{ participant.phoneNumber }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#ParticipantsEmailPhone span:first-child {
  position: absolute;
  left: 625px;
}

#ParticipantsEmailPhone span:last-child {
  position: absolute;
  left: 1010px;
}

#ParticipantsEmailPhone span:nth-of-type(2) {
  position: absolute;
  left: 760px;
}
</style>
