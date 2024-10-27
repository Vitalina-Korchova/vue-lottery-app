<script setup lang="ts">
import { reactive, ref } from 'vue'
import UButton from './UButton.vue'
import UInput from './UInput.vue'
import { type Participant } from '../ParticipantInterface'
import ParticipantService from '../ParticipantService'
import { useForm, useField } from 'vee-validate'
import { useParticipantForm } from '../Validation'

const props = defineProps<{
  participantService: ParticipantService
}>()

const { schema } = useParticipantForm(props.participantService)

// використання useForm з схемою валідації
const { handleSubmit, resetForm } = useForm({
  validationSchema: schema
})

// використання useField для кожного поля
const { value: avatar, errorMessage: avatarError } = useField<string>('avatar')
const { value: name, errorMessage: nameError } = useField<string>('name')
const { value: email, errorMessage: emailError } = useField<string>('email')
const { value: password, errorMessage: passwordError } = useField<string>('password')

const saveParticipant = handleSubmit((values) => {
  const participant: Participant = {
    id: 0,
    avatar: values.avatar,
    name: values.name,
    email: values.email,
    password: values.password
  }

  props.participantService.addParticipant(participant)
  resetForm()
})
</script>

<template>
  <div id="containerRegisterForm" class="py-3 px-3 mb-4 bg-white border border-light-subtle">
    <form class="d-flex flex-column gap-2" @keyup.enter="saveParticipant">
      <span class="fw-bold">REGISTER FORM</span>
      <span class="text-black-50 bg-white fs-6 pb-3">Please fill in all the fields.</span>

      <!-- Поле для аватару -->
      <UInput
        v-model="avatar"
        :id="'avatar'"
        :type="'text'"
        :className="'form-control'"
        :error="avatarError"
        :label="'Avatar'"
      />

      <!-- Поле для імені -->
      <UInput
        v-model="name"
        :id="'name'"
        :type="'text'"
        :placeholder="'Enter user name'"
        :className="'form-control'"
        :error="nameError"
        :label="'Name'"
      />

      <!-- Поле для email -->

      <UInput
        v-model="email"
        :id="'email'"
        :type="'email'"
        :className="'form-control'"
        :placeholder="'Enter email'"
        :error="emailError"
        :label="'Email'"
      />

      <UInput
        v-model="password"
        :id="'password'"
        :type="'text'"
        :className="'form-control'"
        :placeholder="'Enter password'"
        :error="passwordError"
        :label="'Password'"
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
