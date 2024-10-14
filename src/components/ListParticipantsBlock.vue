<script setup lang="ts">
import type { PropType } from 'vue'
import type { Participant } from './RegistrationForm.vue'
import UButton from './UButton.vue'
import UTable from './ListTable.vue'

defineProps({
  participants: {
    type: Array as PropType<Participant[]>,
    required: true
  }
})

const onUpdate = () => {}

const onRemove = () => {}
</script>

<template>
  <div id="containerParticipants" class="py-5 px-4 mb-5 bg-white border border-light-subtle">
    <UTable
      :columns="['#', 'Name', 'Date of Birth', 'Email', 'Phone Number', 'Update', 'Remove']"
      :rows="participants"
    >
      <template #update-button="{}">
        <UButton label="Update" customClass="btn-info" @click="onUpdate()" />
      </template>
      <template #remove-button="{}">
        <UButton label="Remove" customClass="btn-danger" @click="onRemove()" />
      </template>
    </UTable>
  </div>
</template>

<style scoped></style>
