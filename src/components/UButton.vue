<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  label: string
  id?: string
  customClass?: string
  disabled?: boolean
}>()

const emit = defineEmits(['click'])

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<template>
  <button
    @click="handleClick"
    :class="['my-2', 'btn', 'btn-primary', customClass]"
    type="button"
    :id="id"
    :disabled="disabled"
  >
    {{ label }}
  </button>
</template>

<style scoped></style>
