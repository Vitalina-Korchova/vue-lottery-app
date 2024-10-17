<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import WinnerBlock from './components/WinnersBlock.vue'
import ListParticipants from './components/ListParticipantsBlock.vue'
import RegistrationForm from './components/RegistrationForm.vue'
import type { Participant } from './components/RegistrationForm.vue'

const participants = ref<Participant[]>([])
const displayedParticipants = ref<Participant[]>([])
const searchTerm = ref('')
const currentSortType = ref<'none' | 'nameDec' | 'nameInc' | 'dateBirthDec' | 'dateBirthInc'>(
  'none'
)

const filteredParticipants = computed(() => {
  if (searchTerm.value) {
    return displayedParticipants.value.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }
  return displayedParticipants.value
})

const loadFromStorage = () => {
  const storedParticipants = localStorage.getItem('participants')
  if (storedParticipants) {
    participants.value = JSON.parse(storedParticipants)
    resetDisplay()
  }
}

const saveToStorage = () => {
  localStorage.setItem('participants', JSON.stringify(participants.value))
}

const resetDisplay = () => {
  displayedParticipants.value = [...participants.value]
  searchTerm.value = ''
  currentSortType.value = 'none'
}

onMounted(() => {
  loadFromStorage()
})

watch(
  participants,
  () => {
    saveToStorage()
    resetDisplay()
  },
  { deep: true }
)

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
  if (currentSortType.value !== 'dateBirthDec') {
    displayedParticipants.value.sort((a, b) => a.name.localeCompare(b.name))
    currentSortType.value = 'dateBirthDec'
  } else {
    resetDisplay()
  }
}

const sortParticipantsByNameInc = () => {
  if (currentSortType.value !== 'nameInc') {
    displayedParticipants.value.sort((a, b) => b.name.localeCompare(a.name))
    currentSortType.value = 'nameInc'
  } else {
    resetDisplay()
  }
}

const sortParticipantsByDateBirthDec = () => {
  if (currentSortType.value !== 'dateBirthDec') {
    displayedParticipants.value.sort((a, b) => {
      return new Date(b.dateBirth).getTime() - new Date(a.dateBirth).getTime()
    })
    currentSortType.value = 'dateBirthDec'
  } else {
    resetDisplay()
  }
}

const sortParticipantsByDateBirthInc = () => {
  if (currentSortType.value !== 'dateBirthInc') {
    displayedParticipants.value.sort((a, b) => {
      return new Date(a.dateBirth).getTime() - new Date(b.dateBirth).getTime()
    })
    currentSortType.value = 'dateBirthInc'
  } else {
    resetDisplay()
  }
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
      @sort-name-inc="sortParticipantsByNameInc"
      @sort-date-birth-dec="sortParticipantsByDateBirthDec"
      @sort-date-birth-inc="sortParticipantsByDateBirthInc"
    />
  </div>
</template>

<style scoped>
:global(body) {
  background-color: rgb(243, 243, 243);
}
</style>
