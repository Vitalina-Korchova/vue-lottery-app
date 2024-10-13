<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { PropType } from 'vue'
import type { Participant } from './RegistrationForm.vue'
import UButton from './UButton.vue'

const props = defineProps({
  participants: {
    type: Array as PropType<Participant[]>,
    required: true
  }
})

const winners = ref<Participant[]>([])

const isButtonDisabled = ref(true)

const checkParticipants = () => {
  isButtonDisabled.value = props.participants.length === 0 || winners.value.length >= 3
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
  if (winners.value.length < 3) {
    // перемішуємо учасників
    const shuffledParticipants = [...props.participants].sort(() => Math.random() - 0.5)

    const newWinner = shuffledParticipants.find(
      (participant) => !winners.value.some((winner) => winner.name === participant.name)
    )

    // якщо є учасник, якого ще немає серед переможців, додаємо його
    if (newWinner) {
      winners.value.push(newWinner)

      console.log(
        'Winners:',
        winners.value.map((winner) => winner.name)
      )

      checkParticipants()
    }
  }
}

const removeWinner = (index: number) => {
  winners.value.splice(index, 1)
  checkParticipants()
}
</script>

<template>
  <div
    id="containerWinners"
    class="d-flex justify-content-between bg-white px-4 py-3 mt-5 mb-4 border border-light-subtle align-items-center"
  >
    <div id="fieldForWinners" class="d-flex border border-light-subtle align-items-center">
      <span
        v-for="(winner, index) in winners"
        :key="index"
        class="winners mx-2 ps-2 pe-4 text-bg-primary"
        :id="'winner' + (index + 1)"
      >
        {{ winner.name }}
        <span class="close-btn" @click="removeWinner(index)">&#10005;</span>
      </span>
      <span class="fs-6 px-4 py-2 text-secondary">Winners</span>
    </div>
    <UButton label="New Winner" :disabled="isButtonDisabled" @click="selectWinners" />
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

.close-btn {
  font-size: 14px;
  color: white;
  cursor: pointer;
  position: absolute;
  top: 80px;
  font-weight: bold;
  padding-left: 6px;
}
</style>
