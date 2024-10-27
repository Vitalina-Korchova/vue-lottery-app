<script setup lang="ts">
import type { PropType } from 'vue'
import type { Participant } from '../ParticipantInterface'
import UButton from './UButton.vue'
import UTable from './ListTable.vue'
import UModal from './UModal.vue'
import UInput from './UInput.vue'
import { ref, reactive } from 'vue'
import SearchBar from './SearchBar.vue'
import type ParticipantService from '../ParticipantService'
import { useForm, useField } from 'vee-validate'
import { useParticipantForm } from '../Validation'

const props = defineProps({
  participants: {
    type: Array as PropType<Participant[]>,
    required: true
  },
  participantService: {
    type: Object as PropType<ParticipantService>,
    required: true
  }
})

//для відкриття модального вікна
const selectedParticipantId = ref<number | null>(null)
const isRemoveModalVisible = ref(false)
const isUpdateModalVisible = ref(false)
const selectedParticipantName = ref<string>('')
const originalEmail = ref<string>('')

//для валідації
const { schema } = useParticipantForm(props.participantService)
const { handleSubmit } = useForm({
  validationSchema: schema
})

const { value: avatar, errorMessage: avatarError } = useField<string>('avatar')
const { value: name, errorMessage: nameError } = useField<string>('name')
const { value: email, errorMessage: emailError } = useField<string>('email')
const { value: password, errorMessage: passwordError } = useField<string>('password')
/////

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
    avatar.value = participantToUpdate.avatar
    name.value = participantToUpdate.name
    email.value = participantToUpdate.email
    password.value = participantToUpdate.password

    // Зберігаю оригінальний email
    originalEmail.value = participantToUpdate.email
  }
  selectedParticipantId.value = participantId
  isUpdateModalVisible.value = true
}

// Метод для видалення учасника
const confirmRemoval = () => {
  if (selectedParticipantId.value !== null) {
    props.participantService.removeParticipant(selectedParticipantId.value)
    isRemoveModalVisible.value = false
  }
}

// Метод для закриття модального вікна
const closeModal = () => {
  isRemoveModalVisible.value = false
  isUpdateModalVisible.value = false
}

const UpdateParticipant = handleSubmit((values) => {
  const participant: Participant = {
    id: selectedParticipantId.value!,
    avatar: values.avatar,
    name: values.name,
    email: values.email,
    password: values.password
  }

  props.participantService.updateParticipant(participant)
  closeModal()
})

const filterByName = (name: string) => {
  props.participantService.searchParticipants(name)
}

const sortNameDec = () => {
  props.participantService.sortParticipantsByNameDec()
}

const sortNameInc = () => {
  props.participantService.sortParticipantsByNameInc()
}
</script>

<template>
  <div id="containerParticipants" class="py-5 px-4 mb-5 bg-white border border-light-subtle">
    <SearchBar :participants="participants" @filter-by-name="filterByName" />
    <label id="labelSort" class="fs-5 fw-bold">Сортування за іменем</label>
    <UButton id="sortDec" customClass="btn-primary" icon="sortNameDec" @click="sortNameDec" />
    <UButton customClass="btn-primary" icon="sortNameInc" @click="sortNameInc" />
    <br />
    <UTable
      :columns="['ID', 'Avatar', 'Name', 'Email', 'Password', 'Update', 'Remove']"
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
          v-model="avatar"
          :id="'avatar'"
          :type="'text'"
          :className="'form-control'"
          :error="avatarError"
          :label="'Avatar'"
        />
        <UInput
          v-model="name"
          :id="'name'"
          :type="'text'"
          :placeholder="'Enter user name'"
          :className="'form-control'"
          :error="nameError"
          :label="'Name'"
        />

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
          :placeholder="'Enter user password'"
          :className="'form-control'"
          :error="passwordError"
          :label="'Password'"
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
