<script setup lang="ts">
import { reactive, ref } from 'vue'
import UButton from './UButton.vue'
import UInput from './UInput.vue'
import { type Participant } from '../ParticipantInterface'
import ParticipantService from '../ParticipantService'

const props = defineProps<{
  participantService: ParticipantService
}>()

// локальний реактивний об'єкт для форми
const participant = reactive<Participant>({
  id: 0,
  name: '',
  dateBirth: '',
  email: '',
  phoneNumber: ''
})

const errors = reactive<{ [key: string]: string }>({
  name: '',
  dateBirth: '',
  email: '',
  phoneNumber: ''
})

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
  } else if (
    props.participantService.getAllParticipants().value.some((p) => p.email === participant.email)
  ) {
    errors.email = 'This email already exists!'
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

  if (!validateAllFields()) {
    return
  }

  props.participantService.addParticipant({ ...participant })

  // Очищення форми
  participant.name = ''
  participant.dateBirth = ''
  participant.email = ''
  participant.phoneNumber = ''
  participant.id = 0
}
</script>

<template>
  <div id="containerRegisterForm" class="py-3 px-3 mb-4 bg-white border border-light-subtle">
    <form class="d-flex flex-column gap-2" @keyup.enter="saveParticipant">
      <span class="fw-bold">REGISTER FORM</span>
      <span class="text-black-50 bg-white fs-6 pb-3">Please fill in all the fields.</span>

      <!-- Поле для імені з валідацією -->
      <UInput
        v-model="participant.name"
        :id="'name'"
        :type="'text'"
        :placeholder="'Enter user name'"
        :className="'form-control'"
        :error="errors.name"
        :label="'Name'"
      />

      <!-- Поле для дати народження -->
      <UInput
        v-model="participant.dateBirth"
        :id="'dateBirth'"
        :type="'date'"
        :className="'form-control'"
        :error="errors.dateBirth"
        :label="'Date of Birth'"
      />

      <!-- Поле для email -->

      <UInput
        v-model="participant.email"
        :id="'email'"
        :type="'email'"
        :className="'form-control'"
        :placeholder="'Enter email'"
        :error="errors.email"
        :label="'Email'"
      />

      <!-- Поле для телефону -->
      <UInput
        v-model="participant.phoneNumber"
        :id="'phoneNumber'"
        :type="'tel'"
        :className="'form-control'"
        :placeholder="'Enter phone number'"
        :error="errors.phoneNumber"
        :label="'Phone Number'"
      />

      <UButton label="Save" @click="saveParticipant" id="btnSave" customClass="align-self-end" />
    </form>
  </div>
</template>

<style scoped>
#btnSave {
  width: 80px;
}
</style>
