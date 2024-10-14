<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  columns: Array<string>
  rows: Array<Record<string, any>>
}>()

const emit = defineEmits(['updateRow', 'removeRow'])
</script>

<template>
  <table class="table table-striped table-hover table-bordered">
    <thead class="table-light">
      <tr>
        <th v-for="(column, index) in columns" :key="index" scope="col">{{ column }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in rows" :key="index">
        <th scope="row">{{ index + 1 }}</th>
        <td v-for="(value, key) in row" :key="key">{{ value }}</td>
        <td>
          <slot name="update-button" :row="row"></slot>
        </td>
        <td>
          <slot name="remove-button" :row="row"></slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.table {
  width: 100%;
  text-align: left;
}

.table th,
.table td {
  padding: 1rem;
  vertical-align: middle;
}

.table th {
  white-space: nowrap;
}

.table tbody tr td {
  white-space: nowrap;
}
</style>
