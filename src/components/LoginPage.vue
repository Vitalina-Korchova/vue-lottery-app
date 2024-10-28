<script setup lang="ts">
import UInput from './UInput.vue'
import UButton from './UButton.vue'
import UModal from './UModal.vue'
import ParticipantService from '@/ParticipantService'
import { computed, ref } from 'vue'

const participantService = new ParticipantService()
const email = ref('')
const password = ref('')
const showErrorModal = ref(false)

const isLoggedIn = computed(() => participantService.isLoggedIn)

const handleLogin = async () => {
  try {
    const loginSuccess = await participantService.Login(email.value, password.value)
    if (!loginSuccess) {
      showErrorModal.value = true
    }
  } catch (error) {
    console.error('Login failed:', error)
    showErrorModal.value = true
  }
}

const handleLogout = () => {
  participantService.logout()
  email.value = ''
  password.value = ''
}

const closeErrorModal = () => {
  showErrorModal.value = false
}

const handleTryAgain = () => {
  showErrorModal.value = false
  password.value = ''
}
</script>
<template>
  <div id="containerCustom" class="py-3 px-3 mb-4 bg-white border border-light-subtle">
    <form v-if="!isLoggedIn" class="d-flex flex-column gap-2" @submit.prevent="handleLogin">
      <UInput
        id="email"
        type="email"
        className="form-control"
        placeholder="Enter email"
        label="Email"
        v-model="email"
      />

      <UInput
        id="password"
        type="password"
        className="form-control"
        placeholder="Enter password"
        label="Password"
        v-model="password"
      />

      <UButton label="Login" id="btnLogin" type="submit" />
    </form>

    <UButton class="logout" v-if="isLoggedIn" label="Logout" @click="handleLogout" />

    <UModal
      :isModalVisible="showErrorModal"
      title="Login Error"
      text="Incorrect email or password. Or there is no tocken!"
      buttonClose=""
      buttonOneText="Try Again"
      @close="closeErrorModal"
      @buttonOneClick="handleTryAgain"
    />
  </div>
</template>

<style scoped>
#containerCustom {
  width: 450px;
  margin: auto;
  align-items: center;
}
.logout {
  width: 419px;
}
</style>
