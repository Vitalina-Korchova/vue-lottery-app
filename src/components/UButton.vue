<script setup lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps<{
  label?: string
  id?: string
  customClass?: string
  disabled?: boolean
  icon?: 'sortNameDec' | 'sortNameInc'
}>()

const emit = defineEmits(['click'])

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}

const iconPath = computed(() => {
  switch (props.icon) {
    case 'sortNameDec':
      return [
        'M10.082 5.629L9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371zm1.57-.785L11 2.687h-.047l-.652 2.157z',
        'M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z'
      ]
    case 'sortNameInc':
      return [
        'M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371zm1.57-.785L11 2.687h-.047l-.652 2.157z',
        'M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645zm-8.46-.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.5.5 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707z'
      ]
    default:
      return []
  }
})
</script>

<template>
  <button
    @click="handleClick"
    :class="['my-2', 'btn', 'btn-primary', customClass]"
    type="button"
    :id="id"
    :disabled="disabled"
  >
    <svg
      v-if="icon"
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="23"
      fill="currentColor"
      class="bi"
      viewBox="0 0 16 16"
    >
      <path v-for="(path, index) in iconPath" :key="index" :d="path" />
    </svg>
    <span v-if="label" :class="{ 'ms-2': icon }">{{ label }}</span>
  </button>
</template>

<style scoped></style>
