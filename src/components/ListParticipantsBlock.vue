<script setup lang="ts">
import type { PropType } from 'vue'
import type { Participant } from './RegistrationForm.vue'
import UButton from './UButton.vue'
import UTable from './ListTable.vue'
import UModal from './UModal.vue'
import UInput from './UInput.vue'
import { ref, reactive, watch, computed } from 'vue'
import SearchBar from './SearchBar.vue'

const props = defineProps({
  participants: {
    type: Array as PropType<Participant[]>,
    required: true
  }
})

const errors = reactive<{ [key: string]: string }>({
  name: '',
  dateBirth: '',
  email: '',
  phoneNumber: ''
})

const participant = reactive<Participant>({
  id: 0,
  name: '',
  dateBirth: '',
  email: '',
  phoneNumber: ''
})

const emit = defineEmits([
  'remove-participant',
  'update-participant',
  'search-by-name',
  'sort-name-dec'
])

//для відкриття модального вікна
const selectedParticipantId = ref<number | null>(null)
const isRemoveModalVisible = ref(false)
const isUpdateModalVisible = ref(false)
const selectedParticipantName = ref<string>('')

const openRemoveModal = (participantId: number) => {
  const participantToRemove = props.participants.find((p) => p.id === participantId)
  if (participantToRemove) {
    selectedParticipantName.value = participantToRemove.name
  }
  selectedParticipantId.value = participantId
  isRemoveModalVisible.value = true
}

const openUpdateModal = (participantId: number) => {
  const participantToUpdate = props.participants.find((p) => p.id === participantId)
  if (participantToUpdate) {
    Object.assign(participant, participantToUpdate)
  }
  selectedParticipantId.value = participantId
  isUpdateModalVisible.value = true
}

// Метод для видалення учасника
const confirmRemoval = () => {
  if (selectedParticipantId.value !== null) {
    emit('remove-participant', selectedParticipantId.value)
    isRemoveModalVisible.value = false
  }
}

// Метод для закриття модального вікна
const closeModal = () => {
  isRemoveModalVisible.value = false
  isUpdateModalVisible.value = false
}

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
  } else if (props.participants.some((p) => p.email === participant.email)) {
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

const UpdateParticipant = () => {
  if (validateAllFields()) {
    emit('update-participant', participant)
    closeModal()
  }
}

const filterByName = (name: string) => {
  emit('search-by-name', name)
}

const sortNameDec = () => {
  emit('sort-name-dec', participant)
}
</script>

<template>
  <div id="containerParticipants" class="py-5 px-4 mb-5 bg-white border border-light-subtle">
    <SearchBar :participants="participants" @filter-by-name="filterByName" />
    <label id="labelSort" class="fs-5 fw-bold">Сортування за іменем</label>
    <UButton id="sortDec" customClass="btn-primary" icon="sortNameDec" @click="sortNameDec" />
    <UButton customClass="btn-primary" icon="sortNameInc" />
    <br />
    <label id="labelSort" class="fs-5 fw-bold">Сортування за датою народження</label>
    <UButton id="sortDec" customClass="btn-primary" icon="sortDateBirthDec" />
    <UButton customClass="btn-primary" icon="sortDateBirthInc" />
    <UTable
      :columns="['ID', 'Name', 'Date of Birth', 'Email', 'Phone Number', 'Update', 'Remove']"
      :rows="participants"
    >
      <template #update-button="{ row }">
        <UButton label="Update" customClass="btn-info" @click="openUpdateModal(row.id)" />
      </template>
      <template #remove-button="{ row }">
        <UButton label="Remove" customClass="btn-danger" @click="openRemoveModal(row.id)" />
      </template>
    </UTable>

    <UModal
      v-if="isRemoveModalVisible"
      :isModalVisible="isRemoveModalVisible"
      title="Confirm Removal"
      :text="`Are you sure you want to remove participant ${selectedParticipantName}?`"
      buttonClose=""
      buttonOneText="Cancel"
      buttonTwoText="Confirm"
      @close="closeModal"
      @buttonOneClick="closeModal"
      @buttonTwoClick="confirmRemoval"
    />

    <UModal
      v-if="isUpdateModalVisible"
      :isModalVisible="isUpdateModalVisible"
      title="Update Participant"
      text="Please update the participant information:"
      buttonClose=""
      buttonOneText="Update"
      buttonTwoText="Cancel"
      @close="closeModal"
      @buttonOneClick="UpdateParticipant"
      @buttonTwoClick="closeModal"
    >
      <template #modal-inputs>
        <UInput
          v-model="participant.name"
          :id="'name'"
          :type="'text'"
          :placeholder="'Enter user name'"
          :className="'form-control'"
          :error="errors.name"
          :label="'Name'"
        />
        <UInput
          v-model="participant.dateBirth"
          :id="'dateBirth'"
          :type="'date'"
          :className="'form-control'"
          :error="errors.dateBirth"
          :label="'Date of Birth'"
        />
        <UInput
          v-model="participant.email"
          :id="'email'"
          :type="'email'"
          :className="'form-control'"
          :placeholder="'Enter email'"
          :error="errors.email"
          :label="'Email'"
        />
        <UInput
          v-model="participant.phoneNumber"
          :id="'phoneNumber'"
          :type="'tel'"
          :className="'form-control'"
          :placeholder="'Enter phone number'"
          :error="errors.phoneNumber"
          :label="'Phone Number'"
        />
      </template>
    </UModal>
  </div>
</template>

<style scoped>
#labelSort {
  margin-right: 10px;
}

#sortDec {
  margin-right: 10px;
}
</style>
