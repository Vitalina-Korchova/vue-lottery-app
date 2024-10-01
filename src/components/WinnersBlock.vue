<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { PropType } from 'vue'
import type { Participant } from './RegistrationForm.vue'

const props = defineProps({
  participants: {
    type: Array as PropType<Participant[]>,
    required: true
  }
})

const winners = ref<Participant[]>([])

const isButtonDisabled = ref(true)

const checkParticipants = () => {
  isButtonDisabled.value = props.participants.length < 4
}

//перевірка при завантаженні дом
onMounted(() => {
  checkParticipants()
})

//постійно спостерігає за масивом
watch(
  () => props.participants,
  () => {
    checkParticipants()
  },
  { deep: true }
)

const selectWinners = () => {
  const shuffled = [...props.participants].sort(() => 0.5 - Math.random())
  winners.value = shuffled.slice(0, 3)

  // Виведення імен переможців у консоль
  console.log('Winners:')
  winners.value.forEach((winner, index) => {
    console.log(`${index + 1}. ${winner.name}`)
  })
}
</script>

<template>
  <div
    id="containerWinners"
    class="d-flex justify-content-between bg-white px-4 py-3 mt-5 mb-4 border border-light-subtle align-items-center"
  >
    <div id="fieldForWinners" class="d-flex border border-light-subtle align-items-center">
      <!-- <span class="winners mx-2 px-2 text-bg-primary" id="winner1"></span>
      <span class="winners mx-2 px-2 text-bg-primary" id="winner2"></span>
      <span class="winners mx-2 px-2 text-bg-primary" id="winner3"></span> -->
      <span class="fs-6 px-4 py-2 text-secondary">Winners</span>
    </div>
    <button
      id="btnNewWinners"
      type="button"
      class="btn btn-primary"
      :disabled="isButtonDisabled"
      @click="selectWinners"
    >
      New Winner
    </button>
  </div>
</template>

<style scoped>
#fieldForWinners {
  width: 85%;
}

.winners {
  border-radius: 2px;
  font-weight: 600;
  font-size: 14px;
}
</style>
