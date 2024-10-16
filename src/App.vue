<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import WinnerBlock from './components/WinnersBlock.vue'
import ListParticipants from './components/ListParticipantsBlock.vue'
import RegistrationForm from './components/RegistrationForm.vue'
import type { Participant } from './components/RegistrationForm.vue'

const participants = ref<Participant[]>([])
const searchTerm = ref('')

const filteredParticipants = computed(() => {
  return participants.value.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const loadFromStorage = () => {
  const storedParticipants = localStorage.getItem('participants')
  if (storedParticipants) {
    participants.value = JSON.parse(storedParticipants)
  }
}

const saveToStorage = () => {
  localStorage.setItem('participants', JSON.stringify(participants.value))
}

onMounted(loadFromStorage)

watch(participants, saveToStorage, { deep: true })

const addParticipant = (newParticipant: Participant) => {
  const maxId = Math.max(0, ...participants.value.map((p) => p.id))
  newParticipant.id = maxId + 1
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

const searchParticipants = (query: string) => {
  searchTerm.value = query
}

const sortParticipantsByNameDec = () => {
  participants.value.sort((a, b) => a.name.localeCompare(b.name))
}
</script>

<template>
  <div class="container">
    <WinnerBlock :participants="participants" />
    <RegistrationForm @add-participant="addParticipant" :participants="participants" />
    <ListParticipants
      :participants="filteredParticipants"
      @remove-participant="removeParticipant"
      @update-participant="updateParticipant"
      @search-by-name="searchParticipants"
      @sort-name-dec="sortParticipantsByNameDec"
    />
  </div>
</template>

<style scoped>
:global(body) {
  background-color: rgb(243, 243, 243);
}
</style>
