<script setup lang="ts"></script>

<template>
  <div
    id="containerWinners"
    class="d-flex justify-content-between bg-white px-4 py-3 mt-5 mb-2 border border-light-subtle align-items-center"
  >
    <div id="fieldForWinners" class="d-flex border border-light-subtle">
      <span class="px-4 py-2 fs-6 text-secondary">Winners</span>
    </div>
    <button id="btnNewWinners" type="button" class="btn btn-primary">New Winner</button>
  </div>
</template>

<style scoped>
#fieldForWinners {
  width: 85%;
}
</style>
