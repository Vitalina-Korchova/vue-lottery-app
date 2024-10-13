<script setup lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps<{
  modelValue: string // пропс для v-model
  id: string
  type?: string
  placeholder?: string
  className: string
  error?: string
}>()

const emit = defineEmits(['update:modelValue'])

const inputValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value)
})
</script>

<template>
  <input
    v-model="inputValue"
    :id="id"
    :type="type"
    :placeholder="placeholder"
    :class="[className, { 'is-invalid': error }]"
    @input="$emit('update:modelValue', inputValue)"
  />
</template>

<style scoped>
.is-invalid {
  border-color: red;
}
</style>
