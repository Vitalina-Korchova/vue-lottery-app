<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import UInput from './UInput.vue'
import ParticipantService from '@/ParticipantService'
import { type Participant } from '../ParticipantInterface'

const route = useRoute()
const participantService = new ParticipantService()
const participant = ref<Participant>({
  id: 0,
  avatar: '',
  name: '',
  email: '',
  password: ''
})

onMounted(async () => {
  const userId = route.params.id
  if (userId) {
    const userData = await participantService.GetDataFromID(Number(userId))
    if (userData) {
      participant.value = userData
    }
  }
})
</script>

<template>
  <div id="containerCustom" class="py-3 px-3 mb-4 bg-white border border-light-subtle">
    <form class="d-flex flex-column gap-2">
      <UInput
        id="avatar"
        type="text"
        className="form-control"
        label="Avatar"
        v-model="participant.avatar"
      />
      <UInput
        id="name"
        type="text"
        className="form-control"
        label="Name"
        v-model="participant.name"
      />
      <UInput
        id="email"
        type="email"
        className="form-control"
        label="Email"
        v-model="participant.email"
      />
      <UInput
        id="password"
        type="text"
        className="form-control"
        label="Password"
        v-model="participant.password"
      />
    </form>
  </div>
</template>

<style scoped>
#containerCustom {
  width: 600px;
  margin: auto;
  align-items: center;
}
</style>
