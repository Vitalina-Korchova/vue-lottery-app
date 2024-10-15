<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const props = defineProps({
  participants: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['filter-by-name'])

const searchQuery = ref('')

const filterParticipantsByName = () => {
  emit('filter-by-name', searchQuery.value)
}
</script>

<template>
  <input
    v-model="searchQuery"
    class="mb-4 form-control"
    id="searchBar"
    type="text"
    placeholder="Search by Name"
    @input="filterParticipantsByName"
  />
</template>

<style scoped>
#searchBar {
  width: 400px;
}
</style>
