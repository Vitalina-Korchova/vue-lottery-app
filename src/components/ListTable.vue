<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  columns: Array<string>
  rows: Array<Record<string, any>>
}>()
</script>

<template>
  <table class="table table-striped table-hover table-bordered">
    <thead class="table-light">
      <tr>
        <th v-for="(column, index) in columns" :key="index" scope="col">{{ column }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td v-for="(value, key) in row" :key="key">
          <img v-if="key === 'avatar'" :src="value" alt="Avatar" class="img-thumbnail" />
          <span v-else>{{ value }}</span>
        </td>
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

.img-thumbnail {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
