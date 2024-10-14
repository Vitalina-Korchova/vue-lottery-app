<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  title: string
  text: string
  buttonClose: string
  buttonOneText: string
  buttonTwoText?: string
  isModalVisible: boolean
}>()

const emit = defineEmits(['close', 'buttonOneClick', 'buttonTwoClick'])
</script>

<template>
  <div class="modal" tabindex="-1" :style="{ display: isModalVisible ? 'block' : 'none' }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="$emit('close')"
          >
            {{ buttonClose }}
          </button>
        </div>
        <div class="modal-body">
          <p>{{ text }}</p>
          <slot name="modal-inputs"></slot>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('buttonOneClick')">
            {{ buttonOneText }}
          </button>
          <button
            v-if="buttonTwoText"
            type="button"
            class="btn btn-primary"
            @click="$emit('buttonTwoClick')"
          >
            {{ buttonTwoText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
