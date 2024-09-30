<script setup lang="ts">
import { reactive, ref, defineEmits } from 'vue'

export interface Participant {
  name: string
  dateBirth: string
  email: string
  phoneNumber: string
}

const participant = reactive<Participant>({
  name: '',
  dateBirth: '',
  email: '',
  phoneNumber: ''
})

const participants = ref<Participant[]>([])

// Використовуємо defineEmits для визначення події
const emit = defineEmits(['add-participant'])

const saveParticipant = (event: Event) => {
  event.preventDefault()
  const newParticipant = { ...participant }
  participants.value.push(newParticipant)

  // Очищуємо поля форми
  Object.keys(participant).forEach((key) => {
    ;(participant as any)[key] = ''
  })

  // Викликаємо подію, передаючи нового учасника
  emit('add-participant', newParticipant)

  console.log('Поточний список учасників:', participants.value)
}

const validation = (input: string, error: string) => {}
</script>

<template>
  <div id="containerRegisterForm" class="py-3 px-3 mb-4 bg-white border border-light-subtle">
    <form class="d-flex flex-column gap-2">
      <span class="fw-bold">REGISTER FORM</span>
      <span class="text-black-50 bg-white fs-6 pb-3">Please fill in all the fields.</span>
      <label for="" class="fw-bold">Name</label>
      <input
        v-model="participant.name"
        type="text"
        name=""
        id="name"
        placeholder="Enter user name"
        class="form-control"
      />
      <p></p>
      <label for="" class="fw-bold">Date of Birth</label>
      <input
        v-model="participant.dateBirth"
        type="date"
        name=""
        id="dateBirth"
        class="form-control"
      />
      <p></p>
      <label for="" class="fw-bold">Email</label>
      <input
        v-model="participant.email"
        id="email"
        type="email"
        class="form-control"
        placeholder="Enter email"
      />
      <p></p>
      <label for="" class="fw-bold">Phone Number</label>
      <input
        v-model="participant.phoneNumber"
        id="phoneNumber"
        type="phone-number"
        class="form-control"
        placeholder="Enter phone number"
      />
      <p></p>
      <button
        @click="saveParticipant"
        id="btnSave"
        type="button"
        class="mt-4 btn btn-primary align-self-end"
      >
        Save
      </button>
    </form>
  </div>
</template>

<style scoped>
#btnSave {
  width: 80px;
}
</style>
