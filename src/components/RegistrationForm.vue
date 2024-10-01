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
const errors = reactive<{ [key: string]: string }>({
  name: '',
  dateBirth: '',
  email: '',
  phoneNumber: ''
})

// Використовуємо defineEmits для визначення події
const emit = defineEmits(['add-participant'])

// Функція для перевірки кожного поля на порожність
const validateAllFields = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneRegex = /^0\d{9}$/
  const today = new Date()

  errors.name = participant.name.trim() ? '' : 'Name is required!'

  const birthDate = new Date(participant.dateBirth)
  if (!participant.dateBirth.trim()) {
    errors.dateBirth = 'Date of Birth is required!'
  } else if (birthDate > today) {
    errors.dateBirth = 'Date of Birth cannot be in the future!'
  } else {
    errors.dateBirth = ''
  }

  if (!participant.email.trim()) {
    errors.email = 'Email is required!'
  } else if (!emailRegex.test(participant.email)) {
    errors.email = 'Invalid email format!'
  } else {
    errors.email = ''
  }

  if (!participant.phoneNumber.trim()) {
    errors.phoneNumber = 'Phone Number is required!'
  } else if (!phoneRegex.test(participant.phoneNumber)) {
    errors.phoneNumber = 'Invalid phone number format!'
  } else {
    errors.phoneNumber = ''
  }

  return !(errors.name || errors.dateBirth || errors.email || errors.phoneNumber)
}

const saveParticipant = (event: Event) => {
  event.preventDefault()

  // Валідація
  if (!validateAllFields()) {
    return
  }

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
</script>

<template>
  <div id="containerRegisterForm" class="py-3 px-3 mb-4 bg-white border border-light-subtle">
    <form class="d-flex flex-column gap-2">
      <span class="fw-bold">REGISTER FORM</span>
      <span class="text-black-50 bg-white fs-6 pb-3">Please fill in all the fields.</span>

      <!-- Поле для імені з валідацією -->
      <label for="name" class="fw-bold">Name</label>
      <input
        v-model="participant.name"
        :class="{ 'is-invalid': errors.name }"
        type="text"
        id="name"
        placeholder="Enter user name"
        class="form-control"
      />
      <p v-if="errors.name" class="text-danger">{{ errors.name }}</p>

      <!-- Поле для дати народження -->
      <label for="dateBirth" class="fw-bold">Date of Birth</label>
      <input
        v-model="participant.dateBirth"
        :class="{ 'is-invalid': errors.dateBirth }"
        type="date"
        id="dateBirth"
        class="form-control"
      />
      <p v-if="errors.dateBirth" class="text-danger">{{ errors.dateBirth }}</p>

      <!-- Поле для email -->
      <label for="email" class="fw-bold">Email</label>
      <input
        v-model="participant.email"
        :class="{ 'is-invalid': errors.email }"
        type="email"
        id="email"
        placeholder="Enter email"
        class="form-control"
      />
      <p v-if="errors.email" class="text-danger">{{ errors.email }}</p>

      <!-- Поле для телефону -->
      <label for="phoneNumber" class="fw-bold">Phone Number</label>
      <input
        v-model="participant.phoneNumber"
        :class="{ 'is-invalid': errors.phoneNumber }"
        type="text"
        id="phoneNumber"
        placeholder="Enter phone number"
        class="form-control"
      />
      <p v-if="errors.phoneNumber" class="text-danger">{{ errors.phoneNumber }}</p>

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

.is-invalid {
  border-color: red;
}

.text-danger {
  font-size: 14px;
}
</style>
