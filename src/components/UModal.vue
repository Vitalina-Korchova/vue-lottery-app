<script setup lang="ts">
import { defineProps, onMounted, onBeforeUnmount } from 'vue'
import Ubutton from './UButton.vue'

const props = defineProps<{
  title: string
  text: string
  buttonClose: string
  buttonOneText: string
  buttonTwoText?: string
  isModalVisible: boolean
}>()

const emit = defineEmits(['close', 'buttonOneClick', 'buttonTwoClick'])

const closeModal = () => {
  emit('close')
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div class="modal" tabindex="-1" :style="{ display: isModalVisible ? 'block' : 'none' }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <Ubutton :label="buttonClose" customClass="btn-close" @click="closeModal" />
        </div>
        <div class="modal-body">
          <p>{{ text }}</p>
          <slot name="modal-inputs"></slot>
        </div>
        <div class="modal-footer">
          <Ubutton
            :label="buttonOneText"
            customClass="btn-secondary"
            @click="$emit('buttonOneClick')"
          />
          <Ubutton
            v-if="buttonTwoText"
            :label="buttonTwoText"
            customClass="btn-primary"
            @click="$emit('buttonTwoClick')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
